(function(){
  function showSection(id){
    document.querySelectorAll('.page-section').forEach(function(sec){
      if(sec.id === 'section-' + id){
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
    var btn = document.getElementById('show-all-btn');
    if(btn) btn.style.display = 'inline-block';
  }

  function showAll(){
    document.querySelectorAll('.page-section').forEach(function(sec){
      sec.style.display = '';
    });
    var btn = document.getElementById('show-all-btn');
    if(btn) btn.style.display = 'none';
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('#site-nav a').forEach(function(link){
      var href = link.getAttribute('href') || '';
      if(href.indexOf('#') !== -1){
        link.addEventListener('click', function(e){
          var id = href.split('#')[1];
          if(id){
            e.preventDefault();
            showSection(id);
            var anchor = document.getElementById(id);
            if(anchor) anchor.scrollIntoView({behavior:'smooth'});
          }
        });
      }
    });

    var btn = document.getElementById('show-all-btn');
    if(btn){
      btn.style.display = 'none';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        showAll();
      });
    }
  });
})();

