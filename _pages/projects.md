---
permalink: /projects/
title: "Projects"
excerpt: "Systems and tools built by Bhanu Prakash Vangala."
author_profile: false
---

{%- assign cv = site.data.cv -%}
{%- assign projects = cv.projects | where_exp: "p", "p.desc" -%}

<section class="section" aria-labelledby="projects-title">
<div class="section-head"><h2 class="section-title" id="projects-title">Projects</h2></div>
<p class="section-sub">Things I have built, mostly to answer a question the papers raised.</p>

{% include project-grid.html items=projects %}

<p class="muted"><a href="{{ '/' | relative_url }}">&larr; Back to the homepage</a></p>
</section>
