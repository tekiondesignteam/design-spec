---
title: Accordion
slug: accordion
route: /components/accordion
category: components
---

# Accordion

Vertically stacked, collapsible sections that progressively disclose content. Each item toggles between a `plus` icon (collapsed) and a `circle-minus` icon (expanded). Accordions re-theme live via `[data-brand]`.

**Variants**
- Single item — one `.drp-accordion-container-bg` element used on its own.
- Grouped — multiple items wrapped in `.drp-accordion-group`; the wrapper ensures the top border renders cleanly on the first item and avoids double-borders between items.

**Brand notes** — token swaps only; no variant or layout changes. Buick, GMC, and Cadillac each override the text-color ramp (default / hover / active / disabled) plus the border color, and swap in their respective button font (`Buick_Text`, `StratumGMC`, `Cadillac_Gothic_Narrow`). Cadillac additionally flattens the hover/active ramp — all states use the same `#282828` — and does not ship a disabled-color override.

**Live page:** `/components/accordion` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`accordion.tsx`](./accordion.tsx)

**Related components:** [`icon-button.tsx`](./icon-button.tsx) (shares the `plus` / `circle-minus` icon assets used in the toggle).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
