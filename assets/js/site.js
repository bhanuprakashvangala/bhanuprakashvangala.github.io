/* =============================================================================
 * site.js: behaviour for the academic homepage.
 *
 * No dependencies. Everything degrades gracefully: with JS off you still get
 * the full content, every publication visible, and working anchor links.
 * ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---------------------------------------------------------------------- *
   * Colour scheme toggle
   * The pre-paint script in <head> has already applied any saved choice;
   * here we only wire the button and keep it in sync with the system setting.
   * ---------------------------------------------------------------------- */
  function initTheme() {
    var btn = $('#theme-toggle');
    if (!btn) return;

    var systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    function currentlyDark() {
      var attr = document.documentElement.getAttribute('data-theme');
      if (attr) return attr === 'dark';
      return !!(systemDark && systemDark.matches);
    }

    function sync() {
      var dark = currentlyDark();
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    btn.addEventListener('click', function () {
      var next = currentlyDark() ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('bv-theme', next); } catch (e) { /* storage blocked */ }
      sync();
    });

    // Follow the OS while the visitor has not made an explicit choice.
    if (systemDark && systemDark.addEventListener) {
      systemDark.addEventListener('change', function () {
        if (!document.documentElement.getAttribute('data-theme')) sync();
      });
    }

    sync();
  }

  /* ---------------------------------------------------------------------- *
   * External links open in a new tab.
   * This replaces a `<base target="_blank">` that used to sit in <head> and
   * forced *every* link, including in-page anchors, into a new tab.
   * ---------------------------------------------------------------------- */
  function initExternalLinks() {
    $$('a[href]').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      if (a.hasAttribute('target')) return;
      if (a.hostname && a.hostname !== window.location.hostname) {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  /* ---------------------------------------------------------------------- *
   * Scroll spy: highlight the nav link for the section in view.
   * ---------------------------------------------------------------------- */
  function initScrollSpy() {
    var navLinks = $$('#site-nav a[data-spy]');
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    var byId = {};
    var targets = [];
    navLinks.forEach(function (a) {
      var id = a.getAttribute('data-spy');
      var el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('data-spy-for', id);
      byId[id] = a;
      targets.push(el);
    });
    if (!targets.length) return;

    var visible = {};

    function paint() {
      // Prefer the topmost visible section so the highlight matches reading order.
      var best = null;
      targets.forEach(function (el) {
        if (!visible[el.getAttribute('data-spy-for')]) return;
        if (!best || el.getBoundingClientRect().top < best.getBoundingClientRect().top) best = el;
      });
      navLinks.forEach(function (a) { a.classList.remove('is-active'); });
      var key = best && best.getAttribute('data-spy-for');
      if (key && byId[key]) byId[key].classList.add('is-active');
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        visible[e.target.getAttribute('data-spy-for')] = e.isIntersecting;
      });
      paint();
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------------- *
   * News: collapse the long tail behind a toggle.
   * ---------------------------------------------------------------------- */
  function initNews() {
    var btn = $('#news-more');
    var feed = $('#news-feed');
    if (!btn || !feed) return;

    // The stylesheet hides .news-feed.is-collapsed .news-item:nth-child(n+9),
    // so the toggle is only meaningful past that count.
    var items = $$('.news-item', feed);
    if (items.length <= 8) { btn.hidden = true; return; }

    var labelClosed = btn.textContent;
    feed.classList.add('is-collapsed');

    btn.addEventListener('click', function () {
      var open = feed.classList.toggle('is-collapsed') === false;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Show fewer updates' : labelClosed;
      if (!open) {
        feed.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }

  /* ---------------------------------------------------------------------- *
   * Publication filtering by topic tag.
   * ---------------------------------------------------------------------- */
  function initPubFilter() {
    var chips = $$('.filter-chip');
    var pubs = $$('#pub-list .pub');
    var count = $('#filter-count');
    var empty = $('#pub-empty');
    if (!chips.length || !pubs.length) return;

    function apply(filter) {
      var shown = 0;
      pubs.forEach(function (li) {
        var tags = (li.getAttribute('data-tags') || '').split(/\s+/);
        var match = filter === 'all' || tags.indexOf(filter) !== -1;
        li.classList.toggle('is-hidden', !match);
        if (match) shown++;
      });
      if (count) {
        count.textContent = filter === 'all'
          ? pubs.length + ' publications'
          : shown + ' of ' + pubs.length;
      }
      if (empty) empty.classList.toggle('is-hidden', shown !== 0);
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        apply(chip.getAttribute('data-filter'));
      });
    });

    apply('all');
  }

  /* ---------------------------------------------------------------------- *
   * Lightbox for award and talk photographs.
   * ---------------------------------------------------------------------- */
  function initLightbox() {
    var box = $('#lightbox');
    var img = $('#lightbox-img');
    var closeBtn = $('#lightbox-close');
    var triggers = $$('.lightbox-trigger');
    if (!box || !img || !triggers.length) return;

    var lastFocus = null;

    function open(src, alt) {
      lastFocus = document.activeElement;
      img.setAttribute('src', src);
      img.setAttribute('alt', alt || '');
      box.classList.add('is-open');
      document.body.classList.add('has-lightbox');
      if (closeBtn) closeBtn.focus();
    }

    function close() {
      box.classList.remove('is-open');
      document.body.classList.remove('has-lightbox');
      img.setAttribute('src', '');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    triggers.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        var inner = t.querySelector('img');
        open(t.getAttribute('href'), inner ? inner.getAttribute('alt') : '');
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });
  }

  /* ---------------------------------------------------------------------- *
   * Back to top.
   * ---------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    var ticking = false;
    function update() {
      btn.classList.toggle('is-visible', window.pageYOffset > 400);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------------- *
   * Skip link, injected so every page gets one without touching the layout.
   * ---------------------------------------------------------------------- */
  function initSkipLink() {
    if ($('.skip-link')) return;
    var a = document.createElement('a');
    a.className = 'skip-link';
    a.href = '#main';
    a.textContent = 'Skip to content';
    document.body.insertBefore(a, document.body.firstChild);
  }

  /* CV page: browser print dialog. */
  function initPrint() {
    var btn = $('#cv-print');
    if (btn) btn.addEventListener('click', function () { window.print(); });
  }

  function boot() {
    initSkipLink();
    initTheme();
    initExternalLinks();
    initScrollSpy();
    initNews();
    initPubFilter();
    initLightbox();
    initBackToTop();
    initPrint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
