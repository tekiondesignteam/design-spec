/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHAT-CONTAINER
   BEM prefix: t1-chat

   Props
   ─────────────────────────────────────────────────────────────────────────
   messages        array     structured mode — renders turns from a data array
                  [{
                    role:    'user' | 'assistant'
                    content: string | ReactNode   — main text / body
                    title:   string               — (assistant only) summary title
                    filterCount: number           — (assistant only) default 2
                    sourceCount: number           — (assistant only) default 2
                    showFilter:  boolean          — (assistant only) default true
                    showSource:  boolean          — (assistant only) default true
                  }]

                  user       → ChatBubble (right-aligned)
                  assistant  → Response (left-aligned, no avatar)

   onEditMessage  (index, newText) => void
                  Called when the user saves an inline edit on a ChatBubble.
                  index = position of the message in the messages array.

   children       ReactNode passthrough mode — developer wraps turns manually.
                  child.props.role === 'user'      → right-aligned ChatBubble row
                  child.props.role === 'assistant' → Response row (no avatar)
                  any other role / no role         → assistant-aligned row

   className      string    extra class
   ========================================================================== */

const ChatContainer = ({
  messages,
  onEditMessage,
  children,
  className,
  ...rest
}) => {
  /* ── Messages-array mode ────────────────────────────────────────────────── */
  if (messages && messages.length > 0) {
    return (
      <div className={['t1-chat', className].filter(Boolean).join(' ')} {...rest}>
        {messages.map((msg, i) => (
          <div key={i} className={`t1-chat__row t1-chat__row--${msg.role}`}>
            {msg.role === 'assistant'
              ? <Response
                  title={msg.title}
                  filterCount={msg.filterCount !== undefined ? msg.filterCount : 2}
                  sourceCount={msg.sourceCount !== undefined ? msg.sourceCount : 2}
                  showFilter={msg.showFilter  !== undefined ? msg.showFilter  : true}
                  showSource={msg.showSource  !== undefined ? msg.showSource  : true}
                >
                  {msg.content}
                </Response>
              : <ChatBubble
                  role="user"
                  onEdit={onEditMessage ? (newText) => onEditMessage(i, newText) : undefined}
                >
                  {msg.content}
                </ChatBubble>
            }
          </div>
        ))}
      </div>
    );
  }

  /* ── Children passthrough mode ──────────────────────────────────────────── */
  /* Inspect each child's role prop to decide row type.                        */
  const wrappedChildren = React.Children.map(children, (child, i) => {
    if (!child) return null;
    const role = child.props && child.props.role;

    if (role === 'user') {
      return (
        <div key={i} className="t1-chat__row t1-chat__row--user">
          {child}
        </div>
      );
    }

    /* assistant or non-bubble content (Response, cards, etc.) */
    return (
      <div key={i} className="t1-chat__row t1-chat__row--assistant">
        {child}
      </div>
    );
  });

  return (
    <div className={['t1-chat', className].filter(Boolean).join(' ')} {...rest}>
      {wrappedChildren}
    </div>
  );
};
