import { useState } from 'react'

function ToggleGroup({ size = 'lg', equal = false, options, ariaLabel, initial = 0, disabledIndices = [] }: {
  size?: 'lg' | 'md'
  equal?: boolean
  options: string[]
  ariaLabel?: string
  initial?: number
  disabledIndices?: number[]
}) {
  const [active, setActive] = useState(initial)
  const cls = [
    'drp-toggle-group',
    `drp-toggle-group--${size}`,
    equal ? 'drp-toggle-group--equal' : '',
  ].filter(Boolean).join(' ')
  return (
    <div className={cls} role="group" aria-label={ariaLabel}>
      {options.map((label, i) => {
        const isDisabled = disabledIndices.includes(i)
        const selected = active === i
        return (
          <button
            key={i}
            type="button"
            className={`drp-toggle-group__item${selected ? ' is-selected' : ''}`}
            aria-pressed={selected}
            disabled={isDisabled}
            onClick={() => !isDisabled && setActive(i)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default function ToggleButtonPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Toggle Button Group</h1>
        <p className="doc-page-header__desc">
          A horizontal group of mutually exclusive toggle buttons. Each button has its own
          rounded border; the selected button fills with the brand color. Use for switching
          view modes, filters, or display options — not for navigation between pages
          (use Link) or content panels (use Tabs).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Toggle Button Group</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-58136" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <p className="doc-section__subtitle">Two sizes: Large (48px, 16px text) for desktop, Medium (40px, 14px text) for denser UI or mobile.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['Grid', 'List', 'Map']} ariaLabel="View mode large" />
            </div>
            <div className="doc-variant-card__label">Large · 48px</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="md" options={['Grid', 'List', 'Map']} ariaLabel="View mode medium" />
            </div>
            <div className="doc-variant-card__label">Medium · 40px</div>
          </div>
        </div>
      </div>

      {/* Counts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Option Counts</h2>
        <p className="doc-section__subtitle">Supports 2–5 options. Beyond 5, switch to a Menu. All examples below use auto-width (buttons size to their content).</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['Monthly', 'Yearly']} ariaLabel="Billing" />
            </div>
            <div className="doc-variant-card__label">2 options</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['AWD', 'FWD', 'RWD']} ariaLabel="Drivetrain" />
            </div>
            <div className="doc-variant-card__label">3 options</div>
          </div>
        </div>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr', marginTop: '16px'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['Sedan', 'SUV', 'Truck', 'Van']} ariaLabel="Body style" />
            </div>
            <div className="doc-variant-card__label">4 options</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['New', 'Used', 'Certified', 'Demo', 'Loan']} ariaLabel="Inventory" />
            </div>
            <div className="doc-variant-card__label">5 options (maximum)</div>
          </div>
        </div>
      </div>

      {/* Width modes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Width Modes</h2>
        <p className="doc-section__subtitle">Auto-width hugs the label content (minimum 120px per button); equal-width stretches every button to fill the container.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['Overview', 'Specs', 'Reviews']} ariaLabel="Auto width" />
            </div>
            <div className="doc-variant-card__label">Auto-width — hugs content</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'stretch'}}>
              <ToggleGroup size="lg" equal options={['Overview', 'Specs', 'Reviews']} ariaLabel="Equal width" />
            </div>
            <div className="doc-variant-card__label">Equal-width — fills container</div>
          </div>
        </div>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <p className="doc-section__subtitle">Hover highlights an unselected button with <code>--toggle-border-hover</code> + <code>--toggle-text-hover</code>. Selected fills with <code>--toggle-bg-selected</code> + white text. Both sets are brand-specific: Chevy matches the brand color throughout, but Buick uses a dark-gray ramp (<code>#333333</code> / <code>#222222</code>) on both states, GMC neutralizes the hover text to near-black (<code>#060505</code>) while keeping selected brand-red, and Cadillac uses <code>#171473</code> across the board (see <strong>Brand notes</strong>). Disabled sits at 50% opacity and is not interactive.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-toggle-group drp-toggle-group--lg" role="group" aria-label="State default">
                <button type="button" className="drp-toggle-group__item is-selected" aria-pressed="true">Selected</button>
                <button type="button" className="drp-toggle-group__item" aria-pressed="false">Default</button>
                <button type="button" className="drp-toggle-group__item" aria-pressed="false">Default</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Default + Selected</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-toggle-group drp-toggle-group--lg" role="group" aria-label="State hover">
                <button type="button" className="drp-toggle-group__item is-selected" aria-pressed="true">Selected</button>
                <button type="button" className="drp-toggle-group__item is-hovered" aria-pressed="false">Hovered</button>
                <button type="button" className="drp-toggle-group__item" aria-pressed="false">Default</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Hover (unselected)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <ToggleGroup size="lg" options={['Available', 'Unavailable', 'Default']} ariaLabel="State disabled" disabledIndices={[1]} />
            </div>
            <div className="doc-variant-card__label">Disabled option</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div className="drp-toggle-group drp-toggle-group--lg" role="group" aria-label="State all disabled" aria-disabled="true">
                <button type="button" className="drp-toggle-group__item is-selected" aria-pressed="true" disabled>Selected</button>
                <button type="button" className="drp-toggle-group__item" aria-pressed="false" disabled>Option</button>
                <button type="button" className="drp-toggle-group__item" aria-pressed="false" disabled>Option</button>
              </div>
            </div>
            <div className="doc-variant-card__label">Entire group disabled</div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Minimal HTML for a 3-option group. Give the group a <code>role="group"</code> + <code>aria-label</code> and toggle <code>.is-selected</code> + <code>aria-pressed</code> on click.</p>
        <pre className="doc-code"><span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group drp-toggle-group--lg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"group"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"View mode"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group__item is-selected"</span> <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>Grid<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group__item"</span>             <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>List<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group__item"</span>             <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>Map<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Medium + equal-width --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group drp-toggle-group--md drp-toggle-group--equal"</span> <span className="hl-attr">role</span>=<span className="hl-val">"group"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Billing"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group__item is-selected"</span> <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>Monthly<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">type</span>=<span className="hl-val">"button"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-toggle-group__item"</span>             <span className="hl-attr">aria-pressed</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>Yearly<span className="hl-tag">&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All 24 tokens are defined in <code>styles/tokens.css</code>. Wide brand surface — 9–11 tokens override per brand (see <strong>Brand notes</strong>). The class-name prefix is <code>--toggle-</code> (no <code>-button</code> segment).</p>

        <h3 className="doc-token-group">Sizing &amp; layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-height-lg</code></td><td>48px</td><td>Large (desktop) row height</td></tr>
              <tr><td><code>--toggle-height-md</code></td><td>40px</td><td>Medium (dense / mobile) row height</td></tr>
              <tr><td><code>--toggle-gap</code></td><td>8px</td><td>Space between buttons inside the group</td></tr>
              <tr><td><code>--toggle-padding-x</code></td><td>16px</td><td>Horizontal padding inside each button</td></tr>
              <tr><td><code>--toggle-min-width</code></td><td>120px</td><td>Minimum button width in auto-width mode</td></tr>
              <tr><td><code>--toggle-radius</code></td><td>8px</td><td>Corner radius (<strong>overridden per brand</strong> → <code>0</code> on GMC + Cadillac)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Default state</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-border-width</code></td><td>1px</td><td>Border thickness on every button (brand-invariant)</td></tr>
              <tr><td><code>--toggle-bg-default</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Unselected fill (brand-invariant)</td></tr>
              <tr><td><code>--toggle-border-default</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Unselected border (brand-invariant)</td></tr>
              <tr><td><code>--toggle-text-default</code></td><td><span className="doc-swatch" style={{background:'#666666'}}></span>#666666</td><td>Unselected label color (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Selected state</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-bg-selected</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Selected fill (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--toggle-border-selected</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Selected border (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--toggle-text-selected</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Selected label color (brand-invariant — white on every brand)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Hover state</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-border-hover</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Hover border on unselected items (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--toggle-text-hover</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Hover label color (<strong>overridden per brand</strong> — Buick <code>#222222</code>, GMC <code>#060505</code>, Cadillac <code>#171473</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography — family &amp; weight</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-font-family</code></td><td>'Chevy_Sans'</td><td>Label font (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--toggle-font-weight</code></td><td>500</td><td>Default weight (<strong>overridden on GMC</strong> → <code>700</code>)</td></tr>
              <tr><td><code>--toggle-font-weight-selected</code></td><td>500</td><td>Selected weight (brand-invariant; falls back to <code>--toggle-font-weight</code>)</td></tr>
              <tr><td><code>--toggle-letter-spacing</code></td><td>0</td><td>Tracking (<strong>overridden on GMC</strong> <code>0.08em</code> / <strong>Cadillac</strong> <code>0.1em</code>)</td></tr>
              <tr><td><code>--toggle-text-transform</code></td><td>none</td><td>Case transform (<strong>overridden on GMC + Cadillac</strong> → <code>uppercase</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography — size &amp; line-height</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--toggle-font-size-lg</code></td><td>16px</td><td>Label size on Large (brand-invariant)</td></tr>
              <tr><td><code>--toggle-lh-lg</code></td><td>24px</td><td>Label line-height on Large (brand-invariant)</td></tr>
              <tr><td><code>--toggle-font-size-md</code></td><td>14px</td><td>Label size on Medium (brand-invariant)</td></tr>
              <tr><td><code>--toggle-lh-md</code></td><td>22px</td><td>Label line-height on Medium (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Wide brand surface — Toggle Button is one of the most heavily re-themed components (alongside Slider and Tabs). Every brand changes the selected fill + border + hover border + hover text + font family; GMC and Cadillac additionally flatten the radius to <code>0</code>, shift the text to <code>uppercase</code>, and add letter-spacing. Default state (unselected) holds constant on every brand at <code>#ffffff</code> fill / <code>#e6e6e6</code> border / <code>#666666</code> text; selected text stays white.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Selected fill, border, and hover border <em>do not</em> use <code>var(--brand-color)</code> — they hardcode <span className="doc-swatch" style={{background:'#333333'}}></span><code>#333333</code> dark gray. Hover text <code>#222222</code>. Font → <code>Buick_Text</code> at weight <code>500</code>. Radius stays at <code>8px</code>; no case / tracking changes.</li>
          <li><strong>GMC</strong> — Selected fill + borders → <code>var(--brand-color)</code> (<span className="doc-swatch" style={{background:'#CC0000'}}></span><code>#CC0000</code>). Hover text <em>neutralizes</em> to <code>#060505</code> near-black (same red-neutralization pattern as Tabs). Radius → <code>0</code>, font → <code>StratumGMC</code> weight <code>700</code>, text-transform → <code>uppercase</code>, letter-spacing → <code>0.08em</code>.</li>
          <li><strong>Cadillac</strong> — Selected fill, borders, hover border, <em>and</em> hover text all hardcode <span className="doc-swatch" style={{background:'#171473'}}></span><code>#171473</code> (doesn't route through <code>var(--brand-color)</code> — same pattern Slider and Stepper use for Cadillac). Radius → <code>0</code>, font → <code>Cadillac_Gothic_Narrow</code> (the narrow face, unlike Stepper which uses the base family), weight <code>500</code>, text-transform → <code>uppercase</code>, letter-spacing → <code>0.1em</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use for mutually exclusive options where exactly one is always selected.</li>
              <li>Keep labels to 1–2 words so they fit on one line.</li>
              <li>Provide an <code>aria-label</code> on the group describing what is being toggled.</li>
              <li>Use auto-width for inline controls; use equal-width for full-row segmented controls.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use for multi-select — use Checkbox instead.</li>
              <li>Don't use for a binary on/off setting — use Switch instead.</li>
              <li>Don't use to switch between page content panels — use Tabs instead.</li>
              <li>Don't allow zero options to be selected; the group must always have exactly one active item.</li>
              <li>Don't exceed 5 options — switch to a Menu / Select.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
