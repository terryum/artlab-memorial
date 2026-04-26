# ART Lab Memorial — 남은 작업

마지막 업데이트: 2026-04-27 (재시작 직전 핸드오프)

## 현재 상태 한눈에

| 영역 | 상태 |
|---|---|
| **로컬 git** | `main` 에 메모리얼 1차 구현 완성. GitHub `terryum/artlab-memorial` 에 push 완료 |
| **로컬 빌드** | `STATIC_EXPORT=true npm run build` → `out/` 정적 export 정상 작동 |
| **프로덕션 (artlab.ai / www.artlab.ai)** | **임시 placeholder**: "ART·Lab — 홈페이지 구축 중입니다" 한 페이지만 노출. 메모리얼 자산은 모두 S3에서 제거 |
| **CloudFront Function** | `artlab-uri-rewrite` 가 detach 된 상태로 존재 (재배포 시 다시 attach) |
| **인증서** | `artlab.ai` + `www.artlab.ai` 둘 다 cover (ACM us-east-1, ARN `d85d1887-…`) — 재배포 후에도 그대로 사용 |

---

## 다음 작업 우선순위

### 1. 콘텐츠 작성 (가장 큼)
파일: `src/content/timeline/data.ts` (단일 파일에 7년 + finale 모두)

각 연도(`years[]`)마다 채워야 할 것:
- `headline.{ko,en}` — 한 줄 (예: "첫 줄, 첫 사용자")
- `description.{ko,en}` — 2~4 줄
- `accent.{ko,en}` — 그 해 한 마디 (옵션, 인용)
- `events[]` — 그 해 모먼트 3~8개:
  - `id` — slug
  - `date` — `YYYY-MM` 또는 `YYYY-MM-DD`
  - `title.{ko,en}`, `summary.{ko,en}` (≤ 80자)
  - `body.{ko,en}` — 모달 확장 본문 (Markdown 허용)
  - `media[]` — 갤러리 (1~6장)
  - `links[]` — 블로그/repo/보도

`finale` 도 동일 구조. TypeScript 가 한/영 누락 / 타입 mismatch 를 컴파일 단계에서 잡아주니 빨갛게 표시되면 그 자리만 채우면 됨.

### 2. 사진 8장 교체
경로: `public/images/timeline/<year>/hero.svg` (현재 그라디언트 placeholder 8장)
→ 실제 사진(`hero.jpg` 또는 `hero.webp`, `1920×1080` 권장).
교체 후 `data.ts` 의 `hero.src` 를 `.svg` → `.jpg` 로 바꾸고 `kind` 는 그대로 `"image"`.

이벤트 모달 갤러리도 마찬가지: `events[].media[].src` 에 실제 사진 경로.

### 3. WIP 배너 토글
파일: `src/app/[lang]/page.tsx`
콘텐츠가 어느 정도 채워지면 `<ConstructionBanner lang={lang} />` 한 줄 제거. 아예 컴포넌트 파일도 지워도 됨 (`src/components/timeline/ConstructionBanner.tsx`).

### 4. OG 이미지 (재배포 전)
정적 export 모드에서 Next 16 의 dynamic `opengraph-image.tsx` 가 `[__metadata_id__]` 처리에 까다로워 일단 빠진 상태. 해결 옵션 두 가지:

- **간단**: `public/og-image.png` 한 장 (1200×630) 만들어 두고 `src/app/[lang]/layout.tsx` 의 `generateMetadata` 에서 `openGraph.images: [{ url: '/og-image.png', width: 1200, height: 630 }]` 로 연결.
- **완성도**: 빌드 시 sharp 로 SVG → PNG 변환 스크립트(`scripts/generate-og.mjs`) 만들기.

### 5. 최종 QA (재배포 직전)
- 로컬 `npm run dev` (포트 3000~) — 데스크탑·모바일 화면, 스크롤 페이드/스케일, 모달, 키보드 (`ArrowUp/Down`, `1~7`, `Esc`)
- `prefers-reduced-motion` 활성화 시 transform 비활성 / opacity 만 남는지
- 한/영 토글 (현재 UI 토글 없음 — `/ko/` ↔ `/en/` 직접 URL)
- Lighthouse mobile 4G — Performance ≥ 90, Accessibility ≥ 95 목표

---

## 재배포 절차 (재시작 후 그대로 따라하면 됨)

```bash
cd ~/Codes/cosmax/artlab-memorial

# 1. 정적 export 빌드
rm -rf .next out
STATIC_EXPORT=true npx next build --webpack

# 2. S3 sync (기존 placeholder index.html / robots.txt 덮어쓰기)
AWS_PROFILE=terry aws s3 sync out/ s3://artlab.ai/ --delete

# 3. CloudFront Function 재 attach (현재 detach 상태)
#    A) AWS 콘솔 CloudFront → EQ6MMBX6GBOSO → Behaviors → Default → Edit
#       Function associations: viewer request = artlab-uri-rewrite (LIVE)
#    또는 B) CLI 로 update-distribution (로컬에 /tmp 가 없으니 새로 빌드해야 함)

# 4. CloudFront 캐시 무효화
AWS_PROFILE=terry aws cloudfront create-invalidation \
  --distribution-id EQ6MMBX6GBOSO --paths '/*'

# 5. 검증
curl -sI https://artlab.ai/ | head -5
curl -sI https://www.artlab.ai/ko/ | head -5
```

---

## 인프라 cheat-sheet

| 항목 | 값 |
|---|---|
| **AWS account** | `270500201376` (terry user, `AWS_PROFILE=terry`) |
| **AWS region (정적 자산)** | `ap-northeast-2` |
| **AWS region (ACM/CloudFront)** | `us-east-1` |
| **S3 bucket** | `s3://artlab.ai/` (versioning ON) |
| **CloudFront distribution** | `EQ6MMBX6GBOSO` (alias `artlab.ai` + `www.artlab.ai`) |
| **CloudFront Function** | `artlab-uri-rewrite` (LIVE, 현재 detached) |
| **ACM 인증서** | `arn:aws:acm:us-east-1:270500201376:certificate/d85d1887-f67b-428a-a2eb-a34747ebbe1f` |
| **Route 53 zone** | `Z07611161NLIKIJDJFLST` (artlab.ai) |
| **GitHub** | https://github.com/terryum/artlab-memorial |
| **로컬 경로** | `~/Codes/cosmax/artlab-memorial` |

## CloudFront Function 코드 (재 attach 시 참고)
파일: `viewer-request` 단계에 attach.

```js
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var hasExt = uri.lastIndexOf('.') > uri.lastIndexOf('/');
    if (uri === '/') {
        request.uri = '/ko/index.html';
    } else if (uri === '/ko' || uri === '/en') {
        request.uri = uri + '/index.html';
    } else if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else if (uri === '/sitemap.xml' || uri === '/robots.txt') {
        // pass through
    } else if (!hasExt && (uri.startsWith('/ko/') || uri.startsWith('/en/'))) {
        request.uri = uri + '/index.html';
    }
    return request;
}
```

---

## 빌드/배포 시 주의사항 (지난 세션에서 디버깅한 것들)

1. **반드시 `--webpack`** — Next 16 기본 Turbopack 산출물은 OpenNext 호환이 깨진다. `next build --webpack` 사용. (정적 export 모드도 동일하게 적용)
2. **`proxy.ts` 사용 금지** — Next 16 에서 middleware 가 proxy.ts 로 바뀌고 Node 런타임 강제. 정적 export 와도 비호환. `/` redirect 는 `next.config.ts` 의 `redirects()` 또는 본 프로젝트처럼 CloudFront Function 으로.
3. **빌드 무작위 ENOENT 시** — `pgrep -fl "next|opennext|wrangler"` → `pkill -f ...` 후 `.next` 삭제 재시도. 절대 그냥 재시도 X.
4. **동시 배포 금지** — 같은 distribution 에 두 deploy 가 겹치면 마지막 것이 이기고 직전 것이 사라짐. 진행 중인 invalidation/배포가 끝났는지 항상 확인.

---

## 재배포 후 정리

- CloudFront Function 다시 attach 했는지 확인
- `robots.txt` 를 `Disallow: /` (현재) → 정상 (`Allow: /` + sitemap) 로 다시 교체
- `sitemap.xml` 다시 업로드 (현재 삭제 상태)
- WIP 배너 (`ConstructionBanner`) 제거 또는 토글
- 풀어줄 도메인이 있으면 PR / 보도자료 링크 finale 에 채우기

---

## 인벤토리: 정리 완료된 dead-code (참고)
이전 세션에서 사용자 승인 후 삭제됨 (S3 versioning ON, 30일 내 복구 가능):

- `/old_index.html`, `/manifold`, `/skinlog`, `/asrd.png`, `/stock_notice.png`
- `/artlab_index_files/`, `/artlab_manifold_files/`, `/artlab_skinlog_files/`, `/culture/`

총 ~14 MB. 현재 bucket 은 placeholder 두 파일만 (1.3 KB).
