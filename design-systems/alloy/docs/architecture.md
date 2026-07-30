# Unified Design System - Monorepo Documentation

> DESIGN SYSTEM · MONOREPO SPEC · v1.0 · JULY 2026

This document defines the structure, rules, and consumption model of the unified design system: one **Global Kit** that acts as the design system, **product-level kits** that consume it, and a **shared template layer** that composes everything across products and brands.

---

## 1. Overview & Architecture

The system is organised as a monorepo with **three layers**. Everything a product ships is derived from one shared foundation, and brand identity is applied through **variable modes** - never through duplicated components or hardcoded values.

- **Layer 1 - Global Kit.** The actual design system: all semantic tokens, foundations, and the core component library.
- **Layer 2 - Product Kits.** ARC, DRP, DRS, DRSC, T1, and ARC Consumer. Each is assembled from Global Kit components and themed through modes.
- **Layer 3 - Templates Folder.** A single shared folder of ready-made templates covering every product and every brand.

```
┌─────────────────────────────────────────────────────────────────────┐
│ LAYER 1 · GLOBAL KIT                                                  │
│ Design system · semantic tokens · foundations · core components ·     │
│ ALL brand modes (union across products)                              │
└─────────────────────────────────────────────────────────────────────┘
                        ↓  components consumed by
┌─────────────────────────────────────────────────────────────────────┐
│ LAYER 2 · PRODUCT KITS                                                │
│ ARC · DRP · DRS · DRSC · T1 · ARC Consumer                           │
│ component-specific variables · brand theming via modes               │
└─────────────────────────────────────────────────────────────────────┘
                        ↓  composed into
┌─────────────────────────────────────────────────────────────────────┐
│ LAYER 3 · TEMPLATES FOLDER                                            │
│ Templates from all products × all brands · >=1 per product ·         │
│ re-themed by switching kit modes                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Guiding principles:** single source of truth · tokens flow downward only (Global → Product → Template) · theming is mode-driven · kits are composable with each other.

---

## 2. Global Kit - the Design System

The Global Kit **is** the design system. It is the only library in the monorepo that defines *meaning*: colour semantics, type ramps, spacing scales, radii, elevation, and the core components everything else is built from.

- Semantic tokens live **ONLY** here. No other kit may define a semantic token.
- **Foundations:** colour, typography, spacing, radius, elevation.
- **Core component library:** the building blocks consumed by every Product Kit.
- **Brand modes:** the Global Kit carries the union of **ALL** brands across every Product Kit as modes - Tekion, GMC, Ford, Chevy, Cadillac, Buick, Carbravo, Hyundai, Acura, Honda.
- Adding a brand anywhere in the system starts with adding its mode to the Global Kit.

**Token flow:**

```
Foundation Tokens  →  Semantic Tokens + Global Component Tokens  →  Product Specific Component Tokens  →  Templates
  raw primitives             Global Kit only                             Product Kits                 fully themed output
```

**Global Kit structure:**

```
global-kit/
  components/   core component library - one folder per component (Button, Icon, Spinner…)
  lib/          shared build-less JS - glyphs.js (GKIconGlyphs catalog + GKGlyphCombobox picker)
  dist/         generated global-kit.css · do-not-edit (npm run build)
```

> **Rule:** if a token is semantic, it lives in the Global Kit. No exceptions.

---

## 3. Product Kits

A Product Kit is a product-scoped library assembled from Global Kit components. Product Kits **never** define semantics of their own - their variables are strictly component-specific (e.g. a card padding, a header height, a component background slot). Brand identity enters a Product Kit **exclusively through its mode layer**, and one kit can carry any number of brands.

| Product Kit    | Brand Modes                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| ARC            | Tekion · GMC · Ford · Honda · Acura                                         |
| DRP            | Chevy · Cadillac · Buick · GMC · Carbravo                                   |
| DRS            | Tekion · Hyundai · Acura · Honda                                            |
| DRSC           | Tekion · Chevy · Cadillac · Buick · GMC · Carbravo · Hyundai · Acura · Honda |
| T1             | Tekion · {}                                                                 |
| ARC Consumer   | Tekion · {Dealership}                                                       |

---

## 4. Theming Model

All theming is **mode-driven** - the modes act as the theming layer (each mode behaves as a theme). A brand is a mode, never a fork. The chain works as follows:

1. The Global Kit holds every brand in the system as a mode (the union across all Product Kits).
2. Each Product Kit exposes its own theming modes - one per brand it supports (N brands per kit).
3. A Product Kit mode maps the kit's component-specific variables onto the Global Kit's values for that brand.
4. Switching a mode re-themes every component and template built on that kit - no redesign, no overrides.

```
GLOBAL KIT                    →   PRODUCT KIT MODE LAYER   →   THEMED OUTPUT
All brand modes                   Brand modes                  Components & templates
(union across products)           (N per kit)                  re-skinned by switching mode
```

> **Rule:** new brand = new mode on the Global Kit first, then a mode on the owning Product Kit. Never a copied component set.

---

## 5. Templates Folder

A single shared **Templates** folder holds ready-made templates from every product and every brand - more than one template per product. Templates are **compositions**: they assemble Product Kit components into complete screens and flows, and inherit theming entirely from the kit's brand modes.

- Organised by **Product → Template → Brand mode**.
- ARC, DRP, DRS, DRSC, T1 and ARC Consumer each contribute multiple templates.
- A template never carries its own styling; changing the brand mode of the underlying kit(s) is what re-themes it.
- Templates may combine components from more than one kit (see the Orchestration Layer below).

---

## 6. Orchestration Layer - How the System Is Consumed

The Orchestration (Logic) Layer is the flow a consumer walks through to get a finished, branded output:

```
01 · Kit                02 · Theme               03 · Template            04 · Output
Select which Product →  Select the brand.     →  Select a template;    →  The selected kit(s)
Kit(s) are needed       Options are the union     options are scoped        merge into one single
for the task - one      of all modes across       to the selected           themed template -
kit or several.         the selected kit(s).      kit(s).                   the final result.
```

---

## 7. Governance - Do & Don't

**✓ Do**

- Create every semantic token in the Global Kit, and only there.
- Build Product Kit components exclusively from Global Kit components.
- Theme through modes - one mode per brand.
- Add new brands to the Global Kit mode union **before** adding them to a Product Kit.
- Keep templates style-free; they inherit everything from the kits.

**✕ Don't**

- Define semantic tokens inside a Product Kit - kit variables are component-specific only.
- Hardcode brand colours, type, or spacing anywhere downstream of the Global Kit.
- Fork or duplicate components to create a brand variant - add a mode instead.
- Style templates directly or detach kit components inside them.

---

## 8. Token Compilation - Authoring vs Build Inputs

The compiled model uses **ONE combined token file** as the single source of truth. At compile time a **dynamic separation** runs - driven **SOLELY** by the modes of the **Brand** collection: each Brand-collection mode produces exactly one self-contained slice (a mode can be a product, a brand, or anything else), carrying only what that mode references. No other collection drives the split; Theme, Device and the palette contribute only that mode's matching group, and Primitives stay shared across all slices. Aliases are preserved, so each slice stays switchable on its other axes and resolves on its own.

### SOURCE → COMBINE → SPLIT BY MODE → OUTPUT

```
Authoring kits        →  Combined token file      →  Compile · split by mode      →  Output
Global + Product ·        DSG export · one            one self-contained slice        per-mode tokens →
separate · mode-based     namespace · single          per mode · Primitives shared    CSS · [data-*] layers
                          source of truth
```

### Dynamic separation at compile

```
Combined token file   →   ┌──────────────────────────────────────────────────────┐
all modes · one           │ Slice·mode A   Slice·mode B   Slice·mode C  … Slice·N  │
namespace · single        │ self-contained self-contained self-contained self-cont.│
source                    ├──────────────────────────────────────────────────────┤
                          │ Primitives - shared across all slices                  │
                          │ referenced by every slice, emitted once (not duplicated)│
                          └──────────────────────────────────────────────────────┘
```

### Separation criteria - driven by Brand-collection modes (example: T1)

The Brand collection's modes are the **ONLY** driver of separation. One Brand-collection mode → one output file. Every other collection contributes only that mode's matching group. Worked example below: `mode = T1`.

| Collection             | Contribution to the T1 slice                          |
| ---------------------- | ----------------------------------------------------- |
| 01. Brand collection   | Mode: T1 · Groups: Semantic + Component               |
| 02. Theme collection   | Modes: Light + Dark · Group: T1 → Semantic            |
| 03. Device collection  | Group: T1 → Semantic (all device modes retained)      |
| T1 collection          | All groups                                            |
| Primitive collection   | Kept common for all slices - shared, emitted once     |

### NA rule - drop tokens mapped to NA (keep the category)

The NA category itself stays - `primitive/NA/color` (#FFFFFF), `primitive/NA/number` (0) and the `…/na/…/notRelevant` scaffolding are never removed. What gets dropped is any **consuming** token that maps to an NA value in the selected mode: a real component/semantic token whose value for that mode resolves to NA is treated as not-applicable and omitted entirely from that slice, while the NA definitions it pointed to remain in place.

**Worked example - `component/badge/color/filled/info/bg/default`.** One component, evaluated independently per Brand-collection mode. It has a real value in ARC, T1 and GMC, but is mapped to NA in Chevrolet.

| ARC             | T1              | GMC             | Chevrolet             |
| --------------- | --------------- | --------------- | --------------------- |
| has value → kept | has value → kept | has value → kept | maps to NA → dropped |

→ The badge appears in the ARC, T1 and GMC slices, and is omitted only from the Chevrolet slice. The NA category itself stays in place.

### Figma styles - paint, text, grid, effect (a second source facet)

Figma styles come in **four types: paint, text, grid, effect** - authored as a source `styles` array alongside `collections`, and the pipeline is designed to **scale across all four**: every style property compiles to a `var(--…)` reference to a token (never a literal), so the output re-resolves on `[data-brand]` / `[data-theme]` / `[data-device]` switch with no rebuild, and every property may reference **only** the `01. Brand` collection (violations HALT the build).

- **Text - LIVE today (24 styles).** Each compiles to one `.text-*` utility class in `computedStyles.css` (e.g. `Heading/Semi Bold/H1` → `.text-heading-semi-bold-h1`). Line-height has no source binding and is inferred from the style's PERCENT value, bound to the matching `01. Brand` `semantic/typography/lineHeight/{N}` token.
- **Paint (colour), Effect (elevation / shadow) and Grid (spacing / layout) - IN DEVELOPMENT.** They are being added to the same `styles` array and will compile through the same bound mechanism into their own class / layer outputs, `@import`-ed alongside `computedStyles.css`.

See §9 → *Text styles* for the compiled form.

### Why combined removes the collision

**Separate files · author** - *collision if used as raw build inputs.* Global and every Product Kit reuse the collection names `01. Brand` and `03. Device`, and the product redeclares ~14 semantics with only its 2 brand modes. Merging by (collection, name) clobbers Global's 9-mode union unless the build namespaces per source and applies Global precedence.

**Combined file · build** - *one namespace, nothing to disambiguate.* Six uniquely-named collections in a single file. The product's 24 components merge into `01. Brand`, duplicate semantics dedupe to 178, no alias points outside the file. Verified: 100% resolved, 0 unresolved, fully self-contained.

### Mode matrix → layered output

```
Brand              ×   Theme            ×   Device          →   Themed Output
collection ·           collection ·         collection ·        resolved per request
All modes              Light / Dark         3 modes
```

Three independent mode axes. **Don't** pre-build every combination (13 × 2 × 3 = 78 files). Emit one layer per collection and compose them at runtime with data-attributes:

```css
:root { /* foundation + semantic defaults */ }
[data-brand="chevy"]  { --color-action-primary: var(--chevy-gold-500); }
[data-theme="dark"]   { --color-bg: var(--neutral-900); }
[data-device="mobile"]{ --space-gutter: var(--space-4); }
```

```html
<html data-brand="chevy" data-theme="dark" data-device="mobile">
<!-- → full stack resolves · no combinatorial build · components never change -->
```

> **Rule:** keep ONE combined token file as the source; the build performs a dynamic separation by mode into self-contained slices, with Primitives shared. A single namespace at compile means collection names can never collide - and because slices are generated, brands/products are never forked or hand-edited.

---

## 9. Token Build - As Implemented

Sections 1–8 are the design model. This section records how it is **actually built** today. The compiler is [`build/compile-tokens.js`](../build/compile-tokens.js) (plain Node, no deps); run it with `npm run build`. It reads the one combined file `tokens/source/Tokens.json` and emits `tokens/dist/`. See [`tokens/README.md`](../tokens/README.md) for the consumer-facing summary and [`build/README.md`](../build/README.md) for the build tooling.

### Collections & layering (current instance)

The combined file has **6 collections**. Values flow strictly downward; each layer aliases the layer above, and **only the Styleguide layer may touch primitives**:

```
Primitive              raw values (the ONLY collection allowed to hold literals)
   ↓ aliased by
Styleguide (ARC, T1)   per-brand raw-value bridge - the only layer that aliases primitives
   ↓ aliased by
Theme (Light, Dark)  +  Device (Desktop, Mobile, Tablet)
   ↓ aliased by
01. Brand              semantic + component tokens · modes: ARC, T1  ← drives the split
```

The **Brand-collection modes (ARC, T1)** are the sole split driver → one self-contained slice per brand.

### Output (`tokens/dist/`)

| File | Contents |
| ---- | -------- |
| `fonts.css` | `@font-face` rules for the font families the tokens reference (see Fonts below). Always written, before the gates. |
| `primitives.css` | Shared primitives, emitted once (`:root`). Always written, before the gates. |
| `computedStyles.css` | One `.text-*` utility class per source TEXT style, every property bound to a token via `var(--…)` (see Text styles below). Written before the gates (holds only `var()` refs). |
| `tokens.css` | Full runtime-composable layers: `:root` defaults + `[data-brand]` / `[data-theme]` / `[data-device]`. `@import`s `fonts.css` + `primitives.css` + `computedStyles.css`. |
| `brand/arc.css`, `brand/t1.css` | One self-contained slice per Brand mode (NA-dropped). Each `@import`s `fonts.css` + `primitives.css` + `computedStyles.css`. |
| `build-report.json` | Counts + status. |

Consume: `<link rel="stylesheet" href="tokens/dist/tokens.css">` then `<html data-brand="t1" data-theme="dark" data-device="mobile">`. One stylesheet pulls in fonts, primitives, text styles, and all layers.

### Fonts

`npm run build` is a **unified** step - it compiles tokens **and** fonts. It scans `fonts/<dir>/` for each family the tokens reference (folder→family mapping in `FONT_FAMILIES` in `build/compile-tokens.js`), infers `font-weight`/`font-style` from each file name, and emits `@font-face` rules into `tokens/dist/fonts.css` (referenced by `tokens.css` and the slices). Currently: **Proxima Nova**, from `fonts/proxima-nova/` (Light 300 / Regular 400 / Medium 500 / Semibold 600, each with an italic face). Supported formats: `.woff2`, `.woff`, `.otf`, `.ttf`. Drop files in and rebuild - no config change needed.

### Text styles

The source carries a top-level `styles` array (Figma TEXT styles) alongside `collections`. Each style compiles to **one `.text-*` utility class** in `tokens/dist/computedStyles.css` - e.g. `Heading/Semi Bold/H1` → `.text-heading-semi-bold-h1`. Every property (`font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`) is emitted as a `var(--…)` reference to a token, **never a literal**, so a class **re-resolves automatically on brand/theme/device switch** - the same runtime composition the variable layers use.

Property values come from each style's `bindings` (Figma field → CSS property: `fontFamily`→`font-family`, `fontSize`→`font-size`, `fontStyle`→`font-weight`, `letterSpacing`→`letter-spacing`). **Line-height carries no binding in the source**, so it is inferred from the style's PERCENT value and bound to the matching `semantic/typography/lineHeight/{N}` token in the `01. Brand` collection (e.g. lineHeight 110% → `--semantic-typography-lineHeight-110`). `computedStyles.css` is generated like `fonts.css` and `@import`-ed by `tokens.css` and every slice; a single class set works across all modes because the tokens it references recompose per axis.

### Component runtime stack

The kit components (`global-kit/components/` and `product-kits/*/components/`) use a **build-less React** setup (same as `tekiondesignsystem-t1-local`):

- **React 18.3.1** - `react` + `react-dom` UMD builds from the unpkg CDN (no bundler, no `node_modules` for the app runtime).
- **JSX transpiled in the browser** via `@babel/standalone` 7.29.0.
- **Icons:** `@phosphor-icons/web` (CDN).

Components hold no token values - they bind to CSS custom properties from `tokens/dist/tokens.css` and re-theme purely by switching `[data-brand]` / `[data-theme]` / `[data-device]`. Only the build tooling (`build/`) uses Node/`package.json`; the component runtime does not.

### Governance gates (build-enforced - each HALTS the build and flags offenders)

1. **No raw values outside Primitive.** Only Primitive may hold literals; everything else must alias down to a primitive. → `dist/raw-value-violations.json`
1b. **No direct primitive access.** Only the Styleguide (ARC/T1) may alias the Primitive collection; `01. Brand`, `02. Theme`, `03. Device` must consume through the intermediate layers. → `dist/primitive-alias-violations.json` *(source format)*
2. **Every split file self-contained.** `tokens.css` and each slice must resolve all `var()` refs within themselves + `primitives.css`; a cross-brand alias (e.g. a T1 token pointing at the ARC namespace) fails this. `computedStyles.css` is validated the same way (its refs resolve against the token file that imports it). → `dist/slice-violations.json` *(source format)*
3. **Text styles reference only `01. Brand`.** Every style property - each binding ref **and** the inferred line-height - must resolve to a variable in the `01. Brand` collection; binding to any other layer (Primitive / ARC / T1 / Theme / Device) fails this. → `dist/style-collection-violations.json`

Violation reports flagged *(source format)* mirror the `Tokens.json` schema, so offending variables can be located/diffed at the source.

### Output conventions

- **NA rule** applied per §8 (drop consuming tokens that resolve to NA; keep the NA scaffolding).
- **Line-height** primitives are emitted as a percentage from the trailing number in the name (`primitive/…/lineHeight/150` → `150%`). For **text styles**, line-height has no source binding and is inferred from the style's PERCENT value, then bound to the matching `01. Brand` `semantic/typography/lineHeight/{N}` token (see Text styles above).
- **Ascending order** - values within every category are emitted in natural ascending order.
- **Segregation** - commented sections per layer; `:root` arranged **Components → Semantics**; `color` split by surface (bg / border / icon / text …); primitive families nested (`color` by hue, `typography` by fontSize / fontWeight / fontFamily / lineHeight / letterSpacing). Empty mode sections are still emitted with a `/* no changes */` comment.

> **Note on §8 examples:** §8 illustrates the model with a larger hypothetical brand set (e.g. `chevy`, "13 × 2 × 3"). The current build instance is **ARC · T1** (Brand) × **Light · Dark** (Theme) × **Desktop · Mobile · Tablet** (Device). The mechanism is identical; only the mode counts differ.

---

## 10. Component CSS - As Implemented

The token build (§9) produces the **variable layer**. Component **styling** is a second stage of the same unified `npm run build`, via [`build/build-components.js`](../build/build-components.js).

### Where it lives

Component CSS is **co-located per component** with its JSX, one folder each:

```
global-kit/components/Button/  Button.jsx  Button.css  preview.html
product-kits/<p>/components/<ProductComponent>/  *.jsx  *.css   # product-specific compositions only
```

- **Component folders hold component files only** (`<Name>.jsx` + `<Name>.css` + `preview.html`). Shared / cross-cutting build-less JS - helpers used by more than one component or preview (e.g. the glyph catalog + icon-picker) - lives in `global-kit/lib/`, not inside a component folder. See [`global-kit/lib/README.md`](../global-kit/lib/README.md).
- **Global Kit holds all core component CSS.** Product kits add CSS **only** for product-specific composed components and **never restyle** Global components - brand differences come purely from token modes.
- **Token-bound only:** component CSS uses `var(--component-…)` / `var(--semantic-…)`; no hardcoded colours/sizes/fonts. Classes are prefixed by kit (`gk-…`).
- Components never branch on brand/theme/device - the `[data-*]` cascade re-themes them.

### Build & output

`node build/build-components.js` (run after the token compile in `npm run build`) concatenates each kit's `components/**/*.css` into a generated, **do-not-edit** per-kit bundle:

| Bundle | Contents | Leading `@import`s |
| ------ | -------- | ------------------ |
| `global-kit/dist/global-kit.css` | all core component styles | `tokens/dist/tokens.css` |
| `product-kits/<p>/dist/<p>.css` | product-specific styles (only if any exist) | `tokens/dist/tokens.css` + `global-kit/dist/global-kit.css` |

So one `<link>` to a kit bundle delivers fonts + primitives + text styles + token layers + component styles. Consume with `<html data-brand="…" data-theme="…" data-device="…">`. If the token gates halt, component bundling is skipped (the `&&` short-circuits).
