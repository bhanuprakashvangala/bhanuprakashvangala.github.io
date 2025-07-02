(function(){
  var el = document.getElementById('page-views');
  if(!el) return;
  var namespace = 'bhanuprakashvangala.github.io';
  var key = location.pathname.replace(/\//g,'_');
  fetch('https://api.countapi.xyz/update/' + namespace + '/' + key + '?amount=1')
    .then(function(res){ return res.json(); })
    .then(function(data){ el.textContent = data.value; })
    .catch(function(err){ console.error('Count API error', err); });
})();
