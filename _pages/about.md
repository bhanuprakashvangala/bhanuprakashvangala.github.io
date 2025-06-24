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


Hi there! 

Welcome to **Bhanu Prakash Vangala**’s website!

# About Me
I’m currently a Ph.D. candidate in Computer Science at the University of Missouri, Columbia (Aug 2023 – Jun 2027), co-advised by [Dr. Jianlin Cheng](https://calla.rnet.missouri.edu/cheng/) and [Dr. Tanu Malik](https://engineering.missouri.edu/faculty/tanu-malik/). I earned my M.S. in Computer Science from the University of Missouri (GPA: 4.0/4.0), where I worked on deploying Large Language Models (LLMs) in distributed computing environments advised by [Dr. Grant J Scott](https://scottgs.mufaculty.umsystem.edu/). I completed my B.Tech in Computer Science and Engineering (Data Analytics) at Vellore Institute of Technology, India, where I explored multilingual NLP and large-scale social media analysis.

My current **core research interests** are funded by the **Department of Defense (U.S. Army ERDC), NSF, and NASA**, highlighting their relevance to critical scientific and technological challenges.

**Trustworthy and Interpretable AI**  
Developing systems that can reason transparently, self-reflect, and correct their own outputs—improving reliability and reducing harmful or misleading responses.

**Efficient and Scalable Language Models**  
Focusing on model compression, memory optimization, and large-scale deployment of LLMs for real-time inference in resource-constrained and HPC environments.

**Factuality and Evaluation in Language Models**  
Designing evaluation benchmarks and hybrid techniques to assess consistency, factual accuracy, and context-grounded reasoning in LLMs.

**AI for Scientific Discovery**  
Applying LLMs in scientific domains such as materials science, biomedical research, and policy modeling—empowering AI to support researchers in hypothesis generation and knowledge synthesis.

Beyond research, I enjoy mentoring students as a Teaching Assistant for full-stack web development courses, helping them connect theoretical concepts with real-world applications. I’m also passionate about guiding international students through blogging and sharing insights on pursuing higher education abroad.

Thanks for stopping by—feel free to explore my work on [GitHub](https://bhanuprakashvangala.github.io) or connect with me on [LinkedIn](https://www.linkedin.com/in/vangalabhanuprakash/)!

[//]: <> <span style="color:blue"> </span>

# 🔥 News

- *2025.05*: 🎓 Earned my M.S. in Computer Science (GPA: 4.0/4.0) from the University of Missouri, Columbia.  
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
- *2023.06*: 🎉 Admitted to the Ph.D. program in Computer Science at the University of Missouri.  
- *2023.05*: Graduated with a B.Tech in CSE (Data Analytics) from VIT Vellore.  
- *2023.04*: 🏅 Honored with the **Excellence in Research** Award at VIT for multilingual NLP and social media analytics contributions.  
- *2023.03*: Volunteered as an **AI Community Evangelist** at Adobe, contributing to community education and developer engagement.  
- *2022.11*: Served as an **Internshala Student Partner (ISP)**, leading brand campaigns and peer mentoring on campus.  
- *2020*: Joined the **Brandiverse** team as a creative contributor, working on outreach and media strategy.  
- *2021*: Collaborated with the **Synergy Team** at VIT, supporting student experience initiatives and university development programs.

# Publications 
<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Preprint</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
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
      <a href="https://drive.google.com/file/d/1oMbe8br7-wm7NLkrOFbFGtT2vUlxdCTn/view?usp=drive_link"><strong>[paper]</strong></a>
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>Artificial Intelligence (AI), particularly Large Language Models (LLMs), is transforming scientific discovery, enabling rapid knowledge generation and hypothesis formulation. However, a critical challenge is hallucination, where LLMs generate factually incorrect or misleading information, compromising research integrity. To address this, we introduce HalluMatData, a benchmark dataset for evaluating hallucination detection methods, factual consistency, and response robustness in AI-generated materials science content. Alongside, we propose HalluMatDetector, a multi-stage hallucination detection framework integrating intrinsic verification, multi-source retrieval, contradiction graph analysis, and metric-based assessment to detect and mitigate LLM hallucinations. Our findings reveal that hallucination levels vary significantly across materials science subdomains, with high-entropy queries exhibiting greater factual inconsistencies. By utilizing HalluMatDetector’s verification pipeline, we reduce hallucination rates by 30% compared to standard LLM outputs. Furthermore, we introduce the Paraphrased Hallucination Consistency Score (PHCS) to quantify inconsistencies in LLM responses across semantically equivalent queries, offering deeper insights into model reliability. Combining knowledge graph-based contradiction detection and fine-grained factual verification, our dataset and framework establish a more reliable, interpretable, and scientifically rigorous approach for AI-driven discoveries.</p>
    </div>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Preprint</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
    </div>
  </div>
  <div class='paper-box-text'>
    <p><strong><a href="https://drive.google.com/file/d/1o6tqCJdhiCTAR4AEM59fV4t2VSdvS4yt/view?usp=drive_link">HalluFormer: Faithfulness Evaluation Framework</a></strong></p>
    <p><strong>Bhanu Prakash Vangala</strong>, Jianlin Cheng</p>
    <ul>
      <li>Transformer-based architecture for multi-dimensional consistency checking of LLM outputs.</li>
    </ul>
    <div style="display: inline">
      <a href="https://drive.google.com/file/d/1o6tqCJdhiCTAR4AEM59fV4t2VSdvS4yt/view?usp=drive_link"><strong>[paper]</strong></a>
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>Despite the impressive performance of Large Language Models (LLMs) in a variety of natural language processing tasks, they are still prone to producing information that is factually inaccurate, known as hallucination. In critical fields related to scientific and clinical domains that demand highly precise answers, the negative effect of this phenomenon is even more pronounced. To address this problem, we formulate the hallucination detection problem as a classification problem of assessing the consistency between questions, answers and retrieved knowledge contexts and propose HalluFormer, a transformer-based model for detecting hallucinations of LLMs. HalluFormer was trained and tested on the MultiNLI dataset. It achieves an F1 score of 0.9471 on the MultiNLI test dataset. On the blind ANAH test dataset, it achieves an F1 score of 0.7285, indicating it can generalize reasonably well to completely new data. The results demonstrate that transformer-based methods can be utilized to detect hallucinations of LLMs, paving the way for further research on improving the reliability of LLMs.</p>
    </div>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Master's Thesis</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
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
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>This work focuses on scalable and efficient deployment strategies for large language models in high-performance computing (HPC) environments. It outlines a Helm-chart-based approach for deploying containerized models with GPU affinity scheduling, resource throttling, and multi-user access configurations.</p>
    </div>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Project</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
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
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>Abstract—This study presents a comprehensive approach to detecting brain tumors using deep learning algorithms implemented in TensorFlow. The project develops two distinct convolutional neural network (CNN) models— a custom-designed CNN and the pre-trained ResNet50V2— to identify and classify brain tumor presence from MRI images across two datasets. Both models underwent rigorous training, evaluation, and optimization to enhance their accuracy and generalization capabilities. The custom CNN model included data augmentation techniques like random flipping, rotation, and zooming to reduce overfitting and improve model robustness. The performance of each model was meticulously analyzed through metrics such as accuracy, precision, recall, and F1-score, with results visualized using confusion matrices and performance charts. Additionally, learning rate optimization was performed to find the most effective training parameters. The study not only demonstrates the potential of neural networks in medical imaging diagnostics but also explores the effectiveness of model customization and transfer learning for practical applications in healthcare.</p>
    </div>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Project</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
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
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>Abstract—Pneumonia is a leading cause of morbidity worldwide, necessitating prompt and accurate diagnosis to improve patient outcomes. This study leverages deep learning techniques to automate the detection of pneumonia from chest X-ray images. Five models are evaluated, including a custom Convolutional Neural Network (CNN), ResNet18, VGG16, ResNet50 with K-Fold Cross-Validation, and EfficientNet. Pretrained architectures are fine-tuned on the publicly available Chest X-Ray Pneumonia dataset, with 5,216 training images, and validated using precision, recall, F1-score, and ROC-AUC metrics. Innovative training strategies such as K-fold cross-validation and multi-GPU acceleration are employed to enhance model robustness. Among the models, EfficientNet achieves the highest classification performance, demonstrating the effectiveness of state-of-the-art architectures in medical image classification tasks. The results suggest that deep learning models can offer a reliable, scalable solution for pneumonia detection, paving the way for integration into clinical workflows to assist radiologists in diagnostic decision-making.</p>
    </div>
  </div>
</div>

<div class='paper-box'>
  <div class='paper-box-image'>
    <div>
      <div class="badge">Project</div>
      <img src='images/papers/publication-placeholder.png' alt="sym" width="100%">
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
      <a href="javascript:void(0)" class="fakelink" onclick="$(this).siblings('.abstract').slideToggle()"><strong>[abstract]</strong></a>
    </div>
    <div class="abstract" style="overflow: hidden; display: none;">
      <p>Colourization is a PC helped procedure of adding shading to a monochrome picture or film. The procedure involves typically segmenting pictures into areas and following these regions across picture sequences. Neither of these undertakings can be performed dependably by and by; thus, colourization requires extensive user mediation and remains a monotonous, tedious, and costly assignment. Colourization is a term presented by Wilson Markle in 1970 to describe the PC helped process he developed for including shading. Colourizing black and white movies is an old idea going back to 1902. For a considerable length of time, numerous filmmakers restricted colourizing their black and white motion pictures and considered it vandalism of their craft. Today it is acknowledged as an upgrade to the artistic expression. The innovation itself has moved from meticulous hand colourization to the present largely automated strategy. In India, the film Mughal-e-Azam, a blockbuster released in 1960 was remastered in color in 2004. People from different ages crowded the theatres to see it in color, and the movie was a huge hit for the second time!</p>
    </div>
  </div>
</div>

# Projects

<ul>
  <li>
    <strong>ReflectMemory for Self-Correcting LLMs</strong><br>
    Built a memory module to store chain-of-thought embeddings and ensure reasoning consistency across inference rounds.
  </li>
  <li>
    <strong>KubeLLM: LLM-as-a-Service Platform</strong><br>
    Deployed a scalable, GPU-optimized LLM inference service using Kubernetes, Helm, and horizontal pod autoscaling.
  </li>
  <li>
    <strong>HalluMat &amp; HalluFormer</strong><br>
    Developed benchmarking and evaluation pipelines for hallucination detection in scientific LLMs.
  </li>
  <li>
    <strong>ChatMed: Medical Chatbot for Health Guidance</strong><br>
    Trained using BioGPT and PubMed literature to provide symptom-based support and healthcare guidance.
  </li>
  <li>
    <strong>CropInsight: AI for Agriculture</strong><br>
    Combined computer vision and LSTM-based sequence modeling to analyze crop health and yield forecasts.
  </li>
  <li>
    <strong>Hackathon Projects @ Mizzou</strong><br>
    Runner-up for building a real-time LLM hazard indicator tool, VisionAI for visually impaired users.
  </li>
  <li>
    <strong>SocialSift: Crisis-aware Sentiment Analysis</strong><br>
    Used multilingual transformers to analyze real-time sentiment from social media during natural disasters.
  </li>
  <li>
    <strong>EmotionSense: Multi-modal Mental Health Model</strong><br>
    Built using text, audio, and facial signals to predict mental health markers like anxiety or depression.
  </li>
</ul>

# Honors and Awards
<ul>
  <li>
    <strong>2025.05:</strong> <strong>Outstanding Master’s Student Award</strong>, College of Engineering, University of Missouri  
    <div style="margin-top: 10px;">
      <img src="images/awards/outstanding-award.jpg" alt="Outstanding Master’s Student Award" style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px;">
    </div>
  </li>
  <li>
    <strong>2025.03:</strong> <strong>Runner-Up – MUIDSI Hackathon</strong> for <em>VisionAI: AI-Powered Assistance for the Visually Impaired</em>, awarded $1,000  
    <div style="margin-top: 10px;">
      <img src="images/awards/muidsi-hackathon.jpg" alt="MUIDSI Hackathon Award" style="max-width: 100%; border: 1px solid #ccc; border-radius: 8px;">
    </div>
  </li>
  <li><strong>2025.04:</strong> Selected for <strong>Google PhD Fellowship Nomination</strong>, one of three University of Missouri nominees in NLP</li>
  <li><strong>2024.10:</strong> <strong>Outstanding Volunteer</strong>, EMNLP 2023</li>
  <li><strong>2023:</strong> <strong>Dean’s Research Excellence Award</strong>, Vellore Institute of Technology (VIT)</li>
  <li><strong>2023:</strong> <strong>Best Department Thesis Award</strong>, VIT for B.Tech thesis on multilingual sentiment analysis</li>
  <li><strong>2022:</strong> <strong>Top 2 Academic Performer</strong>, CSE Department, VIT</li>
  <li><strong>2022:</strong> <strong>Runner-Up</strong>, VIT AI Tech-Thon</li>
  <li><strong>2020:</strong> <strong>Certificate of Outstanding Achievement</strong>, Data Analyst Intern at Brandiverse</li>
  <li><strong>2019–2023:</strong> Multiple <strong>Academic Merit Scholarships</strong> and recognitions as <strong>Internshala Student Partner (ISP)</strong> and <strong>Synergy Team Lead</strong>, VIT</li>
</ul>


# Educations

- *2023.08 – 2027.06 (expected)*, **Ph.D. in Computer Science**, University of Missouri, Columbia  
  Co-advised by Dr. Jianlin Cheng and Dr. Tanu Malik  
  - **Research focus:** Trustworthy and Efficient LLMs, Self-Correcting and Evolving Language Models, Evaluation in LLMs  
  - Google PhD Fellowship nominee (NLP), Outstanding Student Award recipient  
  - Supported by NASA, National Science Foundation, and Department of Defense grants for research in scientific LLMs and scalable AI infrastructure  

- *2023.08 – 2025.05*, **M.S. in Computer Science**, University of Missouri, Columbia  
  **Thesis:** *Deploying LLM-as-a-Service in Kubernetes HPC Clusters*  
  **Advisors:** Dr. Grant Scott and Dr. Jianlin Cheng  
  - **GPA:** 4.0/4.0  
  - Built Helm/Kubernetes-based LLM inference pipelines in HPC environments  
  - TA for Full-Stack MERN Development (mentored 100+ students)  

- *2019.05 – 2023.05*, **B.Tech in Computer Science and Engineering (Data Analytics)**, Vellore Institute of Technology, India  
  - Excellence in Research and Best Department Thesis  
  - **Thesis:** *Multilingual Sentiment Analysis of Social Media Posts on KOO platform*  
  - Core member of Synergy Team, Internshala Student Partner and Student Ambassador, Runner-up in VIT AI Tech-Thon  
  - Internship/volunteer work: Adobe (AI Evangelist), Brandiverse (Data Analyst)  

- *2017.06 – 2019.04*, **Intermediate (+2) – MPC**, Altitude College, Hyderabad, India  
  - Engineering & analytical skill development through JEE prep  
  - 1554 in MIT Entrance Test, secured 88% in JEE Mains, qualified for JEE Advanced  

- *2017.03*, **10th Standard – SSC**, City Central School, India  

# Academic Service

- Conference Volunteer Reviewer: ICML (25, 24, 23), ACL (25, 24, 23), ICCV (25), CVPR (25), ICLR (25), AAAI (25), ICASSP (25), NeurIPS (24), EMNLP (24), ECCV (25), IJCAI (25), NAACL (25)  
- Journal reviewer: TPAMI, JVCI, TIP, TMLR  

# Teaching Experience

- Fall 2025, Fall 2024, Spring 2024, Fall 2023 – TA for Web Development  

# Internships and Research Experience

- *May 2022 – Jan 2023*, **Adobe Research**, NLP Research Intern  
  Conducted research in Information Extraction, Web Mining, and Data Management for intelligent interfaces.  
  *Mentor*: [Nanda Kishore](https://research.adobe.com/person/nandakishore-kambhatla/)  

- *Aug 2023 – Present*, **University of Missouri – Data Intensive Computing Lab**, Research & Teaching Assistant  
  - Developed a hallucination detection framework for scientific LLMs with a 30% factual-improvement metric.  
  - Led deployment of LLM-as-a-Service using Kubernetes & Helm in HPC clusters (NSF-funded).  
  - TA for Web Development, supporting 115+ MERN-stack students.  

- *Aug 2023 – Jan 2024*, **University of Missouri – PAAL Lab**, Research Assistant  
  - Led a USDA-funded AI project on UAV-based crop monitoring.  
  - Designed real-time geospatial analysis workflows using QGIS.  

- *May 2020 – Jul 2020*, **Brandiverse**, Data Analyst Intern  
  Analyzed customer sentiment using NLP pipelines; contributed to marketing strategy improvements.  
  *Recognition*: Certificate of Outstanding Achievement  

- *May 2020 – Dec 2020*, **Internshala**, Internshala Student Partner (ISP)  
  Promoted internships, conducted career-building sessions, and facilitated student-industry interaction on campus.  

- *2019 – 2020*, **VIT University – Synergy Team & Club Organizer**  
  Organized AI/NLP workshops and tech events under various student bodies.  

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
