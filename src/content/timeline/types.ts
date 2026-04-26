export type Lang = "ko" | "en";
export type Localized<T> = Record<Lang, T>;

export type Media =
  | {
      kind: "image";
      src: string;
      alt: Localized<string>;
      aspect?: "16/9" | "4/5" | "1/1" | "3/2";
    }
  | {
      kind: "video";
      src: string;
      poster?: string;
      alt: Localized<string>;
    };

export type LinkRef = {
  label: Localized<string>;
  href: string;
  kind?: "blog" | "repo" | "video" | "press" | "doc";
};

export type TimelineEvent = {
  id: string;
  date: string;
  title: Localized<string>;
  summary: Localized<string>;
  body?: Localized<string>;
  media?: Media[];
  links?: LinkRef[];
};

export type Year = 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025;

export type TimelineYear = {
  year: Year;
  hero: Media;
  headline: Localized<string>;
  description: Localized<string>;
  accent?: Localized<string>;
  events: TimelineEvent[];
};

export type Finale = {
  hero: Media;
  headline: Localized<string>;
  description: Localized<string>;
  body: Localized<string>;
  links?: LinkRef[];
};

export type Timeline = {
  intro: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    lede: Localized<string>;
    range: string;
  };
  years: TimelineYear[];
  finale: Finale;
};
