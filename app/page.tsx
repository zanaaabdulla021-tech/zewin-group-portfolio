import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection, SkillsSection, TimelineSection, TestimonialsSection, ContactSection } from "./components/Sections";
import { ProjectsSection } from "./components/ProjectsSection";
import { BlogSection } from "./components/BlogSection";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CursorGlow, TechMarquee, SectionDivider } from "./components/HomeEffects";

export default function Home() {
  return (
    <main className="grain">
      <CursorGlow />
      <Navigation />

      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>

      {/* Tech marquee after hero */}
      <TechMarquee />

      <ErrorBoundary>
        <AboutSection />
      </ErrorBoundary>

      <SectionDivider />

      <ErrorBoundary>
        <ProjectsSection />
      </ErrorBoundary>

      <SectionDivider flip />

      <ErrorBoundary>
        <SkillsSection />
      </ErrorBoundary>

      <SectionDivider />

      <ErrorBoundary>
        <BlogSection />
      </ErrorBoundary>

      <ErrorBoundary>
        <TestimonialsSection />
      </ErrorBoundary>

      <SectionDivider flip />

      <ErrorBoundary>
        <TimelineSection />
      </ErrorBoundary>

      <SectionDivider />

      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>

      <footer className="py-7 px-6 border-t border-[hsl(var(--border))]">
        <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-3 text-[13px] text-[hsl(var(--muted-fg))]">
          <span className="font-mono font-bold gradient-text">Zewin Group</span>
          <span>Built with Next.js · Tailwind CSS · Framer Motion</span>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Zewin</span>
            <a href="/admin" style={{ fontSize: 12, opacity: .4, color: "inherit", textDecoration: "none" }} className="hover:opacity-70 transition-opacity">
              Admin
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
