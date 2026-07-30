# Search

> Text input with optional typeahead dropdown. Used inside forms and panels.

## When to use
- Global search with autocomplete
- Typeahead inside Dropdown panels
- Live-filter search fields
- Contact/deal lookup

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | "md" \| "lg" | "md" | Input size |
| `label` | string | — | Field label |
| `placeholder` | string | — | Hint text |
| `value` | string | — | Search term (controlled) |
| `options` | string[] | — | Typeahead suggestions |
| `error` | string | — | Error message |
| `disabled` | boolean | false | Disable input |
| `onChange` | function(event) | — | Change handler (receives event) |

## Visual Specification

### Layout & Sizing
| Property | md | lg |
|----------|----|----|
| Field height | 32px | 40px |
| Field padding | 0 10px | 0 12px |
| Gap (icon to input) | $t1-space-2 (8px) | $t1-space-2 (8px) |
| Border-radius | $t1-radius-xs (2px) | $t1-radius-xs (2px) |
| Border | 1px solid (varies) | 1px solid (varies) |

### Typography
| Element | font-size | font-weight | line-height | color |
|---------|-----------|-------------|-------------|-------|
| Label | 14px | $t1-weight-regular | 20px | $t1-neutral-600 |
| Input | 14px | $t1-weight-regular | 16px | $t1-neutral-900 |
| Placeholder | 14px | $t1-weight-regular | 16px | $t1-neutral-400 |
| Assistive (error) | 12px | $t1-weight-regular | 16px | $t1-red-600 |
| Dropdown option | 14px | $t1-weight-regular | — | $t1-neutral-900 (or $t1-fg-brand if selected) |

### Colours
| State | Background | Border | Icon |
|-------|-----------|--------|------|
| default | $t1-neutral-0 | $t1-neutral-400 | $t1-neutral-400 |
| hover | $t1-neutral-0 | $t1-blue-400 | $t1-neutral-400 |
| active/focused | $t1-neutral-0 | $t1-blue-700 | $t1-neutral-400 |
| error | $t1-neutral-0 | $t1-red-400 | $t1-neutral-400 |
| disabled | $t1-neutral-50 | $t1-neutral-200 | $t1-neutral-200 |

### Spacing
| Property | Value |
|----------|-------|
| Label margin-bottom | $t1-space-1 (4px) |
| Assistive margin-top | $t1-space-1 (4px) |

### Dropdown
| Property | Value |
|----------|-------|
| Position | absolute, top 100%, left 0, right 0 |
| Margin-top | 4px |
| Background | $t1-neutral-0 |
| Border | 1px solid $t1-neutral-200 |
| Border-radius | $t1-radius-xs (2px) |
| Shadow | $t1-shadow-soft |
| Z-index | 200 |
| Option height | 40px |
| Option padding | 0 12px |
| Option border-bottom | 1px solid $t1-neutral-100 (except last) |
| Option hover bg | $t1-neutral-50 |
| Option selected bg | $t1-bg-brand-soft |
| Option selected color | $t1-fg-brand |
| Option selected font-weight | $t1-weight-medium |

## Examples

### Basic search
```jsx
<Search
  placeholder="Search contacts..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

### With typeahead
```jsx
<Search
  label="Find Contact"
  placeholder="Type name or email..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  options={filteredContacts.map(c => c.name)}
/>
```

### Large search (global)
```jsx
<Search
  size="lg"
  placeholder="Search deals, contacts, notes..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  options={results}
/>
```

### Inside Dropdown filter
```jsx
<Dropdown
  title="Filter by Rep"
  search={true}
  items={salesReps}
  onChange={setRep}
/>
```

### With error
```jsx
<Search
  placeholder="Search by email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={email && !isValidEmail(email) ? 'Invalid email' : ''}
/>
```

## Notes
- **Important**: `onChange` receives a synthetic event object, not a string. Use `e.target.value` to get the text.
- `options` is a flat string array — shows dropdown on focus if matches exist.
- For fixed-choice selects, use `Dropdown` instead.
- Typeahead filtering is your responsibility (not in the component).
- See also: `Input-Text` (no suggestions), `Dropdown` (predefined list)
