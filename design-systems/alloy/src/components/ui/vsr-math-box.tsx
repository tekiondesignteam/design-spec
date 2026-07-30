import { useBrand } from '../../context/BrandContext'
import { IconButton } from './icon-button'

/* ----- Public types ---------------------------------------------------- */

export type MathBoxMode = 'cash' | 'finance' | 'lease'
export type MathBoxStatus = 'available' | 'central-stock' | 'in-transit'

export type MathBoxLine = {
  label: string
  amount: string
  note?: string
}

export type MathBoxTotal = {
  label: string
  amount: string
}

export type MathBoxOffer = {
  label: string
  amount: string
}

export type MathBoxData = {
  title?: string
  lines: MathBoxLine[]
  totals: MathBoxTotal[]
  totalsNote?: string
  offers?: MathBoxOffer[]
  pricingNotice?: string
  disclaimer: string
}

export type VSRMathBoxProps = {
  data: MathBoxData
  mobile?: boolean
  onClose?: () => void
  className?: string
}

/* ----- Reusable atom --------------------------------------------------- */

export function VSRMathBox({ data, mobile = false, onClose, className }: VSRMathBoxProps) {
  const rootClass = [
    'drp-vsr-math-box',
    mobile ? 'drp-vsr-math-box--mobile' : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <section className={rootClass} aria-label={data.title ?? 'Price Summary'}>
      <header className="drp-vsr-math-box__header">
        <h3 className="drp-vsr-math-box__title">{data.title ?? 'Price Summary'}</h3>
        <IconButton
          ariaLabel="Close price summary"
          shape="rect"
          variant="plain"
          size="small"
          className="drp-vsr-math-box__close"
          onClick={onClose}
        >
          <i className="drp-icon drp-icon--close" aria-hidden="true" />
        </IconButton>
      </header>

      <div className="drp-vsr-math-box__lines">
        {data.lines.map((line, i) => (
          <div className="drp-vsr-math-box__line" key={`${line.label}-${i}`}>
            <div className="drp-vsr-math-box__line-row">
              <span className="drp-vsr-math-box__line-label">{line.label}</span>
              <span className="drp-vsr-math-box__line-amount">{line.amount}</span>
            </div>
            {line.note && <p className="drp-vsr-math-box__line-note">{line.note}</p>}
          </div>
        ))}
      </div>

      <div className="drp-vsr-math-box__totals">
        {data.totals.map((total, i) => (
          <div className="drp-vsr-math-box__total" key={`${total.label}-${i}`}>
            <span className="drp-vsr-math-box__total-label">{total.label}</span>
            <span className="drp-vsr-math-box__total-amount">{total.amount}</span>
          </div>
        ))}
        {data.totalsNote && <p className="drp-vsr-math-box__totals-note">{data.totalsNote}</p>}
      </div>

      {data.offers && data.offers.length > 0 && (
        <div className="drp-vsr-math-box__offers">
          <p className="drp-vsr-math-box__offers-title">Other offers you may qualify for</p>
          <ul className="drp-vsr-math-box__offers-list">
            {data.offers.map((offer, i) => (
              <li className="drp-vsr-math-box__offer" key={`${offer.label}-${i}`}>
                <span className="drp-vsr-math-box__offer-label">
                  {offer.label}
                  <i className="drp-icon drp-icon--asterisk" aria-hidden="true" />
                </span>
                <span className="drp-vsr-math-box__offer-value">{offer.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="drp-vsr-math-box__footer">
        {data.pricingNotice && <p className="drp-vsr-math-box__notice">{data.pricingNotice}</p>}
        <p className="drp-vsr-math-box__disclaimer">{data.disclaimer}</p>
      </div>
    </section>
  )
}

/* ----- Sample data per (mode × status) -------------------------------- */

const COMMON_OFFERS: MathBoxOffer[] = [
  { label: 'Potential Federal EV Tax Credit', amount: '-$7,500.00' },
  { label: 'California Electric Vehicle Tax Credit', amount: '-$600.00' },
  { label: 'Costco Member-Only Incentive', amount: '-$260.00' },
]

const DISCLAIMER_DEFAULT =
  'Tax, title, license, additional state required and dealer fees extra. Vehicle may contain dealer installed accessories and/or upfits which may not be included in this price. Not available with special finance, lease or some other offers. Residential restrictions may apply. See dealer or click "View Details" for more details.'

const DISCLAIMER_FINANCE =
  'Tax, title, license, additional state required and dealer fees extra. Vehicle may contain dealer installed accessories and/or upfits which may not be included in this price. Your payments may vary. You may qualify for additional offers and discounts. Residential restrictions may apply. Contact dealer or click "View Details" for more details.'

const DISCLAIMER_LEASE =
  '$2,824 due at signing includes down payment from customer and first monthly payment. Tax, title, license, additional state required and dealer fees extra. Vehicle may contain dealer installed accessories and/or upfits which may not be included in this price. Lessee pays for maintenance, repair and excess wear. Your payments may vary. Residential restrictions may apply. You may qualify for additional offers and discounts. Contact dealer or click "View Details" for more details.'

const DISCLAIMER_CENTRAL_PREFIX = 'Subject to final dealer pricing. '
const PRICING_NOTICE_IN_TRANSIT = 'Pricing for in-transit vehicles is subject to change.'

function buildData(mode: MathBoxMode, status: MathBoxStatus): MathBoxData {
  const isAvailable = status === 'available'
  const isCentralStock = status === 'central-stock'
  const isInTransit = status === 'in-transit'

  if (mode === 'cash') {
    const lines: MathBoxLine[] = [
      { label: 'MSRP - Total Vehicle Price', amount: '$38,330' },
    ]
    if (!isCentralStock) {
      lines.push({ label: 'Total Dealer Featured Price', amount: '$37,175' })
    }
    if (isCentralStock) {
      lines.push({
        label: 'Customer Cash',
        amount: '-$10,900',
        note: 'Not available with special financing, lease and some other offers. Must take new retail delivery by 01/31/2025.',
      })
      lines.push({
        label: 'Purchase Bonus Cash',
        amount: '-$3,000',
        note: 'Not available with lease and some other offers. Residency restrictions apply. Must take new retail delivery by 01/31/2025.',
      })
    } else if (isInTransit) {
      lines.push({
        label: 'Customer Cash',
        amount: '-$6,300',
        note: 'Not available with special financing, lease and some other offers. Must take new retail delivery by 01/31/2025.',
      })
      lines.push({ label: 'Bonus Cash', amount: '-$555', note: 'Must take new retail delivery by 01/31/2025.' })
      lines.push({
        label: 'Purchase Bonus Cash',
        amount: '-$1,000',
        note: 'Not available with lease and some other offers. Residency restrictions apply. Must take new retail delivery by 01/31/2025.',
      })
    } else {
      lines.push({
        label: 'Purchase Allowance',
        amount: '-$3,000',
        note: 'Not available with lease and some other offers. Residency restrictions apply. Must take new retail delivery by 01/31/2025.',
      })
      lines.push({
        label: 'Purchase Allowance',
        amount: '-$3,000',
        note: 'Not available with lease and some other offers. Must take new retail delivery by 01/31/2025.',
      })
      lines.push({
        label: 'Customer Cash',
        amount: '-$10,900',
        note: 'Not available with special financing, lease and some other offers. Must take new retail delivery by 01/31/2025.',
      })
    }

    const totalLabel = isCentralStock ? 'Price After Offers' : 'Dealer Price After Offers'
    const totalAmount = isInTransit ? '$29,040' : '$24,430'
    return {
      lines,
      totals: [{ label: totalLabel, amount: totalAmount }],
      totalsNote: isCentralStock ? undefined : 'Must take new retail delivery by 01/31/2025.',
      offers: isCentralStock ? undefined : COMMON_OFFERS,
      pricingNotice: isInTransit ? PRICING_NOTICE_IN_TRANSIT : undefined,
      disclaimer: isCentralStock ? DISCLAIMER_CENTRAL_PREFIX + DISCLAIMER_DEFAULT : DISCLAIMER_DEFAULT,
    }
  }

  if (mode === 'finance') {
    const lines: MathBoxLine[] = [
      { label: 'MSRP - Total Vehicle Price', amount: '$37,175' },
      { label: 'Total Dealer Featured Price', amount: '$37,175' },
      { label: 'Monthly Term', amount: '72 months' },
      { label: 'Annual Percentage Rate', amount: '5.99% APR', note: 'Subject to credit approval.' },
      { label: 'Down Payment', amount: '-$2,000' },
      {
        label: 'For Well-Qualified Buyers When Financed w/ GM Financial',
        amount: '-$505',
        note: 'Must take new retail delivery by 01/31/2025.',
      },
    ]
    const totals: MathBoxTotal[] = [
      ...(!isCentralStock ? [{ label: 'Est. Remaining Balance', amount: '$34,170' }] : []),
      { label: 'Est. Monthly Payment', amount: '$566/mo.' },
    ]
    return {
      lines,
      totals,
      totalsNote:
        '5.99% APR for 72 months for well-qualified buyers when financed w/ GM Financial. Monthly payment is $16.57 for every $1000 you finance. Average example down payment is 6.8%. Not available with leases and some other offers. Must take new retail delivery by 01/31/2025.',
      offers: isCentralStock ? undefined : COMMON_OFFERS,
      pricingNotice: isInTransit ? PRICING_NOTICE_IN_TRANSIT : undefined,
      disclaimer: isCentralStock ? DISCLAIMER_CENTRAL_PREFIX + DISCLAIMER_FINANCE : DISCLAIMER_FINANCE,
    }
  }

  // lease
  const lines: MathBoxLine[] = [
    { label: 'MSRP - Total Vehicle Price', amount: '$44,180' },
    { label: 'Total Dealer Featured Price', amount: '$44,180' },
    { label: 'Monthly Term', amount: '48 months' },
    { label: 'Annual Mileage', amount: '10,000 miles', note: '$0.25 per mile over 10,000 miles' },
    { label: 'Down Payment', amount: '-$2,500' },
    { label: 'Lease Cash', amount: '-$1,000', note: 'Must take new retail delivery by 01/31/2025.' },
    { label: 'Lease Cash Allowance', amount: '-$507', note: 'Must take new retail delivery by 01/31/2025.' },
  ]
  return {
    lines,
    totals: [{ label: 'Est. Monthly Payment', amount: '$324/mo.' }],
    totalsNote: 'Must take new retail delivery by 01/31/2025.',
    offers: isCentralStock ? undefined : COMMON_OFFERS,
    pricingNotice: isInTransit ? PRICING_NOTICE_IN_TRANSIT : undefined,
    disclaimer: isCentralStock ? DISCLAIMER_CENTRAL_PREFIX + DISCLAIMER_LEASE : DISCLAIMER_LEASE,
  }
}

/* ----- Documentation page --------------------------------------------- */

const TOKEN_ROWS: ReadonlyArray<readonly [string, string, string]> = [
  ['--vsr-math-box-bg', 'Panel background', '#ffffff (Cadillac: #262626)'],
  ['--vsr-math-box-text-primary', 'Body + label color', '#262626 (Cadillac: #ffffff)'],
  ['--vsr-math-box-text-secondary', 'Note + disclaimer color', '#666666 (Cadillac: #b3b3b3)'],
  ['--vsr-math-box-text-success', 'Offers (green) text', '#2d871b (Cadillac inherits)'],
  ['--vsr-math-box-divider', 'Top + bottom rule between groups', '#b3b3b3 (Cadillac: #4a4a4a)'],
  ['--vsr-math-box-font-family', 'Body font family', "'Chevy_Sans:Medium', sans-serif"],
  ['--vsr-math-box-bold-font-family', 'Bold font family', "'Chevy_Sans:Bold', sans-serif"],
]

function StatusShowcase({
  status,
  mobile = false,
  title,
  description,
}: {
  status: MathBoxStatus
  mobile?: boolean
  title: string
  description: string
}) {
  const modes: MathBoxMode[] = ['cash', 'finance', 'lease']
  const labels: Record<MathBoxMode, string> = { cash: 'Cash', finance: 'Finance', lease: 'Lease' }
  return (
    <div className="doc-section">
      <h2 className="doc-section__title">{title}</h2>
      <p className="doc-section__subtitle">{description}</p>
      <div className="doc-variant-grid doc-variant-grid--breakout">
        {modes.map((mode) => (
          <div className="doc-variant-card" key={mode}>
            <div
              className="doc-variant-card__preview"
              style={{ background: '#f5f5f5', padding: '16px', alignItems: 'flex-start' }}
            >
              <VSRMathBox data={buildData(mode, status)} mobile={mobile} />
            </div>
            <div className="doc-variant-card__label">{labels[mode]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VSRMathBoxPage() {
  useBrand()
  return (
    <>
      <div className="doc-page-header">
        <p className="doc-eyebrow">DOMAIN COMPONENTS</p>
        <h1 className="doc-title">VSR Mini Math Box</h1>
        <p className="doc-section__subtitle" style={{ maxWidth: 720 }}>
          Price Summary panel that breaks down vehicle pricing into MSRP, allowances, totals, and
          available offers. Three financing modes (Cash · Finance · Lease) cross with three vehicle
          statuses (Available Now · Central Stock / Sale Pending / RTSTD · In Transit) for nine
          showcase variants. Composes <code>IconButton</code> for the close affordance and the
          shared icon classes <code>drp-icon--close</code> + <code>drp-icon--asterisk</code>; all
          other markup is local to <code>.drp-vsr-math-box</code>.
        </p>
        <p className="doc-section__subtitle" style={{ maxWidth: 720 }}>
          <a className="drp-link-container-medium drp-link-color-primary" href="https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101">View in Figma</a>
        </p>
      </div>

      <StatusShowcase
        status="available"
        title="Status — Available Now"
        description="Default flow with full allowances/credits, the 'Other offers you may qualify for' panel, and the standard disclaimer."
      />

      <StatusShowcase
        status="central-stock"
        title="Status — Central Stock / Sale Pending / RTSTD"
        description="Compressed line set, label drops to 'Price After Offers', and the 'Other offers' panel is suppressed. Disclaimer is prefixed with 'Subject to final dealer pricing.'"
      />

      <StatusShowcase
        status="in-transit"
        title="Status — In Transit"
        description="Same line set as Available Now, with an extra 'Pricing for in-transit vehicles is subject to change.' notice immediately above the disclaimer."
      />

      <StatusShowcase
        status="available"
        mobile
        title="Mobile (375px)"
        description="Same component, narrower container. Padding and typography stay constant; the disclaimer wraps at the smaller width."
      />

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Tokens</h2>
        <p className="doc-section__subtitle">
          Local <code>--vsr-math-box-*</code> tokens. Brand fonts pull from each brand's body
          family; Cadillac additionally flips the color ramp to the dark theme via
          <code> [data-brand="cadillac"]</code>.
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
          <li><strong>Chevrolet</strong> — base set: white panel, Chevy Sans body / Chevy Sans Bold for labels &amp; totals, green offers (<code>#2d871b</code>).</li>
          <li><strong>Buick</strong> — Buick Text body / Buick Text Bold for labels and totals; same color ramp as Chevy.</li>
          <li><strong>GMC</strong> — StratumGMC body / StratumGMC Bold for labels and totals; same color ramp.</li>
          <li><strong>Cadillac</strong> — dark theme: panel flips to <code>#262626</code> with white body and <code>#b3b3b3</code> notes; divider darkens to <code>#4a4a4a</code>; offers stay green for emphasis. Cadillac Gothic body / Cadillac Gothic Bold for labels and totals.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Do / Don't</h2>
        <ul className="doc-brand-list">
          <li><strong>Do</strong> drive content via the <code>data</code> prop — the component renders whatever <code>lines</code>, <code>totals</code>, and <code>offers</code> you pass without baking in a mode/status enum.</li>
          <li><strong>Do</strong> wire the close button via the <code>onClose</code> callback — the IconButton atom handles state classes automatically.</li>
          <li><strong>Don't</strong> hard-code colors for Cadillac. The dark theme is a brand-level CSS override; leaving variables untouched keeps the math box brand-agnostic.</li>
          <li><strong>Don't</strong> add interactive controls inside the math box (radio toggles, accordions). Pricing context only — selection lives outside this panel.</li>
        </ul>
      </div>
    </>
  )
}
