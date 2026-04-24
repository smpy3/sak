/* This file renders the sticky navigation with smooth section jumps (portfolio-style). */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCallback } from "react";

const links = [
  { id: "diamonds", label: "Diamonds" },
  { id: "owners", label: "Owners" },
  { id: "locations", label: "Locations" },
  { id: "contact", label: "Contact" },
];

export default function TopNav() {
  const onJump = useCallback((id: string) => {
    // We keep this tiny so anchor jumps feel instant and reliable.
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-40 mx-auto w-full px-4 pt-4"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 glass">
        <button
          type="button"
          onClick={() => onJump("top")}
          className="flex items-center gap-3"
          aria-label="Go to top"
        >
          <div className="relative h-8 w-8 overflow-hidden rounded-xl ring-soft">
            <Image
              src="/assets/business-card.jpeg"
              alt="S. Adityakumar & Co."
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="font-[family-name:var(--font-display)] text-sm tracking-wide">
              S. Adityakumar & Co.
            </div>
            <div className="text-xs text-[var(--muted)]">
              Light Brown Diamond Specialists
            </div>
          </div>
        </button>

        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onJump(l.id)}
              className="rounded-xl px-3 py-2 text-sm text-[var(--muted)] transition hover:bg-white/5 hover:text-[var(--fg)]"
            >
              {l.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => onJump("contact")}
            className="ml-1 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110"
          >
            Request Pricing
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
