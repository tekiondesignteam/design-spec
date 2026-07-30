# Separator (Divider)

> Thin horizontal or vertical divider line — separates sections, menus, or inline content

## When to use
- Divide sections in cards or panels
- Separate menu items or list rows
- Create visual breaks between content groups
- Pipe character between inline elements (e.g., "Home | Settings | Logout")

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | string | "horizontal" | "horizontal" or "vertical" |
| `variant` | string | "fullWidth" | "fullWidth" (edge-to-edge), "inset" (padded), "pipe" (inline) |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Horizontal | Vertical | Pipe (vertical) |
|----------|-----------|----------|-----------------|
| Height/Width | 1px / 100% | 100% / 1px | 12px / 1px |
| Min-height (vertical) | — | 16px | — |
| Margin-left (inset) | — | — | — |
| Inset margin | 16px left/right | — | — |

### Colours
| Variant | Background | Usage |
|---------|-----------|-------|
| fullWidth | var(--t1-border-subtle) | Full-width separator |
| inset | var(--t1-border-subtle) | Padded separator |
| pipe | var(--t1-border) | Inline vertical divider |

## Examples
### Horizontal divider
```jsx
<div>
  <MessageDraft to="Customer" body="..." />
  <Separator />
  <p>Additional options below</p>
</div>
```

### Inset divider (padded)
```jsx
<Separator 
  orientation="horizontal"
  variant="inset"
/>
```

### Vertical divider
```jsx
<div style={{ display: 'flex', gap: '12px' }}>
  <span>Status: Active</span>
  <Separator orientation="vertical" />
  <span>Last update: Today</span>
</div>
```

### Pipe separator (inline)
```jsx
<div>
  <Link href="/">Home</Link>
  <Separator variant="pipe" orientation="vertical" />
  <Link href="/settings">Settings</Link>
</div>
```

## Variants
- **fullWidth** (default): Extends edge-to-edge in container
- **inset**: Padded left & right margins (16px)
- **pipe**: Thin vertical line for inline text (looks like |)

## Notes
- Use kit component — never use raw `<hr />` or custom CSS divider
- Vertical variant is typically used inline (flex/grid row)
- Color is always neutral light gray from design tokens
- Height (horizontal) or width (vertical) is 1px
- Pipe variant works best between short inline items
