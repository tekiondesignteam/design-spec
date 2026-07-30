/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   NOTIFY-MY-CARD  (Figma: aiT1NotifyMeCard)
   BEM prefix: t1-nmc

   Props
   ─────────────────────────────────────────────────────────────────────────
   notified      boolean           initial notified state      default: false
   heading       string            main status text
   description   string            sub-text (shown in both states)
   actionLabel   string            button copy                 default: 'Notify me when ready'
   onNotify      function          called when button clicked
   className     string            optional extra class

   Interaction
   ─────────────────────────────────────────────────────────────────────────
   Clicking the button transitions from default → notified state.
   The card shrinks from the tall default layout to the compact notified row,
   using the kit Button component internally.
   ========================================================================== */

const NotifyMyCard = ({
  notified     = false,
  heading      = 'Generating this report is taking more time than usual.',
  description  = "We'll notify you as soon as the report is generated.",
  actionLabel  = 'Notify me when ready',
  onNotify,
  className,
  ...rest
}) => {
  const [isNotified, setIsNotified] = React.useState(notified);
  React.useEffect(() => setIsNotified(notified), [notified]);

  const handleNotify = () => {
    setIsNotified(true);
    onNotify && onNotify();
  };

  /* ── Notified (compact) state ───────────────────────────────────────────── */
  if (isNotified) {
    return (
      <div
        className={['t1-nmc t1-nmc--notified', className].filter(Boolean).join(' ')}
        {...rest}
      >
        <span className="t1-nmc__check-block">
          <i className="ph-bold ph-check t1-nmc__icon" aria-hidden="true" />
        </span>
        <span className="t1-nmc__notified-text">{description}</span>
      </div>
    );
  }

  /* ── Default state ──────────────────────────────────────────────────────── */
  return (
    <div
      className={['t1-nmc t1-nmc--default', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* Top row: icon block + text */}
      <div className="t1-nmc__top">
        <span className="t1-nmc__icon-block">
          <i className="ph ph-clock t1-nmc__icon" aria-hidden="true" />
        </span>
        <div className="t1-nmc__body">
          <span className="t1-nmc__heading">{heading}</span>
          <span className="t1-nmc__desc">{description}</span>
        </div>
      </div>

      {/* Full-width action button */}
      <div className="t1-nmc__action">
        <Button
          variant="contained"
          color="primary"
          size="md"
          onClick={handleNotify}
          style={{ width: '100%' }}
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};
