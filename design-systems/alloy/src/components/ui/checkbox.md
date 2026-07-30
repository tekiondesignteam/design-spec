---
title: Checkbox
slug: checkbox
route: /components/checkbox
category: components
---

# Checkbox

Binary selection control for individual or multi-select lists. Renders a 20×20 box with a 44×44 invisible hit area; supports checked, unchecked, indeterminate, and disabled states. Label placement defaults to trailing. Re-themes live via `[data-brand]`.

**Variants**
- States — `unchecked` (default), `checked`, `indeterminate`, `disabled` (any combination).
- Label — trailing (default) or no label. Two typography sizes: `large` (16/24) and `small` (12/20) via `.drp-checkbox-typography-large` / `.drp-checkbox-typography-small`.

**Brand notes** — token swaps only; no variant or layout changes. All three brands override the border, checked-bg, disabled ramp, and label font/color. Buick uses dark-grey `#333333` for border + checked-bg; GMC and Cadillac both drop `--checkbox-container-border-radius` to `0` (square corners) and swap to their button fonts (`StratumGMC`, `Cadillac_Gothic_Narrow`); Cadillac's checked-bg is navy `#171473`.

**Live page:** `/components/checkbox` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`checkbox.tsx`](./checkbox.tsx)

**Related components:** [`radio.tsx`](./radio.tsx) (single-select sibling; shares the same hit-area and label typography).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
