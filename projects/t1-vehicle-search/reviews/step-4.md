# Step 4 review — Empty / no-match state

**Built:** `vehicleSearchEmpty` in `RESPONSES` + a `?scenario=` seed switch + a `<SuggestionList>` render below the `<Response>` in [`index.html`](../index.html).
**Date:** 2026-07-30  |  **Owner:** jrajan
**How to view:** `…/index.html?scenario=empty` (default `?scenario=match` unchanged).

![Step 4 — no-match response with broaden-search suggestions, no card](step-4/frame-01-empty.png)

---

## AC-8 — Zero-match shows a message + SuggestionList, no ListingCard

For a query with no matches (seeded as "find me a Toyota Supra from my inventory"), T1 renders a `<Response>`:
- Title: **"No Toyota Supras found in your inventory"**
- Body: "There are no Toyota Supras in stock at Tachyon Motors right now. Try broadening the search:"
- Followed by a `<SuggestionList>`: **Include used inventory · Try another model · Show all Toyotas in stock**.

DOM-verified: `listingCardCount = 0` (no results card), suggestion list present with the 3 items.
**Result:** ✅ matches spec.

## Notes / decisions

- **Model consistency fix:** first pass seeded a Ferrari query but reused "Camrys" copy — corrected so the query, title, and body all say *Toyota Supra* (a Toyota plausibly out of stock; keeps the "Show all Toyotas" suggestion coherent). AC-8 gave the copy as "e.g.", so a different model is fine.
- **Voice:** phrased "No Toyota Supras found…" (no "I"), consistent with Step 2's voice call.
- **Suggestions placement:** the dashed-border `contentSlot` is for cards, so the `<SuggestionList>` renders as a sibling **below** the Response (welcome-style), left-aligned to the body via `var(--t1-space-6)`.
- **Scenario switch:** added `?scenario=match|empty` so each state is reviewable in isolation. Regression-checked: default (`match`) still shows "Found 4 Camrys", 1 card, 4 rows, photos visible.
- ⚠️ **Minor (defer to Step 6 polish):** the Response's feedback row (thumbs/copy/regenerate) currently renders above the suggestions on the empty state. Harmless, but could be suppressed (`showFeedback={false}`) for a cleaner empty state — will revisit in polish.

## Checkpoint

AC-8 passes; match scenario unaffected. Ready for review before Step 5 (loading / searching state + inventory-lookup error state).
