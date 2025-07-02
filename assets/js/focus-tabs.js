document.addEventListener("DOMContentLoaded",function(){
  var labels=document.querySelectorAll('.focus-tabs .tab-labels li');
  labels.forEach(function(label){
    label.addEventListener('click',function(){
      var parent=label.closest('.focus-tabs');
      if(!parent) return;
      parent.querySelectorAll('.tab-labels li').forEach(function(el){el.classList.remove('active');});
      label.classList.add('active');
      var id=label.getAttribute('data-tab');
      parent.querySelectorAll('.tab-pane').forEach(function(pane){pane.classList.remove('active');});
      var pane=parent.querySelector('#'+id);
      if(pane){pane.classList.add('active');}
    });
  });
});
