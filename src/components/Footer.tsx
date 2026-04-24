/* Footer: quick trust recap + simple close so the page ends strong. */
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10">
              <Image
                src="/assets/business-card.jpeg"
                alt="S. Adityakumar & Co."
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-[family-name:var(--font-display)]">
                S. Adityakumar & Co.
              </div>
              <div className="text-sm text-[var(--muted)]">
                Diamonds • Light Brown specialists
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">
            Built for trust: clear communication, consistent supply, and fast
            logistics across BKC, Surat, Toronto, and Dallas.
          </p>
        </div>

        <div className="md:col-span-3">
          <div className="text-sm font-semibold">Offices</div>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>BKC, Mumbai</li>
            <li>Surat Diamond Bourse</li>
            <li>Toronto</li>
            <li>Dallas</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-sm font-semibold">Contact</div>
          <div className="mt-3 text-sm text-[var(--muted)]">
            ghanshyammodi007@gmail.com
            <br />
            rupeshvmodi@gmail.com
          </div>
          <a
            className="mt-3 inline-flex text-sm font-semibold text-[var(--accent2)] hover:underline"
            href="#contact"
          >
            Send a request →
          </a>
        </div>
      </div>
      <div className="px-6 pb-10 text-center text-xs text-white/35">
        © {new Date().getFullYear()} S. Adityakumar & Co. All rights reserved.
      </div>
    </footer>
  );
}
