"use client";
// @ts-nocheck

import { useState, useEffect } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState<"en" | "ku">("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "en" | "ku" | null;
    if (saved) setLang(saved);
  }, []);

  const toggle = () => {
    const next = lang === "en" ? "ku" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent("lang-change", { detail: next }));
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-[hsl(var(--border))] bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-fg))] hover:text-foreground transition-colors cursor-pointer"
      title="Switch language / زمان بگۆڕە"
    >
      {lang === "en" ? (
        <><span>🇮🇶</span> کوردی</>
      ) : (
        <><span>🇬🇧</span> EN</>
      )}
    </button>
  );
}

// Hook to get current language reactively
export function useLang(): "en" | "ku" {
  const [lang, setLang] = useState<"en" | "ku">("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as "en" | "ku" | null;
    if (saved) setLang(saved);

    const handler = (e: Event) => {
      setLang((e as CustomEvent).detail as "en" | "ku");
    };
    window.addEventListener("lang-change", handler);
    return () => window.removeEventListener("lang-change", handler);
  }, []);

  return lang;
}
