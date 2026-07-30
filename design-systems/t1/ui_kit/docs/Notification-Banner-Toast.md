# Notification-Banner & Toast

> Two notification components: Toast (small floating), Banner (full-width persistent)

## When to use

### Toast
- Transient feedback (auto-dismiss 3–5s): "Deal saved", "SMS sent"
- Small floating notification, top-right position
- Non-blocking, dismissible

### NotificationBanner
- Persistent system states: "Sync failed", "Read-only mode"
- Full-width bar (header or page level)
- Requires user action or stays visible

## Props (both)
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | string | `"info"` | Status: "info", "success", "warning", "error", "neutral" |
| `title` | string | — | Notification heading (required) |
| `description` | string | — | Optional message body |
| `onClose` | function | — | Called on close button click; if omitted, no close button |
| `className` | string | — | Extra CSS class |

## Examples
### Toast: Deal saved
```jsx
<Toast 
  color="success"
  title="Deal created"
  description="2023 AeroVibe for Flora Fleisher added to pipeline"
/>
```

### Toast: Error, dismissible
```jsx
<Toast 
  color="error"
  title="SMS send failed"
  description="Check phone number and try again"
  onClose={() => console.log('dismissed')}
/>
```

### Banner: Read-only mode
```jsx
<NotificationBanner 
  color="warning"
  title="Demo mode: No changes will be saved"
/>
```

### Banner: Sync failure with action
```jsx
<NotificationBanner 
  color="error"
  title="Sync failed"
  description="Customer data could not be updated. Retry in a few minutes."
  onClose={handleDismiss}
/>
```

## Visual Specification

### Toast

#### Layout & Sizing
| Property | Value |
|----------|-------|
| Max width | 361px |
| Padding | $t1-space-4 (16px) |
| Gap | $t1-space-2 (8px) |
| Border-radius | $t1-radius-xs (2px) |
| Border | 1px solid transparent |
| Icon block width/height | 32px |
| Icon block border-radius | $t1-radius-xs (2px) |
| Icon size | 16px |
| Icon wrap margin-top (with desc) | 4px |

#### Colours
| Element | Property | info | error | warning | success |
|---------|----------|------|-------|---------|---------|
| Icon block | background | $t1-blue-400 | $t1-red-400 | $t1-amber-400 | $t1-green-500 |
| Icon block | colour | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 |

#### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 16px | $t1-weight-semibold | 24px | $t1-neutral-900 |
| Description | 14px | $t1-weight-regular | 16px | $t1-neutral-600 |

### NotificationBanner

#### Layout & Sizing
| Property | Value |
|----------|-------|
| Width | 100% |
| Border | 1px solid |
| Border colour | $t1-neutral-200 |
| Status bar width | 4px |
| Status bar border-radius | $t1-radius-pill |
| Status bar margin | $t1-space-2 (8px) |
| Inner gap | $t1-space-4 (16px) |
| Inner padding | $t1-space-2 (8px) |
| Icon block width/height | 32px |
| Icon block border-radius | $t1-radius-xs (2px) |
| Labels gap | $t1-space-4 (16px) |

#### Colours
| Element | Property | neutral | info | error | warning | success |
|---------|----------|---------|------|-------|---------|---------|
| Status bar | background | $t1-neutral-400 | $t1-blue-400 | $t1-red-400 | $t1-amber-400 | $t1-green-500 |
| Icon block | background | $t1-neutral-400 | $t1-blue-400 | $t1-red-400 | $t1-amber-400 | $t1-green-500 |
| Icon block | colour | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 |
| Title | colour | $t1-neutral-900 | $t1-blue-400 | $t1-red-400 | $t1-amber-400 | $t1-green-500 |
| Description | colour | $t1-neutral-900 | $t1-neutral-900 | $t1-neutral-900 | $t1-neutral-900 | $t1-neutral-900 |

#### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 16px | $t1-weight-semibold | 24px | Variant-specific |
| Description | 14px | $t1-weight-regular | 16px | $t1-neutral-900 |

### States
| State | What changes |
|-------|-------------|
| default (Toast) | Icon block background matches colour variant |
| default (Banner) | Status bar and icon block match colour variant, title colour matches variant |

## Behavior
- **Toast**: Auto-dismisses after 3–5s (via external timer, not built-in)
- **Banner**: Stays visible until user closes or condition resolves
- Both show icon block matching `color` prop
- Both use Phosphor icon "info" (severity is color-coded, not icon-based)

## Notes
- Place Toast in fixed container (top-right)
- Place Banner in page header or panel top
- Icon is always "info" circle — color conveys severity
- Link kit `IconButton` for close action
- Consider stacking multiple Toasts vertically (Toast Manager pattern)
