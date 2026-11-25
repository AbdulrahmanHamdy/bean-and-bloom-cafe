# ☕ Bean & Bloom Café

**Artisan Coffee & Confectionery — Zamalek, Cairo, Egypt**

A modern, fully animated front-end café website built with React + Vite + TypeScript + Tailwind CSS v4 + Three.js + Framer Motion.

---

## ✨ Features

- **3D Leaning Cup Hero** — Photorealistic WebGL cup with realistic leaning pose, coffee-bean physics animation (beans fly in, hit cup, bounce, settle), and scroll-driven zoom + bean dispersal
- **Interactive Splash Screen** — Cinematic 3D cup intro with steam particles and curtain exit
- **3D Menu Carousel** — Spotlight-stage showcase with S/M/L size selector & dynamic EGP pricing
- **Smooth Scroll Reveals** — Word-by-word tagline illumination, Framer Motion parallax throughout
- **Reservations** — Table booking form with instant confirmation UI
- **Gallery** — Filterable photo grid with full-screen lightbox
- **Google Maps embed** — Live map on Contact page
- **Responsive** — Mobile-first across all pages

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS v4 |
| 3D | Three.js (raw WebGL, no R3F) |
| Animation | Framer Motion 14 |
| Forms | React Hook Form 7 |
| Icons | Phosphor Icons |
| Routing | React Router DOM v6 |

## 🚀 Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## 🌐 Deploy on Vercel

This repo is Vercel-ready. Just import it on [vercel.com](https://vercel.com) — the `vercel.json` handles SPA routing rewrites and asset caching automatically.

```
Build Command:   npm run build
Output Dir:      dist
Install Command: npm install
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Cup3DCanvas.tsx      # Three.js 3D cup with physics beans
│   ├── SplashScreen.tsx     # Animated intro screen
│   ├── MenuCarousel3D.tsx   # 3D spotlight menu carousel
│   ├── Header.tsx           # Sticky floating pill nav
│   └── Footer.tsx           # Dark roast footer
├── pages/
│   ├── Home.tsx             # Hero + tagline + carousel + CTAs
│   ├── Menu.tsx             # Full menu page
│   ├── About.tsx            # Story & values
│   ├── Reservations.tsx     # Table booking
│   ├── Gallery.tsx          # Photo gallery + lightbox
│   └── Contact.tsx          # Map + contact form
├── data/menu.ts             # Menu items, pricing, café info
└── types/index.ts           # Shared TypeScript types
```

---

**Bean & Bloom Café** · Zamalek, Cairo · Est. 2026
