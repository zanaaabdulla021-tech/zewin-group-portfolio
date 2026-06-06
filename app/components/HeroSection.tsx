"use client";
// @ts-nocheck

import { AnimatedNumber, FloatingBadge } from "./HomeEffects";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

function useCounter(target: string, active: boolean, duration = 1800) {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!active) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setVal(target); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(target.replace(/[0-9.]+/, String(Math.floor(ease * num))));
      if (prog < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val || target;
}

function StatCounter({ value, label, active }: { value: string; label: string; active: boolean }) {
  return (
    <div className="text-center">
      <div className="font-display text-[1.75rem] leading-none text-foreground">
        <AnimatedNumber value={value} active={active} />
      </div>
      <div className="text-xs mt-1 text-[hsl(var(--muted-fg))] whitespace-nowrap">{label}</div>
    </div>
  );
}

export function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 480);
  const y = scrollY * 0.3;

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Mesh BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] w-[520px] h-[520px] rounded-full blur-[100px]" style={{ background: "hsl(var(--accent) / 0.1)" }} />
        <div className="absolute bottom-[15%] right-[8%] w-[420px] h-[420px] rounded-full blur-[90px]" style={{ background: "rgb(167 139 250 / 0.08)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.05]">
          <defs>
            <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0L0 0 0 64" fill="none" stroke="currentColor" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div
        className="relative z-10 text-center max-w-[940px] px-6 pt-20"
        style={{ opacity, transform: `translateY(${y}px)` }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-9 px-5 py-1.5 rounded-full text-sm text-[hsl(var(--muted-fg))] glass animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
          Available for new projects
        </div>

        {/* Headline */}
        <h1
          className="font-display leading-[.87] tracking-[-3px] mb-7 animate-fade-up"
          style={{ fontSize: "clamp(60px,10vw,116px)", animationDelay: "100ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <span className="block text-foreground">Full-Stack</span>
          <span className="block gradient-text italic">Developer</span>
        </h1>

        {/* Sub */}
        <p
          className="text-lg text-[hsl(var(--muted-fg))] max-w-[540px] mx-auto mb-11 leading-[1.75] animate-fade-up"
          style={{ animationDelay: "200ms", opacity: 0, animationFillMode: "forwards" }}
        >
          I build fast, beautiful software — pharmacy systems, AI tools, and polished web applications. Based in{" "}
          <strong className="text-foreground">Kurdistan</strong>, working globally.
        </p>

        {/* CTAs */}
        <div
          className="flex gap-3 justify-center flex-wrap animate-fade-up"
          style={{ animationDelay: "300ms", opacity: 0, animationFillMode: "forwards" }}
        >
          <button
            onClick={() => scrollTo("projects")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm cursor-pointer border-none"
            style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))", boxShadow: "0 8px 24px rgba(0,0,0,.2)" }}
          >
            View my work <ArrowRight size={15} />
          </button>
          <a
            href="/cv.pdf"
            download
            className="flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-foreground no-underline glass hover:bg-[hsl(var(--surface-2))] transition-colors"
          >
            <Download size={15} /> Download CV
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="inline-flex gap-12 mt-16 px-12 py-5 rounded-2xl glass animate-fade-up"
          style={{ animationDelay: "500ms", opacity: 0, animationFillMode: "forwards" }}
        >
          {[["5+","Years exp."],["20+","Projects"],["12","Branches"],["99.9%","Uptime"]].map(([v, l]) => (
            <StatCounter key={l} value={v} label={l} active={statsVisible} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35">
        <span className="text-[10px] font-mono tracking-[.15em] uppercase text-[hsl(var(--muted-fg))]">Scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, hsl(var(--muted-fg)), transparent)" }} />
      </div>
    </section>
  );
}
