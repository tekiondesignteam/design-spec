# gm-vsr — Constitution

> The constitution is the fixed frame for this project: its **boundaries** and the **visual language** it must follow. The visual language is not invented here — it is **inherited from the alloy design system**, which is the source of truth. Read this file first, and re-read it whenever a session gets long or a decision feels ambiguous. When anything conflicts with this file — or with the alloy docs it points to — those win.

**Owner:** jrajan  |  **Design system:** alloy  |  **Last updated:** 2026-07-30

---

## 1. Boundaries (non-negotiable)

- This project lives **only** in `projects/gm-vsr/`. Never create, edit, or delete files outside this folder.
- This project's design system is **alloy**, at `design-systems/alloy/`. That folder — and every other folder under `design-systems/` — is a **read-only source of truth**. Read from `design-systems/alloy/` freely; never write to it.
- **Use alloy and only alloy.** Never read from or mix in another design system, and never touch another `projects/<other>/` folder.
- All tokens, type, spacing, and components come from `design-systems/alloy/`. If something you need is missing, note it in §4 as a gap — do not invent a token or borrow from another system.

## 2. Visual direction — inherited from alloy

This project does not define its own visual language; it follows alloy's. **Authoritative sources — read these, and prefer them over the summary below whenever there's any doubt:**

- `design-systems/alloy/Constitution.md` — the system-wide requirements doc (governance + inherited visual direction, fully populated). Read this first.
- `design-systems/alloy/README.md` — what Alloy is, source-of-truth pointers, brand list
- `design-systems/alloy/CLAUDE.md` — brand essentials + hard rules + the REQUIRED PROCESS for building a component
- `design-systems/alloy/styles/tokens.css` (Chevrolet base) → `styles/brands.css` (per-brand overrides) → `styles/global.css` (component classes) — the actual token values (the only place values live)
- Figma `RsCbyz0LF6FaItYny1FqUU` + Storybook `https://aecgm-dev.tekion.xyz/docs/ui-components/` — authoritative for token/behavior intent (the `.md` stubs are minimal)

<!-- GENERATED FROM alloy — /new-project filled this in by reading the docs above. It is a convenience summary, not a second source of truth. -->

- **Look & feel:** Clean, confident GM automotive-retail commerce UI — a white-label ecommerce (Digital Retail Program) system that is **fully brandable across Chevrolet / Buick / GMC / Cadillac**, switched at runtime via `[data-brand]` on `<html>` (no JS re-render; CSS token overrides do the work). Chevrolet is the base (accent `var(--brand-color)`). Corners run sharp-to-rounded per brand; buttons 8px radius, VSR card 16px, pills for switch tracks/badges. There is **no dark mode** — the theming axis is brand, not light/dark.
- **Type / density / spacing:** Chevy_Sans base (per-brand families in `brands.css`); weights 400/500/600/700; letter-spacing 0. Component-scoped type scale (10/14 · 12/20 · 14/22 · 16/24 · 20/24 · 24/30). **Comfortable density only** — no compact/comfortable switch; density is per-component size variants (e.g. button 32/40/48px, input 44/56px). Spacing is a **4px-base scale** (0·1·2·4·8·12·16·24·32·40·48·56·64) with brand-invariant semantic tokens; a value off the scale gets added to the scale in review, never one-offed.
- **Never do (anti-patterns):** hardcoded brand hex literals (always route through `var(--brand-color)`); parallel/duplicate token namespaces (`--your-component-*`); `'Font:Weight'` colon font-family notation (use `font-family` + `font-weight`); spacing values off the scale; overriding brand-invariant spacing tokens in `brands.css`; refactoring the legacy Chip/Search/Tooltip class exceptions; suppressing the focus ring; inventing a token when one is missing (flag it — §4). Building a component skips the CLAUDE.md REQUIRED PROCESS (atom inventory first) at your peril.
- **Available surfaces:** React 18 + Vite + TypeScript SPA. Layout chrome — `header`, `footer`, `configurator-sub-header`; domain surfaces — VSR (Vehicle Search Result): `vsr-card`, `vsr-filter`, `vsr-math-box`, `vsr-quick-view`. Styling is plain CSS classes (`.drp-<name>-*` roots, BEM children, additive `.is-*` state classes) consuming `var(--token)` — not Tailwind/CSS-in-JS/CSS Modules.

## 3. Anchors — from alloy

- **Tokens:** use only `design-systems/alloy/styles/tokens.css` (Chevy base), `styles/brands.css` (per-brand overrides), consumed via `var(--token, fallback)` in `styles/global.css`. Icon tokens in `styles/icons.css`. Never hardcode a value; never hardcode a brand hex.
- **Component catalog:** `design-systems/alloy/src/components/ui/<name>.tsx` (29 components — accordion, avatar, breadcrumb, button, checkbox, chip, configurator-sub-header, footer, header, icon-button, inline-button, link, menu, quick-filter, radio, search, slider, stepper, switch, tabs, text-input, toggle-button, tooltip, vsr-card, vsr-filter, vsr-math-box, vsr-quick-view). Figma `RsCbyz0LF6FaItYny1FqUU` + Storybook `https://aecgm-dev.tekion.xyz/docs/ui-components/` remain authoritative for intent.
- **Icons:** `design-systems/alloy/assets/icons/` — per-brand folders (`chevy/`, `buick/`, `gmc/`, `cadillac/`) + `shared/`; SVG only, 16px / 24px. Glyphs swap by active `[data-brand]`.
- **Components this project uses:** {{narrow to the subset this project needs — decided in spec.md; default: any component in the catalog. Given the "gm-vsr" name, the VSR family (vsr-card, vsr-filter, vsr-math-box, vsr-quick-view) is the likely core.}}

## 4. Known gaps / open questions

Anything alloy doesn't cover yet. Flag it here — do not solve it by inventing a style or borrowing from another system. These were surfaced while writing `spec.md` (2026-07-30) and are approved to be built **net-new** for this project, each pending a maintainer follow-up to promote into Alloy proper.

- **Compare tray** — sticky bottom bar holding up to 3 vehicles, session-persistent. No Alloy component exists. Net-new; propose as a future domain component.
- **Compare modal** — side-by-side spec table for up to 3 vehicles. `vsr-quick-view` is single-vehicle only; no multi-vehicle compare surface exists. Net-new.
- **Numbered pagination** — desktop 24/page numbered pager. No pagination component in the catalog. Net-new (candidate atom).
- **Skeleton loader** — skeleton VSR cards for the loading state (PRD requires skeletons, not spinners). No skeleton/shimmer primitive in Alloy. Net-new (candidate atom).
- **Photo-count badge** — count badge overlaid on the card's primary photo. Alloy already flags a **future Badge atom** (`vsr-filter` selected-count badge). Net-new; align with that Badge atom when it lands.
- **Card fields — days-on-lot** — not present in the documented `vsr-card` anatomy. Net-new line on the card. _(Correction, 2026-07-30: **distance-from-user is NOT a gap** — the card ships `.drp-vsr-card__distance`, e.g. "(24 mi.)". Only days-on-lot is net-new.)_
- **Plain form-select** _(found while building Step 2 location editor, 2026-07-30)_ — Alloy documents a dropdown **text-input** (readonly + popover) and a popover **menu**, but no simple native-style form `<select>`. The search-radius picker uses a small net-new `<select>` styled to match the text-input field (bg / border-bottom / radius), reusing foundation-gap neutrals. Promote to an Alloy Select atom (or adopt the menu popover) when available.
- **Global surface / body-text foundation tokens** _(found while building Step 1, 2026-07-30)_ — Alloy has no global page-canvas / body-text / hairline token; its own Constitution flags `--text-primary`, `--text-secondary`, `--text-muted`, `--font-body-*` as pending foundation gaps. The shell page needs a page background, default ink, and a hairline for net-new layout. **Handling:** centralized in one place (`styles/shell.css` `:root`, `--gmvsr-*`) reusing Alloy's **own documented fallback literals** (`#ffffff` / `#262626` / `#e6e6e6` / `#f2f2f2` / `#666666` muted) — no new brand values invented; swap for real foundation tokens when Alloy ships them.

_Note: "flag as gaps" was the owner's chosen handling on 2026-07-30; these remain gaps in Alloy, not new tokens invented inside `design-systems/`._

## 5. Project-specific deviations

Default: **none** — this project inherits alloy exactly. Record here only intentional, signed-off departures from the design system, with a reason.

- **Tablet filter pattern** (2026-07-30, owner request): on tablet (600–1023px) the filter rail is **hidden and moved into the mobile-style Filters sheet**, and the results use a **2-up card grid** — instead of Alloy's `vsr-filter` 287px tablet rail. Reason: owner preference for a cleaner tablet browse; the rail felt cramped at tablet widths. Approver: jrajan (owner). _Alloy owner sign-off (Alpesh Karanpuria) still required per §13 before this is considered system-compatible._

## 6. Definition of done

A screen is done when:

- It uses only alloy tokens and components (per §1–§3).
- Every state in the spec (empty / loading / error / success) is built.
- It follows alloy's visual direction (§2), with any deviation recorded in §5.
- Nothing outside `projects/gm-vsr/` was modified.
