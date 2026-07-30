---
title: VSR Mini Math Box
slug: vsr-math-box
route: /domain-components/vsr-math-box
category: domain-components
---

# VSR Mini Math Box

Price Summary panel that itemizes vehicle pricing — MSRP, allowances, totals, and "Other offers you may qualify for" — for a single vehicle. Three financing modes (`cash`, `finance`, `lease`) cross with three vehicle statuses (`available`, `central-stock`, `in-transit`) for nine documented variants. Mobile renders the same component at a narrower width. Re-themes via `[data-brand]`.

**Composition** — pure markup composition over existing atoms; no new buttons or links engineered. Imports `IconButton` (close affordance) via tree-shaken named export from [`./icon-button`](./icon-button.tsx). Reuses shared icon classes `drp-icon--close` (header) and `drp-icon--asterisk` (offer footnote markers). All typography, spacing, and color resolves through new `--vsr-math-box-*` tokens defined in `tokens.css` with brand overrides in `brands.css`.

**Variants**
- Mode — `cash` (allowances + lump sum total), `finance` (term + APR + down payment + monthly payment), `lease` (term + mileage + monthly payment).
- Status — `available` (full offers panel + standard disclaimer), `central-stock` (collapsed lines, no offers, "Subject to final dealer pricing." prefix), `in-transit` (full lines + "Pricing for in-transit vehicles is subject to change." notice).
- Viewport — `mobile` flag swaps width from 448px to 343px; padding and typography stay constant.

**Brand notes** — token swaps only; no variant or layout changes. Chevrolet, Buick, and GMC keep the white panel and dark text; only fonts swap (Buick Text, StratumGMC). Cadillac flips to a dark theme (`#262626` panel, white body, `#b3b3b3` notes, `#4a4a4a` dividers) with Cadillac Gothic / Cadillac Gothic Bold; offers stay green across all four brands for emphasis.

**Live page:** `/domain-components/vsr-math-box` — canonical reference for nine variants, tokens, brand notes, and Dos/Don'ts.

**Implementation:** [`vsr-math-box.tsx`](./vsr-math-box.tsx)

**Related components:** [`vsr-card.tsx`](./vsr-card.tsx) (the search-result card the math box follows from), [`icon-button.tsx`](./icon-button.tsx) (close affordance atom).

**Figma**
- Figma: https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101
