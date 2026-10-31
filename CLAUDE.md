# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for ARN Skincare (Indonesian brand, `lang="id"`, site `https://arnskincare.id`). Astro 6 + Tailwind CSS v4 (via `@tailwindcss/vite`) + GSAP/ScrollTrigger + Lenis smooth scroll. No test runner, linter, or formatter is configured.

## Commands

```bash
npm run dev       # astro dev (the .claude/launch.json "arn-dev" config uses port 4321)
npm run build     # astro build -> dist/ (also generates sitemap)
npm run preview   # serve the built dist/
```

## Architecture

- `src/pages/index.astro` is the only page: it composes section components in order (Hero, Story, Ritual, Values, Ingredients, Trust, ClosingCTA) inside `layouts/Base.astro`, between `Header` and `Footer`, and loads `scripts/motion.ts`.
- `src/layouts/Base.astro` owns the `<head>`: canonical/OG/Twitter tags and JSON-LD (Organization + WebSite schema). It also runs an inline script that adds the `motion-ok` class to `<html>` unless the user prefers reduced motion.
- `src/data/products.ts` is the single source of product copy (slug, ritual step, tagline, ingredients, benefits, BPOM number, image). Components and the JSON-LD both read from it. Product copy originates from `deskripsi pendek produk.md` (Indonesian source text, including BPOM numbers); `references/` holds design reference images, `products-image/` raw product shots. Neither is imported by the site.
- Images live in `src/assets/` and are imported as `ImageMetadata` for `astro:assets`; the hero video is in `public/video/` (webm + mp4) with the editorial still beneath it as LCP/reduced-motion fallback.
- Design tokens (colors like `greige`, `indigo`, `blush`, `ink`; `font-display` Fraunces, `font-sans` Manrope; `--radius-stage`) are defined in the `@theme` block of `src/styles/global.css`, along with shared component classes (`.stage`, `.eyebrow`, `.ghost`, `.pill`).

### Motion system

All animation is in `src/scripts/motion.ts` and is **attribute-driven**: components mark elements with `data-*` hooks (`data-reveal`, `data-split`/`.line-inner`, `data-words`/`.word`, `data-hero-*`, `data-callout`, `data-float`, `data-parallax`, `data-spin`, `data-count`, `data-hscroll*`, `data-card-img`) and `motion.ts` finds them by selector. When adding or renaming a hook, update both the component and `motion.ts`.

- Everything runs only when `html.motion-ok` is set; initial hidden states for reveals are expected to be styled in CSS under that class, so content stays visible without JS or with reduced motion.
- The Ritual section is a pinned horizontal scroll on `>=768px` only (via `gsap.matchMedia`); mobile falls back to normal layout.
- Hero intro, reveals and float animations deliberately skip each other's elements (`.closest('#top')` filters), so keep hero elements inside `#top`.
