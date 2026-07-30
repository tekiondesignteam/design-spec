# Systemic Findings

Running list of cross-component bugs, inconsistencies, and open questions surfaced during the April 2026 doc-site accuracy audit. Separate from per-component drift findings (which are documentation issues, already fixed in the audit). Items here are **code-level concerns that warrant engineering and/or design review** — the audit surfaces them but does not fix them.

Last updated: 2026-04-25 (post-audit triage added).

---

## Triage — priority, effort, and rank

Scored as **(priority × blast radius) / effort**. Priority reflects the cost of leaving the finding in place; blast radius is how many components or contributors are affected; effort is rough relative size. Fixed items (S6, S7) excluded.

| ID  | Priority | Blast radius | Effort | Dependency              | Score    |
|-----|----------|--------------|--------|-------------------------|----------|
| S8  | high     | architecture-wide (breaks tokens.css invariant for 1 of 22 components, signals OK to add more) | medium (~44 values to extract, visual-regression verify) | none — fix immediately | **highest** |
| S26 | med-high | atomic CSS family-wide (Tabs Contained + Underlined Inside + Inset). Today: 1 production consumer (VSR Filter) renders wrong on 3 of 4 brands; future: every new Tabs consumer inherits the drift | low (9 brand overrides to add, 4 spurious `uppercase` decls to remove — mechanical, `brands.css`-only) | 3 design-clarification items can be batched separately; Pattern A + B can land independently | **high** |
| S9  | med-high | 1 component, but design intent (GMC 18/25) silently dropped | low (option 1 = 3 CSS rules) | design confirm before wiring | **high** (conditional on confirm) |
| S1  | medium   | 3+ confirmed components, likely more (Cadillac-wide sweep) | low–medium (mechanical find/replace + regression) | none | **moderate** |
| S5  | medium   | 1 component, 24 tokens across 3 files | medium (renames only, no behavior) | none | **moderate** |
| S4  | low-med  | Avatar only, cross-brand inconsistency | zero code / unknown design effort | **design review** | blocked |
| S3  | low      | Avatar + Toggle Button, 1 brand (Buick) | zero code / unknown design effort | **design review** | blocked |
| S2  | low      | Tabs + Toggle Button, 1 brand (GMC) | zero code / unknown design effort | **design review** | blocked |

### Proposed top 3 to address next

1. **S8 — extract `--config-subheader-*` to tokens.css.** Highest impact because it's the only component in the library that breaks the three-layer token invariant — leaving it in place normalizes the anti-pattern. Low-risk (fallbacks already match the values being extracted; visual diff = none). Unblocks the "can we lint against this?" question — right now a lint rule for "every component has tokens.css coverage" has one false-positive baked into the repo.
2. **S9 — wire up `--header-nav-*` tokens, conditional on design confirming GMC 18/25 intent.** Low effort (3 CSS lines scoped to `.drp-header .drp-inline-button`), high payoff because GMC's explicit brand ramp is currently silent. 5-minute ask to design to confirm, then 10-minute code change. If design says "no, inherit InlineButton", the tokens get deleted instead — same cleanup either way.
3. **S1 — Cadillac hardcoding sweep.** Not the highest urgency, but highest ratio of hygiene gained per hour spent. One pass through `[data-brand="cadillac"]` in brands.css, replace literal `#171473` with `var(--brand-color)` where the intent is brand-tinted. Regression-check in preview across all four brands. The payoff is that the invariant "`var(--brand-color)` is the single source of truth for brand accent" becomes actually true.

Deferred (blocked on design):
- S2, S3, S4 — cluster into one 30-minute review with design. All three are "intentional or bug?" questions about brand-specific color choices. Resolving them together is cheaper than one-off pings; also, S4 (Avatar badge) likely informs S3 (Avatar badge on Buick).

Not listed: S5 (`--toggle-*` rename). Worth doing but no urgency — purely internal naming, zero user-visible effect, and naming drift at one component doesn't cascade. Fits as a small follow-up PR whenever someone's already touching toggle-button.

---

## S1 — Cadillac hardcodes `#171473` instead of `var(--brand-color)`

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Components:** Slider, Stepper, Toggle Button, Notification badge (confirmed via Figma variable binding).

**Figma verification:** queried nodes Slider `2782:45746`, Stepper `2348:14663`, Toggle Button `5063:49364`. Figma binds these surfaces to component-scoped **variables** with mode-switched values, not literal hexes:

| Surface | Figma variable | Chevy-mode value |
|-|-|-|
| Slider fill | `body/slider/color-track-bg-selected` | `#0077d9` |
| Stepper badge / active underline | `body/badge/color-primary-bg`, `body/tabbar/underline/inset-tab-item-color-selected-border-default` | `#0077d9` |
| Toggle selected bg | `body/toggle/button/color-option-1-selected-bg-default` | `#0077d9` |

*Chevy-mode values verified directly via MCP. Per-brand (Buick/GMC/Cadillac) mode resolutions not exercised — but Figma variable names have no brand qualifier and no per-brand literal hexes exist in Chevy mode, confirming the mode-switch pattern.*

**CSS drift:** [`brands.css`](styles/brands.css) lines 561, 569–572, 579, 582–583 (Cadillac block) hardcode the literal `#171473` at these consumption points:
- `--slider-fill-color`
- `--stepper-badge-bg`
- `--toggle-bg-selected`, `--toggle-border-selected`, `--toggle-border-hover`, `--toggle-text-hover`
- `--notification-badge-bg`

Other brands route the same tokens through `var(--brand-color)`. Cadillac duplicates the literal hex.

**Example — [brands.css](styles/brands.css):**
```css
/* GMC block */
--slider-fill-color: var(--brand-color);   /* ✓ routes through --brand-color */

/* Cadillac block */
--slider-fill-color: #171473;              /* ✗ hardcoded */
```

**Why it's a bug:** `--brand-color` is defined as `#171473` for Cadillac, so the computed CSS is identical today. But:
1. Changing Cadillac's brand color in one place (e.g., a rebrand) would not propagate — every hardcoded occurrence must be tracked down.
2. It's an invisible inconsistency: readers of `brands.css` can't tell at a glance which tokens are brand-tinted vs. which are intentionally fixed-color.
3. It breaks the mental model that `var(--brand-color)` is the single source of truth for per-brand accent — a model Figma itself follows via its component-scoped mode-switched variables.

**Proposal:** Replace Cadillac hardcodes with `var(--brand-color)` at the 5 tokens listed above. Visual output unchanged; intent preserved. Sweep remaining Cadillac tokens for similar hardcoding before closing.

---

## S2 — Selected-text on Tabs: Chevy CSS uses brand-blue where Figma says neutral grey (framing inverted from original S2)

**Tags:** [CSS-vs-FIGMA]

**Components:** Tabs (`--tabs-text-selected`), Toggle Button (`--toggle-text-hover`).

**Figma verification:** queried nodes `2054:9877`, `2054:9878` (Tabs component). Figma has TWO distinct tab variables:

| Figma variable | Chevy-mode value | Intended semantic |
|-|-|-|
| `body/tabbar/underline/inset-tab-item-color-selected-border-default` | `#0077d9` | brand-tinted underline |
| `body/tabbar/underline/inset-tab-item-color-selected-text-default` | `#262626` | neutral grey |

Variable names have no brand qualifier; the `text` variable resolves to `#262626` (neutral dark grey) in Chevy mode, suggesting shared-neutral across brands.

*Chevy-mode values verified directly via MCP. Per-brand (Buick/GMC/Cadillac) mode resolutions not exercised — but the absence of a brand qualifier in the variable name strongly implies `#262626` across all modes.*

**CSS framing inverted from original S2:** the *original* framing called out GMC's `--tabs-text-selected: #060505` as suspect brand-red-neutralization. Figma data shows the **opposite**: GMC's near-black grey is *closer to Figma's intent* than Chevy's brand-tinted selected-text. The actual divergence:
- **Chevy CSS** (`--tabs-text-selected: #0077d9` brand blue in tokens.css) — **diverges from Figma's `#262626` grey.**
- **GMC CSS** (`--tabs-text-selected: #060505` near-black) — effectively matches Figma intent.
- **Buick, Cadillac** — need per-brand verification.

**Why it matters:** the original finding treated GMC as the deviation; Figma says GMC happens to align and Chevy is the deviation. Remediation direction flips.

**Pattern category:** P4 (fallback/value drift) + P5 (framing mismatch).

**Proposal:** Two paths for design to pick:
1. **Align to Figma strictly:** change Chevy `--tabs-text-selected` to `#262626`; verify Buick and Cadillac also resolve to `#262626` and update if not. GMC unchanged.
2. **Document divergence:** if the product decision is "selected-tab text picks up brand tint," document that explicitly in tokens.css as a knowing departure from Figma, and revisit GMC (currently the odd one out — only brand that doesn't tint).

Toggle Button `--toggle-text-hover: #060505` (GMC) likely follows the same pattern — verify with design in the same review.

---

## S3 — Buick non-brand-tinting with `#333333`

**Tags:** [CSS-vs-FIGMA] (conditional) + [CSS-INTERNAL]

**Components:** Avatar (notification badge bg `#333333`), Toggle Button (selected bg/border `#333333`).

**Figma verification:** queried Button `4740:60708` (Primary Filled), `4740:61870` (Secondary Filled). Figma has two distinct variables:
- `button-contained-color-primary-filled/background-color` = `#0077d9` (Chevy-mode)
- `button-contained-color-secondary-filled/background-color` = `#262626` (Chevy-mode; neutral dark charcoal, labeled "Secondary")

No Figma variable was found directly bound to `#333333`. The existence of a separately-named "Secondary" palette (`#262626`) implies Primary should tint brand-orange in Buick mode, not charcoal.

*Chevy-mode values verified directly via MCP. **Buick-mode resolution** of `button-contained-color-primary-filled/background-color` was **not exercised** — this is the verification blocker. If Figma resolves to `#D44400` in Buick mode, CSS has substituted Secondary into Primary (bug). If Figma resolves to `#333333` in Buick mode, CSS matches (intentional). Cannot conclude without Buick-mode data.*

**Why it's a bug (conditional):** Buick is the only brand that skips brand-tinting on Avatar badge and Toggle Button selected state. Figma's variable structure (distinct Primary vs Secondary palettes) suggests Primary should tint; CSS uses a value matching neither Primary Chevy nor the Secondary Chevy variable (`#333333` ≠ `#262626` and ≠ `#D44400`). Third-value drift.

**Pattern category:** P5 (brand notes unclear) + potential P4 (value drift from source).

**Proposal:** Design-team ask — confirm Buick-mode resolution of `button-contained-color-primary-filled/background-color`:
- If `#D44400` (orange): fix CSS to route through `var(--brand-color)`.
- If `#333333` (or similar dark): align Figma and CSS to the same value; document intent.
- Same question for Avatar badge variable and Toggle Button.

Bundle with S2, S4 as a single design-team cluster review.

---

## S4 — Avatar badge color inconsistency across brands

**Tags:** [CSS-INTERNAL] (structure matches Figma)

**Components:** Avatar.

**Figma verification:** queried nodes `20408:69552`, `20408:69558`. Figma defines **one** variable `body/badge/color-primary-bg` bound to this surface (Chevy-mode `#0077d9`). No per-brand component variants exist — the variable is mode-switched like every other brand-scoped token. Border is `body/badge/color-primary-border` = `rgba(0,0,0,0)` (transparent).

*Chevy-mode value verified via MCP. Per-brand (Buick/GMC/Cadillac) mode resolutions **not exercised** — the per-brand CSS values may or may not match Figma's mode-switched resolutions.*

**CSS picture:** per-brand `--notification-badge-bg` resolves to four different values:

| Brand | CSS value | Matches Figma mode? |
|-|-|-|
| Chevy | `#0077d9` | ✓ (verified) |
| Buick | `#333333` (non-tinted, see S3) | **Unknown** |
| GMC | `#25282A` (near-black, not brand red) | **Unknown** |
| Cadillac | `#171473` (hardcoded, see S1) | Likely ✓ (brand-value) |

**Why it matters:** The structural shape matches Figma (one mode-switched variable → per-brand CSS values). The open question isn't whether variation is legitimate — it is — but whether **these specific values** match Figma's per-brand modes. If they do, the finding shifts from "bug" to "document design decision." If Buick/GMC modes in Figma resolve to their respective brand colors (`#D44400`, `#CC0000`), CSS has drifted.

This finding merges with S3 — same variable, same blocker (Buick-mode not verified).

**Pattern category:** P5 (brand notes unclear) pending per-brand Figma verification.

**Proposal:** Design-team ask (bundle with S2, S3):
- Confirm Buick-mode and GMC-mode resolutions of `body/badge/color-primary-bg`.
- Options: (a) align all brands to brand-tinted (like Chevy/Cadillac); (b) explicitly document per-brand policy ("Buick and GMC neutralize badge to avoid brand-red/orange noise"); (c) align all brands to neutral.

**User note:** Flagged separately to design on 2026-04-24 — no code change from audit.

---

## S5 — `--toggle-*` token prefix inconsistent with component name

**Tags:** [CSS-INTERNAL]

**Components:** Toggle Button (root class `.drp-toggle-group`, tokens `--toggle-*`).

**Pattern:** Every other component in the library prefixes tokens with the full component name:
- `.drp-slider-*` → `--slider-*` ✓
- `.drp-stepper-*` → `--stepper-*` ✓
- `.drp-text-input-*` → `--text-input-*` ✓
- `.drp-notification__badge` → `--notification-badge-*` ✓

Toggle Button is the exception:
- `.drp-toggle-group` → `--toggle-*` ✗ (expected `--toggle-button-*` or `--toggle-group-*`)

**Confirmed scope:** Grep of `var(--toggle-` across `styles/` — 24 token definitions, **all** consumed only inside `.drp-toggle-group*` selectors. No shared abstraction; this is Toggle-Button-only naming drift.

**Why it's a bug:** The `--toggle-*` prefix is ambiguous — a reader might reasonably expect it to apply to Switch (also a toggle), or to a hypothetical future Toggle component. The prefix doesn't match the root class name.

**Proposal:** Rename to `--toggle-button-*` (matches the user-facing component name, consistent with `--text-input-*`) or `--toggle-group-*` (matches the root class, consistent with `--notification-badge-*`). Prefer `--toggle-button-*` for readability. Separate PR — 24 token renames in tokens.css + brands.css + global.css.

---

## S6 — `--notification-badge-lh` was defined but unconsumed (FIXED 2026-04-24)

**Tags:** [CSS-INTERNAL]

**Components:** Avatar notification badge.

**Pattern:** `--notification-badge-lh: 14px` was defined in [tokens.css:739](styles/tokens.css:739) but never consumed — [global.css:2118](styles/global.css:2118) hardcoded `line-height: 1` instead.

**Resolution:** Wired up during Batch 5 Avatar audit. Verified visually identical (14px line-height on 16×16 badge under flex centering).

**Systemic question:** Are there other defined-but-unconsumed tokens? A full sweep of `tokens.css` vs `var(--*)` consumption in `global.css` would catch these. Not done during the audit — flagged as a follow-up.

**Proposal:** One-time grep sweep: list every token in tokens.css, check each is consumed somewhere in global.css. Dead tokens either get wired up (source-of-truth intent) or deleted.

---

## S7 — `--notification-badge-offset-*` fallback sign mismatch (FIXED 2026-04-24)

**Tags:** [CSS-INTERNAL]

**Components:** Avatar notification badge.

**Pattern:** [global.css:2106-2107](styles/global.css:2106) had fallbacks `var(--notification-badge-offset-top, -4px)` / `-4px`, but [tokens.css:740-741](styles/tokens.css:740) defines the tokens as `2px` / `4px` (positive).

**Resolution:** Fallbacks updated to match token values during Batch 5 follow-up.

**Systemic question:** This kind of fallback drift is invisible in production (fallbacks only fire if tokens are undefined, which doesn't happen). But it defeats the purpose of fallbacks — graceful degradation when tokens are missing. A fallback that contradicts its token is worse than no fallback.

**Proposal:** Either a lint rule (`var(--X, Y)` where Y != definition of X → warn) or a convention: "fallbacks are optional; if present, they must match the token default exactly." Adding this to CLAUDE.md is cheap.

---

## S8 — Configurator Sub-Header has no tokens.css base layer

**Tags:** [CSS-INTERNAL] (architectural exception — not a Figma-divergence)

**Components:** Configurator Sub-Header.

**Figma verification:** queried Core Variables file `RsCbyz0LF6FaItYny1FqUU` searching for `configurator-sub-header`, `sub-header`, `Navigation`. **Zero hits.** The component is NOT part of the Core Variables Figma file. The unrelated hits found (`list-item-container-sub-header/*` for menus, `--configurator-ev-icon/color` for a single icon tint) do not describe this bar.

The node ID `481:9086` referenced by a comment in `global.css` does not resolve in the Core Variables file — it lives in a **separate Figma file** ("🔵 GM • 02.01 Navigation"), which was not queried in this session.

**Reframed conclusion:** the finding is not "this component violates the token architecture" but "this component's source of truth lives in a separate Figma file than the Core Variables tokens derive from." The CSS approach (inline fallbacks in `global.css`) is defensible because there's no Core-Variables token to align with.

**Pattern:** `tokens.css` (Chevy base) + `brands.css` (per-brand) + `global.css` (consumption with fallbacks). Configurator Sub-Header:
- **Zero** `--config-subheader-*` definitions in `tokens.css` (grep confirmed).
- Chevy "base" values live as inline fallbacks in `global.css` (~44 tokens, lines 2752–3006).
- Brand overrides in `brands.css`: Buick 14, GMC 14, Cadillac 11.
- Chevy renders on fallbacks, not on tokens. No token to override.

**Why it still matters (reduced severity):**
1. **Cross-file inconsistency.** A future contributor reading the Core Variables file won't find this component's tokens; it will look like a gap. Documenting the separate-file source reduces surprise.
2. **Lint false-positive risk.** A lint rule "every component has tokens.css coverage" produces a false positive on this component. The rule either needs an exception or a comment pointing to the Navigation file.

**Proposal (revised):**
- **Primary:** Add a comment block at the top of the `--config-subheader-*` section in `global.css` documenting: *"Tokens for this component derive from the GM Navigation Figma file, not Core Variables. Chevy base values are inlined as `var()` fallbacks; per-brand overrides live in brands.css. This is a knowing exception to the three-layer token architecture."*
- **Secondary (optional):** Still consider extracting fallbacks to a dedicated block in `tokens.css` under a `/* Domain component: Configurator Sub-Header (source: GM Navigation Figma file) */` header, so the structural pattern matches the rest of the library even if the source-of-truth file is different. Treat per-brand overrides in `brands.css` as authoritative.
- **No Figma alignment work** from this audit — that would require opening the Navigation file as a separate scope.

**Self-documenting:** the Configurator Sub-Header doc page now surfaces this gap inline (yellow "Architectural note" banner on the Design Tokens section) so readers aren't misled about where the values come from.

---

## S9 — `--header-nav-*` typography tokens defined but not consumed

**Tags:** [CSS-INTERNAL]

**Components:** Header primary nav.

**Pattern:** Three tokens are defined in [tokens.css:997-999](styles/tokens.css:997) and brand-overridden in [brands.css](styles/brands.css) (GMC specifically sets `--header-nav-font-size: 18px` / `--header-nav-line-height: 25px` to match the brand's 18/25 body ramp):
- `--header-nav-font-weight`
- `--header-nav-font-size`
- `--header-nav-line-height`

But **none of the three are consumed in global.css** (grep confirmed). Nav typography currently comes from the `InlineButton` primitive's own token scope, not these tokens.

**Why it's a bug:** GMC's explicit intent to size nav at 18/25 is silently dropped. The brand definition exists and reads as load-bearing to a contributor, but has no effect. Same category of bug as S6 (`--notification-badge-lh` pre-fix) — tokens without consumption are documentation debt.

**Proposal:** Three options.
1. **Wire up the tokens.** Add `font-weight: var(--header-nav-font-weight, ...)` / `font-size` / `line-height` rules scoped to `.drp-header .drp-inline-button` (or whatever selector overrides InlineButton in Header context). This honors GMC's explicit 18/25 intent.
2. **Delete the tokens.** If the decision is "Header inherits InlineButton's typography scope", remove the definitions from tokens.css + brands.css.
3. **Move to InlineButton's token scope.** If Header-specific nav typography is a real concern but shouldn't live on `--header-*`, add `--inline-button-font-size-large` (or similar) with a `.drp-header` scoped override.

Designer intent (GMC's 18/25 definition in brands.css) suggests option 1. Confirm with design before acting.

**Self-documenting:** the Header doc page now lists these three tokens in the Primary nav typography table with explicit "defined but not consumed — see S9" notes, so the gap is visible to readers.

---

## Batch 7 — Foundations audit

Findings from the Colors, Typography, and Spacing foundations pages. Unlike S1–S9 (which are component-level cross-cutting), these surface at the foundation-page layer and tend to be page↔source-of-truth mismatches rather than component bugs.

**Classification legend:**
- **[CSS-INTERNAL]** — CSS contradicts itself, docs contradict CSS, or CSS has unused definitions. Fix is local to the repo.
- **[CSS-vs-FIGMA]** — CSS deviates from Figma canonical source of truth. Fix requires either aligning CSS to Figma or getting design sign-off on the divergence.

Both tags can apply to one finding. S1–S9 have not yet been retroactively classified — flagged as a closing-deliverable task.

### Colors (`src/pages/ColorsPage.tsx`)

Figma verification performed 2026-04-25 via `mcp__Figma__get_metadata` on `0:1` and `mcp__Figma__get_variable_defs` on component nodes Button `4740:60659`, Alert `3769:50197`, Chip `3769:50187`, Tooltip, Snackbar, Avatar. File: `RsCbyz0LF6FaItYny1FqUU` ("🔵 GM • 01. Core Variables (Latest)").

Key Figma facts (Chevrolet-mode resolved values; per-brand values not individually dumped but known to be mode-switched on same variable names):
- Feedback collection lives under `color/<name>/<role>` — `color/success/default` `#2d871b`, `color/warning/default` `#b3842d`, `color/error/default` `#d64022`, `color/success/subtle` `#e1eddc`, `color/warning/subtle` `#f6ecde`, `color/error/subtle` `#ffe4db`. No `color/info/*` leaf (information routes through `color/primary/*`, subtle-bg `#ecf1fc`).
- Neutral ramp: `brand/color/grey-{50,100,200,300,500,600,700,800,900}` (9 rungs, 400 gap matches page). Plus `brand/color/black`, `brand/color/white`.
- Brand palette in Figma: `brand/color/brand`, `brand/color/brand-secondary`, `brand/color/button-hover`, `brand/color/button-disabled`, `brand/color/grey-*`, `brand/color/success`, `brand/color/warning`, `brand/color/error`.
- All brand and neutral variables are **mode-switched on a single collection** — one variable name, four mode values (one per brand).

---

## S10 — Feedback/Semantic swatches show values that match neither Figma nor existing CSS tokens

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Surface:** `src/pages/ColorsPage.tsx:123-157` (Feedback & Semantic group, 6 swatches).

**Pattern:** The page hex values diverge from **both** Figma canonical and the existing chip-scoped CSS tokens (which themselves match Figma exactly for success/warning/error).

| Swatch | Page hex | Figma (`color/…/default` or `/subtle`) | CSS (`--chip-…`) |
|-|-|-|-|
| Success | `#1d7a3b` | `#2d871b` ✕ | `--chip-plain-text-success` `#2d871b` ✕ |
| Warning | `#e6880a` | `#b3842d` ✕ | `--chip-plain-text-warning` `#b3842d` ✕ |
| Info Surface | `#e8f0fa` | `#ecf1fc` (Figma has this on `color/primary/subtle`, not `info`) ✕ | `--chip-info-subtle-bg-primary` `#ecf1fc` ✕ |
| Error | `#d64022` | `#d64022` ✓ | `--text-input-border-error` / `--chip-plain-text-error` `#d64022` ✓ |
| Background | `#f8f8f8` | not surfaced in Figma response (literal) | literal in global.css, not tokenized |
| Surface | `#ffffff` | `brand/color/white` | literal in global.css, not tokenized |

*Chevy-mode values verified directly from Figma MCP (Alert `3769:50197`, Chip `3769:50187`). Per-brand resolution for Buick/GMC/Cadillac was not exercised in this session; the mode-switched architecture implies per-brand variants exist but their hex values are not individually confirmed here.*

**Why it's a bug:** Figma has canonical success/warning values and they DO correspond to existing CSS tokens (chip-scoped). The page invented a third set of values that match neither. No remediation requires a new tokenization — the values exist in both Figma and CSS, just not on this page.

Separate concern: Figma has no `color/info/*` leaf; "info" routes through primary. The page's `Info Surface` category is an invented semantic tier that doesn't exist in either source of truth.

**Pattern category:** P1 (undercoverage — page ignores existing tokens) + invented-value drift.

**Proposal:**
1. **Align to Figma + CSS:** change page hex to `#2d871b` / `#b3842d`. Rename "Info Surface" to "Primary Subtle" with value `#ecf1fc`, or remove it.
2. Route swatches through `<ColorHex varName="…">` pointing at the chip tokens so brand-switching is visible.
3. Decide with design whether to promote chip-scoped feedback tokens to a non-component `--semantic-*` scope (separate cleanup, larger).

---

## S11 — Page asserts "feedback scales are shared across all brands"; Figma and brands.css both disagree

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Surface:** `src/pages/ColorsPage.tsx:23-26` (page description) and lines 123-157 (Feedback & Semantic swatches rendered as hardcoded hex, unreactive to brand switcher).

**Pattern:** The page description says *"Neutral and feedback scales are shared across all brands."* Two separate sources of truth disagree:

**Figma:** all color variables — including `color/success/*`, `color/warning/*`, `color/error/*`, `brand/color/success`, `brand/color/warning`, `brand/color/error` — are mode-switched on a single collection. Per-brand variation of feedback tones is the **designed** model, not an oversight.

*Finding rests on Figma's variable-collection structure (one collection, four modes), not on per-brand resolved hex values. Chevy-mode values were verified; Buick/GMC/Cadillac resolved values inferred from the mode-switched architecture and corroborated by brands.css overrides. Per-brand hex not individually resolved in this MCP session.*

**brands.css (CSS):** ~75 feedback-tone assignments are overridden across Buick, GMC, Cadillac:

| Token | Chevy (tokens.css) | Buick / GMC / Cadillac (brands.css) |
|-|-|-|
| `--chip-plain-text-success` | `#2d871b` | `#0a7305` (all three) |
| `--chip-plain-text-error`   | `#d64022` | `#b50000` (all three) |
| `--chip-info-subtle-bg-success` | `#e1eddc` | `#ddead9` |

**Why it's a bug:** the page makes a factual claim that is contradicted by both Figma's architecture and the actual CSS. Compounds with S10 — since the page's feedback values are invented (matching no brand anywhere), the Feedback row is silently unreactive to the brand switcher regardless of the copy.

**Pattern category:** P5 (brand notes / claim skeletal or wrong).

**Proposal:** update copy to *"Neutral and feedback scales vary per brand; the swatches below show Chevrolet values"*, or make both rows brand-reactive via `<ColorHex>` pointing at real tokens (see S10).

---

## S12 — 4 of 6 brand-palette tokens are filesystem-dead in the repo

**Tags:** [CSS-INTERNAL]

**Surface:** `styles/brands.css` — 4 tokens defined in all four brand blocks but consumed by zero rules in `styles/global.css` or any `.tsx` in `src/` outside `ColorsPage.tsx` (which only displays them).

| Token | Defined in brands.css | Consumed anywhere else in repo? |
|-|-|-|
| `--brand-color` | all 4 brands | ✓ global.css × 6, other files |
| `--brand-color-hover` | all 4 brands | ✓ link.tsx / link.md / HomePage.tsx |
| `--brand-color-secondary` | all 4 brands | **No.** |
| `--brand-grey-900` | all 4 brands | **No.** |
| `--brand-grey-800` | all 4 brands | **No.** |
| `--brand-button-disabled` | all 4 brands | **No.** |

*Filesystem-dead only; Figma-side consumption cannot be verified from this repo.* Figma does define the underlying variables (`brand/color/brand-secondary`, `brand/color/grey-800`, `brand/color/grey-900`, `brand/color/button-disabled`) as part of the mode-switched collection, so the definitions are aligned with Figma — only the repo-side consumption is missing.

**Why it matters:** two-thirds of the brand palette has no runtime effect on any component in this repo. Either the tokens should be adopted across components (e.g., disabled-state backgrounds, secondary accent regions) or deleted from brands.css.

**Pattern category:** P3 (dead tokens).

**Proposal:** design review to decide adopt-vs-delete per token. Mechanical part is small (deletion: 16 lines; adoption: requires component-by-component mapping).

---

## S13 — Neutral Scale on page is Chevy-only; Figma defines it as mode-switched per brand, and CSS implements only 2 of 9 rungs

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Surface:** `src/pages/ColorsPage.tsx:72-121` (Neutral Scale group, 8 non-white swatches: 50/100/200/300/500/700/800/900).

**Pattern:** three-way mismatch.

**Figma:** `brand/color/grey-{50,100,200,300,500,600,700,800,900}` — 9 rungs, 400 gap. Variables are mode-switched — each brand has its own values.

**CSS:** tokens.css has zero `--color-grey-*` / `--neutral-*` tokens. brands.css defines `--brand-grey-800` and `--brand-grey-900` per brand. Partial adoption: 2 of 9 Figma rungs implemented, each per-brand. All other rungs (`grey-50/100/200/300/500/600/700`) have no CSS representation.

**Page:** 8 swatches hardcoded as Chevy-mode hex values, rendered with `style={{background: '#...'}}` (unreactive to brand switcher). Specifically wrong per brand:

| Rung | Page hex | Chevy (brands.css) | Buick | GMC | Cadillac |
|-|-|-|-|-|-|
| 900 | `#1a1a1a` | `#1A1A1A` ✓ | `#222222` ✕ | `#060505` ✕ | `#282828` ✕ |
| 800 | `#333333` | Chevy `--brand-grey-800` = `#262626` ✕ | `#333333` ✓ | `#25282A` ✕ | `#505050` ✕ |
| 50/100/200/300/500/700 | hardcoded | Chevy-mode-only via literal, not a token | Unknown per brand — not in CSS | Unknown | Unknown |

*Note: the page's Neutral 800 `#333333` doesn't even match Chevy's `--brand-grey-800` (`#262626`) — it matches Buick's. So the Chevy-only labeling overstates accuracy: even for Chevy, the page is wrong at rung 800.*

Also: page is missing rung 600 (Figma has it).

*Figma's grey-ramp structure (9 rungs, mode-switched per brand) verified directly via MCP. Per-brand hex values (Buick/GMC/Cadillac for rungs 50/100/200/300/500/600/700) were NOT individually resolved in this session — if implemented they would need Figma mode-switching through the MCP, which the agent didn't exercise. The per-brand grey-800 and grey-900 values in the table above come from `brands.css` (confirmed on disk), not Figma. S13's core claim (page is wrong at rung 800 even for Chevy) holds regardless.*

**Why it's a bug:**
1. Page-level: claims the neutral scale is a shared system; it isn't (per Figma's mode-switched model). Values shown don't correctly match any single brand.
2. Repo-level: CSS has implemented only 2 of 9 neutral rungs, so there's no path for a component to reach `var(--brand-grey-300)`.

**Pattern category:** P1 (token undercoverage) + P5 (brand-invariance claim wrong).

**Proposal:**
1. **Align CSS to Figma:** add `--brand-grey-{50,100,200,300,500,600,700}` to each brand block in brands.css (7 rungs × 4 brands = 28 lines). Confirm hex values with Figma per brand first (this repo only has Chevy resolved; other brands need MCP mode-switch or Figma UI lookup).
2. **Align page to reality:** render Neutral Scale with `<ColorHex varName="--brand-grey-XXX">` so brand-switching is visible. Remove the "shared across brands" claim.
3. Alternative: demote Neutral Scale section if design decides the grey ramp shouldn't be per-brand. Requires Figma change.

---

## S14 — Brand palette not defined in tokens.css (CLAUDE.md architectural drift)

**Tags:** [CSS-INTERNAL]

**Surface:** `styles/tokens.css` contains zero `--brand-color*`, `--brand-grey-*`, `--brand-button-disabled` definitions. `styles/brands.css:14-19` has them under `[data-brand="chevrolet"]`. CLAUDE.md asserts *"Chevy base values live in `styles/tokens.css`."*

**Figma context:** Figma uses a mode-switched single collection — semantically equivalent to the CSS's per-brand-selector approach. The architectural pattern on disk (per-brand `[data-brand]` blocks) maps cleanly to Figma's modes; this isn't a Figma divergence. The drift is purely between CLAUDE.md's description and the actual file layout.

*Figma collection structure verified via MCP. Per-brand variable values for the palette were not individually resolved in this session; the architecture-equivalence claim rests on the collection shape, not on value-by-value verification.*

**Why it matters:**
1. FOUC window on first visit (no `localStorage.drp-brand` yet) — index.html's guard skips setting `[data-brand]`, React's `BrandProvider` hasn't yet run its effect, and palette tokens resolve to fallbacks rather than a :root default. Low runtime impact, but architecturally asymmetric vs. other tokens.
2. Doc-consistency: contributors following CLAUDE.md will put Chevy base tokens in tokens.css and be surprised that the palette isn't there.

**Pattern category:** architecture drift vs spec — not a clean P1–P7 category.

**Severity:** low runtime impact; medium doc-consistency impact.

**Proposal:** either (a) add a `:root` block to tokens.css duplicating the Chevy values (6 tokens, 6 lines — tolerates the double-source since `[data-brand="chevrolet"]` always wins); or (b) update CLAUDE.md to carve out brand palette as the documented exception.

---

## S15 — Token name flattening drift: CSS names drop Figma-path hierarchy levels inconsistently

**Tags:** [CSS-vs-FIGMA]

**Surface:** `styles/brands.css` brand palette tokens; CLAUDE.md naming convention claim.

**Pattern:** CLAUDE.md asserts: *"Tokens mirror Figma's variable collection. Figma's slash-separated paths … are flattened to dashes in CSS"* with the example `button/contained/container-bg-large/height` → `--button-contained-container-bg-large-height`. The brand palette doesn't follow this rule.

| Figma path | Flattened-as-specified | Actual CSS name | Drift |
|-|-|-|-|
| `brand/color/brand` | `--brand-color-brand` | `--brand-color` | leaf "brand" dropped |
| `brand/color/brand-secondary` | `--brand-color-brand-secondary` | `--brand-color-secondary` | leaf "brand" dropped |
| `brand/color/button-hover` | `--brand-color-button-hover` | `--brand-color-hover` | segment "button" dropped |
| `brand/color/button-disabled` | `--brand-color-button-disabled` | `--brand-button-disabled` | segment "color" dropped |
| `brand/color/grey-900` | `--brand-color-grey-900` | `--brand-grey-900` | segment "color" dropped |
| `brand/color/grey-800` | `--brand-color-grey-800` | `--brand-grey-800` | segment "color" dropped |

**Why it's a bug:** the naming convention stated in CLAUDE.md doesn't hold for the 6 brand-palette tokens. A lint rule that enforces "dash-flatten Figma paths to CSS token names" would produce six false-positive complaints. A future contributor adding a new `brand/color/*` variable would face an inconsistent template.

**Pattern category:** P7 (convention violation — documented mechanical rule not followed) — extension of the font-family colon-vs-space P7 we've been tracking.

**Severity:** low runtime impact (naming is just naming); medium convention-integrity impact.

**Proposal:** two paths.
1. **Align CSS names to Figma paths strictly:** rename all 6 brand-palette tokens to their fully-flattened Figma form. Breaking change — affects all consumers; mechanical find/replace. Recommended if CLAUDE.md's convention is authoritative.
2. **Update CLAUDE.md to document the exception:** note that brand-palette tokens drop the `color/` namespace when it would be redundant (`--brand-*` reads cleaner than `--brand-color-*-*`). State the rule explicitly so new additions follow it.

**Blocks:** the "lint rule" mechanism proposed in `drift-prevention-memo.md` Part 3B. Until the brand-palette naming is reconciled, a Figma-path-to-CSS-name lint rule produces false positives just as S8 would.

---

### Typography (`src/pages/TypographyPage.tsx`)

Figma verification performed 2026-04-25. Foundation-level query on `0:1` returned no typography variables (empty); Figma scopes typography under `component-typography/<component>-typography-<size>/<prop>` visible only through node-level queries. Queried Button `4740:60659`, Alert/Notification `3769:50197`, Tabs `2054:9877`, Stepper `2348:14663`. Browser-verification of the `isCompact` body-scale branch run across all 4 brands via dev server.

Key Figma facts (Chevrolet-mode resolved values unless noted):
- Typography variable namespace is `component-typography/<component>-typography-<variant>/{font-family, font-weight, font-size, line-height, letter-spacing?}`. Four components queried show identical structure.
- Font-family values are **space-separated plain names**: `"Chevy Sans"` — not underscore-joined, not colon-styled.
- Font-weight values are **named styles**: `"Demi"`, `"Bold"`, `"Medium"` — separate variable from font-family. Figma never concatenates the two.
- No foundation-level `headline-*` / `body-*` / `base-typography` variables surface via MCP on any component or root node. The page's claim of mirroring a Figma `base-typography` collection cannot be verified through component-scoped MCP queries; the collection may exist as Figma text styles (separate surface MCP doesn't expose) or may not exist structurally.

CSS-side facts:
- `tokens.css` has zero foundation typography tokens (`--headline-*` / `--body-*` / `--type-scale-*` don't exist).
- `global.css:1833-1834` defines only `--type-heading-family` and `--type-heading-weight` as foundation tokens.
- `brands.css` overrides both `--type-heading-family` and `--type-heading-weight` per brand.
- Components have per-component typography tokens in `tokens.css` that align structurally with Figma's `component-typography/...` namespace.

Preview verification (2026-04-25):
- `isCompact = brand === 'chevrolet' || brand === 'cadillac'` claim renders correctly across all 4 brands: Chevy/Cadillac body-1 = 16/24; Buick/GMC body-1 = 18/25. Rendered font-families match per-brand `--type-heading-family` overrides.

---

## S16 — TypographyPage hardcodes its 33-row type scale in JS; disconnected from both CSS tokens and Figma

**Tags:** [CSS-vs-FIGMA] (conditional) + [CSS-INTERNAL]

**Surface:** `src/pages/TypographyPage.tsx:45-123` renders 6 headlines + 27 body variants = **33 rows** with every `size`, `lh`, `ls`, and (for body) `weight` as a JS literal.

**Pattern:** the page claims in copy (line 57-61) *"Type scale powering all DRP UI components — mirrors the Figma `base-typography` variable collection."* Verification:

| Surface | Token-sourced? |
|-|-|
| Headline font-family, font-weight | ✓ `var(--type-heading-family)`, `var(--type-heading-weight)` |
| Headline sizes, line-heights, letter-spacings | ✗ JS literals (`size={64} lh={68} ls={-1}` etc.) |
| Body font-family | ✗ inherits from parent; not a typography-scoped token |
| Body sizes, line-heights | ✗ JS literals via `bodyScale` object |
| Body weights | ✗ JS literal per row (`weight={400}` etc.) |

**Figma comparison:** Figma exposes per-component typography via `component-typography/<component>-typography-<size>/*`. No foundation-level `headline-*` or `body-*` variables surface via MCP (queried root `0:1` + 4 components). The page's "base-typography collection" claim can't be confirmed at the variable-definition layer — if it exists, it's not bound to any component node reachable via `get_variable_defs`.

*Chevy-mode values verified via MCP. Per-brand typography variable resolution not exercised. The "base-typography collection doesn't exist as a variable set" claim is conditional on MCP coverage; the collection may still exist as Figma text styles (a separate surface).*

**Why it's a bug:**
1. **Source-of-truth inversion** (same shape as S8 Configurator Sub-Header): the page is the source of truth for its displayed scale, not the CSS or Figma. Any future rebrand touching these values would bypass the tokens entirely.
2. **Silent drift risk.** Nothing ties the 33 hardcoded values to any other consumer. If a component bumps its `--button-contained-typography-large-font-size` to 17px, the page still displays "Body 1 — 16".
3. **Documentation mismatch.** The page claims to mirror a Figma collection it can't reach.

**Pattern category:** P1 (undercoverage — page ignores existing component tokens and any foundation ones) + P5 (claim mismatch).

**Proposal:** two paths, pick per design:
1. **If Figma has a `base-typography` variable collection:** add corresponding CSS tokens (`--headline-1-font-size`, `--body-1-font-size`, etc.), render the page via `<div style={{ fontSize: 'var(--headline-1-font-size)', ... }}>`. Requires Figma access beyond MCP-visible variables.
2. **If no base-typography collection exists:** update page copy to drop the claim; either (a) derive the scale from existing component tokens (`--button-contained-typography-large-*` for body-1 equivalent), or (b) explicitly mark the page as "documentation-only sample scale" with no structural source of truth.

---

## S17 — `--type-heading-*` tokens live in `global.css`, not `tokens.css` (architectural drift mirrors S14)

**Tags:** [CSS-INTERNAL]

**Surface:** `styles/global.css:1833-1834`:
```css
--type-heading-family: 'Chevy_Sans', sans-serif;
--type-heading-weight: 600;
```
and `styles/brands.css:771, 859, 965` for Buick, GMC, Cadillac overrides.

**Pattern:** CLAUDE.md asserts Chevy base tokens live in `tokens.css`. Typography heading tokens live in `global.css` instead — parallel to S14 (brand palette in `brands.css` only, not `tokens.css`).

**Why it matters:** same as S14 — contributors following the CLAUDE.md convention will look for `--type-heading-*` in `tokens.css` and not find it. The `:root` block in `global.css` is effectively acting as tokens.css-for-typography, creating a second home for base-layer definitions.

**Pattern category:** architecture drift vs spec (same class as S14).

**Severity:** low runtime impact; medium doc-consistency impact.

**Proposal:** move `--type-heading-family` and `--type-heading-weight` from `global.css:1833-1834` to `tokens.css` under a `/* Foundation: Typography */` section. Brands.css per-brand overrides are already in the correct place. Or alternatively: update CLAUDE.md to carve out both brand palette AND heading tokens as the documented exceptions (consolidating with S14's proposal).

---

## S18 — Font-family colon-notation is redundant, not broken: fonts render correctly but each variant is registered twice

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Correction note (2026-04-25):** an earlier draft of this finding claimed the colon-notation was "silently broken" and falling back to `sans-serif`. Browser verification contradicted that. The colon form IS a registered, loaded `@font-face`. See verification below. Framing revised; severity downgraded from Bug to Inconsistency.

### Plain-English status

- **The font renders correctly.** Both `'Chevy_Sans:Demi'` and `'Chevy_Sans'` resolve to the same font file and display the same glyphs.
- **No console warnings.** No missing-font errors, no fallback complaints in the browser console.
- **This is not actively broken. It is not dead code.** It's **redundant**: the codebase registers each font variant under two family names — the plain form (`Chevy_Sans` + weight `600`) AND a colon-suffixed form (`Chevy_Sans:Demi`). Both load; both render identically.

### Browser verification (Chevy, `/components/button`, 2026-04-25)

Ran on primary filled large button with computed `font-family: "Chevy_Sans:Demi", sans-serif; font-weight: 600`:

1. **Registered `@font-face` entries** (via `document.fonts`): both forms are registered and loaded.
   - `Chevy_Sans:Demi` @ weight 600 — status: **loaded**
   - `Chevy_Sans` @ weight 600 — status: **loaded**
   - (Same dual pattern exists for all four brands' families — Buick_Text/:Medium, StratumGMC/:Black, Cadillac_Gothic_Wide/:Bold, etc.)
2. **Browser confirms the colon form is available**: `document.fonts.check('600 16px "Chevy_Sans:Demi"')` returns `true`. (Would return `false` if it fell back to sans-serif.)
3. **Rendered-glyph width comparison** (canvas measureText, identical 36-character string, 600/16px):

   | Font string | Rendered width |
   |-|-|
   | `'Chevy_Sans:Demi', sans-serif` (button's actual value) | 299.92px |
   | `'Chevy_Sans:Demi'` (colon, no fallback) | 299.92px |
   | `'Chevy_Sans', sans-serif` | 299.92px |
   | `'Chevy_Sans'` (plain, no fallback) | 299.92px |
   | `sans-serif` (pure fallback baseline) | 300.55px |
   | `Arial` | 300.55px |

   All four Chevy_Sans permutations measure to exactly the same width; the fallback baseline is different. This confirms the Chevy_Sans font file is what's actually rendering, not sans-serif.
4. **Console warnings:** none font-related. Only React Router future-flag warnings (unrelated).

### The real remaining concerns

Having established the colon form works, three things still deserve attention — none of them "broken":

1. **Figma source-of-truth divergence** (the original [CSS-vs-FIGMA] flag). Figma stores family and weight as two variables: `component-typography/.../font-family: "Chevy Sans"` and `.../font-weight: "Demi"`. CSS conflates the weight into the family name (`:Demi`) AND duplicates it in a separate `--*-font-weight: 600` token. Any automated Figma→CSS sync has to understand this mapping.
2. **Double-registration maintenance cost.** Each font file is registered with two `@font-face` declarations (plain + colon). If a brand swaps a font file (rebrand, license change), both registrations must be updated together.
3. **Readability and onboarding.** The colon convention is non-standard — a contributor unfamiliar with it will reasonably guess it's broken (the author of this finding did exactly that). The convention exists because font designers often package weight variants under suffixed family names; once explained, it's coherent. But nothing in the codebase explains it.

### Severity

**Low.** No runtime bug. No visual regression. No broken contributor workflow today. The cost is:
- Slightly more complex font-loading setup than strictly required.
- A harder path for Figma→CSS automation if it ever becomes desirable.
- A gotcha for new contributors reading the tokens.

### Open question (for the team that owns font-face registrations — not answerable from inside this codebase)

**Why does the dual registration exist?** The audit can establish that both forms work and are registered; it can't establish the intent. Three possibilities, each with a different remediation:

- **(a) Redundant import from Figma.** The colon form was copied over from Figma's font-family variable values at some point, and the plain form was added later (or vice versa) without removing the first. No external consumer depends on the colon form. → Remediation: collapse to the plain form (path 2 in the Proposal below).
- **(b) Needed for an external tool or workflow.** Some Tekion-internal pipeline — Storybook theming, a codegen step, a font-loading script, a Figma-export tool — reads `Chevy_Sans:Demi` as a canonical name. Removing it would break that pipeline. → Remediation: keep both forms, document the contract (path 1 below).
- **(c) Historical accident.** Original author followed a pattern from another project; the pattern wasn't load-bearing then and isn't now, but both forms have accumulated. → Remediation: collapse to the plain form; same as (a) but without the "copied from Figma" framing.

This is a decision for whoever owns the font-face registrations and the Figma variable export. Claude shouldn't guess, and the audit shouldn't close out path 1 vs. path 2 without that input.

### Proposal

Two paths, design lead picks:

1. **Keep both forms; document the convention.** Add a 2–3 line comment at the top of the `@font-face` block in `styles/global.css` explaining that each weight is registered under both a plain name (`Chevy_Sans` + `font-weight`) and a suffixed name (`Chevy_Sans:Demi`), and that tokens can use either form. Cost: 3 lines of CSS comment. Benefit: new contributors aren't surprised.
2. **Collapse to the plain form.** Change all `--*-font-family: 'Chevy_Sans:Demi', sans-serif` to `--*-font-family: 'Chevy_Sans', sans-serif` and delete the `:Suffix` `@font-face` entries. Use only `font-weight` to select variant. Cost: ~10–20 token changes plus deleting ~15 `@font-face` declarations. Benefit: convention matches standard CSS practice and Figma's family/weight split; less to explain.

Pick path 1 if the answer to the open question is (b). Pick path 2 if the answer is (a) or (c).

*Chevy-mode values verified via MCP and browser. Per-brand Figma font-family resolutions not individually exercised, but the Buick / GMC / Cadillac `@font-face` entries show the same dual-registration pattern (plain + colon-suffix), suggesting the same finding applies to all four brands.*

---

## S19 — TypographyPage weight collisions: regular/medium and bold/extra-bold render identically

**Tags:** [CSS-INTERNAL]

**Surface:** `src/pages/TypographyPage.tsx`:

```tsx
<TypeRow name="body-1-regular"    ... weight={500} sample="..." />
<TypeRow name="body-1-medium"     ... weight={500} sample="..." />
<TypeRow name="body-1-bold"       ... weight={700} sample="..." />
<TypeRow name="body-1-extra-bold" ... weight={700} sample="..." />
```

(Same pattern repeats for body-2 and body-3.)

**Pattern:** the page presents six weight variants per body scale (light/regular/medium/bold/extra-bold/link/all-caps/button/list/navigation), but the numeric `weight` attribute collides:

| Row | Expected weight | Actual |
|-|-|-|
| body-1-light | 300 or 400 | `400` ✓ |
| body-1-regular | 400 or 500 | `500` ✓ (regular is often 500 at this scale) |
| body-1-medium | 500 | `500` — **collides with regular** |
| body-1-bold | 700 | `700` ✓ |
| body-1-extra-bold | 800 or 900 | `700` — **collides with bold** |

Rendered result: body-1-regular and body-1-medium are visually identical; body-1-bold and body-1-extra-bold are visually identical. The page presents a scale that appears to have 5 weight tiers but only 3 are distinguishable.

**Why it's a bug:** the page is supposed to showcase the full weight range of the brand typography. If the font file supports separate Regular (400), Medium (500), and SemiBold/Demi (600) files, the page renders them identically and the designer / contributor gets a false impression of scale coverage.

**Pattern category:** P4 (value drift from implied intent).

**Severity:** low runtime, medium docs-accuracy — the page is a designer-facing reference and currently presents misleading information.

**Proposal:** either (a) correct the weights (regular→400, medium→500, bold→700, extra-bold→800) and verify each brand's font file supports the full range; (b) if font files only support 400/500/700, collapse the display to the three actually-supported tiers and remove the dead rows; or (c) use `--type-heading-weight`-style per-brand overrides if the supported ramp varies per brand (GMC's `--type-heading-weight: 900` suggests some brands reach further into the high end than others).

---

## S20 — Figma's per-component typography variables have full CSS coverage but line-height / letter-spacing coverage is incomplete

**Tags:** [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Surface:** comparing Figma `component-typography/<component>-typography-<size>/*` variable definitions against `styles/tokens.css` component typography blocks.

**Pattern:** for each component, Figma defines 5 typography props (`font-family`, `font-weight`, `font-size`, `line-height`, and sometimes `letter-spacing`). CSS coverage is uneven:

| Component | Figma props | CSS coverage | Gap |
|-|-|-|-|
| Button contained (large/med/small) | font-family, font-weight, font-size, line-height | all 4 ✓ | none |
| Button link (large/med/small) | same | all 4 ✓ | none |
| Tab contained | font-family, font-weight, font-size (line-height not queried) | font-family, font-weight, font-size — no line-height token visible | line-height unverified |
| Tab underlined | font-family, font-weight, font-size, line-height | all 4 ✓ | none |
| Badge (Notification Avatar badge) | font-family, font-weight, font-size, line-height, **letter-spacing** | font-family, font-weight, font-size — line-height wired via S6 fix; letter-spacing NOT tokenized | letter-spacing missing |

**Figma evidence (badge letter-spacing):** `component-typography/badge-typography-small/letter-spacing: 0`. Verified via node `2348:14663`.

*Chevy-mode values verified via MCP. Per-brand resolution not exercised; Figma's single-collection mode-switching implies per-brand letter-spacing variations are possible but not individually verified.*

**Why it matters:** the Figma `letter-spacing` variable is a designed knob. Today CSS doesn't expose it, so if a brand wants to adjust badge letter-spacing (e.g., the GMC 0.08em all-caps pattern used for buttons) there's no hook. Same latent risk as S6 (the `line-height` badge token that was defined but unconsumed until Batch 5) — but in the reverse direction: Figma has it, CSS doesn't.

**Pattern category:** P1 (token undercoverage — Figma has it, CSS missing).

**Severity:** low (today no brand needs the knob); medium (future brand additions may need it).

**Proposal:** one-time sweep — for each component tokenized in `tokens.css`, cross-check against its Figma `component-typography/...` variable set and add any missing props as `--<component>-typography-<size>-letter-spacing` / `-line-height`. Low mechanical effort per component; value-by-value Figma lookup per brand is the time cost.

---

### Spacing (`src/pages/SpacingPage.tsx`)

Figma verification performed 2026-04-25. Foundation-level query on `0:1` returned no spacing variables (empty); unlike typography there is also no `component-spacing/*` namespace. Queried Button `4740:60708` for `gap` / padding / margin variables — none found; spacing in Figma is raw per-component pixel values, not tokenized. Browser-verification run across all 4 brands via dev server.

Key Figma facts:
- **No foundation `spacing/` collection exists** as a Figma variable set visible via MCP. Neither `0:1` nor any component node returns spacing-family variables.
- **No per-component spacing tokens either** — Button/Alert/etc. only expose `container/*`, `color/*`, `typography/*`, `border/*`, `border-radius/*`. Gap/padding values are stored as raw px on individual layers in the design, not as named variables.
- The CSS's `--spacing-*` semantic abstraction (`-xs` / `-s` / `-m` / `-l` / `-xl` inside `container-*` / `selectable-*` surface groups) is a **CSS-side invention**, not a mirror of a Figma collection.

CSS-side facts:
- `tokens.css:755-806` defines 42 `--spacing-*` tokens across 6 groups (`container-padding`, `container-gap`, `container-stack`, `selectable-padding`, `selectable-gap`, `selectable-stack`).
- `brands.css` has **zero** `--spacing-*` overrides — the page's "brand-invariant" claim is structurally true.
- `global.css` has **zero** `var(--spacing-*)` consumption sites. No component CSS reads from any spacing token.
- `src/pages/home.css` is the only consumer: 9 sites across 7 unique tokens (`container-gap-m`, `container-padding-m`, `selectable-gap-m`, `container-stack-xl`, `selectable-stack-m`, `selectable-padding-m`, `selectable-padding-s`).

Preview verification (2026-04-25):
- Brand-invariance confirmed: `getComputedStyle` on `:root` for 5 sampled tokens returns identical values across all 4 brands.
- Semantic-label collision observed firsthand: `--spacing-container-padding-xs = 8px`, `--spacing-selectable-padding-xs = 4px`, `--spacing-selectable-gap-xs = 2px` — same `-xs` label, 4× value range depending on surface+axis.

---

### Capstone — the spacing system was designed, documented, and not adopted

S21–S25 are worth reading as a set, not five independent findings. Taken together they describe one situation:

- **Designed** — 42 tokens carefully organized across 6 surface×axis groups, with semantic T-shirt sizing on each (S21 / S22 describe the taxonomy).
- **Documented** — SpacingPage introduces them as the foundation the system is built on, with brand-invariance explicitly advertised (S24 on the docs framing).
- **Not adopted** — 35 of 42 tokens are filesystem-dead; `global.css` consumes zero of them; every component uses raw px instead; the docs page itself renders swatches from JS literals rather than the tokens it displays (S23 / S25).

This is not a bundle of engineering bugs to fix. It's a directional choice that was never explicitly made. Three honest paths forward:

**Option A — Adopt the system.** Refactor `global.css` to consume `var(--spacing-*)` wherever component padding/gap/stack values fall on the existing scale (most do — 4/8/16/24 cover the majority of component values). Fix the naming collisions in S21/S22 en route so adopted call sites use a learnable vocabulary. Make the docs page read from CSS. Weeks of work; makes the advertised foundation real; gives future brands a place to override spacing.

**Option B — Abandon the semantic layer.** Collapse the 42 tokens to the 7 actually used on the Home page, delete the rest, simplify SpacingPage to document what exists rather than what was hoped for. Fast (hours, not weeks); explicitly admits the semantic abstraction didn't land and clears the debt. Future brand spacing overrides would need to be re-designed from scratch if they become a real need.

**Option C — Accept the divergence.** Keep tokens as intent, rewrite the page copy to be honest: "These tokens express the spacing system's design vocabulary. Components currently use raw px; token adoption is in-progress / aspirational." No code change; moves docs from "misleading" to "candid." Preserves the 42-token vocabulary in case Option A is attempted later.

The audit's job here is to put A/B/C on the table, not to pick one. A designer and an engineer should look at the three and agree on a direction together; the individual findings S21–S25 become trivial to scope once the direction is chosen.

---

## S21 — Spacing suffix taxonomy (T-shirt within group) is contextually relative and inherited from Figma; fixing it requires a design + engineering decision

**Tags:** [CSS-vs-FIGMA] (inherited taxonomy) + [CSS-INTERNAL] (CSS is the surface where the cost shows up)

**Surface:** `styles/tokens.css:755-806`, all `--spacing-*-xs` / `-s` / `-m` / `-l` / `-xl` tokens.

**Pattern:** the spacing system uses T-shirt-sized suffixes (`xs` / `s` / `m` / `l` / `xl`) within each `<surface>-<axis>` group, but the underlying pixel values are set independently per group. So `-xs` doesn't mean "extra-small" in the library — it means "extra-small **within this surface+axis**."

Examples (Chevy base, identical across brands):

| Token | Value | Group |
|-|-|-|
| `--spacing-container-padding-xs` | 8px | container / padding |
| `--spacing-container-gap-xs` | 4px | container / gap |
| `--spacing-selectable-padding-xs` | 4px | selectable / padding |
| `--spacing-selectable-gap-xs` | 2px | selectable / gap |
| `--spacing-selectable-stack-xs` | 4px | selectable / stack |

Same `-xs` suffix → 2px, 4px, or 8px depending on which group you're in. The T-shirt sizing isn't a scale; it's a within-group ordinal.

**Origin — not a CSS invention:** this group-relative T-shirt taxonomy is inherited from Figma's own spacing model (per design-team context). The CSS faithfully reproduces the structure that exists on the design side. *Caveat: MCP queries at root and component nodes did not surface a `spacing/*` variable collection (see S24), so the audit cannot verify the taxonomy at the variables layer — it may live in Figma text-style-like surfaces, a local-styles panel, or auxiliary design docs that MCP doesn't expose.* Regardless of where it lives in Figma, the CSS isn't drifting from intent; it's faithfully mirroring it.

**Impact:** consumers have to remember which group a token belongs to before the label `-xs` conveys anything. A designer copying a spacing value between surfaces can't substitute `container-padding-xs` for `selectable-padding-xs` by label alone — different pixel values. This cost exists in Figma too, not just in CSS.

**Severity:** medium — doesn't break anything, but the naming actively mis-signals that labels are comparable across groups.

**Proposal:** this is not a unilateral CSS rename. Because the taxonomy is inherited, any CSS-only rename breaks the Figma↔CSS symmetry that makes design/engineering hand-off tractable. Two real paths:

1. **Design-led rename in Figma first, CSS follows.** Design team revisits the T-shirt-within-group model in Figma (switch to numeric suffixes, or to a flat shared scale, or keep as-is with explicit docs). Once Figma is decided, CSS mirrors it mechanically.
2. **Document the semantics in both surfaces.** Keep the taxonomy; explicitly document in SpacingPage copy (and ideally in Figma variable descriptions) that the group prefix is load-bearing and labels are comparable only within the same group.

Picking a CSS-side rename without Figma alignment regresses the Figma↔CSS mirror this audit has spent the rest of its pages trying to verify.

---

## S22 — Spacing groups mix three naming conventions: T-shirt sizes, pixel literals, and one outlier — also inherited from Figma

**Tags:** [CSS-vs-FIGMA] (inherited) + [CSS-INTERNAL] (surface)

**Surface:** `styles/tokens.css:755-806`, inside every group (container-padding is the clearest example).

**Pattern:** within a single group, token names blend semantic suffixes (`-xs` / `-s` / `-m` / `-l` / `-xl`) with pixel-literal suffixes (`-1px` / `-2px` / `-4px` / `-32px` / `-56px`) — plus one outlier with no unit (`-12`):

```
--spacing-container-padding-none
--spacing-container-padding-1px
--spacing-container-padding-2px
--spacing-container-padding-4px
--spacing-container-padding-xs    /* 8px */
--spacing-container-padding-s     /* 16px */
--spacing-container-padding-m     /* 24px */
--spacing-container-padding-32px
--spacing-container-padding-l     /* 40px */
--spacing-container-padding-xl    /* 48px */
--spacing-container-padding-56px
--spacing-selectable-padding-12   /* no `px` suffix — outlier */
```

**Origin — same inheritance as S21:** per design-team context, this mixed-convention naming is inherited from Figma's spacing taxonomy, not invented in CSS. The semantic-vs-pixel split exists on the design side; the CSS reproduces it. (The no-unit `-12` outlier is the one plausibly CSS-side typo — worth verifying against the Figma name if/when the taxonomy is reviewed.)

**Impact:** there's no single rule a consumer can learn. "Is the 12-pixel value `padding-12` or `padding-12px` or `padding-s`?" requires looking it up every time. The `-12` outlier (missing `px`) is inconsistent even with its neighbors.

**Severity:** low individually; medium combined with S21 — together the two patterns make the spacing vocabulary non-learnable.

**Proposal:** same shape as S21. A unilateral CSS rename to a single convention would restore internal consistency but desynchronize CSS from the Figma taxonomy. Real paths:

1. **Figma-led cleanup, CSS mirrors.** Design reviews the mixed-convention suffixes in Figma — picks one convention, reconciles the `-12` outlier against whatever Figma names it. CSS follows as a mechanical rename once the design side is decided.
2. **Accept and document.** Keep the mixed naming; add a short convention note to SpacingPage so the drift is acknowledged rather than silent. Preserves the Figma↔CSS mirror; costs learnability.

The `-12` outlier is the one sub-finding that can be fixed unilaterally in CSS (verify Figma name; align to `-12px` or whatever Figma has) without touching the broader taxonomy conversation.

---

## S23 — 35 of 42 spacing tokens are filesystem-dead; zero consumption in `global.css`

**Tags:** [CSS-INTERNAL]

**Surface:** `styles/tokens.css:755-806` defines 42 tokens. Grep for `var(--spacing-` across `styles/` and `src/`:

| File | Unique tokens consumed | Usage sites |
|-|-|-|
| `styles/global.css` | 0 | 0 |
| `src/pages/home.css` | 7 | 9 |
| everything else | 0 | 0 |

The 7 live tokens: `container-gap-m`, `container-padding-m`, `selectable-gap-m`, `container-stack-xl`, `selectable-stack-m`, `selectable-padding-m`, `selectable-padding-s`. All 9 usage sites are on the Home catalog grid — **no component CSS uses spacing tokens at all**. The remaining 35 tokens (83% of the system) are defined but never read.

**Impact:** the page represents the spacing system as "the foundation every component builds on." In reality, every component uses raw px in `global.css`; the foundation is unused scaffolding. Adding a new brand that wants to override spacing (a legitimate future need) would hit nothing.

**Severity:** medium — the divergence between the advertised system and the actual consumption pattern is significant, and it compounds with S21/S22 (the tokens aren't just unused, they're also mis-named if anyone tries to adopt them).

**Proposal:** decide adoption direction. Either (a) land a sweep through `global.css` that replaces raw px with `var(--spacing-*)` where the values align (most component padding/gap values are on the 4/8/16/24 grid the spacing tokens already express), or (b) prune the 35 dead tokens and keep only the 7 the Home page needs. Option (a) is the larger lift but matches what the docs page claims today.

---

## S24 — SpacingPage claims it mirrors a Figma collection that doesn't exist as a variable set

**Tags:** [CSS-vs-FIGMA]

**Surface:** `src/pages/SpacingPage.tsx` (the page copy; specific line varies — the "mirrors Figma" framing is in the intro).

**Pattern:** like TypographyPage (S16), SpacingPage positions the CSS tokens as a mirror of a Figma foundation collection. Figma MCP verification:
- Root node `0:1` — no spacing variables returned.
- Button node `4740:60708` — no `container/*`, `gap/*`, `padding/*`, `margin/*` variables returned. The variables that *are* present (`color/*`, `typography/*`, `border/*`, etc.) do not carry spacing siblings.
- No component queried so far exposes a `spacing/*` namespace at any level.

Spacing in the Figma file appears to live as raw pixel values on individual auto-layout frames, not as named variables in any collection visible to MCP. The CSS's semantic grouping (`container-*` / `selectable-*` × `padding` / `gap` / `stack` × T-shirt size) is a **CSS-side invention**, not imported from Figma.

*Caveat: MCP coverage for spacing may be incomplete the same way Figma text styles are a separate surface. A human walking the Figma variables panel is the authoritative check. But the component-node queries that successfully return typography/color/border variables return zero spacing variables — suggesting spacing is structurally absent from the variables collection, not just MCP-invisible.*

**Impact:** the docs promise a Figma↔CSS round-trip that doesn't appear to exist. Runtime impact is zero (nothing resolves from "non-existent" Figma vars at runtime); docs-accuracy impact is the whole point.

**Severity:** low runtime; medium docs accuracy.

**Proposal:** rewrite SpacingPage's intro to describe the system as "a CSS-level abstraction layered over the raw pixel values used in Figma auto-layout," removing the mirror framing. Or, if design intent is to promote spacing into the variables collection, file that with the design team first and reopen the page claim once it lands.

---

## S25 — SpacingPage preview renders from JS literals, not from `var(--spacing-*)`

**Tags:** [CSS-INTERNAL]

**Surface:** `src/pages/SpacingPage.tsx` — the spacing-preview swatch uses `style={{ '--size': \`${value}px\` }}` where `value` is a JS number literal from the `CONTAINER_PADDING` / `CONTAINER_GAP` / etc. arrays, not a read from `getComputedStyle(':root').getPropertyValue('--spacing-*')`.

**Pattern:** the arrays at the top of `SpacingPage.tsx` duplicate the values that already live in `tokens.css:755-806`. Each token is written twice — once as a CSS custom property (the source of truth per the page's own framing) and once as a hardcoded JS number that actually drives the visual preview. If the CSS value changes and the JS literal doesn't, the preview silently lies.

**Consistency with other foundation pages:** same pattern as TypographyPage (S16). Both pages display "tokens" that are actually JS duplicates of what the CSS happens to also define.

**Impact:** today the JS and CSS values match (verified via preview). The risk is a future edit to `tokens.css` that doesn't propagate, at which point the Spacing docs become wrong without any runtime signal.

**Severity:** low today (values aligned); medium once S23 resolves and the spacing tokens start being consumed in `global.css` — at that point drift between the page's JS literals and the CSS would be a real docs bug.

**Proposal:** on page mount, read actual values from the CSS custom properties (`getComputedStyle(document.documentElement).getPropertyValue('--spacing-container-padding-xs')`) and render from those. Keep the array as a list of token *names*, not values. Same fix pattern applies to TypographyPage.

---

## S26 — Atomic Tabs CSS does not faithfully implement Figma per-brand variant values; production rendering wrong on 3 of 4 brands for VSR Filter consumer

**Tags:** [CSS-vs-FIGMA]

**Surface:** [`styles/global.css:1311-1488`](styles/global.css) (atomic Tabs Contained + Underlined Inside + Underlined Inset CSS) and [`styles/brands.css`](styles/brands.css) per-brand `--tabs-*` and `--tab-*-typography-*` overrides at lines 86-90 (Buick `--tabs-*`), 149-154 (Buick `--tab-contained-typography-*` + `--tab-underlined-*`), 351-354 (GMC `--tabs-*`), 437-443 (GMC `--tab-contained-typography-*` + `--tab-underlined-*`), 625-630 (Cadillac `--tabs-*`), 699-706 (Cadillac `--tab-contained-typography-*` + `--tab-underlined-*`).

**Pattern:** for each non-Chevy brand (Buick, GMC, Cadillac), Figma defines per-brand variable resolutions for tab typography, default text color, line-height, and several state surfaces. Atomic CSS selectively implements *some* of these per-brand overrides and selectively *adds* styling Figma does not specify. Consumers of atomic Tabs CSS render wrong on 3 of 4 brands today.

**Figma evidence:** per-brand `get_variable_defs` runs against atomic Tabs Contained Large + Underlined Inside Large in Core Variables file (`RsCbyz0LF6FaItYny1FqUU`). Verified 2026-04-27.

| Variant | Chevy | Buick | GMC | Cadillac |
|---|---|---|---|---|
| Underlined Inside Lg | `20432:4294` | `20432:5678` | `20432:6369` | `20432:4987` |
| Contained Lg (joined) | `20433:7836` | `20433:8430` | `20433:8727` | `20433:8133` |

Underlined Inset shares the `--tab-underlined-*` token family with Underlined Inside (Figma: same `component-typography/tab-underlined-*` resolutions; CSS: same brand-override blocks). Inset's per-tab values not separately verified; pattern propagation assumed.

### Pattern A — Missing brand overrides

Atomic CSS lacks per-brand values that Figma specifies. Each row is a token Figma defines per-brand but atomic CSS does not override; the brand falls back to the Chevy default and renders wrong.

| # | Brand | Variant | Property | Figma | Atomic fallback | Token to add |
|---|---|---|---|---|---|---|
| 1 | Buick | Contained | line-height | `22` | `24` | `--tab-contained-typography-large-line-height` |
| 2 | GMC | Contained | line-height | `22` | `24` | same |
| 3 | Buick | Contained + Underlined | default text color | `#222222` | `#666666` (Contained) / `#262626` (Underlined) | `--tabs-text-default` + `--tab-underlined-text-default` |
| 4 | GMC | Contained + Underlined | default text color | `#060505` | `#666666` / `#262626` | same |
| 5 | Cadillac | Contained + Underlined | default text color | `#282828` | `#666666` / `#262626` | same |
| 6 | Buick | Contained + Underlined | selected text color | `#222222` (gray, *not* orange) | `var(--brand-color)` → `#D44400` | `--tabs-text-selected` (Buick) and `--tab-underlined-text-selected-inside` |
| 7 | Cadillac | Contained | unselected bg | `#f2f2f2` | `#e8e8e8` | `--tabs-bg-unselected` (Cadillac override) |
| 8 | Buick + GMC | Underlined only | font-size + line-height | `18 / 25` | `16 / 24` | `--tab-underlined-font-lg-size` + `--tab-underlined-font-lg-line-height` |
| 9 | GMC | Underlined only | font-weight | `500` (Medium) | `600` (default) | `--tab-underlined-font-weight` |

Item 9 is in addition to the user-summarized 8 misses; surfaced during deeper inspection. Buick + Cadillac Underlined have explicit `--tab-underlined-font-weight: 500` brand overrides (matching their Figma "Medium" resolution). GMC's Figma `font-weight` variable also resolves to "Medium" (500), but atomic CSS has no GMC override — leaving GMC Underlined at the 600 default.

**Remediation:** ADD the listed brand-override entries in `brands.css`. No `global.css` rule changes needed — the rules already consume the tokens correctly; the tokens just need brand values.

### Pattern B — Spurious additions

Atomic CSS adds styling Figma does NOT specify.

| # | Brand | Variant | Property | Atomic CSS | Figma | Where |
|---|---|---|---|---|---|---|
| 1 | GMC | Contained | `text-transform: uppercase` | set | none | [`brands.css:439`](styles/brands.css) |
| 2 | GMC | Underlined | `text-transform: uppercase` | set | none | [`brands.css:442`](styles/brands.css) |
| 3 | Cadillac | Contained | `text-transform: uppercase` | set | none | [`brands.css:702`](styles/brands.css) |
| 4 | Cadillac | Underlined | `text-transform: uppercase` | set | none | [`brands.css:706`](styles/brands.css) |

Confirmed via Figma screenshots — all 4 brand variants render labels in title-case "Tab Label", not "TAB LABEL".

**Remediation:** REMOVE the 4 `text-transform: uppercase` declarations from GMC and Cadillac brand blocks for `--tab-contained-typography-text-transform` and `--tab-underlined-text-transform`.

### Design clarification needed

1. **Buick selected border (Contained).** Figma resolves `body/tabbar/contained/joined-tab-item-color-selected-border-default` to `#fe5000`; atomic CSS uses `var(--brand-color)` which resolves to `#D44400` per CLAUDE.md and `brands.css`. Two interpretations: (a) Buick has a tab-specific orange variable distinct from `--brand-color`, in which case atomic should consume the dedicated token; (b) Figma is internally inconsistent and should be reconciled to `#D44400`. Verify in Figma whether a separate Buick tab-orange variable exists.

2. **GMC outer selected border (Contained).** Figma `#25282a`; atomic `#060505`. About one shade off — likely a value-rounding decision. Note as minor; batch with item 1 for design review.

3. **Cadillac selected text/border in Underlined currently uses literal `#171473` directly** in `brands.css:704-706` rather than routing through `var(--brand-color)`. This is the exact S1 anti-pattern (Cadillac hardcoding) reproduced at the Tabs surface. Resolve as part of the S1 sweep, not S26 — they're the same finding at different surfaces.

### Production impact

| Variant | Production consumers | Visible drift today |
|---|---|---|
| Tabs Contained Large | VSR Filter ([`vsr-filter.tsx:231`](src/components/ui/vsr-filter.tsx) — Cash · Finance · Lease tabs) | **Yes.** Buick + GMC + Cadillac all render wrong (selected text color, line-height, default text, bg-unselected on Cadillac, spurious uppercase on GMC + Cadillac) |
| Tabs Underlined Inside Large | atomic doc page only ([`tabs.tsx:38`](src/components/ui/tabs.tsx)) | drift exists at CSS level but invisible to production users |
| Tabs Underlined Inset (md + lg) | atomic doc page only ([`tabs.tsx:65-74`](src/components/ui/tabs.tsx)) | drift exists, invisible to production |

Configurator Sub-Header is **not** a consumer — its tabs are engineered locally as `.drp-config-subheader__tab*`. The configurator's own tab spec also diverges from Figma (different deltas: closer on Buick + GMC sizes 18/25, closer on GMC + Cadillac no-uppercase; further on Buick + GMC selected text color, further on Cadillac font face Cadillac_Gothic vs Cadillac_Gothic_Narrow). Configurator tab adoption of atomic Tabs is **deferred pending S26 reconciliation** (documented in [`configurator-sub-header.md`](src/components/ui/configurator-sub-header.md)).

**Pattern category:** P1 (token undercoverage — Figma has it, CSS missing) + new pattern (CSS adds beyond Figma — first occurrence in this audit).

**Severity: medium-high.** Three of four brands render wrong for any production consumer of Tabs Contained today. Fix is mechanical — add 9 missing brand-override entries, remove 4 spurious `uppercase` declarations, address 3 design-clarification items separately. Should be a small dedicated PR (~30 minutes engineering once Pattern A + B remediation lands; design clarifications can follow in a second pass).

**Proposal:**
1. File a small PR scoped to `brands.css` only — add the 9 Pattern A overrides, remove the 4 Pattern B `uppercase` declarations.
2. Verify across all 4 brands × all 3 variants (Contained Lg, Underlined Inside Md+Lg, Underlined Inset Md+Lg) in browser preview.
3. Surface the 3 design-clarification items to design review (batch with the existing S1-S4 design session).
4. After Pattern A + B land, configurator sub-header tab adoption can revisit (separate ticket).

### Broader implication — atomic-vs-Figma reconciliation as a recurring finding class

S26 is the first atom in this audit where per-brand Figma values were verified at token-level granularity (font-family, weight, size, line-height, default text, selected text, selected border, bg, transform, radius — separately for each of 4 brands × multiple variants). The verification surfaced 13 deltas across one atom family (Tabs Contained + Underlined).

Atomic CSS for the other 18 atoms in `src/components/ui/` (Buttons, Inputs, Chips, Sliders, Accordions, Avatar, Breadcrumb, Checkbox, Icon Button, Inline Button, Link, Menu, Quick Filter, Radio, Search, Stepper, Switch, Toggle Button, Tooltip) **has not been per-brand Figma-verified at this granularity**. The pattern that produced S26's misses — atomic CSS implementing only the most-visible per-brand overrides while leaving secondary tokens at Chevy defaults; or carrying CSS conventions like `text-transform: uppercase` that Figma does not specify — is generic and likely recurs across the library.

**Recommendation:** schedule a future audit pass scoped to atomic-vs-Figma per-brand reconciliation across all 19 atoms. Methodology mirrors S26: `get_variable_defs` per brand × per variant; tabulate Pattern A (missing) + Pattern B (spurious) deltas; remediate via `brands.css`-only PR per atom. **Out of scope for current work; tracked here as a class.**

---

## S27 — Cross-domain-component atom candidates (color swatch, spec row)

**Tags:** [CSS-INTERNAL]

**Surface:** [`src/components/ui/vsr-filter.tsx`](src/components/ui/vsr-filter.tsx) + [`src/components/ui/vsr-card.tsx`](src/components/ui/vsr-card.tsx) (existing) + [`src/components/ui/vsr-quick-view.tsx`](src/components/ui/vsr-quick-view.tsx) (incoming, 2026-05-08).

**Pattern:** the same UI primitives — a color disc swatch and an icon-+-label-+-value spec row — are being implemented separately inside multiple domain components instead of being extracted into shared atoms. Today the duplication is limited; the trajectory is identical to atomic Tabs before S26 surfaced 13 deltas.

### Pattern instances

| Primitive | Component | Scoped class | Layout | Tokens |
|---|---|---|---|---|
| **Color disc swatch** | vsr-filter (existing) | `.drp-vsr-filter__color-grid` + `.drp-vsr-filter__swatch` + `__swatch-disc` | 7-col auto-grid; ring-on-select; supports two-tone splits via `linear-gradient(90deg, ...)` | `--vsr-filter-swatch-size`, `--vsr-filter-swatch-grid-cols`, `--vsr-filter-swatch-gap`, `--vsr-filter-swatch-ring-*` (5 tokens) |
| **Color disc swatch** | vsr-quick-view (incoming 2026-05-08) | `.drp-vsr-quick-view__color-callout` + `__color-swatch` | inline `disc · label · name` callout; no grid; no ring (it's a readout, not a picker) | molecule-scoped (3-4 tokens) |
| **Spec row** (icon + label + value) | vsr-quick-view (incoming 2026-05-08) | `.drp-vsr-quick-view__specs` + `__spec-item` + `__spec-icon` + `__spec-label` + `__spec-value` | 2×2 grid; 32px icon, label above value | molecule-scoped (~3 tokens) |

vsr-card does **not** today have a spec-row equivalent, but the same shape is plausible at any future VDP / config-summary surface that lists vehicle properties (range, MPG, towing, drivetrain). Future molecules that need it will face the same atom-vs-engineer-inline decision vsr-quick-view faces today.

### Why it's a finding

The cost of extracting a primitive grows monotonically with each molecule that engineers it inline:
- After 1 molecule: extraction is a copy-and-rename.
- After 2 molecules: extraction requires reconciling two scoped name spaces and verifying neither molecule's CSS regresses.
- After 3+ molecules: same as S26 (tabs) — the extracted atom must absorb 3+ slightly-different implementations whose deltas may have drifted unintentionally.

S26 documents the end-state: atomic Tabs CSS selectively implements per-brand values across 13 token rows, with Pattern A (missing overrides) + Pattern B (spurious additions) drift accumulated across multiple consumers over time. Color-swatch and spec-row are at the analogous starting point — extract before drift accumulates.

### Recommendation

Promote both primitives to atoms before a 3rd molecule consumes either pattern:

1. **Swatch atom** (`src/components/ui/swatch.tsx`).
   - Props: `fill: string | { left, right }` (single or two-tone split), `size?`, `selected?`, `bordered?` (for white/light fills against light bg), `ariaLabel`, `onClick?`.
   - CSS: `.drp-swatch` + `.drp-swatch--selected` + `.drp-swatch--bordered`.
   - Tokens: `--swatch-size`, `--swatch-ring-width`, `--swatch-ring-offset`, `--swatch-ring-color: var(--brand-color)`, `--swatch-border-color`.
   - Migration: vsr-filter consumes `Swatch` inside its existing `__color-grid` (grid layout stays scoped); vsr-quick-view consumes `Swatch` inside its `__color-callout` (callout layout stays scoped).

2. **SpecItem atom** (`src/components/ui/spec-item.tsx`).
   - Props: `icon: string` (drp-icon name), `label: string`, `value: ReactNode`.
   - CSS: `.drp-spec-item` + `__icon` + `__label` + `__value`.
   - Tokens: `--spec-item-icon-size`, `--spec-item-gap`, `--spec-item-label-color`, `--spec-item-value-color`. Typography routes through foundation `--type-body-*` once those land (see S20).
   - Migration: vsr-quick-view consumes `SpecItem` inside its `__specs` 2-col grid (grid layout stays scoped).

Both extractions are **mechanical** — no behavior change, no Figma re-verification, no per-brand remediation. The risk is reverse: leaving them as molecule-scoped slots for the next 1–2 molecules guarantees S26-style drift at the next reconciliation.

### Production impact today

**None.** vsr-filter renders correctly; vsr-quick-view will render correctly on first land with molecule-scoped slots. This is a hygiene + future-debt finding, not a render-correctness one.

### Severity

**Medium.** Drift hasn't accumulated yet, but the trajectory mirrors atomic Tabs → S26. Cost to extract rises with each additional consumer. Best addressed in a small dedicated PR (~1 hour engineering for both atoms + tests + doc pages) before vsr-quick-view ships to production downstream consumers.

**Pattern category:** P-new (atom-extraction debt — first occurrence in this audit; sibling class to S26's atomic-vs-Figma reconciliation).

---

## Index by severity

**Bugs (code is wrong or contradictory):**
- S7 — offset sign mismatch (FIXED) · [CSS-INTERNAL]
- S6 — dead token (FIXED) · [CSS-INTERNAL]
- S9 — header nav tokens unconsumed · [CSS-INTERNAL]
- S10 — Feedback swatches invented; diverge from Figma + chip tokens · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S11 — ColorsPage "shared across brands" claim contradicts Figma + brands.css · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S13 — Neutral Scale is Chevy-only; Figma per-brand; CSS implements 2 of 9 rungs · [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Bugs — additional Figma-verified (2026-04-25):**
- S1 — Cadillac hardcoding (Figma uses mode-switched variables, CSS hardcodes literal) · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S2 — Chevy selected-tab text is brand-blue; Figma says neutral grey `#262626` (framing inverted) · [CSS-vs-FIGMA]
- S16 — TypographyPage renders 33-row scale hardcoded in JS; page claim of `base-typography` Figma collection unverifiable · [CSS-vs-FIGMA] (conditional) + [CSS-INTERNAL]
- S19 — TypographyPage weight collisions: regular=medium=500, bold=extra-bold=700 — two pairs render identically · [CSS-INTERNAL]
- S20 — Figma badge `letter-spacing` variable has no CSS token · [CSS-vs-FIGMA] + [CSS-INTERNAL]

**Bugs — additional Figma-verified (2026-04-27):**
- S26 — Atomic Tabs CSS implements only some per-brand Figma values; selectively adds `text-transform: uppercase` Figma does not specify; production rendering wrong on 3 of 4 brands for VSR Filter consumer of Tabs Contained · [CSS-vs-FIGMA]

**Atom-extraction debt (2026-05-08):**
- S27 — Color-disc swatch + icon/label/value spec row are implemented inline in vsr-filter (existing) and vsr-quick-view (incoming); should be extracted to Swatch + SpecItem atoms before a 3rd molecule consumes either pattern · [CSS-INTERNAL]

**Inconsistencies (code works, but diverges from library conventions):**
- S5 — `--toggle-*` prefix · [CSS-INTERNAL]
- S8 — configurator-sub-header is in a separate Figma file (Navigation, not Core Variables); document the exception · [CSS-INTERNAL]
- S12 — 4 of 6 brand-palette tokens filesystem-dead · [CSS-INTERNAL]
- S14 — Brand palette defined only in brands.css (CLAUDE.md drift) · [CSS-INTERNAL]
- S15 — Token name flattening drift from Figma paths · [CSS-vs-FIGMA]
- S17 — `--type-heading-*` tokens defined in global.css, not tokens.css (CLAUDE.md drift, mirrors S14) · [CSS-INTERNAL]
- S18 — Font-family colon-notation is redundant, not broken; each variant registered under two `@font-face` names; Figma stores family and weight as separate vars · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S21 — Semantic spacing labels (`-xs` / `-s` / `-m` / `-l` / `-xl`) are contextually relative; same label maps to 2–8px depending on surface+axis. Taxonomy inherited from Figma — fix requires design+eng alignment, not a unilateral CSS rename · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S22 — Spacing groups mix T-shirt suffixes, pixel-literal suffixes, and one `-12` outlier within the same group. Same Figma inheritance as S21; only the `-12` outlier is a candidate for CSS-only cleanup · [CSS-vs-FIGMA] + [CSS-INTERNAL]
- S23 — 35 of 42 `--spacing-*` tokens are filesystem-dead; zero consumption in `global.css` · [CSS-INTERNAL]
- S25 — SpacingPage renders its swatches from JS literals, not from `var(--spacing-*)` — same pattern as S16 for typography · [CSS-INTERNAL]

**Design questions (blocked on per-brand Figma verification or design team):**
- S3 — Buick `#333333` non-tinting (blocker: Buick-mode Figma resolution not exercised) · [CSS-vs-FIGMA] (conditional) + [CSS-INTERNAL]
- S4 — Avatar badge per-brand values may or may not match Figma modes (blocker: same) · [CSS-INTERNAL] (structure matches; values unverified)
- S24 — SpacingPage claims it mirrors a Figma collection that MCP does not surface as a variable set (runtime zero, docs-accuracy concern) · [CSS-vs-FIGMA]

**Retroactive Figma verification status (2026-04-25):** S1, S2, S3, S4, S8 re-verified against Figma Core Variables file. Tags revised accordingly. S5, S6, S7, S9 tagged [CSS-INTERNAL] by default — they are internal repo concerns (naming, consumption, wiring) that don't require Figma data to classify.

---

## How to extend

When closing out a batch, re-read this file and:
1. Add any new systemic findings under the next `Sn` heading.
2. Move fixed items to "FIXED" status with date + resolution note.
3. Update the severity index.

When the full audit wraps (end of Batch 6), this list feeds into the drift-prevention memo as the "systemic findings extracted from 22 audits" section.
