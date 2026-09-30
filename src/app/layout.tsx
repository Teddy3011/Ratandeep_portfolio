import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-space-grotesk" });
const body = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://teddy3011.github.io"),
  title: `${site.name} — ${site.role}`,
  description:
    "Mechanical engineering student at Arizona State University. CAD, FEA, prototyping and testing — with an eye on motorsport.",
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: "I design things that move, then break them on purpose.",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${site.portrait}`],
  },
};

export const viewport: Viewport = { themeColor: "#f2f0e9" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="grain font-sans">{children}</body>
    </html>
  );
}
