/* This component shows a tiny scroll progress bar so users feel “guided” while exploring. */
"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // Spring keeps progress movement smooth (no jitter).
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-white/70"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
