/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   LISTING-CARD  (Figma: aiT1ListingCard)
   Vertical list card — 1–N stacked item rows separated by 1px dividers.

   Figma ref : T1-Components
   BEM prefix: t1-lc

   Figma variants
   ─────────────────────────────────────────────────────────────────────────
   count=1–5  × expanded=true  → full width, avatar prefix shown per row
   count=1–5  × expanded=false → compact width, no avatar prefix

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Avatar — type="letter" variant="square" size="lg"
            40×40, border-radius 2px, bg #edeef0, text #6d707a
   Chip   — variant="soft" color="primary" size="md"
            24px pill, bg #ebf4ff, text #3373dd

   Props (ListingCard root)
   ─────────────────────────────────────────────────────────────────────────
   items      object[]   Array of item row data (see below)  []
   expanded   bool       Show avatar prefix per row          true
   onItemClick fn(item, idx)  Row click callback             undefined
   className  string

   Each item object (all fields optional)
   ─────────────────────────────────────────────────────────────────────────
   initials     string   2-char avatar label          'CN'
   title        string   Primary name / title         ''
   id           string   Secondary ID (e.g. '#123')   ''
   chip         string   Chip label text              undefined
   chipColor    string   Chip color prop              'primary'
   subtitle1    string   First subtitle               ''
   subtitle2    string   Second subtitle (no dot)     ''
   description  string   Third text line              ''
   suffixLabel  string   Right-side label (muted)     ''
   suffixDetail string   Right-side detail (bold)     ''
   ========================================================================== */

const ListingCard = ({
  items       = [],
  expanded    = true,
  onItemClick,
  className,
  ...rest
}) => {
  const rootCls = ['t1-lc', className].filter(Boolean).join(' ');

  return (
    <div className={rootCls} {...rest}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="t1-lc__divider" />}

          <div
            className="t1-lc__item"
            onClick={() => onItemClick && onItemClick(item, i)}
            style={onItemClick ? { cursor: 'pointer' } : undefined}
          >
            {/* ── Avatar prefix (expanded only) ──────────────────────────── */}
            {expanded && (
              <Avatar
                type="letter"
                variant="square"
                size="lg"
                initials={item.initials || 'CN'}
                className="t1-lc__avatar"
              />
            )}

            {/* ── Body: info + suffix ────────────────────────────────────── */}
            <div className="t1-lc__body">

              {/* Info column */}
              <div className="t1-lc__info">

                {/* nameId row: Title · #ID · Chip */}
                <div className="t1-lc__nameid">
                  {item.title && (
                    <span className="t1-lc__title">{item.title}</span>
                  )}
                  {item.id && (
                    <span className="t1-lc__id">{item.id}</span>
                  )}
                  {item.chip && (
                    <Chip
                      variant="soft"
                      color={item.chipColor || 'primary'}
                      size="md"
                    >
                      {item.chip}
                    </Chip>
                  )}
                </div>

                {/* Subtitles row: Subtitle1 • Subtitle2 */}
                {(item.subtitle1 || item.subtitle2) && (
                  <div className="t1-lc__subtitles">
                    {item.subtitle1 && (
                      <span className="t1-lc__subtitle-group">
                        <span className="t1-lc__sub">{item.subtitle1}</span>
                        {item.subtitle2 && <span className="t1-lc__dot" />}
                      </span>
                    )}
                    {item.subtitle2 && (
                      <span className="t1-lc__sub">{item.subtitle2}</span>
                    )}
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <div className="t1-lc__desc">{item.description}</div>
                )}

              </div>{/* /info */}

              {/* Suffix column: Label + Detail (right-aligned) */}
              {(item.suffixLabel || item.suffixDetail) && (
                <div className="t1-lc__suffix">
                  {item.suffixLabel && (
                    <span className="t1-lc__suffix-label">{item.suffixLabel}</span>
                  )}
                  {item.suffixDetail && (
                    <span className="t1-lc__suffix-detail">{item.suffixDetail}</span>
                  )}
                </div>
              )}

            </div>{/* /body */}
          </div>{/* /item */}
        </React.Fragment>
      ))}
    </div>
  );
};
