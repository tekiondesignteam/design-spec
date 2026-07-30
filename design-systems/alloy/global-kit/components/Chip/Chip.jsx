// Chip - core Global Kit component (build-less React; styles in Chip.css).
// 1:1 with the Figma "Alloy DS BETA" Chip set (node 276-11685).
//
// A compact, pill-shaped label. Text-only by default, with optional leading
// avatar / leading icon / trailing icon slots (each a Figma instance-swap).
//
// Props (mirror the Figma variant axes):
//   type   'filled' | 'outlined' | 'soft' | 'ghost'                 (default 'filled')
//   color  'primary'|'secondary'|'error'|'warning'|'info'|'success' (default 'primary')
//   size   'lg' | 'md' | 'sm'                                       (default 'md')
//          box height: lg 28 · md 24 · sm 16 (px); label 16 / 14 / 12 px
//
// slot `avatar`       (Figma "showAvatar" INSTANCE_SWAP, node 276:11707): allowed -
//   the Global Kit <Avatar> component. Rendered before the label; sized to the chip.
// slot `leadingIcon`  (Figma "showLeadingIcon" INSTANCE_SWAP, node 276:11709): allowed -
//   any Phosphor glyph, wrapped in the Global Kit <Icon>. Rendered after any avatar.
// slot `trailingIcon` (Figma "showTrailingIcon" INSTANCE_SWAP, node 276:11711): allowed -
//   any Phosphor glyph, wrapped in the Global Kit <Icon>. Rendered after the label.
// slot `children`     (Figma "label" text): the chip label.
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours/sizes/radii resolve through the token custom
// properties in Chip.css; the JSX only picks variant classes.
function Chip({
  type = 'filled',
  color = 'primary',
  size = 'md',
  avatar = null,
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  // Icon + Avatar are sibling Global Kit components exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  // Chip size -> child sizes. The Figma lg chip uses a 16px glyph / 20px avatar;
  // smaller chips step the glyph/avatar down so they read inside the pill.
  const ICON_SIZE = { lg: 'sm', md: 'sm', sm: 'xs' };
  const iconSize = ICON_SIZE[size] || 'sm';

  // Label typography = the DS text style the Figma chip uses per size
  // (Body/Semibold/Paragraph/*), from tokens/dist/computedStyles.css.
  const TEXT_STYLE = {
    lg: 'text-body-semibold-paragraph-lg',
    md: 'text-body-semibold-paragraph-md',
    sm: 'text-body-semibold-paragraph-sm',
  };
  const textStyle = TEXT_STYLE[size] || TEXT_STYLE.md;

  const classes = [
    'gk-chip',
    `gk-chip--${type}`,
    `gk-chip--${color}`,
    `gk-chip--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...rest}>
      {avatar && <span className="gk-chip__avatar">{avatar}</span>}
      {leadingIcon && (
        <IconCmp size={iconSize} className="gk-chip__icon">
          {leadingIcon}
        </IconCmp>
      )}
      {children != null && (
        <span className={`gk-chip__label ${textStyle}`}>{children}</span>
      )}
      {trailingIcon && (
        <IconCmp size={iconSize} className="gk-chip__icon">
          {trailingIcon}
        </IconCmp>
      )}
    </span>
  );
}

window.Chip = Chip;
