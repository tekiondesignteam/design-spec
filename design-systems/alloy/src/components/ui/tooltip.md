---
title: Tooltip
slug: tooltip
route: /components/tooltip
category: components
---

# Tooltip

Fixed-width (384px) dark-surface popover that surfaces supplemental information about a nearby element. Supports an optional info chip, a title row (leading info icon + trailing close), body copy, and an optional inverse link. Nine arrow positions anchor the tooltip to its trigger; or use `none` for a floating variant. Naming note: Tooltip is one of three components (with Chip and Search) that use an unprefixed root class (`.tooltip`) — see CLAUDE.md.

**Variants**
- Compositions — Plain (body only), With title (dismissable), With title + info icon, With title + link.
- Arrow position — nine anchors (top/middle/bottom × left/center/right, plus `none`). Corner arrows inset 16px from the nearest corner.
- Slots — optional chip row, title row (icon + title + close), body (required), link row.
- States — static (no hover/pressed states on the tooltip itself; it appears/disappears in response to its trigger).

**Brand notes** — Intentionally brand-muted. Only two surfaces change per brand: the panel `--tooltip-bg` and the typography tokens (body + title font-family + body size + body weight). Backgrounds: Chevy `#1a1a1a`, Buick `#222222`, GMC `#060505`, Cadillac `#282828` — all near-black variants. Body size: Chevy/Cadillac `14px`, Buick/GMC `16px`. Title stays Bold 16/22 on every brand. Width (384px), padding (16px), radius (0), white text, and white info/link/close icons are all brand-invariant — tooltips never carry brand color.

**Live page:** `/components/tooltip` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`tooltip.tsx`](./tooltip.tsx)

**Related components:** [`chip.tsx`](./chip.tsx) (the optional info chip inside a tooltip uses the Chip root), [`menu.tsx`](./menu.tsx) (use for selectable lists instead of packing actions into a tooltip).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-95124
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
