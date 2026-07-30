/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   MODAL  (Figma: aiT1Modal)
   BEM prefix: t1-modal

   Props
   ─────────────────────────────────────────────────────────────────────────
   open            boolean    Show / hide the modal             default true
   title           string     Header title text                 required
   subtitle        string     Optional header subtitle          optional
   onClose         function   Close handler (X + overlay click) optional
   children        node       Content slot                      optional
   primaryLabel    string     Primary button label              optional
   onPrimary       function   Primary button handler            optional
   secondaryLabel  string     Secondary button label            optional
   onSecondary     function   Secondary button handler          optional
   width           number     Modal width in px                 default 480
   scoped          boolean    Constrain overlay to nearest positioned ancestor
                              (position:absolute) instead of full viewport
                              (position:fixed). Use inside panels/drawers.   default false
   className       string     Extra classes on modal panel      optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [overlay / backdrop]
     [modal panel]
       [header: neutral-100 bg · title / subtitle · ×close]
       [body: content slot]
       [footer: border-top · secondary outlined · primary contained]

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   IconButton  — close button (color="neutral" style="plain" size="sm")
   Button      — secondary (outlined/neutral/md) + primary (contained/primary/md)
   Phi         — X icon inside close button
   ========================================================================== */

const Modal = ({
  open           = true,
  title,
  subtitle,
  onClose,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  width          = 480,
  scoped         = false,
  className,
  ...rest
}) => {
  if (!open) return null;

  const hasFooter = primaryLabel || secondaryLabel;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && onClose) onClose();
  };

  const overlayCls = ['t1-modal-overlay', scoped && 't1-modal-overlay--scoped'].filter(Boolean).join(' ');

  return (
    <div className={overlayCls} onClick={handleOverlayClick}>
      <div
        className={['t1-modal', className].filter(Boolean).join(' ')}
        style={{ width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="t1-modal-title"
        {...rest}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="t1-modal__header">
          <div className="t1-modal__header-content">
            {title    && <p id="t1-modal-title" className="t1-modal__title">{title}</p>}
            {subtitle && <p className="t1-modal__subtitle">{subtitle}</p>}
          </div>

          {onClose && (
            <div className="t1-modal__close">
              <IconButton
                color="neutral"
                style="plain"
                size="sm"
                aria-label="Close"
                onClick={onClose}
              >
                <Phi name="x" size={16} weight="bold" />
              </IconButton>
            </div>
          )}
        </div>

        {/* ── Body / content slot ─────────────────────────────────────────── */}
        {children && (
          <div className="t1-modal__body">{children}</div>
        )}

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        {hasFooter && (
          <div className="t1-modal__footer">
            {secondaryLabel && (
              <Button
                variant="outlined"
                color="neutral"
                size="md"
                onClick={onSecondary || onClose}
              >
                {secondaryLabel}
              </Button>
            )}
            {primaryLabel && (
              <Button
                variant="contained"
                color="primary"
                size="md"
                onClick={onPrimary}
              >
                {primaryLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
