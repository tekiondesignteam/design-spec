# Design systems — sources of truth (read-only for designers)

Each subfolder here is one design system (e.g. `t1/`, `alloy/`). A project picks
**exactly one** at creation via `/new-project`, and that choice is recorded in the
project's `constitution.md`.

Rules:
- Everything under `design-systems/` is **read-only** for designers. Reference these
  files; never edit them. Edits are blocked by `hooks/pre-commit`.
- A project uses only its own chosen design system — never mixes two.
- Only a maintainer adds a new design system, by adding a new subfolder here.
