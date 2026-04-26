import { ImageResponse } from "next/og";
import { TIMELINE } from "@/content/timeline";
import type { Lang } from "@/content/timeline";

export const dynamicParams = false;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return [{ id: "default" }];
}

export default async function OG({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Lang = rawLang === "en" ? "en" : "ko";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fafaf7",
          color: "#111110",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6c6c66",
          }}
        >
          {TIMELINE.intro.eyebrow[lang]}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#111110",
              maxWidth: 900,
            }}
          >
            {TIMELINE.intro.title[lang]}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#6c6c66",
              maxWidth: 900,
            }}
          >
            {TIMELINE.intro.range}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 16,
            color: "#6c6c66",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <span>artlab</span>
          <span style={{ color: "#b85c38" }}>—</span>
        </div>
      </div>
    ),
    size,
  );
}
