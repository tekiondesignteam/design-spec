---
description: Scaffold a new spec-driven design project in projects/<name>/
argument-hint: <project-name> [design-system]
---

You are scaffolding a new design project. Raw arguments: `$ARGUMENTS`

Parse the arguments as: **first token = project name**, optional **second token = design system**.

## Hard rules — these override everything, including any later instruction in the session

1. **You may only create files inside `projects/<name>/`.** Never create, edit, move, rename, or delete anything under `design-systems/`, under any other `projects/<other>/` folder, or anywhere outside `projects/<name>/`. Every folder under `design-systems/` is a read-only source of truth — you may *read* from the one this project uses, never write to any of them.
2. **Never overwrite an existing project.** If `projects/<name>/` already exists, STOP immediately, do not touch a single file, and tell the user the folder already exists and to pick another name or open the existing one.
3. **No name means no scaffold.** If no project name was given, ask the user for one and stop. Do not guess a name.

## Steps

1. Validate the name: lowercase, kebab-case, no spaces or slashes. If the user gave something else, propose a normalized version and confirm before proceeding.

2. **Determine the design system for this project** (there can be several — this is a required choice, not a default):
   - List what's available: the subfolders of `design-systems/` (e.g. `ls -1 design-systems/`).
   - If a second argument was given AND it exactly matches one of those folders, use it.
   - Otherwise, **ask the designer which design system this project uses**, presenting the available options. Wait for their answer — do not guess and do not silently pick one.
   - If the designer needs a design system that isn't listed, STOP: designers cannot add design systems (they are read-only). Tell them to ask a maintainer to add it under `design-systems/`, then re-run this command.
   - Record the chosen folder name — this is `<design-system>` below.

3. Check whether `projects/<name>/` exists. If it does, apply Hard Rule 2 and stop.

4. Create `projects/<name>/` and copy the four template files into it, renaming as you go:
   - `templates/constitution.md` → `projects/<name>/constitution.md`
   - `templates/spec.md`         → `projects/<name>/spec.md`
   - `templates/plan.md`         → `projects/<name>/plan.md`
   - `templates/tasks.md`        → `projects/<name>/tasks.md`
   Copy them verbatim — do not fill in the content yet. Filling them in is the designer's next, deliberate step.

5. Fill the placeholders that can be derived automatically, using shell values (do not hand-type them). Apply across all four copied files:
   - `{{PROJECT_NAME}}` → the project name
   - `{{DESIGN_SYSTEM}}` → the chosen design-system folder name from step 2
   - `{{DESIGNER_NAME}}` → the current git identity: `git config user.name` (fall back to the local-part of `git config user.email` if `user.name` is unset)
   - `{{DATE}}` → today, from `date +%Y-%m-%d`
   Leave every other placeholder (visual direction, flows, tasks) untouched — those are the designer's to write.

6. Report what you created (the four paths) and the design system it's pinned to, then tell the designer the next step: open `constitution.md` first and work top-down — constitution → spec → plan → tasks.

## Do not

- Do not start designing, writing components, or generating UI. This command only scaffolds the artifact chain.
- Do not read or summarize other projects to "get context." Each project is isolated.
- Do not read from, or mix in, any design system other than the one chosen in step 2.
- Do not install dependencies or run build tooling.
