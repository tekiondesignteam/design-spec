# Dropdown

> Select control with flat list or grouped sections. Header is the clickable trigger.

## When to use
- Form selects (deal stage, priority, sales rep)
- Filter panels (contact type, status, region)
- Menu selections in AI-generated forms
- Single-choice required fields

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | **Required** label above dropdown |
| `description` | string | — | Subtitle/hint below title |
| `placeholder` | string | "Select..." | Prompt text |
| `value` | string | — | Selected value (controlled) |
| `onChange` | function(value) | — | Selection handler |
| `search` | boolean | false | Show live-filter input |
| `items` | string[] | — | Flat list of options |
| `sections` | object[] | — | Grouped sections |
| `dividers` | boolean | false | Lines between items |
| `width` | string \| number | "100%" | Container width |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 100%, min-width 120px |
| Header padding | $t1-space-4 (16px) |
| Header gap | $t1-space-2 (8px) |
| Header border-radius (closed) | $t1-radius-xs (2px) all corners |
| Header border-radius (open) | $t1-radius-xs (2px) top corners only |
| Panel max-height | 320px (overflow-y auto) |
| Panel border-radius | $t1-radius-xs (2px) bottom corners |
| Item padding | $t1-space-2 (8px) $t1-space-4 (16px) |
| Item gap | $t1-space-2 (8px) |
| Section padding | $t1-space-2 (8px) 0 |
| Sub-header padding | 12px $t1-space-4 4px |
| Search bar padding | $t1-space-2 (8px) $t1-space-4 (16px) |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Header | background (default) | $t1-neutral-0 |
| Header | background (hover) | $t1-neutral-100 |
| Header | background (open) | $t1-neutral-0 |
| Header | border-bottom (closed) | $t1-neutral-200 |
| Header | border (open) | $t1-neutral-200 |
| Header title | color | $t1-neutral-900 |
| Header description | color | $t1-neutral-600 |
| Header description (placeholder) | color | $t1-neutral-400 |
| Header caret | color (default) | $t1-neutral-500 |
| Header caret | color (open) | $t1-blue-400 (rotated 180°) |
| Panel | background | $t1-neutral-0 |
| Panel | border | $t1-neutral-200 |
| Panel | box-shadow | $t1-shadow-float |
| Search bar | border-bottom | $t1-neutral-100 |
| Item | background (default) | $t1-neutral-0 |
| Item | background (hover) | $t1-neutral-100 |
| Item | background (selected) | $t1-blue-100 |
| Item label | color (default) | $t1-neutral-600 |
| Item label | color (selected) | $t1-blue-700 |
| Item check icon | color | $t1-blue-400 |
| Divider | background | $t1-neutral-200 |
| Sub-header label | color | $t1-neutral-600 |
| Empty state | color | $t1-neutral-500 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Header title | 14px | $t1-weight-regular | 16px |
| Header description | 12px | $t1-weight-regular | 16px |
| Sub-header label | 12px | $t1-weight-regular | 16px |
| Item label (default) | 14px | $t1-weight-regular | 16px |
| Item label (selected) | 14px | $t1-weight-medium | 16px |
| Empty state | 14px | regular (italic) | — |

### States
| State | What changes |
|-------|-------------|
| header hover | background → $t1-neutral-100 |
| panel open | header: full 1px border $t1-neutral-200, square bottom corners (border-radius: 0), caret rotated 180° and colored $t1-blue-400 |
| item hover | background → $t1-neutral-100 |
| item selected | background → $t1-blue-100, label color → $t1-blue-700, label weight → $t1-weight-medium, check mark visible |

## Examples

### Basic dropdown
```jsx
<Dropdown
  title="Deal Stage"
  placeholder="Select stage..."
  value={stage}
  onChange={setStage}
  items={["Prospecting", "Negotiation", "Closing", "Won"]}
/>
```

### With description
```jsx
<Dropdown
  title="Assigned To"
  description="Choose a sales rep"
  value={assignee}
  onChange={setAssignee}
  items={["Alice Chen", "Bob Martinez", "Carol Singh"]}
  search={true}
/>
```

### Grouped sections
```jsx
<Dropdown
  title="Filter by Status"
  value={status}
  onChange={setStatus}
  sections={[
    { label: "Active", items: ["New", "In Progress", "Pending"] },
    { label: "Closed", items: ["Won", "Lost", "Archived"] }
  ]}
  dividers={true}
/>
```

### Searchable with dividers
```jsx
<Dropdown
  title="Contact Type"
  value={type}
  onChange={setType}
  search={true}
  items={["Decision Maker", "Influencer", "Vendor", "Other"]}
  dividers={true}
/>
```

## Notes
- The header **is** the trigger — click to open/close. Selected value replaces description.
- Only one of `items` or `sections` should be provided.
- Bottom-border only in closed state (no shadow).
- Use `search={true}` for lists with 5+ items.
- See also: `Input-Text` (free-form input), `Search` (typeahead input)
