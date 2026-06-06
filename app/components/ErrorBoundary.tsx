"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div style={{
          padding: "32px 24px",
          borderRadius: 20,
          border: "1px solid #ef444433",
          background: "#ef444408",
          textAlign: "center",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
          <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 20, color: "hsl(var(--foreground))", marginBottom: 8 }}>
            Something went wrong
          </h3>
          <p style={{ fontSize: 13, color: "hsl(var(--muted-fg))", marginBottom: 16 }}>
            {this.state.error?.message ?? "An unexpected error occurred."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{ padding: "8px 20px", borderRadius: 99, background: "hsl(var(--accent))", color: "#fff", border: "none", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Async error boundary wrapper ──────────────────────────────────────────────
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: T) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
