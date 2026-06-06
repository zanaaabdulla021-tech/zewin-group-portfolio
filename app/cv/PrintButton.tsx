"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      style={{ padding: "8px 20px", borderRadius: 99, background: "linear-gradient(135deg,#4f8ef7,#a78bfa)", color: "#fff", fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}
    >
      🖨 Print / Save PDF
    </button>
  );
}
