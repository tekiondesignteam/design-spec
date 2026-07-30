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

1. **Validate the name:** lowercase, kebab-case, no spaces or slashes. If the user gave something else, propose a normalized version and confirm before proceeding.

2. **Determine the design system** (there can be several — this is a required choice, not a default):
   - List what's available: the subfolders of `design-systems/` (e.g. `ls -1 design-systems/`).
   - If a second argument was given AND it exactly matches one of those folders, use it.
   - Otherwise, **ask the designer which design system this project uses**, presenting the available options. Wait for their answer — do not guess or silently pick one.
   - If the designer needs a design system that isn't listed, STOP: designers cannot add design systems (they are read-only). Tell them to ask a maintainer to add it under `design-systems/`, then re-run.
   - Record the chosen folder name — this is `<design-system>` below.

3. **Check for collision:** if `projects/<name>/` already exists, apply Hard Rule 2 and stop **now** — before the questionnaire, so you don't waste the designer's time.

4. **Generate the constitution from the design system.** Do NOT ask the designer for visual direction — it is inherited from the chosen design system, which is the source of truth. Read that system's own documentation and derive the constitution's §2 (visual direction) and §3 (anchors) from it:
   - Read `design-systems/<design-system>/README.md`, `design-systems/<design-system>/CLAUDE.md`, and `design-systems/<design-system>/ui_kit/docs/INDEX.md` (whichever exist).
   - From those, write a short **summary** into constitution §2: look & feel; type / density / spacing; anti-patterns (pull these from the design system's own "hard rules" / "brand essentials" / "never do" content); and the available surfaces. Keep it a summary with pointers — the design-system docs remain authoritative, and the constitution must never restate token *values* (those live only in `tokens.scss`).
   - Leave §3 pointing at the design system's token files and component catalog. Leave "components this project uses" for the spec to narrow (default: any component in the catalog).
   - The only thing you may ask the designer is whether this project **intentionally deviates** from the design system's defaults. Default is "none" (§5). Don't ask about anything the design system already answers.

5. **Scaffold.** Create `projects/<name>/` and copy the four template files into it, renaming as you go:
   - `templates/constitution.md` → `projects/<name>/constitution.md`
   - `templates/spec.md`         → `projects/<name>/spec.md`
   - `templates/plan.md`         → `projects/<name>/plan.md`
   - `templates/tasks.md`        → `projects/<name>/tasks.md`

6. **Fill in the files:**
   - Write `constitution.md` with §2 (visual direction) and §3 (anchors) **generated from the design system** per step 4. Leave §1 (boundaries), §4 (gaps), §5 (deviations = "none"), and §6 (done) as-is.
   - Across all four files, fill the auto-derivable placeholders (use shell values, don't hand-type):
     - `{{PROJECT_NAME}}` → the project name
     - `{{DESIGN_SYSTEM}}` → `<design-system>`
     - `{{DESIGNER_NAME}}` → `git config user.name` (fall back to the local-part of `git config user.email`)
     - `{{DATE}}` → `date +%Y-%m-%d`
   - Leave `spec.md`, `plan.md`, `tasks.md` as scaffolds — those get filled in the next deliberate steps.

7. **Report:** the four paths created, the design system it's pinned to, and a short summary of the visual direction you captured. Then tell the designer the next step: review `constitution.md`, then move on to `spec.md`.

## Do not

- Do not start designing, writing components, or generating UI. This command only scaffolds the artifact chain (and fills the constitution from the questionnaire).
- Do not read or summarize other projects to "get context." Each project is isolated.
- Do not read from, or mix in, any design system other than the one chosen in step 2.
- Do not install dependencies or run build tooling.
