# Karyo™ — Active Delivery & Protection Platform

A premium, responsive single-page marketing site for **Karyo™**, a technology platform by **Kriya**.
Built with **React + TypeScript + Vite + Tailwind**, authored around a bespoke editorial design system.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build
npm run typecheck  # tsc --noEmit
```

## Design system

- **Palette** — deep forest (`#0B2A1E`), warm ivory (`#F4EFE3`), paper, restrained clay-orange accent (`#D96B2B`), soft sage. Light content bands alternate with immersive dark-green science bands.
- **Type** — Fraunces (display), Hanken Grotesk (body), IBM Plex Mono (scientific annotation / data labels).
- **Signature** — a lab-notebook *annotation system* (hairline leaders + mono labels) and a recurring protective-matrix ring motif. The hero is a lightweight canvas animation of actives held within a matrix, drifting toward a leaf surface; it falls back to a static poster under `prefers-reduced-motion`.

## Accessibility & performance

- One `<h1>`, semantic landmarks, skip link, visible focus states, labelled form inputs.
- Keyboard support for the mobile menu (Esc to close), the combinations tablist (arrow keys), and the capabilities accordion.
- Full `prefers-reduced-motion` support; the hero canvas pauses when the tab is hidden.
- Responsive at 360 / 768 / 1024 / 1440px. SVG illustrations are inline and resolution-independent.

## Content & claims

- All factual copy is grounded in Kriya's own Karyo page (`kriya.ltd/technology/karyo`). No patents, certifications, partners, testimonials, performance statistics, or safety/biodegradability claims are invented.
- Diagrams are labelled **"Conceptual illustration"** and explain platform *functions* — they are not experimental evidence and do not depict a verified mechanism, cell penetration, targeted pest delivery, or a specific release mechanism.
- Combination options are presented as *supported platform directions*, not validated results.

## Enquiry form

No submission endpoint is configured, so the form uses an **honest email fallback**: on submit it opens the visitor's email client with a prefilled message to the verified address `info@kriya.ltd`. It never shows a false "submitted successfully" message.

To wire up live submission, set `FORM_ENDPOINT` in [`src/components/Enquiry.tsx`](src/components/Enquiry.tsx) to a real POST endpoint — the success/error states are already implemented.

## Notes

Verified contact details (from kriya.ltd): `info@kriya.ltd` · +91 63858 48466 · wa.me/916385848466 · privacy: `kriya.ltd/policies#privacy`.
The Kriya logo was not available as an approved asset, so Karyo is rendered as a refined text wordmark per the brief.
