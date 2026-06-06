// @ts-nocheck
// ── Translations ──────────────────────────────────────────────────────────────
export const translations = {
  en: {
    nav: {
      about:    "About",
      projects: "Projects",
      skills:   "Skills",
      blog:     "Blog",
      timeline: "Timeline",
      contact:  "Contact",
      hire:     "Hire me",
    },
    hero: {
      available: "Available for new projects",
      title1:    "Full-Stack",
      title2:    "Developer",
      subtitle:  "I build fast, beautiful software — pharmacy systems, AI tools, and polished web applications. Based in Kurdistan, working globally.",
      cta1:      "View my work",
      cta2:      "Download CV",
      stat1:     "Years exp.",
      stat2:     "Projects",
      stat3:     "Branches",
      stat4:     "Uptime",
    },
    about: {
      label:   "About me",
      title:   "Building software that actually matters",
      bio1:    "I'm Zana, a full-stack developer from Kurdistan — building under the KurdCod brand. I specialise in robust, high-performance web apps and developer tooling.",
      bio2:    "My flagship project is PharmTrack — a pharmacy management platform running across 12 branches, handling 500+ prescriptions daily.",
      bio3:    "I love the intersection of clean code and clean design. Every project needs to be fast, maintainable, and genuinely pleasant to use.",
    },
    projects: {
      label:   "Projects",
      title1:  "Things I've",
      title2:  "built",
      all:     "All",
    },
    skills: {
      label:   "Skills",
      title1:  "My",
      title2:  "toolkit",
      also:    "Also worked with",
    },
    blog: {
      label:   "Blog",
      title1:  "What I've",
      title2:  "written",
      read:    "Read more",
    },
    timeline: {
      label:   "Timeline",
      title1:  "My",
      title2:  "journey",
    },
    contact: {
      label:    "Contact",
      title1:   "Let's",
      title2:   "work together",
      subtitle: "Open to freelance projects, full-time roles, and interesting collaborations.",
      available: "Available for work",
      response:  "Response:",
      name:      "Your name",
      email:     "Email address",
      message:   "Message",
      send:      "Send message",
      sending:   "Sending...",
      sent:      "Message sent!",
      sentSub:   "I'll get back to you within 24 hours.",
      another:   "Send another",
    },
  },

  ku: {
    nav: {
      about:    "دەربارە",
      projects: "پرۆژەکان",
      skills:   "شارەزاییەکان",
      blog:     "بلۆگ",
      timeline: "مێژوو",
      contact:  "پەیوەندی",
      hire:     "کرێکارم بکە",
    },
    hero: {
      available: "ئامادەم بۆ پرۆژەی نوێ",
      title1:    "فوڵ-ستاک",
      title2:    "دیڤەلۆپەر",
      subtitle:  "نەرمەکاڵای خێرا و جوان دروست دەکەم — سیستەمی دەرمانخانە، ئامرازی AI، و بەرنامەی وێب. لە کوردستان، کار دەکەم لە جیهانەوە.",
      cta1:      "پرۆژەکانم ببینە",
      cta2:      "CV دابەزێنە",
      stat1:     "ساڵی ئەزموون",
      stat2:     "پرۆژە",
      stat3:     "لق",
      stat4:     "خاوەنی",
    },
    about: {
      label:   "دەربارەم",
      title:   "نەرمەکاڵا دروست دەکەم کە واقیعی گرنگە",
      bio1:    "من زانام، دیڤەلۆپەری فوڵ-ستاک لە هەرێمی کوردستان — لە ژێر براندی KurdCod کار دەکەم.",
      bio2:    "پرۆژەی سەرەکیم PharmTrack ـە — پلاتفۆرمی بەڕێوەبردنی دەرمانخانە کە لە سەر ١٢ لق کار دەکات.",
      bio3:    "کۆدی پاک و دیزاینی پاک خۆشم دەوێت. هەر پرۆژەیەک دەبێت خێرا، دانانپێکی و دڵخۆش بێت.",
    },
    projects: {
      label:   "پرۆژەکان",
      title1:  "شتانەی",
      title2:  "دروستم کردووە",
      all:     "هەموو",
    },
    skills: {
      label:   "شارەزاییەکان",
      title1:  "ئامرازەکانم",
      title2:  "",
      also:    "هەروەها کارم کردووە لەگەڵ",
    },
    blog: {
      label:   "بلۆگ",
      title1:  "نووسینەکانم",
      title2:  "",
      read:    "زیاتر بخوێنەوە",
    },
    timeline: {
      label:   "مێژوو",
      title1:  "ڕێگای",
      title2:  "من",
    },
    contact: {
      label:    "پەیوەندی",
      title1:   "با",
      title2:   "کار بکەین پێکەوە",
      subtitle: "ئامادەم بۆ پرۆژەی فریلانس، کاری تەواو کات، و هاوکاری.",
      available: "ئامادەی کارم",
      response:  "وەڵام:",
      name:      "ناوت",
      email:     "ئیمەیڵ",
      message:   "پەیام",
      send:      "بنێرە",
      sending:   "دەنێردرێت...",
      sent:      "پەیامەکەت نێردرا!",
      sentSub:   "لە ماوەی ٢٤ کاتژمێردا وەڵامت دەدەمەوە.",
      another:   "پەیامی دیکە بنێرە",
    },
  },
} as const;

export type Lang = keyof typeof translations;
export type T = typeof translations["en"];

export function useTranslation(lang: Lang = "en") {
  return (translations[lang] ?? translations["en"]) as typeof translations["en"];
}
