# global-kit / lib

Shared, **build-less** JavaScript helpers used across the Global Kit — the home for
any non-component JS that more than one component (or a preview / doc / tool) needs.

This exists so `components/` stays uniform: every `components/<Name>/` folder is
exactly `<Name>.jsx` + `<Name>.css` + `preview.html` and nothing else. Cross-cutting
JS does **not** get buried inside whichever component happened to need it first — it
lives here.

## What belongs here

- Framework-agnostic (vanilla JS, no React) helpers, or React-free widgets.
- Anything consumed by **more than one** component/preview, or that is conceptually
  shared data/tooling rather than a single component's implementation.

## Conventions

- **No bundler.** Files load via `<script src="../../lib/<file>.js">` and attach a
  single global. There is no JS build step (`npm run build` only concatenates
  component **CSS**), so a move is just relocating the file and fixing `<script>` paths.
- **Globals are namespaced** with the `GK` prefix (`window.GKIconGlyphs`,
  `window.GKGlyphCombobox`); any injected CSS ids/classes use the `gk-` prefix.
- **No token values.** Same rule as everywhere in the kit — colours/sizes come from
  token custom properties, not hardcoded values (standalone fallbacks are allowed only
  for React-free widgets that must render outside the `[data-*]` cascade).

## Current contents

| File | Globals | Role |
| ---- | ------- | ---- |
| `glyphs.js` | `GKIconGlyphs` + `GKGlyphCombobox` | One file, two React-free globals: the glyph-name **catalog** (single source of truth for the icon names the `<Icon>` component can render — parsed from the Phosphor stylesheet, fetched once, cached), and a reusable dependency-free searchable icon **picker** that filters that catalog (used by the Icon and Button previews). |
