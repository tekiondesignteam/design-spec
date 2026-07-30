# Tokens — Single Source of Token Values (§8)

`tokens/` is the **only** place token *values* live in this monorepo. Everything downstream — `global-kit/` and `product-kits/` — **consumes** tokens from [`dist/`](dist/). No kit stores its own token values.

The model uses **ONE combined token file** as the single source of truth. At compile time a **dynamic separation** runs — driven **solely by the modes of the Brand collection**: each Brand-collection mode produces exactly one self-contained slice, carrying only what that mode references. Primitives stay shared across all slices. Aliases are preserved.

## Pipeline — SOURCE → COMBINE → SPLIT BY MODE → OUTPUT

| Folder | Stage | Role | Edited? |
| ------ | ----- | ---- | ------- |
| [`source/`](source/) | Input | The ONE combined token file — all modes, one namespace, aliases intact (DSG export). | Authored / provided |
| [`../build/`](../build/) | Process | Compile logic ([`compile-tokens.js`](../build/compile-tokens.js)): reads `source/`, splits by Brand-collection mode; Primitives shared. | Set up once |
| [`dist/`](dist/) | Output | `fonts.css` + `primitives.css` + `computedStyles.css` + per-mode CSS `[data-*]` layers the kits import. Fully resolved, self-contained. | **Generated — never hand-edited** |

`npm run build` is **unified**: it compiles tokens **and** fonts. Font files live in [`../fonts/<family>/`](../fonts/); the build discovers them, infers weight/style from file names, and emits `tokens/dist/fonts.css` (`@font-face`), which `tokens.css` and every slice `@import`. So one stylesheet (`tokens.css`) delivers fonts + primitives + all layers.

## How the kits consume it

```
tokens/source/<combined-token-file>          # you drop the combined file here
        │  split by Brand mode (build/compile-tokens.js)
        ▼
tokens/dist/  →  CSS [data-brand] / [data-theme] / [data-device] layers
        │  imported by
        ▼
global-kit/components/  +  product-kits/*/components/
```

## Key rules

- The **Brand collection's modes are the ONLY driver** of separation. One Brand mode → one output slice. Every other collection (Theme, Device, Styleguide) contributes only that mode's matching group.
- **Primitives** are shared — referenced by every slice, emitted once (not duplicated). `primitives.css` is always written, **before** the governance gate.
- **No raw values outside Primitive** (governance gate 1). Only the Primitive collection may hold literals; every other token must alias down to a primitive. If any non-primitive token carries a raw value the build **HALTS** (exit 1), removes the split, and flags all offenders to [`dist/raw-value-violations.json`](dist/).
- **Layering — no direct primitive access** (governance gate 1b). Only the **Styleguide** (ARC / T1) layer may alias the Primitive collection. Tokens in `01. Brand`, `02. Theme`, and `03. Device` must consume through the intermediate layers, never reach straight into a raw primitive. Violations **HALT** the build and are flagged (source format) to [`dist/primitive-alias-violations.json`](dist/).
- **Slices must be self-contained** (governance gate 2). `tokens.css` and every per-brand slice must resolve all `var()` references within themselves + `primitives.css`. A cross-brand alias in the source (e.g. a T1 token pointing at the ARC namespace) **HALTS** the build and is flagged to [`dist/slice-violations.json`](dist/).
- **NA rule:** the NA category scaffolding always stays; drop only the *consuming* tokens that resolve to NA in a given mode.
- **Line-height (Primitive only):** emitted as a percentage taken from the trailing number in the token name — `primitive/…/lineHeight/150` → `150%`.
- **Typography styles → `computedStyles.css`:** the source `styles` array (Figma TEXT styles) compiles to one `.text-*` utility class each (e.g. `Heading/Semi Bold/H1` → `.text-heading-semi-bold-h1`). Every property (`font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`) is a `var(--…)` reference to a token — never a literal — so a class **re-resolves on brand/theme/device switch**. `line-height` carries no binding in the source, so it is inferred from the style's PERCENT value and bound to the matching `semantic/typography/lineHeight/{N}` token. `computedStyles.css` is emitted like `fonts.css` and `@import`-ed by `tokens.css` and every slice.
- **Styles reference only `01. Brand`** (governance gate): every style property must bind to the `01. Brand` collection — never any other layer (Primitive / ARC / T1 / Theme / Device). Violations **HALT** the build and are flagged to [`dist/style-collection-violations.json`](dist/).
- **Ascending order:** values within every category are emitted in natural ascending order (`2, 4, 8, 10`, not lexical).
- **Segregation (as per token context):** sections are commented by layer; `:root` is arranged **Components → Semantics**; `color` is split by surface (`bg / border / icon / text …`); primitive families nest where meaningful (`color` by hue, `typography` by fontSize / fontWeight / fontFamily / lineHeight / letterSpacing) and scalar families stay flat. Empty mode sections are still emitted with a `/* no changes */` comment.
- **Don't** pre-build every mode combination (e.g. 13 × 2 × 3 = 78 files). Emit one layer per collection and compose at runtime via data-attributes.

See [`../docs/architecture.md#8-token-compilation--authoring-vs-build-inputs`](../docs/architecture.md#8-token-compilation--authoring-vs-build-inputs) for the full model, worked examples, and the mode matrix.
