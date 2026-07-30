import { useBrand } from '../../context/BrandContext'
import type { Brand } from '../../context/brand-constants'
import { Button } from './button'
import { IconButton } from './icon-button'
import chevroletVehicle from '../../../assets/vehicles/chevrolet-blazer-ev.png'
import cadillacVehicle from '../../../assets/vehicles/cadillac-escalade.png'
import buickVehicle from '../../../assets/vehicles/buick-envista.png'
import gmcVehicle from '../../../assets/vehicles/gmc-sierra-1500.png'

/* ----- Vehicle data per brand ------------------------------------------ */

type SpecItem = {
  icon: string
  label: string
  value: string
}

type ColorCallout = {
  label: string
  name: string
  fill: string
}

type QuickViewData = {
  status: string
  name: string
  trim: string
  vin: string
  dealership: string
  distance: string
  exterior: ColorCallout
  interior: ColorCallout
  specs: readonly SpecItem[]
  options: readonly string[]
  filledCtaLabel: string
  image: string
}

/* Spec icons: extracted from Figma source (`get_design_context` on node 1:2054)
   on 2026-05-08, cleaned (presentational attrs stripped, fill set to currentColor
   for theming, non-square engine + transmission padded to 40x40 viewBox), and
   added to `assets/icons/chevy/` + `styles/icons.css`. Mirrors Figma 1:1. */
const SPECS_BASE: readonly SpecItem[] = [
  { icon: 'engine',         label: 'Engine',        value: 'Integral drive unit with electric motor' },
  { icon: 'battery-range',  label: 'Battery Range', value: '279 mi' },
  { icon: 'transmission',   label: 'Transmission',  value: '1-Speed A/T' },
  { icon: 'seats',          label: 'Seats',         value: '5 Seater' },
]

const OPTIONS_BASE: readonly string[] = [
  'Winter/Summer Floor Mats Package - $299',
  'Driver Confidence II Package - $219',
  'Interior Protection Package - $149',
]

const VEHICLES: Record<Brand, QuickViewData> = {
  chevrolet: {
    status: 'Available Now',
    name: '2025 Blazer EV',
    trim: 'SS, AWD',
    vin: '3G1FJ3456L1234575',
    dealership: 'Riverside Chevrolet',
    distance: '(24 miles)',
    exterior: { label: 'Exterior', name: 'Radiant Red Tintcoat',  fill: '#7d1f1f' },
    interior: { label: 'Interior', name: 'Adrenaline Red',        fill: '#5a1414' },
    specs: SPECS_BASE,
    options: OPTIONS_BASE,
    filledCtaLabel: 'View & Buy',
    image: chevroletVehicle,
  },
  cadillac: {
    status: 'Available Now',
    name: '2025 Escalade',
    trim: 'Sport, AWD',
    vin: '1GYS4BKL9RR119426',
    dealership: 'Dublin Cadillac',
    distance: '(24 miles)',
    exterior: { label: 'Exterior', name: 'Crystal White Tricoat',                 fill: '#e8e8e6' },
    interior: { label: 'Interior', name: 'Cirrus leather seating surfaces wi…',   fill: '#bda988' },
    specs: SPECS_BASE,
    options: OPTIONS_BASE,
    filledCtaLabel: 'View Details',
    image: cadillacVehicle,
  },
  buick: {
    status: 'Available Now',
    name: '2025 Envista',
    trim: 'ST, AWD',
    vin: '3G1FJ3456L1234575',
    dealership: 'Folsom Buick GMC',
    distance: '(24 miles)',
    exterior: { label: 'Exterior', name: 'Smokey Amethyst Metallic',  fill: '#5d4754' },
    interior: { label: 'Interior', name: 'Ebony with Ebony Accents',  fill: '#161616' },
    specs: SPECS_BASE,
    options: OPTIONS_BASE,
    filledCtaLabel: 'View Details',
    image: buickVehicle,
  },
  gmc: {
    status: 'Available Now',
    name: '2025 Sierra 1500',
    trim: 'Pro, AWD',
    vin: '1GNGK26J6VJ343327',
    dealership: 'GMC of Vacaville',
    distance: '(24 miles)',
    exterior: { label: 'Exterior', name: 'Graphite Blue Metallic',           fill: '#1f2a3c' },
    interior: { label: 'Interior', name: 'Light Platinum/Dark Galvanized',   fill: '#2a2f33' },
    specs: SPECS_BASE,
    options: OPTIONS_BASE,
    filledCtaLabel: 'View Details',
    image: gmcVehicle,
  },
}

/* ----- Molecule -------------------------------------------------------- */

type VSRQuickViewProps = {
  data: QuickViewData
  /** Static index of the active pagination dot (carousel is non-functional in
   *  the doc demo, mirroring vsr-card's static showcase pattern). */
  activeImageIndex?: number
  imageCount?: number
}

function VSRQuickView({ data, activeImageIndex = 1, imageCount = 6 }: VSRQuickViewProps) {
  const dots = Array.from({ length: imageCount }, (_, i) => i)
  return (
    <div className="drp-vsr-quick-view" role="dialog" aria-label={`${data.name} ${data.trim} quick view`}>
      {/* Top-right close X — atomic IconButton variant=plain (no button border)
          + circle-close icon glyph (the visible circle is part of the SVG). */}
      <IconButton
        ariaLabel="Close quick view"
        shape="circle"
        size="small"
        variant="plain"
        className="drp-vsr-quick-view__close"
        tabIndex={-1}
        onClick={(e) => e.preventDefault()}
      >
        <i className="drp-icon drp-icon--circle-close" aria-hidden="true" />
      </IconButton>

      {/* Left column: gallery + color callouts */}
      <div className="drp-vsr-quick-view__media">
        <div className="drp-vsr-quick-view__gallery">
          <IconButton
            ariaLabel="Previous image"
            shape="circle"
            size="small"
            variant="plain"
            className="drp-vsr-quick-view__nav-prev"
            tabIndex={-1}
            onClick={(e) => e.preventDefault()}
          >
            <i className="drp-icon drp-icon--circle-arrow-left" aria-hidden="true" />
          </IconButton>
          <div className="drp-vsr-quick-view__hero">
            <img src={data.image} alt={`${data.name} ${data.trim}`} />
          </div>
          <IconButton
            ariaLabel="Next image"
            shape="circle"
            size="small"
            variant="plain"
            className="drp-vsr-quick-view__nav-next"
            tabIndex={-1}
            onClick={(e) => e.preventDefault()}
          >
            <i className="drp-icon drp-icon--circle-arrow-right" aria-hidden="true" />
          </IconButton>
          <div className="drp-vsr-quick-view__dots" role="tablist" aria-label="Image gallery position">
            {dots.map((i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === activeImageIndex}
                className={`drp-vsr-quick-view__dot${i === activeImageIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Captioned color callouts (NET NEW — future Swatch atom candidate per S27) */}
        <div className="drp-vsr-quick-view__color-row">
          <div className="drp-vsr-quick-view__color-callout">
            <span
              className="drp-vsr-quick-view__color-swatch"
              style={{ background: data.exterior.fill }}
              aria-hidden="true"
            />
            <div className="drp-vsr-quick-view__color-meta">
              <span className="drp-vsr-quick-view__color-label">{data.exterior.label}</span>
              <span className="drp-vsr-quick-view__color-name">{data.exterior.name}</span>
            </div>
          </div>
          <div className="drp-vsr-quick-view__color-callout">
            <span
              className="drp-vsr-quick-view__color-swatch"
              style={{ background: data.interior.fill }}
              aria-hidden="true"
            />
            <div className="drp-vsr-quick-view__color-meta">
              <span className="drp-vsr-quick-view__color-label">{data.interior.label}</span>
              <span className="drp-vsr-quick-view__color-name">{data.interior.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right column: identity + specs + options + CTAs */}
      <div className="drp-vsr-quick-view__info">
        {/* Identity panel (gray block) */}
        <div className="drp-vsr-quick-view__identity">
          <div className="drp-vsr-quick-view__name-block">
            <h2 className="drp-vsr-quick-view__title">
              <span className="drp-vsr-quick-view__title-line">{data.name}</span>
              <span className="drp-vsr-quick-view__title-line">{data.trim}</span>
            </h2>
            <span className="drp-vsr-quick-view__vin">VIN: {data.vin}</span>
          </div>
          <div className="drp-vsr-quick-view__status-block">
            <span className="drp-vsr-quick-view__status">{data.status}</span>
            <span className="drp-vsr-quick-view__dealership">
              {data.dealership}
              <span className="drp-vsr-quick-view__distance">{data.distance}</span>
            </span>
          </div>
        </div>

        {/* Specs grid (NET NEW — future SpecItem atom candidate per S27) */}
        <div className="drp-vsr-quick-view__specs">
          {data.specs.map((spec) => (
            <div key={spec.label} className="drp-vsr-quick-view__spec-item">
              <div className="drp-vsr-quick-view__spec-icon">
                <i className={`drp-icon drp-icon--${spec.icon}`} aria-hidden="true" />
              </div>
              <div className="drp-vsr-quick-view__spec-text">
                <span className="drp-vsr-quick-view__spec-label">{spec.label}</span>
                <span className="drp-vsr-quick-view__spec-value">{spec.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key Installed Options (NET NEW) */}
        <div>
          <h3 className="drp-vsr-quick-view__options-heading">Key Installed Options</h3>
          <ul className="drp-vsr-quick-view__options-list" style={{ marginTop: 12 }}>
            {data.options.map((opt) => (
              <li key={opt} className="drp-vsr-quick-view__options-item">{opt}</li>
            ))}
          </ul>
        </div>

        {/* CTA row (atomic Buttons) */}
        <div className="drp-vsr-quick-view__cta-row">
          <Button size="large" variant="outlined" tabIndex={-1} onClick={(e) => e.preventDefault()}>
            <i className="drp-icon drp-icon--heart drp-vsr-quick-view__favorite-icon" aria-hidden="true" />
            Add to Favorites
          </Button>
          <Button size="large" variant="filled" tabIndex={-1} onClick={(e) => e.preventDefault()}>
            {data.filledCtaLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ----- Token table data ------------------------------------------------ */

const TOKEN_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ['--vsr-quick-view-bg',                 'Card surface fill',                                  '#ffffff'],
  ['--vsr-quick-view-radius',             'Outer corner radius (GMC + Cadillac flatten to 0)',  '16px'],
  ['--vsr-quick-view-padding',            'Outer padding',                                      '24px'],
  ['--vsr-quick-view-col-gap',            'Gap between media + info columns',                   '24px'],
  ['--vsr-quick-view-row-gap',            'Vertical gap between info sections',                 '20px'],
  ['--vsr-quick-view-divider-color',      'Hairline color for internal dividers',               '#e6e6e6'],
  ['--vsr-quick-view-text-primary',       'Title / spec value / option text',                   '#262626 (Buick #222, GMC #060505, Cadillac #282828)'],
  ['--vsr-quick-view-text-secondary',     'VIN / status / "Exterior" / "Interior" labels',      '#666666'],
  ['--vsr-quick-view-identity-bg',        'Identity panel background',                          '#f5f5f5'],
  ['--vsr-quick-view-identity-padding',   'Identity panel inner padding',                       '16px'],
  ['--vsr-quick-view-identity-radius',    'Identity panel radius (flat on GMC + Cadillac)',     '8px'],
  ['--vsr-quick-view-spec-icon-size',     'Spec icon container size',                           '32px'],
  ['--vsr-quick-view-dot-w',              'Pagination dot width',                               '24px'],
  ['--vsr-quick-view-dot-h',              'Pagination dot height',                              '3px'],
  ['--vsr-quick-view-dot-color',          'Inactive pagination dot color',                      '#d6d6d6'],
  ['--vsr-quick-view-dot-active-color',   'Active dot fill (brand-tinted)',                     'var(--brand-color)'],
  ['--vsr-quick-view-color-swatch-size',  'Caption swatch disc size',                           '24px'],
]

/* ----- Doc page (default export) --------------------------------------- */

export default function VsrQuickViewPage() {
  const { brand } = useBrand()
  const data = VEHICLES[brand]

  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">VSR Quick View</h1>
        <p className="doc-page-header__desc">
          Desktop-only modal preview shown when a shopper clicks <strong>Quick View</strong> from a
          VSR Card. Two-column layout: a vehicle image gallery on the left (hero + chevron nav +
          pagination dots + exterior/interior color callouts), and an info panel on the right
          (identity block with VIN + status + dealership, 2×2 specs grid, Key Installed Options
          list, and an <strong>Add to Favorites</strong> + <strong>View &amp; Buy</strong> /{' '}
          <strong>View Details</strong> CTA pair).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Desktop only</span>
          <span className="doc-tag doc-tag--blue">4 brands</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/V7ZspuqUOh3llyAOIaMHZd/?node-id=1-967" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Default state */}
      <div className="doc-section">
        <h2 className="doc-section__title">Default — Desktop</h2>
        <p className="doc-section__subtitle">
          The canonical 1217×616 quick view. Use the brand switcher (top right) to preview each
          brand — radius, fonts, dot active color, and primary CTA color all flip via tokens.
          Mobile and tablet variants are <strong>not in scope</strong> for this component;
          use <code>VSR Card</code>'s mobile footer for touch surfaces instead.
        </p>
        <div className="doc-variant-card doc-variant-card--wide">
          <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: 24, alignItems: 'flex-start' }}>
            <VSRQuickView data={data} activeImageIndex={1} imageCount={6} />
          </div>
          <div className="doc-variant-card__label">Default · 1217×616</div>
        </div>
      </div>

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Slot</th><th>Element</th><th>Sourced from</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Top-right close X</td><td><code>IconButton</code> shape=circle, size=small, variant=plain (imported); icon = <code>circle-close</code> — visible circle is part of the SVG glyph, not a CSS border</td></tr>
              <tr><td>2</td><td>Image gallery prev / next arrows</td><td><code>IconButton</code> shape=circle, size=small, variant=plain (imported); icons = <code>circle-arrow-left</code> / <code>circle-arrow-right</code> — circle baked into the SVG glyph</td></tr>
              <tr><td>3</td><td>Hero image wrap</td><td>NET NEW (<code>.drp-vsr-quick-view__gallery</code> + <code>__hero</code>)</td></tr>
              <tr><td>4</td><td>Pagination dots</td><td>NET NEW (<code>.drp-vsr-quick-view__dots</code> + <code>__dot</code>) — future Carousel Pagination atom</td></tr>
              <tr><td>5</td><td>Color callouts (Exterior / Interior)</td><td>NET NEW (<code>.drp-vsr-quick-view__color-callout</code> + <code>__color-swatch</code>) — see S27</td></tr>
              <tr><td>6</td><td>Identity panel (gray block)</td><td>NET NEW (<code>.drp-vsr-quick-view__identity</code> + <code>__name-block</code> + <code>__status-block</code>)</td></tr>
              <tr><td>7</td><td>Specs grid (engine / battery / transmission / seats)</td><td>NET NEW (<code>.drp-vsr-quick-view__specs</code> + <code>__spec-item</code>) — see S27</td></tr>
              <tr><td>8</td><td>Key Installed Options heading + bullet list</td><td>NET NEW (<code>.drp-vsr-quick-view__options-heading</code> + <code>__options-list</code> + <code>__options-item</code>)</td></tr>
              <tr><td>9</td><td>Add to Favorites CTA (heart + label)</td><td><code>Button</code> size=large, variant=outlined (imported); heart via <code>.drp-icon--heart</code></td></tr>
              <tr><td>10</td><td>View &amp; Buy / View Details CTA</td><td><code>Button</code> size=large, variant=filled (imported); brand-aware label is data-driven</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Built from */}
      <div className="doc-section">
        <h2 className="doc-section__title">Built from</h2>
        <p className="doc-section__subtitle">
          The molecule consumes 2 atomic components via tree-shaken React imports plus 7 NET NEW
          slots that have no atomic equivalent today. Two of those slots — the captioned color
          swatch and the icon-+-label-+-value spec row — are flagged as future atom-extraction
          candidates per <strong>S27</strong> in <code>systemic-findings.md</code> (the same UI
          primitives appear in vsr-filter and vsr-quick-view; extracting before a third consumer
          arrives is cheaper than reconciling drift later, à la Tabs → S26).
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>Button</strong> (imported) — <code>{'{ Button }'}</code> from <code>./button</code>.
            Two instances: <em>Add to Favorites</em> (<code>variant="outlined"</code>, large; heart
            icon prepended via <code>.drp-icon--heart</code>) and the primary CTA{' '}
            <em>View &amp; Buy</em> / <em>View Details</em> (<code>variant="filled"</code>, large;
            label is data-driven per brand).
          </li>
          <li>
            <strong>IconButton</strong> (imported) — <code>{'{ IconButton }'}</code> from{' '}
            <code>./icon-button</code>. Three instances: top-right close X, image gallery prev,
            image gallery next. All <code>shape="circle"</code>, <code>size="small"</code>,{' '}
            <code>variant="plain"</code> — borderless and transparent-background. The visible
            circle around each glyph is part of the SVG icon itself (<code>circle-close</code> /{' '}
            <code>circle-arrow-left</code> / <code>circle-arrow-right</code>), not a CSS border
            on the IconButton.
          </li>
          <li>
            <strong>Iconography</strong> (CSS reuse) — <code>.drp-icon--heart</code> on the
            favorites button; <code>.drp-icon--circle-close</code> on the close X;{' '}
            <code>.drp-icon--circle-arrow-left</code> / <code>.drp-icon--circle-arrow-right</code>{' '}
            on the gallery prev / next. The circle in each is a property of the glyph, not the
            container.
            <br />
            <strong>Icon library gap — future additions needed for accurate VDP rendering:</strong>{' '}
            the four spec-icon slots (Engine, Battery Range, Transmission, Seats) have no exact
            match in the DRP icon catalog. We use the closest existing icons as placeholders:{' '}
            <code>vehicle-sparkles</code> (Engine), <code>zap</code> (Battery Range),{' '}
            <code>tools</code> (Transmission), <code>circle-user</code> (Seats). Production VDP
            rendering will need icon-set additions for these four; placeholders are documented
            here so the gap is traceable.
          </li>
          <li>
            <strong>NET NEW · Quick View shell + 2-col layout</strong> —{' '}
            <code>.drp-vsr-quick-view</code> + <code>__media</code> + <code>__info</code>.
            Composite molecule shape, no atom owns this.
          </li>
          <li>
            <strong>NET NEW · Image gallery</strong> — <code>__gallery</code> + <code>__hero</code>{' '}
            + positioned <code>__nav-prev</code> / <code>__nav-next</code> (the buttons themselves
            are atomic IconButtons; the gallery wrap and chevron positioning is the NET NEW slot).
          </li>
          <li>
            <strong>NET NEW · Pagination dots</strong> — <code>__dots</code> + <code>__dot</code>{' '}
            (5 inactive bars + 1 active brand-colored bar). No atomic carousel-pagination
            indicator. <strong>Future Carousel Pagination atom candidate.</strong>
          </li>
          <li>
            <strong>NET NEW · Captioned color callout</strong> — <code>__color-callout</code> +{' '}
            <code>__color-swatch</code> + <code>__color-meta</code>. vsr-filter has a similar
            swatch primitive (in a 7-col grid, no captions); this is the captioned variant. Same
            color-disc shape, different layout. <strong>Cross-references S27</strong> as a future
            shared Swatch atom candidate (with vsr-filter promotion).
          </li>
          <li>
            <strong>NET NEW · Identity panel</strong> — <code>__identity</code> +{' '}
            <code>__name-block</code> + <code>__title</code> + <code>__vin</code> +{' '}
            <code>__status-block</code> + <code>__status</code> + <code>__dealership</code> +{' '}
            <code>__distance</code>. Composite typography panel, no atom owns this.
          </li>
          <li>
            <strong>NET NEW · Specs grid</strong> — <code>__specs</code> +{' '}
            <code>__spec-item</code> + <code>__spec-icon</code> + <code>__spec-label</code> +{' '}
            <code>__spec-value</code>. Icon + label + value composition in a 2×2 grid. No atomic
            spec-row component exists. <strong>Cross-references S27</strong> as a future
            SpecItem atom candidate.
          </li>
          <li>
            <strong>NET NEW · Key Installed Options</strong> — <code>__options-heading</code> +{' '}
            <code>__options-list</code> + <code>__options-item</code>. Heading + bulleted list
            composition. No atom owns this typography slot.
          </li>
          <li>
            <strong>NET NEW · CTA row layout</strong> — <code>__cta-row</code>. Equal-flex two-col
            grid; the buttons themselves are atomic, only the row layout is the NET NEW slot.
          </li>
        </ul>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          Tokens live in <code>styles/tokens.css</code> with the Chevy defaults shown below.
          Per-brand overrides in <code>brands.css</code> handle only{' '}
          <code>--vsr-quick-view-radius</code> (GMC + Cadillac flatten to 0) and{' '}
          <code>--vsr-quick-view-text-primary</code> (mirrors vsr-card per-brand neutrals). Brand
          fonts flow through foundation tokens (<code>--type-headline-5-family</code> for the
          22/28 title, <code>--type-headline-6-family</code> for the 18/24 options heading,{' '}
          <code>--type-body-family</code> for body copy), and brand accents
          (active dot, primary CTA fill, heart icon) flow through atomic Button / IconButton
          tokens or <code>var(--brand-color)</code> directly. <strong>No molecule-scoped
          --vsr-quick-view-button-* / --vsr-quick-view-icon-* tokens</strong> — those would be
          parallel namespaces that already belong to atoms.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Token</th>
                <th>Purpose</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {TOKEN_ROWS.map(([token, purpose, dflt]) => (
                <tr key={token}>
                  <td><code>{token}</code></td>
                  <td>{purpose}</td>
                  <td><code>{dflt}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <ul className="doc-brand-list">
          <li>
            <strong>Chevrolet</strong> — base set: 16px radius, Chevy Sans heading + body, blue{' '}
            (<code>#0077d9</code>) active dot + filled CTA + heart-on-Add-to-Favorites. Primary
            CTA label is <em>View &amp; Buy</em>.
          </li>
          <li>
            <strong>Buick</strong> — same 16px radius, Buick Headline + Buick Text, brand orange{' '}
            (<code>#D44400</code>) active dot, charcoal-grey filled CTA (orange is reserved for
            plain links). Primary CTA label is <em>View Details</em>.
          </li>
          <li>
            <strong>GMC</strong> — flat 0-radius corners, StratumGMC heading (atomic CSS uppercases
            via brand text-transform), red (<code>#cc0000</code>) active dot + heart + primary CTA.
            Primary CTA label is <em>VIEW DETAILS</em>.
          </li>
          <li>
            <strong>Cadillac</strong> — flat 0-radius corners, Cadillac Gothic Wide heading
            (atomic CSS uppercases via brand text-transform), navy (<code>#171473</code>) active
            dot + filled CTA. Primary CTA label is <em>VIEW DETAILS</em>. Identity panel stays at
            tonal <code>#f5f5f5</code> (brand-invariant).
          </li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Open this from a Quick View click on a VSR Card; the modal pairs with that flow.</li>
              <li>Keep the gallery position consistent — the chevron buttons are gallery navigation, not modal actions.</li>
              <li>Use the brand-aware filled-CTA label (<code>View &amp; Buy</code> Chevy; <code>View Details</code> for the others).</li>
              <li>Always render the close X — quick view is a modal, not a destination route.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't render this on tablet or mobile. Use the VSR Card mobile footer's <em>View Details</em> button to deep-link to the VDP instead.</li>
              <li>Don't add a third CTA — the contract is Add to Favorites + (View &amp; Buy / View Details).</li>
              <li>Don't swap the spec icons for arbitrary glyphs once the icon-set additions land — match Engine / Battery Range / Transmission / Seats one-to-one.</li>
              <li>Don't hardcode <code>#0077d9</code> on the active pagination dot — route through <code>var(--brand-color)</code> so the indicator re-themes correctly.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
