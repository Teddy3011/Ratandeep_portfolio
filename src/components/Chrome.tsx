"use client";

// Page-level behaviour: smooth scroll, preloader, custom cursor, scroll progress.
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { site } from "@/content/site";

/** Framer skips transform animations for visitors who prefer reduced motion. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ anchors: { offset: -64 }, lerp: 0.1 });
    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  return null;
}

/** Counts 0→100 once per session (~1.3s), then wipes up to reveal the hero. */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloaded") === "1";
      sessionStorage.setItem("preloaded", "1");
    } catch {}
    if (seen || matchMedia("(prefers-reduced-motion: reduce)").matches) return setDone(true);

    const start = performance.now();
    let id = requestAnimationFrame(function step(now) {
      const p = Math.min(1, (now - start) / 1100);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(step);
      else setTimeout(() => setDone(true), 180);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader fixed inset-0 z-[70] flex flex-col justify-between bg-night p-6 text-light md:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <p className="label">{site.fullName}</p>
          <div>
            <div className="flex items-end justify-between">
              <span className="font-display text-7xl font-bold tracking-tight md:text-9xl">{site.initials}.</span>
              <span className="font-mono text-5xl tabular-nums md:text-7xl">{count}</span>
            </div>
            <div className="mt-4 h-px bg-light/20">
              <div className="h-px bg-blue" style={{ width: `${count}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Dot + ring cursor; shows a text label over elements with data-cursor="...". */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setLabel(t.closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "");
      setHover(!!t.closest("a, button, [role=button]"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const big = !!label;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-blue text-light mix-blend-normal"
      animate={{
        x: pos.x - (big ? 48 : hover ? 20 : 6),
        y: pos.y - (big ? 48 : hover ? 20 : 6),
        width: big ? 96 : hover ? 40 : 12,
        height: big ? 96 : hover ? 40 : 12,
        opacity: hover && !big ? 0.35 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.3 }}
    >
      {big && <span className="label px-2 text-center text-[0.6rem] leading-tight">{label}</span>}
    </motion.div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-left bg-blue" style={{ scaleX }} />;
}
