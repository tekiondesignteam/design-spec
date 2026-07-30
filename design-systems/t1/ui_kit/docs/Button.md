# Button

> Action trigger for forms, modals, and toolbars in AI chat interfaces.

## When to use
- Primary actions (submit deal, assign contact, send message)
- Form submissions and confirmations
- Modal footers and action rows
- Toolbar actions

Never write raw `<button>` — always use the Button kit component.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | "contained" \| "outlined" \| "text" | "contained" | Visual style |
| `color` | "primary" \| "neutral" \| "error" | "primary" | Color theme |
| `size` | "lg" \| "md" \| "sm" | "md" | Button size |
| `iconStart` | string | — | Phosphor icon name |
| `iconEnd` | string | — | Phosphor icon name |
| `loading` | boolean | false | Show loading spinner |
| `disabled` | boolean | false | Disable interaction |
| `onClick` | function | — | Click handler |
| `children` | ReactNode | — | Button text |

## Visual Specification

### Layout & Sizing
| Property | lg | md | sm |
|----------|----|----|-----|
| Height | 36px | 32px | 24px |
| Padding | 0 20px | 0 16px | 0 12px |
| Border-radius | 2px | 2px | 2px |
| Border | 1px solid (varies) | 1px solid (varies) | 1px solid (varies) |
| Gap (icon/text) | 4px | 4px | 4px |
| Icon size (lg/md) | 16px | 16px | 14px |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Label | 14px | $t1-weight-semibold | 16px |

### Colours — Primary / Contained
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | $t1-blue-400 | $t1-neutral-0 | transparent |
| hover | $t1-blue-700 | $t1-neutral-0 | transparent |
| active | $t1-blue-700 | $t1-neutral-0 | transparent |
| disabled | $t1-neutral-50 | $t1-neutral-500 | transparent |

### Colours — Primary / Outlined
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | $t1-neutral-0 | $t1-neutral-900 | $t1-neutral-400 |
| hover | $t1-blue-100 | $t1-blue-700 | $t1-blue-400 |
| active | $t1-blue-100 | $t1-blue-700 | $t1-blue-400 |
| disabled | $t1-neutral-0 | $t1-neutral-400 | $t1-neutral-200 |

### Colours — Primary / Text
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-blue-500 | transparent |
| hover | $t1-blue-100 | $t1-blue-700 | transparent |
| active | $t1-blue-100 | $t1-blue-700 | transparent |
| disabled | transparent | $t1-neutral-400 | transparent |

### Colours — Neutral / Contained
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | $t1-neutral-0 | $t1-neutral-700 | $t1-neutral-400 |
| hover | $t1-neutral-100 | $t1-neutral-700 | transparent |
| active | $t1-neutral-150 | $t1-neutral-700 | transparent |
| disabled | $t1-neutral-200 | $t1-neutral-400 | transparent |

### Colours — Neutral / Outlined
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-neutral-700 | $t1-neutral-150 |
| hover | $t1-neutral-100 | $t1-neutral-700 | $t1-neutral-500 |
| active | $t1-neutral-150 | $t1-neutral-700 | $t1-neutral-600 |
| disabled | transparent | $t1-neutral-400 | $t1-neutral-200 |

### Colours — Neutral / Text
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-neutral-900 | transparent |
| hover | $t1-blue-100 | $t1-blue-700 | transparent |
| active | $t1-blue-100 | $t1-blue-700 | transparent |
| disabled | transparent | $t1-neutral-400 | transparent |

### Colours — Error / Contained
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | $t1-red-400 | $t1-neutral-0 | transparent |
| hover | $t1-red-500 | $t1-neutral-0 | transparent |
| active | $t1-red-700 | $t1-neutral-0 | transparent |
| disabled | $t1-neutral-50 | $t1-btn-err-dis-text | transparent |

### Colours — Error / Outlined
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-red-400 | $t1-red-400 |
| hover | $t1-btn-err-hov-bg | $t1-red-400 | $t1-red-400 |
| active | $t1-btn-err-act-bg | $t1-red-400 | $t1-red-400 |
| disabled | transparent | $t1-neutral-500 | $t1-neutral-200 |

### Colours — Error / Text
| State | Background | Text | Border |
|-------|-----------|------|--------|
| default | transparent | $t1-red-400 | transparent |
| hover | $t1-btn-err-hov-bg | $t1-red-400 | transparent |
| active | $t1-btn-err-act-bg | $t1-red-400 | transparent |
| disabled | transparent | $t1-neutral-500 | transparent |

### Special States
| State | Effect |
|-------|--------|
| focus-visible | outline: 2px solid $t1-blue-400, offset 2px |
| disabled | cursor: not-allowed, pointer-events: none |
| loading | pointer-events: none, label opacity 0.7, spinner shown |
| loading (primary/error contained) | spinner uses $t1-neutral-0 with opacity 0.7 |

## Examples

### Minimal
```jsx
<Button onClick={() => submitDeal()}>Submit Deal</Button>
```

### Modal footer pattern
```jsx
<div className="t1-modal__footer">
  <Button variant="outlined" color="neutral" onClick={onClose}>
    Cancel
  </Button>
  <Button color="primary" onClick={onSave}>
    Save Contact
  </Button>
</div>
```

### With icon
```jsx
<Button iconStart="check-circle" color="primary">
  Assign to Queue
</Button>
```

### Error state
```jsx
<Button variant="contained" color="error" onClick={deleteContact}>
  Delete Contact
</Button>
```

### Loading state
```jsx
<Button loading disabled>
  Uploading Inventory...
</Button>
```

### Outlined variant
```jsx
<Button variant="outlined" color="neutral" size="sm">
  Export CSV
</Button>
```

## Notes
- Always pair with `onClick` handler. Button does not navigate — use `<Link>` for that.
- Icon names must be valid Phosphor icon strings (e.g., "check", "plus", "arrow-right").
- Loading state automatically disables the button.
- Use `color="error"` only for destructive actions (delete, reset).
- See also: `Icon-Button` (square icons only), `Link` (navigation)
