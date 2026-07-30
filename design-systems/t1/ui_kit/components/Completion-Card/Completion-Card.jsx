/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   COMPLETION-CARD  (Figma: aiT1completionCard)

   Displays an AI action completion summary: a status header with avatar +
   title/subtitle, a list of label-value detail rows, and a primary CTA button.

   Props
   ─────────────────────────────────────────────────────────────────────────
   title       string      — headline in the header
   subtitle    string      — secondary line in the header
   icon        ReactNode   — icon inside the avatar (default: ph-check bold)
   rows        { label, value }[]  — detail rows in the body
   action      string | ReactNode  — button label or custom button element
   onAction    function    — click handler for the default button
   className   string
   ========================================================================== */

const CompletionCard = ({
  title    = 'Test Drive Confirmed',
  subtitle = 'SMS notification sent to customer',
  icon,
  rows = [
    { label: 'CUSTOMER',   value: 'Curtis Gable'           },
    { label: 'VEHICLE',    value: '2023 Galactic Mirage'   },
    { label: 'DATE & TIME',value: 'Jan 28, 2026 at 10:00 AM' },
  ],
  action   = 'View in Calendar',
  onAction,
  className,
  ...rest
}) => {
  const avatarIcon = icon || (
    <i className="ph-bold ph-check t1-cc__avatar-icon" aria-hidden="true" />
  );

  const actionEl = typeof action === 'string'
    ? (
      <Button
        variant="contained"
        color="primary"
        size="lg"
        onClick={onAction}
      >
        {action}
      </Button>
    )
    : action;

  const cls = ['t1-cc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Header ── */}
      <div className="t1-cc__header">
        <div className="t1-cc__avatar" aria-hidden="true">
          {avatarIcon}
        </div>
        <div className="t1-cc__header-content">
          <div className="t1-cc__title">{title}</div>
          <div className="t1-cc__subtitle">{subtitle}</div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="t1-cc__body">

        {/* Detail rows */}
        <div className="t1-cc__rows">
          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div className="t1-cc__row">
                <span className="t1-cc__row-label">{row.label}</span>
                <span className="t1-cc__row-value">{row.value}</span>
              </div>
              {i < rows.length - 1 && <div className="t1-cc__row-sep" />}
            </React.Fragment>
          ))}
        </div>

        {/* CTA button */}
        <div className="t1-cc__action">
          {actionEl}
        </div>

      </div>
    </div>
  );
};
