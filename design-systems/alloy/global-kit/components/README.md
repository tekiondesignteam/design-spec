# global-kit / components

The **core component library** — the building blocks consumed by every Product Kit.

**Stack:** build-less React 18.3.1 (`react`/`react-dom` UMD via unpkg CDN), JSX transpiled in-browser with `@babel/standalone` 7.29.0, icons via `@phosphor-icons/web` (CDN). No bundler.

- Components bind to tokens consumed from [`../../tokens/dist/`](../../tokens/dist/) (CSS custom properties in `[data-*]` layers), never hardcoded values.
- Switching a brand mode (`data-brand`) re-themes every component here automatically — no forks.
- Product Kits must **not** fork or duplicate components to create brand variants — brand differences come from modes in the token file.

## Layout & CSS

One folder per component, CSS co-located with the JSX:

```
components/
  Button/  Button.jsx  Button.css  preview.html
  …
```

- **Component folders hold component files only** (`<Name>.jsx` + `<Name>.css` +
  `preview.html`). Shared / cross-cutting JS — helpers used by more than one component
  or preview — lives in [`../lib/`](../lib/), not inside a component folder.

- **Component CSS binds only to token custom properties** (`var(--component-…)`, `var(--semantic-…)`) — no hardcoded colours / sizes / fonts (the CSS analogue of the token "no raw values" rule).
- Class names are prefixed `gk-` (Global Kit) to avoid collisions.
- Components never branch on brand/theme/device — the `[data-*]` cascade re-themes them.

`npm run build` concatenates every component's CSS into the generated, **do-not-edit** bundle [`../dist/global-kit.css`](../dist/) (which `@import`s `tokens/dist/tokens.css`). Edit the co-located source, then rebuild.
