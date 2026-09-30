// Prefix public/ paths with the GitHub Pages basePath (next/image and plain <a> don't add it for us).
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
