# Zewin Group Portfolio

A modern, full-featured portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Hero** — Parallax scroll, counter animations, CV download
- **About** — Floating badge cards, smooth reveal animations
- **Projects** — Filter gallery (All / Web / Backend / AI) with detail modal
- **Skills** — Animated progress bars grouped by category
- **Blog** — 3 posts with full-content modal reader
- **Testimonials** — Auto-advancing carousel with dot navigation
- **Timeline** — Career history with hover interactions
- **Contact** — Form with sending state + social links
- **Dark / Light mode** — Smooth transitions, system preference detection
- **Responsive** — Mobile-first with bottom navigation
- **SEO** — Full metadata, OG tags, robots

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Build for production
npm run build
npm start
```

## Customizing

All content is in `app/lib/data.ts`:

- `defaultConfig` — brand name, tagline, colors, contact info
- `projects` — add/edit projects
- `skills` — add/edit skills with levels
- `timeline` — career history
- `blogPosts` — blog articles
- `testimonials` — client quotes

## Admin Panel

The admin panel (`portfolio-admin-v4.jsx`) is a separate React artifact that can be used to manage all content visually. Export the JSON and update `app/lib/data.ts` accordingly.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + CSS
- **Icons**: Lucide React
- **Theme**: next-themes

## Project Structure

```
app/
├── components/
│   ├── Navigation.tsx       — Sticky nav with mobile drawer
│   ├── HeroSection.tsx      — Hero with parallax + counters
│   ├── ProjectsSection.tsx  — Filter gallery + modal
│   ├── BlogSection.tsx      — Blog cards + reader modal
│   ├── Sections.tsx         — About, Skills, Timeline, Testimonials, Contact
│   ├── Reveal.tsx           — Scroll-triggered reveal animation
│   └── ThemeProvider.tsx    — Dark/light mode with smooth transitions
├── lib/
│   └── data.ts              — All content + types
├── globals.css              — Design tokens + base styles
├── layout.tsx               — Root layout + SEO metadata
└── page.tsx                 — Main page composition
```
