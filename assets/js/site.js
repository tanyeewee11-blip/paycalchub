/* ==========================================================================
   PayCalcHub — shared site behavior
   Mobile nav toggle, language dropdown, FAQ accordion.
   Loaded on every page so the browser only has to fetch/parse it once.
   ========================================================================== */

function toggleMenu(){
  var m=document.getElementById('mobileMenu');
  var b=document.getElementById('hamburgerBtn');
  if(!m||!b)return;
  var open=m.classList.toggle('open');
  b.setAttribute('aria-expanded',open);
}

document.addEventListener('click',function(e){
  var m=document.getElementById('mobileMenu');
  var b=document.getElementById('hamburgerBtn');
  var nav=document.querySelector('nav');
  if(m&&b&&nav&&!nav.contains(e.target)){
    m.classList.remove('open');
    b.setAttribute('aria-expanded','false');
  }
});

function toggleLang(){
  var w=document.getElementById('langWrap');
  if(!w)return;
  var open=w.classList.toggle('open');
  w.querySelector('.lang-btn').setAttribute('aria-expanded', open);
}

document.addEventListener('click',function(e){
  var w=document.getElementById('langWrap');
  if(w && !w.contains(e.target)){
    w.classList.remove('open');
    w.querySelector('.lang-btn').setAttribute('aria-expanded','false');
  }
});

document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    var w=document.getElementById('langWrap');
    if(w){
      w.classList.remove('open');
      w.querySelector('.lang-btn').setAttribute('aria-expanded','false');
    }
  }
});

function tFaq(el){
  var o=el.classList.contains('open');
  document.querySelectorAll('.fqq.open').forEach(function(q){
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('open');
  });
  if(!o){
    el.classList.add('open');
    el.nextElementSibling.classList.add('open');
  }
}
