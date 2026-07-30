/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   QUOTE  (Figma: aiT1MessageQuote)
   BEM prefix: t1-quote

   Props
   ─────────────────────────────────────────────────────────────────────────
   children   string / node   Quote text content          required
   className  string          Extra classes               optional

   Layout
   ─────────────────────────────────────────────────────────────────────────
   [2px bar — full height]  [content: italic medium text]

   No kit primitives needed — purely structural
   ========================================================================== */

const Quote = ({
  children,
  className,
  ...rest
}) => (
  <div
    className={['t1-quote', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {/* ── 2px left status bar — self-stretch fills full container height ── */}
    <div className="t1-quote__bar-wrap" aria-hidden="true">
      <div className="t1-quote__bar" />
    </div>

    {/* ── Quote text ──────────────────────────────────────────────────── */}
    <div className="t1-quote__content">
      <p className="t1-quote__text">{children}</p>
    </div>
  </div>
);
