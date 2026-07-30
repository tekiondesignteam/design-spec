/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   TOAST  (Figma: aiT1Toast)
   BEM prefix: t1-toast

   Props
   ─────────────────────────────────────────────────────────────────────────
   color        "info" | "error" | "warning" | "success"   default "info"
   title        string                                       required
   description  string                                       optional
   onClose      function                                     optional close handler

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi          — icon inside colored block (weight="fill", size=20, white)
   IconButton   — optional close button (color="neutral" style="plain" size="sm")
   ========================================================================== */

/* ==========================================================================
   NOTIFICATION BANNER  (Figma: aiT1NotificationBanner)
   BEM prefix: t1-banner

   Props
   ─────────────────────────────────────────────────────────────────────────
   color        "neutral" | "info" | "error" | "warning" | "success"   default "neutral"
   title        string                                                    required
   description  string                                                    optional
   onClose      function                                                  optional close handler

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi          — variant-colored icon (weight="regular", size=20)
   IconButton   — close button (color="neutral" style="plain" size="sm")
   ========================================================================== */

/* ── Icon name lookup ─────────────────────────────────────────────────────────
   All variants use the Phosphor "info" icon (circle with lowercase 'i').
   The colored block / status bar is what communicates severity — not the icon.
   ──────────────────────────────────────────────────────────────────────────── */
const _T1_NOTIF_ICON = {
  info:    'info',
  error:   'info',
  warning: 'info',
  success: 'info',
  neutral: 'info',
};

/* ══════════════════════════════════════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════════════════════════════════════ */

const Toast = ({
  color       = 'info',
  title,
  description,
  onClose,
  className,
  ...rest
}) => {
  const iconName = _T1_NOTIF_ICON[color] || 'info';

  return (
    <div
      className={['t1-toast', `t1-toast--${color}`, description && 't1-toast--with-desc', className].filter(Boolean).join(' ')}
      role="alert"
      aria-live="polite"
      {...rest}
    >
      {/* ── Colored icon block ──────────────────────────────────────────── */}
      <div className="t1-toast__icon-wrap" aria-hidden="true">
        <div className="t1-toast__icon-block">
          <Phi name={iconName} size={20} weight="regular" />
        </div>
      </div>

      {/* ── Content: title + description ────────────────────────────────── */}
      <div className="t1-toast__content">
        {title       && <div className="t1-toast__title">{title}</div>}
        {description && <div className="t1-toast__desc">{description}</div>}
      </div>

      {/* ── Optional close button ───────────────────────────────────────── */}
      {onClose && (
        <div className="t1-toast__close">
          <IconButton
            color="neutral"
            style="plain"
            size="sm"
            aria-label="Dismiss"
            onClick={onClose}
          >
            <Phi name="x" size={14} weight="bold" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════════════════
   NOTIFICATION BANNER
   ══════════════════════════════════════════════════════════════════════════ */

const NotificationBanner = ({
  color       = 'neutral',
  title,
  description,
  onClose,
  className,
  ...rest
}) => {
  const iconName = _T1_NOTIF_ICON[color] || 'info';

  return (
    <div
      className={['t1-banner', `t1-banner--${color}`, className].filter(Boolean).join(' ')}
      role="status"
      aria-live="polite"
      {...rest}
    >
      {/* ── 4px left status bar ─────────────────────────────────────────── */}
      <div className="t1-banner__bar" aria-hidden="true" />

      {/* ── Inner: icon · labels · close ────────────────────────────────── */}
      <div className="t1-banner__inner">

        {/* Icon block — colored rounded square, white icon inside */}
        <div className="t1-banner__icon" aria-hidden="true">
          <div className="t1-banner__icon-block">
            <Phi name={iconName} size={20} weight="regular" />
          </div>
        </div>

        {/* Labels: title + description inline */}
        <div className="t1-banner__labels">
          {title       && <span className="t1-banner__title">{title}</span>}
          {description && <span className="t1-banner__desc">{description}</span>}
        </div>

        {/* Optional close button */}
        {onClose && (
          <div className="t1-banner__close">
            <IconButton
              color="neutral"
              style="plain"
              size="sm"
              aria-label="Dismiss"
              onClick={onClose}
            >
              <Phi name="x" size={14} weight="bold" />
            </IconButton>
          </div>
        )}

      </div>
    </div>
  );
};

/* Legacy alias (keeps any existing references working) */
const NotificationBannerToast = NotificationBanner;
