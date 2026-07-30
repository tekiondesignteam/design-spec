# build

The monorepo's **build tooling** — one folder for both generated-CSS stages of the unified `npm run build`. Plain Node, no dependencies.

| Script | Stage | Reads | Writes |
| ------ | ----- | ----- | ------ |
| [`compile-tokens.js`](compile-tokens.js) | Tokens → CSS variables | [`../tokens/source/Tokens.json`](../tokens/source/) + [`../fonts/`](../fonts/) | [`../tokens/dist/`](../tokens/dist/) |
| [`build-components.js`](build-components.js) | Component CSS → per-kit bundles | every kit's `components/**/*.css` | `../global-kit/dist/` + each `../product-kits/*/dist/` |

```
npm run build            # both, in order (compile-tokens → build-components)
npm run build:tokens     # node build/compile-tokens.js
npm run build:components  # node build/build-components.js
```

`build` chains them with `&&`, so if the token gates halt (below), component bundling is skipped.

---

## 1. `compile-tokens.js` — dynamic separation by mode

- Reads the combined token file from [`../tokens/source/`](../tokens/source/).
- Splits into **one self-contained slice per Brand-collection mode** (a mode can be a product, a brand, or anything else).
- Every other collection (Theme, Device, Styleguide) contributes only that mode's matching group; **Primitives are shared** and emitted once.
- Aliases are preserved, so each slice stays switchable on its other axes (Theme, Device) and resolves on its own.
- Applies the **NA rule**: drop consuming tokens that resolve to NA for a mode; keep the NA category scaffolding.
- Segregates output with section/type/surface comments (Components → Semantics; `color` split by surface: bg / border / icon / text …).
- Compiles the source `styles` array (Figma TEXT styles) into token-bound `.text-*` classes (see Text styles below).

Emits per-mode CSS `[data-*]` layers plus `fonts.css` and `computedStyles.css` to [`../tokens/dist/`](../tokens/dist/).

### Unified build — tokens + fonts

`npm run build` also generates **`tokens/dist/fonts.css`**. For each font family the tokens reference, it scans [`../fonts/<dir>/`](../fonts/) (folder→family map in `FONT_FAMILIES`), infers `font-weight`/`font-style` from each file name, and writes one `@font-face` per file. `tokens.css` and each slice `@import "…/fonts.css"`, so a consumer that includes `tokens.css` gets the fonts automatically. Supported: `.woff2`, `.woff`, `.otf`, `.ttf`.

### Text styles — `tokens/dist/computedStyles.css`

The source also carries a `styles` array (Figma TEXT styles). Each one compiles to a **`.text-*` utility class** (e.g. `Heading/Semi Bold/H1` → `.text-heading-semi-bold-h1`), with every property (`font-family` / `font-size` / `font-weight` / `line-height` / `letter-spacing`) emitted as a `var(--…)` reference to a token — never a literal — so a class re-resolves on brand/theme/device switch. Bindings supply four properties; **line-height has no source binding**, so it is inferred from the style's PERCENT value and bound to the matching `01. Brand` `semantic/typography/lineHeight/{N}` token. `computedStyles.css` is written before the gates and `@import`-ed by `tokens.css` and each slice.

### Governance gate — no raw values outside Primitive

Only the **Primitive** collection may hold literal values. Every other token
(Styleguide, Theme, Device, Brand component/semantic) **must alias down to a
primitive**. Before emitting the split, the compiler scans for any non-primitive
token carrying a raw value and, if it finds any:

1. **Halts** the build (exit 1) — the split is **not** produced.
2. Removes any stale split output (`tokens.css`, `brand/*.css`) so nothing invalid is left behind.
3. Writes the full offender list to [`../tokens/dist/raw-value-violations.json`](../tokens/dist/) and prints them grouped by collection.

Fix by re-pointing each flagged token to a primitive (or adding the missing
primitive) in the source, re-export `Tokens.json`, then run `npm run build` again.

### Governance gate 1b — no direct primitive access outside Styleguide

Only the **Styleguide** collections (ARC / T1) may alias the **Primitive** collection.
Tokens in `01. Brand`, `02. Theme`, and `03. Device` must consume through the
intermediate layers — never alias a primitive directly. If any do, the build
**halts** (exit 1), removes the split, and writes the offending source variables
(same schema as `Tokens.json`) to [`../tokens/dist/primitive-alias-violations.json`](../tokens/dist/).

### Governance gate 2 — every split file must be self-contained

After the split is built (in memory), the compiler verifies that **`tokens.css`
and every per-brand slice resolve all their `var()` references within themselves
plus `primitives.css`**. If any reference dangles it:

1. **Halts** the build (exit 1) — the split is **not** written.
2. Removes any stale split output.
3. Writes the offenders (with the referencing declaration) to [`../tokens/dist/slice-violations.json`](../tokens/dist/).

The usual cause is a **cross-brand alias in the source** — e.g. a `T1` token
aliasing into the `ARC` namespace, so the T1 slice can't resolve it on its own.
Fix by re-pointing the flagged tokens within their own brand/mode in the source,
re-export, then rebuild. `computedStyles.css` is checked the same way (its `var()`
refs must resolve against the token file that imports it).

### Governance gate 3 — text styles reference only `01. Brand`

Every text-style property — each binding ref **and** the inferred line-height —
must resolve to a variable in the **`01. Brand`** collection. A style may not bind
to any other layer (Primitive / ARC / T1 / Theme / Device). If any do, the build
**halts** (exit 1), removes the split, does **not** write `computedStyles.css`, and
writes the offenders to [`../tokens/dist/style-collection-violations.json`](../tokens/dist/).
Fix by re-pointing the flagged style bindings at `01. Brand` tokens in the source,
re-export, then rebuild.

---

## 2. `build-components.js` — component CSS bundler

Concatenates each kit's co-located component CSS (`components/<Name>/<Name>.css`) into a generated, **do-not-edit** per-kit bundle:

| Bundle | Contents | Leading `@import`s |
| ------ | -------- | ------------------ |
| `global-kit/dist/global-kit.css` | all core component styles | `tokens/dist/tokens.css` |
| `product-kits/<p>/dist/<p>.css` | product-specific styles (only if any exist) | `tokens/dist/tokens.css` + `global-kit/dist/global-kit.css` |

Component CSS must bind only to token custom properties (`var(--…)`); this bundler does not transform values — it just orders and concatenates. A kit with no product-specific components produces no bundle. So one `<link>` to a kit bundle delivers fonts + primitives + text styles + token layers + component styles.
