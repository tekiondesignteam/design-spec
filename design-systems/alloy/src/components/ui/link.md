---
title: Link
slug: link
route: /components/link
category: components
---

# Link

Anchor atom for real navigation — page transitions, external resources, in-page jumps. Distinct from Inline Button: Link triggers navigation, not an action. Two themes (`primary` for light backgrounds, `inverse` for dark), three sizes (`large`, `medium`, `small`), with optional leading or trailing icons that inherit `currentColor`. Re-themes live via `[data-brand]`.

**Variants**
- Theme — `primary` (brand color on light) and `inverse` (white on dark or image).
- Size — `large` (16/24, 24×24 icons), `medium` (14/22, 24×24 icons), `small` (12/20, 16×16 icons) on Chevy + Cadillac; Buick + GMC bump every size up to 18/25, 16/22, 14/20.
- States — default, hover, disabled on each theme; neutral theme for surfaces where the primary brand color would clash.

**Brand notes** — token swaps only; owns the `--link-*` token family. All three non-Chevy brands drop to `font-weight: 400` (Regular, vs Chevy 500). Buick routes Primary + hover through `var(--brand-color)` (`#D44400`), swaps the font to `Buick_Text`, and bumps sizes up to 18/25, 16/22, 14/20. GMC uses `var(--brand-color)` = `#CC0000` plus `var(--brand-color-hover)` which also resolves to `#CC0000` — the red holds across interactive states, same as Buick; font swaps to `StratumGMC` with the same 18/25, 16/22, 14/20 size scale. Cadillac Primary is navy `#171473`, hover `#211fab`, font `Cadillac_Gothic_Narrow`; sizes match Chevy (16/14/12). No uppercase / letter-spacing changes on any brand (unlike Cadillac's button treatment).

**Live page:** `/components/link` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`link.tsx`](./link.tsx)

**Related components:** [`inline-button.tsx`](./inline-button.tsx) (link-style *action* — use when there's no navigation), [`button.tsx`](./button.tsx) (contained action sibling).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50217
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
