---
title: Quick Filter
slug: quick-filter
route: /components/quick-filter
category: components
---

# Quick Filter

A row of icon-and-label pill buttons for one-tap refinement on the Vehicle Search Result page. Each pill is an independent multi-select toggle (not mutually exclusive — that's `Toggle Button Group`). Pills grow to fill the row evenly with a 140px minimum and wrap to a new line when the container narrows.

**Variants**
- State — default, hover (`#f2f2f2` fill, border + label unchanged), selected (`#f2f2f2` fill, 1px brand-colored border + label), disabled (50% opacity, non-interactive).
- Brand label sets — Chevrolet ships 4 (Electric · SUV · Truck · Performance), Buick 2 (Electric · SUV), GMC 4 (Truck · SUV · Electric · Van), Cadillac 4 (SUV · Sedan · Electric · V-Series).

**Brand notes** — Default and hover states are brand-invariant; only the selected border + label re-theme. Chevrolet routes through `var(--brand-color)` (`#0077D9`); Cadillac hardcodes `#171473`; **Buick and GMC neutralize to dark gray** (`#333333` and `#1a1a1a` respectively) rather than brand orange/red, matching their live ecommerce sites where brand orange/red is reserved for primary CTAs and the slider track. GMC + Cadillac additionally flatten `--quick-filter-radius` to `0` and shift labels to `uppercase`. Label sets and pill counts are content-controlled per brand — the consumer picks the right list, the component handles the styling.

**Live page:** `/components/quick-filter` — canonical reference for tokens, anatomy, brand label sets, Dos/Don'ts, and interactive demos.

**Implementation:** [`quick-filter.tsx`](./quick-filter.tsx)

**Related components:** [`toggle-button.tsx`](./toggle-button.tsx) (use for mutually exclusive segmented controls — Quick Filter is multi-select), [`chip.tsx`](./chip.tsx) (use for compact dismissable filter tokens after selection — Quick Filter is the entry point, Chip is the result).

**Figma / Storybook**
- Figma: https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=3-46033
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
