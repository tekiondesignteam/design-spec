# Document-Card

> File/document reference card — surfaces related files (PDFs, reports, contracts) in chat responses

## When to use
- AI surfaces a relevant inspection report, quote, or contract
- Link to downloadable documents from chat response
- Show file metadata (type, size, modified date)

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | File name / document title (required) |
| `icon` | string (Phi name) | "file-text" | Phosphor icon name |
| `subtitles` | string[] | — | Array of metadata labels (e.g., ['PDF', '2.4 MB', 'Updated today']) |
| `links` | array | — | Array of `{ label: string, href: string }` for actions |
| `className` | string | — | Extra CSS class |

### `links` structure
```js
[
  { label: "View", href: "https://..." },
  { label: "Download", href: "https://..." }
]
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 320px |
| Card padding | 16px |
| Icon block width/height | 48px |
| Icon block border-radius | 6px |
| Card border-radius | 6px |
| Content gap | 4px |
| Subtitle row gap | 4px |
| Subtitle item gap | 4px |
| Button group gap | 12px |
| Button group margin-top | 4px |

### Colours
| Element | Property | Token/Value |
|---------|----------|-------|
| Card | background | $t1-neutral-0 |
| Card | border | $t1-neutral-200 |
| Icon block | background | $t1-neutral-100 |
| Icon | colour | $t1-neutral-500 |
| Dot separator | background | $t1-neutral-200 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| Title | 14px | $t1-weight-semibold | 16px | $t1-neutral-900 |
| Subtitle text | 14px | $t1-weight-regular | 16px | $t1-neutral-400 |
| Link label | 14px | $t1-weight-medium | 20px | $t1-blue-500 |

### Spacing
| Element | Property | Value |
|----------|----------|-------|
| Card | gap | 16px |
| Content | gap | 4px |
| Subtitle row | gap | 4px |
| Subtitle item | gap | 4px |
| Dot | width/height | 4px |
| Button group | gap | 12px |

### States
| State | What changes |
|-------|-------------|
| default | All elements visible at default colours and typography |

## Examples
### Inspection report
```jsx
<DocumentCard 
  title="2023 AeroVibe Inspection Report"
  icon="file-pdf"
  subtitles={['PDF', '1.2 MB', 'Generated today']}
  links={[
    { label: "View report", href: "/inspections/12345" },
    { label: "Download", href: "/files/report.pdf" }
  ]}
/>
```

### Contract document
```jsx
<DocumentCard 
  title="Purchase Agreement — Flora Fleisher"
  icon="file-text"
  subtitles={['DOCX', '145 KB', 'Needs signature']}
  links={[
    { label: "Review & sign", href: "/contracts/789" }
  ]}
/>
```

### In Response contentSlot
```jsx
<Response>
  <DocumentCard 
    title="Quote: 2024 SilverTide LX"
    icon="file-pdf"
    subtitles={['PDF', '850 KB']}
    links={[
      { label: "Download quote", href: "..." }
    ]}
  />
</Response>
```

## Notes
- Links render as kit `Link` components (styled inline links)
- Icon comes from Phosphor icon set (use `file-pdf`, `file-text`, etc.)
- Subtitles appear as small gray text below title
- Card is clickable — first link in array acts as primary action
- Use when AI references or generates documents
