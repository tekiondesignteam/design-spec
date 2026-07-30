# Constitution.md — Alloy Design System (GM DRP)
### System-wide requirements doc, populated from the Alloy source of truth

Alloy is the **Digital Retail Program (DRP)** design system — white-label ecommerce UI for GM's four brands (**Chevrolet, Buick, GMC, Cadillac**), one system switched at runtime via a `[data-brand]` attribute on `<html>`. This file is inherited by every project built on Alloy and records only values true system-wide. Fields are either an exact value/path pulled from the Alloy sources (`styles/tokens.css`, `styles/brands.css`, `styles/global.css`, `CLAUDE.md`) or a governance decision by the design-system owner.

**Design source of truth:** Figma `RsCbyz0LF6FaItYny1FqUU` ("GM • 01. Core Variables") + Storybook `https://aecgm-dev.tekion.xyz/docs/ui-components/`.
**Populated:** 2026-07-30 from `design-systems/alloy/`; the previously-undefined fields (grid, breakpoints, density, accessibility, i18n, motion, versioning, governance) were resolved by owner decision on the same date.

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

- Grid system (columns, gutters): **Responsive column grid — 12 (desktop) / 8 (tablet) / 4 (mobile).** Gutters from the spacing scale (24px desktop, 16px tablet/mobile). Search results additionally use a card grid (VSR card 305px desktop / 433px mobile).
- Breakpoints: **Mobile < 600px · Tablet 600–1024px · Desktop ≥ 1024px.** These are the tiers the column grid (§3) steps at and that the header height variants (desktop 88 / tablet 64–120 / mobile 80–121px) already assume; formalize them as named breakpoint tokens.
- Density rules: **Comfortable only** — a single density. There is no global compact/comfortable switch; density is expressed through per-component size variants (e.g. button 32 / 40 / 48px, input 44 / 56px) chosen by context.

## 4. Color & Theming

- Light mode palette - file/path: `styles/tokens.css` (Chevy base) + `styles/brands.css`.
- Dark mode palette - file/path: **None — the theming axis is brand, not light/dark.** No dark mode.
- Semantic color rules: Four brands via `[data-brand]` on `<html>`; brand accent = **`var(--brand-color)`** (Chevrolet `#0077D9` · Buick `#D44400` · GMC `#CC0000` · Cadillac `#171473`). Status colors are semantic: success `#2d871b`, warning `#b3842d`, error `#d64022`, primary `#0077d9`. **Never hardcode a brand hex** — always route through `var(--brand-color)`; never invent parallel token namespaces (`CLAUDE.md`).
- Minimum contrast ratio required: **WCAG AA — 4.5:1** for normal text, **3:1** for large text (≥24px, or ≥18.66px bold) and UI components / graphical objects. Verify each brand accent (`var(--brand-color)`) and muted greys (`#666666`, `#b3b3b3`) meet this on their backgrounds.

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

- Minimum tap/click target size: **40×40px**, enforced system-wide (aligns with Alloy's medium control height; smaller controls reserve hit area via padding). Note: the checkbox already ships a larger 44px hit-area (`--checkbox-hit-area`), which exceeds this and is fine.
- Target WCAG compliance level (e.g. AA or AAA): **WCAG 2.1 AA** (matches the 4.5:1 contrast target in §4). Public GM consumer sites — accessibility is a release consideration.
- Keyboard navigation requirement: **Required — all interactive elements must be keyboard-reachable and operable, with a visible focus ring.** This is a release gate (consistent with the AA target in §4/§7). The focus ring is already tokenized (`--focus-ring-color` `#0077d9`, offset 4px, radius rect 4 / btn 12) — use it, never suppress it.

## 8. Internationalization (i18n) & Localization

- RTL (Right-to-Left) support required? **No — LTR only.** GM DRP markets are LTR; components are not required to mirror.
- Text expansion rule: **Containers must handle 1.5x text length without breaking layout.** No fixed-width labels; text wraps or truncates gracefully rather than overflowing or clipping.

## 9. Motion

- Standard durations (fast/medium/slow, in ms): **Fast 100ms** (micro-feedback: hover, press) · **Medium 200ms** (standard transitions: toggles, expand/collapse) · **Slow 300ms** (entrances: menus, modals, drawers). Add as motion tokens in `styles/tokens.css`.
- Standard easing curves: **ease-out** as the default (entrances and most transitions); ease-in for exits. **No bounce, no spring.**
- Rule for when motion is/isn't appropriate: Functional and subtle only — state feedback, overlay enter/exit, expand/collapse. No decorative or ambient motion. Respect `prefers-reduced-motion` (reduce/disable non-essential motion).

## 10. Visual Identity Baseline

- One-line description of the system's default visual character: **"Clean, confident GM automotive-retail commerce UI — fully brandable across Chevrolet / Buick / GMC / Cadillac, sharp-to-rounded corners per brand, 8px button radius, Chevy_Sans base, #0077D9 Chevrolet accent."**
- Explicitly disallowed patterns: hardcoded brand hex literals (use `var(--brand-color)`); parallel or duplicate token namespaces; `'Font:Weight'` colon font-family notation; spacing values off the defined scale; refactoring the legacy Chip / Search / Tooltip class exceptions; overriding brand-invariant spacing tokens in `brands.css`.

## 11. Code & Implementation Standards

- Supported frameworks: **React 18 + Vite + TypeScript** (single-page documentation site). Atoms currently own the canonical CSS classnames and are **not yet exported as importable React components**.
- Styling methodology: **plain CSS classes** in `styles/global.css` consuming `var(--token)` values; `.drp-<name>-*` roots + BEM children + additive `.is-*` state classes. **Not** Tailwind, CSS-in-JS, or CSS Modules. Brand theming is `[data-brand]` token overrides — no JS re-render.
- Prop naming conventions: TypeScript doc pages default-export a `PascalCase` component with narrow inline prop types; there is not yet a shipped component prop API (styling is classname-driven). Model new pages on `src/components/ui/button.tsx`.

## 12. Versioning & Upgrades

- Versioning strategy: **Date-based (CalVer)** — `YYYY.MM` (e.g. `2026.07`). Complements the existing sprint tracking (S-numbers) and keeps Figma (`RsCbyz0LF6FaItYny1FqUU`) + Storybook as the design source of truth.
- Breaking change communication (migration guides): **`design-systems/alloy/CHANGELOG.md`** — one entry per CalVer release, with breaking token/class changes and migration steps inline. (System-level quality/drift continues in the repo-root docs: `audit-summary.md`, `systemic-findings.md`, `drift-prevention-memo.md`, `css-runtime-changes.md`.)

## 13. Governance

- Who approves exceptions/deviations to this file: **Alpesh Karanpuria** (akaranpuria@tekion.com), design-system owner/maintainer, signs off on any deviation. Figma (`RsCbyz0LF6FaItYny1FqUU`) + Storybook remain the design source of truth.
- Where exceptions get logged: **Per project only** — in that project's `constitution.md` §5 "Project-specific deviations" (date / what / who approved). No system-wide exceptions log; system-level drift continues to be tracked in the repo-root audit docs.
- Review cadence for this document: **Every release** — reviewed and updated at each CalVer release, when the system changes.

---

**Follow-up actions to make these decisions real in the Alloy sources:**

1. **Breakpoint + grid tokens** — add named breakpoints (600 / 1024) and the 12 / 8 / 4-column grid with 24/16px gutters.
2. **Motion tokens** — add `fast 100 / medium 200 / slow 300ms` + ease-out to `styles/tokens.css`; honor `prefers-reduced-motion`.
3. **Contrast** — audit each `var(--brand-color)` and muted greys for AA 4.5:1; fix failures.
4. **Tap target** — ensure interactive controls reserve a 40×40px hit area.
5. **Keyboard nav** — make full keyboard operability a release gate; never suppress the focus ring.
6. **Text expansion** — audit for 1.5x tolerance; no fixed-width labels.
7. **Versioning** — stamp a CalVer version and create `design-systems/alloy/CHANGELOG.md`.

**Brand-based multi-theme (not light/dark) is the deliberate theming model.** Decisions here are binding until changed via §13 governance (owner: Alpesh Karanpuria; reviewed every release).
