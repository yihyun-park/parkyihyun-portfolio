# 박이현 퍼블리싱 규칙 (Publishing Rules)

이 문서는 박이현(이현)의 모든 퍼블리싱 작업에 적용되는 공통 규칙입니다.
새로운 페이지·프로젝트를 만들거나 기존 코드를 수정할 때 이 규칙을 따릅니다.

---

## 1. 핵심 원칙

- **최대한 HTML/CSS로 해결.** JavaScript는 정말 필요한 인터랙션에만 사용.
- **가장 큰 섹션은 class가 아닌 ID로.** (예: `#header`, `#container`, `#hero`)
- **JS 최소화.** 가능한 효과는 CSS로 (`@keyframes`, `:has()`, `scroll-behavior`, transitions).
- **시맨틱 마크업 우선.** `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`.

---

## 2. 네이밍 컨벤션

### ID (페이지 단위 구조)

```
#wrap          전체 래퍼 (선택)
#header        고정 헤더
#container     메인 콘텐츠
#footer        푸터
#hero          히어로 섹션
#about         어바웃 섹션
#work          작업 리스트 섹션
#contact       연락처 섹션
#detail        디테일/서브페이지 본문 영역
```

### 클래스 (아주 간결하게, `prefix_short` 패턴)

**컴포넌트 클래스 (3~6자 prefix)**

```
.gnb           글로벌 네비
.gnb_lst       gnb 리스트
.gnb_lk        gnb 링크
.wk_lst        작업 리스트
.wk_it         작업 아이템
.dt_top        디테일 상단
.dt_meta       디테일 메타
.cnt_it        연락처 아이템
```

**유틸 클래스 (반복되는 패턴은 무조건 분리)**

```
.tit           제목 (size variant: .tit_xl, .tit_lg, .tit_md, .tit_sm)
.sub           서브타이틀
.desc          설명 / 본문
.lbl           작은 라벨 (12px, uppercase, letter-spaced)
.txt           일반 본문 텍스트
.num           숫자 (font-variant-numeric: tabular-nums)
.btn           버튼 (variant: .btn_pri, .btn_sec)
.chip          작은 pill 뱃지
.lst           리스트 베이스
.it            리스트 아이템 (context로 다른 스타일)
.lnk           링크
.ico           아이콘
.bx            박스
.grd           그리드
.row           플렉스 row
.col           플렉스 column
.wrap          래퍼
.inn           inner wrapper (max-width + padding)
.sec           섹션 베이스
```

**상태 클래스**

```
.on            활성 / 보임
.open          열림
.is_hd         숨김
.is_act        active
```

**반응형 줄바꿈**

```html
<br class="br_pc">    PC에서만 보임
<br class="br_mo">    모바일에서만 보임
```

### 부모 컨텍스트 활용 (DRY)

가능한 경우 부모 ID나 클래스를 사용해 자식 클래스 줄이기:

```css
/* ❌ 나쁜 예 */
.about_lead { ... }
.contact_lead { ... }
.about_box { ... }

/* ✅ 좋은 예 */
#about .lead { ... }
#contact .lead { ... }
#about .bx { ... }
```

---

## 3. 폰트 사이즈

**무조건 짝수 2px 단위만 사용:**

```
12 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 30 · 32 · 36 · 40 · 44 · 48 · 56 · 64 · 72
```

**금지:**
- 홀수: 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31 → 가까운 짝수로 (11→12, 13→14, 15→16/14)
- 소수점: 14.5, 15.5, 12.5 등 → 절대 사용 X

**clamp() 사용 시:** min/max 값도 짝수여야 함. 중간 vw 값은 자유.

```css
/* ❌ */
font-size: clamp(15px, 1.4vw, 17px);

/* ✅ */
font-size: clamp(16px, 1.4vw, 18px);
```

---

## 4. 컬러 토큰 (CSS 변수)

```css
:root {
  --c-bg: #fff;
  --c-fg: #111;
  --c-fg-2: #444;
  --c-fg-3: #888;
  --c-line: #e8e8e8;
  --c-line-2: #f1f1f1;
  --c-accent: #2563EB;        /* 코발트 블루 (포인트) */
  --c-accent-soft: #e6edff;
}
```

---

## 5. 폰트 (Pretendard)

```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
```

```css
body {
  font-family: 'Pretendard Variable', Pretendard,
    -apple-system, BlinkMacSystemFont, 'SF Pro KR', 'SF Pro Display',
    'Apple SD Gothic Neo', system-ui, sans-serif;
  font-feature-settings: "ss06", "ss03", "cv11";
  word-break: keep-all;        /* 한국어 줄바꿈 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## 6. 반응형 브레이크포인트

```css
/* 데스크톱: 기본 */
/* 태블릿 */    @media (max-width: 768px) { ... }
/* 모바일 */    @media (max-width: 480px) { ... }
/* 소형 모바일 */ @media (max-width: 360px) { ... }
```

- 모바일 최소 지원: **320px**
- 컨테이너 padding 단계적 축소: 32 → 20 → 16
- 폰트도 단계적으로

---

## 7. CSS 구조 순서

```
1. @charset, reset
2. base body
3. :root tokens (CSS 변수)
4. a11y (.skip, .blind, :focus-visible, prefers-reduced-motion)
5. responsive helpers (.br_pc, .br_mo)
6. decoration (.blob 등)
7. layout (.inn, .sec, .wrap)
8. #header, .gnb
9. #hero
10. .sec_h (공통 섹션 헤딩)
11. #about, #work, #contact, #detail
12. 유틸 클래스 (.tit, .btn, .chip 등)
13. 상태 (.on, .open)
14. @media (max-width: 768)
15. @media (max-width: 480)
16. @media (max-width: 360)
17. @media print
```

---

## 8. JS 패턴

**최소한만 사용. 다음 패턴 외 추가 X:**

- `IntersectionObserver` — 스크롤 인 효과
- `requestAnimationFrame` — 패럴랙스 / 카운터
- `addEventListener('scroll', ..., { passive: true })`
- **`prefers-reduced-motion` 대응 필수**

피해야 할 것:
- 무거운 라이브러리 (GSAP, jQuery 등)
- 인라인 `onclick`
- 동기적 스크롤 핸들러 (`passive: true` 필수)

---

## 9. 접근성

- 첫 줄에 `<a href="#container" class="skip">본문 바로가기</a>`
- 시각적으로만 숨길 땐 `.blind` 클래스
- `:focus-visible` 키보드 사용자용 스타일
- `<section>`마다 `aria-labelledby`
- `<button>` `<a>` 의미 맞게
- `prefers-reduced-motion` 모션 자동 끄기
- 색상 대비 WCAG AA 이상

---

## 10. 한국 퍼블리셔 코멘트 컨벤션

영역 마킹 코멘트:

```html
<!-- header -->
<header id="header">
  ...
</header>
<!--// header -->

<!-- container -->
<main id="container">
  <!-- hero -->
  <section id="hero">...</section>
  <!--// hero -->

  <!-- work -->
  <section id="work">...</section>
  <!--// work -->
</main>
<!--// container -->
```

---

## 11. 파일 구조 (멀티페이지)

```
project/
├── index.html              메인
├── work-N.html             서브페이지 (작업 상세)
├── styles.css              공통 스타일
├── script.js               공통 스크립트
├── images/                 이미지 자산
│   ├── work-1-thumb.png    (16:10, 2x = 1024×640)
│   └── work-1-mockup.png   (16:11, 2x = 2112×1452)
└── CLAUDE.md               (이 규칙 문서)
```

---

## 12. 외부 호스팅 이미지

S3 등 외부 URL 이미지 사용 시:
- `loading="lazy"` 필수
- `alt` 텍스트 명확하게
- 가능하면 로컬에 백업

```html
<img src="https://example.com/image.jpg" alt="..." loading="lazy">
```

---

## 13. SEO 메타 태그 (모든 페이지 최대한 작성)

**모든 페이지에 빠짐없이 작성. 페이지마다 title/description은 고유하게.**

### 13-1. 기본 (필수)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>페이지명 · 박이현 Portfolio</title>             <!-- 50~60자 -->
<meta name="description" content="...">              <!-- 120~160자 -->
<meta name="keywords" content="..., ...">            <!-- 콤마 구분 -->
<meta name="author" content="박이현 (Park Yihyun)">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c0c0c" media="(prefers-color-scheme: dark)">
<meta name="format-detection" content="telephone=no">
<link rel="canonical" href="https://example.com/page">
```

### 13-2. Open Graph (필수 — 카톡/슬랙/페북 미리보기)

```html
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:type" content="website">           <!-- 또는 article -->
<meta property="og:url" content="https://example.com/page">
<meta property="og:image" content="https://example.com/og.png">  <!-- 1200×630 -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="...">
<meta property="og:locale" content="ko_KR">
<meta property="og:site_name" content="박이현 Portfolio">
```

### 13-3. Twitter Card (선택 — 트위터/X 공유 시)

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://example.com/og.png">
<meta name="twitter:image:alt" content="...">
```

### 13-4. Favicon / 앱 아이콘 (필수)

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

### 13-5. 검색엔진 인증 (필요 시)

```html
<meta name="google-site-verification" content="...">
<meta name="naver-site-verification" content="...">
```

### 13-6. JSON-LD 구조화 데이터 (포트폴리오 권장)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "박이현",
  "alternateName": "Park Yihyun",
  "jobTitle": "UI/UX Designer & Front-end Publisher",
  "url": "https://example.com",
  "sameAs": [
    "https://github.com/...",
    "https://www.linkedin.com/in/..."
  ]
}
</script>
```

작업 상세 페이지(work-N.html)에서는 `@type: "CreativeWork"`로 변경.

### 13-7. 페이지별 메타 작성 체크리스트

- [ ] title: 페이지 고유, 50~60자, 핵심 키워드 앞쪽
- [ ] description: 120~160자, 페이지 내용 요약 + 검색 의도 키워드
- [ ] keywords: 5~10개 핵심 단어
- [ ] og:image: 1200×630 비율, 페이지마다 다르게 (또는 공통)
- [ ] canonical: 정규 URL (쿼리 파라미터 없는 버전)
- [ ] lang: 페이지 주 언어 (한국어는 `ko`)

---

## 14. 폰트 사이즈 의미별 가이드

| px | 용도 |
|----|------|
| 12 | 작은 라벨, 캡션, 메타 정보, 카피라이트 |
| 14 | 보조 본문, 작은 버튼 |
| 16 | 본문 기본, 일반 링크 |
| 18 | 강조 본문, 리드 텍스트 |
| 20 | 작은 헤딩, 강한 본문 |
| 22~26 | 카드 제목, 섹션 서브헤딩 |
| 28~36 | 섹션 헤딩 |
| 40~48 | 페이지 헤딩 |
| 56~72 | 디테일 페이지 큰 타이틀 |
| 80~144 | 히어로 큰 타이포 |

---

## 15. 웹 표준 (Web Standards) 준수

**모든 페이지는 W3C 표준을 따른다. validator.w3.org 통과 기준.**

### 15-1. HTML5 기본

- 첫 줄 `<!DOCTYPE html>` 필수
- `<html lang="ko">` 명시 (한국어 페이지)
- `<meta charset="UTF-8">`은 `<head>` 첫 번째
- 모든 태그 소문자
- 속성값 큰따옴표 `"..."`
- self-closing 태그(`<br>`, `<img>`, `<meta>`)는 슬래시 없이 (HTML5 표준)

### 15-2. 시맨틱 HTML

**올바른 의미의 태그를 쓴다. div 남발 금지.**

```html
<!-- ✅ 좋은 예 -->
<header id="header">
  <nav aria-label="주요 메뉴">
    <ul class="gnb_lst">
      <li><a href="...">메뉴</a></li>
    </ul>
  </nav>
</header>
<main id="container">
  <section id="about" aria-labelledby="about_tit">
    <h2 id="about_tit">About</h2>
    <article>...</article>
  </section>
</main>
<footer id="footer">...</footer>

<!-- ❌ 나쁜 예 -->
<div class="header">
  <div class="nav">
    <div class="menu">...</div>
  </div>
</div>
```

태그 선택 가이드:
- `<header>` — 페이지/섹션 머리말
- `<nav>` — 주요 네비게이션
- `<main>` — 페이지 본문 (한 페이지에 1개)
- `<section>` — 주제별 구역 (heading 포함)
- `<article>` — 독립적 콘텐츠 (블로그 글, 카드)
- `<aside>` — 부가 정보, 사이드바
- `<footer>` — 페이지/섹션 꼬리말
- `<figure>` + `<figcaption>` — 이미지·차트와 캡션
- `<dl>` + `<dt>` + `<dd>` — 키-값 쌍 (메타 정보 등)
- `<button>` — 클릭 동작 (페이지 이동은 `<a>`)
- `<a>` — 페이지/앵커 이동

### 15-3. heading 위계 (h1 → h6)

**순서대로. 점프 금지.**

```
h1 (페이지 1개)
  h2
    h3
      h4
```

- 한 페이지에 `<h1>` 하나 (페이지 주 제목)
- `<h2>` 건너뛰고 바로 `<h3>` 사용 금지
- 시각 크기로 결정 X, 의미 위계로 결정

### 15-4. 폼 (있을 때)

```html
<!-- label과 input은 반드시 연결 -->
<label for="email">이메일</label>
<input type="email" id="email" name="email" required>

<!-- 또는 wrap 방식 -->
<label>
  이메일
  <input type="email" name="email" required>
</label>

<!-- placeholder는 label 대체 X -->
```

### 15-5. 이미지

```html
<!-- alt 텍스트 필수 (장식용은 빈 alt) -->
<img src="..." alt="설명" loading="lazy" width="800" height="600">

<!-- 장식용 (의미 없는 이미지) -->
<img src="bg.png" alt="" aria-hidden="true">

<!-- 반응형 이미지 -->
<picture>
  <source media="(max-width: 480px)" srcset="mobile.jpg">
  <source media="(max-width: 1024px)" srcset="tablet.jpg">
  <img src="desktop.jpg" alt="..." loading="lazy">
</picture>
```

width/height 속성으로 CLS(Cumulative Layout Shift) 방지.

### 15-6. 링크

```html
<!-- 같은 탭 (내부 링크) -->
<a href="/page">내부 페이지</a>

<!-- 새 탭 (외부 링크) — rel 필수 -->
<a href="https://external.com" target="_blank" rel="noopener noreferrer">외부</a>

<!-- 다운로드 -->
<a href="file.pdf" download>다운로드</a>

<!-- 텔/메일 -->
<a href="tel:+82-10-XXXX-XXXX">전화</a>
<a href="mailto:hello@example.com">메일</a>
```

### 15-7. CSS 표준

- vendor prefix는 `-webkit-`만 (Safari 대응), 나머지는 표준 속성만
- `@supports`로 신기능 폴백 처리
- `!important` 최소화 (오버라이드용 외 사용 X)
- 색상 대비: WCAG AA 이상 (본문 4.5:1, 큰 글자 3:1)
- focus-visible 키보드 사용자용 명시

### 15-8. 크로스 브라우저

지원 대상:
- Chrome / Edge / Firefox 최신 2개 버전
- Safari 최신 2개 버전 (iOS 포함)
- 한국 기준 — 네이버 웨일, 카카오 인앱 브라우저 호환

테스트:
- Chrome DevTools 모바일 뷰
- 실제 iPhone Safari
- 실제 Android Chrome

### 15-9. 성능 표준

- 이미지: `loading="lazy"` (스크롤 다운 시 로드)
- 폰트: `font-display: swap` 또는 preload
- CSS: critical CSS 인라인 / 나머지 외부 파일
- JS: `defer` 또는 `async`
- 외부 도메인: `preconnect` / `dns-prefetch`
- 이미지 포맷: WebP 우선, JPG/PNG는 폴백
- Lighthouse 점수: Performance / Accessibility / Best Practices / SEO 모두 90 이상 목표

### 15-10. 검증 체크리스트

코드 작성 후 확인:

- [ ] [W3C HTML Validator](https://validator.w3.org) — HTML 유효성
- [ ] [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) — CSS 유효성
- [ ] [Lighthouse](https://developers.google.com/web/tools/lighthouse) — 성능·접근성·SEO
- [ ] [WAVE](https://wave.webaim.org) — 접근성 자동 검사
- [ ] 페이지 키보드만으로 탐색 가능 (Tab 키 흐름)
- [ ] 스크린 리더 호환 (VoiceOver / NVDA)
- [ ] 모바일 뷰포트에서 가로 스크롤 없음 (320px 이상)

---

## 16. 컨벤션 위반 시

기존 코드에서 위 규칙을 어긴 부분 발견 시 → 발견한 순간 같이 수정.
신규 코드는 처음부터 규칙 준수.

---

_Last updated: 2026.05_
_이 문서는 박이현의 모든 퍼블리싱 작업에 우선 적용됩니다._
