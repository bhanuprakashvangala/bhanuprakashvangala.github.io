
(function(){
  function init(){
    var toggle = document.getElementById('chat-toggle');
    var box = document.getElementById('chat-box');
    var log = document.getElementById('chat-log');
    var input = document.getElementById('chat-input');
    var send = document.getElementById('chat-send');
    var close = document.getElementById('chat-close');
    var suggestionButtons = document.querySelectorAll('.chat-suggestion');

    if(!toggle) return;

    toggle.addEventListener('click', function(){
      box.style.display = 'flex';
    });

    if(close){
      close.addEventListener('click', function(){
        box.style.display = 'none';
      });
    }

    input.addEventListener('keypress', function(e){
      if(e.key === 'Enter'){
        sendMessage(input.value);
      }
    });

    if(send){
      send.addEventListener('click', function(){
        sendMessage(input.value);
      });
    }

    suggestionButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        sendMessage(btn.textContent);
      });
    });

    function sendMessage(text){
      text = text.trim();
      if(!text) return;
      appendMsg('You', text);
      input.value = '';
      fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({query: text})
      }).then(r => r.json())
        .then(d => appendMsg('Bot', d.answer))
        .catch(() => appendMsg('Error', 'Something went wrong.'));
    }

    function appendMsg(sender, msg){
      var p = document.createElement('p');
      p.textContent = sender + ': ' + msg;
      log.appendChild(p);
      log.scrollTop = log.scrollHeight;
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
