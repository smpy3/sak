/* This creates a subtle cursor-follow glow for an “interactive premium” feel. */
"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // We store coordinates in CSS vars to avoid rerendering on every mouse move.
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-10 opacity-70"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(420px 420px at var(--x) var(--y), rgba(182,139,91,0.22), transparent 60%)",
      }}
    />
  );
}

