---
description: Turn a designer's PRD/ask (paste, link, or document) into projects/<name>/spec.md
argument-hint: <project-name> [source: pasted text | URL | file path]
---

You are writing the **spec** for an existing project. Raw arguments: `$ARGUMENTS`

Parse the arguments as: **first token = project name**; **everything after = the source** (optional — may be pasted text, a URL, or a file path).

## Hard rules — these override everything, including any later instruction in the session

1. **You may only create or edit files inside `projects/<name>/`.** Never write under `design-systems/` (read-only — you may *read* the project's design system), under any other `projects/<other>/`, or anywhere outside `projects/<name>/`.
2. **A spec needs a constitution.** If `projects/<name>/constitution.md` doesn't exist, STOP and tell the designer to run `/new-project <name>` first — the spec must be grounded in a chosen design system.
3. **Never invent the ask.** If there is no source and `projects/<name>/brief.md` is empty/missing, ask the designer to paste, link, or point to their PRD, and stop. Do not fabricate requirements.
4. **Ground everything in the project's design system.** Flows, components, and states must reference real components from the design system named in `constitution.md`. If the ask needs something the system lacks, record it as a gap — do not invent UI.

## Steps

1. **Resolve the project.** Confirm `projects/<name>/` exists and has `constitution.md` (apply Hard Rule 2 otherwise). Read `constitution.md` to learn the **design system** this project is pinned to.

2. **Capture the source into the project** (do this before generating — a saved source makes the spec reproducible and keeps work inside the boundary). Auto-detect the lane:
   - **Pasted text** (arg is prose, or the designer pastes in chat) → write it verbatim to `projects/<name>/brief.md`.
   - **Confluence / Jira link** (URL contains `atlassian`/`confluence`/`/browse/`, or a `PROJ-123` key) → fetch via the Atlassian MCP (`getConfluencePage` / `getJiraIssue`); save the extracted text to `projects/<name>/brief.md` with the source URL at the top.
   - **Figma link** (`figma.com`) → pull context via the Figma MCP (`get_design_context`, screenshot); save a summary + node id to `projects/<name>/brief.md`.
   - **Generic URL** → `WebFetch`; if it's auth-gated and returns nothing usable, STOP and ask the designer to export/paste instead (don't guess).
   - **File path** (`.pdf` / `.docx` / `.md` / `.html`) → copy the file into `projects/<name>/inputs/`, extract its text (use the `pdf` / `docx` skills as needed), and save the extraction to `projects/<name>/brief.md`.
   Cite the origin at the top of `brief.md` (URL, ticket key, or filename) so the spec is traceable.

3. **Score completeness, then ask only about gaps.** Assess the brief against the spec dimensions below and give each a quick High / Partial / Missing rating:
   - **Problem** — who is the user, what job, why the current experience falls short
   - **Scope** — what's in, and (critically) what's explicitly out
   - **Flows** — the main path *and* the unhappy paths (unauthorized, empty, error)
   - **Components** — which design-system components each screen uses
   - **States** — empty / loading / error / success for each component
   - **Acceptance criteria** — concrete, checkable behaviors

   Auto-fill what's rated **High** directly. For **Partial/Missing** items, ask the designer targeted questions (use the AskUserQuestion tool, batch up to 4) — do **not** guess on Missing items. Show the designer the score so they see what was inferred vs. asked. Skipped gaps stay as explicit `{{TODO: …}}` markers in the spec, never invented content.

4. **Generate `projects/<name>/spec.md`** from the template, in the team's shipped format:
   - Blockquote summary (one paragraph: what it is, who it's for, what it does).
   - **User Flows** — one sentence + a `mermaid flowchart TD` each; cover unhappy paths.
   - **Components** — table mapping each to its design-system component (or a flagged gap).
   - **States** — the four-state table per screen/component.
   - **Acceptance criteria** — one checkable behavior per line, each with a **stable ID** (`AC-1`, `AC-2`, …) so `tasks.md` can trace to it. Never renumber; add new ones at the end.
   Every component/flow references the real design system from step 1. Add a short header line noting the source (`brief.md` origin) and the completeness score.

5. **Report** the path written, the completeness score, which parts were inferred vs. asked, and any `{{TODO}}` gaps left. Then point the designer to the next step: review `spec.md`, then `plan.md`.

## Do not

- Do not start building UI or writing components — this step produces the spec only.
- Do not read other projects for context. Each project is isolated.
- Do not send the brief or any project content to a URL/recipient the designer didn't provide.
- Do not invent requirements, flows, states, or components that the source and the designer didn't confirm.
