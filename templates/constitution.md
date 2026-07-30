# {{PROJECT_NAME}} — Constitution

> The constitution is the fixed frame for this project: its **boundaries** and the **visual language** it must follow. The visual language is not invented here — it is **inherited from the {{DESIGN_SYSTEM}} design system**, which is the source of truth. Read this file first, and re-read it whenever a session gets long or a decision feels ambiguous. When anything conflicts with this file — or with the {{DESIGN_SYSTEM}} docs it points to — those win.

**Owner:** {{DESIGNER_NAME}}  |  **Design system:** {{DESIGN_SYSTEM}}  |  **Last updated:** {{DATE}}

---

## 1. Boundaries (non-negotiable)

- This project lives **only** in `projects/{{PROJECT_NAME}}/`. Never create, edit, or delete files outside this folder.
- This project's design system is **{{DESIGN_SYSTEM}}**, at `design-systems/{{DESIGN_SYSTEM}}/`. That folder — and every other folder under `design-systems/` — is a **read-only source of truth**. Read from `design-systems/{{DESIGN_SYSTEM}}/` freely; never write to it.
- **Use {{DESIGN_SYSTEM}} and only {{DESIGN_SYSTEM}}.** Never read from or mix in another design system, and never touch another `projects/<other>/` folder.
- All tokens, type, spacing, and components come from `design-systems/{{DESIGN_SYSTEM}}/`. If something you need is missing, note it in §4 as a gap — do not invent a token or borrow from another system.

## 2. Visual direction — inherited from {{DESIGN_SYSTEM}}

This project does not define its own visual language; it follows {{DESIGN_SYSTEM}}'s. **Authoritative sources — read these, and prefer them over the summary below whenever there's any doubt:**

- `design-systems/{{DESIGN_SYSTEM}}/README.md` — visual foundations (color, type, spacing, radii, shadows, motion) and content fundamentals
- `design-systems/{{DESIGN_SYSTEM}}/CLAUDE.md` — brand essentials + hard rules
- `design-systems/{{DESIGN_SYSTEM}}/tokens.scss` — the actual token values (the only place values live)

<!-- GENERATED FROM {{DESIGN_SYSTEM}} — /new-project fills this in by reading the docs above. It is a convenience summary, not a second source of truth. -->

- **Look & feel:** {{generated from the design system}}
- **Type / density / spacing:** {{generated from the design system}}
- **Never do (anti-patterns):** {{generated from the design system's hard rules}}
- **Available surfaces:** {{generated from the design system}}

## 3. Anchors — from {{DESIGN_SYSTEM}}

- **Tokens:** use only `design-systems/{{DESIGN_SYSTEM}}/tokens.scss` and `colors_and_type.css`. Never hardcode a value.
- **Component catalog:** `design-systems/{{DESIGN_SYSTEM}}/ui_kit/docs/INDEX.md`.
- **Components this project uses:** {{narrow to the subset this project needs — decided in spec.md; default: any component in the catalog}}

## 4. Known gaps / open questions

Anything {{DESIGN_SYSTEM}} doesn't cover yet. Flag it here — do not solve it by inventing a style or borrowing from another system.

- {{gap}}

## 5. Project-specific deviations

Default: **none** — this project inherits {{DESIGN_SYSTEM}} exactly. Record here only intentional, signed-off departures from the design system, with a reason.

- None.

## 6. Definition of done

A screen is done when:

- It uses only {{DESIGN_SYSTEM}} tokens and components (per §1–§3).
- The deliverable is **a single HTML file, no build step, no bundler — served via a local static server, not opened as `file://`.** Allowed: plain HTML/CSS/JS, or React/JSX transpiled in-browser via **Babel Standalone** inline (as T1's `chat-interface.html` does). Never a Vite/TS/webpack app that must be compiled. ⚠️ Don't assume "double-click to open" — any fork whose loader uses `fetch()` (every T1 fork) is **blocked on `file://`** by the browser and only works over http(s). See `RUN.md`.
- It uses {{DESIGN_SYSTEM}}'s tokens, CSS, components, and conventions (`design-systems/{{DESIGN_SYSTEM}}/CLAUDE.md`) — link/consume its token CSS for visual fidelity. Where {{DESIGN_SYSTEM}}'s native workflow assumes a bundler (e.g. Vite/TS), render its components via Babel or apply its CSS classes in plain HTML instead, so the output stays a single served file (note it in §5).
- Every state in the spec (empty / loading / error / success) is built.
- It renders correctly at **every breakpoint {{DESIGN_SYSTEM}} defines** (§3), verified in the step's `reviews/` walkthrough.
- It follows {{DESIGN_SYSTEM}}'s visual direction (§2), with any deviation recorded in §5.
- Nothing outside `projects/{{PROJECT_NAME}}/` was modified.

**How to open (serve over http — never `file://`):**

```
cd <repo-root> && python3 -m http.server 4599
# open http://localhost:4599/projects/{{PROJECT_NAME}}/<file>.html
```

`file://` fails for any fork that `fetch()`es its kit bundle. To hand a file to someone outside the repo, build a **Portable** variant (see `plan.md`) or host it (see `DEPLOY.md`). Full run notes are in this project's `RUN.md`.
