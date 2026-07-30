# Prompt-Input

> Main text input for the chat interface. Features textarea with auto-resize, animated gradient border on active, toolbar with attach/mic/send buttons, and mobile/desktop responsive layouts.

## When to use
- As the primary input field for user messages in a chat UI
- Supporting mobile-responsive stacking (collapsed single row → expanded stacked layout)
- Providing micro-interactions: loading state, animated focus border, speech input

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | "Ask anything or press "/" for shortcuts" | Textarea placeholder text |
| `mobile` | boolean | false | Enable mobile-responsive layout with collapse/expand |
| `disabled` | boolean | false | Disable input and send button |
| `loading` | boolean | false | Show loading state with spinning conic-gradient border |
| `showSearchChip` | boolean | false | Display a "Search" chip in the toolbar |
| `onSend` | function | — | Callback with (value: string) on Enter or send button click |
| `onAttach` | function | — | Callback when attach (+) button is clicked |
| `onMic` | function | — | Callback when microphone button is clicked |
| `onSearchChip` | function | — | Callback when Search chip × button is clicked |
| `templates` | array | built-in CRM set | Slash-command templates: `[{ command, description, icon }]`. `description` may include `[bracketed slots]` rendered in violet. |
| `templatesTitle` | string | "Prompt Templates" | Header title of the templates popover |
| `showCreateTemplate` | boolean | true | Show the `+ Create` action in the popover header |
| `showViewAllTemplates` | boolean | true | Show the `View all` button in the popover footer |
| `onSelectTemplate` | function | — | Callback with `(template)` when a list item is picked |
| `onCreateTemplate` | function | — | Callback when `+ Create` is clicked |
| `onViewAllTemplates` | function | — | Callback when `View all` is clicked |
| `className` | string | — | Additional CSS class for the root |

## Slash-command templates menu

Typing `/` at the start of the input opens a popover above the field listing prompt templates that match the query (case-insensitive substring match against command or description). Behavior:

- **Type `/`** → menu opens; further typing filters the list.
- **No matches** → "No Results" empty state is shown.
- **↑ / ↓** → highlight items, **Enter** picks the highlighted item.
- **Click a template** → fills the input with `{command} ` and closes the menu.
- **Esc / outside-click / × in header** → closes the menu (× also clears the input).
- **`[bracketed slots]`** in `description` render in violet to signal placeholders.

## Visual Specification

### Layout & Sizing
| Property | Desktop | Mobile Collapsed | Mobile Expanded |
|----------|---------|------------------|-----------------|
| Max-width | 820px | 375px | 375px |
| Width | 100% | 375px | 375px |
| Padding | 12px | 16px 12px | 12px |
| Border-radius | 2px | 2px 2px 0 0 | 2px 2px 0 0 |
| Gap | 8px | 8px | 8px |
| Border | 2px solid $t1-neutral-200 | 2px solid $t1-neutral-200 (no bottom) | 2px solid $t1-neutral-200 (no bottom) |
| Textarea min-height | 24px | — | 24px |
| Textarea max-height | 132px | hidden (inline) | 132px |
| Icon button width/height | — | 40px | 40px |
| Send button (default) | 36x36 | 36x36 | 36x36 |
| Send button (lg/mobile) | — | 40x40 | 40x40 |
| Gradient ring width | 2px (active/loading) | 2px (active/loading) | 2px (active/loading) |

### Colours
| Element | Property | Token/Value |
|---------|----------|------------|
| Container | background | $t1-neutral-0 |
| Container | border (default) | 2px solid $t1-neutral-200 |
| Container | border (active/loading) | transparent (gradient shows) |
| Textarea | color | #161616 |
| Textarea | placeholder | #969aa3 |
| Icon button | color (default) | $t1-neutral-600 |
| Icon button | background (hover) | $t1-neutral-100 |
| Icon button | color (hover) | $t1-neutral-900 |
| Send button | background (disabled) | $t1-neutral-100 |
| Send button | background (enabled) | linear-gradient(100.05deg, #25C8A5 0%, #1B90B4 50%, #1A6CC4 100%) |
| Send button | opacity (enabled hover) | 0.9 |
| Send icon | color (disabled) | $t1-neutral-400 |
| Send icon | color (enabled) | $t1-neutral-0 |
| Gradient ring | conic-gradient | #CFF5EB (0%), #CDE7EF (50%), #CDDFF2 (100%) |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Textarea | 16px | 500 | 24px |
| Textarea placeholder | 16px | 400 | 24px |
| Icon font-size | 20px | — | 1 |
| Send icon font-size | 18px | — | 1 |

### States
| State | What changes |
|-------|-------------|
| default | border $t1-neutral-200, send button gray ($t1-neutral-100) |
| active | border transparent, gradient ring visible spinning at 3s/revolution, send enabled with gradient bg |
| loading | border transparent, gradient ring spinning, send button disabled |
| disabled | opacity 0.5, pointer-events none |
| hover (icon button) | background $t1-neutral-100, color $t1-neutral-900 |
| hover (send enabled) | opacity 0.9 |
| mobile collapsed | flex-row, padding 16px 12px, textarea inline (no wrap, ellipsis) |
| mobile expanded | flex-column, animation t1-pi-expand 200ms ease-out, box-shadow 0px 2px 16px rgba(..., 0.09) |

### Animation Details
| Animation | Duration | Timing |
|-----------|----------|--------|
| t1-border-spin | 3s | linear infinite (active/loading borders) |
| t1-pi-expand | 200ms | ease-out both (mobile expand transition) |
| border-color transition | 200ms | ease |
| box-shadow transition | 200ms | ease |

## Examples

### Minimal (desktop)
```jsx
<PromptInput
  onSend={(value) => console.log('Send:', value)}
/>
```

### Mobile with callbacks
```jsx
<PromptInput
  mobile={true}
  placeholder="Message..."
  onSend={(value) => submitMessage(value)}
  onAttach={() => openFilePicker()}
  onMic={() => startSpeechRecognition()}
  showSearchChip={true}
  onSearchChip={() => triggerSearch()}
/>
```

### Loading state
```jsx
<PromptInput
  loading={true}
  placeholder="Generating response..."
  disabled={true}
/>
```

### With search chip
```jsx
<PromptInput
  showSearchChip={true}
  onSearchChip={() => clearSearch()}
  onSend={(value) => handleMessage(value)}
/>
```

## Layout details

### Desktop (mobile=false)
- Always stacked layout: textarea above toolbar
- Toolbar with [+] [Search chip] | [mic] [send button]
- Gradient border animates on focus/active
- Send button shows gradient when enabled

### Mobile collapsed (mobile=true, no focus, no text)
- Single flex row: [+] [textarea flex-1] [mic] [send button]
- Gray send button (disabled appearance)
- Tight padding: 16px 12px

### Mobile expanded (mobile=true, focused or has text)
- Stacked layout: textarea | toolbar
- Same controls as desktop
- Gradient border animation
- Elevation shadow added
- Auto-focus textarea after layout swap

## Notes
- **Auto-resize textarea** — grows vertically as user types (no scrollbar)
- **Enter sends, Shift+Enter newline** — standard behavior for chat inputs
- **Focus-loop guard** — mobile layout swap includes anti-blur logic to prevent spurious collapse
- **Gradient border animation** — conic gradient cycles through brand palette (#25C8A5 → #1B90B4 → #1A6CC4 → #86FFBB) at 3s/revolution
- **Search chip uses kit Chip** — variant="soft", color="primary", with search icon
- **BEM prefix**: `t1-pi` — see SCSS for token values (spacing, colors, animations)
