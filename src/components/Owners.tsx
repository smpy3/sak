/* Owners section: introduces both brothers with a professional photo + trust-focused copy. */
"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Owners() {
  return (
    <section
      id="owners"
      className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-24 pt-32"
    >
      <Reveal>
        <p className="text-xs tracking-[0.25em] text-[var(--muted)]">
          THE OWNERS
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Ghanshyam Modi & Rupesh Modi
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          Two brothers, one craft: consistent supply, honest communication, and
          long-term relationships across markets.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="glass relative overflow-hidden rounded-3xl">
            <Image
              src="/assets/owners.jpeg"
              alt="Ghanshyam Modi and Rupesh Modi"
              width={1600}
              height={1000}
              className="h-auto w-full object-cover"
              priority={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="text-sm text-white/80">
                30+ years • Manufacturers • Exporters • Importers
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-5">
          <div className="grid gap-6">
            {[
              {
                title: "How we work",
                desc: "Quick selections, clear options, and consistent follow-through. We respect buyer timelines.",
              },
              {
                title: "What we specialize in",
                desc: "Light Brown diamonds — consistent shade bands and matching across lots.",
              },
              {
                title: "What you can expect",
                desc: "Transparent communication, reliable supply, and practical support from inquiry to delivery.",
              },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="glass rounded-3xl p-6">
                  <div className="text-lg font-semibold">{c.title}</div>
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
