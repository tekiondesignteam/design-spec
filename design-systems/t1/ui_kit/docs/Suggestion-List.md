# Suggestion-List

> Row of clickable suggestion chips shown on the welcome screen. Each chip has an optional icon and label.

## When to use
- Displaying quick-action prompts on the chat welcome screen
- Providing preset conversation starters (e.g., "Review leads", "Analyze metrics")
- Allowing users to click instead of typing their first message

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | (string \| object)[] | [] | Array of suggestions; each can be a string or `{ label, icon?, state?, disabled? }` object |
| `onSelect` | function | — | Callback with (item: object, index: number) when a chip is clicked |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 240px |
| Container display | flex, flex-direction column |
| Item min-height | 32px |
| Item padding | 8px 12px |
| Item border-radius | 2px |
| Item gap (icon/label) | 8px |
| Icon size | 16x16px |
| Icon font-size | 16px |
| Icon line-height | 1 |
| Divider height | 1px |

### Colours
| Element | State | Background | Text | Icon |
|---------|-------|-----------|------|------|
| Item | default | $t1-neutral-0 | $t1-neutral-600 | $t1-neutral-400 |
| Item | hover | $t1-blue-100 | $t1-neutral-500 | $t1-neutral-400 |
| Item | active | $t1-blue-100 | $t1-neutral-500 | $t1-neutral-400 |
| Item | disabled | $t1-neutral-50 | $t1-neutral-400 | $t1-neutral-400 (opacity 0.6) |
| Divider | — | — | $t1-neutral-200 | — |

### Typography
| Element | font-family | font-size | font-weight | line-height |
|---------|------------|-----------|-------------|-------------|
| Label | $t1-font-sans | 14px | 400 | 16px |

### States
| State | What changes |
|-------|-------------|
| hover | background → $t1-blue-100, label color → $t1-neutral-500 |
| active | background → $t1-blue-100, label color → $t1-neutral-500 |
| disabled | background → $t1-neutral-50, cursor not-allowed, pointer-events none, label color → $t1-neutral-400, icon opacity 0.6 |
| focus-visible | outline 2px solid $t1-blue-500, offset -2px |

### Item object schema
```jsx
{
  label: string,              // Required
  icon?: string,              // Phosphor icon name (e.g., "chat-circle-text")
  state?: "default" | "hover" | "active",  // Frozen state for demo (CSS :hover works live)
  disabled?: boolean          // Per-item disabled flag
}
```

## Examples

### Simple labels (string array)
```jsx
<SuggestionList
  items={[
    'Check my schedule',
    'Show today's opportunities',
    'Summarize this week's performance'
  ]}
  onSelect={(item, index) => console.log(`Selected: ${item.label} (${index})`)}
/>
```

### With custom icons
```jsx
<SuggestionList
  items={[
    { label: 'Review leads', icon: 'list' },
    { label: 'Analyze metrics', icon: 'chart-bar' },
    { label: 'Schedule calls', icon: 'calendar' },
    { label: 'Draft messages', icon: 'pencil-simple' }
  ]}
  onSelect={(item) => handleSuggestion(item)}
/>
```

### Mixed with disabled items
```jsx
<SuggestionList
  items={[
    { label: 'Today's tasks', icon: 'clock' },
    { label: 'Upcoming events', icon: 'calendar', disabled: true },
    { label: 'Team updates', icon: 'users' }
  ]}
  onSelect={(item) => processQuery(item)}
/>
```

### Frozen states (Figma demo)
```jsx
<SuggestionList
  items={[
    { label: 'View my leads', icon: 'list', state: 'default' },
    { label: 'Analyze metrics', icon: 'chart-bar', state: 'hover' },
    { label: 'Schedule follow-ups', icon: 'calendar', state: 'active' }
  ]}
/>
```

## Item states

| State | Background | Text | Usage |
|-------|-----------|------|-------|
| default | #ffffff | #444f5c | Initial state |
| hover | #dbebff | #6d707a | `:hover` or `.is-hover` |
| active | #dbebff | #6d707a | `:active` or `.is-active` |
| disabled | #f4f5f6 | #969aa3 | `disabled={true}` or `.is-disabled` |

## Notes
- **String shorthand** — a plain string is converted to `{ label: string, icon: 'chat-circle-text' }`
- **Icon default** — if no icon is provided, defaults to "chat-circle-text" (Phosphor icon name without "ph-" prefix)
- **Dividers between items** — 1px neutral-200 line between adjacent chips (never before first)
- **Disabled items** — never fire `onSelect` callback
- **BEM prefix**: `t1-sug` — see SCSS for colors and spacing
