import { useBrand } from '../../context/BrandContext'

type Tier = 'tier-1' | 'tier-3'
type Viewport = 'desktop' | 'tablet' | 'mobile'

type VehicleSpec = {
  key: 'blazer' | 'silverado'
  name: string
  subtitle: string
  tabs: readonly string[]
  price: string
  matches: number
  zip: string
}

const VEHICLES: readonly VehicleSpec[] = [
  {
    key: 'blazer',
    name: '2024 Blazer EV',
    subtitle: 'SS, AWD',
    tabs: ['Model', 'Exterior', 'Interior', 'Options', 'Summary'],
    price: '$48,500',
    matches: 249,
    zip: '90210',
  },
  {
    key: 'silverado',
    name: '2024 Silverado 1500',
    subtitle: 'Crew Cab, Short Bed, Custom Trail Boss, 4WD',
    tabs: ['Cab & Bed', 'Model', 'Exterior', 'Interior', 'Options', 'Summary'],
    price: '$48,500',
    matches: 249,
    zip: '90210',
  },
]

/* ---- Inline icons (16 px, currentColor) -------------------------------- */

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10.66 1.85a1.4 1.4 0 0 1 1.85 0l1.6 1.6c.51.5.51 1.32 0 1.83l-.3.3-3.44-3.44zM14.8 6c.91-.9.91-2.35 0-3.25l-1.6-1.6-.01-.02a2.4 2.4 0 0 0-3.24.02L2.73 8.36l-.12.2-2.08 6.28a.5.5 0 0 0 .64.63l6.22-2.13.2-.12zm-1.7.3-5.88 5.87-3.44-3.44 5.87-5.87zM3.28 9.7l2.98 2.98L1.8 14.2z" fill="currentColor"/>
    </svg>
  )
}

function AsteriskIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="m5 5.71 2.2.64-1.47 1.96.91.64 1.31-1.99L9.31 9l.9-.67-1.44-1.92L11 5.77l-.33-1.08-2.16.78L8.58 3H7.47l.06 2.44-2.2-.8zM5 12h6v-1H5z" fill="currentColor"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.76 5.73A5.24 5.24 0 0 1 8.23.5a5.3 5.3 0 0 1 5.01 5.14v.01q-.02 1.47-.77 2.72l-3.6 6.13h.8a.5.5 0 0 1 0 1H6.3a.5.5 0 0 1 0-1h.8L3.5 8.36a5 5 0 0 1-.73-2.6zm5.23 8.29 3.62-6.16a4.3 4.3 0 0 0 .6-2.48 4.24 4.24 0 0 0-8.46.35v.03q.02 1.11.61 2.1zM6.25 5.9a1.76 1.76 0 1 1 3.53 0 1.76 1.76 0 0 1-3.53 0m1.76-.76a.75.75 0 0 0-.76.76c0 .43.34.76.76.76.4 0 .76-.34.76-.76a.75.75 0 0 0-.76-.76" fill="currentColor"/>
    </svg>
  )
}

/* ---- Subcomponents ----------------------------------------------------- */

function Identity({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <div className="drp-config-subheader__identity">
      <div className="drp-config-subheader__name">
        <h1 className="drp-config-subheader__title">{name}</h1>
        <span className="drp-config-subheader__edit" aria-hidden="true"><PencilIcon /></span>
      </div>
      <p className="drp-config-subheader__subtitle">{subtitle}</p>
    </div>
  )
}

function UnderlinedTabs({ tabs, activeIndex = 0 }: { tabs: readonly string[]; activeIndex?: number }) {
  return (
    <div
      className="drp-config-subheader__tabs"
      role="tablist"
      aria-label="Configurator steps"
    >
      {tabs.map((label, i) => (
        <button
          key={label}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          tabIndex={-1}
          className={`drp-config-subheader__tab${i === activeIndex ? ' is-selected' : ''}`}
          onClick={(e) => e.preventDefault()}
        >
          <span className="drp-config-subheader__tab-label">{label}</span>
        </button>
      ))}
    </div>
  )
}

function PriceBlock({ price }: { price: string }) {
  return (
    <div className="drp-config-subheader__price">
      <span className="drp-config-subheader__price-label">Net Price After Offers</span>
      <div className="drp-config-subheader__price-row">
        <div className="drp-config-subheader__price-amount">
          <span className="drp-config-subheader__price-value">{price}</span>
          <span className="drp-config-subheader__price-footnote" aria-hidden="true">
            <AsteriskIcon />
          </span>
        </div>
        <span className="drp-config-subheader__price-method">Cash</span>
        <button
          type="button"
          className="drp-config-subheader__edit"
          aria-label="Edit price"
          tabIndex={-1}
          onClick={(e) => e.preventDefault()}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
        >
          <PencilIcon />
        </button>
      </div>
    </div>
  )
}

function MatchesBlock({ tier, zip }: { tier: Tier; zip: string }) {
  return (
    <div className="drp-config-subheader__matches">
      <span className="drp-config-subheader__matches-label">
        {tier === 'tier-1' ? 'Matches Near You' : 'Matches Found'}
      </span>
      {tier === 'tier-1' && (
        <div className="drp-config-subheader__zip-row">
          <span className="drp-config-subheader__pin" aria-hidden="true"><MapPinIcon /></span>
          <span className="drp-config-subheader__zip">{zip}</span>
        </div>
      )}
    </div>
  )
}

function CountPill({ count }: { count: number }) {
  return (
    <span className="drp-config-subheader__count" aria-label={`${count} matches`}>
      {count}
    </span>
  )
}

/* ---- Main composition -------------------------------------------------- */

function ConfiguratorSubHeader({
  tier,
  viewport,
  vehicle,
}: {
  tier: Tier
  viewport: Viewport
  vehicle: VehicleSpec
}) {
  const cls = `drp-config-subheader drp-config-subheader--${tier}`
  const tabs = <UnderlinedTabs tabs={vehicle.tabs} activeIndex={0} />
  const price = <PriceBlock price={vehicle.price} />
  const matches = <MatchesBlock tier={tier} zip={vehicle.zip} />
  const count = <CountPill count={vehicle.matches} />

  if (viewport === 'desktop') {
    return (
      <div className={cls} data-viewport={viewport}>
        <Identity name={vehicle.name} subtitle={vehicle.subtitle} />
        <div className="drp-config-subheader__tabs-wrap">{tabs}</div>
        <div className="drp-config-subheader__right">
          {price}
          <div className="drp-config-subheader__matches-group">
            {matches}
            {count}
          </div>
        </div>
      </div>
    )
  }

  if (viewport === 'tablet') {
    return (
      <div className={cls} data-viewport={viewport}>
        <div className="drp-config-subheader__top-row">
          <Identity name={vehicle.name} subtitle={vehicle.subtitle} />
          {price}
          <div className="drp-config-subheader__matches-group">
            {matches}
            {count}
          </div>
        </div>
        <div className="drp-config-subheader__tabs-wrap">{tabs}</div>
      </div>
    )
  }

  // mobile
  return (
    <div className={cls} data-viewport={viewport}>
      <div className="drp-config-subheader__top-row">
        <Identity name={vehicle.name} subtitle={vehicle.subtitle} />
        {count}
      </div>
      <div className="drp-config-subheader__tabs-wrap">{tabs}</div>
    </div>
  )
}

/* ---- Showcase wrappers ------------------------------------------------- */

function DesktopShowcase({ tier }: { tier: Tier }) {
  useBrand() // subscribe — CSS does the work via [data-brand]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {VEHICLES.map((vehicle) => (
        <div key={vehicle.key}>
          <div className="doc-variant-card__label" style={{ marginBottom: '12px', textTransform: 'none' }}>
            {vehicle.name}
          </div>
          <div className="doc-variant-card doc-variant-card--wide">
            <div
              className="doc-variant-card__preview"
              style={{ padding: '20px', alignItems: 'stretch' }}
            >
              <ConfiguratorSubHeader tier={tier} viewport="desktop" vehicle={vehicle} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const RESPONSIVE_TIERS: readonly { tier: Tier; title: string }[] = [
  { tier: 'tier-1', title: 'Pre-Checkout · Tier 1' },
  { tier: 'tier-3', title: 'Pre-Checkout · Tier 3' },
]

const RESPONSIVE_VIEWPORTS: readonly { viewport: Viewport; label: string; width: number }[] = [
  { viewport: 'tablet', label: 'Tablet · 768px', width: 768 },
  { viewport: 'mobile', label: 'Mobile · 375px', width: 375 },
]

function ResponsiveShowcase() {
  useBrand()
  const vehicle = VEHICLES[0] // Blazer for responsive matrix
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {RESPONSIVE_TIERS.map(({ tier, title }) => (
        <div key={tier}>
          <div className="doc-variant-card__label" style={{ marginBottom: '12px', textTransform: 'none' }}>{title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
            {RESPONSIVE_VIEWPORTS.map(({ viewport, label, width }) => (
              <div key={viewport}>
                <div className="doc-variant-card">
                  <div className="doc-variant-card__preview" style={{ padding: '20px', alignItems: 'stretch', minHeight: 0 }}>
                    <div style={{ width, flex: '0 0 auto' }}>
                      <ConfiguratorSubHeader tier={tier} viewport={viewport} vehicle={vehicle} />
                    </div>
                  </div>
                </div>
                <div className="doc-variant-card__label" style={{ marginTop: '8px', textTransform: 'none', opacity: 0.7 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ConfiguratorSubHeaderPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">Configurator Sub-header</h1>
        <p className="doc-page-header__desc">
          Secondary navigation that sits directly below the global Header while a shopper is
          building a specific vehicle. Anchors the trim identity on the left (vehicle name +
          selected trim, with an inline edit affordance), surfaces the configuration steps as
          <em> underlined tabs</em> in the center (<strong>Model · Exterior · Interior · Options ·
          Summary</strong>, with an extra <strong>Cab &amp; Bed</strong> step for trucks), and keeps
          the running Net Price and Inventory Match count on the right.
          Two tiers: <strong>Tier 1</strong> shows the shopper's ZIP so it reads as
          "Matches Near You 90210"; <strong>Tier 3</strong> (already inside a dealership
          storefront) drops the ZIP and reads "Matches Found".
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Tier 1</span>
          <span className="doc-tag doc-tag--blue">Tier 3</span>
          <span className="doc-tag">3 viewports</span>
          <a
            className="doc-page-header__link"
            href="https://www.figma.com/design/N61BUizbR9D2lm53KgUBqg/GM-%E2%80%A2-02.01-Navigation?node-id=481-9086"
            target="_blank"
            rel="noreferrer"
          >
            View in Figma ↗
          </a>
          <a
            className="doc-page-header__link"
            href="https://aecgm-dev.tekion.xyz/docs/ui-components/"
            target="_blank"
            rel="noreferrer"
          >
            Storybook ↗
          </a>
        </div>
      </div>

      {/* Tier 1 */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pre-Checkout · Tier 1</h2>
        <p className="doc-section__subtitle">
          Used when the shopper hasn't selected a specific dealership yet — the "Matches Near You"
          label is paired with their ZIP and a map-pin glyph so they can see how many inventory
          matches exist nationally. Use the brand switcher (top right) to preview each brand — the
          selected-tab underline + label colors flip via <code>var(--brand-color)</code>.
        </p>
        <DesktopShowcase tier="tier-1" />
      </div>

      {/* Tier 3 */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pre-Checkout · Tier 3</h2>
        <p className="doc-section__subtitle">
          Used once the shopper is inside a specific dealership storefront. The dealer already knows
          the geography, so the ZIP disappears and the copy reads simply "Matches Found". Everything
          else stays identical.
        </p>
        <DesktopShowcase tier="tier-3" />
      </div>

      {/* Responsive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Responsive Viewports</h2>
        <p className="doc-section__subtitle">
          Below desktop the tabs drop to their own row under the identity + price cluster. On mobile
          the price and matches collapse away — only the vehicle identity + count pill stay on the
          top row and the tab bar scrolls horizontally beneath it so the user can step through the
          configuration without losing the vehicle context.
        </p>
        <ResponsiveShowcase />
      </div>

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <p className="doc-section__subtitle">
          Both tiers share a three-column desktop grid. The middle column (the underlined tab bar)
          is the only always-on slot; the right-hand cluster collapses progressively as the viewport
          narrows.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Slot</th><th>Tier 1</th><th>Tier 3</th></tr></thead>
            <tbody>
              <tr>
                <td><code>Identity</code> (vehicle name + edit · trim subtitle)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td><code>Underlined tabs</code> (Model · Exterior · Interior · Options · Summary)</td>
                <td>✓ (+ "Cab &amp; Bed" for trucks)</td>
                <td>✓ (+ "Cab &amp; Bed" for trucks)</td>
              </tr>
              <tr>
                <td><code>Net Price</code> ($ · Cash · edit)</td>
                <td>✓ desktop + tablet</td>
                <td>✓ desktop + tablet</td>
              </tr>
              <tr>
                <td><code>Matches label</code></td>
                <td>"Matches Near You" + ZIP + pin</td>
                <td>"Matches Found" (no ZIP)</td>
              </tr>
              <tr>
                <td><code>Count pill</code> (40&nbsp;px black circle)</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Built from */}
      <div className="doc-section">
        <h2 className="doc-section__title">Built from</h2>
        <p className="doc-section__subtitle">
          The molecule subscribes to the live brand via <code>useBrand()</code> from{' '}
          <code>../../context/BrandContext</code> so the whole surface re-themes when the brand
          switcher flips. The molecule is engineered end-to-end today; atomic-component adoption
          for the tab bar is deferred pending <strong>S26</strong> (atomic Tabs Underlined Inside
          Figma reconciliation — see{' '}
          <code>systemic-findings.md § S26</code> at the repo root).
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>NET NEW · Underlined tab bar</strong> (<code>.drp-config-subheader__tab*</code>)
            — engineered locally pending S26. Atomic Tabs Underlined Inside Large at{' '}
            <code>.drp-tab-underlined-inside--lg</code> is the structural target, but per-brand
            Figma verification (2026-04-27) found the atomic CSS diverges from Figma in 13 places
            across 4 brands (missing line-height + default text + size overrides for Buick + GMC,
            spurious <code>uppercase</code> on GMC + Cadillac, etc.). Adopting atomic today would
            propagate that drift into this molecule. Once S26 lands (`brands.css`-only PR — add 9
            missing brand overrides, remove 4 spurious <code>uppercase</code> declarations), the
            molecule's tab bar can be replaced with <code>.drp-tab-underlined-inside--lg</code>
            classnames and the local tab tokens (<code>--config-subheader-tab-*</code>) deleted.
          </li>
          <li>
            <strong>NET NEW · Count pill</strong> (40&nbsp;px circle) — atomic Chip was the closest
            match but rejected: Chip is a <em>pill</em> shape (rounded-corner rectangle) sized for
            label-and-icon content with hover / pressed / selected state behavior. The configurator
            count is a <em>fixed-diameter circle</em> for a numeric readout, with no state. Forcing
            Chip would require overriding <code>border-radius</code>, <code>width</code>,
            <code>padding</code>, and stripping the interactive layer — at which point it isn't
            Chip anymore. Flagged as a future <strong>Badge</strong> atom candidate; same shape
            divergence applies to the VSR Filter count badge (currently also engineered locally).
          </li>
          <li>
            <strong>NET NEW · Decorative glyphs</strong> (16&nbsp;px pencil / asterisk / map-pin) —
            no atomic Icon component exists in the library; icons elsewhere are consumed as
            brand-scoped mask-image URLs (see <code>[data-brand] .drp-notification__bell</code> in
            <code>styles/global.css</code>). Inlining these as <code>currentColor</code> SVGs lets
            the molecule inherit <code>--config-subheader-icon-color</code> without needing a
            per-brand asset path for every glyph.
          </li>
          <li>
            <strong>NET NEW · Composite slots</strong> (vehicle identity, price block, matches
            block) — labeled-readout layouts with no single-purpose atom equivalent. Each is a
            scoped composition of typography + iconography rather than a reusable primitive.
          </li>
        </ul>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">
          Narrow brand surface: brands <strong>define</strong> (not override — see Design Tokens
          note below) only typography. No brand touches bg / border / text-color / layout / tab
          colors — those come from the Chevy fallbacks in <code>global.css</code>.
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>Buick</strong> — 14 typography tokens set to <code>Buick_Text</code> (name 500,
            subtitle 400, tab 500, price-label 400, price-value 500, count). Subtitle bumps to 18/25
            from the 16/24 fallback.
          </li>
          <li>
            <strong>GMC</strong> — 14 typography tokens set to <code>StratumGMC</code> (name <em>900</em>{' '}
            black, price-value 900, tab 500, rest 400). Subtitle bumps to 18/25.
          </li>
          <li>
            <strong>Cadillac</strong> — 11 typography tokens using the split <code>Cadillac_Gothic</code>
            {' '}(name 700, tab 500, price-value 700) / <code>Cadillac_Gothic_Narrow</code> (body
            text, subtitle, price-label, count) pattern — two faces on one molecule, same as Slider.
          </li>
        </ul>
        <p className="doc-section__subtitle">
          Selected-tab color is <em>not</em> brand-specific — every brand inherits
          <code> var(--brand-color)</code> via the Chevy fallback at{' '}
          <code>.drp-config-subheader__tab.is-selected</code>. Chevy <code>#0077d9</code>, Buick{' '}
          <code>#D44400</code>, GMC <code>#CC0000</code>, Cadillac <code>#171473</code>.
        </p>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          Tokens live in <code>styles/tokens.css</code> with the Chevy defaults shown below. Buick,
          GMC, and Cadillac override typography family + weight (and Buick / GMC subtitle size) in
          <code>styles/brands.css</code>. The selected-tab color routes through{' '}
          <code>var(--brand-color)</code> for all four brands. <strong>S8 closed 2026-04-27</strong>{' '}
          when these tokens were extracted from <code>global.css</code> fallbacks into{' '}
          <code>tokens.css</code>; the architectural invariant ("base values live in tokens.css")
          now holds for this molecule.
        </p>
        <p className="doc-section__subtitle">
          <strong>Note on tab tokens:</strong> the <code>--config-subheader-tab-*</code> family is
          molecule-private pending <strong>S26</strong> (atomic Tabs Underlined Inside Figma
          reconciliation). Once S26 lands, these tokens collapse — the tab bar will consume{' '}
          <code>.drp-tab-underlined-inside--lg</code> classes and the local tokens are deleted.
        </p>
        <p className="doc-section__subtitle">
          <strong>Surface, sizing, and layout</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--config-subheader-bg</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Background</td></tr>
              <tr><td><code>--config-subheader-border-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Bottom border</td></tr>
              <tr><td><code>--config-subheader-text-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Name + price-value text</td></tr>
              <tr><td><code>--config-subheader-subtitle-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Subtitle + price-label text</td></tr>
              <tr><td><code>--config-subheader-icon-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Edit pencil, footnote asterisk, map-pin</td></tr>
              <tr><td><code>--config-subheader-font-family</code></td><td>'Chevy_Sans'</td><td>Molecule-wide default font</td></tr>
              <tr><td><code>--config-subheader-height-desktop</code></td><td>88px</td><td>Desktop row height</td></tr>
              <tr><td><code>--config-subheader-height-tablet</code></td><td>120px</td><td>Tablet total height (top + tab row)</td></tr>
              <tr><td><code>--config-subheader-height-mobile</code></td><td>120px</td><td>Mobile total height</td></tr>
              <tr><td><code>--config-subheader-top-row-height</code></td><td>72px</td><td>Top row in tablet / mobile layouts</td></tr>
              <tr><td><code>--config-subheader-padding-x-desktop</code></td><td>40px</td><td>Desktop horizontal padding</td></tr>
              <tr><td><code>--config-subheader-padding-x-tablet</code></td><td>24px</td><td>Tablet horizontal padding</td></tr>
              <tr><td><code>--config-subheader-padding-x-mobile</code></td><td>16px</td><td>Mobile horizontal padding</td></tr>
              <tr><td><code>--config-subheader-col-gap</code></td><td>32px</td><td>Desktop column gap (identity · tabs · right)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Vehicle identity — name &amp; subtitle</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--config-subheader-name-font-family</code></td><td>'Chevy_Sans'</td><td>Vehicle name font family</td></tr>
              <tr><td><code>--config-subheader-name-font-weight</code></td><td>700</td><td>Vehicle name weight (bold)</td></tr>
              <tr><td><code>--config-subheader-name-font-size</code></td><td>24px</td><td>Vehicle name size (desktop + tablet)</td></tr>
              <tr><td><code>--config-subheader-name-font-size-mobile</code></td><td>18px</td><td>Vehicle name size (mobile)</td></tr>
              <tr><td><code>--config-subheader-name-line-height</code></td><td>30px</td><td>Vehicle name line-height</td></tr>
              <tr><td><code>--config-subheader-subtitle-font-family</code></td><td>'Chevy_Sans'</td><td>Trim subtitle font family</td></tr>
              <tr><td><code>--config-subheader-subtitle-font-weight</code></td><td>500</td><td>Trim subtitle weight</td></tr>
              <tr><td><code>--config-subheader-subtitle-font-size</code></td><td>16px</td><td>Trim subtitle size (desktop + tablet)</td></tr>
              <tr><td><code>--config-subheader-subtitle-font-size-mobile</code></td><td>14px</td><td>Trim subtitle size (mobile)</td></tr>
              <tr><td><code>--config-subheader-subtitle-line-height</code></td><td>24px</td><td>Trim subtitle line-height</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Tab bar</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--config-subheader-tab-bar-height</code></td><td>48px</td><td>Tab bar height</td></tr>
              <tr><td><code>--config-subheader-tab-gap</code></td><td>40px</td><td>Gap between tabs</td></tr>
              <tr><td><code>--config-subheader-tab-underline-height</code></td><td>4px</td><td>Selected-tab underline thickness</td></tr>
              <tr><td><code>--config-subheader-tab-font-family</code></td><td>'Chevy_Sans'</td><td>Tab label font family</td></tr>
              <tr><td><code>--config-subheader-tab-font-weight</code></td><td>600</td><td>Tab label weight (Demi)</td></tr>
              <tr><td><code>--config-subheader-tab-font-size</code></td><td>16px</td><td>Tab label size</td></tr>
              <tr><td><code>--config-subheader-tab-line-height</code></td><td>24px</td><td>Tab label line-height</td></tr>
              <tr><td><code>--config-subheader-tab-inactive-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Inactive tab text</td></tr>
              <tr><td><code>--config-subheader-tab-selected-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>var(--brand-color)</td><td>Selected tab text + underline</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle" style={{ marginTop: '16px' }}>
          <strong>Price + Matches count</strong>
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--config-subheader-price-label-font-family</code></td><td>'Chevy_Sans'</td><td>Price-label + method + matches-label font</td></tr>
              <tr><td><code>--config-subheader-price-label-font-weight</code></td><td>500</td><td>Price-label weight</td></tr>
              <tr><td><code>--config-subheader-price-label-font-size</code></td><td>14px</td><td>"Net Price After Offers", "Cash", matches-label, zip, count pill text</td></tr>
              <tr><td><code>--config-subheader-price-label-line-height</code></td><td>22px</td><td>Line-height for all 14px text</td></tr>
              <tr><td><code>--config-subheader-price-value-font-family</code></td><td>'Chevy_Sans'</td><td>Price amount font family</td></tr>
              <tr><td><code>--config-subheader-price-value-font-weight</code></td><td>700</td><td>Price amount weight</td></tr>
              <tr><td><code>--config-subheader-price-value-font-size</code></td><td>20px</td><td>Price amount size</td></tr>
              <tr><td><code>--config-subheader-count-bg</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Count pill fill</td></tr>
              <tr><td><code>--config-subheader-count-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Count pill text</td></tr>
              <tr><td><code>--config-subheader-count-size</code></td><td>40px</td><td>Count pill diameter</td></tr>
              <tr><td><code>--config-subheader-count-font-family</code></td><td>'Chevy_Sans'</td><td>Count pill font family</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Keep the sub-header <strong>sticky</strong> directly below the global Header while the shopper is inside the configurator — it's the primary step navigation.</li>
              <li>Prepend <strong>Cab &amp; Bed</strong> as the first tab whenever the selected vehicle is a truck — it's the gate step that drives the rest of the configuration.</li>
              <li>Use <strong>Tier 1</strong> on brand-wide build flows (ZIP-scoped inventory match) and <strong>Tier 3</strong> on dealership-scoped flows (dealer inventory only).</li>
              <li>Let the selected tab color inherit <code>var(--brand-color)</code> — don't hard-code Chevy blue.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't render the Configurator Sub-header outside the configurator flow — it assumes a selected vehicle + running price context.</li>
              <li>Don't swap the underlined tab bar for the contained <code>Tabs</code> atom — the underline treatment is the spec here.</li>
              <li>Don't hide the count pill when matches = 0 — show "0" so the shopper doesn't wonder if the query is running.</li>
              <li>Don't pair a Tier 3 sub-header with a Tier 1 global Header (or vice-versa) — the IA tiers must match between the two bars.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
