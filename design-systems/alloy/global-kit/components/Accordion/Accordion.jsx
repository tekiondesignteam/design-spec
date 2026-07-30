// Accordion — core Global Kit component (build-less React; styles in Accordion.css).
// 1:1 with the Figma "Alloy DS BETA" Accordion set (node 276-16549).
//
// A titled, expandable panel: a header row (caret + title/description + optional
// content icons) that toggles a content region open and closed. Faithful to the
// Figma variant set, plus real open/close + hover interaction.
//
// Props (mirror the Figma variant axes, with interaction added):
//   title         string — header title (Body/Semibold/Paragraph/lg). (default 'Accordion')
//   description   string — header subtitle (Body/Medium/Paragraph/sm). (default 'Description')
//   status        'default' | 'error' | 'success'   — validation colour of the
//                 container border + header fill. (default 'default')
//   open          boolean — controlled expanded state. Omit for uncontrolled.
//   defaultOpen   boolean — initial expanded state when uncontrolled. (default false)
//   onToggle      (next:boolean) => void — fired when the header is activated.
//   disabled      boolean — dims the header and blocks interaction.
//   state         'default' | 'hover'  — forces a visual state without pointer
//                 interaction (for tools/previews); leave 'default' for normal
//                 interactive :hover. (default 'default')
//   showCaretLeft   boolean — leading caret (Figma "showExpandedLeft").  (default true)
//   showCaretRight  boolean — trailing caret (Figma "showExpandedRight"). (default true)
//   leadingIcon   node — glyph before the title (Figma "showLeftIcon").
//   trailingIcon  node — glyph after the title/description (Figma "showRightIcon").
//   children      the content revealed when expanded.
//                 slot `children` (Figma "Content" SLOT): open slot - Figma defines
//                 no preferred values, so any content/kit component is allowed.
//                 (leadingIcon/trailingIcon are Figma boolean toggles over internal
//                 <Icon> instances, not instance-swap slots - no preferred values.)
//
// The caret + content icons render through the Global Kit <Icon> component at
// size 'lg' (24px box, matching the Figma icon frame). Brand/theme/device come
// from the [data-*] cascade — the component never branches on them; colours
// resolve through the token custom properties in Accordion.css.
function Accordion({
  title = 'Accordion',
  description = 'Description',
  status = 'default',
  open,
  defaultOpen = false,
  onToggle,
  disabled = false,
  state = 'default',
  showCaretLeft = true,
  showCaretRight = true,
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  // Icon is a sibling Global Kit component exposed on window (build-less).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;

  // Controlled when `open` is provided; otherwise track it internally.
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    if (onToggle) onToggle(next);
  };

  const classes = [
    'gk-accordion',
    isOpen && 'gk-accordion--open',
    status === 'error' && 'gk-accordion--error',
    status === 'success' && 'gk-accordion--success',
    disabled && 'gk-accordion--disabled',
    state === 'hover' && 'gk-accordion--hover',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Caret glyph — Phosphor caret-down; CSS rotates it 180° when open.
  const caret = (
    <IconCmp size="lg" className="gk-accordion__caret">
      <i className="ph ph-caret-down" />
    </IconCmp>
  );

  return (
    <div className={classes} {...rest}>
      <button
        type="button"
        className="gk-accordion__header"
        onClick={toggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
      >
        {showCaretLeft && caret}

        <span className="gk-accordion__container">
          {leadingIcon && (
            <IconCmp size="lg" className="gk-accordion__side-icon">
              {leadingIcon}
            </IconCmp>
          )}
          <span className="gk-accordion__text">
            <span className="gk-accordion__title text-body-semibold-paragraph-lg">{title}</span>
            {description != null && description !== '' && (
              <span className="gk-accordion__description text-body-medium-paragraph-sm">
                {description}
              </span>
            )}
          </span>
          {trailingIcon && (
            <IconCmp size="lg" className="gk-accordion__side-icon">
              {trailingIcon}
            </IconCmp>
          )}
        </span>

        {showCaretRight && caret}
      </button>

      {children != null && (
        // Always mounted so the height can animate; the grid row collapses it
        // to 0 when closed. Hidden from assistive tech while collapsed.
        <div className="gk-accordion__content-wrap" aria-hidden={!isOpen || undefined}>
          <div className="gk-accordion__content">
            <div className="gk-accordion__content-body" role="region">
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Accordion = Accordion;
