"use client";
// @ts-nocheck

// ── Base Skeleton ─────────────────────────────────────────────────────────────
export function Skeleton({ width = "100%", height = 16, borderRadius = 8, className = "" }: {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        borderRadius,
        background: "hsl(var(--surface-2))",
        animation: "skeleton 1.5s ease-in-out infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ── Project Card Skeleton ─────────────────────────────────────────────────────
export function ProjectCardSkeleton() {
  return (
    <div style={{ borderRadius: 20, border: "1px solid hsl(var(--border))", background: "hsl(var(--surface))", overflow: "hidden" }}>
      <Skeleton height={172} borderRadius={0} />
      <div style={{ padding: 20 }}>
        <Skeleton height={22} width="60%" borderRadius={6} />
        <div style={{ height: 8 }} />
        <Skeleton height={14} />
        <div style={{ height: 4 }} />
        <Skeleton height={14} width="80%" />
        <div style={{ height: 14 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <Skeleton height={20} width={60} borderRadius={99} />
          <Skeleton height={20} width={70} borderRadius={99} />
          <Skeleton height={20} width={50} borderRadius={99} />
        </div>
      </div>
    </div>
  );
}

// ── Blog Card Skeleton ────────────────────────────────────────────────────────
export function BlogCardSkeleton() {
  return (
    <div style={{ padding: 24, borderRadius: 20, border: "1px solid hsl(var(--border))", background: "hsl(var(--surface))" }}>
      <Skeleton height={40} width={40} borderRadius={10} />
      <div style={{ height: 12 }} />
      <Skeleton height={18} />
      <div style={{ height: 6 }} />
      <Skeleton height={14} />
      <div style={{ height: 4 }} />
      <Skeleton height={14} width="70%" />
      <div style={{ height: 16 }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton height={12} width={60} borderRadius={99} />
        <Skeleton height={12} width={80} borderRadius={99} />
      </div>
    </div>
  );
}

// ── Section Loading State ─────────────────────────────────────────────────────
export function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Skeleton height={14} width={80} borderRadius={99} />
        <div style={{ height: 12 }} />
        <Skeleton height={42} width="40%" borderRadius={8} />
        <div style={{ height: 40 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {Array.from({ length: rows }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
