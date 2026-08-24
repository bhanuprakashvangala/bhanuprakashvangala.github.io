---
permalink: /
title: ""
excerpt: "Doctoral researcher in agentic AI and LLM systems at the University of Missouri."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

{%- assign cv = site.data.cv -%}
{%- assign p = cv.profile -%}

<section id="about-me" class="section hero" aria-labelledby="hero-name">
<div class="hero-grid">
<div class="hero-col">
<img class="hero-portrait" src="{{ p.avatar | prepend: '/' | relative_url }}" alt="Portrait of {{ p.name }}" width="132" height="132" fetchpriority="high">
<h1 class="hero-name" id="hero-name">{{ p.name }}</h1>
<p class="hero-role">{{ p.role }}</p>
<p class="hero-thesis">{{ p.dissertation_sub }}</p>
<p class="hero-affil">{{ p.department }} &middot; <a href="https://engineering.missouri.edu/departments/eecs/">{{ p.affiliation }}</a> &middot; {{ p.location }}</p>

<p class="hero-summary">{{ p.summary }}</p>

<p class="muted">Advised by <a href="{{ p.advisor_url }}">{{ p.advisor }}</a> and {{ p.coadvisor }}. Ph.D. expected June 2027.</p>

<p class="tag-row" aria-label="Highlights">
{%- for b in p.badges %}<span class="badge is-accent">{{ b }}</span>{% endfor %}
</p>

<div class="link-pills hero-actions">
{%- for l in cv.links %}
<a class="link-pill{% if l.id == 'cv' %} link-pill--primary{% endif %}" href="{% if l.url contains '://' or l.url contains 'mailto:' %}{{ l.url }}{% else %}{{ l.url | relative_url }}{% endif %}"><i class="{{ l.icon }}" aria-hidden="true"></i> {{ l.label }}</a>
{%- endfor %}
<a class="link-pill" href="{{ '/demos/' | relative_url }}"><i class="fas fa-flask" aria-hidden="true"></i> Live demos</a>
</div>

<p class="muted"><strong>Research interests:</strong> {{ p.interests | join: " &middot; " }}</p>
</div>
<div class="hero-col hero-col--term">

<div class="terminal" id="terminal" role="group" aria-label="Interactive shell over the CV">
<div class="term-bar" aria-hidden="true">
<span class="term-dot"></span><span class="term-dot"></span><span class="term-dot"></span>
<span class="term-title">bhanu@nautilus: ~</span>
</div>
<div class="term-out" id="term-out" role="log" aria-live="polite"></div>
<div class="term-chips">
<button type="button" class="term-chip" data-cmd="ls">ls</button>
<button type="button" class="term-chip" data-cmd="cat about.txt">cat about.txt</button>
<button type="button" class="term-chip" data-cmd="cd papers">cd papers</button>
<button type="button" class="term-chip" data-cmd="tree">tree</button>
<button type="button" class="term-chip" data-cmd="help">help</button>
</div>
<label class="term-row" for="term-input">
<span class="term-prompt"><span class="t-prompt">bhanu@nautilus</span> <span class="term-prompt-path t-path">~/</span> <span class="t-caret">$</span></span>
<input class="term-input" id="term-input" type="text" autocomplete="off" autocapitalize="off"
       autocorrect="off" spellcheck="false" aria-label="Terminal input">
</label>
</div>
</div>

<ul class="stat-grid">
{%- for s in cv.stats %}
<li class="stat"><span class="stat-num">{{ s.num }}</span><span class="stat-label">{{ s.label }}</span></li>
{%- endfor %}
</ul>
</section>

<section id="research-threads" class="section" aria-labelledby="threads-title">
<div class="section-head"><h2 class="section-title" id="threads-title">The argument</h2></div>
<p class="section-sub">Three threads that look different on the surface and answer the same question: how do we build AI systems whose correctness, efficiency and accountability are designed in from the start rather than patched on later?</p>

<ol class="thread-grid">
{%- for t in cv.threads %}
<li class="thread-card" id="thread-{{ t.id }}" data-thread="{{ t.tag }}">
<span class="thread-n" aria-hidden="true">{{ t.n }}</span>
<h3 class="thread-title">{{ t.title }}</h3>
<p class="thread-lead">{{ t.lead }}</p>
<p class="thread-text">{{ t.text }}</p>
<p class="thread-refs">
{%- for r in t.refs %}{% assign pub = cv.publications | where: "id", r | first %}{% if pub %}<a class="btn-link" href="#pub-{{ pub.id }}">{{ pub.venue }}</a>{% endif %}{% endfor %}
</p>
</li>
{%- endfor %}
</ol>
</section>

<section id="news" class="section" aria-labelledby="news-title">
<div class="section-head"><h2 class="section-title" id="news-title">News</h2></div>

<ol class="news-feed" id="news-feed">
{%- for n in cv.news %}
<li class="news-item"><span class="news-date">{{ n.date }}</span><span class="news-body">{{ n.text | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span></li>
{%- endfor %}
</ol>

<button type="button" class="news-more" id="news-more" aria-expanded="false" aria-controls="news-feed">Show all {{ cv.news | size }} updates</button>
</section>

<section id="publications" class="section" aria-labelledby="pubs-title">
<div class="section-head">
<h2 class="section-title" id="pubs-title">Publications</h2>
<a class="section-action" href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">Google Scholar &rarr;</a>
</div>
<p class="section-sub">My name is shown in <span class="me">bold</span>. Filter by topic below.</p>

<div class="filter-bar" role="group" aria-label="Filter publications by topic">
{%- for f in cv.pub_filters %}
<button type="button" class="filter-chip{% if f.id == 'all' %} is-active{% endif %}" data-filter="{{ f.id }}" aria-pressed="{% if f.id == 'all' %}true{% else %}false{% endif %}">{{ f.label }}</button>
{%- endfor %}
<span class="filter-count" id="filter-count" aria-live="polite"></span>
</div>

<ol class="pub-list" id="pub-list">
{%- for pub in cv.publications %}
<li class="pub" data-tags="{{ pub.tags | join: ' ' }}" data-year="{{ pub.year }}" id="pub-{{ pub.id }}">
{%- if pub.image %}
<div class="pub-thumb"><img src="{{ pub.image | prepend: '/' | relative_url }}" alt="" loading="lazy" decoding="async"></div>
{%- endif %}
<div class="pub-body">
<h3 class="pub-title">{{ pub.title }}</h3>
<p class="pub-authors">{% for a in pub.authors %}{% if a contains 'Bhanu' %}<span class="me">{{ a }}</span>{% else %}{{ a }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
{%- if pub.highlights %}
<p>{{ pub.highlights }}</p>
{%- endif %}
<p class="pub-meta">
<span class="pub-venue is-{{ pub.status }}">{% if pub.status == 'review' %}Under review &middot; {% endif %}{{ pub.venue }}{% if pub.kind %} &middot; {{ pub.kind }}{% endif %}</span>
<span class="pub-tags">{% for t in pub.tags %}<span class="pub-tag">{{ t }}</span>{% endfor %}</span>
</p>
{%- if pub.summary %}
<details class="pub-summary"><summary>What it's about</summary><p>{{ pub.summary }}</p></details>
{%- endif %}
{%- if pub.links and pub.links != empty %}
<p class="pub-actions">{% for l in pub.links %}<a class="btn-link" href="{{ l.url }}">{{ l.label }}</a>{% endfor %}</p>
{%- endif %}
</div>
</li>
{%- endfor %}
</ol>
<p class="callout is-note is-hidden" id="pub-empty">No publications match that filter.</p>
</section>

<section id="research" class="section" aria-labelledby="research-title">
<div class="section-head"><h2 class="section-title" id="research-title">Research programs</h2></div>
<p class="section-sub">The funded programs my work sits inside, and the people I build them with.</p>

<ul class="project-grid">
{%- for r in cv.research %}
<li class="project-card" id="program-{{ r.id }}">
<h3 class="project-title">{{ r.title }}</h3>
<p class="project-meta"><span class="badge is-accent">{{ r.funder }}</span><span class="badge is-muted">{{ r.stack }}</span></p>
<p class="project-desc"><strong>With</strong> {% for c in r.collaborators %}{{ c.name }} ({{ c.org }}){% unless forloop.last %}, {% endunless %}{% endfor %}</p>
<dl class="kv-list">
{%- for t in r.threads %}
<dt class="kv-key">{{ t.name }}</dt><dd class="kv-val">{{ t.text }}</dd>
{%- endfor %}
</dl>
</li>
{%- endfor %}
</ul>
</section>

<section id="projects" class="section" aria-labelledby="projects-title">
<div class="section-head"><h2 class="section-title" id="projects-title">Projects</h2></div>

<ul class="project-grid">
{%- for pr in cv.projects %}
<li class="project-card">
<h3 class="project-title">{{ pr.title }}</h3>
<p class="project-meta">{% if pr.role %}<span class="badge is-accent">{{ pr.role }}</span>{% endif %}<span class="badge is-muted">{{ pr.status }}</span></p>
<p class="project-desc">{{ pr.desc }}</p>
{%- if pr.stack %}
<p class="project-tags">{% assign bits = pr.stack | split: "|" %}{% for b in bits %}<span class="tag">{{ b | strip }}</span>{% endfor %}</p>
{%- endif %}
{%- if pr.links %}
<p class="project-links">{% for l in pr.links %}<a class="btn-link" href="{{ l.url }}">{{ l.label }}</a>{% endfor %}</p>
{%- endif %}
</li>
{%- endfor %}
</ul>
</section>

<section id="honors-and-awards" class="section" aria-labelledby="awards-title">
<div class="section-head"><h2 class="section-title" id="awards-title">Honors &amp; awards</h2></div>

<ul class="award-list">
{%- for a in cv.awards %}
<li class="award">
<span class="award-year">{{ a.year }}</span>
<p class="award-title">{{ a.title }}</p>
<p class="award-org">{{ a.org }}</p>
{%- if a.images %}
<div class="award-images">
{%- for img in a.images %}<a class="lightbox-trigger" href="{{ img | prepend: '/' | relative_url }}"><img src="{{ img | prepend: '/' | relative_url }}" alt="{{ a.title }}" loading="lazy"></a>{% endfor %}
</div>
{%- endif %}
</li>
{%- endfor %}
</ul>
</section>

<section id="educations" class="section" aria-labelledby="edu-title">
<div class="section-head"><h2 class="section-title" id="edu-title">Education</h2></div>

<ol class="timeline">
{%- for e in cv.education %}
<li class="timeline-item{% if e.current %} is-current{% endif %}">
<span class="timeline-marker" aria-hidden="true"></span>
<p class="timeline-date">{{ e.start }} &ndash; {{ e.end }}</p>
<h3 class="timeline-title">{{ e.degree }}</h3>
<p class="timeline-org">{{ e.org }} &middot; {{ e.location }}{% if e.gpa %} &middot; GPA {{ e.gpa }}{% endif %}</p>
<ul class="timeline-bullets">
{%- for d in e.details %}<li>{{ d | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}
</ul>
</li>
{%- endfor %}
</ol>
</section>

<section id="experience" class="section" aria-labelledby="exp-title">
<div class="section-head"><h2 class="section-title" id="exp-title">Experience</h2></div>

<ol class="timeline">
{%- for x in cv.experience %}
<li class="timeline-item{% if x.current %} is-current{% endif %}">
<span class="timeline-marker" aria-hidden="true"></span>
<p class="timeline-date">{{ x.start }} &ndash; {{ x.end }}</p>
<h3 class="timeline-title">{{ x.title }}</h3>
<p class="timeline-org">{{ x.org }} &middot; {{ x.location }}</p>
{%- if x.collaborators %}
<div class="timeline-body"><p class="muted">With {{ x.collaborators }}</p></div>
{%- endif %}
<ul class="timeline-bullets">
{%- for b in x.bullets %}<li>{{ b | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}
</ul>
{%- if x.tags %}
<p class="tag-row">{% for t in x.tags %}<span class="tag">{{ t }}</span>{% endfor %}</p>
{%- endif %}
</li>
{%- endfor %}
</ol>
</section>

<section id="service" class="section" aria-labelledby="service-title">
<div class="section-head"><h2 class="section-title" id="service-title">Talks, service &amp; teaching</h2></div>

<h3>Invited talks &amp; presentations</h3>
<dl class="kv-list">
{%- for t in cv.talks %}
<dt class="kv-key">{{ t.date }}</dt><dd class="kv-val"><strong>{{ t.title }}</strong> &middot; {{ t.venue }}</dd>
{%- endfor %}
</dl>

{%- assign talk_img = cv.talks | where_exp: "t", "t.image" | first %}
{%- if talk_img %}
<div class="award-images">
<a class="lightbox-trigger" href="{{ talk_img.image | prepend: '/' | relative_url }}"><img src="{{ talk_img.image | prepend: '/' | relative_url }}" alt="Presenting at {{ talk_img.venue }}" loading="lazy"></a>
</div>
<p class="muted">Presenting hallucination-detection work at the AAAI Spring Symposium 2025.</p>
{%- endif %}

<h3>Reviewing</h3>
{%- for s in cv.service %}
<p class="tag-row">{% for i in s.items %}<span class="tag">{{ i }}</span>{% endfor %}</p>
{%- endfor %}

<h3>Teaching</h3>
<dl class="kv-list">
{%- for t in cv.teaching %}
<dt class="kv-key">{{ t.terms | join: ", " }}</dt><dd class="kv-val"><strong>{{ t.role }}, {{ t.course }}</strong> &middot; {{ t.org }}. {{ t.note }}</dd>
{%- endfor %}
</dl>
</section>

<section class="section">
<div class="section-head"><h2 class="section-title">Get in touch</h2></div>
<p>I'm always glad to talk about agentic systems, reproducibility, or LLM serving, and I'm open to collaborations and speaking invitations.</p>
<div class="link-pills">
<a class="link-pill link-pill--primary" href="mailto:{{ p.email }}"><i class="fas fa-envelope" aria-hidden="true"></i> {{ p.email }}</a>
<a class="link-pill" href="{{ '/cv/' | relative_url }}"><i class="fas fa-file-alt" aria-hidden="true"></i> Full CV</a>
<a class="link-pill" href="https://github.com/bhanuprakashvangala"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
</div>
<p class="muted">Or ask the assistant in the corner. It answers from this CV and cites the section it drew from.</p>
</section>

<div class="lightbox" id="lightbox" role="dialog" aria-label="Enlarged image" aria-modal="true">
<img class="lightbox-img" id="lightbox-img" alt="">
<button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close image">&times;</button>
</div>
