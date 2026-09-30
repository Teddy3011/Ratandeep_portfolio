# Ratandeep Reddy — Portfolio

Single-page portfolio built with Next.js (static export), Tailwind CSS, Framer Motion and Lenis.

## Edit content

Everything you'd want to change — bio, metrics, experience, timeline, projects, case study, lab gallery, links — lives in
[`src/content/site.ts`](src/content/site.ts).

To add a photo, put it in `public/` (e.g. `public/projects/rc-car.webp`) and set the item's `image` to `/projects/rc-car.webp`.
Items without an image show a labelled placeholder.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the static site and publishes it to GitHub Pages.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
