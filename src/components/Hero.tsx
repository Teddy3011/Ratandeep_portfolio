"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { AnimatedHeadline, LocalTime, Magnetic, useReduce } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);

  return (
    <section ref={ref} id="top" className="relative min-h-svh overflow-hidden px-4 pb-28 pt-28 md:px-8 md:pt-32">
      <div className="grid-lines pointer-events-none absolute inset-0 text-ink" aria-hidden />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-12 gap-x-4 gap-y-10">
        {/* Headline block, deliberately off-centre */}
        <div className="col-span-12 lg:col-span-8">
          <p className="label mb-6 flex items-center gap-3">
            <span className="h-2 w-2 bg-red" aria-hidden />
            {hero.label}
          </p>
          <AnimatedHeadline
            as="h1"
            lines={hero.headline}
            delay={0.2}
            className="font-display text-[clamp(2.6rem,7.2vw,8rem)] font-bold leading-[0.9] tracking-[-0.045em]"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:ml-[12%] md:text-xl"
          >
            {hero.support}
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-4 md:ml-[12%]">
            <Magnetic>
              <a href="#projects" className="label inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-light transition-colors hover:bg-blue">
                Explore the work <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            <a href="#about" className="label inline-flex min-h-12 items-center border-b border-ink px-1 hover:text-blue">
              About the journey
            </a>
          </div>
        </div>

        {/* Portrait with parallax and taped annotations */}
        <div className="relative col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:mt-24">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#e4e1d6]">
            <motion.div style={{ y }} className="absolute inset-[-10%_0]">
              <Image
                src={asset(site.portrait)}
                alt={`Portrait of ${site.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 30vw"
                className="object-cover grayscale contrast-110"
              />
            </motion.div>
            <div className="absolute inset-0 bg-blue mix-blend-screen opacity-25" aria-hidden />
          </div>
          <p className="label absolute -left-3 top-6 -rotate-3 bg-paper px-3 py-2 shadow-sm md:-left-10">Based in {site.location}</p>
          <p className="label absolute -right-2 bottom-24 rotate-2 bg-blue px-3 py-2 text-light">{site.availability}</p>
          <p className="label mt-3 flex justify-between text-muted">
            <span>Fig. 01 — the engineer</span>
            <LocalTime />
          </p>
        </div>
      </div>

      <a href="#about" className="label absolute bottom-6 left-4 flex items-center gap-3 md:left-8" aria-label="Scroll to explore">
        <span className="relative block h-10 w-px overflow-hidden bg-ink/20" aria-hidden>
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-ink"
            animate={reduce ? undefined : { y: [-16, 40] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          />
        </span>
        Scroll to explore
      </a>
    </section>
  );
}
