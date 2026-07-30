---
title: Button
slug: button
route: /components/button
category: components
---

# Button

Contained buttons trigger actions. Primary filled is the strongest visual weight and should appear only once per view as the main call-to-action; Outline is for secondary actions; Plain is for low-emphasis contextual actions. Inverse variants work on dark or image backgrounds. Re-themes live via `[data-brand]`.

**Variants**
- Primary — `filled` (default), `outlined`, `plain`. Three sizes: large (48px), medium (40px), small (32px).
- Inverse — same three style variants scoped for dark/photo backgrounds; shares the size set.
- With icons — a leading or trailing icon may be added inside the button; icons inherit `currentColor` and pick up the same color tokens as the label.

**Brand notes** — token swaps only; no variant or layout changes. Buick shifts Primary filled to a dark ramp and routes Plain through `var(--brand-color)` (`#D44400`); contained labels use `font-weight: 500` (vs Chevy 600) and sizes shift to 18/25, 16/22, 14/20. GMC and Cadillac both drop all container and rectangular icon-button radii to `0` (square corners) and switch typography to `text-transform: uppercase` (letter-spacing stays `0` per Figma); contained labels also drop to `font-weight: 500`. GMC inverts the filled default (white bg + red border + dark text, flipping to red on hover) and shares Buick's larger size scale (18/25, 16/22, 14/20). Cadillac uses navy `#171473` filled that inverts to outlined `#282828` on hover and keeps Chevy's size scale (16/14/12).

**Live page:** `/components/button` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`button.tsx`](./button.tsx)

**Related components:** [`icon-button.tsx`](./icon-button.tsx) (shares the contained sizing tokens via `--button-contained-icon-container-*`), [`inline-button.tsx`](./inline-button.tsx) (the link-style sibling; owns the `--button-link-*` token family).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4740-60659
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary
