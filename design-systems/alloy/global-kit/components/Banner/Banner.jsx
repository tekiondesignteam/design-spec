// Banner — core Global Kit component (build-less React; styles in Banner.css).
// 1:1 with the Figma "Alloy DS BETA" Banner set (node 289-5190).
//
// A full-width inline message strip: a status stripe + a status-coloured icon
// tile, a semibold title beside a secondary message, an optional content slot
// (a link by default) and an optional close button.
//
// Two visual axes (mirror the Figma variant set):
//   color   'info' | 'neutral' | 'error' | 'success' | 'warning'  (default 'info')
//   variant 'outlined' | 'filled'                                 (default 'outlined')
//     - outlined: white surface, full 1px border, title tinted to the status.
//     - filled:   subtle status-tinted surface, bottom rule only, neutral-dark
//                 title. (Both share the status stripe + status icon tile.)
//
// Content props (mirror the Figma property panel: showTitle, showStatusIndicator,
// showContentSlot, showClose + the text fields):
//   title         string  — the semibold headline (default 'Title').
//   showTitle     boolean — render the title (default true; only when title set).
//   message       string  — the secondary body line.
//   showIndicator boolean — the left status stripe (Figma showStatusIndicator).
//   showLink      boolean — the default content slot (Figma showContentSlot).
//   showClose     boolean — render the close (✕) button (default true).
//   onClose       func     — close handler.
//   children      node    — content slot; overrides the default link.
//                 slot `children` (Figma "Slot" SLOT, property #8736:75). Verified
//                 slotSettings (all Figma defaults): no preferred values,
//                 allowPreferredValuesOnly false, min/max children null (unlimited),
//                 stretchChildOnInsert false, displayEmptyByDefault false.
//                 clipsContent false - the slot does NOT clip (no overflow rule).
//                 Defaults to the Global Kit <Link> ("Link"). For custom link
//                 text/href, pass your own <Link> via children - the Link's
//                 label/href are NOT exposed on the Banner Figma panel, so Banner
//                 surfaces no linkLabel/linkHref/onLinkClick props.
//
// The icon tile glyph is fixed per color; the Banner Figma panel exposes no icon
// swap or nested Icon property, so there is no `icon` override prop.
//
// Brand/theme/device come from the [data-*] cascade — the component never
// branches on them. Colours / radii / spacing resolve through the token custom
// properties in Banner.css; the JSX only picks variant + color classes.

// Default status glyph per color (Phosphor regular). Overridable via `icon`.
const BANNER_GLYPH = {
  info: 'info',
  neutral: 'bell',
  error: 'warning-circle',
  success: 'check-circle',
  warning: 'warning',
};

function Banner({
  color = 'info',
  variant = 'outlined',
  title = 'Title',
  showTitle = true,
  message = 'Any kind of message will appear here',
  showIndicator = true,
  showLink = true,
  showClose = true,
  onClose,
  className = '',
  children,
  ...rest
}) {
  // Link is a sibling Global Kit component, found on window (build-less, no import).
  const LinkCmp = typeof Link !== 'undefined' ? Link : window.Link;

  const classes = [
    'gk-banner',
    `gk-banner--${variant}`,
    `gk-banner--${color}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Glyph tile is banner-owned (status-coloured container + inverse glyph), so
  // it binds to the banner icon tokens directly rather than the brand-only
  // <Icon background>. The glyph is fixed per color (not exposed in Figma).
  const glyph = <i className={`ph ph-${BANNER_GLYPH[color] || BANNER_GLYPH.info}`} aria-hidden="true" />;

  // Content slot: custom children win; otherwise the default Global Kit <Link>.
  // Custom link text/href is supplied by passing your own <Link> via children -
  // the Link's label/href are not exposed on the Banner Figma panel.
  const slot = children != null
    ? children
    : (showLink && LinkCmp && <LinkCmp>Link</LinkCmp>);

  return (
    <div className={classes} role="status" {...rest}>
      {showIndicator && <span className="gk-banner__indicator" aria-hidden="true" />}

      <div className="gk-banner__content">
        <div className="gk-banner__body">
          <span className="gk-banner__icon" aria-hidden="true">{glyph}</span>
          <div className="gk-banner__text">
            {showTitle && title != null && title !== '' && (
              <span className="gk-banner__title text-body-semibold-paragraph-lg">{title}</span>
            )}
            {message != null && message !== '' && (
              <span className="gk-banner__message text-body-regular-paragraph-md">{message}</span>
            )}
          </div>
        </div>

        {slot && <div className="gk-banner__slot">{slot}</div>}

        {showClose && (
          <button
            type="button"
            className="gk-banner__close"
            aria-label="Dismiss"
            onClick={onClose}
          >
            <i className="ph ph-x" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

window.Banner = Banner;
