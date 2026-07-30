/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   MESSAGE-DRAFT  (Figma: aiT1MessageDraft)
   BEM prefix: t1-md

   Props
   ─────────────────────────────────────────────────────────────────────────
   to          string    recipient name (shown in Chip)
   body        string    message text (\n = line break)
   note        string    footer disclaimer
   onSend      function  called with message body when sent
   className   string    optional extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   • Chip       — "To:" recipient (variant="outlined" color="neutral" size="md")
   • Separator  — horizontal divider between To row and message body
   • Button     — Send / Sending… / Try Again (size="md")

   Interactive state machine
   ─────────────────────────────────────────────────────────────────────────
   idle  →  active  (click inside content area)
   active → idle    (click outside content area on card)
   active → sending (click "Send")
   sending → success | error  (after 1.5 s simulated delay)
   error  → idle    (click "Try Again")
   ========================================================================== */

const MessageDraft = ({
  to        = 'Flora Fleisher',
  body      = 'Hi Flora,\n\nGreat speaking with you! I have you down for Tuesday at 10 AM to drive the 2023 AeroVibe.\n\nSee you then!\nDean',
  note      = 'Note: Once you send this message, it cannot be undone.',
  onSend,
  className,
  ...rest
}) => {
  /* idle | active | sending | success | error */
  const [status, setStatus] = React.useState('idle');

  /* ── Handlers ─────────────────────────────────────────────────────────── */

  // Card background click deactivates (only when active)
  const handleCardClick = () => {
    if (status === 'active') setStatus('idle');
  };

  // Content area click activates (idle → active)
  const handleContentClick = (e) => {
    e.stopPropagation(); // don't bubble to card → idle
    if (status === 'idle') setStatus('active');
  };

  // Send button
  const handleSend = (e) => {
    e.stopPropagation();
    setStatus('sending');
    onSend && onSend(body);
    // Simulate: 80% success, 20% error for demo realism
    setTimeout(() => {
      setStatus(Math.random() < 0.8 ? 'success' : 'error');
    }, 1500);
  };

  // Try Again resets to idle
  const handleRetry = (e) => {
    e.stopPropagation();
    setStatus('idle');
  };

  /* ── Derived ──────────────────────────────────────────────────────────── */
  const cls = [
    't1-md',
    status !== 'idle' && `t1-md--${status}`,
    className,
  ].filter(Boolean).join(' ');

  const showSendBtn    = status === 'idle' || status === 'active';
  const showSendingBtn = status === 'sending';
  const showRetryBtn   = status === 'error';
  const showSuccess    = status === 'success';
  const showError      = status === 'error';

  return (
    <div className={cls} {...rest}>

      {/* ── Card ── */}
      <div className="t1-md__card" onClick={handleCardClick}>

        {/* ── Main: To row + divider + content ── */}
        <div className="t1-md__main">

          {/* To: row */}
          <div className="t1-md__to-row">
            <span className="t1-md__to-label">To:</span>
            <Chip variant="outlined" color="neutral" size="md">{to}</Chip>
          </div>

          {/* Horizontal divider */}
          <Separator />

          {/* Content area — hover/active/default visuals via CSS class */}
          <div
            className="t1-md__content"
            onClick={handleContentClick}
            role="textbox"
            aria-multiline="true"
            tabIndex={status === 'idle' ? 0 : -1}
          >
            {/* Message body */}
            <div className="t1-md__text">
              {body.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>

            {/* Success alert — inside content area */}
            {showSuccess && (
              <div className="t1-md__alert t1-md__alert--success" role="status">
                <i className="ph-fill ph-check-circle t1-md__alert-icon" aria-hidden="true" />
                <span className="t1-md__alert-text">Text successfully sent to {to}</span>
              </div>
            )}

            {/* Error alert — inside content area */}
            {showError && (
              <div className="t1-md__alert t1-md__alert--error" role="alert">
                <i className="ph-fill ph-x-circle t1-md__alert-icon" aria-hidden="true" />
                <span className="t1-md__alert-text">Could not be sent due to technical error</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Action buttons — right-aligned by parent align-items: flex-end ── */}

        {showSendBtn && (
          <Button
            size="md"
            variant="contained"
            color="primary"
            onClick={handleSend}
          >
            Send
          </Button>
        )}

        {showSendingBtn && (
          <Button
            size="md"
            variant="outlined"
            color="neutral"
            disabled
            iconEnd={<i className="ph ph-circle-notch t1-md__spinner" aria-hidden="true" />}
          >
            Sending...
          </Button>
        )}

        {showRetryBtn && (
          <Button
            size="md"
            variant="contained"
            color="primary"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        )}

      </div>

      {/* ── Footer note ── */}
      <div className="t1-md__note">{note}</div>

    </div>
  );
};
