/* Hero section: huge typography + parallax diamond so the first impression feels world-class. */
"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import PublicImg from "@/components/PublicImg";

function DiamondMark() {
  // SVG keeps the hero lightweight but still “3D-ish”.
  return (
    <svg
      viewBox="0 0 420 420"
      className="h-full w-full"
      role="img"
      aria-label="Diamond mark"
    >
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(217,195,164,0.95)" />
          <stop offset="0.55" stopColor="rgba(182,139,91,0.85)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.65)" />
        </linearGradient>
        <linearGradient id="edge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.10)" />
        </linearGradient>
        <radialGradient id="r" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="1 0 0 0 0  0 0.95 0 0 0  0 0 0.85 0 0  0 0 0 0.9 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g opacity="0.95">
        <path
          d="M210 36 336 156 210 384 84 156 210 36Z"
          fill="url(#g)"
          opacity="0.35"
          filter="url(#glow)"
        />
        <path
          d="M210 36 336 156 210 384 84 156 210 36Z"
          fill="url(#g)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        <path
          d="M210 36 336 156H84L210 36Z"
          fill="rgba(255,255,255,0.10)"
        />
        <path
          d="M84 156 210 384 336 156 210 156 84 156Z"
          fill="rgba(0,0,0,0.12)"
        />
        {/* Facet lines for extra “diamond cut” detail */}
        <path
          d="M210 36 210 156 84 156 210 36Z"
          fill="rgba(255,255,255,0.05)"
        />
        <path
          d="M210 36 210 156 336 156 210 36Z"
          fill="rgba(0,0,0,0.06)"
        />
        <path
          d="M210 156 140 156 210 384 210 156Z"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M210 156 280 156 210 384 210 156Z"
          fill="rgba(0,0,0,0.05)"
        />
        <path
          d="M84 156 210 156 140 156 84 156Z"
          fill="rgba(255,255,255,0.03)"
        />
        <path
          d="M336 156 210 156 280 156 336 156Z"
          fill="rgba(255,255,255,0.02)"
        />
        <path
          d="M210 36 336 156 210 156 210 36Z"
          fill="rgba(255,255,255,0.04)"
        />
        <path
          d="M210 36 84 156 210 156 210 36Z"
          fill="rgba(0,0,0,0.05)"
        />
        <path
          d="M84 156 210 384 210 156 84 156Z"
          fill="rgba(255,255,255,0.02)"
        />
        <path
          d="M336 156 210 384 210 156 336 156Z"
          fill="rgba(0,0,0,0.03)"
        />
        <path
          d="M210 156 336 156 210 384 84 156 210 156Z"
          fill="none"
          stroke="url(#edge)"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <circle cx="150" cy="140" r="120" fill="url(#r)" opacity="0.9" />
      </g>
    </svg>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax zoom makes the hero feel “alive” while scrolling down.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.16]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  // Springs keep interaction smooth instead of twitchy.
  const rotateX = useSpring(rx, { stiffness: 220, damping: 26 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 26 });

  return (
    <section id="top" ref={ref} className="relative">
      <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-6 pb-32 pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[var(--muted)]">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                30+ years in diamond business • Light Brown specialists
              </p>
            </Reveal>

            <Reveal className="mt-6">
              <h1 className="font-[family-name:var(--font-display)] text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Diamonds that look{" "}
                <span className="relative inline-block text-[var(--accent2)] [text-shadow:0_18px_60px_rgba(217,195,164,0.20)] after:absolute after:inset-x-[-0.12em] after:-bottom-1 after:-z-10 after:h-[0.38em] after:rounded-full after:bg-[rgba(182,139,91,0.16)]">
                  rare
                </span>{" "}
                in every light.
              </h1>
            </Reveal>

            <Reveal className="mt-6">
              <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
                We sell all sizes — and we specialize in{" "}
                <span className="text-[var(--fg)]">Light Brown</span> diamonds with
                consistent supply, transparent grading, and fast global delivery.
              </p>
            </Reveal>

            <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-6 py-3 font-semibold text-black transition hover:brightness-110"
              >
                Get Pricing
                <span className="ml-2 inline-block transition group-hover:translate-x-0.5">
                  →
                </span>
              </a>
              <a
                href="#diamonds"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-[var(--fg)] transition hover:bg-white/10"
              >
                Explore Inventory Feel
              </a>
              <span className="text-sm text-[var(--muted)]">
                BKC Mumbai • Surat • Toronto • Dallas
              </span>
            </Reveal>

            <Reveal className="mt-10 grid grid-cols-3 gap-3 sm:max-w-xl">
              {[
                { k: "30+", v: "Years" },
                { k: "4", v: "Offices" },
                { k: "LB", v: "Specialty" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="text-2xl font-semibold">{s.k}</div>
                  <div className="text-xs text-[var(--muted)]">{s.v}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              className="relative mx-auto aspect-square w-full max-w-[420px]"
              style={{ scale, y }}
            >
              <div className="absolute inset-0 rounded-[36px] bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-2xl" />
              <div className="absolute inset-0 rounded-[36px] border border-white/10 bg-white/5" />

              {/* Diamond: mouse-tilt + subtle spin makes it feel “crafted” and unique. */}
              <motion.div
                className="absolute inset-0 p-10"
                style={{
                  perspective: 900,
                }}
                onMouseMove={(e) => {
                  if (reduce) return;
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  const px = (e.clientX - rect.left) / rect.width;
                  const py = (e.clientY - rect.top) / rect.height;
                  ry.set(clamp((px - 0.5) * 22, -16, 16));
                  rx.set(clamp(-(py - 0.5) * 18, -14, 14));
                }}
                onMouseLeave={() => {
                  ry.set(0);
                  rx.set(0);
                }}
              >
                <motion.div
                  className="relative h-full w-full"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          rotateZ: [0, 3, 0, -2, 0],
                        }
                  }
                  transition={
                    reduce
                      ? undefined
                      : { duration: 10, repeat: Infinity, ease: "easeInOut" }
                  }
                >
                  <div className="absolute inset-0 animate-[floaty_7s_ease-in-out_infinite]">
                    <DiamondMark />
                  </div>

                  {/* Extra sparkles (cheap + effective) */}
                  {!reduce ? (
                    <div className="pointer-events-none absolute inset-0">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute h-1 w-1 rounded-full bg-white/70"
                          style={{
                            left: `${10 + ((i * 37) % 80)}%`,
                            top: `${12 + ((i * 29) % 76)}%`,
                            filter: "drop-shadow(0 0 12px rgba(255,255,255,0.55))",
                          }}
                          animate={{
                            opacity: [0.1, 0.9, 0.2],
                            scale: [0.6, 1.6, 0.8],
                          }}
                          transition={{
                            duration: 2.4 + (i % 3) * 0.7,
                            delay: (i % 5) * 0.25,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  ) : null}

                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px]">
                    <div className="absolute -left-1/2 top-[-30%] h-[160%] w-[60%] rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_6s_ease-in-out_infinite]" />
                    <div className="absolute -right-1/2 bottom-[-30%] h-[160%] w-[60%] -rotate-12 bg-gradient-to-r from-transparent via-[rgba(217,195,164,0.25)] to-transparent animate-[shimmer_7.5s_ease-in-out_infinite]" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* The business card image builds trust instantly (real company, real contact). */}
            <div className="mt-6 flex justify-center">
              <div className="glass relative w-full max-w-[460px] overflow-hidden rounded-2xl">
                <PublicImg
                  src="assets/business-card.jpeg"
                  alt="S. Adityakumar & Co. contact card"
                  width={920}
                  height={520}
                  className="h-auto w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
