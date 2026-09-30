import type { NextConfig } from "next";

// Static export so the site deploys to GitHub Pages; basePath is set by the Pages workflow.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const config: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root: process.cwd() },
};

export default config;
