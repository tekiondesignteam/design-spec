# Regenerating the UI-kit bundles

Each component lives in its own folder as a **source-of-truth partial**:

```
ui_kit/components/<Name>/
├── <Name>.jsx      ← component definition (React/JSX)
├── <Name>.css      ← component styles
└── preview.html    ← standalone preview card
```

The two top-level files `ui_kit/components.jsx` and `ui_kit/components.css`
are **generated bundles** that concatenate every partial in the order defined
by `ui_kit/components/manifest.js`.

## To add / edit a component
1. Edit the partial files inside `ui_kit/components/<Name>/`.
2. Ask the assistant to "regen the UI kit bundles" — this concatenates every
   partial (in manifest order) into the bundles so the main `index.html`
   picks up the change.

## Why bundles?
Babel-standalone doesn't support ES `import`. Loading 50 separate
`<script type="text/babel">` tags would bloat every preview. The bundles
keep the runtime small; the partials keep authoring modular.

## Special folders
- `ui_kit/_core.jsx` — shared primitives (`Icon`, `Phi`, `T1Mark`).
  Loaded first in the bundle.
- Components that were combined in the Figma source (Separator + Divider)
  live in the `Seperator` folder; `Divider` re-exports the same JSX alias.
