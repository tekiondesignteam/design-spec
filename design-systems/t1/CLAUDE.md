# STOP — READ BEFORE ANY EDIT

1. Every design task forks `ui_kit/template/chat-interface.html`. No exceptions, even for "simple" or "isolated" asks.
2. Never write a new HTML file from scratch.
3. If you think your task is the exception, ask the user before deviating.

**Self-check before your first file write (Edit / Write tool call):** answer in your own words — *"Am I forking `chat-interface.html`? If not, why is this the documented exception?"* If you can't cite the exception, you're about to break rule 1.

---

# CLAUDE.md — T1 Design System

Orientation for any AI agent working in this repo. Read before making changes.

---

## What this repo is

T1 Design System is the production React component library for the **Tekion T1 AI Sales Assistant** — a chat-based AI panel that floats over the dealer platform.

Three surfaces:

1. **The canonical prototype** at [ui_kit/template/chat-interface.html](ui_kit/template/chat-interface.html) — the single working prototype. Every visual task forks this file. The shell (`AppBar`, `NavBar`, `SideNavigation`, `GlobalSearch`, `PromptInput`, `FabIcon`) is already assembled here. Only the chat-thread content zone is yours to edit.
2. **The component library** at [ui_kit/components/](ui_kit/components/) — 45 components, one folder per component. Compiled by `dev.js` to `ui_kit/components.css` + `ui_kit/components.jsx`.
3. **The component docs** at [ui_kit/docs/](ui_kit/docs/) — one `.md` spec per component plus `SYSTEM.md` (system context) and `INDEX.md` (fast component lookup). Read these before writing code.

**Tech stack:** React 18 UMD + SCSS + Proxima Nova + **Phosphor Icons** via the `<Phi>` wrapper + Babel Standalone. Browser-only runtime — no npm, no webpack, no build step required to ship. `dev.js` compiles the SCSS partials and JSX into the two bundle files.

**Coverage note:** the kit has 45 component folders. The top ~15 highest-usage components (Button, Phi, Response, ChatContainer, ChatBubble, ListingCard, DealCard, SuggestionList, Input-Text, Modal, Dropdown, Avatar, Badge, Chip, Welcome) are implemented at pixel fidelity. The remaining ~30 are documented in `ui_kit/docs/<Component>.md` but may be partial implementations or stubs — always read the spec and the `.jsx` source before composing with a less-common component. The Figma file has 48 component pages; the 3-page gap represents components not yet promoted to the kit.

**Related files:**
- `README.md` — brand fundamentals, visual foundations, iconography rules.
- `SKILL.md` — operator guide for AI agents using this design system as a skill. It is not a mirror of this file; it serves a different audience (operational agent guidance vs. this file's engineering detail).

---

# Project conventions

## Always start from chat-interface.html

For ANY design or prototype work involving the T1 AI assistant — including single responses, follow-up turns, new message types, suggestion variations, panel states, isolated component demos, or "simple" / "quick" mocks — you MUST copy `ui_kit/template/chat-interface.html` into the project root as a new file and edit that copy.

This is NON-NEGOTIABLE. Do not build standalone HTML pages that recreate or substitute parts of the T1 chat UI from scratch, even when the ask sounds like it only needs a small isolated piece. The template carries the Tekion shell, AI panel docking states, the full `RESPONSES` catalog, streaming behavior, and all in-context interactions. Any new design must live inside a fork of it.

### Workflow

1. Copy `ui_kit/template/chat-interface.html` into the project root as **`index.html`** — spec-driven projects ship one `index.html` per `projects/<name>/`, so it serves at the folder root. If you genuinely need multiple forks in one project, name the extras **kebab-case, no spaces, no leading `_`** (e.g. `focus-today-response.html`). Keep the human-readable title in `<title>` / the NavBar, not the filename.
2. Fix the relative asset paths. The template lives at `ui_kit/template/`, so its internal paths must be rewritten once the fork is at the project root:

   | Asset | Path in template | Path in fork |
   |---|---|---|
   | Color + type tokens | `../colors_and_type.css` | `colors_and_type.css` |
   | Kit CSS bundle | `../components.css` | `ui_kit/components.css` |
   | Component manifest | `../components/manifest.js` | `ui_kit/components/manifest.js` |
   | Kit loader | `../loader.js` (`data-base="../ui_kit/"`) | `ui_kit/loader.js` (`data-base="ui_kit/"`) |
   | Fonts | `../../fonts/Proxima-Nova-*.otf` | `fonts/Proxima-Nova-*.otf` |

3. Pre-seed `messages` state and/or `panelState` to land the user directly on the scenario being designed, instead of forcing them to type a prompt.
4. Add new responses to the `RESPONSES` object and route them via `matchResponse()` rather than building one-off rendering logic.
5. Only add new top-level UI outside the AI panel if the ask explicitly requires it.

### When to ask before forking

If the user's ask genuinely seems to NOT involve the T1 chat surface (e.g. "design a marketing landing page", "make a slide deck"), confirm with one question before deviating from this rule.

### Pre-forked starter pattern (project-setup convention)

Consumer projects scaffolded for T1 design work SHOULD ship with a pre-forked copy of `chat-interface.html` already at the project root, with this top-of-file comment:

```html
<!-- T1 Design System starter. This is your starting point.
     For a single design task: edit in place.
     For multi-task projects: copy this file to a descriptive filename
     (e.g., `focus-today-response.html`) and edit the copy.
     Do not build new HTML files from scratch. -->
```

Required by rule 12 (pull-latest). Eliminates the most common rule-1 ambiguity — *there is nothing to fork because it's already forked.* If you find yourself in a project WITHOUT a pre-fork at the root, fork the canonical template per the Workflow above before doing anything else.

### The "simple followup" trap

When a user asks for *"just a simple response"*, *"a quick followup"*, *"an isolated component demo"*, or *"a small mock"* — the temptation is to build a small standalone page. **This is the most common rule-1 violation.** The correct response to *"simple"* is **fewer entries in the `RESPONSES` object inside the forked template, not a smaller file**.

If you find yourself thinking *"this is too small / too isolated to fork the whole template,"* that thought itself is the trap signal — fork anyway. The fork is cheap; the violation is expensive.

---

## Intent-to-component mapping (do this before writing code)

Every request is 90% a composition problem. Before touching any file, map what the user is describing to the kit components that already exist. Walk the decision ladder first, then use the tables to find the specific component.

### Decision ladder

Walk through the request in this order — the **first box that fires wins**:

1. **Is it a conversational message?** → use a frame from the Conversational frames table (`<Response>`, `<ChatBubble>`, `<Welcome>`, `<MessageDraft>`, `<ReasoningLog>`).
2. **Is it a rich content block in the thread?** → use a domain card from the Domain cards table.
3. **Is it an overlay?** → `<Modal>` (centered dialog) or `<NotificationBannerToast>` (corner toast).
4. **Is it inline?** → reach for atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, etc.) and compose inline.
5. **Still no match?** → see *How to build a complex component* below. Default: build it inline in `chat-interface.html` first; only extract to the kit once it's needed in a second place.

For every entry in the tables below: the work goes inside the chat-thread content zone of `chat-interface.html`. Never rebuild the shell.

### Conversational frames (message containers)

| User says… | Component | Notes |
|---|---|---|
| "AI response", "assistant message", "chat reply" | `<Response>` inside `<ChatContainer>` | Standard AI message frame |
| "user message", "user said X", "user bubble" | `<ChatBubble>` | User-side bubble |
| "welcome", "greeting", "first run", "intro" | `<Welcome>` | Empty / initial state |
| "draft", "editable response", "message draft" | `<MessageDraft>` | Editable AI output |
| "reasoning", "thinking", "step-by-step log" | `<ReasoningLog>` | Collapsible thinking |
| "suggestions", "follow-ups", "next actions" | `<SuggestionList>` | Tappable next actions |
| "feedback", "thumbs up/down" | `<FeedbackAction>` | Inline reaction row |
| "quote", "blockquote" | `<Quote>` | Quoted content |

### Domain cards (rich content blocks)

| User says… | Component |
|---|---|
| "deal card", "deal summary" | `<DealCard>` |
| "vehicle", "listing", "car card", "inventory" | `<ListingCard>` |
| "task", "task card", "todo" | `<TaskCard>` |
| "tip", "did you know" | `<TipCard>` |
| "credit score", "credit summary" | `<CreditScoreCard>` |
| "document", "doc card", "file" | `<DocumentCard>` |
| "conversation history", "previous chat" | `<ConversationHistoryCard>` |
| "planner", "schedule", "calendar" | `<PlannerCard>` |
| "set reminder", "notify me" | `<NotifyMyCard>` |
| "completion", "wrap-up", "task done" | `<CompletionCard>` |

### Overlays & inline controls

| User says… | Component |
|---|---|
| "modal", "dialog", "confirm", "popup" | `<Modal>` |
| "dropdown", "select", "picker", "menu" | `<Dropdown>` |
| "toast", "banner", "snackbar" | `<NotificationBannerToast>` |
| "in-thread search" (NOT the global AI search — that's locked shell) | `<Search>` |
| "empty state", "no results", "nothing yet" | `<Empty>` |
| "input", "text field", "type here" | `<InputText>` |
| "button", "action", "CTA" | `<Button>` |
| "icon button", "square icon action" | `<IconButton>` |
| "AI send", "generate", "gradient send button" | `<GradientIconButton>` |
| "favorites bar" | `<FavBarIcon>` |

### Atoms

| User says… | Component |
|---|---|
| "icon", "phosphor icon" | `<Phi name="…" size weight />` |
| "avatar", "user picture" | `<Avatar>` |
| "badge", "count", "status pill" | `<Badge>` |
| "chip", "tag", "filter pill" | `<Chip>` |
| "switch", "toggle" | `<Switch>` |
| "checkbox" | `<Checkbox>` |
| "link", "anchor" | `<Link>` |
| "divider", "rule", "horizontal line" | `<Seperator>` (typo retained — doc file is `Separator.md`) |
| "progress", "loading bar" | `<ProgressBar>` |
| "interactive icon", "stateful tappable icon" | `<InteractiveIcon>` |

### Shell — already in `chat-interface.html`, do not rebuild

`<AppBar>` · `<NavBar>` · `<SideNavigation>` · `<GlobalSearch>` · `<PromptInput>` · `<FabIcon>`

### Tweaking vs replacing

The request will almost always be *"take this and change X"*, not *"design something new"*. Treat these as **prop edits**:

- "Make this button red" → `<Button color="error">`, not a styled `<button>`.
- "4 suggestions instead of 3" → add an item to the `items` array, not a rebuild.
- "Different icon on the button" → change the `iconStart` prop, not an inline `<svg>`.
- "Modal needs a destructive variant" → keep `<Modal>`, change footer `<Button color="error">`.
- "Card needs to be bigger" → SCSS rule using `$t1-space-*`, not `<div style={{ padding: 32 }}>`.

Resist the urge to hand-roll a styled `<div>` when a prop edit would do.

### IDEA → component patterns

T1's behavioral model — **Inform, Decide, Execute, Ask** — maps directly onto chat-thread component combinations. When you've identified the component family from the catalogue above, the IDEA stage tells you which *combination* of components to compose, not just which single component to drop in.

| IDEA stage | What it is | Chat-thread pattern |
|---|---|---|
| **Inform** | T1 proactively surfaces information before the user asks (priority briefings, alerts, deferred opportunities, anomalies) | `<Response>` containing one or more domain cards (`<ListingCard>`, `<DealCard>`, `<TaskCard>`, etc.); `<Welcome>` for first-run / empty state |
| **Decide** | T1 recommends with reasoning; human reviews and approves | `<Response>` + `<ReasoningLog>` (collapsible "why") + `<SuggestionList>` (approve / modify / decline actions) |
| **Execute** | T1 acts on the approved instruction; human-in-the-loop on consequential actions; full audit trail | `<MessageDraft>` (editable preview before send) → `<CompletionCard>` (acted state) and / or `<NotificationBannerToast>` (audit confirmation) |
| **Ask** | Human explores; asks follow-up questions; feeds the next Inform cycle | `<ChatBubble>` (user-side) → kicks off the next response cycle |

The cycle repeats throughout a thread — Inform → Decide → Execute → Ask → Inform… A complete chat conversation usually composes several IDEA stages in sequence, each rendered as its own message.

**Single-thread example:**

1. **Inform:** AI greets with a `<Response>` containing 3 priority `<TaskCard>` items.
2. **Ask:** User taps a card, sends a `<ChatBubble>` *"What's the status on this one?"*
3. **Decide:** AI replies with a `<Response>` + `<ReasoningLog>` ("3 vehicles in service, 1 awaiting parts") + `<SuggestionList>` (Reschedule / Notify customer / Escalate).
4. **Execute:** User picks *"Notify customer."* AI shows a `<MessageDraft>` of the SMS for review → user approves → `<CompletionCard>` confirms it sent.

### Worked example: "Add an AI response that suggests three vehicles with a 'View details' button on each"

1. **Intent type:** AI message in thread → `<Response>` frame containing domain cards.
2. **Component lookup:** "vehicle / listing" → `<ListingCard>`. "View details button" → `<Button>`. Read `ui_kit/docs/ListingCard.md` and `ui_kit/docs/Button.md` before writing JSX.
3. **Fork the template:** copy `ui_kit/template/chat-interface.html` into the project root as `Vehicle Suggestion Response.html`. Fix all asset paths per the table in the Workflow section above.
4. **Pre-seed `messages` state** so the new response shows immediately when the fork loads, without forcing the user to type a prompt.
5. **Add a new entry to `RESPONSES`** and route it via `matchResponse()`:
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
6. **Rebuild & verify:** `node dev.js --build` then open `http://localhost:3030/Vehicle Suggestion Response.html` in the browser — not the canonical template URL.

You did not write a shell, a top bar, a side panel, a layout container, or a card from scratch. You forked the canonical template, fixed paths, pre-seeded one state, and added three `<ListingCard>` instances inside a new `RESPONSES` entry.

### Sample scenarios for pre-seeding `messages` state

When forking `chat-interface.html`, pre-seed the `messages` state with content that lands the user directly on the design scenario. Use the scenarios below as starting templates — substitute your own data, but preserve the component combinations. Each one exercises a different IDEA stage (or sequence) from the patterns table above.

#### Scenario 1 — Service Advisor morning briefing (Inform)
**Context:** Service Advisor logs in. T1 surfaces the day's priority appointments and deferred upsell opportunities before any manual search.
**Components:** `<Welcome name="Sam," />` → `<Response>` containing 3 `<TaskCard>` items (priority appointments) + 2 `<ListingCard>` items (deferred upsell opportunities).

#### Scenario 2 — Cross-department revenue moment (Inform → Decide)
**Context:** Customer texts *"Is my car ready?"* T1 doesn't just answer — it cross-references service status, equity position, current inventory, and active promotions in a single response.
**Components:** `<ChatBubble>` ("Is my car ready?") → `<Response>` containing a status line + a `<CreditScoreCard>` (equity position) + a matching `<ListingCard>` (inventory) + `<SuggestionList>` ("Mention trade-in" / "Send pickup time" / "Skip").

#### Scenario 3 — Parts Advisor voice lookup (Ask → Inform)
**Context:** Parts advisor in the bay asks by voice: *"Do we have a front brake pad set for a 2020 RAM 1500?"*
**Components:** `<ChatBubble>` (the voice query) → `<Response>` with the part record (in-stock `<Badge>`, bin location, list price). If out-of-stock: a second `<Response>` with `<DocumentCard>` rows showing cross-source availability across OEM and aftermarket portals.

#### Scenario 4 — Sales Manager team pipeline (Inform)
**Context:** Sales Manager logs in. T1 has already analyzed the team's pipeline by rep, stage, value, and velocity — surfacing at-risk deals.
**Components:** `<Welcome>` → `<Response>` containing a stack of `<DealCard>` items grouped by stage, each annotated with a risk `<Badge>`.

#### Scenario 5 — Controller month-close alert (Inform → Decide)
**Context:** Controller logs in mid-month-end. T1 surfaces an AR aging exception that needs attention.
**Components:** `<Response>` + `<ReasoningLog>` (why this alert fired) + `<SuggestionList>` ("Send reminder" / "Escalate to manager" / "Mark for review").

#### Scenario 6 — Dispatcher Smart Dispatch recommendation (Decide → Execute)
**Context:** Dispatcher reviewing tech assignments. T1 recommends a tech with visible reasoning — not a black box.
**Components:** `<Response>` + `<ReasoningLog>` (skill match + historical completion data + current load) + `<SuggestionList>` (Approve / Reassign / Override) → on approve, `<CompletionCard>` confirming the dispatch.

Each scenario keeps the IDEA stage explicit so the agent can adapt the same combination to a different persona or domain card without re-deriving the structure.

---

## File layout

```
T1 Design System/
├── CLAUDE.md                       ← THIS FILE — engineering guide and binding rules
├── SKILL.md                        ← operator guide for AI agents using the skill
├── README.md                       ← brand fundamentals and visual foundations
├── colors_and_type.css             ← CSS custom properties + Proxima Nova @font-face
├── tokens.scss                     ← SCSS $t1-* variables — every design value lives here
├── dev.js                          ← single dev script (build / watch / serve)
├── fonts/                          ← Proxima Nova OTFs (Thin → Black, italics)
├── assets/                         ← logos, brand assets
├── .claude/
│   ├── settings.json               ← Claude Code hook config (no effect in other hosts)
│   └── hooks/enforce-chat-interface.js   ← PreToolUse hook (Claude Code only)
└── ui_kit/
    ├── components.css              ← compiled CSS bundle — never edit by hand
    ├── components.jsx              ← compiled JSX bundle — never edit by hand
    ├── kit.css                     ← shared kit-level styles
    ├── loader.js                   ← runtime loader (React + manifest)
    ├── _core.jsx                   ← <Phi> icon primitive lives here
    ├── components/
    │   ├── manifest.js             ← canonical component registry — order = dependency order
    │   ├── App-Bar/  Nav-Bar/  Side-Navigation/  Global-Search/  Prompt-Input/  FAB-Icon/  ← shell (locked)
    │   ├── Avatar/  Badge/  Button/  Checkbox/  Chip/  Dropdown/  Empty/
    │   ├── Icon-Button/  Input-Text/  Interactive-Icon/  Link/  Modal/
    │   ├── Progress-Bar/  Seperator/  Switch/
    │   ├── Chat-Bubble/  Chat-Container/  Response/  Welcome/
    │   ├── Suggestion-List/  Reasoning-Log/  Message-Draft/  Quote/
    │   ├── Search/  Feedback-Action/  Notification-Banner-Toast/
    │   ├── Gradient-Icon-Button/  Fav-Bar-Icon/
    │   ├── Deal-Card/  Listing-Card/  Task-Card/  Tip-Card/
    │   ├── Credit-Score-Card/  Document-Card/  Conversation-History-Card/
    │   ├── Planner-Card/  Notify-My-Card/  Completion-Card/
    │   └── REGEN.md
    ├── docs/
    │   ├── INDEX.md                ← read first to find a component
    │   ├── SYSTEM.md               ← read first for system context
    │   └── <ComponentName>.md      ← one per component
    └── template/
        └── chat-interface.html     ← THE CANONICAL PROTOTYPE — every visual task forks this
```

---

## Dependency model

`chat-interface.html` loads `loader.js` (with `data-base="../ui_kit/"`); `loader.js` reads `manifest.js` and dynamically loads every component in declared order. The manifest order IS the dependency order — `_core` (`<Phi>`) loads first, atoms next, composites last.

What this means in practice:
- You almost never edit `loader.js` or `manifest.js` order.
- When adding a new component, register it in `manifest.js` after everything it depends on.
- After ANY `.jsx` or `.scss` change, run `node dev.js --build` so the bundles regenerate. Without rebuild, your change does not appear in any fork of `chat-interface.html`.

---

## Tokens — the only place values live

**Rule:** every color, font, size, spacing, radius, shadow, and motion value lives in [tokens.scss](tokens.scss) (SCSS) and [colors_and_type.css](colors_and_type.css) (CSS custom properties). No exceptions.

### Consuming tokens

| Surface | How | Example |
|---|---|---|
| Component SCSS partial | `$t1-*` | `color: $t1-fg` |
| Plain CSS / `<style>` blocks | `var(--t1-*)` | `color: var(--t1-fg)` |
| JSX `style={{}}` (only for truly dynamic runtime values) | CSS variable bridge | `style={{ '--progress': pct }}` |

### Token quick-reference

Real values from `tokens.scss` — open the file for the complete list.

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

Semantic aliases — prefer over primitives for component styling:

| Token | Resolves to | Use |
|---|---|---|
| `$t1-fg` / `$t1-fg-muted` / `$t1-fg-subtle` | neutral 900 / 500 / 400 | Text hierarchy |
| `$t1-bg` / `$t1-bg-canvas` / `$t1-bg-brand` / `$t1-bg-brand-soft` | neutral 0 / 50 · blue 400 / 50 | Backgrounds |
| `$t1-border` / `$t1-border-strong` / `$t1-border-focus` | neutral 200 / 400 · blue 400 | Borders |

Spacing — 4 px grid: `$t1-space-1` (4 px) · `$t1-space-2` (8 px) · `$t1-space-3` (12 px) · `$t1-space-4` (16 px) · `$t1-space-5` (20 px) · `$t1-space-6` (24 px) · `$t1-space-8` (32 px). Note: `$t1-space-7` (28 px) does not exist in the scale — jump from `-6` to `-8`. Do not invent `$t1-space-7`.

Radii: `$t1-radius-xs` 2 px · `$t1-radius-md` 8 px · `$t1-radius-lg` 12 px · `$t1-radius-pill` 9999 px.
Type: `$t1-font-sans` (Proxima Nova). Weights 300 / 400 / 500 / 600.
Shadows: `$t1-shadow-soft` / `-card` / `-pop` / `-toast` / `-fab`.
Reserved gradient: `$t1-gradient-brand` — AI send / generate button only. Fetch exact stop values from `tokens.scss`.

### Adding a new token

1. Add the SCSS variable to the appropriate section of [tokens.scss](tokens.scss) (primitives → semantic → component-level).
2. Add the matching CSS custom property to [colors_and_type.css](colors_and_type.css).
3. Reference it from your component's `.scss` partial.

**Never:**
- Hardcode `#ffffff` / `rgb(0,0,0)` / `red` / `12px` in any SCSS file. Use a token.
- Hardcode color in a JSX `style={{}}`. Move it to SCSS or use a CSS-variable bridge.
- Define the same token in two places without keeping them in sync. `tokens.scss` mirrors `colors_and_type.css` 1:1.

---

## Components — the only place components live

**Rule:** every reusable component lives in [ui_kit/components/](ui_kit/components/). `chat-interface.html` **composes** components; it does not define them.

### Canonical sources

| You need… | Use | Source |
|---|---|---|
| Button | `<Button variant="contained\|outlined\|text" color="primary\|neutral\|error" size="lg\|md\|sm" iconStart iconEnd>` | `ui_kit/components/Button/` |
| Icon-only button | `<IconButton>` | `ui_kit/components/Icon-Button/` |
| AI send / generate (reserved gradient) | `<GradientIconButton>` | `ui_kit/components/Gradient-Icon-Button/` |
| Anchor / inline link | `<Link appearance="primary\|neutral" size>` | `ui_kit/components/Link/` |
| Status / count chip | `<Badge>` | `ui_kit/components/Badge/` |
| User avatar | `<Avatar>` | `ui_kit/components/Avatar/` |
| Selectable tag pill | `<Chip>` | `ui_kit/components/Chip/` |
| Toggle on/off | `<Switch>` | `ui_kit/components/Switch/` |
| Boolean checkbox | `<Checkbox>` | `ui_kit/components/Checkbox/` |
| Text field | `<InputText>` | `ui_kit/components/Input-Text/` |
| Horizontal/vertical divider | `<Seperator>` | `ui_kit/components/Seperator/` |
| Progress bar | `<ProgressBar>` | `ui_kit/components/Progress-Bar/` |
| Tappable icon with hover/active | `<InteractiveIcon>` | `ui_kit/components/Interactive-Icon/` |
| Centered overlay dialog | `<Modal>` | `ui_kit/components/Modal/` |
| Select / menu | `<Dropdown>` | `ui_kit/components/Dropdown/` |
| Empty-state placeholder | `<Empty>` | `ui_kit/components/Empty/` |
| Stroke icon | `<Phi name="…" size={n} weight="regular\|bold\|fill" />` | `ui_kit/_core.jsx` |
| AI message frame | `<Response>` inside `<ChatContainer>` | `ui_kit/components/Response/`, `Chat-Container/` |
| User message bubble | `<ChatBubble>` | `ui_kit/components/Chat-Bubble/` |
| Welcome / first-run state | `<Welcome>` | `ui_kit/components/Welcome/` |
| Editable AI output | `<MessageDraft>` | `ui_kit/components/Message-Draft/` |
| Collapsible thinking log | `<ReasoningLog>` | `ui_kit/components/Reasoning-Log/` |
| Tappable follow-up actions | `<SuggestionList>` | `ui_kit/components/Suggestion-List/` |
| Inline reaction row | `<FeedbackAction>` | `ui_kit/components/Feedback-Action/` |
| Quoted snippet | `<Quote>` | `ui_kit/components/Quote/` |
| In-thread search (not global) | `<Search>` | `ui_kit/components/Search/` |
| Toast / banner | `<NotificationBannerToast>` | `ui_kit/components/Notification-Banner-Toast/` |
| Favorites bar | `<FavBarIcon>` | `ui_kit/components/Fav-Bar-Icon/` |
| Domain cards | `<DealCard>`, `<ListingCard>`, `<TaskCard>`, `<TipCard>`, `<CreditScoreCard>`, `<DocumentCard>`, `<ConversationHistoryCard>`, `<PlannerCard>`, `<NotifyMyCard>`, `<CompletionCard>` | `ui_kit/components/<CardName>/` |
| Locked shell — already assembled in `chat-interface.html` | `<AppBar>`, `<NavBar>`, `<SideNavigation>`, `<GlobalSearch>`, `<PromptInput>`, `<FabIcon>` | shell — do not rebuild |

### Naming convention

Components live in `Hyphen-Cased/` folders, exposed in JSX as `PascalCase`. Follow the existing manifest. Do not introduce alternate names like `Btn`, `T1Button`, `Drawer` (substitute for `Modal`), `LeftNav` (substitute for `SideNavigation`). If an existing component needs a new variant, add a prop — don't fork.

### Domain cards: prefer the existing card over hand-rolling

If a request involves vehicles, deals, tasks, tips, credit data, documents, conversation history, planning, notifications, or completions, there is a domain card for it. Use it. Hand-rolling a card from `<div>`s with custom SCSS is the failure mode this kit is designed to prevent.

---

## How to compose by forking `chat-interface.html`

The fork workflow is defined in full in *Project conventions § Workflow* above, including the path correction table. This section provides the composition pattern and examples only.

Your work goes inside the chat-thread content zone of the fork — never inside or replacing the shell. Add new responses to the `RESPONSES` object and route them via `matchResponse()`. Content should read as a tree of kit components, not a pile of `<div>`s with inline styles.

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
  {/* DO NOT re-implement ListingCard inline */}
  <h3>2023 Tesla Model Y</h3>
  <button style={{ background: '#4285F4', color: '#fff' }}>View details</button>
</div>
```

After editing any `.jsx` or `.scss`, rebuild and verify:

```
node dev.js --build
```

Then open the fork in the browser (e.g., `http://localhost:3030/focus-today-response.html`). Do not verify against `http://localhost:3030/template/chat-interface.html` — that URL loads the canonical template, not your fork.

---

## How to build a complex component

> **Rule: build outside the kit, never outside the system.** If a component doesn't exist in `ui_kit/components/`, you are still fully bound to the T1 Design System. Build it from `$t1-*` tokens and existing kit atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, domain cards, etc.). A missing component is never a licence to reach for a third-party library, hardcode a value, or hand-roll raw HTML as a workaround. The constraint doesn't change — only the assembly location does.

In this order — first match wins:

### A. Can you build it from existing primitives?

Most things are a combination of `<Button>` + `<Phi>` + `<Link>` + `<Chip>` + a domain card + a small layout. If so, compose them inline in the chat-thread content zone of `chat-interface.html`. Do not extract to `ui_kit/components/` until it's needed in a second place.

### B. Is it a new domain card or message frame?

Build a prototype inline in `chat-interface.html` first. Keep it small and named. If after a second use it's clearly a kit primitive, extract it.

### C. Is the same chrome needed in a second place inside the prototype?

Extract to `ui_kit/components/<NewComponent>/`. Any chrome that would be duplicated must live in the kit, not in `chat-interface.html`.

To extract:
1. Create `ui_kit/components/<NewComponent>/<NewComponent>.jsx` and `.scss`.
2. Define the component using kit primitives + `$t1-*` tokens + a unique BEM prefix (e.g., `t1-newcomp__title--bold`).
3. Register in `ui_kit/components/manifest.js` in dependency order.
4. Run `node dev.js --build`.
5. Demonstrate the new component inside a fork of `chat-interface.html`.

### D. Is it a new icon?

Use Phosphor — `<Phi name="…">`. Never inline a raw `<svg>`. Phosphor is the only icon library — no Lucide, no Heroicons, no inline SVG.

### E. Is it a new token / gradient / shadow?

See *Adding a new token* above. Tokens go in `tokens.scss` first, then mirrored to `colors_and_type.css`. Always.

---

## Running locally

From the repo root:

```bash
node dev.js                       # build + watch + both servers (full dev mode)
node dev.js --build               # one-off build: CSS + JSX bundles, then exit
node dev.js --watch               # build + watch (no servers)
node dev.js --prototype           # prototype server only (port 3030)
node dev.js --docs                # docs server only (port 3737)
node dev.js --serve               # both servers, no build/watch
```

Server URLs:
- `http://localhost:3030/template/chat-interface.html` — the canonical prototype (unmodified)
- `http://localhost:3030/<YourFork>.html` — your forked design file (e.g., `focus-today-response.html`)
- `http://localhost:3030/docs/docs-preview.html` — docs preview
- `http://localhost:3030/ui_kit/index.html` — kit component gallery

Always verify against your fork URL, not the canonical template URL.

---

## Brand essentials

These values are non-negotiable. See `README.md` for the full visual foundations narrative and `tokens.scss` for the actual token values.

- **Type:** Proxima Nova only (OTFs in `fonts/`). No system fonts.
- **Gradient:** `$t1-gradient-brand` on the AI send / generate button only — no other gradients anywhere. Fetch exact stop values from `tokens.scss`.
- **Violet** (`$t1-violet-*`) is the T1 brand mark only — never a general accent color.
- **Icons:** Phosphor only via `<Phi name="…" size weight="regular|bold|fill">` — no emoji, no unicode glyphs, no Lucide, no Heroicons, no Material Icons, no inline `<svg>`.
- **Radii:** `$t1-radius-xs` 2 px is the workhorse — buttons, inputs, badges, **chat bubbles**, cards, composer, modals all use it. `$t1-radius-pill` 9999 px for chips, avatars, status dots. `50%` for circular avatars and icon buttons. `24px` for the FAB rounded-square (Figma-locked component-level value). User-side chat bubbles use asymmetric `2px 2px 0 2px` — apply directly in the component SCSS, not as a token.
- **Motion:** 150 ms ease-out on hover · 200 ms ease-in-out on modal / sheet enter · no bounce, no spring. Loading spinners on `<Button loading>` only.
- **Hover ramp:** background steps one shade down the neutral ramp (e.g., neutral-100 → neutral-150); button fills darken ~8%.
- **Copy casing:** Title Case for buttons and form labels (single imperative word where possible — `Save`, `Cancel`, `Delete`); sentence case for values, states, and chip labels (no trailing punctuation).
- **Voice:** second person, imperative button verbs, lowercase greeting "Hi {name},". Avoid "I" except in the assistant greeting ("How can I help you today?"). No emoji.

---

## Hard rules (non-negotiable)

These exist because consumer projects keep drifting away from the kit. Don't backslide.

1. **All visual output starts from `ui_kit/template/chat-interface.html`.** Every design or prototype task forks the canonical template into the project root with a descriptive filename, fixes the asset paths per the table in *Project conventions § Workflow*, pre-seeds state, and adds entries to `RESPONSES`. Never build standalone HTML pages from scratch. No separate `.jsx` / `.tsx` / `.js` files. No Claude Design artifact, canvas, or standalone document output. Only exception: authoring a brand-new kit primitive at `ui_kit/components/<NewComponent>/`, which must still be demonstrated inside a fork of `chat-interface.html`.
2. **Never rebuild the shell, and never modify the platform chrome.** `<AppBar>`, `<NavBar>`, `<SideNavigation>`, `<GlobalSearch>`, `<PromptInput>`, `<FabIcon>` are assembled and locked. `.ts-menubar` and `.ts-body` are locked Tekion platform chrome zones — see Rule 13 for details. Edit only the chat-thread content zone.
3. **Compose with kit primitives — never raw HTML.** Button → `<Button>`, icon → `<Phi>`, link → `<Link>`, divider → `<Seperator>`, badge / chip / avatar → `<Badge>` / `<Chip>` / `<Avatar>`. Raw HTML elements (`<button>`, `<a>`, `<input>`) are allowed only when defining a new kit primitive itself.
4. **Never hardcode a hex / rgb / named color.** Every color comes from `$t1-*` (SCSS) or `var(--t1-*)` (CSS / inline). Same applies to spacing, radii, type sizes, shadows.
5. **No inline styles for design tokens.** `style={{ color: '#fff', padding: '12px' }}` belongs in SCSS. Inline `style` is allowed only for truly dynamic runtime values (e.g., `width: ${pct}%`).
6. **Unique BEM prefix per component.** Pattern: `t1-<slug>__<element>--<modifier>`. Never reuse another component's prefix.
7. **No third-party UI libraries.** No Tailwind, MUI, shadcn, Bootstrap, Radix, Ant Design, Chakra, Emotion, styled-components. **Icons are Phosphor only** (loaded by `<Phi>`) — no Lucide, no Heroicons, no Material Icons. T1's only runtime deps are React + ReactDOM + Babel Standalone + Phosphor.
8. **Read the component spec before writing code.** Use the `Read` tool on `ui_kit/docs/SYSTEM.md` and `ui_kit/docs/INDEX.md` first; then `ui_kit/docs/<ComponentName>.md` for every component the task touches. Do not rely on memory of previous sessions — always re-read.
9. **Rebuild after every change.** `node dev.js --build` after editing any `.jsx` or `.scss` partial — bundles do not regenerate themselves.
10. **Figma is the source of truth for design values.** Fetch the node via the Figma MCP before writing styles. Token values, sizes, radii, spacing, colors must come from the Figma design — never guessed.
11. **Brand essentials.** See the *Brand essentials* section above for the full list. Summary: Proxima Nova only · `$t1-gradient-brand` on AI send button only · violet is T1 brand mark only · Phosphor icons only via `<Phi>` · radii per token table (asymmetric `2px 2px 0 2px` on user chat bubbles) · motion 150 ms hover / 200 ms modal · Title Case for buttons and labels, sentence case for values and chips · second person, lowercase greeting "Hi {name},".
13. **Never modify `.ts-menubar` or `.ts-body` in any fork.** These are locked Tekion platform chrome zones in `chat-interface.html`. `.ts-menubar` is the 64px dark top bar (logo, global search, platform nav actions); `.ts-body` is the outer flex container that holds the favbar, main content, and AI panel. Their CSS, dimensions, structure, and children must remain exactly as they are in the canonical template. Do not add, remove, or restyle anything inside these zones — your work goes in the chat-thread content zone within `.ts-body`, never on the zones themselves.
14. **Build outside the kit, never outside the system.** If a component doesn't exist in `ui_kit/components/`, you are still fully bound to the T1 Design System. Compose it from `$t1-*` tokens and existing kit atoms (`<Button>`, `<Phi>`, `<Link>`, `<Chip>`, domain cards, etc.). A missing component is never a licence to reach for a third-party library, hardcode a value, or hand-roll unstyled raw HTML. The constraints of rules 3, 4, 5, and 7 apply whether or not the component is in the kit. See *How to build a complex component* for the extraction recipe.
12. **"Pull latest" fully updates the kit, the canonical template, and every forked file.** When a user runs "pull latest" or "pull updates from the library" in a downstream project, execute the following procedure in order:

    **Step 1 — Update kit assets.** Sync these files from the T1 Design System source into the downstream project:
    `ui_kit/components.css`, `ui_kit/components.jsx`, `ui_kit/components/`, `ui_kit/loader.js`, `ui_kit/template/chat-interface.html`, `ui_kit/docs/`, `colors_and_type.css`, `tokens.scss`, `fonts/`, `assets/`, and (Claude Code projects only) `.claude/`.

    **Step 2 — Identify all forks.** Find every forked file at the project root (any `.html` file that is not inside `ui_kit/`). These are the files that were created by forking `chat-interface.html`.

    **Step 3 — For each fork, perform a preserve-and-rebuild:**
    1. Extract the project-specific content from the fork: the `RESPONSES` object, the pre-seeded `messages` and `panelState` values, and any custom `matchResponse()` routing.
    2. Replace the fork's full content with the newly updated `ui_kit/template/chat-interface.html`.
    3. Rewrite the asset paths from template-relative to project-root-relative (per the path table in *Project conventions § Workflow*).
    4. Re-inject the extracted `RESPONSES`, pre-seeded state, and routing back into the updated fork. **The `RESPONSES` JSX code is never modified during a pull.** However, every kit component referenced inside `RESPONSES` (e.g. `<ListingCard>`, `<Button>`, `<Response>`) is automatically updated because `ui_kit/components.jsx` and `ui_kit/components.css` were fully replaced in Step 1 — the component implementations update without any change to the `RESPONSES` code.
    5. Confirm the fork loads correctly and the design content is intact.

    **On first pull (no forks exist yet):** place a pre-forked copy of `chat-interface.html` at the project root with the starter comment from *Project conventions § Pre-forked starter pattern* and fix the asset paths.

    The outcome of a pull is a downstream project where every fork has the latest shell, styles, and kit structure from the canonical template, and all project-specific design content is fully preserved.

For Claude Code projects, rule 1 is hard-enforced by `.claude/hooks/enforce-chat-interface.js` — a `PreToolUse` hook that blocks any HTML write outside `ui_kit/template/chat-interface.html`. The hook ships with the design system and has no effect in Claude Design or other hosts; for those, rule 1 is advisory and lives in this file plus `SKILL.md`.

---

## Known gaps / gotchas

Component behaviors that repeatedly surprise downstream projects. `/spec` reads this section and pre-flags any that a spec touches, so they're decided up front instead of mid-build.

- **`ListingCard` has no image/thumbnail prop.** It renders a letter `Avatar`, not a photo. Any "show a photo per row" ask needs a fork-level workaround or an upstream kit change — raise it as a `constitution §5` deviation before building.
- **`ListingCard` hides its avatar in the narrow AI panel** via `@container t1-response (max-width: 500px)`. A thumbnail in the docked/popover panel (≤ 500px) needs an explicit override; by default it won't show at those widths.

---

## Reference files

Read these in this order when starting a new task:

1. **This file (`CLAUDE.md`)** — engineering guide, project conventions, all rules.
2. **[ui_kit/docs/SYSTEM.md](ui_kit/docs/SYSTEM.md)** — system-level context and design rationale. Read once front to back.
3. **[ui_kit/docs/INDEX.md](ui_kit/docs/INDEX.md)** — fast index of every component doc.
4. **[ui_kit/docs/<ComponentName>.md](ui_kit/docs/)** — per-component spec. Read with the `Read` tool before touching any component.
5. **[ui_kit/components/manifest.js](ui_kit/components/manifest.js)** — canonical component registry; order is dependency order.
6. **[tokens.scss](tokens.scss)** — every `$t1-*` token with its real value.
7. **[ui_kit/template/chat-interface.html](ui_kit/template/chat-interface.html)** — the canonical prototype. Read once to understand how the shell + thread fit together; fork it for every visual task.

When in doubt: **run the decision ladder, find the kit component, compose inside the fork**. Don't re-create.
