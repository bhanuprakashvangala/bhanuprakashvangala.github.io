$(document).ready(function(){
  var hello = document.getElementById('hello-text');
  if(hello){
    hello.style.cursor = 'pointer';
    hello.addEventListener('click', function(){
      hello.classList.add('float-up');
      setTimeout(function(){
        hello.classList.remove('float-up');
      }, 1000);
    });
  }
});
