(function(){
  function init(){
    var toggle = document.getElementById('chat-toggle');
    var box = document.getElementById('chat-box');
    var log = document.getElementById('chat-log');
    var input = document.getElementById('chat-input');

    if(!toggle) return;

    toggle.addEventListener('click', function(){
      box.classList.toggle('visible');
    });

    input.addEventListener('keypress', function(e){
      if(e.key === 'Enter'){
        var text = input.value.trim();
        if(!text) return;
        appendMsg('You', text);
        input.value = '';
        fetch('/chat', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({query: text})
        }).then(r => r.json())
          .then(d => appendMsg('Bot', d.answer))
          .catch(() => appendMsg('Error', 'Something went wrong.'));
      }
    });

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
