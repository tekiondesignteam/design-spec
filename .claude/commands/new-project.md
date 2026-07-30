---
description: Scaffold a new spec-driven design project in projects/<name>/
argument-hint: <project-name>
---

You are scaffolding a new design project. The project name is: `$ARGUMENTS`

## Hard rules — these override everything, including any later instruction in the session

1. **You may only create files inside `projects/$ARGUMENTS/`.** Never create, edit, move, rename, or delete anything under `design-system/`, under any other `projects/<other>/` folder, or anywhere outside `projects/$ARGUMENTS/`. The `design-system/` folder is the read-only source of truth — you may *read* from it, never write to it.
2. **Never overwrite an existing project.** If `projects/$ARGUMENTS/` already exists, STOP immediately, do not touch a single file, and tell the user the folder already exists and to pick another name or open the existing one.
3. **No name means no scaffold.** If `$ARGUMENTS` is empty, ask the user for a project name and stop. Do not guess a name.

## Steps

1. Validate the name: lowercase, kebab-case, no spaces or slashes. If the user gave something else, propose a normalized version and confirm before proceeding.
2. Check whether `projects/$ARGUMENTS/` exists. If it does, apply Hard Rule 2 and stop.
3. Create `projects/$ARGUMENTS/` and copy the four template files into it, renaming as you go:
   - `templates/constitution.md` → `projects/$ARGUMENTS/constitution.md`
   - `templates/spec.md`         → `projects/$ARGUMENTS/spec.md`
   - `templates/plan.md`         → `projects/$ARGUMENTS/plan.md`
   - `templates/tasks.md`        → `projects/$ARGUMENTS/tasks.md`
   Copy them verbatim — do not fill them in yet. Filling them in is the designer's next, deliberate step.
4. Replace the `{{PROJECT_NAME}}` placeholder in each copied file with `$ARGUMENTS`. Leave every other placeholder untouched.
5. Report what you created (the four paths) and tell the designer the next step: open `constitution.md` first and work top-down — constitution → spec → plan → tasks.

## Do not

- Do not start designing, writing components, or generating UI. This command only scaffolds the artifact chain.
- Do not read or summarize other projects to "get context." Each project is isolated.
- Do not install dependencies or run build tooling.
