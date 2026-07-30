# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Building a new component (REQUIRED PROCESS)

Before writing any markup or CSS for a new component:

1. **Inventory atoms first.** Read src/components/ui/. List every atom by name and its primary use.

2. **For every styled element your component will produce, identify which atom owns the equivalent pattern.** Do this BEFORE writing code, as a written list. Not a mental note.

3. **Use atomic classnames for those elements.** The atoms are not exported as importable React components yet — but they own the canonical CSS classnames (.drp-button-*, .drp-tab-*, .drp-chip-*, .chip, etc.). Apply those classnames to your markup directly. Brand re-theming happens automatically through the atomic CSS.

4. **Do NOT invent parallel token namespaces.** If you find yourself writing --your-component-text-color, --your-component-tab-*, --your-component-button-*, stop. Those are signs you're duplicating an atom. Use the atom's classnames and let its tokens handle the styling.

5. **Only items genuinely uncovered by atoms are NET NEW.** For each NET NEW element, you must name a real reason in the component's "Built from" section:
   - "Atomic X exists but variant Y is not supported."
   - "No atomic Z exists; flagged as future atom candidate."
   - "Composite slot Q has no single-purpose atom equivalent."
   "Component-specific styling" or "matches the design" are NOT real reasons.

6. **Hardcoded brand colors are forbidden.** Cadillac #171473 (or any other per-brand hex) routes through var(--brand-color), full stop. If you find yourself adding a brand-specific hex literal in CSS, you are doing it wrong.

7. **Hardcoded font-family with colon notation is forbidden.** No 'Chevy_Sans:Demi'. Use font-family: 'Chevy_Sans'; font-weight: 600;.

If a component's plan does not include the atom inventory in step 2, the plan is incomplete. Send it back.

The cost of skipping these steps is duplicated tokens, parallel implementations, hardcoded literals, and audit findings that should not have existed.

Reference: vsr-filter and configurator-sub-header (built without this checklist) required a multi-hour refactor pass to comply.

## Status

As of 2026-04-23, the project is TypeScript with a shadcn-style flat layout under `src/components/ui/`. Each component has a sibling `.tsx` (interactive doc page + demo) and `.md` (shadcn-style frontmatter stub) — e.g. `src/components/ui/button.tsx` + `src/components/ui/button.md`. The 19 md files are minimal stubs for now; authoritative tokens and design intent still live in the Figma file + hosted Storybook. Layout chrome (`doc-shell`, `header`, `sidebar`) lives under `src/components/layout/`. Foundations pages (Colors, Typography, Spacing, Iconography) and the Home catalog remain at `src/pages/*.tsx`. The former static HTML fallback pages and their JS have been soft-deleted into `legacy/` — see `legacy/README.md`.

## Project Overview

Design system documentation site for Tekion's **Digital Retail Program (DRP)** — the team that builds white-label ecommerce experiences for GM automotive brands (Chevrolet, Buick, GMC, Cadillac). One site, four brands, switched at runtime via a `[data-brand]` attribute on `<html>`.

Source of truth: Figma file `RsCbyz0LF6FaItYny1FqUU` ("🔵 GM • 01. Core Variables (Latest)").

## Architecture

React + Vite single-page app. Every doc page is a route.

```
index.html                                 ← Vite entry; mounts the React app
src/main.tsx                               ← React entry, wraps <App /> in <BrandProvider>
src/App.tsx                                ← createBrowserRouter; one route per page
src/components/layout/doc-shell.tsx        ← Shared layout: header + sidebar + <Outlet />
src/components/layout/header.tsx           ← Top bar + brand switcher
src/components/layout/sidebar.tsx          ← Left nav (every component must be linked here)
src/components/ui/<name>.tsx               ← One interactive doc page per component (shadcn-flat)
src/components/ui/<name>.md                ← Sibling markdown stub (frontmatter + pointer)
src/context/BrandContext.tsx               ← Brand state; writes [data-brand] + localStorage.drp-brand
src/context/brand-constants.ts             ← Brand literals + type guard (shared w/ FOUC script)
src/pages/HomePage.tsx                     ← Component catalog grid (one card per component)
src/pages/<Foundation>Page.tsx             ← Colors, Typography, Spacing, Iconography
styles/tokens.css                          ← Chevrolet base tokens (Figma variable export)
styles/brands.css                          ← Per-brand overrides: [data-brand="buick|gmc|cadillac"] {...}
styles/global.css                          ← Component CSS classes (consume tokens via var())
assets/icons/                              ← SVG icons used in demos
```

Foundations pages live under `/foundations/*` (colors, typography, iconography). Component pages live under `/components/*`.

### CSS Token Naming Convention

Tokens mirror Figma's variable collection. Figma's slash-separated paths (`button/contained/container-bg-large/height`) are flattened to dashes in CSS — slashes are not valid in custom property names; the `foo/bar` display in Figma's UI is a grouping artifact, not part of the token name.

```
--button-contained-container-bg-large-height
--button-contained-color-primary-filled-background-color
--button-contained-typography-large-font-size
```

Chevy base values live in `styles/tokens.css`. Other brands override selected tokens under `[data-brand="buick|gmc|cadillac"]` blocks in `styles/brands.css`. Components consume tokens via `var(--token-name, fallback)` in `styles/global.css`.

### Component CSS Class Naming

Component classes use a `drp-` prefix + flattened Figma path, parallel to tokens. Example for Button:
- `.drp-button-contained-container-bg-large` — size variant root (also `-medium`, `-small`)
- `.drp-button-contained-color-primary-filled` — theme + style combination (also `-outlined`, `-plain`, and the `-inverse-*` / `-neutral-*` theme variants)
- `.drp-button-contained-icon-container-rect-bg-large` / `.drp-button-contained-icon-container-circle-bg-large` — icon-only button shapes
- `.drp-button-link-*` — inline/link button variants

Internal child elements inside a component root use unprefixed BEM-style classes (e.g. `.accordion__label`, `.accordion__icon`, `.drp-breadcrumb-item`) — individual components are not fully consistent on prefixing children, so check the real JSX before copying patterns. State classes are unprefixed and additive: `.is-hovered`, `.is-pressed`, `.is-open`, plus `.drp-disabled` for a disabled visual state (used alongside the real `disabled` HTML attribute on `<button>`).

**Exceptions:** Three components do *not* follow the `.drp-<name>-*` root convention — all use unprefixed roots with BEM-style modifiers:
- **Chip** — `.chip`, `.chip--selectable`, `.chip--md`, `.chip--color-success`
- **Search** — `.search`, `.search--go`, `.search--disabled`, `.search--open`; child elements `.search__field`, `.search__input`, `.search__icon`, `.search__clear`, `.search__divider`, `.search__go`, `.search__menu*`
- **Tooltip** — `.tooltip`, `.tooltip--arrow-top-left` / `--arrow-bottom-right` / etc. (nine arrow-position modifiers); child elements `.tooltip__title-row`, `.tooltip__title`, `.tooltip__icon`, `.tooltip__close`, `.tooltip__body`, `.tooltip__link-row`, `.tooltip__link`, `.tooltip__arrow`

Pre-existing inconsistencies; do not refactor. All new components must continue using `.drp-<name>-*` at the root.

### Brand Switching

`BrandContext` holds the active brand, reads/writes `localStorage.drp-brand`, and sets `document.documentElement.dataset.brand`. The `[data-brand="..."]` block in `styles/brands.css` redefines tokens (and in some cases adds scoped rules for layout/icon swaps). No JS re-render is required for brand changes beyond the attribute write — CSS does the work.

### Documentation UI

`DocShell` (at `src/components/layout/doc-shell.tsx`) renders the persistent header, sidebar, and an `<Outlet />`. Each `src/components/ui/<name>.tsx` is the documentation surface for that component — interactive demos plus inline explanatory copy, variants, and tokens tables. A sibling `src/components/ui/<name>.md` carries a shadcn-style frontmatter stub; md files are currently minimal and Figma + Storybook remain authoritative for token/behavior intent.

**Brand notes section:** Each component page includes a `Brand notes` section summarizing per-brand overrides. Default format is a paragraph or `<ul className="doc-brand-list">` (one bullet per brand). A matrix table (rows = properties, columns = brands) is the accepted alternate when a component has multi-dimensional brand data that reads better side-by-side — Tooltip uses this for its 4 backgrounds × font families × sizes × weights. Treat both as equivalent.

Interactive state demos toggle `.is-hovered` / `.is-pressed` classes via small inline handlers, mapped to the same CSS as `:hover` / `:active`.

## Design System Source

- **Figma file**: `https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/`
- **Existing Storybook**: `https://aecgm-dev.tekion.xyz/docs/ui-components/`
- **Brands**: Chevrolet (base, `#0077D9`), Buick (`#D44400`), GMC (`#CC0000`), Cadillac (`#171473`)
- **Fonts**: `Chevy_Sans` (Chevy), `Buick_Text` / `Buick_Headline` (Buick), `StratumGMC` (GMC), `Cadillac_Gothic` / `Cadillac_Gothic_Narrow` / `Cadillac_Gothic_Wide` (Cadillac)

## Adding a New Component

1. Pull design context from Figma MCP (`get_design_context` with the component's node ID).
2. Add Chevy-base tokens to `styles/tokens.css`. Add any brand-specific overrides to the right `[data-brand]` block in `styles/brands.css`.
3. Add component CSS classes to `styles/global.css`, consuming tokens via `var()`.
4. Create `src/components/ui/<name>.tsx` modeled on an existing file (e.g. `button.tsx`). Type inline helpers with narrow prop types; default-export the page component. Include the same inline sections the existing files use (description, variants, tokens table, Dos & Don'ts) — the file is the documentation.
5. Create a sibling `src/components/ui/<name>.md` stub with `title`, `slug`, `route` frontmatter (mirror an existing md, e.g. `button.md`).
6. Register the route in `src/App.tsx` (add `satisfies RouteHandle` on the handle literal), add the sidebar link in `src/components/layout/sidebar.tsx`, and add a card to `src/pages/HomePage.tsx`.
