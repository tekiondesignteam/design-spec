# T1 Design System — Component Documentation Index

AI chat UI kit for building assistant chat interfaces in the Tekion automotive CRM platform. Usable by any AI model, code agent, or developer.

## Chat Core
Primary building blocks for a conversation thread.

| Component | Purpose |
|-----------|---------|
| [Response](./Response.md) | AI assistant reply with title, body, lists, and content slot |
| [Chat-Bubble](./Chat-Bubble.md) | User message bubble (right-aligned) |
| [Chat-Container](./Chat-Container.md) | Thread wrapper — manages alignment for all turns |
| [Prompt-Input](./Prompt-Input.md) | User text input with toolbar and streaming state |
| [Feedback-Action](./Feedback-Action.md) | Copy / thumbs / regenerate row below every response |
| [Reasoning-Log](./Reasoning-Log.md) | Shows AI thinking chain with typed steps |
| [Welcome](./Welcome.md) | Greeting screen shown before first message |
| [Suggestion-List](./Suggestion-List.md) | Quick-action chips on the welcome screen |

## Shell & Layout
Structural chrome — navigation frames and window containers.

| Component | Purpose |
|-----------|---------|
| [Side-Navigation](./Side-Navigation.md) | Left sidebar — pinned chats, recent chats, scheduled tasks |
| [Nav-Bar](./Nav-Bar.md) | Top navbar (mobile hamburger or desktop) |
| [App-Bar](./App-Bar.md) | Window chrome for floating/embedded chat panel |
| [Global-Search](./Global-Search.md) | AI query bar with mode toggle (AI vs. search) |

## AI Output Cards
Rich cards that embed inside `Response` `contentSlot` or appear directly in thread.

| Component | Purpose |
|-----------|---------|
| [Planner-Card](./Planner-Card.md) | Multi-list action plan with progress |
| [Message-Draft](./Message-Draft.md) | AI-drafted SMS/email for review & send |
| [Document-Card](./Document-Card.md) | File/PDF reference with download links |
| [Completion-Card](./Completion-Card.md) | Signals task completion state |
| [Tip-Card](./Tip-Card.md) | Contextual advice or best practice |
| [Notify-My-Card](./Notify-My-Card.md) | Request notification when long task completes |
| [Conversation-History-Card](./Conversation-History-Card.md) | Past conversation entry in sidebar/search results |
| [Quote](./Quote.md) | Block quote with left border accent |

## Domain Cards
CRM data display cards — automotive retail context.

| Component | Purpose |
|-----------|---------|
| [Deal-Card](./Deal-Card.md) | CRM deal summary with status, assignee, and value |
| [Task-Card](./Task-Card.md) | Checklist-style task progress card |
| [Listing-Card](./Listing-Card.md) | Expandable list of CRM records |
| [Credit-Score-Card](./Credit-Score-Card.md) | Animated arc gauge showing credit score tier |

## Forms & Inputs
User input controls.

| Component | Purpose |
|-----------|---------|
| [Dropdown](./Dropdown.md) | Select control — flat or grouped, optional live search |
| [Input-Text](./Input-Text.md) | Text field with label, error, and helper text |
| [Search](./Search.md) | Search input with optional typeahead suggestions |
| [Checkbox](./Checkbox.md) | Boolean toggle — square or circle, brand or success colour |
| [Switch](./Switch.md) | On/off toggle for settings and preferences |

## Buttons & Actions
Clickable elements and action triggers.

| Component | Purpose |
|-----------|---------|
| [Button](./Button.md) | Standard action button — contained, outlined, or text |
| [Icon-Button](./Icon-Button.md) | Square icon-only button (close, copy, edit) |
| [Link](./Link.md) | Inline text navigation link |
| [Interactive-Icon](./Interactive-Icon.md) | Tappable icon with hover/active states |
| [FAB-Icon](./FAB-Icon.md) | Floating action button (Tekion T1 mark) |
| [Gradient-Icon-Button](./Gradient-Icon-Button.md) | Premium gradient-border button (primary AI action) |
| [Fav-Bar-Icon](./Fav-Bar-Icon.md) | Favorites bar bookmark icon |

## Status & Data
Identity, counts, tags, and progress indicators.

| Component | Purpose |
|-----------|---------|
| [Avatar](./Avatar.md) | User identity — initials, photo, or icon with status |
| [Badge](./Badge.md) | Notification count (99+) or colour status dot |
| [Chip](./Chip.md) | Selectable tag or filter pill |
| [Progress-Bar](./Progress-Bar.md) | Task/upload progress indicator |

## Notifications
Alerts, dialogs, and empty states.

| Component | Purpose |
|-----------|---------|
| [Notification-Banner-Toast](./Notification-Banner-Toast.md) | Toast (floating) & Banner (full-width) notifications |
| [Modal](./Modal.md) | Overlay dialog with header, body slot, and footer |
| [Empty](./Empty.md) | No-results / no-data placeholder with optional CTA |

## Primitives
Base-level layout and icon helpers.

| Component | Purpose |
|-----------|---------|
| [Phi](./Phi.md) | All icons — Phosphor icon library |
| [Separator](./Separator.md) | Horizontal/vertical divider line |

---

## Component Rules

- **Use kit primitives** — Always compose with Button, Link, Icon-Button, Chip, etc. Never hand-roll.
- **SCSS tokens only** — Never use hex/rgb values. Use `$t1-*` tokens from `tokens.scss`.
- **BEM naming** — Every component gets a unique BEM prefix (e.g., `t1-rl`, `t1-md`).
- **Figma is source** — Fetch design from Figma node before writing styles.
- **No inline styles** — Design tokens (colors, spacing, typography) go in SCSS, not `style={{}}` props.

## File Locations

- **Components**: `/ui_kit/components/[ComponentName]/`
- **SCSS**: `/ui_kit/components/[ComponentName]/[ComponentName].scss`
- **JSX**: `/ui_kit/components/[ComponentName]/[ComponentName].jsx`
- **Docs**: `/docs/[ComponentName].md` (this directory)

---

Created: April 22, 2026
Reader: AI code agents building T1 chat interfaces
