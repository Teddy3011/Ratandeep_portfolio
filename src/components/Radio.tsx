"use client";

/**
 * Floating retro radio: a waveform button in the corner that opens a dial-style player for the
 * playlist in site.ts. With radio.autoplay on, it starts on load (or on the first interaction, if the browser blocks sound).
 * Waveform button adapted from Skiper UI "Skiper 25 Micro Interactions_005" by @gurvinder-singh02
 * (https://gxuri.me) — attribution required (credited in the footer).
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { radio } from "@/content/site";
import { asset } from "@/lib/asset";

const BARS = 5;
const MIN = 88;
const MAX = 108;
const randomHeights = () => Array.from({ length: BARS }, () => Math.random() * 0.8 + 0.2);
const pct = (freq: number) => ((freq - MIN) / (MAX - MIN)) * 100;

function Waveform({ playing, className = "" }: { playing: boolean; className?: string }) {
  const [heights, setHeights] = useState<number[]>(Array(BARS).fill(0.1));
  useEffect(() => {
    if (!playing || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeights(Array(BARS).fill(playing ? 0.6 : 0.1));
      return;
    }
    const id = setInterval(() => setHeights(randomHeights()), 100);
    return () => clearInterval(id);
  }, [playing]);

  return (
    <span className={`flex h-[18px] items-center gap-1 ${className}`} aria-hidden>
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-px rounded-full bg-current"
          initial={{ height: 1 }}
          animate={{ height: Math.max(4, h * 14) }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      ))}
    </span>
  );
}

export default function Radio() {
  const audio = useRef<HTMLAudioElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stations = radio.stations;
  const station = stations[index];

  // Start playing as soon as the site opens. Browsers block sound until the visitor interacts,
  // so if that's refused, start on their first click / tap / key press instead.
  useEffect(() => {
    if (!radio.autoplay) return;
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      audio.current?.play().catch(() => {});
    };
    audio.current?.play().catch(() => events.forEach((e) => window.addEventListener(e, start, { once: true })));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function play() {
    audio.current?.play().catch(() => setPlaying(false));
  }

  function toggle() {
    if (audio.current?.paused) play();
    else audio.current?.pause();
  }

  /** Tuning to a station always starts it, like turning a real dial. */
  const playAfterTune = useRef(false);
  function tune(i: number) {
    const next = (i + stations.length) % stations.length;
    if (next === index) return play();
    playAfterTune.current = true;
    setIndex(next);
  }

  // Runs once the new station's src is on the <audio> element.
  useEffect(() => {
    if (!playAfterTune.current) return;
    playAfterTune.current = false;
    play();
  }, [index]);

  if (!station) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <audio
        ref={audio}
        src={asset(station.src)}
        preload="none"
        loop={stations.length === 1}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => tune(index + 1)}
      />

      <AnimatePresence>
        {open && (
          <motion.section
            id="radio-panel"
            aria-label={`${radio.name} radio`}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right border border-ink bg-paper p-4 text-ink shadow-[6px_6px_0_#101010]"
          >
            {/* Header: brand + on-air light */}
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold tracking-tight">{radio.name}</p>
              <p className="label flex items-center gap-2 text-[0.6rem]">
                <span className={`h-2 w-2 rounded-full ${playing ? "bg-red shadow-[0_0_8px_#ff3d2e]" : "bg-ink/20"}`} aria-hidden />
                {playing ? "On air" : "Standby"}
              </p>
            </div>

            {/* Display: frequency + now playing */}
            <div className="mt-3 bg-night px-3 py-3 text-[#ffb400]" aria-live="polite">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-3xl tabular-nums tracking-tight">
                  {station.freq.toFixed(1)}
                  <span className="ml-1 text-xs">FM</span>
                </p>
                <Waveform playing={playing} className="text-[#ffb400]" />
              </div>
              <div className="mt-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={index}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="label truncate text-[0.65rem]"
                  >
                    {station.title} — {station.artist}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Tuning dial: tick scale, station markers, red needle */}
            <div className="relative mt-4 h-12 border-b border-ink" role="group" aria-label="Tuning dial">
              <div className="absolute inset-x-0 bottom-0 flex h-3 items-end justify-between" aria-hidden>
                {Array.from({ length: 21 }, (_, i) => (
                  <span key={i} className={`w-px bg-ink ${i % 5 ? "h-1.5 opacity-40" : "h-3"}`} />
                ))}
              </div>
              <div className="label absolute inset-x-0 top-0 flex justify-between text-[0.55rem] text-muted" aria-hidden>
                {[88, 93, 98, 103, 108].map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
              {stations.map((s, i) => (
                <button
                  key={s.src}
                  onClick={() => tune(i)}
                  aria-label={`Tune to ${s.freq.toFixed(1)} FM: ${s.title} by ${s.artist}`}
                  aria-current={i === index ? "true" : undefined}
                  className="absolute bottom-3 h-6 w-6 -translate-x-1/2"
                  style={{ left: `${pct(s.freq)}%` }}
                >
                  <span className={`mx-auto block h-2 w-2 rounded-full ${i === index ? "bg-blue" : "bg-ink/40 hover:bg-blue"}`} />
                </button>
              ))}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 top-3 w-0.5 -translate-x-1/2 bg-red"
                animate={{ left: `${pct(station.freq)}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              />
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <button onClick={() => tune(index - 1)} disabled={stations.length < 2} className="label min-h-11 min-w-11 border border-ink px-3 hover:bg-ink hover:text-light disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink" aria-label="Previous station">
                ◀◀
              </button>
              <button onClick={toggle} className="label min-h-11 flex-1 bg-ink text-light hover:bg-blue" aria-label={playing ? "Pause" : "Play"}>
                {playing ? "❚❚ Pause" : "▶ Play"}
              </button>
              <button onClick={() => tune(index + 1)} disabled={stations.length < 2} className="label min-h-11 min-w-11 border border-ink px-3 hover:bg-ink hover:text-light disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink" aria-label="Next station">
                ▶▶
              </button>
            </div>
            <p className="label mt-3 text-[0.55rem] text-muted">
              {radio.tagline} · {stations.length} station{stations.length === 1 ? "" : "s"}
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Corner button (Skiper UI waveform) opens / closes the radio */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="radio-panel"
        aria-label={open ? "Close radio" : `Open radio${playing ? ` — playing ${station.title}` : ""}`}
        data-cursor={open ? "Close" : "Radio"}
        initial={{ padding: "14px" }}
        whileHover={{ padding: "18px 22px" }}
        whileTap={{ padding: "18px 22px" }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ink text-light shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      >
        <Waveform playing={playing} />
      </motion.button>
    </div>
  );
}
