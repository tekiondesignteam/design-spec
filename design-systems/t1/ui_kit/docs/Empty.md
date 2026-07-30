# Empty

> Empty state placeholder. Shows when a list, search, or section has no content.

## When to use
- No search results found
- Empty chat history or message list
- No contacts, deals, or tasks in a filtered view
- Onboarding first-time states

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | — | Phosphor icon name |
| `title` | string | — | Heading text |
| `description` | string | — | Subtext explanation |
| `primaryLabel` | string | — | Primary button text |
| `secondaryLabel` | string | — | Secondary button text |
| `helpText` | string | — | Helper text below buttons |
| `linkText` | string | — | Link text (optional) |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container padding | $t1-space-4 (16px) |
| Container gap | $t1-space-3 (12px) |
| Icon block size | 48×48px |
| Icon block background | $t1-neutral-100 |
| Icon block border-radius | $t1-radius-xs (2px) |
| Icon color | $t1-neutral-500 |
| Content gap | $t1-space-1 (4px) |
| Actions gap | 10px |
| Link row gap | $t1-space-1 (4px) |

### Typography
| Element | font-size | font-weight | line-height | color |
|---------|-----------|-------------|-------------|-------|
| Title | 16px | $t1-weight-medium | 24px | $t1-neutral-900 |
| Description | 14px | $t1-weight-regular | 16px | $t1-neutral-600 |
| Help text | 14px | $t1-weight-regular | 16px | $t1-neutral-600 |

## Examples

### No search results
```jsx
<Empty
  icon="magnifying-glass"
  title="No contacts found"
  description="Try adjusting your search filters or creating a new contact."
  primaryLabel="Create Contact"
  helpText="Browse all contacts to get started"
/>
```

### Empty deal list
```jsx
<Empty
  icon="briefcase"
  title="No deals yet"
  description="Start by creating your first deal or importing from your CRM."
  primaryLabel="New Deal"
  secondaryLabel="Import"
/>
```

### Empty task list
```jsx
<Empty
  icon="check-circle"
  title="All tasks complete"
  description="Great work! You're all caught up."
  linkText="View archived tasks"
/>
```

### No activity
```jsx
<Empty
  icon="calendar"
  title="No upcoming events"
  description="Your schedule is clear for the next 30 days."
/>
```

### Failed state
```jsx
<Empty
  icon="warning-circle"
  title="Something went wrong"
  description="Unable to load contacts. Please try again."
  primaryLabel="Retry"
/>
```

## Notes
- Icon name must be a valid Phosphor icon string.
- Always include `title` — `description` and buttons are optional.
- Use primary CTA to guide user toward next action (create, import, etc.).
- Secondary label for alternatives (cancel, browse, etc.).
- `linkText` appears as a neutral link at the bottom.
- Center-aligned vertically and horizontally in parent container.
- See also: `Button` (primary action), `Link` (secondary action)
