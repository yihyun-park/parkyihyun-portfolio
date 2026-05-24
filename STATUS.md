# 박이현 포트폴리오 — 진행 상태 & 대화 컨텍스트

**새 Claude 세션이 이 파일과 `CLAUDE.md`를 먼저 읽고 작업을 이어갑니다.**

---

## 0. 작업 목적

**이력서 첨부용 라이브 포트폴리오 사이트 + PDF 보강.**

- 채용 통과율 향상이 목적
- 사이트 자체가 "본인 퍼블리셔 능력" 증명물 — 코드 품질·SEO·접근성·반응형 다 검수됨
- 면접관이 View Source 열어도 한국 퍼블리셔 컨벤션 그대로 보이게

---

## 1. 작업자 (박이현 / Park Yihyun)

- 11년차 UI/UX 디자이너 & 프론트엔드 퍼블리셔
- 도메인: 공공기관 / B2B 관제 시스템 / 코퍼레이트 / 캠페인 랜딩
- Email: forestmm@naver.com
- Phone: 010-3990-1108
- GitHub: yihyun-park
- 작업 환경: Windows + Figma + 한컴오피스
- Claude 워크스페이스 가상화 비활성 (셸 도구 못 씀)

---

## 2. 본인 선호·말투·작업 스타일 (중요)

- **위트 카피 거부.** 예전에 "복잡한 화면이 신납니다" 같은 위트 시도했다가 반려됨. **사실 톤·디자이너 사실 기반 진중한 톤** 선호.
- **솔직한 피드백 OK.** 욕설 섞임. 빠른 결정 선호.
- **긴 설명 싫어함.** 핵심만 짧게.
- **AskUserQuestion 객관식 도구의 한국어가 자주 이상하게 번역돼서 안 좋아함.** 그냥 텍스트로 질문할 것.
- **본인이 한국어 어색하다고 느끼면 즉시 지적.** "한국말 이상해" 등.
- **이미지 작업 빠르게 처리하고 싶어함.** 본인이 Figma export 후 폴더에 드롭하면 즉시 노출되게 코드 미리 세팅하는 흐름 선호.
- **AI 활용 능력 포폴에 강조하고 싶어함** — 11년차 + AI 협업 = 시장 가치 높음.

---

## 3. 핵심 결정 사항 (이게 컨벤션)

자세한 규칙은 `CLAUDE.md` 참조. 요약:

### 디자인
- **포인트 컬러**: 코발트 블루 `#2563EB`
- **보조 컬러**: 소프트 틸 `#4FD1C5` (블롭에서만 사용)
- **다크 섹션 배경**: `#0c0c0c` (Contact 영역)
- **본문 컬러**: `#111` / `#444` / `#888`

### 타이포
- **폰트**: Pretendard Variable (CDN: cdn.jsdelivr.net)
- **사이즈**: 짝수 단위만 (12·14·16·18·20·22·24·26·28·30·32·36·40·44·48·56·64·72·144)
- 홀수·소수점 금지

### 네이밍 (한국 퍼블리셔 컨벤션)
- 큰 섹션은 `#ID` (예: `#header`, `#container`, `#hero`, `#about`, `#work`, `#contact`, `#detail`)
- 컴포넌트 클래스는 prefix_short 패턴 (`.wk_it`, `.dt_meta`, `.gnb_lst`)
- 유틸 클래스 적극 활용 (`.tit`, `.lbl`, `.btn`, `.chip`, `.inn`, `.bx`, `.grd`)
- 부모 컨텍스트 활용 (`.about_lead` 대신 `#about .lead`)
- 상태: `.on`, `.open`, `.is_hd`
- 줄바꿈: `<br class="br_pc">` / `<br class="br_mo">`

### 레이아웃 (소이정 패턴)
서브 페이지 케이스 스터디 구조:
1. 상단 중앙 정렬: 마크 + 타이틀
2. 메타: KEYWORD / DATE / SCOPE / ROLE (+ SITE if live)
3. 흐르는 설명 단락 3개 (Brief / Decisions / Deliverables 통합)
4. (있으면) CTA 버튼
5. **AS-IS / TO-BE 비교** (Pill 페어 + 화살표 디자인 — 회색 배경 박스 안)
6. 빅 비주얼 이미지
7. 목록보기 + TOP 버튼

### 컬러 변수
```css
:root {
  --c-bg: #fff;
  --c-fg: #111;
  --c-fg-2: #444;
  --c-fg-3: #888;
  --c-line: #e8e8e8;
  --c-line-2: #f1f1f1;
  --c-accent: #2563EB;
  --c-accent-soft: #e6edff;
}
```

---

## 4. 파일 구조

```
portfolio/
├── CLAUDE.md              퍼블리싱 규칙 (필수)
├── STATUS.md              이 파일
├── index.html             메인 (Hero / About / Work 그리드 / Contact)
├── work-1.html            쏘카 코퍼레이트 블로그
├── work-2.html            GIS 수문정보시스템
├── work-3.html            파트너스 ESG
├── work-4.html            동반성장위원회
├── work-5.html            Promotional Content Design
├── work-6.html            네이버페이 × 탄소중립포인트
├── naverpay-campaign.html 네이버페이 라이브 데모 (퍼블 복원)
├── styles.css             공통 스타일
├── script.js              공통 JS
└── images/
    ├── README.md
    ├── thum_04.png                              (동반성장 썸네일)
    ├── work-4-pc.png / -tablet.png / -mo.png   (동반성장 3해상도)
    ├── work-4-mockup.svg                        (구버전 — 삭제 예정)
    ├── work-6-naverpay-pc.png / -mo.png         (네이버페이 PC/Mobile)
    ├── naverpay-hero-bg.png / -n.png            (네이버페이 hero)
    └── naverpay-step-1.png / -2.png / -3.png    (네이버페이 step)
```

---

## 5. 6개 프로젝트 정보

| # | 프로젝트 | 클라이언트 | 기간 | 메모 |
|---|---|---|---|---|
| 01 | 쏘카 코퍼레이트 블로그 | 쏘카 (SOCAR) | 2025.12 – 2026.01 | 라이브: socarcorp.kr/blog. **블로그 신설 + 메인 진입 영역 디자인** |
| 02 | GIS 수문정보시스템 | 공공기관 | 2025.01 – 2025.03 | 관제 플랫폼. 보라 메인 #605BFF |
| 03 | 파트너스 ESG | 동반성장위원회 산하 | 2024.09 – 2025.03 | 동반성장위와 패밀리 사이트 |
| 04 | 동반성장위원회 | 공공기관 | 2024.05 – 2025.03 | **운영 디자인 변경됨 (외부 카피 방향). 본 산출물은 설계 단계.** |
| 05 | Promotional Content | (다양) | — | 카드뉴스·EDM·웹 배너 |
| 06 | 네이버페이 × 탄소중립포인트 | 환경부 × 네이버페이 | 2023 | 캠페인 랜딩 (디자인 + 반응형 퍼블 단독). naverpay-campaign.html에 라이브 데모 복원 시도. |

---

## 6. 진행 상태

### ✅ 완료
- 6개 케이스 스터디 텍스트 (소이정 톤)
- About / 표지 / Contact 카피
- 멀티 페이지 구조
- 한국 퍼블리셔 컨벤션 전면 적용
- 짝수 폰트 정리
- 반응형 (320~)
- SEO 메타 풀 세팅 + JSON-LD
- 시맨틱 HTML + ARIA + skip nav
- 코발트 블루 포인트 컬러 + 틸 블롭 (모션)
- Hero parallax / fade.on reveal / scroll progress / number counter / header hide
- box-shadow 적용 (border 제거)
- AI 활용 워크플로우 About에 추가
- Email / Phone 채움
- 일부 이미지 저장 완료 (위 파일 구조 참조)
- 동반성장 디바이스 목업 SVG → PC/Tablet/Mobile 3장으로 교체
- 네이버페이 PC + Mobile 가로 페어 레이아웃
- 네이버페이 hero 배경 + N 로고 (3.5초 떠다님 모션)
- AS-IS/TO-BE 카드형 (구버전) → Pill 페어 + 화살표 (신버전 CSS) 교체 **(CSS만)**

### 🔄 진행 중 (중단됨)
**AS-IS / TO-BE Pill 디자인을 각 work HTML에 적용 중**

사용자가 시안 이미지 제공 — Project Goal 헤더 + As Is(흰 pill) → 화살표 → To Be(검정 pill) 형식.

CSS는 완료 (`.dt_compare`, `.comp_head`, `.comp_grid`, `.pill.asis/.tobe`, `.arrow`).

각 페이지에 들어갈 콘텐츠 안 (제안된 헤드라인):
- **work-1 쏘카**: "쏘카 디자인 시스템과의 일관성을 유지하며 블로그 채널을 신설하는 방향으로"
- **work-2 GIS**: "복잡한 관제 정보를 직관적인 UI로 정리하는 방향으로"
- **work-3 ESG**: "모기관 디자인 시스템을 상속하며 ESG 정체성을 분리하는 방향으로"
- **work-4 동반성장**: "고객사의 니즈를 충족하여 디자인을 개선하는 방향으로" (PDF 원본)
- **work-5 컨텐츠**: "채널별 사용자 환경에 최적화된 시각 자산을 제작하는 방향으로"
- **work-6 네이버페이**: "복잡한 전환 절차를 누구나 이해하도록 단계별로 정리하는 방향으로"

각 페이지 AS-IS/TO-BE 콘텐츠는 본인 원본 PDF에서 추출 가능 — **work-4 동반성장위**가 가장 명확한 케이스. 다른 페이지는 기존 본문에서 추론.

### 📝 대기 (사용자가 해야 할 일)
- 남은 이미지 저장
  - `work-2-pc.png` + `work-2-mo.png` (GIS, PC+Mobile)
  - `work-3-pc.png` + `work-3-mo.png` (ESG, PC+Mobile — 3해상도 원하면 알려달라고)
  - `work-5-mockup.png` (컨텐츠 단일)
  - `박이현_포트폴리오.pdf` (Contact 다운로드 링크용)
- `work-4-mockup.svg` 삭제 (구버전)

### 🚀 다음 단계
1. **GitHub 업로드** ← 사용자가 yihyun-park 계정으로 parkyihyun-portfolio 레포 생성함. Git Bash로 push 시도했으나 paste 안 됨. **GitHub 웹 UI 드래그앤드롭으로 가는 중**
2. **Vercel 자동 배포** (GitHub 연결 후 자동)
3. AS-IS/TO-BE 적용 마무리
4. (선택) PDF 보강 페이지

---

## 7. 작동 중인 컴포넌트 메모

### 메인 페이지 work 카드 (`.wk_it`)
- `.thumb` (기본 `object-fit: contain` — 이미지 비율 그대로)
- `.thumb.cover` (꽉 채움, 잘림 OK — 쏘카 외부 S3 이미지에 적용)
- `.thumb.top` (꽉 채움 + 상단 크롭 — 네이버페이 긴 세로 이미지에 적용)
- hover: 카드 살짝 떠오름 + 코발트 블루 그림자
- 칩 라벨 제거 상태 (이미지만 깔끔하게)

### 상세 페이지 비주얼
- `.vis + .big > .big_bx > img` — 단일 16:11 박스
- `.vis.land + .big_bx` — 긴 세로 비율 (구버전, 사용 안 함)
- `.vis.land_pair` — PC + Mobile 가로 페어 (work-6 사용)
- `.vis.land_tri` — PC + Tablet + Mobile 가로 트리플 (work-4 사용)

### AS-IS / TO-BE Pill 디자인 (`.dt_compare`)
회색 배경 박스(`#F2F3F5`) 안:
- 상단: "Project Goal" eyebrow + 굵은 검정 타이틀
- 그리드 3컬럼: AS-IS 흰 pill | 화살표 → | TO-BE 검정 pill
- 모바일에선 세로 1컬럼 + 화살표 ↓

---

## 8. 본인 손이 가지 않은 부분 / 한계

- **Figma MCP 시도 안 함** — 회사에서 사용해본 결과 안 좋다고 함. Dev Mode 결제도 비추.
- **AI(Claude)로 PDF 자동 이미지 추출 불가** — 워크스페이스 셸 죽어있음 (Windows VM Platform 비활성).
- **이미지 파일 직접 저장 불가** — Write 도구가 텍스트만 지원. 사용자가 직접 저장해야 함.

---

## 9. 새 세션에서 해야 할 가장 우선순위

1. CLAUDE.md + STATUS.md 둘 다 읽음
2. 사용자가 "어디서부터 이어가지" 물으면:
   - 이미지 저장 완료 여부 확인 (위 파일 구조 참조)
   - AS-IS/TO-BE Pill 적용 완료 여부 확인 (work-N.html 각각 `.dt_compare` 있는지)
   - GitHub push 성공 여부 확인
   - Vercel 배포 여부 확인
3. 가장 끝까지 안 된 단계부터 이어감

---

_Last updated: 2026.05.17_
_이 파일은 새 컴퓨터에서 새 세션 시작 시 컨텍스트 인계용입니다._
