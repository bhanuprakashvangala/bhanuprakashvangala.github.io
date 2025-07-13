let qa;
let qaContext = '';
// Switch to a more capable but browser‑friendly model
const modelId = 'Xenova/flan-t5-base';

async function loadModel() {
  try {
    const { pipeline } = window.transformers;
    const contextPath = new URL('assets/qa_context.txt', document.baseURI).pathname;
    const res = await fetch(contextPath);
    if (!res.ok) {
      throw new Error('Failed to load context');
    }
    qaContext = await res.text();
    qa = await pipeline('question-answering', modelId);
  } catch (err) {
    console.error('Failed to initialize QA model:', err);
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
    if (!qa) {
      throw new Error('Model not loaded');
    }
    // Log the type and value of the incoming message to help debug
    console.log('sendMessage input:', typeof text, text);
    // Ensure the question is a string before passing to the model
    const query = typeof text === 'string' ? text : String(text);
    const result = await qa(query, { context: qaContext });
    document.querySelector('#chat-messages').lastChild.textContent = result.answer;
  } catch (err) {
    document.querySelector('#chat-messages').lastChild.textContent = 'Error: ' + err.message;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadModel();
  createChatWidget();
});
