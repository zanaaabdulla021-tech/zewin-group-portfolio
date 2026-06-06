"use client";
// @ts-nocheck

import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        style={{
          width: width ?? "100%",
          height: height ?? 200,
          background: "hsl(var(--surface-2))",
          border: "1px solid hsl(var(--border))",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          ...style,
        }}
        className={className}
      >
        🖼️
      </div>
    );
  }

  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }} className={className}>
      {/* Skeleton while loading */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, hsl(var(--surface-2)) 25%, hsl(var(--border)) 50%, hsl(var(--surface-2)) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

// ── Avatar with fallback ───────────────────────────────────────────────────────
export function Avatar({
  src,
  name,
  size = 48,
  style,
}: {
  src?: string | null;
  name: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  const [error, setError] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: src && !error ? "transparent" : "linear-gradient(135deg, hsl(var(--accent)), #a78bfa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: size * 0.35,
        color: "#fff",
        ...style,
      }}
    >
      {src && !error ? (
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        initials
      )}
    </div>
  );
}
