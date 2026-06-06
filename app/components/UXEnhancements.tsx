"use client";
// @ts-nocheck

import { useState, useEffect, useCallback } from "react";
import { ArrowUp, Copy, Check } from "lucide-react";

// ── Scroll Progress Bar ───────────────────────────────────────────────────────
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 9999,
        background: "hsl(var(--border))",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, hsl(var(--accent)), #a78bfa)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

// ── Back to Top Button ────────────────────────────────────────────────────────
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 400,
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: "1px solid hsl(var(--border))",
        background: "hsl(var(--surface))",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,.15)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(.8)",
        transition: "opacity .3s ease, transform .3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "hsl(var(--accent))";
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--accent))";
        (e.currentTarget as HTMLElement).querySelector("svg")!.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "hsl(var(--surface))";
        (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border))";
        (e.currentTarget as HTMLElement).querySelector("svg")!.style.color = "hsl(var(--muted-fg))";
      }}
    >
      <ArrowUp size={18} style={{ color: "hsl(var(--muted-fg))", transition: "color .2s" }} />
    </button>
  );
}

// ── Copy Email Button ─────────────────────────────────────────────────────────
export function CopyEmailButton({ email = "zanaaabdulla021@gmail.com" }: { email?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copy}
      title={copied ? "Copied!" : "Copy email"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        borderRadius: 99,
        border: `1px solid ${copied ? "#16a34a55" : "hsl(var(--border))"}`,
        background: copied ? "#16a34a12" : "hsl(var(--surface-2))",
        color: copied ? "#16a34a" : "hsl(var(--muted-fg))",
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        cursor: "pointer",
        transition: "all .2s",
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : email}
    </button>
  );
}

// ── Keyboard Shortcuts ────────────────────────────────────────────────────────
export function KeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    let lastKey = "";
    let lastTime = 0;

    const handler = (e: KeyboardEvent) => {
      // Don't trigger in inputs
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as Element)?.tagName)) return;

      const now = Date.now();
      const key = e.key.toLowerCase();

      // Show help with ?
      if (key === "?" || (e.shiftKey && key === "/")) {
        setShowHelp((v) => !v);
        return;
      }

      // Close help with Escape
      if (key === "escape") {
        setShowHelp(false);
        return;
      }

      // Two-key combos (g + key within 500ms)
      if (lastKey === "g" && now - lastTime < 500) {
        const map: Record<string, string> = {
          h: "hero",
          a: "about",
          p: "projects",
          s: "skills",
          b: "blog",
          t: "timeline",
          c: "contact",
        };
        if (map[key]) {
          scrollTo(map[key]);
          setShowHelp(false);
        }
        lastKey = "";
        return;
      }

      lastKey = key;
      lastTime = now;
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [scrollTo]);

  if (!showHelp) return null;

  return (
    <div
      onClick={() => setShowHelp(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "rgba(0,0,0,.7)",
        backdropFilter: "blur(12px)",
        animation: "fadeIn .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "hsl(var(--surface))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 24,
          padding: 28,
          animation: "scaleIn .2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "hsl(var(--foreground))" }}>Keyboard Shortcuts</h3>
          <kbd style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--muted-fg))" }}>ESC</kbd>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            ["g → h", "Go to Hero"],
            ["g → a", "Go to About"],
            ["g → p", "Go to Projects"],
            ["g → s", "Go to Skills"],
            ["g → b", "Go to Blog"],
            ["g → t", "Go to Timeline"],
            ["g → c", "Go to Contact"],
            ["?", "Toggle this help"],
          ].map(([keys, desc]) => (
            <div key={keys} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderRadius: 10, background: "hsl(var(--surface-2))" }}>
              <span style={{ fontSize: 13, color: "hsl(var(--muted-fg))" }}>{desc}</span>
              <div style={{ display: "flex", gap: 4 }}>
                {keys.split(" → ").map((k, i) => (
                  <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {i > 0 && <span style={{ fontSize: 11, color: "hsl(var(--muted-fg))" }}>→</span>}
                    <kbd style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "2px 8px", borderRadius: 6, background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}>{k}</kbd>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: "hsl(var(--muted-fg))", textAlign: "center", marginTop: 16, fontFamily: "var(--font-mono)" }}>
          Press <kbd style={{ padding: "1px 6px", borderRadius: 4, background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>?</kbd> anytime to open this
        </p>
      </div>
    </div>
  );
}

// ── Project Search ────────────────────────────────────────────────────────────
export function ProjectSearchBar({
  value,
  onChange,
  placeholder = "Search projects...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted-fg))", fontSize: 14, pointerEvents: "none" }}>
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          paddingLeft: 36,
          paddingRight: value ? 36 : 14,
          paddingTop: 9,
          paddingBottom: 9,
          borderRadius: 99,
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--surface))",
          color: "hsl(var(--foreground))",
          fontSize: 13,
          outline: "none",
          fontFamily: "var(--font-sans)",
          transition: "border-color .2s, box-shadow .2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "hsl(var(--accent))";
          e.target.style.boxShadow = "0 0 0 3px hsl(var(--accent) / 0.15)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "hsl(var(--border))";
          e.target.style.boxShadow = "none";
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted-fg))", fontSize: 16, lineHeight: 1, padding: 2 }}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ── Navigation Loading Indicator ──────────────────────────────────────────────
export function NavigationProgress() {
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      setWidth(20);
      const t1 = setTimeout(() => setWidth(60), 100);
      const t2 = setTimeout(() => setWidth(80), 400);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    };
    const done = () => {
      setWidth(100);
      setTimeout(() => { setLoading(false); setWidth(0); }, 300);
    };

    // Listen to Next.js router events
    window.addEventListener("beforeunload", start);
    return () => window.removeEventListener("beforeunload", start);
  }, []);

  if (!loading && width === 0) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, pointerEvents: "none" }}>
      <div style={{ height: "100%", width: `${width}%`, background: "linear-gradient(90deg, hsl(var(--accent)), #a78bfa)", transition: "width .3s ease", borderRadius: "0 2px 2px 0", boxShadow: "0 0 8px hsl(var(--accent) / 0.5)" }} />
    </div>
  );
}
