# T1 Design System — Documentation

> Component reference for the T1 AI Chat UI Kit. This kit is used to build AI assistant chat interfaces in the Tekion automotive CRM platform.

**Start here → [SYSTEM.md](./SYSTEM.md)** — complete context, rules, patterns, and decision trees for any AI model or developer working with this system.

---

## Component Docs

### Chat Core
Primary building blocks for a conversation thread.
| File | Component | One-liner |
|------|-----------|-----------|
| [Response.md](./Response.md) | `Response` | AI assistant reply with title, body, lists, content slot, and feedback actions |
| [Chat-Bubble.md](./Chat-Bubble.md) | `ChatBubble` | User message bubble (right-aligned) |
| [Chat-Container.md](./Chat-Container.md) | `ChatContainer` | Thread wrapper — manages alignment for user + assistant turns |
| [Prompt-Input.md](./Prompt-Input.md) | `PromptInput` | User text input with toolbar, mobile layout, streaming state |
| [Feedback-Action.md](./Feedback-Action.md) | `FeedbackAction` | Copy / thumbs / regenerate / sources row below every response |
| [Reasoning-Log.md](./Reasoning-Log.md) | `ReasoningLog` | AI thinking chain — in-progress, done, interrupted states |
| [Welcome.md](./Welcome.md) | `Welcome` | Greeting screen shown before first message |
| [Suggestion-List.md](./Suggestion-List.md) | `SuggestionList` | Quick-action chips on the welcome screen |

### Shell & Layout
Structural chrome — navigation frames and window containers.
| File | Component | One-liner |
|------|-----------|-----------|
| [Side-Navigation.md](./Side-Navigation.md) | `SideNavigation` | Left sidebar — pinned chats, recent chats, scheduled tasks |
| [Nav-Bar.md](./Nav-Bar.md) | `NavBar` | Top navbar (mobile hamburger or desktop with action button) |
| [App-Bar.md](./App-Bar.md) | `AppBar` | Window chrome for floating/embedded chat panel |
| [Global-Search.md](./Global-Search.md) | `GlobalSearch` | Full-width AI query / keyword search bar |

### AI Output Cards
Rich cards that embed inside `Response` `contentSlot` or appear directly in the thread.
| File | Component | One-liner |
|------|-----------|-----------|
| [Planner-Card.md](./Planner-Card.md) | `PlannerCard` | Multi-list action plan with checkboxes |
| [Message-Draft.md](./Message-Draft.md) | `MessageDraft` | AI-drafted email/SMS for user review and send |
| [Document-Card.md](./Document-Card.md) | `DocumentCard` | File reference with subtitle metadata and action links |
| [Completion-Card.md](./Completion-Card.md) | `CompletionCard` | Task complete confirmation card |
| [Tip-Card.md](./Tip-Card.md) | `TipCard` | Contextual AI suggestion or best-practice tip |
| [Notify-My-Card.md](./Notify-My-Card.md) | `NotifyMyCard` | Request notification when a long background task finishes |
| [Conversation-History-Card.md](./Conversation-History-Card.md) | `ConversationHistoryCard` | Past conversation entry for sidebar or search results |
| [Quote.md](./Quote.md) | `Quote` | Styled block quote with left accent border |

### Domain Cards
CRM data display cards — automotive retail context.
| File | Component | One-liner |
|------|-----------|-----------|
| [Deal-Card.md](./Deal-Card.md) | `DealCard` | CRM deal summary card with status, assignee, and value |
| [Task-Card.md](./Task-Card.md) | `TaskCard` | Checklist-style task progress card |
| [Listing-Card.md](./Listing-Card.md) | `ListingCard` | Vertical list of CRM records with expandable rows |
| [Credit-Score-Card.md](./Credit-Score-Card.md) | `CreditScoreCard` | Animated arc gauge showing credit score tier |

### Forms & Inputs
User input controls.
| File | Component | One-liner |
|------|-----------|-----------|
| [Dropdown.md](./Dropdown.md) | `Dropdown` | Select control — flat list or grouped sections, optional live search |
| [Input-Text.md](./Input-Text.md) | `InputText` | Text field with label, error, helper text, character counter |
| [Search.md](./Search.md) | `Search` | Search input with optional typeahead suggestions |
| [Checkbox.md](./Checkbox.md) | `Checkbox` | Boolean toggle — square or circle, brand or success colour |
| [Switch.md](./Switch.md) | `Switch` | On/off toggle for settings and preferences |

### Buttons & Actions
Clickable elements and action triggers.
| File | Component | One-liner |
|------|-----------|-----------|
| [Button.md](./Button.md) | `Button` | Standard action button — contained, outlined, or text variant |
| [Icon-Button.md](./Icon-Button.md) | `IconButton` | Square icon-only button (close, copy, edit) |
| [Link.md](./Link.md) | `Link` | Inline text navigation link |
| [Interactive-Icon.md](./Interactive-Icon.md) | `InteractiveIcon` | Tappable icon with hover/active/disabled states |
| [FAB-Icon.md](./FAB-Icon.md) | `FabIcon` | Floating AI action button (Tekion T1 gradient logo) |
| [Gradient-Icon-Button.md](./Gradient-Icon-Button.md) | `GradientIconButton` | Premium gradient-border icon button |
| [Fav-Bar-Icon.md](./Fav-Bar-Icon.md) | `FavBarIcon` | Favourites bar bookmark icon |

### Status & Data
Identity, counts, tags, and progress indicators.
| File | Component | One-liner |
|------|-----------|-----------|
| [Avatar.md](./Avatar.md) | `Avatar` | User identity — initials, photo, or icon, with optional status |
| [Badge.md](./Badge.md) | `Badge` | Notification count (99+) or colour status dot |
| [Chip.md](./Chip.md) | `Chip` | Selectable tag or filter pill |
| [Progress-Bar.md](./Progress-Bar.md) | `ProgressBar` | Determinate or indeterminate progress indicator |

### Notifications
Alerts, dialogs, and empty states.
| File | Component | One-liner |
|------|-----------|-----------|
| [Notification-Banner-Toast.md](./Notification-Banner-Toast.md) | `Toast` / `NotificationBanner` | Floating toast or full-width persistent banner |
| [Modal.md](./Modal.md) | `Modal` | Overlay dialog — header, body slot, optional footer with buttons |
| [Empty.md](./Empty.md) | `Empty` | No-results / no-data placeholder with optional CTA |

### Primitives
Base-level layout and icon helpers.
| File | Component | One-liner |
|------|-----------|-----------|
| [Phi.md](./Phi.md) | `Phi` | **Icon component** — Phosphor icon library. Use for all icons. |
| [Separator.md](./Separator.md) | `Separator` / `Divider` | Horizontal or vertical divider line |

---

## Key Rules (Summary)

1. **Use kit components** — never write raw `<button>`, `<input>`, `<a>`, `<hr>`. The kit has a component for everything.
2. **SCSS tokens only** — never use hex/rgb values. Always use `$t1-*` tokens.
3. **BEM naming** — every new component gets a unique prefix (e.g., `t1-mycomp`).
4. **No inline design styles** — colour, spacing, and typography go in `.scss`, not `style={{}}`.
5. **Rebuild after edits** — run `node dev.js --build` after every `.scss` or `.jsx` change.

---

## Quick Look-up

**"What component do I use when…"**

| Task | Component |
|------|-----------|
| Show AI reply | `Response` |
| Show user message | `ChatBubble` |
| Wrap a conversation | `ChatContainer` |
| Accept user input | `PromptInput` |
| Show AI thinking | `ReasoningLog` |
| Show an action plan | `PlannerCard` inside `Response` contentSlot |
| Show a file reference | `DocumentCard` inside `Response` contentSlot |
| Show a greeting | `Welcome` + `SuggestionList` |
| Navigate left sidebar | `SideNavigation` |
| Show a confirmation dialog | `Modal` |
| Select from a list | `Dropdown` |
| Enter text | `InputText` |
| Show a notification | `Toast` (transient) or `NotificationBanner` (persistent) |
| Any icon | `Phi` |
| Destructive action button | `Button color="error"` |
| Close / copy icon button | `IconButton` |
