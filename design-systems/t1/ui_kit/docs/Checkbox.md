# Checkbox

> Boolean toggle for forms, multi-select lists, and settings.

## When to use
- Modal forms (opt-in preferences, acknowledge terms)
- Multi-select filter lists
- Settings panels (notifications, visibility)
- Single or multiple option selection

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Checkbox label |
| `description` | string | — | Helper text below |
| `checked` | boolean | false | Checked state |
| `indeterminate` | boolean | false | Partial selection (—) |
| `disabled` | boolean | false | Disable input |
| `shape` | "square" \| "circle" | "square" | Checkbox shape |
| `color` | "brand" \| "success" | "brand" | Checked color |
| `state` | string | — | Hover/active/disabled state |
| `onChange` | function(event) | — | Change handler |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Box width | 16px |
| Box height | 16px |
| Gap (box to label) | 8px |
| Border width | 1.5px |
| Border-radius (square) | 2px |
| Border-radius (circle) | 9999px |
| Icon size | 9px |
| Label font-size | 13px |
| Label line-height | 20px |
| Description font-size | 12px |
| Description line-height | 16px |
| Label/description gap | 2px |

### Colours — Unchecked
| State | Box bg | Box border | Icon |
|-------|--------|-----------|------|
| default | transparent | $t1-neutral-400 | — |
| hover | transparent | $t1-blue-400 | — |
| active | transparent | $t1-blue-700 | — |
| disabled | $t1-neutral-50 | $t1-neutral-200 | — |

### Colours — Brand Checked/Indeterminate
| State | Box bg | Box border | Icon |
|-------|--------|-----------|------|
| default | $t1-blue-400 | transparent | $t1-neutral-0 |
| hover | $t1-blue-700 | transparent | $t1-neutral-0 |
| active | $t1-blue-700 | transparent | $t1-neutral-0 |
| disabled | $t1-neutral-50 | $t1-neutral-200 | $t1-neutral-400 |

### Colours — Success Checked
| State | Box bg | Box border | Icon |
|-------|--------|-----------|------|
| default | $t1-green-500 | transparent | $t1-neutral-0 |
| hover | $t1-green-500 | transparent | $t1-neutral-0 |
| disabled | $t1-neutral-50 | $t1-neutral-200 | $t1-neutral-400 |

### Typography
| Element | font-size | font-weight | line-height | color |
|---------|-----------|-------------|-------------|-------|
| Label | 13px | 400 | 20px | $t1-neutral-900 (normal), $t1-neutral-400 (disabled) |
| Description | 12px | 400 | 16px | $t1-neutral-500 (normal), $t1-neutral-400 (disabled) |

## Examples

### Basic checkbox
```jsx
<Checkbox
  label="Send reminder email"
  checked={reminder}
  onChange={(e) => setReminder(e.target.checked)}
/>
```

### With description
```jsx
<Checkbox
  label="Auto-assign to my queue"
  description="New leads will be automatically assigned"
  checked={autoAssign}
  onChange={(e) => setAutoAssign(e.target.checked)}
/>
```

### In form
```jsx
<Modal open={open} title="New Contact" onClose={onClose}>
  <Checkbox
    label="Mark as primary contact"
    checked={isPrimary}
    onChange={(e) => setIsPrimary(e.target.checked)}
  />
  <Checkbox
    label="Notify on updates"
    checked={notify}
    onChange={(e) => setNotify(e.target.checked)}
  />
  <Button onClick={save}>Save</Button>
</Modal>
```

### Indeterminate (group parent)
```jsx
<Checkbox
  label="Select all stages"
  indeterminate={someChecked && !allChecked}
  checked={allChecked}
  onChange={toggleAll}
/>
```

### Circle variant
```jsx
<Checkbox
  label="Online"
  shape="circle"
  color="success"
  checked={isOnline}
  onChange={(e) => setIsOnline(e.target.checked)}
/>
```

## Notes
- `onChange` receives a synthetic event. Use `e.target.checked` for boolean value.
- Use `color="success"` for positive states (online, active).
- Use `color="brand"` (primary) for default selections.
- Indeterminate is read-only — typically for group headers.
- See also: `Switch` (on/off toggle), `Chip` (tag selection)
