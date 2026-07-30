# Switch

> On/off toggle for settings and preferences.

## When to use
- Settings panels (enable/disable features)
- Preferences (notifications, auto-save, dark mode)
- Simple boolean options in forms
- Feature flags in AI chat interface

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | — | Toggle label |
| `checked` | boolean | false | On/off state |
| `disabled` | boolean | false | Disable interaction |
| `onChange` | function(event) | — | Change handler |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Track width | 48px |
| Track height | 24px |
| Track border-radius | $t1-radius-xs |
| Track padding | 2px |
| Track border | 1px solid transparent |
| Handle width | 20px |
| Handle height | 20px |
| Handle border-radius | 6px |
| Handle border | 1px solid transparent |
| Handle travel distance | 22px |
| Label font-size | var(--t1-text-14) |
| Label font-weight | $t1-weight-regular |
| Label line-height | var(--t1-leading-14) |

### Colours
| State | Track bg | Handle bg |
|-------|----------|-----------|
| unchecked/default | $t1-teal-400 | $t1-neutral-0 |
| checked/default | $t1-teal-500 | $t1-neutral-0 |
| disabled | (50% opacity) | (50% opacity) |

### Focus
| Property | Value |
|----------|-------|
| Focus outline | 2px solid $t1-blue-700 |
| Focus outline-offset | 2px |
| Focus border-radius | $t1-radius-xs |

## Examples

### Basic toggle
```jsx
<Switch
  label="Enable notifications"
  checked={notificationsEnabled}
  onChange={(e) => setNotificationsEnabled(e.target.checked)}
/>
```

### In settings panel
```jsx
<div className="t1-settings">
  <Switch
    label="Send daily digest"
    checked={digest}
    onChange={(e) => setDigest(e.target.checked)}
  />
  <Switch
    label="Auto-save drafts"
    checked={autoSave}
    onChange={(e) => setAutoSave(e.target.checked)}
  />
  <Switch
    label="Show activity log"
    checked={showLog}
    onChange={(e) => setShowLog(e.target.checked)}
  />
</div>
```

### Disabled state
```jsx
<Switch
  label="Advanced features (requires admin)"
  checked={advanced}
  disabled={!isAdmin}
  onChange={(e) => setAdvanced(e.target.checked)}
/>
```

## Notes
- `onChange` receives a synthetic event. Use `e.target.checked` to get the boolean value.
- Use for simple binary choices only.
- For multi-step toggles or complex state, use `Checkbox` instead.
- Always pair with descriptive `label` text.
- See also: `Checkbox` (multi-select), `Button` (actions)
