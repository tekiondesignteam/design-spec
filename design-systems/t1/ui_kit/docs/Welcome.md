# Welcome

> Empty/start state for the chat interface. Displays Tekion AI logo mark with personalized greeting and description.

## When to use
- Showing the initial state of a chat session before any messages
- Greeting the user with their name and an action prompt
- Paired with SuggestionList below to show quick-action prompts

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | "John" | User's first name for personalized greeting |
| `description` | string | "How can I help you today?" | Subtitle or call-to-action text |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 164px |
| Container display | flex, flex-direction column |
| Container gap | 16px |
| Logo width | 40px |
| Logo height | 40px |
| Label block gap | 4px |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Heading | color | $t1-neutral-900 |
| Description | color | $t1-neutral-400 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Heading | 24px | $t1-weight-semibold | 30px |
| Description | 14px | $t1-weight-regular | 16px |

## Examples

### Minimal
```jsx
<Welcome />
```

### Personalized
```jsx
<Welcome
  name="Sarah"
  description="Ready to dive into your Q2 pipeline?"
/>
```

### With SuggestionList
```jsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
  <Welcome
    name="Alex"
    description="What would you like to accomplish today?"
  />
  <SuggestionList
    items={[
      { label: 'Review this week's leads', icon: 'list' },
      { label: 'Analyze sales metrics', icon: 'chart-bar' },
      { label: 'Schedule follow-ups', icon: 'calendar' }
    ]}
    onSelect={(item) => console.log('Selected:', item.label)}
  />
</div>
```

## Anatomy
- **Logo**: 40×40 Tekion AI gradient-filled dot mark (SVG inline)
- **Heading**: "Hi {name}," — display2Bold, 28px / 700 weight
- **Description**: Subtitle text — body1Regular, 16px / 400 weight

## Notes
- **Logo is decorative** — does not render as a clickable link or interactive element
- **BEM prefix**: `t1-wlc` — see SCSS for color and typography tokens
- **Pair with SuggestionList** — Welcome + SuggestionList form the ideal empty state pattern
- **Single-line greeting** — name is shown inline with "Hi"; description on next line
