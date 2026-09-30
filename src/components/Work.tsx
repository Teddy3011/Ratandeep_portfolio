"use client";

// Project archive, the "pit lane" featured case study, and the after-hours lab gallery.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { caseStudy, lab, projects } from "@/content/site";
import { AnimatedHeadline, Magnetic, Media, SectionLabel, useReduce } from "./ui";

const layout = [
  { col: "md:col-span-7", ratio: "aspect-[4/5] md:aspect-[5/4]" },
  { col: "md:col-span-5 md:mt-40", ratio: "aspect-[4/5]" },
  { col: "md:col-span-4", ratio: "aspect-square" },
  { col: "md:col-span-4 md:mt-24", ratio: "aspect-[3/4]" },
  { col: "md:col-span-4 md:-mt-12", ratio: "aspect-square" },
];
const tones = ["blue", "ink", "paper", "red", "ink"] as const;

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel n="06">Projects</SectionLabel>
            <AnimatedHeadline
              lines={["A FEW THINGS THAT", "ESCAPED THE CAD FILE."]}
              className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em]"
            />
            <span id="projects-title" className="sr-only">
              Projects
            </span>
          </div>
          <p className="label text-muted">{String(projects.length).padStart(2, "0")} entries</p>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
          {projects.map((p, i) => {
            const card = (
              <>
                <div className={`relative overflow-hidden ${layout[i % layout.length].ratio}`}>
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Media src={p.image} alt={`${p.title} — ${p.category}`} tone={tones[i % tones.length]} className="h-full w-full" />
                  </div>
                  <div className="absolute inset-0 bg-blue opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" aria-hidden />
                  <span className="label absolute left-3 top-3 bg-paper px-2 py-1 text-ink">{p.n}</span>
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink pt-3">
                  <h3 className="font-display text-2xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {p.title}
                  </h3>
                  <span className="label shrink-0 text-muted">{p.year}</span>
                </div>
                <p className="label mt-2 text-blue">{p.category}</p>
                <p className="mt-2 max-w-md text-muted">{p.outcome}</p>
              </>
            );
            return (
              <li key={p.n} className={layout[i % layout.length].col}>
                {p.featured ? (
                  <a href="#pit-lane" className="group block" data-cursor="View project">
                    {card}
                  </a>
                ) : (
                  <div className="group" data-cursor="Case study soon">
                    {card}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Rotating "arrival board" text line. */
function Board({ lines }: { lines: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReduce();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % lines.length), 2600);
    return () => clearInterval(id);
  }, [lines.length, reduce]);
  return (
    <div className="relative h-8 overflow-hidden font-mono text-lg text-[#ffb400] md:text-2xl" aria-live="off">
      <AnimatePresence mode="popLayout">
        <motion.p key={i} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.45 }}>
          {lines[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/** Race-track style route map: stations are the build phases. */
function TrackMap({ stations }: { stations: string[] }) {
  const w = 1000;
  const pts = stations.map((_, i) => {
    const x = 60 + (i * (w - 120)) / (stations.length - 1);
    const y = i % 2 ? 70 : 150;
    return [x, y] as const;
  });
  const path = pts.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} 220`} className="w-full" role="img" aria-label={`Build route: ${stations.join(", ")}`}>
      <path d={path} fill="none" stroke="#2457ff" strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" />
      <path d={path} fill="none" stroke="#f6f4ed" strokeWidth="2" strokeDasharray="10 10" />
      {pts.map(([x, y], i) => (
        <g key={stations[i]}>
          <circle cx={x} cy={y} r="13" fill="#f6f4ed" stroke="#101010" strokeWidth="4" />
          <text x={x} y={i % 2 ? y - 28 : y + 40} textAnchor="middle" fontSize="18" fontFamily="var(--font-plex-mono)" fill="currentColor">
            {String(i + 1).padStart(2, "0")} {stations[i].toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function CaseStudy() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  return (
    <section id="pit-lane" aria-labelledby="pit-title" className="bg-night px-4 py-28 text-light md:px-8 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-light/20 pb-4">
          <SectionLabel n="07">{caseStudy.kicker}</SectionLabel>
          <p className="label text-light/50">33.4255° N, 111.9400° W — TEMPE</p>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <p className="label inline-block bg-[#ffb400] px-2 py-1 text-ink">Pit lane · Garage 01</p>
            <h2 id="pit-title" className="mt-6 font-display text-[clamp(2.6rem,8vw,8rem)] font-bold leading-[0.85] tracking-[-0.05em]">
              {caseStudy.title}
            </h2>
            <p className="mt-4 font-display text-2xl text-light/70">{caseStudy.subtitle}</p>
          </div>
          <div className="col-span-12 self-end border border-light/20 p-5 lg:col-span-4">
            <p className="label mb-3 text-light/50">Garage display</p>
            <Board lines={caseStudy.board} />
          </div>
        </div>

        <div className="mt-14 overflow-x-auto text-light/80">
          <div className="min-w-[720px]">
            <TrackMap stations={caseStudy.stations} />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="label max-w-md text-[#ffb400]">⚠ {caseStudy.caution}</p>
          <Magnetic>
            <button onClick={show} className="label min-h-14 bg-[#ffb400] px-8 text-base text-ink transition-colors hover:bg-light">
              Enter the pit →
            </button>
          </Magnetic>
        </div>
      </div>

      <dialog
        ref={dialog}
        data-lenis-prevent
        onClose={() => setOpen(false)}
        aria-labelledby="case-title"
        className="m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-paper p-0 text-ink backdrop:bg-night/80"
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="min-h-full px-4 pb-24 pt-6 md:px-8"
            >
              <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between border-b border-ink/15 bg-paper/90 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
                <p className="label">Case study — {caseStudy.subtitle}</p>
                <button onClick={() => dialog.current?.close()} className="label min-h-11 px-3 hover:text-blue" autoFocus>
                  Close ✕
                </button>
              </div>

              <div className="mx-auto max-w-[1200px]">
                <h2 id="case-title" className="mt-16 font-display text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[0.88] tracking-[-0.05em]">
                  {caseStudy.subtitle}
                </h2>
                <Media alt="Hero render of the RC car" tone="blue" className="mt-10 aspect-[16/7]" />

                <div className="mt-16 space-y-16">
                  {caseStudy.sections.map((s, i) => (
                    <section key={s.title} className="grid grid-cols-12 gap-4 border-t border-ink pt-4">
                      <p className="label col-span-12 text-blue md:col-span-2">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="col-span-12 font-display text-3xl font-bold tracking-tight md:col-span-4">{s.title}</h3>
                      <p className="col-span-12 text-lg leading-relaxed text-muted md:col-span-6">{s.body}</p>
                      {(i === 3 || i === 4) && (
                        <div className="col-span-12 grid grid-cols-2 gap-4 md:col-span-10 md:col-start-3">
                          <Media alt={`${s.title} image 1`} tone={i === 3 ? "ink" : "blue"} className="aspect-[4/3]" />
                          <Media alt={`${s.title} image 2`} tone="paper" className="aspect-[4/3]" />
                        </div>
                      )}
                    </section>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </section>
  );
}

export function Lab() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const items = lab.items.filter((it) => filter === "All" || it.category === filter);

  return (
    <section aria-labelledby="lab-work-title" className="px-4 py-28 md:px-8 md:py-36" onPointerMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="08">After-hours lab</SectionLabel>
        <h2 id="lab-work-title" className="mt-6 font-display text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          INSOMNIAC WORK.
        </h2>
        <p className="label mt-4 text-muted">
          <span className="hidden [@media(hover:hover)]:inline">Hover around to see what happens.</span>
          <span className="[@media(hover:hover)]:hidden">Swipe through the sketches and renders.</span>
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter lab work">
          {lab.filters.map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`label min-h-11 border px-4 transition-colors ${filter === f ? "border-ink bg-ink text-light" : "border-ink/25 hover:border-ink"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Hover list (precise pointers). Fixed min-height avoids layout shift between filters. */}
        <ul className="mt-10 hidden min-h-[36rem] border-t border-ink [@media(hover:hover)]:block">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((it, i) => (
              <motion.li
                key={it.label}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onPointerEnter={(e) => {
                  setPos({ x: e.clientX, y: e.clientY });
                  setHovered(lab.items.indexOf(it));
                }}
                onPointerLeave={() => setHovered(null)}
                className="flex items-baseline justify-between border-b border-ink/15 py-4 transition-colors hover:text-blue"
              >
                <span className="font-display text-2xl font-medium tracking-tight md:text-4xl">{it.label}</span>
                <span className="label text-muted">
                  {it.category} / {String(i + 1).padStart(2, "0")}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <AnimatePresence>
          {hovered !== null && (
            <motion.div
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-40 hidden w-64 [@media(hover:hover)]:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, x: pos.x + 24, y: pos.y - 120 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Media src={lab.items[hovered].image} alt={lab.items[hovered].label} tone={hovered % 2 ? "red" : "blue"} className="aspect-[4/5] -rotate-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swipe gallery (touch) */}
        <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [@media(hover:hover)]:hidden" aria-label="Lab work gallery">
          {items.map((it, i) => (
            <li key={it.label} className="w-[75vw] max-w-xs shrink-0 snap-start">
              <Media src={it.image} alt={it.label} tone={i % 2 ? "red" : "blue"} className="aspect-[4/5]" />
              <p className="mt-3 font-display text-xl font-medium">{it.label}</p>
              <p className="label text-muted">{it.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
