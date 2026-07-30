---
name: t1-design
description: Use this skill to generate well-branded interfaces for Tekion T1 (the AI assistant for the Tekion automotive dealer platform). Contains the canonical working prototype at ui_kit/template/chat-interface.html, a 45-component React kit (conversational frames, domain cards, overlays, atoms, locked shell), Proxima Nova fonts, $t1-* design tokens, and per-component docs. PROJECT CONVENTION — every design or prototype task forks ui_kit/template/chat-interface.html into the project root with a descriptive filename (e.g., Focus Today Response.html), fixes the relative asset paths, pre-seeds the messages / panelState, and adds entries to the RESPONSES catalog. Never build standalone HTML pages from scratch that recreate parts of the T1 chat UI. Read CLAUDE.md in the skill directory for the full hard-rules contract.
user-invocable: true
---

# STOP — SELF-CHECK BEFORE ANY FILE WRITE

**Before your first Edit / Write tool call, answer in your own words:** *"Am I forking `chat-interface.html`? If not, why is this the documented exception?"*

If you can't cite the exception, you are about to break **Rule 1** (see *The inviolable rules* below). Rule 1 has no exceptions for "simple" or "isolated" tasks — fork anyway.

If the user invokes this skill without a specific request, ask what they want to build, gather a few clarifying questions, and act as an expert designer.

---

## Read before coding

Use the `Read` tool to load these files in order before generating any code. `CLAUDE.md` is the master reference — read it first every time.

| File | What it contains |
|---|---|
| `CLAUDE.md` | Full engineering guide: file layout, dependency model, canonical sources table, token reference, composition rules, hard-rules contract. **Read first.** |
| `README.md` | Brand fundamentals: typography, color palette, gradients, copy voice. |
| `ui_kit/docs/SYSTEM.md` | System-level context and design rationale. |
| `ui_kit/docs/INDEX.md` | Fast index of every component doc — use to find the right spec file. |
| `ui_kit/docs/<ComponentName>.md` | Per-component spec. **Read with the `Read` tool before touching any component.** |
| `ui_kit/template/chat-interface.html` | The canonical prototype — fork this for every visual task. |
| `ui_kit/components/manifest.js` | Canonical component registry; order = dependency order. |
| `tokens.scss` | Every `$t1-*` token with its real value. |
| `colors_and_type.css` | CSS custom property mirror + Proxima Nova `@font-face`. |
| `fonts/` | Proxima Nova OTFs (Thin → Black, with italics). |
| `assets/` | Logos, illustrations, brand assets. |

---

## Kit coverage note

The kit contains 45 component folders. The top ~15 highest-usage components (Button, Phi, Response, ChatContainer, ChatBubble, ListingCard, DealCard, SuggestionList, InputText, Modal, Dropdown, Avatar, Badge, Chip, Welcome) are implemented at pixel fidelity. **The remaining ~30 are documented in `ui_kit/docs/<Component>.md` but may be partial implementations or stubs.** Always read the `.jsx` source alongside the spec before composing with a less-common component — do not assume a documented component is fully implemented.

---

## Pre-coding ritual

Run through these four questions before opening any file. State your answers briefly before writing code — this prevents component duplication, hex-literal drift, and needless rebuilds.

### 1. Decide using the decision ladder

Walk the request in order — the **first box that fires wins**:

1. **Conversational message?** → use a frame from the Conversational frames table below.
2. **Rich content block in the thread?** → use a domain card from the Domain cards table.
3. **Overlay?** → `<Modal>` (centered dialog) or `<NotificationBannerToast>` (corner toast).
4. **Inline control or atom?** → reach for the Overlays & inline controls table or the Atoms table.
5. **Still no match?** → see *When a component is missing* below.

### 2. Map the user's words to a kit component

Stop at the first row that matches. Every entry's work goes inside the chat-thread content zone of `chat-interface.html` — never rebuild the shell.

#### Conversational frames (message containers)

| User says… | Component |
|---|---|
| "AI response", "assistant message", "chat reply" | `<Response>` inside `<ChatContainer>` |
| "user message", "user said X" | `<ChatBubble>` |
| "welcome", "greeting", "first run", "intro" | `<Welcome>` |
| "draft", "editable response" | `<MessageDraft>` |
| "reasoning", "thinking", "step-by-step log" | `<ReasoningLog>` |
| "suggestions", "follow-ups", "next actions" | `<SuggestionList>` |
| "feedback", "thumbs up/down" | `<FeedbackAction>` |
| "quote", "blockquote" | `<Quote>` |

#### Domain cards

| User says… | Component |
|---|---|
| "deal card" | `<DealCard>` |
| "vehicle", "listing", "car card", "inventory" | `<ListingCard>` |
| "task", "task card", "todo" | `<TaskCard>` |
| "tip", "did you know" | `<TipCard>` |
| "credit score" | `<CreditScoreCard>` |
| "document", "doc card" | `<DocumentCard>` |
| "conversation history", "previous chat" | `<ConversationHistoryCard>` |
| "planner", "schedule" | `<PlannerCard>` |
| "set reminder", "notify me" | `<NotifyMyCard>` |
| "completion", "wrap-up" | `<CompletionCard>` |

#### Overlays & inline controls

| User says… | Component |
|---|---|
| "modal", "dialog", "confirm" | `<Modal>` |
| "dropdown", "select", "menu" | `<Dropdown>` |
| "toast", "banner", "snackbar" | `<NotificationBannerToast>` |
| "in-thread search" (not global AI search — that's locked shell) | `<Search>` |
| "empty state", "no results" | `<Empty>` |
| "input", "text field" | `<InputText>` |
| "button", "action", "CTA" | `<Button>` |
| "icon button" | `<IconButton>` |
| "AI send", "gradient send button" | `<GradientIconButton>` |
| "favorites bar" | `<FavBarIcon>` |

#### Atoms

| User says… | Component |
|---|---|
| "icon" | `<Phi name="…" size weight />` |
| "avatar" | `<Avatar>` |
| "badge", "count", "status pill" | `<Badge>` |
| "chip", "tag", "filter pill" | `<Chip>` |
| "switch", "toggle" | `<Switch>` |
| "checkbox" | `<Checkbox>` |
| "link", "anchor" | `<Link>` |
| "divider", "rule" | `<Seperator>` (typo retained — doc file is `Separator.md`) |
| "progress", "loading bar" | `<ProgressBar>` |
| "interactive icon" | `<InteractiveIcon>` |

#### Shell — already assembled in `chat-interface.html`, do not rebuild

`<AppBar>` · `<NavBar>` · `<SideNavigation>` · `<GlobalSearch>` · `<PromptInput>` · `<FabIcon>`

#### Platform chrome — locked, do not touch

`.ts-menubar` (64px dark top bar — logo, global search, nav actions) · `.ts-body` (outer flex wrapper holding favbar, main content, and AI panel). Their CSS, dimensions, structure, and children must never be modified in any fork. Your work goes inside the chat-thread content zone within `.ts-body`, not on these zones themselves.

### 3. Verify the component exists in the kit

Cross-check `ui_kit/components/manifest.js` and `ui_kit/docs/INDEX.md`. If the component is in the kit, use the `Read` tool to load `ui_kit/docs/<ComponentName>.md` before writing a single line of JSX. If it doesn't exist, see *When a component is missing* below.

### 4. Identify the tokens

Before writing any style value, name the `$t1-*` tokens that apply: color, spacing, radius, type. If a value isn't in the token quick-reference, open `tokens.scss` with the `Read` tool and find it there. Never guess or hardcode.

---

## Principle: tweak before you replace

The request will almost always be *"take this and change X"*, not *"design something new from scratch."* Reach for a **prop edit** first — only build new structure when no prop covers the case:

- "Make this button red" → `<Button color="error">`, not a styled `<button>`.
- "4 suggestions instead of 3" → add an item to the array, not a rebuild.
- "Different icon" → change `iconStart`, not an inline `<svg>`.
- "Modal needs a destructive variant" → keep `<Modal>`, change footer to `<Button color="error">`.
- "Card needs more padding" → SCSS rule using `$t1-space-*`, not `<div style={{ padding: 32 }}>`.

Resist hand-rolling a styled `<div>` when a prop edit would do. If you find yourself writing raw HTML structure for a component that already exists in the kit, stop — you are in the wrong mode.

---

## The forking workflow

### Always start from `chat-interface.html`

For ANY design or prototype work involving the T1 AI assistant — including single responses, follow-up turns, new message types, suggestion variations, panel states, isolated component demos, or "simple" / "quick" mocks — you MUST copy `ui_kit/template/chat-interface.html` into the project root as a new file and edit that copy. Never build a standalone HTML page from scratch that recreates or substitutes parts of the T1 chat UI.

The template carries the Tekion shell, AI panel docking states, the full `RESPONSES` catalog, streaming behavior, and all in-context interactions. Any new design must live inside a fork of it.

### The "simple followup" trap

When a user asks for *"just a simple response"*, *"a quick followup"*, *"an isolated component demo"*, or *"a small mock"* — the temptation is to build a small standalone page. **This is the most common rule-1 violation.** The correct response to *"simple"* is **fewer entries in the `RESPONSES` object inside the forked template, not a smaller file.**

If you find yourself thinking *"this is too small / too isolated to fork the whole template,"* that thought is the trap signal — fork anyway.

### When to ask before forking

If the user's ask genuinely does NOT involve the T1 chat surface (e.g. "design a marketing landing page", "make a slide deck"), confirm with one question before deviating.

### Pre-forked starter pattern

Consumer projects scaffolded for T1 design work SHOULD ship with a pre-forked copy of `chat-interface.html` already at the project root, with this top-of-file comment:

```html
<!-- T1 Design System starter. This is your starting point.
     For a single design task: edit in place.
     For multi-task projects: copy this file to a descriptive filename
     (e.g., `Focus Today Response.html`) and edit the copy.
     Do not build new HTML files from scratch. -->
```

Required by Rule 12 (pull-latest). Eliminates the most common rule-1 ambiguity — there is nothing to fork because it's already forked. If you find yourself in a project WITHOUT a pre-fork at the root, create one per the workflow below before doing anything else.

### Step-by-step workflow

1. **Copy** `ui_kit/template/chat-interface.html` into the project root with a descriptive filename (e.g. `Focus Today Response.html`).
2. **Fix the relative asset paths.** The template lives at `ui_kit/template/`, so its paths climb two levels. Once forked to the project root, rewrite them:

   | Asset | Path in template | Path in fork |
   |---|---|---|
   | Color + type tokens | `../colors_and_type.css` | `colors_and_type.css` |
   | Kit CSS bundle | `../components.css` | `ui_kit/components.css` |
   | Component manifest | `../components/manifest.js` | `ui_kit/components/manifest.js` |
   | Kit loader | `../loader.js` (`data-base="../ui_kit/"`) | `ui_kit/loader.js` (`data-base="ui_kit/"`) |
   | Fonts | `../../fonts/Proxima-Nova-*.otf` | `fonts/Proxima-Nova-*.otf` |

3. **Pre-seed `messages` and/or `panelState`** so the fork lands directly on the scenario being designed — do not force the user to type a prompt to see the design.
4. **Add new responses to `RESPONSES`** and route them via `matchResponse()`. Your work goes in the chat-thread content zone only — never inside or replacing the shell. Compose from kit components:

   **Good:**
   ```jsx
   <Response>
     <ListingCard
       title="2023 Tesla Model Y"
       actions={<Button variant="contained" color="primary">View details</Button>}
     />
   </Response>
   ```

   **Bad:**
   ```jsx
   <div style={{ background: '#fff', padding: '16px', borderRadius: '12px' }}>
     <h3>2023 Tesla Model Y</h3>
     <button style={{ background: '#4285F4', color: '#fff' }}>View details</button>
   </div>
   ```

5. **Rebuild and verify** after editing any `.jsx` or `.scss`:
   ```
   node dev.js --build
   ```
   Then open the fork directly in the browser (e.g., `http://localhost:3030/Focus Today Response.html`) — not the canonical template URL.

---

## When a component is missing

> **Rule: build outside the kit, never outside the system.** A missing component is never a licence to reach for a third-party library, hardcode a value, or hand-roll unstyled raw HTML as a shortcut. You are still fully bound to the T1 Design System — compose the new component from `$t1-*` tokens and existing kit atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, domain cards, etc.). The constraint doesn't change; only the assembly location does.

If the component you need doesn't exist in the kit, walk this ladder — first match wins:

1. **Compose from existing primitives inline.** Most things are `<Button>` + `<Phi>` + `<Link>` + `<Chip>` + a domain card + a small layout. Build it inside the fork's chat-thread content zone first.
2. **Promote to the kit only on a second use.** Any chrome that would be duplicated must live in `ui_kit/components/`, not hardcoded in `chat-interface.html`. To extract: create `ui_kit/components/<NewComponent>/<NewComponent>.jsx` + `.scss`, register in `manifest.js` in dependency order, run `node dev.js --build`. The new component must still be demonstrated inside the fork.
3. **Use only token values.** No hardcoded hex, no bare `12px`, no `'#DDD'`. Every value from `$t1-*`.
4. **Never inline a raw `<svg>`.** Use `<Phi name="…">`. Phosphor is the only icon library — no Lucide, no Heroicons, no Material Icons.
5. **No third-party component libraries.** No Tailwind, MUI, shadcn, Radix, Bootstrap, Ant Design, Chakra. T1's only runtime deps are React + ReactDOM + Babel Standalone + Phosphor.

See `CLAUDE.md` § "How to build a complex component" for the full extraction recipe.

---

## Worked example

**Prompt:** *"Add an AI response that suggests three vehicles with a 'View details' button on each."*

1. **Decision ladder:** AI message in thread → `<Response>` frame containing domain cards.
2. **Component lookup:** "vehicle / listing" → `<ListingCard>`. "View details button" → `<Button>`. Both exist in the kit — read `ui_kit/docs/ListingCard.md` and `ui_kit/docs/Button.md` before writing JSX.
3. **Fork:** copy `ui_kit/template/chat-interface.html` → `Vehicle Suggestion Response.html` in the project root. Fix all asset paths per the path table above.
4. **Pre-seed** `messages` state so the response displays immediately on load.
5. **Compose** inside a new `RESPONSES` entry and route via `matchResponse()`:
   ```jsx
   "vehicle-suggestion": (
     <Response>
       <ListingCard
         title="2023 Tesla Model Y"
         actions={<Button variant="contained" color="primary" size="md">View details</Button>}
       />
       <ListingCard ... />
       <ListingCard ... />
     </Response>
   ),
   ```
6. **Rebuild and verify:** `node dev.js --build`, then open `http://localhost:3030/Vehicle Suggestion Response.html`.

No shell was written. No card was rebuilt from `<div>`s. Three `<ListingCard>` instances were composed inside a `<Response>` inside the fork.

---

## Token quick-reference

Every value must come from these tokens. Never hardcode a hex, px value, or named color.

### Colors

| Token | Value | Use |
|---|---|---|
| `$t1-neutral-0` | rgb(255,255,255) | Surface white |
| `$t1-neutral-50` | rgb(244,245,246) | App canvas |
| `$t1-neutral-200` | rgb(212,213,214) | Default border |
| `$t1-neutral-500` | rgb(109,112,122) | Secondary text |
| `$t1-neutral-900` | rgb(22,22,22) | Primary text |
| `$t1-blue-400` | rgb(66,133,244) | Brand / primary action |
| `$t1-violet-500` | rgb(138,56,245) | T1 brand mark only — not a general accent |
| `$t1-green-500` | rgb(6,188,117) | Success |
| `$t1-amber-400` | rgb(255,178,60) | Warning |
| `$t1-red-400` | rgb(245,47,29) | Error / danger (primary error) |
| `$t1-red-500` | rgb(214,37,8) | Error pressed / darker variant |
| `$t1-red-600` | rgb(160,27,5) | Assistive error text (below error fields) |

### Semantic aliases — prefer over primitives

| Token | Resolves to | Use |
|---|---|---|
| `$t1-fg` / `$t1-fg-muted` / `$t1-fg-subtle` | neutral 900 / 500 / 400 | Text hierarchy |
| `$t1-bg` / `$t1-bg-canvas` / `$t1-bg-brand` / `$t1-bg-brand-soft` | neutral 0 / 50 · blue 400 / 50 | Backgrounds |
| `$t1-border` / `$t1-border-strong` / `$t1-border-focus` | neutral 200 / 400 · blue 400 | Borders |

### Spacing — 4 px grid

`$t1-space-1` (4 px) · `$t1-space-2` (8 px) · `$t1-space-3` (12 px) · `$t1-space-4` (16 px) · `$t1-space-5` (20 px) · `$t1-space-6` (24 px) · `$t1-space-8` (32 px).

Note: `$t1-space-7` (28 px) does not exist in the token scale — skip from `-6` to `-8`. Do not invent `$t1-space-7`.

### Radii

`$t1-radius-xs` 2 px (buttons, inputs, badges, **chat bubbles, prompt composer, modals, cards, and most domain content** — workhorse) · `$t1-radius-pill` 9999 px (chips, avatars, status dots) · `50%` (circular avatars, icon buttons; not a token, applied directly) · `24px` (FAB rounded-square; Figma-locked, not a token). `$t1-radius-md` 8 px and `$t1-radius-lg` 12 px exist as tokens but are not currently consumed by any kit component.

Chat bubbles (user side) use asymmetric radius `2px 2px 0 2px` to create the tail effect — this is not a token; apply it directly in the component SCSS.

### Type

`$t1-font-sans` (Proxima Nova). Weights: 300 (light) / 400 (regular) / 500 (medium) / 600 (semibold).

### Shadows & gradient

`$t1-shadow-soft` · `$t1-shadow-card` · `$t1-shadow-pop` · `$t1-shadow-toast` · `$t1-shadow-fab`.

`$t1-gradient-brand` — reserved for the AI send / generate button only. Do not use on any other element. Fetch the real gradient stop values from `tokens.scss` — do not guess them from prose.

---

## Brand essentials

- **Type:** Proxima Nova only (OTFs in `fonts/`).
- **Gradient:** `$t1-gradient-brand` on the AI send / generate button only — no other gradients anywhere.
- **Violet** (`$t1-violet-*`) is the T1 brand mark only — never a general accent color.
- **Icons:** Phosphor only via `<Phi name="…" size weight="regular|bold|fill">` — no emoji, no unicode glyphs, no Lucide, no Heroicons, no Material Icons, no inline `<svg>`.
- **Radii:** see token quick-reference above; user-side chat bubbles use asymmetric `2px 2px 0 2px`.
- **Motion:** 150 ms ease-out on hover · 200 ms ease-in-out on modal / sheet enter · no bounce, no spring. Loading spinners on `<Button loading>` only.
- **Hover ramp:** background steps one shade down the neutral ramp (e.g., neutral-100 → neutral-150); button fills darken ~8%.
- **Copy casing:** Title Case for buttons and form labels (single imperative word where possible — `Save`, `Cancel`, `Delete`); sentence case for values, states, and chip labels (no trailing punctuation).
- **Voice:** second person, imperative button verbs, lowercase greeting "Hi {name},". Avoid "I" except in the assistant greeting ("How can I help you today?"). No emoji.

---

## The inviolable rules

1. **All visual output starts from `ui_kit/template/chat-interface.html`.** Every task forks the canonical template into the project root with a descriptive filename, fixes the asset paths per the path table above, pre-seeds state, and adds entries to `RESPONSES`. Never build standalone HTML pages from scratch. No separate `.jsx` / `.tsx` / `.js` files. No external canvas or standalone document output. Only exception: authoring a brand-new kit primitive at `ui_kit/components/<NewComponent>/` — which must still be demonstrated inside a fork of `chat-interface.html`.
2. **Never rebuild the shell.** `<AppBar>`, `<NavBar>`, `<SideNavigation>`, `<GlobalSearch>`, `<PromptInput>`, `<FabIcon>` are assembled and locked. Edit only the chat-thread content zone.
3. **Compose with kit primitives — never raw HTML.** Button → `<Button>`, icon → `<Phi>`, link → `<Link>`, divider → `<Seperator>`, badge / chip / avatar → `<Badge>` / `<Chip>` / `<Avatar>`. Raw HTML elements (`<button>`, `<a>`, `<input>`) are allowed only when defining a new kit primitive itself.
4. **Never hardcode a hex / rgb / named color.** Colors come from `$t1-*` (SCSS) or `var(--t1-*)` (CSS / inline). Same rule applies to spacing, radii, type sizes, and shadows.
5. **No inline styles for design tokens.** `style={{ color: '#fff', padding: '12px' }}` belongs in SCSS. Inline `style` is allowed only for truly dynamic runtime values (e.g., `width: ${pct}%`).
6. **Unique BEM prefix per component.** Pattern: `t1-<slug>__<element>--<modifier>`. Never reuse another component's prefix.
7. **No third-party UI libraries.** No Tailwind, MUI, shadcn, Bootstrap, Radix, Ant Design, Chakra, Emotion, styled-components. Icons are Phosphor only (via `<Phi>`) — no Lucide, no Heroicons, no Material Icons. T1's only runtime deps are React + ReactDOM + Babel Standalone + Phosphor.
8. **Read the component spec before writing code.** Use the `Read` tool on `ui_kit/docs/SYSTEM.md` and `ui_kit/docs/INDEX.md` first; then `ui_kit/docs/<ComponentName>.md` for every component the task touches. Do not rely on memory of previous sessions.
9. **Rebuild after every change.** Run `node dev.js --build` after editing any `.jsx` or `.scss` partial — bundles do not regenerate themselves.
10. **Figma is the source of truth for design values.** Fetch the node via the Figma MCP before writing styles. Token values, sizes, radii, spacing, and colors must come from the Figma design — never guessed.
11. **Brand essentials.** Proxima Nova only · `$t1-gradient-brand` on AI send button only (fetch values from `tokens.scss`) · violet is T1 brand mark only · Phosphor icons only via `<Phi>` · radii per token table (asymmetric `2px 2px 0 2px` on user chat bubbles) · motion 150 ms hover / 200 ms modal · Title Case for buttons and labels, sentence case for values and chips · second person, lowercase greeting "Hi {name},". See *Brand essentials* above for the full list.
13. **Never modify `.ts-menubar` or `.ts-body` in any fork.** `.ts-menubar` is the 64px dark platform top bar (logo, global search, nav actions). `.ts-body` is the outer flex container holding the favbar, main content, and AI panel. Their CSS, dimensions, structure, and children must remain exactly as they are in the canonical template. Do not add, remove, or restyle anything inside these zones.
14. **Build outside the kit, never outside the system.** If a component doesn't exist in `ui_kit/components/`, you are still fully bound to the T1 Design System. Compose it from `$t1-*` tokens and existing kit atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, domain cards, etc.). A missing component is never a licence to reach for a third-party library, hardcode a value, or hand-roll unstyled raw HTML. Rules 3, 4, 5, and 7 apply regardless of whether the component is in the kit. See *When a component is missing* above for the build ladder.
12. **"Pull latest" fully updates the kit, the canonical template, and every forked file.** When a user runs "pull latest" or "pull updates from the library" in a downstream project, execute this procedure in order:

    **Step 1 — Update kit assets.** Sync from the T1 Design System source: `ui_kit/components.css`, `ui_kit/components.jsx`, `ui_kit/components/`, `ui_kit/loader.js`, `ui_kit/template/chat-interface.html`, `ui_kit/docs/`, `colors_and_type.css`, `tokens.scss`, `fonts/`, `assets/`, and (Claude Code projects only) `.claude/`.

    **Step 2 — Identify all forks.** Find every `.html` file at the project root that is not inside `ui_kit/`. These are the project's forked design files.

    **Step 3 — For each fork, preserve-and-rebuild:**
    1. Extract project-specific content: the `RESPONSES` object, pre-seeded `messages` and `panelState`, and any custom `matchResponse()` routing.
    2. Replace the fork's full content with the updated `ui_kit/template/chat-interface.html`.
    3. Rewrite asset paths from template-relative to project-root-relative (per the path table in *The forking workflow* above).
    4. Re-inject the extracted `RESPONSES`, pre-seeded state, and routing. **The `RESPONSES` JSX code is never modified during a pull.** However, every kit component referenced inside `RESPONSES` (e.g. `<ListingCard>`, `<Button>`, `<Response>`) is automatically updated because `ui_kit/components.jsx` and `ui_kit/components.css` were fully replaced in Step 1 — the component implementations update without any change to the `RESPONSES` code.
    5. Confirm the fork loads and design content is intact.

    **On first pull (no forks exist yet):** place a pre-forked copy of `chat-interface.html` at the project root with the starter comment from *Pre-forked starter pattern* and fix the asset paths.

    The result: every fork has the latest shell, styles, and kit structure; all project-specific design content is fully preserved.

For Claude Code projects, rule 1 is hard-enforced by `.claude/hooks/enforce-chat-interface.js` — a `PreToolUse` hook that blocks any HTML write outside `ui_kit/template/chat-interface.html`. This hook has no effect in other hosts; for those, rule 1 is advisory and lives in this file plus `CLAUDE.md`.

---

When in doubt: **run the decision ladder, find the kit component, compose inside the fork**. Don't re-create.
