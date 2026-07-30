// Status - core Global Kit component (build-less React; styles in Status.css).
// 1:1 with the Figma "Alloy DS BETA" Status set (node 306-11265).
//
// A compact status trigger: a leading StatusIcon marker, a text label, and a
// dropdown caret - the affordance a user clicks to pick/change a status. It
// carries a subtle hover fill and a disabled treatment.
//
// Props (mirror the Figma variant axes / component properties):
//   state         'default' | 'hover' | 'disabled'   (default 'default')
//                 `hover` is a FORCED state so a tool can show it without a
//                 pointer; real :hover is honoured too.
//   flag          boolean - marker shape: flag when true, dot when false.
//                 (Figma "Flag" axis.) (default false)
//   label         string - the status text. (default 'Status')
//   showLabel     boolean - render the label. (default true)
//   showDropdown  boolean - render the trailing caret. (default true)
//
// Depends on the Global Kit `StatusIcon` (leading marker) and `Icon` (caret).
//
// The embedded StatusIcon's Color + Open axes are NOT exposed on the Figma Status
// panel (which exposes only State, Flag, Label, Show Label, Show Dropdown), so per
// the nested-prop rule they are NOT surfaced as Status props - the marker is fixed
// to the Figma default (gray, outline). Only StatusIcon.shape is driven here,
// derived from the Figma "Flag" axis (flag -> 'flag', else 'dot').
//
// Colours/sizes/spacing resolve through --component-status-* tokens; the JSX
// only assembles structure and picks the forced-state class. Brand/theme/device
// come from the [data-*] cascade - the component never branches on them.
function Status({
  state = 'default',
  flag = false,
  label = 'Status',
  showLabel = true,
  showDropdown = true,
  className = '',
  ...rest
}) {
  const StatusIconCmp = typeof StatusIcon !== 'undefined' ? StatusIcon : window.StatusIcon;
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const disabled = state === 'disabled';
  const forcedState = state === 'hover' ? 'gk-status--hover' : null;

  const classes = ['gk-status', forcedState, className].filter(Boolean).join(' ');

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      <span className="gk-status__body">
        {StatusIconCmp && (
          <StatusIconCmp color="gray" open={true} shape={flag ? 'flag' : 'dot'} />
        )}
        {showLabel && (
          <span className="gk-status__label text-body-regular-paragraph-md">{label}</span>
        )}
      </span>
      {showDropdown && (
        <span className="gk-status__caret">
          {IconCmp && (
            <IconCmp size="sm">
              <i className="ph ph-caret-down" aria-hidden="true" />
            </IconCmp>
          )}
        </span>
      )}
    </button>
  );
}

window.Status = Status;
