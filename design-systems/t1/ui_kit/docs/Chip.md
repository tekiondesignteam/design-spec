# Chip

> Selectable tag or filter pill. Use for categories, status labels, and removable selections.

## When to use
- Filter state chips (selected stages, assignees)
- Category tags (deal type, industry)
- Status labels (hot lead, follow-up needed)
- Removable selections in forms
- Badge replacements with more context

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | "outlined" \| "soft" | "outlined" | Visual style |
| `color` | "neutral" \| "primary" | "neutral" | Color theme |
| `size` | "md" \| "xs" | "md" | Chip size |
| `startIcon` | string | — | Phosphor icon name (left) |
| `endIcon` | string | — | Phosphor icon name (right) |
| `avatar` | string | — | Image URL for mini avatar |
| `disabled` | boolean | false | Disable selection |
| `onClick` | function | — | Selection handler |
| `children` | ReactNode | — | Chip text |

## Visual Specification

### Layout & Sizing
| Size | Height | Padding | Font-size | Line-height | Icon size | Avatar |
|------|--------|---------|-----------|-------------|-----------|--------|
| md | 24px | 0 6px | 14px | 16px | 16x16px | 16x16px (20x20 image inside) |
| xs | 16px | 0 6px 0 4px | 12px | 16px | 12x12px | — |
| Label padding (both) | — | 0 4px | — | — | — | — |
| Avatar padding-right | — | 4px | — | — | — | — |

### Colours — Neutral / Outlined
| State | Background | Border | Text |
|-------|-----------|--------|------|
| default | transparent | $t1-neutral-200 | $t1-neutral-600 |
| hover | $t1-neutral-150 | $t1-neutral-600 | $t1-neutral-600 |
| active | $t1-neutral-200 | $t1-neutral-600 | $t1-neutral-600 |
| disabled | transparent | $t1-neutral-200 | $t1-neutral-400 |

### Colours — Neutral / Soft
| State | Background | Border | Text |
|-------|-----------|--------|------|
| default | $t1-neutral-100 | transparent | $t1-neutral-600 |
| hover | $t1-neutral-100 | transparent | $t1-neutral-600 |
| active | $t1-neutral-100 | transparent | $t1-neutral-600 |
| disabled | $t1-neutral-200 | transparent | $t1-neutral-0 |

### Colours — Primary / Outlined
| State | Background | Border | Text |
|-------|-----------|--------|------|
| default | transparent | $t1-blue-400 | $t1-blue-500 |
| hover | $t1-blue-100 | $t1-blue-400 | $t1-blue-700 |
| active | $t1-blue-100 | $t1-blue-700 | $t1-blue-700 |
| disabled | transparent | $t1-neutral-200 | $t1-neutral-400 |

### Colours — Primary / Soft
| State | Background | Border | Text |
|-------|-----------|--------|------|
| default | $t1-blue-50 | transparent | $t1-blue-500 |
| hover | $t1-blue-100 | transparent | $t1-blue-700 |
| active | $t1-blue-100 | transparent | $t1-blue-700 |
| disabled | $t1-neutral-50 | transparent | $t1-neutral-500 |

### Typography
| Element | font-family | font-weight | line-height |
|---------|------------|-------------|-------------|
| Label | var(--t1-font-sans) | 600 | 16px |

### States
| State | What changes |
|-------|-------------|
| hover | background/border/text change per variant/color table |
| active | background/border/text change per variant/color table |
| disabled | cursor not-allowed, pointer-events none, colors per table |
| focus-visible | outline 2px solid $t1-blue-700, offset 2px |

## Examples

### Basic chip
```jsx
<Chip color="neutral" onClick={() => toggleStage('Prospecting')}>
  Prospecting
</Chip>
```

### With icon
```jsx
<Chip
  startIcon="star"
  color="primary"
  onClick={toggleHot}
>
  Hot Lead
</Chip>
```

### Small variant
```jsx
<Chip
  size="xs"
  color="primary"
  onClick={removeDealType}
  endIcon="x"
>
  Commercial
</Chip>
```

### Soft background
```jsx
<Chip
  variant="soft"
  color="neutral"
  onClick={toggleFilter}
>
  Needs Follow-up
</Chip>
```

### With avatar
```jsx
<Chip
  avatar="https://api.dealer.com/reps/alice-chen.jpg"
  color="primary"
  onClick={() => selectRep('alice')}
>
  Alice Chen
</Chip>
```

### Filter toolbar
```jsx
<div className="t1-filter-chips">
  <Chip color="neutral" onClick={toggleStage}>Prospecting</Chip>
  <Chip color="primary" onClick={toggleStage}>Negotiation</Chip>
  <Chip color="primary" onClick={toggleStage}>Closing</Chip>
</div>
```

## Notes
- Icon names must be valid Phosphor strings.
- Use `endIcon="x"` for removable/closeable chips.
- `soft` variant has lighter background, useful for selected/active state.
- `disabled={true}` prevents clicks but keeps visual presence.
- Soft + primary = typically used for selected filters.
- See also: `Badge` (non-interactive status), `Button` (action triggers)
