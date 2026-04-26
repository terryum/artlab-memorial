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
  },
  en: {
    scrollHint: "Scroll to walk through time",
    openYear: "View this year",
    closeModal: "Close",
    backToTimeline: "Back to timeline",
    pressRelease: "Press release",
    finalReleaseLabel: "Finale",
    yearRailLabel: "Year indicator",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export function t(lang: Lang, key: keyof (typeof UI)["ko"]): string {
  return UI[lang][key];
}
