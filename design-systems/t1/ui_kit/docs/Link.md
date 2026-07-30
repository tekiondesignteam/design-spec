# Link

> Inline text link for navigation. Never write raw `<a>` with custom styles.

## When to use
- Inline links inside response/chat text
- Footer links and legal copy
- Breadcrumbs and navigation
- External documentation links

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `appearance` | "primary" \| "neutral" | "primary" | Link color |
| `size` | "small" \| "medium" \| "large" | "medium" | Text size |
| `underlined` | boolean | false | Always show underline |
| `href` | string | — | Link target URL |
| `children` | ReactNode | — | Link text |

## Visual Specification

### Typography
| Size | font-size | line-height |
|------|-----------|-------------|
| small | 12px | 16px |
| medium | 13px | 16px |
| large | 14px | 16px |

### Colours — Primary
| State | Text |
|-------|------|
| default | var(--t1-blue-500) |
| hover | (underline added) |

### Colours — Neutral
| State | Text |
|-------|------|
| default | var(--t1-neutral-700) |
| hover | (underline added) |

## Examples

### Basic link
```jsx
<Link href="https://docs.example.com">
  View documentation
</Link>
```

### Neutral appearance
```jsx
<p>
  Need help? <Link appearance="neutral" href="/support">
    Contact support
  </Link>
</p>
```

### Large size
```jsx
<Link
  size="large"
  appearance="primary"
  href="/deals/new"
  underlined={true}
>
  Create New Deal
</Link>
```

### Inside response text
```jsx
<div className="t1-response-body">
  <p>
    I've created the contact. You can{' '}
    <Link href={`/contacts/${contactId}`}>
      view the profile
    </Link>{' '}
    or assign it to a team member.
  </p>
</div>
```

### Footer links
```jsx
<footer>
  <Link appearance="neutral" size="small" href="/privacy">
    Privacy Policy
  </Link>
  <Link appearance="neutral" size="small" href="/terms">
    Terms
  </Link>
</footer>
```

## Notes
- Always use `href` for navigation — never use `onClick` handlers.
- `underlined={true}` is optional. By default, underline appears on hover.
- Use `appearance="neutral"` for secondary/less important links.
- For buttons that navigate, use `Button` instead.
- Link colors are automatically accessible with proper contrast.
- See also: `Button` (action triggers), `Icon-Button` (icon-only nav)
