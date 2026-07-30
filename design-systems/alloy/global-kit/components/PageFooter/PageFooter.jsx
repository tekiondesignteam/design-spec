// PageFooter - core Global Kit component (build-less React; styles in PageFooter.css).
// 1:1 with the Figma "Alloy DS BETA" Page Footer (node 276-16805).
//
// A page-level action bar pinned to the bottom of a view: a top border rule, a
// left container (leading icon + title/subtitle + a vertical separator + a small
// content slot) and a right-aligned action area (a Button Group). Structure is
// fixed; content comes in through node props / the slot.
//
// Component-property panel axes (from the Figma property panel - all mirrored):
//   title                string  - the primary line (Figma "Title", default "Title")
//   subtitle             node    - the secondary line (Figma "Subtitle"); shown only
//                                  when showSubtitle is on (default off, per Figma)
//   showLeadingIcon      boolean - gate the leading icon        (default true)
//   showLeadingText      boolean - gate the title/subtitle text (default true)
//   showSubtitle         boolean - gate the subtitle line       (default false)
//   showSeparator        boolean - gate the vertical divider    (default true)
//   showTitleContentSlot boolean - gate the content slot        (default true)
//   showButtonGroup      boolean - gate the action area         (default true)
//
// Slot + code-level node props (React node props - never hardcode a child):
//   titleContent  slot - the ONE native Figma SLOT this component exposes
//                        ("Title Content Slot", property #8804:0, node 276:16812,
//                        24x24). Verified slotSettings (all Figma defaults): no
//                        preferred values (OPEN slot - any content), allowPreferred
//                        ValuesOnly false, min/max children null (unlimited),
//                        stretchChildOnInsert false, displayEmptyByDefault false
//                        (empty reserves no content - we still hold the 24x24 box).
//                        clipsContent false - the slot box does NOT clip. Default:
//                        empty. Gated by showTitleContentSlot.
//   leadingIcon   node - the leading icon, a code-level node prop. Figma authors it
//                        as a FIXED Icon instance (not a slot / instance-swap) and
//                        does NOT expose the Icon's own glyph/size on the parent
//                        panel, so no nested Icon property is forwarded - only the
//                        whole node is replaceable (same idiom as Modal `leading`).
//                        Wrapped in the Global Kit <Icon> ("sm", 16px, tinted with
//                        the pageFooter icon token). Gated by showLeadingIcon.
//   actions       node - the action area, a code-level node prop. Figma authors the
//                        Button Group as a FIXED instance (not a slot); its inner
//                        buttons are not exposed on the parent panel. Default = the
//                        Figma default content (Cancel / Save / a more IconButton).
//                        Pass your own node to replace it. Gated by showButtonGroup.
//
// No exposed nested-instance properties: every one of the 9 panel properties above
// belongs to Page Footer itself; the leading Icon's glyph and the Button Group's
// buttons are NOT surfaced on the parent panel, so none are forwarded.
//
// Dependencies (all Global Kit, referenced via window - build-less, never re-made):
//   Icon (leading) · Divider (vertical separator) · ButtonGroup + Button + IconButton
//   (default actions).
//
// Brand/theme/device come from the [data-*] cascade - the component never branches on
// them. Colours/spacing resolve through the token custom properties in PageFooter.css;
// the JSX only assembles structure and picks the text-* class for the title/subtitle.
function PageFooter({
  title = 'Title',
  subtitle = 'Subtitle',
  showLeadingIcon = true,
  showLeadingText = true,
  showSubtitle = false,
  showSeparator = true,
  showTitleContentSlot = true,
  showButtonGroup = true,
  leadingIcon = <i className="ph ph-info" aria-hidden="true" />,
  titleContent = null,
  actions,
  className = '',
  ...rest
}) {
  // Sibling Global Kit components exposed on window (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const DividerCmp = typeof Divider !== 'undefined' ? Divider : window.Divider;
  const ButtonGroupCmp = typeof ButtonGroup !== 'undefined' ? ButtonGroup : window.ButtonGroup;
  const ButtonCmp = typeof Button !== 'undefined' ? Button : window.Button;
  const IconButtonCmp = typeof IconButton !== 'undefined' ? IconButton : window.IconButton;

  // Default action area = the Button Group authored in the Figma component
  // (Stroke "Cancel" + Filled/Primary "Save" + a ghost/neutral more IconButton), all lg.
  const actionsContent =
    actions !== undefined ? (
      actions
    ) : (
      <ButtonGroupCmp>
        <ButtonCmp type="stroke" intent="primary" size="lg">
          Cancel
        </ButtonCmp>
        <ButtonCmp type="filled" intent="primary" size="lg">
          Save
        </ButtonCmp>
        <IconButtonCmp type="ghost" intent="neutral" size="lg" aria-label="More">
          <i className="ph ph-dots-three" aria-hidden="true" />
        </IconButtonCmp>
      </ButtonGroupCmp>
    );

  const classes = ['gk-page-footer', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="gk-page-footer__left">
        {showLeadingIcon && (
          <IconCmp size="sm" className="gk-page-footer__icon">
            {leadingIcon}
          </IconCmp>
        )}
        {showLeadingText && (
          <div className="gk-page-footer__text">
            {title != null && (
              <p className="gk-page-footer__title text-body-medium-paragraph-lg">{title}</p>
            )}
            {showSubtitle && subtitle != null && (
              <p className="gk-page-footer__subtitle text-body-regular-caption-lg">{subtitle}</p>
            )}
          </div>
        )}
        {showSeparator && (
          <DividerCmp orientation="vertical" className="gk-page-footer__separator" />
        )}
        {showTitleContentSlot && <div className="gk-page-footer__slot">{titleContent}</div>}
      </div>
      {showButtonGroup && <div className="gk-page-footer__actions">{actionsContent}</div>}
    </div>
  );
}

window.PageFooter = PageFooter;
