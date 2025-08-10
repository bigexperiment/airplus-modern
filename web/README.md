AirPlus Nepal — modern web app

## Stack
- Next.js App Router (TypeScript)
- Tailwind (with CSS variables theme)
- Plus Jakarta Sans font
- Framer Motion, Radix Primitives, Lucide icons

## Run locally
```bash
cd web
npm i
npm run dev
# visit http://localhost:3000 (dev server prints actual port)
```

## Content structure
Static content and images are stored under `public/information` so they can be statically served and imported by JSON paths:
- `public/information/home.json`
- `public/information/contact.json`
- `public/information/director.json`
- `public/information/treks/*.json`
- `public/information/assets/*` (images)

## Routes
- `/` Home: hero, activities, featured treks, tours, testimonials, gallery, review CTA
- `/treks` All treks (auto-reads `treks/*.json`)
- `/treks/[slug]` Trek detail (SSG with `generateStaticParams`)
- `/contact` Contact info + representatives
- `/director` Director profile and message

## Design system
- Dark minimal base with subtle noise and glass surfaces
- Accent colors: primary cyan `--primary`, secondary mint `--accent`
- Global utility classes: `section`, `container-px`, `glass`, `bg-noise`

## Editing content
Update JSON in `public/information/*.json`. No rebuild needed during `dev`.

## Build
```bash
cd web
npm run build
```

## Deploy
Any static hosting or Vercel works:
- Set project root to `web/`
- Build command: `npm run build`
- Output directory: `.next`
