/* This is the single-page, scroll-driven portfolio site (hero → story → diamonds → owners → contact). */
import ContactSection from "@/components/ContactSection";
import CursorGlow from "@/components/CursorGlow";
import DiamondShowcase from "@/components/DiamondShowcase";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import Marquee from "@/components/Marquee";
import Owners from "@/components/Owners";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* Background layers are separated so animations stay smooth */}
      <div className="pointer-events-none absolute inset-0 radial-fade" />
      <div className="noise" />
      <CursorGlow />

      <SmoothScroll>
        <TopNav />
        <ScrollProgress />

        <main className="relative">
          <Hero />
          <Marquee />
          <DiamondShowcase />
          <Owners />
          <Locations />
          <ContactSection />
          <Footer />
        </main>
      </SmoothScroll>
    </div>
  );
}
