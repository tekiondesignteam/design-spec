# Session refresh — build out the spec-driven design workflow for the team

Continuing work in `desktop/spec/`. Goal of this session: finish and roll out the spec-driven project scaffolding system (templates + init command + guardrails) for a 25-designer team using a shared design-system repo.

## Where things stand
- Repo shape: shared repo with `design-system/` (source of truth, read-only for designers) and `projects/` (each new project gets its own subfolder). Designers must never write outside their own project folder or touch `design-system/`.
- Decided against a CDN for the design system (not feasible right now) — going with hard rules instead: filesystem/git-level enforcement, not just prompt instructions.
- Built and downloaded a starter package (already unzipped into `desktop/spec/` per this session) containing:
  - `.claude/commands/new-project.md` — a `/new-project <name>` slash command that scaffolds `projects/<name>/` with the four template files, refuses to overwrite an existing folder, and is hard-instructed to never touch `design-system/` or other project folders.
  - `templates/constitution.md`, `spec.md`, `plan.md`, `tasks.md` — spec-driven artifact chain. constitution.md holds hard rules + visual direction; spec.md holds problem/flows/components/states; plan.md breaks work into checkpointed steps with a re-read-spec-before-each-step rule; tasks.md is the granular checklist with a drift-check note.
  - `hooks/pre-commit` — blocks any git commit that touches `design-system/`.
- Underlying problem being solved: designers using Claude for UI work don't get what they want because of context loss (ambiguous specs) and drift (Claude losing track of decisions over long sessions, no re-anchoring).

## Next steps
1. Confirm the files landed correctly at `desktop/spec/.claude/commands/new-project.md`, `desktop/spec/templates/*.md`, `desktop/spec/hooks/pre-commit`.
2. Install the pre-commit hook: `cp desktop/spec/hooks/pre-commit .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit` (adjust if `desktop/spec/` is the repo root vs. a subfolder — confirm actual repo root path first).
3. Test-run `/new-project <test-name>` end to end: does it scaffold correctly, refuse to overwrite, and correctly avoid touching `design-system/`?
4. Fill in a real project's `spec.md` with actual component names/flows to validate the template is usable in practice, not just structurally sound.
5. Decide rollout: how the other 24 designers get this (repo update + short walkthrough, or something more formal).

## Files to open (read these, don't re-derive)
- `desktop/spec/.claude/commands/new-project.md` — the scaffolding command, has hard rules embedded in the prompt itself
- `desktop/spec/templates/constitution.md` — where project-specific hard rules + visual direction go
- `desktop/spec/templates/spec.md` — where flows/components/states get defined per project
- `desktop/spec/templates/plan.md` — checkpointed build steps + re-read-spec rule
- `desktop/spec/templates/tasks.md` — granular checklist + drift-check
- `desktop/spec/hooks/pre-commit` — git-level guardrail, not yet installed

## Avoid repeating
- CDN-based design system serving was considered and rejected (not feasible currently) — don't re-suggest it as the near-term fix.
- Don't rely on prompt-only guardrails for the design-system boundary; the pre-commit hook exists specifically because instructions alone aren't sufficient enforcement.
