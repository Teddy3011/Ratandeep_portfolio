"use client";

// "Places I've got my hands dirty" (experience) and the chapter timeline.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, timeline } from "@/content/site";
import { AnimatedHeadline, Media, Reveal, SectionLabel } from "./ui";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section aria-labelledby="exp-title" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4">
          <SectionLabel n="04">Experience</SectionLabel>
          <h2 id="exp-title" className="mt-6 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.04em] md:sticky md:top-28">
            PLACES I'VE GOT MY HANDS DIRTY.
          </h2>
        </div>

        <ol className="col-span-12 border-t border-ink md:col-span-8">
          {experience.map((e, i) => {
            const isOpen = open === i;
            return (
              <li
                key={e.role}
                className="border-b border-ink/20"
                onPointerEnter={(ev) => ev.pointerType === "mouse" && setOpen(i)}
              >
                <h3>
                  <button
                    className="grid w-full grid-cols-12 items-baseline gap-3 py-6 text-left transition-colors hover:text-blue"
                    aria-expanded={isOpen}
                    aria-controls={`exp-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="label col-span-12 text-muted sm:col-span-2">{e.years}</span>
                    <span className="col-span-10 font-display text-2xl font-bold tracking-tight sm:col-span-6 md:text-3xl">{e.role}</span>
                    <span className="label col-span-10 text-muted sm:col-span-3">{e.org}</span>
                    <span className="col-span-2 text-right font-mono text-xl sm:col-span-1" aria-hidden>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-3 pb-8">
                        <div className="col-span-12 sm:col-span-10 sm:col-start-3">
                          <p className="text-lg">{e.summary}</p>
                          <ul className="mt-4 space-y-2 text-muted">
                            {e.details.map((d) => (
                              <li key={d} className="flex gap-3">
                                <span className="text-blue" aria-hidden>→</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                          {e.achievement && <p className="label mt-5 inline-block bg-blue px-3 py-2 text-light">{e.achievement}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
const tones = ["blue", "paper", "ink", "red", "paper", "blue"] as const;

export function Timeline() {
  return (
    <section id="timeline" aria-labelledby="timeline-title" className="bg-[#e9e6dc] px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="05">Timeline</SectionLabel>
        <AnimatedHeadline
          lines={["AN HONEST TIMELINE OF", "FIGURING THINGS OUT."]}
          className="mt-6 max-w-5xl font-display text-[clamp(2.2rem,5.5vw,5rem)] font-bold leading-[0.92] tracking-[-0.04em]"
        />
        <span id="timeline-title" className="sr-only">
          Personal timeline
        </span>

        <ol className="mt-20 space-y-24 md:space-y-32">
          {timeline.map((c, i) => (
            <li key={c.n} className="grid grid-cols-12 gap-4">
              {/* Sticky chapter label on desktop */}
              <div className="col-span-12 md:col-span-3">
                <div className="md:sticky md:top-28">
                  <p className="font-display text-6xl font-bold tracking-tight text-blue md:text-8xl">{c.n}</p>
                  <p className="label mt-2">{c.date}</p>
                </div>
              </div>

              <Reveal className={`col-span-12 md:col-span-4 ${i % 2 ? "md:order-3 md:col-span-4" : ""}`}>
                <figure className={`relative mx-auto w-64 bg-white p-3 pb-16 shadow-[0_12px_30px_rgba(0,0,0,0.12)] md:w-full md:max-w-xs ${tilts[i % tilts.length]}`}>
                  <Media src={c.image} alt={`Photo for chapter ${c.n}: ${c.title}`} tone={tones[i % tones.length]} className="aspect-square" />
                  <figcaption className="scribble absolute bottom-3 left-4 right-4 text-sm text-ink/80">{c.note}</figcaption>
                  <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 bg-[#f7e9a8]/80" aria-hidden />
                </figure>
              </Reveal>

              <Reveal className={`col-span-12 self-center md:col-span-5 ${i % 2 ? "md:order-2" : ""}`} delay={0.1}>
                <h3 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{c.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{c.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
