# Tip-Card

> Self-contained card showing an AI tip or suggestion (e.g., "Pro tip: Check inventory before scheduling test drives")

## When to use
- AI offers contextual advice or best practice
- Display helpful hints in chat thread
- Show recommendations for workflow improvements

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | — | Extra CSS class |

## Anatomy
- Icon block — lightbulb in brand color circle
- Title — "Tip" or category label
- Message — Short advice text (1–2 sentences)

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 320px |
| Card padding | 16px |
| Card gap | 4px |
| Border | 1px solid |
| Border-radius | 6px |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Card | background | $t1-green-25 |
| Card | border | $t1-green-500 |
| Text | colour | $t1-green-500 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Label | 14px | 600 | 16px |
| Body | 14px | 400 | 16px |

### States
| State | What changes |
|-------|-------------|
| default | All elements visible at default colours and typography |

## Examples
### Basic tip in chat
```jsx
<TipCard />
```

### In Response contentSlot
```jsx
<Response>
  <TipCard />
</Response>
```

## Notes
- No custom props — content is fixed by design
- Icon and styling come from design tokens
- Used to surface AI learning or suggestions mid-conversation
- Keep tip text concise (single paragraph)
- Pair with button CTAs for interactive tips (e.g., "Learn more", "Got it")
