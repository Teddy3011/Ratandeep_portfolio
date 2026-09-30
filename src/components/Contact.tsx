"use client";

import { useState } from "react";
import { contact, marquee, site } from "@/content/site";
import { asset } from "@/lib/asset";
import { AnimatedHeadline, LocalTime, Magnetic, SectionLabel } from "./ui";

export function Marquee({ dark = false }: { dark?: boolean }) {
  const row = marquee.map((w) => `${w} — `).join("");
  return (
    <div className={`marquee overflow-hidden border-y py-5 ${dark ? "border-light/15 bg-night text-light" : "border-ink bg-paper"}`}>
      <p className="sr-only">{marquee.join(", ")}</p>
      <div className="marquee-track font-display text-4xl font-bold tracking-tight md:text-6xl" aria-hidden>
        <span className="whitespace-nowrap pr-4">{row}</span>
        <span className="whitespace-nowrap pr-4">{row}</span>
      </div>
    </div>
  );
}

function ContactLink({ href, label, value, download }: { href: string; label: string; value: string; download?: boolean }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      download={download || undefined}
      className="group flex min-h-16 items-center justify-between border-b border-light/20 py-4 transition-colors hover:text-blue"
    >
      <span className="label text-light/50">{label}</span>
      <span className="font-display text-xl tracking-tight md:text-2xl">
        {value} <span className="inline-block transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden>↗</span>
      </span>
    </a>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
  const linkedin = site.socials.find((s) => s.label === "LinkedIn");

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-night px-4 pb-16 pt-28 text-light md:px-8 md:pt-36">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="09">Contact</SectionLabel>
        <AnimatedHeadline
          lines={contact.headline}
          className="mt-6 font-display text-[clamp(3.2rem,12vw,12rem)] font-bold leading-[0.85] tracking-[-0.055em]"
        />
        <span id="contact-title" className="sr-only">
          Contact
        </span>

        <div className="mt-14 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <p className="text-xl leading-relaxed text-light/70">{contact.support}</p>
            <p className="label mt-6 flex items-center gap-2 text-[#2bd96b]">
              <span className="h-2 w-2 rounded-full bg-[#2bd96b]" aria-hidden />
              {site.availability}
            </p>
            <div className="mt-10">
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="label inline-flex min-h-16 items-center bg-blue px-8 text-sm text-light transition-colors hover:bg-light hover:text-ink"
                >
                  {contact.cta}
                </a>
              </Magnetic>
              <p className="label mt-3 text-light/40">Opens your mail app. No forms, no friction.</p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="flex min-h-16 items-center justify-between border-b border-t border-light/20 py-4">
              <span className="label text-light/50">Email</span>
              <button onClick={copy} className="font-display text-xl tracking-tight hover:text-blue md:text-2xl" aria-live="polite">
                {copied ? "Copied ✓" : site.email}
                <span className="sr-only"> — copy email address</span>
              </button>
            </div>
            {linkedin && <ContactLink href={linkedin.href} label="LinkedIn" value="Ratandeep Reddy" />}
            <ContactLink href={asset(site.resume)} label="Résumé" value="Download PDF" download />
            <div className="flex min-h-16 items-center justify-between border-b border-light/20 py-4">
              <span className="label text-light/50">Local time</span>
              <LocalTime className="font-display text-xl md:text-2xl" />
            </div>
          </div>
        </div>

        <p className="scribble mt-24 max-w-2xl -rotate-1 text-2xl text-light/80">{contact.closing}</p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night px-4 pb-8 text-light md:px-8">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 border-t border-light/20 pt-6 md:grid-cols-5">
        <p className="label">
          © {new Date().getFullYear()} {site.fullName}
        </p>
        <p className="label text-light/60">
          {site.location} · <LocalTime />
        </p>
        <ul className="label flex gap-4">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="hover:text-blue" target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="label text-light/60">Designed &amp; built by {site.name.split(" ")[0]} · Still iterating.</p>
        <a href="#top" className="label justify-self-start hover:text-blue md:justify-self-end">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
