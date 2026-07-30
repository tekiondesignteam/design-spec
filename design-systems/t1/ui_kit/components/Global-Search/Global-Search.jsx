/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   GLOBAL-SEARCH  (Figma: aiT1GlobalSearch)
   T1 AI-powered search bar — segment switch + search field

   Figma ref : T1-Components
   BEM prefix: t1-gs

   Variants (type × state from Figma)
   ─────────────────────────────────────────────────────────────────────────
   normalSearch / default → mode="ai",     empty, "Search here…"
   aiSearch     / active  → mode="ai",     focused, value, blue border, Ask btn
   Search       / default → mode="search", empty, "Ask • Find • Summarize"
   aiSearch     / typing  → mode="search", value, blue border, Ask btn

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi    — magnifying-glass icon in search segment slot (size=16 weight="regular")
   Button — "Ask" suffix button (variant="contained" color="primary" size="sm"
             iconStart="arrow-bend-down-left") — only rendered when mode=ai + value present

   Props
   ─────────────────────────────────────────────────────────────────────────
   initialMode   "ai"|"search"    Which segment is active on mount    "ai"
   placeholder   string           Override the resolved placeholder   undefined
   onAsk         fn(value)        Called when Ask is clicked / Enter  undefined
   className     string
   ========================================================================== */

/* ── T1 mark SVG — two render states (inline — path-independent) ─────────── */
const _GS_LOGO_WHITE = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="white"/><path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="white"/><path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="white"/></svg>';
const _GS_LOGO_GRAD  = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#gs-grad)"/><path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#gs-grad)"/><path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#gs-grad)"/><defs><linearGradient id="gs-grad" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stop-color="#25C8A5"/><stop offset="0.5" stop-color="#1B90B4"/><stop offset="1" stop-color="#1A6CC4"/></linearGradient></defs></svg>';

const GlobalSearch = ({
  initialMode = 'ai',
  placeholder,
  onAsk,
  className,
  ...rest
}) => {
  const [mode,    setMode]    = React.useState(initialMode);
  const [value,   setValue]   = React.useState('');
  const [focused, setFocused] = React.useState(false);

  const isAi     = mode === 'ai';
  const showAsk  = isAi && value.trim().length > 0;
  const isActive = focused || value.length > 0;

  /* Placeholder matches Figma copy per mode */
  const defaultPlaceholder = isAi ? 'Search here...' : 'Ask \u2022 Find \u2022 Summarize';
  const resolvedPlaceholder = placeholder != null ? placeholder : defaultPlaceholder;

  /* BEM class builder */
  const fieldCls = [
    't1-gs__field',
    isActive  && 't1-gs__field--active',
    showAsk   && 't1-gs__field--has-ask',
  ].filter(Boolean).join(' ');

  const cls = ['t1-gs', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Segment Switch ─────────────────────────────────────────────────── */}
      <div className="t1-gs__seg" role="tablist" aria-label="Search mode">

        {/* T1 logo slot — active when mode=ai */}
        <button
          className={`t1-gs__seg-slot${isAi ? ' t1-gs__seg-slot--logo-active' : ''}`}
          role="tab"
          aria-selected={isAi}
          aria-label="AI search"
          onClick={() => setMode('ai')}
        >
          <span
            className="t1-gs__seg-logo"
            dangerouslySetInnerHTML={{ __html: isAi ? _GS_LOGO_WHITE : _GS_LOGO_GRAD }}
          />
        </button>

        {/* Magnifier slot — active when mode=search */}
        <button
          className={`t1-gs__seg-slot${!isAi ? ' t1-gs__seg-slot--search-active' : ''}`}
          role="tab"
          aria-selected={!isAi}
          aria-label="Regular search"
          onClick={() => setMode('search')}
        >
          <Phi name="magnifying-glass" size={16} weight="regular" />
        </button>

      </div>

      {/* ── Search Field — kit Search component; icon hidden via CSS ───────── */}
      <div
        className={`t1-gs__field-wrap${showAsk ? ' t1-gs__field-wrap--has-ask' : ''}`}
        onFocus={() => setFocused(true)}
        onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
        onKeyDown={e => { if (e.key === 'Enter' && showAsk && onAsk) onAsk(value); }}
      >
        <Search
          className="t1-gs__search"
          placeholder={resolvedPlaceholder}
          value={value}
          onChange={e => setValue(e.target.value)}
          size="md"
          aria-label={isAi ? 'AI search' : 'Search'}
        />

        {/* Ask button — absolutely positioned inside the right of the search field */}
        {showAsk && (
          <div className="t1-gs__ask-slot">
            <Button
              variant="contained"
              color="primary"
              size="sm"
              iconStart="arrow-bend-down-left"
              onClick={() => onAsk && onAsk(value)}
            >
              Ask
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};
