# Audit Summary — DRP Design System Documentation Site

**Date:** 2026-04-25
**Scope:** all 22 components and 3 foundations pages in the DRP docs site
**Companion files:** [systemic-findings.md](./systemic-findings.md) · [drift-prevention-memo.md](./drift-prevention-memo.md) · [css-runtime-changes.md](./css-runtime-changes.md)

---

## 1. TL;DR

We audited the DRP documentation site end-to-end: **22 component pages** (Accordion through Tooltip) plus **3 foundations pages** (Colors, Typography, Spacing). For each, we compared three things: the Figma design, the CSS implementation (tokens.css + brands.css + global.css), and the doc page itself.

**The one-paragraph summary.** The design system has three sources of truth — Figma (design intent), CSS (implementation), and the doc pages (communication). They're partially aligned, not fully. The audit's job was to map where they agree, where they diverge, and where the divergence is bug-level vs. decision-level. Components are in strong shape; **foundations pages surfaced the most drift** (Batch 7: Colors, Typography, Spacing produced 16 of the 26 findings). S26 added 2026-04-27 — atomic Tabs CSS does not faithfully implement Figma per-brand at token-level granularity; production rendering wrong on 3 of 4 brands for VSR Filter consumer.

**The main finding categories:**

- **Colors.** Feedback-color swatches on the docs page don't match Figma or the chip tokens they claim to share. ColorsPage copy says feedback colors are shared across brands; Figma says they're per-brand. Chevrolet's neutral ramp is implemented but not the other three brands'.
- **Typography.** The TypographyPage renders a 33-row scale hardcoded in JavaScript, not read from any CSS or Figma variable. Font-family values use a colon notation (`Chevy_Sans:Demi`) that coexists with a plain notation — both work, but the dual setup isn't documented. Two weight pairs (regular/medium, bold/extra-bold) render identically.
- **Spacing.** 42 spacing tokens are defined; only 7 are actually used. The docs page advertises the system as a foundation every component builds on. In practice, components use raw pixels and the page itself bypasses the tokens it displays. **This is a directional question, not a bug fix** — see Section 3.
- **Components.** Earlier batches (components 1–22) surfaced 9 specific code-level findings; two are already fixed. The rest are tracked and ranked by priority.

**By audience (counts):**
- **7 findings need a design decision** before any code change makes sense.
- **11 findings are engineering-only** fixes — the answer is known; code needs to match.
- **8 findings need both** — design sign-off first, engineering follow-up second.

**What happens next:** a single 30–45 minute design review resolves most of the "design decision needed" bucket. After that, engineering-only items can be queued as normal PRs. The prevention work (lint rule + checklist) lives in the [drift-prevention-memo.md](./drift-prevention-memo.md) and is ready to land independently.

---

## 2. Findings index — split by audience

Every finding has a full write-up in [systemic-findings.md](./systemic-findings.md) under its `## Sn` heading. This index is the one-line version grouped by who needs to act first.

### Design decision needed (7)

These are questions where "what should this be?" hasn't been answered. No amount of engineering effort resolves them until the design side weighs in.

- **S2** — Chevrolet's selected-tab text is brand-blue (`#0077d9`); Figma's variable says neutral grey (`#262626`). Which is intended? *(Colors)*
- **S3** — Buick uses a non-brand grey (`#333333`) for Avatar badge and Toggle selected states instead of tinting through `var(--brand-color)`. Intent or copy-paste? *(Colors)*
- **S4** — Avatar notification badge uses three different patterns across four brands (cross-brand inconsistency). Which rule wins? *(Colors)*
- **S11** — ColorsPage copy claims feedback colors are shared across brands; Figma defines them per-brand. Is the page copy wrong, or are feedback colors intentionally unified? *(Colors)*
- **S13** — Neutral Scale is implemented as Chevy-only in CSS (2 of 9 rungs). Figma has a per-brand ramp for all 9 rungs × 4 brands. What should the missing values be? *(Colors)*
- **S19** — TypographyPage shows both `body-1-regular` and `body-1-medium` at weight 500; same for `body-1-bold` and `body-1-extra-bold` at 700. Are these meant to be distinct weights? *(Typography)*
- **S24** — SpacingPage claims it mirrors a Figma collection; Figma MCP doesn't surface a `spacing/*` namespace. Does the collection exist (e.g. in a surface MCP can't read), or is the page's framing aspirational? *(Spacing)*

### Engineering fix (11)

Answer is known. Code needs to match it. No design blocker.

- **S5** — `--toggle-*` token prefix doesn't match the component's root class. Rename to `--toggle-button-*` across 24 tokens. *(Components)*
- **S6** — `--notification-badge-lh` was defined but never read. **FIXED** in commit `753268d`. *(Components)*
- **S7** — Avatar offset fallback sign was `-4px` where the token value is `+2px`. **FIXED** in commit `753268d`. *(Components)*
- **S9** — Header nav tokens are defined, brand-overridden, but never consumed in `global.css`. GMC's 18/25 nav typography is silently dropped. *(Components)*
- **S12** — 4 of 6 brand-palette tokens in `brands.css` are filesystem-dead. Wire up or delete. *(Colors)*
- **S14** — Brand palette is defined only in `brands.css`; `CLAUDE.md` says base tokens live in `tokens.css`. Migrate or update the convention. *(Colors)*
- **S15** — Token names drop Figma-path hierarchy inconsistently (some flatten, some don't). Align to one rule. *(Colors)*
- **S17** — `--type-heading-*` tokens live in `global.css`, not `tokens.css` (CLAUDE.md drift, same pattern as S14). *(Typography)*
- **S20** — Figma defines a `letter-spacing` variable on notification badge; CSS has no matching token. Add it. *(Typography)*
- **S23** — 35 of 42 spacing tokens are never consumed. *Resolution depends on the Spacing directional choice in Section 3; if Option B is chosen, this becomes a deletion sweep.* *(Spacing)*
- **S25** — SpacingPage renders its preview swatches from JavaScript literals instead of reading `var(--spacing-*)`. Same pattern as S16 for typography. *(Spacing)*

### Both — design sign-off, then engineering (8)

These need a short design decision, followed by a well-scoped engineering change.

- **S1** — Cadillac `brands.css` hardcodes literal `#171473` in multiple places. Figma stores it as a mode-switched variable. Design confirms the canonical value; engineering replaces the literals with `var(--brand-color)`. *(Colors)*
- **S8** — Configurator Sub-Header tokens live as inline CSS fallbacks in `global.css` rather than `tokens.css`, and the component lives in a separate Figma file ("GM Navigation") from the main Core Variables file. Decide whether to extract tokens, document the cross-file exception, or both. *(Components)*
- **S10** — Feedback swatches on ColorsPage use hex values that don't appear in Figma or in the chip feedback tokens they claim to mirror. Design confirms the canonical feedback palette; engineering replaces the swatches. *(Colors)*
- **S16** — TypographyPage hardcodes its 33-row scale in JS. Design confirms whether a `base-typography` Figma collection exists and should be mirrored; engineering either wires it up or rewrites the page to be honest about its JS-literal source. *(Typography)*
- **S18** — Font-family colon-notation (`Chevy_Sans:Demi`) works correctly — each font variant is registered under two `@font-face` names (plain + colon). Why the dual registration exists isn't answerable from the code. The team that owns font-face registrations needs to answer the open question (redundant Figma import / needed for external tooling / historical accident); that answer determines whether the fix is "collapse to one form" or "keep both and document." *(Typography)*
- **S21** — Spacing's T-shirt-within-group labels (`-xs` / `-s` / `-m` / `-l` / `-xl`) are inherited from Figma's own spacing taxonomy. A unilateral CSS rename would break the Figma↔CSS mirror. Design leads the decision (rename in Figma, or accept and document); engineering follows. *(Spacing)*
- **S22** — Spacing groups mix T-shirt suffixes, pixel-literal suffixes, and one `-12` outlier. Same inheritance as S21. The `-12` outlier is the one sub-item that could be fixed unilaterally in CSS. *(Spacing)*
- **S26** — Atomic Tabs CSS does not faithfully implement Figma per-brand variant values. Engineering adds 9 missing per-brand overrides (Buick / GMC line-height + default-text-color, Buick selected-text gray, Cadillac unselected bg, Buick + GMC Underlined sizes 18/25, GMC Underlined font-weight 500) and removes 4 spurious `text-transform: uppercase` declarations. Design clarifies 3 items (Buick selected-border `#fe5000` vs brand orange `#D44400`, GMC outer border `#25282a` vs `#060505`, Cadillac selected-text routing through `var(--brand-color)`). Production rendering currently wrong on 3 of 4 brands for VSR Filter Cash/Finance/Lease tabs. *(Components)*

---

## 3. The bigger picture

**Four patterns emerged when the 25 findings are viewed together.** They're the framing worth bringing to the team conversation, separate from any individual bug fix.

### Pattern 1 — CSS implementation is a partial realization of the Figma design system

Batch 7 (foundations) made this visible in a way component-level audits didn't. Figma expresses design intent more completely than CSS implements it: per-brand neutral ramps (S13), per-brand feedback colors (S11), badge letter-spacing (S20), mode-switched Cadillac values (S1). The CSS wasn't wrong in any of these — it was **partial**. Closing the gap is a decision about how aligned the team wants CSS to be with Figma. Stronger alignment is more work and less flexibility; weaker alignment is the status quo.

### Pattern 2 — Documentation pages are aspirational in places

The ColorsPage claims feedback colors are shared across brands (they aren't — S11). The SpacingPage claims it mirrors a Figma collection (the collection isn't visible via MCP — S24). The page-level copy describes a more complete, more unified design system than the CSS actually implements. This isn't dishonesty; it's documentation written before the implementation fully landed, and never revisited. Fixing it is a writing pass, not an engineering lift.

### Pattern 3 — Three structural architecture exceptions

Three findings are CLAUDE.md-level — they describe places where the actual repo layout diverges from what the architecture document says. None of them are bugs; they're documented-vs-actual drift:
- **S14** — Brand palette lives only in `brands.css`; CLAUDE.md says base tokens live in `tokens.css`.
- **S8** — Configurator Sub-Header tokens live inline in `global.css`, not in `tokens.css`, and the component lives in a separate Figma file.
- **S17** — `--type-heading-*` tokens live in `global.css`, not `tokens.css`.

Each is fixable either direction (migrate the code or amend CLAUDE.md). The pattern to notice is that CLAUDE.md is the thing that drifts fastest; an occasional re-alignment pass is probably healthier than a lint rule.

### Pattern 4 — Drift prevention will catch CSS-internal issues; Figma↔CSS sync is a separate process problem

The prevention mechanisms in [drift-prevention-memo.md](./drift-prevention-memo.md) (lint rule + checklist) catch drift patterns P1–P7 — all CSS-internal. They don't catch Figma↔CSS divergence (Batch 7's main finding category). That's a different kind of problem: it needs a process (periodic Figma variable diff, ideally tool-assisted) rather than a code check. Worth naming explicitly so the team doesn't expect the lint rule to catch things it can't.

### The atomic-vs-Figma capstone — Pattern 1 confirmed at component-token granularity (S26, added 2026-04-27)

Pattern 1 said the CSS is a partial realization of Figma. Batch 7 made that visible at the foundations level (per-brand neutral ramps, feedback colors, badge letter-spacing). **S26 confirms the same pattern at the atomic-component token level.**

The S26 verification: atomic Tabs Contained Large + Underlined Inside Large were checked per-brand (4 brands × multiple variants) against their Figma `get_variable_defs` resolutions. The result was 13 deltas across one atom family — 9 per-brand overrides Figma specifies that atomic CSS doesn't set (line-heights, default text colors, selected text colors, sizes), and 4 `text-transform: uppercase` declarations atomic CSS adds that Figma does not specify. Three of four brands render wrong today for the one production consumer (VSR Filter's Cash · Finance · Lease tabs).

**Why this is its own capstone, not a single S-numbered finding:** S26 documents one atom family. The other 18 atoms in `src/components/ui/` (Buttons, Inputs, Chips, Sliders, Accordions, etc.) have **not been per-brand Figma-verified at this granularity** in this audit. The pattern that produced S26's misses — atomic CSS implementing only the most visible per-brand overrides while leaving secondary tokens at Chevy defaults; or carrying CSS conventions Figma does not specify — is generic and likely recurs across the library.

**Recommendation:** schedule a future audit pass scoped to atomic-vs-Figma per-brand reconciliation across all 19 atoms. Methodology mirrors S26: `get_variable_defs` per brand × per variant; tabulate missing-overrides and spurious-additions; remediate via `brands.css`-only PR per atom. **Out of scope for the current audit; flagged as a class so it isn't lost in the per-finding noise.** The cost of skipping is what S26 caught for Tabs: production rendering quietly wrong on 3 of 4 brands until someone deep-checks.

This sits alongside Pattern 4: the lint rule catches CSS-internal drift, periodic Figma-diff catches CSS-vs-Figma divergence at known surfaces, and atomic-vs-Figma per-brand reconciliation is a third process that catches the granularity-level drift S26 surfaced.

### The Spacing capstone — a directional decision, not a bug list

Spacing deserves its own callout because S21–S25 together describe one situation, not five: the system was designed (42 tokens), documented (the page), and not adopted (35 unused, components use raw px, page bypasses its own tokens). Three honest directions:

- **Option A — Adopt the system.** Refactor `global.css` to consume `var(--spacing-*)`. Weeks of work; makes the advertised foundation real.
- **Option B — Abandon the semantic layer.** Collapse to the 7 tokens actually used; delete 35; simplify the page. Fast; admits the abstraction didn't land.
- **Option C — Accept the divergence.** Keep the tokens as design intent; rewrite the page copy to be candid. No code change; moves docs from "misleading" to "honest."

A designer and an engineer should pick A/B/C together. Individual findings S21–S25 become trivial to scope once the direction is chosen.

---

## 4. Prevention mechanisms

Full detail in [drift-prevention-memo.md](./drift-prevention-memo.md). Two primary mechanisms cover all seven drift patterns (P1–P7) that the audit surfaced:

**Lint rule — `scripts/drift-check.mjs`.** Three purely syntactic checks: (1) every token defined in `tokens.css` must be consumed in `global.css`; (2) every `var(--X, Y)` fallback's `Y` must match the canonical definition of `--X`; (3) no `:Bold` / `:Demi` / etc. suffixes in `.tsx` token tables. Runs in under a second; no false positives once S8 is resolved. Zero human vigilance.

**New-component checklist — `.claude/new-component-checklist.md`.** A one-page list of grep-based items that force a contributor to verify token coverage, table grouping, brand notes shape, and registration before merging. Catches the patterns lint can't (editorial judgment calls).

The primaries cost about half a day of work between them and catch every drift pattern from the audit. Optional mechanisms (doc conventions, template updates) are deferred unless the primaries prove insufficient.

**Prerequisite:** S8 (Configurator Sub-Header token extraction) should be resolved before the lint's unconsumed-token check goes live, or it flags ~44 false positives and the team disables it.

---

## 5. Recommended next steps

A starting point for the team conversation, not a roadmap. Ranked by sequencing (earlier items unblock later ones).

1. **Walk the "Design decision needed" bucket with the design team** (7 findings, ~30–45 min). These are answerable in one focused session — most are values that already exist in someone's head but haven't been written down. Output: one canonical answer per finding, noted against the S-number. This unblocks most of the "Both" bucket.

2. **Decide the Spacing direction — Option A, B, or C.** (Section 3.) Needs a designer and an engineer in the same room for 20 minutes. The answer determines whether S21–S25 become a multi-week refactor, a one-afternoon deletion sweep, or a docs-only rewrite.

3. **File tickets for engineering-only items.** S6 and S7 are already fixed (commit `753268d`). The remaining 9 are small-to-medium PRs. Queue S8 first (prerequisite for the lint); then S15, S17, S23 (if Option B); then the rest in order of blast radius. The triage table at the top of [systemic-findings.md](./systemic-findings.md) has the prioritization.

4. **Decide whether to establish a Figma↔CSS sync process.** Batch 7 revealed that the current CSS is a partial realization of Figma. No lint rule will catch this — it needs a periodic diff, probably tool-assisted. Worth deciding whether that's a problem the team wants to solve now or accept. If accepted, the ColorsPage / TypographyPage / SpacingPage copy should be rewritten to reflect "CSS implements a subset of Figma" honestly.

5. **Ship the lint rule** (drift-check.mjs, P3/P4/P7). Unblocked once S8 lands. Prevents the entire drift class going forward at zero ongoing cost.

---

**Deliverables from this audit live in four files at the repo root:**

- **[audit-summary.md](./audit-summary.md)** — this file. The memo for the team conversation.
- **[systemic-findings.md](./systemic-findings.md)** — the full catalogue of 25 findings with Figma citations, CSS line references, severity tags, and proposals.
- **[drift-prevention-memo.md](./drift-prevention-memo.md)** — the patterns (P1–P7) and the prevention mechanisms (lint rule + checklist).
- **[css-runtime-changes.md](./css-runtime-changes.md)** — the 3-line CSS runtime fix that landed during the audit (commit `753268d`), reviewed line-by-line.

Audit closed.
