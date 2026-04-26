import type { Lang } from "@/content/timeline";
import { t } from "@/lib/i18n";

export function ConstructionBanner({ lang }: { lang: Lang }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-40 border-b border-rule bg-foreground/95 text-background backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-4 py-2 text-[11px] uppercase tracking-[0.2em]">
        <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        <span>{t(lang, "wipBanner")}</span>
      </div>
    </div>
  );
}
