import type { Metadata } from "next";
import { Noto_Serif_KR, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const display = Noto_Serif_KR({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

const SITE = {
  ko: {
    title: "ART Lab — 2019–2025",
    description:
      "여섯 해를 함께한 회사를 기억하기 위한 작은 아카이브. 스크롤로 시간을 거슬러 올라가다.",
  },
  en: {
    title: "ART Lab — 2019–2025",
    description:
      "A small archive in memory of six years. Scroll back through time, one year at a time.",
  },
} as const;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artlab-memorial.example.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const meta = SITE[lang as keyof typeof SITE] ?? SITE.ko;
  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        ko: `${SITE_URL}/ko`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: `${SITE_URL}/${lang}`,
      siteName: "ART Lab Memorial",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "ko" && lang !== "en") notFound();

  return (
    <html
      lang={lang}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
