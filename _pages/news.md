---
permalink: /news/
title: "News"
excerpt: "Talks, awards, acceptances and other updates."
author_profile: false
---

{%- assign cv = site.data.cv -%}

<section class="section" aria-labelledby="news-title">
<div class="section-head"><h2 class="section-title" id="news-title">News archive</h2></div>
<p class="section-sub">Everything, newest first. The homepage carries only the last few.</p>

{% include news-feed.html items=cv.news %}

<p class="muted"><a href="{{ '/' | relative_url }}">&larr; Back to the homepage</a></p>
</section>
