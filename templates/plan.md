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
5. Update `tasks.md` — check off what's done, note anything that drifted.
6. **Stop and let the designer review before the next step.** Checkpoints are where drift gets caught.

---

## Build order

Order steps so each produces something reviewable. Layout/shell first, then sections, then states, then polish.

### Step 1: {{Shell / layout}}
- **Builds:** {{}}
- **Done when:** {{acceptance criteria from spec}}
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
- `design-system/` is read-only.
- Only design-system tokens/components — gaps get flagged, not invented.
