# Fav-Bar-Icon

> Starred/bookmarked icon button for the main navigation favorites bar — quick-access pinned items

## When to use
- Favorites / bookmarks bar in top navigation
- Pin frequently used CRM sections (Customers, Deals, Reports)
- Quick-access navigation in left sidebar or top bar

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | function | — | Called when clicked (optional) |
| `className` | string | — | Extra CSS class |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container height | 56px |
| Container padding | 6px 12px ($t1-space-3) |
| Tile width | 40px |
| Tile height | 40px |
| Tile border-radius | $t1-radius-sm (4px) |
| Logo width | 24px |
| Logo height | 18px |
| Overflow | hidden |

### Gradient (100.05deg angle)
| Property | Value |
|----------|-------|
| Start | $t1-grad-teal 0% |
| Middle | $t1-grad-cyan 50% |
| End | $t1-grad-blue 100% |

### Focus
| Property | Value |
|----------|-------|
| Outline | 2px solid $t1-border-focus |
| Outline-offset | 2px |

## Appearance
- Star icon (filled or outlined based on favorited state)
- Small, tappable, suited for navigation bar
- Inherits color from parent nav styling

## Examples
### In navigation bar (no interaction)
```jsx
<nav>
  <FavBarIcon />
  <FavBarIcon />
  <FavBarIcon />
</nav>
```

### With toggle handler
```jsx
<FavBarIcon 
  onClick={() => toggleFavorite('customers')}
/>
```

### Bookmarks row
```jsx
<div className="fav-bar">
  <FavBarIcon /> {/* Customers */}
  <FavBarIcon /> {/* Active Deals */}
  <FavBarIcon /> {/* My Schedule */}
</div>
```

## Notes
- Use only in navigation header/toolbar context
- Minimal, icon-only (no text label in this context)
- Size and styling fixed to match nav bar aesthetic
- Usually displayed as a row of small buttons
- Pair with Nav-Bar or App-Bar component
