---
permalink: /cv/
title: Curriculum Vitae
excerpt: Education, experience, publications, teaching, and service of Bhanu Prakash Vangala.
---
{% assign cv = site.data.cv %}
<header class="page-heading"><h1>{{ cv.profile.name }}</h1><p>{{ cv.profile.role }} · {{ cv.profile.affiliation }}</p><p><a href="mailto:{{ cv.profile.email }}">{{ cv.profile.email }}</a></p><a class="download-link" href="{{ cv.cv_pdf | relative_url }}" download>Download academic CV (PDF)</a><p class="no-print document-date">PDF updated {{ cv.cv_date }}. Web publication metadata includes subsequent corrections.</p></header>
<section class="cv-section"><h2>Research</h2><p>{{ cv.profile.summary }}</p><p><strong>Dissertation:</strong> {{ cv.profile.dissertation }}.</p></section>
<section class="cv-section"><h2>Education</h2>
{% for e in cv.education %}<div class="cv-entry"><div class="cv-entry-head"><h3>{{ e.degree }} · {{ e.org }}</h3><span class="cv-entry-date">{{ e.start }} – {{ e.end }}</span></div><ul>{% for d in e.details %}<li>{{ d | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ul></div>{% endfor %}</section>
<section class="cv-section"><h2>Experience</h2>
{% for x in cv.experience %}<div class="cv-entry"><div class="cv-entry-head"><h3>{{ x.title }} · {{ x.org }}</h3><span class="cv-entry-date">{% if x.start != '' %}{{ x.start }} – {% endif %}{{ x.end }}</span></div><p class="muted">{{ x.location }}{% if x.collaborators %} · With {{ x.collaborators | markdownify | remove: '<p>' | remove: '</p>' | strip }}{% endif %}{% if x.manager %} · Manager: {{ x.manager | markdownify | remove: '<p>' | remove: '</p>' | strip }}{% endif %}</p>{% if x.funders %}<p class="funders">Supported by {% for f in x.funders %}<a class="funder" href="{{ f.url }}"><img src="{{ f.logo | prepend: '/' | relative_url }}" alt="" width="18" height="18">{{ f.name }}</a>{% endfor %}</p>{% endif %}<ul>{% for b in x.bullets %}<li>{{ b }}</li>{% endfor %}</ul></div>{% endfor %}</section>
<section class="cv-section"><h2>Published &amp; accepted</h2>{% assign accepted = cv.publications | where: 'status', 'accepted' %}{% include pub-list.html items=accepted %}</section>
<section class="cv-section"><h2>Under review</h2>{% assign review = cv.publications | where: 'status', 'review' %}{% include pub-list.html items=review %}</section>
<section id="in-preparation" class="section" aria-labelledby="preparation-title">
<div class="section-head"><h2 id="preparation-title">In preparation</h2></div>
{% assign preparation = cv.publications | where: 'status', 'preparation' %}{% include pub-list.html items=preparation %}
</section>
<section class="cv-section"><h2>Posters &amp; presentations</h2>{% assign posters = cv.publications | where: 'status', 'poster' %}{% include pub-list.html items=posters %}</section>
<section class="cv-section"><h2>Awards &amp; honors</h2><dl class="kv-list">{% for a in cv.awards %}<dt>{{ a.year }}</dt><dd><strong>{{ a.title }}</strong> · {{ a.org }}{% if a.url %} <a class="resource-link" href="{{ a.url }}" title="{{ a.link_label }}" aria-label="{{ a.link_label }}">{% include resource-icon.html kind='document' %}</a>{% endif %}</dd>{% endfor %}</dl></section>
<section class="cv-section"><h2>Teaching</h2>{% for t in cv.teaching %}<div class="cv-entry"><div class="cv-entry-head"><h3>{{ t.course }}</h3><span class="cv-entry-date">{{ t.terms | join: ', ' }}</span></div><p>{{ t.role }} · {{ t.org }}. {{ t.note }}</p></div>{% endfor %}</section>
<section class="cv-section"><h2>Service</h2>{% for s in cv.service %}<div class="cv-entry"><h3>{{ s.group }}</h3><ol class="logo-list">{% for it in s.items %}<li>{% include venue-logo.html venue=it %}{{ it | markdownify | remove: '<p>' | remove: '</p>' | strip }}</li>{% endfor %}</ol></div>{% endfor %}</section>
