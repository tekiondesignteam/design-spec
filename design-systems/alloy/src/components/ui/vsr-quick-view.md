---
title: VSR Quick View
slug: vsr-quick-view
route: /domain-components/vsr-quick-view
category: domain-components
---

# VSR Quick View

Desktop-only modal preview launched from a VSR Card's **Quick View** CTA. Two-column layout: a vehicle image gallery on the left (hero + chevron nav + pagination dots + exterior/interior color callouts), and an info panel on the right (identity block with VIN + status + dealership, 2×2 specs grid, Key Installed Options list, and an **Add to Favorites** + **View & Buy** / **View Details** CTA pair).

**Viewport**
- `desktop` only — fixed two-column ~1217×616. Mobile and tablet are out of scope; touch shoppers should land on the VDP via the VSR Card mobile footer instead.

**Brand notes** — radius and primary text color flip per brand via tokens; CTA fills, heart color, and dot active color flow through atomic Button/IconButton + `var(--brand-color)`. The filled-CTA label is data-driven (Chevrolet uses *View & Buy*; Buick / GMC / Cadillac use *View Details*). Heading typography flows through the foundation per-headline tokens — the 22/28 vehicle title reads `--type-headline-5-*`, the 18/24 *Key Installed Options* heading reads `--type-headline-6-*`. Both fall back to `--type-heading-*`, so Buick picks up `Buick_Text` and Cadillac picks up `Cadillac_Gothic` (regular cut) automatically without any quick-view-scoped overrides.

**Live page:** `/domain-components/vsr-quick-view` — canonical reference for tokens, anatomy, Dos/Don'ts, and the doc demo.

**Implementation:** [`vsr-quick-view.tsx`](./vsr-quick-view.tsx)

**Related components:** [`button.tsx`](./button.tsx) (Add to Favorites + View & Buy / View Details CTAs), [`icon-button.tsx`](./icon-button.tsx) (close X + gallery prev/next), [`vsr-card.tsx`](./vsr-card.tsx) (entry point — Quick View is launched from the card's outlined CTA).

**Atom-extraction debt:** the captioned color swatch and the icon-+-label-+-value spec row are NET NEW slots in this molecule; `vsr-filter` already implements the swatch primitive in a different layout. See **S27** in [`systemic-findings.md`](../../../systemic-findings.md) for the future Swatch + SpecItem atom extraction plan.

**Icon library gap** — the four spec slots (Engine, Battery Range, Transmission, Seats) currently use the closest existing DRP icons (`vehicle-sparkles`, `zap`, `tools`, `circle-user`) as placeholders. Future additions needed for accurate VDP rendering.

**Figma / Storybook**
- Figma (all brands): https://www.figma.com/design/V7ZspuqUOh3llyAOIaMHZd/?node-id=1-967
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
