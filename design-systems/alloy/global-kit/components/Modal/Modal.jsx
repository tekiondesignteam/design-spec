// Modal — core Global Kit component (build-less React; styles in Modal.css).
// 1:1 with the Figma "Alloy DS BETA" Modal (node 276-16616).
//
// A dialog surface: a Header (optional leading icon + title + optional subtitle +
// a close button), a full-bleed content area, and a Footer (a top divider rule + a
// row of action buttons). Structure is fixed; content comes in through slots.
//
// Props:
//   title      string - the header title (default "Title goes here").
//   subtitle   node   - optional secondary line under the title. Rendered only when
//                       supplied (hidden by default, matching Figma).
//   onClose    fn     - click handler for the header close button.
//   className, ...rest
//
// Slots + node props (React node props; never hardcode a child):
//   children   slot - the ONE native Figma SLOT this component exposes ("Content",
//                     property #9304:93, node 276:16625), full-bleed: the header/
//                     footer are inset 24px, the body is edge-to-edge, so content
//                     supplies its own padding. Verified slotSettings (all Figma
//                     defaults): no preferred values, allowPreferredValuesOnly false,
//                     min/max children null (unlimited), stretchChildOnInsert false,
//                     displayEmptyByDefault false. clipsContent false - the body does
//                     NOT clip (the outer .gk-modal clips only for the rounded surface).
//   leading    node - the leading icon area, a code-level node prop. Figma authors the
//                     leading icon as a fixed instance, NOT a slot/instance-swap, so it
//                     is not a Figma slot; pass any Global Kit <Icon> or omit.
//   actions    node - the footer action row, a code-level node prop. Figma authors the
//                     two buttons (Stroke + Filled/Primary <Button> "lg") as fixed
//                     instances, NOT a slot; pass your own node to replace them.
//
// Dependencies (all Global Kit, referenced via window - build-less, never re-made):
//   Icon (leading slot) · IconButton (close) · Button (default actions) · Divider (footer rule).
//
// Brand/theme/device come from the [data-*] cascade - the component never branches on
// them. Colours/spacing resolve through the token custom properties in Modal.css.
function Modal({
  title = 'Title goes here',
  subtitle = null,
  onClose,
  leading = null,
  actions,
  className = '',
  children,
  ...rest
}) {
  // Sibling Global Kit components exposed on window (build-less, no import).
  const IconButtonCmp = typeof IconButton !== 'undefined' ? IconButton : window.IconButton;
  const ButtonCmp = typeof Button !== 'undefined' ? Button : window.Button;
  const DividerCmp = typeof Divider !== 'undefined' ? Divider : window.Divider;

  // Default footer actions = the two buttons authored in the Figma component.
  const actionsContent =
    actions !== undefined ? (
      actions
    ) : (
      <>
        <ButtonCmp type="stroke" intent="primary" size="lg">
          Button
        </ButtonCmp>
        <ButtonCmp type="filled" intent="primary" size="lg">
          Button
        </ButtonCmp>
      </>
    );

  const classes = ['gk-modal', className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="dialog" aria-modal="true" {...rest}>
      <div className="gk-modal__header">
        <div className="gk-modal__header-container">
          {leading && <div className="gk-modal__leading">{leading}</div>}
          <div className="gk-modal__heading">
            {title != null && (
              <p className="gk-modal__title text-heading-semibold-h6">{title}</p>
            )}
            {subtitle != null && (
              <p className="gk-modal__subtitle text-body-regular-paragraph-lg">{subtitle}</p>
            )}
          </div>
        </div>
        <IconButtonCmp
          type="ghost"
          intent="neutral"
          size="lg"
          className="gk-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="ph ph-x" aria-hidden="true" />
        </IconButtonCmp>
      </div>

      <div className="gk-modal__body">{children}</div>

      <div className="gk-modal__footer">
        <DividerCmp className="gk-modal__divider" />
        <div className="gk-modal__actions">{actionsContent}</div>
      </div>
    </div>
  );
}

window.Modal = Modal;
