---
title: Tabs
slug: tabs
route: /components/tabs
category: components
---

# Tabs

Horizontal tab bar for switching between 2–5 sibling content panels. Three variants cover different visual weights: a **Contained** (joined-pill) row, **Underlined — Inside** (bare text + per-tab underline), and **Underlined — Inset** (tabs on a baseline rule with overlay underline). Re-themes live via `[data-brand]`.

**Variants**
- Contained — joined pills; supports 2–5 tabs. `--lg` size only (48px height).
- Underlined — Inside — bare text tabs with 40px gap and a per-tab brand underline; `--md` (40px) or `--lg` (48px).
- Underlined — Inset — tabs share a 1px gray baseline; selected tab overlays a brand underline. Add `--variable-width` to hug content instead of filling the bar.
- States — default, hover, selected, focus-visible on all three variants.

**Brand notes** — Wider brand surface than most components. All brands swap fonts (Buick `Buick_Text` 500, GMC `StratumGMC` uppercase, Cadillac `Cadillac_Gothic_Narrow` 500 uppercase). Container radii flatten to `0` on GMC + Cadillac (both `--tabs-radius` and `--tab-contained-container-bg-border-radius`); Buick keeps Chevy's 4px/8px. Buick adds a two-tone Contained container (`--tabs-bg-unselected: #f6f5f4`); Cadillac uses `#e8e8e8`. GMC neutralizes the brand red on selected text (`--tabs-text-selected` + `--tab-underlined-text-selected-inside` → `#060505`) — red only shows on the underline via `--tabs-underline-color`.

**Live page:** `/components/tabs` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`tabs.tsx`](./tabs.tsx)

**Related components:** [`button.tsx`](./button.tsx) (toggle-button group is the 2-option alternative when panels aren't needed), [`stepper.tsx`](./stepper.tsx) (use for ordered multi-step flows, not peer navigation).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=19925-5759
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
