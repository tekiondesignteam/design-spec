# Phi

> Icon component for all Phosphor icons. Available globally from `_core.jsx`.

## When to use
- **Always** use for icons inside kit components or new components.
- Never write raw `<i>` or inline SVG.
- Button startIcon/endIcon, Link icons, Badge icons, etc.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | — | **Required** Phosphor icon name |
| `size` | number | 16 | Icon size in pixels |
| `weight` | "regular" \| "bold" \| "fill" | "regular" | Icon weight/style |

## Examples

### Basic icon
```jsx
<Phi name="check" size={16} />
```

### In Button
```jsx
<Button iconStart="check-circle">
  Confirm
</Button>
```

### Bold variant
```jsx
<Phi name="star" size={20} weight="bold" />
```

### Filled icon
```jsx
<Phi name="heart" size={18} weight="fill" />
```

### In Icon-Button
```jsx
<Icon-Button
  aria-label="Close"
  icon={<Phi name="x" size={20} />}
  onClick={onClose}
/>
```

### Multiple sizes
```jsx
<div className="t1-icon-sizes">
  <Phi name="arrow-right" size={12} />
  <Phi name="arrow-right" size={16} />
  <Phi name="arrow-right" size={24} />
</div>
```

## Common Icons
- **Navigation**: `arrow-right`, `arrow-left`, `caret-down`, `caret-up`, `chevron-right`
- **Actions**: `check`, `plus`, `x`, `trash`, `pencil`, `copy`, `share`
- **Status**: `check-circle`, `warning-circle`, `info`, `clock`
- **Objects**: `briefcase`, `envelope`, `phone`, `magnifying-glass`, `star`
- **States**: `eye`, `eye-slash`, `lock`, `unlock`

## Visual Specification

### Icon Sizes
| Size (px) | Use Case |
|-----------|----------|
| 12 | Extra-small inline indicators (badges, tags, micro-UI) |
| 14 | Inline text icons, dense UI |
| 16 | Standard default (buttons, toolbar icons, most components) |
| 20 | Prominent interactive icons (icon buttons, form controls) |
| 24 | Large controls, featured actions, cards |
| 32 | Hero/prominent display icons |
| 40 | Large call-to-action icons, page-level actions |

### Weight Variants
| Weight | Use Case | Appearance |
|--------|----------|------------|
| `"regular"` (default) | Standard icons in UI components | Thin, balanced strokes |
| `"bold"` | Emphasis, prominent icons, key actions | Heavier strokes, more visual weight |
| `"fill"` | Status indicators, toggles, highlighted states | Solid filled silhouette |
| `"duotone"` | Not directly supported in this kit; use regular/bold/fill instead | Two-colour layered appearance |

### Colour Inheritance
- Icons inherit text `color` from their parent container (no separate colour prop).
- To colour an icon, wrap it in a `<span>` or `<div>` with a `style={{ color: '...' }}` or CSS class with colour rules.
- Kit components (Button, Link, IconButton) automatically apply the correct icon colour for their context.

### Sizing Rules
- **Inside kit components**: Icons are sized automatically (Button handles icon sizing, Link handles inline icon sizing, etc.).
- **Standalone usage**: Always specify an explicit `size` prop. Never rely on inherited font-size.
- **Min size**: 12px. Smaller than 12px becomes difficult to read at typical screen distances.
- **Max size**: 40px for standard Phi usage. For oversized decorative icons, use raw SVG or custom graphics.

### Weight Selection Guidance
| Scenario | Recommended Weight |
|----------|-------------------|
| Buttons, toolbars, standard UI | `"regular"` or `"bold"` for emphasis |
| Status dots, badges, indicators | `"fill"` for solid appearance |
| Navigation items, breadcrumbs | `"regular"` (default) |
| Large hero icons, section headers | `"bold"` or larger size |
| Disabled/muted states | `"regular"` with muted colour (e.g., $t1-neutral-500) |
| Active/selected states | `"bold"` or `"fill"` with primary colour |

## Notes
- Icon names are **case-sensitive** and use kebab-case (e.g., "check-circle", not "CheckCircle").
- RULE: Always use `<Phi>` inside kit components and new components.
- Never compose `<i className="icon-{name}">` or inline SVG `<svg>` elements.
- Size must be a positive number (pixels). Recommended: 12, 14, 16, 20, 24, 32, 40.
- Weight options: "regular" (default), "bold", "fill".
- Icons do **not** have a dedicated colour prop; they inherit text colour from their parent. Use CSS or inline styles to colour them.
- For a complete icon list and visual reference, see the Phosphor icon library documentation (https://phosphoricons.com).
- Always test icons at the intended size to ensure legibility and visual balance in your design.
