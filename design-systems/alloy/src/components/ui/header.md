---
title: Header
slug: header
route: /domain-components/header
category: domain-components
---

# Header

Global site header used across all DRP storefronts. Three variants cover the shopper's full journey from brand-level browsing through checkout. Each variant ships desktop, tablet, and mobile layouts — nine total layout permutations.

**Variants**
- `tier-1` — Pre-Checkout Tier 1 (brand-level surfaces: home, model overview, research). Centered logo, hamburger + Vehicles/Shop nav on the left, avatar on the right. No dealership anchor.
- `tier-3` — Pre-Checkout Tier 3 (inside a specific dealership storefront). Adds the dealership anchor (logo · divider · dealership name) on the left, Search Inventory / Build & Buy nav in the center, avatar + hamburger on the right.
- `sc` — Secure Checkout (Buyer Info, Financing, Review). Hamburger + primary nav removed so the buyer stays focused. Logo + dealership + avatar only.

**Built from** — composes two atomic primitives via tree-shaken named imports: `Avatar` (account slot) and `InlineButton` (every primary nav link). These are the only two atomic components in the library that export reusable React primitives. Engineered in-place: the `.drp-header` layout frame (9 permutations × tier-specific slot shuffling — no atomic AppShellHeader exists) and the `.drp-header__icon-btn` hamburger (atomic IconButton is CSS-only with 24px glyph inside a 40px padded button; Header's Figma spec is a 40px full-bleed SVG — atomic doesn't support the full-bleed variant).

**Brand notes** — each non-Chevy brand overrides ~10 tokens (surface color, divider, dealership + nav typography, icon color). Layout, spacing, sizing, and the hamburger glyph are brand-invariant. Buick warms bg to `#efedea` with `Buick_Text`. GMC shifts to `#ebebeb` with `StratumGMC` 18/25 (larger than Chevy's 16/24). Cadillac keeps `#f2f2f2` bg but darkens the border to `#a0a0a0` and uses `Cadillac_Gothic_Narrow`.

**Known gap** — `--header-nav-font-size`, `--header-nav-line-height`, and `--header-nav-font-weight` are defined in `tokens.css` and brand-overridden in `brands.css` (GMC specifically sets 18/25 to match its body ramp) but are never consumed in `global.css`. Nav typography currently comes from the `InlineButton` primitive's own scope, not these tokens. Tracked as S9 in `systemic-findings.md`.

**Live page:** `/domain-components/header` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`header.tsx`](./header.tsx)

**Related components:** [`avatar.tsx`](./avatar.tsx) (account slot — imported), [`inline-button.tsx`](./inline-button.tsx) (every nav link — imported), [`configurator-sub-header.tsx`](./configurator-sub-header.tsx) (sits directly below Header during configurator flow; tier must match).

**Figma / Storybook**
- Figma (all brands): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-3685
- Figma (Chevy): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-4898
- Figma (Cadillac): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-4899
- Figma (Buick): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-4900
- Figma (GMC): https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=478-4901
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
