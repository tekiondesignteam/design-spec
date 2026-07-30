// PageHeader — core Global Kit component (build-less React; styles in PageHeader.css).
// 1:1 with the Figma "Alloy DS BETA" Page - Header component (node 276-16818).
//
// A page-level header bar: a left container (back / leading icon, title + optional
// subtitle, optional vertical divider, optional trailing content slot) and a right-
// side action area rendered as the Global Kit <ButtonGroup>. Pure layout + typography;
// it owns spacing/padding/background/text-colour tokens and composes sibling kit
// components — it never draws a button, icon glyph or rule itself.
//
// Props (mirror the Figma component-property panel):
//   title            string  (default 'Title')   — the H6 heading
//   subtitle         string  (default 'Subtitle')
//   showBack         boolean (default true)  — leading back-navigation Icon
//   backIcon         node    — glyph for the back Icon (default Phosphor caret-left)
//   showLeadingIcon  boolean (default false) — a leading Icon after Back
//   leadingIcon      node    — glyph for the leading Icon (default squares-four)
//   showSubtitle     boolean (default false)
//   showDivider      boolean (default false) — vertical Divider after the content block
//   showTitleTrailing boolean (default false) — reveals the Title Right Content Slot
//   titleTrailing    node    — content for that slot (see slot note below)
//   showButtonGroup  boolean (default true)  — the right-side action ButtonGroup
//   actions          node    — content for the ButtonGroup (see slot note below)
//
// slot `titleTrailing` (Figma native SLOT "Title Right Content Slot", node 276:16827):
//   OPEN slot — preferredValues [] (any content allowed, no restriction),
//   clipsContent false (no overflow clip), stretchChildOnInsert false,
//   displayEmptyByDefault true, min/max null. Rendered only when showTitleTrailing;
//   no default child content in Figma. It is a React node prop, never a hardcoded child.
//
// actions → the Global Kit <ButtonGroup>'s own "Content" slot (node 276:15701). When
//   omitted, the Figma default group content is reproduced from real kit components
//   (Button ·2, IconButton ·2, vertical Divider). Fill only with sibling kit components.
//
// No exposed nested-instance properties: the Figma parent panel surfaces only its own
// boolean/text/slot props, so nothing is forwarded into the child Icon/ButtonGroup.
//
// Brand/theme/device come from the [data-*] cascade — the component never branches on
// them. Colours/spacing resolve through the token custom properties in PageHeader.css;
// the JSX only assembles structure and class names.
function PageHeader({
  title = 'Title',
  subtitle = 'Subtitle',
  showBack = true,
  backIcon = <i className="ph ph-caret-left" />,
  showLeadingIcon = false,
  leadingIcon = <i className="ph ph-squares-four" />,
  showSubtitle = false,
  showDivider = false,
  showTitleTrailing = false,
  titleTrailing = null,
  showButtonGroup = true,
  actions = null,
  className = '',
  ...rest
}) {
  // Sibling Global Kit components exposed on window (build-less, no import).
  const IconCmp = typeof Icon !== 'undefined' ? Icon : window.Icon;
  const DividerCmp = typeof Divider !== 'undefined' ? Divider : window.Divider;
  const ButtonGroupCmp = typeof ButtonGroup !== 'undefined' ? ButtonGroup : window.ButtonGroup;
  const ButtonCmp = typeof Button !== 'undefined' ? Button : window.Button;
  const IconButtonCmp = typeof IconButton !== 'undefined' ? IconButton : window.IconButton;

  // The Figma back / leading icons are 24px → Global Kit Icon size 'lg'.
  const navIcon = (glyph) => (
    <IconCmp size="lg" className="gk-page-header__nav-icon">
      {glyph}
    </IconCmp>
  );

  // Default ButtonGroup content = the Figma group demo, built from real kit components.
  const defaultActions =
    ButtonCmp && IconButtonCmp && DividerCmp ? (
      <>
        <ButtonCmp type="filled" intent="primary" size="lg">Button</ButtonCmp>
        <ButtonCmp type="stroke" intent="primary" size="lg">Link</ButtonCmp>
        <IconButtonCmp type="ghost" intent="neutral" size="lg" aria-label="Settings">
          <i className="ph ph-gear-six" />
        </IconButtonCmp>
        <DividerCmp orientation="vertical" />
        <IconButtonCmp type="ghost" intent="neutral" size="lg" aria-label="More">
          <i className="ph ph-dots-three-outline" />
        </IconButtonCmp>
      </>
    ) : null;

  const classes = ['gk-page-header', className].filter(Boolean).join(' ');

  return (
    <header className={classes} {...rest}>
      <div className="gk-page-header__left">
        {showBack && navIcon(backIcon)}
        {showLeadingIcon && navIcon(leadingIcon)}

        <div className="gk-page-header__content">
          <span className="gk-page-header__title text-heading-semibold-h6">{title}</span>
          {showSubtitle && (
            <div className="gk-page-header__subtitle-row">
              <span className="gk-page-header__subtitle text-body-medium-paragraph-xs">
                {subtitle}
              </span>
            </div>
          )}
        </div>

        {showDivider && (
          <DividerCmp orientation="vertical" className="gk-page-header__divider" />
        )}

        {showTitleTrailing && (
          <div className="gk-page-header__slot">{titleTrailing}</div>
        )}
      </div>

      {showButtonGroup && ButtonGroupCmp && (
        <ButtonGroupCmp className="gk-page-header__actions">
          {actions != null ? actions : defaultActions}
        </ButtonGroupCmp>
      )}
    </header>
  );
}

window.PageHeader = PageHeader;
