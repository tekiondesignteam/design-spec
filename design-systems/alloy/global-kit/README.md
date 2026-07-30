# Layer 1 · Global Kit — the Design System

The Global Kit **is** the design system: the **core component library** everything else is built from.

It stores **no token values** — foundations (Primitive collection), semantics (Semantic collection), and Global component tokens all live in the combined file under [`../tokens/`](../tokens/) and are **consumed** from [`../tokens/dist/`](../tokens/dist/) (CSS `[data-*]` layers). Semantic *meaning* originates with the Global Kit and flows into that token file; no other kit may define a semantic token.

## Contents

| Folder | Role |
| ------ | ---- |
| [`components/`](components/) | Core component library — one folder per component (`Button/Button.jsx` + `Button.css` + `preview.html`), CSS bound to tokens from `tokens/dist/`. Component folders only — no shared/cross-cutting JS. |
| [`lib/`](lib/) | Shared **build-less** JS helpers used across components/previews (e.g. the glyph catalog + icon-picker widget). Framework-agnostic, `GK`-prefixed globals; the home for cross-cutting JS so `components/` stays uniform. |
| `dist/` | **Generated** — `global-kit.css`, the concatenated core component styles (`@import`s `tokens/dist/tokens.css`). Do-not-edit; produced by `npm run build`. |

## Rules

- No token values here. Foundations, semantics, and Global component tokens are all consumed from `tokens/dist/` — no hardcoded values.
- The union of **ALL** brand modes (Tekion, GM/GMC, Ford, Chevy, Cadillac, Buick, Hyundai, Acura, Honda, Carbravo) lives in the token file's Brand collection, not in a folder here.
- Adding a brand anywhere in the system **starts** with adding its mode to the Brand collection in `tokens/`, surfaced first through the Global Kit.

## Component previews (`preview.html`)

Every component ships a `preview.html` property playground. New previews **must** follow the same contract as `Button` / `Icon` / `Spinner`:

- **Motion is preserved.** Transitions and `@keyframes` animations are part of the component and must play in the preview. Load the full compiled CSS (`../../dist/global-kit.css`), which carries every `transition` and `@keyframes`, and **never** suppress motion (no `* { transition: none }`, no forced `animation: none`, no `prefers-reduced-motion` overrides added just for the preview). Render real, interactive elements so pointer `:hover` / `:active` transitions animate, and let looping animations (e.g. the spinner) run.
- **Gallery first, then focus.** Open showing *all* variants; the first panel interaction (or a click on a variant tile) focuses a single, fully-configured variant. Reset returns to the gallery.
- **Panel order:** Variable modes → Component properties → Tokens applied (each a collapsible `<details>`; the first two open, Tokens applied collapsed).
- **Variant count** pill in the panel header; **Tokens applied** reads *real computed values* off the rendered element; and an **a11y backdrop guard** flips the canvas + body to dark/light when the focused variant fails WCAG 3:1 against the backdrop.
