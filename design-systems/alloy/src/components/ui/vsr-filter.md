---
title: VSR Filter
slug: vsr-filter
route: /domain-components/vsr-filter
category: domain-components
---

# VSR Filter

Left-rail (desktop / tablet) or full-bleed sheet (mobile) filter for the **Vehicle Search Result** page. Anchors a ZIP / radius header on top, swaps payment context (Cash · Finance · Lease) and shows the matching pricing slider, then stacks every refinement category — Year, Vehicle, Exterior / Interior Color, Popular Features, Packages, Drive Type, Fuel Type, Est. MPG/MPGe, Est. Range, Trailering Capacity — as expand / collapse sections. The mobile sheet adds a sticky header (Filters · close) and a bottom action bar (vehicle count · Clear All · Apply).

**Variants**
- Payment payload — Cash (Net Price Payment + Range Slider), Finance / Lease (Est. Monthly Payment + Single Slider), GD Error (retry CTA).
- State — Default (Year/Vehicle/Color sections pre-expanded), Disabled (rail is inert at 50% opacity), Mobile Default, Mobile Selected (quick filters + count badges), Mobile Active (mid-section open with scrim).
- Viewport — Desktop (354px rail), Tablet (287px rail), Mobile (375px full-bleed sheet w/ sticky chrome).

**Built from** — consumes 9 atomic components (2 via tree-shaken React imports, 7 via CSS-class reuse) plus 3 NET NEW slots. `InlineButton` and `QuickFilter` + `QuickFilterGroup` are imported directly: InlineButton powers "View More (4)" triggers; QuickFilter powers the Electric · SUV · Truck · Performance row. Tabs Contained (Cash/Finance/Lease), Slider (range + single), Accordion (12 filter sections), Checkbox (option lists), Switch (privacy toggle), Button (Retry / Clear All / Apply), and IconButton (mobile close X) are reused via their `.drp-*` CSS classes. NET NEW slots — no atomic equivalent: the **color swatch picker** (round disc grid with split two-tone fills + ring-on-select), the **selected-count badge** in accordion headers (circular ≠ atomic Chip's pill shape — flagged as future Badge atom), and the **ZIP / legal / mobile-chrome scaffold**.

**S26 dependency** — Tabs Contained Large consumed via `.drp-tab-contained-*` classes has known per-brand drift (selected text color, line-height, default text, spurious uppercase on GMC + Cadillac). Drift is at the atomic CSS level; remediation is a separate `brands.css`-only PR. The molecule consumes atomic-as-is to stay atomic-first; visible regressions on Buick / GMC / Cadillac resolve when **S26** lands. See `systemic-findings.md § S26`.

**Brand notes** — the molecule defines no brand-specific tokens of its own. The brand surface is inherited entirely through the atomic components it composes (Tabs, Slider, Checkbox, Accordion, QuickFilter etc. each have their own `[data-brand]` blocks in `brands.css`). The molecule's own scoped surface (color swatches, count badge) routes through `var(--brand-color)` — Cadillac resolves to `#171473` automatically via the brand variable, no hardcoded literal. A previously hardcoded Cadillac `#171473` on the numeric pill (Rows / Seats) was removed 2026-04-27 (S1 anti-pattern fix); the default rule already routes through `var(--brand-color)`. The 20/24 "Filters" heading flows through the foundation `--type-headline-6-family/-weight` tokens (with `--type-heading-*` fallbacks), so it picks up Buick's `Buick_Text` and Cadillac's `Cadillac_Gothic` (regular cut, distinct from h1–h4's wide cut) automatically.

**Architectural status** — **S8 closed 2026-04-27.** Chevy base tokens for `--vsr-filter-*` now live in `styles/tokens.css` (extracted from CSS `var()` fallbacks in `styles/global.css`). The molecule has zero `brands.css` overrides — all per-brand re-theming flows through the atomic components it composes. Several typography + color literals (location row, payment label/value, error message, option count, GPC legal) remain unscoped pending future foundation tokens (`--text-primary`, `--text-secondary`, `--text-muted`, `--font-body-*`); flagged in the Tokens section of the doc page as foundation-gap candidates.

**Live page:** `/domain-components/vsr-filter` — canonical reference for tokens, anatomy, payment variants, mobile chrome, Dos/Don'ts, and interactive demos.

**Implementation:** [`vsr-filter.tsx`](./vsr-filter.tsx)

**Related components:** [`accordion.tsx`](./accordion.tsx), [`tabs.tsx`](./tabs.tsx), [`slider.tsx`](./slider.tsx), [`checkbox.tsx`](./checkbox.tsx), [`switch.tsx`](./switch.tsx), [`button.tsx`](./button.tsx), [`icon-button.tsx`](./icon-button.tsx), [`inline-button.tsx`](./inline-button.tsx) (imported), [`quick-filter.tsx`](./quick-filter.tsx) (imported).

**Figma / Storybook**
- Figma (all brands): https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
