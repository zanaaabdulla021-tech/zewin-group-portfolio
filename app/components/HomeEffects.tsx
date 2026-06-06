"use client";
// @ts-nocheck

import { useEffect, useRef, useState } from "react";

// ── 1. Cursor Glow ─────────────────────────────────────────────────────────────
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top  = `${e.clientY}px`;
      ref.current.style.opacity = "1";
    };
    const leave = () => { if (ref.current) ref.current.style.opacity = "0"; };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        pointerEvents: "none",
        zIndex: 1,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
        transition: "opacity .4s ease",
        opacity: 0,
        top: 0,
        left: 0,
      }}
    />
  );
}

// ── 2. Section Divider ─────────────────────────────────────────────────────────
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        height: 60,
        overflow: "hidden",
        transform: flip ? "scaleY(-1)" : "none",
      }}
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <path
          d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
          fill="hsl(var(--surface-2) / 0.4)"
        />
      </svg>
    </div>
  );
}

// ── 3. Tech Marquee ────────────────────────────────────────────────────────────
const TECH_ITEMS = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI",
  "PostgreSQL", "Odoo", "Docker", "Firebase", "Framer Motion", "Node.js",
  "Prisma", "Vercel", "GraphQL", "Redis", "WebSockets", "Claude API",
];

export function TechMarquee() {
  const items = [...TECH_ITEMS, ...TECH_ITEMS]; // duplicate for seamless loop

  return (
    <div
      style={{
        overflow: "hidden",
        padding: "20px 0",
        borderTop: "1px solid hsl(var(--border))",
        borderBottom: "1px solid hsl(var(--border))",
        background: "hsl(var(--surface) / 0.5)",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, hsl(var(--background)), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, hsl(var(--background)), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0 20px",
              fontSize: 13,
              fontFamily: "var(--font-mono)",
              color: "hsl(var(--muted-fg))",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "hsl(var(--accent))", display: "inline-block", opacity: .6 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── 4. Spotlight Card (wrapper) ────────────────────────────────────────────────
export function SpotlightCard({
  children,
  color = "#4f8ef7",
  style,
  className,
  onClick,
}: {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mx", `${x}px`);
    ref.current.style.setProperty("--my", `${y}px`);
    ref.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        "--spotlight-opacity": "0",
        ...style,
      } as React.CSSProperties}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${color}18 0%, transparent 60%)`,
          opacity: "var(--spotlight-opacity)" as unknown as number,
          transition: "opacity .3s ease",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "inherit",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── 5. Animated Number ─────────────────────────────────────────────────────────
export function AnimatedNumber({
  value,
  duration = 1800,
  active,
}: {
  value: string;
  duration?: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) return;
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) { setDisplay(value); return; }

    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setDisplay(value.replace(/[0-9.]+/, String(Math.floor(ease * num))));
      if (prog < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [active, value, duration]);

  return <>{display}</>;
}

// ── 6. Floating Badge ──────────────────────────────────────────────────────────
export function FloatingBadge({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 14px",
        borderRadius: 14,
        background: "hsl(var(--surface))",
        border: "1px solid hsl(var(--border))",
        fontSize: 13,
        fontWeight: 500,
        color: "hsl(var(--foreground))",
        animation: `float 3s ease-in-out infinite ${delay}s`,
        boxShadow: "0 8px 24px rgba(0,0,0,.1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
