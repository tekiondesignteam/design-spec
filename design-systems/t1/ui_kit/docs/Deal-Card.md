# Deal-Card

> Card component for displaying CRM deal summary with vehicle, salesperson, purchase type, and status information.

## When to use
- Display a single automotive deal with its key details (vehicle, salesperson, purchase type, status).
- Embed in AI assistant responses to show deal context at a glance.
- Pair with other domain cards (Task-Card, Credit-Score-Card) in content flows.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `dealId` | string | '#DEAL-NO' | Deal identifier (e.g., '#DEAL-001') |
| `vehicle` | string | 'Year Make Model Trim' | Vehicle description |
| `salesperson` | string | 'Sales person name' | Salesperson name |
| `purchaseType` | string | 'Purchase type' | Purchase type label (e.g., 'Finance', 'Cash') |
| `status` | string | 'Purchase status' | Deal status label |
| `lastUpdated` | string | 'MON DD, YYYY' | Formatted date string |
| `onView` | function | undefined | Callback when "View" button is clicked |
| `className` | string | undefined | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card min-width | 320px |
| Card padding | 12px |
| Icon block size | 36×36px |
| Icon block border-radius | 2px |
| Card border-radius | 2px |
| Header gap | 16px |
| Container gap | 8px |
| Body gap (fields) | 28px |
| Footer gap | 28px |

### Colours
| Element | Property | Token/Value |
|---------|----------|-------|
| Card background | background | $t1-neutral-0 (#ffffff) |
| Card border | border | $t1-neutral-200 (#d4d5d6) |
| Icon block background | background | $t1-neutral-100 (#edeef0) |
| Icon block icon | color | $t1-neutral-500 (#6d707a) |
| Deal ID text | color | $t1-neutral-900 (#161616) |
| Vehicle text | color | $t1-neutral-400 (#969aa3) |
| Field label text | color | $t1-neutral-400 (#969aa3) |
| Field value text | color | $t1-neutral-600 (#444f5c) |
| Internal separator | background | #d4d4d4 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Deal ID | 16px | 500 | 24px |
| Vehicle | 14px | 500 | 20px |
| Field label | 14px | 500 | 16px |
| Field value | 14px | 500 | 20px |

### States
| State | What changes |
|-------|-------------|
| Default | Normal appearance, all text visible |
| Hover (on button) | Button hover state (delegated to Button kit component) |

## Examples

### Basic deal card
```jsx
<DealCard
  dealId="#DEAL-001"
  vehicle="2024 Toyota Camry LE"
  salesperson="Alice Johnson"
  purchaseType="Finance"
  status="Pending Final Paperwork"
  lastUpdated="APR 22, 2026"
  onView={() => console.log('View deal')}
/>
```

### Without callback
```jsx
<DealCard
  dealId="#DEAL-042"
  vehicle="2022 Honda Civic EX"
  salesperson="Bob Smith"
  purchaseType="Cash"
  status="Completed"
  lastUpdated="APR 20, 2026"
/>
```

## Notes
- The component uses the `Button` kit component for the "View" CTA — never replace with raw `<button>`.
- The separator between body and footer uses the `Separator` kit component.
- Vehicle and deal ID text are truncated with ellipsis if they exceed available width.
- Icon is a hardcoded Phosphor car icon (`ph-car` class) — always displayed.
- The card width is 320px minimum but can grow to fill its container.
