# ForRaise Technologies — Website

Single-page marketing site for **ForRaise Technologies**, an AI Forward Deployed Engineering company building AI Operating Systems for businesses.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui components (`Button`, `GooeyText`, `AnimatedGroup`)

## Features

- Palantir-inspired dark UI with blue accents
- Animated loading screen (`FOR` → `RAISE` → `TECHNOLOGIES`)
- Responsive sections: Hero, About, Project Indus, Product, Founders, Contact
- Content driven from `src/content/siteContent.ts`
- Vercel-ready deployment config

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no env vars required

Build settings (also in `vercel.json`):

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 20+ |

## Project structure

```
src/
  components/     # Page sections + UI primitives
  content/        # All site copy (edit here)
  hooks/          # Scroll spy, etc.
public/
  images/         # Static assets (hero image: forr.png)
```

## Customization

- **Copy:** `src/content/siteContent.ts`
- **Hero image:** replace `public/images/forr.png`
- **Loading timing:** `loading` block in `siteContent.ts`

## License

Private — ForRaise Technologies.
