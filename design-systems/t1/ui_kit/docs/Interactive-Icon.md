# Interactive-Icon

> Tappable icon with defined hover/active/disabled states — for inline icon actions that don't warrant a full IconButton

## When to use
- Expand/collapse toggles inside list rows
- Pin or flag actions in cards
- Secondary inline actions (not primary CTA)
- Icon actions inside dense content areas

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | ReactNode | — | Icon element (e.g., `<Phi name="star" />`) |
| `color` | string | "neutral" | "neutral", "primary", or "error" |
| `size` | string | "md" | "xs", "sm", "md", "lg", "xl" |
| `states` | string | "default" | Current state: "default", "hover", "active", "disabled" |
| `aria-label` | string | — | Accessibility label (required) |
| `onClick` | function | — | Click handler |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Size | Width | Height | Icon size |
|------|-------|--------|-----------|
| xs | 16px | 16px | 10px |
| sm | 20px | 20px | 12px |
| md | 24px | 24px | 14px |
| lg | 32px | 32px | 16px |
| xl | 40px | 40px | 20px |

### Colours — Neutral
| State | Bg | Icon |
|-------|----|----|
| default | transparent | $t1-neutral-600 |
| hover | $t1-neutral-50 | $t1-neutral-600 |
| active | $t1-neutral-50 | $t1-neutral-600 |
| disabled | transparent | $t1-neutral-400 |

### Colours — Primary
| State | Bg | Icon |
|-------|----|----|
| default | transparent | $t1-blue-400 |
| hover | $t1-neutral-50 | $t1-blue-700 |
| active | $t1-neutral-50 | $t1-blue-700 |
| disabled | transparent | $t1-neutral-50 |

### Colours — Error
| State | Bg | Icon |
|-------|----|----|
| default | transparent | $t1-interactive-error-icon |
| hover | $t1-neutral-50 | $t1-red-500 |
| active | $t1-neutral-50 | $t1-red-700 |
| disabled | transparent | $t1-neutral-50 |

### Animation
| Property | Value |
|----------|-------|
| Transition | background-color 120ms ease, color 120ms ease |
| Focus outline | 2px solid $t1-border-focus, offset 2px |

## Examples
### Expand/collapse in row
```jsx
<Interactive-Icon 
  icon={<Phi name="caret-down" />}
  size="md"
  color="neutral"
  aria-label="Expand details"
  onClick={() => setExpanded(!expanded)}
/>
```

### Star / favorite toggle
```jsx
<Interactive-Icon 
  icon={<Phi name="star" weight={isFavorite ? 'fill' : 'regular'} />}
  size="sm"
  color="primary"
  aria-label="Toggle favorite"
  onClick={toggleFavorite}
/>
```

### Disabled state
```jsx
<Interactive-Icon 
  icon={<Phi name="trash" />}
  size="md"
  color="error"
  states="disabled"
  aria-label="Delete (disabled)"
/>
```

## Visual states
- **default**: Neutral gray icon, subtle hover effect
- **hover**: Slight background tint, icon brightens
- **active**: Filled background, stronger color
- **disabled**: Grayed out, no interaction

## Notes
- Use for secondary actions only (primary actions use Button or IconButton)
- Always include `aria-label` for accessibility
- Icon is usually Phi (Phosphor) component
- Smaller and less visually prominent than IconButton
- Good for dense UIs (lists, tables, cards with multiple actions)
- Pair with keyboard support (Space/Enter for a11y)
