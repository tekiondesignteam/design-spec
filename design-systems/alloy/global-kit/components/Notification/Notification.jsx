// Notification — core Global Kit component (build-less React; styles in Notification.css).
// 1:1 with the Figma "Alloy DS BETA" Notification set (node 289-5301).
//
// A single inline banner row: a leading status icon, a message, and an
// optional trailing content slot. Colour sets only the background tint; the
// icon glyph and colour are the same across every colour (matching the Figma
// set, which uses one info glyph for all five colours).
//
// Props (mirror the Figma variant axes + properties):
//   color     'neutral' | 'info' | 'error' | 'success' | 'warning'  (default 'neutral')
//             — drives only the background tint via a --component-notification token.
//   variant   'filled'                                              (default 'filled')
//             — the Figma set exposes a single variant; kept as an axis for fidelity.
//   message   string — the notification text (Figma "Message").     (default placeholder)
//   showIcon  boolean — render the leading status icon.             (default true)
//             — maps to the Figma "Show Icon" boolean, which drives the Icon
//               instance's visibility (references.visible = "Show Icon").
//   showSlot  boolean — render the trailing content slot.           (default true)
//             — maps to the Figma "Show Slot" boolean property.
//   children  the trailing content slot content (Figma "Content Slot", a native
//             Figma SLOT - node 289:5308, 24x24, clips its content). The consumer
//             fills it (e.g. a close Icon or an action). Rendered only when
//             showSlot is true.
//
//   -- Slot contract (mirrors the Figma SLOT `slotSettings` 1:1) --
//   Every default below is the SLOT's ACTUAL Figma value today, so the rendered
//   output is unchanged until a designer flips one of these in the file:
//   slotMaxItems  number|null - Figma "Maximum layers" (slotSettings.maxChildren).
//                 null = unlimited (current). Figma treats limits as GUIDANCE, so
//                 past the max we slice extras + warn rather than hard-throw.
//   slotMinItems  number|null - Figma "Minimum layers" (slotSettings.minChildren).
//                 null = none (current). Under the min we only warn (guidance).
//   slotFillItems boolean - Figma "Set items to Fill container by default"
//                 (slotSettings.stretchChildOnInsert). Default false (current):
//                 items keep their own size; true → items fill the slot box.
//   slotDisplayEmpty boolean - Figma "Display empty slots by default"
//                 (slotSettings.displayEmptyByDefault). Default false (current):
//                 an empty slot reserves no space; true → the empty box is kept.
//   slotPreferredOnly boolean - Figma "Only allow preferred instances"
//                 (slotSettings.allowPreferredValuesOnly). Default false (current).
//                 React can't hard-restrict arbitrary children, so this is a
//                 documented contract - enforcement lives in Figma, not here.
//                 (preferredValues is [] today - nothing is restricted.)
//
// The leading Icon is the Global Kit <Icon> component (Figma nested instance,
// size md / 20px), gated by showIcon (the one nested property Figma exposes on
// the parent panel). Its glyph (Figma "Name" instance-swap) is NOT exposed, so
// the glyph stays internal + fixed here — never a prop.
//
// forwards Icon.visible (exposed nested prop, Figma "Show Icon") <- showIcon
//   -> gates the <Icon> render. Icon.name/weight are internal (not exposed).
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours resolve through the token custom properties in
// Notification.css; the JSX only picks the colour/variant classes.
function Notification({
  color = 'neutral',
  variant = 'filled',
  message = 'Any kind of message will appear here',
  showIcon = true,
  showSlot = true,
  slotMaxItems = null,
  slotMinItems = null,
  slotFillItems = false,
  slotDisplayEmpty = false,
  slotPreferredOnly = false, // eslint-disable-line no-unused-vars - documented Figma contract
  className = '',
  children,
  ...rest
}) {
  // Icon is a sibling Global Kit component exposed on window (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  const classes = [
    'gk-notification',
    `gk-notification--${variant}`,
    `gk-notification--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Normalise slot content to a flat list so the layer-count limits count the
  // way the Figma slot does - one entry per placed layer.
  let items = React.Children.toArray(children);
  if (slotMinItems != null && items.length < slotMinItems) {
    console.warn(
      `Notification slot: ${items.length} item(s) below Figma "Minimum layers" (${slotMinItems}).`
    );
  }
  if (slotMaxItems != null && items.length > slotMaxItems) {
    console.warn(
      `Notification slot: ${items.length} item(s) exceeds Figma "Maximum layers" (${slotMaxItems}); extras dropped.`
    );
    items = items.slice(0, slotMaxItems);
  }

  // displayEmptyByDefault:false → an empty slot reserves no space (render nothing).
  const renderSlot = showSlot && (items.length > 0 || slotDisplayEmpty);

  const slotClasses = [
    'gk-notification__slot',
    slotFillItems && 'gk-notification__slot--fill',
    items.length === 0 && 'gk-notification__slot--empty',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" {...rest}>
      <div className="gk-notification__body">
        {showIcon && (
          <IconCmp size="md" className="gk-notification__icon">
            <i className="ph ph-info" />
          </IconCmp>
        )}
        <span className="gk-notification__message text-body-regular-paragraph-md">
          {message}
        </span>
      </div>
      {renderSlot && <div className={slotClasses}>{items}</div>}
    </div>
  );
}

// NOTE: this shadows the browser's native window.Notification (Web Notifications
// API). Kept as-is to match the kit's bare-name self-registration convention
// (window.Icon, window.Card, …); revisit if a consumer needs the native API.
window.Notification = Notification;
