# Listing-Card

> Vertical list card displaying multiple item rows with optional avatar prefix, title/ID/chip row, subtitles, description, and right-aligned suffix details. Responsive layout adapts to screen size.

## When to use
- Display a list of contacts, leads, or records from CRM data.
- Show multiple related items in a compact, scannable format.
- Pair with other domain cards (Deal-Card, Task-Card) in response content.
- Use with `expanded=true` to show avatar prefix; use `expanded=false` for compact mode.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | array | [] | Array of item row objects (see Item Object below) |
| `expanded` | boolean | true | Show avatar prefix per row when true |
| `onItemClick` | function | undefined | Callback(item, index) when a row is clicked |
| `className` | string | undefined | Extra CSS class |

## Item Object Structure
```javascript
{
  initials: string,         // 2-char avatar label (e.g., 'CN')
  title: string,            // Primary name/title
  id: string,               // Secondary ID (e.g., '#123')
  chip: string,             // Chip label text (optional)
  chipColor: string,        // Chip color prop: 'primary' (default) or other valid colors
  subtitle1: string,        // First subtitle (optional)
  subtitle2: string,        // Second subtitle (optional, no dot)
  description: string,      // Third text line (optional)
  suffixLabel: string,      // Right-side label (muted) (optional)
  suffixDetail: string      // Right-side detail (bold) (optional)
}
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 100% |
| Card border-radius | 2px |
| Item padding (≥480px) | 16px |
| Item padding (<480px) | 12px |
| Avatar size | 40×40px (expanded only) |
| Row divider height | 1px |
| Item gap (avatar ↔ body) | 16px |
| Body gap (info ↔ suffix) | 16px |
| Info gap (vertical) | 2px |
| nameId gap | 6px |
| Subtitle gap | 8px |
| Suffix gap (vertical) | 6px |
| Suffix min-width | 56px |

### Colours
| Element | Property | Token/Value |
|---------|----------|-------|
| Card background | background | $t1-neutral-0 (#ffffff) |
| Card border | border | $t1-neutral-200 (#d4d5d6) |
| Item background (hover) | background | $t1-neutral-25 (light gray) |
| Item divider | background | $t1-neutral-200 (#d4d4d4) |
| Title text | color | $t1-neutral-900 (#161616) |
| ID text | color | $t1-neutral-400 (#969aa3) |
| Subtitle text | color | $t1-neutral-600 (#444f5c) |
| Dot separator | background | $t1-neutral-200 (#d4d4d4) |
| Suffix label text | color | $t1-neutral-400 (#969aa3) |
| Suffix detail text | color | $t1-neutral-600 (#444f5c) |
| Avatar background | background | $t1-neutral-100 (#edeef0) (kit Avatar) |
| Avatar text | color | $t1-neutral-500 (#6d707a) (kit Avatar) |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 14px | 600 | 16px |
| ID | 12px | 400 | 16px |
| Subtitle | 14px | 500 | 16px |
| Description | 14px | 500 | 16px |
| Suffix label | 12px | 400 | 16px |
| Suffix detail | 12px | 600 | 16px |

### States
| State | What changes |
|-------|-------------|
| Item hover | background becomes $t1-neutral-25 (light gray); cursor becomes pointer if onItemClick is defined |
| Responsive (<480px) | Suffix column drops below info column; layout wraps to two-row format; suffix becomes inline row instead of column |

## Examples

### Basic list with expanded avatars
```jsx
<ListingCard
  expanded={true}
  items={[
    {
      initials: 'CN',
      title: 'Carlos Newman',
      id: '#CUS-042',
      chip: 'Premium',
      chipColor: 'primary',
      subtitle1: 'Financing',
      subtitle2: '2024 Toyota Camry',
      description: 'Test drive scheduled for APR 24',
      suffixLabel: 'Due in',
      suffixDetail: '2 days'
    },
    {
      initials: 'AJ',
      title: 'Alice Johnson',
      id: '#CUS-035',
      subtitle1: 'Cash',
      description: 'Awaiting final paperwork',
      suffixLabel: 'Status',
      suffixDetail: 'Pending'
    }
  ]}
  onItemClick={(item, idx) => console.log('Clicked item', idx)}
/>
```

### Compact mode without avatars
```jsx
<ListingCard
  expanded={false}
  items={[
    {
      title: 'Bob Smith',
      id: '#REP-001',
      subtitle1: 'Sales Rep',
      suffixLabel: 'Region',
      suffixDetail: 'East'
    }
  ]}
/>
```

### Minimal item
```jsx
<ListingCard
  items={[
    {
      title: 'Simplicity',
      description: 'Only title and description'
    }
  ]}
/>
```

## Notes
- Avatar is rendered via the kit `Avatar` component with `type="letter"`, `variant="square"`, and `size="lg"`. Only shown when `expanded={true}`.
- Chip is rendered via the kit `Chip` component with `variant="soft"` and `size="md"`.
- Item rows have a subtle hover background; cursor changes to `pointer` only when `onItemClick` is defined.
- Dividers between rows are internal 1px lines (`#d4d4d4`).
- **Responsive breakpoint**: At <480px, the layout shifts to a flexible wrap mode where the suffix column drops below the info column.
- All optional fields (subtitles, description, chip, suffix) conditionally render only if present.
- Title and subtitles are truncated with ellipsis on single lines (≥480px); below 480px they can wrap.
- Dot separator (·) between subtitle1 and subtitle2 only appears if both are present.
