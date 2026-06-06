import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      fontFamily: "var(--font-sans)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeUp .6s ease" }}>
        {/* Animated 404 */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(80px,20vw,140px)", lineHeight: 1, marginBottom: 8, background: "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "float 3s ease-in-out infinite" }}>
          404
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px,4vw,32px)", color: "hsl(var(--foreground))", marginBottom: 12 }}>
          Page not found
        </h1>
        <p style={{ fontSize: 15, color: "hsl(var(--muted-fg))", lineHeight: 1.7, marginBottom: 36 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 24px", borderRadius: 99, background: "hsl(var(--foreground))", color: "hsl(var(--background))", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
            ← Go home
          </Link>
          <Link href="/#projects" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 24px", borderRadius: 99, border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", textDecoration: "none", fontSize: 14, fontWeight: 500, background: "hsl(var(--surface))" }}>
            View projects
          </Link>
        </div>

        {/* Fun grid decoration */}
        <div style={{ marginTop: 48, opacity: 0.06 }}>
          <svg width="200" height="100" style={{ margin: "0 auto", display: "block" }}>
            <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke="currentColor" strokeWidth=".5"/></pattern></defs>
            <rect width="200" height="100" fill="url(#g)"/>
          </svg>
        </div>
      </div>
    </main>
  );
}
