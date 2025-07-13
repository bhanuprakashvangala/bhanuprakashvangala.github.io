//const hfToken = process.env.HF_TOKEN;
const modelId = 'deepseek-ai/DeepSeek-R1';

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

let history = [];
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
  history.push({role: 'user', content: text});
  appendMessage('assistant', '...');
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${hfToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: history,
      parameters: { max_new_tokens: 256 }
    })
  };
  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, options);
    const data = await res.json();
    const reply = data && data.length ? data[0].generated_text ?? data.generated_text : JSON.stringify(data);
    history.push({role: 'assistant', content: reply});
    document.querySelector('#chat-messages').lastChild.textContent = reply;
  } catch (err) {
    document.querySelector('#chat-messages').lastChild.textContent = 'Error: ' + err;
  }
}

document.addEventListener('DOMContentLoaded', createChatWidget);
