let qa;
let textGenerator;

// Enhanced context about Bhanu and general knowledge
const bhanuContext = `
Bhanu Prakash Vangala is an experienced software professional with over 8 years of experience in computer vision and machine learning.
He currently works at Microsoft as a Senior Software Engineer specializing in AI and ML.
His research focuses on computer vision, deep learning, natural language processing, and AI applications.
He completed his Bachelor's degree in Computer Science and has published multiple research papers.
His expertise includes Python, TensorFlow, PyTorch, and various machine learning frameworks.
He has worked on projects involving brain tumor detection, pneumonia detection, image colorization, and various AI applications.
His interests include artificial intelligence, machine learning, computer vision, and building innovative solutions.
He has won multiple hackathons and received recognition for his academic excellence.
Contact: You can reach Bhanu through the contact form on this website or via his professional profiles linked here.
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
  chatButton.innerText = 'Chat';
  document.body.appendChild(chatButton);

  const chatWindow = document.createElement('div');
  chatWindow.id = 'chat-window';
  chatWindow.innerHTML = `
    <div id="chat-header">
      <span>Hi! Ask me anything</span>
      <button id="chat-close">&times;</button>
    </div>
    <div id="chat-messages">
      <div class="suggestions">
        <p class="suggest">Who is Bhanu?</p>
        <p class="suggest">What are his main skills?</p>
        <p class="suggest">How can I contact him?</p>
        <p class="suggest">Tell me about AI</p>
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
  const bhanuKeywords = ['bhanu', 'he', 'his', 'him', 'vangala', 'contact', 'experience', 'skills', 'projects', 'work', 'microsoft', 'research'];
  const lowerQuery = query.toLowerCase();
  return bhanuKeywords.some(keyword => lowerQuery.includes(keyword));
}

function getSimpleAnswer(query) {
  const lowerQuery = query.toLowerCase();
  
  // Simple pattern matching for common questions
  const responses = {
    'hello': 'Hello! How can I help you today?',
    'hi': 'Hi there! Feel free to ask me anything about Bhanu or general topics.',
    'how are you': "I'm doing great! How can I assist you?",
    'thank': "You're welcome! Is there anything else you'd like to know?",
    'bye': 'Goodbye! Have a great day!',
    'what is ai': 'AI (Artificial Intelligence) is the simulation of human intelligence in machines programmed to think and learn.',
    'what is machine learning': 'Machine Learning is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed.',
    'what is deep learning': 'Deep Learning is a subset of machine learning that uses neural networks with multiple layers to progressively extract higher-level features from data.',
    'what is computer vision': 'Computer Vision is a field of AI that trains computers to interpret and understand visual information from the world.',
    'what is nlp': 'NLP (Natural Language Processing) is a branch of AI that helps computers understand, interpret, and generate human language.',
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
      return "Bhanu is an experienced AI/ML engineer at Microsoft with expertise in computer vision and deep learning. For specific details, please check the About section of this website.";
    }
    return "I can help answer questions about Bhanu or general topics. Please try rephrasing your question.";
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