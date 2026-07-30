# Deploying explorations (GitHub Pages)

Hosting the repo on Pages gives every project a real `https://` origin — which fixes the `file://`
`fetch()` problem (see any project's `RUN.md`) without running a local server. Traps to know:

## Checklist

- **`.nojekyll` at repo root — keep it.** GitHub Pages runs Jekyll, which silently drops files/folders
  whose names start with `_`. The empty `.nojekyll` file disables Jekyll and serves everything as-is.
  It's committed by default; don't remove it.
- **Each project's deliverable is `index.html`** — so `…/projects/<name>/` serves it with no filename in the URL.
- **No `_`-prefixed filenames** (belt-and-suspenders). Even with `.nojekyll`, underscore-prefixed asset
  names are a footgun. Name other files kebab-case: `placeholder.svg`, not `_placeholder.svg`.
- **The whole design system must be committed** for a project's `../../design-systems/<ds>/…` paths to
  resolve on Pages. ⚠️ That **publicly exposes the kit** — for internal-only work, prefer the **Portable
  build** (see a project's `plan.md`) over hosting.
- **Relative `../../` paths resolve fine** on Pages regardless of the `/<reponame>/` URL prefix — *as long
  as the folder structure is preserved.* Don't flatten or move files on deploy.
- **Case-sensitivity:** Pages runs on Linux (case-sensitive); macOS is not. Keep every path and filename
  consistent-case, or links that work locally will 404 on Pages.

## Quick deploy

1. Push to GitHub with `.nojekyll` at the root.
2. Settings → Pages → deploy from branch (`main`, `/root`).
3. Open `https://<org>.github.io/<repo>/projects/<name>/` — serves that project's `index.html`.
