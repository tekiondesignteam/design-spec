# T1 Design System — LLM System Context

This document gives any AI model or code agent the complete context needed to work with the T1 Design System. Read this first before writing any code or components.

---

## What is T1 Design System?

T1 is a component library built for AI assistant chat interfaces. It is used by Tekion — an automotive retail CRM platform — to build in-app AI assistant UIs. The kit is designed specifically for the pattern:

```
[Side Navigation] + [Chat Thread] + [Prompt Input]
```

All components are pre-built React components available globally in the browser. There are no npm imports. All components are loaded via a script tag and are available as global variables.

---

## How the System Works (Technical)

### Component availability
All components are **globally available** — no import statements needed:
```jsx
// ✅ Correct — just use them
<Button color="primary">Save</Button>
<Dropdown title="Stage" items={stages} />
<ChatBubble>Hello</ChatBubble>

// ❌ Wrong — do not write import statements
import { Button } from './components'
```

### File structure
```
ui_kit/
  _core.jsx                         ← Phi (icon), Icon (SVG set), T1Mark
  components/
    ComponentName/
      ComponentName.jsx             ← React component (partial — edit this)
      ComponentName.scss            ← SCSS styles (partial — edit this)
      preview.html                  ← Standalone preview page
  components.jsx                    ← Compiled bundle (auto-generated, do not edit)
  components.css                    ← Compiled CSS (auto-generated, do not edit)
  app.jsx                           ← Kit showcase page
  loader.js                         ← Runtime loader
  manifest.js                       ← Component load order
  docs/                             ← Component specs + dev server
    SYSTEM.md                       ← This file (LLM context)
    [ComponentName].md              ← Full spec per component
    docs-preview.html               ← Docs viewer UI
  template/
    chat-interface.html             ← CANONICAL prototype — always start here
```

### After editing any component partial
Always rebuild both bundles:
```bash
node dev.js --build           # → ui_kit/components.css + ui_kit/components.jsx
```

---

## Hard Rules — Follow These Without Exception

### Rule: Always start from the template when building a prototype

**`ui_kit/template/chat-interface.html` is the single canonical prototype for this design system.**

When building or updating any T1 AI Sales Assistant prototype or screen:
- **Fork `chat-interface.html`** — never build the Tekion shell (menubar, favbar, CRM skeleton, dockable AI panel) from scratch.
- All React JSX for the prototype lives **inline** in the `<script type="text/babel">` block inside that file. Do not split it into a separate `.jsx` file.
- After any change, verify via: `node dev.js --prototype` → http://localhost:3030/template/chat-interface.html

The file includes: full Tekion shell, all 6 AI panel states (closed / popover / left / right / fullscreen / minimized), streaming AI responses, ReasoningLog, drag, Move & Resize popover, SideNavigation in fullscreen, and all canned demo content.

### Rule 0 (MANDATORY FIRST STEP): Read the docs before writing any code

**Every time you are asked to build, modify, or use any part of this system — read the relevant `.md` file(s) before writing a single line of code.**

The docs are the single source of truth for how each component looks, behaves, and must be used. They contain:
- Exact colour tokens for every element (background, text, border, icon)
- Typography specifications (font-size, font-weight, line-height) for every text element
- All supported variants and what each variant changes visually
- State-by-state visual specs (default → hover → active → selected → disabled → open/closed)
- Spacing and sizing (padding, gap, border-radius, min-width, max-height)
- Interaction behaviour and side effects
- Anti-patterns and common mistakes to avoid

**Reading sequence for any task:**
1. Read `docs/SYSTEM.md` (this file) — always, once per session
2. Read `docs/[ComponentName].md` for every component you will touch
3. For new SCSS — also verify against Figma node before writing

Skipping the docs and guessing from component names or prop names alone will produce wrong colours, wrong typography, wrong states, and wrong spacing. The docs exist precisely to prevent this.

### Rule 1: Always use existing kit components
Never write raw HTML for something the kit already provides.

| You need | Use | Never write |
|----------|-----|-------------|
| A button | `<Button>` | `<button>` with custom CSS |
| An icon | `<Phi name="..." />` | `<i>`, `<svg>`, `<img>` |
| A link | `<Link>` | `<a>` with custom styles |
| A divider | `<Separator>` or `<Divider>` | `<hr>` |
| A text input | `<InputText>` | `<input>` |
| A dropdown | `<Dropdown>` | custom `<select>` or `<div>` dropdown |
| A modal | `<Modal>` | custom overlay div |
| An icon button | `<IconButton>` | `<button>` with icon child |

**Exception:** Raw HTML elements are only allowed when building the kit component itself (i.e., you are defining `Button.jsx`).

### Rule 2: SCSS tokens only — no raw colour values
```scss
/* ✅ Correct */
color: $t1-neutral-900;
background: $t1-blue-100;
border: 1px solid $t1-neutral-200;

/* ❌ Wrong */
color: #161616;
background: #e8f0fe;
border: 1px solid #d4d5d6;
```

### Rule 3: BEM naming with unique prefix
Every component must have a unique BEM prefix. Examples:
- Button → `.t1-btn`
- ChatBubble → `.t1-bubble`
- Dropdown → `.t1-dropdown`
- Modal → `.t1-modal`

Never reuse a prefix from another component.

### Rule 4: No inline styles for design tokens
```jsx
/* ✅ Correct — layout/positional inline styles are fine */
<div style={{ maxWidth: 480 }}>

/* ❌ Wrong — never put colour, spacing, or type tokens inline */
<div style={{ color: '#161616', padding: '16px', fontWeight: 600 }}>
```

### Rule 5: Figma is the source of truth
Before writing styles for any component, fetch the Figma design context. Token values, sizes, radii, and spacing must come from the Figma design — not guessed.

---

## Complete Component Catalog

### Chat Core
Primary building blocks for a conversation thread.
| Component | Role | Key props |
|-----------|------|-----------|
| `Response` | AI assistant reply (left-aligned) | `title`, `children`, `orderedList`, `unorderedList`, `contentSlot` |
| `ChatBubble` | User message bubble (right-aligned) | `children`, `state`, `actions` |
| `ChatContainer` | Thread wrapper — manages alignment | `messages[]` or `children` |
| `PromptInput` | User text input + toolbar | `onSend`, `mobile`, `loading`, `showSearchChip` |
| `FeedbackAction` | Copy/thumbs/regenerate row below response | `filterCount`, `sourceCount`, callbacks |
| `ReasoningLog` | AI thinking chain visualization | `inProgress`, `interrupted` |
| `Welcome` | Greeting screen before first message | `name`, `description` |
| `SuggestionList` | Quick-action chips on welcome screen | `items[]`, `onSelect` |

### Shell & Layout
Structural chrome — navigation frames and window containers.
| Component | Role | Key props |
|-----------|------|-----------|
| `SideNavigation` | Left sidebar — pinned/recent chats, tasks | `sections`, `pinnedChats[]`, `recentChats[]` |
| `NavBar` | Top navbar (mobile or desktop) | `title`, `actionLabel`, `onAction` |
| `AppBar` | Window chrome for floating panel | `type`, `onMinimize`, `onClose` |
| `GlobalSearch` | Full-width AI query / search bar | `initialMode`, `onAsk` |

### AI Output Cards
Rich cards that embed in `Response` `contentSlot` or appear directly in thread.
| Component | Role | Key props |
|-----------|------|-----------|
| `PlannerCard` | Action plan checklist | `title`, `lists[]` |
| `MessageDraft` | AI-drafted email/SMS for review | `to`, `body` |
| `DocumentCard` | File reference with links | `title`, `icon`, `subtitles[]`, `links[]` |
| `CompletionCard` | Task complete confirmation | — |
| `TipCard` | AI contextual tip | — |
| `NotifyMyCard` | Long-task notification CTA | `heading`, `notified`, `onNotify` |
| `ConversationHistoryCard` | Past conversation entry | `title`, `when`, `preview` |
| `Quote` | Block quote with left border | `children` |

### Domain Cards
CRM data display cards — automotive retail context.
| Component | Role | Key props |
|-----------|------|-----------|
| `DealCard` | CRM deal summary | — |
| `TaskCard` | Task item | — |
| `ListingCard` | List of contacts/records | `expanded`, `items[]`, `onItemClick` |
| `CreditScoreCard` | Animated credit gauge | — |

### Forms & Inputs
User input controls.
| Component | Role | Key props |
|-----------|------|-----------|
| `Dropdown` | Select with optional search | `title`, `items[]`, `sections[]`, `search`, `onChange` |
| `InputText` | Text field | `label`, `placeholder`, `error`, `assistive`, `maxLength` |
| `Search` | Search with typeahead | `size`, `options[]`, `onChange(event)` |
| `Checkbox` | Boolean input | `label`, `checked`, `indeterminate`, `shape`, `color` |
| `Switch` | On/off toggle | `label`, `checked` |

### Buttons & Actions
Clickable elements and action triggers.
| Component | Role | Key props |
|-----------|------|-----------|
| `Button` | Standard action button | `variant`, `color`, `size`, `iconStart`, `loading` |
| `IconButton` | Square icon-only button | `color`, `style`, `size`, `icon`, `aria-label` |
| `Link` | Inline text navigation | `appearance`, `underlined`, `href` |
| `InteractiveIcon` | Tappable icon with states | `icon`, `color`, `size`, `states` |
| `FabIcon` | Floating AI action button (T1 logo) | `disabled`, `onClick` |
| `GradientIconButton` | Premium gradient icon button | `icon`, `state` |
| `FavBarIcon` | Favourites bar icon | `onClick` |

### Status & Data
Identity, counts, tags, and progress indicators.
| Component | Role | Key props |
|-----------|------|-----------|
| `Avatar` | User identity | `type`, `initials`, `src`, `size`, `status` |
| `Badge` | Count / status dot | `count`, `color`, `dot`, `light` |
| `Chip` | Tag / filter pill | `variant`, `color`, `size`, `startIcon`, `endIcon` |
| `ProgressBar` | Progress indicator | `value`, `color`, `determinate` |

### Notifications
Alerts, dialogs, and empty states.
| Component | Role | Key props |
|-----------|------|-----------|
| `Toast` | Floating notification (transient) | `color`, `title`, `description`, `onClose` |
| `NotificationBanner` | Full-width persistent banner | `color`, `title`, `description`, `onClose` |
| `Modal` | Overlay dialog | `open`, `title`, `onClose`, `primaryLabel`, `children` |
| `Empty` | No-results / empty state | `icon`, `title`, `description`, `primaryLabel` |

### Primitives
Base-level layout and icon helpers.
| Component | Role | Key props |
|-----------|------|-----------|
| `Phi` | **All icons** — Phosphor icon library | `name`, `size`, `weight` |
| `Separator` / `Divider` | Horizontal or vertical line | `orientation`, `variant` |

---

## Component Hierarchy (Atoms / Molecules / Organisms)

Use this table to understand what can be composed from what, and to decide your build strategy (see 3-tier protocol below).

### Atoms — indivisible primitives, no kit dependencies
| Component | Notes |
|-----------|-------|
| `Button` | Base action trigger |
| `IconButton` | Square icon-only button |
| `Link` | Inline text navigation |
| `Badge` | Count / status dot |
| `Chip` | Tag / filter pill |
| `Avatar` | User identity |
| `Switch` | On/off toggle |
| `Checkbox` | Boolean input |
| `InputText` | Text field |
| `Separator` / `Divider` | Horizontal or vertical line |
| `ProgressBar` | Progress indicator |
| `FabIcon` | Floating AI trigger (T1 logo button) |
| `FavBarIcon` | Favourites bar icon |
| `Quote` | Styled block-quote container |

### Molecules — composed from 2–3 atoms, minimal new logic
| Component | Composed from |
|-----------|--------------|
| `Search` | InputText + Phi |
| `Dropdown` | InputText variant + Phi + Separator |
| `InteractiveIcon` | Phi + hover/active states |
| `GradientIconButton` | Button variant + Phi |
| `FeedbackAction` | IconButton × multiple |
| `Modal` | Button × 2 + Separator + overlay |
| `NotificationBannerToast` | Phi + Button × 2 + text |
| `Empty` | Phi + Button + text |

### Organisms — full sections with own state, represent a complete UI region
| Component | Category |
|-----------|----------|
| `Response` | Chat core |
| `ChatBubble` | Chat core |
| `ChatContainer` | Chat core |
| `PromptInput` | Chat core / Shell |
| `ReasoningLog` | Chat core |
| `Welcome` | Chat core |
| `SuggestionList` | Chat core |
| `AppBar` | Shell |
| `NavBar` | Shell |
| `SideNavigation` | Shell |
| `GlobalSearch` | Shell |
| `PlannerCard` | AI output |
| `MessageDraft` | AI output |
| `DocumentCard` | AI output |
| `CompletionCard` | AI output |
| `TipCard` | AI output |
| `NotifyMyCard` | AI output |
| `ConversationHistoryCard` | AI output |
| `DealCard` | Domain |
| `TaskCard` | Domain |
| `ListingCard` | Domain |
| `CreditScoreCard` | Domain |

---

## Shell vs Intent Split

Every component belongs to one of two classes. This split determines what you build vs. what you load.

### Shell — locked global surface (never rebuild)
The shell is the persistent chrome that frames every T1 prototype: the sidebar, the top bar, the composer, and the floating trigger. It is already fully assembled in `chat-interface.html`.

| Component | What it is |
|-----------|-----------|
| `AppBar` | Window chrome for the floating AI panel |
| `NavBar` | Top bar of the AI panel |
| `SideNavigation` | Left sidebar — pinned/recent chats, tasks |
| `GlobalSearch` | Full-width AI query bar |
| `PromptInput` | Bottom composer — text field + toolbar + send |
| `FabIcon` | Floating AI trigger button |

**Rule:** Start every prototype from `chat-interface.html`. The shell is already there and correct. Never re-implement these six components.

### Intent — what prototypes build
Everything else. These are the conversational content components that change per workflow — responses, cards, forms, reasoning chains, suggestions.

| Category | Components |
|----------|-----------|
| Chat content | `Response`, `ChatBubble`, `ChatContainer`, `ReasoningLog`, `Welcome`, `SuggestionList` |
| AI output cards | `PlannerCard`, `MessageDraft`, `DocumentCard`, `CompletionCard`, `TipCard`, `NotifyMyCard`, `ConversationHistoryCard`, `Quote` |
| Domain cards | `DealCard`, `TaskCard`, `ListingCard`, `CreditScoreCard` |
| Forms & inputs | `Dropdown`, `InputText`, `Search`, `Checkbox`, `Switch` |
| Buttons & actions | `Button`, `IconButton`, `Link`, `InteractiveIcon`, `GradientIconButton` |
| Status & notifications | `Avatar`, `Badge`, `Chip`, `ProgressBar`, `Modal`, `NotificationBannerToast`, `Empty` |

**All prototype energy goes here.** Design the conversation — the actual workflow, cards, and responses — not the shell.

---

## 3-Tier Component Decision Protocol

When building or modifying any UI element, follow these steps **in order**. Stop at the first step that applies.

**Step 1 — Use a pre-built component**
Check `docs/INDEX.md` and the component catalog above. If an exact pre-built component exists → use it directly. Done.

**Step 2 — Compose from existing components**
Can the element be assembled inline from 2–3 existing kit components? → Compose them inline in JSX. Do not create a new component file. Done.

**Step 3 — Build from atoms (last resort only)**
Only if Steps 1 and 2 both fail: build the new element using atoms (`Button`, `Chip`, `Badge`, `Separator`, `Avatar`, `Phi`, etc.) as building blocks. Never use raw HTML elements (`<button>`, `<a>`, `<i>`, `<hr>`) — always compose up from the kit.

---

## Decision Trees

### "I need to show an AI response"
```
Has step-by-step reasoning?  → ReasoningLog (above the response)
                                      ↓
Always:                        Response
  ├── simple text?            → children prop
  ├── numbered steps?         → orderedList prop
  ├── bullet points?          → unorderedList prop
  ├── embedded card/form?     → contentSlot prop
  └── action plan?            → contentSlot={<PlannerCard />}
```

### "I need to build the full chat interface"
```
SideNavigation (left sidebar)
  +
main content area:
  ├── Empty state → Welcome + SuggestionList
  └── Active chat → ChatContainer
        ├── ChatBubble (role="user")
        ├── Response (role="assistant")
        │     └── contentSlot for rich cards
        └── [more turns...]
  +
PromptInput (bottom)
```

### "I need a button"
```
Text label + click action?    → Button
Icon only?                    → IconButton (always provide aria-label)
Navigation/href?              → Link
Inline small icon tap?        → InteractiveIcon
Floating AI trigger?          → FabIcon
Premium AI action in toolbar? → GradientIconButton
```

### "I need a form field"
```
Choose from options?          → Dropdown (with search=true for long lists)
Type text?                    → InputText
Search/filter?                → Search
Yes/no?                       → Checkbox (forms) or Switch (settings)
```

---

## Building a New Prototype Screen — Step by Step

1. **Start from the template** — open `ui_kit/template/chat-interface.html`. All new prototype work goes into that file. Never create a new HTML file.
2. **Edit the inline JSX** — the React app lives in the `<script type="text/babel">` block. Add new states, components, or data there.
3. **Rebuild if you changed any kit component** — run `node dev.js --build`.
4. **Preview** — server is at http://localhost:3030/template/chat-interface.html (start with `node dev.js --prototype` if not running).

---

## Building a New Kit Component — Step by Step

1. **Check the manifest** — does an equivalent already exist? If yes, compose with it.
2. **Fetch Figma design** — get the node's design context to extract exact tokens.
3. **Create files**:
   - `ui_kit/components/MyComponent/MyComponent.jsx`
   - `ui_kit/components/MyComponent/MyComponent.scss`
   - `ui_kit/components/MyComponent/preview.html`
4. **Write SCSS** — use only `$t1-*` tokens. Use a unique BEM prefix (e.g., `t1-mc`).
5. **Write JSX** — compose from kit primitives. Accept a `className` and `...rest` spread.
6. **Add to manifest** — edit `ui_kit/components/manifest.js` and add to loader exports.
7. **Rebuild** — run `node dev.js --build`.
8. **Add showcase** — add a `P['MyComponent']` entry in `ui_kit/app.jsx`.

---

## Token Reference (Key Values)

| Token | Value | Use |
|-------|-------|-----|
| `$t1-neutral-0` | #ffffff | White backgrounds |
| `$t1-neutral-100` | #edeef0 | Subtle surface (modal header) |
| `$t1-neutral-200` | #d4d5d6 | Borders |
| `$t1-neutral-500` | #6d707a | Muted icons |
| `$t1-neutral-600` | #444f5c | Secondary text |
| `$t1-neutral-900` | #161616 | Primary text |
| `$t1-blue-100` | #e8f0fe | Selected item bg |
| `$t1-blue-400` | #4285f4 | Primary brand / active |
| `$t1-blue-700` | #1a56db | Selected item text |
| `$t1-space-2` | 8px | Small gap |
| `$t1-space-4` | 16px | Standard padding |
| `$t1-space-6` | 24px | Large padding |
| `$t1-radius-xs` | 2px | Tight radius (inputs, dropdown) |
| `$t1-radius-lg` | 12px | _Defined; not currently consumed by kit components_ |
| `$t1-shadow-float` | — | Dropdown/panel shadow |
| `$t1-shadow-pop` | — | Modal shadow |
| `$t1-weight-regular` | 400 | Normal text |
| `$t1-weight-medium` | 500 | Emphasis text |
| `$t1-weight-semibold` | 600 | Titles |

---

## Common Patterns

### Full chat page
```jsx
function ChatPage() {
  const [messages, setMessages] = React.useState([]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SideNavigation
        sections="Expanded"
        pinnedChats={pinnedChats}
        recentChats={recentChats}
        style={{ height: '100vh' }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <NavBar title="AI Assistant" />
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {messages.length === 0 ? (
            <>
              <Welcome name="Sarah" />
              <SuggestionList items={suggestions} onSelect={handleSuggestion} />
            </>
          ) : (
            <ChatContainer messages={messages} />
          )}
        </div>
        <PromptInput onSend={handleSend} />
      </div>
    </div>
  );
}
```

### AI response with reasoning + content card
```jsx
<>
  <ReasoningLog inProgress={false} interrupted={false} />
  <Response
    title="Your action plan for Flora Fleisher"
    contentSlot={
      <PlannerCard
        title="Follow-up Plan"
        lists={[{
          label: 'Steps',
          items: [
            { text: 'Send financing options', checked: true },
            { text: 'Schedule test drive', checked: false },
          ]
        }]}
      />
    }
  />
</>
```

### Confirmation modal
```jsx
<Modal
  open={showConfirm}
  title="Delete this deal?"
  onClose={() => setShowConfirm(false)}
  secondaryLabel="Cancel"
  primaryLabel="Delete"
  onPrimary={handleDelete}
>
  This action cannot be undone.
</Modal>
```

### Inline form with dropdown
```jsx
<Modal open={open} title="Reassign Deal" onClose={onClose}>
  <Dropdown
    title="Assign to"
    description="Current: Alice Johnson"
    placeholder="Select a rep"
    items={['Alice Johnson', 'Bob Smith', 'Carlos Rivera']}
    search
    onChange={setSelectedRep}
  />
  <div style={{ marginTop: 16 }}>
    <InputText label="Note" placeholder="Add a note (optional)" />
  </div>
</Modal>
```

---

## Files to Read for More Detail

| Topic | File |
|-------|------|
| Project rules (hard constraints) | `CLAUDE.md` |
| Component load order | `ui_kit/components/manifest.js` |
| All component docs | `ui_kit/docs/[ComponentName].md` |
| Showcase / usage examples | `ui_kit/app.jsx` |
| Token definitions | `tokens.scss` |
| Canonical prototype | `ui_kit/template/chat-interface.html` |
| Dev tool (build / serve / watch) | `dev.js` — run `node dev.js` |

Individual component docs: `ui_kit/docs/Button.md`, `ui_kit/docs/Dropdown.md`, `ui_kit/docs/Modal.md`, `ui_kit/docs/Response.md`, `ui_kit/docs/Chat-Container.md`, `ui_kit/docs/Prompt-Input.md`, `ui_kit/docs/Side-Navigation.md` — and one file per component for all 44 components in the kit.
