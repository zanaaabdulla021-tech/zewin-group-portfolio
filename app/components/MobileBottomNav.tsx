"use client";
// @ts-nocheck

import { useState, useEffect } from "react";
import { Home, FolderKanban, Zap, MessageSquare, BookOpen } from "lucide-react";

const MOBILE_NAV = [
  { id: "hero",     label: "Home",     Icon: Home          },
  { id: "projects", label: "Projects", Icon: FolderKanban  },
  { id: "skills",   label: "Skills",   Icon: Zap           },
  { id: "blog",     label: "Blog",     Icon: BookOpen      },
  { id: "contact",  label: "Contact",  Icon: MessageSquare },
];

export function MobileBottomNav() {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show/hide on scroll direction
  useEffect(() => {
    const h = () => {
      const y = window.scrollY;
      setVisible(y > 200);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [lastScrollY]);

  // Track active section
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4, rootMargin: "-64px 0px 0px 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: "hsl(var(--surface) / 0.92)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid hsl(var(--border))",
        display: "flex",
        alignItems: "stretch",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {MOBILE_NAV.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 4px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              gap: 3,
              position: "relative",
              transition: "all .15s",
            }}
          >
            {/* Active indicator */}
            {isActive && (
              <div style={{
                position: "absolute",
                top: 0,
                left: "20%",
                right: "20%",
                height: 2,
                borderRadius: 99,
                background: "linear-gradient(90deg, hsl(var(--accent)), #a78bfa)",
              }} />
            )}

            {/* Icon */}
            <div style={{
              width: 36,
              height: 28,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isActive ? "hsl(var(--accent) / 0.15)" : "transparent",
              transition: "background .2s",
            }}>
              <Icon
                size={18}
                style={{
                  color: isActive ? "hsl(var(--accent))" : "hsl(var(--muted-fg))",
                  transition: "color .2s",
                }}
                strokeWidth={isActive ? 2.2 : 1.6}
              />
            </div>

            {/* Label */}
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? "hsl(var(--accent))" : "hsl(var(--muted-fg))",
              lineHeight: 1,
              transition: "color .2s",
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
