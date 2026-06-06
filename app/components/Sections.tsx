"use client";
// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import { MapPin, Clock, Mail, Github, Linkedin, Twitter, Send, Check, Loader2 } from "lucide-react";
import { CopyEmailButton } from "./UXEnhancements";
import { skills, timeline, testimonials } from "@/app/lib/data";
import { Reveal } from "./Reveal";

// ── About ─────────────────────────────────────────────────────────────────────
export function AboutSection() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Avatar */}
          <Reveal direction="left">
            <div className="relative max-w-[440px] mx-auto">
              <div className="aspect-square rounded-[2rem] overflow-hidden flex flex-col items-center justify-center gap-3" style={{ background: "linear-gradient(135deg, hsl(var(--accent)/0.12), hsl(var(--surface-2)))", border: "1px solid hsl(var(--border))" }}>
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl" style={{ background: "hsl(var(--accent)/0.15)", border: "1.5px solid hsl(var(--accent)/0.3)" }}>
                  💻
                </div>
                <div className="font-display text-3xl text-foreground">Zana</div>
                <div className="font-mono text-sm text-[hsl(var(--muted-fg))]">@KurdCod</div>
                <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: "linear-gradient(to top, hsl(var(--surface-2)), transparent)" }} />
              </div>
              <div className="absolute -top-3.5 -right-3.5 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-medium animate-float" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", boxShadow: "0 8px 24px rgba(0,0,0,.12)" }}>
                <MapPin size={13} className="text-[hsl(var(--accent))]" /> Kurdistan
              </div>
              <div className="absolute -bottom-3.5 -left-3.5 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-sm font-medium" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))", boxShadow: "0 8px 24px rgba(0,0,0,.12)", animation: "float 3.5s ease-in-out infinite .5s" }}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" /> Available
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal direction="right">
            <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3.5" style={{ color: "hsl(var(--accent))" }}>About me</p>
            <h2 className="font-display text-[clamp(30px,4vw,46px)] text-foreground leading-[1.05] mb-5">
              Building software that{" "}
              <span className="gradient-text italic">actually matters</span>
            </h2>
            <div className="text-[15px] text-[hsl(var(--muted-fg))] leading-[1.85] space-y-4 mb-7">
              <p>I&apos;m <strong className="text-foreground">Zana</strong>, a full-stack developer from Kurdistan — building under the <strong className="text-foreground">KurdCod</strong> brand. I specialise in robust, high-performance web apps and developer tooling.</p>
              <p>My flagship project is <strong className="text-foreground">PharmTrack</strong> — a pharmacy management platform running across 12 branches, handling 500+ prescriptions daily.</p>
              <p>I love the intersection of clean code and clean design. Every project needs to be fast, maintainable, and genuinely pleasant to use.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[["💻","React & Next.js"],["🏥","Healthcare software"],["🤖","AI integration"],["🌍","Kurdistan Region"]].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-[13px] text-[hsl(var(--muted-fg))]" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                  <span className="text-lg">{icon}</span>{text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
const CAT_COLORS: Record<string, string> = { frontend: "#4f8ef7", backend: "#10b981", tools: "#f59e0b", design: "#ec4899" };

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <section id="skills" ref={ref} className="py-28 px-6" style={{ background: "hsl(var(--surface-2)/0.4)" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3" style={{ color: "hsl(var(--accent))" }}>Skills</p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] text-foreground mb-12">
            My <span className="gradient-text italic">toolkit</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {Object.entries(grouped).map(([cat, catSkills], gi) => (
            <Reveal key={cat} delay={gi * 80}>
              <div className="p-6 rounded-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <h3 className="font-mono text-[11px] uppercase tracking-[.12em] mb-5" style={{ color: CAT_COLORS[cat] }}>{cat}</h3>
                <div className="space-y-4">
                  {catSkills.map((sk, si) => (
                    <div key={sk.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2 text-[14px] text-foreground">
                          <span>{sk.icon}</span>{sk.name}
                        </div>
                        <span className="font-mono text-[11px] text-[hsl(var(--muted-fg))]">{sk.level}%</span>
                      </div>
                      <div className="h-[5px] rounded-full overflow-hidden" style={{ background: "hsl(var(--surface-2))" }}>
                        <div
                          className="h-full rounded-full skill-bar"
                          style={{
                            width: visible ? `${sk.level}%` : "0%",
                            background: CAT_COLORS[cat],
                            transition: `width 1.4s cubic-bezier(.22,1,.36,1) ${gi * 100 + si * 55}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--muted-fg))] mb-4">Also worked with</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Redis","Nginx","Linux","GraphQL","WebSockets","XML-RPC","Chart.js","D3.js","Prisma","Supabase","Vercel","AWS S3","Cloudflare"].map((t) => (
                <span key={t} className="font-mono text-[12px] px-4 py-1.5 rounded-full text-[hsl(var(--muted-fg))]" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>{t}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────
const TL_CONF = {
  work:      { color: "#4f8ef7", icon: "💼", bg: "#4f8ef715" },
  project:   { color: "#f59e0b", icon: "🚀", bg: "#f59e0b15" },
  education: { color: "#10b981", icon: "🎓", bg: "#10b98115" },
};

export function TimelineSection() {
  return (
    <section id="timeline" className="py-28 px-6">
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3" style={{ color: "hsl(var(--accent))" }}>Timeline</p>
          <h2 className="font-display text-[clamp(32px,4vw,48px)] text-foreground mb-14">
            My <span className="gradient-text italic">journey</span>
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px" style={{ background: `linear-gradient(to bottom, hsl(var(--accent)), hsl(var(--border)/0.5), transparent)` }} />
          <div className="space-y-5">
            {timeline.map((item, i) => {
              const conf = TL_CONF[item.type];
              return (
                <Reveal key={i} delay={i * 70}>
                  <div
                    className="ml-[52px] relative p-5 rounded-2xl transition-all duration-200"
                    style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${conf.color}55`; (e.currentTarget as HTMLElement).style.transform = "translateX(5px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}
                  >
                    <div className="absolute -left-[41px] top-[22px] w-4 h-4 rounded-full border-[3px]" style={{ background: conf.color, borderColor: "hsl(var(--background))" }} />
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: conf.bg, color: conf.color }}>{item.year}</span>
                      <span className="text-lg">{conf.icon}</span>
                    </div>
                    <h3 className="font-display text-[1.15rem] text-foreground mb-1">{item.title}</h3>
                    <p className="text-[12px] font-medium text-[hsl(var(--muted-fg))] mb-2">{item.company}</p>
                    <p className="text-[13px] text-[hsl(var(--muted-fg))] leading-[1.7]">{item.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 px-6" style={{ background: "hsl(var(--surface-2)/0.4)" }}>
      <div className="max-w-[800px] mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3 text-center" style={{ color: "hsl(var(--accent))" }}>Testimonials</p>
          <h2 className="font-display text-[clamp(30px,4vw,44px)] text-foreground mb-12 text-center">
            What clients <span className="gradient-text italic">say</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative min-h-[210px]">
            {testimonials.map((t, i) => (
              <div key={i} style={{ position: i === idx ? "relative" : "absolute", inset: 0, opacity: i === idx ? 1 : 0, pointerEvents: i === idx ? "auto" : "none", transition: "opacity .5s ease", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" } as React.CSSProperties}
                className="px-8 py-7 rounded-2xl">
                <div className="text-3xl mb-4 opacity-40">"</div>
                <p className="text-[15px] text-[hsl(var(--muted-fg))] leading-[1.85] italic mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-xl" style={{ background: `${t.color}18`, border: `1px solid ${t.color}33` }}>{t.icon}</div>
                  <div>
                    <div className="text-[14px] font-semibold text-foreground">{t.name}</div>
                    <div className="text-[12px] text-[hsl(var(--muted-fg))]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className="h-2 rounded-full transition-all duration-300 border-none cursor-pointer" style={{ width: i === idx ? 24 : 8, background: i === idx ? "hsl(var(--accent))" : "hsl(var(--border))" }} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError(""); setSending(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else setSent(true);
    } catch { setError("Network error. Please check your connection."); }
    finally { setSending(false); }
  };

  if (sent) return (
    <div className="p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 min-h-[300px]" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center animate-float" style={{ background: "#16a34a18", border: "1px solid #16a34a33" }}>
        <Check size={28} className="text-green-500" />
      </div>
      <h3 className="font-display text-2xl text-foreground">Message sent!</h3>
      <p className="text-[13px] text-[hsl(var(--muted-fg))]">I&apos;ll get back within 24 hours.</p>
      <button onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }); }} className="text-[13px] underline border-none bg-transparent cursor-pointer" style={{ color: "hsl(var(--accent))" }}>Send another</button>
    </div>
  );

  const inputStyle = { width: "100%", padding: "10px 13px", borderRadius: 12, background: "hsl(var(--surface-2))", border: "1.5px solid hsl(var(--border))", color: "hsl(var(--foreground))", fontSize: 14, outline: "none", fontFamily: "var(--font-sans)", transition: "border-color .2s" } as React.CSSProperties;

  return (
    <div className="p-8 rounded-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
      <h3 className="font-display text-xl text-foreground mb-5">Send a message</h3>
      {[["name","Your name","text","John Doe"],["email","Email","email","john@example.com"]].map(([k,l,t,ph]) => (
        <div key={k} className="mb-3.5">
          <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-fg))] mb-1.5">{l}</label>
          <input type={t} value={form[k as keyof typeof form]} placeholder={ph} onChange={(e) => setForm({ ...form, [k]: e.target.value })} style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = "hsl(var(--accent))"; }} onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; }} />
        </div>
      ))}
      <div className="mb-5">
        <label className="block font-mono text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-fg))] mb-1.5">Message</label>
        <textarea rows={4} value={form.message} placeholder="Tell me about your project..." onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: "none" } as React.CSSProperties}
          onFocus={(e) => { e.target.style.borderColor = "hsl(var(--accent))"; }} onBlur={(e) => { e.target.style.borderColor = "hsl(var(--border))"; }} />
      </div>
      {error && <div className="mb-3 px-4 py-2.5 rounded-xl text-[13px]" style={{background:"#ef444415",border:"1px solid #ef444430",color:"#ef4444"}}>{error}</div>}
      <button onClick={submit} disabled={sending} className="w-full py-3.5 rounded-2xl text-[14px] font-semibold text-white border-none cursor-pointer flex items-center justify-center gap-2 transition-opacity" style={{ background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)", opacity: sending ? 0.7 : 1 }}>
        {sending ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send message</>}
      </button>
    </div>
  );
}

export function ContactSection() {
  const socialLinks = [
    { Icon: Github,   label: "GitHub",   href: "#",                        color: "hsl(var(--foreground))" },
    { Icon: Linkedin, label: "LinkedIn", href: "#",                        color: "#0077B5" },
    { Icon: Twitter,  label: "Twitter",  href: "#",                        color: "#1DA1F2" },
    { Icon: Mail,     label: "Email",    href: "mailto:zanaaabdulla021@gmail.com", color: "#f59e0b" },
  ];

  return (
    <section id="contact" className="py-28 px-6" style={{ background: "hsl(var(--surface-2)/0.4)" }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[.15em] mb-3" style={{ color: "hsl(var(--accent))" }}>Contact</p>
            <h2 className="font-display text-[clamp(38px,6vw,60px)] text-foreground mb-4">
              Let&apos;s <span className="gradient-text italic">work together</span>
            </h2>
            <p className="text-[15px] text-[hsl(var(--muted-fg))] max-w-[440px] mx-auto leading-[1.7]">
              Open to freelance projects, full-time roles, and interesting collaborations.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-7 items-start">
          <Reveal direction="left">
            <div className="space-y-4">
              <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <h3 className="font-display text-xl text-foreground mb-2">Zana — KurdCod</h3>
                <div className="flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-fg))] mb-2.5">
                  <MapPin size={13} className="text-[hsl(var(--accent))]" /> Kurdistan Region, Iraq
                </div>
                <a href="mailto:zanaaabdulla021@gmail.com" className="font-mono text-[13px] no-underline flex items-center gap-1.5" style={{ color: "hsl(var(--accent))" }}>
                  <Mail size={13} /> zanaaabdulla021@gmail.com
                </a>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot" />
                  <span className="text-[14px] font-semibold text-foreground">Available for work</span>
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-[hsl(var(--muted-fg))]">
                  <Clock size={13} /> Response: <strong className="text-foreground">&lt;24 hours</strong>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map(({ Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2.5 px-3.5 py-3 rounded-2xl no-underline transition-all duration-200 group" style={{ background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${color}55`; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "hsl(var(--surface-2))" }}>
                      <Icon size={15} style={{ color }} />
                    </div>
                    <span className="text-[13px] font-medium text-[hsl(var(--muted-fg))] group-hover:text-foreground transition-colors">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
