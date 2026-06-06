// ── Types ─────────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "web" | "mobile" | "backend" | "ai" | "design";
  color: string;
  year: number;
  featured: boolean;
  icon: string;
  metrics?: { value: string; label: string }[];
  tech: string[];
  github?: string;
  live?: string;
  order: number;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools" | "design";
  icon: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "project" | "education";
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: number;
  cover: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  icon: string;
  color: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    logo: string | null;
    accentColor: string;
    secondColor: string;
  };
  profile: {
    fullName: string;
    bio: string;
    email: string;
    phone: string;
    location: string;
    available: boolean;
    avatar: string | null;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    website: string;
  };
}

// ── Site Config ───────────────────────────────────────────────────────────────
export const defaultConfig: SiteConfig = {
  brand: {
    name: "Zewin Group",
    tagline: "Full-Stack Developer & Tech Solutions",
    logo: null,
    accentColor: "#4f8ef7",
    secondColor: "#a78bfa",
  },
  profile: {
    fullName: "Zana",
    bio: "I'm Zana, founder of Zewin Group — a technology solutions company based in Kurdistan. We build modern web applications, pharmacy management systems, AI-powered tools, and enterprise software that actually makes a difference. From complex multi-branch platforms to sleek user-facing products, our focus is always on quality, speed, and reliability.",
    email: "zanaaabdulla021@gmail.com",
    phone: "",
    location: "Sulaymaniyah, Kurdistan Region",
    available: true,
    avatar: null,
  },
  seo: {
    title: "Zewin Group — Full-Stack Development & Tech Solutions",
    description: "Zewin Group builds modern web applications, pharmacy management systems, AI-powered tools, and enterprise software in the Kurdistan Region and beyond.",
    keywords: "Zewin Group, full-stack developer, React, Next.js, Kurdistan, pharmacy software, AI tools, web development",
  },
  social: {
    github: "https://github.com/zanaaabdulla021-tech",
    linkedin: "",
    twitter: "",
    email: "mailto:zanaaabdulla021@gmail.com",
    website: "https://zewin.dev",
  },
};

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "pharmtrack",
    title: "PharmTrack",
    description: "Multi-branch pharmacy management platform with real-time analytics and prescription tracking.",
    longDescription: "PharmTrack is a comprehensive pharmacy management platform built for the Kurdistan Region. It covers doctor referrals, prescription management, inventory control, sales tracking, staff scheduling, and cross-branch analytics across 12 active branches. Deeply integrated with Odoo via XML-RPC for enterprise compatibility.",
    tags: ["React", "TypeScript", "Odoo", "Firebase"],
    category: "web",
    color: "#3B82F6",
    year: 2024,
    featured: true,
    icon: "🏥",
    metrics: [
      { value: "12+", label: "Branches" },
      { value: "500+", label: "Rx/day" },
      { value: "99.9%", label: "Uptime" },
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Odoo XML-RPC", "Chart.js", "Firebase"],
    github: "https://github.com/zanaaabdulla021-tech",
    live: "",
    order: 0,
  },
  {
    id: "zewin-website",
    title: "Zewin Group Website",
    description: "Official company website for Zewin Group — fast, modern, and built to impress.",
    longDescription: "The official website for Zewin Group, designed to showcase our services, portfolio, and team. Built with Next.js and Tailwind CSS for maximum performance. Features smooth animations, a contact system, project showcase, and a fully responsive design optimized for all devices.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    category: "web",
    color: "#8B5CF6",
    year: 2025,
    featured: true,
    icon: "🌐",
    metrics: [
      { value: "98", label: "Lighthouse" },
      { value: "<1s", label: "Load time" },
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/zanaaabdulla021-tech",
    live: "https://zewin.dev",
    order: 1,
  },
  {
    id: "prescription-ocr",
    title: "Prescription OCR",
    description: "AI-powered prescription scanning — reads handwritten prescriptions with 94% accuracy.",
    longDescription: "An AI pipeline built for PharmTrack that reads handwritten and printed prescriptions using Claude's vision API. Extracts drug names, dosages, and doctor information, then auto-fills PharmTrack forms — cutting manual entry time from 3 minutes to under 30 seconds.",
    tags: ["AI", "Python", "Claude API", "FastAPI"],
    category: "ai",
    color: "#F59E0B",
    year: 2025,
    featured: true,
    icon: "🤖",
    metrics: [
      { value: "94%", label: "Accuracy" },
      { value: "1.2s", label: "Parse time" },
      { value: "30s", label: "Entry time" },
    ],
    tech: ["Python", "Claude API", "FastAPI", "React", "TypeScript"],
    github: "https://github.com/zanaaabdulla021-tech",
    order: 2,
  },
  {
    id: "inventory-dashboard",
    title: "Inventory Dashboard",
    description: "Real-time multi-warehouse stock control with live sync and automated alerts.",
    longDescription: "A real-time inventory management dashboard for multi-warehouse operations. Features live stock levels, automated low-stock alerts, transfer management between locations, and detailed audit logs. Fully integrated with Odoo's inventory module via JSON-RPC.",
    tags: ["Next.js", "WebSocket", "Odoo", "PostgreSQL"],
    category: "backend",
    color: "#10B981",
    year: 2024,
    featured: false,
    icon: "📦",
    metrics: [
      { value: "8", label: "Warehouses" },
      { value: "2k+", label: "SKUs tracked" },
    ],
    tech: ["Next.js", "Prisma", "PostgreSQL", "Socket.io", "Odoo JSON-RPC"],
    github: "https://github.com/zanaaabdulla021-tech",
    order: 3,
  },
  {
    id: "staff-scheduler",
    title: "Staff Scheduler",
    description: "Smart shift scheduling for pharmacy staff with conflict detection and reminders.",
    longDescription: "An intelligent shift scheduler for pharmacy staff across multiple branches. Detects scheduling conflicts, enforces legal minimum rest periods, supports drag-and-drop weekly planning, and sends automated SMS/email reminders to staff.",
    tags: ["React", "TypeScript", "Firebase", "FullCalendar"],
    category: "web",
    color: "#EC4899",
    year: 2024,
    featured: false,
    icon: "📅",
    metrics: [
      { value: "60+", label: "Staff managed" },
      { value: "12", label: "Branches" },
    ],
    tech: ["React", "TypeScript", "FullCalendar", "Firebase", "Tailwind CSS"],
    github: "https://github.com/zanaaabdulla021-tech",
    order: 4,
  },
  {
    id: "analytics-engine",
    title: "Analytics Engine",
    description: "Sales aggregation and revenue forecasting backend with ML-powered restocking.",
    longDescription: "A custom analytics backend that aggregates sales data from multiple pharmacy branches, generates revenue forecasts using ML models, and predicts restocking needs based on historical trends. Feeds data into an interactive Recharts dashboard.",
    tags: ["Python", "ML", "FastAPI", "Recharts"],
    category: "backend",
    color: "#14B8A6",
    year: 2025,
    featured: false,
    icon: "📊",
    metrics: [
      { value: "89%", label: "Forecast accuracy" },
      { value: "50k+", label: "Data pts/day" },
    ],
    tech: ["Python", "scikit-learn", "FastAPI", "PostgreSQL", "Recharts"],
    github: "https://github.com/zanaaabdulla021-tech",
    order: 5,
  },
];

// ── Skills ────────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  { name: "React",       level: 95, category: "frontend", icon: "⚛️" },
  { name: "TypeScript",  level: 90, category: "frontend", icon: "🔷" },
  { name: "Next.js",     level: 88, category: "frontend", icon: "▲"  },
  { name: "Tailwind CSS",level: 95, category: "frontend", icon: "💨" },
  { name: "Python",      level: 85, category: "backend",  icon: "🐍" },
  { name: "FastAPI",     level: 80, category: "backend",  icon: "⚡" },
  { name: "PostgreSQL",  level: 78, category: "backend",  icon: "🐘" },
  { name: "Node.js",     level: 75, category: "backend",  icon: "🟢" },
  { name: "Odoo",        level: 88, category: "tools",    icon: "🏢" },
  { name: "Docker",      level: 70, category: "tools",    icon: "🐳" },
  { name: "Firebase",    level: 82, category: "tools",    icon: "🔥" },
  { name: "Git",         level: 92, category: "tools",    icon: "🌿" },
  { name: "Figma",       level: 75, category: "design",   icon: "🎨" },
  { name: "UI Design",   level: 78, category: "design",   icon: "✏️" },
];

// ── Timeline ──────────────────────────────────────────────────────────────────
export const timeline: TimelineItem[] = [
  {
    year: "2025",
    title: "Founder & Lead Developer",
    company: "Zewin Group — Sulaymaniyah",
    description: "Founded Zewin Group to deliver world-class software solutions from the Kurdistan Region. Leading development across pharmacy systems, AI tools, and enterprise web applications.",
    type: "work",
  },
  {
    year: "2024",
    title: "PharmTrack v1.0 Launch",
    company: "Internal — Zewin Group",
    description: "Shipped PharmTrack across 12 branches, covering prescriptions, inventory, sales analytics, staff scheduling, and multi-branch reporting. Now handling 500+ prescriptions daily.",
    type: "project",
  },
  {
    year: "2023",
    title: "Senior Full-Stack Developer",
    company: "Freelance — Kurdistan Region",
    description: "Delivered dashboards, internal tooling, and web platforms for businesses across Erbil and Sulaymaniyah. Focused on React, TypeScript, and Odoo integrations.",
    type: "work",
  },
  {
    year: "2022",
    title: "Frontend Developer",
    company: "Tech Startup — Erbil",
    description: "Built React applications and design systems. Introduced TypeScript and component-driven architecture to the team, significantly improving code quality and developer experience.",
    type: "work",
  },
  {
    year: "2021",
    title: "Computer Science — BSc",
    company: "University of Sulaymaniyah",
    description: "Graduated with a focus on software engineering and distributed systems. Final project: a distributed inventory management prototype using microservices.",
    type: "education",
  },
];

// ── Blog Posts ────────────────────────────────────────────────────────────────
export const blogPosts: BlogPost[] = [
  {
    id: "building-pharmtrack",
    title: "Building PharmTrack: From Zero to 12 Branches",
    excerpt: "How Zewin Group designed and shipped a production pharmacy management platform that now handles 500+ prescriptions daily across 12 branches.",
    content: `## The Beginning\n\nPharmTrack started with a simple request from a pharmacy group in Sulaymaniyah: "Can you build us something better than what we have?" Two years later, it runs across 12 branches and processes over 500 prescriptions daily.\n\n## The Stack\n\nReact and TypeScript on the frontend for strict type safety across complex medical data. Odoo on the backend — the client had years of data there and couldn't migrate. That meant mastering Odoo's XML-RPC API, which turned out to be the most challenging part of the project.\n\n## Lessons Learned\n\nBuild for real users, not imagined ones. We rebuilt the prescription form three times based on actual pharmacist feedback. Every version was faster and simpler than the last.\n\n## What's Next\n\nPharmTrack v2 will include mobile apps for branch managers and a predictive restocking system powered by our Analytics Engine.`,
    tags: ["React", "Odoo", "Case Study"],
    date: "2025-03-15",
    readTime: 8,
    cover: "🏥",
  },
  {
    id: "ai-prescription-ocr",
    title: "Reading Handwritten Prescriptions with Claude API",
    excerpt: "How we built an AI pipeline at Zewin Group that reads handwritten prescriptions with 94% accuracy — cutting entry time from 3 minutes to 30 seconds.",
    content: `## The Problem\n\nPharmacists were spending 2-3 minutes manually entering each prescription. With 500+ daily, that's significant time lost. We decided to fix it.\n\n## The Solution\n\nClaude's vision API was the right tool — it handles handwriting remarkably well. The key insight was structuring the prompt to return strict JSON, making it trivial to auto-fill PharmTrack's form fields.\n\n## Getting to 94%\n\nReaching 94% accuracy required a two-pass approach: extract first, then validate drug names against a known formulary database. Unknown drugs get flagged for manual review rather than silently inserted.\n\n## Results\n\nEntry time dropped from 2-3 minutes to under 30 seconds. Pharmacists love it.`,
    tags: ["AI", "Claude API", "Python"],
    date: "2025-01-28",
    readTime: 6,
    cover: "🤖",
  },
  {
    id: "zewin-group-vision",
    title: "Why We Started Zewin Group",
    excerpt: "The Kurdistan Region deserves world-class software built by people who understand it. That's why we started Zewin Group.",
    content: `## The Gap\n\nThe Kurdistan Region has serious tech talent. What it lacks is a software company that combines that talent with world-class engineering practices and a genuine understanding of local business needs.\n\n## Our Approach\n\nWe don't build generic software. Every product we ship is designed specifically for the context it will be used in — whether that's a pharmacy in Sulaymaniyah or an enterprise in Erbil.\n\n## The Vision\n\nZewin Group aims to be the leading technology solutions company in the Kurdistan Region. Not just in terms of scale, but in terms of quality and impact.\n\n## What We Build\n\nPharmacy systems, enterprise dashboards, AI tools, and custom web platforms. If it needs to be fast, reliable, and beautiful — that's our work.`,
    tags: ["Company", "Kurdistan", "Vision"],
    date: "2024-11-10",
    readTime: 5,
    cover: "🌟",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Dr. Karwan Ali",
    role: "Medical Director, Sulaymaniyah Pharmacy Group",
    text: "PharmTrack completely transformed how we manage prescriptions across all our branches. The real-time analytics alone saved us hours every week. Zewin Group delivered far beyond our expectations.",
    icon: "👨‍⚕️",
    color: "#3B82F6",
  },
  {
    name: "Sara Ahmed",
    role: "Operations Manager, HealthCo Erbil",
    text: "Working with Zewin Group was a seamless experience from start to finish. The inventory dashboard is clean, fast, and exactly what our operations needed. Would hire again without hesitation.",
    icon: "👩‍💼",
    color: "#10B981",
  },
  {
    name: "Omed Hassan",
    role: "CEO, TechStart Kurdistan",
    text: "Zana and the Zewin Group team have an exceptional eye for both engineering and design. Outstanding code quality delivered in record time. They're the best technical partner we've worked with.",
    icon: "👨‍💻",
    color: "#8B5CF6",
  },
];
