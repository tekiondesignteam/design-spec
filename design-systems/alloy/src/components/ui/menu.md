---
title: Menu
slug: menu
route: /components/menu
category: components
---

# Menu

Floating popover list, typically triggered by a button or dropdown field. Supports label-only items and items with a secondary description line, plus optional group headers, dividers, and a top search row that filters as the user types. Selected items get a trailing checkmark. Re-themes live via `[data-brand]`.

**Variants**
- Item type — standard (label only) or with description (label + secondary line).
- Grouped — optional `.menu__header` (non-interactive section label) and `.menu__divider` between groups.
- Search row — optional `.menu__search` at top; filters visible items. Use when the list has 8+ options.
- Item states — default, hover, pressed, selected, disabled (via `.drp-disabled`).

**Brand notes** — token swaps only; owns the `--menu-*` token family (30 tokens). All three brands swap the font and tune item-hover / text colors; Chevrolet's `4px` container radius is brand-specific. Buick swaps to `Buick_Text`, scales type up (14→16px, 12→14px), darkens text to `#222222`, tints hover + selected to `#efedea`, and routes the tick through `var(--brand-color)` = `#D44400`. GMC swaps to `StratumGMC` with the same type bump, deeper text `#060505`, hover/selected `#ebebeb`, tick `#CC0000`; `--menu-radius` drops to `0`. Cadillac swaps to `Cadillac_Gothic_Narrow` but keeps 14px type, text `#282828`, tick navy `#171473`, and sets `--menu-radius` to `2px` (distinct from both other brands).

**Live page:** `/components/menu` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`menu.tsx`](./menu.tsx)

**Related components:** [`search.tsx`](./search.tsx) (shares the `.search__menu*` dropdown pattern for autocomplete), [`button.tsx`](./button.tsx) (common trigger element).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50175
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
