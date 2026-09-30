import { Cursor, MotionProvider, Preloader, ScrollProgress, SmoothScroll } from "@/components/Chrome";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { Metrics, Philosophy, Statement } from "@/components/Story";
import { Experience, Timeline } from "@/components/Journey";
import { CaseStudy, Lab, Projects } from "@/components/Work";
import { Contact, Footer, Marquee } from "@/components/Contact";

export default function Home() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <a href="#about" className="label sr-only z-[90] bg-blue p-3 text-light focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Statement />
        <Metrics />
        <Philosophy />
        <Experience />
        <Marquee />
        <Timeline />
        <Projects />
        <CaseStudy />
        <Lab />
        <Marquee dark />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
