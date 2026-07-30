import { useState, type ReactNode } from 'react'
import { useBrand } from '../../context/BrandContext'

export type QuickFilterProps = {
  icon: string
  children: ReactNode
  initial?: boolean
  disabled?: boolean
  className?: string
  onChange?: (selected: boolean) => void
}

export function QuickFilter({
  icon,
  children,
  initial = false,
  disabled = false,
  className = '',
  onChange,
}: QuickFilterProps) {
  const [selected, setSelected] = useState(initial)
  const cls = [
    'drp-quick-filter',
    selected ? 'is-selected' : '',
    disabled ? 'drp-disabled' : '',
    className,
  ].filter(Boolean).join(' ')
  return (
    <button
      type="button"
      className={cls}
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => {
        if (disabled) return
        const next = !selected
        setSelected(next)
        onChange?.(next)
      }}
    >
      <i className={`drp-icon drp-icon--${icon} drp-quick-filter__icon`} aria-hidden="true" />
      <span className="drp-quick-filter__label">{children}</span>
    </button>
  )
}

export function QuickFilterGroup({ children, ariaLabel, className = '' }: {
  children: ReactNode
  ariaLabel?: string
  className?: string
}) {
  return (
    <div
      className={`drp-quick-filter-group${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  )
}

/* ===== Brand-specific label sets (per Figma) ============================== */

type BrandLabelSet = { label: string; icon: string }[]

const BRAND_LABELS: Record<'chevrolet' | 'buick' | 'gmc' | 'cadillac', BrandLabelSet> = {
  chevrolet: [
    { label: 'Electric',    icon: 'zap' },
    { label: 'SUV',         icon: 'car-suv' },
    { label: 'Truck',       icon: 'car-truck' },
    { label: 'Performance', icon: 'car' },
  ],
  buick: [
    { label: 'Electric', icon: 'zap' },
    { label: 'SUV',      icon: 'car-suv' },
  ],
  gmc: [
    { label: 'Truck',    icon: 'car-truck' },
    { label: 'SUV',      icon: 'car-suv' },
    { label: 'Electric', icon: 'zap' },
    { label: 'Van',      icon: 'car-van' },
  ],
  cadillac: [
    { label: 'SUV',       icon: 'car-suv' },
    { label: 'Sedan',     icon: 'car-sedan' },
    { label: 'Electric',  icon: 'zap' },
    { label: 'V-Series',  icon: 'car' },
  ],
}

function BrandAwareDemo() {
  const { brand } = useBrand()
  const items = BRAND_LABELS[brand] ?? BRAND_LABELS.chevrolet
  return (
    <QuickFilterGroup ariaLabel={`${brand} quick filters`}>
      {items.map((it) => (
        <QuickFilter key={it.label} icon={it.icon}>{it.label}</QuickFilter>
      ))}
    </QuickFilterGroup>
  )
}

function BrandStaticGrid() {
  const order: ('chevrolet' | 'cadillac' | 'buick' | 'gmc')[] = ['chevrolet', 'cadillac', 'buick', 'gmc']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {order.map((b) => (
        <div key={b} data-brand={b} style={{ width: '100%' }}>
          <div className="doc-variant-card__label" style={{ marginBottom: 8, opacity: 0.7, textTransform: 'capitalize' }}>{b}</div>
          <QuickFilterGroup ariaLabel={`${b} quick filters`}>
            {BRAND_LABELS[b].map((it) => (
              <QuickFilter key={it.label} icon={it.icon}>{it.label}</QuickFilter>
            ))}
          </QuickFilterGroup>
        </div>
      ))}
    </div>
  )
}

/* ===== Doc page =========================================================== */

export default function QuickFilterPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Quick Filter</h1>
        <p className="doc-page-header__desc">
          A row of icon-and-label pill buttons for one-tap refinement on the Vehicle Search
          Result page. Each pill is an independent multi-select toggle — tap to add a body-style
          or powertrain filter, tap again to remove it. The group wraps to a second row on narrow
          viewports; the pill itself is fixed at 40px tall (32px icon centered, 16px label, 24px
          horizontal padding) and every pill grows to fill the row evenly with a 140px minimum.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Multi-select</span>
          <span className="doc-tag doc-tag--blue">Icon + label</span>
          <span className="doc-tag">4 brands · 1 size</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=3-46033" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Default */}
      <div className="doc-section">
        <h2 className="doc-section__title">Default</h2>
        <p className="doc-section__subtitle">
          Click any pill to toggle its selected state. Each pill is independent — selection is
          per-pill, not mutually exclusive.
        </p>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ alignItems: 'stretch', padding: 24 }}>
            <BrandAwareDemo />
          </div>
          <div className="doc-variant-card__label">Active brand · labels and styling adapt to the brand switcher</div>
        </div>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <p className="doc-section__subtitle">
          Default sits at <code>#666</code> text on a <code>#ffffff</code> fill with a 1px{' '}
          <code>#e6e6e6</code> border. Hover swaps the fill to <code>#f2f2f2</code> and leaves
          the border + label color unchanged. Selected keeps the white fill but routes the 1px
          border + label color through a brand-specific accent (Chevy <code>#0077D9</code>,
          Cadillac <code>#171473</code>, Buick + GMC neutralize to dark gray rather than brand
          red/orange — see <strong>Brand notes</strong>). Disabled drops to 50% opacity and is
          not interactive.
        </p>
        <div className="doc-variant-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ padding: 24 }}>
              <QuickFilterGroup ariaLabel="State default">
                <button type="button" className="drp-quick-filter" aria-pressed="false">
                  <i className="drp-icon drp-icon--zap drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">Electric</span>
                </button>
                <button type="button" className="drp-quick-filter" aria-pressed="false">
                  <i className="drp-icon drp-icon--car-suv drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">SUV</span>
                </button>
              </QuickFilterGroup>
            </div>
            <div className="doc-variant-card__label">Default</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ padding: 24 }}>
              <QuickFilterGroup ariaLabel="State hover">
                <button type="button" className="drp-quick-filter is-hovered" aria-pressed="false">
                  <i className="drp-icon drp-icon--zap drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">Electric</span>
                </button>
                <button type="button" className="drp-quick-filter" aria-pressed="false">
                  <i className="drp-icon drp-icon--car-suv drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">SUV</span>
                </button>
              </QuickFilterGroup>
            </div>
            <div className="doc-variant-card__label">Hover (left pill)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ padding: 24 }}>
              <QuickFilterGroup ariaLabel="State selected">
                <button type="button" className="drp-quick-filter is-selected" aria-pressed="true">
                  <i className="drp-icon drp-icon--zap drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">Electric</span>
                </button>
                <button type="button" className="drp-quick-filter" aria-pressed="false">
                  <i className="drp-icon drp-icon--car-suv drp-quick-filter__icon" aria-hidden="true" />
                  <span className="drp-quick-filter__label">SUV</span>
                </button>
              </QuickFilterGroup>
            </div>
            <div className="doc-variant-card__label">Selected (left pill)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{ padding: 24 }}>
              <QuickFilterGroup ariaLabel="State disabled">
                <QuickFilter icon="zap" disabled>Electric</QuickFilter>
                <QuickFilter icon="car-suv" disabled initial>SUV</QuickFilter>
              </QuickFilterGroup>
            </div>
            <div className="doc-variant-card__label">Disabled — at 50% opacity</div>
          </div>
        </div>
      </div>

      {/* Brand label sets */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand label sets</h2>
        <p className="doc-section__subtitle">
          Labels and pill counts vary per brand — each brand surfaces the body-styles and
          powertrains its inventory actually carries. Chevrolet and GMC ship four; Buick ships
          two (no Truck or Performance line); Cadillac swaps Truck/Performance for Sedan and the{' '}
          <code>V-Series</code> performance trim. Casing is brand-controlled — GMC and Cadillac
          shift to <code>UPPERCASE</code> via CSS, Chevy and Buick stay Title-case.
        </p>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ alignItems: 'stretch', padding: 24 }}>
            <BrandStaticGrid />
          </div>
          <div className="doc-variant-card__label">All four brand label sets — rendered side-by-side regardless of the active brand</div>
        </div>
      </div>

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <ol className="doc-anatomy-list">
          <li><strong>Group container</strong> — <code>.drp-quick-filter-group</code>, flex-wrap, 24px gap. Houses 2–4 pills.</li>
          <li><strong>Pill button</strong> — <code>.drp-quick-filter</code>. <code>flex: 1 0 0</code> + <code>min-width: 140px</code>, so pills grow to fill the row evenly and break to a new row when the container narrows below ~140px per pill.</li>
          <li><strong>Icon</strong> — <code>.drp-quick-filter__icon</code>, 32px square. Inherits text color via <code>currentColor</code>.</li>
          <li><strong>Label</strong> — <code>.drp-quick-filter__label</code>, 16px / 24px. <code>white-space: nowrap</code> so the pill grows rather than wrapping mid-label.</li>
        </ol>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Each pill is a real <code>&lt;button type="button"&gt;</code> with <code>aria-pressed</code> reflecting the toggle state. The group wrapper carries <code>role="group"</code> + <code>aria-label</code>.</p>
        <pre className="doc-code"><span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-quick-filter-group"</span> <span className="hl-attr">role</span>=<span className="hl-val">"group"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Vehicle quick filters"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-quick-filter is-selected"</span> <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--zap drp-quick-filter__icon"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-quick-filter__label"</span><span className="hl-tag">&gt;</span>Electric<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-quick-filter"</span> <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--car-suv drp-quick-filter__icon"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-quick-filter__label"</span><span className="hl-tag">&gt;</span>SUV<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All <code>--quick-filter-*</code> tokens are inlined as <code>var()</code> fallbacks in <code>styles/global.css</code>; brand variations live under the <code>[data-brand]</code> blocks in <code>styles/brands.css</code>.</p>

        <h3 className="doc-token-group">Sizing &amp; layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--quick-filter-group-gap</code></td><td>24px</td><td>Gap between pills inside the group</td></tr>
              <tr><td><code>--quick-filter-height</code></td><td>40px</td><td>Pill outer height (includes 1px border via <code>box-sizing: border-box</code>)</td></tr>
              <tr><td><code>--quick-filter-padding-x</code></td><td>24px</td><td>Horizontal padding inside each pill</td></tr>
              <tr><td><code>--quick-filter-gap</code></td><td>8px</td><td>Gap between icon and label</td></tr>
              <tr><td><code>--quick-filter-min-width</code></td><td>140px</td><td>Minimum pill width before wrapping to a new row</td></tr>
              <tr><td><code>--quick-filter-icon-size</code></td><td>32px</td><td>Icon glyph size — centers in the 38px content area inside the 40px pill</td></tr>
              <tr><td><code>--quick-filter-radius</code></td><td>8px</td><td>Corner radius (<strong>overridden</strong> → <code>0</code> on GMC + Cadillac)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Color &amp; border</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--quick-filter-bg</code></td><td><span className="doc-swatch" style={{ background: '#ffffff', border: '1px solid #ddd' }}></span>#ffffff</td><td>Default pill fill (brand-invariant)</td></tr>
              <tr><td><code>--quick-filter-bg-hover</code></td><td><span className="doc-swatch" style={{ background: '#f2f2f2', border: '1px solid #ccc' }}></span>#f2f2f2</td><td>Hover fill (brand-invariant)</td></tr>
              <tr><td><code>--quick-filter-bg-selected</code></td><td><span className="doc-swatch" style={{ background: '#ffffff', border: '1px solid #ddd' }}></span>#ffffff</td><td>Selected fill — stays white (brand-invariant)</td></tr>
              <tr><td><code>--quick-filter-border-color</code></td><td><span className="doc-swatch" style={{ background: '#e6e6e6', border: '1px solid #ccc' }}></span>#e6e6e6</td><td>Default + hover border (brand-invariant)</td></tr>
              <tr><td><code>--quick-filter-border-color-selected</code></td><td><span className="doc-swatch" style={{ background: '#0077d9' }}></span>var(--brand-color)</td><td>Selected 1px border (<strong>brand-specific</strong>: Chevy brand-color, Cadillac <code>#171473</code>, Buick <code>#333333</code>, GMC <code>#1a1a1a</code>)</td></tr>
              <tr><td><code>--quick-filter-text-color</code></td><td><span className="doc-swatch" style={{ background: '#666666' }}></span>#666666</td><td>Default + hover label / icon color</td></tr>
              <tr><td><code>--quick-filter-text-color-selected</code></td><td><span className="doc-swatch" style={{ background: '#0077d9' }}></span>var(--brand-color)</td><td>Selected label / icon color (<strong>brand-specific</strong>: Chevy brand-color, Cadillac <code>#171473</code>, Buick <code>#333333</code>, GMC <code>#1a1a1a</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--quick-filter-font-family</code></td><td>var(--type-body-family)</td><td>Inherits the brand body family</td></tr>
              <tr><td><code>--quick-filter-font-size</code></td><td>16px</td><td>Label size (Body-1 medium)</td></tr>
              <tr><td><code>--quick-filter-line-height</code></td><td>24px</td><td>Label line-height</td></tr>
              <tr><td><code>--quick-filter-font-weight</code></td><td>500</td><td>Label weight (<strong>overridden</strong> → <code>700</code> on GMC)</td></tr>
              <tr><td><code>--quick-filter-text-transform</code></td><td>none</td><td>Case (<strong>overridden</strong> → <code>uppercase</code> on GMC + Cadillac)</td></tr>
              <tr><td><code>--quick-filter-letter-spacing</code></td><td>0</td><td>Tracking (<strong>overridden</strong> → <code>0.08em</code> GMC, <code>0.1em</code> Cadillac)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Default and hover states are brand-invariant — only the selected border + label re-theme per brand, and only Chevrolet's selection routes through <code>var(--brand-color)</code>. Buick and GMC <em>neutralize</em> to dark gray on selection (Buick reserves orange for primary CTAs, GMC reserves red for the slider track and primary CTAs — both follow their own live ecommerce sites). Cadillac hardcodes <code>#171473</code>. GMC and Cadillac additionally flatten the radius to <code>0</code> and shift labels to <code>uppercase</code>.</p>
        <ul className="doc-brand-list">
          <li><strong>Chevrolet</strong> — Title-case labels (<em>Electric · SUV · Truck · Performance</em>). Selected border + label route through <code>var(--brand-color)</code> (<span className="doc-swatch" style={{ background: '#0077D9' }}></span><code>#0077D9</code>). Radius 8px, font Chevy Sans 500.</li>
          <li><strong>Buick</strong> — Title-case labels with a shorter set (<em>Electric · SUV</em>). Selected border + label hardcode <span className="doc-swatch" style={{ background: '#333333' }}></span><code>#333333</code> charcoal — <em>not</em> brand orange (matches Toggle Button's Buick pattern; Buick reserves <code>#D44400</code> for primary CTAs). Font Buick_Text 500. Radius stays at 8px.</li>
          <li><strong>GMC</strong> — UPPERCASE labels (<em>TRUCK · SUV · ELECTRIC · VAN</em>) with the Van slot replacing Performance. Selected border + label hardcode <span className="doc-swatch" style={{ background: '#1a1a1a' }}></span><code>#1a1a1a</code> near-black — <em>not</em> brand red (matches gmc.com convention; GMC reserves <code>#CC0000</code> for the slider track and primary CTAs, not in-content filter selection). Radius → 0, font StratumGMC weight 700, letter-spacing 0.08em.</li>
          <li><strong>Cadillac</strong> — UPPERCASE labels (<em>SUV · SEDAN · ELECTRIC · V-SERIES</em>) with Sedan and the V-Series performance trim replacing Truck and Performance. Selected border + label <em>hardcode</em> <span className="doc-swatch" style={{ background: '#171473' }}></span><code>#171473</code> instead of routing through <code>var(--brand-color)</code> — same Cadillac-hardcode pattern Slider and Stepper use. Radius → 0, font Cadillac_Gothic_Narrow 500, letter-spacing 0.1em.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use for the top 2–4 high-traffic refinements that shoppers reach for first (body style + powertrain).</li>
              <li>Treat each pill as independent multi-select — pre-selecting two pills should narrow the result set to the union, not the intersection.</li>
              <li>Curate the label set per brand to match the inventory actually carried (Buick has no Truck; Cadillac calls it V-Series, not Performance).</li>
              <li>Provide an <code>aria-label</code> on the group describing what is being filtered.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use as mutually exclusive selection — that's <code>Toggle Button Group</code>.</li>
              <li>Don't ship more than four pills per row — once the set grows, fold the rest into the full filter rail.</li>
              <li>Don't hardcode <code>#0077D9</code> on the selected border or label — route through <code>var(--brand-color)</code> so the rail re-themes.</li>
              <li>Don't use plain text labels without an icon — the 32px icon is the primary scan cue at glance.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
