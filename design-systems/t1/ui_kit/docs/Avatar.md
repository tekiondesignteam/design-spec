# Avatar

> User identity display. Shows initials, image, or icon in a circle or rounded square.

## When to use
- Chat headers and contact listings
- User profile displays in suggestions
- Team member assignments
- Status indicators (online, away, busy)

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" | "md" | Avatar size |
| `type` | "icon" \| "letter" \| "image" | — | Content type |
| `initials` | string | — | 1-2 letters for type="letter" |
| `src` | string | — | Image URL for type="image" |
| `variant` | "circle" \| "rounded" | "circle" | Shape |
| `status` | "online" \| "away" \| "busy" | — | Status indicator dot |

## Visual Specification

### Layout & Sizing
| Size | Dimension | Initials font-size | Icon font-size |
|------|-----------|-------------------|-----------------|
| 2xs | 16px | 8px | 8px |
| sm | 24px | 10px | 12px (all) |
| md | 32px | 14px | 16px (rounded), 12px (square) |
| lg | 40px | 14px | 24px (rounded), 16px (square) |

### Variants
| Variant | Border-radius |
|---------|---------------|
| rounded (circle) | 50% |
| square (rounded) | 2px |

### Colours
| Element | Property | Value |
|---------|----------|-------|
| Container (all types) | background | #edeef0 ($t1-neutral-100) |
| Container | overflow | hidden |
| Image | object-fit | cover |
| Initials | color | #6d707a ($t1-neutral-500) |
| Initials | font-weight | 500 |
| Initials | line-height | 1 |
| Icon | color | #6d707a ($t1-neutral-500) |
| Icon | line-height | 1 |

### Typography
| Element | font-family | font-weight | line-height |
|---------|------------|-------------|-------------|
| Initials | $t1-font-sans | 500 | 1 |
| Icon container | — | — | 1 |

### States
| State | What changes |
|-------|-------------|
| type: letter | displays initials text, font-size varies by size |
| type: icon | displays Phi icon, size varies by size/variant combo |
| type: image | displays image with object-fit cover |
| status: online/away/busy | status dot indicator appended (controlled by JS, not shown in SCSS) |

## Examples

### User initials
```jsx
<Avatar
  type="letter"
  initials="AC"
  size="md"
  variant="circle"
/>
```

### Profile image
```jsx
<Avatar
  type="image"
  src="https://api.dealer.com/contacts/alice-chen.jpg"
  size="lg"
  variant="rounded"
  status="online"
/>
```

### With status indicator
```jsx
<Avatar
  type="letter"
  initials="BM"
  size="md"
  status="away"
/>
```

### In contact list
```jsx
<div className="t1-contact-row">
  <Avatar
    type="image"
    src={contact.photo}
    size="sm"
    status={contact.status}
  />
  <span>{contact.name}</span>
</div>
```

### Icon type (default placeholder)
```jsx
<Avatar
  type="icon"
  size="md"
  variant="rounded"
/>
```

## Notes
- `initials` should be 1-2 uppercase letters (e.g., "AC", "DM").
- `src` is required for type="image".
- Status dots only appear with `status="online"`, `"away"`, or `"busy"`.
- Use `variant="rounded"` for more compact UI.
- Sizes: xs (16px), sm (24px), md (32px), lg (40px), xl (48px), 2xl (56px).
- See also: `Badge` (status indicators), `Chip` (with avatars)
