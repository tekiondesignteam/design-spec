# Suggested improvements — templates, skills & design-system docs

Learnings from the **t1-vehicle-search** POC, written up so they can be folded back into the
scaffolding system. Grouped by *where the change lives* and ordered by impact.

Legend for "Where":
- **T** = `templates/*.md` (constitution / spec / plan / tasks)
- **S** = skill logic (`/new-project`, `/spec`)
- **DS** = design-system docs (`design-systems/t1/…`, read-only → maintainer change)

---

## 1. 🔴 High — "browser-openable" is misleading; the deliverable needs a local server

**What we hit:** The finished `Vehicle Search.html` throws `TypeError: Failed to fetch` when opened by double-click (`file://`). Cause: the T1 kit's `loader.js` uses `fetch()` to load its component bundle, and browsers **block `fetch()` on `file://`**. It only works when served over http(s).

**Why it matters:** Every template currently promises a *"single browser-openable HTML file — no build step."* Designers read "browser-openable" as "double-click it" — which fails for any T1 fork (and any Babel/loader-based deliverable that fetches).

**Where:** T (constitution §6, plan "Guardrails", tasks "Drift check"), S (`/new-project` scaffolding).

**Suggested change:**
- Reword the promise from *"single browser-openable HTML file"* → **"single HTML file, no build step, run via a local static server (not `file://`)."**
- Add a short **"How to open"** block to the constitution §6 and/or a `RUN.md` scaffolded by `/new-project`:
  ```
  cd <repo-root>
  python3 -m http.server 4599
  # then open: http://localhost:4599/projects/<name>/<file>.html
  ```
- Note the `file://` caveat explicitly so it isn't rediscovered each time.

---

## 2. 🔴 High — offer a "portable / self-contained" build for sharing

**What we hit:** The local-server file can't be handed to a stakeholder (VP) to open themselves.

**Suggested change (T + S):** Add an optional **"Portable deliverable"** step to the plan template: produce a self-contained variant that inlines the kit bundle + tokens (no `fetch()`), so it works by double-click. Document the trade-offs in the template so the choice is deliberate:
- ✅ one double-clickable file, no server
- ⚠️ embeds a copy of the design system (larger; diverges from "reference the DS" model)
- ⚠️ still needs internet for CDN deps (React/Babel/Phosphor) unless those are inlined too

Make it a checkbox in `tasks.md`: *"[ ] Portable build produced for handoff (if sharing outside the repo)."*

---

## 3. 🟠 Medium — GitHub Pages / hosting checklist

**What we hit (anticipated):** Hosting the repo on Pages removes the `file://` error (real https origin), **but** has its own traps.

**Suggested change (T — add a "Hosting" note, or a scaffolded `DEPLOY.md`):**
- **`.nojekyll` at repo root — ✅ already added.** GitHub Pages runs Jekyll, which silently drops files/folders starting with `_`; `.nojekyll` disables Jekyll and serves everything as-is. Keep it in the scaffold by default.
- **Adopt a "no `_`-prefixed filenames" convention (belt-and-suspenders).** Even with `.nojekyll`, underscore-prefixed asset names are a footgun. Done in this project: `_placeholder.svg` → `placeholder.svg`. Add this as a naming rule in the templates so it's not reintroduced.
- **The whole design system must be committed** for `../../design-systems/<ds>/…` paths to resolve — flag that this publicly exposes the kit (a reason to prefer the portable build for internal work).
- **Relative `../../` paths** resolve fine on Pages regardless of the `/reponame/` prefix, *as long as the folder structure is preserved.*
- **Case-sensitivity:** Pages is Linux (case-sensitive), macOS isn't — keep all paths/filenames consistent-case.

---

## 4. 🟠 Medium — filenames should be kebab-case, no spaces

**What we hit:** The T1 workflow suggests descriptive fork names like `Focus Today Response.html` (with spaces). Spaces force `%20` in every URL and add friction on servers/Pages.

**Where:** DS (`design-systems/t1/CLAUDE.md` Workflow examples), T (plan step 1 wording).

**Suggested change:** Recommend **kebab-case, no spaces** for fork filenames (e.g. `vehicle-search.html`). Keep the human-readable title in the page `<title>`/NavBar, not the filename.

---

## 5. 🟠 Medium — surface known design-system "gotchas" during `/new-project` and `/spec`

Two T1-specific behaviors cost real back-and-forth this run. They should be captured so the spec anticipates them instead of discovering them mid-build:

- **`ListingCard` has no image/thumbnail prop** — it renders a letter `Avatar`. Any "show a photo per row" ask requires a fork-level workaround (or an upstream kit change).
- **`ListingCard` hides its avatar in the narrow AI panel** via `@container t1-response (max-width:500px)`. A thumbnail in the docked/popover panel needs an explicit override.

**Suggested change:**
- **DS:** add a short **"Known gaps / gotchas"** section to `design-systems/t1/CLAUDE.md` (or `ui_kit/docs/Listing-Card.md`) listing these, so `/spec` can read them.
- **S (`/spec`):** when a component the spec touches has a documented gotcha, pre-flag it as a `constitution §5` deviation candidate and ask the designer up front (we ended up doing this reactively).

---

## 6. 🟡 Low — align spec AC example copy with the design system's voice

**What we hit:** `spec.md`'s AC-2 example was *"I found 4 Camrys…"*, but T1's brand voice says **avoid "I" outside the greeting**. We corrected to "Found 4 Camrys…" mid-build.

**Suggested change (S — `/spec`):** When generating example copy in acceptance criteria, pass it through the design system's voice rules first, and always mark example strings as *"e.g."* so wording stays illustrative, not binding.

---

## 7. 🟡 Low — the review/verify workflow worked well; make it explicit

**What went well:** Per-step verification via a headless browser (screenshot each AC into `reviews/step-N/`, plus DOM assertions for facts like "1 card / 4 rows / no pointer") caught real issues (the container-query avatar-hide) and produced shareable evidence.

**Suggested change (T — plan/tasks):** Bake the two-part check into the template's per-step rule: **(a) visual frame per AC**, and **(b) a DOM/assertion check** for anything a screenshot can't prove (counts, cursor state, overflow, "shell unchanged" diff). We used a `?scenario=` / `?panel=` seed-switch to make each state independently reviewable — worth recommending as a pattern.

---

## Quick-win checklist (smallest edits, biggest payoff)
- [ ] Reword "browser-openable" → "run via local static server (not `file://`)" in constitution §6, plan, tasks. *(#1)*
- [ ] Scaffold a `RUN.md` (server command + URL + `file://` caveat) in `/new-project`. *(#1)*
- [x] `.nojekyll` added at repo root. *(#3)*
- [ ] Add a "no `_`-prefixed filenames" + kebab-case naming rule to templates. *(#3, #4)*
- [ ] Add a "Portable build" optional step + tasks checkbox. *(#2)*
- [ ] Add a T1 "Known gotchas" note (ListingCard image prop + narrow-panel avatar-hide). *(#5)*
