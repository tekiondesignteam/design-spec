# Quote

> Styled block quote with left border accent — for key statements, customer quotes, document excerpts

## When to use
- Highlight a key quote in AI response body
- Display verbatim excerpt from document (contract, email, report)
- Emphasize customer feedback or important statement

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | string (text) | — | Quoted text content (required) |
| `className` | string | — | Extra CSS class |

## Examples
### Customer quote
```jsx
<Quote>
  "I'm very interested in the AeroVibe. Can we schedule a test drive this 
  week?"
</Quote>
```

### Document excerpt
```jsx
<Quote>
  Buyer status: Pre-approved. Credit score: 720+. Down payment available: 
  $8,000.
</Quote>
```

### In Response body
```jsx
<Response>
  <p>Here's what Flora said about the vehicle:</p>
  <Quote>
    "Perfect fuel efficiency and safety features. Exactly what I'm looking for."
  </Quote>
  <p>I recommend scheduling a test drive ASAP.</p>
</Response>
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 100% |
| Bar width | 2px |
| Content padding | $t1-space-4 (16px) |
| Display | flex, row |
| Gap | 0 |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Container | background | $t1-neutral-100 |
| Left bar | background | $t1-neutral-200 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Text | 16px | $t1-weight-medium | 24px | $t1-neutral-600 |
| Text | font-style | italic | — | — |

### States
| State | What changes |
|-------|-------------|
| default | All elements visible at default colours and typography |

## Styling
- Left border accent (brand color, ~4px wide)
- Italic text
- Light gray background
- 16px padding
- Inherits parent font (can be mixed with body text)

## Notes
- Use for direct quotes only (customer feedback, contract terms, etc.)
- If text is a child React component, wrap in `<>` fragment
- Quote block should be visually distinct from response body
- Pair with context (e.g., "Here's what they said...")
