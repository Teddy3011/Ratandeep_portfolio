"use client";

/**
 * Floating retro radio: a waveform button in the corner that opens a dial-style player.
 * Stations are Spotify tracks (site.ts), played through Spotify's official embed + iFrame API,
 * so no audio files are hosted here. Spotify's script loads the first time the radio is opened.
 * Waveform button adapted from Skiper UI "Skiper 25 Micro Interactions_005" by @gurvinder-singh02
 * (https://gxuri.me) — attribution required (credited in the footer).
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { radio } from "@/content/site";

const BARS = 5;
const MIN = 88;
const MAX = 108;
const randomHeights = () => Array.from({ length: BARS }, () => Math.random() * 0.8 + 0.2);
const pct = (freq: number) => ((freq - MIN) / (MAX - MIN)) * 100;
const uri = (id: string) => `spotify:track:${id}`;

// Minimal types for https://developer.spotify.com/documentation/embeds/references/iframe-api
type PlaybackUpdate = { data: { isPaused: boolean; position: number; duration: number } };
type Controller = {
  loadUri(uri: string): void;
  play(): void;
  togglePlay(): void;
  addListener(event: "ready", cb: () => void): void;
  addListener(event: "playback_update", cb: (e: PlaybackUpdate) => void): void;
};
type IFrameAPI = {
  createController(el: HTMLElement, opts: { uri: string; width: string; height: number }, cb: (c: Controller) => void): void;
};
declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

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
  const stations = radio.stations;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const playWhenReady = useRef(false);
  const indexRef = useRef(0);
  indexRef.current = index;
  const station = stations[index];

  // Load Spotify's iFrame API the first time the radio opens. Spotify replaces the element it is
  // given with its iframe, so hand it a node React doesn't manage.
  useEffect(() => {
    if (!open || controller.current || !host.current || host.current.childElementCount) return;
    const mount = document.createElement("div");
    host.current.appendChild(mount);

    window.onSpotifyIframeApiReady = (api) => {
      api.createController(mount, { uri: uri(stations[indexRef.current].spotify), width: "100%", height: 80 }, (c) => {
        controller.current = c;
        c.addListener("ready", () => {
          setReady(true);
          if (playWhenReady.current) {
            playWhenReady.current = false;
            c.play();
          }
        });
        c.addListener("playback_update", ({ data }) => {
          setPlaying(!data.isPaused);
          // Like a radio: when a track finishes, move to the next station.
          if (!data.isPaused && data.duration > 0 && data.position >= data.duration - 400) tune(indexRef.current + 1);
        });
      });
    };
    const script = document.createElement("script");
    script.src = "https://open.spotify.com/embed/iframe-api/v1";
    script.async = true;
    document.body.appendChild(script);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Tuning to a station always starts it, like turning a real dial. */
  function tune(i: number) {
    const next = (i + stations.length) % stations.length;
    setIndex(next);
    const c = controller.current;
    if (!c) return;
    playWhenReady.current = true;
    c.loadUri(uri(stations[next].spotify));
  }

  function toggle() {
    if (controller.current) controller.current.togglePlay();
    else playWhenReady.current = true; // player still loading: start as soon as it's ready
  }

  if (!station) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* Kept mounted while closed so the Spotify player (and the music) keeps going. */}
      <motion.section
        id="radio-panel"
        aria-label={`${radio.name} radio`}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={open ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className={`w-[min(20rem,calc(100vw-2rem))] origin-bottom-right border border-ink bg-paper p-4 text-ink shadow-[6px_6px_0_#101010] ${
          open ? "" : "pointer-events-none invisible"
        }`}
      >
        {/* Header: brand + on-air light */}
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-bold tracking-tight">{radio.name}</p>
          <p className="label flex items-center gap-2 text-[0.6rem]">
            <span className={`h-2 w-2 rounded-full ${playing ? "bg-red shadow-[0_0_8px_#ff3d2e]" : "bg-ink/20"}`} aria-hidden />
            {playing ? "On air" : ready ? "Standby" : "Tuning…"}
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
          <p className="label mt-1 truncate text-[0.65rem]">
            {station.title} — {station.artist}
          </p>
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
              key={s.spotify}
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
          <button onClick={() => tune(index - 1)} className="label min-h-11 min-w-11 border border-ink px-3 hover:bg-ink hover:text-light" aria-label="Previous station">
            ◀◀
          </button>
          <button onClick={toggle} className="label min-h-11 flex-1 bg-ink text-light hover:bg-blue" aria-label={playing ? "Pause" : "Play"}>
            {playing ? "❚❚ Pause" : "▶ Play"}
          </button>
          <button onClick={() => tune(index + 1)} className="label min-h-11 min-w-11 border border-ink px-3 hover:bg-ink hover:text-light" aria-label="Next station">
            ▶▶
          </button>
        </div>

        {/* Spotify's player (required to play; also shows the track and a link to open it in Spotify) */}
        <div ref={host} className="mt-3 h-20 overflow-hidden rounded-xl bg-night/5" />

        <p className="label mt-2 flex justify-between text-[0.55rem] text-muted">
          <span>{radio.tagline}</span>
          <span>{stations.length} stations</span>
        </p>
      </motion.section>

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
