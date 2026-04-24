/* This file sets global HTML layout + fonts so every page shares the same premium look. */
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S. Adityakumar & Co. — Light Brown Diamond Specialists",
  description:
    "Diamonds manufacturers, exporters & importers — 30+ years in business. Offices: BKC Mumbai, Surat Diamond Bourse, Toronto, Dallas.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "S. Adityakumar & Co.",
    description:
      "All sizes. Specializing in Light Brown diamonds. 30+ years in business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        {/* Body wrapper keeps a consistent background across all sections */}
        {children}
      </body>
    </html>
  );
}
