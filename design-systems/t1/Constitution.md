# Constitution.md — T1 Design System
### System-wide requirements doc, populated from the T1 source of truth

This file is inherited by every project built on T1. It records only values that are true system-wide. Fields are either an exact value/path/rule pulled from the T1 sources (`tokens.scss`, `colors_and_type.css`, `CLAUDE.md`, `README.md`, `ui_kit/docs/`), or a governance decision made by the design-system owner.

**Populated:** 2026-07-30 from `design-systems/t1/`; the previously-undefined fields (grid, breakpoints, theming, accessibility, i18n, motion scale, versioning, governance) were resolved by owner decision on the same date.

---

## 1. Token Discipline

- Token file location: `design-systems/t1/colors_and_type.css` (CSS custom properties `--t1-*`, source of truth) mirrored 1:1 by `design-systems/t1/tokens.scss` (SCSS `$t1-*`).
- Color tokens - file/path: `design-systems/t1/tokens.scss` (§Color primitives + §Semantic, lines 6–76); mirrored in `colors_and_type.css`.
- Spacing scale - file/path and base unit: `design-systems/t1/tokens.scss` §Spacing. **Base unit 4px.** `$t1-space-1..8` = 4 / 8 / 12 / 16 / 20 / 24 / 32px. Note: `$t1-space-7` (28px) does **not** exist — never invent it.
- Radius tokens - file/path: `design-systems/t1/tokens.scss` §Radius. `$t1-radius-xs` 2px (workhorse) · `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · `pill` 9999px.
- Elevation/shadow tokens - file/path: `design-systems/t1/tokens.scss` §Shadows. `$t1-shadow-soft` · `-card` · `-pop` · `-toast` · `-fab`. Canonical shadow color `rgba(25,40,57,0.09)`.
- Typography tokens (font family, weights, sizes, line heights) - file/path: `design-systems/t1/colors_and_type.css` (lines 158–251): `--t1-font-sans` (Proxima Nova); weights `--t1-weight-light/regular/medium/semibold` = 300/400/500/600; sizes `--t1-text-10/12/14/16/24/32` with paired `--t1-leading-*`. Mirrored as `$t1-*` in `tokens.scss`.
- Rule for missing tokens: **flag for design system review, never invent a value.** → **Confirmed.** Matches `CLAUDE.md` Rule 4 and "Adding a new token" (add to `tokens.scss` → mirror to `colors_and_type.css`).

## 2. Component Library

- Component library location (Figma file/link + code repo): **Code** — `design-systems/t1/ui_kit/components/` (45 component folders, one per component; compiled to `ui_kit/components.jsx` + `ui_kit/components.css` by `dev.js`). **Docs** — `design-systems/t1/ui_kit/docs/` (one `.md` per component + `SYSTEM.md` + `INDEX.md`). **Figma** — "T1 Components" file, accessed via the Figma MCP (~800 local components across 48 component pages); treated as design source of truth. No public Figma URL is stored in the repo.
- Required states for every component: **Per-component, documented state-by-state in each `ui_kit/docs/<Component>.md`.** Common set: default → hover → active → focus → selected → disabled. `loading` on `<Button>` / `<IconButton>`; `error` on inputs (`<InputText>`); `empty` via `<Empty>`. There is **no single global state list enforced across all components** — read the component doc.
- Naming convention for new components: Folder `Hyphen-Cased/`, exposed in JSX as `PascalCase`. SCSS uses BEM `t1-<slug>__<element>--<modifier>` with a **unique prefix per component** (`CLAUDE.md` Rule 6). Register in `ui_kit/components/manifest.js` in dependency order. No alias names (`Btn`, `T1Button`, `Drawer`, `LeftNav`).
- Process to propose a new component: `CLAUDE.md` → "How to build a complex component" (first match wins, A→E): build inline in a fork of `ui_kit/template/chat-interface.html` first; extract to `ui_kit/components/<NewComponent>/` only when reused in a second place → create `.jsx` + `.scss` (unique BEM prefix, `$t1-*` tokens only) → register in `manifest.js` → `node dev.js --build` → demonstrate inside a fork. New tokens follow §"Adding a new token"; new icons must be Phosphor via `<Phi>`.

## 3. Layout & Grid

- Grid system (columns, gutters): **12-column grid.** Gutters use the 4px spacing scale — default column gutter 16px (`$t1-space-4`); card padding 12px (`$t1-space-3`), section padding 16–24px, inter-card gutters 8–16px (`README.md` §Spacing).
- Breakpoints: **Panel-relative — no viewport breakpoints.** The AI panel has fixed dock states (closed / popover / left / right / fullscreen / minimized) and content adapts to the panel's width, not the screen's. Layout responds to the dock state, not to CSS media-query breakpoints.
- Density rules: **Compact / data-dense by default.** No separate comfortable/spacious mode is defined; density is expressed through the tight spacing scale and 2px radii above.

## 4. Color & Theming

- Light mode palette - file/path: `design-systems/t1/tokens.scss` §Color primitives + §Semantic; `colors_and_type.css`.
- Dark mode palette - file/path: **None — T1 is intentionally light-only** (white / light-grey canvases, inside the Tekion platform's light shell). No dark theme is planned; do not build dark-mode variants. The only dark surface is the locked 64px `.ts-menubar` platform chrome, which is not themeable.
- Semantic color rules: Prefer semantic aliases over primitives (`$t1-fg*`, `$t1-bg*`, `$t1-border*`). Status colors are semantic: success `$t1-green-500`, warning `$t1-amber-400`, error `$t1-red-400` (pressed `-500`, assistive error text `-600`). **Violet (`$t1-violet-*`) is the T1 brand mark only — never a status or general accent.** Exactly one gradient, `$t1-gradient-brand`, used on the AI send/generate button only. Never hardcode hex/rgb (`CLAUDE.md` Rule 4).
- Minimum contrast ratio required: **WCAG AA — 4.5:1** for normal text, **3:1** for large text (≥24px, or ≥18.66px bold) and for UI components / graphical objects. Verify muted greys used for secondary text (`$t1-fg-muted`, `$t1-fg-subtle`) meet 4.5:1 on their intended backgrounds.

## 5. Typography

- Type scale (all sizes, tagged with usage): from `colors_and_type.css` — **10px / 12** (tiny labels, overline) · **12px / 14** (assistive text, badge) · **14px / 16** (body default; Regular = body, Medium = body-strong, Semibold = label) · **16px / 24** (prompt input, H5) · **24px / 30** (welcome greeting, H3) · **32px / 40** (display / H1). Monospace (`--t1-font-mono`) at **12px / 14** for code.
- Allowed weights: **300 Light · 400 Regular · 500 Medium · 600 Semibold** (Proxima Nova; matching italics available in `fonts/`). Active UI uses 400 / 500 / 600. No system fonts.
- Line height / letter spacing rules: Line heights are paired per size (`--t1-leading-10..32` = 12 / 14 / 16 / 24 / 30 / 40). Letter spacing: **default (normal)** — no custom tracking applied.

## 6. Iconography & Assets

- Icon library location (Figma / Code repo): **Phosphor Icons** (<https://phosphoricons.com>) via the `<Phi>` wrapper in `design-systems/t1/ui_kit/_core.jsx`. Brand/logo assets in `design-systems/t1/assets/` (e.g. `t1-logo.svg`, `T1.svg`, `aiLogoT1.svg`). No separate icon repo.
- Default icon sizes: **16px and 20px** (`<Phi size={16|20} />`).
- Stroke rules: Phosphor weights, not variable stroke — `regular` (line/hairline), `bold` (filled/heavier; buttons & primary actions), `fill` (solid glyphs). Fixed per-weight; no manual stroke scaling.
- Asset format requirement: **SVG only** for icons/logos (tintable, from Figma); **OTF** for fonts (`fonts/`). No inline `<svg>`; icons only via `<Phi>` — no Lucide, Heroicons, Material Icons, emoji, or unicode glyphs.

## 7. Accessibility

- Minimum tap/click target size: **32×32px** (`$t1-space-8`). Fits T1's dense, mouse-first UI; interactive controls smaller than 32px should reserve hit area via padding to reach it.
- Target WCAG compliance level (e.g. AA or AAA): **WCAG 2.1 AA** (matches the 4.5:1 contrast target in §4).
- Keyboard navigation requirement: **Aspirational target, not enforced.** "All interactive elements should be keyboard-accessible" is the goal, but it is not a release gate. Today: icon-only controls require an `aria-label` (`<IconButton aria-label="…">`) and components expose focus states; there is no system-wide keyboard-accessibility guarantee.

## 8. Internationalization (i18n) & Localization

- RTL (Right-to-Left) support required? **No — LTR only.** RTL is out of scope for T1's current markets; components are not required to mirror.
- Text expansion rule: **Containers must handle 1.3x text length without breaking layout.** No fixed-width labels; text wraps or truncates gracefully rather than overflowing or clipping the container.

## 9. Motion

- Standard durations (fast/medium/slow, in ms): **Fast 100ms** (micro-feedback) · **Medium 150ms** (hover, most transitions) · **Slow 200ms** (modal / sheet enter). These anchor to T1's existing documented values (150ms hover, 200ms modal, per `CLAUDE.md` §Brand essentials); add as motion tokens in `tokens.scss` / `colors_and_type.css`.
- Standard easing curves: **ease-out** (hover) · **ease-in-out** (modal / sheet enter). **No bounce, no spring.**
- Rule for when motion is/isn't appropriate: Functional only — hover feedback, modal/sheet enter, `<Button loading>` spinners, and the `<CreditScoreCard>` gauge animation. No decorative motion; no bounce/spring; no full-bleed or ambient animation.

## 10. Visual Identity Baseline

- One-line description of the system's default visual character: **"Cool, sober, desaturated enterprise AI-assistant surface — white/light-grey canvases, mid-blue accent, flat bordered cards, very tight 2px radii, Proxima Nova."**
- Explicitly disallowed patterns: hardcoded hex/rgb/named colors; any gradient other than `$t1-gradient-brand` (AI send button only); violet as a general accent; emoji or unicode glyphs; non-Phosphor icons (Lucide/Heroicons/Material) or inline `<svg>`; third-party UI libraries (Tailwind, MUI, shadcn, Bootstrap, Radix, Ant Design, Chakra, Emotion, styled-components); system fonts; rebuilding or restyling the locked shell (`.ts-menubar`, `.ts-body`, `<AppBar>`, `<NavBar>`, `<SideNavigation>`, `<GlobalSearch>`, `<PromptInput>`, `<FabIcon>`); standalone HTML built from scratch (fork `ui_kit/template/chat-interface.html` instead); full-bleed imagery, patterns/textures/noise; heavy shadows or blur in core components.

## 11. Code & Implementation Standards

- Supported frameworks: **React 18** (UMD globals, browser-only via Babel Standalone). Only runtime deps: React + ReactDOM + Babel Standalone + Phosphor. No npm/webpack build required to ship; `dev.js` compiles the SCSS + JSX bundles. No Vue, no Web Components.
- Styling methodology: **SCSS partials per component** (compiled by `dev.js`), consuming tokens as `$t1-*` (SCSS) or `var(--t1-*)` (CSS). **BEM** with unique `t1-<slug>__…` prefixes. No Tailwind, CSS Modules, or Styled Components. No inline styles for design tokens (layout-only inline, e.g. `width: ${pct}%`, is allowed).
- Prop naming conventions: `PascalCase` components; variant/enum props as strings (`variant="contained|outlined|text"`, `color="primary|neutral|error"`, `size="lg|md|sm"`); booleans as bare flags without an `is` prefix (`loading`, `disabled`, `search`, `expanded`); icon slots `iconStart` / `iconEnd`; icon-only buttons require `aria-label`. (T1 uses bare boolean flags + string enums — do **not** adopt the `isDisabled` style; follow each component's `.md` / `.jsx`.)

## 12. Versioning & Upgrades

- Versioning strategy: **Date-based (CalVer)** — `YYYY.MM` (e.g. `2026.07`), communicating recency rather than a SemVer breaking-change contract. Distribution and upgrades still run through the **"pull latest" procedure** in `CLAUDE.md` Rule 12 (sync kit assets into the downstream project, then preserve-and-rebuild each fork).
- Breaking change communication (migration guides): **`design-systems/t1/CHANGELOG.md`** — one entry per CalVer release, with breaking changes and migration steps inline. (Upgrade mechanics live in `CLAUDE.md` Rule 12; bundle regeneration in `ui_kit/components/REGEN.md`.)

## 13. Governance

- Who approves exceptions/deviations to this file: **Alpesh Karanpuria** (akaranpuria@tekion.com), T1 design-system owner/maintainer, signs off on any deviation. The Figma "T1 Components" file remains the design source of truth.
- Where exceptions get logged: **Per project only** — in that project's `constitution.md` §5 "Project-specific deviations" (date / what / who approved). There is intentionally no system-wide exceptions log; every deviation is project-scoped.
- Review cadence for this document: **Every release** — reviewed and updated at each CalVer release, when the system actually changes.

---

**Follow-up actions to make these decisions real in the T1 sources:**

1. **Motion tokens** — add `fast 100ms / medium 150ms / slow 200ms` to `tokens.scss` + `colors_and_type.css` (they're only prose today).
2. **Grid** — add a 12-column grid definition with a 16px (`$t1-space-4`) gutter for full-page/dashboard surfaces.
3. **Contrast** — verify muted greys (`$t1-fg-muted`, `$t1-fg-subtle`) meet AA 4.5:1 on their backgrounds; fix any that fail.
4. **Tap target** — ensure interactive controls reserve a 32×32px hit area.
5. **Text expansion** — audit fixed-width labels for 1.3x tolerance.
6. **Versioning** — stamp the kit with a CalVer version and create `design-systems/t1/CHANGELOG.md`.
7. **Governance** — owner recorded in §13 (Alpesh Karanpuria). ✓

Decisions marked here are binding until changed via §13 governance (owner sign-off, reviewed every release).
