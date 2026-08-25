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

<div class="hero-lede">
<img class="hero-portrait" src="{{ p.avatar | prepend: '/' | relative_url }}" alt="Portrait of {{ p.name }}" width="132" height="132" fetchpriority="high">
<h1 class="hero-name" id="hero-name">{{ p.name }}</h1>
<p class="hero-role">{{ p.role }}</p>
<p class="hero-thesis">{{ p.dissertation_sub }}.</p>
<div class="link-pills hero-actions">
{%- assign primary = "scholar,github,cv" | split: "," %}
{%- for id in primary %}{% assign l = cv.links | where: "id", id | first %}{% if l %}
<a class="link-pill{% if l.id == 'cv' %} link-pill--primary{% endif %}" href="{% if l.url contains '://' or l.url contains 'mailto:' %}{{ l.url }}{% else %}{{ l.url | relative_url }}{% endif %}"><i class="{{ l.icon }}" aria-hidden="true"></i> {{ l.label }}</a>
{%- endif %}{% endfor %}
</div>
</div>

<div class="hero-below">
<div class="hero-below-main">
<p class="hero-summary">{{ p.summary }}</p>
</div>
<div class="hero-below-meta">
<p class="hero-affil">{{ p.department }} &middot; <a href="https://engineering.missouri.edu/departments/eecs/">{{ p.affiliation }}</a> &middot; {{ p.location }}. Advised by <a href="{{ p.advisor_url }}">{{ p.advisor }}</a>. Ph.D. expected June 2027.</p>
<p class="muted"><strong>Research interests:</strong> {{ p.interests | join: " &middot; " }}</p>
<p class="tag-row" aria-label="Funders and honours">
{%- for b in p.badges %}<span class="badge is-accent">{{ b }}</span>{% endfor %}
</p>
<div class="link-pills">
{%- for l in cv.links %}{% unless l.id == 'scholar' or l.id == 'github' or l.id == 'cv' %}
<a class="link-pill" href="{% if l.url contains '://' or l.url contains 'mailto:' %}{{ l.url }}{% else %}{{ l.url | relative_url }}{% endif %}"><i class="{{ l.icon }}" aria-hidden="true"></i> {{ l.label }}</a>
{%- endunless %}{% endfor %}
<a class="link-pill" href="{{ '/demos/' | relative_url }}"><i class="fas fa-flask" aria-hidden="true"></i> Live demos</a>
</div>
</div>
</div>
</section>

<section id="research-threads" class="section" aria-labelledby="threads-title">
<div class="section-head"><h2 class="section-title" id="threads-title">The argument</h2></div>
<p class="section-sub">Three threads that look unrelated from the outside. They are one question asked three ways. Can anyone else check this?</p>

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

<section id="explore" class="section" aria-labelledby="explore-title">
<div class="section-head"><h2 class="section-title" id="explore-title">Poke around yourself</h2></div>
<p class="section-sub">A real shell over this CV. It reads the same knowledge base the assistant answers from, so it cannot tell you anything the rest of the site does not. Try <code>ls</code>, <code>cat papers/pick-and-spin.md</code>, or <code>ask what is pick and spin</code>.</p>

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
</section>


<section id="news" class="section" aria-labelledby="news-title">
<div class="section-head">
<h2 class="section-title" id="news-title">News</h2>
<a class="section-action" href="{{ '/news/' | relative_url }}">All {{ cv.news | size }} updates &rarr;</a>
</div>

{%- assign recent_news = cv.news | slice: 0, 5 %}
{% include news-feed.html items=recent_news %}
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

<section id="publications" class="section" aria-labelledby="pubs-title">
<div class="section-head">
<h2 class="section-title" id="pubs-title">Selected papers</h2>
<a class="section-action" href="{{ '/publications/' | relative_url }}">All {{ cv.publications | size }} publications &rarr;</a>
</div>
<p class="section-sub">One per thread. Mine is the name in <span class="me">bold</span>.</p>

{%- assign featured_pubs = cv.publications | where: "featured", true %}
{% include pub-list.html items=featured_pubs %}
</section>

<section id="research" class="section" aria-labelledby="research-title">
<div class="section-head"><h2 class="section-title" id="research-title">Research programs</h2></div>
<p class="section-sub">The funded programs this work lives inside, and the people I do it with.</p>

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
<div class="section-head">
<h2 class="section-title" id="projects-title">Selected projects</h2>
<a class="section-action" href="{{ '/projects/' | relative_url }}">All projects &rarr;</a>
</div>

{%- assign featured_projects = cv.projects | where: "featured", true %}
{% include project-grid.html items=featured_projects %}
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
<p>Happy to talk about agentic systems, reproducibility, or serving LLMs at scale. I'm open to collaborations and to speaking invitations.</p>
<div class="link-pills">
<a class="link-pill link-pill--primary" href="mailto:{{ p.email }}"><i class="fas fa-envelope" aria-hidden="true"></i> {{ p.email }}</a>
<a class="link-pill" href="{{ '/cv/' | relative_url }}"><i class="fas fa-file-alt" aria-hidden="true"></i> Full CV</a>
<a class="link-pill" href="https://github.com/bhanuprakashvangala"><i class="fab fa-github" aria-hidden="true"></i> GitHub</a>
</div>
<p class="muted">Or ask the assistant in the corner. It only knows what's on this page, and it will tell you which section it took each answer from.</p>
</section>

<div class="lightbox" id="lightbox" role="dialog" aria-label="Enlarged image" aria-modal="true">
<img class="lightbox-img" id="lightbox-img" alt="">
<button type="button" class="lightbox-close" id="lightbox-close" aria-label="Close image">&times;</button>
</div>
