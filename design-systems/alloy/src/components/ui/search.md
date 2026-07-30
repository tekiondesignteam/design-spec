---
title: Search
slug: search
route: /components/search
category: components
---

# Search

Search input with an inline magnifier icon, a clear (×) button that appears once the field has a value, and an optional autocomplete suggestion dropdown. A "Go" variant replaces the leading icon with a trailing bold "Go" label + divider for explicit submit actions. Naming note: Search is one of two components (with Chip) that use an unprefixed root class (`.search`) — see CLAUDE.md.

**Variants**
- Standard — leading search icon + clear button.
- With Go — no leading icon; trailing divider + "Go" action label.
- With suggestions — optional `.search__menu` dropdown of autocomplete items; opens only after the user types.
- States — default, hover, active (has value + focused), disabled.

**Brand notes** — No `--search-*` token is directly overridden in `brands.css`. Brand re-themes reach Search indirectly through shared Menu tokens: `.search__input` consumes `--menu-font-family`, `.search__go` consumes `--menu-font-family-selected`, and `.search__menu-item` inherits Menu's hover / selected colors. So Buick's `Buick_Text` / `Buick_Text:Bold`, GMC's `StratumGMC` / `StratumGMC:Bold`, and Cadillac's `Cadillac_Gothic_Narrow` / `Cadillac_Gothic_Narrow:Bold` all propagate to Search automatically. The field's own border ramp (`#e6e6e6` → `#b3b3b3` → `#262626`) and `#f2f2f2` background stay constant across all brands — no brand paints Search navy, red, or orange.

**Live page:** `/components/search` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`search.tsx`](./search.tsx)

**Related components:** [`menu.tsx`](./menu.tsx) (the autocomplete dropdown reuses `.search__menu*` classes that parallel Menu's structure and share Menu's tokens), [`text-input.tsx`](./text-input.tsx) (use for non-search form fields).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=1860-13798
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
