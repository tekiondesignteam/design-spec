# Task-Card

> Read-only task progress card displaying an AI-driven checklist. User cannot toggle checkboxes — the AI controls all state. Users can Stop or Notify the AI assistant.

## When to use
- Display an in-progress action plan or task list from the AI assistant.
- Show task completion progress in a visual, scannable format.
- Include Stop and Notify When Done action controls for user feedback to the AI.
- Use within Response's `contentSlot` to embed in conversation threads.

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | 'Task title' | Card heading / plan name |
| `tasks` | array | [4 sample tasks] | Array of task objects: `[{id, label, done}, ...]` |
| `onStop` | function | undefined | Callback when "Stop" link is clicked |
| `onNotify` | function | undefined | Callback when "Notify When Done" link is clicked |
| `className` | string | undefined | Extra CSS class |

## Task Object Structure
```javascript
{
  id: number,           // Unique identifier
  label: string,        // Task description text
  done: boolean         // Completion state (AI-controlled)
}
```

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card min-width | 320px |
| Card padding | 16px |
| Icon block size | 36×36px |
| Icon block border-radius | 2px |
| Container flex | column, gap 16px |
| Task row gap | 8px |
| Action gap | 16px |

### Colours
| Element | Property | Token/Value |
|---------|----------|-------|
| Card background | background | $t1-neutral-0 (#ffffff) |
| Card border | border | $t1-neutral-200 (#d4d5d6) |
| Icon block background | background | $t1-neutral-100 (#edeef0) |
| Icon block icon | color | $t1-neutral-500 (#6d707a) |
| Title text | color | $t1-neutral-900 (#161616) |
| Task label (incomplete) | color | $t1-neutral-900 (#161616) |
| Task label (complete) | color | $t1-neutral-400 (#969aa3) |
| Checkbox (kit) | color | success (green) |

### Typography
| Element | font-size | font-weight | line-height |
|---------|-----------|-------------|-------------|
| Title | 14px | 600 | 16px |
| Task label | 12px | 500 | 16px |
| Action links | 14px | 500 | 20px |

### States
| State | What changes |
|-------|-------------|
| Task incomplete (done: false) | Checkbox unchecked; label normal text colour; no strikethrough |
| Task complete (done: true) | Checkbox checked; label muted (#969aa3); text-decoration: line-through |
| Pointer events | All task rows block pointer-events — user cannot click or toggle checkboxes |
| Link hover | Stop and Notify links inherit kit Link hover behaviour (appearance: neutral/primary) |

## Examples

### Basic task card with mixed completion
```jsx
<TaskCard
  title="Document Preparation Checklist"
  tasks={[
    { id: 1, label: 'Review and confirm the final pricing details', done: true },
    { id: 2, label: 'Verify customer financing approval', done: true },
    { id: 3, label: 'Prepare all necessary paperwork and contracts', done: true },
    { id: 4, label: 'Schedule vehicle delivery or pickup', done: false },
  ]}
  onStop={() => console.log('User stopped the task')}
  onNotify={() => console.log('User wants notification when done')}
/>
```

### Single incomplete task
```jsx
<TaskCard
  title="Follow-up Actions"
  tasks={[
    { id: 1, label: 'Send financing options to customer', done: false },
  ]}
  onStop={handleStop}
  onNotify={handleNotify}
/>
```

## Notes
- **Read-only by design**: Tasks are 100% controlled by the AI. Users cannot toggle checkboxes. The CSS rule `pointer-events: none` on `.t1-tc__task` enforces this.
- The checkbox is a kit `Checkbox` component with `shape="circle"` and `color="success"`, displayed for visual feedback only.
- Action links use the kit `Link` component (`appearance="neutral"` for Stop, `appearance="primary"` for Notify When Done).
- The icon is a hardcoded Phosphor article icon (`ph-article` class).
- Completed task labels are automatically muted and struck through via the `.t1-tc__task--done` modifier class.
- Always pass task updates via the `tasks` prop to reflect progress; never try to mutate the DOM.
