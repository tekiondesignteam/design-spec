# CSS Runtime Changes — Batches 1–6 Audit

One-page reviewable summary of CSS changes that could change rendered output, separate from the much larger diff of CSS additions (new Header + Configurator Sub-header blocks) that are new features, not edits to existing rules.

**Scope:** everything in commit `753268d` (`fix(css): runtime corrections surfaced during Batches 1–6 audit`). This commit touches 1 file, 3 lines, all inside the shared `.drp-notification__badge` rule.

**Caveat:** none of these changes are observable in production because the modified values are CSS fallbacks (`var(--X, Y)`) that don't fire when the token is defined — and in every case, the token is defined. The fixes eliminate a second, contradicting source of truth inside `global.css`. Think of them as removing invisible traps rather than user-visible fixes.

---

## Change 1 — S7 offset-top fallback sign

| | |
|-|-|
| **File:line** | `styles/global.css:2106` |
| **Before**    | `top: var(--notification-badge-offset-top, -4px);` |
| **After**     | `top: var(--notification-badge-offset-top, 2px);` |
| **Reason**    | `tokens.css:740` defines `--notification-badge-offset-top: 2px`. The fallback was `-4px` — not only the wrong magnitude, but the wrong sign. If the token were ever undefined, the badge would jump outside its container instead of sitting inside it. |
| **Visible in production?** | No — token is defined on every brand, fallback never fires. |
| **Visual verification** | No change. `.drp-notification__badge` renders identically in Chevy / Buick / GMC / Cadillac. |

## Change 2 — S7 offset-right fallback sign

| | |
|-|-|
| **File:line** | `styles/global.css:2107` |
| **Before**    | `right: var(--notification-badge-offset-right, -4px);` |
| **After**     | `right: var(--notification-badge-offset-right, 4px);` |
| **Reason**    | `tokens.css:741` defines `--notification-badge-offset-right: 4px`. Same sign-flip issue as Change 1, same reasoning. |
| **Visible in production?** | No. |
| **Visual verification** | No change. |

## Change 3 — S6 dead token wired up

| | |
|-|-|
| **File:line** | `styles/global.css:2118` |
| **Before**    | `line-height: 1;` |
| **After**     | `line-height: var(--notification-badge-lh, 14px);` |
| **Reason**    | `tokens.css:739` defines `--notification-badge-lh: 14px` but `global.css` never consumed it — hardcoded `line-height: 1` instead. Wires up the token so future brand overrides have a hook; `14px` fallback matches the token definition. |
| **Visible in production?** | No — `line-height: 1` on a 16×16 flex-centered badge produces the same centered-glyph layout as `line-height: 14px`. Visual-identical. |
| **Visual verification** | No change to badge render in Chevy / Buick / GMC / Cadillac. |

---

## What is NOT in commit `753268d`

**Header logo max-width** — the audit report mentioned a `var(--header-logo-max-width, 120px)` → `90px` edit, implying an existing fallback was corrected. On re-inspection, the rule in question sits inside the new Header CSS block that was added by commit `0c61e9d` (the audit docs commit). There was no pre-existing runtime to correct — the `90px` value was chosen at write-time to match `tokens.css:988`. It ships in the docs commit, not here.

**Header + Configurator Sub-header additions** — ~950 lines of new CSS. These are new component rules, not edits to existing rules. In commit `0c61e9d`.

**Token additions in `tokens.css` and `brands.css`** — `+104` and `+168` lines respectively. These are new tokens surfaced during the audit, again net-new rather than edits. In commit `0c61e9d`.

**Icon file update** — `assets/icons/cadillac/circle-chevron-down.svg` had one line changed. Not runtime CSS; shipped in commit `0c61e9d`.

---

## How to review

```
git show 753268d           # the whole commit (tiny — 3 lines)
git show 753268d -- styles/global.css  # just the CSS diff
```

Or pull the branch locally and toggle between brands in the preview (`Chevy / Buick / GMC / Cadillac` in the top-right brand switcher, `/components/avatar`) to verify the notification badge renders identically before and after.
