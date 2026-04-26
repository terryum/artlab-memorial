import { TIMELINE } from "./data";
import type { Lang, TimelineYear, Year } from "./types";

export { TIMELINE };
export * from "./types";

export function getYear(year: Year): TimelineYear | undefined {
  return TIMELINE.years.find((y) => y.year === year);
}

export function pick<T>(value: Record<Lang, T>, lang: Lang): T {
  return value[lang];
}
