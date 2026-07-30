# Badge

> Status indicator or count chip. Used for notifications, labels, and progress states.

## When to use
- Notification count (unread messages, pending tasks)
- Status labels (online, away, urgent)
- Progress counters (completed items, queue size)
- Indicator dots (new, updated, error)

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | number | — | Number to display (capped at 99+) |
| `color` | "primary" \| "success" \| "error" \| "warning" \| "neutral" | "primary" | Badge color |
| `light` | boolean | false | Lighter background variant |
| `dot` | boolean | false | Show only colored dot (no number) |

## Visual Specification

### Layout & Sizing
| Variant | Width | Height | Font-size | Padding | Line-height |
|---------|-------|--------|-----------|---------|-------------|
| md (number) | 20px min-width | 20px | 12px | 2px 4px 0 | 16px |
| sm (number) | 16px min-width | 16px | 10px | 2px 3px 0 | 12px |
| dot | 8px | 8px | — | 0 | 1 |
| icon | 20px | 20px | — | 0 | 1 |

### Colours
| Color | Background | Text | Use case |
|-------|-----------|------|----------|
| primary | #4285f4 | #ffffff | Default status, new items |
| success | #56bf4d | #ffffff | Completed, online |

### Typography
| Element | font-family | font-weight | line-height |
|---------|------------|-------------|-------------|
| Badge text | $t1-font-sans | 600 | 1 |

### States
| State | What changes |
|-------|-------------|
| default | shows count or icon |
| dot | width/height 8px, no padding, no text |
| count 99+ | displays "99+" (capped) |
| light variant | lighter background (controlled by color prop combination) |

## Examples

### Notification count
```jsx
<Badge count={7} color="error" />
```

### With light background
```jsx
<Badge count={3} color="primary" light={true} />
```

### Large count (99+)
```jsx
<Badge count={127} color="warning" />
{/* Renders as "99+" */}
```

### Status dot
```jsx
<Badge dot={true} color="success" />
```

### Next to label
```jsx
<div className="t1-status">
  <span>Pending Assignments</span>
  <Badge count={4} color="warning" />
</div>
```

### NavBar item with count
```jsx
<Button>
  Messages
  <Badge count={12} color="error" />
</Button>
```

## Notes
- `dot={true}` hides the number and shows only a colored circle.
- Max count display is "99+" — actual count can exceed this.
- `light={true}` uses a lighter, lower-contrast background.
- Color values: primary (blue), success (green), error (red), warning (orange), neutral (gray).
- See also: `Chip` (selectable tags), `Button` (action triggers)
