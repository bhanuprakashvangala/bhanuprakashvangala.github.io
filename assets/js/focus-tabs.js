(function(){
  function init(){
    var container = document.querySelector('.focus-tabs');
    if(!container) return;
    var labels = container.querySelectorAll('.tab-labels li');
    var panes = container.querySelectorAll('.tab-pane');

    labels.forEach(function(label){
      label.addEventListener('click', function(){
        var target = label.getAttribute('data-tab');
        labels.forEach(function(l){ l.classList.remove('active'); });
        label.classList.add('active');
        panes.forEach(function(p){
          if(p.id === target){
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
