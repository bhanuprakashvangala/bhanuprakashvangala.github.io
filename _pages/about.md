---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<span class='anchor' id='about-me'></span>

# About Me

I am a Ph.D. student in Computer Science at the [University of Missouri](https://engineering.missouri.edu/departments/eecs/), advised by [Dr. Tanu Malik](https://engineering.missouri.edu/faculty/tanu-malik/).

My research focuses on **Efficiency in LLMs**, **Trustworthy AI**, and **Reproducibility in Systems**.

In Summer 2026, I will join **Microsoft** as a Research Data Science Intern.

Previously, I completed my M.S. in Computer Science at Missouri, advised by [Dr. Jianlin Cheng](https://en.wikipedia.org/wiki/Jianlin_Cheng) and [Dr. Grant Scott](https://scottgs.mufaculty.umsystem.edu/). I received my B.Tech from VIT University (Vellore Institute of Technology), where I worked on multilingual sentiment analysis advised by Dr. Soughbhagya Barpanda, with dataset and collaboration support from [Dr. P. Kumaraguru](https://www.iiit.ac.in/people/faculty/pk/) (PRECOG, IIIT Hyderabad).

I was selected as a **Google PhD Fellowship Nominee (2025)** in NLP, one of three nominees from Missouri, and received the **Outstanding Master's Student Award (2025)**.

**Research Interests:** LLMs | NLP | Agentic AI | Trustworthy AI | Scalable ML Systems | Reproducibility

---

<span class='anchor' id='news'></span>
# News

- *2025.12*: Two papers accepted at **AAAI 2026**
- *2025.11*: Joining **Microsoft** as Research Data Science Intern (Summer 2026)
- *2025.05*: Earned my M.S. in Computer Science (GPA: 4.0/4.0) from the University of Missouri
- *2025.05*: Received the **Outstanding Master's Student Award** from the MU College of Engineering
- *2025.04*: Selected as a **Google PhD Fellowship Nominee (NLP)** — one of three nominees from Missouri
- *2025.03*: Achieved **Runner-Up** in the MUIDSI AI Hackathon ($1,000 prize)
- *2025.01*: Two papers accepted at **AAAI 2025**
- *2024.01*: Working as a TA for 100+ students in Web Development
- *2023.08*: Began Ph.D. research on faithfulness, interpretability, and robustness in LLMs
- *2023.05*: Graduated with B.Tech from VIT Vellore

---

<span class='anchor' id='publications'></span>
# Publications

<style>
/* Clean publication card style like Rachit's site */
.pub-card {
  display: flex;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.pub-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.pub-img {
  width: 200px;
  min-width: 200px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.pub-img img {
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
}
.pub-content {
  padding: 15px 20px;
  flex: 1;
}
.pub-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  background: #e9ecef;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
}
.pub-authors {
  color: #555;
  margin-bottom: 12px;
  font-size: 0.95rem;
}
.pub-authors a {
  color: #2a6496;
  text-decoration: underline;
}
.pub-links {
  display: flex;
  gap: 15px;
  align-items: center;
}
.pub-links a {
  color: #2a6496;
  font-weight: 500;
  text-decoration: none;
}
.pub-links a:hover {
  text-decoration: underline;
}
.pub-venue {
  margin-left: auto;
  color: #666;
  font-weight: 500;
}

/* Awards with clickable enlargeable images */
.award-item {
  margin-bottom: 1.5rem;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}
.award-date {
  font-weight: 600;
  color: #2a6496;
  margin-bottom: 5px;
}
.award-images {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.award-images a {
  display: block;
}
.award-images img {
  height: 80px;
  width: auto;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid #ddd;
}
.award-images img:hover {
  transform: scale(1.05);
}

/* Image lightbox */
.lightbox {
  display: none;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  justify-content: center;
  align-items: center;
}
.lightbox.active {
  display: flex;
}
.lightbox img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
}
.lightbox-close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 40px;
  cursor: pointer;
}

/* Clean education style */
.edu-item {
  margin-bottom: 1.5rem;
  padding-left: 20px;
  border-left: 3px solid #2a6496;
}
.edu-item h4 {
  margin: 0 0 5px 0;
  color: #333;
}
.edu-item .date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

/* Experience timeline */
.exp-item {
  margin-bottom: 1.5rem;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #2a6496;
}
.exp-item h4 {
  margin: 0 0 5px 0;
  color: #2a6496;
}
.exp-item .date {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .pub-card {
    flex-direction: column;
  }
  .pub-img {
    width: 100%;
    min-width: auto;
  }
  .pub-links {
    flex-wrap: wrap;
  }
  .pub-venue {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
}
</style>

### 2026

<div class="pub-card">
  <div class="pub-img">
    <img src="images/AdaptiveLLMaaS.png" alt="Efficient Multi-Model Orchestration">
  </div>
  <div class="pub-content">
    <div class="pub-title">Efficient Multi-Model Orchestration for Self-Hosted Large Language Models</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a>, Tanu Malik, Ashish Gehani</div>
    <div class="pub-links">
      <a href="#">Paper</a>
      <a href="#">Code</a>
      <span class="pub-venue">AAAI 2026</span>
    </div>
  </div>
</div>

<div class="pub-card">
  <div class="pub-img">
    <img src="images/LLM-as-Service-portfolio-image.png" alt="AI-Generated Code Reproducibility">
  </div>
  <div class="pub-content">
    <div class="pub-title">AI-Generated Code Is Not Reproducible (Yet): An Empirical Study of Dependency Gaps in Agents</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a>, Ammar Ali, Tanu Malik, Ashish Gehani</div>
    <div class="pub-links">
      <a href="#">Paper</a>
      <a href="#">Code</a>
      <span class="pub-venue">AAAI 2026</span>
    </div>
  </div>
</div>

### 2025

<div class="pub-card">
  <div class="pub-img">
    <img src="images/HalluMat-Portfolio%20Image.png" alt="HalluMat">
  </div>
  <div class="pub-content">
    <div class="pub-title">HalluMat: A Benchmark Dataset and Framework for Hallucination Detection in LLMs for Materials Science</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a>, Syed Mahmud, Prabhat Neupane, Janani Selvaraj, Jianlin Cheng</div>
    <div class="pub-links">
      <a href="https://drive.google.com/file/d/1oMbe8br7-wm7NLkrOFbFGtT2vUlxdCTn/view">Paper</a>
      <a href="#">Code</a>
      <span class="pub-venue">AAAI 2025</span>
    </div>
  </div>
</div>

<div class="pub-card">
  <div class="pub-img">
    <img src="images/HalluFormer-Portfolio%20Image.png" alt="HalluFormer">
  </div>
  <div class="pub-content">
    <div class="pub-title">HalluFormer: A Transformer-Based Framework for Detecting Hallucination in LLMs</div>
    <div class="pub-authors">Syed Mahmud, Prabhat Neupane, Janani Selvaraj, <a href="#">Bhanu Prakash Vangala</a>, Jianlin Cheng</div>
    <div class="pub-links">
      <a href="https://drive.google.com/file/d/1o6tqCJdhiCTAR4AEM59fV4t2VSdvS4yt/view">Paper</a>
      <a href="#">Code</a>
      <span class="pub-venue">AAAI 2025</span>
    </div>
  </div>
</div>

<div class="pub-card">
  <div class="pub-img">
    <img src="images/AdaptiveLLMaaS.png" alt="Adaptive Inference">
  </div>
  <div class="pub-content">
    <div class="pub-title">Adaptive Inference: Orchestrating Fine-Tuned LLMs with Serverless GPUs in HPC Environments</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a>, Tanu Malik</div>
    <div class="pub-links">
      <a href="#">Paper</a>
      <a href="#">Code</a>
      <span class="pub-venue">ACM SC 2025</span>
    </div>
  </div>
</div>

### Thesis & Earlier Work

<div class="pub-card">
  <div class="pub-img">
    <img src="images/LLM-as-Service-portfolio-image.png" alt="LLM-as-a-Service">
  </div>
  <div class="pub-content">
    <div class="pub-title">Deploying LLMs as a Service in Kubernetes HPC Cluster</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a>, Grant Scott, Jianlin Cheng</div>
    <div class="pub-links">
      <a href="#">Thesis</a>
      <span class="pub-venue">M.S. Thesis 2025</span>
    </div>
  </div>
</div>

<div class="pub-card">
  <div class="pub-img">
    <img src="images/KOO-Portfolio%20Image.png" alt="KOO Sentiment Analysis">
  </div>
  <div class="pub-content">
    <div class="pub-title">KOO: Multilingual Sentiment Analysis on Social Media</div>
    <div class="pub-authors"><a href="#">Bhanu Prakash Vangala</a></div>
    <div class="pub-links">
      <a href="https://drive.google.com/file/d/1a2Xan4sDdC7ib7Hj5HODcjPyztmTee4k/view">Paper</a>
      <span class="pub-venue">B.Tech Thesis 2023</span>
    </div>
  </div>
</div>

---

<span class='anchor' id='honors-and-awards'></span>
# Honors and Awards

<div class="award-item">
  <div class="award-date">May 2025</div>
  <strong>Outstanding Master's Student Award</strong>, College of Engineering, University of Missouri
  <div class="award-images">
    <a href="images/image%20with%20dean.jpg" class="lightbox-trigger"><img src="images/image%20with%20dean.jpg" alt="Award with Dean"></a>
    <a href="images/Outstanding%20Student.jpeg" class="lightbox-trigger"><img src="images/Outstanding%20Student.jpeg" alt="Certificate"></a>
  </div>
</div>

<div class="award-item">
  <div class="award-date">April 2025</div>
  <strong>Google PhD Fellowship Nominee (NLP)</strong> — one of three nominees from the University of Missouri
</div>

<div class="award-item">
  <div class="award-date">March 2025</div>
  <strong>Runner-Up – MUIDSI AI Hackathon</strong> for VisionAI: AI-Powered Assistance for the Visually Impaired ($1,000 prize)
  <div class="award-images">
    <a href="images/Hackathon%20Winner.jpeg" class="lightbox-trigger"><img src="images/Hackathon%20Winner.jpeg" alt="Hackathon Award"></a>
    <a href="images/Hackathon%20Winner%202.jpg" class="lightbox-trigger"><img src="images/Hackathon%20Winner%202.jpg" alt="Hackathon Team"></a>
  </div>
</div>

<div class="award-item">
  <div class="award-date">2023</div>
  <strong>Dean's Research Excellence Award</strong>, Vellore Institute of Technology
</div>

<div class="award-item">
  <div class="award-date">2023</div>
  <strong>Best Department Thesis Award</strong>, VIT for B.Tech thesis on multilingual sentiment analysis
</div>

<div class="award-item">
  <div class="award-date">2022</div>
  <strong>Runner-Up</strong>, VIT AI Tech-Thon
</div>

<!-- Lightbox for image enlargement -->
<div class="lightbox" id="lightbox">
  <span class="lightbox-close" onclick="closeLightbox()">&times;</span>
  <img id="lightbox-img" src="" alt="">
</div>

<script>
// Lightbox functionality
document.querySelectorAll('.lightbox-trigger').forEach(function(trigger) {
  trigger.addEventListener('click', function(e) {
    e.preventDefault();
    var imgSrc = this.getAttribute('href');
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox').classList.add('active');
  });
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === this) {
    closeLightbox();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});
</script>

---

<span class='anchor' id='educations'></span>
# Education

<div class="edu-item">
  <h4>Ph.D. in Computer Science, University of Missouri</h4>
  <div class="date">2023 - 2027 (expected)</div>
  <p>Advisor: Dr. Tanu Malik | GPA: 3.9/4.0<br>
  Research: Trustworthy AI, LLM Efficiency, Reproducibility<br>
  Funded by NASA, NSF, and Department of Defense</p>
</div>

<div class="edu-item">
  <h4>M.S. in Computer Science, University of Missouri</h4>
  <div class="date">2023 - 2025</div>
  <p>Advisors: Dr. Jianlin Cheng, Dr. Grant Scott | GPA: 4.0/4.0<br>
  Thesis: Deploying LLM-as-a-Service in Kubernetes HPC Clusters</p>
</div>

<div class="edu-item">
  <h4>B.Tech in Computer Science (Data Analytics), VIT Vellore</h4>
  <div class="date">2019 - 2023</div>
  <p>Thesis: Multilingual Sentiment Analysis on KOO platform<br>
  Awards: Dean's Research Excellence Award, Best Thesis Award</p>
</div>

---

<span class='anchor' id='professional-experience'></span>
# Experience

<div class="exp-item">
  <h4>Microsoft — Research Data Science Intern</h4>
  <div class="date">Summer 2026</div>
</div>

<div class="exp-item">
  <h4>University of Missouri, Radiant Lab — Research Assistant</h4>
  <div class="date">Jan 2024 - Present</div>
  <p>NASA-funded research on reproducible scientific containers and self-reflecting LLMs<br>
  Advisor: Dr. Tanu Malik</p>
</div>

<div class="exp-item">
  <h4>University of Missouri, Data Intensive Computing Lab — Research & Teaching Assistant</h4>
  <div class="date">Feb 2024 - Present</div>
  <p>DoD/NSF-funded research on hallucination detection in LLMs (30% improvement)<br>
  TA for Web Development: mentored 115+ students<br>
  Advisors: Dr. Grant Scott, Dr. Jianlin Cheng</p>
</div>

<div class="exp-item">
  <h4>Adobe — Volunteer Research Intern</h4>
  <div class="date">May 2022 - Jan 2023</div>
  <p>Web scraping and information extraction for NLP team</p>
</div>

---

<span class='anchor' id='academic-service'></span>
# Service

**Reviewer:** NeurIPS, ICML, ACL, CVPR, ICLR, AAAI, EMNLP, ECCV, ICCV, IJCAI, NAACL, ICASSP

**Journals:** TPAMI, TIP, TMLR, JVCI

---

# Teaching

- **Teaching Assistant**, Web Development (MERN Stack) — Fall 2025, Fall 2024, Spring 2024, Fall 2023

---

<div style="text-align: center; margin-top: 3rem; color: #666;">
  <p>Thanks for visiting! Feel free to reach out.</p>
  <p>
    <a href="mailto:bv3hz@umsystem.edu">Email</a> ·
    <a href="https://github.com/bhanuprakashvangala">GitHub</a> ·
    <a href="https://www.linkedin.com/in/vangalabhanuprakash/">LinkedIn</a>
  </p>
</div>
