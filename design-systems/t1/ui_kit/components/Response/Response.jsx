/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   RESPONSE  (Figma: aiT1Response)
   BEM prefix: t1-response

   Props
   ─────────────────────────────────────────────────────────────────────────
   title         string      summary/title line   (body2Medium 14/500/20)
   children      ReactNode   body text            (body2Regular 14/400/16)
   orderedList   string[]    numbered list items
   unorderedList string[]    bullet list items
   contentSlot   ReactNode   custom card slot (dashed border)
   showFeedback  boolean     render FeedbackAction row    default true
   filterCount   number      passed to FeedbackAction     default 2
   sourceCount   number      passed to FeedbackAction     default 2
   showFilter    boolean                                  default true
   showSource    boolean                                  default true
   filterItems   string[]    filter labels in modal       optional
   sourceItems   string[]    source labels in modal       optional
   onFilterClick function    override filter chip click   optional
   onSourceClick function    override source chip click   optional
   responseText  string    plain-text copy of the response; if omitted,
                           Response assembles it from title + children +
                           orderedList + unorderedList automatically.
   onCopy / onThumbUp / onThumbDown / onMore / onRegenerate  callbacks
   className     string

   Layout (Figma tokens)
   ─────────────────────────────────────────────────────────────────────────
   root          flex-col · gap 12px · padding-left 24px · min-width 160px
   __main        flex-col · gap 4px
   __header      flex-col · gap 0
   __title       body2Medium  14px / 500 / 20px lh · color #161616
   __body-text   body2Regular 14px / 400 / 16px lh · color #161616
   ========================================================================== */

const Response = ({
  title,
  children,
  orderedList,
  unorderedList,
  contentSlot,
  showFeedback  = true,
  filterCount   = 2,
  sourceCount   = 2,
  showFilter    = true,
  showSource    = true,
  filterItems,
  sourceItems,
  onFilterClick,
  onSourceClick,
  responseText: responseTextProp,
  onCopy,
  onThumbUp,
  onThumbDown,
  onMore,
  onRegenerate,
  className,
  ...rest
}) => {
  /* Build plain text for clipboard if consumer didn't provide it explicitly */
  const responseText = responseTextProp || (() => {
    const parts = [];
    if (title) parts.push(title);
    if (typeof children === 'string') parts.push(children);
    if (orderedList  && orderedList.length)  parts.push(orderedList.map((t, i) => `${i + 1}. ${t}`).join('\n'));
    if (unorderedList && unorderedList.length) parts.push(unorderedList.map(t => `• ${t}`).join('\n'));
    return parts.join('\n');
  })();

  return (
  <div className={['t1-response', className].filter(Boolean).join(' ')} {...rest}>

    {/* ── Main content ─────────────────────────────────────────────────── */}
    <div className="t1-response__main">
      <div className="t1-response__header">
        {title    && <div className="t1-response__title">{title}</div>}
        {children && <div className="t1-response__body-text">{children}</div>}
      </div>

      {/* Ordered list */}
      {orderedList && orderedList.length > 0 && (
        <div className="t1-response__list">
          <ol>
            {orderedList.map((item, i) => <li key={i}>{item}</li>)}
          </ol>
        </div>
      )}

      {/* Unordered list */}
      {unorderedList && unorderedList.length > 0 && (
        <div className="t1-response__list">
          <ul>
            {unorderedList.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>

    {/* ── Content slot (dashed violet border) ──────────────────────────── */}
    {contentSlot && (
      <div className="t1-response__slot">{contentSlot}</div>
    )}

    {/* ── Feedback action row ───────────────────────────────────────────── */}
    {showFeedback && (
      <FeedbackAction
        filterCount={filterCount}
        sourceCount={sourceCount}
        showFilter={showFilter}
        showSource={showSource}
        filterItems={filterItems}
        sourceItems={sourceItems}
        onFilterClick={onFilterClick}
        onSourceClick={onSourceClick}
        responseText={responseText}
        onCopy={onCopy}
        onThumbUp={onThumbUp}
        onThumbDown={onThumbDown}
        onMore={onMore}
        onRegenerate={onRegenerate}
      />
    )}

  </div>
  );
};
