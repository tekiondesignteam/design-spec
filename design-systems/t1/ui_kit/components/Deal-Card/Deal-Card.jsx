/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DEAL-CARD
   BEM prefix: t1-dc

   Props
   ─────────────────────────────────────────────────────────────────────────
   dealId        string    e.g. '#DEAL-001'             default '#DEAL-NO'
   vehicle       string    'Year Make Model Trim'       default placeholder
   salesperson   string    salesperson name             default placeholder
   purchaseType  string    e.g. 'Finance', 'Cash'       default placeholder
   status        string    deal status label            default placeholder
   lastUpdated   string    formatted date string        default placeholder
   onView        function  callback for View button
   className     string    extra class

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Button    — "View" CTA (size md, contained primary)
   Separator — horizontal rule between body and footer
   ========================================================================== */

const DealCard = ({
  dealId       = '#DEAL-NO',
  vehicle      = 'Year Make Model Trim',
  salesperson  = 'Sales person name',
  purchaseType = 'Purchase type',
  status       = 'Purchase status',
  lastUpdated  = 'MON DD, YYYY',
  onView,
  className,
  ...rest
}) => (
  <div className={['t1-dc', className].filter(Boolean).join(' ')} {...rest}>

    {/* ── Header ─────────────────────────────────────────────────────────── */}
    <div className="t1-dc__header">
      <div className="t1-dc__icon-block" aria-hidden="true">
        <i className="ph ph-car" />
      </div>
      <div className="t1-dc__deal-info">
        <div className="t1-dc__deal-id">{dealId}</div>
        <div className="t1-dc__vehicle">{vehicle}</div>
      </div>
    </div>

    {/* ── Container ──────────────────────────────────────────────────────── */}
    <div className="t1-dc__container">

      {/* Body — 3 fields */}
      <div className="t1-dc__body">
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Salesperson</div>
          <div className="t1-dc__field-value">{salesperson}</div>
        </div>
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Type</div>
          <div className="t1-dc__field-value">{purchaseType}</div>
        </div>
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Status</div>
          <div className="t1-dc__field-value">{status}</div>
        </div>
      </div>

      {/* Separator (kit) */}
      <Separator />

      {/* Footer — last updated + View button */}
      <div className="t1-dc__footer">
        <div className="t1-dc__field">
          <div className="t1-dc__field-label">Last Updated</div>
          <div className="t1-dc__field-value">{lastUpdated}</div>
        </div>
        <Button size="md" onClick={onView}>View</Button>
      </div>

    </div>
  </div>
);
