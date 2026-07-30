# Nav-Bar

> Responsive top navigation bar for mobile or desktop chat interfaces. Supports hamburger menu, title centering, quick action buttons, and icon toolbars.

## When to use
- Mobile app header with hamburger menu and title
- Desktop chat bar with centered title and right-aligned action button
- Showing optional icon buttons for new chat or more options
- Maintaining title visual center while supporting variable left/right actions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Title" | Bar title text; always centered visually |
| `onMenuClick` | function | — | If provided, shows hamburger (☰) menu button on left |
| `showMore` | boolean | false | Show ⋯ (dots-three-vertical) icon button on right |
| `onMore` | function | — | Callback when ⋯ more button is clicked |
| `showNewChat` | boolean | false | Show pencil (new chat) icon button; appears before ⋯ |
| `onNewChat` | function | — | Callback when new-chat pencil icon is clicked |
| `actionLabel` | string | — | If set, shows a full-width action button with this label on right |
| `actionIcon` | string | "plus" | Phosphor icon name for the action button (e.g., "plus", "pencil-simple") |
| `onAction` | function | — | Callback when action button is clicked |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 100% |
| Container min-height | 48px |
| Container padding | 4px 16px |
| Container border-bottom | 1px solid $t1-neutral-200 |
| Inner row gap | 8px |
| Prefix width | 40px (flex-shrink 0) |
| Title flex | 1 0 0 (centered, min-width 0) |
| Title text-align | center |
| Suffix gap | 8px (flex-shrink 0) |
| Balance spacer width | 40px (flex-shrink 0, for visual centering) |
| Icon button width | 40px |
| Icon button height | 40px |
| Icon button border-radius | $t1-radius-xs (2px) |
| Icon button padding | 0 |
| Action button height | 32px (via kit Button size=md) |

### Colours
| Element | Property | Token |
|---------|----------|-------|
| Container | background | $t1-neutral-0 |
| Container | border-bottom | $t1-neutral-200 |
| Title | color | $t1-neutral-900 |
| Icon button | color (default) | $t1-neutral-900 |
| Icon button | background (hover) | $t1-neutral-50 |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 16px | $t1-weight-semibold (600) | 24px |

### States
| State | What changes |
|-------|-------------|
| icon button hover | background → $t1-neutral-50 |
| icon button focus-visible | outline 2px solid $t1-blue-500, offset -2px |

## Examples

### Mobile with menu
```jsx
<NavBar
  title="Sales Assistant"
  onMenuClick={() => openSidebar()}
  showMore={true}
  onMore={() => openMoreMenu()}
/>
```

### Mobile with new-chat icon
```jsx
<NavBar
  title="Messages"
  onMenuClick={() => toggleMenu()}
  showNewChat={true}
  onNewChat={() => startNewChat()}
  showMore={true}
  onMore={() => showOptions()}
/>
```

### Desktop with action button
```jsx
<NavBar
  title="Conversation"
  actionLabel="Schedule"
  actionIcon="calendar"
  onAction={() => openScheduler()}
/>
```

### Desktop with different action icon
```jsx
<NavBar
  title="Tasks"
  actionLabel="Create"
  actionIcon="plus"
  onAction={() => createNewTask()}
/>
```

### Minimal (no actions)
```jsx
<NavBar title="Chat" />
```

## Layout patterns

### Mobile (with icons)
- Prefix: hamburger [☰] (if onMenuClick provided)
- Center: title (always centered)
- Suffix: [✎] new-chat (if showNewChat), [⋯] more (if showMore)
- Icons are 24px, neutral color

### Desktop (with action button)
- Prefix: invisible 40px spacer (for visual balance)
- Center: title
- Suffix: [Create/Schedule/...] button (kit Button component) + invisible 40px spacer
- Title stays centered regardless of button width

### No actions
- Prefix: invisible 40px spacer
- Center: title
- Suffix: invisible 40px spacer
- Title perfectly centered

## Notes
- **Title always centered** — prefix and suffix use invisible spacers to maintain visual centering
- **Choose one pattern** — use either icon buttons (mobile) OR action button (desktop), not mixed
- **Action button uses kit Button** — variant="contained", color="primary", size="md", with optional `iconStart`
- **Icon buttons are raw buttons** — never use kit IconButton for title-bar actions
- **BEM prefix**: `t1-nb` — see SCSS for colors, spacing, and button styles
- **Responsive design** — consider setting action button only on desktop via media query logic
