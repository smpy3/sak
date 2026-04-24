/* Contact section: shows business details + a form that submits via a static-friendly provider (GitHub Pages-safe). */
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { contactSchema, type ContactPayload } from "@/lib/contact";

type ContactValues = ContactPayload;

export default function ContactSection() {
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "ok"; msg: string }
    | { type: "err"; msg: string }
  >({ type: "idle" });

  const [values, setValues] = useState<ContactValues>({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "Light Brown Diamonds",
    message: "",
    website: "",
  });

  const errors = useMemo(() => {
    const parsed = contactSchema.safeParse(values);
    if (parsed.success) return {};
    return parsed.error.flatten().fieldErrors;
  }, [values]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "loading" });

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setStatus({ type: "err", msg: "Please fix the highlighted fields." });
      return;
    }

    try {
      // GitHub Pages is static (no server), so we post to a form provider (Formspree) if configured.
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

      // Honeypot: if filled, treat as spam (still show success).
      if (parsed.data.website && parsed.data.website.length > 0) {
        setStatus({ type: "ok", msg: "Sent. We’ll reply with options shortly." });
        return;
      }

      if (!endpoint) {
        // Fallback: open an email draft so you still get the lead without any backend.
        const subject = encodeURIComponent(
          `[Website] ${parsed.data.interest} — ${parsed.data.name}`,
        );
        const body = encodeURIComponent(
          [
            `Name: ${parsed.data.name}`,
            `Company: ${parsed.data.company ?? ""}`,
            `Email: ${parsed.data.email}`,
            `Phone: ${parsed.data.phone ?? ""}`,
            "",
            parsed.data.message,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        window.location.href = `mailto:ghanshyammodi007@gmail.com,rupeshvmodi@gmail.com?subject=${subject}&body=${body}`;
        setStatus({
          type: "ok",
          msg: "Opened your email app to send the request.",
        });
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        setStatus({
          type: "err",
          msg: "Could not send right now. Please try again or email us directly.",
        });
        return;
      }

      setStatus({ type: "ok", msg: "Sent. We’ll reply with options shortly." });
      setValues((v) => ({ ...v, message: "" }));
    } catch {
      setStatus({
        type: "err",
        msg: "Network error. Please try again in a moment.",
      });
    }
  }

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-32 px-6 pb-24 pt-32"
    >
      <Reveal>
        <p className="text-xs tracking-[0.25em] text-[var(--muted)]">CONTACT</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          Request pricing or partnerships.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
          If you have any requirements please let us know or fill out this form.
          We’ll reply with options and next steps.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="glass overflow-hidden rounded-3xl">
            <Image
              src="/assets/business-card.jpeg"
              alt="Business card"
              width={920}
              height={640}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-6 grid gap-4">
            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">Email</div>
              <div className="mt-1 text-sm text-[var(--muted)]">
                ghanshyammodi007@gmail.com • rupeshvmodi@gmail.com
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <div className="text-sm font-semibold">Website</div>
              <a
                className="mt-1 inline-flex text-sm text-[var(--accent2)] hover:underline"
                href="https://www.sadityakumar.com"
                target="_blank"
                rel="noreferrer"
              >
                sadityakumar.com
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="glass rounded-3xl p-7"
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Name"
                value={values.name}
                onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                error={errors.name?.[0]}
              />
              <Field
                label="Company (optional)"
                value={values.company ?? ""}
                onChange={(v) => setValues((s) => ({ ...s, company: v }))}
                error={errors.company?.[0]}
              />
              <Field
                label="Email"
                value={values.email}
                onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                error={errors.email?.[0]}
                type="email"
              />
              <Field
                label="Phone (optional)"
                value={values.phone ?? ""}
                onChange={(v) => setValues((s) => ({ ...s, phone: v }))}
                error={errors.phone?.[0]}
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold">Interest</label>
                <select
                  value={values.interest}
                  onChange={(e) =>
                    setValues((s) => ({
                      ...s,
                      interest: e.target.value as ContactValues["interest"],
                    }))
                  }
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[rgba(182,139,91,0.6)]"
                >
                  <option>Diamonds</option>
                  <option>Light Brown Diamonds</option>
                  <option>AI Solutions</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold">Message</label>
                <textarea
                  value={values.message}
                  onChange={(e) =>
                    setValues((s) => ({ ...s, message: e.target.value }))
                  }
                  rows={6}
                className={[
                    "mt-2 w-full resize-none rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[rgba(182,139,91,0.6)]",
                    errors.message?.[0] ? "border-red-400/60" : "border-white/10",
                  ].join(" ")}
                  placeholder="Tell us what size / tone / quantities you need (or describe your AI goal)."
                />
                {errors.message?.[0] ? (
                  <div className="mt-1 text-xs text-red-300">
                    {errors.message[0]}
                  </div>
                ) : null}
              </div>

              {/* Honeypot (hidden) — simple anti-spam measure */}
              <input
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                value={values.website ?? ""}
                onChange={(e) =>
                  setValues((s) => ({ ...s, website: e.target.value }))
                }
              />
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.type === "loading" ? "Sending..." : "Send request"}
              </button>

              <div className="text-sm text-[var(--muted)]">
                {status.type === "ok" ? (
                  <span className="text-[var(--accent2)]">{status.msg}</span>
                ) : status.type === "err" ? (
                  <span className="text-red-300">{status.msg}</span>
                ) : (
                  "We usually reply within 24 hours."
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "mt-2 w-full rounded-2xl border bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[rgba(182,139,91,0.6)]",
          error ? "border-red-400/60" : "border-white/10",
        ].join(" ")}
      />
      {error ? <div className="mt-1 text-xs text-red-300">{error}</div> : null}
    </div>
  );
}
