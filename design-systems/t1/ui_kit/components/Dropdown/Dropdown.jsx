/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DROPDOWN  (Figma: AiT1DropdownList · section "T1 Dropdown")
   BEM prefix: t1-dropdown

   Interaction model
   ─────────────────────────────────────────────────────────────────────────
   • The DropdownHeader IS the trigger — click it to open / close the panel.
   • When open, the panel appears below the header.
   • If search=true, a search input sits at the top of the panel; typing
     filters items live without needing to press Enter.
   • Click an item → selects it, closes panel.
   • Click outside → closes panel, clears query.
   • Selected value is reflected in the header description slot.

   Props
   ─────────────────────────────────────────────────────────────────────────
   title          string          Header title text                  required
   description    string          Header subtitle / hint             optional
   placeholder    string          Shown in header until selection    default 'Select...'
   value          string          Controlled selected value          optional
   onChange       function        (value: string) => void            optional

   search         boolean         Show search input in panel         default false
   items          string[]        Options in primary section         default []
   sections       { label, items[] }[]  Extra labelled sections      default []
   dividers       boolean         Dividers between items             default false

   type           string          'singleSelect'                     default 'singleSelect'
   width          number|string   Component width — px number or CSS string
                                  e.g. 268, '100%', '50%'           default '100%'
   className      string          Extra classes on root              optional

   Figma nested props honoured
   ─────────────────────────────────────────────────────────────────────────
   DropdownHeader.description  → description / selected value in header
   DropdownHeader.search       → search prop (in panel, not header)
   DropdownList.header         → always true (header IS the trigger)
   DropdownList.section2–5     → sections[] (up to 4)
   DropdownListSection.divider → dividers prop
   DropdownListSection.subHeader → driven by section.label presence

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Search      — search input inside panel (md size, handles icon + styling)
   Phi         — caret-down icon in header
   ========================================================================== */

/* ── DropdownSubHeader ────────────────────────────────────────────────────── */
const DropdownSubHeader = ({ label }) => (
  <div className="t1-dropdown__subheader">
    <span className="t1-dropdown__subheader-label">{label}</span>
  </div>
);

/* ── DropdownListItem ─────────────────────────────────────────────────────── */
const DropdownListItem = ({ label = 'Option', selected = false, onClick }) => (
  <div
    className={['t1-dropdown__item', selected && 't1-dropdown__item--selected'].filter(Boolean).join(' ')}
    onClick={onClick}
    role="option"
    aria-selected={selected}
  >
    <span className="t1-dropdown__item-label">{label}</span>
    {selected && (
      <span className="t1-dropdown__item-check" aria-hidden="true">
        <Phi name="check" size={14} weight="bold" />
      </span>
    )}
  </div>
);

/* ── DropdownListSection ──────────────────────────────────────────────────── */
const DropdownListSection = ({ label, items = [], dividers = false, selectedValue, onSelect }) => (
  <div className="t1-dropdown__section">
    {label && <DropdownSubHeader label={label} />}
    {items.map((item, i) => {
      const itemLabel = typeof item === 'string' ? item : item.label;
      return (
        <React.Fragment key={i}>
          {dividers && i > 0 && <div className="t1-dropdown__divider" aria-hidden="true" />}
          <DropdownListItem
            label={itemLabel}
            selected={itemLabel === selectedValue}
            onClick={() => onSelect && onSelect(itemLabel)}
          />
        </React.Fragment>
      );
    })}
  </div>
);

/* ── Dropdown ─────────────────────────────────────────────────────────────── */
const Dropdown = ({
  title         = 'Title',
  description,
  placeholder   = 'Select...',
  value,
  onChange,
  search        = false,
  items         = [],
  sections      = [],
  dividers      = false,
  type          = 'singleSelect',
  width         = '100%',
  className,
  ...rest
}) => {
  const [open, setOpen]         = React.useState(false);
  const [query, setQuery]       = React.useState('');
  const [selected, setSelected] = React.useState(value !== undefined ? value : null);
  const wrapRef                 = React.useRef(null);

  /* Sync controlled value */
  React.useEffect(() => {
    if (value !== undefined) setSelected(value);
  }, [value]);

  /* Close on outside click */
  React.useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleToggle = () => {
    setOpen(o => !o);
    if (open) setQuery('');
  };

  const handleSelect = (val) => {
    setSelected(val);
    setOpen(false);
    setQuery('');
    if (onChange) onChange(val);
  };

  /* Live filter */
  const filterItems = (arr) => {
    if (!query.trim()) return arr;
    const q = query.toLowerCase();
    return arr.filter(item => {
      const label = typeof item === 'string' ? item : item.label;
      return label.toLowerCase().includes(q);
    });
  };

  const filteredItems    = filterItems(items);
  const filteredSections = sections
    .slice(0, 4)
    .map(sec => ({ ...sec, items: filterItems(sec.items || []) }))
    .filter(sec => sec.items.length > 0);

  const hasResults = filteredItems.length > 0 || filteredSections.length > 0;

  /* Header shows selected value in description slot when something is chosen */
  const headerDescription = selected || description || placeholder;

  return (
    <div
      className={['t1-dropdown', open && 't1-dropdown--open', className].filter(Boolean).join(' ')}
      style={{ width: typeof width === 'number' ? width + 'px' : width }}
      ref={wrapRef}
      {...rest}
    >
      {/* ── Header — the clickable trigger ───────────────────────────── */}
      <div
        className="t1-dropdown__header"
        onClick={handleToggle}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggle()}
      >
        <div className="t1-dropdown__header-content">
          <p className="t1-dropdown__header-title">{title}</p>
          <p className={['t1-dropdown__header-desc', !selected && 't1-dropdown__header-desc--placeholder'].filter(Boolean).join(' ')}>
            {headerDescription}
          </p>
        </div>
        <span className="t1-dropdown__header-caret">
          <Phi name="caret-down" size={16} weight="bold" />
        </span>
      </div>

      {/* ── Panel ─────────────────────────────────────────────────────── */}
      {open && (
        <div className="t1-dropdown__panel" role="listbox" aria-label={title}>

          {/* Search input at top of panel */}
          {search && (
            <div className="t1-dropdown__search-bar">
              <Search
                size="md"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}

          {/* Items */}
          {hasResults ? (
            <>
              {filteredItems.length > 0 && (
                <DropdownListSection
                  items={filteredItems}
                  dividers={dividers}
                  selectedValue={selected}
                  onSelect={handleSelect}
                />
              )}
              {filteredSections.map((sec, i) => (
                <DropdownListSection
                  key={i}
                  label={sec.label}
                  items={sec.items}
                  dividers={dividers}
                  selectedValue={selected}
                  onSelect={handleSelect}
                />
              ))}
            </>
          ) : (
            <div className="t1-dropdown__empty">No results for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
};
