# Feedback-Action

> Action row below every AI Response. Icon buttons for copy/thumbs-up/thumbs-down/regenerate/more, plus chips showing filter and source counts.

## When to use
- Rendering action controls below an AI-generated Response
- Usually embedded via Response's `showFeedback` prop (no manual use needed)
- Tracking user satisfaction with generated content
- Allowing users to copy, regenerate, or get more options on a response

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `filterCount` | number | 2 | Badge count displayed on "Filters Applied" chip |
| `sourceCount` | number | 2 | Badge count displayed on "Sources" chip |
| `showFilter` | boolean | true | Show "Filters Applied" chip |
| `showSource` | boolean | true | Show "Sources" chip |
| `onCopy` | function | — | Callback when copy button is clicked |
| `onThumbUp` | function | — | Callback with (active: bool) when thumbs-up is toggled |
| `onThumbDown` | function | — | Callback with (active: bool) when thumbs-down is toggled |
| `onMore` | function | — | Callback when ⋯ more button is clicked |
| `onRegenerate` | function | — | Callback when regenerate button is clicked |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Root gap | 8px (between icon cluster and chips) |
| Icon buttons gap | 0 (flush) |
| Chips gap | 8px |
| Icon size | 14px |
| Chip height | 24px |
| Chip padding | 0 6px |
| Chip border | 1px solid $t1-neutral-200 |
| Chip border-radius | 9999px |
| Chip gap | 0 (no gap between icon and label) |
| Chip icon font-size | 12px |
| Chip label font-size | 14px |
| Chip label padding | 0 4px |

### Typography
| Element | font-size | font-weight | line-height | color |
|---------|-----------|-------------|-------------|-------|
| Chip label | 14px | $t1-weight-semibold | 16px | $t1-neutral-600 |
| Chip icon | 12px | — | 1 | $t1-neutral-600 |

### Colours
| Element | Default | Hover | Active |
|---------|---------|-------|--------|
| Icon buttons | color: $t1-blue-400 (when active) | bg: $t1-blue-50, color: $t1-blue-500 | — |
| Chip | bg: transparent, border: $t1-neutral-200 | bg: $t1-neutral-100, border: $t1-neutral-500 | — |

### States
| State | Icon button color | Chip appearance |
|-------|------------------|-----------------|
| Active (thumbs up/down toggled) | color: $t1-blue-400 !important | — |
| Hover (active icon button) | bg: $t1-blue-50 !important, color: $t1-blue-500 !important | — |

## Examples

### Embedded in Response (preferred)
```jsx
<Response
  title="Q2 Sales Forecast"
  showFeedback={true}
  filterCount={3}
  sourceCount={2}
  onCopy={() => copyToClipboard()}
  onThumbUp={(active) => trackFeedback('helpful', active)}
  onThumbDown={(active) => trackFeedback('unhelpful', active)}
  onRegenerate={() => regenerateResponse()}
>
  Expected revenue growth of 18% based on current pipeline.
</Response>
```

### Standalone (manual use)
```jsx
<FeedbackAction
  filterCount={2}
  sourceCount={3}
  showFilter={true}
  showSource={true}
  onCopy={() => navigator.clipboard.writeText(responseText)}
  onThumbUp={(active) => logFeedback('helpful', active)}
  onThumbDown={(active) => logFeedback('unhelpful', active)}
  onMore={() => openContextMenu()}
  onRegenerate={() => resubmitQuery()}
/>
```

### Minimal
```jsx
<FeedbackAction
  onCopy={() => copyResponse()}
  onRegenerate={() => generateNew()}
/>
```

## Icon buttons order (left to right)

1. **Thumbs Up** — toggle; shows regular icon by default, fill icon when active
2. **Thumbs Down** — toggle; shows regular icon by default, fill icon when active
3. **Regenerate** — arrow-clockwise icon; one-shot action
4. **Copy** — copy icon; changes to check icon for 2 seconds on click
5. **More** — dots-three-vertical icon; opens additional options menu

All buttons use kit IconButton with `color="inverse"` and `style="contained"` at `size="sm"`.

## Chips (right side)

| Chip | Icon | Label | When to show |
|------|------|-------|-------------|
| Filter | funnel | "{n} Filter(s) Applied" | `showFilter={true}` |
| Source | book-open | "{n} Source(s)" | `showSource={true}` |

Both chips are role="button" and support keyboard activation; they are typically clickable to filter or expand source details.

## Notes
- **Thumbs up/down toggle** — selecting one automatically deselects the other (mutually exclusive)
- **Copy button state machine** — on click, shows check icon for 2 seconds, then resets to copy icon
- **Usually embedded** — Response component includes FeedbackAction automatically; manual use is rare
- **Kit IconButton required** — never write raw `<button>` for these actions
- **BEM prefix**: `t1-fa` — see SCSS for color tokens (inverse button styling)
