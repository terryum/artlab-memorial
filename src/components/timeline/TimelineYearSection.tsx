"use client";

import { useRef } from "react";
import type { Lang, TimelineYear } from "@/content/timeline";
import { t } from "@/lib/i18n";
import { m, useScroll, useTransform, useReducedMotion } from "@/lib/motion";

type Props = {
  year: TimelineYear;
  lang: Lang;
  priority?: boolean;
  onOpen: (year: TimelineYear["year"]) => void;
};

export function TimelineYearSection({ year, lang, priority, onOpen }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const heroOpacity = useTransform(
    scrollYProgress,
    reduce ? [0, 1] : [0, 0.25, 0.7, 1],
    reduce ? [1, 1] : [0.45, 1, 1, 0.55],
  );
  const heroScale = useTransform(
    scrollYProgress,
    reduce ? [0, 1] : [0, 0.3, 1],
    reduce ? [1, 1] : [1.04, 1.0, 1.02],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    reduce ? [0, 1] : [0.1, 0.35, 0.7, 0.95],
    reduce ? [1, 1] : [0, 1, 1, 0.6],
  );
  const copyY = useTransform(
    scrollYProgress,
    reduce ? [0, 1] : [0.1, 0.35],
    reduce ? [0, 0] : [16, 0],
  );

  return (
    <section
      ref={ref}
      id={`year-${year.year}`}
      data-year={year.year}
      aria-labelledby={`year-${year.year}-headline`}
      className="relative flex min-h-[100svh] items-end overflow-hidden px-6 py-24 md:px-16"
    >
      <m.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={year.hero.src}
          alt={year.hero.alt[lang]}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
      </m.div>

      <m.div
        style={{ opacity: copyOpacity, y: copyY }}
        className="relative max-w-3xl will-change-transform"
      >
        <div className="font-serif text-7xl leading-none tracking-tight md:text-9xl">
          <span className="text-foreground">{year.year}</span>
        </div>
        <h2
          id={`year-${year.year}-headline`}
          className="mt-6 font-serif text-3xl leading-tight tracking-tight md:text-5xl"
        >
          {year.headline[lang]}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {year.description[lang]}
        </p>
        {year.accent ? (
          <p className="mt-8 max-w-xl font-serif text-lg italic text-foreground/80 md:text-xl">
            {year.accent[lang]}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => onOpen(year.year)}
          className="group mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:text-accent"
        >
          <span className="border-b border-current pb-1 transition-[border-width] group-hover:border-b-2">
            {t(lang, "openYear")}
          </span>
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </m.div>
    </section>
  );
}
