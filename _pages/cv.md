---
permalink: /cv/
title: "Curriculum Vitae"
excerpt: "Full curriculum vitae of Bhanu Prakash Vangala."
author_profile: false
---

{%- assign cv = site.data.cv -%}
{%- assign p = cv.profile -%}

<article class="cv-page">

<header class="cv-header">
<h1>{{ p.name }}</h1>
<p>{{ p.role }} &middot; {{ p.affiliation }}</p>
<ul class="cv-contact">
<li><a href="mailto:{{ p.email }}">{{ p.email }}</a></li>
{%- if p.show_phone %}<li>{{ p.phone }}</li>{% endif %}
<li><a href="https://bhanuprakashvangala.github.io">bhanuprakashvangala.github.io</a></li>
<li><a href="https://github.com/bhanuprakashvangala">github.com/bhanuprakashvangala</a></li>
<li><a href="https://www.linkedin.com/in/vangalabhanuprakash/">linkedin</a></li>
<li><a href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">scholar</a></li>
</ul>
<p class="muted"><strong>Research interests:</strong> {{ p.interests | join: " &middot; " }}</p>
<p class="no-print">
<button type="button" class="cv-download" id="cv-print"><i class="fas fa-print" aria-hidden="true"></i> Print or save as PDF</button>
<a class="btn-link" href="{{ '/' | relative_url }}">Back to homepage</a>
<a class="btn-link" href="{{ '/demos/' | relative_url }}">Live demos</a>
</p>
</header>

<section class="cv-section">
<h2>Summary</h2>
<p>{{ p.summary }}</p>
</section>

<section class="cv-section">
<h2>Education</h2>
{%- for e in cv.education %}
<div class="cv-entry">
<div class="cv-entry-head">
<h3>{{ e.degree }} &mdash; {{ e.org }}</h3>
<span class="cv-entry-date">{{ e.start }} &ndash; {{ e.end }}</span>
</div>
<p class="muted">{{ e.location }}{% if e.gpa %} &middot; GPA {{ e.gpa }}{% endif %}</p>
<ul>{% for d in e.details %}<li>{{ d | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ul>
</div>
{%- endfor %}
</section>

<section class="cv-section">
<h2>Selected publications</h2>
{%- for pub in cv.publications %}{% if pub.ref %}
<div class="cv-entry" id="cv-pub-{{ pub.id }}">
<div class="cv-entry-head">
<h3>[{{ pub.ref }}] {{ pub.title }}</h3>
<span class="cv-entry-date">{{ pub.year }}</span>
</div>
<p class="muted">{% for a in pub.authors %}{% if a contains 'Bhanu' %}<strong>{{ a }}</strong>{% else %}{{ a }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}</p>
{%- if pub.highlights %}<p>{{ pub.highlights }}</p>{% endif %}
<p><span class="pub-venue is-{{ pub.status }}">{% if pub.status == 'review' %}Under review &middot; {% endif %}{{ pub.venue }}{% if pub.kind %} &middot; {{ pub.kind }}{% endif %}</span>{% for l in pub.links %} <a class="btn-link" href="{{ l.url }}">{{ l.label }}</a>{% endfor %}</p>
</div>
{%- endif %}{% endfor %}

<h3>Theses &amp; earlier work</h3>
<ul class="plain-list">
{%- for pub in cv.publications %}{% unless pub.ref %}
<li><strong>{{ pub.title }}</strong> &mdash; {{ pub.venue_full }}{% for l in pub.links %} &middot; <a href="{{ l.url }}">{{ l.label }}</a>{% endfor %}</li>
{%- endunless %}{% endfor %}
</ul>
</section>

<section class="cv-section">
<h2>Featured research &amp; collaborations</h2>
{%- for r in cv.research %}
<div class="cv-entry">
<div class="cv-entry-head">
<h3>{{ r.title }}</h3>
<span class="cv-entry-date">{{ r.funder }}</span>
</div>
<p class="muted">{{ r.stack }}</p>
<p class="muted">With {% for c in r.collaborators %}{{ c.name }} ({{ c.org }}){% unless forloop.last %}, {% endunless %}{% endfor %}</p>
<ul>{% for t in r.threads %}<li><strong>{{ t.name }}:</strong> {{ t.text }}</li>{% endfor %}</ul>
</div>
{%- endfor %}
</section>

<section class="cv-section">
<h2>Experience</h2>
{%- for x in cv.experience %}
<div class="cv-entry">
<div class="cv-entry-head">
<h3>{{ x.title }} &mdash; {{ x.org }}</h3>
<span class="cv-entry-date">{{ x.start }} &ndash; {{ x.end }}</span>
</div>
<p class="muted">{{ x.location }}{% if x.collaborators %} &middot; with {{ x.collaborators }}{% endif %}</p>
<ul>{% for b in x.bullets %}<li>{{ b | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ul>
</div>
{%- endfor %}
</section>

<section class="cv-section">
<h2>Honors &amp; awards</h2>
<dl class="kv-list">
{%- for a in cv.awards %}
<dt class="kv-key">{{ a.year }}</dt><dd class="kv-val"><strong>{{ a.title }}</strong> &mdash; {{ a.org }}</dd>
{%- endfor %}
</dl>
</section>

<section class="cv-section">
<h2>Teaching</h2>
<ul class="plain-list">
{%- for t in cv.teaching %}
<li><strong>{{ t.role }}, {{ t.course }}</strong> &mdash; {{ t.org }} ({{ t.terms | join: ", " }}). {{ t.note }}</li>
{%- endfor %}
</ul>
</section>

<section class="cv-section">
<h2>Invited talks &amp; presentations</h2>
<dl class="kv-list">
{%- for t in cv.talks %}
<dt class="kv-key">{{ t.date }}</dt><dd class="kv-val"><strong>{{ t.title }}</strong> &mdash; {{ t.venue }}</dd>
{%- endfor %}
</dl>
</section>

<section class="cv-section">
<h2>Service &amp; reviewing</h2>
{%- for s in cv.service %}
<p>{{ s.items | join: " &middot; " }}</p>
{%- endfor %}
</section>

<section class="cv-section">
<h2>Featured coursework</h2>
<dl class="kv-list">
{%- for c in cv.coursework %}
<dt class="kv-key">{{ c.group }}</dt><dd class="kv-val">{{ c.items | join: " &middot; " }}</dd>
{%- endfor %}
</dl>
</section>

<section class="cv-section">
<h2>Technical skills</h2>
{%- for s in cv.skills %}
<div class="cv-entry">
<h3>{{ s.group }}</h3>
<p class="tag-row">{% for i in s.items %}<span class="tag">{{ i }}</span>{% endfor %}</p>
</div>
{%- endfor %}
</section>

<p class="muted">Generated from <code>_data/cv.yml</code>. Last built {{ site.time | date: "%B %-d, %Y" }}.</p>

</article>
