# Planner-Card

> Shows an AI-generated action plan with numbered lists and progress tracking

## When to use
- AI generates a step-by-step checklist (e.g., "Steps to close this deal")
- Display multi-list workflows (prioritized action items)
- Show task progress with completion percentage

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Flora Fleisher: Action Plan" | Card heading + person/deal name |
| `lists` | array | See example | Array of `{ label, items }` groups (max 2 lists) |
| `className` | string | — | Extra CSS class |

### `lists` structure
```js
[
  {
    label: "1. Initial Contact",
    items: [
      { text: "Schedule test drive", checked: true },
      { text: "Get trade-in value", checked: false },
      { text: "Run credit pre-check", checked: false }
    ]
  },
  {
    label: "2. Closing",
    items: [
      { text: "Prepare contract", checked: false }
    ]
  }
]
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 320px |
| Card padding | 16px |
| Border radius | 6px |
| Border | 1px solid |

### Colours
| Element | Property | Default | Completed |
|---------|----------|---------|-----------|
| Card background | background | $t1-neutral-0 | $t1-green-25 |
| Card border | border | $t1-neutral-200 | $t1-green-500 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 14px | $t1-weight-semibold | 16px | $t1-neutral-900 |
| Suffix (default) | 12px | $t1-weight-semibold | 16px | $t1-neutral-400 |
| Suffix (completed) | 12px | $t1-weight-semibold | 16px | $t1-green-500 |
| Group label | 14px | $t1-weight-semibold | 16px | $t1-neutral-400 |
| Item text (unchecked) | 12px | $t1-weight-medium | 16px | $t1-neutral-900 |
| Item text (checked) | 12px | $t1-weight-regular | 16px | $t1-neutral-400 |

### Spacing
| Element | Property | Value |
|---------|----------|-------|
| Header | gap | 8px |
| Title row | gap | 24px |
| List groups | gap | 16px |
| Group | gap | 16px |
| Item list | gap | 16px |
| Card | gap | 16px |
| Item | gap | 8px |

### States
| State | What changes |
|-------|-------------|
| default | Background $t1-neutral-0, border $t1-neutral-200, suffix colour $t1-neutral-400 |
| completed | Background $t1-green-25, border $t1-green-500, suffix colour $t1-green-500 |
| item checked | Item text colour changes to $t1-neutral-400, font-weight to $t1-weight-regular |

## Examples
### Two lists, partial progress
```jsx
<PlannerCard 
  title="Alex Martinez: Deal Plan"
  lists={[
    {
      label: "1. Qualification",
      items: [
        { text: "Confirm buyer status", checked: true },
        { text: "Identify trade-in vehicle", checked: false },
        { text: "Check credit pre-approval", checked: false }
      ]
    },
    {
      label: "2. Negotiation",
      items: [
        { text: "Present financing terms", checked: false }
      ]
    }
  ]}
/>
```

### Completed plan
```jsx
<PlannerCard 
  title="Monthly Review: Q2 Forecast"
  lists={[
    {
      label: "1. Analysis",
      items: [
        { text: "Review pipeline", checked: true },
        { text: "Model scenarios", checked: true }
      ]
    }
  ]}
/>
```

## Notes
- Display-only — checked states come from props (AI controls them)
- Progress bar auto-calculates: `doneCount / totalCount`
- When all items checked, bar turns success color + shows "COMPLETED"
- Use inside Response contentSlot when AI drafts a plan
- Supports up to 2 lists; lists are separated by divider lines
