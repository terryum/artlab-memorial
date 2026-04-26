import type { Lang } from "@/content/timeline";

export const UI = {
  ko: {
    scrollHint: "스크롤하여 시간을 따라가세요",
    openYear: "그 해 보기",
    closeModal: "닫기",
    backToTimeline: "타임라인으로 돌아가기",
    pressRelease: "보도자료",
    finalReleaseLabel: "마무리",
    yearRailLabel: "연도 인디케이터",
    wipBanner: "메모리얼 페이지 구축 중입니다 — 본문은 임시 더미 텍스트입니다",
  },
  en: {
    scrollHint: "Scroll to walk through time",
    openYear: "View this year",
    closeModal: "Close",
    backToTimeline: "Back to timeline",
    pressRelease: "Press release",
    finalReleaseLabel: "Finale",
    yearRailLabel: "Year indicator",
    wipBanner: "Memorial site under construction — body copy is placeholder",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function t(lang: Lang, key: keyof (typeof UI)["ko"]): string {
  return UI[lang][key];
}
