"use client";
// @ts-nocheck

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { projects } from "@/app/lib/data";
import type { Project } from "@/app/lib/data";
import { Reveal } from "./Reveal";
import { ProjectSearchBar } from "./UXEnhancements";
import { SpotlightCard } from "./HomeEffects";

const CATS = ["All", "web", "backend", "ai"];

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-5"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(14px)", animation: "fadeIn .2s ease" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[620px] max-h-[90vh] overflow-y-auto rounded-3xl animate-scale-in"
        style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", boxShadow: `0 40px 100px ${p.color}22` }}
      >
        {/* Hero */}
        <div className="relative h-[190px] rounded-t-3xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${p.color}28, hsl(var(--surface-2)))` }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl" style={{ background: `${p.color}20`, border: `2px solid ${p.color}44` }}>
            {p.icon}
          </div>
          <button onClick={onClose} className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer" style={{ background: "rgba(0,0,0,.35)", border: "1px solid rgba(255,255,255,.15)", color: "#fff" }}>
            <X size={13} />
          </button>
          <div className="absolute bottom-5 left-7">
            <div className="text-[10px] font-mono text-foreground/50 mb-1">{p.year}</div>
            <h2 className="font-display text-[1.625rem] text-foreground">{p.title}</h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-7">
          {p.metrics && (
            <div className="grid gap-2.5 mb-5" style={{ gridTemplateColumns: `repeat(${p.metrics.length}, 1fr)` }}>
              {p.metrics.map((m) => (
                <div key={m.label} className="text-center py-3 px-2 rounded-2xl" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
                  <div className="font-display text-2xl text-foreground">{m.value}</div>
                  <div className="text-[11px] text-[hsl(var(--muted-fg))] mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          )}
          <p className="text-sm text-[hsl(var(--muted-fg))] leading-[1.8] mb-5">{p.longDescription}</p>
          <div className="mb-5">
            <p className="font-mono text-[10px] text-[hsl(var(--muted-fg))] uppercase tracking-[.1em] mb-2.5">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <span key={t} className="font-mono text-[11px] px-3 py-1 rounded-full text-foreground" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full text-sm font-medium text-foreground no-underline" style={{ border: "1px solid hsl(var(--border))" }}>GitHub →</a>}
            {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full text-sm font-semibold text-white no-underline" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)" }}>Live site →</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project: p, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <Reveal delay={index * 70}>
      <SpotlightCard
        color={p.color}
        onClick={onClick}
        className="card cursor-pointer overflow-hidden group"
      >
        {/* Image area */}
        <div className="relative h-44 flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}24, hsl(var(--surface-2)))` }}>
          <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-5xl" style={{ background: `${p.color}20`, border: `1.5px solid ${p.color}44` }}>
            {p.icon}
          </div>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, hsl(var(--surface)/0.75))" }} />
          {p.featured && (
            <span className="absolute top-3 left-3 font-mono text-[10px] px-2.5 py-0.5 rounded-full font-semibold" style={{ background: `${p.color}33`, color: p.color, border: `1px solid ${p.color}44` }}>Featured</span>
          )}
          <span className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-0.5 rounded-full" style={{ background: "rgba(0,0,0,.3)", color: "rgba(255,255,255,.65)" }}>{p.year}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display text-[1.2rem] text-foreground leading-tight">{p.title}</h3>
            <ArrowRight size={17} className="text-[hsl(var(--muted-fg))] group-hover:translate-x-1 transition-transform mt-0.5" />
          </div>
          <p className="text-[13px] text-[hsl(var(--muted-fg))] leading-[1.65] mb-3.5 line-clamp-2">{p.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 4).map((t) => (
              <span key={t} className="font-mono text-[10px] px-2.5 py-0.5 rounded-full" style={{ background: `${p.color}14`, color: p.color, border: `1px solid ${p.color}28` }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
      </SpotlightCard>
    </Reveal>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch = !search || [p.title, p.description, ...p.tags].join(" ").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section id="projects" className="py-28 px-6" style={{ background: "hsl(var(--surface-2) / 0.4)" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3" style={{ color: "hsl(var(--accent))" }}>Projects</p>
                <h2 className="font-display text-[clamp(32px,4vw,48px)] text-foreground">
                  Things I&apos;ve{" "}
                  <span className="gradient-text italic">built</span>
                </h2>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <ProjectSearchBar value={search} onChange={setSearch} placeholder="Search projects..." />
                <div className="flex gap-2 flex-wrap">
                {CATS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className="px-4 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer border-none"
                    style={{
                      background: filter === c ? "hsl(var(--foreground))" : "transparent",
                      color: filter === c ? "hsl(var(--background))" : "hsl(var(--muted-fg))",
                      outline: filter === c ? "none" : "1px solid hsl(var(--border))",
                    }}
                  >
                    {c}
                  </button>
                ))}
                </div>
              </div>
            </div>
          </Reveal>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-[hsl(var(--muted-fg))]">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm">No projects found for &quot;{search}&quot;</p>
              <button onClick={() => { setSearch(""); setFilter("All"); }} className="mt-3 text-xs underline cursor-pointer bg-transparent border-none" style={{ color: "hsl(var(--accent))" }}>Clear search</button>
            </div>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onClick={() => setSelected(p)} />
            ))}
          </div>
        </div>
      </section>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
