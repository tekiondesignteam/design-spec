# FAB-Icon

> The Tekion AI floating action button — a gradient "T" logo mark. The primary "open AI chat" trigger.

## When to use
- Fixed bottom-right button on any CRM page
- Primary entry point to open the AI assistant chat
- Always visible, accessible floating action

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | boolean | `false` | Disable interaction (grayed out) |
| `onClick` | function | — | Called when button clicked |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Width | 32px |
| Height | 32px |
| Border | 1px solid transparent |
| Border-radius | 24px |
| Padding | 0 |
| Shadow | $t1-shadow-fab |
| Transition | background 120ms ease |
| Logo width | 16px |
| Logo height | 16px |

### Gradient (100.05deg angle)
| State | Start → End |
|-------|------------|
| default | $t1-fab-def-start → $t1-fab-def-end |
| hover | $t1-fab-hov-start → $t1-fab-hov-end |
| active | $t1-fab-act-start → $t1-fab-act-end |
| disabled | $t1-neutral-100 (solid), no shadow |

### Focus
| Property | Value |
|----------|-------|
| Outline | 2px solid $t1-blue-400 |
| Outline-offset | 2px |

## Positioning
- **Position**: `fixed` bottom-right (typically 24px from edges)
- **Z-index**: High (above main content, below modals)
- **Size**: ~56px square (standard FAB)

## Examples
### Open AI chat
```jsx
<FABIcon 
  onClick={() => openChatPanel()}
/>
```

### Disabled state (loading)
```jsx
<FABIcon 
  disabled={true}
/>
```

### With custom positioning
```jsx
<div style={{ position: 'fixed', bottom: '32px', right: '32px' }}>
  <FABIcon onClick={handleOpenChat} />
</div>
```

## Styling
- Gradient background (Tekion teal → blue gradient)
- White T mark SVG inside
- Subtle shadow or elevation
- Hover state: Slightly brighter / scaled up
- Active state: Pressed appearance

## Notes
- T mark is inline SVG (icon from Tekion brand)
- Always use this component for AI chat entry — never use a generic Button
- Place outside main scrollable content (fixed position)
- Should be the single most discoverable interaction on the page
- When chat is open, optionally fade/disable or change to close icon
- Pair with ChatContainer for full chat UI
