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

  // 5. .lead / .dt_desc 줄 단위 드래그 셀렉션
  //    - Range.getClientRects()로 각 줄 rect 측정
  //    - 줄마다 .line_hl overlay 동적 생성 + 순차 transition-delay
  //    - IntersectionObserver로 .drag_on 토글 (들어올 때마다 반복)
  //    - 폰트 로딩 + resize 대응
  var leads = document.querySelectorAll('.lead, .dt_desc');

  function setupLineHighlights() {
    leads.forEach(function (container) {
      var paragraphs = container.querySelectorAll('p');
      var globalLineIndex = 0;
      paragraphs.forEach(function (p) {
        // 기존 overlay 제거
        var olds = p.querySelectorAll('.line_hl');
        for (var k = 0; k < olds.length; k++) olds[k].remove();

        var range = document.createRange();
        range.selectNodeContents(p);
        var rects = range.getClientRects();
        var pRect = p.getBoundingClientRect();
        if (!rects.length || pRect.width === 0) return;

        for (var i = 0; i < rects.length; i++) {
          var r = rects[i];
          if (r.width < 2 || r.height < 2) continue;
          var overlay = document.createElement('span');
          overlay.className = 'line_hl';
          overlay.style.top = (r.top - pRect.top) + 'px';
          overlay.style.left = (r.left - pRect.left) + 'px';
          overlay.style.width = r.width + 'px';
          overlay.style.height = r.height + 'px';
          overlay.style.transitionDelay = (globalLineIndex * 110) + 'ms';
          p.appendChild(overlay);
          globalLineIndex++;
        }
      });
    });
  }

  if (leads.length && !reduced) {
    setupLineHighlights();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setupLineHighlights);
    }
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(setupLineHighlights, 200);
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      var lio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('drag_on', entry.isIntersecting);
        });
      }, { threshold: 0.2 });
      leads.forEach(function (el) { lio.observe(el); });
    }
  }

  // 5c. Header 다크 인버트 — #contact 영역 진입 시 body.is_dk 토글
  var ctSection = document.getElementById('contact');
  if (ctSection && 'IntersectionObserver' in window) {
    var ctIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        document.body.classList.toggle('is_dk', entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    ctIO.observe(ctSection);
  }

  // 6. header hide on scroll-down (.is_hd)
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

  // 7-pre. About 체크리스트 진행 — 카드 단위 진입 시 li 순차 체크
  if (!reduced && 'IntersectionObserver' in window) {
    var abCards = document.querySelectorAll('.ab_card');
    if (abCards.length) {
      var abIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var card = entry.target;
          if (card.dataset.checked === '1') return;
          card.dataset.checked = '1';
          var items = card.querySelectorAll('.ab_lst li');
          items.forEach(function (li, idx) {
            setTimeout(function () { li.classList.add('on'); }, idx * 160 + 200);
          });
          abIO.unobserve(card);
        });
      }, { threshold: 0.35 });
      abCards.forEach(function (c) { abIO.observe(c); });
    }
  }

  // 7-pre2. 헤딩·본문 마침표 뒤 자동 줄바꿈
  //  - 끝 마침표는 건너뜀 (마침표 뒤에 다른 글자/HTML 있을 때만 br 삽입)
  //  - innerHTML 직접 치환 — 헤딩과 짧은 본문에 안전
  //  - 약어(UI/UX 등) 보존: 영문자/숫자 사이의 . 은 매칭 안 함
  (function periodBreak() {
    var sel = [
      // 타이틀/서브타이틀
      '.prj_tit', '.prj_subtit', '.prj_h_tit',
      '.card_tit', '.dcs_tit',
      '.screen_tit', '.step_tit',
      '.about_tit', '.work_tit',
      '.ct_tit', '.ab_tit', '.cta_tit',
      '.wk_tit',
      '.pair_as h4', '.pair_to h3',
      // 본문/설명
      '.prj_intro', '.prj_h_desc',
      '.card_desc', '.dcs_desc',
      '.screen_desc', '.step_desc',
      '.about_intro p', '.work_intro p',
      '.hero_desc',
      '.wk_desc',
      '.pair_as p', '.pair_to p',
      '.prj_note .txt',
      '.ab_lst li',
      // archive·기타
      '.arc_t', '.arc_s'
    ].join(',');
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.dataset.brDone === '1') return;
      var html = el.innerHTML;
      // 마침표 + 공백 + 비공백 패턴만 br로 치환 (끝 마침표 / 약어는 건너뜀)
      var out = html.replace(/\.([\s ]+)(?=[^<\s])/g, '.<br>');
      if (out !== html) {
        el.innerHTML = out;
        el.dataset.brDone = '1';
      }
    });
  })();

  // 7a. .hd_burger — 모바일 드로어 토글
  var burger = document.querySelector('.hd_burger');
  var drawer = document.getElementById('mo_drawer');
  if (burger && drawer) {
    function setDrawer(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () {
      setDrawer(!drawer.classList.contains('open'));
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('.mo_lk') || e.target.closest('.mo_mail')) {
        setDrawer(false);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false);
    });
  }

  // 7b. .ct_act[data-copy] — 클립보드 복사
  var copyBtns = document.querySelectorAll('.ct_act[data-copy]');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var txt = btn.getAttribute('data-copy');
      var orig = btn.textContent;
      function done() {
        btn.classList.add('is_copied');
        btn.textContent = 'Copied';
        setTimeout(function () {
          btn.classList.remove('is_copied');
          btn.textContent = orig;
        }, 1500);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(txt).then(done).catch(function () { done(); });
      } else {
        var ta = document.createElement('textarea');
        ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  });

  // 7d. .prj_tabs — 디바이스 탭 (PC / Tablet / Mobile)
  document.querySelectorAll('.prj_tabs').forEach(function (tabs) {
    var nav = tabs.querySelector('.tab_nav');
    var panels = tabs.querySelector('.tab_panels');
    if (!nav || !panels) return;
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('.tab');
      if (!btn) return;
      var key = btn.getAttribute('data-tab');
      nav.querySelectorAll('.tab').forEach(function (t) {
        t.classList.toggle('on', t === btn);
        t.setAttribute('aria-selected', t === btn ? 'true' : 'false');
      });
      panels.querySelectorAll('.tab_panel').forEach(function (p) {
        p.classList.toggle('on', p.getAttribute('data-tab') === key);
      });
    });
  });

  // 7c. .arc_fltr — 아카이브 필터
  var arcFltr = document.querySelector('.arc_fltr');
  var arcMosaic = document.querySelector('.arc_mosaic');
  if (arcFltr && arcMosaic) {
    arcFltr.addEventListener('click', function (e) {
      var btn = e.target.closest('.fltr_chip');
      if (!btn) return;
      var cat = btn.getAttribute('data-arc');
      var chips = arcFltr.querySelectorAll('.fltr_chip');
      for (var i = 0; i < chips.length; i++) chips[i].classList.toggle('on', chips[i] === btn);
      var items = arcMosaic.querySelectorAll('.arc_it');
      for (var j = 0; j < items.length; j++) {
        var match = (cat === 'all') || items[j].getAttribute('data-arc') === cat;
        items[j].hidden = !match;
      }
    });
  }

  // 7. .work_fltr — 카테고리 필터 토글
  var fltr = document.querySelector('.work_fltr');
  var workLst = document.querySelector('.work_lst');
  if (fltr && workLst) {
    fltr.addEventListener('click', function (e) {
      var btn = e.target.closest('.fltr_chip');
      if (!btn) return;
      var cat = btn.getAttribute('data-fltr');
      var chips = fltr.querySelectorAll('.fltr_chip');
      for (var i = 0; i < chips.length; i++) {
        chips[i].classList.toggle('on', chips[i] === btn);
        chips[i].setAttribute('aria-pressed', chips[i] === btn ? 'true' : 'false');
      }
      var cards = workLst.querySelectorAll('.wk_card');
      for (var j = 0; j < cards.length; j++) {
        var raw = cards[j].getAttribute('data-cat') || '';
        var cats = raw.split(/\s+/);
        var match = (cat === 'all') || cats.indexOf(cat) !== -1;
        cards[j].hidden = !match;
      }
    });
  }
})();
