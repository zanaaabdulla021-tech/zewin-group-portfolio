import type { Metadata } from "next";
import { ThemeProvider } from "./components/ThemeProvider";
import { PageViewTracker } from "./components/PageViewTracker";
import { ScrollProgressBar, BackToTop, KeyboardShortcuts } from "./components/UXEnhancements";
import { MobileBottomNav } from "./components/MobileBottomNav";
import { PageTransition } from "./components/PageTransition";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zewin Group — Full-Stack Development & Tech Solutions",
  description: "Building modern web applications, pharmacy management systems, and AI-powered tools in the Kurdistan Region.",
  keywords: ["KurdCod", "full-stack developer", "React", "Next.js", "Kurdish developer"],
  authors: [{ name: "KurdCod" }],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    title: "Zewin Group — Full-Stack Development & Tech Solutions",
    description: "Building modern web applications and AI-powered tools.",
    siteName: "KurdCod",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zewin Group — Full-Stack Development & Tech Solutions",
    description: "Building modern web applications and AI-powered tools.",
  },
  robots: { index: true, follow: true },
  themeColor: "#4f8ef7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KurdCod" />
        {/* Register service worker */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(function() {});
            });
          }
        `}} />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageViewTracker />
          <ScrollProgressBar />
          <BackToTop />
          <KeyboardShortcuts />
          <MobileBottomNav />
          <ErrorBoundary>
            <PageTransition>
              {children}
            </PageTransition>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
