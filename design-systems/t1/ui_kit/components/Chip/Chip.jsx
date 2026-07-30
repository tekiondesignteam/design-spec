/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CHIP — 1:1 Figma /Chip
   Proxima Nova 600 · pill shape · 2 sizes (md 24px, xs 16px)
   2 variants (outlined, soft) · 2 colors (neutral, primary)
   Slots: avatar (md only), startIcon, endIcon
   States: default / hover / active / disabled

   Key Figma measurements:
     md — h 24px · font 14px/16 · chip-pad 0 6px · icon slot 16×16 · icon SVG 12
     xs — h 16px · font 12px/16 · chip-pad 0 6px 0 4px · icon slot 12×12 · icon SVG 10
     label-container — px 4px (both sizes)
     avatar — 16×16 visible, 20×20 image clipped (overflow: clip), radius 2px
   ========================================================================== */
const Chip = ({
  className,              /* merged onto root element                        */
  variant  = 'outlined',  /* 'outlined' | 'soft'                             */
  color    = 'neutral',   /* 'neutral'  | 'primary'                          */
  size     = 'md',        /* 'md'       | 'xs'                               */
  disabled = false,
  startIcon,              /* icon name string — uses <Icon>                  */
  endIcon,                /* icon name string — uses <Icon>                  */
  avatar,                 /* img src string (md size only)                   */
  onClick,
  children = 'Chip',
}) => {
  const iconSize = size === 'xs' ? 10 : 12;   /* SVG size: 10px xs, 12px md  */

  const cls = [
    't1-chip',
    `t1-chip--${variant}`,
    `t1-chip--${color}`,
    `t1-chip--${size}`,
    disabled ? 'is-disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span
      className={cls}
      onClick={!disabled && onClick ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
    >
      {/* Avatar — md only, 16×16 visible / 20×20 image clipped (Figma spec) */}
      {avatar && size === 'md' && (
        <span className="t1-chip__avatar">
          <span className="t1-chip__avatar-img">
            <img src={avatar} alt="" />
          </span>
        </span>
      )}

      {/* Start icon — 16×16 slot (md) or 12×12 slot (xs) */}
      {startIcon && (
        <span className="t1-chip__icon">
          <Icon name={startIcon} size={iconSize} color="currentColor" />
        </span>
      )}

      {/* Label — outer has line-height:0 to prevent container bleed;
          inner <span> carries the real line-height (matches Figma's <p> trick) */}
      <span className="t1-chip__label">
        <span className="t1-chip__label-text">{children}</span>
      </span>

      {/* End icon */}
      {endIcon && (
        <span className="t1-chip__icon t1-chip__icon--end">
          <Icon name={endIcon} size={iconSize} color="currentColor" />
        </span>
      )}
    </span>
  );
};
