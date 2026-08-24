/* =============================================================================
 * demos.js: three in-browser demonstrations of published work.
 *
 *   1. Dependency & reproducibility checker
 *      Static analysis of Python imports against a declared environment,
 *      reporting hidden / bloat / unpinned dependencies. Faithful to the
 *      taxonomy in "AI-Generated Code Is Not Reproducible (Yet)" (AAAI 2026)
 *      and "The Environment Specification Gap" (under review, TMLR).
 *      Nothing is executed and nothing leaves the browser.
 *
 *   2. Pick-and-Spin router
 *      Thompson Sampling over a model pool plus a cold-start state machine
 *      governing GPU residency, from "Efficient Multi-Model Orchestration for
 *      Self-Hosted LLMs" (AAAI 2026) and "Pick and Spin" (IEEE CLOUD 2026).
 *
 *   3. Reproducibility agent
 *      Plan / tool-call / result / answer loop that calls demo 1 as its tool.
 *      Requires a configured model endpoint; otherwise it says so plainly.
 * ========================================================================== */
(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  if (!$('.demo-tabs')) return;   // not the demos page

  /* ======================================================================= *
   * Tabs
   * ======================================================================= */
  function initTabs() {
    var tabs = $$('.demo-tab');
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    function select(i, focus) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (panels[j]) {
          panels[j].classList.toggle('is-active', on);
          panels[j].hidden = !on;
        }
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
      t.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next !== null) { e.preventDefault(); select(next, true); }
      });
    });

    select(0);
  }

  /* ======================================================================= *
   * DEMO 1: dependency & reproducibility checker
   * ======================================================================= */

  // Python standard library (3.11). Imports resolving here need no declaration.
  var STDLIB = ('abc argparse array ast asyncio base64 binascii bisect builtins bz2 calendar ' +
    'cmath cmd codecs collections colorsys concurrent configparser contextlib contextvars copy ' +
    'copyreg csv ctypes curses dataclasses datetime dbm decimal difflib dis doctest email ' +
    'encodings enum errno faulthandler fcntl filecmp fileinput fnmatch fractions ftplib ' +
    'functools gc getopt getpass gettext glob graphlib grp gzip hashlib heapq hmac html http ' +
    'imaplib importlib inspect io ipaddress itertools json keyword linecache locale logging ' +
    'lzma mailbox marshal math mimetypes mmap multiprocessing netrc numbers operator os ' +
    'pathlib pdb pickle pickletools pipes pkgutil platform plistlib poplib posixpath pprint ' +
    'profile pstats pty pwd py_compile queue quopri random re readline reprlib resource ' +
    'runpy sched secrets select selectors shelve shlex shutil signal site smtplib socket ' +
    'socketserver sqlite3 ssl stat statistics string stringprep struct subprocess symtable ' +
    'sys sysconfig syslog tabnanny tarfile tempfile termios textwrap threading time timeit ' +
    'tkinter token tokenize tomllib trace traceback tracemalloc tty types typing unicodedata ' +
    'unittest urllib uuid venv warnings wave weakref webbrowser wsgiref xml xmlrpc zipapp ' +
    'zipfile zipimport zlib zoneinfo __future__').split(' ');
  var STDSET = {};
  STDLIB.forEach(function (m) { STDSET[m] = true; });

  // Import name -> distribution name on PyPI. This mismatch is itself one of the
  // most common causes of a broken environment file.
  var DIST = {
    cv2: 'opencv-python', sklearn: 'scikit-learn', PIL: 'Pillow', yaml: 'PyYAML',
    bs4: 'beautifulsoup4', dateutil: 'python-dateutil', serial: 'pyserial',
    Crypto: 'pycryptodome', OpenSSL: 'pyOpenSSL', jwt: 'PyJWT', dotenv: 'python-dotenv',
    skimage: 'scikit-image', magic: 'python-magic', docx: 'python-docx',
    pptx: 'python-pptx', fitz: 'PyMuPDF', attr: 'attrs', google: 'google-api-python-client',
    psycopg2: 'psycopg2-binary', MySQLdb: 'mysqlclient', win32com: 'pywin32',
    pkg_resources: 'setuptools', torchvision: 'torchvision', usb: 'pyusb',
    lxml: 'lxml', zmq: 'pyzmq', nacl: 'PyNaCl', slugify: 'python-slugify'
  };

  // Distributions whose wheels need system libraries that pip will not install.
  var SYSTEM_DEPS = {
    'opencv-python': 'libGL.so.1 and libglib2.0 (apt install libgl1 libglib2.0-0)',
    psycopg2: 'libpq-dev and a C toolchain',
    'psycopg2-binary': 'none at runtime, but pins to a specific libpq build',
    mysqlclient: 'libmysqlclient-dev and a C toolchain',
    pygraphviz: 'graphviz and graphviz-dev',
    'python-magic': 'libmagic1',
    cartopy: 'libgeos and libproj',
    PyMuPDF: 'no system package, but wheels differ sharply by platform'
  };

  // A sample of genuine PyPI names, used only to say "verified" vs "unverified".
  var KNOWN = ('numpy pandas scipy torch tensorflow keras scikit-learn scikit-image ' +
    'matplotlib seaborn plotly requests httpx aiohttp flask django fastapi uvicorn ' +
    'gunicorn pydantic sqlalchemy alembic celery redis boto3 click typer rich tqdm ' +
    'pytest pytest-cov black flake8 mypy ruff isort transformers datasets tokenizers ' +
    'accelerate peft trl sentencepiece huggingface-hub openai anthropic langchain ' +
    'llama-index chromadb faiss-cpu sentence-transformers opencv-python Pillow PyYAML ' +
    'beautifulsoup4 lxml python-dateutil pyserial pycryptodome pyOpenSSL PyJWT ' +
    'python-dotenv python-magic python-docx python-pptx PyMuPDF attrs psycopg2-binary ' +
    'mysqlclient pywin32 setuptools wheel pip xgboost lightgbm catboost statsmodels ' +
    'networkx sympy numba dask polars pyarrow h5py netCDF4 xarray zarr joblib ' +
    'jupyter notebook ipython ipykernel streamlit gradio wandb mlflow tensorboard ' +
    'torchvision torchaudio timm albumentations pyzmq PyNaCl python-slugify ' +
    'google-api-python-client protobuf grpcio kubernetes docker prometheus-client ' +
    'ngboost shap optuna').split(' ');
  var KNOWNSET = {};
  KNOWN.forEach(function (k) { KNOWNSET[k.toLowerCase()] = true; });

  function normalise(name) {
    return String(name).toLowerCase().replace(/[_.]+/g, '-');
  }

  /** Extract top-level imported module names from Python source. */
  function parseImports(src) {
    var found = {};
    var lines = String(src).split('\n');
    var inString = false;
    var fence = null;

    lines.forEach(function (raw, idx) {
      var line = raw;

      // Skip triple-quoted blocks so docstring examples are not counted.
      var tq = line.match(/("""|''')/g);
      if (inString) {
        if (tq && tq.indexOf(fence) !== -1) { inString = false; fence = null; }
        return;
      }
      if (tq && tq.length === 1) { inString = true; fence = tq[0]; return; }

      line = line.replace(/#.*$/, '').trim();
      if (!line) return;

      var m = line.match(/^import\s+(.+)$/);
      if (m) {
        m[1].split(',').forEach(function (part) {
          var mod = part.trim().split(/\s+as\s+/)[0].trim().split('.')[0];
          if (mod) found[mod] = found[mod] || idx + 1;
        });
        return;
      }

      m = line.match(/^from\s+([A-Za-z_][\w.]*)\s+import\s/);
      if (m) {
        var mod = m[1].split('.')[0];
        if (mod) found[mod] = found[mod] || idx + 1;
      }
    });

    return Object.keys(found).map(function (name) {
      return { module: name, line: found[name] };
    });
  }

  /** Parse requirements.txt / environment.yml / pyproject-ish dependency lines. */
  function parseRequirements(src) {
    var out = [];
    String(src).split('\n').forEach(function (raw) {
      var line = raw.replace(/#.*$/, '').trim();
      if (!line) return;
      // Strip requirements.txt flags, YAML list markers and TOML quoting.
      line = line.replace(/^-\s+/, '').replace(/^["']|["'],?$/g, '').trim();
      if (!line || /^(-{1,2}[a-z]|dependencies:|name:|channels:|pip:)/i.test(line)) return;

      var m = line.match(/^([A-Za-z0-9._\-]+)\s*(\[[^\]]*\])?\s*(.*)$/);
      if (!m) return;

      var spec = (m[3] || '').trim();
      out.push({
        name: m[1],
        key: normalise(m[1]),
        spec: spec,
        pinned: /^(==|===)/.test(spec) || /^=[\d]/.test(spec)
      });
    });
    return out;
  }

  function analyse(code, reqsText) {
    var imports = parseImports(code);
    var reqs = parseRequirements(reqsText);
    var declared = {};
    reqs.forEach(function (r) { declared[r.key] = r; });

    var findings = [];
    var thirdParty = [];
    var satisfied = 0;
    var usedKeys = {};

    imports.forEach(function (imp) {
      if (STDSET[imp.module]) return;
      var dist = DIST[imp.module] || imp.module;
      var key = normalise(dist);
      thirdParty.push({ imp: imp, dist: dist, key: key });
      usedKeys[key] = true;

      var rec = declared[key];
      if (!rec) {
        findings.push({
          sev: 'error',
          tag: 'hidden',
          title: '<code>' + esc(imp.module) + '</code> is imported but never declared',
          detail: 'Line ' + imp.line + ' imports <code>' + esc(imp.module) + '</code>, which ' +
            (DIST[imp.module]
              ? 'is provided by the distribution <code>' + esc(dist) + '</code>. The import name and the package name differ, a frequent source of this gap.'
              : 'is not in the standard library.') +
            ' A fresh environment built from this specification raises <code>ModuleNotFoundError</code>.'
        });
        return;
      }

      satisfied++;
      if (!rec.pinned) {
        findings.push({
          sev: 'warn',
          tag: 'unpinned',
          title: '<code>' + esc(rec.name) + '</code> is declared without an exact version',
          detail: rec.spec
            ? 'Declared as <code>' + esc(rec.name + ' ' + rec.spec) + '</code>. A range resolves to whatever is newest at install time, so two builds of the same commit can differ.'
            : 'Declared with no version constraint at all. This is the single largest source of drift between the author\'s run and everyone else\'s.'
        });
      }

      if (SYSTEM_DEPS[dist]) {
        findings.push({
          sev: 'info',
          tag: 'system',
          title: '<code>' + esc(dist) + '</code> also needs system libraries',
          detail: 'Requires ' + esc(SYSTEM_DEPS[dist]) + '. pip cannot install these, so the ' +
            'environment file is complete and the build still fails, the runtime dependency ' +
            'multiplier the paper measures at roughly 15x.'
        });
      }
    });

    // Declared but never imported: bloat, or unverifiable names.
    reqs.forEach(function (r) {
      if (usedKeys[r.key]) return;
      if (KNOWNSET[r.key]) {
        findings.push({
          sev: 'info',
          tag: 'bloat',
          title: '<code>' + esc(r.name) + '</code> is declared but never imported',
          detail: 'Nothing in the source uses it. Bloat inflates the image, widens the ' +
            'vulnerability surface, and slows every rebuild.'
        });
      } else {
        findings.push({
          sev: 'warn',
          tag: 'unverified',
          title: '<code>' + esc(r.name) + '</code> is declared, never imported, and unrecognised',
          detail: 'It is not used by this code and does not match a package in the offline ' +
            'reference list. Candidate <em>phantom</em> dependency. Confirming that needs a ' +
            'live index lookup, which this in-browser demo deliberately does not make.'
        });
      }
    });

    // Duplicate declarations quietly shadow one another.
    var seen = {};
    reqs.forEach(function (r) {
      if (seen[r.key]) {
        findings.push({
          sev: 'warn',
          tag: 'duplicate',
          title: '<code>' + esc(r.name) + '</code> is declared twice',
          detail: 'Conflicting constraints for one distribution; the resolver silently picks one.'
        });
      }
      seen[r.key] = true;
    });

    if (thirdParty.length && !reqs.length) {
      findings.push({
        sev: 'error',
        tag: 'missing file',
        title: 'No environment specification supplied',
        detail: 'The code has ' + thirdParty.length + ' third-party import' +
          (thirdParty.length === 1 ? '' : 's') + ' and nothing declares them.'
      });
    }

    if (!findings.length) {
      findings.push({
        sev: 'ok',
        tag: 'ok',
        title: 'Every third-party import is declared and pinned',
        detail: 'This specification should rebuild deterministically on another machine of the ' +
          'same platform.'
      });
    }

    var score = thirdParty.length ? satisfied / thirdParty.length : (reqs.length ? 1 : 0);
    var errors = findings.filter(function (f) { return f.sev === 'error'; }).length;
    var warns = findings.filter(function (f) { return f.sev === 'warn'; }).length;

    var verdict, sev;
    if (errors) { verdict = 'Not reproducible'; sev = 'fail'; }
    else if (warns) { verdict = 'Reproducible with drift risk'; sev = 'warn'; }
    else { verdict = 'Reproducible'; sev = 'pass'; }

    // Weight the headline number so warnings cost something without dominating.
    var pct = Math.round(Math.max(0, Math.min(1, score - warns * 0.06)) * 100);

    return {
      verdict: verdict, sev: sev, pct: pct, findings: findings,
      total: thirdParty.length, satisfied: satisfied,
      sub: thirdParty.length
        ? satisfied + ' of ' + thirdParty.length + ' third-party imports declared'
        : 'No third-party imports found'
    };
  }

  var SEV_ORDER = { error: 0, warn: 1, info: 2, ok: 3 };

  function renderAnalysis(result) {
    var card = el('div', 'result-card');

    var head = el('div', 'result-head');
    var v = el('span', 'verdict is-' + result.sev, result.verdict);
    head.appendChild(v);
    head.appendChild(el('span', 'result-sub', result.sub));
    card.appendChild(head);

    var meter = el('div', 'meter');
    meter.setAttribute('role', 'progressbar');
    meter.setAttribute('aria-valuemin', '0');
    meter.setAttribute('aria-valuemax', '100');
    meter.setAttribute('aria-valuenow', String(result.pct));
    meter.setAttribute('aria-label', 'Reproducibility score');
    var fill = el('div', 'meter-fill is-' + result.sev);
    meter.appendChild(fill);
    card.appendChild(meter);

    var list = el('ul', 'finding-list');
    result.findings
      .slice()
      .sort(function (a, b) { return SEV_ORDER[a.sev] - SEV_ORDER[b.sev]; })
      .forEach(function (f) {
        var li = el('li', 'finding is-' + f.sev);
        var ic = el('span', 'finding-icon', '!');
        ic.setAttribute('aria-hidden', 'true');
        li.appendChild(ic);

        var body = el('div', 'finding-body');
        var t = el('p', 'finding-title');
        t.innerHTML = f.title;
        body.appendChild(t);
        var d = el('p', 'finding-detail');
        d.innerHTML = f.detail;
        body.appendChild(d);
        li.appendChild(body);

        li.appendChild(el('span', 'finding-tag', f.tag));
        list.appendChild(li);
      });
    card.appendChild(list);

    // Animate the meter after layout so the width transition actually runs.
    requestAnimationFrame(function () { fill.style.width = result.pct + '%'; });
    return card;
  }

  var EXAMPLE_CODE = [
    '"""Fine-tune a classifier and export ONNX. Written by a coding agent."""',
    'import os',
    'import json',
    'import numpy as np',
    'import pandas as pd',
    'import torch',
    'import torch.nn as nn',
    'from sklearn.model_selection import train_test_split',
    'from sklearn.metrics import f1_score',
    'import cv2',
    'import yaml',
    'from PIL import Image',
    'from tqdm import tqdm',
    '',
    'def load_config(path):',
    '    with open(path) as fh:',
    '        return yaml.safe_load(fh)',
    '',
    'def main():',
    '    cfg = load_config("config.yaml")',
    '    df = pd.read_csv(cfg["data"])',
    '    train, test = train_test_split(df, test_size=0.2)',
    '    model = nn.Linear(cfg["dim"], 2)',
    '    for _ in tqdm(range(cfg["epochs"])):',
    '        pass',
    '    print(f1_score([0, 1], [0, 1]))',
    '',
    'if __name__ == "__main__":',
    '    main()'
  ].join('\n');

  var EXAMPLE_REQS = [
    'numpy',
    'pandas==2.1.4',
    'torch>=2.0',
    'tqdm==4.66.1',
    'requests==2.31.0',
    'pyyaml-utils==0.3.1'
  ].join('\n');

  function initRepro() {
    var code = $('#repro-code');
    var reqs = $('#repro-reqs');
    var out = $('#repro-out');
    if (!code || !out) return;

    function run() {
      out.setAttribute('aria-busy', 'true');
      out.innerHTML = '';
      if (!code.value.trim()) {
        var empty = el('div', 'empty-state', 'Paste some Python first, or load the example.');
        out.appendChild(empty);
        out.setAttribute('aria-busy', 'false');
        return;
      }
      out.appendChild(renderAnalysis(analyse(code.value, reqs ? reqs.value : '')));
      out.setAttribute('aria-busy', 'false');
    }

    $('#repro-run').addEventListener('click', run);

    $('#repro-example').addEventListener('click', function () {
      code.value = EXAMPLE_CODE;
      if (reqs) reqs.value = EXAMPLE_REQS;
      run();
    });

    $('#repro-clear').addEventListener('click', function () {
      code.value = '';
      if (reqs) reqs.value = '';
      out.innerHTML = '';
      out.appendChild(el('div', 'empty-state', 'Cleared. Load the example, or paste your own code.'));
    });

    [code, reqs].forEach(function (t) {
      if (!t) return;
      t.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); }
      });
    });

    // Exposed so the agent demo can call the analyser as a tool.
    window.BVRepro = { analyse: analyse, example: { code: EXAMPLE_CODE, reqs: EXAMPLE_REQS } };
  }

  /* ======================================================================= *
   * DEMO 2: Pick-and-Spin router
   * ======================================================================= */

  // Capability profiles on [0,1]. Cost is relative GPU-hours, spin is cold-start
  // seconds. These mirror the self-hosted pool the paper evaluates.
  var MODELS = [
    { id: 'qwen3',        cap: { code: 0.86, reason: 0.94, long: 0.95, general: 0.90, fast: 0.42 }, cost: 1.00, spin: 42, tok: 38 },
    { id: 'kimi',         cap: { code: 0.95, reason: 0.88, long: 0.90, general: 0.82, fast: 0.45 }, cost: 0.95, spin: 38, tok: 41 },
    { id: 'glm-5',        cap: { code: 0.92, reason: 0.86, long: 0.80, general: 0.84, fast: 0.52 }, cost: 0.82, spin: 33, tok: 52 },
    { id: 'minimax-m2',   cap: { code: 0.89, reason: 0.83, long: 0.86, general: 0.81, fast: 0.58 }, cost: 0.74, spin: 29, tok: 60 },
    { id: 'gpt-oss',      cap: { code: 0.78, reason: 0.80, long: 0.70, general: 0.88, fast: 0.70 }, cost: 0.45, spin: 18, tok: 78 },
    { id: 'gemma4-12b',   cap: { code: 0.62, reason: 0.64, long: 0.55, general: 0.76, fast: 0.88 }, cost: 0.22, spin: 9,  tok: 120 },
    { id: 'qwen3-small',  cap: { code: 0.58, reason: 0.60, long: 0.62, general: 0.72, fast: 0.94 }, cost: 0.15, spin: 6,  tok: 145 }
  ];

  var INTENT = [
    { key: 'code',    re: /\b(code|refactor|debug|function|api|python|javascript|typescript|sql|bug|test|compile|script|repo)\b/i },
    { key: 'long',    re: /\b(long|document|paper|book|thesis|corpus|entire|whole file|context|summari[sz]e)\b/i },
    { key: 'reason',  re: /\b(prove|reason|why|analy[sz]e|derive|plan|strategy|trade-?off|compare|evaluate|math)\b/i },
    { key: 'fast',    re: /\b(quick|fast|short|brief|simple|classify|tag|extract|yes\/no|one-liner)\b/i }
  ];

  function classify(task) {
    var w = { code: 0, reason: 0, long: 0, general: 0.35, fast: 0 };
    var hit = false;
    INTENT.forEach(function (i) {
      if (i.re.test(task)) { w[i.key] += 0.75; hit = true; }
    });
    if (task.length > 240) { w.long += 0.4; }
    if (task.length < 60 && !hit) { w.fast += 0.3; }
    if (!hit) w.general += 0.5;

    var sum = Object.keys(w).reduce(function (a, k) { return a + w[k]; }, 0) || 1;
    Object.keys(w).forEach(function (k) { w[k] = w[k] / sum; });
    return w;
  }

  // Beta posterior sampling via two gamma draws (Marsaglia-Tsang).
  function gamma(k) {
    if (k < 1) return gamma(k + 1) * Math.pow(Math.random(), 1 / k);
    var d = k - 1 / 3, c = 1 / Math.sqrt(9 * d);
    for (;;) {
      var x, v;
      do { x = normal(); v = 1 + c * x; } while (v <= 0);
      v = v * v * v;
      var u = Math.random();
      if (u < 1 - 0.0331 * x * x * x * x) return d * v;
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
  }
  function normal() {
    var u = 0, v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
  function betaSample(a, b) {
    var x = gamma(a), y = gamma(b);
    return x / (x + y);
  }

  var Cluster = {
    slots: 2,
    pref: 50,          // 0 = latency first, 100 = cost first
    warm: [],          // model ids currently resident, most recent last
    posterior: {},
    requests: 0,
    coldStarts: 0,
    gpuSeconds: 0,
    busySeconds: 0,

    reset: function () {
      this.warm = [];
      this.posterior = {};
      MODELS.forEach(function (m) { Cluster.posterior[m.id] = { a: 1, b: 1 }; });
      this.requests = 0;
      this.coldStarts = 0;
      this.gpuSeconds = 0;
      this.busySeconds = 0;
    },

    route: function (task) {
      var w = classify(task);
      var latencyWeight = (100 - this.pref) / 100;
      var costWeight = this.pref / 100;
      var self = this;

      var scored = MODELS.map(function (m) {
        var fit = w.code * m.cap.code + w.reason * m.cap.reason +
          w.long * m.cap.long + w.general * m.cap.general + w.fast * m.cap.fast;

        var post = self.posterior[m.id];
        var theta = betaSample(post.a, post.b);          // Thompson Sampling draw

        var isWarm = self.warm.indexOf(m.id) !== -1;
        // Cold start is amortised against the request, so it hurts latency-first
        // routing far more than cost-first routing.
        var startPenalty = isWarm ? 0 : (m.spin / 60) * latencyWeight * 0.9;
        var costTerm = (1 - m.cost) * costWeight * 0.45;
        var speedTerm = (m.tok / 145) * latencyWeight * 0.35;

        var score = fit * 0.62 + theta * 0.12 + costTerm + speedTerm - startPenalty;

        return {
          model: m, fit: fit, theta: theta, warm: isWarm,
          score: Math.max(0.01, Math.min(1, score))
        };
      });

      scored.sort(function (a, b) { return b.score - a.score; });
      var pick = scored[0];

      // ---- cold-start state machine -------------------------------------
      this.requests++;
      var spun = false;
      if (!pick.warm) {
        this.coldStarts++;
        spun = true;
        this.warm.push(pick.model.id);
        while (this.warm.length > this.slots) this.warm.shift();   // LRU eviction
        this.gpuSeconds += pick.model.spin;
      } else {
        // Refresh recency so a hot model is not evicted next.
        this.warm.splice(this.warm.indexOf(pick.model.id), 1);
        this.warm.push(pick.model.id);
      }

      var serviceSeconds = 400 / pick.model.tok;
      this.gpuSeconds += serviceSeconds;
      this.busySeconds += serviceSeconds;

      // Reward the arm: a good fit served without a cold start is a success.
      var post = this.posterior[pick.model.id];
      var success = pick.fit > 0.7 && !spun;
      if (success) post.a += 1; else post.b += 0.6;

      return { scored: scored, pick: pick, spun: spun, weights: w };
    },

    utilisation: function () {
      return this.gpuSeconds ? this.busySeconds / this.gpuSeconds : 0;
    },
    coldRate: function () {
      return this.requests ? this.coldStarts / this.requests : 0;
    }
  };

  function topIntent(w) {
    var best = 'general', v = -1;
    Object.keys(w).forEach(function (k) { if (w[k] > v) { v = w[k]; best = k; } });
    return { code: 'code-heavy', reason: 'reasoning-heavy', long: 'long-context',
      fast: 'latency-sensitive', general: 'general-purpose' }[best];
  }

  function renderRoute(res) {
    var wrap = el('div', 'router-viz');

    var pickLine = el('div', 'router-pick');
    pickLine.appendChild(document.createTextNode('Selected: '));
    pickLine.appendChild(el('strong', null, res.pick.model.id));

    var why = el('span', 'router-why',
      'Classified as ' + topIntent(res.weights) + '. ' +
      (res.spun
        ? 'No warm replica, so it spun one up, about ' + res.pick.model.spin + 's cold start.'
        : 'Served from a warm replica, no cold start.') +
      ' Capability fit ' + res.pick.fit.toFixed(2) +
      ', relative GPU cost ' + res.pick.model.cost.toFixed(2) + '.');
    pickLine.appendChild(why);
    wrap.appendChild(pickLine);

    var list = el('ul', 'router-list');
    res.scored.forEach(function (s) {
      var li = el('li', 'router-model' + (s === res.pick ? ' is-picked' : ''));
      li.appendChild(el('span', 'router-name', s.model.id + (s.warm ? ' (warm)' : '')));
      var bar = el('span', 'router-bar');
      var barFill = el('span', 'router-bar-fill');
      bar.appendChild(barFill);
      li.appendChild(bar);
      li.appendChild(el('span', 'router-score', s.score.toFixed(2)));
      list.appendChild(li);
      requestAnimationFrame(function () {
        barFill.style.width = Math.round(s.score * 100) + '%';
      });
    });
    wrap.appendChild(list);

    // Cluster telemetry, the numbers the paper reports.
    var card = el('div', 'result-card');
    var head = el('div', 'result-head');
    var util = Cluster.utilisation();
    head.appendChild(el('span',
      'verdict is-' + (util > 0.55 ? 'pass' : util > 0.35 ? 'warn' : 'fail'),
      'GPU utilisation ' + Math.round(util * 100) + '%'));
    head.appendChild(el('span', 'result-sub',
      Cluster.requests + ' request' + (Cluster.requests === 1 ? '' : 's') + ' · ' +
      Math.round(Cluster.coldRate() * 100) + '% cold starts · ' +
      Cluster.warm.length + '/' + Cluster.slots + ' slots resident (' +
      (Cluster.warm.join(', ') || 'none') + ')'));
    card.appendChild(head);

    var meter = el('div', 'meter');
    meter.setAttribute('role', 'progressbar');
    meter.setAttribute('aria-valuemin', '0');
    meter.setAttribute('aria-valuemax', '100');
    meter.setAttribute('aria-valuenow', String(Math.round(util * 100)));
    meter.setAttribute('aria-label', 'GPU utilisation');
    var fill = el('div', 'meter-fill is-' + (util > 0.55 ? 'pass' : util > 0.35 ? 'warn' : 'fail'));
    meter.appendChild(fill);
    card.appendChild(meter);
    requestAnimationFrame(function () { fill.style.width = Math.round(util * 100) + '%'; });

    var frag = document.createDocumentFragment();
    frag.appendChild(wrap);
    frag.appendChild(card);
    return frag;
  }

  var SAMPLE_WORKLOAD = [
    'Refactor this 800-line Python module and add type hints',
    'Summarise the attached 60-page paper on neutron scattering',
    'Classify this support ticket as bug, feature or question',
    'Why does my Kubernetes pod get OOMKilled at 12GB but not 11GB?',
    'Write a quick regex to strip ANSI codes',
    'Debug a failing pytest fixture that leaks a database connection',
    'Compare Thompson Sampling and UCB for this routing problem'
  ];

  function initRouter() {
    var task = $('#router-task');
    var out = $('#router-out');
    if (!task || !out) return;

    Cluster.reset();

    var slots = $('#router-slots');
    var slotsOut = $('#router-slots-out');
    var pref = $('#router-pref');
    var prefOut = $('#router-pref-out');

    function prefLabel(v) {
      if (v <= 20) return 'latency first';
      if (v <= 40) return 'favour latency';
      if (v <= 60) return 'balanced';
      if (v <= 80) return 'favour cost';
      return 'cost first';
    }

    slots.addEventListener('input', function () {
      Cluster.slots = +slots.value;
      slotsOut.textContent = slots.value;
      while (Cluster.warm.length > Cluster.slots) Cluster.warm.shift();
    });
    pref.addEventListener('input', function () {
      Cluster.pref = +pref.value;
      prefOut.textContent = prefLabel(+pref.value);
    });

    function show(text) {
      out.setAttribute('aria-busy', 'true');
      out.innerHTML = '';
      out.appendChild(renderRoute(Cluster.route(text)));
      out.setAttribute('aria-busy', 'false');
    }

    $('#router-run').addEventListener('click', function () {
      var t = task.value.trim();
      if (!t) {
        out.innerHTML = '';
        out.appendChild(el('div', 'empty-state', 'Describe a request first, or try the sample workload.'));
        return;
      }
      show(t);
    });

    $('#router-sample').addEventListener('click', function () {
      // Replay the whole workload so the posterior visibly converges.
      SAMPLE_WORKLOAD.forEach(function (t) { Cluster.route(t); });
      var last = SAMPLE_WORKLOAD[SAMPLE_WORKLOAD.length - 1];
      task.value = last;
      out.setAttribute('aria-busy', 'true');
      out.innerHTML = '';
      out.appendChild(renderRoute(Cluster.route(last)));
      out.setAttribute('aria-busy', 'false');
    });

    $('#router-reset').addEventListener('click', function () {
      Cluster.reset();
      out.innerHTML = '';
      out.appendChild(el('div', 'empty-state', 'Cluster reset. Every model is cold and the router has no history.'));
    });

    task.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        $('#router-run').click();
      }
    });
  }

  /* ======================================================================= *
   * DEMO 3: reproducibility agent
   * ======================================================================= */

  function endpoint() {
    try {
      var o = localStorage.getItem('bv-assistant-endpoint');
      if (o) return o;
    } catch (e) { /* storage blocked */ }
    return (window.BV_ASSISTANT && window.BV_ASSISTANT.endpoint) || '';
  }

  function traceStep(kind, state, html) {
    var li = el('li', 'trace-step is-' + state);
    li.appendChild(el('span', 'trace-kind is-' + kind, kind));
    var body = el('div', 'trace-body');
    body.innerHTML = html;
    li.appendChild(body);
    return li;
  }

  function initAgent() {
    var out = $('#agent-out');
    var runBtn = $('#agent-run');
    var stopBtn = $('#agent-stop');
    var status = $('#agent-status');
    var task = $('#agent-task');
    if (!out || !runBtn) return;

    var controller = null;

    function setEmpty() {
      out.innerHTML = '';
      var box = el('div', 'empty-state');
      if (endpoint()) {
        box.innerHTML = 'Model endpoint configured. Describe a dependency problem and press ' +
          '<strong>Run agent</strong>.';
        runBtn.disabled = false;
        if (status) status.textContent = 'Connected to a self-hosted model.';
      } else {
        box.innerHTML = 'No model endpoint is configured, so this demo is inactive. ' +
          'The other two demos run entirely in your browser and need no server. ' +
          'To enable this one, open the assistant in the corner, choose <strong>settings</strong>, ' +
          'and paste a proxy URL. The API key stays on the server and never reaches this page.';
        runBtn.disabled = true;
        if (status) status.textContent = 'Inactive: no endpoint configured.';
      }
      out.appendChild(box);
    }

    function run() {
      var question = (task.value || '').trim();
      if (!question || !endpoint()) return;

      out.innerHTML = '';
      out.setAttribute('aria-busy', 'true');
      runBtn.disabled = true;
      stopBtn.disabled = false;

      var trace = el('ol', 'agent-trace');
      out.appendChild(trace);

      var plan = traceStep('plan', 'running',
        '<p>Read the question, extract any code and environment file, then call the ' +
        '<code>analyze_dependencies</code> tool before answering.</p>');
      trace.appendChild(plan);

      // Tool call: the checker from demo 1, run locally on whatever the user pasted.
      var codeGuess = question;
      var analysis = window.BVRepro
        ? window.BVRepro.analyse(codeGuess, '')
        : null;

      plan.className = 'trace-step is-done';

      var toolStep = traceStep('tool', 'done',
        '<p><code>analyze_dependencies(source=&hellip;, requirements=&hellip;)</code></p>');
      trace.appendChild(toolStep);

      var resultHtml = analysis
        ? '<p>' + esc(analysis.verdict) + ' &middot; ' + esc(analysis.sub) + '. ' +
          analysis.findings.length + ' finding' + (analysis.findings.length === 1 ? '' : 's') + '.</p>' +
          '<pre>' + esc(analysis.findings.slice(0, 5).map(function (f) {
            return '[' + f.tag + '] ' + f.title.replace(/<[^>]+>/g, '');
          }).join('\n')) + '</pre>'
        : '<p>Analyzer unavailable.</p>';
      trace.appendChild(traceStep('result', 'done', resultHtml));

      var answerStep = traceStep('answer', 'running', '<p></p>');
      trace.appendChild(answerStep);
      var answerBody = answerStep.querySelector('.trace-body p');

      var spinner = el('div', 'spinner');
      spinner.setAttribute('aria-hidden', 'true');
      out.appendChild(spinner);

      controller = new AbortController();
      var timer = setTimeout(function () { if (controller) controller.abort(); }, 60000);

      var context = analysis
        ? 'Static analysis findings:\n' + analysis.findings.map(function (f) {
            return '- [' + f.sev + '/' + f.tag + '] ' + f.title.replace(/<[^>]+>/g, '') +
              ' :: ' + f.detail.replace(/<[^>]+>/g, '');
          }).join('\n')
        : '';

      function done(text, failed) {
        clearTimeout(timer);
        if (spinner.parentNode) spinner.parentNode.removeChild(spinner);
        answerStep.className = 'trace-step is-' + (failed ? 'failed' : 'done');
        answerBody.textContent = text;
        out.setAttribute('aria-busy', 'false');
        runBtn.disabled = false;
        stopBtn.disabled = true;
        controller = null;
      }

      fetch(endpoint(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: 'A user reports this dependency problem:\n\n' + question +
              '\n\nWrite a corrected requirements.txt and explain each change in at most ' +
              'five sentences. Ground your answer in the static analysis below.'
          }],
          context: context,
          model: (window.BV_ASSISTANT && window.BV_ASSISTANT.model) || 'gpt-oss'
        }),
        signal: controller.signal
      }).then(function (res) {
        if (!res.ok) throw new Error('proxy ' + res.status);
        var ct = res.headers.get('content-type') || '';

        if (ct.indexOf('text/event-stream') === -1 || !res.body || !res.body.getReader) {
          return res.json().then(function (d) {
            done(d.content || d.text ||
              (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) ||
              'The model returned nothing.');
          });
        }

        var reader = res.body.getReader();
        var dec = new TextDecoder();
        var buf = '', acc = '';
        function pump() {
          return reader.read().then(function (r) {
            if (r.done) { done(acc || 'The model returned nothing.'); return; }
            buf += dec.decode(r.value, { stream: true });
            var lines = buf.split('\n');
            buf = lines.pop();
            lines.forEach(function (line) {
              line = line.trim();
              if (line.indexOf('data:') !== 0) return;
              var p = line.slice(5).trim();
              if (!p || p === '[DONE]') return;
              try {
                var j = JSON.parse(p);
                var c = j.choices && j.choices[0];
                var delta = (c && ((c.delta && c.delta.content) ||
                  (c.message && c.message.content))) || j.content || '';
                if (delta) { acc += delta; answerBody.textContent = acc; }
              } catch (e) { /* partial frame */ }
            });
            return pump();
          });
        }
        return pump();
      }).catch(function (err) {
        done(err && err.name === 'AbortError'
          ? 'Stopped.'
          : 'Could not reach the model endpoint. The static analysis above still stands, because it ran locally.',
          true);
      });
    }

    runBtn.addEventListener('click', run);
    stopBtn.addEventListener('click', function () { if (controller) controller.abort(); });
    task.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); run(); }
    });

    setEmpty();
    // The assistant's settings panel can turn this on without a reload.
    window.addEventListener('storage', setEmpty);
  }

  function boot() {
    initTabs();
    initRepro();
    initRouter();
    initAgent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
