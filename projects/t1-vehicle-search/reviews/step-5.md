# Step 5 review — Loading + error states

**Built:** `?scenario=loading` (frozen searching turn) + `vehicleSearchError` response via `?scenario=error` in [`Vehicle Search.html`](../Vehicle%20Search.html).
**Date:** 2026-07-30  |  **Owner:** jrajan
**How to view:** `…?scenario=loading` and `…?scenario=error`.

## AC-9 — Searching state shows, no results card yet

![Loading — ReasoningLog in-progress, no card, composer disabled](step-5/frame-loading.png)

The `loading` scenario starts the turn in the template's `thinking` phase (no auto-advance, so it holds for review). The thread shows the user bubble and the in-progress `<ReasoningLog>` — "Thinking… · Searching your inventory… · Matching make & model… · Ranking available units.." — with **no `<ListingCard>`** and the `<PromptInput>` disabled. DOM-verified `cards = 0`, `responseTitle = null`, `promptDisabled = true`. This is the native T1 streaming/searching behavior; the results card only appears once the turn resolves (shown by the `match` scenario).
**Result:** ✅ matches spec.

## AC-10 — Inventory-lookup error: message + Try again, no card

![Error — couldn't reach inventory + Try again / Contact support, no card](step-5/frame-error.png)

The `error` scenario renders a `<Response>`:
- Title: **"Couldn't reach your inventory"**
- Body: "Something went wrong loading your inventory just now. Please try again in a moment."
- Followed by a `<SuggestionList>`: **Try again** (arrow-clockwise) · **Contact support** (headset).

DOM-verified: `cards = 0` (no results card), no ReasoningLog (error carries no steps), and the suggestions include "Try again".
**Result:** ✅ matches spec.

## Notes

- **Voice:** "Couldn't reach your inventory" (no "I"), consistent with prior steps.
- **Scenario switch reused:** `loading` and `error` join `match`/`empty` under `?scenario=`; each state reviewable in isolation. Default (`match`) remains the on-load view.
- Same minor item as Step 4 (feedback row appears above the error suggestions) — batched into Step 6 polish.

## Checkpoint

AC-9 and AC-10 pass. All four spec states (success / empty / loading / error) are now built. Ready for review before Step 6 (polish + responsive + final AC-1…AC-11 pass).
