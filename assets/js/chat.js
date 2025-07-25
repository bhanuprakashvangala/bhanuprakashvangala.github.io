let qa;
let qaContext = '';

// Endpoint for server-side LLM if provided
const apiEndpoint = window.LLM_API_ENDPOINT || '';

// Switch to a more capable but browser‑friendly model
const modelId = 'Xenova/flan-t5-base';

async function loadModel() {
  try {
    const contextPath = new URL('assets/qa_context.txt', document.baseURI).pathname;
    const res = await fetch(contextPath);
    if (res.ok) {
      qaContext = await res.text();
    }
  } catch (err) {
    console.error('Failed to initialize QA context:', err);
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
      <span>What can I help you with?</span>
      <button id="chat-close">&times;</button>
    </div>
    <div id="chat-messages">
      <div class="suggestions">
        <p class="suggest">Who is Bhanu?</p>
        <p class="suggest">Where is his bachelors?</p>
        <p class="suggest">What research is he mainly focused on?</p>
      </div>
    </div>
    <form id="chat-form">
      <input id="chat-input" type="text" placeholder="Type your message..." required />
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

async function sendMessage(text) {
  appendMessage('user', text);
  appendMessage('assistant', '...');
  try {
    let answer = '';
    const query = typeof text === 'string' ? text : String(text);

    if (apiEndpoint) {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: query })
        });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        answer = data.generated_text || data.answer || data.output || data;
        if (typeof answer !== 'string') {
          answer = JSON.stringify(answer);
        }
      } catch (apiErr) {
        console.warn('Remote API failed, falling back to local model:', apiErr);
        if (!qa) {
          const { pipeline } = window.transformers;
          qa = await pipeline('question-answering', modelId);
        }
        const result = await qa(query, { context: qaContext });
        answer = result.answer;
      }
    } else {
      if (!qa) {
        const { pipeline } = window.transformers;
        qa = await pipeline('question-answering', modelId);
      }
      const result = await qa(query, { context: qaContext });
      answer = result.answer;
    }
    document.querySelector('#chat-messages').lastChild.textContent = answer;
  } catch (err) {
    document.querySelector('#chat-messages').lastChild.textContent = 'Error: ' + err.message;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadModel();
  createChatWidget();
});
