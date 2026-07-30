---
title: Stepper
slug: stepper
route: /components/stepper
category: components
---

# Stepper

Ordered progress indicator for 2–4 step flows (checkout, wizard, vehicle config). Each step shows a pill badge with its index and a short label; the active step is marked by a 4px brand underline, inactive steps share a 1px `#e6e6e6` baseline. Two height variants cover desktop (48px) and mobile (40px) — the mobile variant adds an optional `prev` / `next` nav pair and collapses inactive steps to 32px (badge only) so the active step can expand.

**Variants**
- Size — Large (`--lg`, 48px) for desktop or Small (`--sm`, 40px) for mobile.
- Step count — 2, 3, or 4 (maximum). Steps are equal-width on Large; Small collapses inactive steps to badge-only.
- Nav arrows — optional `.drp-stepper-nav--prev` / `.drp-stepper-nav--next` buttons on the Small variant for step-to-step navigation.
- States — inactive (baseline only) and active (underline + brand badge).

**Brand notes** — Narrow surface: only four tokens override per brand. `--stepper-border-active` and `--stepper-badge-bg` route through `var(--brand-color)` for Buick (`#D44400`) and GMC (`#CC0000`), but Cadillac hardcodes `#171473` — the same pattern Slider uses (two components in the library that don't defer to the brand-color variable for Cadillac). `--stepper-font-family` and `--stepper-badge-font-family` swap together: Buick `Buick_Text`, GMC `StratumGMC`, Cadillac `Cadillac_Gothic`. Baseline (`#e6e6e6`), underline thickness (`4px`), badge text (`#ffffff`), label color (`#262626`), sizes, and layout are brand-invariant.

**Live page:** `/components/stepper` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`stepper.tsx`](./stepper.tsx)

**Related components:** [`tabs.tsx`](./tabs.tsx) (use for peer content switching, not sequential flows), [`breadcrumb.tsx`](./breadcrumb.tsx) (use for navigation hierarchy, not ordered progress).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=2348-14585
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
