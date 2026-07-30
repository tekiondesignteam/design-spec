/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   SIDE-NAVIGATION  (Figma: aiT1SideNavUpdated)
   BEM prefix: t1-sn

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — icons (search 16px, nav 24px, chevrons 16px, task items 16px)
   Button — "Start a New Chat" (variant="contained" color="neutral" size="md")
   Link   — "View all" (appearance="neutral", underlined)

   Props
   ─────────────────────────────────────────────────────────────────────────
   scheduledTask    bool       Show Recent Tasks section           false
   sections         string     "Expanded" | "Collapsed"            "Expanded"
                               Initial state — component manages it internally
   task             string     "Default" | "Collapsed" | "Expanded" "Default"
   activeNav        string     Initial active nav item             "tasks"
                               "home" | "tasks" | "shortcuts"
   searchValue      string     Controlled search input value       ""
   onSearch         fn         (value: string) => void
   onNewChat        fn         () => void
   onNavSelect      fn         ({ id, label }) => void
   pinnedChats      array      [{ id, label }]
   recentTasks      array      [{
                                  id, label,
                                  status?: "active"|"error"|"warning",
                                  subItems?: [{ id, label, status? }]
                                }]
   recentChats      array      [{ id, label }]
   onViewAllPinned  fn         () => void
   onViewAllTasks   fn         () => void
   onChatSelect     fn         (item) => void
   className        string

   Recent Tasks icon mapping  (Figma )
   ─────────────────────────────────────────────────────────────────────────
   Each task item always has a caret-right on the left (toggle).
   When expanded → caret-down.
   status="active"  → small filled blue circle dot  (#0060ff)
   status="error"   → small filled red circle dot   (#e53935)
   status="warning" → small warning triangle         (#f59e0b)
   No status        → no dot, just the caret
   Sub-items (date-prefixed runs) appear indented when parent is expanded.

   Design tokens
   ─────────────────────────────────────────────────────────────────────────
   Container        width 280px · bg #ffffff · border-right 1px #d4d5d6
   Search container sticky top · padding 16px · gap 16px
   Search field     h 32px · border 1px #969aa3 · radius 2px · px 10px
   New Chat button  neutral/contained/md · full width
   Primary nav      px 16px · pb 16px · flex-col
   Nav item         px 8px · py 8px · gap 12px · radius 8px
                    default: bg #ffffff · body2Bold 14/600/16 · #161616
                    active:  bg #edeef0 · body2Bold 14/600/16 · #161616
   Nav icon         24px
   Section header   px 16px · gap 8px · label body2Medium 14/500/16 · #969aa3
   Task item        pl 32px · pr 12px · py 12px · radius 4px · gap 8px
                    caret 16px + optional status dot 8px + label
   Sub-item         pl 40px · pr 12px · py 8px · radius 4px · gap 8px
   Chat item        pl 32px · pr 12px · py 12px · radius 4px
   View all link    neutral · underline · pl 32px
   ========================================================================== */

/* ── Default sample data (mirrors Figma canvas) ────────────────────────── */
const _SN_PINNED_DEFAULT = [
  { id: 'pc1', label: 'Monthly Sales Review' },
  { id: 'pc2', label: 'Summarize recent hot leads' },
  { id: 'pc3', label: 'Draft quote for Model X' },
];

/* recentTasks — rich structure with status + sub-items */
const _SN_TASKS_DEFAULT = [
  {
    id: 'rt1',
    label: 'Daily Sales Report',
    status: 'active',
    subItems: [
      { id: 'rt1-1', label: 'Apr 8 - Daily Sales Report', status: 'active' },
      { id: 'rt1-2', label: 'Apr 7 - Daily Sales Report' },
      { id: 'rt1-3', label: 'Apr 6 - Daily Sales Report' },
      { id: 'rt1-4', label: 'Apr 5 - Daily Sales Report' },
    ],
  },
  { id: 'rt2', label: 'Prepare monthly performance reports' },
  { id: 'rt3', label: 'Analyze quarterly revenue trends', status: 'error' },
  { id: 'rt4', label: 'Sales Leaderboard Update', status: 'warning' },
  { id: 'rt5', label: 'Daily pipeline summary' },
];

const _SN_CHATS_DEFAULT = [
  { id: 'rc1', label: 'Monthly Sales Review' },
  { id: 'rc2', label: 'Summarize recent hot leads' },
  { id: 'rc3', label: 'Draft quote for Model X' },
  { id: 'rc4', label: 'Last high-priority test drives' },
  { id: 'rc5', label: 'Coordinate follow-up calls with prospects' },
  { id: 'rc6', label: 'Schedule follow-up meetings' },
  { id: 'rc7', label: 'Prepare presentation for upcoming trade show' },
  { id: 'rc8', label: 'Update inventory status for shipment' },
];

/* Status icons removed — task items show caret + label only */

const SideNavigation = ({
  scheduledTask    = false,
  sections         = 'Expanded',
  task             = 'Default',
  activeNav:       activeNavProp = 'tasks',
  searchValue      = '',
  onSearch,
  onNewChat,
  onNavSelect,
  pinnedChats      = _SN_PINNED_DEFAULT,
  recentTasks      = _SN_TASKS_DEFAULT,
  recentChats      = _SN_CHATS_DEFAULT,
  onViewAllPinned,
  onViewAllTasks,
  onChatSelect,
  className,
  ...rest
}) => {

  /* ── Internal state ──────────────────────────────────────────────────── */
  const [activeNav,      setActiveNav]      = React.useState(activeNavProp);
  const [pinnedOpen,     setPinnedOpen]     = React.useState(sections === 'Expanded');
  const [tasksOpen,      setTasksOpen]      = React.useState(sections === 'Expanded');
  const [chatsOpen,      setChatsOpen]      = React.useState(sections === 'Expanded');
  const [selectedChat,   setSelectedChat]   = React.useState(null);
  /* Set of task IDs that are currently expanded.
     When task="Expanded", start with the first item that has sub-items open */
  const [expandedTasks,  setExpandedTasks]  = React.useState(() => {
    if (task === 'Expanded') {
      const firstWithSubs = recentTasks.find(t => t.subItems && t.subItems.length > 0);
      if (firstWithSubs) return new Set([firstWithSubs.id]);
    }
    return new Set();
  });

  /* Sync when parent drives props */
  React.useEffect(() => {
    const open = sections === 'Expanded';
    setPinnedOpen(open);
    setTasksOpen(open);
    setChatsOpen(open);
  }, [sections]);

  React.useEffect(() => { setActiveNav(activeNavProp); }, [activeNavProp]);

  /* ── Handlers ────────────────────────────────────────────────────────── */
  const handleNavClick = (item) => {
    setActiveNav(item.id);
    if (onNavSelect) onNavSelect(item);
  };

  const handleChatClick = (item) => {
    setSelectedChat(item.id);
    if (onChatSelect) onChatSelect(item);
  };

  const toggleTask = (id) => {
    setExpandedTasks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Primary nav items ───────────────────────────────────────────────── */
  const NAV_ITEMS = [
    { id: 'home',      label: 'Home',      icon: 'house'          },
    { id: 'tasks',     label: 'Tasks',     icon: 'clipboard-text' },
    { id: 'shortcuts', label: 'Shortcuts', icon: 'lightning'      },
  ];

  /* ── NavItem ─────────────────────────────────────────────────────────── */
  const NavItem = ({ item }) => {
    const isActive = item.id === activeNav;
    return (
      <div
        className={['t1-sn__nav-item', isActive ? 'is-active' : ''].filter(Boolean).join(' ')}
        role="button"
        tabIndex={0}
        onClick={() => handleNavClick(item)}
        onKeyDown={(e) => e.key === 'Enter' && handleNavClick(item)}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="t1-sn__nav-icon" aria-hidden="true">
          <Phi name={item.icon} size={24} weight="regular" />
        </div>
        <span className="t1-sn__nav-label">{item.label}</span>
      </div>
    );
  };

  /* ── Section header (collapsible) ────────────────────────────────────── */
  const SectionHeader = ({ label, expanded, onToggle }) => (
    <div
      className="t1-sn__section-header"
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => e.key === 'Enter' && onToggle()}
      aria-expanded={expanded}
    >
      <span className="t1-sn__section-chevron" aria-hidden="true">
        <Phi name={expanded ? 'caret-down' : 'caret-right'} size={16} weight="regular" />
      </span>
      <span className="t1-sn__section-label">{label}</span>
    </div>
  );

  /* ── "View all" link row ─────────────────────────────────────────────── */
  const ViewAllRow = ({ onClick, indent }) => (
    <div className={['t1-sn__view-all', indent ? 't1-sn__view-all--sub' : ''].filter(Boolean).join(' ')}>
      <Link
        href="#"
        appearance="neutral"
        size="medium"
        className="is-underlined"
        onClick={(e) => { e.preventDefault(); if (onClick) onClick(); }}
      >
        View all
      </Link>
    </div>
  );

  /* ── TaskItem — caret + label + expandable sub-items ────────────────── */
  const TaskItem = ({ item }) => {
    const isExpanded  = expandedTasks.has(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div className="t1-sn__task-group">
        {/* ── Main row ── */}
        <div
          className="t1-sn__task-item"
          role="button"
          tabIndex={0}
          onClick={() => toggleTask(item.id)}
          onKeyDown={(e) => e.key === 'Enter' && toggleTask(item.id)}
          title={item.label}
        >
          <span className="t1-sn__task-caret" aria-hidden="true">
            <Phi
              name={isExpanded ? 'caret-down' : 'caret-right'}
              size={16}
              weight="regular"
            />
          </span>
          <span className="t1-sn__chat-label">{item.label}</span>
        </div>

        {/* ── Sub-items (expanded state) ── */}
        {isExpanded && hasSubItems && (
          <div className="t1-sn__task-subitems">
            {item.subItems.map((sub) => (
              <div
                key={sub.id}
                className="t1-sn__task-subitem"
                role="button"
                tabIndex={0}
                onClick={() => handleChatClick(sub)}
                onKeyDown={(e) => e.key === 'Enter' && handleChatClick(sub)}
                title={sub.label}
              >
                <span className="t1-sn__chat-label">{sub.label}</span>
              </div>
            ))}
            {/* "View all" at sub-item indent level */}
            <ViewAllRow indent />
          </div>
        )}
      </div>
    );
  };

  /* ── Plain chat item (Pinned Chats / Recent Chats — no icons) ─────────── */
  const ChatItem = ({ item }) => {
    const isSelected = item.id === selectedChat;
    return (
      <div
        className={['t1-sn__chat-item', isSelected ? 'is-selected' : ''].filter(Boolean).join(' ')}
        role="button"
        tabIndex={0}
        onClick={() => handleChatClick(item)}
        onKeyDown={(e) => e.key === 'Enter' && handleChatClick(item)}
        title={item.label}
      >
        <span className="t1-sn__chat-label">{item.label}</span>
      </div>
    );
  };

  /* ── Task expanded sub-list (task="Expanded" — primary nav) ─────────── */
  const TaskSubItem = ({ item }) => (
    <div
      className="t1-sn__task-sub-item"
      role="button"
      tabIndex={0}
      onClick={() => handleChatClick(item)}
      onKeyDown={(e) => e.key === 'Enter' && handleChatClick(item)}
    >
      <span className="t1-sn__task-sub-icon" aria-hidden="true">
        <Phi name="plus-circle" size={16} weight="regular" />
      </span>
      <span className="t1-sn__task-sub-label">{item.label}</span>
    </div>
  );

  const cls = ['t1-sn', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>
      <div className="t1-sn__body">

        {/* ── Sticky search container ───────────────────────────────── */}
        <div className="t1-sn__search-container">
          <Search
            size="md"
            placeholder="Search..."
            value={searchValue}
            onChange={onSearch ? (e) => onSearch(e.target.value) : undefined}
          />
          <Button
            variant="contained"
            color="neutral"
            size="md"
            iconStart="plus"
            onClick={onNewChat}
            className="t1-sn__new-chat-btn"
          >
            Start a New Chat
          </Button>
        </div>

        {/* ── Scrollable list ──────────────────────────────────────── */}
        <div className="t1-sn__list">

          {/* Primary navigation: Home / Tasks / Shortcuts */}
          <div className="t1-sn__primary-nav">
            <div className="t1-sn__nav-actions">
              {NAV_ITEMS.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="t1-sn__sections">

            {/* Pinned Chats */}
            <div className="t1-sn__section">
              <SectionHeader
                label="Pinned Chats"
                expanded={pinnedOpen}
                onToggle={() => setPinnedOpen(o => !o)}
              />
              {pinnedOpen && (
                <div className="t1-sn__section-body">
                  {pinnedChats.map((item) => <ChatItem key={item.id} item={item} />)}
                  <ViewAllRow onClick={onViewAllPinned} />
                </div>
              )}
            </div>

            {/* Recent Tasks — only when scheduledTask=true */}
            {/* Each item rendered as TaskItem with caret + status dot */}
            {scheduledTask && (
              <div className="t1-sn__section">
                <SectionHeader
                  label="Recent Tasks"
                  expanded={tasksOpen}
                  onToggle={() => setTasksOpen(o => !o)}
                />
                {tasksOpen && (
                  <div className="t1-sn__section-body">
                    {recentTasks.map((item) => <TaskItem key={item.id} item={item} />)}
                    <ViewAllRow onClick={onViewAllTasks} />
                  </div>
                )}
              </div>
            )}

            {/* Recent Chats — collapsible */}
            <div className="t1-sn__section">
              <SectionHeader
                label="Recent Chats"
                expanded={chatsOpen}
                onToggle={() => setChatsOpen(o => !o)}
              />
              {chatsOpen && (
                <div className="t1-sn__section-body">
                  {recentChats.map((item) => <ChatItem key={item.id} item={item} />)}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
