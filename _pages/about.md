---
permalink: /
title: ""
redirect_from:
  - /about/
  - /about.html
---
{% assign cv = site.data.cv %}
{% assign p = cv.profile %}
<section class="intro" id="about-me" aria-labelledby="profile-name">
<div class="intro-copy">
{% assign google_nomination = cv.awards | where: 'id', 'google-phd' | first %}
<p>I am Bhanu, a Ph.D. candidate in Computer Science at the <a href="https://engineering.missouri.edu/departments/eecs/">University of Missouri</a>, advised by <a href="{{ p.advisor_url }}">Prof. Tanu Malik</a> in the <a href="https://radiant-systems-lab.github.io/">Radiant Lab</a>. I study whether we can trust what AI systems produce, from hallucinations in language models to the reproducibility of code written by AI agents, and I build benchmarks to measure and evaluate them.</p>
<p>Over the past few years, I found my footing as a researcher thanks to some wonderful people. Most recently, I spent a summer at <a href="https://www.microsoft.com">Microsoft</a> in Redmond as a Research Data Science Intern, working with <a href="https://www.linkedin.com/in/anqi-cheng-616a5559">Anqi</a> and <a href="https://www.linkedin.com/in/juan-arturo-herrera-ph-d-41237191">Arturo</a> on the Windows Data team. Before that, I worked with <a href="https://calla.rnet.missouri.edu/cheng/">Jack Cheng</a> and <a href="https://scottgs.mufaculty.umsystem.edu/">Grant Scott</a>, and spent a stretch in the <a href="https://cafnrfaculty.missouri.edu/mupaa">PAAL lab</a> on remote sensing and AI for agriculture. My master's at Mizzou ended with the <a href="https://engineering.missouri.edu/2025/mizzou-engineering-honors-outstanding-faculty-staff-students-and-alumni/">Outstanding Master's Student Award</a>, which encouraged me to stay on for my Ph.D.</p>
<p>I have been fortunate to receive the EECS Graduate Travel Fellowship and a <a href="https://engineering.missouri.edu/2026/exploring-how-ai-can-strengthen-research-reproducibility/">Chameleon Cloud Travel Award</a>, and to be one of three students Mizzou nominated for the <a href="{{ google_nomination.url }}" title="2025 Google PhD Fellowship application">Google PhD Fellowship</a>. My work is supported by <a href="https://esto.nasa.gov/project-selections-for-aist-21/#Malik">NASA AIST</a>, <a href="https://sites.google.com/umsystem.edu/gp-engine/home">NSF</a> and <a href="https://engineering.missouri.edu/2024/accelerating-materials-discovery/">DoD ERDC</a>. I review for top AI and systems venues such as NeurIPS, where I received an <a href="https://sites.google.com/view/ai4mat/ai4mat-neurips-2025">Outstanding Reviewer Award</a>, and serve on program and artifact evaluation committees; see <a href="#service">Service</a>.</p>
<p>Outside of research, I build <a href="https://learnllm.dev">LearnLLM.dev</a>, where people learn to build with large language models, and I am a teaching assistant for Designing End-to-End ML Systems at Mizzou, after two years as a teaching assistant for Web Development.</p>
</div>
<figure class="portrait"><img src="{{ '/images/portrait.webp' | relative_url }}" width="440" height="540" alt="Bhanu Prakash Vangala" fetchpriority="high">
{% include profile-icons.html %}
<a class="availability" href="mailto:{{ p.email }}">Available full-time from mid-2027</a></figure>
</section>
<section id="news" class="section" aria-labelledby="news-title">
<div class="section-head"><h2 id="news-title">News</h2><a href="{{ '/news/' | relative_url }}">All updates</a></div>
{% assign recent_news = cv.news | slice: 0, 8 %}{% include news-feed.html items=recent_news %}
</section>
<section id="experience" class="section" aria-labelledby="experience-title">
<div class="section-head"><h2 id="experience-title">Experience</h2><a href="{{ '/cv/' | relative_url }}">Full CV</a></div>
{% for x in cv.experience %}<div class="cv-row has-logo">
{% if x.logo %}<img class="org-logo" src="{{ x.logo | prepend: '/' | relative_url }}" alt="" width="40" height="40" loading="lazy">{% else %}<span class="org-logo"></span>{% endif %}
<div class="cv-row-main"><h3>{% if x.url %}<a href="{{ x.url }}">{{ x.org }}</a>{% else %}{{ x.org }}{% endif %}<span class="cv-row-place">{{ x.location }}</span></h3>
<p class="cv-row-role">{{ x.title }}{% if x.collaborators %}<span class="muted"> · with {{ x.collaborators | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span>{% endif %}{% if x.manager %}<span class="muted"> · Manager: {{ x.manager | markdownify | remove: '<p>' | remove: '</p>' | strip }}</span>{% endif %}</p>
{% if x.funders %}<p class="funders">Supported by {% for f in x.funders %}<a class="funder" href="{{ f.url }}"><img src="{{ f.logo | prepend: '/' | relative_url }}" alt="" width="18" height="18">{{ f.name }}</a>{% endfor %}</p>{% endif %}{% if x.bullets %}<ul>{% for bl in x.bullets %}<li>{{ bl }}</li>{% endfor %}</ul>{% endif %}</div>
<span class="cv-row-date">{% if x.start != '' %}{{ x.start }} – {% endif %}{{ x.end }}</span>
</div>{% endfor %}
</section>
<section id="education" class="section" aria-labelledby="education-title">
<div class="section-head"><h2 id="education-title">Education</h2></div>
{% for e in cv.education %}<div class="cv-row has-logo">
{% if e.logo %}<img class="org-logo" src="{{ e.logo | prepend: '/' | relative_url }}" alt="" width="40" height="40" loading="lazy">{% else %}<span class="org-logo"></span>{% endif %}
<div class="cv-row-main"><h3>{{ e.org }}<span class="cv-row-place">{{ e.location }}</span></h3>
<p class="cv-row-role">{{ e.degree }}</p>
{% if e.details %}<ul>{% for d in e.details %}<li>{{ d | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ul>{% endif %}</div>
<span class="cv-row-date">{{ e.start }} – {{ e.end }}</span>
</div>{% endfor %}
</section>
<section id="publications" class="section" aria-labelledby="pubs-title">
<div class="section-head"><h2 id="pubs-title">Publications</h2><a href="{{ '/publications/' | relative_url }}">Full publication list</a></div>
<p class="publication-note">{% assign accepted = cv.publications | where: 'status', 'accepted' %}Published &amp; accepted · {{ accepted.size }} papers</p>
{% assign accepted = cv.publications | where: 'status', 'accepted' %}{% include pub-list.html items=accepted %}
</section>
<section id="submitted" class="section" aria-labelledby="submitted-title">
<div class="section-head"><h2 id="submitted-title">Submitted &amp; under review</h2></div>
<p class="publication-note">Manuscripts currently under review.</p>
{% assign submitted = cv.publications | where: 'status', 'review' %}{% include pub-list.html items=submitted %}
</section>
<section id="in-preparation" class="section" aria-labelledby="preparation-title">
<div class="section-head"><h2 id="preparation-title">In preparation</h2></div>
{% assign preparation = cv.publications | where: 'status', 'preparation' %}{% include pub-list.html items=preparation %}
</section>
<section id="presentations" class="section" aria-labelledby="presentations-title">
<div class="section-head"><h2 id="presentations-title">Posters &amp; presentations</h2></div>
{% assign posters = cv.publications | where: 'status', 'poster' %}{% include pub-list.html items=posters %}
</section>
<section id="projects" class="section" aria-labelledby="projects-title">
<div class="section-head"><h2 id="projects-title">Earlier work</h2><a href="{{ '/projects/' | relative_url }}">All projects</a></div>
{% assign home_projects = cv.projects | where: 'homepage', true | where_exp: 'p', 'p.coursework != true' %}{% include project-grid.html items=home_projects heading_level='h3' %}
</section>
<section id="coursework" class="section" aria-labelledby="coursework-title">
<div class="section-head"><h2 id="coursework-title">Coursework projects</h2><a href="{{ '/projects/#coursework' | relative_url }}">All coursework</a></div>
{% assign home_coursework = cv.projects | where: 'homepage', true | where_exp: 'p', 'p.coursework == true' %}{% include project-grid.html items=home_coursework heading_level='h3' %}
</section>
<section id="awards" class="section" aria-labelledby="awards-title">
<div class="section-head"><h2 id="awards-title">Honors &amp; awards</h2></div>
<ul class="line-list">{% for aw in cv.awards %}
<li><span class="line-main"><strong>{% if aw.url %}<a href="{% if aw.url contains '://' %}{{ aw.url }}{% else %}{{ aw.url | relative_url }}{% endif %}" title="{{ aw.link_label }}">{{ aw.title }}</a>{% else %}{{ aw.title }}{% endif %}</strong><span class="muted"> · {{ aw.org }}</span></span><span class="cv-row-date">{{ aw.year }}</span></li>{% endfor %}
</ul>
</section>
<section id="talks" class="section" aria-labelledby="talks-title">
<div class="section-head"><h2 id="talks-title">Talks &amp; presentations</h2></div>
<ul class="line-list">{% for tk in cv.talks %}
<li><span class="line-main">{% if tk.kind %}<span class="talk-kind">{{ tk.kind }}</span>{% endif %}<strong>{{ tk.title }}</strong><br><span class="muted">{% if tk.url %}<a href="{{ tk.url }}">{{ tk.venue }}</a>{% else %}{{ tk.venue }}{% endif %}{% if tk.slides %} · <a href="{{ tk.slides }}">Slides</a>{% endif %}{% if tk.post %} · <a href="{{ tk.post }}">Photos &amp; post</a>{% endif %}</span></span><span class="cv-row-date">{{ tk.date }}</span></li>{% endfor %}
</ul>
</section>
<section id="teaching" class="section" aria-labelledby="teaching-title">
<div class="section-head"><h2 id="teaching-title">Teaching</h2></div>
{% for t in cv.teaching %}<div class="cv-row has-logo">
<img class="org-logo" src="{{ '/images/logos/mizzou.svg' | relative_url }}" alt="" width="40" height="40" loading="lazy">
<div class="cv-row-main"><h3>{{ t.course }}<span class="cv-row-place">{{ t.org }}</span></h3>
<p class="cv-row-role">{{ t.role }}</p>
<ul><li>{{ t.note }}</li></ul></div>
<span class="cv-row-date">{{ t.terms | join: ', ' }}</span>
</div>{% endfor %}
</section>
<section id="service" class="section" aria-labelledby="service-title">
<div class="section-head"><h2 id="service-title">Service</h2></div>
{% for g in cv.service %}<h3 class="service-group">{{ g.group }}</h3>
<ol class="logo-list">{% for it in g.items %}<li>{% include venue-logo.html venue=it %}{{ it | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ol>
{% endfor %}</section>
