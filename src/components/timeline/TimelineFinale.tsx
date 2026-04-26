"use client";

import type { Finale, Lang } from "@/content/timeline";
import { m, useReducedMotion } from "@/lib/motion";

type Props = {
  finale: Finale;
  lang: Lang;
};

export function TimelineFinale({ finale, lang }: Props) {
  const reduce = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
    whileInView: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="finale"
      aria-labelledby="finale-headline"
      className="relative flex min-h-[110svh] items-center justify-center overflow-hidden bg-[#0c1014] px-6 py-32 text-center"
    >
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={finale.hero.src}
          alt={finale.hero.alt[lang]}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-90"
        />
      </div>

      <div className="relative max-w-2xl text-[#f4efe6]">
        <m.div
          {...reveal(0)}
          className="text-[10px] uppercase tracking-[0.4em] opacity-60"
        >
          2025.12
        </m.div>
        <m.h2
          {...reveal(0.05)}
          id="finale-headline"
          className="mt-8 font-serif text-4xl leading-[1.1] tracking-tight md:text-6xl"
        >
          {finale.headline[lang]}
        </m.h2>
        <m.p
          {...reveal(0.15)}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed opacity-80 md:text-lg"
        >
          {finale.description[lang]}
        </m.p>
        <m.p
          {...reveal(0.3)}
          className="mx-auto mt-10 max-w-lg font-serif text-lg italic leading-relaxed opacity-90 md:text-xl"
        >
          {finale.body[lang]}
        </m.p>
        {finale.links?.length ? (
          <m.div
            {...reveal(0.45)}
            className="mt-16 flex justify-center gap-8"
          >
            {finale.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-current pb-1 text-xs uppercase tracking-[0.3em] opacity-70 transition-opacity hover:opacity-100"
              >
                {link.label[lang]}
              </a>
            ))}
          </m.div>
        ) : null}
      </div>
    </section>
  );
}
