# Modal

> Overlay dialog with header, body, and optional footer with buttons.

## When to use
- Confirm actions (delete deal, reassign contact)
- Form entry (add note, create task, edit contact)
- Detail view or preview
- Error or warning messages

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | boolean | — | Show/hide modal |
| `title` | string | — | Header title |
| `subtitle` | string | — | Subtext below title |
| `onClose` | function | — | Called when user closes |
| `children` | ReactNode | — | Body content (forms, text, etc.) |
| `primaryLabel` | string | — | Primary button text |
| `onPrimary` | function | — | Primary button handler |
| `secondaryLabel` | string | — | Secondary button text |
| `onSecondary` | function | — | Secondary button handler |
| `width` | number | 480 | Modal width in px |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Overlay | fixed, inset: 0, padding $t1-space-6 |
| Overlay background | rgba(0, 0, 0, 0.4) |
| Overlay z-index | 1000 |
| Panel width | 480px (via prop, customizable) |
| Panel max-width | calc(100vw - 48px) |
| Panel max-height | calc(100vh - 96px) |
| Panel border-radius | 0 (no rounding) |
| Panel shadow | $t1-shadow-pop |
| Header padding | $t1-space-4 (16px) $t1-space-6 (24px) |
| Header gap | $t1-space-4 (16px) |
| Header content gap | $t1-space-2 (8px) |
| Body padding | $t1-space-6 (24px) |
| Body font-size | 14px |
| Body line-height | 20px |
| Footer padding | $t1-space-4 (16px) $t1-space-6 (24px) |
| Footer gap | $t1-space-4 (16px) |
| Close button margin-top | 4px (optical alignment) |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Panel | background | $t1-neutral-0 |
| Header | background | $t1-neutral-100 |
| Header title | color | $t1-neutral-900 |
| Header subtitle | color | $t1-neutral-600 |
| Body | color (text) | $t1-neutral-900 |
| Footer | border-top | $t1-neutral-200 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 20px | $t1-weight-semibold | 32px |
| Subtitle | 16px | $t1-weight-regular | 24px |
| Body | 14px | regular | 20px |

### States
| State | What changes |
|-------|-------------|
| open | overlay visible, modal centered |
| overlay click | calls onClose |
| escape key | calls onClose |

## Examples

### Confirmation dialog
```jsx
<Modal
  open={isOpen}
  title="Delete Contact?"
  subtitle="This action cannot be undone."
  onClose={() => setIsOpen(false)}
  primaryLabel="Delete"
  onPrimary={handleDelete}
  secondaryLabel="Cancel"
  onSecondary={() => setIsOpen(false)}
>
  <p>All associated notes and activities will be removed.</p>
</Modal>
```

### Form modal
```jsx
<Modal
  open={showForm}
  title="Add Note"
  subtitle="Create a new activity record"
  onClose={closeForm}
  primaryLabel="Save"
  onPrimary={saveNote}
  secondaryLabel="Discard"
  onSecondary={closeForm}
>
  <Input-Text
    label="Note"
    value={noteText}
    onChange={(e) => setNoteText(e.target.value)}
    placeholder="Enter note..."
  />
</Modal>
```

### Reassign deal
```jsx
<Modal
  open={open}
  title="Reassign Deal"
  subtitle="Select new sales rep"
  width={520}
  onClose={onClose}
  primaryLabel="Confirm"
  onPrimary={handleReassign}
  secondaryLabel="Cancel"
  onSecondary={onClose}
>
  <Dropdown
    title="New Rep"
    items={reps}
    value={selected}
    onChange={setSelected}
  />
</Modal>
```

## Notes
- Modal renders as a portal overlay. Set `open=false` to close.
- Header has neutral-100 background (light gray). Body is white.
- **No border-radius** — sharp corners.
- Footer buttons are auto-layout: Cancel left, Primary right.
- Use `onClose` to handle backdrop clicks and escape key.
- See also: `Button` (footer buttons), `Input-Text` (form fields)
