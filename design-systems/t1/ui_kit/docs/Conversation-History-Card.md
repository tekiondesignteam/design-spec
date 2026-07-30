# Conversation-History-Card

> Shows a past conversation entry — used in sidebar panels or search results

## When to use
- List previous conversations in sidebar history
- Show as search result when user searches past conversations
- Build conversation picker / switcher dropdowns

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Monthly Sales Review" | Conversation title / subject |
| `when` | string | "Today" | Timestamp label (e.g., "Today", "Yesterday", "Mar 15") |
| `preview` | string | — | One-line content preview from conversation |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 326px |
| Card padding | 16px |
| Card border-radius | 6px |
| Card border | 1px solid |
| Card gap | 8px |
| Header gap | 8px |
| Title row gap | 4px |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Card | background | $t1-neutral-0 |
| Card | border | $t1-neutral-200 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 16px | 600 | 24px | $t1-neutral-900 |
| Subtext | 14px | 500 | 16px | $t1-neutral-900 |
| When | 12px | 500 | 16px | $t1-neutral-900 |
| Preview | 14px | 400 | 16px | $t1-neutral-900 |

### States
| State | What changes |
|-------|-------------|
| default | All elements visible at default colours and typography |

## Examples
### Recent conversation
```jsx
<ConversationHistoryCard 
  title="Flora Fleisher: Follow-up"
  when="Today at 2:15 PM"
  preview="Discussed test drive availability and trade-in options..."
/>
```

### Older conversation
```jsx
<ConversationHistoryCard 
  title="Deal Pipeline Review"
  when="Yesterday"
  preview="Analyzed Q2 sales forecast and open opportunities"
/>
```

### In sidebar list
```jsx
<div>
  <ConversationHistoryCard 
    title="Customer Inquiry: 2023 AeroVibe"
    when="Mar 22"
    preview="Checked inventory, pricing, and financing options"
  />
  <ConversationHistoryCard 
    title="Monthly Sales Review"
    when="Mar 20"
    preview="Reviewed pipeline health and forecasted revenue"
  />
</div>
```

## Notes
- Card is clickable — click to open conversation thread
- `preview` should be a short excerpt (one line max)
- `when` should match conversation log format for consistency
- Use in narrow sidebar (240–280px) or search result list
