---
permalink: /news/
title: "News"
excerpt: "Talks, awards, acceptances and other updates."
author_profile: false
---

{%- assign cv = site.data.cv -%}

<header class="page-heading"><h1>News archive</h1><p>Research, teaching, and other updates.</p></header>
{% include news-feed.html items=cv.news %}
