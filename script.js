/* ==============================================
   Park Yihyun Portfolio — common script
   - IntersectionObserver: scroll-in reveal
   - rAF: hero parallax, scroll progress, number counter
   - prefers-reduced-motion 대응
   ============================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. scroll-in reveal (.fade → .fade.on)
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.fade').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.fade').forEach(function (el) { el.classList.add('on'); });
  }

  // 2. hero parallax (메인 페이지에만 존재)
  var heroIn = document.querySelector('#hero .inn');
  var hero = document.querySelector('#hero');
  if (heroIn && hero && !reduced) {
    var rh = false;
    window.addEventListener('scroll', function () {
      if (rh) return;
      rh = true;
      requestAnimationFrame(function () {
        var y = Math.max(0, window.scrollY);
        var h = hero.offsetHeight;
        if (y < h * 1.4) {
          var p = Math.min(1, y / h);
          heroIn.style.transform = 'translate3d(0, ' + (y * 0.35) + 'px, 0)';
          heroIn.style.opacity = String(Math.max(0, 1 - p * 1.2));
        }
        rh = false;
      });
    }, { passive: true });
  }

  // 3. scroll progress bar
  var prog = document.querySelector('.prog');
  if (prog) {
    var rp = false;
    function onProg() {
      if (rp) return;
      rp = true;
      requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        prog.style.transform = 'scaleX(' + p + ')';
        rp = false;
      });
    }
    window.addEventListener('scroll', onProg, { passive: true });
    onProg();
  }

  // 4. number counter (.num[data-count])
  var nums = document.querySelectorAll('.num[data-count]');
  if (nums.length && 'IntersectionObserver' in window) {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        nio.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10) || 0;
        if (reduced) { el.textContent = String(target); return; }
        var dur = 1400;
        var start = performance.now();
        function tick(now) {
          var t = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { nio.observe(n); });
  }

  // 5. header hide on scroll-down (.is_hd)
  var hd = document.getElementById('header');
  if (hd && !reduced) {
    var lastY = window.scrollY;
    var rhd = false;
    window.addEventListener('scroll', function () {
      if (rhd) return;
      rhd = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var down = y > lastY && y > 100;
        hd.classList.toggle('is_hd', down);
        lastY = y;
        rhd = false;
      });
    }, { passive: true });
  }
})();
