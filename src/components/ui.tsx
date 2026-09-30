"use client";

// Small shared building blocks: animated headline, counter, magnetic wrapper, placeholder, local time.
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { site } from "@/content/site";

const ease = [0.22, 1, 0.36, 1] as const;

/** Reduced-motion preference, reported only after mount so SSR and first client render match. */
export function useReduce() {
  const pref = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!pref;
}

/** Headline revealed line by line through a clipping mask. The heading itself triggers the reveal. */
export function AnimatedHeadline({
  lines,
  as = "h2",
  className = "",
  delay = 0,
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: 0.12, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade-and-rise for supporting content. Used sparingly. */
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReduce();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up when it scrolls into view. Keeps the target's decimal places. */
export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReduce();
  const decimals = (String(value).split(".")[1] || "").length;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return setShown(value);
    const controls = animate(0, value, { duration: 1.6, ease, onUpdate: setShown });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden>
        {shown.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

/** Pulls its child slightly toward the pointer (precise pointers only). */
export function Magnetic({ children, strength = 0.3 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduce = useReduce();

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
  }

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      onPointerMove={onMove}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: "spring", stiffness: 220, damping: 16, mass: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

/** Real image if a path is given, otherwise a clearly-marked poster-style placeholder. */
export function Media({
  src,
  alt,
  className = "",
  tone = "blue",
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src?: string;
  alt: string;
  className?: string;
  tone?: "blue" | "red" | "ink" | "paper";
  sizes?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={asset(src)} alt={alt} fill sizes={sizes} className="object-cover" loading="lazy" />
      </div>
    );
  }
  const tones = {
    blue: "bg-blue text-light",
    red: "bg-red text-light",
    ink: "bg-night text-light",
    paper: "bg-[#e4e1d6] text-ink",
  };
  return (
    <div role="img" aria-label={`Placeholder image: ${alt}`} className={`relative overflow-hidden ${tones[tone]} ${className}`}>
      <svg className="absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <defs>
          <pattern id={`hatch-${tone}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#hatch-${tone})`} />
        <circle cx="50%" cy="50%" r="22%" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" />
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className="label absolute bottom-3 left-3 right-3">Placeholder — {alt}</span>
    </div>
  );
}

/** Live clock in the site's time zone. Renders dashes on the server to avoid hydration mismatch. */
export function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", timeZone: site.timeZone, hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return <span className={className}>{time} MST</span>;
}

export function SectionLabel({ n, children, className = "" }: { n: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-3 ${className}`}>
      <span className="opacity-60">{n}</span>
      <span className="h-px w-10 bg-current opacity-40" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
