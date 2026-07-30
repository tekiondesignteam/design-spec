/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   GRADIENT-ICON-BUTTON  (Figma: AiT1GradientIconButton)

   Brand-gradient icon button — square with 8px radius.

   Props
   ─────────────────────────────────────────────────────────────────────────
   state     "default"|"hover"|"active"|"disabled"   (frozen Figma demo)
   disabled   boolean
   icon / children  ReactNode — the icon to render (should be white SVG/Phosphor)
   onClick    function
   aria-label string

   Size: fixed 36×36px  ·  border-radius: 2px  ·  icon: white

   Gradients (100.05deg, L→R)
   ─────────────────────────────────────────────────────────────────────────
   default   teal #25C8A5 → cyan #1B90B4 → blue #1A6CC4
   hover     teal #1E9F83 → cyan #156E89 → blue #135295
   active    teal #167460 → cyan #0E4B5D → blue #0E3968
   disabled  bg #F4F5F6  ·  icon #969AA3
   ========================================================================== */

const GradientIconButton = ({
  state    = 'default',
  disabled = false,
  icon,
  children,
  onClick,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const isDisabled = disabled || state === 'disabled';

  const cls = [
    't1-gib',
    isDisabled       ? 'is-disabled' : '',
    state === 'hover'   ? 'is-hover'   : '',
    state === 'active'  ? 'is-active'  : '',
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
      <span className="t1-gib__icon" aria-hidden="true">{iconNode}</span>
    </button>
  );
};
