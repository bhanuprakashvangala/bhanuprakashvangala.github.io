---
permalink: /
title: ""
redirect_from:
  - /about/
  - /about.html
---
{% assign cv = site.data.cv %}
{% assign p = cv.profile %}
<section class="intro" id="about-me" aria-labelledby="profile-name">
<div class="intro-copy">
<p>I am a Ph.D. candidate in Computer Science at the <a href="https://engineering.missouri.edu/departments/eecs/">University of Missouri</a>, advised by <a href="{{ p.advisor_url }}">Prof. Tanu Malik</a> in the <a href="https://radiant-systems-lab.github.io/">Radiant Lab</a>.</p>
<p>{{ p.summary }}</p>
<p>Previously, I was a Research Data Science Intern at <strong>Microsoft</strong>, working on temporal features for Windows retention. I also build <a href="https://learnllm.dev">LearnLLM.dev</a>, a platform for learning to build with large language models.</p>
<p class="profile-links"><a href="mailto:{{ p.email }}">Email</a><a href="https://scholar.google.com/citations?user=qHBOnpkAAAAJ&amp;hl=en">Google Scholar</a><a href="https://github.com/bhanuprakashvangala">GitHub</a><a href="https://www.linkedin.com/in/vangalabhanuprakash/">LinkedIn</a><a href="{{ cv.cv_pdf | relative_url }}">CV (PDF)</a></p>
</div>
<figure class="portrait"><img src="{{ '/images/portrait.webp' | relative_url }}" width="440" height="540" alt="Bhanu Prakash Vangala" fetchpriority="high"></figure>
</section>
<section id="news" class="section" aria-labelledby="news-title">
<div class="section-head"><h2 id="news-title">News</h2><a href="{{ '/news/' | relative_url }}">All updates</a></div>
{% assign recent_news = cv.news | slice: 0, 4 %}{% include news-feed.html items=recent_news %}
</section>
<section id="publications" class="section" aria-labelledby="pubs-title">
<div class="section-head"><h2 id="pubs-title">Selected publications</h2><a href="{{ '/publications/' | relative_url }}">All publications</a></div>
{% assign selected = cv.publications | where: 'featured', true %}{% include pub-list.html items=selected %}
</section>
<section id="experience" class="section" aria-labelledby="experience-title">
<div class="section-head"><h2 id="experience-title">Experience &amp; education</h2><a href="{{ '/cv/' | relative_url }}">Full CV</a></div>
<div class="two-columns"><div><h3 class="small-heading">Experience</h3>
{% assign featured_experience = cv.experience | where: 'featured', true %}
{% for x in featured_experience %}<div class="compact-entry"><span class="date">{{ x.short_period }}</span><h4>{{ x.org }}</h4><p>{{ x.title }}</p></div>{% endfor %}
</div><div><h3 class="small-heading">Education</h3>
{% for e in cv.education %}<div class="compact-entry"><span class="date">{{ e.end }}</span><h4>{{ e.degree }}</h4><p>{{ e.org }}</p></div>{% endfor %}
</div></div></section>
<section id="service" class="section" aria-labelledby="service-title"><div class="section-head"><h2 id="service-title">Teaching &amp; service</h2></div>
<p>I’m a teaching assistant for <strong>Designing End-to-End ML Systems</strong> (Fall 2026), with labs on Chameleon Cloud. Previously, I mentored 115+ students in Web Development.</p>
<p>I review for NeurIPS, CIKM, ACM CAIS, IEEE, and Elsevier journals, and contribute to artifact evaluation at NeurIPS, ACM CAIS, and ACM REP. I received an <strong>Outstanding Reviewer Award at NeurIPS 2025</strong>.</p></section>

