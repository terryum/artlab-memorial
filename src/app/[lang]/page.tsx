import { notFound } from "next/navigation";
import { TIMELINE } from "@/content/timeline";
import type { Lang } from "@/content/timeline";
import { TimelineHero } from "@/components/timeline/TimelineHero";
import { TimelineFinale } from "@/components/timeline/TimelineFinale";
import { TimelineRoot } from "@/components/timeline/TimelineRoot";
import { ConstructionBanner } from "@/components/timeline/ConstructionBanner";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export default async function TimelinePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  if (rawLang !== "ko" && rawLang !== "en") notFound();
  const lang = rawLang as Lang;

  return (
    <>
      <ConstructionBanner lang={lang} />
      <TimelineRoot
        timeline={TIMELINE}
        lang={lang}
        hero={<TimelineHero intro={TIMELINE.intro} lang={lang} />}
        finale={<TimelineFinale finale={TIMELINE.finale} lang={lang} />}
      />
    </>
  );
}
