# T1 Design System

> **HARD RULE — read first.** Every design or prototype task forks `ui_kit/template/chat-interface.html`. No exceptions, even for "simple," "isolated," or "quick" asks. Read `CLAUDE.md` before any file write — it contains binding rules not reproduced here. The phrase "simple followup" is itself a tripwire — if you're thinking it, fork anyway.

The **T1 Design System** is the component library for **Tekion T1** — an AI assistant embedded inside the Tekion automotive retail / CRM platform. It powers conversational interactions (prompt input, chat bubbles, reasoning logs) alongside the dealer-workflow cards (Deal Card, Credit Score Card, Listing Card, Task Card, Planner Card, Document Card) that the assistant surfaces in-line.

## Source materials

- **Figma** — connected via the Figma MCP ("T1 Components" file). Contains ~800 local components across 48 component pages. Treated as design source of truth; always fetch the Figma node before writing styles.
- **Fonts** — Proxima Nova family (Thin → Black, with italics), provided as OTF in `fonts/`.
- **Brand mark** — Tekion AI type-only logo (`assets/t1-logo.svg`).

## Index

| Path | What it is |
|------|-----------|
| `colors_and_type.css` | All color primitives + semantic tokens + type scale as CSS custom properties. Import this first. |
| `tokens.scss` | Same tokens as SCSS `$t1-*` variables, for component stylesheets. **Authoritative source of all token values.** |
| `fonts/` | Proxima Nova OTF files (9 weights × 2 styles). |
| `assets/` | Logos, iconography and raster assets lifted from Figma. |
| `ui_kit/` | Component library — one folder per component (`Button/`, `Chip/`, `Badge/`, …) with `.jsx` + `.scss`. |
| `ui_kit/index.html` | Kit component gallery — browse all implemented components. |
| `ui_kit/template/chat-interface.html` | **Canonical prototype** — fork this for every T1 chat design task. |
| `ui_kit/docs/` | Component specs (one `.md` per component) + docs preview server. |
| `CLAUDE.md` | Engineering guide and binding rules. Read before any file write. |
| `SKILL.md` | Operator guide for AI agents using this design system as a skill. |

## Products represented

One product: **Tekion T1** — an AI assistant overlay for the Tekion automotive dealer platform. The component catalog covers:

- **Conversation surface** — Prompt Input (with gradient send), Chat Bubble, Response, Reasoning Log, Suggestion List, Feedback Action.
- **Domain cards** — Deal Card, Credit Score Card, Listing Card, Document Card, Completion Card, Planner Card, Notify-My Card, Tip Card, Task Card, Conversation-History Card.
- **Shell** — App Bar, Nav Bar, Mobile Header, Side Navigation, Global Search, FAB Icon, Fav Bar Icon, Modal, Notification Banner / Toast.
- **Atoms** — Button (primary / neutral / error × contained / outlined / text × 5 sizes × loading / disabled), Icon Button, Gradient Icon Button, Input Text, Dropdown, Checkbox, Switch, Chip, Badge, Avatar, Divider, Separator, Progress Bar, Link, Assistive Text, Empty state.

## Content fundamentals

Copy across the surface is **short, direct, second-person, sentence-case, no emoji**. The vibe is a capable product assistant for a salesperson, not a friend. Specific tells from the Figma:

- Greeting uses a first name, no exclamation: **"Hi John,"** / **"How can I help you today?"**
- Prompt placeholder uses a quick-action affordance: **"Ask anything or press "/" for shortcuts"**.
- Form labels and button labels are Title Case, single word where possible ("Label", "Save", "Cancel", "Delete").
- Values, states and chip labels are sentence case, no trailing punctuation.
- No emoji anywhere in the Figma — icon glyphs (filled + regular Phosphor icons) carry tone instead.
- "I" is avoided; the assistant frames itself in terms of the user's task ("How can I help you today?" is the one exception).

Imperative verbs lead buttons ("Send", "Save", "Cancel"). Destructive actions are red and outlined. Success is green. Primary call-to-action is blue. The AI send / generate button uses `$t1-gradient-brand` — this gradient is reserved exclusively for that button.

## Visual foundations

All concrete values below are sourced from Figma and mirrored in `tokens.scss` / `colors_and_type.css`. Always confirm values via the Figma MCP (`get_design_context`) before writing code — never guess. Use `$t1-*` (SCSS) or `var(--t1-*)` (CSS) to consume them; see `tokens.scss` for the complete list.

**Color vibe** — Cool, sober, desaturated. White and light-grey canvases dominate (`$t1-neutral-0` and `$t1-neutral-50` together account for the majority of fills). Accent color is a mid-blue (`$t1-blue-400`); success is a clean green (`$t1-green-500`); error is a bright red (`$t1-red-400`). Violet (`$t1-violet-500`) is reserved for the **AI / T1 brand mark** and Figma "component" outlines — it is NOT a general-purpose accent.

**Gradient** — Exactly one in the system: `$t1-gradient-brand`, used on the AI send/generate icon button only. No other gradients anywhere. Fetch the exact stop values from `tokens.scss` — do not describe them as prose.

**Type** — Proxima Nova. Three weights in active use: Regular 400, Medium 500, Semibold 600. Figma type scale (for reference; these are Figma-derived values — confirm via MCP before use): body 14px/16; prompt input and H2 16px/24; H1 / welcome greeting 24px/30; numeric display 32px. Medium Italic appears once at 16px — italics are a very light-touch accent.

**Spacing** — 4pt grid. `$t1-space-1` (4 px) through `$t1-space-8` (32 px); `$t1-space-7` (28 px) does not exist in the scale. Card padding 12px (`$t1-space-3`); section padding 16–24px; inter-card gutters 8–16px.

**Backgrounds** — Solid fills only. No full-bleed imagery, no patterns/textures, no noise. Cards sit on a light-grey canvas (`$t1-bg-canvas`).

**Borders** — 1px, mostly `$t1-border` (`rgb(212,213,214)`) or `$t1-border-strong` (`rgb(150,154,163)`). Buttons use a 2px outlined border (sometimes transparent to reserve hit area).

**Corner radii** — Very tight. `$t1-radius-xs` 2px is the workhorse — used across **buttons, inputs, badges, chat bubbles, prompt composer, modals, and most domain cards**. Full pill (`$t1-radius-pill` 9999px) for Chips, Avatars, and status dots. `50%` for circular avatars and icon buttons. `24px` for the FAB rounded-square (Figma-locked component-level value). Chat bubbles use asymmetric radius (`2px 2px 0 2px` on the user side) to create the "tail" effect — applied directly in `Chat-Bubble.scss`, not as a token.

**Cards** — Mostly flat: 1px border, `$t1-shadow-card` for elevation on hover, 12px radius.

**Shadows** — `rgba(25,40,57,0.09)` is the canonical shadow color. `$t1-shadow-card` for default elevation, `$t1-shadow-pop` for modals/menus.

**Transparency & blur** — Not used in core components. Modal scrims use solid black at ~40% opacity.

**Animation** — Not richly specified in Figma. Assume: 150ms ease-out for hover, 200ms ease-in-out for modal/sheet enter, no bounce, no spring. Loading spinners on `<Button loading>` only.

**Hover states** — Background steps one shade down the neutral ramp (neutral-100 → neutral-150); button fills darken ~8%.

**Press states** — Same color shift as hover, plus negligible scale change.

## Iconography

Icons in Figma are referenced as **`Icon`/`Icon3`/`Icon4`/`Icon7`** symbols with Bold (filled/heavier, used in buttons and primary actions) and Regular (line / hairline, lighter contexts) weights. All icons are 16px or 20px at use, delivered as SVG, and tintable.

This kit uses **Phosphor Icons** (<https://phosphoricons.com>) — loaded via the `<Phi>` wrapper in `_core.jsx`. Phosphor's three weights map directly onto the Figma intent: `weight="regular"` for line / hairline, `weight="bold"` for the filled/heavier button-and-primary-action style, and `weight="fill"` for solid glyphs. Use `<Phi name="…" size={16|20} weight="regular|bold|fill" />`.

**Phosphor is the ONLY icon library** — no Lucide, no Heroicons, no Material Icons, no other icon set, no inline SVG. Emoji are **never** used. Unicode glyphs are not used as icons. No icon font is baked in.

## Component authoring rules

> **The rules below are a summary for quick reference. The complete, binding enforcement checklist lives in `CLAUDE.md`. Read `CLAUDE.md` before authoring any component.**

### 1. Always compose with kit primitives

When building a new component, use existing kit components for every sub-element the kit already covers. Never hand-roll a replacement.

| You need… | Use this kit component |
|-----------|------------------------|
| Any button | `<Button variant iconStart size>` |
| Icon-only button | `<IconButton>` |
| Any icon | `<Phi name size weight>` from `_core.jsx` |
| Anchor / inline link | `<Link appearance size>` |
| Divider line | `<Seperator>` |
| Status label / count | `<Badge>` |
| User picture | `<Avatar>` |
| Selectable tag | `<Chip>` |
| Toggle | `<Switch>` |
| Tick box | `<Checkbox>` |
| Text field | `<InputText>` |
| Progress indicator | `<ProgressBar>` |
| Overlay dialog | `<Modal>` |
| Select / menu | `<Dropdown>` |
| Empty state | `<Empty>` |

**Violations to avoid:**
- Raw `<button>` + custom SCSS instead of `<Button>`
- Raw `<a>` + custom styles instead of `<Link>`
- Raw `<i>` / inline SVG instead of `<Phi>`
- Custom `.my-divider` instead of `<Seperator>`

### 2. SCSS tokens only — no raw values

Every color, spacing, radius, weight, or font reference in `.scss` files must use a `$t1-*` variable from `tokens.scss`. Raw hex/rgb values are forbidden.

### 3. Figma is the source of truth

Before writing any CSS, fetch the Figma node via the Figma MCP (`get_design_context`). All sizes, radii, gaps, and token values must come from the Figma design — never guessed.

### 4. BEM prefix per component

Every new component gets a unique two-to-four letter BEM prefix (e.g., `t1-nb`, `t1-docc`, `t1-sn`). Pattern: `t1-<slug>__<element>--<modifier>`. Prefixes must not collide with any existing component.

### 5. Rebuild after every edit

After changing any `.jsx` or `.scss` partial:
```sh
node dev.js --build            # → ui_kit/components.css + ui_kit/components.jsx
```

### 6. Never modify `.ts-menubar` or `.ts-body`

`.ts-menubar` (the 64px dark platform top bar) and `.ts-body` (the outer flex wrapper holding the favbar, main content, and AI panel) are locked Tekion platform chrome zones in `chat-interface.html`. Their CSS, dimensions, structure, and children must remain exactly as they are in the canonical template in every fork. Do not add, remove, or restyle anything inside these zones. All design work goes in the chat-thread content zone within `.ts-body`, not on these containers.

### 8. "Pull latest" fully updates the kit and all forked files

When a user runs "pull latest" or "pull updates from the library" in a downstream project, the agent executes this procedure:

1. **Update kit assets** — sync `ui_kit/components.css`, `ui_kit/components.jsx`, `ui_kit/components/`, `ui_kit/loader.js`, `ui_kit/template/chat-interface.html`, `ui_kit/docs/`, `colors_and_type.css`, `tokens.scss`, `fonts/`, `assets/` from the T1 Design System source.
2. **Find all forks** — every `.html` file at the project root (not inside `ui_kit/`) is a forked design file.
3. **Preserve-and-rebuild each fork:**
   - Extract project-specific content: the `RESPONSES` object, pre-seeded `messages` / `panelState`, and `matchResponse()` routing.
   - Replace the fork's full content with the updated canonical template.
   - Rewrite asset paths to project-root-relative form.
   - Re-inject the extracted content. **The `RESPONSES` JSX code is never modified.** Kit components referenced inside `RESPONSES` (e.g. `<ListingCard>`, `<Button>`) automatically receive their updated implementations because `components.jsx` and `components.css` were replaced in step 1.
4. **On first pull (no forks yet)** — place a pre-forked copy of `chat-interface.html` at the project root with the starter comment (see `CLAUDE.md`) and fix the asset paths.

The result: every fork has the latest shell, styles, and kit structure; all project-specific design content and component compositions are fully preserved.

### 7. Build outside the kit, never outside the system

If the component you need doesn't exist in `ui_kit/components/`, you are still fully bound to the T1 Design System. Compose it from `$t1-*` tokens and existing kit atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, domain cards, etc.). A missing component is never a licence to reach for a third-party library, hardcode a hex value, or hand-roll unstyled raw HTML as a workaround. The constraint doesn't change — only the assembly location does. See `CLAUDE.md` § "How to build a complex component" for the full ladder.

---

## Known limitations

- **Icon set:** Phosphor is the canonical icon library (loaded by `<Phi>`). Native T1-branded icons are not yet extracted from the Figma file — Phosphor's `regular` / `bold` / `fill` weights are the closest match and are what the kit ships with. No substitutions.
- **Component coverage:** The kit has 45 component folders. The top ~15 highest-usage components (Button, Phi, Response, ChatContainer, ChatBubble, ListingCard, DealCard, SuggestionList, InputText, Modal, Dropdown, Avatar, Badge, Chip, Welcome) are implemented at pixel fidelity. The remaining ~30 are documented in `ui_kit/docs/<Component>.md` but may be partial implementations or stubs. Read the `.jsx` source alongside the spec before composing with a less-common component. The Figma file has 48 component pages; the 3-page gap represents components not yet promoted to the kit.
- **Token fidelity:** Colors and spacing are lifted from the Figma metadata. `tokens.scss` stays in lockstep with `colors_and_type.css` via shared variable names — always keep them in sync when adding tokens.
