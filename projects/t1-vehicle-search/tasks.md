# t1-vehicle-search — Tasks

> The granular checklist. Each task is one checkable behavior drawn straight from the spec's acceptance criteria. Check things off as they're built. This file is also the **drift log** — if the built UI diverges from the spec, record it here rather than silently accepting it.

**Owner:** jrajan  |  **Last updated:** 2026-07-30

---

## Drift check (run this at every checkpoint)

Before checking off a task, ask:

- Does this task cite a real spec criterion (`[AC-n]`), and does what I built satisfy **that exact criterion**, word for word?
- Does it use **only t1 tokens/components** (constitution §3)?
- Is it a **single browser-openable HTML file with no build step** (plain HTML/CSS/JS, or React/JSX via Babel Standalone), using t1's tokens/CSS per its `CLAUDE.md`?
- Did I touch **anything outside `projects/t1-vehicle-search/`**? (If yes — that's a violation, revert it.)
- Did any decision quietly change since the spec was written? If so, **update the spec first**, then continue.

If any answer is wrong, log it under "Drift log" below instead of checking the box.

---

## Tasks

Grouped by plan step. **One behavior per line, each citing the spec acceptance criterion it satisfies** — format: `- [ ] [AC-n] behavior`. A task with no `[AC-n]` means either the spec is missing that criterion (add it to `spec.md`) or the task is out of scope (drop it). A box is only ticked once the cited AC is demonstrably true in the browser and the drift check passes.

### Step 1 — Fork the template + seed the turn ✅ (2026-07-30)
- [x] [AC-1] Forked `chat-interface.html` opens with the user query as a right-aligned `<ChatBubble>` ("find me a Toyota Camry from my inventory"), shell/chrome unmodified.
- [x] [AC-11] Output is a single browser-openable fork using T1 components + `$t1-*` tokens only; asset paths resolve; no blocking console errors (benign React createRoot warning on re-nav only — logged in drift log).
- _Review:_ [`reviews/step-1.md`](reviews/step-1.md) (browser walkthrough of the ACs above)

### Step 2 — Happy-path result (summary + ListingCard) ✅ (2026-07-30)
- [x] [AC-2] AI `<Response>` opens with the sentence-case count summary ("Found 4 Camrys in your inventory" — "I" dropped per T1 voice; see drift log).
- [x] [AC-3] Matches render as **one** `<ListingCard>` with one row per vehicle (DOM: 1 card, 4 rows).
- [x] [AC-4] Each row shows YMMM (`title`), VIN (`description`), Stock# (`id`), Type, and Transmission (`subtitle1`). (Image handled in Step 3.)
- [x] [AC-5] New/Used type renders as a `<Chip>` via ListingCard `chip`/`chipColor` (New=primary, Used=neutral).
- [x] [AC-7] Rows are display-only — no `onItemClick`, no pointer cursor (DOM-verified).
- _Review:_ [`reviews/step-2.md`](reviews/step-2.md)

### Step 3 — Vehicle photo thumbnail (deviation) ✅ (2026-07-30)
- [x] [AC-4] Vehicle photo thumbnail present in the row prefix slot (rows 1–3), completing the six-field row.
- [x] [AC-6] Thumbnail is 40×40px at `$t1-radius-xs` (DOM-verified); row 4 has no photo → neutral placeholder, no broken-image icon.
- [x] [AC-11] Slot chrome uses `$t1-*` tokens only, no new libs; within `constitution.md §5` (deviation broadened — see drift log & §5).
- _Review:_ [`reviews/step-3.md`](reviews/step-3.md)

### Step 4 — Empty state (no matches) ✅ (2026-07-30)
- [x] [AC-8] Zero-match query (`?scenario=empty`) shows a `<Response>` ("No Toyota Supras found…") + a `<SuggestionList>` (Include used / Try another model / Show all Toyotas); DOM-verified no `<ListingCard>`.
- _Review:_ [`reviews/step-4.md`](reviews/step-4.md)

### Step 5 — Loading + error states ✅ (2026-07-30)
- [x] [AC-9] Searching state (`?scenario=loading`): in-progress `<ReasoningLog>`, no card, composer disabled (DOM-verified); card appears only on resolve (match scenario).
- [x] [AC-10] Error (`?scenario=error`): `<Response>` "Couldn't reach your inventory" + `<SuggestionList>` with "Try again" (+ Contact support); no `<ListingCard>`.
- _Review:_ [`reviews/step-5.md`](reviews/step-5.md)

### Step 6 — Polish + responsive review ✅ (2026-07-30)
- [x] [AC-11] Final pass: locked chrome diff = identical to template; additions all `.veh-*` scoped, tokens only; ListingCard narrow container-query verified + no overflow; fullscreen surface verified; empty/error feedback row suppressed; all of AC-1…AC-10 re-confirmed in-browser.
- _Review:_ [`reviews/step-6.md`](reviews/step-6.md)

## Coverage (check at the final checkpoint)

- [x] Every `AC-n` in `spec.md` is cited by at least one task above (AC-1…AC-11 all covered; no orphaned criteria).
- [x] Every task cites a real `AC-n` (no tasks without a source criterion).
- [x] Every build step (1–6) has a `reviews/step-N.md` walkthrough showing its cited ACs passing in the browser.

---

## Drift log

Record anything that diverged from the spec, and how it was resolved (spec updated / reverted / accepted with sign-off).

| Date | What drifted | Resolution |
|------|--------------|------------|
| 2026-07-30 | React `createRoot()` "already passed to createRoot" warning fires when the fork is re-navigated/resized in the same tab. | Accepted — inherited from the canonical template's `t1:ready` mount pattern (not introduced by this fork); no rendering impact. Not a spec deviation. |
| 2026-07-30 | AC-2 example copy said "I found 4 Camrys…"; used "Found 4 Camrys in your inventory" instead. | Resolved — T1 brand voice (`CLAUDE.md`) says avoid "I" outside the greeting; AC-2 gave the wording as "e.g.", so the count-summary criterion is still satisfied. No spec change needed. |
| 2026-07-30 | Kit hides `.t1-lc__avatar` in the narrow AI panel via `@container t1-response (max-width:500px)`, hiding the Step-3 thumbnail in the specced popover/docked scenario. | Overrode the hide for the scoped `.veh-listing` card (higher specificity, no `!important`) so the brief-required photo shows in-panel. **Broadens the §5 deviation** — recorded in `constitution.md §5`; flagged in `reviews/step-3.md`. **Signed off by jrajan 2026-07-30 — keep the override.** |
| 2026-07-30 | Post-build request: swap placeholder SVG thumbnails for real photos. | Fetched 3 royalty-free CC-BY-SA car photos via LoremFlickr (rows 1–3); row 4 kept as the neutral placeholder to preserve the AC-6 missing-photo demo. Attribution in `assets/vehicles/NOTICE.md`. Generic stock cars, not exact Camry trims — replace with licensed dealer photos for production. |
