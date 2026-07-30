import { useState, type ReactNode } from 'react'

type ChipSize = 'xs' | 'sm' | 'md'
type ChipColor = 'primary' | 'success' | 'warning' | 'error' | 'grey'
type ChipVariant = 'information' | 'plain' | 'dismissable' | 'selectable'
type ChipState = 'hover' | 'pressed' | 'selected' | 'disabled'

function SelectableChip({ size = 'md', children, disabled, initial = false }: {
  size?: ChipSize
  children?: ReactNode
  disabled?: boolean
  initial?: boolean
}) {
  const [selected, setSelected] = useState(initial)
  return (
    <button
      type="button"
      className={[
        'chip',
        'chip--selectable',
        `chip--${size}`,
        selected ? 'is-selected' : '',
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={() => setSelected((s) => !s)}
    >
      {children}
    </button>
  )
}

function DismissableChip({ size = 'md', children, leadingIcon, avatar, disabled, onDismiss }: {
  size?: ChipSize
  children?: ReactNode
  leadingIcon?: string
  avatar?: string
  disabled?: boolean
  onDismiss?: () => void
}) {
  return (
    <span
      className={[
        'chip',
        'chip--dismissable',
        `chip--${size}`,
        disabled ? 'is-disabled' : '',
      ].filter(Boolean).join(' ')}
    >
      {avatar && <img className="chip__avatar" src={avatar} alt="" />}
      {leadingIcon && <i className={`drp-icon drp-icon--${leadingIcon}`} aria-hidden="true" />}
      {children}
      <button
        type="button"
        className="chip__dismiss"
        aria-label={`Remove ${children}`}
        disabled={disabled}
        onClick={onDismiss}
      >
        <i className="drp-icon drp-icon--close" aria-hidden="true" />
      </button>
    </span>
  )
}

function PlainChip({ size = 'md', color = 'primary', icon, children }: {
  size?: ChipSize
  color?: ChipColor
  icon?: string
  children?: ReactNode
}) {
  return (
    <span className={`chip chip--plain chip--${size} chip--color-${color}`}>
      {icon && <i className={`drp-icon drp-icon--${icon}`} aria-hidden="true" />}
      {children}
    </span>
  )
}

function InfoChip({ size = 'md', color = 'primary', emphasis = false, icon, children }: {
  size?: ChipSize
  color?: ChipColor
  emphasis?: boolean
  icon?: string
  children?: ReactNode
}) {
  return (
    <span className={[
      'chip',
      'chip--information',
      `chip--${size}`,
      `chip--color-${color}`,
      emphasis ? 'chip--emphasis' : '',
    ].filter(Boolean).join(' ')}>
      {icon && <i className={`drp-icon drp-icon--${icon}`} aria-hidden="true" />}
      {children}
    </span>
  )
}

function StaticChip({ variant, size = 'md', state, children, color, emphasis, leadingIcon, trailing }: {
  variant: ChipVariant
  size?: ChipSize
  state?: ChipState
  children?: ReactNode
  color?: ChipColor
  emphasis?: boolean
  leadingIcon?: string
  trailing?: 'close'
}) {
  const cls = [
    'chip',
    `chip--${variant}`,
    `chip--${size}`,
    color ? `chip--color-${color}` : '',
    emphasis ? 'chip--emphasis' : '',
    state === 'selected' ? 'is-selected' : '',
    state === 'hover' ? 'is-hovered' : '',
    state === 'pressed' ? 'is-pressed' : '',
    state === 'disabled' ? 'is-disabled' : '',
  ].filter(Boolean).join(' ')
  return (
    <span className={cls} style={{ pointerEvents: 'none' }} aria-disabled={state === 'disabled' || undefined}>
      {leadingIcon && <i className={`drp-icon drp-icon--${leadingIcon}`} aria-hidden="true" />}
      {children}
      {trailing === 'close' && (
        <span className="chip__dismiss" aria-hidden="true">
          <i className="drp-icon drp-icon--close" />
        </span>
      )}
    </span>
  )
}

export default function ChipPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Chip</h1>
        <p className="doc-page-header__desc">
          Compact labels that represent a piece of information or a low-commitment action.
          DRP ships four chip types — each with its own intent and set of supported sizes.
          Keep labels to 1–3 words; use Button for actual commands like “save” or “submit”.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Chip</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-82012" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Types overview */}
      <div className="doc-section">
        <h2 className="doc-section__title">Types</h2>
        <p className="doc-section__subtitle">Four chip variants. Each supports a different set of sizes based on where it’s typically used.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <InfoChip color="success">Information</InfoChip>
            </div>
            <div className="doc-variant-card__label">1 · Information — 3 sizes (xs, sm, md)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <PlainChip color="success" icon="circle-check">Plain</PlainChip>
            </div>
            <div className="doc-variant-card__label">2 · Plain — 2 sizes (sm, md)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <StaticChip variant="dismissable" size="md" trailing="close">Dismissable</StaticChip>
            </div>
            <div className="doc-variant-card__label">3 · Dismissable — 3 sizes (xs, sm, md)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <StaticChip variant="selectable" size="md" state="selected">Selectable</StaticChip>
            </div>
            <div className="doc-variant-card__label">4 · Selectable — 2 sizes (sm, md)</div>
          </div>
        </div>
      </div>

      {/* 1. Information */}
      <div className="doc-section">
        <h2 className="doc-section__title">1 · Information Chip</h2>
        <p className="doc-section__subtitle">Semantic status badge. Two visual styles: <strong>subtle</strong> (tinted background, default) and <strong>emphasis</strong> (solid fill) — pick emphasis when the chip needs to read against a busy surface. Available at three sizes and five colors.</p>

        <h3 className="doc-subsection__title">Subtle</h3>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip color="primary">Featured</InfoChip>
                <InfoChip color="success">In stock</InfoChip>
                <InfoChip color="warning">Low stock</InfoChip>
                <InfoChip color="error">Out of stock</InfoChip>
                <InfoChip color="grey">Archived</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium · 40px</div>
          </div>
        </div>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:'16px'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip size="sm" color="primary">Featured</InfoChip>
                <InfoChip size="sm" color="success">In stock</InfoChip>
                <InfoChip size="sm" color="warning">Low stock</InfoChip>
                <InfoChip size="sm" color="error">Out of stock</InfoChip>
                <InfoChip size="sm" color="grey">Archived</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Small · 32px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip size="xs" color="primary">New</InfoChip>
                <InfoChip size="xs" color="success">Active</InfoChip>
                <InfoChip size="xs" color="warning">Trial</InfoChip>
                <InfoChip size="xs" color="error">Past due</InfoChip>
                <InfoChip size="xs" color="grey">Draft</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">X-Small · 24px (dense lists)</div>
          </div>
        </div>

        <h3 className="doc-subsection__title" style={{marginTop:'24px'}}>Emphasis</h3>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip color="primary" emphasis>Featured</InfoChip>
                <InfoChip color="success" emphasis>In stock</InfoChip>
                <InfoChip color="warning" emphasis>Low stock</InfoChip>
                <InfoChip color="error" emphasis>Out of stock</InfoChip>
                <InfoChip color="grey" emphasis>Archived</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium · 40px</div>
          </div>
        </div>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:'16px'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip size="sm" color="primary" emphasis>Featured</InfoChip>
                <InfoChip size="sm" color="success" emphasis>In stock</InfoChip>
                <InfoChip size="sm" color="warning" emphasis>Low stock</InfoChip>
                <InfoChip size="sm" color="error" emphasis>Out of stock</InfoChip>
                <InfoChip size="sm" color="grey" emphasis>Archived</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Small · 32px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <InfoChip size="xs" color="primary" emphasis>New</InfoChip>
                <InfoChip size="xs" color="success" emphasis>Active</InfoChip>
                <InfoChip size="xs" color="warning" emphasis>Trial</InfoChip>
                <InfoChip size="xs" color="error" emphasis>Past due</InfoChip>
                <InfoChip size="xs" color="grey" emphasis>Draft</InfoChip>
              </div>
            </div>
            <div className="doc-variant-card__label">X-Small · 24px</div>
          </div>
        </div>
      </div>

      {/* 2. Plain */}
      <div className="doc-section">
        <h2 className="doc-section__title">2 · Plain Chip</h2>
        <p className="doc-section__subtitle">Label-only status with no container — just colored text and an optional leading icon. Use inline inside cards and lists. Two sizes, five semantic colors.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <PlainChip color="primary" icon="circle-help">Primary</PlainChip>
                <PlainChip color="success" icon="circle-check">In stock</PlainChip>
                <PlainChip color="warning" icon="circle-alert">Low stock</PlainChip>
                <PlainChip color="error" icon="circle-close">Out of stock</PlainChip>
                <PlainChip color="grey" icon="clock">Pending</PlainChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium · 14/22 with leading icons</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <PlainChip size="sm" color="primary">Primary</PlainChip>
                <PlainChip size="sm" color="success">Success</PlainChip>
                <PlainChip size="sm" color="warning">Warning</PlainChip>
                <PlainChip size="sm" color="error">Error</PlainChip>
                <PlainChip size="sm" color="grey">Grey</PlainChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Small · 12/20 (label only)</div>
          </div>
        </div>
      </div>

      {/* 3. Dismissable */}
      <div className="doc-section">
        <h2 className="doc-section__title">3 · Dismissable Chip</h2>
        <p className="doc-section__subtitle">Descriptor chips with a trailing × button. Use in active-filter rows or token inputs. Click any × to remove the chip from the row. Three sizes.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <DismissableChip>Under $40k</DismissableChip>
                <DismissableChip leadingIcon="car-suv">SUV</DismissableChip>
                <DismissableChip leadingIcon="circle-check">AWD</DismissableChip>
                <DismissableChip disabled>Locked</DismissableChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium · 40px — click × to remove</div>
          </div>
        </div>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr', marginTop:'16px'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <DismissableChip size="sm">Under $40k</DismissableChip>
                <DismissableChip size="sm" leadingIcon="car-suv">SUV</DismissableChip>
                <DismissableChip size="sm" leadingIcon="circle-check">AWD</DismissableChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Small · 32px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <DismissableChip size="xs">Tag</DismissableChip>
                <DismissableChip size="xs">Draft</DismissableChip>
                <DismissableChip size="xs" disabled>Archived</DismissableChip>
              </div>
            </div>
            <div className="doc-variant-card__label">X-Small · 24px (dense inputs)</div>
          </div>
        </div>

        <h3 className="doc-subsection__title" style={{marginTop:'24px'}}>States</h3>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="dismissable" size="md" trailing="close">Default</StaticChip></div>
            <div className="doc-variant-card__label">Default</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="dismissable" size="md" state="hover" trailing="close">Hover</StaticChip></div>
            <div className="doc-variant-card__label">Hover</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="dismissable" size="md" state="pressed" trailing="close">Pressed</StaticChip></div>
            <div className="doc-variant-card__label">Pressed</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="dismissable" size="md" state="disabled" trailing="close">Disabled</StaticChip></div>
            <div className="doc-variant-card__label">Disabled</div>
          </div>
        </div>
      </div>

      {/* 4. Selectable */}
      <div className="doc-section">
        <h2 className="doc-section__title">4 · Selectable Chip</h2>
        <p className="doc-section__subtitle">Binary selection for filter rails and tag pickers. Click any chip to toggle — selected chips fill with near-black (#1a1a1a) and show white text. Two sizes.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <SelectableChip initial>Sedan</SelectableChip>
                <SelectableChip>SUV</SelectableChip>
                <SelectableChip>Truck</SelectableChip>
                <SelectableChip>Van</SelectableChip>
                <SelectableChip disabled>EV</SelectableChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Medium · 40px (default)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="chip-group">
                <SelectableChip size="sm" initial>Sedan</SelectableChip>
                <SelectableChip size="sm">SUV</SelectableChip>
                <SelectableChip size="sm">Truck</SelectableChip>
                <SelectableChip size="sm">Van</SelectableChip>
                <SelectableChip size="sm" disabled>EV</SelectableChip>
              </div>
            </div>
            <div className="doc-variant-card__label">Small · 32px</div>
          </div>
        </div>

        <h3 className="doc-subsection__title" style={{marginTop:'24px'}}>States</h3>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="selectable" size="md">Default</StaticChip></div>
            <div className="doc-variant-card__label">Default</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="selectable" size="md" state="hover">Hover</StaticChip></div>
            <div className="doc-variant-card__label">Hover</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="selectable" size="md" state="pressed">Pressed</StaticChip></div>
            <div className="doc-variant-card__label">Pressed</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="selectable" size="md" state="selected">Selected</StaticChip></div>
            <div className="doc-variant-card__label">Selected</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview"><StaticChip variant="selectable" size="md" state="disabled">Disabled</StaticChip></div>
            <div className="doc-variant-card__label">Disabled</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <span className={`chip chip--selectable chip--md is-selected is-disabled`} style={{pointerEvents:'none'}}>Selected + Disabled</span>
            </div>
            <div className="doc-variant-card__label">Selected + Disabled</div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Minimal HTML for each variant. All four chips share the <code>.chip</code> base class plus one variant modifier and one size modifier.</p>
        <pre className="doc-code">{`<!-- Information (subtle / emphasis) -->
<span class="chip chip--information chip--md chip--color-success">In stock</span>
<span class="chip chip--information chip--md chip--emphasis chip--color-success">In stock</span>

<!-- Plain (label-only) -->
<span class="chip chip--plain chip--md chip--color-success">
  <i class="drp-icon drp-icon--circle-check" aria-hidden="true"></i>
  In stock
</span>

<!-- Dismissable -->
<span class="chip chip--dismissable chip--md">
  Under $40k
  <button class="chip__dismiss" aria-label="Remove Under $40k">
    <i class="drp-icon drp-icon--close" aria-hidden="true"></i>
  </button>
</span>

<!-- Selectable -->
<button class="chip chip--selectable chip--md is-selected">SUV</button>`}</pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; per-brand overrides in <code>styles/brands.css</code>. Chip ships ~78 tokens; the six groups below sample the anatomy. Full token list: see <code>styles/tokens.css</code> lines 815–929.</p>

        <h3 className="doc-token-group">Sizing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-container-xs-height</code></td><td>24px</td></tr>
              <tr><td><code>--chip-container-sm-height</code></td><td>32px</td></tr>
              <tr><td><code>--chip-container-md-height</code></td><td>40px</td></tr>
              <tr><td><code>--chip-container-md-padding-x</code></td><td>16px</td></tr>
              <tr><td><code>--chip-container-md-gap</code></td><td>8px</td></tr>
              <tr><td><code>--chip-radius</code></td><td>0 (sharp corners)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+7 more sizing vars: <code>xs</code>/<code>sm</code>/<code>md</code> each also ship <code>-padding-x</code>, <code>-gap</code>, <code>-border-width</code>.</p>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-font-small-family</code></td><td><code>'Chevy_Sans:Medium', sans-serif</code></td></tr>
              <tr><td><code>--chip-font-small-size</code></td><td>12px</td></tr>
              <tr><td><code>--chip-font-small-line-height</code></td><td>20px</td></tr>
              <tr><td><code>--chip-font-large-family</code></td><td><code>'Chevy_Sans:Bold', sans-serif</code></td></tr>
              <tr><td><code>--chip-font-large-size</code></td><td>14px</td></tr>
              <tr><td><code>--chip-font-large-line-height</code></td><td>22px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+4 weight vars: <code>--chip-font-small-weight-medium|bold</code> and <code>--chip-font-large-weight-medium|bold</code>.</p>

        <h3 className="doc-token-group">Selectable — states</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-selectable-bg-default</code></td><td>#ffffff</td></tr>
              <tr><td><code>--chip-selectable-border-default</code></td><td>#e6e6e6</td></tr>
              <tr><td><code>--chip-selectable-text-default</code></td><td>#666666</td></tr>
              <tr><td><code>--chip-selectable-bg-selected</code></td><td>#1a1a1a</td></tr>
              <tr><td><code>--chip-selectable-text-selected</code></td><td>#ffffff</td></tr>
              <tr><td><code>--chip-selectable-border-selected</code></td><td>transparent</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+12 more selectable vars for <code>hover</code>, <code>active</code>, <code>disabled</code>, and <code>selected-disabled</code> (each state ships <code>bg</code> / <code>border</code> / <code>text</code>).</p>

        <h3 className="doc-token-group">Dismissable — states</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-dismissable-bg-default</code></td><td>#ffffff</td></tr>
              <tr><td><code>--chip-dismissable-border-default</code></td><td>#e6e6e6</td></tr>
              <tr><td><code>--chip-dismissable-text-default</code></td><td>#262626</td></tr>
              <tr><td><code>--chip-dismissable-bg-hover</code></td><td>#f2f2f2</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+11 more dismissable vars: <code>hover</code> completes <code>border</code> + <code>text</code>, plus full <code>active</code> and <code>disabled</code> ramps.</p>

        <h3 className="doc-token-group">Plain — text colors</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-plain-text-primary</code></td><td>#0077d9</td></tr>
              <tr><td><code>--chip-plain-text-success</code></td><td>#2d871b</td></tr>
              <tr><td><code>--chip-plain-text-warning</code></td><td>#b3842d</td></tr>
              <tr><td><code>--chip-plain-text-error</code></td><td>#d64022</td></tr>
              <tr><td><code>--chip-plain-text-grey</code></td><td>#666666</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted tokens for Plain.</p>

        <h3 className="doc-token-group">Information — subtle &amp; emphasis</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--chip-info-subtle-bg-primary</code></td><td>#ecf1fc</td></tr>
              <tr><td><code>--chip-info-subtle-text-primary</code></td><td>#0077d9</td></tr>
              <tr><td><code>--chip-info-emphasis-bg-primary</code></td><td>#0077d9</td></tr>
              <tr><td><code>--chip-info-emphasis-text-primary</code></td><td>#ffffff</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+16 more info vars: each of <code>success</code> / <code>warning</code> / <code>error</code> / <code>grey</code> also ships <code>subtle-bg</code>, <code>subtle-text</code>, <code>emphasis-bg</code>, <code>emphasis-text</code>.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. Chip radius stays <code>0</code> (sharp) across all four brands — no brand overrides it.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — swaps font to <code>Buick_Text:Medium</code> / <code>Buick_Text:Bold</code> and scales type up to 14/16px. Selectable selected-bg shifts to <code>#222222</code>; dismissable text to <code>#222222</code>; plain primary to <code>#d44400</code>; info emphasis primary to <code>#d44400</code>. Overrides the full selectable + dismissable + plain + info ramps.</li>
          <li><strong>GMC</strong> — swaps font to <code>StratumGMC:Medium</code> / <code>StratumGMC:Bold</code> and scales type up to 14/16px. Selectable selected-bg shifts to near-black <code>#060505</code>; plain primary to <code>#cc0000</code>; info emphasis primary to <code>#cc0000</code>; grey ramp uses <code>#25282a</code> / <code>#060505</code>.</li>
          <li><strong>Cadillac</strong> — swaps font to <code>Cadillac_Gothic_Narrow:Medium</code> / <code>Cadillac_Gothic_Narrow:Bold</code>; type size stays at the Chevy 12/14 scale. Selectable selected-bg uses <code>#282828</code> (not pure black); plain primary / info emphasis primary route through navy <code>#171473</code>. The warning ramp uses a confirmed pale Cadillac yellow <code>#f5d98f</code> for both plain and info emphasis (different from the muted gold the other brands share).</li>
        </ul>
      </div>
    </>
  )
}
