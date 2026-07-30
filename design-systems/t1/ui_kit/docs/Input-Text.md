# Input-Text

> Text field for forms, search, and inline edits. Never write raw `<input>`.

## When to use
- Modal forms (contact name, deal title, note content)
- Inline forms and edit fields
- Email, phone, URL, number inputs
- Textarea for longer content

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Field label |
| `placeholder` | string | — | Hint text |
| `value` | string | — | Input value (controlled) |
| `error` | string | — | Red error message below field |
| `assistive` | string | — | Helper text below |
| `maxLength` | number | — | Shows char counter |
| `startIcon` | ReactNode | — | Phosphor icon left |
| `endIcon` | ReactNode | — | Phosphor icon right |
| `disabled` | boolean | false | Disable input |
| `onChange` | function(event) | — | Change handler |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container gap | $t1-space-1 (4px) |
| Box height | $t1-space-8 (32px) |
| Box padding | 1px all sides |
| Box border | 1px solid (varies) |
| Box border-radius | $t1-radius-xs (2px) |
| Control wrap padding | 0 10px |
| Control wrap gap | $t1-space-2 (8px) (prefix/text/suffix) |
| Icon size | 16px (prefix/suffix) |

### Colours
| Element | State | Property | Token |
|---------|-------|----------|-------|
| Box | default | border | $t1-neutral-400 |
| Box | hover | border | $t1-neutral-400 |
| Box | focus/active | border | $t1-blue-400 |
| Box | error | border | $t1-red-400 |
| Box | disabled | border | $t1-neutral-200 |
| Box | default/hover/focus/error | background | $t1-neutral-0 |
| Box | disabled | background | $t1-neutral-100 |
| Label | default | color | $t1-neutral-600 |
| Input text | default | color | $t1-neutral-900 |
| Input text | disabled | color | $t1-neutral-500 |
| Placeholder | default | color | $t1-neutral-400 |
| Prefix/suffix icon | default | color | $t1-neutral-600 |
| Assistive text | default | color | $t1-neutral-400 |
| Assistive text | error | color | $t1-red-600 |
| Character counter | default | color | $t1-neutral-400 |
| Character counter | error | color | $t1-red-600 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Label | var(--t1-text-14) | $t1-weight-regular | var(--t1-leading-14) |
| Input text | var(--t1-text-14) | $t1-weight-regular | var(--t1-leading-14) |
| Assistive/counter | var(--t1-text-12) | $t1-weight-regular | var(--t1-leading-12) |

### States
| State | What changes |
|-------|-------------|
| hover | border remains $t1-neutral-400 |
| focus/active | border → $t1-blue-400, outline none |
| error | border → $t1-red-400, assistive text → $t1-red-600, counter → $t1-red-600 |
| disabled | background → $t1-neutral-100, border → $t1-neutral-200, text → $t1-neutral-500, cursor not-allowed, pointer-events none |

## Examples

### Minimal
```jsx
<Input-Text
  label="Contact Name"
  placeholder="Full name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### With error
```jsx
<Input-Text
  label="Email"
  placeholder="contact@dealer.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!email.includes('@') ? 'Invalid email' : ''}
/>
```

### With icon
```jsx
<Input-Text
  label="Phone"
  placeholder="+1 (555) 123-4567"
  startIcon={<Phi name="phone" size={16} />}
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
```

### With character counter
```jsx
<Input-Text
  label="Notes"
  placeholder="Add a note..."
  maxLength={500}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  assistive="Keep notes under 500 characters"
/>
```

### Disabled field
```jsx
<Input-Text
  label="Deal ID"
  value={dealId}
  disabled={true}
  assistive="System-generated, read-only"
/>
```

## Notes
- Always use controlled input with `value` and `onChange`.
- `onChange` receives a synthetic event — use `e.target.value`.
- `error` text is red and replaces helper text.
- Icon names must be valid Phosphor strings.
- For free-form search with suggestions, see `Search` component.
- See also: `Dropdown` (select), `Button` (submit)
