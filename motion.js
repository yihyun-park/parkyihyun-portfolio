/* ==========================================================
   motion.js — About 텍스트 리빌 (오버레이)
   대상 문단의 텍스트 노드를 단어 단위 .mtn-w로 감싸고,
   문단이 화면에 들어오면 .mtn-on을 붙인다.
   실제 점등 순서·속도는 motion.css의 transition-delay가 담당.
   한 번 켜진 문단은 되돌리지 않는다 (단방향).
   기존 마크업·styles.css·script.js는 건드리지 않는다.
   ========================================================== */
(function () {
  'use strict';

  /* 적용 대상 셀렉터 — About 인트로 문단만 */
  var TARGETS = [
    '#about .about_intro p'
  ];

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* 텍스트 노드를 단어 단위 span으로 감싼다.
     인라인 자식(<br>, <b> 등)은 유지하며 재귀 처리,
     공백 텍스트 노드는 그대로 둔다 (한국어 word-break 유지) */
  function wrapWords(node) {
    if (node.nodeType === 3) {
      if (!node.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      var parts = node.nodeValue.split(/(\s+)/);
      for (var i = 0; i < parts.length; i++) {
        if (!parts[i]) continue;
        if (/^\s+$/.test(parts[i])) {
          frag.appendChild(document.createTextNode(parts[i]));
        } else {
          var sp = document.createElement('span');
          sp.className = 'mtn-w';
          sp.textContent = parts[i];
          frag.appendChild(sp);
        }
      }
      node.parentNode.replaceChild(frag, node);
    } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT') {
      var kids = Array.prototype.slice.call(node.childNodes);
      for (var j = 0; j < kids.length; j++) wrapWords(kids[j]);
    }
  }

  var targets = [];
  for (var i = 0; i < TARGETS.length; i++) {
    var els = document.querySelectorAll(TARGETS[i]);
    for (var j = 0; j < els.length; j++) targets.push(els[j]);
  }
  if (!targets.length) return;

  for (var k = 0; k < targets.length; k++) {
    wrapWords(targets[k]);
    /* 단어 순번을 --w로 심어 CSS가 stagger를 계산하게 한다 */
    var words = targets[k].querySelectorAll('.mtn-w');
    for (var w = 0; w < words.length; w++) {
      words[w].style.setProperty('--w', w);
    }
  }

  function turnOn(el) { el.classList.add('mtn-on'); }

  if (!('IntersectionObserver' in window)) {
    for (var f = 0; f < targets.length; f++) turnOn(targets[f]);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      turnOn(entry.target);
      io.unobserve(entry.target); /* 단방향 — 다시 흐려지지 않음 */
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -12% 0px' });

  for (var o = 0; o < targets.length; o++) io.observe(targets[o]);
})();
