# Chat-Container

> Thread wrapper that manages row layout for user messages (ChatBubble) and assistant replies (Response). Supports two modes: array-driven or manual children.

## When to use
- Wrapping a series of ChatBubble and Response components in a conversation thread
- Managing alignment, spacing, and row direction automatically
- Rendering a data-driven chat history from a messages array

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `messages` | Array | — | Structured mode: array of message objects with `role`, `content`, and optional metadata |
| `children` | ReactNode | — | Passthrough mode: manually wrap ChatBubble and Response components |
| `className` | string | — | Additional CSS class for the root |

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Container max-width | 720px |
| Container width | 100% |
| Row gap | 12px |
| Gap (avatar to content) | 8px |
| Min-width (Response in assistant row) | 0 |

### Row Alignment
| Row type | justify-content | align-items |
|----------|-----------------|-------------|
| user | flex-end | flex-start |
| assistant | flex-start | flex-start |

### Messages array object schema
```jsx
{
  role: 'user' | 'assistant',
  content: string | ReactNode,
  
  // (assistant-only) Response props
  title?: string,
  filterCount?: number,      // default 2
  sourceCount?: number,      // default 2
  showFilter?: boolean,      // default true
  showSource?: boolean,      // default true
}
```

## Examples

### Array mode (data-driven)
```jsx
<ChatContainer messages={[
  {
    role: 'user',
    content: 'What are our top 3 performing vehicle models this month?'
  },
  {
    role: 'assistant',
    title: 'March 2024 Performance',
    content: 'Based on current sales data:',
    orderedList: [
      'Model S — 34 units (48%)',
      'Model X — 18 units (26%)',
      'Model 3 — 17 units (26%)'
    ],
    filterCount: 2,
    showFilter: true,
    sourceCount: 1
  },
  {
    role: 'user',
    content: 'Show profitability breakdown'
  },
  {
    role: 'assistant',
    title: 'Profit by Model',
    content: 'Gross margin analysis:',
    unorderedList: [
      'Model S: 22% margin',
      'Model X: 19% margin',
      'Model 3: 18% margin'
    ]
  }
]} />
```

### Passthrough mode (manual)
```jsx
<ChatContainer>
  <ChatBubble role="user">
    Summarize last week's schedule
  </ChatBubble>
  <Response title="Your schedule" role="assistant">
    Monday–Friday: routine maintenance and sales consultations.
  </Response>
  <ChatBubble role="user">
    Any customer concerns?
  </ChatBubble>
  <Response role="assistant">
    3 customers requested extended financing — follow-up pending.
  </Response>
</ChatContainer>
```

### Mixed passthrough with custom cards
```jsx
<ChatContainer>
  <ChatBubble role="user">
    Show today's tasks
  </ChatBubble>
  <Response role="assistant" title="Today's Agenda">
    <div>5 tasks queued, 2 in progress</div>
  </Response>
  {/* Custom card — not ChatBubble/Response */}
  <div role="doc-tip" style={{ marginLeft: '24px', padding: '12px' }}>
    Quick reminder: Dealership close early on Friday.
  </div>
</ChatContainer>
```

## Notes
- **Choose one mode** — use either `messages` array OR `children`, not both. Messages array takes precedence if both are provided.
- **role prop in children** — in passthrough mode, set `role="user"` or `role="assistant"` on each child component to control alignment.
- **Automatic alignment** — `role="user"` items are right-aligned; `role="assistant"` items are left-aligned.
- **No avatar** — Response components do not render avatars; they are standalone left-aligned cards.
- **BEM prefix**: `t1-chat` — row class `t1-chat__row--user` or `t1-chat__row--assistant` applied automatically.
