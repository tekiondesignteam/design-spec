# Notify-My-Card

> Shows a notification request when AI is processing a long task (e.g., "Notify me when the report is ready")

## When to use
- AI starts a background processing task (report generation, sync, etc.)
- Offer optional notification when done (vs. user watching spinner)
- Show confirmation state after user clicks "Notify me"

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | string | — | Task title (e.g., "Report Being Generated") |
| `description` | string | — | Brief explanation |
| `actionLabel` | string | "Notify me when done" | Button text |
| `notified` | boolean | `false` | Set to `true` after user clicks to show confirmed state |
| `onNotify` | function | — | Called when user clicks action button |
| `className` | string | — | Extra CSS class |

## Examples
### Waiting for notification
```jsx
<NotifyMyCard 
  heading="Report is being generated..."
  description="This typically takes 2–3 minutes."
  actionLabel="Notify me when done"
  notified={false}
  onNotify={() => console.log('User opted in')}
/>
```

### After user clicks
```jsx
<NotifyMyCard 
  heading="Report is being generated..."
  description="You will be notified when ready."
  notified={true}
/>
```

### In Response contentSlot
```jsx
<Response>
  <NotifyMyCard 
    heading="Syncing customer data..."
    description="Large dataset in progress."
    onNotify={handleNotify}
  />
</Response>
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 320px |
| Card border-radius | 6px |
| Card padding | 16px |
| Card border | 1px solid |
| Icon block (default) | 28×28px, radius 2px |
| Icon block (notified) | 24×24px, radius 9999px |
| Icon (default) | 16px |
| Icon (notified) | 12px |

### Colours
| Element | Property | Default | Notified |
|---------|----------|---------|----------|
| Card | background | $t1-neutral-0 | $t1-blue-50 |
| Card | border | $t1-neutral-200 | $t1-blue-400 |
| Icon block (default) | background | $t1-neutral-100 | — |
| Icon (default) | colour | $t1-neutral-600 | — |
| Icon block (notified) | background | — | $t1-blue-400 |
| Icon (notified) | colour | — | $t1-neutral-0 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Heading | 16px | $t1-weight-semibold | 24px | $t1-neutral-600 |
| Description | 14px | $t1-weight-medium | 16px | $t1-neutral-400 |
| Notified text | 14px | $t1-weight-semibold | 16px | $t1-neutral-600 |

### Spacing
| Element | Property | Default | Notified |
|---------|----------|---------|----------|
| Card | gap | 24px | 8px |
| Top row | gap | 8px | — |
| Body | gap | 8px | — |

### States
| State | What changes |
|-------|-------------|
| default | Card background $t1-neutral-0, border $t1-neutral-200, icon block square with neutral styling, heading and description visible |
| notified | Card layout changes to row, background $t1-blue-50, border $t1-blue-400, icon block circular with blue background and checkmark, notified text visible |

## Notes
- Button is disabled / hidden once `notified` becomes `true`
- Confirmed state shows checkmark icon + "You'll be notified" message
- Use when background task will take >30s
- Can appear while ReasoningLog is also visible (complementary, not competing)
- Optional — not required for all async operations
