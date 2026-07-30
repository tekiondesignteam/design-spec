# gm-vsr — Tasks

> The granular checklist. Each task is one checkable behavior drawn straight from the spec's acceptance criteria. Check things off as they're built. This file is also the **drift log** — if the built UI diverges from the spec, record it here rather than silently accepting it.

**Owner:** jrajan  |  **Last updated:** 2026-07-30
**Plan:** [plan.md](plan.md)  |  **Spec:** [spec.md](spec.md)  |  **Design system:** alloy (Chevrolet only)

---

## Drift check (run this at every checkpoint)

Before checking off a task, ask:

- Does what I built match the **spec's acceptance criteria** for it, word for word?
- Does it use **only alloy tokens/components** (constitution §3), Chevrolet base only?
- Did I touch **anything outside `projects/gm-vsr/`**? (If yes — that's a violation, revert it.)
- Did any decision quietly change since the spec was written? If so, **update the spec first**, then continue.

If any answer is wrong, log it under "Drift log" below instead of checking the box.

> **GAP tasks** are marked **(GAP)** — net-new UI with no Alloy component (constitution §4). They must compose Alloy atoms/tokens and stay flagged; no invented tokens.

---

## Tasks

Grouped by plan step. One behavior per line.

### Step 1 — Page shell / layout ✅ (2026-07-30, pending designer review)
- [x] Render Chevrolet-branded VSR shell with Alloy `header` (tier-3) and `footer` (vdp) — real `.drp-*` classes + Chevrolet logo
- [x] Lay out left filter rail + results region on desktop; stack on mobile
- [x] Layout is correct at desktop / tablet / mobile (Alloy 600 / 1024 breakpoints) — verified in-browser at all three bands
- [x] Uses only Chevrolet base tokens (no other brand); spacing via `var(--spacing-*)` — see drift log re: foundation-gap neutrals

### Step 2 — Filter panel (`vsr-filter`) ✅ (2026-07-30, pending designer review)
- [x] Desktop rail is persistent; changing a filter re-queries **instantly** (no Apply button) — verified (Electric→6, +Truck→10, +Blazer EV→2)
- [x] Live result count updates on every desktop filter change — shown in results toolbar (`#gmvsr-count`); see drift log re: placement
- [x] Mobile filters open as a bottom sheet with sticky **"Apply (N)"** + **"Clear all"**; results update only on Apply — verified draft stages, Apply commits, Esc/close discards
- [x] Filter groups are collapsible; **Model + Price expanded by default**, Color + Features collapsed — verified
- [x] Price uses `slider` (range); option lists use `checkbox`; quick filters use `quick-filter`; payment via `tabs` (contained) — all real `.drp-*` classes
- [x] **Location is editable** — pencil opens ZIP (`text-input`, validated 5-digit + inline error) + search-radius select; radius filters by distance (verified 25mi→16, 10mi→9, Nationwide→26); location preserved across Clear All

### Step 3 — Active filter chips ✅ (2026-07-30, pending designer review)
- [x] Each active filter renders as a removable `chip` (Alloy `.chip--dismissable`) above the results — quick / model / color / features / price-range; plus a "Clear all"
- [x] Removing a chip re-queries and stays in sync with the rail + count — verified (remove Blazer chip unchecks the rail box; Clear all resets to 26). Works from committed state on desktop and mobile.

### Step 4 — Results grid + vehicle cards (`vsr-card`) ✅ (2026-07-30, pending designer review)
- [x] Card shows Year, Make, Model, Trim, Ext color, MSRP, dealer discount ("$N off MSRP"), availability status, image — real `.drp-vsr-card*`
- [x] VIN is hidden (in `data-vin` for the VDP link); footer shows **Stock #** instead
- [x] Cash / finance / lease payment block renders per active payment tab; payment visible **without login** — verified (cash total / finance $730/mo + terms / lease)
- [x] APR affordance opens a `tooltip` disclosing the APR assumption — Alloy `.tooltip`, reveals on hover + keyboard focus
- [x] Heart (`icon-button`) toggles saved / unsaved — swaps `heart`↔`heart-fill`, `aria-pressed`
- [x] Photo-count badge renders **(GAP)** — net-new overlay on the image
- [x] Days-on-lot field renders **(GAP)** — net-new line
- [x] ~~Distance~~ — **native** to the card (`.drp-vsr-card__distance`), not a gap (constitution §4 corrected)
- [x] Desktop hover swaps VIN/Stock# → Quick View + View Details (pure Alloy CSS); mobile shows full-width View Details

### Step 5 — Sort & pagination ✅ (2026-07-30, pending designer review)
- [x] Sort `menu` (Alloy list popover) defaults to **"Best Match"** (availability + distance + incentive) + Price L→H / H→L / Distance / Newest; changing sort re-sorts and resets to page 1 — verified (Price L→H starts $25,295; Best Match pushes Factory Order last)
- [x] Desktop paginates at **24/page** with numbered pagination **(GAP)** — verified (page 1 = 24, page 2 = 2; Prev/Next disabled at ends; current highlighted)
- [x] Mobile uses **infinite scroll, 12 at a time** — verified initial slice = 12 + IntersectionObserver sentinel appends next 12; pager hidden on mobile

### Step 6 — Quick View + price summary ✅ (2026-07-30, pending designer review)
- [x] Quick View (`vsr-quick-view`) opens on **desktop** from the card's Quick View CTA — real `.drp-vsr-quick-view*`; project-provided scrim/modal (Alloy ships none)
- [x] Quick View shows gallery (prev/next + dots + Ext/Int swatches) + 2×2 specs grid + Key Installed Options + Add to Favorites / View & Buy
- [x] Add to Favorites syncs with the card heart (shared `GMVSR_RESULTS.saved`) — verified
- [x] Mobile falls back to the card's full-width View Details (no Quick View CTA on mobile cards) — inherent from Step 4
- [x] `vsr-math-box` renders the itemized Price Summary inside the modal — mode = active payment tab (cash/finance/lease), status mapped from availability (In Stock→available, In Transit→in-transit, Factory Order→central-stock); EV offers panel shown — verified

### Step 7 — Compare tray + modal (GAP) ✅ (2026-07-30, pending designer review)
- [x] Add up to **3** vehicles to a sticky compare tray **(GAP)** — compare = Alloy `checkbox` on each card; tray = chips + buttons
- [x] Adding a 4th is blocked with a **"maximum 3 vehicles"** message **(GAP)** — 4th card's compare checkbox disabled + hint in the tray
- [x] Tray persists across navigation within the session **(GAP)** — `sessionStorage`; verified tray + checked cards restore after reload
- [x] **"Compare Now"** (≥ 2 vehicles) opens a side-by-side modal **(GAP)** — 11-row spec table (Price After Offers, MSRP, Est. Monthly, Availability, Distance, Days on lot, Drivetrain, Seats, Exterior color, Key features, Warranty); disabled with <2; verified
- [x] Compare control placement: in the card **price row, right-aligned**, **revealed on hover** (like the CTAs); stays visible when the card is selected or keyboard-focused, and always-on for mobile cards (designer requests 2026-07-30)

### Step 8 — States ✅ (2026-07-30, pending designer review)
- [x] Loading: **skeleton cards** (shimmer, card-shaped), never spinners **(GAP)** — shown on initial load / mobile Apply / Retry; honors `prefers-reduced-motion`
- [x] Zero result: "No matching vehicles" + **relaxable-filter suggestions** (Any model / color / features / type / price / Nationwide radius) + Clear all filters — verified
- [x] Partial match: banner "**N similar vehicles available** with a different color or features" + "Show similar" (clears color+features) — verified (SUV + black → 2 exact, 12 similar)
- [x] Error / API failure: error copy + **Retry** CTA; **filters preserved**; Retry recovers (skeleton → cards) — verified
- [x] Low inventory: **"Only N left in this trim"** warning chip (Alloy `chip--information --color-warning`) when qty ≤ 2 — **floats over the top-left of the vehicle image** (overlay, doesn't take a line), per designer 2026-07-30; verified on 9 cards
- [x] Review affordance: `?state=loading|empty|error` forces a state on load (documented in drift log)

### Step 9 — Session persistence ✅ (2026-07-30, pending designer review)
- [x] Last-used filters persist across reload **within the same session** (`sessionStorage` `gmvsr-filters`) — payment, ZIP/radius, price, expansion, models/colors/features/quick — verified (finance + Silverado EV + electric restored)
- [x] Favorites (heart state) persist across reload (`gmvsr-favorites`) — verified (V1004 restored as heart-fill); syncs from card + Quick View
- [x] Compare tray also session-persistent (`gmvsr-compare`, Step 7)
- [x] Nothing persists across a new session; no auth — all three use `sessionStorage` (cleared on tab close); no login/account introduced

### Step 10 — Polish / responsive / accessibility ✅ (2026-07-30, pending designer review)
- [x] Responsive across Alloy breakpoints (600 / 1024) — verified desktop (354px rail, multi-col, single-row header) / **tablet (rail hidden → Filters sheet, 2-up card grid, two-row header)** / mobile (Filters sheet, single-col mobile card variant, brand-only header). JS pieces update on `resize`/matchMedia `change` (real browsers)
- [x] Motion per Alloy — subtle ~100ms ease-out transitions; **`prefers-reduced-motion`** disables skeleton shimmer + transitions; no decorative/ambient motion
- [x] Keyboard-operable with **visible focus rings** — header nav/avatar focusable (no `tabindex=-1`); focus-visible on net-new controls (pager, sort, tooltip, radius, button-anchors); Alloy atoms keep their own; nothing suppressed
- [x] Tap targets — pager/Get-Pre-Approved ≥40px; tooltip trigger padded hit area; Alloy controls at documented sizes; AA contrast (ink #262626 / muted #666 on white pass; brand/status from Alloy)
- [x] CTAs link out (real anchors): card **View Details** → `#/vdp/{vin}`, Quick View **View & Buy** → `#/vdp/{vin}` — destination out of scope, per spec flow boundary. _(Get Pre-Approved CTA removed from the UI 2026-07-30 at owner's request.)_

---

## ✅ All 10 build steps complete (2026-07-30) — pending final designer review

Every spec acceptance criterion is built and verified in-browser. The six constitution §4 gaps (compare tray, compare modal, numbered pagination, skeleton loader, photo-count badge, days-on-lot; + form-select, foundation-neutrals discovered during build) were built net-new from Alloy atoms/tokens and remain flagged for the maintainer. Nothing outside `projects/gm-vsr/` was modified; `design-systems/alloy/` was read-only throughout.

---

## Drift log

Record anything that diverged from the spec, and how it was resolved (spec updated / reverted / accepted with sign-off).

| Date | What drifted | Resolution |
|------|--------------|------------|
| 2026-07-30 | Shell needs page-canvas/body-text/hairline colors; Alloy has **no global surface/text foundation token** (documented gap). | Not invented as brand values — centralized in `styles/shell.css` `:root` (`--gmvsr-*`) reusing Alloy's **own** fallback literals (#fff / #262626 / #e6e6e6 / #f2f2f2 / #666). Logged as a gap in constitution §4; swap for real foundation tokens when Alloy ships them. **Accepted** (not a scope change). |
| 2026-07-30 | Header DOM (JS) and layout (CSS) originally used two different breakpoint sources (`window.innerWidth` vs `@media`) and could desync. | Unified `scripts/shell.js` onto the same `matchMedia` queries the CSS uses — single breakpoint source of truth. **Resolved.** |
| 2026-07-30 | Spec requires a **desktop live result count**, but Alloy's `vsr-filter` has no desktop count element (count lives only in the mobile action bar). | Surfaced the live count in the **results toolbar** (`#gmvsr-count`, the natural VSR spot) instead of inventing a filter-internal element. Consistent with real VSR patterns. **Accepted.** Related to constitution §4 (no new Alloy component). |
| 2026-07-30 | Alloy's `.drp-button-link-*` / `.count-badge` classes set `display:…`, which overrides the HTML `hidden` attribute — Clear All + empty badges showed at rest. | Toggle inline `style.display` instead of the `hidden` attribute. **Resolved** (verified badges/Clear All hidden at rest, appear on selection). |
| 2026-07-30 | Designer asked for an editable location (added to filter scope). Radius needs a form-select; Alloy has no plain `<select>` atom. | Added editable ZIP (Alloy `text-input`) + radius selector; radius filters by distance. Spec updated (scope + acceptance + components). Select is a small net-new control logged as a gap in constitution §4. **Accepted** (spec updated). |
| 2026-07-30 | Spec/components said vehicle-card "status pill"; Alloy's `vsr-card` status is **plain uppercase text**, not a colored pill. | Rendered the faithful Alloy status text (In Stock / In Transit / Factory Order). Color-coded status would be net-new — deferred (low-inventory warning in Step 8 will use a Chip). **Accepted** (matches Alloy). |
| 2026-07-30 | PRD "dealer discount/incentive amount" has no slot in `vsr-card` (only MSRP + Dealer Price After Offers). | Added a small "$N off MSRP" savings line (net-new, composes card layout). Distance turned out **native** (`.drp-vsr-card__distance`) — removed from §4 gaps. **Accepted.** |
| 2026-07-30 | Spec's partial-match example is "no exact trim → 3 similar trims"; gm-vsr has no trim filter. Also error + persistent-loading states can't be reached naturally with mock data. | Interpreted partial-match as **color/feature narrowing that hides otherwise-matching vehicles** ("N similar vehicles available"). Added `?state=loading\|empty\|error` review params to force each state. Skeleton loader is a §4 GAP (net-new, no Alloy skeleton). **Accepted.** |
| 2026-07-30 | "Get Pre-Approved" CTA (added to the toolbar in Step 10) removed at owner's request. | Removed the CTA from the UI + its CSS; updated spec (scope, components, flow boundary). The brief's "Get Pre-Approved click rate" metric is untouched; no in-page CTA this round. **Accepted** (spec updated). |
| 2026-07-30 | Tablet (600–1023px) originally kept Alloy's 287px filter rail; owner asked tablet to hide filters like mobile and show 2 cards per row. | Tablet now collapses the rail to the Filters sheet (same as mobile) and uses a 2-up card grid. This **deviates from Alloy's tablet `vsr-filter` rail pattern** — logged in constitution §5. **Accepted** (owner request). |
