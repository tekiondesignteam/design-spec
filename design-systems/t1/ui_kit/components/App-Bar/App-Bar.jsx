/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   APP-BAR  (Figma: aiT1AppBar · node 8:47311)
   BEM prefix: t1-ab

   Variants (`type`)
   ─────────────────────────────────────────────────────────────────────────
   'panel'            400px  gradient 143.74°  floating / docked chrome
   'fullscreen'       100%   gradient 167.99°  full-width expanded chrome
   'stickyMaximized'  400px  gradient 143.74°  panel + drag grip on left
   'stickyMinimized'  400px  gradient 143.74°  collapsed bar + drag grip
   'mobileDrag'       400px  gradient 143.74°  stacked, drag pill at top

   Legacy aliases (kept for backward compat):
   'default'   → 'panel'
   'expanded'  → 'fullscreen'
   'minimized' → 'stickyMinimized'

   Props
   ─────────────────────────────────────────────────────────────────────────
   type               variant (see above)                                 'panel'
   title              header text                                         'AI Assistant'
   orientation        'left'|'right' — affects panel variant's default
                      move menu items                                     'right'

   showMoveMenu       show the Move & Resize popover on supported
                      variants (panel, fullscreen, stickyMaximized)       true
   moveMenuItems      optional custom list [{ key, icon, label, target,
                      flipX? }]; overrides per-variant defaults
   moveMenuOpen       controlled open state (use with onMoveMenuChange)
   onMoveMenuChange   (open) => void
   onMove             (target) => void   target = 'left'|'right'|
                                                  'fullscreen'|'popover'

   onMinimize         minimize button clicked
   onFullscreen       fullscreen button clicked (alias: onExpand)
   onRestore          restore button clicked
   onCollapse         collapse button clicked (from stickyMinimized)
   onClose            close button clicked
   onDragStart        pointerdown on drag grip / pill — (e) => void

   className          extra class on root

   Self-managed state
   ─────────────────────────────────────────────────────────────────────────
   Without `onMove` / drag handlers the component tracks its own type so
   all variants and their transitions work standalone in the preview.
   ========================================================================== */

const AppBar = ({
  type             = 'panel',
  title            = 'AI Assistant',
  orientation      = 'right',

  showMoveMenu     = true,
  moveMenuItems,
  moveMenuOpen,
  onMoveMenuChange,
  onMove,

  onMinimize,
  onFullscreen,
  onExpand,
  onRestore,
  onCollapse,
  onClose,
  onDragStart,
  className,
  ...rest
}) => {
  const handleFullscreenCb = onFullscreen || onExpand;

  /* ── Legacy type aliases ────────────────────────────────────────────────── */
  const normalize = (v) => ({
    'default'  : 'panel',
    'expanded' : 'fullscreen',
    'minimized': 'stickyMinimized',
  }[v] || v);

  const [localType, setLocalType] = React.useState(() => normalize(type));
  React.useEffect(() => { setLocalType(normalize(type)); }, [type]);

  /* ── Move menu open state (controlled / uncontrolled) ──────────────────── */
  const [internalOpen, setInternalOpen] = React.useState(false);
  const menuOpen = moveMenuOpen !== undefined ? moveMenuOpen : internalOpen;
  const setMenuOpen = (next) => {
    if (moveMenuOpen === undefined) setInternalOpen(next);
    onMoveMenuChange && onMoveMenuChange(next);
  };

  const rootRef = React.useRef(null);

  /* Close on outside click / Escape */
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleDocMouse = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setMenuOpen(false);
    };
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', handleDocMouse);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocMouse);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const t                 = localType;
  const isPanel           = t === 'panel';
  const isFullscreen      = t === 'fullscreen';
  const isStickyMaximized = t === 'stickyMaximized';
  const isStickyMinimized = t === 'stickyMinimized';
  const isMobileDrag      = t === 'mobileDrag';
  const hasGrip           = isStickyMaximized || isStickyMinimized;
  const hasMoveMenu       = showMoveMenu && (isPanel || isFullscreen || isStickyMaximized);

  /* ── Handlers ───────────────────────────────────────────────────────────── */
  const handleMinimize = () => {
    setMenuOpen(false);
    setLocalType(isFullscreen ? 'stickyMinimized' : 'stickyMinimized');
    onMinimize && onMinimize();
  };
  const handleFullscreen = () => {
    setMenuOpen(false);
    setLocalType('fullscreen');
    handleFullscreenCb && handleFullscreenCb();
  };
  const handleRestore = () => {
    setMenuOpen(false);
    setLocalType('panel');
    onRestore && onRestore();
  };
  const handleCollapse = () => {
    setMenuOpen(false);
    setLocalType('panel');
    onCollapse && onCollapse();
  };
  const handleClose = () => {
    setMenuOpen(false);
    onClose && onClose();
  };
  const handleDragPointerDown = (e) => { onDragStart && onDragStart(e); };
  const handleMove = (target) => {
    setMenuOpen(false);
    if (onMove) { onMove(target); return; }
    /* Self-managed demo fallback */
    if (target === 'fullscreen')               setLocalType('fullscreen');
    else if (target === 'popover')             setLocalType('stickyMaximized');
    else /* 'left' | 'right' */                setLocalType('panel');
  };

  /* ── Default menu items per variant (Figma 1:1) ────────────────────────── */
  const defaultItems = React.useMemo(() => {
    const LEFT   = { key: 'left',       icon: 'sidebar-simple',   label: 'Left of the Screen',  target: 'left'       };
    const RIGHT  = { key: 'right',      icon: 'sidebar-simple',   label: 'Right of the Screen', target: 'right',     flipX: true };
    const FULL   = { key: 'fullscreen', icon: 'corners-out',      label: 'Full Screen',         target: 'fullscreen' };
    const POPOUT = { key: 'popover',    icon: 'arrow-square-out', label: 'Pop Out',             target: 'popover'    };
    if (isPanel)           return orientation === 'left' ? [LEFT, FULL, POPOUT] : [RIGHT, FULL, POPOUT];
    if (isFullscreen)      return [LEFT, RIGHT, POPOUT];
    if (isStickyMaximized) return [LEFT, RIGHT, FULL];
    return [];
  }, [isPanel, isFullscreen, isStickyMaximized, orientation]);

  const items = moveMenuItems || defaultItems;

  /* Trigger icon reflects the CURRENT layout state so the user can see
     at a glance what position is active. */
  const triggerIcon  = isFullscreen  ? 'corners-out'
                     : isPanel       ? 'sidebar-simple'
                     :                 'arrows-out';     /* stickyMaximized = floating */
  const triggerFlipX = isPanel && orientation === 'left'; /* right-docked panel */
  const triggerLabel = 'Move & Resize';

  /* ── Sub-components ─────────────────────────────────────────────────────── */
  /* T1 logo — CSS-masked span; gradient shows through via .t1-ab__logo */
  const Logo = () => (
    <span className="t1-ab__logo" role="img" aria-label="T1 AI logo" />
  );

  const TitleBlock = () => (
    <div className="t1-ab__title">
      <Logo />
      <span className="t1-ab__name">{title}</span>
    </div>
  );

  const CtrlBtn = ({ icon, onClick, label, extraClass, pressed, flipX }) => (
    <button
      className={[
        't1-ab__ctrl-btn',
        extraClass,
        pressed && 't1-ab__ctrl-btn--open',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={label}
      aria-haspopup={pressed !== undefined ? 'menu' : undefined}
      aria-expanded={pressed !== undefined ? pressed : undefined}
      type="button"
    >
      <i
        className={`ph ph-${icon} t1-ab__ctrl-icon`}
        style={flipX ? { transform: 'scaleX(-1)' } : undefined}
        aria-hidden="true"
      />
    </button>
  );

  const MoveMenu = () => (
    <div className="t1-ab__menu-wrap">
      <CtrlBtn
        icon={triggerIcon}
        label={triggerLabel}
        pressed={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
        flipX={triggerFlipX}
      />
      {menuOpen && (
        <div className="t1-ab__menu" role="menu">
          <div className="t1-ab__menu-header">Move &amp; Resize</div>
          {items.map(opt => (
            <button
              key={opt.key}
              className="t1-ab__menu-item"
              onClick={() => handleMove(opt.target)}
              role="menuitem"
              type="button"
            >
              <span className={`t1-ab__menu-item-icon${opt.flipX ? ' t1-ab__menu-item-icon--flip' : ''}`}>
                <i className={`ph ph-${opt.icon}`} aria-hidden="true" />
              </span>
              <span className="t1-ab__menu-item-label">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const DragGrip = () => (
    <button
      className="t1-ab__drag-grip"
      onPointerDown={handleDragPointerDown}
      aria-label="Drag to reposition"
      type="button"
    >
      <i className="ph ph-dots-six-vertical t1-ab__drag-grip-icon" aria-hidden="true" />
    </button>
  );

  const DragPill = () => (
    <div
      className="t1-ab__drag-pill"
      onPointerDown={handleDragPointerDown}
      role="presentation"
    />
  );

  /* ── Root class ─────────────────────────────────────────────────────────── */
  const rootClass = [
    't1-ab',
    isPanel           && 't1-ab--panel',
    isFullscreen      && 't1-ab--fullscreen',
    isStickyMaximized && 't1-ab--sticky-maximized',
    isStickyMinimized && 't1-ab--sticky-minimized',
    isMobileDrag      && 't1-ab--mobile-drag',
    hasGrip           && 't1-ab--has-grip',
    className,
  ].filter(Boolean).join(' ');

  /* ── Mobile drag — stacked column with pill at top ──────────────────────── */
  if (isMobileDrag) {
    return (
      <div ref={rootRef} className={rootClass} {...rest}>
        <DragPill />
        <div className="t1-ab__content-row">
          <TitleBlock />
          <div className="t1-ab__controls">
            <CtrlBtn icon="x" onClick={handleClose} label="Close" extraClass="t1-ab__ctrl-btn--close" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Default row layout (panel / fullscreen / sticky*) ──────────────────── */
  return (
    <div ref={rootRef} className={rootClass} {...rest}>
      {hasGrip && <DragGrip />}
      <TitleBlock />
      <div className="t1-ab__controls">
        {isStickyMinimized ? (
          <>
            <CtrlBtn icon="caret-up" onClick={handleCollapse} label="Collapse" />
            <CtrlBtn icon="x"        onClick={handleClose}    label="Close"    extraClass="t1-ab__ctrl-btn--close" />
          </>
        ) : (
          <>
            <CtrlBtn icon="minus" onClick={handleMinimize} label="Minimize" />
            {hasMoveMenu
              ? <MoveMenu />
              : (isFullscreen
                  ? <CtrlBtn icon="arrows-in"  onClick={handleRestore}    label="Restore" />
                  : <CtrlBtn icon="arrows-out" onClick={handleFullscreen} label="Fullscreen" />)
            }
            <CtrlBtn icon="x" onClick={handleClose} label="Close" extraClass="t1-ab__ctrl-btn--close" />
          </>
        )}
      </div>
    </div>
  );
};
