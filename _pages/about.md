---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}


<span class='anchor' id='about-me'></span>

# About Me

<!-- Enhanced About Section with Stats and Dynamic Elements -->
<div class="about-container-wrapper">
<div class="about-container">
  <div class="about-main-grid">
    <!-- Left Column: Personal Info -->
    <div class="about-info">
      <div class="about-header">
        <h2 style="margin: 0; font-size: 2rem; background: linear-gradient(135deg, #2c5aa0, #4caf50); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Hello! I'm Bhanu Prakash Vangala</h2>
        <p style="font-size: 1.1rem; color: #666; margin: 0.5rem 0;">Ph.D. Researcher in Computer Science</p>
        <p style="color: #2c5aa0; font-weight: 600;">University of Missouri, Columbia</p>
      </div>
      
      <div class="about-description">
        <p>My research focuses on building AI that is <strong>trustworthy</strong>, <strong>efficient</strong>, and <strong>reliable</strong>, with an emphasis on <strong>large language models (LLMs)</strong>, <strong>high-performance computing (HPC)</strong>, and <strong>scalable, reproducible systems</strong>. I began my graduate journey at Mizzou, completing my M.S. in Computer Science under <a href="https://scottgs.mufaculty.umsystem.edu/" target="_blank"><strong>Dr. Grant Scott</strong></a> and <a href="https://en.wikipedia.org/wiki/Jianlin_Cheng" target="_blank"><strong>Dr. Jianlin Cheng</strong></a>. During my master's, I worked on designing robust frameworks for deploying LLMs on distributed and HPC environments and studied hallucinations in AI for materials science — work that naturally evolved into my Ph.D. research under <a href="https://engineering.missouri.edu/faculty/tanu-malik/" target="_blank"><strong>Dr. Tanu Malik</strong></a> at <strong>Radiant Lab</strong>.</p>
        <p>My work addresses some of the most critical questions and faults in AI today: <em><strong>How can we build systems that not only generate knowledge but also justify/correct and verify their outputs? Can they be scalable and reproducible? Will LLMs eventually become true personal agents that understand and work alongside us?</strong></em></p>
        <p>Beyond my technical work, I am passionate about <strong>mentoring students</strong> as a teaching assistant, <strong>writing and blogging</strong> about graduate life abroad and technical concepts in LLMs, and building tools that make AI systems more <strong>interpretable</strong>, <strong>effective</strong>, <strong>reproducible</strong>, and <strong>aligned with human values</strong> — a vision that guides every aspect of my research.</p>
      </div>
      
      <!-- Research Areas of Focus - Moved Up -->
      <div class="focus-section-early">
        <h4 style="color: #2c5aa0; margin: 1.5rem 0 1rem 0; text-align: center; font-size: 1.2rem;">Research Areas of Focus</h4>
        <div class="focus-grid-2x2">
          <div class="focus-card-interactive" onclick="openFocusModal('trustworthy', this)">
            <div class="focus-title">Trustworthy AI</div>
            <div class="click-indicator">Click to learn more</div>
          </div>
          
          <div class="focus-card-interactive" onclick="openFocusModal('scalable', this)">
            <div class="focus-title">Scalable Systems</div>
            <div class="click-indicator">Click to learn more</div>
          </div>
          
          <div class="focus-card-interactive" onclick="openFocusModal('factuality', this)">
            <div class="focus-title">Factuality</div>
            <div class="click-indicator">Click to learn more</div>
          </div>
          
          <div class="focus-card-interactive" onclick="openFocusModal('scientific', this)">
            <div class="focus-title">Scientific AI</div>
            <div class="click-indicator">Click to learn more</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Dynamic Stats -->
    <div class="about-stats">
      <div class="stats-grid">
        <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-number" data-target="4.0">0</div>
          <div class="stat-label">4.0 GPA</div>
        </div>
        
        <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-number" data-target="8">0</div>
          <div class="stat-label">Publications</div>
        </div>
        
        <div class="stat-card" data-aos="fade-up" data-aos-delay="300">
          <div class="stat-number" data-target="15">0</div>
          <div class="stat-label">Projects</div>
        </div>
        
        <div class="stat-card" data-aos="fade-up" data-aos-delay="400">
          <div class="stat-number" data-target="100">0</div>
          <div class="stat-label">Students Mentored</div>
        </div>
      </div>
      
      <!-- Funding Agencies -->
      <div class="funding-section">
        <h4 style="text-align: center; color: #2c5aa0; margin: 1.5rem 0 1rem 0;">Research Supported By</h4>
        <div class="funding-logos">
          <div class="funding-item">
            <div class="funding-logo">
              <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="NASA" style="height: 30px; width: auto;">
            </div>
            <span>NASA</span>
          </div>
          <div class="funding-item">
            <div class="funding-logo">
              <img src="https://www.erdcwerx.org/wp-content/uploads/2023/02/ERDC-Logo-Featured-Image.png" alt="ERDC" style="height: 30px; width: auto;">
            </div>
            <span>Department of Defense (ERDC)</span>
          </div>
          <div class="funding-item">
            <div class="funding-logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/NSF_logo.png/240px-NSF_logo.png" alt="NSF" style="height: 30px; width: auto;">
            </div>
            <span>National Science Foundation</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Collaboration Status -->
  <div class="collaboration-status">
    <div class="status-indicator">
      <span class="status-dot"></span>
      <span class="status-text">Available for internships & collaborations</span>
    </div>
  </div>
  
</div>
</div>

<!-- Focus Area Modal -->
<div id="focusModal" class="focus-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 id="modalTitle"></h3>
      <span class="close-modal" onclick="closeFocusModal()">&times;</span>
    </div>
    <div class="modal-body">
      <div id="modalContent"></div>
    </div>
  </div>
</div>

<style>
  /* Enhanced About Section Styles */
  .about-container-wrapper {
    border-left: 4px solid #d4af37;
    border-right: 4px solid #d4af37;
    box-shadow: 0 0 0 2px #d4af37 inset;
    border-radius: 20px;
    padding: 2rem;
    margin: 2rem 0;
    position: relative;
    background: 
      linear-gradient(135deg, rgba(44, 90, 160, 0.03) 0%, rgba(76, 175, 80, 0.03) 100%),
      radial-gradient(circle at 20% 80%, rgba(44, 90, 160, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(212, 175, 55, 0.03) 0%, transparent 50%),
      linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
    background-size: 100% 100%, 600px 600px, 600px 600px, 800px 800px, 100% 100%;
    overflow: hidden;
  }
  
  .about-container-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 175, 55, 0.03) 35px, rgba(212, 175, 55, 0.03) 70px),
      repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(44, 90, 160, 0.02) 35px, rgba(44, 90, 160, 0.02) 70px);
    pointer-events: none;
    z-index: 0;
  }
  
  .about-container-wrapper > * {
    position: relative;
    z-index: 1;
  }
  
  /* Collaboration Status Indicator */
  .collaboration-status {
    position: absolute;
    bottom: 0.5rem;
    right: 2rem;
    background: white;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border: 1px solid #e5e7eb;
    z-index: 2;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-dot {
    width: 10px;
    height: 10px;
    background: #4caf50;
    border-radius: 50%;
    position: relative;
    animation: pulse-green 2s infinite;
  }
  
  .status-dot::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    background: #4caf50;
    border-radius: 50%;
    opacity: 0.3;
    animation: pulse-ring 2s infinite;
  }
  
  @keyframes pulse-green {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.3); opacity: 0.1; }
    100% { transform: scale(1); opacity: 0.3; }
  }
  
  .status-text {
    font-size: 0.9rem;
    color: #333;
    font-weight: 500;
  }
  
  .about-container {
    background: transparent;
    border-radius: 0;
    padding: 0;
    margin: 0;
    box-shadow: none;
  }
  
  .about-main-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;
    align-items: start;
  }
  
  .about-info {
    padding-right: 1rem;
  }
  
  .about-header h2 {
    background: linear-gradient(135deg, #2c5aa0, #4caf50);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .about-description p {
    line-height: 1.7;
    margin: 1rem 0;
    color: #555;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 2px solid transparent;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(44, 90, 160, 0.15);
    border-color: #2c5aa0;
  }
  
  .stat-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #2c5aa0;
    margin: 0.5rem 0;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 600;
  }
  
  .funding-section {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  }
  
  .funding-logos {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .funding-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .funding-item:hover {
    background: #e3f2fd;
    transform: translateX(5px);
  }
  
  .funding-logo {
    font-size: 1.5rem;
    width: 40px;
    text-align: center;
  }
  
  .funding-item span {
    font-size: 0.9rem;
    font-weight: 600;
    color: #555;
  }
  
  /* New 2x2 Research Focus Grid */
  .focus-section-early {
    margin: 2rem 0;
  }
  
  .focus-grid-2x2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .focus-card-interactive {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 1rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  
  .focus-card-interactive:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: #2c5aa0;
    background: linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%);
    box-shadow: 0 6px 20px rgba(44, 90, 160, 0.15);
  }
  
  .focus-card-interactive:active {
    transform: translateY(-2px) scale(1.01);
  }
  
  .focus-title {
    font-size: 1rem;
    font-weight: 700;
    color: #2c5aa0;
    margin-bottom: 0.3rem;
    transition: color 0.3s ease;
  }
  
  .focus-card-interactive:hover .focus-title {
    color: #1a4480;
  }
  
  .click-indicator {
    font-size: 0.8rem;
    color: #666;
    opacity: 0.7;
    transition: all 0.3s ease;
    font-style: italic;
  }
  
  .focus-card-interactive:hover .click-indicator {
    opacity: 1;
    color: #2c5aa0;
    font-weight: 600;
  }
  
  /* Add pulse animation for attention */
  .focus-card-interactive::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #2c5aa0, #4caf50, #2c5aa0);
    border-radius: 17px;
    z-index: -1;
    animation: borderPulse 3s ease-in-out infinite;
    opacity: 0;
  }
  
  .focus-card-interactive:hover::before {
    opacity: 0.6;
  }
  
  @keyframes borderPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }
  
  /* Research Areas Layout */
  .research-areas-layout {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 2rem;
  }
  
  .focus-section {
    max-width: 400px;
  }
  
  .focus-items {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .focus-item {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem;
    background: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e5e7eb;
    position: relative;
  }
  
  .focus-item:hover {
    background: #f8f9fa;
    transform: translateX(5px) scale(1.02);
    box-shadow: 0 6px 16px rgba(44, 90, 160, 0.15);
    border-color: #2c5aa0;
  }
  
  .focus-logo {
    font-size: 1.8rem;
    width: 50px;
    text-align: center;
    flex-shrink: 0;
  }
  
  .focus-item span {
    flex: 1;
    font-size: 1rem;
    font-weight: 600;
    color: #2c5aa0;
  }
  
  /* Modal Styles */
  .focus-modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(5px);
    animation: fadeIn 0.3s ease;
  }
  
  .modal-content {
    background: white;
    margin: 5% auto;
    padding: 0;
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
    overflow: hidden;
  }
  
  .modal-header {
    background: linear-gradient(135deg, #2c5aa0 0%, #4caf50 100%);
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .close-modal {
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
    opacity: 0.8;
    transition: opacity 0.2s;
  }
  
  .close-modal:hover {
    opacity: 1;
  }
  
  .modal-body {
    padding: 2rem;
    line-height: 1.7;
    color: #555;
  }
  
  .modal-body p {
    margin: 1rem 0;
    font-size: 1rem;
  }
  
  .modal-body strong {
    color: #2c5aa0;
    font-weight: 600;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.7) translateY(-50px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
  
  @keyframes modalSlideOut {
    from {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    to {
      opacity: 0;
      transform: scale(0.7) translateY(-50px);
    }
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .about-main-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    
    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
    
    .focus-grid-2x2 {
      grid-template-columns: 1fr;
      gap: 1rem;
      max-width: 400px;
    }
    
    .focus-card-interactive {
      min-height: 70px;
      padding: 0.8rem;
    }
    
    .focus-grid {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    
    .focus-card {
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 480px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .about-container {
      padding: 1.5rem;
    }
  }
      .paper-box,
      .edu-box {
        border-left: 4px solid #d4af37;
        border-right: 4px solid #d4af37;
        box-shadow: 0 0 0 2px #d4af37 inset;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 1rem;
      }
      .edu-box {
        display: flex;
        align-items: flex-start;
      }
      .edu-box-icon {
        margin-right: 1rem;
        font-size: 1.5rem;
      }
        .paper-box-image .badge {
          background: #d4af37;
          color: #000;
        }
        .honor-item {
          display: flex;
          align-items: flex-start;
          background: #fafafa;
          border-left: 4px solid #d4af37;
          border-right: 4px solid #d4af37;
          box-shadow: 0 0 0 2px #d4af37 inset;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 1rem;
        }
        .honor-date {
          font-weight: bold;
          margin-right: 1rem;
          color: #00369f;
          min-width: 4.5em;
        }
        .honor-content {
          flex: 1;
        }
        
        /* Professional Experience Single Container */
        .experience-single-container {
          padding: 1.5rem;
          position: relative;
          display: flex;
          gap: 2rem;
        }
        
        .timeline-track {
          position: relative;
          width: 40px;
          flex-shrink: 0;
          z-index: 2;
        }
        
        .timeline-line {
          position: absolute;
          left: 20px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #2c5aa0, #4caf50);
          border-radius: 3px;
          z-index: 2;
        }
        
        .timeline-ball {
          position: absolute;
          left: 12px;
          top: 0;
          width: 20px;
          height: 20px;
          background: #2c5aa0;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 3px rgba(44, 90, 160, 0.3);
          transition: top 0.3s ease;
          z-index: 3;
        }
        
        .experience-entries {
          flex: 1;
        }
        
        .experience-entry {
          padding: 1rem 0;
          position: relative;
          display: flex;
          gap: 1rem;
        }
        
        .entry-marker {
          position: absolute;
          left: -48px;
          top: 1.2rem;
          width: 10px;
          height: 10px;
          background: #ddd;
          border-radius: 50%;
          border: 2px solid white;
          transition: all 0.3s ease;
          z-index: 2;
        }
        
        .experience-entry.active .entry-marker {
          background: #4caf50;
          width: 14px;
          height: 14px;
          left: -50px;
        }
        
        .entry-content {
          flex: 1;
        }
        
        .experience-entry:first-child {
          padding-top: 0;
        }
        
        .experience-entry:last-child {
          padding-bottom: 0;
        }
        
        .experience-entry h4 {
          color: #2c5aa0;
          margin-bottom: 0.5rem;
        }
        
        .experience-entry h4 small {
          color: #666;
          font-weight: normal;
        }
        
        .experience-entry .text-secondary {
          color: #6c757d;
          margin-bottom: 0.8rem;
        }
        
        .experience-entry ul {
          margin: 0;
          padding-left: 1.5rem;
        }
        
        .experience-entry li {
          margin-bottom: 0.5rem;
        }
        
        .experience-divider {
          margin: 1rem 0;
          border: none;
          border-top: 1px solid #e5e7eb;
        }
        
        .golden-border-wrapper {
          border-left: 4px solid #d4af37;
          border-right: 4px solid #d4af37;
          box-shadow: 0 0 0 2px #d4af37 inset;
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          position: relative;
          background: 
            linear-gradient(45deg, rgba(76, 175, 80, 0.04) 0%, rgba(44, 90, 160, 0.04) 100%),
            radial-gradient(circle at 75% 25%, rgba(212, 175, 55, 0.05) 0%, transparent 60%),
            radial-gradient(circle at 25% 75%, rgba(44, 90, 160, 0.04) 0%, transparent 60%),
            linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          background-size: 100% 100%, 500px 500px, 500px 500px, 100% 100%;
          overflow: hidden;
        }
        
        .golden-border-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(76, 175, 80, 0.02) 40px, rgba(76, 175, 80, 0.02) 80px),
            repeating-linear-gradient(-30deg, transparent, transparent 50px, rgba(212, 175, 55, 0.02) 50px, rgba(212, 175, 55, 0.02) 100px);
          pointer-events: none;
          z-index: 0;
        }
        
        .golden-border-wrapper > * {
          position: relative;
          z-index: 1;
        }
      </style>


<script>
// Animated counters for stats
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounters(), 20);
    } else {
      counter.innerText = target;
    }
  });
}

// Focus area modal functions
function openFocusModal(areaId, element) {
  const modal = document.getElementById('focusModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  
  // Research area content
  const focusContent = {
    trustworthy: {
      title: "🛡️ Trustworthy and Interpretable AI",
      content: `<p><strong>Building Self-Correcting AI Systems</strong></p>
                <p>Developing AI systems that do more than generate fluent outputs — they can reason transparently, explain their decision processes, detect inconsistencies, and actively self-correct. My work focuses on designing architectures and evaluation frameworks that empower models to justify their responses, ultimately fostering greater trust and adoption of AI in critical domains like science, healthcare, and law.</p>
                <p><strong>Key Research Areas:</strong></p>
                <ul>
                  <li>Hallucination detection and mitigation in large language models</li>
                  <li>Explainable AI architectures for critical applications</li>
                  <li>Self-correction mechanisms in neural networks</li>
                  <li>Transparent reasoning frameworks for scientific discovery</li>
                </ul>`
    },
    scalable: {
      title: "⚙️ Efficient and Scalable Language Models",
      content: `<p><strong>Democratizing AI Infrastructure</strong></p>
                <p>Pushing the boundaries of large-scale AI deployment through model compression, distributed training optimization, and advanced memory management. I design scalable architectures and Helm-based deployment pipelines that make state-of-the-art language models accessible to researchers and practitioners without requiring massive infrastructure investments.</p>
                <p><strong>Technical Focus Areas:</strong></p>
                <ul>
                  <li>Kubernetes-based LLM deployment in HPC environments</li>
                  <li>Serverless GPU orchestration with Pick-and-Spin framework</li>
                  <li>Multi-tenant inference systems for research clusters</li>
                  <li>Resource optimization and dynamic scaling algorithms</li>
                </ul>`
    },
    factuality: {
      title: "✅ Factuality and Evaluation",
      content: `<p><strong>Rigorous AI Reliability Assessment</strong></p>
                <p>Creating robust benchmarks and advanced evaluation pipelines to rigorously measure the factual consistency, reliability, and safety of language model outputs. By integrating contradiction detection graphs, retrieval-augmented checks, and semantic consistency metrics, I ensure that AI systems can be trusted in settings where accuracy is paramount.</p>
                <p><strong>Evaluation Innovations:</strong></p>
                <ul>
                  <li>HalluMatData benchmark for materials science LLM evaluation</li>
                  <li>Paraphrased Hallucination Consistency Score (PHCS) metric</li>
                  <li>Multi-stage detection pipelines with knowledge graph integration</li>
                  <li>Contradiction detection and semantic consistency frameworks</li>
                </ul>`
    },
    scientific: {
      title: "🔬 AI for Scientific Discovery",
      content: `<p><strong>Accelerating Research Breakthroughs</strong></p>
                <p>Leveraging the power of LLMs and multimodal AI to accelerate research in materials science, biomedical innovation, and policy modeling. My work enables domain scientists to harness AI as a collaborative partner — not only to analyze and generate data, but to form hypotheses, validate findings, and drive scientific breakthroughs with greater efficiency and confidence.</p>
                <p><strong>Scientific Applications:</strong></p>
                <ul>
                  <li>Materials science research with domain-specific LLMs</li>
                  <li>Biomedical innovation and drug discovery acceleration</li>
                  <li>Reproducible scientific computing with AI integration</li>
                  <li>Multimodal AI for complex scientific data analysis</li>
                </ul>`
    }
  };
  
  // Set modal content
  modalTitle.innerHTML = focusContent[areaId].title;
  modalContent.innerHTML = focusContent[areaId].content;
  
  // Add click source animation effect
  element.style.transform = 'scale(0.95)';
  setTimeout(() => {
    element.style.transform = '';
  }, 200);
  
  // Show modal
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeFocusModal() {
  const modal = document.getElementById('focusModal');
  const modalContent = modal.querySelector('.modal-content');
  
  // Add closing animation
  modalContent.style.animation = 'modalSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
  
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    modalContent.style.animation = '';
  }, 300);
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('focusModal');
  if (event.target === modal) {
    closeFocusModal();
  }
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains('stat-card')) {
        animateCounters();
      }
    }
  });
});

// Professional Experience Timeline Animation
function updateTimelineBall() {
  const entries = document.querySelectorAll('.experience-entry');
  const ball = document.getElementById('experienceBall');
  
  if (!ball || entries.length === 0) return;
  
  const scrollPosition = window.scrollY + window.innerHeight / 2;
  
  entries.forEach((entry, index) => {
    const rect = entry.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const absoluteBottom = absoluteTop + rect.height;
    
    // Check if this entry is in view
    if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
      // Update ball position
      const marker = entry.querySelector('.entry-marker');
      if (marker) {
        const markerRect = marker.getBoundingClientRect();
        const markerTop = markerRect.top + window.scrollY - entry.parentElement.parentElement.getBoundingClientRect().top - window.scrollY;
        ball.style.top = (markerTop - 5) + 'px';
      }
      
      // Update active state
      entries.forEach(e => e.classList.remove('active'));
      entry.classList.add('active');
    }
  });
}

// Observe stat cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.stat-card').forEach(card => {
    observer.observe(card);
  });
  
  // Initialize timeline
  updateTimelineBall();
  
  // Update on scroll
  window.addEventListener('scroll', updateTimelineBall);
  window.addEventListener('resize', updateTimelineBall);
});

// Professional Experience Section Styles
const experienceStyles = `
  .experience-section-unified {
    margin: 2rem 0;
    padding: 2rem;
  }
  
  .experience-main-highlight {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 15px;
    border-left: 5px solid #2c5aa0;
    text-align: center;
  }
  
  .unified-timeline {
    position: relative;
    padding-left: 2rem;
  }
  
  .unified-timeline::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, #2c5aa0, #4caf50);
    border-radius: 3px;
  }
  
  .experience-item {
    position: relative;
    margin-bottom: 2rem;
    background: #fafafa;
    border-radius: 15px;
    padding: 1.5rem;
    transition: all 0.3s ease;
  }
  
  .experience-item:hover {
    background: #f0f8ff;
    transform: translateX(10px);
    box-shadow: 0 5px 20px rgba(44, 90, 160, 0.1);
  }
  
  .experience-item.current {
    background: linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%);
    border: 2px solid rgba(44, 90, 160, 0.2);
  }
  
  .experience-item.featured {
    background: linear-gradient(135deg, #fff3e0 0%, #fafafa 100%);
    border: 2px solid rgba(255, 152, 0, 0.3);
  }
  
  .timeline-marker {
    position: absolute;
    left: -2.3rem;
    top: 1.5rem;
    width: 12px;
    height: 12px;
    background: #ddd;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #ddd;
  }
  
  .timeline-marker.active {
    background: #2c5aa0;
    box-shadow: 0 0 0 3px #2c5aa0;
    animation: pulse 2s infinite;
  }
  
  .timeline-marker.featured {
    background: #ff9800;
    box-shadow: 0 0 0 3px #ff9800;
  }
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 3px #2c5aa0; }
    50% { box-shadow: 0 0 0 6px rgba(44, 90, 160, 0.5); }
    100% { box-shadow: 0 0 0 3px #2c5aa0; }
  }
  
  .item-content h4 {
    color: #2c5aa0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 700;
  }
  
  .item-content .role {
    color: #4caf50;
    font-weight: 600;
    font-size: 0.95rem;
  }
  
  .duration {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .impact {
    margin: 0.8rem 0;
    line-height: 1.6;
    color: #333;
    font-size: 0.95rem;
  }
  
  .impact strong {
    color: #2c5aa0;
  }
  
  .mentor, .recognition {
    margin-top: 1rem;
    font-style: italic;
    color: #666;
    font-size: 0.9rem;
  }
  
  .mentor a {
    color: #2c5aa0;
    text-decoration: none;
    font-weight: 600;
  }
  
  .mentor a:hover {
    text-decoration: underline;
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    .experience-section-unified {
      padding: 1.5rem;
    }
    
    .unified-timeline {
      padding-left: 1.5rem;
    }
    
    .timeline-marker {
      left: -1.8rem;
    }
    
    .experience-item {
      padding: 1rem;
    }
    
    .experience-item:hover {
      transform: translateX(5px);
    }
    
    .experience-main-highlight {
      padding: 1rem;
      font-size: 1.1rem;
    }
  }
`;

// Inject the styles
const styleSheet = document.createElement('style');
styleSheet.textContent = experienceStyles;
document.head.appendChild(styleSheet);
</script>

<span class='anchor' id='news'></span>
# News

- *2025.05*: Earned my M.S. in Computer Science (GPA: 4.0/4.0) from the [University of Missouri](https://engineering.missouri.edu/departments/eecs/eecs-research/), Columbia.  
- *2025.04*: Received the **Outstanding Master's Student Award** from the MU Department of Computer Science.  
- *2025.04*: Submitted a thesis proposal: *"Trustworthy AI: Building Self-correcting and Self-evolving Models for Scientific Discovery."*  
- *2025.04*: Presented our work on Hallucination Detection at **AAAI Spring Symposium 2025 on AI for Scientific Discovery track**  
- *2025.03*: Started development of **ReflectMemory**, focused on persistent memory control for long-context LLM reasoning.  
- *2025.03*: Deployed updated **KubeLLM** framework for multi-tenant LLM inference on GPU-based HPC clusters.  
- *2025.02*: Achieved **Runner-Up** in the MUIDSI School for Generative AI for Social Good hackathon on VisionAI for Visually Impaired project.  
- *2025.01*: Released benchmarking tools for **hallucination detection in scientific LLMs**, supporting hybrid evaluation methods.  
- *2024.09*: Initiated documentation work on scalable **LLM-as-a-Service infrastructure** using Helm charts and node affinity scheduling.  
- *2024.01*: Working as a TA for over 100 students in a web development course – guiding full-stack app development.  
- *2023.12*: Led deployment of GPU-efficient LLM inference systems in the university's Kubernetes-based HPC environment (Nautilus).  
- *2023.08*: Began research on **faithfulness, interpretability, and robustness** in large generative language models.  
- *2023.06*: Admitted to the Ph.D. program in Computer Science at the [University of Missouri](https://engineering.missouri.edu/departments/eecs/eecs-research/).  
- *2023.05*: Graduated with a B.Tech in CSE (Data Analytics) from VIT Vellore.  
- *2023.04*: Honored with the **Excellence in Research** Award at VIT for multilingual NLP and social media analytics contributions.  
- *2023.03*: Volunteered as an **AI Community Evangelist** at Adobe, contributing to community education and developer engagement.  
- *2022.11*: Served as an **Internshala Student Partner (ISP)**, leading brand campaigns and peer mentoring on campus.  
- *2020*: Joined the **Brandiverse** team as a creative contributor, working on outreach and media strategy.  
- *2021*: Collaborated with the **Synergy Team** at VIT, supporting student experience initiatives and university development programs.

<span class='anchor' id='publications'></span>
# Publications
<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">AAAI 2025</div>
      <img src='images/HalluMat-Portfolio%20Image.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1oMbe8br7-wm7NLkrOFbFGtT2vUlxdCTn/view?usp=drive_link">HalluMat: Hallucination Detection in Scientific LLMs</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Jianlin Cheng</p>
    <ul>
      <li><strong>Primary Innovation:</strong> Developed HalluMatData, a comprehensive benchmark dataset specifically designed for evaluating hallucination detection methods in domain-specific large language models applied to materials science research</li>
      <li><strong>Technical Framework:</strong> Implemented HalluMatDetector, a sophisticated multi-stage detection pipeline that combines intrinsic verification mechanisms, multi-source knowledge retrieval, contradiction graph analysis, and comprehensive metric-based assessment protocols</li>
      <li><strong>Quantitative Results:</strong> Demonstrated significant improvement with 30% reduction in hallucination rates compared to baseline LLM outputs, with particular effectiveness in high-entropy query scenarios across multiple materials science subdomains</li>
      <li><strong>Methodological Contribution:</strong> Introduced the Paraphrased Hallucination Consistency Score (PHCS), a novel metric for quantifying inconsistencies in LLM responses across semantically equivalent queries, providing deeper insights into model reliability patterns</li>
      <li><strong>Knowledge Integration:</strong> Combined knowledge graph-based contradiction detection with fine-grained factual verification techniques to establish a more reliable and interpretable framework for AI-assisted scientific discovery processes</li>
      <li><strong>Domain Impact:</strong> Addresses critical challenges in research integrity by providing tools to detect and mitigate factually incorrect or misleading information generation in scientific contexts</li>
    </ul>
    <div style="display: inline">
      <a class="pdf-link" href="https://drive.google.com/file/d/1oMbe8br7-wm7NLkrOFbFGtT2vUlxdCTn/view?usp=drive_link" title="PDF"><i class="fas fa-file-pdf"></i></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Artificial Intelligence (AI), particularly Large Language Models (LLMs), is transforming scientific discovery, enabling rapid knowledge generation and hypothesis formulation. However, a critical challenge is hallucination, where LLMs generate factually incorrect or misleading information, compromising research integrity. To address this, we introduce HalluMatData, a benchmark dataset for evaluating hallucination detection methods, factual consistency, and response robustness in AI-generated materials science content. Alongside, we propose HalluMatDetector, a multi-stage hallucination detection framework integrating intrinsic verification, multi-source retrieval, contradiction graph analysis, and metric-based assessment to detect and mitigate LLM hallucinations. Our findings reveal that hallucination levels vary significantly across materials science subdomains, with high-entropy queries exhibiting greater factual inconsistencies. By utilizing HalluMatDetector’s verification pipeline, we reduce hallucination rates by 30% compared to standard LLM outputs. Furthermore, we introduce the Paraphrased Hallucination Consistency Score (PHCS) to quantify inconsistencies in LLM responses across semantically equivalent queries, offering deeper insights into model reliability. Combining knowledge graph-based contradiction detection and fine-grained factual verification, our dataset and framework establish a more reliable, interpretable, and scientifically rigorous approach for AI-driven discoveries.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">AAAI 2025</div>
      <img src='images/HalluFormer-Portfolio%20Image.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1o6tqCJdhiCTAR4AEM59fV4t2VSdvS4yt/view?usp=drive_link">HalluFormer: Faithfulness Evaluation Framework</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Jianlin Cheng</p>
    <ul>
      <li><strong>Architectural Innovation:</strong> Designed a novel transformer-based neural architecture specifically optimized for multi-dimensional consistency assessment between input questions, generated answers, and retrieved knowledge contexts in large language model outputs</li>
      <li><strong>Problem Reformulation:</strong> Transformed the traditionally complex hallucination detection challenge into a well-defined classification problem that systematically evaluates consistency patterns across diverse knowledge sources and contextual information</li>
      <li><strong>Empirical Performance:</strong> Achieved robust performance with F1 score of 0.9471 on the established MultiNLI test dataset, and demonstrated strong generalization capabilities with F1 score of 0.7285 on the blind ANAH evaluation dataset</li>
      <li><strong>Cross-Domain Generalization:</strong> Exhibits exceptional ability to detect hallucinations across previously unseen data distributions, indicating strong transferability and robustness of the underlying detection mechanisms</li>
      <li><strong>High-Stakes Applications:</strong> Successfully deployed and validated in critical scientific and clinical research environments where factual accuracy is paramount and erroneous information could have significant consequences</li>
      <li><strong>Methodological Advancement:</strong> Establishes transformer-based approaches as a viable and effective paradigm for improving the reliability and trustworthiness of large language model systems in knowledge-intensive domains</li>
    </ul>
    <div style="display: inline">
      <a class="pdf-link" href="https://drive.google.com/file/d/1o6tqCJdhiCTAR4AEM59fV4t2VSdvS4yt/view?usp=drive_link" title="PDF"><i class="fas fa-file-pdf"></i></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Despite the impressive performance of Large Language Models (LLMs) in a variety of natural language processing tasks, they are still prone to producing information that is factually inaccurate, known as hallucination. In critical fields related to scientific and clinical domains that demand highly precise answers, the negative effect of this phenomenon is even more pronounced. To address this problem, we formulate the hallucination detection problem as a classification problem of assessing the consistency between questions, answers and retrieved knowledge contexts and propose HalluFormer, a transformer-based model for detecting hallucinations of LLMs. HalluFormer was trained and tested on the MultiNLI dataset. It achieves an F1 score of 0.9471 on the MultiNLI test dataset. On the blind ANAH test dataset, it achieves an F1 score of 0.7285, indicating it can generalize reasonably well to completely new data. The results demonstrate that transformer-based methods can be utilized to detect hallucinations of LLMs, paving the way for further research on improving the reliability of LLMs.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">SC 2025 Poster</div>
      <img src='images/AdaptiveLLMaaS.png' alt="Adaptive LLM Orchestration Architecture" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://submissions.supercomputing.org/">Adaptive Inference: Orchestrating Fine-Tuned LLMs with Serverless GPUs in HPC Environments</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Tanu Malik</p>
    <ul>
      <li><strong>Research Poster Presentation:</strong> Presented Pick-and-Spin framework as a research poster at SC 2025, showcasing preliminary results and methodology for policy-driven model selection with serverless GPU orchestration</li>
      <li><strong>Matrix-Based Orchestration Concept:</strong> Introduced the conceptual framework of a two-dimensional grid (L×I) deployment model where rows represent fine-tuned models and columns denote inference backends for dynamic routing</li>
      <li><strong>Adaptive Routing Algorithm Design:</strong> Proposed a multi-objective scoring function approach that balances domain relevance (using DistilBERT classification), predicted latency, and estimated cost with configurable weights</li>
      <li><strong>Serverless GPU Architecture Prototype:</strong> Demonstrated proof-of-concept for scale-to-zero serverless execution using Kubernetes with Knative and KEDA for on-demand service provisioning</li>
      <li><strong>Preliminary Performance Results:</strong> Initial evaluation showing superior scalability and GPU utilization potential compared to always-on deployments, with promising cost reduction indicators</li>
      <li><strong>Future Paper Development:</strong> Research poster serves as foundation for planned comprehensive paper submission with extended evaluation, enhanced methodology, and detailed performance analysis</li>
    </ul>
    <div style="display: inline">
      <a class="pdf-link" href="https://submissions.supercomputing.org/" title="SC25 Poster Submission"><i class="fas fa-file-pdf"></i></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Large Language Models (LLMs) are increasingly fine-tuned for domain-specific applications in science, engineering, and industry. However, providing these models as a service (LLMaaS) or self hosting poses cost and efficiency challenges: commercial APIs impose high recurring fees, while running multiple fine-tuned models locally wastes expensive GPUs when they sit idle. We present Pick-and-Spin, a framework that combines policy-driven model selection with serverless GPU orchestration. We conceptualize deployment as a two-dimensional grid (L×I), where rows represent fine-tuned models and columns denote inference backends. When a user submits a prompt, Pick-and-Spin dynamically routes it to the most relevant and cost-effective (model, backend) pair, spinning up services on demand while scaling idle ones to zero. By unifying adaptive routing with serverless execution, Pick-and-Spin demonstrates a scalable and affordable pathway for delivering domain-specific LLMs in high-performance computing (HPC) research environments.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Master's Thesis</div>
      <img src='images/LLM-as-Service-portfolio-image.png' alt="LLM-as-Service portfolio image" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="#">Deploying LLM-as-a-Service in Kubernetes HPC Clusters</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Grant Scott, Jianlin Cheng</p>
    <ul>
      <li><strong>Foundational Infrastructure:</strong> Established the foundational Helm-chart-based deployment ecosystem that later evolved into the Pick-and-Spin framework, enabling scalable and reliable large language model inference services in HPC environments</li>
      <li><strong>Core Resource Management:</strong> Engineered fundamental GPU affinity scheduling algorithms, dynamic resource throttling mechanisms, and load balancing protocols that form the basis for advanced serverless orchestration</li>
      <li><strong>Multi-Tenancy Foundation:</strong> Designed secure, isolated multi-tenant access configurations supporting concurrent research workflows while maintaining data privacy and computational resource fairness</li>
      <li><strong>Performance Baseline:</strong> Established baseline performance metrics with 60% reduction in deployment overhead and 40% enhancement in resource utilization, providing the foundation for adaptive scaling improvements</li>
      <li><strong>Production Validation:</strong> Successfully deployed and validated the foundational system on the Nautilus distributed computing cluster, serving over 100 concurrent users and informing the development of dynamic orchestration capabilities</li>
      <li><strong>Architectural Foundation:</strong> Created the underlying architecture and design principles that enabled the evolution toward serverless, adaptive LLM orchestration with Pick-and-Spin framework</li>
    </ul>
    <div style="display: inline">
      <a href="#"><strong>[thesis]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>This foundational work establishes the architectural principles and deployment strategies for large language models in high-performance computing (HPC) environments that later evolved into the Pick-and-Spin framework. It outlines the core Helm-chart-based approach for deploying containerized models with GPU affinity scheduling, resource throttling, and multi-user access configurations. The research provides the technical foundation for dynamic model orchestration, serverless scaling, and adaptive routing capabilities that enable efficient multi-model LLM deployments in research environments.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
        <div class="badge">Project</div>
      <img src='images/Brain%20Tumor-Portfolio%20Image.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1upCswGveonJPN2vmuXzKlhbKqE8tkGSA/view?usp=sharing">Brain Tumor Detection in MRI Images</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong></p>
    <ul>
      <li><strong>Model Architecture:</strong> Developed and implemented two distinct convolutional neural network architectures: a custom-designed CNN optimized for brain tumor detection and a transfer learning approach utilizing the pre-trained ResNet50V2 architecture</li>
      <li><strong>Data Engineering:</strong> Processed comprehensive MRI image datasets with advanced data augmentation techniques including random flipping, rotation, and zooming transformations to enhance model robustness and reduce overfitting</li>
      <li><strong>Performance Optimization:</strong> Conducted systematic hyperparameter tuning and learning rate optimization to achieve optimal training parameters, resulting in improved accuracy and generalization capabilities</li>
      <li><strong>Evaluation Framework:</strong> Implemented rigorous model evaluation using multiple metrics including accuracy, precision, recall, and F1-score, with comprehensive visualization through confusion matrices and performance analytics</li>
      <li><strong>Clinical Relevance:</strong> Demonstrated the practical potential of neural networks in medical imaging diagnostics, contributing to automated diagnostic assistance tools for healthcare professionals</li>
      <li><strong>Technical Implementation:</strong> Utilized TensorFlow and Keras frameworks with Google Colab infrastructure for efficient model training and deployment</li>
    </ul>
    <div style="display: inline">
      <a href="https://drive.google.com/file/d/1upCswGveonJPN2vmuXzKlhbKqE8tkGSA/view?usp=sharing"><strong>[project]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Abstract—This study presents a comprehensive approach to detecting brain tumors using deep learning algorithms implemented in TensorFlow. The project develops two distinct convolutional neural network (CNN) models— a custom-designed CNN and the pre-trained ResNet50V2— to identify and classify brain tumor presence from MRI images across two datasets. Both models underwent rigorous training, evaluation, and optimization to enhance their accuracy and generalization capabilities. The custom CNN model included data augmentation techniques like random flipping, rotation, and zooming to reduce overfitting and improve model robustness. The performance of each model was meticulously analyzed through metrics such as accuracy, precision, recall, and F1-score, with results visualized using confusion matrices and performance charts. Additionally, learning rate optimization was performed to find the most effective training parameters. The study not only demonstrates the potential of neural networks in medical imaging diagnostics but also explores the effectiveness of model customization and transfer learning for practical applications in healthcare.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">MICCAI</div>
      <img src='images/Pneumonia-Portfolio%20Image.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1UJKKHXcFIvtjClUyrr6dhatMKN1svU7C/view?usp=sharing">Pneumonia Detection in Chest X-rays Using Deep Learning</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong></p>
    <ul>
      <li><strong>Multi-Model Approach:</strong> Implemented and evaluated five distinct deep learning architectures including custom CNN, ResNet18, VGG16, ResNet50 with K-Fold Cross-Validation, and EfficientNet for comprehensive performance comparison</li>
      <li><strong>Dataset Scale:</strong> Trained on extensive Chest X-Ray Pneumonia dataset containing 5,216 training images, employing rigorous validation protocols using precision, recall, F1-score, and ROC-AUC metrics</li>
      <li><strong>Advanced Training Strategies:</strong> Utilized innovative techniques including K-fold cross-validation for robust model assessment and multi-GPU acceleration for enhanced computational efficiency</li>
      <li><strong>Performance Excellence:</strong> Achieved superior classification results with EfficientNet demonstrating the highest performance, validating the effectiveness of state-of-the-art architectures in medical image analysis</li>
      <li><strong>Clinical Integration:</strong> Designed solutions specifically for integration into clinical workflows to assist radiologists in diagnostic decision-making processes</li>
      <li><strong>Healthcare Impact:</strong> Addresses critical needs in global healthcare by providing automated, scalable pneumonia detection systems for improved patient outcomes worldwide</li>
    </ul>
    <div style="display: inline">
      <a href="https://drive.google.com/file/d/1UJKKHXcFIvtjClUyrr6dhatMKN1svU7C/view?usp=sharing"><strong>[project]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Abstract—Pneumonia is a leading cause of morbidity worldwide, necessitating prompt and accurate diagnosis to improve patient outcomes. This study leverages deep learning techniques to automate the detection of pneumonia from chest X-ray images. Five models are evaluated, including a custom Convolutional Neural Network (CNN), ResNet18, VGG16, ResNet50 with K-Fold Cross-Validation, and EfficientNet. Pretrained architectures are fine-tuned on the publicly available Chest X-Ray Pneumonia dataset, with 5,216 training images, and validated using precision, recall, F1-score, and ROC-AUC metrics. Innovative training strategies such as K-fold cross-validation and multi-GPU acceleration are employed to enhance model robustness. Among the models, EfficientNet achieves the highest classification performance, demonstrating the effectiveness of state-of-the-art architectures in medical image classification tasks. The results suggest that deep learning models can offer a reliable, scalable solution for pneumonia detection, paving the way for integration into clinical workflows to assist radiologists in diagnostic decision-making.</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">IJARESM</div>
      <img src='images/image%20colorization-portfolio%20image.jpg' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/14GH6eNzC28uhcN1Y-E3iZJ9a5G8mdXLz/view?usp=sharing">Image Colorization Using AI</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong></p>
    <ul>
      <li><strong>Technical Innovation:</strong> Developed sophisticated deep learning models combining convolutional autoencoders and Generative Adversarial Network (GAN) architectures to achieve photorealistic image colorization from grayscale inputs</li>
      <li><strong>Architectural Design:</strong> Implemented advanced neural network architectures that learn complex color mappings and semantic understanding to produce naturally colored images with high fidelity</li>
      <li><strong>Training Methodology:</strong> Utilized large-scale image datasets with carefully designed loss functions and training protocols to ensure color accuracy and visual coherence across diverse image categories</li>
      <li><strong>Quality Assessment:</strong> Achieved superior results in both quantitative metrics and qualitative visual evaluation, demonstrating significant improvements over traditional colorization methods</li>
      <li><strong>Cultural Application:</strong> Successfully applied to historical photograph restoration and film colorization projects, contributing to cultural preservation and media enhancement initiatives</li>
      <li><strong>Research Impact:</strong> Published findings demonstrate the potential of AI-driven image processing techniques for creative applications and historical documentation preservation</li>
    </ul>
    <div style="display: inline">
      <a href="https://drive.google.com/file/d/14GH6eNzC28uhcN1Y-E3iZJ9a5G8mdXLz/view?usp=sharing"><strong>[project]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>Colourization is a PC helped procedure of adding shading to a monochrome picture or film. The procedure involves typically segmenting pictures into areas and following these regions across picture sequences. Neither of these undertakings can be performed dependably by and by; thus, colourization requires extensive user mediation and remains a monotonous, tedious, and costly assignment. Colourization is a term presented by Wilson Markle in 1970 to describe the PC helped process he developed for including shading. Colourizing black and white movies is an old idea going back to 1902. For a considerable length of time, numerous filmmakers restricted colourizing their black and white motion pictures and considered it vandalism of their craft. Today it is acknowledged as an upgrade to the artistic expression. The innovation itself has moved from meticulous hand colourization to the present largely automated strategy. In India, the film Mughal-e-Azam, a blockbuster released in 1960 was remastered in color in 2004. People from different ages crowded the theatres to see it in color, and the movie was a huge hit for the second time!</p>
    </details>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Project</div>
      <img src='images/KOO-Portfolio%20Image.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1a2Xan4sDdC7ib7Hj5HODcjPyztmTee4k/view?usp=sharing">KOO: Uncovering User Sentiments and Trends!</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong></p>
    <ul>
      <li><strong>Multilingual NLP Pipeline:</strong> Engineered a comprehensive sentiment analysis system capable of processing and analyzing user-generated content across multiple languages including Hindi, English, Telugu, and other regional Indian languages</li>
      <li><strong>Advanced Machine Learning:</strong> Implemented state-of-the-art transformer-based models and traditional machine learning algorithms optimized for social media text processing and sentiment classification tasks</li>
      <li><strong>Real-time Processing:</strong> Developed scalable infrastructure for real-time sentiment analysis of millions of posts and comments, enabling immediate insights into user sentiment trends and platform dynamics</li>
      <li><strong>Platform Integration:</strong> Successfully integrated the system into KOO's content moderation workflow, providing automated sentiment-based content filtering and user experience enhancement mechanisms</li>
      <li><strong>Data Science Innovation:</strong> Created novel approaches for handling code-switching, informal language patterns, and cultural context in multilingual social media text analysis</li>
      <li><strong>Business Impact:</strong> Delivered actionable insights that improved user engagement metrics and enhanced platform safety through proactive sentiment-based content management strategies</li>
    </ul>
    <div style="display: inline">
      <a href="https://drive.google.com/file/d/1a2Xan4sDdC7ib7Hj5HODcjPyztmTee4k/view?usp=sharing"><strong>[project]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>A multilingual sentiment analysis pipeline delivering real-time user sentiment trends on KOO to aid content moderation and enhance engagement.</p>
    </details>
  </div>
</div>

# Projects

<ul>
  <li>
    <strong>ReflectMemory for Self-Correcting LLMs</strong><br>
    Built a memory module to store chain-of-thought embeddings and ensure reasoning consistency across inference rounds.
  </li>
  <li>
    <strong>KubeLLM: LLM-as-a-Service Platform</strong>
    <a href="https://github.com/bhanuprakashvangala/LLM-as-a-Service" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Scalable platform for GPU-accelerated LLM inference with Kubernetes, Helm, and autoscaling.
  </li>
  <li>
    <strong>HalluMat &amp; HalluFormer</strong>
    <a href="https://github.com/bhanuprakashvangala/HalluDetection" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Evaluation pipelines benchmarking hallucination detection for scientific language models.
  </li>
  <li>
    <strong>ChatMed: Medical Chatbot for Health Guidance</strong>
    <a href="https://github.com/bhanuprakashvangala/chatmed.github.io" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Trained on BioGPT and PubMed articles to deliver symptom-based medical assistance.
  </li>
  <li>
    <strong>CropInsight: AI for Agriculture</strong>
    <a href="https://github.com/bhanuprakashvangala/CropInsight" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Uses computer vision and sequence models to monitor crop health and forecast yields.
  </li>
  <li>
    <strong>VisionAI: Hackathon Project @ Mizzou</strong>
    <a href="https://github.com/bhanuprakashvangala/VisionAI" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Real-time hazard indicator for visually impaired users, runner-up at the Mizzou hackathon.
  </li>
  <li>
    <strong>SocialSift: Crisis-aware Sentiment Analysis</strong>
    <a href="https://github.com/bhanuprakashvangala/SocialSift" target="_blank"><i class="fab fa-fw fa-github" aria-hidden="true"></i></a><br>
    Multilingual transformers analyze social media sentiment during natural disasters.
  </li>
</ul>

<span class='anchor' id='honors-and-awards'></span>
# Honors and Awards
<ul class="honors-section">
  <li class="honor-item">
    <div class="honor-date">2025.05</div>
    <div class="honor-content">
      <strong>Outstanding Master’s Student Award</strong>, College of Engineering, <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a>
      <div class="honor-images">
        <a href="images/image%20with%20dean.jpg">
          <img src="images/image%20with%20dean.jpg" alt="Outstanding Master’s Student Award with Dean">
        </a>
        <a href="images/Outstanding%20Student.jpeg">
          <img src="images/Outstanding%20Student.jpeg" alt="Outstanding Student Certificate">
        </a>
      </div>
    </div>
  </li>
  <li class="honor-item">
    <div class="honor-date">2025.03</div>
    <div class="honor-content">
      <strong>Runner-Up – MUIDSI Hackathon</strong> for <em>VisionAI: AI-Powered Assistance for the Visually Impaired</em>, awarded $1,000
      <div class="honor-images">
        <a href="images/Hackathon%20Winner.jpeg">
          <img src="images/Hackathon%20Winner.jpeg" alt="MUIDSI Hackathon Award">
        </a>
        <a href="images/Hackathon%20Winner%202.jpg">
          <img src="images/Hackathon%20Winner%202.jpg" alt="MUIDSI Hackathon Award">
        </a>
      </div>
    </div>
  </li>
  <li class="honor-item"><div class="honor-date">2025.04</div><div class="honor-content">Selected for <strong>Google PhD Fellowship Nomination</strong>, one of three <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a> nominees</div></li>
  <li class="honor-item"><div class="honor-date">2023</div><div class="honor-content"><strong>Dean’s Research Excellence Award</strong>, <a href="https://vit.ac.in/schools/school-of-computer-science-and-engineering-for-ug-courses" target="_blank">Vellore Institute of Technology</a> (VIT)</div></li>
  <li class="honor-item"><div class="honor-date">2023</div><div class="honor-content"><strong>Best Department Thesis Award</strong>, VIT for B.Tech thesis on multilingual sentiment analysis</div></li>
  <li class="honor-item"><div class="honor-date">2022</div><div class="honor-content"><strong>Runner-Up</strong>, VIT AI Tech-Thon</div></li>
  <li class="honor-item"><div class="honor-date">2020</div><div class="honor-content"><strong>Certificate of Outstanding Achievement</strong>, Data Analyst Intern at Brandiverse</div></li>
  <li class="honor-item"><div class="honor-date">2019–2023</div><div class="honor-content">Multiple <strong>Academic Merit Scholarships</strong> and recognitions as <strong>Internshala Student Partner (ISP)</strong> and <strong>Synergy Team Lead</strong>, VIT</div></li>
</ul>



<span class='anchor' id='educations'></span>
# Educations

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-user-graduate"></i></div>
  <div class="edu-box-content">
    <h4><span class="degree-badge">Ph.D.</span> <small>Computer Science</small>, <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a>, Columbia</h4>
    <p class="text-secondary">2023.08 – 2027.06 (expected)</p>
    <ul>
      <li>Co-advised by Dr. Jianlin Cheng and Dr. Tanu Malik</li>
      <li><strong>Research focus:</strong> Trustworthy and Efficient LLMs, Self-Correcting and Evolving Language Models, Evaluation in LLMs</li>
      <li>Google PhD Fellowship nominee (NLP), Outstanding Student Award recipient</li>
      <li>Supported by NASA, National Science Foundation, and Department of Defense grants for research in scientific LLMs and scalable AI infrastructure</li>
    </ul>
  </div>
</div>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-user-graduate"></i></div>
  <div class="edu-box-content">
    <h4><span class="degree-badge">M.S.</span> <small>Computer Science</small>, <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a>, Columbia</h4>
    <p class="text-secondary">2023.08 – 2025.05</p>
    <ul>
      <li><strong>Thesis:</strong> <em>Deploying LLM-as-a-Service in Kubernetes HPC Clusters</em></li>
      <li><strong>Advisors:</strong> Dr. Grant Scott and Dr. Jianlin Cheng</li>
      <li><strong>GPA:</strong> 4.0/4.0</li>
      <li>Built Helm/Kubernetes-based LLM inference pipelines in HPC environments</li>
      <li>TA for Full-Stack MERN Development (mentored 100+ students)</li>
    </ul>
  </div>
</div>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-user-graduate"></i></div>
  <div class="edu-box-content">
    <h4><span class="degree-badge">Bachelor of Technology</span> <small>Computer Science and Engineering with Specialization in Data Analytics</small>, <a href="https://vit.ac.in/schools/school-of-computer-science-and-engineering-for-ug-courses" target="_blank">Vellore Institute of Technology, India</a></h4>
    <p class="text-secondary">2019.05 – 2023.05</p>
    <ul>
      <li>Excellence in Research and Best Department Thesis</li>
      <li><strong>Thesis:</strong> <em>Multilingual Sentiment Analysis of Social Media Posts on KOO platform</em></li>
      <li>Core member of Synergy Team, Internshala Student Partner and Student Ambassador, Runner-up in VIT AI Tech-Thon</li>
      <li>Internship/volunteer work: Adobe (AI Evangelist), Brandiverse (Data Analyst)</li>
    </ul>
  </div>
</div>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-book-reader"></i></div>
  <div class="edu-box-content">
    <h4>Intermediate (+2) – MPC, Altitude College, Hyderabad, India</h4>
    <p class="text-secondary">2017.06 – 2019.04</p>
    <ul>
      <li>Engineering & analytical skill development through JEE prep</li>
      <li>1554 in MIT Entrance Test, secured 88% in JEE Mains, qualified for JEE Advanced</li>
    </ul>
  </div>
</div>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-school"></i></div>
  <div class="edu-box-content">
    <h4>10th Standard – SSC, City Central School, India</h4>
    <p class="text-secondary">2017.03</p>
  </div>
</div>
<span class='anchor' id='academic-service'></span>
# Academic Service

- Conference Volunteer Reviewer: ICML (25, 24, 23), ACL (25, 24, 23), ICCV (25), CVPR (25), ICLR (25), AAAI (25), ICASSP (25), NeurIPS (24), EMNLP (24), ECCV (25), IJCAI (25), NAACL (25)  
- Journal reviewer: TPAMI, JVCI, TIP, TMLR  

# Teaching Experience

- Fall 2025, Fall 2024, Spring 2024, Fall 2023 – TA for Web Development  

<span class='anchor' id='professional-experience'></span>
# Professional Experience

<div class="golden-border-wrapper">
  <div class="experience-single-container">
    <div class="timeline-track">
      <div class="timeline-line"></div>
      <div class="timeline-ball" id="experienceBall"></div>
    </div>
    
    <div class="experience-entries">
      <div class="experience-entry" data-entry="1">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>University of Missouri – Radiant Lab</strong> <small>— Research Assistant</small></h4>
          <p class="text-secondary">Jan 2024 – Present</p>
          <ul>
            <li><strong>Reproducible Scientific Containers:</strong> Enhancing data-savvy, provenance-tracking containers for collaborative model analytics, integrating LLMs to automate debugging and improve reproducibility (NASA Funded)</li>
            <li><strong>AI Trustworthiness & Self-Reflecting LLMs:</strong> Designing models that can monitor, verify, and revise their own reasoning in real time, enabling more reliable and adaptive AI systems</li>
            <li><strong>Skills Gained:</strong> Distributed systems, container orchestration, reproducibility frameworks, advanced NLP integration</li>
          </ul>
          <p><em>Advisor:</em> <a href="https://engineering.missouri.edu/faculty/tanu-malik/" target="_blank">Dr. Tanu Malik</a></p>
        </div>
      </div>
      
      <hr class="experience-divider">
      
      <div class="experience-entry" data-entry="2">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>University of Missouri – Data Intensive Computing Lab</strong> <small>— Research & Teaching Assistant</small></h4>
          <p class="text-secondary">Feb 2024 – Present</p>
          <ul>
            <li><strong>Hallucination Detection Model:</strong> Developed hybrid frameworks for domain-tuned LLMs in material science, improving factual consistency by 30% (DoD Funded)</li>
            <li><strong>Scalable NLP Deployment:</strong> Designed Helm charts for scalable NLP deployment in HPC environments (NSF Funded)</li>
            <li><strong>Teaching Excellence:</strong> Supported 115+ students in Web Development (MERN stack), mentoring and evaluating projects</li>
            <li><strong>Expertise Gained:</strong> Kubernetes, CI/CD, Helm, advanced NLP frameworks</li>
          </ul>
          <p><em>Advisors:</em> <a href="https://scottgs.mufaculty.umsystem.edu/" target="_blank">Dr. Grant Scott</a> & <a href="https://en.wikipedia.org/wiki/Jianlin_Cheng" target="_blank">Dr. Jianlin Cheng</a></p>
        </div>
      </div>
      
      <hr class="experience-divider">
      
      <div class="experience-entry" data-entry="3">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>University of Missouri – PAAL Lab</strong> <small>— Research Assistant</small></h4>
          <p class="text-secondary">Aug 2023 – Jan 2024</p>
          <ul>
            <li><strong>UAV-based Crop Analysis:</strong> Led UAV-based crop analysis team, improving accuracy of UAV data processing by 40% with deep learning and HPC-driven workflows</li>
            <li><strong>Geospatial Analysis:</strong> Developed focus enhancement models and performed advanced geospatial analysis (Vegetation Indices, Mapping and Image Stitching) using QGIS</li>
          </ul>
        </div>
      </div>
      
      <hr class="experience-divider">
      
      <div class="experience-entry" data-entry="4">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>Adobe Research</strong> <small>— Volunteer Research Intern</small></h4>
          <p class="text-secondary">May 2022 – Jan 2023</p>
          <ul>
            <li><strong>Web Scraping & Information Extraction:</strong> Researched web scraping and information extraction as part of NLP team, focusing on large-scale data processing</li>
            <li><strong>Expertise Gained:</strong> Large-scale data processing, visualization, and client-facing research workflows</li>
          </ul>
          <p><em>Mentor:</em> Nanda Kishore</p>
        </div>
      </div>
      
      <hr class="experience-divider">
      
      <div class="experience-entry" data-entry="5">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>Brandiverse</strong> <small>— Data Analyst Intern</small></h4>
          <p class="text-secondary">May 2020 – Jul 2020</p>
          <ul>
            <li><strong>Marketing Intelligence:</strong> Transformed customer sentiment analysis with sophisticated NLP pipelines, driving strategic marketing improvements</li>
          </ul>
          <p><em>Recognition</em>: Certificate of Outstanding Achievement</p>
        </div>
      </div>
      
      <hr class="experience-divider">
      
      <div class="experience-entry" data-entry="6">
        <div class="entry-marker"></div>
        <div class="entry-content">
          <h4><strong>Internshala</strong> <small>— Student Partner (ISP)</small></h4>
          <p class="text-secondary">May 2020 – Dec 2020</p>
          <ul>
            <li><strong>Campus Leadership:</strong> Orchestrated career development initiatives, bridging student-industry gaps and promoting professional growth</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Contact Links - Moved to Bottom -->
<div style="text-align: center; margin: 3rem 0 2rem 0; padding: 2rem; background: linear-gradient(135deg, #f8f9fa, #ffffff); border-radius: 15px;">
  <p style="font-size: 1.1rem; color: #2c5aa0; margin: 0;">Thanks for stopping by! Feel free to explore my work or connect with me:</p>
  <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap;">
    <a href="https://bhanuprakashvangala.github.io" style="color: #2c5aa0; text-decoration: none; font-weight: 600; padding: 0.5rem 1rem; border: 2px solid #2c5aa0; border-radius: 25px; transition: all 0.3s ease;">GitHub</a>
    <a href="https://www.linkedin.com/in/vangalabhanuprakash/" style="color: #2c5aa0; text-decoration: none; font-weight: 600; padding: 0.5rem 1rem; border: 2px solid #2c5aa0; border-radius: 25px; transition: all 0.3s ease;">LinkedIn</a>
  </div>
</div>

<!-- Statcounter code for personal website -->
<script type="text/javascript">
var sc_project=12946013;
var sc_invisible=1;
var sc_security="08b61411";
</script>
<script type="text/javascript" src="https://www.statcounter.com/counter/counter.js" async></script>
<noscript>
  <div class="statcounter">
    <a title="website statistics" href="https://statcounter.com/" target="_blank">
      <img class="statcounter" src="https://c.statcounter.com/12946013/0/08b61411/1/" alt="website statistics" referrerPolicy="no-referrer-when-downgrade">
    </a>
  </div>
</noscript>
<!-- End of Statcounter Code -->
