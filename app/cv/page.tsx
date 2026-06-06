import type { Metadata } from "next";
import { PrintButton } from "./PrintButton";
import { projects, skills, timeline } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "CV — Zana | KurdCod",
  description: "Curriculum Vitae — Zana, Full-Stack Developer from Kurdistan",
};

export default function CVPage() {
  const featured = projects.filter((p) => p.featured);
  const grouped = skills.reduce<Record<string, typeof skills>>((a, s) => {
    if (!a[s.category]) a[s.category] = [];
    a[s.category].push(s);
    return a;
  }, {});

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #fff; color: #111; }
        @media print {
          .no-print { display: none !important; }
          body { font-size: 11pt; }
          .page { padding: 0 !important; max-width: 100% !important; }
          section { break-inside: avoid; }
        }
        @page { margin: 1.5cm; }
      `}</style>

      {/* Print button */}
      <div className="no-print" style={{ position: "fixed", top: 20, right: 20, zIndex: 100, display: "flex", gap: 10 }}>
        <a href="/" style={{ padding: "8px 16px", borderRadius: 99, border: "1px solid #dde0e8", background: "#fff", fontSize: 13, textDecoration: "none", color: "#111" }}>← Back</a>
        <PrintButton />
      </div>

      <div className="page" style={{ maxWidth: 820, margin: "0 auto", padding: "48px 32px" }}>

        {/* Header */}
        <div style={{ borderBottom: "2px solid #111", paddingBottom: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 40, lineHeight: 1, marginBottom: 6 }}>Zana</h1>
              <p style={{ fontSize: 16, color: "#555", marginBottom: 4 }}>Full-Stack Developer</p>
              <p style={{ fontSize: 13, color: "#777" }}>Sulaymaniyah, Kurdistan Region, Iraq</p>
            </div>
            <div style={{ textAlign: "right", fontSize: 13, color: "#555", lineHeight: 1.9 }}>
              <div>zanaaabdulla021@gmail.com</div>
              <div>github.com/kurdcod</div>
              <div>zewin.dev</div>
            </div>
          </div>
          <p style={{ marginTop: 16, fontSize: 14, color: "#444", lineHeight: 1.75, maxWidth: 580 }}>
            Full-stack developer specialising in React, Next.js, and Python. Built and maintain PharmTrack — a pharmacy management platform running across 12 branches in the Kurdistan Region, handling 500+ prescriptions daily.
          </p>
        </div>

        {/* Experience */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {timeline.filter(t => t.type === "work" || t.type === "project").map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#777", paddingTop: 2 }}>{item.year}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#666", marginBottom: 4 }}>{item.company}</div>
                  <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65 }}>{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Education</h2>
          {timeline.filter(t => t.type === "education").map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16 }}>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#777", paddingTop: 2 }}>{item.year}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: "#666" }}>{item.company}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Skills</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {Object.entries(grouped).map(([cat, catSkills]) => (
              <div key={cat}>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em", color: "#888", marginBottom: 8 }}>{cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {catSkills.map(sk => (
                    <span key={sk.name} style={{ fontSize: 12, padding: "3px 10px", borderRadius: 99, background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151" }}>{sk.name} {sk.level}%</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, marginBottom: 16, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Selected Projects</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {featured.map((p) => (
              <div key={p.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#888" }}>{p.year}</div>
                </div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{p.longDescription}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tech.map(t => <span key={t} style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#666" }}>{t}</span>).reduce((a: React.ReactNode[], t, i, arr) => [...a, t, i < arr.length - 1 ? <span key={`sep-${i}`} style={{ color: "#ccc" }}>·</span> : null], [])}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11, color: "#999", fontFamily: "'DM Mono',monospace" }}>
          <span>zewin.dev</span>
          <span>Generated {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
        </div>
      </div>
    </>
  );
}
