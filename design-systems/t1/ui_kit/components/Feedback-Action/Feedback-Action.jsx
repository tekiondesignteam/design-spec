/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   FEEDBACK-ACTION  (Figma: aiT1FeedbackAction)
   BEM prefix: t1-fa

   Props
   ─────────────────────────────────────────────────────────────────────────
   filterCount     number    badge count on filter chip          default 2
   sourceCount     number    badge count on sources chip         default 2
   showFilter      bool      show filter chip                    default true
   showSource      bool      show sources chip                   default true

   responseText    string    plain text of the response; used by the copy
                             button (navigator.clipboard) and shown as
                             tooltip label while copying.

   filterItems     string[]  filter labels shown in modal when chip clicked
   sourceItems     string[]  source labels shown in modal when chip clicked

   onFilterClick   function  override filter chip click (skips built-in modal)
   onSourceClick   function  override source chip click (skips built-in modal)

   onCopy          function  called after copy (in addition to clipboard write)
   onThumbUp       function  called with (active: bool)
   onThumbDown     function  called with (active: bool)
   onMore          function  called when ⋯ is clicked
   onRegenerate    function  called when regenerate is clicked
   className       string    optional extra class

   Tooltips
   ─────────────────────────────────────────────────────────────────────────
   Every icon button is wrapped in .t1-fa__tip[data-tip="…"].
   The tooltip appears centered above the button on hover/focus.

   Copy behaviour
   ─────────────────────────────────────────────────────────────────────────
   If responseText is provided → writes to navigator.clipboard, then calls
   onCopy (if supplied).  Falls back to onCopy-only when clipboard API is
   unavailable.  Shows check icon for 2 s then resets.

   Chip interaction
   ─────────────────────────────────────────────────────────────────────────
   If onFilterClick / onSourceClick is supplied → call it.
   Otherwise → open built-in Modal.

   State machines
   ─────────────────────────────────────────────────────────────────────────
   thumbUp / thumbDown  — mutually exclusive toggles (regular ↔ fill icon)
   copy                 — click → 2 s "copied" state (check icon) → reset
   filterModal / sourceModal — open while viewing details
   ========================================================================== */

const FeedbackAction = ({
  filterCount   = 2,
  sourceCount   = 2,
  showFilter    = true,
  showSource    = true,

  responseText,

  filterItems,
  sourceItems,
  onFilterClick,
  onSourceClick,

  onCopy,
  onThumbUp,
  onThumbDown,
  onMore,
  onRegenerate,
  className,
  ...rest
}) => {
  const [thumbUp,    setThumbUp]    = React.useState(false);
  const [thumbDown,  setThumbDown]  = React.useState(false);
  const [copied,     setCopied]     = React.useState(false);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [sourceOpen, setSourceOpen] = React.useState(false);

  /* ── Action handlers ─────────────────────────────────────────────────── */
  const handleThumbUp = () => {
    const next = !thumbUp;
    setThumbUp(next);
    if (next) setThumbDown(false);
    onThumbUp && onThumbUp(next);
  };

  const handleThumbDown = () => {
    const next = !thumbDown;
    setThumbDown(next);
    if (next) setThumbUp(false);
    onThumbDown && onThumbDown(next);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  };

  const handleCopy = () => {
    if (copied) return;
    const text = responseText || '';
    if (text) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    }
    setCopied(true);
    onCopy && onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  /* ── Chip handlers ───────────────────────────────────────────────────── */
  const handleFilterChip = () => {
    if (onFilterClick) { onFilterClick(); return; }
    setFilterOpen(true);
  };

  const handleSourceChip = () => {
    if (onSourceClick) { onSourceClick(); return; }
    setSourceOpen(true);
  };

  const handleChipKey = (handler) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
  };

  /* ── Default modal items ─────────────────────────────────────────────── */
  const defaultFilterItems = filterItems || Array.from({ length: filterCount }, (_, i) => `Filter ${i + 1}`);
  const defaultSourceItems = sourceItems || Array.from({ length: sourceCount }, (_, i) => `Source ${i + 1}`);

  /* ── Tooltip wrapper ─────────────────────────────────────────────────── */
  const Tip = ({ label, children }) => (
    <div className="t1-fa__tip" data-tip={label}>
      {children}
    </div>
  );

  return (
    <>
      <div className={['t1-fa', className].filter(Boolean).join(' ')} {...rest}>

        {/* ── Action icon buttons ── */}
        <div className="t1-fa__actions">

          <Tip label="Helpful">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleThumbUp}
              aria-label="Helpful"
              aria-pressed={thumbUp}
              className={thumbUp ? 't1-fa__ibtn--active' : undefined}
            >
              <i className={`${thumbUp ? 'ph-fill ph-thumbs-up' : 'ph ph-thumbs-up'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="Not helpful">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleThumbDown}
              aria-label="Not helpful"
              aria-pressed={thumbDown}
              className={thumbDown ? 't1-fa__ibtn--active' : undefined}
            >
              <i className={`${thumbDown ? 'ph-fill ph-thumbs-down' : 'ph ph-thumbs-down'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="Regenerate">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={onRegenerate}
              aria-label="Regenerate"
            >
              <i className="ph ph-arrow-clockwise t1-fa__icon" aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label={copied ? 'Copied!' : 'Copy response'}>
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy response'}
            >
              <i className={`${copied ? 'ph ph-check' : 'ph ph-copy'} t1-fa__icon`} aria-hidden="true" />
            </IconButton>
          </Tip>

          <Tip label="More options">
            <IconButton
              color="inverse" style="contained" size="sm"
              onClick={onMore}
              aria-label="More options"
            >
              <i className="ph ph-dots-three-vertical t1-fa__icon" aria-hidden="true" />
            </IconButton>
          </Tip>

        </div>

        {/* ── Chips ── */}
        {(showFilter || showSource) && (
          <div className="t1-fa__chips">

            {showFilter && (
              <div
                className="t1-fa__chip"
                role="button"
                tabIndex={0}
                onClick={handleFilterChip}
                onKeyDown={handleChipKey(handleFilterChip)}
                aria-label={`${filterCount} filter${filterCount !== 1 ? 's' : ''} applied — click to view`}
                aria-haspopup="dialog"
              >
                <i className="ph ph-funnel t1-fa__chip-icon" aria-hidden="true" />
                <span className="t1-fa__chip-label">
                  <span className="t1-fa__chip-count">{filterCount}</span>
                  <span className="t1-fa__chip-text"> Filter{filterCount !== 1 ? 's' : ''} Applied</span>
                </span>
              </div>
            )}

            {showSource && (
              <div
                className="t1-fa__chip"
                role="button"
                tabIndex={0}
                onClick={handleSourceChip}
                onKeyDown={handleChipKey(handleSourceChip)}
                aria-label={`${sourceCount} source${sourceCount !== 1 ? 's' : ''} — click to view`}
                aria-haspopup="dialog"
              >
                <i className="ph ph-book-open t1-fa__chip-icon" aria-hidden="true" />
                <span className="t1-fa__chip-label">
                  <span className="t1-fa__chip-count">{sourceCount}</span>
                  <span className="t1-fa__chip-text"> Source{sourceCount !== 1 ? 's' : ''}</span>
                </span>
              </div>
            )}

          </div>
        )}
      </div>

      {/* ── Filters Modal ── */}
      <Modal
        open={filterOpen}
        title="Filters Applied"
        subtitle={`${filterCount} filter${filterCount !== 1 ? 's' : ''} were used to generate this response`}
        onClose={() => setFilterOpen(false)}
        secondaryLabel="Close"
        onSecondary={() => setFilterOpen(false)}
        width={480}
        scoped
      >
        <ul className="t1-fa__modal-list">
          {defaultFilterItems.map((item, i) => (
            <li key={i} className="t1-fa__modal-item"><span>{item}</span></li>
          ))}
        </ul>
      </Modal>

      {/* ── Sources Modal ── */}
      <Modal
        open={sourceOpen}
        title="Sources"
        subtitle={`${sourceCount} source${sourceCount !== 1 ? 's' : ''} were referenced to generate this response`}
        onClose={() => setSourceOpen(false)}
        secondaryLabel="Close"
        onSecondary={() => setSourceOpen(false)}
        width={480}
        scoped
      >
        <ul className="t1-fa__modal-list">
          {defaultSourceItems.map((item, i) => (
            <li key={i} className="t1-fa__modal-item"><span>{item}</span></li>
          ))}
        </ul>
      </Modal>
    </>
  );
};
