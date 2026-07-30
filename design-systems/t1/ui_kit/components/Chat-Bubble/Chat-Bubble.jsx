/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHAT-BUBBLE  (Figma: AiT1ChatBubble)

   User message bubble only. Assistant replies use the Response component.

   Props
   ─────────────────────────────────────────────────────────────────────────
   children   string | ReactNode   message text / content
   state      "default" | "hover"  frozen Figma demo state (CSS :hover works)
   actions    ReactNode[]          fully override the hover action row
   onCopy     (text) => void       called after text is written to clipboard
   onEdit     (newText) => void    called when the user saves an inline edit;
                                   also triggers re-send in the prototype

   Copy behaviour
   ─────────────────────────────────────────────────────────────────────────
   Writes children (string) to navigator.clipboard, shows check icon for 2 s.

   Edit behaviour
   ─────────────────────────────────────────────────────────────────────────
   Click Edit → bubble body becomes an auto-growing textarea pre-filled with
   the current message text.
   • Ctrl/Cmd + Enter → save & call onEdit(newText)
   • Escape           → cancel, revert text
   • Cancel button    → same as Escape
   • Send button      → same as Ctrl+Enter

   Auto-grow: textarea height is reset to 'auto' then set to scrollHeight on
   every keystroke, so the bubble expands naturally with the content.

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-bubble[.is-hover][.is-editing]
     .t1-bubble__body[.t1-bubble__body--editing]
       .t1-bubble__text          — normal display
       .t1-bubble__textarea      — edit mode (replaces __text)
       .t1-bubble__edit-actions  — Cancel + Send (edit mode only)
     .t1-bubble__actions         — copy + edit icons (hidden in edit mode)
   ========================================================================== */

const ChatBubble = ({
  state    = 'default',
  actions,
  onCopy,
  onEdit,
  children,
  className,
  ...rest
}) => {
  const [editing,  setEditing]  = React.useState(false);
  const [editText, setEditText] = React.useState('');
  const [copied,   setCopied]   = React.useState(false);

  const textareaRef = React.useRef(null);
  const textContent = typeof children === 'string' ? children : '';

  /* Auto-grow textarea whenever text changes */
  React.useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, [editText]);

  /* Focus textarea and position cursor at end when entering edit mode */
  React.useEffect(() => {
    if (!editing || !textareaRef.current) return;
    const ta = textareaRef.current;
    ta.focus();
    ta.setSelectionRange(ta.value.length, ta.value.length);
  }, [editing]);

  /* ── Handlers ─────────────────────────────────────────────────────────── */
  const handleCopy = () => {
    if (textContent && navigator.clipboard) {
      navigator.clipboard.writeText(textContent).catch(() => {});
    }
    setCopied(true);
    onCopy && onCopy(textContent);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEditStart = () => {
    setEditText(textContent);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setEditing(false);
    onEdit && onEdit(trimmed);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditText('');
  };

  const handleTextareaKey = (e) => {
    if (e.key === 'Escape') { handleCancel(); return; }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSave();
  };

  /* ── Tooltip wrapper ─────────────────────────────────────────────────── */
  const Tip = ({ label, children: tipChildren }) => (
    <div className="t1-bubble__tip" data-tip={label}>
      {tipChildren}
    </div>
  );

  /* ── Default hover actions ───────────────────────────────────────────── */
  const defaultActions = [
    <Tip key="copy" label={copied ? 'Copied!' : 'Copy'}>
      <IconButton
        color="neutral" style="plain" size="sm"
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy message'}
      >
        <i className={`${copied ? 'ph ph-check' : 'ph ph-copy'} t1-bubble__action-icon`} aria-hidden="true" />
      </IconButton>
    </Tip>,
    <Tip key="edit" label="Edit">
      <IconButton
        color="neutral" style="plain" size="sm"
        onClick={handleEditStart}
        aria-label="Edit message"
      >
        <i className="ph ph-pencil-simple t1-bubble__action-icon" aria-hidden="true" />
      </IconButton>
    </Tip>,
  ];

  const actionItems = actions || defaultActions;

  const cls = [
    't1-bubble',
    state === 'hover' ? 'is-hover' : '',
    editing ? 'is-editing' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      <div className={`t1-bubble__body${editing ? ' t1-bubble__body--editing' : ''}`}>
        {editing ? (
          <>
            {/* Auto-growing textarea */}
            <textarea
              ref={textareaRef}
              className="t1-bubble__textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleTextareaKey}
              aria-label="Edit message"
              rows={1}
            />
            {/* Edit action row: Cancel + Send */}
            <div className="t1-bubble__edit-actions">
              <Button
                variant="text"
                color="neutral"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="sm"
                onClick={handleSave}
                disabled={!editText.trim()}
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <p className="t1-bubble__text">{children}</p>
        )}
      </div>

      {/* Action row — hidden while editing */}
      {!editing && (
        <div className="t1-bubble__actions" aria-hidden={state !== 'hover'}>
          {actionItems}
        </div>
      )}

    </div>
  );
};
