---
permalink: /publications/
title: "Publications"
excerpt: "Peer-reviewed papers, preprints and theses by Bhanu Prakash Vangala."
author_profile: false
---

{%- assign cv = site.data.cv -%}

<section class="section" aria-labelledby="pubs-title">
<div class="section-head">
<h2 class="section-title" id="pubs-title">Publications</h2>
<a class="section-action" href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">Google Scholar &rarr;</a>
</div>
<p class="section-sub">Mine is the name in <span class="me">bold</span>. Filter by topic if you want a narrower slice.</p>

{% include pub-list.html items=cv.publications filters=true %}

<p class="muted"><a href="{{ '/' | relative_url }}">&larr; Back to the homepage</a></p>
</section>
