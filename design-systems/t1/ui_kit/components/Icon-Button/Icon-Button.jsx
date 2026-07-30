/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   ICON-BUTTON  (Figma: )

   Square icon-only button with two colours and two styles.

   Props
   ─────────────────────────────────────────────────────────────────────────
   color     "neutral" | "inverse"                   default "neutral"
   style     "contained" | "plain"                   default "plain"
   size      "sm" | "md" | "lg"                      default "md"
   disabled   boolean
   loading    boolean — replaces icon with a spinning arc
   states    "default"|"hover"|"active"|"disabled"   (frozen Figma demo)
   icon / children  ReactNode — the icon to render
   onClick    function
   aria-label string

   Sizes (px)
   ─────────────────────────────────────────────────────────────────────────
   sm  24×24  ·  icon 14px  ·  border-radius 2px
   md  32×32  ·  icon 16px  ·  border-radius 2px
   lg  40×40  ·  icon 20px  ·  border-radius 2px

   Color × Style combinations
   ─────────────────────────────────────────────────────────────────────────
   neutral/contained  — white bg, border, neutral icon
   neutral/plain      — transparent bg, neutral icon
   inverse/contained  — white bg, no border, neutral icon
   inverse/plain      — transparent bg, white icon (for dark surfaces)
   ========================================================================== */

const IconButton = ({
  color      = 'neutral',
  style: styleProp = 'plain',
  size       = 'md',
  disabled   = false,
  loading    = false,
  states,
  icon,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const isDisabled = disabled || states === 'disabled';

  const cls = [
    't1-ibtn',
    `t1-ibtn--${color}`,
    `t1-ibtn--${styleProp}`,
    `t1-ibtn--${size}`,
    isDisabled            ? 'is-disabled'  : '',
    loading               ? 'is-loading'   : '',
    states === 'hover'    ? 'is-hover'     : '',
    states === 'active'   ? 'is-active'    : '',
    className || '',
  ].filter(Boolean).join(' ');

  const iconNode = icon !== undefined ? icon : children;

  return (
    <button
      className={cls}
      type="button"
      disabled={isDisabled}
      onClick={!isDisabled && !loading ? onClick : undefined}
      aria-label={ariaLabel || 'action'}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading
        ? <span className="t1-ibtn__spinner" aria-hidden="true" />
        : <span className="t1-ibtn__icon"    aria-hidden="true">{iconNode}</span>
      }
    </button>
  );
};
