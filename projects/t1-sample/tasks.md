# t1-sample — Tasks

> The granular checklist. Each task is one checkable behavior drawn straight from the spec's acceptance criteria. Check things off as they're built. This file is also the **drift log** — if the built UI diverges from the spec, record it here rather than silently accepting it.

**Owner:** jrajan  |  **Last updated:** 2026-07-30

---

## Drift check (run this at every checkpoint)

Before checking off a task, ask:

- Does what I built match the **spec's acceptance criteria** for it, word for word?
- Does it use **only t1 tokens/components** (constitution §3)?
- Did I touch **anything outside `projects/t1-sample/`**? (If yes — that's a violation, revert it.)
- Did any decision quietly change since the spec was written? If so, **update the spec first**, then continue.

If any answer is wrong, log it under "Drift log" below instead of checking the box.

---

## Tasks

Grouped by plan step. One behavior per line.

### Step 1 — {{Shell / layout}}
- [ ] {{behavior}}
- [ ] {{behavior}}

### Step 2 — {{First section}}
- [ ] {{behavior}}
- [ ] {{behavior}}

### Step 3 — {{States}}
- [ ] Empty state: {{}}
- [ ] Loading state: {{}}
- [ ] Error state: {{}}
- [ ] Success state: {{}}

---

## Drift log

Record anything that diverged from the spec, and how it was resolved (spec updated / reverted / accepted with sign-off).

| Date | What drifted | Resolution |
|------|--------------|------------|
| {{}} | {{}} | {{}} |
