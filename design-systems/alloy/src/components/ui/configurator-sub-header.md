---
title: Configurator Sub-header
slug: configurator-sub-header
route: /domain-components/configurator-sub-header
category: domain-components
---

# Configurator Sub-header

Secondary navigation that sits directly below the global Header while a shopper is building a specific vehicle. Anchors the trim identity on the left (vehicle name + selected trim, with an inline edit affordance), surfaces the configuration steps as underlined tabs in the center (Model · Exterior · Interior · Options · Summary, with an extra "Cab & Bed" step for trucks), and keeps the running Net Price and Inventory Match count on the right.

**Variants**
- Tier — `tier-1` shows the shopper's ZIP as "Matches Near You 90210"; `tier-3` (inside a dealership storefront) drops the ZIP and reads "Matches Found".
- Viewport — desktop (88px single row), tablet (120px, tabs drop to second row), mobile (120px, price + matches collapse, only identity + count on top row).

**Built from** — atomic-component adoption for the tab bar is **deferred pending S26** (atomic Tabs Underlined Inside Figma reconciliation in `systemic-findings.md`). The structural target is `.drp-tab-underlined-inside--lg`, but per-brand Figma verification (2026-04-27) found atomic CSS diverges from Figma in 13 places across 4 brands — adopting today would propagate that drift into this molecule. Once S26 lands as a `brands.css`-only PR, the molecule's tab bar can be replaced with atomic classnames and the local `--config-subheader-tab-*` tokens deleted. Other slots are NET NEW with named reasons:
- Count pill (40px circle ≠ atomic Chip's pill shape — flagged as future Badge atom candidate)
- Decorative glyphs 16px pencil/asterisk/map-pin (no atomic Icon component exists — inlined as `currentColor` SVGs)
- Composite slots (vehicle identity, price block, matches block — no single-purpose atom equivalent)

**Brand notes** — narrow surface: brands override only typography. Buick sets 14 tokens to `Buick_Text` with subtitle bumped to 18/25. GMC sets 14 tokens to `StratumGMC` with name at weight 900. Cadillac sets 11 tokens using the split `Cadillac_Gothic` (name/tab/price-value) + `Cadillac_Gothic_Narrow` (body text) pattern. Selected-tab color routes through `var(--brand-color)` for every brand.

**Architectural status** — **S8 closed 2026-04-27.** Chevy base tokens for `--config-subheader-*` now live in `styles/tokens.css` (extracted from CSS `var()` fallbacks in `styles/global.css`); brand values remain in `styles/brands.css`. The three-layer architectural invariant ("base values in tokens.css, brand overrides in brands.css, consumption in global.css") now holds for this molecule.

**Live page:** `/domain-components/configurator-sub-header` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`configurator-sub-header.tsx`](./configurator-sub-header.tsx)

**Related components:** [`header.tsx`](./header.tsx) (global Header sits directly above it — the tier-1/tier-3 choice must match between the two), [`tabs.tsx`](./tabs.tsx) (atomic underlined-tabs treatment that the molecule diverges from — not imported, but visually adjacent).

**Figma / Storybook**
- Figma (all brands): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-9086
- Figma (Chevy): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-9086
- Figma (Cadillac): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-9875
- Figma (Buick): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-10660
- Figma (GMC): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-11445
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
