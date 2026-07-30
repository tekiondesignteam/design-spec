/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   DOCUMENT CARD  (Figma: aiT1DocumentCard)
   BEM prefix: t1-docc

   Kit components used
   ─────────────────────────────────────────────────────────────────────────
   Phi   — icon inside the icon block (size=24, weight="regular")
   Link  — action links (size="large", appearance="primary")
           override: .t1-docc .t1-link { font-weight:500; line-height:20px }

   Props
   ─────────────────────────────────────────────────────────────────────────
   title      string                      Card heading          'Title'
   icon       string                      Phosphor icon name    'file-text'
   subtitles  string[]                    Dot-separated labels  3 × 'subtitle'
   links      {label, href?, onClick}[]   Action links          2 links
   className  string                      Extra CSS class

   Anatomy
   ─────────────────────────────────────────────────────────────────────────
   .t1-docc
     .t1-docc__icon-block
       Phi (ph-{icon}, 24px, regular weight)
     .t1-docc__content
       .t1-docc__title
       .t1-docc__subtitle-row
         .t1-docc__subtitle-item  [× n]
           span.t1-docc__subtitle-text
           span.t1-docc__dot      (omitted on last item)
       .t1-docc__btn-group
         Link size="large"  [× n]
   ========================================================================== */

const DocumentCard = ({
  title     = 'Title',
  icon      = 'file-text',
  subtitles = ['subtitle', 'subtitle', 'subtitle'],
  links     = [
    { label: 'Button1' },
    { label: 'Button 2' },
  ],
  className,
  ...rest
}) => {

  const cls = ['t1-docc', className].filter(Boolean).join(' ');

  return (
    <div className={cls} {...rest}>

      {/* ── Icon block ──────────────────────────────────────────────────── */}
      {/* Phi is the kit wrapper for Phosphor icons (_core.jsx).            */}
      {/* size=24 matches Figma's aiT1IconBlock (48 × 48 container).        */}
      <div className="t1-docc__icon-block" aria-hidden="true">
        <Phi name={icon} size={24} weight="regular" />
      </div>

      {/* ── Content column ──────────────────────────────────────────────── */}
      <div className="t1-docc__content">

        {/* Title */}
        <div className="t1-docc__title">{title}</div>

        {/* Subtitle row — dot-separated items */}
        {subtitles && subtitles.length > 0 && (
          <div className="t1-docc__subtitle-row">
            {subtitles.map((text, i) => (
              <div key={i} className="t1-docc__subtitle-item">
                <span className="t1-docc__subtitle-text">{text}</span>
                {/* Dot separator after every item except the last */}
                {i < subtitles.length - 1 && (
                  <span className="t1-docc__dot" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Action links — use kit Link component (size="large" = 14px)    */}
        {links && links.length > 0 && (
          <div className="t1-docc__btn-group">
            {links.map((link, i) => (
              <Link
                key={i}
                href={link.href || '#'}
                size="large"
                appearance="primary"
                onClick={link.onClick}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
