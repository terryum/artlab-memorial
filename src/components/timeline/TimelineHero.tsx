import type { Lang, Timeline } from "@/content/timeline";
import { t } from "@/lib/i18n";

type Props = {
  intro: Timeline["intro"];
  lang: Lang;
};

export function TimelineHero({ intro, lang }: Props) {
  return (
    <section
      aria-labelledby="memorial-title"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="text-[10px] uppercase tracking-[0.4em] text-muted">
        {intro.eyebrow[lang]}
      </div>
      <h1
        id="memorial-title"
        className="mt-10 font-serif text-5xl leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
      >
        {intro.title[lang]}
      </h1>
      <p className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        {intro.lede[lang]}
      </p>
      <div className="mt-16 font-serif text-base tracking-[0.2em] text-muted">
        {intro.range}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted"
      >
        <span>{t(lang, "scrollHint")}</span>
        <span className="h-10 w-px bg-rule" />
      </div>
    </section>
  );
}
