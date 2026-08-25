/* =============================================================================
 * terminal.js -- a small shell over the CV.
 *
 * The site's content is already a tree: sections, papers, roles, projects. This
 * exposes that tree the way a systems researcher would expect to browse it, with
 * ls, cd, cat and tab completion, built from the same knowledge base the
 * assistant uses so it can never drift from the rest of the page.
 *
 * Nothing is evaluated and nothing is sent anywhere. `ask` hands off to the
 * assistant widget, which has its own offline path.
 * ========================================================================== */
(function () {
  'use strict';

  var mount = document.getElementById('terminal');
  if (!mount) return;

  var CFG = window.BV_ASSISTANT || {};
  var PROMPT_USER = 'bhanu';
  var PROMPT_HOST = 'nautilus';

  /* ---------------------------------------------------------------- utils - */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function wrap(text, width) {
    var out = [], line = '';
    String(text).split(/\s+/).forEach(function (w) {
      if ((line + ' ' + w).trim().length > width) { out.push(line.trim()); line = w; }
      else line += ' ' + w;
    });
    if (line.trim()) out.push(line.trim());
    return out;
  }
  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  /* Short, readable filename. The section anchor is already a hand-written
     short id (#pub-pick-and-spin), so prefer it and only fall back to the
     title, trimmed on a word boundary so nothing reads as "...-measur". */
  function fileName(chunk, prefix, limit, ext) {
    var anchor = String(chunk.section || '');
    if (anchor.indexOf('#' + prefix + '-') === 0) return anchor.slice(prefix.length + 2) + ext;
    var s = slug(chunk.title);
    if (s.length > limit) {
      s = s.slice(0, limit);
      var cut = s.lastIndexOf('-');
      if (cut > limit * 0.5) s = s.slice(0, cut);
    }
    /* Never end on a dangling connective ("visionai-ai-assistance-for"). */
    var stop = /-(for|and|of|the|in|to|a|on|with|from|at|as|via|an|by)$/;
    while (stop.test(s)) s = s.replace(stop, '');
    return s + ext;
  }

  /* ------------------------------------------------------ the filesystem - */
  var fs = null;

  function buildFs(kb) {
    var root = { type: 'dir', children: {} };

    function dir(path) {
      var node = root;
      path.forEach(function (part) {
        if (!node.children[part]) node.children[part] = { type: 'dir', children: {} };
        node = node.children[part];
      });
      return node;
    }
    function file(parent, name, body, section) {
      parent.children[name] = { type: 'file', body: body, section: section || '' };
    }

    var groups = {
      publication: ['papers', function (c) { return fileName(c, 'pub', 38, '.md'); }],
      research:    ['research', function (c) { return fileName(c, 'research', 34, '.md'); }],
      experience:  ['experience', function (c) { return fileName(c, 'experience', 34, '.md'); }],
      education:   ['education', function (c) { return fileName(c, 'education', 34, '.md'); }],
      project:     ['projects', function (c) { return fileName(c, 'program', 34, '.md'); }]
    };

    (kb.chunks || []).forEach(function (c) {
      var g = groups[c.type];
      if (g) {
        file(dir([g[0]]), g[1](c), c.text, c.section);
        return;
      }
      var flat = { profile: 'about.txt', awards: 'awards.txt', service: 'service.txt',
                   skills: 'skills.txt', news: 'news.txt' };
      if (flat[c.type]) { file(root, flat[c.type], c.text, c.section); return; }
      if (c.type === 'fact') { file(dir(['notes']), fileName(c, 'note', 30, '.txt'), c.text, c.section); }
    });

    file(root, 'README.md',
      'Bhanu Prakash Vangala\n' + (kb.person ? kb.person.role : '') + '\n\n' +
      'A small shell over my CV. It reads the same knowledge base the assistant\n' +
      'does, so it cannot tell you anything the rest of the page does not.\n\n' +
      'Try:  ls   cat about.txt   cd papers   tree   neofetch   ask what is pick and spin\n' +
      'Type help for the full list.', '#about-me');

    return root;
  }

  /* -------------------------------------------------------------- state - */
  var cwd = [];
  var history = [];
  var hIndex = -1;
  var busy = false;

  function nodeAt(parts) {
    var node = fs;
    for (var i = 0; i < parts.length; i++) {
      if (!node || node.type !== 'dir') return null;
      node = node.children[parts[i]];
    }
    return node || null;
  }
  function resolve(arg) {
    if (!arg) return cwd.slice();
    var parts = arg.split('/').filter(Boolean);
    var base = arg.charAt(0) === '/' ? [] : cwd.slice();
    parts.forEach(function (p) {
      if (p === '.') return;
      if (p === '..') { base.pop(); return; }
      base.push(p);
    });
    return base;
  }
  function cwdLabel() { return '~/' + cwd.join('/'); }

  /* --------------------------------------------------------------- view - */
  var out = mount.querySelector('.term-out');
  var input = mount.querySelector('.term-input');
  var promptEl = mount.querySelector('.term-prompt-path');

  function write(html, cls) {
    var line = document.createElement('div');
    line.className = 'term-line' + (cls ? ' ' + cls : '');
    line.innerHTML = html;
    out.appendChild(line);
    out.scrollTop = out.scrollHeight;
    return line;
  }
  function writeLines(arr, cls) { arr.forEach(function (l) { write(esc(l) || '&nbsp;', cls); }); }

  function syncPrompt() { if (promptEl) promptEl.textContent = cwdLabel(); }

  /* ------------------------------------------------------------ commands - */
  var COMMANDS = {
    help: function () {
      writeLines([
        'ls [path]        list this directory',
        'cd <path>        change directory, cd .. to go up',
        'cat <file>       print a file',
        'tree             the whole tree at once',
        'pwd              where you are',
        'find <text>      search every file',
        'open <file>      jump to that section of the page',
        'ask <question>   hand the question to the assistant',
        'theme [dark|light]   switch the colour scheme',
        'neofetch         the summary card',
        'whoami           short answer',
        'clear            clear the screen'
      ], 'is-dim');
    },

    ls: function (arg) {
      var node = nodeAt(resolve(arg));
      if (!node) return write('ls: ' + esc(arg) + ': no such file or directory', 'is-err');
      if (node.type === 'file') return write(esc(arg));
      var names = Object.keys(node.children).sort(function (a, b) {
        var ad = node.children[a].type === 'dir', bd = node.children[b].type === 'dir';
        return ad === bd ? a.localeCompare(b) : (ad ? -1 : 1);
      });
      if (!names.length) return write('(empty)', 'is-dim');
      write(names.map(function (n) {
        return node.children[n].type === 'dir'
          ? '<span class="t-dir">' + esc(n) + '/</span>'
          : '<span class="t-file">' + esc(n) + '</span>';
      }).join('   '));
    },

    cd: function (arg) {
      if (!arg || arg === '~' || arg === '/') { cwd = []; return syncPrompt(); }
      var parts = resolve(arg);
      var node = nodeAt(parts);
      if (!node) return write('cd: ' + esc(arg) + ': no such file or directory', 'is-err');
      if (node.type !== 'dir') return write('cd: ' + esc(arg) + ': not a directory', 'is-err');
      cwd = parts;
      syncPrompt();
    },

    cat: function (arg) {
      if (!arg) return write('cat: what file?', 'is-err');
      var node = nodeAt(resolve(arg));
      if (!node) return write('cat: ' + esc(arg) + ': no such file or directory', 'is-err');
      if (node.type === 'dir') return write('cat: ' + esc(arg) + ': is a directory', 'is-err');
      var cols = Math.max(38, Math.floor(out.clientWidth / 7.4));
      String(node.body).split('\n').forEach(function (para) {
        if (!para.trim()) { write('&nbsp;'); return; }
        writeLines(wrap(para, cols));
      });
      if (node.section) {
        write('<button type="button" class="t-link" data-open="' + esc(node.section) + '">open this section &rarr;</button>', 'is-dim');
      }
    },

    tree: function () {
      function walk(node, prefix) {
        var names = Object.keys(node.children).sort();
        names.forEach(function (n, i) {
          var last = i === names.length - 1;
          var child = node.children[n];
          write(esc(prefix + (last ? '`-- ' : '|-- ')) +
            (child.type === 'dir' ? '<span class="t-dir">' + esc(n) + '/</span>' : '<span class="t-file">' + esc(n) + '</span>'));
          if (child.type === 'dir') walk(child, prefix + (last ? '    ' : '|   '));
        });
      }
      write('<span class="t-dir">.</span>');
      walk(fs, '');
    },

    pwd: function () { write(esc(cwdLabel())); },

    find: function (arg) {
      if (!arg) return write('find: what text?', 'is-err');
      var q = arg.toLowerCase(), hits = 0;
      (function walk(node, path) {
        Object.keys(node.children).forEach(function (n) {
          var child = node.children[n];
          var p = path + n;
          if (child.type === 'dir') return walk(child, p + '/');
          if ((child.body || '').toLowerCase().indexOf(q) === -1) return;
          hits++;
          var i = child.body.toLowerCase().indexOf(q);
          var snip = child.body.slice(Math.max(0, i - 34), i + 46).replace(/\s+/g, ' ');
          write('<span class="t-file">' + esc(p) + '</span>');
          write('  ' + esc('...' + snip + '...'), 'is-dim');
        });
      })(fs, '');
      if (!hits) write('no matches', 'is-dim');
    },

    open: function (arg) {
      var node = arg ? nodeAt(resolve(arg)) : null;
      var target = node && node.section;
      if (!target) return write('open: nothing to open there', 'is-err');
      go(target);
    },

    ask: function (arg) {
      if (!arg) return write('ask: what would you like to know?', 'is-err');
      if (window.BVAssistant) {
        write('handing that to the assistant...', 'is-dim');
        window.BVAssistant.toggle(true);
        window.BVAssistant.ask(arg);
      } else {
        write('the assistant is not loaded on this page', 'is-err');
      }
    },

    theme: function (arg) {
      var next = arg === 'dark' || arg === 'light' ? arg
        : (document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('bv-theme', next); } catch (e) { /* blocked */ }
      var btn = document.getElementById('theme-toggle');
      if (btn) btn.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
      write('theme set to ' + next, 'is-dim');
    },

    whoami: function () {
      write('Bhanu Prakash Vangala, Ph.D. candidate at the University of Missouri.');
      write('I work on making AI systems testable by someone other than the team that built them.', 'is-dim');
    },

    neofetch: function () {
      var p = (window.__KB_PERSON__ || {});
      var art = [
        '     ____   ____   __     __',
        '    / __ ) / __ \\ / /    / /',
        '   / __  |/ /_/ // /  __/ /',
        '  /_____/ \\____//_/  /____/'
      ];
      // Values are kept short on purpose: the art column is 30 wide, and a long
      // value wraps back to column zero and breaks the card.
      var info = [
        'bhanu@nautilus',
        '--------------',
        'role     Ph.D. Candidate',
        'lab      Radiant Lab, Mizzou',
        'thesis   Executable Reliability',
        'papers   11 selected',
        'stack    K8s, vLLM, SLURM',
        'funding  NASA, NSF, DoD',
        'contact  ' + (p.email || CFG.email || '')
      ];
      var n = Math.max(art.length, info.length);
      for (var i = 0; i < n; i++) {
        write('<span class="t-accent">' + esc((art[i] || '').padEnd(30)) + '</span>' + esc(info[i] || ''));
      }
    },

    clear: function () { out.innerHTML = ''; },

    sudo: function () { write('nice try.', 'is-dim'); },
    exit: function () { write('there is no exit, only more research.', 'is-dim'); }
  };

  function go(section) {
    if (section.charAt(0) !== '#') { window.location.href = section; return; }
    var el = document.querySelector(section);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); write('jumped to ' + esc(section), 'is-dim'); }
    else { window.location.href = '/' + section; }
  }

  /* --------------------------------------------------------------- run - */
  function run(raw) {
    var line = raw.trim();
    write('<span class="t-prompt">' + PROMPT_USER + '@' + PROMPT_HOST + '</span> ' +
          '<span class="t-path">' + esc(cwdLabel()) + '</span> ' +
          '<span class="t-caret">$</span> ' + esc(line), 'is-echo');
    if (!line) return;

    history.push(line);
    hIndex = history.length;

    var sp = line.indexOf(' ');
    var cmd = (sp === -1 ? line : line.slice(0, sp)).toLowerCase();
    var arg = sp === -1 ? '' : line.slice(sp + 1).trim();

    if (COMMANDS[cmd]) COMMANDS[cmd](arg);
    else write(esc(cmd) + ': command not found. Type <span class="t-accent">help</span>.', 'is-err');
  }

  function complete() {
    var v = input.value;
    var sp = v.lastIndexOf(' ');
    var head = sp === -1 ? '' : v.slice(0, sp + 1);
    var frag = sp === -1 ? v : v.slice(sp + 1);

    var pool;
    if (sp === -1) pool = Object.keys(COMMANDS);
    else {
      var dirPart = frag.indexOf('/') !== -1 ? frag.slice(0, frag.lastIndexOf('/') + 1) : '';
      var node = nodeAt(resolve(dirPart || '.'));
      pool = node && node.type === 'dir' ? Object.keys(node.children).map(function (n) { return dirPart + n; }) : [];
    }
    var hits = pool.filter(function (n) { return n.indexOf(frag) === 0; });
    if (hits.length === 1) input.value = head + hits[0];
    else if (hits.length > 1) write(hits.join('   '), 'is-dim');
  }

  /* -------------------------------------------------------------- boot - */
  fetch(CFG.kb || '/assets/data/kb.json', { credentials: 'same-origin' })
    .then(function (r) { return r.json(); })
    .then(function (kb) {
      window.__KB_PERSON__ = kb.person || {};
      fs = buildFs(kb);
      syncPrompt();
      mount.classList.add('is-ready');
      // Boot into `ls` rather than the neofetch card. The card restated the
      // role, lab, thesis, paper count, stack, funders and contact, all of
      // which the page already says twice over, and it left most of the panel
      // empty. Showing the filesystem instead proves in one line that this is
      // a real shell over the CV and gives the reader somewhere to go.
      COMMANDS.ls();
      write('&nbsp;');
      write('Directories hold the full entries. <span class="t-accent">cat</span> one, ' +
            '<span class="t-accent">find</span> a phrase, <span class="t-accent">open</span> a section, ' +
            'or <span class="t-accent">ask</span> a question. <span class="t-accent">help</span> lists everything.', 'is-dim');
    })
    .catch(function () {
      write('could not load the knowledge base', 'is-err');
    });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (busy || !fs) return;
      var v = input.value;
      input.value = '';
      run(v);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (fs) complete();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIndex > 0) input.value = history[--hIndex] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex < history.length - 1) input.value = history[++hIndex] || '';
      else { hIndex = history.length; input.value = ''; }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      COMMANDS.clear();
    }
  });

  // clicking anywhere in the terminal focuses the prompt, as a terminal should
  mount.addEventListener('click', function (e) {
    var open = e.target.closest && e.target.closest('[data-open]');
    if (open) { go(open.getAttribute('data-open')); return; }
    if (window.getSelection().toString()) return;
    input.focus();
  });

  // the suggestion chips above the prompt
  mount.querySelectorAll('.term-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (!fs) return;
      run(chip.getAttribute('data-cmd'));
      input.focus();
    });
  });
})();
