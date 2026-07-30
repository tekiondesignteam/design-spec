---
title: Footer
slug: footer
route: /domain-components/footer
category: domain-components
---

# Footer

Site footer with three purpose-built variants sharing one GM legal-links row and brand-aware type/color treatment. All variants are responsive across desktop, tablet, and mobile, and re-theme live via `[data-brand]`.

**Variants**
- `vdp` — Vehicle Detail Page: legal disclaimer block + global links row. No primary action.
- `account` — My Account / multi-step form: sticky action bar with global links (desktop + tablet), Cancel + Continue, and a chat FAB (desktop + tablet only — hidden on mobile).
- `configurator` — Build flow step footer: Skip + Back + Next stepper CTAs, plus a Finance price cluster on tablet/mobile and a dedicated 424px chat panel with primary-blue FAB on desktop.

**Brand notes** — token swaps only; no variant or layout changes. GMC and Cadillac override the full color ramp (bg, border, text, icon); Buick changes typography only — the disclaimer heading and surrounding body copy both use `Buick_Text` (previously the heading used `Buick_Headline`; unified to the text family 2026-05-08 to match the Buick foundation headline swap). All three swap the Configurator desktop FAB to the brand accent color.

**Live page:** `/domain-components/footer` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`footer.tsx`](./footer.tsx)

**Related components:** [`button.tsx`](./button.tsx) (contained-button atom used for Cancel/Continue/Skip/Next), [`icon-button.tsx`](./icon-button.tsx) (chat FAB + back button shape).

**Figma / Storybook**
- Figma (Chevy / GMC): https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=483-4381
- Figma (Cadillac): https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=483-3878
- Figma (Buick): https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=483-4131
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
