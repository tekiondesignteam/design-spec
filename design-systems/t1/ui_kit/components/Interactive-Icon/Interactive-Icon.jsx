/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   INTERACTIVE-ICON  (Figma: AiT1InteractiveIcon)

   Icon-only Chip — same outlined style as Chip, no label text.

   Props
   ─────────────────────────────────────────────────────────────────────────
   color    "neutral" | "primary" | "error"   default "neutral"
   size     "xs" | "sm" | "md" | "lg" | "xl"  default "xs"
   disabled  boolean                            default false
   states    "default"|"hover"|"active"|"disabled"  (optional — CSS handles
              real interaction; pass this for Figma-frozen state demos)
   icon / children  ReactNode — the icon to render
   onClick   function
   aria-label string

   Size → container px × icon px
   ─────────────────────────────────────────────────────────────────────────
   xs  16 × 16   icon 10px
   sm  20 × 20   icon 12px
   md  24 × 24   icon 14px
   lg  32 × 32   icon 16px
   xl  40 × 40   icon 20px

   Colors  (outlined, same tokens as Chip)
   ─────────────────────────────────────────────────────────────────────────
   neutral  border $t1-neutral-200  icon $t1-neutral-600
   primary  border $t1-blue-400     icon $t1-blue-500
   error    border $t1-red-400      icon $t1-red-500
   ========================================================================== */

const InteractiveIcon = ({
  color    = 'neutral',
  size     = 'xs',
  disabled = false,
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
    't1-iicon',
    `t1-iicon--${size}`,
    `t1-iicon--${color}`,
    isDisabled        ? 'is-disabled' : '',
    states === 'hover'   ? 'is-hover'   : '',
    states === 'active'  ? 'is-active'  : '',
    className || '',
  ].filter(Boolean).join(' ');

  const iconNode = icon !== undefined ? icon : children;

  return (
    <button
      className={cls}
      type="button"
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      aria-label={ariaLabel || 'action'}
      {...rest}
    >
      <span className="t1-iicon__icon" aria-hidden="true">{iconNode}</span>
    </button>
  );
};
