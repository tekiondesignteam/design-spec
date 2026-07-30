---
title: Breadcrumb
slug: breadcrumb
route: /components/breadcrumb
category: components
---

# Breadcrumb

Hierarchical navigation trail showing the user's location within the site. Renders as a row of links separated by chevron glyphs, with the current page node styled distinctly and marked `aria-current="page"`. Re-themes live via `[data-brand]`.

**Variants**
- Link node — `.drp-breadcrumb-typography-small-default` with hover/active/disabled color states.
- Current-page node — `.drp-breadcrumb-typography-small-current` (class is an alias over the selected-state tokens; see `global.css`).

**Brand notes** — token swaps only; no variant or layout changes. All three brands override the full text-color ramp (default / hover / active / disabled / selected). Buick and GMC route the hover/active states through `var(--brand-color)` (Buick `#D44400`, GMC `#CC0000`). Cadillac uses explicit navy/indigo hover/active values (`#171473` / `#211fab`). Each brand swaps in its button font with a heavier weight for the selected node (Buick `Buick_Text`, GMC `StratumGMC`, Cadillac `Cadillac_Gothic_Narrow`).

**Live page:** `/components/breadcrumb` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`breadcrumb.tsx`](./breadcrumb.tsx)

**Related components:** [`link.tsx`](./link.tsx) (sibling text-link atom; breadcrumb nodes are visually closer to link styling than contained buttons).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
