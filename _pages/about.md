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

<div class="about-box">
  <div class="about-box-content">
    <p class="text-accent">Hello!</p>
    <p>I’m <strong>Bhanu Prakash Vangala</strong>, a <strong>Ph.D. researcher in Computer Science</strong> at <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">the University of Missouri</a>.</p>
    <p>My research focuses on building AI that is <strong>trustworthy</strong>, <strong>efficient</strong>, and <strong>reliable</strong>, with an emphasis on <strong>large language models (LLMs)</strong>, <strong>high-performance computing (HPC)</strong>, and <strong>scalable, reproducible systems</strong>. I began my graduate journey at Mizzou, completing my M.S. in Computer Science under <a href="https://scottgs.mufaculty.umsystem.edu/" target="_blank">Dr. Grant Scott</a> and <a href="https://en.wikipedia.org/wiki/Jianlin_Cheng" target="_blank">Dr. Jianlin Cheng</a>. During my master’s, I worked on designing robust frameworks for deploying LLMs on distributed and HPC environments and studied hallucinations in AI for materials science — work that naturally evolved into my Ph.D. research and working under <a href="https://engineering.missouri.edu/faculty/tanu-malik/" target="_blank">Dr. Tanu Malik</a> at Radiant Lab.</p>
    <p>My work is supported by grants from the <strong>Department of Defense</strong>, <strong>NSF</strong>, and <strong>NASA</strong>. It addresses some of the most critical questions and faults in AI today: How can we build systems that not only generate knowledge but also justify/correct and verify their outputs? Can they be scalable and reproducible? Will LLMs eventually become true personal agents that understand and work alongside us?</p>
    <p>Beyond my technical work, I am passionate about mentoring students as a teaching assistant, writing and blogging about graduate life abroad and technical concepts in LLMs, and building tools that make AI systems more interpretable, effective, reproducible, and aligned with human values — a vision that guides every aspect of my research.</p>
    <h3 class="focus-heading">Areas of Focus</h3>
    <style>
      .about-box-content {
        border-left: 4px solid #d4af37;
        border-radius: 10px;
        padding: 20px;
        color: #000;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
      .focus-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: flex-start;
        border-left: 4px solid #d4af37;
        border-right: 4px solid #d4af37;
        box-shadow: 0 0 0 2px #d4af37 inset;
        border-radius: 10px;
        padding: 10px;
      }
      .focus-wrapper img {
        width: 120px;
        border-radius: 50%;
      }
      .focus-tabs {
        flex: 1;
      }
      .focus-tabs .tab-list {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0 0 1rem;
        gap: 0.5rem;
      }
      .focus-tabs .tab {
        padding: 8px 15px;
        border: 1px solid #ccc;
        background: #fff;
        border-radius: 20px;
        cursor: pointer;
        transition: background 0.2s;
      }
      .focus-tabs .tab:hover {
        background: #333;
        color: #fff;
      }
      .focus-tabs .tab.active {
        background: #000;
        border-color: #d4af37;
        color: #fff;
        font-weight: bold;
      }
      .focus-tabs .tab-content {
        border: 1px solid #eee;
        border-radius: 10px;
        padding: 20px;
        background: #fafafa;
      }
      .focus-tabs .tab-pane { display: none; }
      .focus-tabs .tab-pane.active { display: block; }
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
    </style>
    <div class="focus-wrapper">
      <div class="focus-tabs">
        <ul class="tab-list">
          <li class="tab active" data-tab="focus1">Trustworthy AI</li>
          <li class="tab" data-tab="focus2">Scalable LLMs</li>
          <li class="tab" data-tab="focus3">Factuality</li>
          <li class="tab" data-tab="focus4">Sci Discovery</li>
        </ul>
        <div class="tab-content">
          <div id="focus1" class="tab-pane active">
            <h3 class="side-heading">Trustworthy and Interpretable AI</h3>
            <p>Developing AI systems that do more than generate fluent outputs — they can reason transparently, explain their decision processes, detect inconsistencies, and actively self-correct. My work focuses on designing architectures and evaluation frameworks that empower models to justify their responses, ultimately fostering greater trust and adoption of AI in critical domains like science, healthcare, and law.</p>
            <hr />
          </div>
          <div id="focus2" class="tab-pane">
            <h3 class="side-heading">Efficient and Scalable Language Models</h3>
            <p>Pushing the boundaries of large-scale AI deployment through model compression, distributed training optimization, and advanced memory management. I design scalable architectures and Helm-based deployment pipelines that make state-of-the-art language models accessible to researchers and practitioners without requiring massive infrastructure investments, enabling equitable and practical use of cutting-edge AI technologies.</p>
            <hr />
          </div>
          <div id="focus3" class="tab-pane">
            <h3 class="side-heading">Factuality and Evaluation</h3>
            <p>Creating robust benchmarks and advanced evaluation pipelines to rigorously measure the factual consistency, reliability, and safety of language model outputs. By integrating contradiction detection graphs, retrieval-augmented checks, and semantic consistency metrics, I ensure that AI systems can be trusted in settings where accuracy is paramount and errors carry significant real-world consequences.</p>
            <hr />
          </div>
          <div id="focus4" class="tab-pane">
            <h3 class="side-heading">AI for Scientific Discovery</h3>
            <p>Leveraging the power of LLMs and multimodal AI to accelerate research in materials science, biomedical innovation, and policy modeling. My work enables domain scientists to harness AI as a collaborative partner — not only to analyze and generate data, but to form hypotheses, validate findings, and drive scientific breakthroughs with greater efficiency and confidence.</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
    <script>
      document.querySelectorAll('.focus-tabs .tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
          var target = this.getAttribute('data-tab');
          document.querySelectorAll('.focus-tabs .tab').forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.focus-tabs .tab-pane').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
          document.getElementById(target).classList.add('active');
        });
      });
    </script>
    <p class="text-secondary">Thanks for stopping by—feel free to explore my work on <a href="https://bhanuprakashvangala.github.io">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/vangalabhanuprakash/">LinkedIn</a>!</p>
  </div>
</div>

<span class='anchor' id='news'></span>
# News

- *2025.05*: 🎓 Earned my M.S. in Computer Science (GPA: 4.0/4.0) from the [University of Missouri](https://engineering.missouri.edu/departments/eecs/eecs-research/), Columbia.  
- *2025.04*: 🏆 Received the **Outstanding Master’s Student Award** from the MU Department of Computer Science.  
- *2025.04*: 📤 Submitted a thesis proposal: *"Trustworthy AI: Building Self-correcting and Self-evolving Models for Scientific Discovery."*  
- *2025.04*: 🎉 Presented our work on Hallucination Detection at **AAAI Spring Symposium 2025 on AI for Scientific Discovery track**  
- *2025.03*: Started development of **ReflectMemory**, focused on persistent memory control for long-context LLM reasoning.  
- *2025.03*: Deployed updated **KubeLLM** framework for multi-tenant LLM inference on GPU-based HPC clusters.  
- *2025.02*: 🥈 Achieved **Runner-Up** in the MUIDSI School for Generative AI for Social Good hackathon on VisionAI for Visually Impaired project.  
- *2025.01*: Released benchmarking tools for **hallucination detection in scientific LLMs**, supporting hybrid evaluation methods.  
- *2024.09*: Initiated documentation work on scalable **LLM-as-a-Service infrastructure** using Helm charts and node affinity scheduling.  
- *2024.01*: Working as a TA for over 100 students in a web development course – guiding full-stack app development.  
- *2023.12*: Led deployment of GPU-efficient LLM inference systems in the university’s Kubernetes-based HPC environment (Nautilus).  
- *2023.08*: Began research on **faithfulness, interpretability, and robustness** in large generative language models.  
- *2023.06*: 🎉 Admitted to the Ph.D. program in Computer Science at the [University of Missouri](https://engineering.missouri.edu/departments/eecs/eecs-research/).  
- *2023.05*: Graduated with a B.Tech in CSE (Data Analytics) from VIT Vellore.  
- *2023.04*: 🏅 Honored with the **Excellence in Research** Award at VIT for multilingual NLP and social media analytics contributions.  
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
      <li>A hybrid evaluation pipeline combining intrinsic and extrinsic techniques to flag hallucinations in domain-specific outputs.</li>
      <li>Applied to biomedical and scientific text generation tasks.</li>
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
      <li>Transformer-based architecture for multi-dimensional consistency checking of LLM outputs.</li>
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
      <div class="badge">Master's Thesis</div>
      <img src='images/LLM-as-Service-portfolio-image.png' alt="LLM-as-Service portfolio image" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="#">Deploying LLM-as-a-Service in Kubernetes HPC Clusters</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Grant Scott, Jianlin Cheng</p>
    <ul>
      <li>Designed a Helm-based GPU-aware deployment pipeline for LLM inference in research clusters.</li>
    </ul>
    <div style="display: inline">
      <a href="#"><strong>[thesis]</strong></a>
    </div>
    <details class='abstract'>
      <summary>Show Abstract</summary>
      <p>This work focuses on scalable and efficient deployment strategies for large language models in high-performance computing (HPC) environments. It outlines a Helm-chart-based approach for deploying containerized models with GPU affinity scheduling, resource throttling, and multi-user access configurations.</p>
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
      <li>Built a CNN-based pipeline to classify MRI scans into normal and tumor-positive cases.</li>
      <li>Used preprocessed image datasets and trained on Google Colab with Keras/TensorFlow.</li>
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
      <li>Applied CNN models to classify chest X-rays for pneumonia diagnosis.</li>
      <li>Trained on Kaggle datasets using transfer learning (ResNet, VGG).</li>
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
      <li>Developed a deep learning model to convert grayscale images to color.</li>
      <li>Used convolutional autoencoders and GAN-based architectures for photorealistic results.</li>
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
      <li>Developed a multilingual sentiment analysis system for KOO, leveraging NLP and machine learning to analyze user sentiment across various languages.</li>
      <li>Provided real-time sentiment insights for improved user experience and content moderation on the social networking platform.</li>
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
    <h4><span class="badge bg-primary">Ph.D.</span> <small>Computer Science</small>, <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a>, Columbia</h4>
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
    <h4><span class="badge bg-primary">M.S.</span> <small>Computer Science</small>, <a href="https://engineering.missouri.edu/departments/eecs/eecs-research/" target="_blank">University of Missouri</a>, Columbia</h4>
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
    <h4><span class="badge bg-primary">Bachelor of Technology</span> <small>Computer Science and Engineering with Specialization in Data Analytics</small>, <a href="https://vit.ac.in/schools/school-of-computer-science-and-engineering-for-ug-courses" target="_blank">Vellore Institute of Technology, India</a></h4>
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

<span class='anchor' id='internships-and-research-experience'></span>
# Internships and Research Experience

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-flask"></i></div>
  <div class="edu-box-content">
    <h4><strong>Adobe Research</strong> <small>— NLP Research Intern</small></h4>
    <p class="text-secondary">May 2022 – Jan 2023</p>
    <ul>
      <li>Researched web scraping and information extraction as part of the NLP team under Nanda Kishore.</li>
      <li>Gained expertise in large-scale data processing, visualization, and client-facing research workflows.</li>
    </ul>
    <p><em>Mentor</em>: <a href="https://research.adobe.com/person/nandakishore-kambhatla/" target="_blank">Nanda Kishore</a></p>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-laptop-code"></i></div>
  <div class="edu-box-content">
    <h4><strong>University of Missouri – Data Intensive Computing Lab</strong> <small>— Research & Teaching Assistant</small></h4>
    <p class="text-secondary">Aug 2023 – Present</p>
    <ul>
      <li>Hallucination Detection Model: Developed hybrid frameworks for domain-tuned LLMs in materials science, improving factual consistency by 30% (DoD funded).</li>
      <li>Designed Helm charts for scalable NLP deployment in HPC environments (NSF funded).</li>
      <li>Supported 115+ students in Web Development (MERN stack), mentoring and evaluating projects.</li>
    </ul>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-brain"></i></div>
  <div class="edu-box-content">
    <h4><strong>University of Missouri – Radiant Lab</strong> <small>— Research Assistant</small></h4>
    <p class="text-secondary">Jan 2024 – Present</p>
    <ul>
      <li>Reproducible Scientific Containers: Enhancing data-savvy, provenance-tracking containers for collaborative model analytics, integrating LLMs to automate debugging and improve reproducibility (NASA funded).</li>
      <li>AI Trustworthiness and Self-Reflecting LLMs: Designing models that can monitor, verify, and revise their own reasoning in real time, enabling more reliable and adaptive AI systems.</li>
    </ul>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-drone"></i></div>
  <div class="edu-box-content">
    <h4><strong>University of Missouri – PAAL Lab</strong> <small>— Research Assistant</small></h4>
    <p class="text-secondary">Aug 2023 – Jan 2024</p>
    <ul>
      <li>Led UAV-based crop analysis team, improving accuracy of UAV data processing by 40% with deep learning and HPC-driven workflows.</li>
      <li>Developed focus enhancement models and performed advanced geospatial analysis (Vegetation Indices, Mapping, and Image Stitching) using QGIS.</li>
    </ul>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-chart-line"></i></div>
  <div class="edu-box-content">
    <h4><strong>Brandiverse</strong> <small>— Data Analyst Intern</small></h4>
    <p class="text-secondary">May 2020 – Jul 2020</p>
    <ul>
      <li>Analyzed customer sentiment using NLP pipelines; contributed to marketing strategy improvements.</li>
    </ul>
    <p><em>Recognition</em>: Certificate of Outstanding Achievement</p>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-handshake"></i></div>
  <div class="edu-box-content">
    <h4><strong>Internshala</strong> <small>— Student Partner (ISP)</small></h4>
    <p class="text-secondary">May 2020 – Dec 2020</p>
    <ul>
      <li>Promoted internships, conducted career-building sessions, and facilitated student-industry interaction on campus.</li>
    </ul>
  </div>
</div>
<hr>

<div class="edu-box">
  <div class="edu-box-icon"><i class="fas fa-users"></i></div>
  <div class="edu-box-content">
    <h4><strong>VIT University – Synergy Team & Club Organizer</strong></h4>
    <p class="text-secondary">2019 – 2020</p>
    <ul>
      <li>Organized AI/NLP workshops and tech events under various student bodies.</li>
    </ul>
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
