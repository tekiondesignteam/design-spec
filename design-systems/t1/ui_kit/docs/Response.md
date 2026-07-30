# Response

> AI assistant reply — left-aligned with title, body text, optional lists, embedded content slot, and feedback actions.

## When to use
- Rendering the AI assistant's answer to a user query
- Displaying summaries with ordered or unordered lists
- Showing embedded cards, tables, or custom content via `contentSlot`
- Providing feedback controls (copy, thumbs up/down, regenerate, more, sources/filters)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Bold summary line (body2Medium, 14px / 500 weight) |
| `children` | ReactNode | — | Main body text (body2Regular, 14px / 400 weight) |
| `orderedList` | string[] | — | Array of numbered list items |
| `unorderedList` | string[] | — | Array of bullet list items |
| `contentSlot` | ReactNode | — | Custom ReactNode rendered in a dashed-border card slot |
| `showFeedback` | boolean | true | Show FeedbackAction row below content |
| `filterCount` | number | 2 | Badge count on "Filters Applied" chip |
| `sourceCount` | number | 2 | Badge count on "Sources" chip |
| `showFilter` | boolean | true | Show "Filters Applied" chip |
| `showSource` | boolean | true | Show "Sources" chip |
| `onCopy` | function | — | Callback when copy button is clicked |
| `onThumbUp` | function | — | Callback with (active: bool) for thumbs-up toggle |
| `onThumbDown` | function | — | Callback with (active: bool) for thumbs-down toggle |
| `onMore` | function | — | Callback when "⋯ more" button is clicked |
| `onRegenerate` | function | — | Callback when regenerate button is clicked |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container | display flex, flex-direction column |
| Container gap | 12px |
| Container min-width | 160px |
| Container max-width | 640px |
| Main section gap | 4px (between header and list blocks) |
| List padding-left | 21px |
| List item margin-bottom | $t1-space-1 (4px), 0 for last-child |
| Content slot border | 1px dashed #7c3aed |
| Content slot padding | 10px |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Header | color | $t1-neutral-900 |
| Title | color | $t1-neutral-900 |
| Body text | color | $t1-neutral-900 |
| List | color | $t1-neutral-900 |
| List items | color | $t1-neutral-900 |
| Content slot | border-color | #7c3aed (violet dashed) |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 14px | $t1-weight-medium | 20px |
| Body text | 14px | $t1-weight-regular | 22px |
| List items | 14px | $t1-weight-regular | 22px |

### States
| State | What changes |
|-------|-------------|
| with lists | ordered (ol) or unordered (ul) list rendered with 21px left padding |
| with contentSlot | dashed violet bordered container displayed |
| with feedback | FeedbackAction row shown below content (controlled by showFeedback prop) |

## Examples

### Minimal
```jsx
<Response>
  Your next scheduled appointment is Tuesday at 2 PM for a test drive.
</Response>
```

### With title and lists
```jsx
<Response
  title="Monthly Sales Summary — March 2024"
  orderedList={[
    "Total units sold: 47",
    "Revenue: $1.2M",
    "Customer satisfaction: 94%"
  ]}
  unorderedList={[
    "Top model: Model X (18 units)",
    "Top region: Northeast (22 units)",
    "Lead source: Referral (40%)"
  ]}
/>
```

### With embedded content
```jsx
<Response
  title="Lead Score Analysis"
  contentSlot={
    <div style={{ padding: '12px', backgroundColor: '#f5f5f5' }}>
      <strong>High-priority leads:</strong>
      <ul>
        <li>John Martinez — 92 score</li>
        <li>Sarah Lee — 88 score</li>
      </ul>
    </div>
  }
  showFilter={true}
  filterCount={3}
/>
```

### With feedback callbacks
```jsx
<Response
  title="Recommended next steps"
  onCopy={() => console.log('Copied')}
  onThumbUp={(active) => console.log('Thumbs up:', active)}
  onThumbDown={(active) => console.log('Thumbs down:', active)}
  onRegenerate={() => console.log('Regenerate')}
>
  Follow up with the lead within 24 hours to confirm their interest in financing options.
</Response>
```

## Notes
- **Always use inside ChatContainer** — do not manually manage alignment.
- **Use contentSlot for rich content** — tables, cards, or custom layouts go here, not inline in children.
- **FeedbackAction is auto-embedded** — no need to add it manually; controlled by `showFeedback`.
- **Mutually exclusive feedback** — thumbs-up and thumbs-down toggle independently; selecting one deselects the other.
- **Copy button state** — shows check icon for 2 seconds after click, then resets.
- **BEM prefix**: `t1-response` — see SCSS for spacing and typography tokens.
