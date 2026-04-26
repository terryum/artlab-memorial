"use client";

import { useCallback, useEffect, useState } from "react";
import type { Lang, Timeline, Year } from "@/content/timeline";
import { LazyMotion, domAnimation } from "@/lib/motion";
import { TimelineYearSection } from "./TimelineYearSection";
import { YearRail } from "./YearRail";
import { EventModal } from "./EventModal";

type Props = {
  timeline: Timeline;
  lang: Lang;
  hero: React.ReactNode;
  finale: React.ReactNode;
};

export function TimelineRoot({ timeline, lang, hero, finale }: Props) {
  const [openYear, setOpenYear] = useState<Year | null>(null);

  const handleOpen = useCallback((y: Year) => setOpenYear(y), []);
  const handleClose = useCallback(() => setOpenYear(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (openYear !== null) return;
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        const order: string[] = [
          ...timeline.years.map((y) => `year-${y.year}`),
          "finale",
        ];
        const current = findCurrent(order);
        const idx = current === -1 ? 0 : current;
        const next =
          e.key === "ArrowDown"
            ? Math.min(idx + 1, order.length - 1)
            : Math.max(idx - 1, 0);
        if (next !== idx) {
          e.preventDefault();
          document
            .getElementById(order[next]!)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (/^[1-7]$/.test(e.key)) {
        const yearIdx = Number(e.key) - 1;
        const target = timeline.years[yearIdx];
        if (target) {
          document
            .getElementById(`year-${target.year}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.key === "0") {
        document
          .getElementById("finale")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [timeline.years, openYear]);

  const openYearData = openYear
    ? timeline.years.find((y) => y.year === openYear) ?? null
    : null;

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative">
        {hero}
        {timeline.years.map((y, i) => (
          <TimelineYearSection
            key={y.year}
            year={y}
            lang={lang}
            priority={i === 0}
            onOpen={handleOpen}
          />
        ))}
        {finale}
      </main>
      <YearRail
        years={timeline.years.map((y) => y.year)}
        hasFinale
        lang={lang}
      />
      <EventModal year={openYearData} lang={lang} onClose={handleClose} />
    </LazyMotion>
  );
}

function findCurrent(ids: string[]): number {
  const viewportMid = window.innerHeight / 2;
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < ids.length; i++) {
    const el = document.getElementById(ids[i]!);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const dist = Math.abs(rect.top + rect.height / 2 - viewportMid);
    if (dist < bestDist) {
      bestDist = dist;
      bestIdx = i;
    }
  }
  return bestIdx;
}
