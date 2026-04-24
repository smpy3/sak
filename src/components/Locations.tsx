/* Locations section: shows global presence in a clean “cards” layout for credibility. */
"use client";

import Reveal from "@/components/Reveal";

const locations = [
  {
    city: "BKC, Mumbai (India)",
    lines: ["Bharat Diamond Bourse, Tower EW / 68", "Bandra (E), Mumbai 400 051"],
    hint: "Primary office",
  },
  {
    city: "Surat Diamond Bourse (India)",
    lines: ["Surat, Gujarat", "By appointment"],
    hint: "Manufacturing & supply",
  },
  {
    city: "Toronto (Canada)",
    lines: ["Toronto, ON", "By appointment"],
    hint: "North America clients",
  },
  {
    city: "Dallas (USA)",
    lines: ["Dallas, TX", "By appointment"],
    hint: "USA clients",
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-24 pt-32"
    >
      <Reveal>
        <p className="text-xs tracking-[0.25em] text-[var(--muted)]">OFFICES</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Global reach, local trust.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
          We operate across key diamond hubs to move fast, communicate clearly,
          and support buyers in their time zone.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {locations.map((l) => (
          <Reveal key={l.city}>
            <div className="glass rounded-3xl p-7 transition hover:bg-white/8">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-lg font-semibold">{l.city}</div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]">
                    {l.hint}
                  </div>
                </div>
                <div className="mt-3 space-y-1 text-sm text-[var(--muted)]">
                  {l.lines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent2)] hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    l.city,
                  )}`}
                  target="_blank"
                rel="noreferrer"
                >
                  Get directions <span className="text-white/60">↗</span>
                </a>
              </div>
            </Reveal>
          ))}
      </div>
    </section>
  );
}
