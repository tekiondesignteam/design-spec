---
title: Radio Button
slug: radio
route: /components/radio
category: components
---

# Radio Button

Single-choice selection within a mutually exclusive group. Circle with a filled inner dot when selected. Always group related radios with a shared `name` attribute and wrap with a `<fieldset>` / `<legend>` for screen-reader context. Re-themes live via `[data-brand]`.

**Variants**
- Select state — Unselected (empty circle) or Selected (circle with inner dot).
- Label placement — trailing (default) or leading (via `flex-direction: row-reverse`).
- States — default, hover / pressed, disabled on each select state.
- Label size — `large` (14/22) or `small` (12/20) via `.drp-radio-typography-large` / `-small`.

**Brand notes** — token swaps only; owns the `--radio-*` token family (13 tokens). Radio's brand surface is intentionally narrow: all three brands override *only* the two `--radio-typography-*-font-family` tokens. Buick → `Buick_Text`, GMC → `StratumGMC`, Cadillac → `Cadillac_Gothic_Narrow` (no letter-spacing, uppercase, or size change). Border, dot, and disabled colors stay at Chevy's near-black `#1a1a1a` / `#c3cfd9` across all brands — notably Cadillac's navy `#171473` does *not* appear on Radio.

**Live page:** `/components/radio` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`radio.tsx`](./radio.tsx)

**Related components:** [`checkbox.tsx`](./checkbox.tsx) (multi-select counterpart — use when options are *not* mutually exclusive), [`switch.tsx`](./switch.tsx) (use for single on/off toggles instead of a lone radio).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50173
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
