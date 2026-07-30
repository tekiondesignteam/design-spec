# Layer 2 · Product Kits

A Product Kit is a product-scoped library assembled from Global Kit components. Product Kits **never** define semantics of their own, and they **do not store token values** — all token values (including each kit's component-specific variables and brand modes) live in the combined file under [`../tokens/`](../tokens/) and are **consumed** from [`../tokens/dist/`](../tokens/dist/). Brand identity enters **exclusively through the mode layer** of the token file, and one kit can carry any number of brands.

| Product Kit | Brand Modes |
| ----------- | ----------- |
| [ARC](arc/) | Tekion · GMC · Ford · Honda · Acura |
| [DRP](drp/) | Chevy · Cadillac · Buick · GMC · Carbravo |
| [DRS](drs/) | Tekion · Hyundai · Acura · Honda |
| [DRSC](drsc/) | Tekion · Chevy · Cadillac · Buick · GMC · Carbravo · Hyundai · Acura · Honda |
| [T1](t1/) | Tekion · {} |
| [ARC Consumer](arc-consumer/) | Tekion · {Dealership} |

**Stack:** build-less React 18.3.1 (`react`/`react-dom` UMD via unpkg CDN), JSX transpiled in-browser with `@babel/standalone` 7.29.0, icons via `@phosphor-icons/web` (CDN) — same as the Global Kit. No bundler.

## Each kit folder

- `components/` — **product-specific composed components only** (co-located `<Name>/<Name>.jsx` + `<Name>.css`). Product kits assemble Global Kit components and **never restyle them** — brand differences come purely from token modes (`data-brand`). Component CSS binds only to token custom properties, never hardcoded values.
- `dist/` — **generated** `<product>.css` bundle (`@import`s `tokens/dist/tokens.css` + `global-kit/dist/global-kit.css`), produced by `npm run build`. Do-not-edit. A kit with no product-specific components produces no bundle.

Component-specific variables and per-brand modes are part of the combined token file, not stored in the kit.
