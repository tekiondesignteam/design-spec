# Progress-Bar

> Thin progress indicator for tasks, uploads, or loading states

## When to use
- Show upload progress (file / document)
- Display task completion percentage
- Indicate processing progress in chat

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | — | Progress 0–100 (%) |
| `label` | string | — | Optional text above bar (e.g., "Uploading...") |
| `color` | string | "brand" | Theme: "brand" (teal) or "success" (green) |
| `determinate` | boolean | `true` | `false` for indeterminate animated pulse |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container gap | 8px |
| Track height | 4px |
| Track width | 100% |
| Track border-radius | 9999px |
| Fill border-radius | 9999px |
| Fill transition | 400ms ease |

### Typography
| Element | font-size | line-height | font-weight | color |
|---------|-----------|-------------|-------------|-------|
| Label | 14px | 16px | $t1-weight-regular | $t1-neutral-900 |
| Value | 14px | 16px | $t1-weight-regular | $t1-neutral-900 |

### Colours
| Element | Brand (default) | Success |
|---------|-----------------|---------|
| Track bg | $t1-neutral-200 | $t1-neutral-200 |
| Fill bg | $t1-blue-400 | $t1-green-600 |

### Animation
| State | Properties |
|-------|-----------|
| Indeterminate | width 30% (no value), animation: translateX(-120% to 420%) over 1.4s infinite |

## Examples
### Upload progress
```jsx
<ProgressBar 
  value={45}
  label="Uploading inspection report..."
  color="brand"
/>
```

### Task completion
```jsx
<ProgressBar 
  value={100}
  label="Report ready"
  color="success"
/>
```

### Loading (indeterminate)
```jsx
<ProgressBar 
  determinate={false}
  color="brand"
/>
```

### In PlannerCard (auto-calculated)
```jsx
<ProgressBar 
  value={67}
  color="brand"
/>
```

## Notes
- Use inside Response body or chat cards
- Pair with optional label text above bar
- Color changes from brand teal to success green when complete
- For indeterminate (loading): set `determinate={false}` — no value needed
- Bar height is 4px (thin, non-intrusive)
- Use SCSS tokens for colors — never hardcode hex values
