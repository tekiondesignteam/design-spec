# Message-Draft

> Shows an AI-drafted outgoing message (email/SMS) for user review before sending

## When to use
- AI drafts a follow-up email or SMS
- User can edit, send, or discard the message
- Show inside Response contentSlot

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | string | "Flora Fleisher" | Recipient name |
| `body` | string | — | Message text (supports `\n` for line breaks) |
| `note` | string | "Note: Once you send..." | Footer disclaimer |
| `onSend` | function | — | Called with message body when sent |
| `className` | string | — | Extra CSS class |

## Behavior
- **Idle state**: Collapsed, shows To row and preview text
- **Active state**: Content area highlighted, Send button visible
- **Sending state**: Button shows "Sending..." + spinner (disabled)
- **Success state**: Checkmark + confirmation message
- **Error state**: X icon + "Could not be sent" + Try Again button
- Click outside card → return to idle

## Visual Specification

### Layout & Sizing
| Property | Value |
|----------|-------|
| Card width | 322px |
| Card padding | 16px |
| Content padding | 12px |
| Content border | 1px solid |
| Alert padding | 12px |
| Alert border | 1px solid |

### Colours
| Element | Property | Default | Hover | Active/Sending | Success | Error |
|---------|----------|---------|-------|---|---|---|
| Card | border | $t1-neutral-200 | $t1-neutral-200 | $t1-neutral-200 | $t1-neutral-200 | $t1-neutral-200 |
| Content | background | transparent | $t1-neutral-100 | $t1-neutral-0 | $t1-neutral-0 | $t1-neutral-0 |
| Content | border | transparent | $t1-neutral-200 dashed | $t1-blue-400 | $t1-blue-400 | $t1-blue-400 |
| Alert success | background | — | — | — | $t1-green-25 | — |
| Alert success | border | — | — | — | $t1-green-500 | — |
| Alert error | background | — | — | — | — | $t1-red-25 |
| Alert error | border | — | — | — | — | $t1-red-400 |

### Typography
| Element | font-size | font-weight | line-height | Colour |
|---------|-----------|-------------|-------------|--------|
| To label (idle) | 14px | $t1-weight-regular | 16px | $t1-neutral-400 |
| To label (active+) | 14px | $t1-weight-regular | 16px | $t1-neutral-900 |
| Message body | 14px | $t1-weight-regular | 16px | $t1-neutral-900 |
| Alert text | 14px | $t1-weight-medium | 16px | $t1-green-500 or $t1-red-400 |
| Alert icon | 16px | — | — | $t1-green-500 or $t1-red-400 |
| Note (idle) | 10px | $t1-weight-regular | 12px | $t1-neutral-400 |
| Note (active+) | 10px | $t1-weight-regular | 12px | $t1-neutral-900 |

### Spacing
| Element | Property | Value |
|----------|----------|-------|
| Wrapper | gap | 8px |
| Card | gap | 16px |
| Main | gap | 8px |
| To row | gap | 8px |
| Content | gap | 8px |
| Alert | gap | 8px |

### States
| State | What changes |
|-------|-------------|
| default | Content border transparent, background transparent, to-label $t1-neutral-400, note $t1-neutral-400 |
| hover | Content background $t1-neutral-100, border 1px dashed $t1-neutral-200 |
| active | Content border 1px solid $t1-blue-400, background $t1-neutral-0, to-label $t1-neutral-900, note $t1-neutral-900 |
| sending | Content border 1px solid $t1-blue-400, background $t1-neutral-0, button disabled with spinner |
| success | Alert bar shows with green background ($t1-green-25), border ($t1-green-500), icon and text ($t1-green-500), to-label and note turn $t1-neutral-900 |
| error | Alert bar shows with red background ($t1-red-25), border ($t1-red-400), icon and text ($t1-red-400), to-label and note turn $t1-neutral-900 |

## Examples
### Draft follow-up SMS
```jsx
<MessageDraft 
  to="Flora Fleisher"
  body="Hi Flora,\n\nJust checking in! Are you still interested in the AeroVibe test drive?\n\nLet me know!\nDean"
  onSend={(body) => sendSMS(body)}
/>
```

### Draft email
```jsx
<MessageDraft 
  to="Alex Martinez"
  body="Hi Alex,\n\nThank you for your interest. I've attached the quote you requested.\n\nBest,\nSales Team"
  note="Note: Email will be sent to alex@company.com"
  onSend={handleEmailSend}
/>
```

### In Response
```jsx
<Response>
  <p>I've drafted a follow-up message:</p>
  <MessageDraft 
    to="Customer"
    body="..."
    onSend={sendMessage}
  />
</Response>
```

## State machine
```
idle → active (click content area)
active → idle (click outside card)
active → sending (click Send)
sending → success | error (after delay)
error → idle (click Try Again)
```

## Notes
- Uses kit Chip, Separator, Button components
- Message text supports newlines (`\n` → `<br />`)
- Simulate 1.5s send delay + 80% success rate in demo
- On error, offer "Try Again" button (returns to idle)
- Footer note is optional but recommended for compliance
