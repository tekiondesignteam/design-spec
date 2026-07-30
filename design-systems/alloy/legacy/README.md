# legacy/

Static HTML fallback pages and their supporting JS, preserved for reference only.

**Status as of 2026-04-23:** These files are **not** in the Vite build graph, are **not** imported by the SPA in `src/`, and are **not** referenced by any deploy config in this repo (there are none). They were moved here from `js/` and `components/<name>/` during the TypeScript migration.

**Slated for deletion on 2026-06-22** (60 days from move) unless someone surfaces a real external consumer before then.

## Contents

- `js/brand-switcher.js` — the JS that wired the `[data-brand]` switcher for the static pages.
- `components/<name>/index.html` (15 files) — per-component static doc pages.
- `components/{accordion,menu,slider,stepper,tabs}/<name>.js` (5 files) — the interactive bits for the pages above.

The written-spec READMEs that formerly lived at `components/<name>/README.md` were removed on 2026-04-23 (commit immediately after this move). Recoverable from git history at the initial commit if needed.

## Known breakage

Relative asset paths inside these HTML files (e.g. `../../styles/global.css`, `../../assets/fonts/...`, `../../js/brand-switcher.js`) all broke when the files moved one directory deeper. These pages will render unstyled if opened directly in a browser. This is deliberate: "working" deprecated files invite continued use. If you need to see one functioning as it once did, check the repo prior to this change.

## If you're looking for the current docs

- Interactive component demos: `npm run dev`, then any route under `/components/*`.
- Written specs: no in-repo artifact. See the Figma file (source of truth) and the hosted Storybook.
- Hosted Storybook: <https://aecgm-dev.tekion.xyz/docs/ui-components/>.
