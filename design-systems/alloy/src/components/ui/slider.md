---
title: Slider
slug: slider
route: /components/slider
category: components
---

# Slider

Continuous-value input on a 4px track with a 16px round thumb and a small value badge in the header. Two variants: **Single** (one thumb) and **Range** (lower + upper thumbs with a filled band between them, plus Min / Max end labels). Disabled state is a fixed visual — the thumb can't be dragged and the track dims.

**Variants**
- Single — one `<input type="range">`, header shows a single `<output>` value badge.
- Range — `.drp-slider-container--range` with `.drp-slider-input--lower` + `.drp-slider-input--upper`; a `.drp-slider-range-fill` overlay paints the band between thumbs; `.drp-slider-footer` carries Min / Max labels.
- States — default and disabled (real `disabled` attribute + `.drp-disabled` for the Range wrapper).

**Brand notes** — Wide brand surface (one of the widest in the library). All three non-Chevy brands swap the track tone to `#b3b3b3` (from `#e8ecef`), slim the thumb border from `2px` to `1px`, tint the focus halo with the brand color, and shift the label ramp to `#262626` / `#666666`. They also introduce `--slider-disabled-handle-bg: #b3b3b3` (absent on Chevy, which falls back to `#ffffff` via `--slider-thumb-bg`) and shift `--slider-disabled-border` to `#e6e6e6`; `--slider-disabled-fill` holds at `#c3cfd9` everywhere. Fill + thumb-border colors route through `var(--brand-color)` for Buick (`#D44400`) and GMC (`#CC0000`), but Cadillac hardcodes `#171473` — the only slider token that doesn't defer to the brand-color variable. Typography: Buick `Buick_Text` (title + range + input), GMC `StratumGMC` (all three), Cadillac `Cadillac_Gothic` for title / `Cadillac_Gothic_Narrow` for range + input. Non-Chevy brands resize the title from `14/22` to `16/24`.

**Live page:** `/components/slider` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`slider.tsx`](./slider.tsx)

**Related components:** [`text-input.tsx`](./text-input.tsx) (use for precise numeric entry — slider is for approximate selection), [`stepper.tsx`](./stepper.tsx) (use for stepwise progress through discrete stages, not continuous values).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3773-50156
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
