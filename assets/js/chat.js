let qa;
let textGenerator;

// Comprehensive context about Bhanu's research and work
const bhanuContext = `
PERSONAL & ACADEMIC INFO:
Bhanu Prakash Vangala is a Ph.D. researcher in Computer Science at the University of Missouri, Columbia.
- Completed M.S. in Computer Science with perfect 4.0/4.0 GPA from University of Missouri (May 2025)
- Outstanding Master's Student Award recipient from College of Engineering, University of Missouri
- Google PhD Fellowship nominee (2025) - one of three nominees from University of Missouri
- B.Tech in Computer Science and Engineering with Data Analytics specialization from VIT Vellore (2019-2023)
- Excellence in Research Award and Best Department Thesis Award at VIT

RESEARCH FOCUS & ADVISORS:
- Research Focus: Trustworthy AI, efficient and reliable LLMs, high-performance computing (HPC), scalable reproducible systems
- Current Advisor: Dr. Tanu Malik at Radiant Lab (Ph.D.)
- Previous Advisors: Dr. Grant Scott and Dr. Jianlin Cheng (M.S.)
- Funding: Department of Defense, NSF, and NASA grants

MAJOR PUBLICATIONS & CONTRIBUTIONS:

1. HalluMat: Hallucination Detection in Scientific LLMs (AAAI 2025)
- Developed HalluMatData benchmark dataset for evaluating hallucination detection in materials science LLMs
- Created HalluMatDetector: multi-stage detection pipeline with intrinsic verification, multi-source retrieval, contradiction graph analysis
- Achieved 30% reduction in hallucination rates compared to baseline LLM outputs
- Introduced Paraphrased Hallucination Consistency Score (PHCS) metric
- Applied to biomedical and scientific text generation tasks with focus on research integrity

2. HalluFormer: Faithfulness Evaluation Framework (AAAI 2025) 
- Novel transformer-based architecture for multi-dimensional consistency checking of LLM outputs
- Reformulated hallucination detection as classification problem for consistency assessment
- F1 score: 0.9471 on MultiNLI test dataset, 0.7285 on blind ANAH dataset
- Successfully deployed in scientific and clinical research environments
- Establishes transformer-based approaches for improving LLM reliability

3. Adaptive Inference: Orchestrating Fine-Tuned LLMs with Serverless GPUs (SC 2025 Poster)
- Introduced Pick-and-Spin framework for policy-driven model selection with serverless GPU orchestration
- Matrix-based (L×I) deployment model for dynamic routing to optimal (model, backend) pairs
- Multi-objective scoring function balancing domain relevance, latency, and cost
- Scale-to-zero serverless execution using Kubernetes with Knative and KEDA
- Supports multiple domain-specific models (BioGPT, ChemBERTa, MatSciBERT) across inference backends
- Research poster serves as foundation for planned comprehensive paper submission

4. Deploying LLM-as-a-Service in Kubernetes HPC Clusters (Master's Thesis)
- Foundational Helm-chart-based deployment ecosystem that evolved into Pick-and-Spin framework
- GPU affinity scheduling algorithms, dynamic resource throttling, load balancing protocols
- 60% reduction in deployment overhead, 40% enhancement in resource utilization
- Successfully deployed on Nautilus distributed computing cluster serving 100+ users
- Architectural foundation for serverless adaptive LLM orchestration

TECHNICAL PROJECTS:

5. Brain Tumor Detection in MRI Images
- Two CNN architectures: custom-designed CNN and transfer learning with ResNet50V2
- Advanced data augmentation (random flipping, rotation, zooming) for robustness
- Systematic hyperparameter tuning and learning rate optimization
- Comprehensive evaluation with accuracy, precision, recall, F1-score metrics
- TensorFlow/Keras implementation on Google Colab

6. Pneumonia Detection in Chest X-rays (MICCAI)
- Five deep learning architectures: custom CNN, ResNet18, VGG16, ResNet50, EfficientNet
- 5,216 training images with K-fold cross-validation and multi-GPU acceleration
- EfficientNet achieved highest performance for medical image classification
- Clinical workflow integration for radiologist assistance

7. Image Colorization Using AI (IJARESM)
- Convolutional autoencoders and GAN architectures for photorealistic colorization
- Large-scale datasets with carefully designed loss functions
- Applied to historical photograph restoration and film colorization

8. KOO: Multilingual Sentiment Analysis
- Comprehensive sentiment analysis across Hindi, English, Telugu, regional Indian languages
- Transformer-based models and traditional ML algorithms for social media processing
- Real-time analysis of millions of posts with scalable infrastructure
- Platform integration for content moderation and user experience enhancement

RESEARCH AREAS:
- Trustworthy and Interpretable AI: Self-correcting LLMs with transparent reasoning
- Scalable Systems: HPC infrastructure and Kubernetes-based deployment pipelines  
- Factuality and Evaluation: Robust benchmarks for measuring LLM reliability
- Scientific AI: Multimodal AI for materials science and biomedical innovation

ACHIEVEMENTS & RECOGNITION:
- Outstanding Master's Student Award (University of Missouri, 2025)
- Google PhD Fellowship Nominee (2025)
- MUIDSI Hackathon Runner-Up for VisionAI project ($1,000 prize)
- Excellence in Research Award (VIT, 2023)
- Best Department Thesis Award (VIT, 2023)
- Adobe AI Community Evangelist
- Teaching Assistant: 100+ students in web development (MERN stack)

WORK EXPERIENCE:
- Research Assistant: Data Intensive Computing Lab, University of Missouri (2023-Present)
- Research Assistant: Radiant Lab, University of Missouri (2024-Present) 
- Research Assistant: PAAL Lab, University of Missouri (2023-2024)
- NLP Research Intern: Adobe Research (2022-2023)
- Data Analyst Intern: Brandiverse (2020)
- Internshala Student Partner (ISP) (2020)

CURRENT PROJECTS:
- ReflectMemory: Persistent memory control for long-context LLM reasoning
- KubeLLM: Multi-tenant LLM inference on GPU-based HPC clusters
- Reproducible Scientific Containers with LLM integration (NASA funded)
- AI Trustworthiness and Self-Reflecting LLMs

CONTACT:
LinkedIn: https://www.linkedin.com/in/vangalabhanuprakash/
Email: bv3hz@missouri.edu (University), vangalabhanuprakash.12@gmail.com (Personal)
GitHub: Available for project exploration
`;

// Endpoint for server-side LLM if provided
const apiEndpoint = window.LLM_API_ENDPOINT || '';

// Use multiple models for different capabilities
const qaModelId = 'Xenova/flan-t5-base';
const textGenModelId = 'Xenova/flan-t5-small';

async function loadModels() {
  console.log('Loading chat models...');
  try {
    if (!window.transformers) {
      console.warn('Transformers.js not loaded yet, will retry when needed');
    }
  } catch (err) {
    console.error('Model loading error:', err);
  }
}

function createChatWidget() {
  const chatButton = document.createElement('button');
  chatButton.id = 'chat-toggle';
  chatButton.innerHTML = '<i class="fas fa-comments"></i>';
  chatButton.title = 'Chat with AI Assistant';
  document.body.appendChild(chatButton);

  const chatWindow = document.createElement('div');
  chatWindow.id = 'chat-window';
  chatWindow.innerHTML = `
    <div id="chat-header">
      <span>🤖 AI Research Assistant</span>
      <button id="chat-close">&times;</button>
    </div>
    <div id="chat-messages">
      <div class="suggestions">
        <p class="suggest">What is Bhanu's research focus?</p>
        <p class="suggest">Tell me about his publications</p>
        <p class="suggest">What awards has he received?</p>
        <p class="suggest">How can I contact him?</p>
        <p class="suggest">What is trustworthy AI?</p>
        <p class="suggest">Explain hallucination in LLMs</p>
      </div>
    </div>
    <form id="chat-form">
      <input id="chat-input" type="text" placeholder="Ask about Bhanu or anything else..." required />
      <button type="submit">Send</button>
    </form>`;
  document.body.appendChild(chatWindow);

  chatButton.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    chatButton.style.display = 'none';
  });
  chatWindow.querySelector('#chat-close').addEventListener('click', () => {
    chatWindow.style.display = 'none';
    chatButton.style.display = 'block';
  });

  chatWindow.querySelectorAll('.suggest').forEach(el => {
    el.addEventListener('click', () => {
      sendMessage(el.innerText);
    });
  });

  chatWindow.querySelector('#chat-form').addEventListener('submit', e => {
    e.preventDefault();
    const text = chatWindow.querySelector('#chat-input').value.trim();
    if (text) {
      sendMessage(text);
      chatWindow.querySelector('#chat-input').value = '';
    }
  });
}

function appendMessage(role, content) {
  const messages = document.querySelector('#chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = content;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function isAboutBhanu(query) {
  const bhanuKeywords = ['bhanu', 'he', 'his', 'him', 'vangala', 'contact', 'experience', 'skills', 'projects', 'work', 'research', 'thesis', 'phd', 'missouri', 'mizzou', 'university', 'professor', 'advisor', 'publications', 'awards', 'fellowship'];
  const lowerQuery = query.toLowerCase();
  return bhanuKeywords.some(keyword => lowerQuery.includes(keyword));
}

function getSimpleAnswer(query) {
  const lowerQuery = query.toLowerCase();
  
  // Comprehensive pattern matching for detailed questions about Bhanu
  const responses = {
    'hello': 'Hello! I\'m Bhanu\'s AI research assistant. I can help you learn about his work in trustworthy AI, LLM deployment, hallucination detection, and more!',
    'hi': 'Hi there! I can provide detailed information about Bhanu\'s research at University of Missouri, his publications, projects, and achievements.',
    'how are you': "I'm doing great! I'm here to help you learn about Bhanu's cutting-edge research in AI reliability and LLM orchestration.",
    'thank': "You're welcome! Feel free to ask about his specific publications like HalluMat, HalluFormer, or the Pick-and-Spin framework.",
    'bye': 'Goodbye! Come back anytime to learn more about Bhanu\'s research in trustworthy AI and scalable systems!',
    
    // Research and Publications
    'hallumat': 'HalluMat is Bhanu\'s AAAI 2025 paper on hallucination detection in scientific LLMs. It introduces HalluMatData benchmark dataset and HalluMatDetector pipeline, achieving 30% reduction in hallucination rates with the novel PHCS metric for materials science applications.',
    'halluformer': 'HalluFormer is Bhanu\'s AAAI 2025 paper presenting a transformer-based faithfulness evaluation framework. It achieved 0.9471 F1 score on MultiNLI and 0.7285 on ANAH dataset, reformulating hallucination detection as a classification problem for consistency assessment.',
    'pick-and-spin': 'Pick-and-Spin is Bhanu\'s SC 2025 poster framework for orchestrating fine-tuned LLMs with serverless GPUs. It uses matrix-based (L×I) deployment with multi-objective scoring for domain relevance, latency, and cost optimization in HPC environments.',
    'thesis': 'Bhanu\'s master\'s thesis "Deploying LLM-as-a-Service in Kubernetes HPC Clusters" established the foundational Helm-chart-based deployment ecosystem. It achieved 60% reduction in deployment overhead and 40% better resource utilization, serving 100+ users on Nautilus cluster.',
    
    // Technical Areas
    'trustworthy ai': 'Trustworthy AI is Bhanu\'s main research focus - building self-correcting LLMs with transparent reasoning. His HalluMat and HalluFormer work directly addresses AI reliability through hallucination detection and factual consistency evaluation.',
    'hallucination': 'AI hallucination is when models generate false information. Bhanu developed two major solutions: HalluMat (30% hallucination reduction in scientific contexts) and HalluFormer (transformer-based consistency checking with 94.71% accuracy).',
    'kubernetes': 'Bhanu extensively works with Kubernetes for LLM deployment. His thesis and Pick-and-Spin framework use Kubernetes with Knative and KEDA for serverless GPU orchestration and multi-tenant LLM inference in HPC clusters.',
    'hpc': 'High-Performance Computing is central to Bhanu\'s work. He deploys LLMs on HPC clusters like Nautilus, develops GPU-aware scheduling algorithms, and creates scalable infrastructure for research environments.',
    
    // Achievements and Recognition
    'awards': 'Bhanu received Outstanding Master\'s Student Award (2025), Google PhD Fellowship nomination, MUIDSI Hackathon Runner-Up ($1,000), Excellence in Research Award at VIT, and Best Department Thesis Award.',
    'fellowship': 'Bhanu was nominated for the prestigious Google PhD Fellowship in 2025, one of only three nominees from University of Missouri, recognizing his exceptional research in NLP and AI.',
    'hackathon': 'Bhanu won Runner-Up in MUIDSI Hackathon with VisionAI project for visually impaired assistance, earning $1,000 prize for his innovative AI accessibility solution.',
    
    // Academic Info
    'education': 'Bhanu completed M.S. Computer Science with perfect 4.0 GPA at University of Missouri (2025), and B.Tech CSE with Data Analytics at VIT Vellore (2019-2023). Currently pursuing Ph.D. at Missouri.',
    'advisor': 'Bhanu currently works under Dr. Tanu Malik at Radiant Lab for his Ph.D. Previously advised by Dr. Grant Scott and Dr. Jianlin Cheng for his master\'s degree.',
    'university': 'Bhanu is at University of Missouri, Columbia, pursuing Ph.D. in Computer Science. He completed his M.S. there with perfect GPA and Outstanding Student Award.',
    
    // Projects
    'brain tumor': 'Bhanu\'s brain tumor detection project used two CNN architectures (custom CNN and ResNet50V2) with advanced data augmentation. Implemented on TensorFlow/Keras with comprehensive evaluation metrics for medical imaging.',
    'pneumonia': 'His pneumonia detection work (MICCAI) evaluated five deep learning models on 5,216 chest X-rays. EfficientNet achieved best performance with K-fold validation and multi-GPU acceleration for clinical workflow integration.',
    'image colorization': 'Bhanu developed AI-powered colorization using convolutional autoencoders and GANs. Applied to historical photograph restoration and film colorization with sophisticated loss functions for photorealistic results.',
    'koo': 'KOO sentiment analysis project handled multilingual social media content (Hindi, English, Telugu). Real-time processing of millions of posts with transformer models for content moderation and user experience enhancement.',
    
    // Current Work
    'current projects': 'Bhanu is currently working on ReflectMemory (persistent memory for LLM reasoning), KubeLLM (multi-tenant LLM inference), and NASA-funded reproducible scientific containers with LLM integration.',
    'funding': 'Bhanu\'s research is supported by grants from Department of Defense, NSF, and NASA, covering his work on trustworthy AI, hallucination detection, and reproducible scientific computing.',
    
    // Contact and General
    'contact': 'You can reach Bhanu at bv3hz@missouri.edu (university) or vangalabhanuprakash.12@gmail.com (personal). Connect on LinkedIn: https://www.linkedin.com/in/vangalabhanuprakash/',
    'publications': 'Bhanu has 8+ publications including AAAI 2025 papers (HalluMat, HalluFormer), SC 2025 poster (Pick-and-Spin), his master\'s thesis, and multiple technical projects in medical AI and NLP.',
    'research focus': 'Bhanu researches trustworthy AI, efficient LLMs, HPC systems, and scientific AI. His work spans hallucination detection, serverless GPU orchestration, factuality evaluation, and reproducible computing systems.',
  };

  for (const [key, value] of Object.entries(responses)) {
    if (lowerQuery.includes(key)) {
      return value;
    }
  }
  
  return null;
}

async function sendMessage(text) {
  appendMessage('user', text);
  appendMessage('assistant', '...');
  
  try {
    let answer = '';
    const query = typeof text === 'string' ? text : String(text);
    
    // Check for simple responses first
    const simpleAnswer = getSimpleAnswer(query);
    if (simpleAnswer) {
      document.querySelector('#chat-messages').lastChild.textContent = simpleAnswer;
      return;
    }

    // Try API endpoint first if available
    if (apiEndpoint) {
      try {
        const isBhanuQuery = isAboutBhanu(query);
        const enhancedPrompt = isBhanuQuery 
          ? `Context about Bhanu: ${bhanuContext}\n\nQuestion: ${query}\nAnswer:`
          : query;
          
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: enhancedPrompt })
        });
        
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        answer = data.generated_text || data.answer || data.output || data;
        if (typeof answer !== 'string') {
          answer = JSON.stringify(answer);
        }
      } catch (apiErr) {
        console.warn('Remote API failed, falling back to local processing:', apiErr);
        answer = await getLocalAnswer(query);
      }
    } else {
      answer = await getLocalAnswer(query);
    }
    
    document.querySelector('#chat-messages').lastChild.textContent = answer;
  } catch (err) {
    console.error('Chat error:', err);
    document.querySelector('#chat-messages').lastChild.textContent = 
      'I apologize, but I encountered an issue. Please try rephrasing your question or ask something else.';
  }
}

async function getLocalAnswer(query) {
  try {
    // Check if transformers.js is available
    if (!window.transformers) {
      return "Chat is loading... Please try again in a moment. If the issue persists, try asking about Bhanu's experience, skills, or projects.";
    }

    const { pipeline } = window.transformers;
    const isBhanuQuery = isAboutBhanu(query);
    
    if (isBhanuQuery) {
      // Use QA model for Bhanu-related questions
      if (!qa) {
        qa = await pipeline('question-answering', qaModelId);
      }
      const result = await qa(query, { context: bhanuContext });
      return result.answer || "I can help you learn about Bhanu's experience, skills, and projects. Please ask a specific question.";
    } else {
      // Use text generation for general questions
      if (!textGenerator) {
        textGenerator = await pipeline('text2text-generation', textGenModelId);
      }
      const result = await textGenerator(query, {
        max_length: 100,
        temperature: 0.7
      });
      return result[0].generated_text || "I can answer questions about Bhanu or general topics. Feel free to ask!";
    }
  } catch (err) {
    console.error('Local model error:', err);
    
    // Fallback responses
    if (isAboutBhanu(query)) {
      return "Bhanu Prakash Vangala is a Ph.D. researcher at University of Missouri specializing in trustworthy AI and LLM deployment. He has published papers at AAAI 2025 on hallucination detection and submitted innovative work on serverless GPU orchestration. Feel free to ask about his specific research, publications, achievements, or projects!";
    }
    return "I can help answer questions about Bhanu's research, publications, projects, or general AI topics. Try asking about HalluMat, HalluFormer, Pick-and-Spin, or his academic achievements!";
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadModels();
  createChatWidget();
  
  // Load transformers.js if not already loaded
  if (!window.transformers) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0';
    script.type = 'module';
    document.head.appendChild(script);
  }
});