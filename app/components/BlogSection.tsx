"use client";
// @ts-nocheck

import { useState } from "react";
import { X, Clock, ArrowRight } from "lucide-react";
import { blogPosts } from "@/app/lib/data";
import type { BlogPost } from "@/app/lib/data";
import { Reveal } from "./Reveal";

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  // Very simple markdown renderer
  const renderContent = (md: string) =>
    md.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl text-foreground mt-7 mb-3">{line.slice(3)}</h2>;
      if (line.startsWith("# "))  return <h1 key={i} className="font-display text-3xl text-foreground mt-8 mb-4">{line.slice(2)}</h1>;
      if (line.trim() === "")     return <div key={i} className="h-3" />;
      return <p key={i} className="text-[14px] text-[hsl(var(--muted-fg))] leading-[1.85] mb-2">{line}</p>;
    });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] flex items-start justify-center p-5 pt-20 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(14px)", animation: "fadeIn .2s ease" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[700px] rounded-3xl mb-8 animate-scale-in"
        style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}
      >
        {/* Header */}
        <div className="p-8 pb-6" style={{ borderBottom: "1px solid hsl(var(--border))" }}>
          <div className="flex justify-between items-start mb-5">
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full" style={{ background: "hsl(var(--accent)/0.15)", color: "hsl(var(--accent))", border: "1px solid hsl(var(--accent)/0.3)" }}>{t}</span>
              ))}
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-none" style={{ background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))" }}>
              <X size={14} className="text-[hsl(var(--muted-fg))]" />
            </button>
          </div>
          <h1 className="font-display text-[1.75rem] text-foreground leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-[hsl(var(--muted-fg))] font-mono">
            <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {renderContent(post.content)}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) {
  return (
    <Reveal delay={index * 80}>
      <div
        onClick={onClick}
        className="card cursor-pointer group p-6 hover:border-[hsl(var(--accent)/0.35)]"
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
      >
        <div className="text-4xl mb-4">{post.cover}</div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((t) => (
            <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-full" style={{ background: "hsl(var(--accent)/0.12)", color: "hsl(var(--accent))" }}>{t}</span>
          ))}
        </div>
        <h3 className="font-display text-[1.1rem] text-foreground leading-snug mb-2 group-hover:text-[hsl(var(--accent))] transition-colors">
          {post.title}
        </h3>
        <p className="text-[13px] text-[hsl(var(--muted-fg))] leading-[1.65] mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-[11px] font-mono text-[hsl(var(--muted-fg))]">
          <div className="flex items-center gap-1">
            <Clock size={11} /> {post.readTime} min
          </div>
          <div className="flex items-center gap-1 group-hover:text-[hsl(var(--accent))] transition-colors">
            Read more <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function BlogSection() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  return (
    <>
      <section id="blog" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3" style={{ color: "hsl(var(--accent))" }}>Blog</p>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <h2 className="font-display text-[clamp(32px,4vw,48px)] text-foreground">
                What I&apos;ve{" "}
                <span className="gradient-text italic">written</span>
              </h2>
              <p className="text-sm text-[hsl(var(--muted-fg))] max-w-xs">
                Thoughts on building software, AI, and the Kurdistan tech scene.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} onClick={() => setSelected(post)} />
            ))}
          </div>
        </div>
      </section>

      {selected && <BlogModal post={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
