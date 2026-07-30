/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   EMPTY  (Figma: aiT1Empty)
   BEM prefix: t1-empty

   Props
   ─────────────────────────────────────────────────────────────────────────
   icon            string     Phosphor icon name                default "image-broken"
   title           string     Heading text                      required
   description     string     Subtitle / body copy              optional
   primaryLabel    string     Contained primary button label    optional
   onPrimary       function   Primary button handler            optional
   secondaryLabel  string     Outlined neutral button label     optional
   onSecondary     function   Secondary button handler          optional
   helpText        string     Static copy before link           default "Need help?"
   linkText        string     Link label                        default "Contact support"
   onLink          function   Link click handler                optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [icon block 48×48 neutral bg]
   [content: title / description]
   [button group: secondary outlined · primary contained]   ← only when a label provided
   [link row: helpText · Link]                              ← only when linkText provided

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi      — icon inside block (size=24, weight="regular")
   Button   — primary (contained/primary/lg) + secondary (outlined/neutral/lg)
   Link     — "Contact support" (appearance="primary" size="medium")
   ========================================================================== */

const Empty = ({
  icon           = 'image-broken',
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  helpText       = 'Need help?',
  linkText       = 'Contact support',
  onLink,
  className,
  ...rest
}) => {
  const hasActions = primaryLabel || secondaryLabel;
  const hasLink    = linkText;

  return (
    <div
      className={['t1-empty', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {/* ── Icon block ──────────────────────────────────────────────────── */}
      <div className="t1-empty__icon-block" aria-hidden="true">
        <Phi name={icon} size={24} weight="regular" />
      </div>

      {/* ── Text content ────────────────────────────────────────────────── */}
      {(title || description) && (
        <div className="t1-empty__content">
          {title       && <p className="t1-empty__title">{title}</p>}
          {description && <p className="t1-empty__desc">{description}</p>}
        </div>
      )}

      {/* ── Button group ────────────────────────────────────────────────── */}
      {hasActions && (
        <div className="t1-empty__actions">
          {secondaryLabel && (
            <Button variant="outlined" color="neutral" size="lg" onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
          {primaryLabel && (
            <Button variant="contained" color="primary" size="lg" onClick={onPrimary}>
              {primaryLabel}
            </Button>
          )}
        </div>
      )}

      {/* ── Link row ────────────────────────────────────────────────────── */}
      {hasLink && (
        <div className="t1-empty__link-row">
          {helpText && <span className="t1-empty__help-text">{helpText}</span>}
          <Link appearance="primary" size="medium" href="#" onClick={onLink}>
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};
