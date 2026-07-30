---
title: Chip
slug: chip
route: /components/chip
category: components
---

# Chip

Compact label representing a piece of information, a filter selection, or a low-commitment action. DRP ships four chip types with distinct intents; each supports a different set of sizes. Keep labels to 1–3 words — use Button for real commands like "save" or "submit". Re-themes live via `[data-brand]`.

**Variants**
- Information — status badge in two visual styles (`subtle` tinted bg, `emphasis` solid fill) × 3 sizes (`xs`, `sm`, `md`) × 5 semantic colors (primary/success/warning/error/grey).
- Plain — label-only status with no container; 2 sizes (`sm`, `md`) × 5 colors; supports an optional leading icon.
- Dismissable — descriptor chip with a trailing × button; 3 sizes.
- Selectable — binary toggle for filter rails and tag pickers; 2 sizes; selected state fills near-black and flips text to white.

**Brand notes** — token swaps only; no variant or layout changes. Chip radius stays `0` (sharp corners) across all four brands. Buick and GMC both swap fonts (`Buick_Text`, `StratumGMC`) and scale type up to 14/16px; Cadillac swaps to `Cadillac_Gothic_Narrow` but keeps the 12/14 Chevy scale. Selectable's selected-bg shifts from Chevy's `#1a1a1a` to `#222222` (Buick), near-black `#060505` (GMC), or dark grey `#282828` (Cadillac). Plain/info primary routes through the brand color (`#d44400` Buick, `#cc0000` GMC, `#171473` Cadillac). Cadillac uses a pale yellow `#f5d98f` for the warning ramp on plain + info emphasis — distinct from the muted gold the other brands share.

**Live page:** `/components/chip` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`chip.tsx`](./chip.tsx)

**Related components:** [`button.tsx`](./button.tsx) (use Button for real actions; Chip is for labels and filters).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-82012
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
