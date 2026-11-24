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
            <SectionLabel n="07">Projects</SectionLabel>
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
                {p.stats && (
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-ink/20 pt-4">
                    {p.stats.map((st) => (
                      <div key={st.label}>
                        <dd className="font-display text-2xl font-bold tracking-tight text-blue md:text-3xl">{st.value}</dd>
                        <dt className="label mt-1 text-[0.6rem] text-muted">{st.label}</dt>
                      </div>
                    ))}
                  </dl>
                )}
                {p.bullets && (
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-blue" aria-hidden>→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
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

/**
 * Original circuit map in the shape of Monza (layout traced by hand, not the F1 artwork).
 * Turns are the build phases; sectors are design / simulate / build & test.
 */
const SECTORS = [
  { color: "#ff3d2e", label: "SECTOR 1 · DESIGN", at: [300, 535], d: "M 870 488 L 470 490 Q 448 470 440 476 Q 330 505 250 480 Q 200 455 190 380 L 182 270" },
  { color: "#2457ff", label: "SECTOR 2 · SIMULATE", at: [215, 300], d: "M 182 270 Q 180 225 170 215 L 160 212 Q 150 210 140 180 L 120 120 Q 105 70 140 55 L 225 42 Q 240 40 250 60 L 505 340" },
  { color: "#ffb400", label: "SECTOR 3 · BUILD & TEST", at: [690, 356], d: "M 505 340 Q 520 360 545 352 Q 570 345 580 365 Q 590 385 610 382 L 995 386 Q 1020 390 1015 430 Q 1012 480 960 485 L 870 488" },
];
// Turn markers in racing order, with where each label sits.
const TURNS: { at: [number, number]; label: [number, number]; anchor: "start" | "middle" | "end" }[] = [
  { at: [445, 482], label: [445, 455], anchor: "middle" },
  { at: [245, 478], label: [210, 525], anchor: "end" },
  { at: [172, 214], label: [200, 205], anchor: "start" },
  { at: [130, 60], label: [118, 32], anchor: "middle" },
  { at: [545, 352], label: [590, 330], anchor: "start" },
  { at: [1015, 420], label: [1000, 345], anchor: "end" },
  { at: [700, 489], label: [700, 545], anchor: "middle" },
];

function TrackMap({ stations }: { stations: string[] }) {
  const mono = { fontFamily: "var(--font-plex-mono)" };
  return (
    <svg viewBox="0 0 1074 600" className="w-full" role="img" aria-label={`Build circuit: ${stations.join(", ")}`}>
      {/* Track surface */}
      {SECTORS.map((s) => (
        <path key={s.label + "bg"} d={s.d} fill="none" stroke="#f6f4ed" strokeOpacity="0.12" strokeWidth="30" strokeLinejoin="round" strokeLinecap="round" />
      ))}
      {SECTORS.map((s) => (
        <path key={s.label} d={s.d} fill="none" stroke={s.color} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      ))}
      {SECTORS.map((s) => (
        <text key={s.label + "t"} x={s.at[0]} y={s.at[1]} fill={s.color} fontSize="18" fontWeight="600" style={mono}>
          {s.label}
        </text>
      ))}

      {/* Review zones (dashed, alongside the two long straights) */}
      <path d="M 300 95 L 515 330" stroke="#2bd96b" strokeWidth="5" strokeDasharray="2 6" />
      <path d="M 470 520 L 850 520" stroke="#2bd96b" strokeWidth="5" strokeDasharray="2 6" />
      <g style={mono} fontSize="15" fontWeight="600">
        <rect x="300" y="8" width="190" height="52" fill="#2bd96b" />
        <text x="395" y="30" textAnchor="middle" fill="#101010">DESIGN REVIEW</text>
        <text x="395" y="50" textAnchor="middle" fill="#101010">ZONE 1</text>
        <line x1="300" y1="34" x2="232" y2="44" stroke="#2bd96b" strokeWidth="2" />
        <rect x="860" y="530" width="190" height="52" fill="#2bd96b" />
        <text x="955" y="552" textAnchor="middle" fill="#101010">DESIGN REVIEW</text>
        <text x="955" y="572" textAnchor="middle" fill="#101010">ZONE 2</text>
        <line x1="955" y1="530" x2="958" y2="487" stroke="#2bd96b" strokeWidth="2" />
      </g>

      {/* Start / finish */}
      <g transform="translate(880 470)" aria-hidden>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const row = Math.floor(i / 3), col = i % 3;
          return <rect key={i} x={col * 8} y={row * 8} width="8" height="8" fill={(row + col) % 2 ? "#101010" : "#f6f4ed"} />;
        })}
      </g>
      <text x="800" y="465" fill="currentColor" fontSize="14" style={mono} opacity="0.7">«« START / FINISH</text>

      {/* Turns = build phases */}
      {stations.slice(0, TURNS.length).map((name, i) => {
        const t = TURNS[i];
        return (
          <g key={name}>
            <circle cx={t.at[0]} cy={t.at[1]} r="15" fill="#101010" stroke="#f6f4ed" strokeWidth="3" />
            <text x={t.at[0]} y={t.at[1] + 5} textAnchor="middle" fill="#f6f4ed" fontSize="13" fontWeight="700" style={mono}>
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={t.label[0]} y={t.label[1]} textAnchor={t.anchor} fill="currentColor" fontSize="17" style={mono}>
              {name.toUpperCase()}
            </text>
          </g>
        );
      })}

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
          <SectionLabel n="08">{caseStudy.kicker}</SectionLabel>
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
        <SectionLabel n="09">After-hours lab</SectionLabel>
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
