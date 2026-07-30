---
title: Avatar + Notification
slug: avatar
route: /components/avatar
category: components
---

# Avatar + Notification

Header-right cluster for the global nav: a 40px (desktop) / 32px (mobile) round avatar paired with a bell that carries an unread-count pill badge. The avatar disc is **transparent** — a 1.5px `#262626` stroke plus the initials (signed-in) or a generic `circle-user` icon (signed-out) carry the visual weight. The badge caps at `9+` and hides entirely at `0`.

**Variants**
- Avatar state — signed-in (two-letter initials) or signed-out (`.is-logged-out` + user icon).
- Size — `40px` desktop (default) or `32px` mobile (`--mobile` modifier).
- Badge counts — `0` (hidden via `.is-empty`), `1–9` (single digit, 16×16 square-ish pill), `10+` (rendered as `9+`).
- Cluster — `.drp-avatar-group` pairs a `.drp-notification` with a `.drp-avatar` at a 16px gap.

**Brand notes** — Narrow brand surface: only three tokens override per brand, all on the badge or initials. `--notification-badge-bg` — Buick `#333333` (dark gray), GMC `#25282A` (near-black), Cadillac `#171473` (navy — the only brand that actually tints the badge with its brand color); Chevy keeps base `#0077d9`. `--avatar-initials-font-family` and `--notification-badge-font-family` swap together: Buick `Buick_Text:Bold`, GMC `StratumGMC:Bold`, Cadillac `Cadillac_Gothic:Bold`. The transparent disc, `#262626` stroke/bell, sizes, padding, and the white `#ffffff` badge halo are all brand-invariant.

**Live page:** `/components/avatar` — canonical reference for tokens, anatomy, Dos/Don'ts, and interactive demos.

**Implementation:** [`avatar.tsx`](./avatar.tsx)

**Related components:** [`header.tsx`](./header.tsx) (the avatar cluster lives in the header's right slot), [`menu.tsx`](./menu.tsx) (both buttons open menus; use Menu for the dropdown panels).

**Figma / Storybook**
- Figma: https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-69707
- Storybook: https://aecgm-dev.tekion.xyz/docs/ui-components/
