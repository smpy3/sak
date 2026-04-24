/* “Diamonds” section: interactive tone slider + feature cards to sell the specialty (Light Brown). */
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";

const toneStops = [
  { label: "Champagne (Light)", c: "#d9c3a4" },
  { label: "Light Brown (Signature)", c: "#b68b5b" },
  { label: "Cognac (Deep)", c: "#7b4a2e" },
];

export default function DiamondShowcase() {
  const [toneValue, setToneValue] = useState(45);
  const raw = useMotionValue(45);
  const tone = useSpring(raw, { stiffness: 120, damping: 22 });
  // useTransform is the typed way to derive values from a MotionValue in this framer-motion version.
  const glowOpacity = useTransform(tone, (v) => Math.min(1, 0.35 + v / 220));

  const toneInfo = useMemo(() => {
    const t = toneValue;
    if (t < 33) return toneStops[0];
    if (t < 66) return toneStops[1];
    return toneStops[2];
  }, [toneValue]);

  return (
    <section
      id="diamonds"
      className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-24 pt-32"
    >
      <Reveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs tracking-[0.25em] text-[var(--muted)]">
              DIAMONDS • ALL SIZES
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
              Our signature:{" "}
              <span className="text-[var(--accent2)]">Light Brown</span>.
            </h2>
          </div>
          <div className="max-w-md text-sm leading-7 text-[var(--muted)]">
            Consistent lots, clear communication, and fast turnarounds — built
            over 30+ years of relationships.
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="glass relative overflow-hidden rounded-3xl p-7">
            {/* The slider is “fun” but still business-appropriate: it signals craft + control. */}
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-sm text-[var(--muted)]">Tone selector</div>
                <div className="mt-2 text-2xl font-semibold">
                  {toneInfo.label}
                </div>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[var(--muted)]">
                  Move the slider to feel how we approach shade consistency. Our
                  strength is repeatable supply in the{" "}
                  <span className="text-[var(--fg)]">Light Brown</span> range.
                </p>
              </div>
              <motion.div
                className="h-16 w-16 rounded-2xl ring-soft"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), transparent 55%), " +
                    `linear-gradient(135deg, ${toneStops[0].c}, ${toneStops[1].c}, ${toneStops[2].c})`,
                  filter: "saturate(1.05)",
                }}
              />
            </div>

            <div className="mt-8">
              <input
                type="range"
                min={0}
                max={100}
                defaultValue={45}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  // We keep both state (for text) and motion value (for smooth visuals).
                  setToneValue(v);
                  raw.set(v);
                }}
                className="w-full accent-[var(--accent)]"
                aria-label="Diamond tone selector"
              />
              <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
                <span>Champagne</span>
                <span>Light Brown</span>
                <span>Cognac</span>
              </div>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(800px 400px at 20% 0%, rgba(182,139,91,0.18), transparent 60%)",
                opacity: glowOpacity,
              }}
            />
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          <div className="grid gap-6">
            {[
              {
                title: "All sizes",
                desc: "From small melee to larger statement stones — sourced and matched on demand.",
              },
              {
                title: "Transparent grading",
                desc: "We focus on clear documentation and straightforward selection support.",
              },
              {
                title: "Fast logistics",
                desc: "We’re structured for global buyer workflows across multiple offices.",
              },
              {
                title: "Built on trust",
                desc: "30+ years in business and repeat clients across markets.",
              },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="glass rounded-3xl p-6 transition hover:bg-white/8">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{c.title}</div>
                    <div className="text-white/30">◆</div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
