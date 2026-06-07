import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/app/lib/data";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

interface Props { params: { id: string } }

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Zewin Group`,
    description: project.description,
  };
}

export default function ProjectPage({ params }: Props) {
  const { id } = params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const others = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main style={{ minHeight: "100vh", background: "hsl(var(--background))", color: "hsl(var(--foreground))", fontFamily: "var(--font-sans)" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px 0" }}>
        <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "hsl(var(--muted-fg))", textDecoration: "none", marginBottom: 32 }}>
          <ArrowLeft size={14} /> Back to projects
        </Link>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Hero */}
        <div style={{ padding: 48, borderRadius: 28, marginBottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 20, background: `linear-gradient(135deg, ${project.color}22, hsl(var(--surface-2)))`, border: "1px solid hsl(var(--border))" }}>
          <div style={{ fontSize: 80 }}>{project.icon}</div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "hsl(var(--accent))", letterSpacing: ".15em", textTransform: "uppercase", marginBottom: 10 }}>{project.category} · {project.year}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,5vw,52px)", color: "hsl(var(--foreground))", marginBottom: 12 }}>{project.title}</h1>
            <p style={{ fontSize: 16, color: "hsl(var(--muted-fg))", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>{project.description}</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 99, border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", textDecoration: "none", fontSize: 13, fontWeight: 500, background: "hsl(var(--surface))" }}>
                <Github size={14} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 20px", borderRadius: 99, color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)" }}>
                <ExternalLink size={14} /> Live site
              </a>
            )}
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && (
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, gap: 14, marginBottom: 24 }}>
            {project.metrics.map((m) => (
              <div key={m.label} style={{ textAlign: "center", padding: "20px 12px", borderRadius: 20, background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "hsl(var(--foreground))" }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "hsl(var(--muted-fg))", marginTop: 4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* About */}
        <div style={{ padding: "28px 32px", borderRadius: 20, background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "hsl(var(--foreground))", marginBottom: 14 }}>About this project</h2>
          <p style={{ fontSize: 15, color: "hsl(var(--muted-fg))", lineHeight: 1.85 }}>{project.longDescription}</p>
        </div>

        {/* Tech stack */}
        <div style={{ padding: "28px 32px", borderRadius: 20, background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "hsl(var(--foreground))", marginBottom: 16 }}>Tech Stack</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {project.tech.map((t) => (
              <span key={t} style={{ fontFamily: "var(--font-mono)", fontSize: 13, padding: "6px 16px", borderRadius: 99, background: "hsl(var(--surface-2))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ padding: "28px 32px", borderRadius: 20, background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", marginBottom: 40 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "hsl(var(--foreground))", marginBottom: 16 }}>Tags</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {project.tags.map((t) => (
              <span key={t} style={{ fontSize: 12, padding: "4px 12px", borderRadius: 99, background: `${project.color}18`, color: project.color, fontWeight: 600, border: `1px solid ${project.color}33` }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Other projects */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "hsl(var(--foreground))", marginBottom: 16 }}>Other projects</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
          {others.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} style={{ display: "block", padding: "16px 18px", borderRadius: 16, background: "hsl(var(--surface))", border: `1px solid ${p.color}33`, textDecoration: "none" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 4 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "hsl(var(--muted-fg))" }}>{p.description.slice(0, 60)}...</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
