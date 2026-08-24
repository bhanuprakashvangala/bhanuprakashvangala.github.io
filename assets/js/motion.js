/* =============================================================================
 * motion.js -- the motion layer.
 *
 * Everything here is additive. With JavaScript off, or with reduced motion
 * requested, none of it runs and the page renders in its finished state: the
 * `js-motion` class that arms every hidden-start rule is only set by the inline
 * head script when motion is both possible and wanted.
 *
 * The hero canvas is not decoration. It is a live, ambient run of the
 * Pick-and-Spin router from "Efficient Multi-Model Orchestration for
 * Self-Hosted LLMs" (AAAI 2026): requests arrive, the router picks a model,
 * cold replicas spin up and warm ones serve immediately.
 * ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var MOTION = root.classList.contains('js-motion');

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  }

  /* ======================================================================= *
   * 1. Reading progress
   * ======================================================================= */
  function initProgress() {
    var bar = document.createElement('div');
    bar.className = 'progress-bar';
    bar.setAttribute('aria-hidden', 'true');
    var fill = document.createElement('div');
    fill.className = 'progress-bar-fill';
    bar.appendChild(fill);
    document.body.appendChild(bar);

    var ticking = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, window.pageYOffset / h)) : 0;
      fill.style.transform = 'scaleX(' + p + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ======================================================================= *
   * 2. Scroll reveals, staggered within each group
   * ======================================================================= */
  function initReveals() {
    var targets = $$('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }

    // Stagger by position within the parent, capped so long lists do not
    // leave the reader waiting on the last item.
    targets.forEach(function (el) {
      var sibs = el.parentElement
        ? $$('[data-reveal]', el.parentElement).filter(function (n) { return n.parentElement === el.parentElement; })
        : [el];
      var i = sibs.indexOf(el);
      el.style.setProperty('--reveal-delay', Math.min(i, 8) * 55 + 'ms');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================= *
   * 3. Counting statistics
   * ======================================================================= */
  function initCounters() {
    var nums = $$('.stat-num');
    if (!nums.length || !('IntersectionObserver' in window)) return;

    function run(el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!m) return;
      var pre = m[1], target = parseInt(m[2].replace(/,/g, ''), 10), post = m[3];
      if (!isFinite(target) || target <= 0) return;

      el.classList.add('is-counting');
      var dur = 900 + Math.min(600, target);
      var t0 = null;

      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
        var v = Math.round(target * eased);
        el.textContent = pre + v.toLocaleString('en-US') + post;
        if (p < 1) requestAnimationFrame(step);
        else { el.textContent = raw; el.classList.remove('is-counting'); }
      }
      requestAnimationFrame(step);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ======================================================================= *
   * 4. FLIP filtering: measure, mutate, invert, play
   * ======================================================================= */
  function initFlipFilter() {
    var list = $('#pub-list');
    var chips = $$('.filter-chip');
    if (!list || !chips.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var items = $$('.pub', list);

        // FIRST: where is everything now
        var first = items.map(function (el) {
          var r = el.getBoundingClientRect();
          return { el: el, top: r.top, hidden: el.classList.contains('is-hidden') };
        });

        // site.js has already applied the filter by the time this listener
        // runs, so read the new state on the next frame.
        requestAnimationFrame(function () {
          first.forEach(function (rec) {
            var el = rec.el;
            var nowHidden = el.classList.contains('is-hidden');

            if (nowHidden && !rec.hidden) { el.classList.add('is-out'); return; }
            if (nowHidden) return;

            var r = el.getBoundingClientRect();
            var dy = rec.top - r.top;

            el.classList.remove('is-out');
            if (rec.hidden) {
              el.classList.add('is-in');
              requestAnimationFrame(function () { el.classList.remove('is-in'); });
              return;
            }
            if (Math.abs(dy) < 1) return;

            // INVERT
            el.style.transform = 'translateY(' + dy + 'px)';
            el.classList.remove('is-flipping');
            // PLAY
            requestAnimationFrame(function () {
              el.classList.add('is-flipping');
              el.style.transform = '';
              setTimeout(function () {
                el.classList.remove('is-flipping');
              }, 420);
            });
          });
        });
      });
    });
  }

  /* ======================================================================= *
   * 5. Magnetic hover: cursor position drives a small lift and sheen
   * ======================================================================= */
  function initMagnetic() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    var els = $$('.link-pill, .project-card');
    els.forEach(function (el) {
      el.classList.add('magnetic');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width).toFixed(3));
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height).toFixed(3));
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '0.5');
        el.style.setProperty('--my', '0.5');
      });
    });
  }

  /* ======================================================================= *
   * 6. Hero spotlight
   * ======================================================================= */
  function initSpotlight() {
    if (!window.matchMedia || !window.matchMedia('(hover: hover)').matches) return;
    var hero = $('.hero');
    if (!hero) return;
    hero.classList.add('spotlight');
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  }

  /* ======================================================================= *
   * 7. Copy BibTeX
   * ======================================================================= */
  function bibtex(pub) {
    var key = (pub.authors[0] || 'vangala').split(' ').pop().toLowerCase() +
      pub.year + (pub.title.split(/\s+/)[0] || '').toLowerCase().replace(/\W/g, '');
    var lines = [
      '@inproceedings{' + key + ',',
      '  title     = {' + pub.title + '},',
      '  author    = {' + pub.authors.join(' and ') + '},',
      '  booktitle = {' + pub.venue + '},',
      '  year      = {' + pub.year + '}'
    ];
    if (pub.url) lines.push('  url       = {' + pub.url + '}');
    lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, '');
    lines.push('}');
    return lines.join('\n');
  }

  function initCopyBib() {
    $$('#pub-list .pub').forEach(function (li) {
      var titleEl = $('.pub-title', li);
      var authorsEl = $('.pub-authors', li);
      var venueEl = $('.pub-venue', li);
      if (!titleEl || !authorsEl || !venueEl) return;

      var link = $('.pub-actions a', li);
      var pub = {
        title: titleEl.textContent.trim(),
        authors: authorsEl.textContent.split(',').map(function (s) { return s.trim(); }).filter(Boolean),
        venue: venueEl.textContent.replace(/\s*·.*$/, '').replace(/^Under review\s*·?\s*/, '').trim(),
        year: li.getAttribute('data-year') || '',
        url: link ? link.href : ''
      };

      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-bib';
      btn.textContent = 'BibTeX';
      btn.setAttribute('aria-label', 'Copy BibTeX for ' + pub.title);

      btn.addEventListener('click', function () {
        var text = bibtex(pub);
        var done = function () {
          btn.classList.add('is-copied');
          btn.textContent = 'Copied';
          setTimeout(function () {
            btn.classList.remove('is-copied');
            btn.textContent = 'BibTeX';
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand('copy'); } catch (e) { /* nothing to do */ }
          document.body.removeChild(ta);
          done();
        }
      });

      var body = $('.pub-body', li) || li;
      body.appendChild(btn);
    });
  }

  /* ======================================================================= *
   * 8. Hero canvas: an ambient run of the Pick-and-Spin router
   * ======================================================================= */
  function initHeroCanvas() {
    var hero = $('.hero');
    if (!hero || !MOTION) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'hero-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    hero.insertBefore(canvas, hero.firstChild);

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var W = 0, H = 0, dpr = 1;
    var models = [];
    var packets = [];
    var t = 0;
    var raf = null;

    function palette() {
      var cs = getComputedStyle(document.documentElement);
      return {
        line: cs.getPropertyValue('--c-border-strong').trim() || '#7f8a9c',
        warm: cs.getPropertyValue('--c-accent').trim() || '#00369f',
        text: cs.getPropertyValue('--c-text-muted').trim() || '#4d5769'
      };
    }
    var pal = palette();

    function layout() {
      var r = hero.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(320, r.width);
      H = Math.max(220, r.height);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Seven replicas on an arc down the right side, out of the text's way.
      var n = 7;
      var cx = W * 0.83, cy = H * 0.5;
      var rad = Math.min(W * 0.16, H * 0.40);
      models = [];
      for (var i = 0; i < n; i++) {
        var a = (-Math.PI / 2) + (i / (n - 1)) * Math.PI;
        models.push({
          x: cx + Math.cos(a) * rad * 0.85,
          y: cy + Math.sin(a) * rad,
          warm: i < 2,            // two resident replicas at rest
          heat: i < 2 ? 1 : 0,
          spin: 0,
          r: 3.2
        });
      }
    }

    function emit() {
      // Route to a warm replica when one exists, else pay a cold start.
      var warm = models.filter(function (m) { return m.warm; });
      var pick = warm.length && Math.random() < 0.72
        ? warm[Math.floor(Math.random() * warm.length)]
        : models[Math.floor(Math.random() * models.length)];
      if (!pick.warm) {
        pick.spin = 1;
        // residency is bounded: the coldest resident replica is evicted
        var res = models.filter(function (m) { return m.warm; });
        if (res.length >= 3) {
          res.sort(function (a, b) { return a.heat - b.heat; })[0].warm = false;
        }
        pick.warm = true;
      }
      packets.push({ p: 0, target: pick, y0: H * (0.3 + Math.random() * 0.4) });
    }

    var last = 0;
    function frame(ts) {
      var dt = Math.min(50, ts - (last || ts));
      last = ts;
      t += dt;

      ctx.clearRect(0, 0, W, H);

      // arcs from the entry point to each replica
      var ex = W * 0.34, ey = H * 0.5;
      ctx.lineWidth = 0.7;
      models.forEach(function (m) {
        ctx.strokeStyle = pal.line;
        ctx.globalAlpha = m.warm ? 0.20 : 0.09;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.quadraticCurveTo((ex + m.x) / 2, (ey + m.y) / 2 - 18, m.x, m.y);
        ctx.stroke();
      });

      // replicas
      models.forEach(function (m) {
        m.heat += ((m.warm ? 1 : 0) - m.heat) * 0.02;
        if (m.spin > 0) m.spin = Math.max(0, m.spin - dt / 900);

        ctx.globalAlpha = 0.18 + 0.5 * m.heat;
        ctx.strokeStyle = m.heat > 0.5 ? pal.warm : pal.line;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r + 5.5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 0.25 + 0.65 * m.heat;
        ctx.fillStyle = m.heat > 0.5 ? pal.warm : pal.line;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();

        if (m.spin > 0) {          // cold start: an expanding ring
          ctx.globalAlpha = 0.42 * m.spin;
          ctx.strokeStyle = pal.warm;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r + 6 + (1 - m.spin) * 22, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // entry point
      ctx.globalAlpha = 0.30;
      ctx.fillStyle = pal.text;
      ctx.beginPath();
      ctx.arc(ex, ey, 2.4, 0, Math.PI * 2);
      ctx.fill();

      // requests in flight
      packets = packets.filter(function (pk) {
        pk.p += dt / 1250;
        if (pk.p >= 1) { pk.target.heat = 1; return false; }
        var e = pk.p * pk.p * (3 - 2 * pk.p);        // smoothstep
        var mx = (ex + pk.target.x) / 2;
        var my = (ey + pk.target.y) / 2 - 18;
        var x = (1 - e) * (1 - e) * ex + 2 * (1 - e) * e * mx + e * e * pk.target.x;
        var y = (1 - e) * (1 - e) * ey + 2 * (1 - e) * e * my + e * e * pk.target.y;
        ctx.globalAlpha = 0.75 * Math.sin(Math.PI * pk.p);
        ctx.fillStyle = pal.warm;
        ctx.beginPath();
        ctx.arc(x, y, 1.9, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      ctx.globalAlpha = 1;
      if (t > 1400 && packets.length < 5 && Math.random() < 0.022) emit();
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf) raf = requestAnimationFrame(frame); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; last = 0; } }

    layout();
    start();

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { layout(); }, 160);
    }, { passive: true });

    // Do not burn a phone battery painting a hero nobody is looking at.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) start(); else stop(); });
      }, { threshold: 0 }).observe(hero);
    }

    // repaint on theme change so the accent follows
    if (window.MutationObserver) {
      new MutationObserver(function () { pal = palette(); })
        .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', function () { pal = palette(); });
    }
  }

  /* ======================================================================= *
   * Tag the elements that should reveal, then wire everything.
   * ======================================================================= */
  function tagReveals() {
    var groups = [
      ['.hero-name, .hero-role, .hero-affil, .hero-summary, .tag-row, .link-pills, .stat-grid', 'up'],
      ['.section-head, .section-sub', 'up'],
      ['#pub-list .pub', 'up'],
      ['.project-card', 'scale'],
      ['.timeline-item', 'left'],
      ['.award', 'up'],
      ['.news-item', 'fade'],
      ['.kv-list', 'up'],
      ['.filter-bar', 'up']
    ];
    groups.forEach(function (g) {
      $$(g[0]).forEach(function (el) {
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', g[1]);
      });
    });
  }

  function boot() {
    initProgress();
    initCopyBib();
    initMagnetic();

    if (MOTION) {
      tagReveals();
      initReveals();
      initCounters();
      initFlipFilter();
      initSpotlight();
      initHeroCanvas();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
