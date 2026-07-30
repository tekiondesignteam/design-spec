# Reasoning-Log

> Shows the AI's thinking chain — "We're analyzing your request..."

## When to use
- Display AI step-by-step reasoning during processing
- Show inline thinking for multi-step requests (CRM lookups, deal analysis)
- Interrupt state when user stops response mid-way

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `inProgress` | boolean | `true` | AI is currently reasoning; logo spins, timer ticks |
| `interrupted` | boolean | `false` | User stopped the response; shows "Response stopped by you" |
| `steps` | string[] | CRM defaults | Array of reasoning step labels (e.g., "Analyzing inquiry") |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container gap | 8px |
| Min-width | 160px |
| Max-width | 480px |
| Logo size | 16×16px |
| Logo margin-top | 1px (optical alignment) |
| Header gap | 8px |
| Header-left gap | 4px |
| Main gap | 8px |
| Status font-size | 12px |
| Status font-weight | $t1-weight-medium |
| Status line-height | 16px |
| Timer font-size | 12px |
| Timer font-weight | $t1-weight-regular |
| Timer line-height | 16px |
| Timer min-width | 28px |
| Chevron font-size | 16px |
| Subtitle font-size | 12px |
| Subtitle font-weight | $t1-weight-medium |
| Subtitle line-height | 16px |
| Steps wrap transition | grid-template-rows 260ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms ease |
| Step entry transition | grid-template-rows 280ms cubic-bezier(0.4, 0, 0.2, 1) |
| Step content transition | opacity 220ms ease 80ms, transform 220ms ease 80ms |
| Step bar width | 2px |
| Step bar border-radius | 1000px |
| Step bar margin | 2px 0 |
| Step text font-size | 12px |
| Step text font-weight | $t1-weight-medium |
| Step text line-height | 16px |
| Cursor width | 1.5px |
| Cursor height | 11px |
| Cursor margin-left | 1px |
| Cursor border-radius | 1px |

### Typography
| Element | font-size | font-weight | line-height | color |
|---------|-----------|-------------|-------------|-------|
| Status (thinking) | 12px | $t1-weight-medium | 16px | gradient: $t1-grad-blue → $t1-grad-cyan → $t1-grad-teal |
| Status (done) | 12px | $t1-weight-medium | 16px | $t1-neutral-400 |
| Status (interrupted) | 12px | $t1-weight-medium | 16px | $t1-neutral-400 |
| Timer | 12px | $t1-weight-regular | 16px | $t1-neutral-400 |
| Subtitle | 12px | $t1-weight-medium | 16px | $t1-neutral-400 |
| Step text | 12px | $t1-weight-medium | 16px | $t1-neutral-600 |
| Cursor | — | — | — | $t1-neutral-600 |

### Colours
| Element | Default | When active | When interrupted |
|---------|---------|-------------|------------------|
| Logo | (static opacity: 1) | (spinning) | (faded opacity: 0.4) |
| Step bar | $t1-neutral-200 | $t1-blue-400 (last/active) | — |
| Header focus | — | outline: 2px solid $t1-border-focus | cursor: default |
| Chevron | $t1-neutral-400 | (rotate 180deg on collapse) | — |

### Animation
| Animation | Duration | Effect |
|-----------|----------|--------|
| t1-rl-spin | 2.4s | Logo rotates 360deg (linear infinite) |
| t1-rl-shimmer | 2s | Status gradient slides left (linear infinite) |
| t1-rl-cursor-blink | 600ms | Cursor opacity 1 → 0 (step-end infinite) |
| t1-rl-pulse | — | Logo opacity pulse 1 → 0.55 (idle state) |

## Behavior
- **Typing animation** — Each step types out one character at a time (~65ms per char)
- **Progressive reveal** — Next step appears only after current step finishes typing
- **Clickable header** — Toggles step list open/closed; chevron rotates
- **Elapsed timer** — Counts up while `inProgress` is true
- **Logo spin** — Tekion T1 mark rotates continuously while thinking

## Examples
### In-progress reasoning
```jsx
<ReasoningLog 
  inProgress={true}
  interrupted={false}
/>
```

### Completed (collapsed)
```jsx
<ReasoningLog 
  inProgress={false}
  interrupted={false}
/>
```

### Custom steps
```jsx
<ReasoningLog 
  inProgress={true}
  steps={[
    'Fetching customer profile...',
    'Checking vehicle history...',
    'Calculating trade-in value...',
  ]}
/>
```

### Interrupted by user
```jsx
<ReasoningLog 
  inProgress={true}
  interrupted={true}
/>
```

## Notes
- Render inside `ChatContainer` above the `Response` when AI uses reasoning
- Render in collapsed state when reasoning is done (takes less space)
- Default steps are automotive CRM–specific (customer lookup, deal validation, etc.)
- Step text is display-only; AI controls which steps exist via props
