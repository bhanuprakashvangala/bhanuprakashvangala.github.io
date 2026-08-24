---
permalink: /demos/
title: "Live demos"
excerpt: "Run small in-browser demonstrations of Bhanu Prakash Vangala's research on reproducibility and LLM orchestration."
author_profile: false
---

<div class="section">
<h1>Live demos</h1>
<p class="section-sub">Three of my research contributions, small enough to run in your browser. The first two are faithful, self-contained reimplementations of the published methods: they need no server and no API key. The third talks to a language model, so it only wakes up if an endpoint is configured.</p>
</div>

<div class="demo-tabs" role="tablist" aria-label="Choose a demo">
<button class="demo-tab is-active" role="tab" id="tab-repro" aria-controls="panel-repro" aria-selected="true" tabindex="0">Reproducibility checker</button>
<button class="demo-tab" role="tab" id="tab-router" aria-controls="panel-router" aria-selected="false" tabindex="-1">Model router</button>
<button class="demo-tab" role="tab" id="tab-agent" aria-controls="panel-agent" aria-selected="false" tabindex="-1">Coding agent</button>
</div>

<section class="demo demo-panel is-active" id="panel-repro" role="tabpanel" aria-labelledby="tab-repro" tabindex="0">
<header class="demo-head">
<h2 class="demo-title">Dependency &amp; reproducibility checker</h2>
<p class="demo-desc">Paste Python source and the environment file that is supposed to accompany it. The checker resolves every import to the distribution that actually provides it, then reports the gap between what the code needs and what the environment declares, using the same three-layer analysis used in the paper, with its phantom / hidden / bloat taxonomy.</p>
<p class="demo-cite">Method from <a href="https://arxiv.org/abs/2512.22387"><em>AI-Generated Code Is Not Reproducible (Yet)</em></a>, AAAI 2026 RAI Workshop, and <em>Code That Works, Environments That Don't</em> (under review, AI Magazine).</p>
</header>

<div class="demo-io">
<div class="demo-col">
<label class="demo-label" for="repro-code">Python source</label>
<textarea class="code-input" id="repro-code" spellcheck="false" wrap="off" rows="16" aria-describedby="repro-code-help"></textarea>
<p class="demo-hint" id="repro-code-help">Imports are parsed statically. Nothing is executed.</p>

<label class="demo-label" for="repro-reqs">Declared environment <span class="muted">(requirements.txt, pyproject, or environment.yml)</span></label>
<textarea class="code-input is-compact" id="repro-reqs" spellcheck="false" wrap="off" rows="7"></textarea>

<div class="demo-toolbar">
<button class="btn is-primary" id="repro-run">Analyze</button>
<button class="btn is-ghost" id="repro-example">Load agent-generated example</button>
<button class="btn is-ghost" id="repro-clear">Clear</button>
<span class="demo-hint"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Enter</kbd> to run</span>
</div>
</div>

<div class="demo-col" id="repro-out" aria-live="polite">
<div class="empty-state">Load the example, or paste your own code, then hit <strong>Analyze</strong>.</div>
</div>
</div>
</section>

<section class="demo demo-panel" id="panel-router" role="tabpanel" aria-labelledby="tab-router" hidden tabindex="0">
<header class="demo-head">
<h2 class="demo-title">Pick-and-Spin: cold-start-aware model routing</h2>
<p class="demo-desc">A pool of self-hosted models shares a fixed set of GPUs. Describe a task and the router scores every model on capability fit, cost and latency, then decides whether to answer from a warm replica or pay a cold start to spin one up. Thompson Sampling drives the exploration; the cold-start state machine decides residency. Keep sending requests and watch utilization climb as the router learns.</p>
<p class="demo-cite">Method from <a href="https://arxiv.org/abs/2512.22402"><em>Efficient Multi-Model Orchestration for Self-Hosted LLMs</em></a>, AAAI 2026 DAI Workshop, and <em>Pick-and-Spin</em>, IEEE CLOUD 2026.</p>
</header>

<div class="demo-io">
<div class="demo-col">
<label class="demo-label" for="router-task">Incoming request</label>
<textarea class="code-input is-compact" id="router-task" rows="4" spellcheck="false" wrap="off" placeholder="e.g. Refactor this 800-line Python module and add type hints"></textarea>

<label class="demo-label" for="router-slots">Resident GPU slots: <output id="router-slots-out">2</output></label>
<input type="range" id="router-slots" min="1" max="5" value="2" step="1">

<label class="demo-label" for="router-pref">Priority: <output id="router-pref-out">balanced</output></label>
<input type="range" id="router-pref" min="0" max="100" value="50" step="10" aria-describedby="router-pref-help">
<p class="demo-hint" id="router-pref-help">Left favours low latency, right favours low GPU cost.</p>

<div class="demo-toolbar">
<button class="btn is-primary" id="router-run">Route request</button>
<button class="btn is-ghost" id="router-sample">Try a sample workload</button>
<button class="btn is-ghost" id="router-reset">Reset cluster</button>
</div>
</div>

<div class="demo-col" id="router-out" aria-live="polite">
<div class="empty-state">Describe a request, or press <strong>Try a sample workload</strong> to send a mixed batch through the router.</div>
</div>
</div>
</section>

<section class="demo demo-panel" id="panel-agent" role="tabpanel" aria-labelledby="tab-agent" hidden tabindex="0">
<header class="demo-head">
<h2 class="demo-title">Reproducibility agent</h2>
<p class="demo-desc">An agent that plans, calls the reproducibility checker above as a tool, reads the findings, and writes a corrected environment file with a short explanation. Every step of its trace is shown, including the tool calls. This is the interaction pattern behind my work on evaluating agentic systems.</p>
<p class="demo-cite">Runs against a self-hosted model. Ships disabled: it needs a configured endpoint so no API key is ever exposed in this page.</p>
</header>

<div class="demo-io">
<div class="demo-col">
<label class="demo-label" for="agent-task">Ask the agent</label>
<textarea class="code-input is-compact" id="agent-task" rows="5" spellcheck="false" wrap="off" placeholder="e.g. My script imports sklearn, cv2 and yaml but pip install -r requirements.txt gives ModuleNotFoundError. Fix my requirements file."></textarea>
<div class="demo-toolbar">
<button class="btn is-primary" id="agent-run">Run agent</button>
<button class="btn is-ghost" id="agent-stop" disabled>Stop</button>
</div>
<p class="demo-hint" id="agent-status"></p>
</div>

<div class="demo-col" id="agent-out" aria-live="polite">
<div class="empty-state" id="agent-empty">Checking whether a model endpoint is configured&hellip;</div>
</div>
</div>
</section>

<p class="muted">Source for all three demos lives in <code>assets/js/demos.js</code>. The analyses run entirely in your browser; nothing you paste is uploaded unless you use the agent tab.</p>

<script src="{{ '/assets/js/demos.js' | relative_url }}" defer></script>
