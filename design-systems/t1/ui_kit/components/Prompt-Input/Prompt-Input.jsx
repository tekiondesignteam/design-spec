/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   PROMPT-INPUT  (Figma: Desktop  · Mobile )
   BEM prefix: t1-pi

   Props
   ─────────────────────────────────────────────────────────────────────────
   placeholder          string    single static placeholder (no animation)
   placeholders         string[]  cycling texts; defaults to built-in AI set
   placeholderInterval  number    ms between placeholder switches  default 3000
   mobile          bool      switch to mobile layout        default false
   disabled        bool      disabled state                 default false
   loading         bool      loading / streaming state      default false
   showSearchChip  bool      show "Search" chip in toolbar  default false
   onSend          function  called with (value: string) on send
   onAttach        function  called when attach (+) clicked
   onMic           function  called when mic clicked
   onSearchChip    function  called when Search chip × is clicked
   className       string    optional extra class

   Slash-command templates menu
   ─────────────────────────────────────────────────────────────────────────
   Typing "/" opens a popover above the input listing prompt templates that
   match the query. No matches → "No Results" empty state.
   Props
     templates             array     [{ command, description, icon }]
     templatesTitle        string    header title    default "Prompt Templates"
     showCreateTemplate    bool      show "+ Create" header action  default true
     showViewAllTemplates  bool      show "View all" footer button  default true
     onSelectTemplate      function  called with (template) on pick
     onCreateTemplate      function  called when "+ Create" clicked
     onViewAllTemplates    function  called when "View all" clicked
   Description supports [bracketed slots] which render in violet.

   Animated placeholder — two-slot technique (matches reference design)
   ─────────────────────────────────────────────────────────────────────────
   Two absolutely-positioned spans sit inside an overflow:hidden wrapper.
   One is always `visible` (translateY 0), one is always off-screen.
   On each cycle:
     1. Next slot text is set, class snapped to `hidden-down` (no transition)
     2. Force reflow (offsetHeight read)
     3. Current → `hidden-up`, Next → `visible` (both animate 600ms ease-in-out)
   Matches: tekiondesignteam.github.io/design-experimentations/archive/ai4-home.html

   Border animation / Mobile layout / Focus-loop fix
   ─────────────────────────────────────────────────────────────────────────
   Unchanged from original.
   ========================================================================== */

const _DEFAULT_PH = [
  'Ask anything or press "/" for shortcuts',
  'Summarize my open pipeline...',
  'Draft a follow-up for the Accord deal...',
  'Which leads are highest priority this week?',
  'Show me deals closing this month...',
  'What should I focus on today?',
];

const _DEFAULT_TEMPLATES = [
  {
    command: '/approve-pending-deals',
    icon: 'tag',
    description: 'CRM  ·  Review and approve deals pending under [salesperson] or [deal type].',
  },
  {
    command: '/check-lead-response-time',
    icon: 'clock-counter-clockwise',
    description: 'CRM  ·  Analyze response time for [team/salesperson] over [time period].',
  },
  {
    command: '/find-stuck-deals',
    icon: 'tag',
    description: 'CRM  ·  Detect deals not progressed in the last [time duration].',
  },
  {
    command: '/trade-in-value',
    icon: 'chart-line-up',
    description: 'CRM  ·  Based on current market factors determine the trade-in value of [Item] using [Model].',
  },
  {
    command: '/view-likely-closures-today',
    icon: 'arrows-left-right',
    description: 'CRM  ·  Show deals likely to close by [time] today.',
  },
];

const _renderTplDesc = (text) =>
  String(text || '').split(/(\[[^\]]+\])/g).map((part, i) =>
    /^\[[^\]]+\]$/.test(part)
      ? <span key={i} className="t1-pi__tpl-slot">{part}</span>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );

const PromptInput = ({
  placeholder    = 'Ask anything or press "/" for shortcuts',
  placeholders,
  placeholderInterval = 3000,
  mobile         = false,
  disabled       = false,
  loading        = false,
  showSearchChip = false,
  templates             = _DEFAULT_TEMPLATES,
  templatesTitle        = 'Prompt Templates',
  showCreateTemplate    = true,
  showViewAllTemplates  = true,
  onSelectTemplate,
  onCreateTemplate,
  onViewAllTemplates,
  onSend,
  onAttach,
  onMic,
  onSearchChip,
  className,
  ...rest
}) => {
  const [value,   setValue]   = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [templatesOpen, setTemplatesOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(0);
  const textareaRef = React.useRef(null);
  const rootRef = React.useRef(null);
  const transitioning = React.useRef(false);

  /* ── Slash-command templates menu ────────────────────────────────────── */
  const startsWithSlash = value.startsWith('/');
  const showTemplates   = templatesOpen && startsWithSlash;
  const tplQuery        = startsWithSlash ? value.slice(1).toLowerCase() : '';
  const filteredTemplates = startsWithSlash
    ? templates.filter((t) => {
        const cmd  = (t.command || '').toLowerCase().replace(/^\//, '');
        const desc = (t.description || '').toLowerCase();
        return cmd.includes(tplQuery) || desc.includes(tplQuery);
      })
    : [];

  /* Reset highlight whenever the filtered list changes shape */
  React.useEffect(() => { setHighlighted(0); }, [tplQuery, showTemplates]);

  /* Close templates on outside click */
  React.useEffect(() => {
    if (!showTemplates) return;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setTemplatesOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showTemplates]);

  const handleSelectTemplate = (tpl) => {
    if (!tpl) return;
    setValue(tpl.command + ' ');
    setTemplatesOpen(false);
    setHighlighted(0);
    if (onSelectTemplate) onSelectTemplate(tpl);
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleCloseTemplates = () => {
    setValue('');
    setTemplatesOpen(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  /* ── Two-slot animated placeholder ──────────────────────────────────── */
  const phList    = placeholders || _DEFAULT_PH;
  const slot1Ref  = React.useRef(null);
  const slot2Ref  = React.useRef(null);
  const activeRef = React.useRef(1); /* which slot is currently 'visible' */
  const phIdxRef  = React.useRef(0); /* index of the NEXT text to show    */

  /* Hide the overlay when the field has content or is focused */
  const showPh = value === '' && !focused;

  React.useEffect(() => {
    if (phList.length <= 1) return;

    /* Initialise slot 2 with the second placeholder text, hidden below */
    if (slot2Ref.current) {
      slot2Ref.current.textContent = phList[1 % phList.length];
    }

    const loop = setInterval(() => {
      const curr = activeRef.current === 1 ? slot1Ref.current : slot2Ref.current;
      const next = activeRef.current === 1 ? slot2Ref.current : slot1Ref.current;
      if (!curr || !next) return;

      /* Advance index */
      phIdxRef.current = (phIdxRef.current + 1) % phList.length;

      /* 1. Snap next slot to bottom with no transition */
      next.textContent = phList[phIdxRef.current];
      next.className   = 't1-pi__ph-item t1-pi__ph-item--no-transition t1-pi__ph-item--down';

      /* 2. Force reflow so the browser registers the initial position */
      /* eslint-disable-next-line no-unused-expressions */
      next.offsetHeight;

      /* 3. Animate: current exits upward, next enters from below */
      next.className = 't1-pi__ph-item t1-pi__ph-item--visible';
      curr.className = 't1-pi__ph-item t1-pi__ph-item--up';

      activeRef.current = activeRef.current === 1 ? 2 : 1;
    }, placeholderInterval);

    return () => clearInterval(loop);
  }, [phList, placeholderInterval]);

  /* ── Core input logic (unchanged) ─────────────────────────────────── */
  const isActive = focused || value.length > 0;
  const canSend  = value.trim().length > 0 && !disabled && !loading;

  const autoResize = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  const handleChange  = (e) => {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    autoResize(e.target);
    /* Open menu when "/" newly appears at start; close when it leaves */
    if (next.startsWith('/') && !prev.startsWith('/')) setTemplatesOpen(true);
    else if (!next.startsWith('/') && prev.startsWith('/')) setTemplatesOpen(false);
  };
  const handleKeyDown = (e) => {
    if (showTemplates) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setTemplatesOpen(false);
        return;
      }
      if (filteredTemplates.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setHighlighted((h) => (h + 1) % filteredTemplates.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setHighlighted((h) => (h - 1 + filteredTemplates.length) % filteredTemplates.length);
          return;
        }
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSelectTemplate(filteredTemplates[highlighted]);
          return;
        }
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };
  const handleSend = () => {
    if (!canSend) return;
    onSend && onSend(value);
    setValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };
  const handleFocus = () => {
    transitioning.current = true;
    setFocused(true);
    setTimeout(() => { transitioning.current = false; }, 200);
  };
  const handleBlur = () => { if (!transitioning.current) setFocused(false); };

  React.useEffect(() => {
    if (!mobile || !isActive) return;
    const t = setTimeout(() => { if (textareaRef.current) textareaRef.current.focus(); }, 10);
    return () => clearTimeout(t);
  }, [mobile, isActive]);

  /* ── Sub-components (unchanged) ────────────────────────────────────── */
  const AttachBtn = () => (
    <button className="t1-pi__icon-btn" onClick={onAttach} aria-label="Attach file" type="button">
      <i className="ph ph-plus t1-pi__icon-btn-icon" aria-hidden="true" />
    </button>
  );
  const MicBtn = () => (
    <button className="t1-pi__icon-btn" onClick={onMic} aria-label="Voice input" type="button">
      <i className="ph ph-microphone t1-pi__icon-btn-icon" aria-hidden="true" />
    </button>
  );
  const SendBtn = ({ lg = false }) => (
    <button
      className={['t1-pi__send', canSend && 't1-pi__send--enabled', lg && 't1-pi__send--lg'].filter(Boolean).join(' ')}
      onClick={handleSend} disabled={!canSend} aria-label="Send message" type="button"
    >
      <i className={['ph ph-arrow-up t1-pi__send-icon', canSend && 't1-pi__send-icon--active'].filter(Boolean).join(' ')} aria-hidden="true" />
    </button>
  );
  const SearchChipEl = () => (
    <Chip variant="soft" color="primary" size="md" startIcon="search" endIcon="x" onClick={onSearchChip}>
      Search
    </Chip>
  );

  /* ── Templates popover ────────────────────────────────────────────────── */
  const TemplatesPanel = () => {
    if (!showTemplates) return null;
    const isEmpty = filteredTemplates.length === 0;
    /* Keep textarea focus on panel interactions */
    const keepFocus = (e) => e.preventDefault();
    return (
      <div
        className={['t1-pi__templates', isEmpty && 't1-pi__templates--empty'].filter(Boolean).join(' ')}
        role="listbox"
        aria-label={templatesTitle}
        onMouseDown={keepFocus}
      >
        <div className="t1-pi__templates-header">
          <span className="t1-pi__templates-title">{templatesTitle}</span>
          <div className="t1-pi__templates-header-actions">
            {showCreateTemplate && !isEmpty && (
              <button
                type="button"
                className="t1-pi__templates-action"
                onClick={() => { if (onCreateTemplate) onCreateTemplate(); }}
              >
                <i className="ph ph-plus t1-pi__templates-action-icon" aria-hidden="true" />
                <span>Create</span>
              </button>
            )}
            <button
              type="button"
              className="t1-pi__templates-close"
              onClick={handleCloseTemplates}
              aria-label="Close prompt templates"
            >
              <i className="ph ph-x" aria-hidden="true" />
            </button>
          </div>
        </div>

        {isEmpty ? (
          <div className="t1-pi__templates-empty-body">
            <div className="t1-pi__templates-empty-icon">
              <i className="ph ph-sparkle" aria-hidden="true" />
            </div>
            <div className="t1-pi__templates-empty-content">
              <div className="t1-pi__templates-empty-title">No Results</div>
              <div className="t1-pi__templates-empty-subtitle">
                No prompt templates available for this search
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="t1-pi__templates-list">
              {filteredTemplates.map((tpl, idx) => (
                <button
                  key={tpl.command}
                  type="button"
                  role="option"
                  aria-selected={idx === highlighted}
                  className={[
                    't1-pi__templates-item',
                    idx === highlighted && 't1-pi__templates-item--active',
                  ].filter(Boolean).join(' ')}
                  onMouseEnter={() => setHighlighted(idx)}
                  onClick={() => handleSelectTemplate(tpl)}
                >
                  {tpl.icon && (
                    <i className={`ph ph-${tpl.icon} t1-pi__templates-item-icon`} aria-hidden="true" />
                  )}
                  <div className="t1-pi__templates-item-content">
                    <div className="t1-pi__templates-item-title">{tpl.command}</div>
                    <div className="t1-pi__templates-item-desc">
                      {_renderTplDesc(tpl.description)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {showViewAllTemplates && (
              <div className="t1-pi__templates-footer">
                <div className="t1-pi__templates-divider" />
                <button
                  type="button"
                  className="t1-pi__templates-viewall"
                  onClick={() => {
                    if (onViewAllTemplates) onViewAllTemplates();
                    setTemplatesOpen(false);
                  }}
                >
                  View all
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  /* The two-slot placeholder overlay — always rendered, hidden via opacity */
  const PhSlots = ({ inlineRow }) => (
    <div
      className={`t1-pi__ph-wrap${inlineRow ? ' t1-pi__ph-wrap--inline' : ''}${showPh ? '' : ' t1-pi__ph-wrap--hidden'}`}
      aria-hidden="true"
    >
      <span ref={slot1Ref} className="t1-pi__ph-item t1-pi__ph-item--visible">
        {phList[0]}
      </span>
      <span ref={slot2Ref} className="t1-pi__ph-item t1-pi__ph-item--down">
        {phList[1] || ''}
      </span>
    </div>
  );

  /* ── Mobile collapsed (UNCHANGED DOM structure) ─────────────────────── */
  if (mobile && !isActive) {
    return (
      <div
        ref={rootRef}
        className={['t1-pi', 't1-pi--mobile', 't1-pi--mobile-row', disabled && 't1-pi--disabled', className].filter(Boolean).join(' ')}
        {...rest}
      >
        <AttachBtn />
        <div className="t1-pi__input-wrap">
          <textarea
            ref={textareaRef}
            className="t1-pi__textarea t1-pi__textarea--inline"
            placeholder=""
            value={value}
            rows={1}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
          <PhSlots inlineRow />
        </div>
        <MicBtn />
        <SendBtn lg />
      </div>
    );
  }

  /* ── Desktop / mobile-expanded (UNCHANGED DOM structure) ────────────── */
  const rootClass = [
    't1-pi',
    isActive  && 't1-pi--active',
    loading   && 't1-pi--loading',
    disabled  && 't1-pi--disabled',
    mobile    && 't1-pi--mobile',
    mobile    && 't1-pi--mobile-expanded',
    showTemplates && 't1-pi--templates-open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={rootRef} className={rootClass} {...rest}>
      <TemplatesPanel />
      <textarea
        ref={textareaRef}
        className="t1-pi__textarea"
        placeholder=""
        value={value}
        rows={1}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <PhSlots />
      <div className="t1-pi__toolbar">
        <div className="t1-pi__toolbar-left">
          <AttachBtn />
          {showSearchChip && <SearchChipEl />}
        </div>
        <div className="t1-pi__toolbar-right">
          <MicBtn />
          <SendBtn lg={mobile} />
        </div>
      </div>
    </div>
  );
};
