# App-Bar

> Window chrome / top control bar for an embedded or floating AI panel. Supports five variants — panel, fullscreen, stickyMaximized, stickyMinimized, mobileDrag — plus a built-in Move & Resize popover menu and drag affordances (grip / pill).

## When to use
- Window controls for an AI assistant panel (minimize, move, fullscreen, close)
- Showing the panel title and T1 logo
- Providing a Move & Resize popover to switch between dock positions, fullscreen, and pop-out
- Supporting drag-to-reposition in sticky / mobile variants

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | "panel" \| "fullscreen" \| "stickyMaximized" \| "stickyMinimized" \| "mobileDrag" | "panel" | Visual variant (Figma parity). Legacy aliases `"default"` → panel, `"expanded"` → fullscreen, `"minimized"` → stickyMinimized are accepted. |
| `title` | string | "AI Assistant" | Text shown next to the T1 logo |
| `orientation` | "left" \| "right" | "right" | Affects the default Move & Resize menu items when `type="panel"`. Mirrors the Figma `aiT1DropdownPanel` orientation variant. |
| `showMoveMenu` | boolean | true | Show the Move & Resize popover on panel / fullscreen / stickyMaximized. When false, falls back to a plain fullscreen / restore icon button. |
| `moveMenuItems` | `[{ key, icon, label, target, flipX? }]` | per-variant defaults | Override the popover's list items. Targets used by the default handler: `'left'`, `'right'`, `'fullscreen'`, `'popover'`. |
| `moveMenuOpen` | boolean | — | Controlled open state. When omitted, the component manages it internally. |
| `onMoveMenuChange` | `(open) => void` | — | Called whenever the popover opens or closes. |
| `onMove` | `(target) => void` | — | Fires when the user picks a Move & Resize option. |
| `onMinimize` | function | — | Minimize button clicked |
| `onFullscreen` | function | — | Fullscreen button clicked (alias: `onExpand`) |
| `onRestore` | function | — | Restore button clicked (only used when `showMoveMenu={false}` on fullscreen) |
| `onCollapse` | function | — | Collapse (caret-up) button clicked on stickyMinimized |
| `onClose` | function | — | Close button clicked |
| `onDragStart` | `(e) => void` | — | Fired on pointerdown on the drag grip (sticky variants) or drag pill (mobileDrag). The consumer implements the actual drag logic. |
| `className` | string | — | Extra class on the root |

## Visual Specification

### Layout & Sizing
| Variant | Width | Height | Border-radius | Padding |
|-------|-------|--------|-----------------|---------|
| panel            | 400px | 44px | 8px 8px 0 0 | 0 16px |
| fullscreen       | 100%  | 44px | 8px 8px 0 0 | 0 16px |
| stickyMaximized  | 400px | 44px | 8px 8px 0 0 | 0 16px |
| stickyMinimized  | 400px | 44px | 8px 8px 0 0 | 0 16px |
| mobileDrag       | 400px | 44px (stacked) | 8px 8px 0 0 | 0 16px |

### Component Sizing
| Element | Dimension |
|---------|-----------|
| Logo | 16×16px |
| Title gap (logo/name) | 4px |
| Controls gap | 16px |
| Control button | 24×24px, border-radius 4px |
| Control icon font-size | 16px |
| Drag pill | 80×4px, border-radius 2px, absolute top 4px center |
| Drag grip | 16×16px, absolute left 0, vertically centered |
| Drag grip icon font-size | 14px |
| Move menu popover | 212px wide, border-radius 2px |
| Move menu offset | top calc(100% + 8px), right 0 (anchored to trigger) |

### Colours
| Element | Property | Value |
|---------|----------|-------|
| Container (panel / sticky* / mobileDrag) | background | linear-gradient(143.736deg, #E7F7F9 0%, #FBF8F2 100%) |
| Container (fullscreen) | background | linear-gradient(167.987deg, #E7F7F9 0%, #FBF8F2 100%) |
| Logo | background | linear-gradient(90deg, #25C8A5 0%, #1B90B4 50%, #1A6CC4 100%) (CSS-masked via T1.svg) |
| Title text | color | #444f5c ($t1-neutral-600) |
| Control button | color (default) | $t1-neutral-600 |
| Control button | background (hover / open) | #edeef0 |
| Control button | color (hover / open) | $t1-neutral-900 |
| Control button — close | background (hover) | #fee2e2 |
| Control button — close | color (hover) | #dc2626 |
| Drag pill | background | #d4d5d6 ($t1-neutral-200) |
| Drag grip | color (default) | $t1-neutral-400 |
| Drag grip | color (hover) | $t1-neutral-600 |
| Move menu | background | #ffffff |
| Move menu | border | 1px solid #d4d5d6 |
| Move menu | shadow | 0 2px 16px 0 rgba(25, 40, 57, 0.09) |
| Move menu header | color | #444f5c |
| Move menu item | color | #444f5c |
| Move menu item (hover) | background | $t1-neutral-25 |
| Move menu item icon | color | $t1-neutral-500 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 16px | 500 | 24px |
| Control icon | 16px | — | 1 |
| Drag grip icon | 14px | — | 1 |
| Menu header | 12px | 400 | 16px |
| Menu item | 14px | 400 | 16px |

### Controls per variant

| Variant | Left edge | Right-side controls |
|---------|-----------|---------------------|
| panel           | — | minimize (−), layout-trigger (⤡), close (×) |
| fullscreen      | — | minimize (−), layout-trigger (sidebar), close (×) |
| stickyMaximized | drag grip | minimize (−), layout-trigger (⤡), close (×) |
| stickyMinimized | drag grip | collapse (^), close (×) |
| mobileDrag      | drag pill (top center) | close (×) |

### Move & Resize menu defaults

| Variant | Items |
|---------|-------|
| panel, orientation="right" | Right of the Screen · Full Screen · Pop Out |
| panel, orientation="left"  | Left of the Screen · Full Screen · Pop Out |
| fullscreen                 | Left of the Screen · Right of the Screen · Pop Out |
| stickyMaximized            | Left of the Screen · Right of the Screen · Full Screen |
| stickyMinimized            | — (no menu) |
| mobileDrag                 | — (no menu) |

### States
| State | What changes |
|-------|-------------|
| Control button hover / open | background #edeef0, color $t1-neutral-900 |
| Close button hover | background #fee2e2, color #dc2626 |
| Drag grip hover | color $t1-neutral-600 |
| Drag grip active | cursor grabbing |
| Menu trigger open | same hover background; `aria-expanded="true"` |
| Menu item hover | background $t1-neutral-25 |

## Examples

### Default panel with built-in Move & Resize menu
```jsx
<AppBar
  type="panel"
  title="Sales Assistant"
  orientation="right"
  onMinimize={() => setState('minimized')}
  onMove={target => setState(target)}
  onClose={() => closePanel()}
/>
```

### Fullscreen with custom menu items
```jsx
<AppBar
  type="fullscreen"
  title="Sales Assistant"
  moveMenuItems={[
    { key: 'left',  icon: 'sidebar-simple',   label: 'Left of the Screen',  target: 'left'  },
    { key: 'right', icon: 'sidebar-simple',   label: 'Right of the Screen', target: 'right', flipX: true },
    { key: 'pop',   icon: 'arrow-square-out', label: 'Pop Out',             target: 'popover' },
  ]}
  onMove={target => setState(target)}
  onMinimize={() => setState('minimized')}
  onClose={() => closePanel()}
/>
```

### Sticky-maximized with drag handler
```jsx
<AppBar
  type="stickyMaximized"
  title="Sales Assistant"
  onDragStart={(e) => beginDrag(e)}
  onMinimize={() => setState('minimized')}
  onMove={target => setState(target)}
  onClose={() => closePanel()}
/>
```

### Sticky-minimized (collapsed strip with drag grip)
```jsx
<AppBar
  type="stickyMinimized"
  title="Sales Assistant"
  onDragStart={(e) => beginDrag(e)}
  onCollapse={() => setState('popover')}
  onClose={() => closePanel()}
/>
```

### Mobile drag
```jsx
<AppBar
  type="mobileDrag"
  title="Sales Assistant"
  onDragStart={(e) => beginDrag(e)}
  onClose={() => closePanel()}
/>
```

### Controlled menu (custom trigger / hover behaviour)
```jsx
const [open, setOpen] = useState(false);

<AppBar
  type="panel"
  moveMenuOpen={open}
  onMoveMenuChange={setOpen}
  onMove={target => { goTo(target); setOpen(false); }}
/>
```

## Notes

- **Self-managed state** — without `onMove` / drag handlers the component tracks its own type internally (for previews).
- **Move & Resize popover** — opens on click of the layout icon. Closes on outside click, Escape, or after selecting an item. Positioned below-right of the trigger (top `calc(100% + 8px)`, right 0).
- **Drag** — the grip (`t1-ab__drag-grip`) on sticky variants and the pill (`t1-ab__drag-pill`) on mobileDrag both fire `onDragStart` on pointerdown. The consumer owns the actual move-on-pointer-move logic.
- **Icons** — Phosphor. Trigger icons: panel / stickyMaximized → `arrows-out`, fullscreen → `sidebar-simple`. Default menu item icons: `sidebar-simple` (dock), `corners-out` (full screen), `arrow-square-out` (pop out).
- **T1 logo** — CSS-masked white fill with brand gradient background; not clickable.
- **Button order** — minimize always first; close always last.
- **BEM prefix**: `t1-ab`. Modifiers: `--panel`, `--fullscreen`, `--sticky-maximized`, `--sticky-minimized`, `--mobile-drag`, `--has-grip`.
- **Keyboard** — every control is a real `<button>` with `aria-label`. The menu trigger exposes `aria-haspopup="menu"` and `aria-expanded`; the popover uses `role="menu"` with `role="menuitem"` items.
- **Backwards compatibility** — `type` accepts legacy values: `default` (= panel), `expanded` (= fullscreen), `minimized` (= stickyMinimized). `onExpand` is an alias for `onFullscreen`.
