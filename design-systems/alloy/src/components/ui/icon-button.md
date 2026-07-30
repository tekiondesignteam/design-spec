---
title: Icon Button
slug: icon-button
route: /components/icon-button
category: components
---

# Icon Button

Icon-only buttons for compact action areas — toolbars, cards, media controls. Shares the contained Button color system; differs only in container shape and sizing. Every icon button must carry an `aria-label` since there is no visible text. Re-themes live via `[data-brand]`.

**Variants**
- Shape — `rect` (rounded rectangle) or `circle` (always 50% radius / pill).
- Size — `large` (48×48), `medium` (40×40), `small` (32×32). Size modifiers apply to both shapes.
- Theme — `primary` and `inverse` × three style variants (`filled`, `outlined`, `plain`). Inverse is for dark or image backgrounds.

**Brand notes** — token swaps only; no variant or layout changes. Icon Button inherits the full Button color system — every per-brand color override on Button carries over here automatically. The only icon-button-specific override is the rectangular corner radius: GMC and Cadillac both set `--button-contained-icon-container-rect-bg-{small,medium,large}-border-radius` to `0` (square rect corners); Buick keeps Chevy's `8px`. Circular shape stays at `50%` across all brands — no brand overrides it.

**Live page:** `/components/icon-button` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`icon-button.tsx`](./icon-button.tsx)

**Related components:** [`button.tsx`](./button.tsx) (shares the full `--button-contained-color-*` ramp; see its Brand notes for per-brand color values).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4743-63425
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary
