# Chat-Bubble

> User message bubble in the chat thread — right-aligned, with copy/edit hover actions.

## When to use
- Rendering a user's sent message in the conversation thread
- Showing a user query before the AI Response appears below it
- Allowing users to edit or copy their own messages after sending

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | "default" \| "hover" | "default" | Frozen visual state for Figma demo; CSS `:hover` works in real usage |
| `actions` | ReactNode[] | `[CopyButton, EditButton]` | Custom action buttons for the hover row; each typically an IconButton |
| `children` | string \| ReactNode | — | The message text or ReactNode content |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container | display flex, flex-direction column |
| Container gap | 8px (permanent, reserved even when actions hidden) |
| Container width | fit-content |
| Container max-width | 480px |
| Container alignment | flex-end (right-aligned) |
| Bubble body padding | 12px |
| Bubble body border-radius | 2px 2px 0 2px (tail at bottom-right) |
| Action row height | 24px (flex-shrink 0, always reserved) |
| Action row gap | 8px |
| Action row alignment | center |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Bubble body | background | $t1-neutral-100 |
| Text | color | $t1-neutral-900 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Text | 14px | $t1-weight-regular | 20px |

### States
| State | What changes |
|-------|-------------|
| default | action row opacity 0, pointer-events none |
| hover | action row opacity 1, pointer-events auto (transition 120ms ease) |
| is-hover (frozen state) | action row opacity 1, pointer-events auto (for Figma demo) |

## Examples

### Minimal
```jsx
<ChatBubble>
  Check inventory status for the 2024 Model S
</ChatBubble>
```

### With custom actions
```jsx
<ChatBubble
  actions={[
    <IconButton key="pin" size="sm" color="neutral" style="plain" aria-label="Pin" />,
    <IconButton key="flag" size="sm" color="neutral" style="plain" aria-label="Flag" />,
  ]}
>
  What's the gross profit margin on service contracts this quarter?
</ChatBubble>
```

### Hover state (Figma demo)
```jsx
<ChatBubble state="hover">
  Show me all open test drive appointments for this week
</ChatBubble>
```

## Notes
- **Always use inside ChatContainer** — do not manually manage row alignment or spacing.
- **Action row reserves space** — a 32px gap below the bubble is always reserved (8px gap + 24px row height) to prevent layout shift when actions appear on hover.
- **Use kit IconButton** — never write raw `<button>` elements for actions.
- **Assistant replies use Response** — never use ChatBubble for AI-generated content.
- **BEM prefix**: `t1-bubble` — see SCSS for customization.
