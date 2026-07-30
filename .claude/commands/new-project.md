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

4. **Run the constitution questionnaire.** As soon as the design system is chosen, walk the designer through a short questionnaire that captures their `constitution.md` — so it comes out filled, not blank. Use the AskUserQuestion tool (batch up to 4 questions per prompt). Ground the options in the chosen design system: skim `design-systems/<design-system>/` (e.g. its `README.md`, `ui_kit/docs/INDEX.md`, `tokens.scss`) first so your suggestions match what actually exists.

   Capture these (they map to constitution §2 and §3):
   - **Look and feel** — offer a few archetypes (e.g. "Calm, data-dense, enterprise", "Bold, spacious, consumer", "Minimal, utilitarian"), plus custom.
   - **Density** — compact / comfortable / spacious.
   - **Primary surface(s)** — offer common shells (e.g. left-nav settings, card grid / dashboard, full-page flow / wizard, chat / conversation). Multi-select is fine.
   - **What it should NOT look like** — anti-references that keep the design from drifting; offer a couple of common ones plus custom.
   - **Components in scope** — read the design system's component catalog and propose a starter set relevant to the surfaces chosen above; let the designer add/remove in chat. Do NOT force a fixed multiple-choice list — the catalog is large.

   For the §3 token anchors (color / type / spacing): do not quiz value-by-value. Point to the design system's token files (`design-systems/<design-system>/tokens.scss`, `colors_and_type.css`) and note that all of that system's tokens are in scope unless the designer restricts them here.

   If the designer answers "skip" / "not sure" for any item, leave that section's placeholder intact for them to fill later — a partial constitution is fine.

5. **Scaffold.** Create `projects/<name>/` and copy the four template files into it, renaming as you go:
   - `templates/constitution.md` → `projects/<name>/constitution.md`
   - `templates/spec.md`         → `projects/<name>/spec.md`
   - `templates/plan.md`         → `projects/<name>/plan.md`
   - `templates/tasks.md`        → `projects/<name>/tasks.md`

6. **Fill in the files:**
   - Write `constitution.md` **filled** from the questionnaire: replace the §2 (visual direction) and §3 (anchors) placeholders with the designer's answers. Leave §1, §4, §5 as-is (boundaries and done-criteria are boilerplate; gaps emerge later).
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
