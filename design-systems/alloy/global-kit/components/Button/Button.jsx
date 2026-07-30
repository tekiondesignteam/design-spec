// Button — core Global Kit component (build-less React; styles in Button.css).
// 1:1 with the Figma "Alloy DS BETA" Button set (node 276-10566).
//
// Props (mirror the Figma variant axes):
//   type         'filled' | 'stroke' | 'ghost'          (default 'filled')
//   intent       'primary' | 'destructive' | 'neutral'  (default 'primary')
//   size         'lg' | 'md' | 'sm'                      (default 'md')
//   state        'default' | 'hover' | 'active'          (default 'default')
//                — forces the visual state without pointer interaction;
//                  leave 'default' for normal interactive :hover / :active.
//   loading      boolean — per Figma, shows the disabled colour treatment +
//                          a trailing spinner, and blocks interaction.
//   disabled     boolean
//   leadingIcon  node — the glyph rendered before the label. Wrapped in the
//                        Global Kit <Icon> component (sized to the button,
//                        tinted with the per-state icon token).
//   trailingIcon node — glyph rendered after the label (same treatment).
//   children     the label
//
// Icon size follows the button size (no dedicated button-icon token exists):
//   lg → Icon "md" (20px, matches Figma) · md → "sm" (16px) · sm → "xs" (12px).
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours resolve through the token custom properties in
// Button.css; the JSX only picks variant classes.
function Button({
  type = 'filled',
  intent = 'primary',
  size = 'md',
  state = 'default',
  loading = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  // Map the button size onto the Icon component's size scale.
  const ICON_SIZE = { lg: 'md', md: 'sm', sm: 'xs' };
  const iconSize = ICON_SIZE[size] || 'sm';
  // Label typography = the DS text style the Figma button uses per size
  // (Body/Medium/Paragraph/*), from tokens/dist/computedStyles.css.
  const TEXT_STYLE = {
    lg: 'text-body-medium-paragraph-lg',
    md: 'text-body-medium-paragraph-md',
    sm: 'text-body-medium-paragraph-sm',
  };
  const textStyle = TEXT_STYLE[size] || TEXT_STYLE.md;
  // Icon + Spinner are sibling Global Kit components exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const SpinnerCmp = typeof Spinner !== 'undefined' ? Spinner : window.Spinner;

  const forcedState =
    state === 'hover' ? 'gk-button--hover' : state === 'active' ? 'gk-button--pressed' : null;
  const classes = [
    'gk-button',
    `gk-button--${type}`,
    `gk-button--${intent}`,
    `gk-button--${size}`,
    forcedState,
    loading && 'gk-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {leadingIcon && (
        <IconCmp size={iconSize} className="gk-button__icon">
          {leadingIcon}
        </IconCmp>
      )}
      {children != null && (
        <span className={`gk-button__label ${textStyle}`}>{children}</span>
      )}
      {loading ? (
        <SpinnerCmp className="gk-button__spinner" />
      ) : (
        trailingIcon && (
          <IconCmp size={iconSize} className="gk-button__icon">
            {trailingIcon}
          </IconCmp>
        )
      )}
    </button>
  );
}

window.Button = Button;
