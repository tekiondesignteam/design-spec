# gm-vsr — Plan

> The plan turns the spec into an **ordered set of checkpointed build steps**. Its job is to fight drift: each step is small enough to finish and verify before moving on, and every step begins by re-reading the spec so decisions don't get lost over a long session.

**Owner:** jrajan  |  **Last updated:** 2026-07-30
**Design system:** alloy (Chevrolet only)  |  **Spec:** [spec.md](spec.md)  |  **Constitution:** [constitution.md](constitution.md)

---

## The rule for every step (do not skip)

Before starting **any** step below:

1. **Re-read `constitution.md` and `spec.md`.** Do not work from memory of them — long sessions lose the details.
2. Confirm the step is still in scope per the spec. If the spec doesn't cover it, stop and update the spec first.
3. Build only what the step describes. Do not pull work forward from later steps.

After finishing each step:

4. Check the result against the spec's acceptance criteria and states for that step.
5. Update `tasks.md` — check off what's done, note anything that drifted.
6. **Stop and let the designer review before the next step.** Checkpoints are where drift gets caught.

> **Gap note:** Six items are net-new (no Alloy component) and logged in constitution §4 — compare tray, compare modal, numbered pagination, skeleton loader, photo-count badge, and the card fields days-on-lot & distance. They are built here but each must compose Alloy atoms/tokens (no invented tokens) and stay flagged for maintainer follow-up.

---

## Build order

Ordered so each step produces something reviewable. Shell first, then the filter, then results, then the affordability/compare surfaces, then states, then persistence and polish.

### Step 1: Page shell / layout
- **Builds:** Chevrolet-branded VSR scaffold — `header` + `footer`, a two-region layout (left filter rail + results region on desktop; stacked on mobile), and the empty results container. Static placeholder cards only.
- **Done when:** the shell renders with Alloy `header`/`footer`, uses only Chevrolet base tokens, and lays out rail-vs-results correctly at desktop / tablet / mobile breakpoints (Alloy 600 / 1024).
- **Re-read spec:** ☐ (check before starting)

### Step 2: Filter panel (`vsr-filter`)
- **Builds:** the filter surface — desktop persistent 354px rail with **instant apply + live result count**; mobile full-bleed bottom sheet with sticky **"Apply (N results)"** + **"Clear all"**. Collapsible groups via `accordion` (Price/Model/Color/Features), **Model + Price expanded by default**; `slider` for price, `checkbox` option lists, `quick-filter` row. (Payment-context `tabs` wired but Chevrolet-only.)
- **Done when:** changing a filter on desktop re-queries instantly and updates the count; mobile only updates on Apply; default expansion matches spec; no non-Chevrolet tokens.
- **Re-read spec:** ☐

### Step 3: Active filter chips
- **Builds:** removable `chip` row above the results reflecting active filters; removing a chip re-queries and updates the rail + count.
- **Done when:** every active filter shows as an individually-removable chip and removal is in sync with the rail and result count.
- **Re-read spec:** ☐

### Step 4: Results grid + vehicle cards (`vsr-card`)
- **Builds:** populated results grid of `vsr-card`s with the spec's §3 fields — Year/Make/Model/Trim, hidden VIN, Ext/Int color, MSRP, dealer discount/incentive, cash/finance/lease payment block, availability status pill, primary photo. Add **`tooltip`** for the APR assumption and **`icon-button`** heart. **GAP fields (net-new):** photo-count badge, days-on-lot, distance-from-user (geolocation-gated).
- **Done when:** a card shows all in-scope fields, payment is visible with no login, the APR tooltip discloses the assumption, the heart toggles, and the three GAP fields render (each composing Alloy tokens, still flagged in §4).
- **Re-read spec:** ☐

### Step 5: Sort & pagination
- **Builds:** `menu` sort control defaulting to **"Best Match"**; **desktop numbered pagination at 24/page (GAP)**; **mobile infinite scroll, 12 at a time** (behavior over `vsr-card`).
- **Done when:** sort re-queries, desktop pages in 24s with a numbered pager, mobile appends 12 on scroll.
- **Re-read spec:** ☐

### Step 6: Quick View (`vsr-quick-view`) + price summary (`vsr-math-box`)
- **Builds:** desktop-only Quick View modal launched from the card's Quick View CTA — gallery + specs + Add to Favorites / View Details; wire `vsr-math-box` for itemized pricing where the spec calls for it.
- **Done when:** Quick View opens on desktop from the card, shows the vehicle's specs and CTAs, and mobile correctly falls back to the card's View Details (no Quick View on mobile, per Alloy).
- **Re-read spec:** ☐

### Step 7: Compare tray + compare modal (both GAP, net-new)
- **Builds:** sticky bottom **compare tray** (max 3, session-persistent across nav) composed from Alloy atoms; **"Compare Now"** side-by-side **modal** with a spec table (price, mileage, features, warranty).
- **Done when:** up to 3 vehicles add to the tray, a 4th is blocked with "Max 3", the tray survives navigation within the session, and Compare Now (≥ 2 vehicles) opens the side-by-side table. Both remain flagged in §4.
- **Re-read spec:** ☐

### Step 8: States — empty / loading / error / partial / low-inventory
- **Builds:** the full state matrix from the spec — **skeleton cards** on load (GAP, not spinners), **zero-result** with relaxed-filter suggestions, **partial-match** banner ("3 similar trims available"), **error + Retry** (filters preserved), and the **low-inventory** warning on cards ("Only N left in this trim").
- **Done when:** every surface in the spec's States table shows its four states (or the marked N/A), and Retry preserves filters.
- **Re-read spec:** ☐

### Step 9: Session persistence
- **Builds:** session-based persistence for **last-used filters** and **favorites** (no login, no account) — following Alloy's `localStorage`-style pattern, not a backend.
- **Done when:** a page reload within the session restores the last filters and the saved/heart state; nothing persists across a new session and no auth is introduced.
- **Re-read spec:** ☐

### Step 10: Polish / responsive / accessibility
- **Builds:** responsive pass across Alloy breakpoints (600 / 1024), motion per Alloy (fast/medium/slow, ease-out, `prefers-reduced-motion`), and the a11y gates — visible focus rings (never suppressed), full keyboard operability, 40×40 tap targets, AA contrast.
- **Done when:** the page meets constitution §7 (keyboard + focus ring + tap target + AA) and behaves correctly at all three breakpoints, and CTAs (View Details / Quick View → VDP; Get Pre-Approved → lead) link out cleanly.
- **Re-read spec:** ☐

---

## Guardrails carried from the constitution

- Work only inside `projects/gm-vsr/`.
- Everything under `design-systems/` is read-only. Use only this project's design system — **alloy** (`design-systems/alloy/`) — never another. **Chevrolet base tokens only** this round.
- Only alloy tokens/components — gaps get flagged (§4), not invented. The six GAP items compose Alloy atoms/tokens; no new tokens are created inside `design-systems/`.
