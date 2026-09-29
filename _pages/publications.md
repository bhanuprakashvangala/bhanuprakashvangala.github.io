---
permalink: /publications/
title: Publications
excerpt: Published papers, manuscripts under review, and presentations by Bhanu Prakash Vangala.
---
{% assign cv = site.data.cv %}
<header class="page-heading"><h1>Publications</h1><p>My work spans LLM serving, reproducibility, trustworthy AI, and evaluation.</p><p><a href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">Google Scholar</a> <span class="meta-separator">/</span> <a href="{{ cv.cv_pdf | relative_url }}">Download CV</a></p></header>
<nav class="section-nav" aria-label="Publication sections"><a href="#accepted">Published &amp; accepted</a><a href="#under-review">Under review</a><a href="#in-preparation">In preparation</a><a href="#presentations">Posters &amp; presentations</a></nav>
<section class="section" id="accepted"><h2>Published &amp; accepted</h2>{% assign accepted = cv.publications | where: 'status', 'accepted' %}{% include pub-list.html items=accepted %}</section>
<section class="section" id="under-review"><h2>Submitted &amp; under review</h2><p class="section-note">Submitted manuscripts; these have not yet been accepted.</p>{% assign review = cv.publications | where: 'status', 'review' %}{% include pub-list.html items=review %}</section>
<section id="in-preparation" class="section" aria-labelledby="preparation-title">
<div class="section-head"><h2 id="preparation-title">In preparation</h2></div>
{% assign preparation = cv.publications | where: 'status', 'preparation' %}{% include pub-list.html items=preparation %}
</section>
<section class="section" id="presentations"><h2>Posters &amp; presentations</h2>{% assign posters = cv.publications | where: 'status', 'poster' %}{% include pub-list.html items=posters %}</section>
<section class="section" id="earlier-work"><h2>Earlier publications, preprints &amp; theses</h2>{% assign earlier = cv.projects | where: 'earlier_work', true %}{% include project-grid.html items=earlier heading_level='h3' %}</section>
