# Constitution.md — Alloy Design System (GM DRP)
### System-wide requirements doc, populated from the Alloy source of truth

Alloy is the **Digital Retail Program (DRP)** design system — white-label ecommerce UI for GM's four brands (**Chevrolet, Buick, GMC, Cadillac**), one system switched at runtime via a `[data-brand]` attribute on `<html>`. This file is inherited by every project built on Alloy and records only values true system-wide. Fields are either an exact value/path pulled from the Alloy sources (`styles/tokens.css`, `styles/brands.css`, `styles/global.css`, `CLAUDE.md`) or a governance decision by the design-system owner. Genuine gaps say **"not yet defined."**

**Design source of truth:** Figma `RsCbyz0LF6FaItYny1FqUU` ("GM • 01. Core Variables") + Storybook `https://aecgm-dev.tekion.xyz/docs/ui-components/`.
**Populated:** 2026-07-30 from `design-systems/alloy/`.

---

## 1. Token Discipline

- Token file location: `design-systems/alloy/styles/tokens.css` (Chevrolet base, in `:root`) → per-brand overrides in `design-systems/alloy/styles/brands.css` (`[data-brand="buick|gmc|cadillac"]` blocks) → consumed via `var(--token, fallback)` in `design-systems/alloy/styles/global.css`. Names mirror the Figma variable collection (slash paths flattened to dashes).
- Color tokens - file/path: `styles/tokens.css` — **component-scoped** (e.g. `--button-contained-color-*`, `--chip-*`, `--text-input-*`, `--menu-*`); there is no global primitive color ramp. Brand accent is `var(--brand-color)`. Per-brand values in `brands.css`.
- Spacing scale - file/path and base unit: `styles/tokens.css` §SPACING. **Scale: 0 · 1 · 2 · 4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 56 · 64px** (4px base). Semantic tokens (`--spacing-container-padding|gap|stack-*`, `--spacing-selectable-*`) must resolve to the scale and are **brand-invariant** — never overridden in `brands.css`. A value off the scale must be added to the scale in review, not one-offed.
- Radius tokens - file/path: `styles/tokens.css` — component-scoped: button 8px · input/search/menu/tabs-contained 4px · checkbox 2px · chip 0 (Chevy sharp; brands override) · VSR card 16px · switch track & badges 1000px (pill) · focus ring rect 4px / btn 12px. **No single global radius scale.**
- Elevation/shadow tokens - file/path: `styles/tokens.css` — component-scoped: `--menu-shadow`, `--tooltip-shadow`, `--slider-thumb-hover-shadow`. No global elevation scale.
- Typography tokens - file/path: `styles/tokens.css` (`--*-typography-*` / `--*-font-*`, component-scoped); font families set per brand in `brands.css`. Chevy base family `Chevy_Sans`; weights 500 / 600 / 700.
- Rule for missing tokens: **flag for design system review, never invent a value.** → **Confirmed**, and stricter per `CLAUDE.md` "Building a new component (REQUIRED PROCESS)": inventory atoms first; reuse atomic classnames; do not invent parallel token namespaces; NET NEW only with a named reason; **never hardcode a brand hex** (route through `var(--brand-color)`); never use `'Font:Weight'` colon notation.

## 2. Component Library

- Component library location (Figma file/link + code repo): **Code** — `design-systems/alloy/src/components/ui/<name>.tsx` (29 components) with CSS in `design-systems/alloy/styles/global.css`. Atoms/controls: accordion, avatar, breadcrumb, button, checkbox, chip, icon-button, inline-button, link, menu, quick-filter, radio, search, slider, stepper, switch, tabs, text-input, toggle-button, tooltip. Domain/layout: header, footer, configurator-sub-header, vsr-card, vsr-filter, vsr-math-box, vsr-quick-view (VSR = Vehicle Search Result). **Figma** `RsCbyz0LF6FaItYny1FqUU`; **Storybook** `https://aecgm-dev.tekion.xyz/docs/ui-components/` — both authoritative for token/behavior intent (the `.md` stubs are minimal).
- Required states for every component: **Per-component.** State classes are additive and unprefixed: `.is-hovered`, `.is-pressed`, `.is-open`, plus `.drp-disabled` (used alongside the real `disabled` attribute). Focus via `--focus-ring-*`. No single global state list is enforced — read the component's `.tsx` / Figma node.
- Naming convention for new components: CSS root `.drp-<name>-*` (flattened Figma path); child elements BEM `__`; state classes unprefixed + additive. **Exceptions (do not refactor):** Chip (`.chip`), Search (`.search`), Tooltip (`.tooltip`) use unprefixed BEM roots. React doc pages are `PascalCase`, default-exported.
- Process to propose a new component: `CLAUDE.md` "REQUIRED PROCESS" + "Adding a New Component": pull the Figma node → add Chevy base tokens to `tokens.css` and brand overrides to `brands.css` → add component classes to `global.css` via `var()` → create `src/components/ui/<name>.tsx` (+ `.md` stub) → register the route in `src/App.tsx`, the sidebar link in `src/components/layout/sidebar.tsx`, and a card in `src/pages/HomePage.tsx`. The plan must include a written atom inventory or it's sent back.

## 3. Layout & Grid

- Grid system (columns, gutters): **not yet defined** — no formal column grid. Search results use a card grid (VSR card 305px desktop / 433px mobile).
- Breakpoints: **Responsive tiers exist (desktop / tablet / mobile)** — e.g. header heights desktop 88px, tablet 64–120px, mobile 80–121px — but there are **no named breakpoint tokens**. Formal breakpoint values: not yet defined.
- Density rules: **not yet defined** as a mode. Density is expressed through per-component size variants (e.g. button 32 / 40 / 48px, input 44 / 56px) chosen per context.

## 4. Color & Theming

- Light mode palette - file/path: `styles/tokens.css` (Chevy base) + `styles/brands.css`.
- Dark mode palette - file/path: **None — the theming axis is brand, not light/dark.** No dark mode.
- Semantic color rules: Four brands via `[data-brand]` on `<html>`; brand accent = **`var(--brand-color)`** (Chevrolet `#0077D9` · Buick `#D44400` · GMC `#CC0000` · Cadillac `#171473`). Status colors are semantic: success `#2d871b`, warning `#b3842d`, error `#d64022`, primary `#0077d9`. **Never hardcode a brand hex** — always route through `var(--brand-color)`; never invent parallel token namespaces (`CLAUDE.md`).
- Minimum contrast ratio required: **not yet defined.**

## 5. Typography

- Type scale (all sizes, tagged with usage): component-scoped px sizes / line-heights — **10 / 14** (notification badge) · **12 / 20** (labels, captions, small) · **14 / 22** (body, inputs, breadcrumb, medium) · **16 / 24** (large, headings, nav, price value on cards) · **20 / 24** (footer/subheader price value) · **24 / 30** (configurator name / display). `text-transform` default `none` (VSR status is `uppercase`).
- Allowed weights: **400 Regular · 500 Medium · 600 Demi · 700 Bold** (Chevy_Sans and each brand's equivalent).
- Line height / letter spacing rules: line-heights paired per size (above). Letter spacing: **0** across tokens.
- Fonts per brand (set in `brands.css`): Chevrolet **Chevy_Sans**; Buick **Buick_Text / Buick_Headline**; GMC **StratumGMC**; Cadillac **Cadillac_Gothic (+ Narrow / Wide)**. Never use `'Font:Weight'` colon notation — use `font-family` + `font-weight`.

## 6. Iconography & Assets

- Icon library location (Figma / Code repo): `design-systems/alloy/assets/icons/` — per-brand folders `chevy/`, `buick/`, `gmc/`, `cadillac/`, plus `shared/`. SVG, optimized via `svgo.config.mjs`.
- Default icon sizes: **16px and 24px** (e.g. menu/accordion icons 24px, breadcrumb separator 16px).
- Stroke rules: SVG icons; avatar outline uses 1.5px stroke. No global stroke rule otherwise — icons scale via their container size; per-brand glyphs swap by `[data-brand]`.
- Asset format requirement: **SVG only** for icons (SVGO-optimized, no inline styles). Brand-specific icon sets are swapped by the active `[data-brand]`.

## 7. Accessibility

- Minimum tap/click target size: **44×44px where defined** (e.g. `--checkbox-hit-area` = 44px; avatar bell hit 40px) — used, but **not yet enforced system-wide**.
- Target WCAG compliance level (e.g. AA or AAA): **not yet defined.**
- Keyboard navigation requirement: **Partially addressed** — a focus ring is tokenized (`--focus-ring-color` `#0077d9`, offset 4px, radius rect 4 / btn 12) and components expose focus handling; there is no documented system-wide keyboard-accessibility guarantee.

## 8. Internationalization (i18n) & Localization

- RTL (Right-to-Left) support required? **not yet defined.**
- Text expansion rule: **not yet defined.**

## 9. Motion

- Standard durations (fast/medium/slow, in ms): **not yet defined** — no motion tokens in the system.
- Standard easing curves: **not yet defined.**
- Rule for when motion is/isn't appropriate: **not yet defined.**

## 10. Visual Identity Baseline

- One-line description of the system's default visual character: **"Clean, confident GM automotive-retail commerce UI — fully brandable across Chevrolet / Buick / GMC / Cadillac, sharp-to-rounded corners per brand, 8px button radius, Chevy_Sans base, #0077D9 Chevrolet accent."**
- Explicitly disallowed patterns: hardcoded brand hex literals (use `var(--brand-color)`); parallel or duplicate token namespaces; `'Font:Weight'` colon font-family notation; spacing values off the defined scale; refactoring the legacy Chip / Search / Tooltip class exceptions; overriding brand-invariant spacing tokens in `brands.css`.

## 11. Code & Implementation Standards

- Supported frameworks: **React 18 + Vite + TypeScript** (single-page documentation site). Atoms currently own the canonical CSS classnames and are **not yet exported as importable React components**.
- Styling methodology: **plain CSS classes** in `styles/global.css` consuming `var(--token)` values; `.drp-<name>-*` roots + BEM children + additive `.is-*` state classes. **Not** Tailwind, CSS-in-JS, or CSS Modules. Brand theming is `[data-brand]` token overrides — no JS re-render.
- Prop naming conventions: TypeScript doc pages default-export a `PascalCase` component with narrow inline prop types; there is not yet a shipped component prop API (styling is classname-driven). Model new pages on `src/components/ui/button.tsx`.

## 12. Versioning & Upgrades

- Versioning strategy: **not yet defined** — no SemVer; work is tracked in sprints (S-numbers, e.g. "S8 closed 2026-04-27"). Figma (`RsCbyz0LF6FaItYny1FqUU`) + Storybook are the source of truth.
- Breaking change communication (migration guides): **not yet defined** — no CHANGELOG/migration-guide location. System-level quality is tracked in repo-root docs: `audit-summary.md`, `systemic-findings.md`, `drift-prevention-memo.md`, `css-runtime-changes.md`.

## 13. Governance

- Who approves exceptions/deviations to this file: **not yet defined** — the DRP design-system owner (no name recorded in-repo).
- Where exceptions get logged: per project, in that project's `constitution.md` §5; system-level drift is captured in the repo's audit docs above. A formal system-wide exceptions log is **not yet defined**.
- Review cadence for this document: **not yet defined** (sprint cadence in practice).

---

**Note for design system owner:** Fields above are exact references or explicit "not yet defined." The gaps in Alloy today — column grid, formal breakpoints, density mode, contrast/WCAG/tap-target enforcement, RTL/text-expansion, all of motion, versioning/migration, and formal governance — mirror the same categories T1 resolved by owner decision. Resolve them in the Alloy sources, then update this file so downstream projects inherit the answers. **Brand and multi-theme (not light/dark) is the deliberate theming model.**
