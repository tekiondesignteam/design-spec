// TabItem - core Global Kit component (build-less React; styles in TabItem.css).
// 1:1 with the Figma "Alloy DS BETA" .Tab Item set (node 276-16722, + Small set).
//
// A single selectable tab within a Tab group. It draws the label, an optional
// leading icon, an optional trailing count, and an optional trailing badge, and
// carries the bottom-border indicator (thin default line -> thick brand line
// when selected).
//
// Props (mirror the Figma variant axes / properties):
//   size        'lg' | 'sm'                          (default 'lg')
//               box height: lg 48 · sm 40 (px, from the height tokens).
//   state       'default' | 'hover' | 'active'       (default 'default')
//               - forces the visual state without pointer interaction; leave
//                 'default' for normal interactive :hover / :active.
//   selected    boolean - the active tab (Figma Selected=True): brand text +
//                         the thick brand bottom border. (default false)
//   disabled    boolean - Figma Disabled=True. (default false)
//   leadingIcon node - the glyph before the label (Figma "Show Leading Icon" +
//                      the Start Icon instance). Wrapped in the Global Kit
//                      <Icon>, tinted with the per-state icon token. Passing a
//                      node is the "shown" case; omit it for the hidden default.
//   count       node|string - the trailing count text (Figma "Show Count" +
//                      the Count text "(0)"); rendered in the secondary colour.
//   badge       node - a Global Kit <Badge> shown after the count (Figma
//                      "Show Badge" + the Badge instance). Only a <Badge> from
//                      the kit belongs here.
//   children    the label (Figma "Label" text).
//
// Dependencies (all already in the kit): Icon (leading glyph), Badge (badge slot).
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours/sizes/border resolve through the token custom
// properties in TabItem.css; the JSX only picks variant classes.
function TabItem({
  size = 'lg',
  state = 'default',
  selected = false,
  disabled = false,
  leadingIcon = null,
  count = null,
  badge = null,
  className = '',
  children,
  ...rest
}) {
  // Icon size follows the tab size (Start Icon is 16px in Figma).
  const ICON_SIZE = { lg: 'sm', sm: 'xs' };
  const iconSize = ICON_SIZE[size] || 'sm';
  // Typography = the DS text style the Figma tab uses per size + state, from
  // tokens/dist/computedStyles.css. The label is Regular by default and upgrades
  // to Medium only when selected (and not disabled) - per the Figma variants.
  // The count is Body/Semibold/Paragraph/md (14px) for BOTH sizes.
  const LABEL_STYLE = {
    lg: { base: 'text-body-regular-paragraph-lg', selected: 'text-body-medium-paragraph-lg' },
    sm: { base: 'text-body-regular-paragraph-md', selected: 'text-body-medium-paragraph-md' },
  };
  const COUNT_STYLE = { lg: 'text-body-semibold-paragraph-md', sm: 'text-body-semibold-paragraph-md' };
  const labelSet = LABEL_STYLE[size] || LABEL_STYLE.lg;
  const labelStyle = selected && !disabled ? labelSet.selected : labelSet.base;
  const countStyle = COUNT_STYLE[size] || COUNT_STYLE.lg;
  // Icon is a sibling Global Kit component exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const forcedState =
    state === 'hover' ? 'gk-tabitem--hover' : state === 'active' ? 'gk-tabitem--pressed' : null;
  const classes = [
    'gk-tabitem',
    `gk-tabitem--${size}`,
    selected && 'gk-tabitem--selected',
    disabled && 'gk-tabitem--disabled',
    forcedState,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      role="tab"
      aria-selected={selected || undefined}
      disabled={disabled}
      {...rest}
    >
      <span className="gk-tabitem__content">
        {leadingIcon && (
          <IconCmp size={iconSize} className="gk-tabitem__icon">
            {leadingIcon}
          </IconCmp>
        )}
        {children != null && (
          <span className={`gk-tabitem__label ${labelStyle}`}>{children}</span>
        )}
        {count != null && (
          <span className={`gk-tabitem__count ${countStyle}`}>{count}</span>
        )}
        {badge && <span className="gk-tabitem__badge">{badge}</span>}
      </span>
    </button>
  );
}

window.TabItem = TabItem;