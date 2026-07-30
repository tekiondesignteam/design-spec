# Gradient-Icon-Button

> Premium icon button with gradient border/glow effect — for the single most important AI action in a toolbar

## When to use
- Highlight the primary AI action in a toolbar (e.g., "Generate with AI", "Ask AI")
- Draw attention to the most prominent interaction
- Use sparingly — one per page maximum

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | ReactNode | — | Icon element (e.g., `<Phi name="sparkles" />`) |
| `state` | string | "default" | Current state: "default", "hover", "active", "disabled" |
| `aria-label` | string | — | Accessibility label (required) |
| `onClick` | function | — | Click handler |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Width | 36px |
| Height | 36px |
| Padding | 0 |
| Border | none |
| Border-radius | $t1-radius-xs (2px) |
| Isolation | isolate |
| Transition | background 120ms ease |

### Gradient (100.05deg angle)
| State | Gradient |
|-------|----------|
| default | $t1-grad-teal 0% → $t1-grad-cyan 50% → $t1-grad-blue 100% |
| hover | $t1-grad-btn-hov-teal 0% → $t1-grad-btn-hov-cyan 50% → $t1-grad-btn-hov-blue 100% |
| active | $t1-grad-btn-act-teal 0% → $t1-grad-btn-act-cyan 50% → $t1-grad-btn-act-blue 100% |
| disabled | $t1-neutral-50 (solid) |

### Icon
| Property | Value |
|----------|-------|
| Color (default/hover/active) | $t1-neutral-0 |
| Color (disabled) | $t1-neutral-400 |

### Focus
| Property | Value |
|----------|-------|
| Outline | 2px solid $t1-border-focus |
| Outline-offset | 2px |

## Appearance
- Gradient border (teal → blue, matching Tekion brand)
- Soft glow/shadow effect
- Square or rounded square shape
- Hover: Border brightness increases, glow intensifies
- Active: Pressed appearance, glow effect
- Disabled: Grayed out, no glow

## Examples
### Generate with AI button
```jsx
<GradientIconButton 
  icon={<Phi name="sparkles" weight="fill" />}
  aria-label="Generate with AI"
  onClick={generateReport}
/>
```

### Ask AI toolbar action
```jsx
<GradientIconButton 
  icon={<Phi name="chat-circle" />}
  state="default"
  aria-label="Ask AI for help"
  onClick={openAIPanel}
/>
```

### Disabled during processing
```jsx
<GradientIconButton 
  icon={<Phi name="sparkles" />}
  state="disabled"
  aria-label="Generating (disabled)"
/>
```

## Visual states
- **default**: Static gradient border with subtle glow
- **hover**: Border brightness +20%, glow intensifies
- **active**: Pressed shadow, glow effect
- **disabled**: Grayed out, no glow

## Notes
- Reserved for the *single* most important AI action per page/section
- Gradient color from Tekion brand tokens (not hardcoded)
- Icon typically Phi (Phosphor) or branded mark
- Pair with ReasoningLog or Toast for feedback
- Consider momentum — use when user action triggers visible processing
- Place in toolbar, header, or action row (not in content body)
