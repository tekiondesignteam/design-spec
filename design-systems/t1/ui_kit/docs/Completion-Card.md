# Completion-Card

> Self-contained card showing a finished multi-step task (e.g., "Deal added to pipeline")

## When to use
- AI finished a complex task with a success state
- Show quick task summary after background processing
- Use in Response contentSlot or directly in chat thread

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | — | Extra CSS class |

## Anatomy
- Icon block — checkmark in green circle
- Title & subtitle — "Task Complete" + confirmation message
- Optional action row — related next-step buttons (CTA, Discard, etc.)

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 320px |
| Card border-radius | 6px |
| Card border | 1px solid |
| Header padding | 16px |
| Avatar width/height | 32px |
| Avatar border-radius | 2px |
| Avatar icon size | 16px |
| Body padding | 16px |
| Body gap | 16px |
| Row padding | 12px 0 |
| Row gap | 16px |
| Row separator height | 1px |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Card | background | $t1-neutral-0 |
| Card | border | $t1-neutral-200 |
| Header | background | $t1-green-25 |
| Header | border-bottom | $t1-neutral-200 |
| Avatar | background | $t1-green-500 |
| Avatar icon | colour | $t1-neutral-0 |
| Row separator | background | $t1-neutral-200 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 16px | $t1-weight-semibold | 24px | $t1-green-500 |
| Subtitle | 14px | $t1-weight-medium | 16px | $t1-green-500 |
| Row label | 12px | $t1-weight-medium | 16px | $t1-neutral-400 |
| Row value | 14px | $t1-weight-semibold | 16px | $t1-neutral-600 |

### States
| State | What changes |
|-------|-------------|
| default | All elements visible at default colours and typography |

## Examples
### Basic completion
```jsx
<CompletionCard />
```

### With context (in Response slot)
```jsx
<Response>
  <CompletionCard />
</Response>
```

### In chat thread
```jsx
<ChatBubble from="ai">
  <CompletionCard />
</ChatBubble>
```

## Notes
- No custom props — card layout and text are fixed
- Icon and success color come from design tokens
- Used to signal end of multi-step workflows (create deal, send SMS, etc.)
- Pair with NotificationBanner for system-level confirmations
