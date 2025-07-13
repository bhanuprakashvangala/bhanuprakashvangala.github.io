let qa;
let qaContext = '';
const modelId = 'Xenova/distilbert-base-cased-distilled-squad';

async function loadModel() {
  const { pipeline } = window.transformers;
  const res = await fetch('assets/qa_context.txt');
  qaContext = await res.text();
  qa = await pipeline('question-answering', modelId);
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
    const result = await qa(text, { context: qaContext });
    document.querySelector('#chat-messages').lastChild.textContent = result.answer;
  } catch (err) {
    document.querySelector('#chat-messages').lastChild.textContent = 'Error: ' + err;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadModel();
  createChatWidget();
});
