"use client";

import { useEffect, useState } from "react";
import type { Lang, Year } from "@/content/timeline";
import { t } from "@/lib/i18n";

type Props = {
  years: Year[];
  hasFinale?: boolean;
  lang: Lang;
};

type Active = Year | "finale" | null;

export function YearRail({ years, hasFinale = true, lang }: Props) {
  const [active, setActive] = useState<Active>(null);

  useEffect(() => {
    const targets = [
      ...years.map((y) => document.getElementById(`year-${y}`)),
      hasFinale ? document.getElementById("finale") : null,
    ].filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible[0]) return;
        const id = visible[0].target.id;
        if (id === "finale") setActive("finale");
        else if (id.startsWith("year-")) setActive(Number(id.slice(5)) as Year);
      },
      { threshold: [0.35, 0.6] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [years, hasFinale]);

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <nav
      aria-label={t(lang, "yearRailLabel")}
      className="pointer-events-none fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:block"
    >
      <ul className="pointer-events-auto flex flex-col items-end gap-3">
        {years.map((y) => {
          const current = active === y;
          return (
            <li key={y}>
              <button
                type="button"
                onClick={() => jumpTo(`year-${y}`)}
                aria-current={current ? "true" : undefined}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
              >
                <span
                  className={`transition-opacity ${
                    current ? "opacity-100 text-foreground" : "opacity-0 text-muted group-hover:opacity-100"
                  }`}
                >
                  {y}
                </span>
                <span
                  className={`block h-px transition-all ${
                    current
                      ? "w-8 bg-accent"
                      : "w-3 bg-foreground/40 group-hover:w-5 group-hover:bg-foreground"
                  }`}
                />
              </button>
            </li>
          );
        })}
        {hasFinale ? (
          <li>
            <button
              type="button"
              onClick={() => jumpTo("finale")}
              aria-current={active === "finale" ? "true" : undefined}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
            >
              <span
                className={`transition-opacity ${
                  active === "finale" ? "opacity-100 text-foreground" : "opacity-0 text-muted group-hover:opacity-100"
                }`}
              >
                {t(lang, "finalReleaseLabel")}
              </span>
              <span
                className={`block h-px transition-all ${
                  active === "finale"
                    ? "w-8 bg-accent"
                    : "w-3 bg-foreground/40 group-hover:w-5 group-hover:bg-foreground"
                }`}
              />
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
