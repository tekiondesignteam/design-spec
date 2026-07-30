# Credit-Score-Card

> Animated credit score gauge card displaying a customer's credit pre-qualification status, including score estimate, max approval amount, eligible APR, and action buttons.

## When to use
- Display credit pre-qualification details for a customer in the context of deal/financing.
- Show an animated credit score gauge that animates on mount or score change.
- Include in AI assistant responses to visualize creditworthiness and approval terms.
- Pair with Deal-Card and Task-Card in comprehensive deal summary flows.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `score` | number | 745 | Credit score (300–850 range) |
| `maxApproval` | string | '$65,000' | Maximum loan approval amount |
| `eligibleApr` | string | '3.99%' | Eligible annual percentage rate |
| `showChip` | boolean | true | Show "Tier 1 Qualified" chip when true |
| `chipLabel` | string | 'Tier 1 Qualified' | Custom chip text label |
| `onDownload` | function | undefined | Callback when "Download" button is clicked |
| `onApply` | function | undefined | Callback when "Apply to Deal" button is clicked |
| `className` | string | undefined | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 328px |
| Card border-radius | 6px |
| Header padding | 16px |
| Body padding | 16px |
| Footer padding | 16px |
| Body gap | 24px |
| Gauge width | 270px |
| Gauge height | 145px |
| SVG viewBox | 0 0 270 145 |
| Stats gap | 16px |
| Stat card padding | 20px |
| Stat card border-radius | 4px |
| Button gap | 8px |
| Qual chip height | 20px |
| Qual chip padding | 0 6px |
| Qual chip border-radius | 9999px |

### Colours
| Element | Property | Token/Value |
|---------|----------|-------|
| Card background | background | $t1-neutral-0 (#ffffff) |
| Card border | border | $t1-neutral-200 (#d4d5d6) |
| Header background | background | #f4f5f6 |
| Header text | color | $t1-neutral-900 (#161616) |
| Body background | background | $t1-neutral-0 (#ffffff) |
| Est label text | color | $t1-neutral-400 (#969aa3) |
| Score number text | color | $t1-neutral-600 (#444f5c) |
| Arc segment (Poor 300–419) | stroke | #8B2020 (maroon) |
| Arc segment (Fair 420–509) | stroke | #F52F1D (red) |
| Arc segment (Fair–Good 510–689) | stroke | #F5C03A (yellow) |
| Arc segment (Good 690–769) | stroke | #7BC86C (light green) |
| Arc segment (Excellent 770–850) | stroke | #06BC75 (green) |
| Handle ring colour | stroke | Dynamic (matches arc band) |
| Score label (Poor) | color | #c0291a (dark red) |
| Score label (Fair) | color | #b55c00 (dark orange) |
| Score label (Good) | color | #2d9154 (dark green) |
| Score label (Excellent) | color | #057a4c (dark green — Figma token) |
| Qual chip background | background | #e1faf0 (light green) |
| Qual chip border | border | #06bc75 (green) |
| Qual chip text | color | #06bc75 (green) |
| Stat card background | background | #f4f5f6 |
| Stat card border | border | $t1-neutral-200 (#d4d5d6) |
| Stat label text | color | $t1-neutral-400 (#969aa3) |
| Stat value text | color | $t1-neutral-900 (#161616) |
| APR stat value text | color | #3373dd (blue) |
| Footer background | background | #f4f5f6 |
| Footer border-top | border-top | $t1-neutral-200 (#d4d5d6) |
| Range labels (300/850) | color | $t1-neutral-400 (#969aa3) |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Header text (CREDIT PRE-QUALIFICATION) | 14px | 600 | 16px |
| Est label (SCORE ESTIMATE) | 14px | 600 | 16px |
| Score number | 32px | 600 | — |
| Score rating label | 14px | 500 | — |
| Range labels (300/850) | 12px | 400 | — |
| Stat label | 12px | 600 | 16px |
| Stat value | 20px | 600 | 32px |
| Button text | (delegated to kit Button) | — | — |

### Animation Behaviour
| Animation | Duration | Easing | Trigger |
|-----------|----------|--------|---------|
| Score counter | 1400ms | ease-out cubic | On mount or score prop change |
| Handle arc slide | 1400ms | ease-out cubic (sync with counter) | Calculated via requestAnimationFrame |
| Qual chip fade-in + slide | 400ms | ease | 1200ms delay after animation starts; also triggered by score change |

### Arc Segments
The gauge displays 6 equal-angular segments (each ~30°) covering the score range 300–850:

| Score Range | Label | Color | Visual |
|-------------|-------|-------|--------|
| 300–379 | Poor | #8B2020 (maroon) | Leftmost segment |
| 380–471 | Poor–Fair | #F52F1D (red) | |
| 472–689 | Fair–Good | #F5C03A (yellow) | Center segment (widest) |
| 690–769 | Good | #7BC86C (light green) | |
| 770–850 | Excellent | #06BC75 (green) | Rightmost segment |

Each segment uses `strokeLinecap="round"` and a 12-point gap inset on internal boundaries to create a ~3–4px visual separation (pill-shaped gaps).

### States
| State | What changes |
|-------|-------------|
| Default | Score displays with animated gauge handle; qual chip hidden |
| Chip fade-in | After 1200ms delay, qual chip fades in and slides up via CSS transition |
| Score updated | Counter re-animates from 300 to new target; chip hides then re-animates on the new score |

## Examples

### Basic credit score card
```jsx
<CreditScoreCard
  score={745}
  maxApproval="$65,000"
  eligibleApr="3.99%"
  showChip={true}
  onDownload={() => console.log('Download credit report')}
  onApply={() => console.log('Apply to deal')}
/>
```

### Low credit score
```jsx
<CreditScoreCard
  score={580}
  maxApproval="$25,000"
  eligibleApr="8.49%"
  showChip={false}
/>
```

### Custom chip label
```jsx
<CreditScoreCard
  score={790}
  maxApproval="$85,000"
  eligibleApr="2.99%"
  chipLabel="Excellent Pre-Qualification"
/>
```

## Notes
- The component contains an embedded inner `CreditScoreGauge` sub-component that renders the SVG arc, handle, and text labels.
- Score must be in the range 300–850; values outside this range will be clamped to the boundaries.
- The score counter animates over 1.4 seconds with an ease-out cubic easing function when the component mounts or when the `score` prop changes.
- The "Tier 1 Qualified" chip (or custom label) automatically fades in and slides up after 1.2 seconds of animation delay, matching the score animation completion timing.
- The Download and Apply to Deal buttons use the kit `Button` component (`variant="contained"`, `color="neutral"` and `color="primary"` respectively, `size="md"`).
- All hardcoded hex colours are exact matches to the Figma design and should not be changed without designer approval.
- The gauge handle (white ring with coloured stroke) always matches the colour of the current arc segment.
- Rating labels (Excellent/Good/Fair/Poor) are semantic labels that change colour based on the score band for improved legibility.
