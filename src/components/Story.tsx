"use client";

// About statement, metrics lab, and the pinned philosophy section.
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { metrics, philosophy, site, statement } from "@/content/site";
import { AnimatedHeadline, Counter, SectionLabel, useReduce } from "./ui";

/** One phrase that brightens as the reader scrolls past it. */
function Phrase({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return <motion.span style={{ opacity }}>{text} </motion.span>;
}

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });

  return (
    <section id="about" className="px-4 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-4">
        <SectionLabel n="01" className="col-span-12 mb-10 md:col-span-3">
          Who's this?
        </SectionLabel>

        <figure className="col-span-12 md:col-span-9">
          <span className="block font-display text-[8rem] leading-[0.6] text-blue md:text-[12rem]" aria-hidden>
            “
          </span>
          <AnimatedHeadline
            as="h2"
            lines={[statement.quote]}
            className="max-w-5xl font-display text-[clamp(1.8rem,4.2vw,4rem)] font-medium leading-[1.05] tracking-[-0.03em]"
          />
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="scribble -rotate-2 text-2xl text-blue">{site.name.split(" ")[0]}</span>
            <span className="label text-muted">— notes from the test bench</span>
          </figcaption>
        </figure>

        <div ref={ref} className="col-span-12 mt-20 md:col-span-7 md:col-start-5">
          <p className="text-2xl leading-snug tracking-tight md:text-3xl">
            {statement.intro.map((t, i, all) =>
              reduce ? (
                <span key={i}>{t} </span>
              ) : (
                <Phrase key={i} text={t} progress={scrollYProgress} range={[i / all.length, (i + 1) / all.length]} />
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  // Asymmetric placement: each stat gets its own column span and offset.
  const layout = [
    "md:col-span-7 text-[clamp(5rem,16vw,15rem)]",
    "md:col-span-5 md:mt-24 text-[clamp(4rem,10vw,9rem)]",
    "md:col-span-4 md:col-start-2 text-[clamp(4rem,10vw,9rem)]",
    "md:col-span-4 md:mt-16 text-[clamp(4rem,10vw,9rem)] text-blue",
    "md:col-span-3 md:mt-40 text-[clamp(3rem,7vw,6rem)]",
  ];
  return (
    <section aria-labelledby="lab-title" className="relative border-y border-ink/15 px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="02">Test bench</SectionLabel>
            <AnimatedHeadline
              lines={["ONE PROTOTYPE", "LED TO THE NEXT."]}
              className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
            />
            <span id="lab-title" className="sr-only">
              Impact in numbers
            </span>
          </div>
          <p className="label max-w-xs text-muted">{metrics.lead}</p>
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-12">
          {metrics.items.map((m, i) => (
            <div key={m.label} className={`border-t border-ink pt-3 ${layout[i % layout.length]}`}>
              <dt className="label text-ink">{m.label}</dt>
              <dd className="font-display font-bold leading-[0.85] tracking-[-0.06em]">
                <Counter value={m.value} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

const principleArt = [
  // Model it: wireframe circles
  <svg key="a" viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
    {[90, 70, 50, 30].map((r) => (
      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
    ))}
    <line x1="0" y1="100" x2="200" y2="100" stroke="currentColor" strokeWidth="0.5" />
    <line x1="100" y1="0" x2="100" y2="200" stroke="currentColor" strokeWidth="0.5" />
  </svg>,
  // Build it: stacked blocks
  <svg key="b" viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={30 + i * 12} y={150 - i * 36} width={140 - i * 24} height="30" fill={i === 3 ? "#2457ff" : "none"} stroke="currentColor" />
    ))}
  </svg>,
  // Break it: fracture line
  <svg key="c" viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
    <rect x="20" y="80" width="160" height="40" fill="none" stroke="currentColor" />
    <polyline points="100,70 92,95 108,105 96,130" fill="none" stroke="#ff3d2e" strokeWidth="3" />
    <path d="M20 60 L20 40 M180 60 L180 40 M20 50 L180 50" stroke="currentColor" strokeWidth="0.6" />
    <text x="100" y="44" fill="currentColor" fontSize="9" textAnchor="middle" fontFamily="monospace">F = MAX</text>
  </svg>,
];

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-66.666%"]);
  const pinned = !reduce;

  const panels = philosophy.principles.map((p, i) => (
    <article key={p.n} className={`flex w-full shrink-0 flex-col justify-center gap-8 px-4 py-16 md:flex-row md:items-center md:gap-16 md:px-16 ${pinned ? "md:w-screen" : ""}`}>
      <div className={`aspect-square w-48 shrink-0 text-light/70 md:w-[30vw] md:max-w-md ${i === 1 ? "md:order-2" : ""}`}>{principleArt[i]}</div>
      <div className="max-w-xl">
        <p className="label text-blue">{p.n} / 03</p>
        <h3 className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em]">{p.title}.</h3>
        <p className="mt-6 text-lg leading-relaxed text-light/70">{p.body}</p>
      </div>
    </article>
  ));

  return (
    <section ref={ref} aria-labelledby="philosophy-title" className={`relative bg-night text-light ${pinned ? "md:h-[300vh]" : ""}`}>
      <div className={`px-4 pt-24 md:px-8 md:pt-28 ${pinned ? "md:absolute md:inset-x-0 md:top-0 md:z-10" : ""}`}>
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel n="03">Core philosophy</SectionLabel>
          <h2 id="philosophy-title" className="mt-4 font-display text-[clamp(2.4rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
            {philosophy.statement}
          </h2>
          <p className="mt-4 max-w-xl text-light/60">{philosophy.support}</p>
        </div>
      </div>

      {/* Desktop: pinned horizontal scroll. Mobile / reduced motion: plain stack. */}
      <div className={pinned ? "md:sticky md:top-0 md:flex md:h-screen md:items-end md:overflow-hidden md:pb-8" : ""}>
        <motion.div style={{ x: pinned ? x : 0 }} className={`flex flex-col ${pinned ? "md:h-[62vh] md:flex-row" : ""}`}>
          {panels}
        </motion.div>
      </div>
    </section>
  );
}

