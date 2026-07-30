# Global-Search

> Full-width global search/AI query bar with mode toggle (AI chat vs. keyword search)

## When to use
- Header / top bar AI chat quick-entry
- Command palette or global search input
- Page entry point for asking questions or searching content

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMode` | string | "ai" | Start in "ai" or "search" mode |
| `placeholder` | string | — | Override default placeholder text |
| `onAsk` | function | — | Called with input value on submit or Enter |
| `className` | string | — | Extra CSS class |

## Behavior
- **Segment switch**: Click T1 logo to enter AI mode, magnifier to enter search mode
- **AI mode**: "Search here..." placeholder, blue Ask button when focused with text
- **Search mode**: "Ask • Find • Summarize" placeholder (keyword lookup)
- **Submit**: Click Ask button or press Enter
- **Visual states**: Default, focused, active with Ask button

## Examples
### AI search (default)
```jsx
<GlobalSearch 
  initialMode="ai"
  onAsk={(query) => runAIQuery(query)}
/>
```

### Regular search
```jsx
<GlobalSearch 
  initialMode="search"
  placeholder="Search your CRM..."
  onAsk={(term) => performSearch(term)}
/>
```

### Custom placeholder
```jsx
<GlobalSearch 
  initialMode="ai"
  placeholder="Ask about deals, customers, vehicles..."
  onAsk={handleQuery}
/>
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Root width | 100% |
| Root gap | $t1-space-4 (16px) |
| Segment pill padding | 4px |
| Segment gap | 2px |
| Segment slot width/height | 28px |
| Segment slot border-radius | $t1-radius-xs (2px) |
| Field height | 32px |
| Field border | 1px solid |
| Field border-radius | $t1-radius-xs (2px) |
| Field inner padding | 0 10px |
| Field inner gap | $t1-space-2 (8px) |
| Field with Ask button right padding | $t1-space-1 (4px) |

### Colours
| Element | Property | Default | Active |
|---------|----------|---------|--------|
| Segment pill | background | $t1-neutral-700 | — |
| Segment slot (logo) | background | $t1-neutral-700 | $t1-gs-logo-grad |
| Segment slot (search) | background | $t1-neutral-700 | $t1-iib-inv-plain-active |
| Segment slot | colour | $t1-neutral-0 | $t1-neutral-0 |
| Field | background | $t1-neutral-0 | $t1-neutral-0 |
| Field | border | $t1-neutral-400 | $t1-blue-700 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Input text | 14px | $t1-weight-regular | 16px | $t1-neutral-900 |
| Placeholder | 14px | $t1-weight-regular | 16px | $t1-neutral-400 |

### States
| State | What changes |
|-------|-------------|
| default | Field border $t1-neutral-400, segment slots blend into pill background |
| active/focused | Field border $t1-blue-700, active segment slot shows accent background |
| logo-active | Logo segment slot shows $t1-gs-logo-grad |
| search-active | Search segment slot shows $t1-iib-inv-plain-active |

## Visual states
- **Default**: Empty, neutral colors
- **Focused**: Blue border, segment indicator active
- **With text**: Ask button visible (AI mode only)
- **Hover**: Segment buttons highlight

## Notes
- Logo is Tekion T1 mark (brand gradient) in AI mode
- Uses kit Button for Ask action (variant="contained", color="primary", size="sm")
- Magnifier icon from Phi (size=16)
- Full width — typically used in page header
- Enter key submits when value is not empty (AI mode only)
- Search mode shows placeholder hint (no auto-submit on Enter)
