---
permalink: /projects/
title: "Projects"
excerpt: "Systems and tools built by Bhanu Prakash Vangala."
author_profile: false
---

{%- assign cv = site.data.cv -%}
{%- assign projects = cv.projects | where_exp: "p", "p.desc" -%}

<header class="page-heading"><h1>Projects</h1><p>Selected tools and systems I have built.</p></header>
{% include project-grid.html items=projects %}
