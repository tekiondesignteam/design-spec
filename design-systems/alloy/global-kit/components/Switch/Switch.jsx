// Switch — core Global Kit component (build-less React; styles in Switch.css).
// 1:1 with Figma "Alloy DS BETA" Switch set (node 276-12181).
//
// A binary on/off toggle. A rounded track holds a thumb that slides left (off)
// to right (on). An optional status icon sits in the exposed track area opposite
// the thumb — "x" when off, "check" when on — shown only when `showIcon` is on
// (Figma "Show Icon" boolean). A pill focus ring (Figma "Show Focus Ring"
// boolean) is raised on real keyboard focus and can also be forced via the
// `showFocusRing` prop so a tool/preview can show it without a pointer.
//
// Props (mirror the Figma variant axes + property panel):
//   checked        boolean  — VARIANT Checked        (default false)
//   disabled       boolean  — VARIANT Disabled       (default false)
//   showIcon       boolean  — BOOLEAN "Show Icon"; renders the status glyph (default false)
//   showFocusRing  boolean  — BOOLEAN "Show Focus Ring"; forces the ring on (default false)
//   onChange       function — called with the next checked value when toggled
//
// Dependency: Global Kit <Icon> (status glyph, size "sm", no background). The
//   icon NAME is NOT exposed on the Figma parent panel, so it is fixed by state
//   (off -> "x", on -> "check"), never a prop.
//
// Brand/theme/device come from the [data-*] cascade - the component never
// branches on them. Colours + sizing resolve through the token custom
// properties in Switch.css; the JSX only picks the state classes.
function Switch({
  checked = false,
  disabled = false,
  showIcon = false,
  showFocusRing = false,
  onChange,
  className = '',
  ...rest
}) {
  // Sibling Global Kit component via the window fallback (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const classes = [
    'gk-switch',
    checked && 'gk-switch--checked',
    disabled && 'gk-switch--disabled',
    showFocusRing && 'gk-switch--focus',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (disabled) return;
    if (typeof onChange === 'function') onChange(!checked);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      <span className="gk-switch__track">
        {showIcon && IconCmp ? (
          <span className="gk-switch__icon">
            <IconCmp size="sm">
              <i className={checked ? 'ph ph-check' : 'ph ph-x'} />
            </IconCmp>
          </span>
        ) : null}
        <span className="gk-switch__thumb" />
      </span>
    </button>
  );
}

window.Switch = Switch;
