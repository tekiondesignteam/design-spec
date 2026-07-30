# {{PROJECT_NAME}} — Plan

> The plan turns the spec into an **ordered set of checkpointed build steps**. Its job is to fight drift: each step is small enough to finish and verify before moving on, and every step begins by re-reading the spec so decisions don't get lost over a long session.

**Owner:** {{DESIGNER_NAME}}  |  **Last updated:** {{DATE}}

---

## The rule for every step (do not skip)

Before starting **any** step below:

1. **Re-read `constitution.md` and `spec.md`.** Do not work from memory of them — long sessions lose the details.
2. Confirm the step is still in scope per the spec. If the spec doesn't cover it, stop and update the spec first.
3. Build only what the step describes. Do not pull work forward from later steps.

After finishing each step:

4. Check the result against the spec's acceptance criteria and states for that step.
5. **Record a walkthrough for review.** Open the built HTML in the browser, drive each cited `AC-n` for this step (click / type / scroll), and screenshot the frames into `projects/{{PROJECT_NAME}}/reviews/step-N/`. Then write `projects/{{PROJECT_NAME}}/reviews/step-N.md` — one section per AC, each embedding its frame(s) (`![AC-3 — card expands](step-N/frame-02.png)`) with a one-line result (✅ matches spec / ⚠️ note). This markdown is the visual evidence behind the ticked boxes.
6. Update `tasks.md` — check off what's done, link `reviews/step-N.md` next to the step, and note anything that drifted.
7. **Stop and let the designer review before the next step** (they review `reviews/step-N.md`). Checkpoints are where drift gets caught.

---

## Build order

Order steps so each produces something reviewable. Layout/shell first, then sections, then states, then polish.

### Step 1: {{Shell / layout}}
- **Builds:** {{}}
- **Satisfies:** {{AC-IDs from spec, e.g. AC-1, AC-2}}
- **Done when:** {{those ACs are demonstrably true in the browser}}
- **Re-read spec:** ☐ (check before starting)

### Step 2: {{First section / component}}
- **Builds:** {{}}
- **Done when:** {{}}
- **Re-read spec:** ☐

### Step 3: {{States — empty / loading / error}}
- **Builds:** {{}}
- **Done when:** {{}}
- **Re-read spec:** ☐

### Step N: {{Polish / responsive}}
- **Builds:** {{}}
- **Done when:** {{}}
- **Re-read spec:** ☐

---

## Guardrails carried from the constitution

- Work only inside `projects/{{PROJECT_NAME}}/`.
- Everything under `design-systems/` is read-only. Use only this project's design system — **{{DESIGN_SYSTEM}}** (`design-systems/{{DESIGN_SYSTEM}}/`) — never another.
- Only {{DESIGN_SYSTEM}} tokens/components — gaps get flagged, not invented.
- **Ship a single browser-openable HTML file — no build step.** Either plain HTML/CSS/JS, or React/JSX via Babel Standalone inline (like T1's `chat-interface.html`). Never a Vite/TS/webpack app. Use {{DESIGN_SYSTEM}}'s tokens/CSS/components per `design-systems/{{DESIGN_SYSTEM}}/CLAUDE.md`; if its native workflow assumes a bundler, render via Babel or use its CSS classes in plain HTML instead.
