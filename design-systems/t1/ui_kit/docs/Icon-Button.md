# Icon-Button

> Square icon-only button for compact toolbars, headers, and action rows.

## When to use
- Close modal (×)
- Copy to clipboard
- Edit inline
- More actions (kebab menu ⋮)
- Delete, refresh, or toggle states

Never write raw `<button>` — always use Icon-Button for icon-only triggers.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | "neutral" \| "inverse" | "neutral" | Color theme |
| `style` | "contained" \| "plain" | "contained" | Background style |
| `size` | "lg" \| "md" \| "sm" | "md" | Button size |
| `icon` | ReactNode | — | Phosphor icon or JSX |
| `loading` | boolean | false | Show spinner |
| `states` | string[] | — | Hover/active/disabled states |
| `aria-label` | string | — | **Required** for accessibility |
| `onClick` | function | — | Click handler |

## Visual Specification

### Layout & Sizing
| Property | sm | md | lg |
|----------|----|----|-----|
| Width | 24px | 32px | 40px |
| Height | 24px | 32px | 40px |
| Border | 1px solid (varies) | 1px solid (varies) | 1px solid (varies) |
| Border-radius | $t1-radius-xs | $t1-radius-xs | $t1-radius-xs |

### Colours — Neutral / Contained
| State | Background | Icon | Border |
|-------|-----------|------|--------|
| default | $t1-neutral-0 | $t1-neutral-700 | $t1-neutral-400 |
| hover | $t1-neutral-100 | $t1-neutral-900 | transparent |
| active | $t1-neutral-150 | $t1-neutral-900 | transparent |
| disabled | $t1-neutral-200 | $t1-neutral-400 | transparent |

### Colours — Neutral / Plain
| State | Background | Icon | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-neutral-600 | transparent |
| hover | $t1-neutral-100 | $t1-neutral-700 | transparent |
| active | $t1-neutral-150 | $t1-neutral-900 | transparent |
| disabled | transparent | $t1-neutral-400 | transparent |

### Colours — Inverse / Contained
| State | Background | Icon | Border |
|-------|-----------|------|--------|
| default | $t1-neutral-0 | $t1-neutral-600 | transparent |
| hover | $t1-neutral-50 | $t1-neutral-600 | transparent |
| active | $t1-neutral-100 | $t1-neutral-600 | transparent |
| disabled | $t1-neutral-700 | $t1-neutral-400 | transparent |

### Colours — Inverse / Plain
| State | Background | Icon | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-neutral-0 | transparent |
| hover | $t1-neutral-600 | $t1-neutral-0 | transparent |
| active | $t1-iib-inv-plain-active | $t1-neutral-0 | transparent |
| disabled | transparent | $t1-neutral-400 | transparent |

### Loading Spinner
| Size | Width | Height | Border-width |
|------|-------|--------|--------------|
| sm | 12px | 12px | 1.5px |
| md | 14px | 14px | 2px |
| lg | 18px | 18px | 2px |

## Examples

### Modal close button
```jsx
<Icon-Button
  aria-label="Close dialog"
  icon={<Phi name="x" size={20} />}
  onClick={onClose}
  style="plain"
/>
```

### Copy action
```jsx
<Icon-Button
  aria-label="Copy deal ID"
  icon={<Phi name="copy" size={16} />}
  onClick={() => navigator.clipboard.writeText(dealId)}
  size="sm"
/>
```

### More actions (inverse)
```jsx
<Icon-Button
  aria-label="Show menu"
  icon={<Phi name="dots-three-vertical" size={18} />}
  color="inverse"
  onClick={toggleMenu}
/>
```

### Refresh data
```jsx
<Icon-Button
  aria-label="Refresh contacts"
  icon={<Phi name="arrow-clockwise" size={16} />}
  size="md"
  onClick={fetchContacts}
/>
```

### Delete (error)
```jsx
<Icon-Button
  aria-label="Delete note"
  icon={<Phi name="trash" size={16} />}
  color="neutral"
  onClick={handleDelete}
/>
```

## Notes
- `aria-label` is **required** for accessibility — describe the action, not the icon.
- Use `style="plain"` for subtle, secondary actions (close, copy).
- Use `style="contained"` for primary icon actions.
- Always pass `icon` as a Phosphor `<Phi>` component.
- Square buttons maintain 1:1 aspect ratio.
- See also: `Button` (text buttons), `Phi` (icon library)
