---
permalink: /projects/
title: "Projects"
excerpt: "Systems and tools built by Bhanu Prakash Vangala."
author_profile: false
---

{%- assign cv = site.data.cv -%}
{%- assign projects = cv.projects | where_exp: "p", "p.desc" -%}

<header class="page-heading"><h1>Projects</h1><p>Research projects, tools, and earlier work.</p></header>
{%- assign research_projects = projects | where_exp: "p", "p.coursework != true" -%}
{%- assign coursework_projects = projects | where_exp: "p", "p.coursework == true" -%}
<section class="section" id="research-projects" aria-labelledby="research-projects-title">
<div class="section-head"><h2 id="research-projects-title">Research &amp; independent projects</h2></div>
{% include project-grid.html items=research_projects heading_level='h3' %}
</section>
<section class="section" id="coursework" aria-labelledby="coursework-title">
<div class="section-head"><h2 id="coursework-title">Coursework projects</h2></div>
{% include project-grid.html items=coursework_projects heading_level='h3' %}
</section>
