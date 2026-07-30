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
5. **Record a walkthrough for review.** Open the built HTML in the browser and drive each cited `AC-n` for this step (click / type / scroll). **Capture at every breakpoint {{DESIGN_SYSTEM}} defines** (constitution §3): resize the viewport to a representative width in each tier and screenshot the flow at each (e.g. an Alloy project → mobile `<600` / tablet `600–1024` / desktop `≥1024`). If the system is panel-relative with no viewport breakpoints (e.g. T1), capture at its relevant panel/dock states instead. Save frames under `projects/{{PROJECT_NAME}}/reviews/step-N/`, named by breakpoint + AC (e.g. `desktop/AC-3-02.png`). Then write `projects/{{PROJECT_NAME}}/reviews/step-N.md` — one section per AC, embedding its frames **grouped by breakpoint**, each with a one-line result (✅ matches spec / ⚠️ note). This markdown is the visual evidence behind the ticked boxes.

   Verify each AC **two ways**: **(a)** the visual frame above, and **(b)** a **DOM/assertion check** for anything a screenshot can't prove — element counts, cursor/pointer state, overflow/scroll, and a "shell unchanged" diff. Seed independently-reviewable states with a `?scenario=` / `?panel=` query switch so each AC/state loads and captures on its own.
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

### Optional — Portable build (only if handing off outside the repo)
Produce a self-contained variant that **inlines the kit bundle + tokens** (no `fetch()`), so it opens by double-click for a stakeholder who doesn't have the repo.
- ✅ one double-clickable file, no server
- ⚠️ embeds a copy of the design system (larger; diverges from the "reference the DS" model)
- ⚠️ still needs internet for CDN deps (React / Babel / Phosphor) unless those are inlined too

Skip this for normal in-repo review (serve the file instead). Track it with the checkbox in `tasks.md`.

---

## Guardrails carried from the constitution

- Work only inside `projects/{{PROJECT_NAME}}/`.
- Everything under `design-systems/` is read-only. Use only this project's design system — **{{DESIGN_SYSTEM}}** (`design-systems/{{DESIGN_SYSTEM}}/`) — never another.
- Only {{DESIGN_SYSTEM}} tokens/components — gaps get flagged, not invented.
- **Ship a single HTML file, no build step — run via a local static server, not `file://`.** Either plain HTML/CSS/JS, or React/JSX via Babel Standalone inline (like T1's `chat-interface.html`). Never a Vite/TS/webpack app. `file://` breaks any fork that `fetch()`es its kit bundle — always serve over http (see this project's `RUN.md`). Use {{DESIGN_SYSTEM}}'s tokens/CSS/components per `design-systems/{{DESIGN_SYSTEM}}/CLAUDE.md`; if its native workflow assumes a bundler, render via Babel or use its CSS classes in plain HTML instead.
- **The deliverable is always `projects/{{PROJECT_NAME}}/index.html`** — named `index.html` so it serves at the folder root (`…/projects/{{PROJECT_NAME}}/`), no filename in the URL. Any *other* files (assets, extra variants) are **kebab-case, no spaces, no leading `_`** (e.g. `placeholder.svg`); leading underscores get dropped by GitHub Pages/Jekyll. Keep the human-readable title in `<title>` / the NavBar, not the filename.
