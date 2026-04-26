import type { Timeline } from "./types";

export const TIMELINE: Timeline = {
  intro: {
    eyebrow: { ko: "ART Lab", en: "ART Lab" },
    title: {
      ko: "여섯 해의 발자취",
      en: "Six Years, One Lab",
    },
    lede: {
      ko: "2019년 1월의 첫 줄부터 2025년 12월의 마지막 인사까지. 우리가 함께 지나온 시간을 한 번 더 천천히 걸어봅니다.",
      en: "From the first line of code in January 2019 to the last farewell in December 2025. Walk with us, slowly, one year at a time.",
    },
    range: "2019 — 2025",
  },
  years: [
    {
      year: 2019,
      hero: {
        kind: "image",
        src: "/images/timeline/2019/hero.svg",
        alt: { ko: "2019년의 시작", en: "The beginning, 2019" },
        aspect: "16/9",
      },
      headline: {
        ko: "첫 줄, 첫 사용자",
        en: "First Line, First User",
      },
      description: {
        ko: "작은 사무실, 두 대의 모니터. 시작은 단출했지만, 첫 사용자가 보내온 한 통의 메일이 모든 것을 바꿨다.",
        en: "A small office and two monitors. The beginning was modest, but a single email from our first user changed everything.",
      },
      accent: {
        ko: "“오늘 처음으로 누군가가 우리를 썼다.”",
        en: "“Today, for the first time, someone used us.”",
      },
      events: [
        {
          id: "founding",
          date: "2019-01",
          title: { ko: "법인 설립", en: "Company Founded" },
          summary: {
            ko: "공동창업자 셋이 작은 사무실에서 시작",
            en: "Three co-founders, one small office",
          },
          body: {
            ko: "강남의 작은 공유 오피스에서 시작했습니다. 책상은 셋, 의자는 둘. 기다리던 노트북이 도착하지 않아 첫 회의는 카페에서 했습니다.",
            en: "We began in a tiny shared office in Gangnam. Three desks, two chairs. The laptops hadn't arrived, so our first meeting happened at the café next door.",
          },
        },
        {
          id: "first-prototype",
          date: "2019-04",
          title: { ko: "첫 프로토타입", en: "First Prototype" },
          summary: {
            ko: "주말마다 굴린 4개월의 결과물",
            en: "Four months of weekend builds",
          },
          body: {
            ko: "주중에는 본업, 주말마다 모여 만들었던 첫 데모. 동작은 어설펐지만 \"이게 정말 가능하구나\"를 처음 본 순간이었습니다.",
            en: "Day jobs by week, demo by weekend. Rough around the edges, but the first moment we saw the idea move on its own.",
          },
        },
        {
          id: "first-user",
          date: "2019-09",
          title: { ko: "첫 외부 사용자", en: "First External User" },
          summary: {
            ko: "지인이 아닌 누군가, 처음으로",
            en: "Someone we didn't know, for the first time",
          },
        },
      ],
    },
    {
      year: 2020,
      hero: {
        kind: "image",
        src: "/images/timeline/2020/hero.svg",
        alt: { ko: "비대면의 해", en: "The remote year" },
        aspect: "16/9",
      },
      headline: { ko: "원격으로, 그러나 더 가까이", en: "Remote, but Closer" },
      description: {
        ko: "팬데믹은 우리를 흩어 놓았지만 동시에 묶었다. 매일 아침 9시의 스탠드업이 사무실보다 더 따뜻했다.",
        en: "The pandemic scattered us, and bound us. The 9 AM standup felt warmer than the office ever did.",
      },
      events: [
        {
          id: "fully-remote",
          date: "2020-03",
          title: { ko: "완전 원격 전환", en: "Fully Remote" },
          summary: {
            ko: "3월 16일, 사무실 문을 닫다",
            en: "March 16: we closed the office",
          },
        },
        {
          id: "seed-round",
          date: "2020-08",
          title: { ko: "시드 투자 유치", en: "Seed Round Closed" },
          summary: {
            ko: "줌 미팅 27번 끝의 텀시트",
            en: "27 Zoom meetings, one term sheet",
          },
        },
        {
          id: "team-grows",
          date: "2020-11",
          title: { ko: "팀 8명 합류", en: "Team Grows to 8" },
          summary: {
            ko: "한 번도 만난 적 없는 팀원들",
            en: "Teammates we'd never met in person",
          },
        },
      ],
    },
    {
      year: 2021,
      hero: {
        kind: "image",
        src: "/images/timeline/2021/hero.svg",
        alt: { ko: "공식 런칭", en: "Public launch" },
        aspect: "16/9",
      },
      headline: { ko: "세상에 내보내다", en: "Out Into the World" },
      description: {
        ko: "2년 동안 뒤에서 만들어온 것을 처음으로 공개했다. 첫 24시간, 1만 명이 다녀갔다.",
        en: "What we'd built quietly for two years finally went public. Ten thousand visitors in the first 24 hours.",
      },
      events: [
        {
          id: "public-launch",
          date: "2021-04",
          title: { ko: "정식 런칭", en: "Public Launch" },
          summary: {
            ko: "ProductHunt 1위, 그날 밤은 잠을 못 잤다",
            en: "#1 on ProductHunt; nobody slept that night",
          },
        },
        {
          id: "first-paying",
          date: "2021-07",
          title: { ko: "첫 유료 고객", en: "First Paying Customer" },
          summary: {
            ko: "결제 알림에 다 같이 환호",
            en: "We all cheered at the payment notification",
          },
        },
        {
          id: "office-reopens",
          date: "2021-10",
          title: { ko: "사무실 재오픈", en: "Office Reopens" },
          summary: {
            ko: "성수동, 통창, 화분 일곱 개",
            en: "Seongsu, big windows, seven plants",
          },
        },
      ],
    },
    {
      year: 2022,
      hero: {
        kind: "image",
        src: "/images/timeline/2022/hero.svg",
        alt: { ko: "성장의 해", en: "The growth year" },
        aspect: "16/9",
      },
      headline: { ko: "더 멀리, 더 빠르게", en: "Farther, Faster" },
      description: {
        ko: "월 매출 곡선이 처음으로 \"우리도 회사구나\" 라고 말해주던 해. 새 기능, 새 사람, 새 실수까지 함께 자랐다.",
        en: "The year the monthly revenue curve finally said: \"yes, this is a company.\" New features, new people, new mistakes — all growing together.",
      },
      events: [
        {
          id: "series-a",
          date: "2022-03",
          title: { ko: "시리즈 A", en: "Series A" },
          summary: {
            ko: "리드 투자자와의 두 번째 텀시트",
            en: "Second term sheet, this time the lead",
          },
        },
        {
          id: "team-25",
          date: "2022-06",
          title: { ko: "팀 25명", en: "25 People" },
          summary: {
            ko: "회식 자리가 한 식당에 안 들어가던 첫날",
            en: "First time we couldn't fit in a single restaurant",
          },
        },
        {
          id: "first-rebrand",
          date: "2022-10",
          title: { ko: "첫 리브랜딩", en: "First Rebrand" },
          summary: {
            ko: "로고와 톤을 한 번에 바꾼 봄과 가을",
            en: "Logo and voice, rewritten in spring and fall",
          },
        },
      ],
    },
    {
      year: 2023,
      hero: {
        kind: "image",
        src: "/images/timeline/2023/hero.svg",
        alt: { ko: "전환점", en: "The turning point" },
        aspect: "16/9",
      },
      headline: { ko: "더 깊은 질문들", en: "Deeper Questions" },
      description: {
        ko: "쉬워 보였던 결정들이 갑자기 어려워졌다. 무엇을 만들 것인가보다 왜 만들 것인가를 더 자주 물었다.",
        en: "Decisions that used to feel easy stopped feeling easy. We asked \"why\" more often than \"what.\"",
      },
      events: [
        {
          id: "ai-pivot",
          date: "2023-02",
          title: { ko: "AI 전환", en: "AI Pivot" },
          summary: {
            ko: "코어 엔진을 바닥부터 다시 썼다",
            en: "We rewrote the core engine from scratch",
          },
        },
        {
          id: "global-launch",
          date: "2023-08",
          title: { ko: "글로벌 출시", en: "Global Launch" },
          summary: {
            ko: "도쿄, 싱가포르, 샌프란시스코",
            en: "Tokyo, Singapore, San Francisco",
          },
        },
      ],
    },
    {
      year: 2024,
      hero: {
        kind: "image",
        src: "/images/timeline/2024/hero.svg",
        alt: { ko: "마무리의 시작", en: "The beginning of the end" },
        aspect: "16/9",
      },
      headline: { ko: "익숙해진다는 것", en: "Becoming Familiar" },
      description: {
        ko: "한 사이클이 한 호흡에 들어왔다. 전과 비슷한 일을 더 빠르게 했고, 새로운 일에는 더 신중해졌다.",
        en: "A full cycle now fit in a single breath. Old work moved faster; new work moved more carefully.",
      },
      events: [
        {
          id: "team-50",
          date: "2024-04",
          title: { ko: "팀 50명", en: "50 People" },
          summary: {
            ko: "첫 \"이름이 안 외워지는\" 입사 환영회",
            en: "The first onboarding where we couldn't remember everyone's name",
          },
        },
        {
          id: "preliminary-talks",
          date: "2024-11",
          title: { ko: "첫 인수 제안", en: "First Acquisition Talk" },
          summary: {
            ko: "조용한 점심 자리에서 시작된 대화",
            en: "A quiet lunch that started a long conversation",
          },
        },
      ],
    },
    {
      year: 2025,
      hero: {
        kind: "image",
        src: "/images/timeline/2025/hero.svg",
        alt: { ko: "마지막 해", en: "The last year" },
        aspect: "16/9",
      },
      headline: { ko: "마지막 한 해", en: "The Last Year" },
      description: {
        ko: "끝이 보였다. 끝을 향해 가는 동안에도 우리는 새 기능을 만들고, 새 사람을 뽑았다. 그게 우리다웠다.",
        en: "The end came into view. Even on the way there, we shipped features and hired people. That was who we were.",
      },
      accent: {
        ko: "“끝까지 우리답게.”",
        en: "“Ourselves, all the way to the end.”",
      },
      events: [
        {
          id: "due-diligence",
          date: "2025-04",
          title: { ko: "실사 시작", en: "Due Diligence Begins" },
          summary: {
            ko: "다섯 달의 자료 정리",
            en: "Five months of organizing everything",
          },
        },
        {
          id: "all-hands",
          date: "2025-09",
          title: { ko: "전체 미팅", en: "All-Hands" },
          summary: {
            ko: "공식적으로 팀에 알린 날",
            en: "The day we told the team",
          },
        },
        {
          id: "last-shipping",
          date: "2025-11",
          title: { ko: "마지막 릴리즈", en: "Final Release" },
          summary: {
            ko: "v6.0 — 끝까지 만들고 마쳤다",
            en: "v6.0 — built to the end",
          },
        },
      ],
    },
  ],
  finale: {
    hero: {
      kind: "image",
      src: "/images/timeline/finale/hero.svg",
      alt: { ko: "M&A 완료", en: "Acquisition complete" },
      aspect: "16/9",
    },
    headline: {
      ko: "2025.12 — 끝, 그리고 다음",
      en: "December 2025 — The End, and What Comes Next",
    },
    description: {
      ko: "ART Lab은 한 시기를 마치고 새로운 가족 안으로 들어갑니다.",
      en: "ART Lab closes one chapter and joins a new family.",
    },
    body: {
      ko: "함께해 주신 모든 분께. 우리가 만든 것은 결국 사람들이었습니다. 이 페이지는 그 사람들을 위한 것입니다.",
      en: "To everyone who walked with us: in the end, what we built was each other. This page is for them.",
    },
    links: [
      {
        label: { ko: "보도자료", en: "Press Release" },
        href: "#",
        kind: "press",
      },
    ],
  },
};
