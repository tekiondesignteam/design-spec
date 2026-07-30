---
title: Text Input
slug: text-input
route: /components/text-input
category: components
---

# Text Input

Single-line field with a floating label and optional assistive text. The label sits in the center of the field when empty and floats up to 12px when the field has a value or is focused. Bottom-border-only styling (`2px` ramp: `#e6e6e6` → `#b3b3b3` → `#262626`) sits on a `#f2f2f2` fill with a top-rounded / flat-bottom `4px 4px 0 0` radius. A Dropdown variant adds a trailing chevron icon and an open-state menu panel.

**Variants**
- Field type — Text Input (free-form) or Dropdown (`--dropdown` modifier + trailing chevron icon + menu panel on `--open`).
- Assistive text — optional `<p class="drp-input-standard-outlined-assistive">` below the field for hints, counts, or validation messages.
- States — default, hover, active/focus, error (`--error` modifier + red ramp), disabled (`.drp-disabled` + real `disabled` attribute).
- Menu items (Dropdown only) — default, hover, selected, disabled via `.drp-disabled`.

**Brand notes** — Font swaps only; narrow brand surface. Only `--input-standard-outlined-typography-font-family` is overridden per brand — Buick `Buick_Text`, GMC `StratumGMC`, Cadillac `Cadillac_Gothic_Narrow`; Chevy keeps `Chevy_Sans:Medium`. The `#f2f2f2` fill, the `#e6e6e6` → `#b3b3b3` → `#262626` border ramp, the `#d64022` error red, the `#b3b3b3` disabled tone, and the `4px 4px 0 0` radius all hold constant across all four brands. No brand tints the field navy, orange, or red.

**Live page:** `/components/text-input` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`text-input.tsx`](./text-input.tsx)

**Related components:** [`search.tsx`](./search.tsx) (use specifically for search inputs — different fill, different icon, different clear/go treatment), [`menu.tsx`](./menu.tsx) (the Dropdown variant's menu panel reuses patterns from Menu).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=2977-51504
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
