# {{PROJECT_NAME}} — Tasks

> The granular checklist. Each task is one checkable behavior drawn straight from the spec's acceptance criteria. Check things off as they're built. This file is also the **drift log** — if the built UI diverges from the spec, record it here rather than silently accepting it.

**Owner:** {{DESIGNER_NAME}}  |  **Last updated:** {{DATE}}

---

## Drift check (run this at every checkpoint)

Before checking off a task, ask:

- Does this task cite a real spec criterion (`[AC-n]`), and does what I built satisfy **that exact criterion**, word for word?
- Does it use **only {{DESIGN_SYSTEM}} tokens/components** (constitution §3)?
- Is it a **single browser-openable HTML file with no build step** (plain HTML/CSS/JS, or React/JSX via Babel Standalone), using {{DESIGN_SYSTEM}}'s tokens/CSS per its `CLAUDE.md`?
- Did I touch **anything outside `projects/{{PROJECT_NAME}}/`**? (If yes — that's a violation, revert it.)
- Did any decision quietly change since the spec was written? If so, **update the spec first**, then continue.

If any answer is wrong, log it under "Drift log" below instead of checking the box.

---

## Tasks

Grouped by plan step. **One behavior per line, each citing the spec acceptance criterion it satisfies** — format: `- [ ] [AC-n] behavior`. A task with no `[AC-n]` means either the spec is missing that criterion (add it to `spec.md`) or the task is out of scope (drop it). A box is only ticked once the cited AC is demonstrably true in the browser and the drift check passes.

### Step 1 — {{Shell / layout}}
- [ ] [AC-_] {{behavior}}
- [ ] [AC-_] {{behavior}}
- _Review:_ `reviews/step-1.md` (browser walkthrough of the ACs above)

### Step 2 — {{First section}}
- [ ] [AC-_] {{behavior}}
- [ ] [AC-_] {{behavior}}
- _Review:_ `reviews/step-2.md`

### Step 3 — {{States}}
- [ ] [AC-_] Empty state: {{}}
- [ ] [AC-_] Loading state: {{}}
- [ ] [AC-_] Error state: {{}}
- [ ] [AC-_] Success state: {{}}
- _Review:_ `reviews/step-3.md`

## Coverage (check at the final checkpoint)

- [ ] Every `AC-n` in `spec.md` is cited by at least one task above (no orphaned criteria).
- [ ] Every task cites a real `AC-n` (no tasks without a source criterion).
- [ ] Every build step has a `reviews/step-N.md` walkthrough showing its cited ACs passing in the browser.

---

## Drift log

Record anything that diverged from the spec, and how it was resolved (spec updated / reverted / accepted with sign-off).

| Date | What drifted | Resolution |
|------|--------------|------------|
| {{}} | {{}} | {{}} |
