---
title: VSR Card
slug: vsr-card
route: /domain-components/vsr-card
category: domain-components
---

# VSR Card

Vehicle Search Result card. Compact tile shown in the inventory grid. One vehicle per card with a status pill, hero image, MSRP, dealer-priced finance/lease/cash term block, and a footer that swaps from VIN line (default) to **Quick View / View Details** CTAs on desktop hover.

**Types**
- `cash` — single price (Dealer Price After Offers), no term breakdown
- `finance` — monthly payment + APR / term / down payment + "Subject to credit approval"
- `lease` — monthly payment + term / mileage / due-at-signing + security deposit line

**Viewports**
- `desktop` — 305px wide, hover reveals two CTAs (Quick View outline + View Details filled) replacing the VIN line.
- `mobile` — 433px wide, both VIN and a full-width View Details button are visible (no hover dependence).

**Brand notes** — fully token-driven. Cadillac uses a flat `#f2f2f2` panel with no border and uppercase type; GMC uses 0 border-radius and uppercase StratumGMC; Buick keeps the rounded shape but uses Buick Text and brand-charcoal CTAs (orange is reserved for plain links). Vehicle imagery, dealership name, MSRP, and VIN swap per brand to a Blazer EV / Escalade / Envista / Sierra 1500 example.

**Live page:** `/domain-components/vsr-card` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`vsr-card.tsx`](./vsr-card.tsx)

**Related components:** [`button.tsx`](./button.tsx) (Quick View + View Details CTAs), [`chip.tsx`](./chip.tsx) (Available Now status), [`icon-button.tsx`](./icon-button.tsx) (heart save action).

**Figma / Storybook**
- Figma (all brands): https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
