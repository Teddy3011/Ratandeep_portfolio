"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

const links = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 transition-all duration-500 ${
          scrolled ? "border border-ink/10 bg-paper/75 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md" : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {site.name.split(" ")[0].toLowerCase()}
          <span className="text-blue">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="label relative py-1" aria-current={active === l.href ? "location" : undefined}>
                {l.label}
                {active === l.href && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-0 h-px w-full bg-blue" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <p className="label hidden items-center gap-2 lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2bd96b] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2bd96b]" />
          </span>
          {site.availability}
        </p>

        <button
          className="label min-h-11 px-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 border border-ink/10 bg-paper p-6 md:hidden"
          >
            <ul className="space-y-2">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-11 items-baseline gap-3 font-display text-4xl font-bold">
                    <span className="label text-muted">0{i + 1}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="label mt-6 text-muted">{site.availability}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
