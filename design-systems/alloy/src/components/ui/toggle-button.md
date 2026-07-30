---
title: Toggle Button Group
slug: toggle-button
route: /components/toggle-button
category: components
---

# Toggle Button Group

Segmented control for 2–5 mutually exclusive options where exactly one is always selected. Each button has its own rounded border; the selected button fills with a brand-specific color and swaps to white text. Naming note: the token prefix is `--toggle-*` (no `-button-` segment), so `--toggle-bg-selected` / `--toggle-radius` / `--toggle-font-family`, not `--toggle-button-*`.

**Variants**
- Size — Large (`--lg`, 48px / 16px label) for desktop, Medium (`--md`, 40px / 14px label) for dense UI or mobile.
- Width — auto-width (default; each button hugs its label with a 120px minimum) or equal-width (`--equal`; every button stretches to fill the container).
- Option count — 2, 3, 4, or 5 (maximum). Beyond 5, switch to Menu.
- States — default, hover, selected, disabled (per button via real `disabled` attribute, or whole-group via `aria-disabled`).

**Brand notes** — Wide brand surface (one of the top three, alongside Slider and Tabs). Every brand re-themes the selected fill / border / hover border / hover text / font family. GMC and Cadillac additionally flatten `--toggle-radius` to `0`, shift `--toggle-text-transform` to `uppercase`, and add letter-spacing. Three brand-specific patterns worth noting: **Buick** hardcodes `#333333` dark gray for its selected + hover borders (doesn't route through `var(--brand-color)` — Buick is the only brand that doesn't brand-tint this component); **GMC** routes selected through `var(--brand-color)` (`#CC0000`) but _neutralizes_ hover text to `#060505` near-black (same red-neutralization pattern Tabs uses); **Cadillac** hardcodes `#171473` everywhere (doesn't use `var(--brand-color)` — the same Cadillac-hardcode pattern Slider + Stepper share). Default (unselected) state — `#ffffff` fill, `#e6e6e6` border, `#666666` text — holds constant; selected text stays white on every brand.

**Live page:** `/components/toggle-button` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`toggle-button.tsx`](./toggle-button.tsx)

**Related components:** [`tabs.tsx`](./tabs.tsx) (use when each option reveals a content panel — Toggle Button Group is for view-mode / filter switches), [`switch.tsx`](./switch.tsx) (use for binary on/off settings), [`radio.tsx`](./radio.tsx) (use when options need individual labels stacked vertically or descriptions).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-58136
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
