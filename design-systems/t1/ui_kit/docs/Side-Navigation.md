# Side-Navigation

> Left sidebar for the chat interface. Contains primary navigation (Home/Tasks/Shortcuts), pinned chats, scheduled tasks with expandable subitems, recent chats, and a search field.

## When to use
- Building the left panel of a full-screen or embedded chat app
- Showing user's chat history and pinned conversations
- Displaying scheduled tasks with status indicators and expandable sub-items
- Providing navigation between app sections (home, tasks, shortcuts)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `scheduledTask` | boolean | false | Show "Recent Tasks" section with expandable items |
| `sections` | "Expanded" \| "Collapsed" | "Expanded" | Initial state for section headers (Pinned, Tasks, Recent) |
| `task` | "Default" \| "Collapsed" \| "Expanded" | "Default" | Task item expansion state; "Expanded" auto-opens first task with sub-items |
| `activeNav` | string | "tasks" | Initial active nav item: "home", "tasks", or "shortcuts" |
| `searchValue` | string | "" | Controlled search input value |
| `onSearch` | function | — | Callback with (value: string) on search input change |
| `onNewChat` | function | — | Callback when "Start a New Chat" button is clicked |
| `onNavSelect` | function | — | Callback with ({ id, label }) when a primary nav item is clicked |
| `pinnedChats` | array | Default 3 chats | Array of `{ id, label }` |
| `recentChats` | array | Default 8 chats | Array of `{ id, label }` |
| `recentTasks` | array | Default 5 tasks | Array of task objects (see schema below) |
| `onViewAllPinned` | function | — | Callback when "View all" link under Pinned Chats is clicked |
| `onViewAllTasks` | function | — | Callback when "View all" link under Recent Tasks is clicked |
| `onChatSelect` | function | — | Callback with (item) when a chat or task sub-item is clicked |
| `className` | string | — | Additional CSS class for the root |

### Task object schema
```jsx
{
  id: string,
  label: string,
  status?: "active" | "error" | "warning",
  subItems?: [
    { id: string, label: string, status?: string }
  ]
}
```

## Examples

### Minimal
```jsx
<SideNavigation />
```

### With custom data
```jsx
<SideNavigation
  pinnedChats={[
    { id: 'p1', label: 'Monthly Sales Review' },
    { id: 'p2', label: 'Lead scoring analysis' }
  ]}
  recentChats={[
    { id: 'r1', label: 'Q2 forecast discussion' },
    { id: 'r2', label: 'Competitor analysis' }
  ]}
  activeNav="home"
  onNavSelect={(item) => navigateTo(item.id)}
  onChatSelect={(item) => loadChat(item.id)}
/>
```

### With scheduled tasks
```jsx
<SideNavigation
  scheduledTask={true}
  task="Expanded"
  recentTasks={[
    {
      id: 'daily-report',
      label: 'Daily Sales Report',
      status: 'active',
      subItems: [
        { id: 'daily-apr8', label: 'Apr 8 - Daily Sales Report', status: 'active' },
        { id: 'daily-apr7', label: 'Apr 7 - Daily Sales Report' },
        { id: 'daily-apr6', label: 'Apr 6 - Daily Sales Report' }
      ]
    },
    {
      id: 'forecast',
      label: 'Q2 Revenue Forecast',
      status: 'warning'
    },
    {
      id: 'error-task',
      label: 'Reconcile inventory data',
      status: 'error'
    }
  ]}
  onViewAllTasks={() => navigate('/all-tasks')}
/>
```

## Primary navigation

| Item | Icon | ID |
|------|------|-----|
| Home | house | "home" |
| Tasks | clipboard-text | "tasks" |
| Shortcuts | lightning | "shortcuts" |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container width | 280px |
| Container height | 100% |
| Search container | sticky top, padding 16px, gap 16px |
| Search field height | 32px |
| Search field padding | 0 10px |
| Search field border | 1px solid $t1-neutral-400 |
| Search field border-radius | 2px (Figma: 2px) |
| Search field gap | 8px |
| Search input font-size | 14px |
| Primary nav padding | 0 16px 16px |
| Nav item padding | 8px |
| Nav item border-radius | 2px |
| Nav item gap | 12px |
| Nav icon size | 24px |
| Sections gap | 20px |
| Sections padding-bottom | 16px |
| Section header padding | 0 16px |
| Section header min-height | 32px |
| Section header gap | 8px |
| Section body padding | 0 8px |
| Chat item padding | 12px 12px 12px 32px |
| Chat item border-radius | 4px |
| Chat item gap | 8px |
| Task item padding | 12px 12px 12px 32px |
| Task item border-radius | 4px |
| Task item gap | 8px |
| Task sub-item padding | 12px 12px 12px 56px |
| Task sub-item border-radius | 4px |
| Task sub-item gap | 8px |
| View all padding | 12px 12px 12px 32px |
| View all--sub padding-left | 56px |
| Task expanded sub-list padding-bottom | 4px |
| Task sub-list item padding | 8px 12px 8px 32px |

### Colours
| Element | State | Property | Token |
|---------|-------|----------|-------|
| Container | — | background | $t1-neutral-0 |
| Container | — | border-right | 1px solid $t1-neutral-200 |
| Search field | default | background | $t1-neutral-0 |
| Search field | default | border | 1px solid $t1-neutral-400 |
| Search field | focus | border | 1px solid $t1-blue-500 |
| Search icon | default | color | $t1-neutral-400 |
| Search icon | focus | color | $t1-neutral-600 |
| Search input | — | color | $t1-neutral-900 |
| Search input placeholder | — | color | $t1-neutral-400 |
| Nav item | default | background | $t1-neutral-0 |
| Nav item | hover | background | $t1-neutral-50 |
| Nav item | active | background | $t1-neutral-100 |
| Nav icon | — | color | $t1-neutral-900 |
| Nav label | — | color | $t1-neutral-900 |
| Section label | — | color | $t1-neutral-400 |
| Section chevron | — | color | $t1-neutral-400 |
| Chat item | default | background | $t1-neutral-0 |
| Chat item | hover | background | $t1-neutral-50 |
| Chat item | selected | background | $t1-neutral-50 |
| Chat icon | — | color | $t1-neutral-900 |
| Chat label | — | color | $t1-neutral-900 |
| Task item | hover | background | $t1-neutral-50 |
| Task caret | — | color | $t1-neutral-600 |
| Task sub-item | hover | background | $t1-neutral-50 |
| Task sub-label | — | color | $t1-neutral-600 |
| View all link | — | color | $t1-neutral-600 |
| View all link | — | text-decoration | underline |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Search input | 14px | $t1-weight-regular | 16px |
| Nav label | 14px | $t1-weight-semibold (600) | 16px |
| Section label | 14px | $t1-weight-medium (500) | 16px |
| Chat label | 14px | $t1-weight-medium (500) | 16px |
| Task sub-label | 14px | $t1-weight-medium (500) | 16px |

### States
| State | What changes |
|-------|-------------|
| nav item hover | background → $t1-neutral-50 (except if active) |
| nav item active | background → $t1-neutral-100 |
| search field focus | border → $t1-blue-500, icon color → $t1-neutral-600 |
| chat item hover | background → $t1-neutral-50 |
| chat item selected | background → $t1-neutral-50 |
| task item hover | background → $t1-neutral-50 |
| task expanded | caret-right → caret-down, sub-items visible |
| task sub-item hover | background → $t1-neutral-50 |

## Task status indicators

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| active | filled circle | #0060ff (blue) | Currently running |
| warning | triangle | #f59e0b (amber) | Needs attention |
| error | filled circle | #e53935 (red) | Failed or errored |
| (none) | — | — | No status |

## Layout

- **Width**: 280px fixed
- **Search bar**: sticky top, always visible
- **"Start a New Chat" button**: neutral/contained/md, full-width below search
- **Primary nav**: Home, Tasks, Shortcuts (24px icons)
- **Pinned Chats section**: collapsible, always shown
- **Recent Tasks section**: only if `scheduledTask={true}`, collapsible
- **Recent Chats section**: always shown, collapsible
- **Task items**: expandable caret + label; sub-items appear indented when expanded
- **"View all" links**: at end of Pinned Chats and Recent Tasks sections

## Notes
- **Internal state management** — component manages section expand/collapse and selected chat internally
- **Task items with sub-items** — caret-right (collapsed) / caret-down (expanded); sub-items indent 8px further
- **BEM prefix**: `t1-sn` — see SCSS for colors, spacing, hover/active states
- **Kit components used**: Button (new chat), Link (view all), Phi (all icons)
- **Keyboard support**: Enter or click to toggle sections and select items
