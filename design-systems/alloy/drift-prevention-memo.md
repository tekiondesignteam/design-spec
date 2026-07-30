# Drift-Prevention Memo

**Scope:** pattern library extracted from 22 component audits (Batches 1–6, April 2026). The companion artifact to [systemic-findings.md](./systemic-findings.md). That file catalogues *specific* code-level issues found during the audit; this one catalogues the *patterns* behind them and proposes conventions, templates, and checks to stop them recurring.

**Audience:** anyone adding a new component, adding a new brand, or auditing drift in the future. Read before writing a `.tsx` doc page.

**What the audit was:** a walk across all 22 components in the library, comparing each doc page against `styles/global.css` + `styles/tokens.css` + `styles/brands.css` + the Figma source of truth. The goal was to bring every page to the same standard (Footer was the reference). Along the way we discovered recurring drift patterns and code-level issues.

**What this memo isn't:** a bug list (that's `systemic-findings.md`) or a style guide (that's `CLAUDE.md`). It's the bridge — the "why these bugs keep appearing and what to change about how we work so they stop."

---

## Part 1 — Drift patterns (P1–P7)

Each pattern: what it looks like, where it appeared, the root cause, and what would prevent the next instance.

### P1 — Token table under-coverage

**What it looks like:** the doc page's token table lists N tokens; grepping `var(--<component>-` in `global.css` turns up N + M (M unlisted). Usually the page ships with the "obvious" visual tokens (color, size) and omits the "plumbing" tokens (margins, gaps, line-heights, transitions).

**Where it appeared:** every component audited. Config Sub-Header 23→44. Header 24→37. Toggle Button 9→16. Pattern is universal, not component-specific.

**Root cause:** no mechanical way to check "do I have them all?" The first author writes what they remember from the design; reviewers don't grep. Tokens added later get consumed in CSS but never make it back to the doc page.

**Proposal — mechanical:**
1. **Dev-time assertion in each `.tsx`:** a small helper that greps the token rows in the rendered table against `Object.keys(getComputedStyle(document.documentElement))` filtered by prefix. If counts disagree, throw in dev mode. One helper, one call per component.
2. **Lightweight alternative:** a CI script that parses each `.tsx` for the prefix used in the token table, greps `global.css` for that prefix, and diffs. Fail the build on mismatch.
3. **Low-tech alternative:** add "expected token count" to a registry file. Manual but cheap.

Pick (2). Fits the existing Vite/TS toolchain, no dev-mode runtime cost.

---

### P2 — Flat token tables unreadable at N > 20

**What it looks like:** a single table with 30+ rows. Readers can't find anything; cognitive load is O(N). Became acute once P1 fixes expanded tables past 20 rows.

**Where it appeared:** Config Sub-Header, Header, Tabs, Text Input, Button, Tooltip. Any large component.

**Root cause:** the doc-page template assumed "a token table" is one object. For small N it is. For large N it needs semantic grouping (Surface / Typography / States / Layout), otherwise the table is a dump.

**Proposal:** update the component-page template (see Part 3). For components with > 15 tokens, require 3–6 curated groups with human-readable headings. Groups should reflect concerns (surface, typography, interaction, layout), not alphabetical order.

Not lint-able — this is editorial judgment. Belongs in the template + a one-line note in `CLAUDE.md` under the Documentation UI section.

---

### P3 — Dead tokens: defined but never consumed

**What it looks like:** a token is defined in `tokens.css`, possibly brand-overridden in `brands.css`, but `global.css` never reads it via `var(--name)`.

**Where it appeared:** S6 (`--notification-badge-lh`, fixed), S9 (`--header-nav-*`, flagged). Almost certainly more.

**Root cause:** tokens get added aspirationally (design spec lists them; someone defines them) but the CSS consumer lags. Later, nobody notices the dead definition because fallbacks make it invisible at runtime.

**Proposal — mechanical:**
1. **One-time grep sweep:** for every `--foo` in `tokens.css`, grep `var(--foo` in `global.css`. Flag unconsumed. One-time cleanup now; pick a resolution per token (wire up vs delete).
2. **Ongoing CI check:** same grep as a CI step. Prevents regression. Cheap — runs in seconds.

Pick both. The one-time sweep is deferred work that's already identified; the CI check is the prevention.

---

### P4 — Fallback drift: `var(--X, Y)` where Y ≠ definition of X

**What it looks like:** CSS consumption specifies a fallback value that contradicts the token's definition. Invisible at runtime (fallbacks only fire if the token is undefined, which doesn't happen in practice) but it defeats the purpose of fallbacks — graceful degradation when tokens are missing. A contradicting fallback is worse than no fallback because it ships a second source of truth.

**Where it appeared:** S7 (Avatar offset-sign, fixed), Header logo max-width (120px fallback vs 90px token, fixed). Both discovered only because I was reading the CSS line-by-line.

**Root cause:** fallback was written once from a then-current design value, the token later moved, nobody updated the fallback. No runtime feedback.

**Proposal — mechanical:**
1. **Lint rule:** for each `var(--X, Y)` occurrence in `global.css`, check that `Y` matches `--X`'s definition in `tokens.css`. If not, warn. (Exact text match; don't try to resolve cascading.)
2. **Convention alternative:** drop fallbacks entirely. They're not serving graceful-degradation because tokens are always defined. Less code, one fewer drift vector. Add to `CLAUDE.md`: "fallbacks in `var()` are prohibited unless the token is intentionally optional."

Pick (2). Fallbacks in this codebase aren't load-bearing — deleting them removes the drift vector cheaply. Save (1) for if the team wants to keep them for belt-and-suspenders.

---

### P5 — Brand notes missing or skeletal

**What it looks like:** component page has no per-brand summary, or has one line per brand like "Buick uses its own font." Readers with a brand-specific question (what changes for GMC?) have to cross-reference `brands.css` manually.

**Where it appeared:** early batches — Accordion, Breadcrumb, Checkbox, Chip. Fixed during audit.

**Root cause:** the original template only showed one brand (Chevy default). Brand notes were bolted on later without a canonical shape. Three valid shapes emerged during the audit (matrix table / bulleted list / paragraph); authors picked at random.

**Proposal — template:**
- **Under 4 properties × 4 brands:** paragraph form (Tooltip, Slider).
- **4–15 properties:** `<ul className="doc-brand-list">`, one bullet per brand (most common).
- **>15 properties or multi-dimensional (e.g. backgrounds × fonts × sizes × weights):** matrix table (Tooltip, Text Input).

Add a named template section to `CLAUDE.md` with the decision tree. Not lint-able — shape is editorial.

---

### P6 — "Built from" / engineered-in-place rationale missing or circular

**What it looks like:** page says "Header is engineered per Figma spec" (circular — *why* engineered and not composed?). Or page lists sub-parts without saying what they compose or why.

**Where it appeared:** Header, Config Sub-Header (both fixed this batch), Tabs (half-fixed earlier — tabs are documentation-only, not composable).

**Root cause:** the atomic library's composability story is partial. Only 2 of the 19 atomic components export reusable React primitives (Avatar, InlineButton); the rest are CSS-only + documentation demos. Domain components (Header, Config Sub-Header, Footer) therefore mix **imports** with **engineered-in-place** surfaces. Authors who didn't write the original code can't tell which is which.

**Proposal — template + code-level:**
1. **Template:** Built from section must have two sub-parts:
   - **Imported** — primitives pulled in via named import. Name the import, link to the atomic.
   - **Engineered in place** — surfaces built inside the molecule. Each one names *why* (atomic rejected because X / atomic doesn't exist / atomic variant missing / legacy, refactor candidate). "Per Figma spec" is never the reason; Figma spec would apply to any composition choice.
2. **Code-level:** expand the set of atomic components that export reusable React primitives. Currently 2/19; long-term target closer to 10/19. That reduces engineering-in-place and sharpens the "use atomic first" default.

Pick both; (1) now as convention, (2) as backlog work.

---

### P7 — Font-family notation mixes weight with family

**What it looks like:** the token value or doc-row reads `Chevy_Sans:Bold` or `StratumGMC:Demi`. This is Figma's display notation, not CSS. It mixes `font-family` with `font-weight` into one string, and readers miss that two CSS properties are involved.

**Where it appeared:** early batches (Accordion, Tabs) — in token tables and CSS comments. Fixed during audit as `'Chevy_Sans'` (font-family) + separate `font-weight: 700` row.

**Root cause:** Figma exports with slash or colon notation for variant families; first authors copied the Figma string verbatim into CSS-facing documentation without translating to real CSS properties.

**Proposal — convention + mechanical:**
1. **Convention:** in `.tsx` token tables, never write `X:Bold`. Use `'X'` for font-family and a separate numeric `font-weight` row.
2. **Lint:** grep token tables for `:Bold`, `:Demi`, `:Regular`, `:Light`, `:Black` — fail if found. One-liner in CI.

Pick both.

---

## Part 2 — Systemic findings (S1–S9) summary

Full detail in [systemic-findings.md](./systemic-findings.md). Grouped here by category for the memo's purpose.

**Fixed inline during audit (2):**
- **S6** — `--notification-badge-lh` defined but unconsumed. Wired up in `global.css`. Commit `753268d`.
- **S7** — Avatar `--notification-badge-offset-*` fallback sign mismatch. Corrected to match token values. Commit `753268d`.

(The earlier report also listed a Header `--header-logo-max-width` fallback fix. On re-inspection that rule was inside a newly added block — not an edit to pre-existing runtime. See [css-runtime-changes.md](./css-runtime-changes.md) for the full runtime-diff surface.)

**Bugs flagged for separate PRs (1):**
- **S9** — Header `--header-nav-*` tokens defined and brand-overridden (GMC's 18/25) but never consumed. Designer intent silently dropped.

**Inconsistencies flagged for separate PRs (3):**
- **S1** — Cadillac hardcodes `#171473` in brands.css instead of routing through `var(--brand-color)` (Slider, Stepper, Toggle Button confirmed; likely others).
- **S5** — `--toggle-*` token prefix doesn't match the component or its root class (`.drp-toggle-group`). 24 tokens, all Toggle-Button-only. Rename to `--toggle-button-*`.
- **S8** — Configurator Sub-Header has no `--config-subheader-*` base in `tokens.css`. Chevy runs on `var()` fallbacks in global.css; brands.css covers only non-Chevy. ~44 tokens to extract.

**Design questions — need design review (3):**
- **S2** — GMC text-state overrides to `#060505` on Tabs/Toggle. Red-neutralization intent or bug?
- **S3** — Buick non-tints Avatar badge and Toggle selected state with `#333333`. Intent or copy-paste?
- **S4** — Avatar notification badge uses 3 different patterns across 4 brands. Design system inconsistency — which rule wins?

---

## Part 3 — Concrete proposals

**Pragmatism note.** An earlier draft listed five prevention mechanisms (checklist, template, lint, convention doc, backlog). Adopting five means adopting none seriously — the team picks up the first one enthusiastically and quietly drops the rest. Below, the two that catch the most drift for the least cost lead. The others are deferred under "optional, if capacity."

The two primary mechanisms cover all seven drift patterns (P1–P7) between them:

| Pattern | Caught by                  |
|---------|----------------------------|
| P1 (token undercoverage)     | **Checklist** — mandatory grep step |
| P2 (table unreadable at N>20)| **Checklist** — curated-groups trigger |
| P3 (dead tokens)             | **Lint** — tokens.css vs global.css consumption |
| P4 (fallback drift)          | **Lint** — fallback value vs token definition |
| P5 (brand notes missing)     | **Checklist** — 1-of-3 canonical shapes |
| P6 (built-from vague)        | **Checklist** — "imported vs engineered with reason" |
| P7 (font notation mixed)     | **Lint** — grep `:Bold`/`:Demi`/etc. |

### ⭐ 3A (primary). New-component checklist

**File:** `.claude/new-component-checklist.md` (new, ~15 lines)

Runs before merging any new component's doc page. Each line is a grep or a yes/no question a contributor can answer in < 30 seconds.

```
□ tokens.css has a --<name>-* block (S8 prevention)
□ grep --<name>- in global.css  — every defined token is consumed  (P3 / S6)
□ grep var(--<name>- in global.css  — every consumption has a tokens.css definition  (no orphans)
□ Fallbacks match token definitions exactly, or are absent  (P4 / S7)
□ .tsx token-table row count matches the grep count from step 2  (P1)
□ If >15 tokens, table is grouped into 3–6 curated sections  (P2)
□ Brand notes present in one of 3 canonical shapes: paragraph / bulleted list / matrix table  (P5)
□ Built from section names "imported" primitives and "engineered in place" surfaces, with a real reason per engineered item  (P6)
□ Font-family values use 'X' notation with a separate font-weight row (never X:Bold)  (P7)
□ Registered: sidebar link, HomePage card, App.tsx route
```

**Why it catches drift:** forces the author to grep against `tokens.css` and `global.css` before claiming the doc page is done. The top 4 items literally can't be completed without touching the canonical token files — which is the whole point. Items 5–9 are template-shape checks that would have caught every drift instance from the 22-component audit.

**Cost:** one-time write (~1 hour). Ongoing cost per new component: 5–10 minutes. Net-negative cost — the author was going to write a broken doc page without it and someone was going to catch it in review anyway.

### ⭐ 3B (primary). Lint rules for syntactic patterns

**File:** `scripts/drift-check.mjs` (new, ~60 lines of node, no new deps)

Three checks that are purely syntactic — no interpretation needed, so no false positives if the repo is in a known-good state (after S8 is fixed).

1. **Unconsumed-token check** (P3) — for every `--foo` in `tokens.css`, require at least one `var(--foo` in `global.css`. Warn otherwise. This is what would have caught S6 and S9 at write-time.
2. **Fallback-drift check** (P4) — for every `var(--foo, BAR)` in `global.css`, extract `--foo`'s definition from `tokens.css` and compare. Warn on mismatch. This is what would have caught S7.
3. **Font notation check** (P7) — grep `:Bold`, `:Demi`, `:Regular`, `:Light`, `:Black` inside token-table rows in `src/components/ui/*.tsx`. Fail if found.

Add as a `pretest` hook and/or a single CI step. Runs in < 1s.

**Why it catches drift:** zero human vigilance needed. Once merged, every future PR gets checked. Syntactic patterns don't argue — the mismatch is literally text.

**Cost:** half a day to write and tune. Ongoing: zero.

**Prerequisite:** S8 should be resolved first (extract `--config-subheader-*` to `tokens.css`). Otherwise the unconsumed-token check flags ~44 false positives out of the gate and the team disables the lint. Run the one-time cleanup first, turn the lint on second.

**What this lint does NOT catch — atomic-vs-Figma drift (S26).** The lint compares repo files against repo files (`tokens.css` ↔ `global.css`; `.tsx` token tables ↔ CSS rules). It cannot verify that the CSS faithfully implements Figma's per-brand variable resolutions. **S26** surfaced this kind of drift in atomic Tabs — CSS missing per-brand line-height / default-text-color / size overrides, plus `text-transform: uppercase` declarations Figma does not specify. Production rendering currently wrong on 3 of 4 brands for any consumer of atomic Tabs Contained, with no static-analysis signal. **Atomic-vs-Figma drift is not lint-detectable. Prevention requires periodic Figma cross-checks (manual `get_variable_defs` per brand × per variant, or Figma MCP automation), not static repo analysis.** Tracked separately as the atomic-vs-Figma capstone in [audit-summary.md § 3](./audit-summary.md). Likely recurs across the other 18 atoms; recommended scope for a future audit pass.

### Optional (if capacity)

Everything below was in the first draft. Useful on paper, but if the primaries above are in place, these have diminishing returns — the kind of thing a team picks up in Q3 when someone has a quarter-quarter left over, not a Q1 commitment.

- **3C. Component-page template updates** — extend `CLAUDE.md`'s "Documentation UI" section with one-line conventions for token table grouping, brand notes shape, built-from requirement, fallback policy, font-family notation. Mostly duplicates what the checklist (3A) enforces, but in a place contributors read during onboarding. Skip if the checklist link is surfaced in the repo's `CONTRIBUTING` or equivalent.

- **3D. Convention doc** — add a `"Drift-prevention conventions"` section to `CLAUDE.md` that cross-links the checklist and lint. Useful when the team is ~5 people; redundant at smaller scale.

Skip both until the primaries show they're landing. If contributors keep missing P5/P6 despite the checklist, that's the signal the template convention is earning its keep. Until then, convention docs that nobody reads are just surface area to maintain.

### 3E. Deferred cleanup backlog (separate PRs, tracked in `systemic-findings.md`)

Not a prevention mechanism — this is the sequencing for the code-level findings surfaced during the audit. Kept here for reference.

1. **S8 — Config Sub-Header `tokens.css` extraction** — move ~44 fallback values to a new tokens.css block. **Blocking prereq for the lint rule 3B** (otherwise 44 false positives from step 1). Low-risk; no visual diff.
2. **S9 — Header nav tokens wire-up** — add `font-size` / `line-height` / `font-weight` rules consuming the tokens. Design sign-off needed first (changes GMC nav to 18/25).
3. **S1 — Cadillac hardcoding sweep** — replace literal `#171473` with `var(--brand-color)` in brands.css. Low-risk; no visual diff.
4. **S5 — `--toggle-*` rename** — 24 token renames across 3 files. Low-risk, high-clarity.
5. **S2 / S3 / S4 — design review** — not a code task. Owner: design. Cluster into one 30-minute review.

See the Triage table at the top of [systemic-findings.md](./systemic-findings.md) for the priority × blast-radius / effort ranking.

---

## Part 4 — Why this is reusable, not one-time

The audit itself was one-time — 22 specific components, surfaced in a specific two-week window. The artifacts it produces are reusable:

- **Drift patterns (P1–P7)** survive as a review rubric. Any future PR touching token files or component pages gets checked against them.
- **Systemic findings (S1–S9+)** feed a backlog of real PRs, sized and owned. Priority ordering in the Triage table in [systemic-findings.md](./systemic-findings.md).
- **Primary mechanism — lint rules (3B)** prevent P3/P4/P7 mechanically — zero human vigilance cost.
- **Primary mechanism — checklist (3A)** catches P1/P2/P5/P6 at write-time.
- **Optional mechanisms (3C, 3D)** are there if the primaries prove insufficient. Starting with all five is how prevention programs fail; starting with two is how they land.

**Expected impact:** the next audit of this library (at ~40 components, presumably) should surface patterns P1–P7 with fewer instances, not more. If instance count doesn't drop, the conventions in 3B didn't land — that's the signal to revisit.

**What this memo deliberately doesn't try to do:** fix the code-level findings. Those are in systemic-findings.md, owned by follow-up PRs. This memo is about *practice* — how we work — not about the code itself.
