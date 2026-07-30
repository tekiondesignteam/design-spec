# {{PROJECT_NAME}} — Constitution

> The constitution holds the **rules that never change** for this project and the **visual direction** everything must follow. Read this file first, and re-read it whenever the session gets long or a decision feels ambiguous. When any instruction conflicts with this file, this file wins.

**Owner:** {{DESIGNER_NAME}}  |  **Design system:** {{DESIGN_SYSTEM}}  |  **Last updated:** {{DATE}}

---

## 1. Hard boundaries (non-negotiable)

- This project lives **only** in `projects/{{PROJECT_NAME}}/`. Never create, edit, or delete files outside this folder.
- This project's design system is **{{DESIGN_SYSTEM}}**, at `design-systems/{{DESIGN_SYSTEM}}/`. That folder — and every other folder under `design-systems/` — is a **read-only source of truth**. Read from `design-systems/{{DESIGN_SYSTEM}}/` freely; never write to it. Do not copy its files into this project and edit the copies — reference the originals.
- **Never read from or mix in a different design system.** This project uses {{DESIGN_SYSTEM}} and only {{DESIGN_SYSTEM}}.
- Do not touch any other `projects/<other>/` folder.
- All components, tokens, colors, spacing, and type come from `design-systems/{{DESIGN_SYSTEM}}/`. If something you need is missing there, note it in §4 as a gap — do not invent a new token or one-off style, and do not borrow from another design system.

## 2. Visual direction

- **Look and feel:** {{e.g. calm, data-dense, enterprise; or bold, spacious, consumer}}
- **Density:** {{compact / comfortable / spacious}}
- **Primary surfaces:** {{e.g. left-nav settings layout, card grid, full-page flow}}
- **What this should NOT look like:** {{anti-references — keep Claude from drifting toward the wrong style}}

## 3. Design-system anchors (fill these in from `design-systems/{{DESIGN_SYSTEM}}/`)

List the exact tokens/components this project is allowed to use, so Claude re-anchors here instead of guessing:

- **Color tokens:** {{list}}
- **Type scale:** {{list}}
- **Spacing scale:** {{list}}
- **Components in scope:** {{list the {{DESIGN_SYSTEM}} components this project builds from}}

## 4. Known gaps / open questions

Anything {{DESIGN_SYSTEM}} doesn't cover yet. Do not solve these by inventing styles or borrowing from another system — flag them.

- {{gap}}

## 5. Definition of done

A screen is done when:

- It uses only {{DESIGN_SYSTEM}} tokens and components (per §1, §3).
- Every state in the spec (empty / loading / error / success) is built.
- It matches the visual direction in §2.
- Nothing outside `projects/{{PROJECT_NAME}}/` was modified.
