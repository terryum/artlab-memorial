import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://artlab-memorial.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (["ko", "en"] as const).map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified,
    changeFrequency: "yearly",
    priority: 1,
    alternates: {
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
      },
    },
  }));
}
