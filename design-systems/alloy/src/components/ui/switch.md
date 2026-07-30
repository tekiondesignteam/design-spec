---
title: Switch
slug: switch
route: /components/switch
category: components
---

# Switch

Binary on/off toggle for settings that take effect immediately. Pill-shaped track (`#1a1a1a` on, `#f2f2f2` off) with a 20px circular thumb that slides between the two ends. Label sits beside the control; large (14/22) and small (12/20) sizes available.

**Variants**
- State — Off (track neutral, thumb at left) or On (track near-black, thumb at right).
- Size — `large` (14/22 label) or `small` (12/20 label) via `.drp-switch-typography-large` / `-small`.
- Label placement — trailing (default) or leading (via `flex-direction: row-reverse`).
- States — default, hover, pressed, disabled on each on/off state.

**Brand notes** — Font swaps only. Buick → `Buick_Text`, GMC → `StratumGMC`, Cadillac → `Cadillac_Gothic` (note: base family, not the `_Narrow` variant Radio/Menu use). No color, size, or layout overrides — the near-black `#1a1a1a` track and `#c3cfd9` disabled ramp hold across all four brands. Cadillac navy does not appear on Switch.

**Live page:** `/components/switch` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`switch.tsx`](./switch.tsx)

**Related components:** [`checkbox.tsx`](./checkbox.tsx) (use when the change should not take effect until a form is submitted), [`radio.tsx`](./radio.tsx) (use for mutually exclusive options in a group of 2+).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50176
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
