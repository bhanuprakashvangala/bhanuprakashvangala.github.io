---
permalink: /publications/
title: Publications
excerpt: Published papers, manuscripts under review, and presentations by Bhanu Prakash Vangala.
---
{% assign cv = site.data.cv %}
<header class="page-heading"><p class="eyebrow">Research</p><h1>Publications</h1><p>My work spans LLM serving, reproducibility, trustworthy AI, and evaluation.</p><p><a href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">Google Scholar ↗</a> <span class="meta-separator">/</span> <a href="{{ cv.cv_pdf | relative_url }}">Download CV ↗</a></p></header>
<nav class="section-nav" aria-label="Publication sections"><a href="#accepted">Published &amp; accepted</a><a href="#under-review">Under review</a><a href="#presentations">Posters &amp; presentations</a></nav>
<section class="section" id="accepted"><h2>Published &amp; accepted</h2>{% assign accepted = cv.publications | where: 'status', 'accepted' %}{% include pub-list.html items=accepted %}</section>
<section class="section" id="under-review"><h2>Under review</h2><p class="section-note">Submitted manuscripts; these have not yet been accepted.</p>{% assign review = cv.publications | where: 'status', 'review' %}{% include pub-list.html items=review %}</section>
<section class="section" id="presentations"><h2>Posters &amp; presentations</h2>{% assign posters = cv.publications | where: 'status', 'poster' %}{% include pub-list.html items=posters %}</section>
