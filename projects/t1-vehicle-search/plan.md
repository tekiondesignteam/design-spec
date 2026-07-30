# t1-vehicle-search — Plan

> The plan turns the spec into an **ordered set of checkpointed build steps**. Its job is to fight drift: each step is small enough to finish and verify before moving on, and every step begins by re-reading the spec so decisions don't get lost over a long session.

**Owner:** jrajan  |  **Last updated:** 2026-07-30

---

## The rule for every step (do not skip)

Before starting **any** step below:

1. **Re-read `constitution.md` and `spec.md`.** Do not work from memory of them — long sessions lose the details.
2. Confirm the step is still in scope per the spec. If the spec doesn't cover it, stop and update the spec first.
3. Build only what the step describes. Do not pull work forward from later steps.

After finishing each step:

4. Check the result against the spec's acceptance criteria and states for that step.
5. **Record a walkthrough for review.** Open the built HTML in the browser, drive each cited `AC-n` for this step (click / type / scroll), and screenshot the frames into `projects/t1-vehicle-search/reviews/step-N/`. Then write `projects/t1-vehicle-search/reviews/step-N.md` — one section per AC, each embedding its frame(s) (`![AC-3 — card expands](step-N/frame-02.png)`) with a one-line result (✅ matches spec / ⚠️ note). This markdown is the visual evidence behind the ticked boxes.
6. Update `tasks.md` — check off what's done, link `reviews/step-N.md` next to the step, and note anything that drifted.
7. **Stop and let the designer review before the next step** (they review `reviews/step-N.md`). Checkpoints are where drift gets caught.

---

## Build order

Order steps so each produces something reviewable. Fork the shell first, then the happy-path result, then the unhappy states, then polish. Everything lives in **one fork** of `design-systems/t1/ui_kit/template/chat-interface.html` at the project root (e.g. `index.html`); each step adds/refines a `RESPONSES` entry and its `matchResponse()` routing — nothing is built from scratch.

### Step 1: Fork the template + seed the turn
- **Builds:** Copy `design-systems/t1/ui_kit/template/chat-interface.html` into `projects/t1-vehicle-search/` as `index.html`. Fix all asset paths per T1's Workflow table (tokens, components.css, manifest, loader `data-base`, fonts). Pre-seed `messages` so the fork opens on the user query — a right-aligned `<ChatBubble>` "find me a Toyota Camry from my inventory".
- **Satisfies:** AC-1, AC-11
- **Done when:** The fork opens in the browser showing the T1 shell (unmodified `.ts-menubar` / `.ts-body`) with the user `<ChatBubble>` pre-seeded in the thread; no console errors; paths resolve.
- **Re-read spec:** ☐ (check before starting)

### Step 2: Happy-path result — summary line + ListingCard
- **Builds:** A `RESPONSES` entry (routed via `matchResponse()`) rendering an AI `<Response>` whose first line is the sentence-case count summary ("I found 4 Camrys in your inventory."), followed by **one** `<ListingCard>` with 4 display-only vehicle rows. Map each row per the spec's field table: YMMM→`title`, Stock#→`id`, Type→`chip`/`chipColor`, Transmission→`subtitle1`, VIN→`description`. Rows have no `onItemClick` (no pointer).
- **Satisfies:** AC-2, AC-3, AC-4 (text fields), AC-5, AC-7
- **Done when:** The response shows the summary line and a single ListingCard with 4 rows, each surfacing YMMM, VIN, Stock#, Type chip, and Transmission; rows are non-interactive.
- **Re-read spec:** ☐

### Step 3: Vehicle photo thumbnail (signed-off deviation)
- **Builds:** Replace the ListingCard row's initials-avatar prefix with a 40×40px vehicle photo thumbnail at `$t1-radius-xs`, per the deviation in `constitution.md §5`. Add a neutral token-styled placeholder for missing/failed images (no broken-image icon). Tokens only — no hardcoded colors/sizes, no new libs.
- **Satisfies:** AC-4 (image), AC-6, AC-11
- **Done when:** Each row shows a vehicle photo in the prefix slot; forcing a broken image URL shows the placeholder, not a broken icon; the change stays within the §5 constraints.
- **Re-read spec:** ☐

### Step 4: Empty state — no matches
- **Builds:** A `RESPONSES` entry for zero results: `<Response>` line "I couldn't find any Camrys in your inventory." + a `<SuggestionList>` to broaden the search (e.g. "Include used", "Try another model", "Show all Toyotas"). No `<ListingCard>`.
- **Satisfies:** AC-8
- **Done when:** Routing to the no-match scenario shows the message + suggestions and renders no results card.
- **Re-read spec:** ☐

### Step 5: Loading + error states
- **Builds:** (a) Confirm the template's searching/streaming state shows after the query and before results resolve, with no results card visible mid-search (AC-9). (b) An error `RESPONSES` entry: `<Response>` "I couldn't reach your inventory just now." + `<SuggestionList>` including "Try again"; no `<ListingCard>` (AC-10).
- **Satisfies:** AC-9, AC-10
- **Done when:** The searching state is visible during the pending turn; the error scenario shows the message + "Try again" suggestion and no results card.
- **Re-read spec:** ☐

### Step 6: Polish + responsive review
- **Builds:** No new UI. Verify spacing/typography against T1 tokens, check ListingCard responsive behavior (<480px suffix/wrap), confirm copy casing (sentence-case values, Title-Case any button labels), and re-confirm no shell/chrome was touched and no hardcoded values crept in.
- **Satisfies:** AC-11 (and a final pass over AC-1…AC-10)
- **Done when:** All 11 ACs demonstrably hold in the browser at desktop and narrow widths; a final `reviews/step-6.md` walkthrough is recorded.
- **Re-read spec:** ☐

---

## Guardrails carried from the constitution

- Work only inside `projects/t1-vehicle-search/`.
- Everything under `design-systems/` is read-only. Use only this project's design system — **t1** (`design-systems/t1/`) — never another.
- Only t1 tokens/components — gaps get flagged, not invented.
- **Ship a single browser-openable HTML file — no build step.** Either plain HTML/CSS/JS, or React/JSX via Babel Standalone inline (like T1's `chat-interface.html`). Never a Vite/TS/webpack app. Use t1's tokens/CSS/components per `design-systems/t1/CLAUDE.md`; if its native workflow assumes a bundler, render via Babel or use its CSS classes in plain HTML instead.
