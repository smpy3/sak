/* A kinetic “marquee” stripe to break sections and add motion/energy. */
"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Marquee() {
  const reduce = useReducedMotion();
  const items = [
    "Light Brown Diamonds",
    "Manufacturers • Exporters • Importers",
    "Certified Lots",
    "Fast Global Delivery",
    "BKC • Surat • Toronto • Dallas",
  ];

  return (
    <section aria-hidden="true" className="border-y border-white/10">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <motion.div
          className="flex gap-10 py-5"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce ? undefined : { duration: 18, ease: "linear", repeat: Infinity }
          }
          style={{ willChange: "transform" }}
        >
          {[...items, ...items].map((t, idx) => (
            <div
              key={`${t}-${idx}`}
              className="whitespace-nowrap text-sm tracking-[0.22em] text-[var(--muted)]"
            >
              <span className="text-[var(--fg)]">{t}</span>
              <span className="mx-4 text-white/25">◆</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
