---
title: Inline Button
slug: inline-button
route: /components/inline-button
category: components
---

# Inline Button

Link-style buttons for low-emphasis actions inside prose or tight UI. No background or border — only a text label with an optional leading or trailing icon. Distinct from navigation links: Inline Buttons trigger actions, not page transitions. Re-themes live via `[data-brand]`.

**Variants**
- Theme — `primary` (brand text color, works on light backgrounds) and `inverse` (white text for dark or image backgrounds).
- Size — `large` (16/24), `medium` (14/22), `small` (12/20) on Chevy + Cadillac; Buick + GMC bump every size up to 18/25, 16/22, 14/20. Size modifiers apply to both themes.
- With icons — a leading or trailing icon may be added inside the button; icons inherit `currentColor`. Large and Medium use 24×24 icons; Small uses 16×16.

**Brand notes** — token swaps only; no variant or layout changes. Owns the `--button-link-*` token family. Inverse colors stay constant across brands. All three non-Chevy brands drop labels to `font-weight: 400` (Regular, vs Chevy 500); letter-spacing stays `0` per Figma. Buick routes the entire Primary color ramp through `var(--brand-color)` (`#D44400`), swaps the font to `Buick_Text`, and bumps all sizes up to 18/25, 16/22, 14/20. GMC sets Primary to `#CC0000` with dark hover/active ramps (`#25282A`/`#060505`); font swaps to `StratumGMC` with the same 18/25, 16/22, 14/20 size scale; all three sizes apply `text-transform: uppercase`. Cadillac routes Primary through navy `#171473` (hover/active `#211fab`), swaps to `Cadillac_Gothic` with `uppercase` text-transform; sizes match Chevy (16/14/12).

**Live page:** `/components/inline-button` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`inline-button.tsx`](./inline-button.tsx)

**Related components:** [`button.tsx`](./button.tsx) (contained sibling; owns the `--button-contained-*` families), [`link.tsx`](./link.tsx) (anchor atom; use for real navigation).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=4740-67485
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/?path=/story/ui-components-button--primary
