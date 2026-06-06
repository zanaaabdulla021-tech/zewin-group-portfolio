"use client";
// @ts-nocheck

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    setTransitionStage("exit");
    const t = setTimeout(() => {
      setDisplayChildren(children);
      setTransitionStage("enter");
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <div
      style={{
        opacity: transitionStage === "enter" ? 1 : 0,
        transform: transitionStage === "enter" ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      {displayChildren}
    </div>
  );
}
