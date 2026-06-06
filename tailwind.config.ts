import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        muted: "hsl(var(--muted))",
        "muted-fg": "hsl(var(--muted-fg))",
      },
      animation: {
        "fade-up": "fadeUp .6s cubic-bezier(.22,1,.36,1) both",
        "scale-in": "scaleIn .5s cubic-bezier(.22,1,.36,1) both",
        "float": "float 3s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { from: { opacity: "0", transform: "scale(.94)" }, to: { opacity: "1", transform: "scale(1)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        pulseDot: { "0%,100%": { opacity: "1" }, "50%": { opacity: ".3" } },
      },
    },
  },
  plugins: [],
};

export default config;
