"use client";
// @ts-nocheck

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Download, Menu, X, ChevronRight } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

const NAV_LINKS = [
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills"   },
  { label: "Blog",     href: "#blog"     },
  { label: "Timeline", href: "#timeline" },
  { label: "Contact",  href: "#contact"  },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35, rootMargin: "-64px 0px 0px 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center ${
          scrolled ? "glass shadow-sm" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono font-bold text-base gradient-text hover:opacity-80 transition-opacity border-none bg-transparent cursor-pointer"
          >
            KurdCod
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-none cursor-pointer ${
                  active === link.href.slice(1)
                    ? "bg-[hsl(var(--surface-2))] text-foreground outline outline-1 outline-[hsl(var(--border))]"
                    : "bg-transparent text-[hsl(var(--muted-fg))] hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-fg))] hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            <a
              href="/cv"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-fg))] hover:text-foreground transition-colors no-underline"
            >
              📄 CV
            </a>
            <a
              href="/cv.pdf"
              download
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-foreground hover:bg-[hsl(var(--border))] transition-colors no-underline"
            >
              <Download size={13} /> CV
            </a>

            <button
              onClick={() => { const e = new KeyboardEvent("keydown", { key: "?" }); window.dispatchEvent(e); }}
              className="hidden md:flex w-8 h-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-fg))] hover:text-foreground transition-colors cursor-pointer font-mono text-xs"
              title="Keyboard shortcuts (?)"
            >
              ?
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white border-none cursor-pointer"
              style={{ background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)" }}
            >
              Hire me <ChevronRight size={13} />
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] cursor-pointer"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 glass border-b border-[hsl(var(--border))] p-4 md:hidden animate-fade-up">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium mb-1 border-none cursor-pointer transition-colors ${
                active === link.href.slice(1)
                  ? "bg-[hsl(var(--accent)/0.12)] text-[hsl(var(--accent))]"
                  : "bg-transparent text-foreground hover:bg-[hsl(var(--surface-2))]"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3">
            <a href="/cv.pdf" download className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-foreground no-underline">
              <Download size={13} /> CV
            </a>
            <button onClick={() => scrollTo("#contact")} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white border-none cursor-pointer" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)" }}>
              Hire me
            </button>
          </div>
        </div>
      )}
    </>
  );
}
