/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   NAV-BAR  (Figma: aiT1NavBar)
   Responsive top navigation bar

   Figma refs
   ─────────────────────────────────────────────────────────────────────────
   Mobile  : T1-Components
   Desktop : Tasks file

   BEM prefix: t1-nb

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — icons (size=24 for icon buttons)
   Button — action button (variant="contained" color="primary" size="md" iconStart)

   Props
   ─────────────────────────────────────────────────────────────────────────
   title          string   Bar title text                        "Title"
   onMenuClick    fn       If provided → shows hamburger (≡)     undefined
   showMore       bool     Show ⋮ dots-three-vertical on right   false
   onMore         fn       Click handler for ⋮                   undefined
   showNewChat    bool     Show compose/pencil icon before ⋮     false
   onNewChat      fn       Click handler for new-chat icon       undefined
   actionLabel    string   If set → shows action button (right)  undefined
   actionIcon     string   Phi name for action button icon       "plus"
   onAction       fn       Action button click handler           undefined
   className      string

   Variants
   ─────────────────────────────────────────────────────────────────────────
   Mobile   : onMenuClick + title + showMore (+ showNewChat)
   Desktop  : title + actionLabel + onAction
   ========================================================================== */

const NavBar = ({
  title         = 'Title',
  onMenuClick,
  showMore      = false,
  onMore,
  showNewChat   = false,
  onNewChat,
  actionLabel,
  actionIcon    = 'plus',
  onAction,
  className,
  ...rest
}) => {

  const hasIcons  = !actionLabel && (showMore || showNewChat);
  const hasAction = !!actionLabel;

  const cls = ['t1-nb', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="banner" {...rest}>
      <div className="t1-nb__inner">

        {/* ── Prefix — hamburger OR empty balance spacer ───────────────────── */}
        <div className="t1-nb__prefix">
          {onMenuClick ? (
            <button
              className="t1-nb__icon-btn"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <Phi name="list" size={24} weight="regular" />
            </button>
          ) : null}
        </div>

        {/* ── Title ────────────────────────────────────────────────────────── */}
        <h1 className="t1-nb__title">{title}</h1>

        {/* ── Suffix ───────────────────────────────────────────────────────── */}
        <div className="t1-nb__suffix">

          {/* Mobile: optional new-chat icon */}
          {hasIcons && showNewChat && (
            <button
              className="t1-nb__icon-btn"
              onClick={onNewChat}
              aria-label="New chat"
            >
              <Phi name="chat" size={24} weight="regular" />
            </button>
          )}

          {/* Mobile: more ⋮ */}
          {hasIcons && showMore && (
            <button
              className="t1-nb__icon-btn"
              onClick={onMore}
              aria-label="More options"
            >
              <Phi name="dots-three-vertical" size={24} weight="bold" />
            </button>
          )}

          {/* Desktop: action button — uses kit Button component */}
          {hasAction && (
            <>
              {/* 40px invisible spacer mirrors prefix so title stays centered */}
              <div className="t1-nb__balance" aria-hidden="true" />
              <Button
                variant="contained"
                color="primary"
                size="md"
                iconStart={actionIcon}
                onClick={onAction}
              >
                {actionLabel}
              </Button>
            </>
          )}

          {/* No suffix: 40px spacer to keep title visually centered */}
          {!hasIcons && !hasAction && (
            <div className="t1-nb__balance" aria-hidden="true" />
          )}

        </div>
      </div>
    </div>
  );
};
