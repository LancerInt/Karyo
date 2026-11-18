# Karyo™ — Protection & Delivery for Agricultural Actives

A responsive single-page marketing site for **Karyo™**, a technology platform by **Kriya**.
Built with **React + TypeScript + Vite + Tailwind** and a bespoke, light-led design system.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
node scripts/convert-images.mjs   # regenerate optimised WebP assets from assets/*.png
```

## Design system

- **Palette** — forest green `#082E23`, warm ivory `#F5F3EB`, white, orange accent `#E77928`, pale sage, body ink `#183A2E`. Predominantly light sections; forest green is reserved for the hero, the application banner, and emphasis.
- **Type** — Manrope (headings) + Inter (body). Fluid scale: hero 40→72px, section headings 30→48px, body 17–18px.
- **Imagery** — supplied illustrations used as real assets, converted to responsive WebP (alpha preserved on the two transparent foreground assets):
  - `karyo-hero.webp` — protective sphere on a leaf (full-bleed hero background, with pointer parallax).
  - `karyo-matrix.webp` — open matrix on ivory (Protect chapter supporting art).
  - `karyo-field.webp` — crop field at dawn (application banner, scroll-linked translate).
  - `karyo-microbial.webp` / `karyo-botanical.webp` — transparent foreground layers used in the Combine chapter and the combination explorer.
- **Diagrams** — original labelled SVG schematics (not the raster images) explain the platform in the story, capability, and combination sections.

## Interactions (one custom motion system — React hooks + CSS transforms, no extra framework)

- **Hero** — CSS entrance sequence (image scale 1.04→1, staggered headline lines, copy/buttons), plus restrained desktop pointer parallax on the image only.
- **Protect / Combine / Deliver story** — a ~220vh sticky scroll section on desktop (native scroll, no hijacking); the pinned stage swaps between three SVG+raster states driven by scroll, and the numbered controls also select directly. Collapses to three stacked tap-selectable chapters on mobile and under reduced-motion.
- **Capability explorer** — a numbered list drives a labelled SVG that redraws per selection (keyboard + pointer, roving tabindex).
- **Combination explorer** — three pill controls with a sliding indicator cross-fade two transparent asset compositions; the hybrid adds an SVG connector and shared carrier outline.
- **Global** — thin scroll-progress bar, header transparent→solid, section reveals, gentle floating artwork (paused offscreen), and a fixed **Pause motion** control. `prefers-reduced-motion` exposes all content statically.

## Images

Source PNGs live in `assets/`. `scripts/convert-images.mjs` (uses `sharp`) outputs optimised, responsive WebP into `public/img/` at the intended names plus smaller widths for `srcset`. The hero is preloaded and `fetchpriority="high"`; the matrix and field images are lazy-loaded.

## Accessibility & performance

- One `<h1>`, semantic landmarks, skip link, visible focus states, labelled inputs, descriptive `alt` text.
- Keyboard support: mobile menu (Esc to close), combinations tablist (arrow / Home / End keys).
- Transparent header over the hero switches to a solid, legible background after scrolling; sticky offset keeps anchor headings clear.
- `prefers-reduced-motion` respected; the page is fully readable without animation.
- No horizontal overflow at 360 / 390 / 768 / 1440px.

## Content & claims

All copy is grounded in Kriya's own Karyo page. No performance figures, shelf-life guarantees, patents, certifications, partners, product formats, safety claims, or controlled-release capabilities are invented. Qualifications are kept concise and next to the relevant claim (e.g. the matrix is labelled "Conceptual illustration"; the combinations note reads "Compatibility and performance depend on the selected actives and formulation.").

## Enquiry form

No server endpoint is configured, so the form opens the visitor's email app with the details prefilled to the verified address `info@kriya.ltd`, and the UI says so plainly — it never shows a confirmed-submission success state for the email path. Set `FORM_ENDPOINT` in [`src/components/Contact.tsx`](src/components/Contact.tsx) to enable live POST submission with a real success state.

Verified contact details: `info@kriya.ltd` · +91 63858 48466 · wa.me/916385848466 · privacy: `kriya.ltd/policies#privacy`.
