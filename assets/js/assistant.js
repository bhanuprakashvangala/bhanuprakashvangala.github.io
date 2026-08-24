/* =============================================================================
 * assistant.js: the "ask about my research" widget.
 *
 * Two modes, decided at runtime:
 *
 *   offline  (always available, zero configuration)
 *       Retrieval over a knowledge base generated from _data/cv.yml at build
 *       time. BM25 ranking, sentence-level extraction, real citations. No
 *       network call, no API key, no cost. This is the default and it works.
 *
 *   live     (only when window.BV_ASSISTANT.endpoint is set)
 *       The same retrieval runs first, then the retrieved passages are sent as
 *       grounding context to a server-side proxy that holds the model API key.
 *       The key is NEVER present in this file or anywhere else in the site, because a
 *       static site cannot keep a secret. See assistant-api/README.md.
 *
 * If a live call fails for any reason we serve the offline answer instead of
 * showing the visitor an error and nothing else.
 * ========================================================================== */
(function () {
  'use strict';

  var CFG = window.BV_ASSISTANT || {};
  var STORE_KEY = 'bv-assistant-endpoint';
  var MAX_TURNS = 8;          // conversation turns kept in the request
  var TOP_K = 4;              // passages retrieved per question
  var MIN_SCORE = 1.2;        // below this we admit we do not know
  var SENT_SPLIT = '\u0001';  // private delimiter used by the sentence splitter

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ======================================================================= *
   * 1. Retrieval
   * ======================================================================= */

  var STOP = ('a about all also am an and any are as at be been but by can did do does ' +
    'for from had has have he her him his how i if in into is it its me my of on or our ' +
    'out she so some such than that the their them then there these they this those to ' +
    'too us was we were what when where which who whom why will with would you your').split(' ');
  var STOPSET = {};
  STOP.forEach(function (w) { STOPSET[w] = true; });

  // Conservative suffix stripping, applied identically to documents and
  // queries. Linguistic accuracy matters less than symmetry: "advisor" and
  // "advised" only need to land on the same key. Longest suffix wins, and the
  // remainder must stay at least four characters so short words survive.
  var SUFFIXES = ['ibilities', 'ibility', 'iveness', 'fulness', 'ousness', 'ically', 'ements', 'ingly',
    'ments', 'ings', 'ness', 'ment', 'ible', 'able', 'ions', 'ing', 'ion',
    'ers', 'ors', 'ies', 'ive', 'ity', 'ed', 'ly', 'es', 'er', 'or', 'al', 's'];

  function stem(word) {
    var w = word;
    for (var pass = 0; pass < 2; pass++) {
      for (var i = 0; i < SUFFIXES.length; i++) {
        var suf = SUFFIXES[i];
        if (w.length - suf.length >= 4 && w.slice(-suf.length) === suf) {
          w = w.slice(0, -suf.length);
          break;
        }
      }
    }
    return w;
  }

  function tokenize(str) {
    var out = [];
    String(str).toLowerCase()
      .replace(/[^a-z0-9+#.\- ]+/g, ' ')
      .split(/\s+/)
      .forEach(function (raw) {
        var w = raw.replace(/^[.\-]+|[.\-]+$/g, '');
        if (!w) return;
        // Index a hyphenated compound BOTH whole and in parts, so a query for
        // "Pick-and-Spin" still reaches a document that writes "Pick and Spin".
        if (w.indexOf('-') !== -1) {
          w.split('-').forEach(function (part) {
            if (part.length > 1 && !STOPSET[part]) out.push(stem(part));
          });
        }
        if (w.length > 1 && !STOPSET[w]) out.push(stem(w));
      });
    return out;
  }

  /** Minimal BM25 index over the knowledge-base chunks. */
  function Index(chunks) {
    this.chunks = chunks;
    this.docs = [];
    this.df = {};

    var total = 0;
    var self = this;

    chunks.forEach(function (c) {
      // Titles carry more signal than body prose, so weight them by repetition.
      var terms = tokenize(c.title + ' ' + c.title + ' ' + c.text);
      var tf = {};
      terms.forEach(function (t) { tf[t] = (tf[t] || 0) + 1; });
      Object.keys(tf).forEach(function (t) { self.df[t] = (self.df[t] || 0) + 1; });
      self.docs.push({ tf: tf, len: terms.length });
      total += terms.length;
    });

    this.avgLen = total / Math.max(1, chunks.length);
  }

  Index.prototype.search = function (query, k) {
    var qTerms = tokenize(query);
    if (!qTerms.length) return [];

    var N = this.chunks.length;
    var k1 = 1.5;
    var b = 0.75;
    var self = this;
    var scored = [];

    this.docs.forEach(function (doc, i) {
      var score = 0;
      qTerms.forEach(function (t) {
        var f = doc.tf[t];
        if (!f) return;
        var df = self.df[t] || 0;
        var idf = Math.log(1 + (N - df + 0.5) / (df + 0.5));
        score += idf * (f * (k1 + 1)) / (f + k1 * (1 - b + b * doc.len / self.avgLen));
      });
      if (score > 0) scored.push({ chunk: self.chunks[i], score: score });
    });

    scored.sort(function (x, y) { return y.score - x.score; });
    return scored.slice(0, k || TOP_K);
  };

  /** Split a passage into sentences and keep the ones the question asks about. */
  function bestSentences(text, query, limit) {
    var qSet = {};
    tokenize(query).forEach(function (t) { qSet[t] = true; });

    // Protect periods that do not end a sentence, otherwise "Advised by
    // Dr. Tanu Malik" splits after "Dr." and the useful fragment is discarded
    // for being too short.
    var DOT = '\u0003';
    var protectedText = String(text)
      .replace(/\b(Dr|Prof|Mr|Mrs|Ms|Sr|Jr|St|vs|etc|Inc|Ltd|Fig|No|Vol|pp|approx|Ph\.D|M\.S|B\.Tech|U\.S)\./g,
        function (m) { return m.slice(0, -1) + DOT; })
      .replace(/\b([A-Z])\./g, function (m) { return m.charAt(0) + DOT; });

    var sentences = protectedText
      .replace(/([.!?])\s+(?=[A-Z(])/g, '$1' + SENT_SPLIT)
      .split(SENT_SPLIT)
      .map(function (s) { return s.split(DOT).join('.').trim(); })
      .filter(Boolean);

    var substantial = sentences.filter(function (s) { return s.length > 25; });
    if (substantial.length) sentences = substantial;

    if (sentences.length <= limit) return sentences;

    var ranked = sentences.map(function (s, i) {
      var terms = tokenize(s);
      var hits = 0;
      terms.forEach(function (t) { if (qSet[t]) hits++; });
      // Normalise by length so a long sentence cannot win on volume alone.
      return { s: s, i: i, score: hits / Math.sqrt(terms.length + 1) };
    });

    ranked.sort(function (a, b) { return b.score - a.score; });
    return ranked.slice(0, limit)
      .sort(function (a, b) { return a.i - b.i; })   // restore reading order
      .map(function (r) { return r.s; });
  }

  /* ======================================================================= *
   * 2. Offline answer synthesis
   * ======================================================================= */

  function offlineAnswer(query, hits, kb) {
    var email = (kb && kb.person && kb.person.email) || CFG.email || 'bv3hz@umsystem.edu';

    if (!hits.length || hits[0].score < MIN_SCORE) {
      return {
        text: 'I do not have anything on that in Bhanu\'s CV, so I would rather not guess. ' +
          'Try asking about his research, publications, experience, awards or teaching. Or ' +
          'or email him at [' + email + '](mailto:' + email + ').',
        sources: []
      };
    }

    var parts = [];
    var used = [];

    hits.slice(0, 3).forEach(function (h, idx) {
      var sents = bestSentences(h.chunk.text, query, idx === 0 ? 4 : 2);
      if (!sents.length) return;
      parts.push(sents.join(' '));
      used.push(h.chunk);
    });

    if (!parts.length) {
      return { text: hits[0].chunk.text, sources: [hits[0].chunk] };
    }

    return { text: parts.join('\n\n'), sources: used };
  }

  /* ======================================================================= *
   * 3. Markdown rendering (escape first: model output is untrusted)
   * ======================================================================= */

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function renderMarkdown(src) {
    var text = escapeHtml(src);
    var blocks = [];
    var PH = '\u0002';   // placeholder sentinel for extracted code blocks

    // Fenced code first, so its contents escape all later processing.
    text = text.replace(/```([\s\S]*?)```/g, function (_, code) {
      blocks.push('<pre><code>' + code.replace(/^\n/, '') + '</code></pre>');
      return PH + (blocks.length - 1) + PH;
    });

    text = text.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>');

    // Links: only http(s), mailto and in-site paths survive.
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (m, label, href) {
      if (!/^(https?:\/\/|mailto:|\/|#)/i.test(href)) return label;
      var ext = /^https?:\/\//i.test(href) && href.indexOf(location.hostname) === -1;
      return '<a href="' + href + '"' +
        (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + label + '</a>';
    });

    var html = text.split(/\n{2,}/).map(function (para) {
      var trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.charAt(0) === PH) return trimmed;

      var lines = trimmed.split('\n');

      if (lines.every(function (l) { return /^\s*[-*]\s+/.test(l); })) {
        return '<ul>' + lines.map(function (l) {
          return '<li>' + l.replace(/^\s*[-*]\s+/, '') + '</li>';
        }).join('') + '</ul>';
      }

      if (lines.every(function (l) { return /^\s*\d+[.)]\s+/.test(l); })) {
        return '<ol>' + lines.map(function (l) {
          return '<li>' + l.replace(/^\s*\d+[.)]\s+/, '') + '</li>';
        }).join('') + '</ol>';
      }

      return '<p>' + lines.join('<br>') + '</p>';
    }).join('');

    return html.replace(new RegExp(PH + '(\\d+)' + PH, 'g'), function (_, i) {
      return blocks[+i] || '';
    });
  }

  /* ======================================================================= *
   * 4. Widget
   * ======================================================================= */

  var LAUNCH_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ' +
    'aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.3-.6L3 21l1.8-5a8.3 ' +
    '8.3 0 0 1-.8-3.6 8.4 8.4 0 0 1 8.5-8.4 8.4 8.4 0 0 1 8.5 8.4z"/></svg>';

  function icon(path, size) {
    return '<svg width="' + (size || 16) + '" height="' + (size || 16) + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
  }

  var GEAR = '<circle cx="12" cy="12" r="3"/><path d="M20 12a8 8 0 0 0-.2-1.7l2-1.5-2-3.4-2.3 1a8 ' +
    '8 0 0 0-2.9-1.7L14.2 2H9.8l-.4 2.7a8 8 0 0 0-2.9 1.7l-2.3-1-2 3.4 2 1.5a8 8 0 0 0 0 3.4l-2 ' +
    '1.5 2 3.4 2.3-1a8 8 0 0 0 2.9 1.7l.4 2.7h4.4l.4-2.7a8 8 0 0 0 2.9-1.7l2.3 1 2-3.4-2-1.5c.1-.5.2-1.1.2-1.7z"/>';

  var Assistant = {
    kb: null,
    index: null,
    open: false,
    busy: false,
    history: [],
    controller: null,

    endpoint: function () {
      try {
        var override = localStorage.getItem(STORE_KEY);
        if (override) return override;
      } catch (e) { /* storage blocked */ }
      return CFG.endpoint || '';
    },

    statusLabel: function () {
      return this.endpoint() ? 'Live model' : 'Offline mode - answers from my CV';
    },

    build: function () {
      var el = document.createElement('div');
      el.className = 'ai-root no-print';
      el.innerHTML =
        '<button class="ai-launcher" id="ai-launcher" aria-expanded="false" aria-controls="ai-panel">' +
          '<span class="ai-launcher-icon">' + LAUNCH_ICON + '</span>' +
          '<span class="ai-launcher-label">Ask about my work</span>' +
        '</button>' +
        '<div class="ai-backdrop" id="ai-backdrop" hidden></div>' +
        '<section class="ai-panel" id="ai-panel" role="dialog" aria-label="Research assistant" hidden>' +
          '<header class="ai-header">' +
            '<span class="ai-avatar">BV</span>' +
            '<div class="ai-heading">' +
              '<p class="ai-title">Ask about my research</p>' +
              '<p class="ai-status"><span class="ai-dot is-offline" id="ai-dot"></span>' +
                '<span class="ai-status-text" id="ai-status-text">Offline mode</span></p>' +
            '</div>' +
            '<div class="ai-header-actions">' +
              '<button class="ai-icon-btn" id="ai-settings-toggle" aria-label="Assistant settings" ' +
                'aria-expanded="false">' + icon(GEAR) + '</button>' +
              '<button class="ai-icon-btn" id="ai-reset" aria-label="Start a new conversation">' +
                icon('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>') + '</button>' +
              '<button class="ai-icon-btn" id="ai-close" aria-label="Close assistant">' +
                icon('<path d="M18 6 6 18M6 6l12 12"/>') + '</button>' +
            '</div>' +
          '</header>' +
          '<div class="ai-settings" id="ai-settings" hidden>' +
            '<label class="ai-field"><span class="ai-field-label">Assistant endpoint</span>' +
              '<input class="ai-field-input" id="ai-endpoint" type="url" autocomplete="off" ' +
                'spellcheck="false" placeholder="https://your-proxy.vercel.app/api/chat"></label>' +
            '<p class="ai-field-help">Optional. With no endpoint the assistant answers by ' +
              'retrieving passages from the CV, with no network call and no API key. Point it at ' +
              'a proxy for full generated answers; the key stays on the server, never in this page.</p>' +
            '<div class="ai-field-actions">' +
              '<button class="ai-btn is-primary" id="ai-endpoint-save" type="button">Save</button>' +
              '<button class="ai-btn" id="ai-endpoint-clear" type="button">Clear</button>' +
            '</div>' +
          '</div>' +
          '<div class="ai-log" id="ai-log" role="log" aria-live="polite" aria-relevant="additions"></div>' +
          '<div class="ai-suggestions" id="ai-suggestions"></div>' +
          '<form class="ai-composer" id="ai-composer">' +
            '<textarea class="ai-input" id="ai-input" rows="1" aria-label="Your question" ' +
              'autocomplete="off" placeholder="Ask about my papers, systems, or background..."></textarea>' +
            '<button class="ai-send" id="ai-send" type="submit" aria-label="Send question">' +
              icon('<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/>', 18) + '</button>' +
          '</form>' +
          '<p class="ai-foot">Answers come from my CV and may be imperfect. ' +
            '<a href="mailto:' + (CFG.email || '') + '">Email me</a> to confirm anything that matters.</p>' +
        '</section>';

      document.body.appendChild(el);
      this.el = el;
    },

    $: function (sel) { return this.el.querySelector(sel); },

    setStatus: function (state, text) {
      var dot = this.$('#ai-dot');
      var label = this.$('#ai-status-text');
      if (dot) dot.className = 'ai-dot is-' + state;
      if (label) label.textContent = text;
    },

    syncStatus: function () {
      this.setStatus(this.endpoint() ? 'live' : 'offline', this.statusLabel());
    },

    log: function () { return this.$('#ai-log'); },

    loadKb: function () {
      var self = this;
      if (this._kbPromise) return this._kbPromise;

      this._kbPromise = fetch(CFG.kb || '/assets/data/kb.json', { credentials: 'same-origin' })
        .then(function (r) {
          if (!r.ok) throw new Error('kb ' + r.status);
          return r.json();
        })
        .then(function (kb) {
          self.kb = kb;
          self.index = new Index(kb.chunks || []);
          self.renderSuggestions();
          self.syncStatus();
          if (!self.log().children.length) {
            self.push('bot', kb.greeting || 'Ask me anything about Bhanu\'s work.', []);
          }
          return kb;
        })
        .catch(function (err) {
          self.setStatus('error', 'Knowledge base unavailable');
          var email = CFG.email || 'bv3hz@umsystem.edu';
          self.push('bot', 'I could not load my knowledge base. You can reach Bhanu at [' +
            email + '](mailto:' + email + ').', []);
          throw err;
        });

      return this._kbPromise;
    },

    renderSuggestions: function () {
      var wrap = this.$('#ai-suggestions');
      if (!wrap || !this.kb) return;
      var self = this;
      wrap.innerHTML = '';
      (this.kb.suggestions || []).forEach(function (q) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'ai-chip';
        b.textContent = q;
        b.addEventListener('click', function () { self.ask(q); });
        wrap.appendChild(b);
      });
    },

    /** Build the citation list for a set of knowledge-base chunks. */
    sourceList: function (chunks) {
      var ul = document.createElement('ul');
      ul.className = 'ai-sources';
      var home = (CFG.home || '/');
      chunks.forEach(function (c, i) {
        var sec = c.section || '#about-me';
        var href = sec.charAt(0) === '#'
          ? (window.location.pathname === home ? sec : home + sec)
          : sec;
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'ai-source';
        a.href = href;
        a.innerHTML = '<span class="ai-source-idx">' + (i + 1) + '</span>';
        a.appendChild(document.createTextNode(c.title));
        li.appendChild(a);
        ul.appendChild(li);
      });
      return ul;
    },

    push: function (role, text, sources) {
      var art = document.createElement('article');
      art.className = 'ai-msg is-' + (role === 'user' ? 'user' : 'bot');

      var bubble = document.createElement('div');
      bubble.className = 'ai-bubble';
      if (role === 'user') bubble.textContent = text;
      else bubble.innerHTML = renderMarkdown(text);
      art.appendChild(bubble);

      if (sources && sources.length) art.appendChild(this.sourceList(sources));

      this.log().appendChild(art);
      this.scroll();
      return art;
    },

    scroll: function () {
      var l = this.log();
      l.scrollTop = l.scrollHeight;
    },

    typing: function (on) {
      var existing = this.$('.ai-typing');
      if (on) {
        if (existing) return;
        var d = document.createElement('div');
        d.className = 'ai-typing';
        d.setAttribute('aria-hidden', 'true');
        d.innerHTML = '<span></span><span></span><span></span>';
        this.log().appendChild(d);
        this.scroll();
      } else if (existing) {
        existing.parentNode.removeChild(existing);
      }
    },

    setBusy: function (on) {
      this.busy = on;
      var send = this.$('#ai-send');
      if (send) {
        send.classList.toggle('is-busy', on);
        send.disabled = on;
        send.setAttribute('aria-busy', on ? 'true' : 'false');
      }
      var label = this.$('#ai-status-text');
      if (label) label.textContent = on ? 'Thinking...' : this.statusLabel();
    },

    /* ------------------------------------------------------------------ */

    ask: function (question) {
      var self = this;
      question = String(question || '').trim();
      if (!question || this.busy) return;

      this.push('user', question, []);
      this.history.push({ role: 'user', content: question });
      this.setBusy(true);
      this.typing(true);

      this.loadKb().then(function () {
        var hits = self.index.search(question, TOP_K);
        var fallback = offlineAnswer(question, hits, self.kb);

        if (!self.endpoint()) {
          self.finish(fallback.text, fallback.sources);
          return;
        }
        self.live(hits, fallback);
      }).catch(function () {
        self.typing(false);
        self.setBusy(false);
      });
    },

    finish: function (text, sources) {
      this.typing(false);
      this.setBusy(false);
      this.push('bot', text, sources);
      this.history.push({ role: 'assistant', content: text });
      if (this.history.length > MAX_TURNS * 2) {
        this.history = this.history.slice(-MAX_TURNS * 2);
      }
    },

    /** Call the server-side proxy; stream if it streams, fall back if it fails. */
    live: function (hits, fallback) {
      var self = this;
      var context = hits.map(function (h, i) {
        return '[' + (i + 1) + '] ' + h.chunk.title + '\n' + h.chunk.text;
      }).join('\n\n');

      this.controller = new AbortController();
      var timer = setTimeout(function () {
        if (self.controller) self.controller.abort();
      }, 45000);

      fetch(this.endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: this.history.slice(-MAX_TURNS * 2),
          context: context,
          model: CFG.model || 'gpt-oss'
        }),
        signal: this.controller.signal
      }).then(function (res) {
        clearTimeout(timer);
        if (!res.ok) throw new Error('proxy ' + res.status);

        var ct = res.headers.get('content-type') || '';
        if (ct.indexOf('text/event-stream') === -1 || !res.body || !res.body.getReader) {
          return res.json().then(function (data) {
            var text = data.content || data.text ||
              (data.choices && data.choices[0] && data.choices[0].message &&
                data.choices[0].message.content) || '';
            if (!text) throw new Error('empty reply');
            self.syncStatus();
            self.finish(text, hits.map(function (h) { return h.chunk; }));
          });
        }
        self.syncStatus();
        return self.stream(res, hits);
      }).catch(function () {
        clearTimeout(timer);
        // Never leave the visitor with nothing: serve the retrieved answer.
        self.setStatus('error', 'Live model unreachable - using my CV');
        self.finish(fallback.text, fallback.sources);
      }).then(function () {
        self.controller = null;
      });
    },

    stream: function (res, hits) {
      var self = this;
      this.typing(false);

      var art = this.push('bot', '', []);
      art.classList.add('is-streaming');
      var bubble = art.querySelector('.ai-bubble');

      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      var acc = '';

      function handle(line) {
        line = line.trim();
        if (!line || line.indexOf('data:') !== 0) return;
        var payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') return;
        try {
          var json = JSON.parse(payload);
          var choice = json.choices && json.choices[0];
          var delta = (choice && ((choice.delta && choice.delta.content) ||
            (choice.message && choice.message.content))) || json.content || '';
          if (delta) {
            acc += delta;
            bubble.innerHTML = renderMarkdown(acc);
            self.scroll();
          }
        } catch (e) { /* partial frame; the rest arrives next read */ }
      }

      function done() {
        art.classList.remove('is-streaming');
        self.setBusy(false);
        if (!acc) {
          bubble.innerHTML = renderMarkdown(
            'The model returned nothing. Try again, or ask a different question.');
          return;
        }
        self.history.push({ role: 'assistant', content: acc });
        art.appendChild(self.sourceList(hits.map(function (h) { return h.chunk; })));
        self.scroll();
      }

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) { done(); return; }
          buffer += decoder.decode(r.value, { stream: true });
          var lines = buffer.split('\n');
          buffer = lines.pop();
          lines.forEach(handle);
          return pump();
        });
      }

      return pump().catch(function () { done(); });
    },

    /* ------------------------------------------------------------------ */

    toggle: function (force) {
      var panel = this.$('#ai-panel');
      var backdrop = this.$('#ai-backdrop');
      var launcher = this.$('#ai-launcher');
      var wantOpen = typeof force === 'boolean' ? force : !this.open;
      if (wantOpen === this.open) { if (wantOpen) this.focusInput(); return; }

      if (wantOpen) {
        panel.hidden = false;
        backdrop.hidden = false;
        void panel.offsetWidth;                 // force reflow so the transition runs
        panel.classList.add('is-open');
        launcher.setAttribute('aria-expanded', 'true');
        launcher.classList.add('is-hidden');
        document.body.classList.add('ai-lock');
        this.open = true;
        this.loadKb();
        this.focusInput();
      } else {
        panel.classList.add('is-closing');
        backdrop.classList.add('is-closing');
        launcher.setAttribute('aria-expanded', 'false');
        launcher.classList.remove('is-hidden');
        document.body.classList.remove('ai-lock');
        this.open = false;

        var finish = function () {
          panel.hidden = true;
          backdrop.hidden = true;
          panel.classList.remove('is-open');
          panel.classList.remove('is-closing');
          backdrop.classList.remove('is-closing');
        };
        if (reduceMotion) finish(); else setTimeout(finish, 180);
        launcher.focus();
      }
    },

    focusInput: function () {
      // Focusing on a small screen pops the keyboard over the conversation.
      if (window.innerWidth <= 768) return;
      var input = this.$('#ai-input');
      if (input) input.focus();
    },

    autosize: function () {
      var t = this.$('#ai-input');
      if (!t) return;
      t.style.height = 'auto';
      t.style.height = t.scrollHeight + 'px';
    },

    wire: function () {
      var self = this;

      this.$('#ai-launcher').addEventListener('click', function () { self.toggle(); });
      this.$('#ai-close').addEventListener('click', function () { self.toggle(false); });
      this.$('#ai-backdrop').addEventListener('click', function () { self.toggle(false); });

      this.$('#ai-reset').addEventListener('click', function () {
        if (self.controller) { self.controller.abort(); self.controller = null; }
        self.history = [];
        self.setBusy(false);
        self.log().innerHTML = '';
        if (self.kb) self.push('bot', self.kb.greeting, []);
        self.renderSuggestions();
        self.syncStatus();
      });

      var settings = this.$('#ai-settings');
      var settingsBtn = this.$('#ai-settings-toggle');
      settingsBtn.addEventListener('click', function () {
        var show = settings.hidden;
        settings.hidden = !show;
        settingsBtn.setAttribute('aria-expanded', show ? 'true' : 'false');
        if (show) {
          var f = self.$('#ai-endpoint');
          f.value = self.endpoint();
          f.focus();
        }
      });

      this.$('#ai-endpoint-save').addEventListener('click', function () {
        var v = self.$('#ai-endpoint').value.trim();
        try {
          if (v) localStorage.setItem(STORE_KEY, v);
          else localStorage.removeItem(STORE_KEY);
        } catch (e) { /* storage blocked */ }
        self.syncStatus();
        settings.hidden = true;
        settingsBtn.setAttribute('aria-expanded', 'false');
      });

      this.$('#ai-endpoint-clear').addEventListener('click', function () {
        try { localStorage.removeItem(STORE_KEY); } catch (e) { /* storage blocked */ }
        self.$('#ai-endpoint').value = '';
        self.syncStatus();
      });

      var form = this.$('#ai-composer');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = self.$('#ai-input');
        var q = input.value;
        input.value = '';
        self.autosize();
        self.ask(q);
      });

      var input = this.$('#ai-input');
      input.addEventListener('input', function () { self.autosize(); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (typeof form.requestSubmit === 'function') form.requestSubmit();
          else form.dispatchEvent(new Event('submit', { cancelable: true }));
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && self.open) { self.toggle(false); return; }
        if ((e.metaKey || e.ctrlKey) && String(e.key).toLowerCase() === 'k') {
          e.preventDefault();
          self.toggle(true);
        }
      });

      // Any element on the page can open the assistant with a question prefilled.
      document.addEventListener('click', function (e) {
        var trigger = e.target && e.target.closest && e.target.closest('[data-ask]');
        if (!trigger) return;
        e.preventDefault();
        self.toggle(true);
        self.ask(trigger.getAttribute('data-ask'));
      });
    },

    init: function () {
      this.build();
      this.wire();
      this.syncStatus();
    }
  };

  function boot() {
    Assistant.init();
    window.BVAssistant = Assistant;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
