# t1-sample — Constitution

> The constitution holds the **rules that never change** for this project and the **visual direction** everything must follow. Read this file first, and re-read it whenever the session gets long or a decision feels ambiguous. When any instruction conflicts with this file, this file wins.

**Owner:** jrajan  |  **Design system:** t1  |  **Last updated:** 2026-07-30

---

## 1. Hard boundaries (non-negotiable)

- This project lives **only** in `projects/t1-sample/`. Never create, edit, or delete files outside this folder.
- This project's design system is **t1**, at `design-systems/t1/`. That folder — and every other folder under `design-systems/` — is a **read-only source of truth**. Read from `design-systems/t1/` freely; never write to it. Do not copy its files into this project and edit the copies — reference the originals.
- **Never read from or mix in a different design system.** This project uses t1 and only t1.
- Do not touch any other `projects/<other>/` folder.
- All components, tokens, colors, spacing, and type come from `design-systems/t1/`. If something you need is missing there, note it in §4 as a gap — do not invent a new token or one-off style, and do not borrow from another design system.

## 2. Visual direction

- **Look and feel:** {{e.g. calm, data-dense, enterprise; or bold, spacious, consumer}}
- **Density:** {{compact / comfortable / spacious}}
- **Primary surfaces:** {{e.g. left-nav settings layout, card grid, full-page flow}}
- **What this should NOT look like:** {{anti-references — keep Claude from drifting toward the wrong style}}

## 3. Design-system anchors (fill these in from `design-systems/t1/`)

List the exact tokens/components this project is allowed to use, so Claude re-anchors here instead of guessing:

- **Color tokens:** {{list}}
- **Type scale:** {{list}}
- **Spacing scale:** {{list}}
- **Components in scope:** {{list the t1 components this project builds from}}

## 4. Known gaps / open questions

Anything t1 doesn't cover yet. Do not solve these by inventing styles or borrowing from another system — flag them.

- {{gap}}

## 5. Definition of done

A screen is done when:

- It uses only t1 tokens and components (per §1, §3).
- Every state in the spec (empty / loading / error / success) is built.
- It matches the visual direction in §2.
- Nothing outside `projects/t1-sample/` was modified.
