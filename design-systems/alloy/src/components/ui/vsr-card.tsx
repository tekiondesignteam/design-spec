import { useBrand } from '../../context/BrandContext'
import type { Brand } from '../../context/brand-constants'
import { Button } from './button'
import { IconButton } from './icon-button'
import chevroletVehicle from '../../../assets/vehicles/chevrolet-blazer-ev.png'
import cadillacVehicle from '../../../assets/vehicles/cadillac-escalade.png'
import buickVehicle from '../../../assets/vehicles/buick-envista.png'
import gmcVehicle from '../../../assets/vehicles/gmc-sierra-1500.png'

/* ----- Sample vehicle data per brand ----------------------------------- */

type VehicleData = {
  status: string
  name: string
  trim: string
  msrp: string
  cashPrice: string
  monthlyPrice: string
  financeTerms: string
  leaseTerms: string
  dealership: string
  distance: string
  vin: string
  image: string
}

const VEHICLES: Record<Brand, VehicleData> = {
  chevrolet: {
    status: 'Available Now',
    name: '2025 Blazer EV',
    trim: 'SS, AWD',
    msrp: '$48,500',
    cashPrice: '$48,500',
    monthlyPrice: '$364/mo.',
    financeTerms: '72 mo. | 5.9% APR | $2,500 down pymt.',
    leaseTerms: '36 mo. | 12,000 miles/yr. | $2,500 due at signing',
    dealership: 'Riverside Chevrolet',
    distance: '(24 mi.)',
    vin: '3G1FJ3456L1234575',
    image: chevroletVehicle,
  },
  cadillac: {
    status: 'Available Now',
    name: '2025 Escalade',
    trim: 'Sport, AWD',
    msrp: '$80,795',
    cashPrice: '$80,795',
    monthlyPrice: '$1,516/mo.',
    financeTerms: '72 mo. | 5.9% APR | $2,500 down pymt.',
    leaseTerms: '36 mo. | 12,000 miles/yr. | $16,519 due at signing',
    dealership: 'Dublin Cadillac',
    distance: '(24 mi.)',
    vin: '1GYS4BKL9RR119426',
    image: cadillacVehicle,
  },
  buick: {
    status: 'Available Now',
    name: '2025 Envista',
    trim: 'ST, AWD',
    msrp: '$24,100',
    cashPrice: '$24,100',
    monthlyPrice: '$430/mo.',
    financeTerms: '72 mo. | 5.9% APR | $2,500 down payment.',
    leaseTerms: '36 mo. | 12,000 miles/yr. | $2,500 due at signing',
    dealership: 'Folsom Buick GMC',
    distance: '(24 mi.)',
    vin: '3G1FJ3456L1234575',
    image: buickVehicle,
  },
  gmc: {
    status: 'Available',
    name: '2025 Sierra 1500',
    trim: 'Pro, 4WD',
    msrp: '$37,700',
    cashPrice: '$37,700',
    monthlyPrice: '$842/mo.',
    financeTerms: '72 mo. | 3.39% APR | $2,500 down payment',
    leaseTerms: '36 mo. | 10,000 miles/yr. | $16,519 due at signing',
    dealership: 'GMC of Vacaville',
    distance: '(24 mi.)',
    vin: '1GNGK26J6VJ343327',
    image: gmcVehicle,
  },
}

/* ----- Card subcomponent ----------------------------------------------- */

type CardType = 'cash' | 'finance' | 'lease'
type CardViewport = 'desktop' | 'mobile'
type CardState = 'default' | 'hover'

type VSRCardProps = {
  type: CardType
  viewport?: CardViewport
  /** Force hovered state (used in showcases). Real cards use `:hover`. */
  state?: CardState
  data: VehicleData
}

function VSRCard({ type, viewport = 'desktop', state = 'default', data }: VSRCardProps) {
  const isMobile = viewport === 'mobile'
  const isHovered = state === 'hover'
  const showFinanceTerms = type === 'finance' || type === 'lease'
  const monthlyPrice = type === 'lease' ? data.monthlyPrice.replace('$364', '$384') : data.monthlyPrice

  const rootClass = [
    'drp-vsr-card',
    isMobile ? 'drp-vsr-card--mobile' : '',
    !isMobile && isHovered ? 'is-hovered' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      {/* Status row */}
      <div className="drp-vsr-card__status-row">
        <span className="drp-vsr-card__status">{data.status}</span>
        <IconButton
          ariaLabel="Save vehicle"
          shape="rect"
          variant="plain"
          size="small"
          className="drp-vsr-card__heart"
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
        >
          <i className="drp-icon drp-icon--heart" aria-hidden="true" />
        </IconButton>
      </div>

      {/* Vehicle name + MSRP */}
      <div className="drp-vsr-card__info">
        <div className="drp-vsr-card__name">
          <span>{data.name}</span>
          <span>{data.trim}</span>
        </div>
        <div className="drp-vsr-card__msrp">
          <span className="drp-vsr-card__msrp-label">MSRP:</span>
          <span className="drp-vsr-card__msrp-value">{data.msrp}</span>
          <i className="drp-icon drp-icon--info" aria-hidden="true" />
        </div>
      </div>

      {/* Vehicle Content: image + pricing with 16px gap (Figma container-gap-m) */}
      <div className="drp-vsr-card__content">
        <div className="drp-vsr-card__image">
          <img src={data.image} alt={`${data.name} ${data.trim}`} />
        </div>

        <div className="drp-vsr-card__pricing-wrap">
          <div className="drp-vsr-card__dealership">
            <span>{data.dealership}</span>
            <span className="drp-vsr-card__distance">{data.distance}</span>
          </div>
          <div className="drp-vsr-card__price-block">
            <span className="drp-vsr-card__price-label">Dealer Price After Offers</span>
            <div className="drp-vsr-card__price-row">
              <span className="drp-vsr-card__price-value">
                {type === 'cash' ? data.cashPrice : monthlyPrice}
              </span>
              <i className="drp-icon drp-icon--info" aria-hidden="true" />
            </div>
            {showFinanceTerms && (
              <div className="drp-vsr-card__terms">
                <span>{type === 'finance' ? data.financeTerms : data.leaseTerms}</span>
                <span>
                  {type === 'finance' ? 'Subject to credit approval' : '$0 security dep. | Subject to credit approval'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer: VIN (default) or CTAs (hover/mobile) */}
      <div className="drp-vsr-card__footer">
        <span className="drp-vsr-card__vin">
          <span className="drp-vsr-card__vin-label">VIN:</span>
          <span className="drp-vsr-card__vin-value">{data.vin}</span>
        </span>
        {isMobile ? (
          <div className="drp-vsr-card__cta-row drp-vsr-card__cta-row--single">
            <Button size="large" variant="filled" tabIndex={-1} onClick={(e) => e.preventDefault()}>
              View Details
            </Button>
          </div>
        ) : (
          <div className="drp-vsr-card__cta-row">
            <Button size="large" variant="outlined" tabIndex={-1} onClick={(e) => e.preventDefault()}>
              Quick View
            </Button>
            <Button size="large" variant="filled" tabIndex={-1} onClick={(e) => e.preventDefault()}>
              View Details
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ----- Tokens table data ------------------------------------------------ */

const TOKEN_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ['--vsr-card-bg',                'Card surface fill',                            '#ffffff (Cadillac: #f2f2f2)'],
  ['--vsr-card-border-color',      'Card outer border',                            '#e6e6e6 (Cadillac: transparent)'],
  ['--vsr-card-border-radius',     'Card outer corner radius',                     '16px (GMC + Cadillac: 0)'],
  ['--vsr-card-divider-color',     'Internal hairline below the price block',      '#e6e6e6'],
  ['--vsr-card-image-height',      'Vehicle photo container height',               '135px'],
  ['--vsr-card-cta-section-height','VIN / CTA footer row height (desktop)',        '48px'],
  ['--vsr-card-status-color',      '"Available Now" text',                         '#262626'],
  ['--vsr-card-name-color',        'Vehicle name + trim text',                     '#262626'],
  ['--vsr-card-name-text-transform','Vehicle name case (per brand)',               'none (GMC + Cadillac: uppercase)'],
  ['--vsr-card-msrp-label-color',  'MSRP label colour',                            '#666666'],
  ['--vsr-card-price-value-color', 'Primary price value colour',                   '#262626'],
  ['--vsr-card-vin-label-color',   'VIN label colour',                             '#666666'],
  ['--vsr-card-heart-color',       'Save-vehicle heart fill',                      '#262626 (GMC: #cc0000)'],
  ['--vsr-card-status-font-family','Status / dealership family',                   'Chevy_Sans (Buick: Buick_Text, GMC: StratumGMC, Cadillac: Cadillac_Gothic_Narrow)'],
]

/* ----- Page (default export) -------------------------------------------- */

export default function VsrCardPage() {
  const { brand } = useBrand()
  const data = VEHICLES[brand]

  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">VSR Card</h1>
        <p className="doc-page-header__desc">
          Vehicle Search Result card — one vehicle tile in the inventory grid. Composes the
          atomic <strong>Button</strong>, <strong>Chip</strong>, and <strong>Icon Button</strong>
          components into a self-contained record with status, hero image, dealer-priced term
          block, and a footer that swaps from a VIN line (default) to <strong>Quick View</strong>{' '}
          and <strong>View Details</strong> CTAs on desktop hover. Mobile shows both rows at once.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Cash · Finance · Lease</span>
          <span className="doc-tag doc-tag--blue">Desktop · Mobile</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Desktop — Default state (3 types) */}
      <div className="doc-section">
        <h2 className="doc-section__title">Desktop — Default state</h2>
        <p className="doc-section__subtitle">
          Three card types with the VIN row visible. Hover any card below to swap the VIN for the
          Quick View + View Details CTAs. Cards are <strong>full-width</strong> within their grid
          cell — the showcase below uses an inventory-style{' '}
          <code>repeat(auto-fill, minmax(320px, 1fr))</code> grid.
        </p>
        <div className="doc-variant-grid doc-variant-grid--breakout">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="cash" viewport="desktop" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Cash</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="finance" viewport="desktop" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Finance</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="lease" viewport="desktop" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Lease</div>
          </div>
        </div>
      </div>

      {/* Desktop — Hover state */}
      <div className="doc-section">
        <h2 className="doc-section__title">Desktop — Hover state</h2>
        <p className="doc-section__subtitle">
          On hover the VIN line is replaced by paired CTAs: <strong>Quick View</strong> (outlined)
          and <strong>View Details</strong> (filled). The card height stays constant — both rows
          are exactly 48px.
        </p>
        <div className="doc-variant-grid doc-variant-grid--breakout">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="cash" viewport="desktop" state="hover" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Cash · Hover</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="finance" viewport="desktop" state="hover" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Finance · Hover</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="lease" viewport="desktop" state="hover" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Lease · Hover</div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="doc-section">
        <h2 className="doc-section__title">Mobile</h2>
        <p className="doc-section__subtitle">
          The footer stacks the VIN line above a full-width <strong>View Details</strong> button —
          both visible at all times because there is no hover affordance on touch.
        </p>
        <div className="doc-variant-grid doc-variant-grid--breakout">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="cash" viewport="mobile" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Cash</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="finance" viewport="mobile" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Finance</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '100%', maxWidth: '433px' }}>
                <VSRCard type="lease" viewport="mobile" data={data} />
              </div>
            </div>
            <div className="doc-variant-card__label">Lease</div>
          </div>
        </div>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Tokens</h2>
        <p className="doc-section__subtitle">
          The card is fully token-driven. Each row below is a CSS custom property that brands
          override in <code>brands.css</code>. Vehicle imagery, dealership name, MSRP, and VIN
          come from the runtime data prop, not tokens.
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
          <li><strong>Chevrolet</strong> — base set: white card on a 16px radius, Chevy Sans 12/16px, blue {`(#0077d9)`} primary CTA.</li>
          <li><strong>Buick</strong> — same shape and radius, Buick Text 14/18px, charcoal-grey primary CTA (orange is reserved for plain links).</li>
          <li><strong>GMC</strong> — flat 0-radius corners, StratumGMC uppercase 14/18px, red {`(#cc0000)`} heart and primary CTA.</li>
          <li><strong>Cadillac</strong> — flat 0-radius corners on a tonal {`#f2f2f2`} panel (no border), Cadillac Gothic Narrow uppercase, navy {`(#171473)`} primary CTA. Status / name / dealership are forced uppercase.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Do / Don't</h2>
        <ul className="doc-brand-list">
          <li><strong>Do</strong> use <code>cash</code> for any vehicle that doesn't have an active finance/lease offer attached — the term block collapses to a single price line.</li>
          <li><strong>Do</strong> keep the card height constant between default and hover. The 48px footer accommodates either the VIN line or a 48px button row.</li>
          <li><strong>Don't</strong> add a third CTA. The Quick View / View Details pair is the contract for the desktop hover; mobile uses View Details only.</li>
          <li><strong>Don't</strong> rely on hover on touch surfaces — render the <code>mobile</code> viewport instead so VIN and CTA are both reachable.</li>
        </ul>
      </div>
    </>
  )
}
