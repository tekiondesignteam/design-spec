import { useState, type CSSProperties, type ReactNode } from 'react'
import { useBrand } from '../../context/BrandContext'
import { InlineButton } from './inline-button'
import { QuickFilter, QuickFilterGroup } from './quick-filter'

type Viewport = 'desktop' | 'tablet' | 'mobile'
type PaymentTab = 'cash' | 'finance' | 'lease' | 'error'
type FilterState = 'default' | 'disabled' | 'mobile-default' | 'mobile-selected' | 'mobile-active'

type ColorSwatch = {
  id: string
  label: string
  /** Single fill, OR a `linear-gradient(...)` for two-tone, OR a comma-pair for half/half. */
  fill: string | { left: string; right: string }
  border?: boolean
}

const EXTERIOR_COLORS: readonly ColorSwatch[] = [
  { id: 'ext-black',     label: 'Black',          fill: '#0a0a0a' },
  { id: 'ext-maroon',    label: 'Maroon',         fill: '#5e1414' },
  { id: 'ext-charcoal',  label: 'Charcoal',       fill: '#3b3b3b' },
  { id: 'ext-navy',      label: 'Navy',           fill: '#1d1976' },
  { id: 'ext-forest',    label: 'Forest',         fill: '#1f3a2a' },
  { id: 'ext-orange',    label: 'Sunburst',       fill: '#c46324' },
  { id: 'ext-red',       label: 'Crimson',        fill: '#a51a1a' },
  { id: 'ext-silver',    label: 'Silver',         fill: '#c8c8c8', border: true },
  { id: 'ext-white',     label: 'White',          fill: '#ffffff', border: true },
  { id: 'ext-yellow',    label: 'Sunshine',       fill: '#f5e500' },
  { id: 'ext-tan',       label: 'Sandstone',      fill: '#c9a878' },
  { id: 'ext-purple',    label: 'Plum',           fill: '#7d2382' },
  { id: 'ext-twotone',   label: 'Two-tone',       fill: { left: '#1d1976', right: '#a51a1a' } },
  { id: 'ext-blackwhite',label: 'Black / White',  fill: { left: '#0a0a0a', right: '#ffffff' }, border: true },
]

const INTERIOR_COLORS: readonly ColorSwatch[] = EXTERIOR_COLORS.slice(0, 11)

type FilterOption = { id: string; label: string; count: number; checked?: boolean }

const YEAR_OPTIONS: readonly FilterOption[] = [
  { id: 'y-2025', label: '2025', count: 23 },
  { id: 'y-2024', label: '2024', count: 43 },
]

const VEHICLE_OPTIONS: readonly FilterOption[] = [
  { id: 'v-blazer-ev', label: 'Blazer EV',  count: 23 },
  { id: 'v-bolt-ev',   label: 'Bolt EV',    count: 43 },
  { id: 'v-equinox',   label: 'Equinox EV', count: 37 },
  { id: 'v-silver-ev', label: 'Silverado EV', count: 15 },
  { id: 'v-blazer',    label: 'Blazer',     count: 27 },
]

const FEATURE_OPTIONS: readonly FilterOption[] = [
  { id: 'f-fca',   label: 'Forward Collision Alert',     count: 43 },
  { id: 'f-teen',  label: 'Teen Driver',                 count: 37 },
  { id: 'f-acc',   label: 'Adaptive Cruise Control',     count: 27 },
  { id: 'f-hsw',   label: 'Heated steering wheel',       count: 23 },
  { id: 'f-aeb',   label: 'Automatic Emergency Braking', count: 15 },
]

const PACKAGE_OPTIONS: readonly FilterOption[] = [
  { id: 'p-comfort', label: 'Comfort Package',             count: 23 },
  { id: 'p-cruise',  label: 'Super Cruise Package',        count: 43 },
  { id: 'p-liner',   label: 'All-Weather Liner Package',   count: 37 },
  { id: 'p-safety',  label: 'Chevrolet Safety Assist',     count: 15 },
  { id: 'p-2lt',     label: '2LT Preferred Equipment Group', count: 23 },
]

const DRIVE_TYPE_OPTIONS: readonly FilterOption[] = [
  { id: 'd-4wd',  label: 'Four Wheel Drive',  count: 23 },
  { id: 'd-fwd',  label: 'Front Wheel Drive', count: 43 },
  { id: 'd-awd',  label: 'All Wheel Drive',   count: 37 },
  { id: 'd-rwd',  label: 'Rear Wheel Drive',  count: 37 },
]

const FUEL_TYPE_OPTIONS: readonly FilterOption[] = [
  { id: 'fu-gas',      label: 'Gasoline Fuel',        count: 23 },
  { id: 'fu-electric', label: 'Electric Fuel System', count: 43 },
  { id: 'fu-diesel',   label: 'Diesel Fuel',          count: 37 },
]

const TRAILERING_OPTIONS: readonly FilterOption[] = [
  { id: 't-9300',  label: '9,300',  count: 23 },
  { id: 't-9000',  label: '9,000',  count: 43 },
  { id: 't-9200',  label: '9,200',  count: 37 },
  { id: 't-11000', label: '11,000', count: 15 },
  { id: 't-9500',  label: '9,500',  count: 27 },
]

const ROW_OPTIONS: readonly number[] = [1, 2, 3, 4, 5]
const SEAT_OPTIONS: readonly number[] = [2, 3, 5, 6, 7, 8]

const QUICK_FILTERS: readonly { id: string; label: string; icon: string }[] = [
  { id: 'qf-electric',    label: 'Electric',    icon: 'zap' },
  { id: 'qf-suv',         label: 'SUV',         icon: 'car-suv' },
  { id: 'qf-truck',       label: 'Truck',       icon: 'car-truck' },
  { id: 'qf-performance', label: 'Performance', icon: 'car' },
]

/* ----- Atomic-component re-uses (CSS-only, no React export available) ----- */

function CheckboxRow({ option, disabled, withInfo, checked, onChange }: {
  option: FilterOption
  disabled?: boolean
  withInfo?: boolean
  checked?: boolean
  onChange: (checked: boolean) => void
}) {
  const isChecked = !!checked
  return (
    <label className={`drp-checkbox-container drp-vsr-filter__checkbox-row${isChecked ? ' is-checked' : ''}${disabled ? ' drp-disabled' : ''}`}>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={isChecked}
        disabled={!!disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox__box">
        <svg className="checkbox__check" viewBox="0 0 11 9" fill="none" aria-hidden="true">
          <path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="checkbox__dash"></span>
      </span>
      <span className="drp-checkbox-typography-large drp-vsr-filter__option-label">
        {option.label}
        <span className="drp-vsr-filter__option-count"> ({option.count})</span>
      </span>
      {withInfo && (
        <button
          type="button"
          className="drp-vsr-filter__info-trigger"
          aria-label={`More info about ${option.label}`}
          onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
        >
          <i className="drp-icon drp-icon--info" aria-hidden="true" />
        </button>
      )}
    </label>
  )
}

function NumericPillGrid({ values, ariaLabel, disabled }: {
  values: readonly number[]
  ariaLabel: string
  disabled?: boolean
}) {
  const [selected, setSelected] = useState<number[]>([])
  const toggle = (n: number) =>
    setSelected((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]))
  return (
    <div className="drp-vsr-filter__numeric-grid" role="group" aria-label={ariaLabel}>
      {values.map((n) => {
        const isOn = selected.includes(n)
        return (
          <button
            key={n}
            type="button"
            className={`drp-vsr-filter__numeric-pill${isOn ? ' is-selected' : ''}`}
            aria-pressed={isOn}
            disabled={disabled}
            onClick={() => !disabled && toggle(n)}
          >
            {n}
          </button>
        )
      })}
    </div>
  )
}

function CaptionedRangeSlider({ min, max, initialLower, initialUpper, formatValue, disabled }: {
  min: number
  max: number
  initialLower: number
  initialUpper: number
  formatValue?: (v: number) => string
  disabled?: boolean
}) {
  const [lower, setLower] = useState(initialLower)
  const [upper, setUpper] = useState(initialUpper)
  const lPct = ((lower - min) / (max - min)) * 100
  const uPct = ((upper - min) / (max - min)) * 100
  const fmt = formatValue ?? ((v: number) => String(v))
  return (
    <div className={`drp-vsr-filter__captioned-range${disabled ? ' drp-disabled' : ''}`}>
      <div className="drp-vsr-filter__captioned-range-value">{fmt(lower)} - {fmt(upper)}</div>
      <div className="drp-slider-container drp-slider-container--range drp-vsr-filter__captioned-range-slider">
        <div className="drp-slider-track-wrap">
          <div className="drp-slider-range-track">
            <div className="drp-slider-range-fill" style={{ left: `${lPct}%`, right: `${100 - uPct}%` }}></div>
          </div>
          <input
            type="range"
            className="drp-slider-input drp-slider-input--lower"
            min={min} max={max} value={lower}
            aria-label="Minimum"
            disabled={disabled}
            onChange={(e) => {
              const v = +e.target.value
              if (v <= upper) setLower(v)
            }}
          />
          <input
            type="range"
            className="drp-slider-input drp-slider-input--upper"
            min={min} max={max} value={upper}
            aria-label="Maximum"
            disabled={disabled}
            onChange={(e) => {
              const v = +e.target.value
              if (v >= lower) setUpper(v)
            }}
          />
        </div>
      </div>
    </div>
  )
}

function PaymentTabs({ active, onChange, disabled }: {
  active: PaymentTab
  onChange?: (next: PaymentTab) => void
  disabled?: boolean
}) {
  const items: { id: PaymentTab; label: string }[] = [
    { id: 'cash',    label: 'Cash' },
    { id: 'finance', label: 'Finance' },
    { id: 'lease',   label: 'Lease' },
  ]
  return (
    <div
      className="drp-tab-contained-container drp-tab-contained-container--lg drp-vsr-filter__payment-tabs"
      role="tablist"
      aria-label="Payment method"
      aria-disabled={disabled || undefined}
    >
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          role="tab"
          aria-selected={active === it.id}
          disabled={disabled}
          className={`drp-tab-contained-tab-container-bg${active === it.id ? ' is-selected' : ''}`}
          onClick={() => !disabled && onChange?.(it.id)}
        >
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  )
}

function RangeSlider({ min, max, lower, upper, onChange, disabled }: {
  min: number; max: number; lower: number; upper: number
  onChange?: (next: { lower: number; upper: number }) => void
  disabled?: boolean
}) {
  const lPct = ((lower - min) / (max - min)) * 100
  const uPct = ((upper - min) / (max - min)) * 100
  return (
    <div className={`drp-slider-container drp-slider-container--range${disabled ? ' drp-disabled' : ''}`}>
      <div className="drp-slider-track-wrap">
        <div className="drp-slider-range-track">
          <div className="drp-slider-range-fill" style={{ left: `${lPct}%`, right: `${100 - uPct}%` }}></div>
        </div>
        <input
          type="range"
          className="drp-slider-input drp-slider-input--lower"
          min={min} max={max} value={lower}
          aria-label="Minimum"
          disabled={disabled}
          onChange={(e) => {
            const v = +e.target.value
            if (v <= upper) onChange?.({ lower: v, upper })
          }}
        />
        <input
          type="range"
          className="drp-slider-input drp-slider-input--upper"
          min={min} max={max} value={upper}
          aria-label="Maximum"
          disabled={disabled}
          onChange={(e) => {
            const v = +e.target.value
            if (v >= lower) onChange?.({ lower, upper: v })
          }}
        />
      </div>
      <div className="drp-slider-footer">
        <span className="drp-slider-typography-range">Min</span>
        <span className="drp-slider-typography-range">Max</span>
      </div>
    </div>
  )
}

function SingleSlider({ min, max, value, onChange, disabled }: {
  min: number; max: number; value: number
  onChange?: (next: number) => void
  disabled?: boolean
}) {
  const fillPct = ((value - min) / (max - min)) * 100
  return (
    <div className={`drp-slider-container${disabled ? ' drp-disabled' : ''}`}>
      <div className="drp-slider-track-wrap">
        <input
          type="range"
          className="drp-slider-input"
          min={min} max={max} value={value}
          aria-label="Estimated payment"
          disabled={disabled}
          style={{ '--fill': `${fillPct}%` } as CSSProperties}
          onChange={(e) => onChange?.(+e.target.value)}
        />
      </div>
    </div>
  )
}

/* ----- Payment payload (Cash | Finance | Lease | Error) ------------------- */

function PaymentPayload({ tab, disabled }: { tab: PaymentTab; disabled?: boolean }) {
  const [range, setRange] = useState({ lower: 0, upper: 100 })
  const [monthly, setMonthly] = useState(50)

  if (tab === 'error') {
    return (
      <div className="drp-vsr-filter__error">
        <p className="drp-vsr-filter__error-msg">
          Sorry, there was an error completing this request.<br />
          Please try again later.
        </p>
        <button
          type="button"
          className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled"
          onClick={(e) => e.preventDefault()}
        >
          Retry
        </button>
      </div>
    )
  }

  if (tab === 'cash') {
    return (
      <div className={`drp-vsr-filter__payment${disabled ? ' drp-disabled' : ''}`}>
        <div className="drp-vsr-filter__payment-label">Net Price Payment</div>
        <div className="drp-vsr-filter__payment-value">$0 - $250,000+</div>
        <RangeSlider min={0} max={100} lower={range.lower} upper={range.upper} onChange={setRange} disabled={disabled} />
      </div>
    )
  }

  return (
    <div className={`drp-vsr-filter__payment${disabled ? ' drp-disabled' : ''}`}>
      <div className="drp-vsr-filter__payment-label">Est. Monthly Payment</div>
      <div className="drp-vsr-filter__payment-value">$2,000/mo.</div>
      <SingleSlider min={0} max={100} value={monthly} onChange={setMonthly} disabled={disabled} />
    </div>
  )
}

/* ----- Quick-filter outlined buttons — atomic QuickFilter -------------------
   Atomic QuickFilterGroup uses flex-wrap with flex:1 + min-width:140px on each
   item. At the 354px rail (322px usable after 16px×2 padding), 2 items per row
   fit naturally — yielding the 2-col × 2-row layout per the VSR design without
   forcing a grid container. Brand re-theming flows through atomic
   --quick-filter-* token family in brands.css. */

function QuickFilterGrid() {
  return (
    <QuickFilterGroup ariaLabel="Quick filters">
      {QUICK_FILTERS.map((qf) => (
        <QuickFilter key={qf.id} icon={qf.icon}>{qf.label}</QuickFilter>
      ))}
    </QuickFilterGroup>
  )
}

/* ----- Color swatch grid (NET NEW) --------------------------------------- */

function ColorSwatchButton({ swatch, selected, onToggle }: {
  swatch: ColorSwatch
  selected: boolean
  onToggle: () => void
}) {
  const fill =
    typeof swatch.fill === 'string'
      ? swatch.fill
      : `linear-gradient(90deg, ${swatch.fill.left} 0 50%, ${swatch.fill.right} 50% 100%)`
  return (
    <button
      type="button"
      className={`drp-vsr-filter__swatch${selected ? ' is-selected' : ''}${swatch.border ? ' drp-vsr-filter__swatch--bordered' : ''}`}
      aria-label={swatch.label}
      aria-pressed={selected}
      onClick={onToggle}
    >
      <span className="drp-vsr-filter__swatch-disc" style={{ background: fill }} />
    </button>
  )
}

function ColorGrid({ swatches }: { swatches: readonly ColorSwatch[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  return (
    <div className="drp-vsr-filter__color-grid" role="group" aria-label="Color swatches">
      {swatches.map((sw) => (
        <ColorSwatchButton
          key={sw.id}
          swatch={sw}
          selected={selected.includes(sw.id)}
          onToggle={() => toggle(sw.id)}
        />
      ))}
    </div>
  )
}

/* ----- Accordion section wrapper (consumes accordion CSS) ----------------- */

function FilterAccordionItem({
  id, label, children, initialOpen = false, selectedCount,
}: {
  id: string
  label: string
  children?: ReactNode
  initialOpen?: boolean
  selectedCount?: number
}) {
  const [open, setOpen] = useState(initialOpen)
  return (
    <div className={`drp-accordion-container-bg${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="drp-accordion-container-summary-bg"
        aria-expanded={open}
        aria-controls={`vsr-filter-${id}`}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="accordion__label-wrap"><span className="accordion__label">{label}</span></div>
        <div className="drp-vsr-filter__summary-right">
          {selectedCount ? <span className="drp-vsr-filter__count-badge">{selectedCount}</span> : null}
          <span className="accordion__icon" aria-hidden="true">
            <i className="drp-icon drp-icon--plus accordion__icon-closed"></i>
            <i className="drp-icon drp-icon--circle-minus accordion__icon-open"></i>
          </span>
        </div>
      </button>
      {children && (
        <div className="drp-accordion-details" role="region" id={`vsr-filter-${id}`}>
          <div className="drp-vsr-filter__filter-body">{children}</div>
        </div>
      )}
    </div>
  )
}

/* ----- Mobile chrome ----------------------------------------------------- */

function MobileHeader() {
  return (
    <header className="drp-vsr-filter__mobile-header">
      <div className="drp-vsr-filter__mobile-title">
        <i className="drp-icon drp-icon--sliders-horizontal" aria-hidden="true" />
        <span>Filters</span>
      </div>
      <button
        type="button"
        className="drp-button-contained-icon-container-circle-bg-small drp-button-contained-color-primary-plain"
        aria-label="Close filters"
        onClick={(e) => e.preventDefault()}
      >
        <i className="drp-icon drp-icon--close" aria-hidden="true" />
      </button>
    </header>
  )
}

function MobileActionBar({
  count = 354,
  clearEnabled = false,
  onClearAll,
}: {
  count?: number
  clearEnabled?: boolean
  onClearAll?: () => void
}) {
  return (
    <div className="drp-vsr-filter__mobile-actions">
      <div className="drp-vsr-filter__count-row">{count} Vehicle(s)</div>
      <div className="drp-vsr-filter__action-row">
        <button
          type="button"
          className={`drp-button-contained-container-bg-medium drp-button-contained-color-primary-outlined${clearEnabled ? '' : ' drp-disabled'}`}
          disabled={!clearEnabled}
          onClick={(e) => { e.preventDefault(); onClearAll?.() }}
        >
          Clear All
        </button>
        <button
          type="button"
          className="drp-button-contained-container-bg-medium drp-button-contained-color-primary-filled"
          onClick={(e) => e.preventDefault()}
        >
          Apply
        </button>
      </div>
    </div>
  )
}

/* ----- Privacy / legal footer ------------------------------------------- */

function AdChoicesIcon() {
  // AdChoices registered self-regulatory mark — always the official teal #00AECD
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.26878 15.8351C3.04198 15.8351 3.58322 15.4392 4.12445 15.1225C4.58837 14.8849 5.05229 14.5682 5.59353 14.3307C8.06775 12.9847 10.542 11.5596 13.0162 10.1344C13.7894 9.73856 14.7946 9.34268 15.3358 8.6301C15.4904 8.39258 15.7224 8.07588 15.6451 7.68C15.4131 6.80907 14.3306 6.49237 13.6348 6.0965C11.9337 5.14639 10.1554 4.11711 8.45435 3.16701C7.83579 2.77113 6.90796 2.05856 6.13476 2.61278C5.82548 2.77113 5.67085 2.92948 5.59353 3.16701C5.51621 3.48371 5.59353 3.87959 5.59353 4.19629V6.7299C5.59353 7.44247 5.51621 7.9967 5.98012 8.3134C6.13476 8.39258 6.44404 8.47175 6.676 8.39258C7.4492 8.07588 7.21724 6.65072 7.21724 5.54227V4.67134C8.53167 5.38392 9.8461 6.0965 11.1605 6.7299C11.6245 6.96742 12.3976 7.20495 12.5523 7.83835C12.7069 8.55093 11.2379 9.10515 10.7739 9.34268L5.43889 12.4305C5.05229 12.668 4.04713 13.4598 3.42858 13.2223C3.19662 13.1431 3.04198 12.9056 3.04198 12.7472C2.96466 12.4305 2.96466 11.9555 2.96466 11.5596V9.02598V4.75052C2.96466 4.11711 2.88734 3.32536 3.1193 2.92948C3.66054 2.13773 4.89765 3.56289 5.28425 2.29608C5.36157 1.97938 5.20693 1.66268 5.05229 1.50433C4.74301 1.02928 3.35126 0.316701 2.81002 0.158351C2.65538 0.0791753 2.26878 0 2.03682 0C0.722392 0.237526 1.03167 2.37526 1.03167 3.95876V11.7971C1.03167 12.9847 0.877031 14.5682 1.34095 15.2808C1.57291 15.6767 1.80487 15.6767 2.26878 15.8351ZM6.2894 10.6887C7.4492 10.6887 7.52652 9.18433 6.44404 8.94681C5.82548 8.86763 5.36157 9.50103 5.51621 10.0553C5.67085 10.4511 5.9028 10.5303 6.2894 10.6887Z" fill="#00AECD"/>
    </svg>
  )
}

function PrivacyChoicesIcon() {
  // Privacy Choices registered mark — always the official blue #0066FF
  return (
    <svg width="29" height="20" viewBox="0 0 29 20" fill="none" aria-hidden="true">
      <path d="M22.0479 3C25.8218 3 29 6.1 29 10C29 13.9 25.9211 17 22.0479 17H6.95215C3.07886 17 0 13.9 0 10C0 6.1 3.07886 3 6.95215 3H22.0479ZM6.95215 4.2002C3.77407 4.2002 1.19141 6.8 1.19141 10C1.19141 13.2 3.77407 15.7998 6.95215 15.7998H13.7051L16.7842 4.2002H6.95215ZM24.0342 7C23.8355 6.80003 23.4379 6.80001 23.2393 7L21.0547 9.2002L18.8701 7C18.6715 6.8 18.2738 6.8 18.0752 7C17.8767 7.19997 17.8768 7.59977 18.0752 7.7998L20.2607 10L18.1748 12.2002C17.9762 12.4002 17.9762 12.8 18.1748 13C18.3734 13.1999 18.7701 13.1998 18.9688 13L21.1543 10.7998L23.3389 13C23.5375 13.2 23.9352 13.2 24.1338 13C24.3322 12.8 24.3322 12.4002 24.1338 12.2002L21.9482 10L24.0342 7.7998C24.2327 7.59978 24.2328 7.19998 24.0342 7ZM11.3223 7.09961C11.521 6.90001 11.9181 6.89983 12.2158 7.09961C12.4145 7.29961 12.5141 7.70039 12.3154 7.90039L8.14355 12.7998C8.04425 12.8998 7.945 13 7.8457 13C7.64709 13.0999 7.34897 13.1003 7.15039 12.9004L4.96582 10.7002C4.76725 10.5003 4.76735 10.1004 4.96582 9.90039C5.16445 9.70039 5.56211 9.70039 5.76074 9.90039L7.54785 11.5996L11.3223 7.09961Z" fill="#0066FF"/>
    </svg>
  )
}

function LegalFooter() {
  return (
    <footer className="drp-vsr-filter__legal">
      <div className="drp-vsr-filter__legal-links">
        <a href="#" className="drp-vsr-filter__legal-link" onClick={(e) => e.preventDefault()}>GM Privacy Statement</a>
        <a href="#" className="drp-vsr-filter__legal-link" onClick={(e) => e.preventDefault()}>Legal</a>
        <a href="#" className="drp-vsr-filter__legal-link drp-vsr-filter__legal-link--adchoice" onClick={(e) => e.preventDefault()}>
          <span className="drp-vsr-filter__legal-glyph"><AdChoicesIcon /></span> AdChoices
        </a>
      </div>
      <a href="#" className="drp-vsr-filter__legal-link drp-vsr-filter__privacy-row" onClick={(e) => e.preventDefault()}>
        <span className="drp-vsr-filter__legal-glyph"><PrivacyChoicesIcon /></span>
        <span>Your Privacy Choices &amp; Opt-Out Rights</span>
      </a>
      <div className="drp-vsr-filter__gpc">GPC Honored</div>
    </footer>
  )
}

/* ----- Main filter molecule ---------------------------------------------- */

function VsrFilter({
  viewport = 'desktop',
  state = 'default',
  paymentTab = 'cash',
  showQuickFilters = false,
  initialSelected,
}: {
  viewport?: Viewport
  state?: FilterState
  paymentTab?: PaymentTab
  showQuickFilters?: boolean
  initialSelected?: readonly string[]
}) {
  useBrand() // re-render on brand switch (CSS does the work)
  const disabled = state === 'disabled'
  const isMobile = viewport === 'mobile'
  const isActive = state === 'mobile-active'
  const expandPrimary = !disabled && !showQuickFilters && !isActive
  const [activeTab, setActiveTab] = useState<PaymentTab>(paymentTab)
  const isError = activeTab === 'error'

  const [selected, setSelected] = useState<Set<string>>(() => new Set(initialSelected ?? []))
  const toggle = (id: string, isChecked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (isChecked) next.add(id)
      else next.delete(id)
      return next
    })
  }
  const clearAll = () => setSelected(new Set())
  const countIn = (opts: readonly FilterOption[]) => opts.reduce((n, o) => n + (selected.has(o.id) ? 1 : 0), 0)
  const hasSelections = selected.size > 0
  const renderRow = (opt: FilterOption, withInfo?: boolean) => (
    <CheckboxRow
      key={opt.id}
      option={opt}
      disabled={disabled}
      withInfo={withInfo}
      checked={selected.has(opt.id)}
      onChange={(c) => toggle(opt.id, c)}
    />
  )

  return (
    <div
      className={[
        'drp-vsr-filter',
        `drp-vsr-filter--${viewport}`,
        disabled ? 'is-disabled' : '',
        isActive ? 'is-active' : '',
      ].filter(Boolean).join(' ')}
      data-viewport={viewport}
    >
      {isMobile && <MobileHeader />}

      <div className="drp-vsr-filter__location">
        <div className="drp-vsr-filter__location-row">
          <i className="drp-icon drp-icon--map-pin drp-vsr-filter__location-pin" aria-hidden="true" />
          <span className="drp-vsr-filter__location-zip">92504, Riverside, CA</span>
          <button
            type="button"
            className="drp-vsr-filter__location-edit"
            aria-label="Edit location"
            onClick={(e) => e.preventDefault()}
          >
            <i className="drp-icon drp-icon--pencil" aria-hidden="true" />
          </button>
        </div>
        <div className="drp-vsr-filter__location-miles">(100 miles)</div>
      </div>

      <PaymentTabs
        active={isError ? 'cash' : activeTab}
        onChange={setActiveTab}
        disabled={disabled}
      />

      <div className="drp-vsr-filter__heading-row">
        <h2 className="drp-vsr-filter__heading">Filters</h2>
        {hasSelections && !disabled && !isMobile && (
          <InlineButton size="medium" onClick={(e) => { e.preventDefault(); clearAll() }}>
            Clear All
          </InlineButton>
        )}
      </div>

      <PaymentPayload tab={activeTab} disabled={disabled} />

      {showQuickFilters && <QuickFilterGrid />}

      <div className="drp-accordion-group drp-vsr-filter__sections">
        <FilterAccordionItem id="year" label="Year" initialOpen={expandPrimary} selectedCount={countIn(YEAR_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {YEAR_OPTIONS.map((opt) => renderRow(opt))}
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem
          id="vehicle"
          label="Vehicle"
          initialOpen={expandPrimary || isActive}
          selectedCount={countIn(VEHICLE_OPTIONS)}
        >
          <div className="drp-vsr-filter__filter-options">
            {VEHICLE_OPTIONS.map((opt) => renderRow(opt))}
          </div>
          <div className="drp-vsr-filter__view-more">
            <InlineButton size="medium" onClick={(e) => e.preventDefault()}>View More (4)</InlineButton>
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="ext-color" label="Exterior Color" initialOpen={expandPrimary}>
          <ColorGrid swatches={EXTERIOR_COLORS} />
          <div className="drp-vsr-filter__view-more">
            <InlineButton size="medium" onClick={(e) => e.preventDefault()}>View More (4)</InlineButton>
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="int-color" label="Interior Color" initialOpen={expandPrimary}>
          <ColorGrid swatches={INTERIOR_COLORS} />
        </FilterAccordionItem>

        <FilterAccordionItem id="features" label="Popular Features" selectedCount={countIn(FEATURE_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {FEATURE_OPTIONS.map((opt) => renderRow(opt))}
          </div>
          <div className="drp-vsr-filter__view-more">
            <InlineButton size="medium" onClick={(e) => e.preventDefault()}>View More (4)</InlineButton>
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="packages" label="Packages" selectedCount={countIn(PACKAGE_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {PACKAGE_OPTIONS.map((opt) => renderRow(opt, true))}
          </div>
          <div className="drp-vsr-filter__view-more">
            <InlineButton size="medium" onClick={(e) => e.preventDefault()}>View More (4)</InlineButton>
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="rows-seats" label="Number of Rows & Seats">
          <div className="drp-vsr-filter__numeric-section">
            <div className="drp-vsr-filter__numeric-label">Rows</div>
            <NumericPillGrid values={ROW_OPTIONS} ariaLabel="Number of rows" disabled={disabled} />
          </div>
          <div className="drp-vsr-filter__numeric-section">
            <div className="drp-vsr-filter__numeric-label">Seats</div>
            <NumericPillGrid values={SEAT_OPTIONS} ariaLabel="Number of seats" disabled={disabled} />
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="drive-type" label="Drive Type" selectedCount={countIn(DRIVE_TYPE_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {DRIVE_TYPE_OPTIONS.map((opt) => renderRow(opt))}
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="fuel-type" label="Fuel Type" selectedCount={countIn(FUEL_TYPE_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {FUEL_TYPE_OPTIONS.map((opt) => renderRow(opt))}
          </div>
        </FilterAccordionItem>

        <FilterAccordionItem id="mpg" label="Est. MPG/MPGe">
          <CaptionedRangeSlider min={0} max={100} initialLower={10} initialUpper={30} disabled={disabled} />
        </FilterAccordionItem>

        <FilterAccordionItem id="range" label="Est. Range">
          <CaptionedRangeSlider min={0} max={500} initialLower={200} initialUpper={300} disabled={disabled} />
        </FilterAccordionItem>

        <FilterAccordionItem id="tow" label="Trailering Capacity" selectedCount={countIn(TRAILERING_OPTIONS)}>
          <div className="drp-vsr-filter__filter-options">
            {TRAILERING_OPTIONS.map((opt) => renderRow(opt))}
          </div>
          <div className="drp-vsr-filter__view-more">
            <InlineButton size="medium" onClick={(e) => e.preventDefault()}>View More (4)</InlineButton>
          </div>
        </FilterAccordionItem>
      </div>

      <LegalFooter />

      {isMobile && <MobileActionBar clearEnabled={hasSelections && !disabled} onClearAll={clearAll} />}
    </div>
  )
}

/* ===== Showcases ========================================================= */

function DefaultDesktopShowcase() {
  return (
    <div className="doc-variant-card" style={{ width: 'fit-content' }}>
      <div className="doc-variant-card__preview" style={{ padding: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 354 }}>
          <VsrFilter viewport="desktop" state="default" paymentTab="cash" />
        </div>
      </div>
      <div className="doc-variant-card__label">Desktop · 354px</div>
    </div>
  )
}

function PaymentVariantsShowcase() {
  const variants: { tab: PaymentTab; label: string; desc: string }[] = [
    { tab: 'cash',    label: 'Cash',    desc: '"Net Price Payment" + Range Slider' },
    { tab: 'finance', label: 'Finance', desc: '"Est. Monthly Payment" + Single Slider' },
    { tab: 'lease',   label: 'Lease',   desc: '"Est. Monthly Payment" + Single Slider' },
    { tab: 'error',   label: 'GD Error', desc: 'Generic-decline message + Retry button' },
  ]
  return (
    <div className="doc-variant-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
      {variants.map((v) => (
        <div className="doc-variant-card" key={v.tab}>
          <div className="doc-variant-card__preview" style={{ padding: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 280 }} className="drp-vsr-filter drp-vsr-filter--desktop drp-vsr-filter--snippet">
              <PaymentTabs active={v.tab === 'error' ? 'cash' : v.tab} />
              <h2 className="drp-vsr-filter__heading">Filters</h2>
              <PaymentPayload tab={v.tab} />
            </div>
          </div>
          <div className="doc-variant-card__label">{v.label} — {v.desc}</div>
        </div>
      ))}
    </div>
  )
}

function MobileShowcase() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
      <div>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ padding: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 375 }}>
              <VsrFilter viewport="mobile" state="mobile-default" />
            </div>
          </div>
        </div>
        <div className="doc-variant-card__label" style={{ marginTop: 8, opacity: 0.7 }}>Mobile · Default</div>
      </div>
      <div>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ padding: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 375 }}>
              <VsrFilter viewport="mobile" state="mobile-selected" showQuickFilters initialSelected={['v-blazer-ev']} />
            </div>
          </div>
        </div>
        <div className="doc-variant-card__label" style={{ marginTop: 8, opacity: 0.7 }}>Mobile · Selected (quick filters + count badge)</div>
      </div>
      <div>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ padding: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 375 }}>
              <VsrFilter viewport="mobile" state="mobile-active" />
            </div>
          </div>
        </div>
        <div className="doc-variant-card__label" style={{ marginTop: 8, opacity: 0.7 }}>Mobile · Active (one section open)</div>
      </div>
      <div>
        <div className="doc-variant-card">
          <div className="doc-variant-card__preview" style={{ padding: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 375 }}>
              <VsrFilter viewport="mobile" state="disabled" />
            </div>
          </div>
        </div>
        <div className="doc-variant-card__label" style={{ marginTop: 8, opacity: 0.7 }}>Mobile · Disabled (all sections collapsed, controls inert)</div>
      </div>
    </div>
  )
}

function DisabledShowcase() {
  return (
    <div className="doc-variant-card" style={{ width: 'fit-content' }}>
      <div className="doc-variant-card__preview" style={{ padding: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 354 }}>
          <VsrFilter viewport="desktop" state="disabled" />
        </div>
      </div>
      <div className="doc-variant-card__label">Desktop · Disabled (all sections collapsed, controls non-interactive)</div>
    </div>
  )
}

/* ===== Doc page ========================================================== */

export default function VsrFilterPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Domain Components</div>
        <h1 className="doc-page-header__title">VSR Filter</h1>
        <p className="doc-page-header__desc">
          Left-rail (desktop / tablet) or full-bleed sheet (mobile) filter for the
          <strong> Vehicle Search Result</strong> page. Anchors a ZIP / radius header on top, swaps
          payment context (Cash · Finance · Lease) and shows the matching pricing slider, then
          stacks every refinement category — Year, Vehicle, Exterior / Interior Color, Popular
          Features, Packages, Drive Type, Fuel Type, Est. MPG/MPGe, Est. Range, Trailering Capacity
          — as expand / collapse sections. The mobile sheet adds a sticky header (Filters · close)
          and a bottom action bar (vehicle count · Clear All · Apply).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Default</span>
          <span className="doc-tag doc-tag--blue">Disabled</span>
          <span className="doc-tag doc-tag--blue">Mobile sheet</span>
          <span className="doc-tag">3 viewports · 4 brands</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/ujYTevWckF8jlVXAU4XKjJ/GM-%E2%80%A2-02.06-VSR?node-id=1382-18101" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Default state */}
      <div className="doc-section">
        <h2 className="doc-section__title">Default — Desktop</h2>
        <p className="doc-section__subtitle">
          The canonical 354-px left rail. Year, Vehicle, Exterior Color, and Interior Color come
          pre-expanded; the remaining 8 categories sit collapsed below. Use the brand switcher
          (top right) to preview each brand — radius, fonts, slider fill, checkbox color, and
          accordion text-color all flip via tokens.
        </p>
        <DefaultDesktopShowcase />
      </div>

      {/* Payment variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Payment Variants</h2>
        <p className="doc-section__subtitle">
          The payload directly under the <code>Filters</code> heading swaps with the active payment
          tab. <strong>Cash</strong> shows a price-range slider with Min / Max captions;{' '}
          <strong>Finance</strong> and <strong>Lease</strong> show a single estimated-monthly-payment
          slider. <strong>GD Error</strong> renders if the pricing service refuses to quote the
          dealership — the slider is replaced with a retry CTA.
        </p>
        <PaymentVariantsShowcase />
      </div>

      {/* Mobile */}
      <div className="doc-section">
        <h2 className="doc-section__title">Mobile</h2>
        <p className="doc-section__subtitle">
          Below tablet the filter becomes a full-bleed sheet. A sticky <strong>Filters</strong>{' '}
          header (with the <code>sliders-horizontal</code> glyph + close button) anchors the top;
          a sticky bottom bar shows the live vehicle count + <strong>Clear All</strong> /
          <strong> Apply</strong>. The <em>Selected</em> variant adds a row of icon-bearing quick
          filters (<code>Electric · SUV · Truck · Performance</code>) and surfaces a count badge on
          accordion headers when a refinement is set. The <em>Active</em> variant simulates an
          opened mid-list section with one accordion expanded inline — the rest of the sheet
          (location, payment payload, other accordion headers) stays at full opacity.
        </p>
        <MobileShowcase />
      </div>

      {/* Disabled */}
      <div className="doc-section">
        <h2 className="doc-section__title">Disabled</h2>
        <p className="doc-section__subtitle">
          When inventory data is missing or the dealer is geo-locked from the search, the entire
          rail goes inert — payment tabs lose their selection styling, the slider greys to{' '}
          <code>#c3cfd9</code>, every accordion stays collapsed at 50 % opacity, and the location
          / footer keep their structure but stop accepting clicks.
        </p>
        <DisabledShowcase />
      </div>

      {/* Anatomy */}
      <div className="doc-section">
        <h2 className="doc-section__title">Anatomy</h2>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Slot</th><th>Element</th><th>Sourced from</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>ZIP location row + miles caption + edit pencil</td><td>NET NEW (uses <code>map-pin</code> + <code>pencil</code> icons)</td></tr>
              <tr><td>2</td><td>Cash · Finance · Lease tabs</td><td><code>Tabs</code> (<code>.drp-tab-contained-*</code>)</td></tr>
              <tr><td>3</td><td>"Filters" heading</td><td>NET NEW (scoped <code>.drp-vsr-filter__heading</code>)</td></tr>
              <tr><td>4</td><td>Payment payload (Net Price / Est. Monthly Payment / Error)</td><td><code>Slider</code> (range or single) + <code>Button</code> for retry</td></tr>
              <tr><td>5</td><td>Quick filter row — Electric · SUV · Truck · Performance</td><td><code>QuickFilter</code> + <code>QuickFilterGroup</code> (imported from <code>./quick-filter</code>)</td></tr>
              <tr><td>6</td><td>Accordion stack — 12 filter sections</td><td><code>Accordion</code> (<code>.drp-accordion-*</code>)</td></tr>
              <tr><td>6a</td><td>Year / Vehicle / Drive Type / Fuel Type / Features / Packages / Trailering option lists</td><td><code>Checkbox</code> (<code>.drp-checkbox-container</code> + <code>.checkbox__*</code>)</td></tr>
              <tr><td>6b</td><td>Exterior / Interior color grid</td><td>NET NEW (<code>.drp-vsr-filter__color-grid</code> + <code>.drp-vsr-filter__swatch</code>)</td></tr>
              <tr><td>6c</td><td>"View More (n)" trigger</td><td><code>InlineButton</code> (imported)</td></tr>
              <tr><td>6d</td><td>Selected-count badge in accordion header</td><td>NET NEW (<code>.drp-vsr-filter__count-badge</code>)</td></tr>
              <tr><td>7</td><td>Privacy / Legal footer + GPC switch</td><td><code>Switch</code> (<code>.drp-switch-container</code>) + plain anchors</td></tr>
              <tr><td>8 (mobile)</td><td>Sticky header — title + close icon-button</td><td><code>IconButton</code> (<code>.drp-button-contained-icon-container-circle-bg-small</code>)</td></tr>
              <tr><td>9 (mobile)</td><td>Sticky bottom bar — vehicle count + Clear All / Apply</td><td><code>Button</code> (filled + outlined, medium)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Built from */}
      <div className="doc-section">
        <h2 className="doc-section__title">Built from</h2>
        <p className="doc-section__subtitle">
          The molecule consumes 9 atomic components — 2 via tree-shaken React imports and 7 via
          CSS-class reuse — plus 3 NET NEW slots that have no atomic equivalent.
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>InlineButton</strong> (imported) — <code>{'{ InlineButton }'}</code> from{' '}
            <code>./inline-button</code>. Used for "View More (4)" triggers; medium size, primary theme.
          </li>
          <li>
            <strong>QuickFilter + QuickFilterGroup</strong> (imported) —{' '}
            <code>{'{ QuickFilter, QuickFilterGroup }'}</code> from <code>./quick-filter</code>.
            Used for the Electric · SUV · Truck · Performance row. Atomic owns layout
            (flex-wrap + flex:1 + min-width:140px wraps to 2 cols at the 354px rail), typography,
            brand re-theming via <code>--quick-filter-*</code> tokens, and selected-state styling.
          </li>
          <li>
            <strong>Tabs Contained Large</strong> — Cash · Finance · Lease via{' '}
            <code>.drp-tab-contained-container--lg</code> + <code>.drp-tab-contained-tab-container-bg</code>.
            CSS-only reuse — no atomic React export exists. <strong>Note:</strong> atomic Tabs
            Contained CSS has known per-brand drift (see <code>systemic-findings.md § S26</code>).
            Buick + GMC + Cadillac currently render with several wrong values (line-height,
            default text color, selected text color, spurious <code>uppercase</code> on GMC + Cadillac).
            Drift is at the atomic CSS level; remediation is a separate <code>brands.css</code>-only
            PR. The molecule consumes atomic-as-is to stay atomic-first; visible regressions on
            non-Chevy brands resolve when S26 lands.
          </li>
          <li>
            <strong>Slider</strong> — both Range (Cash) and Single (Finance / Lease / MPG / Range
            / Trailering) variants via <code>.drp-slider-container</code> +{' '}
            <code>.drp-slider-container--range</code>. CSS-only reuse — no atomic React export.
          </li>
          <li>
            <strong>Accordion</strong> — full filter section stack via{' '}
            <code>.drp-accordion-group</code> + <code>.drp-accordion-container-bg</code> +{' '}
            <code>.drp-accordion-container-summary-bg</code> +{' '}
            <code>.drp-accordion-details</code>. CSS-only reuse, but the molecule extends the
            header with a right-aligned cluster (count badge + plus / circle-minus icon) instead
            of the default left-aligned icon.
          </li>
          <li>
            <strong>Checkbox</strong> — every option list (Year, Vehicle, Drive Type, Fuel Type,
            etc.) wraps each row in <code>.drp-checkbox-container</code> + <code>.checkbox__*</code>.
            Trailing <code>(count)</code> suffix is the molecule's own scoped span.
          </li>
          <li>
            <strong>Button</strong> — Retry (filled, medium) on the GD-error payload; Clear All
            (outlined, medium) + Apply (filled, medium) on the mobile action bar. CSS-only reuse.
          </li>
          <li>
            <strong>Icon Button</strong> — small circle-shape plain icon-button for the mobile
            close X via <code>.drp-button-contained-icon-container-circle-bg-small</code>.
          </li>
          <li>
            <strong>Switch</strong> — privacy footer "Your Privacy Choices &amp; Opt-Out Rights"
            toggle via <code>.drp-switch-container</code>. CSS-only reuse.
          </li>
          <li>
            <strong>NET NEW · Color swatch picker</strong> — atomic Checkbox is rectangular and
            built around a checkmark glyph; the VSR design needs a circular color disc with a
            ring-on-select treatment, support for split two-tone fills, and a 7-column auto-grid
            that wraps to a second row. Engineered as <code>.drp-vsr-filter__color-grid</code> +{' '}
            <code>.drp-vsr-filter__swatch</code> with an inner <code>.drp-vsr-filter__swatch-disc</code>{' '}
            so the selection ring is its own outer pseudo-state. No atom covers two-tone disc fills.
          </li>
          <li>
            <strong>NET NEW · Selected-count badge</strong> in accordion headers
            (<code>.drp-vsr-filter__count-badge</code>) — atomic Chip is the closest match but
            wrong shape: Chip is a pill (rounded-corner rectangle) for label-and-icon content;
            this is a fixed-diameter circular numeric readout. Same shape divergence as the
            Configurator Sub-header's count pill. Flagged as a future <strong>Badge</strong>
            atom candidate.
          </li>
          <li>
            <strong>NET NEW · ZIP location header / Legal footer / Mobile chrome</strong> —
            no atomic equivalent for any of these composite slots. Engineered inline as
            molecule-scoped classes (<code>.drp-vsr-filter__location*</code>,{' '}
            <code>.drp-vsr-filter__legal*</code>, <code>.drp-vsr-filter__mobile-*</code>).
          </li>
        </ul>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">
          The molecule defines <em>no</em> brand-specific tokens — the brand surface is inherited
          entirely through the atomic components it composes. Each atom (Tabs, Slider, Checkbox,
          Accordion, Switch, Button, IconButton, QuickFilter) already has a full{' '}
          <code>[data-brand]</code> override block in <code>styles/brands.css</code>, so the
          filter rail flips wholesale when the brand switches:
        </p>
        <ul className="doc-brand-list">
          <li>
            <strong>Buick</strong> — Slider fill + thumb border → <code>#D44400</code>; Checkbox flips to a <code>#333333</code> checked fill with a white check; Accordion text ramps to <code>#222222</code>; QuickFilter borders + label go charcoal <code>#333333</code> on selection (Buick reserves brand orange for primary CTAs); rounded radii hold (8 px tabs, 4 px buttons). Tabs Contained currently renders with S26 drift (selected text shows brand orange where Figma says gray <code>#222222</code>); resolves when S26 lands.
          </li>
          <li>
            <strong>GMC</strong> — Tabs Contained flatten to <code>radius: 0</code>; Slider fill <code>#CC0000</code>; Checkbox flips to a square (<code>radius: 0</code>) <code>#060505</code> filled box; Accordion text inverts to white because GMC's accordion lives on a dark surface (<code>--accordion-color-text-default: #ffffff</code> in <code>brands.css</code>); QuickFilter goes uppercase + 0.08 em letter-spacing with <code>#1a1a1a</code> selected border. Tabs Contained currently renders with S26 drift (spurious uppercase, missing line-height + default-text overrides); resolves when S26 lands.
          </li>
          <li>
            <strong>Cadillac</strong> — Tabs Contained flatten to <code>radius: 0</code>; Slider fill + thumb border, Checkbox checked fill, and selected QuickFilter border all resolve to <code>#171473</code> via <code>var(--brand-color)</code>; Accordion text holds at <code>#282828</code>; QuickFilter goes uppercase. Tabs Contained currently renders with S26 drift (Cadillac unselected bg <code>#e8e8e8</code> where Figma says <code>#f2f2f2</code>, default text color, spurious uppercase); resolves when S26 lands.
          </li>
        </ul>
        <p className="doc-section__subtitle">
          The molecule's own scoped surface — color swatches, count badge, legal footer, mobile
          chrome — references <code>var(--brand-color)</code> for the selection-ring + count-badge
          fill, so they tint correctly without any per-brand override. <strong>No hardcoded brand
          hex literals.</strong> The earlier docs claimed a Cadillac <code>#171473</code> swatch
          ring exception; that claim was inaccurate — the CSS already routed through{' '}
          <code>var(--brand-color)</code>. A separate hardcoded Cadillac <code>#171473</code> on
          the numeric pill (Rows / Seats) was removed 2026-04-27 (S1 anti-pattern fix).
        </p>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          Tokens live in <code>styles/tokens.css</code> with the Chevy defaults shown below. The
          molecule has no <code>brands.css</code> overrides — brand re-theming flows entirely
          through the atomic components it composes (<code>--quick-filter-*</code>,{' '}
          <code>--checkbox-*</code>, <code>--slider-*</code>, <code>--accordion-*</code>,{' '}
          <code>--tabs-*</code>, <code>--switch-*</code>, <code>--button-*</code> all have their
          own <code>[data-brand]</code> blocks). <strong>S8 closed 2026-04-27</strong> when these
          tokens were extracted from <code>global.css</code> fallbacks into <code>tokens.css</code>;
          the architectural invariant ("base values in tokens.css") now holds for this molecule.
        </p>
        <p className="doc-section__subtitle">
          <strong>Foundation-token gap:</strong> several typography + color literals remain
          unscoped in <code>global.css</code> — location row text (<code>16px / 24px / #262626</code>),
          payment label (<code>14px / #666</code>), payment value (<code>20px / 28px / #1a1a1a</code>),
          error message (<code>14px / #666</code>), option count suffix (<code>#888</code>), GPC
          legal copy (<code>12px / #666</code>). These describe generic roles ("primary text",
          "secondary text", "muted label") that no atom currently owns. Flagged as future
          foundation-token candidates (<code>--text-primary</code>,{' '}
          <code>--text-secondary</code>, <code>--text-muted</code>, <code>--font-body-*</code>).
          When foundation tokens land, the literals collapse into one-line aliases.
        </p>

        <h3 className="doc-token-group">Layout &amp; surface</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--vsr-filter-bg</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Rail background</td></tr>
              <tr><td><code>--vsr-filter-border-color</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td><td>Section dividers between location / tabs / heading</td></tr>
              <tr><td><code>--vsr-filter-padding-x</code></td><td>16px</td><td>Horizontal padding (desktop / tablet / mobile)</td></tr>
              <tr><td><code>--vsr-filter-stack-gap</code></td><td>20px</td><td>Vertical gap between top-level sections</td></tr>
              <tr><td><code>--vsr-filter-heading-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td><td>"Filters" H2 color (20/24 = headline-6; type comes from <code>var(--type-headline-6-family)</code> + <code>var(--type-headline-6-weight)</code>, which fall back to <code>--type-heading-*</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Color swatch picker (NET NEW — no atomic two-tone disc)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--vsr-filter-swatch-size</code></td><td>32px</td><td>Disc diameter</td></tr>
              <tr><td><code>--vsr-filter-swatch-grid-cols</code></td><td>7</td><td>Columns in the auto-grid (wraps to second row at 8+)</td></tr>
              <tr><td><code>--vsr-filter-swatch-gap</code></td><td>10px</td><td>Gap between discs</td></tr>
              <tr><td><code>--vsr-filter-swatch-ring-width</code></td><td>2px</td><td>Selection ring width</td></tr>
              <tr><td><code>--vsr-filter-swatch-ring-offset</code></td><td>3px</td><td>Selection ring inner offset</td></tr>
              <tr><td><code>--vsr-filter-swatch-ring-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>var(--brand-color)</td><td>Selection ring — flips per brand via <code>--brand-color</code> resolution. Cadillac resolves to <code>#171473</code> automatically; no hardcoded literal.</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Count badge (NET NEW — future Badge atom candidate)</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--vsr-filter-count-badge-size</code></td><td>20px</td><td>Diameter</td></tr>
              <tr><td><code>--vsr-filter-count-badge-bg</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>var(--brand-color)</td><td>Fill (brand-tinted)</td></tr>
              <tr><td><code>--vsr-filter-count-badge-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Text color</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Mobile chrome</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Default (Chevy)</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--vsr-filter-mobile-header-height</code></td><td>56px</td><td>Sticky top header height</td></tr>
              <tr><td><code>--vsr-filter-mobile-action-height</code></td><td>96px</td><td>Sticky bottom bar height (count row + buttons)</td></tr>
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
              <li>Keep the atomic-component primitives — flipping a Checkbox to a custom round box, or replacing the Slider with a different range control, breaks brand inheritance and forces a per-brand patch.</li>
              <li>Keep <strong>Year · Vehicle · Exterior Color · Interior Color</strong> open by default — they're the four sections shoppers refine most often, and pre-expanding cuts an extra tap on every load.</li>
              <li>Show a count badge on the accordion header whenever a section has at least one selection — it gives shoppers a way to see what they've narrowed without scrolling open every panel.</li>
              <li>Always render the bottom action bar in the mobile sheet, even when the count is 0 — shoppers should always see "0 Vehicle(s)" rather than wonder if the query is still loading.</li>
              <li>Use the GD-error variant when the pricing service fails for a specific dealership — don't silently hide the slider.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't pull the filter rail out of the VSR layout — it relies on the VSR header (above) and the result grid (right) for context.</li>
              <li>Don't promote quick-filter chips into the desktop variant — they're a mobile-only affordance because desktop already shows the Year + Vehicle accordion bodies open.</li>
              <li>Don't replace the color swatch picker with a checkbox list — color is a visual decision and the disc grid is the only treatment that keeps Buick's two-tone option legible.</li>
              <li>Don't hardcode <code>#0077d9</code> on the selection ring or quick-filter border — route them through <code>var(--brand-color)</code> so the rail re-themes correctly.</li>
              <li>Don't suppress the GPC + privacy switch row — it's regulatory copy and must render on every brand-state combination.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
