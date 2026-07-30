import { useState, type ChangeEvent, type CSSProperties } from 'react'

function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

function SingleSlider({ label, initialValue = 50, min = 0, max = 100 }: {
  label: string
  initialValue?: number
  min?: number
  max?: number
}) {
  const [value, setValue] = useState(initialValue)
  const fillPct = pct(value, min, max)
  return (
    <div className="drp-slider-container">
      <div className="drp-slider-header">
        <span className="drp-slider-typography-title">{label}</span>
        <span className="drp-slider-value"><output>{value}</output></span>
      </div>
      <div className="drp-slider-track-wrap">
        <input
          type="range"
          className="drp-slider-input"
          min={min}
          max={max}
          value={value}
          aria-label={label}
          style={{'--fill': `${fillPct}%`} as CSSProperties}
          onChange={e => setValue(+e.target.value)}
        />
      </div>
    </div>
  )
}

function RangeSlider({ label, initialLower = 20, initialUpper = 70, min = 0, max = 100 }: {
  label: string
  initialLower?: number
  initialUpper?: number
  min?: number
  max?: number
}) {
  const [lower, setLower] = useState(initialLower)
  const [upper, setUpper] = useState(initialUpper)
  const lPct = pct(lower, min, max)
  const uPct = pct(upper, min, max)

  const handleLower = (e: ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value
    if (v <= upper) setLower(v)
  }
  const handleUpper = (e: ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value
    if (v >= lower) setUpper(v)
  }

  return (
    <div className="drp-slider-container drp-slider-container--range">
      <div className="drp-slider-header">
        <span className="drp-slider-typography-title">{label}</span>
        <span className="drp-slider-value">
          <output>{lower}</output>
          <span className="drp-slider-to">to</span>
          <output>{upper}</output>
        </span>
      </div>
      <div className="drp-slider-track-wrap">
        <div className="drp-slider-range-track">
          <div className="drp-slider-range-fill" style={{left:`${lPct}%`, right:`${100-uPct}%`}}></div>
        </div>
        <input type="range" className="drp-slider-input drp-slider-input--lower" min={min} max={max} value={lower} aria-label="Minimum" onChange={handleLower} />
        <input type="range" className="drp-slider-input drp-slider-input--upper" min={min} max={max} value={upper} aria-label="Maximum" onChange={handleUpper} />
      </div>
      <div className="drp-slider-footer">
        <span className="drp-slider-typography-range">Min</span>
        <span className="drp-slider-typography-range">Max</span>
      </div>
    </div>
  )
}

export default function SliderPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Slider</h1>
        <p className="doc-page-header__desc">
          Sliders let users select a value or range of values along a continuous track.
          The <strong>Single slider</strong> controls one value; the <strong>Range slider</strong>
          controls a lower and upper bound simultaneously. Both variants display the current
          value(s) in a badge and support disabled states.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Slider</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3773-50156" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__subtitle">Two variants: Single slider for a single value, and Range slider for a min–max selection. Both are interactive below.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{width:'100%'}}>
                <SingleSlider label="Distance" initialValue={50} />
              </div>
            </div>
            <div className="doc-variant-card__label">Single slider</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{width:'100%'}}>
                <RangeSlider label="Price range" initialLower={20} initialUpper={70} />
              </div>
            </div>
            <div className="doc-variant-card__label">Range slider</div>
          </div>
        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;!-- Single slider --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-header"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-typography-title"</span><span className="hl-tag">&gt;</span>Volume<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-value"</span><span className="hl-tag">&gt;&lt;output&gt;</span>50<span className="hl-tag">&lt;/output&gt;&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-track-wrap"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"range"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-slider-input"</span> <span className="hl-attr">min</span>=<span className="hl-val">"0"</span> <span className="hl-attr">max</span>=<span className="hl-val">"100"</span> <span className="hl-attr">value</span>=<span className="hl-val">"50"</span> <span className="hl-attr">style</span>=<span className="hl-val">"--fill:50%"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Range: add .drp-slider-container--range, two inputs (--lower / --upper), and a .drp-slider-range-fill track. --&gt;</span></pre>
      </div>

      {/* Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive States</h2>
        <p className="doc-section__subtitle">Default and Disabled states for each variant. Disabled sliders cannot be interacted with; the disabled ramp is brand-specific — Chevy uses <code>#c3cfd9</code> throughout, while other brands adopt a <code>#c3cfd9</code> / <code>#b3b3b3</code> / <code>#e6e6e6</code> fill / handle / border split (see <strong>Brand notes</strong>).</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'flex', flexDirection:'column', gap:'24px', width:'100%'}}>
                <div>
                  <div className="doc-state-label">Default</div>
                  <SingleSlider label="Label" initialValue={50} />
                </div>
                <div>
                  <div className="doc-state-label" style={{color:'#c3cfd9'}}>Disabled</div>
                  <div className="drp-slider-container">
                    <div className="drp-slider-header">
                      <span className="drp-slider-typography-title" style={{color:'#c3cfd9'}}>Label</span>
                      <span className="drp-slider-value" style={{color:'#c3cfd9'}}>50</span>
                    </div>
                    <div className="drp-slider-track-wrap">
                      <input type="range" className="drp-slider-input" min="0" max="100" defaultValue="50" style={{'--fill':'50%'} as CSSProperties} disabled aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Single slider states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'flex', flexDirection:'column', gap:'24px', width:'100%'}}>
                <div>
                  <div className="doc-state-label">Default</div>
                  <RangeSlider label="Label" initialLower={20} initialUpper={70} />
                </div>
                <div>
                  <div className="doc-state-label" style={{color:'#c3cfd9'}}>Disabled</div>
                  <div className="drp-slider-container drp-slider-container--range drp-disabled">
                    <div className="drp-slider-header">
                      <span className="drp-slider-typography-title" style={{color:'#c3cfd9'}}>Label</span>
                      <span className="drp-slider-value" style={{color:'#c3cfd9'}}>20 <span className="drp-slider-to">to</span> 70</span>
                    </div>
                    <div className="drp-slider-track-wrap">
                      <div className="drp-slider-range-track">
                        <div className="drp-slider-range-fill" style={{left:'20%', right:'30%'}}></div>
                      </div>
                      <input type="range" className="drp-slider-input drp-slider-input--lower" min="0" max="100" defaultValue="20" disabled aria-hidden="true" />
                      <input type="range" className="drp-slider-input drp-slider-input--upper" min="0" max="100" defaultValue="70" disabled aria-hidden="true" />
                    </div>
                    <div className="drp-slider-footer">
                      <span className="drp-slider-typography-range" style={{color:'#c3cfd9'}}>Min</span>
                      <span className="drp-slider-typography-range" style={{color:'#c3cfd9'}}>Max</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="doc-variant-card__label">Range slider states</div>
          </div>

        </div>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">23 base tokens defined in <code>styles/tokens.css</code>, plus <code>--slider-disabled-handle-bg</code> which is introduced only in <code>styles/brands.css</code> for Buick/GMC/Cadillac (falls back to <code>--slider-thumb-bg</code> on Chevy). See <strong>Brand notes</strong> for per-brand overrides — the brand surface is wide.</p>

        <h3 className="doc-token-group">Track sizing &amp; shape</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-track-height</code></td><td>4px</td><td>Track thickness</td></tr>
              <tr><td><code>--slider-track-radius</code></td><td>2px</td><td>Track corner radius</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Track color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-track-bg</code></td><td><span className="doc-swatch" style={{background:'#e8ecef', border:'1px solid #ddd'}}></span>#e8ecef</td><td>Unfilled track (<strong>overridden per brand</strong> → <code>#b3b3b3</code>)</td></tr>
              <tr><td><code>--slider-fill-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Filled track (<strong>overridden per brand</strong> → brand color; Cadillac hardcodes <code>#171473</code> instead of routing through <code>var(--brand-color)</code>)</td></tr>
              <tr><td><code>--slider-value-bg</code></td><td><span className="doc-swatch" style={{background:'#f2f4f6', border:'1px solid #ddd'}}></span>#f2f4f6</td><td>Value badge background (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Thumb</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-thumb-size</code></td><td>16px</td><td>Thumb diameter (brand-invariant)</td></tr>
              <tr><td><code>--slider-thumb-bg</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Thumb fill (brand-invariant)</td></tr>
              <tr><td><code>--slider-thumb-border-width</code></td><td>2px</td><td>Thumb border thickness (<strong>overridden per brand</strong> → <code>1px</code> on Buick/GMC/Cadillac)</td></tr>
              <tr><td><code>--slider-thumb-border-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Thumb border (<strong>overridden per brand</strong> → brand color)</td></tr>
              <tr><td><code>--slider-thumb-hover-shadow</code></td><td>rgba(0,119,217,0.12)</td><td>Focus halo rgba (<strong>overridden per brand</strong> → brand-tinted alpha)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Disabled state</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-disabled-fill</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td><td>Disabled filled track (brand-invariant — held at <code>#c3cfd9</code> on all four brands)</td></tr>
              <tr><td><code>--slider-disabled-border</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td><td>Disabled thumb border (<strong>overridden per brand</strong> → <code>#e6e6e6</code>)</td></tr>
              <tr><td><code>--slider-disabled-handle-bg</code></td><td>—</td><td>Brand-only token (<strong>no Chevy value</strong>); Buick/GMC/Cadillac set <code>#b3b3b3</code>. Chevy falls back to <code>--slider-thumb-bg</code> (<code>#ffffff</code>).</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Labels</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-label-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td><td>Title + value color (<strong>overridden per brand</strong> → <code>#262626</code>)</td></tr>
              <tr><td><code>--slider-minmax-color</code></td><td><span className="doc-swatch" style={{background:'#888888'}}></span>#888888</td><td>Min / Max label color (<strong>overridden per brand</strong> → <code>#666666</code>)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--slider-typography-title-font-family</code></td><td>'Chevy_Sans:Demi'</td><td>Title font (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--slider-typography-title-font-size</code></td><td>14px</td><td>Title size (<strong>overridden per brand</strong> → <code>16px</code>)</td></tr>
              <tr><td><code>--slider-typography-title-line-height</code></td><td>22px</td><td>Title line-height (<strong>overridden per brand</strong> → <code>24px</code>)</td></tr>
              <tr><td><code>--slider-typography-range-font-family</code></td><td>'Chevy_Sans:Medium'</td><td>Min/Max font (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--slider-typography-range-font-size</code></td><td>12px</td><td>Min/Max size (brand-invariant)</td></tr>
              <tr><td><code>--slider-typography-range-line-height</code></td><td>20px</td><td>Min/Max line-height (brand-invariant)</td></tr>
              <tr><td><code>--slider-typography-input-font-family</code></td><td>'Chevy_Sans:Medium'</td><td>Value badge font (<strong>overridden per brand</strong>)</td></tr>
              <tr><td><code>--slider-typography-input-font-size</code></td><td>14px</td><td>Value badge size (brand-invariant)</td></tr>
              <tr><td><code>--slider-typography-input-line-height</code></td><td>22px</td><td>Value badge line-height (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Wide brand surface — Slider re-themes across color, sizing, and typography. All three non-Chevy brands swap <code>--slider-track-bg</code> to <code>#b3b3b3</code>, slim the thumb border from <code>2px</code> to <code>1px</code>, tint <code>--slider-thumb-hover-shadow</code> with the brand color, shift the label ramp to <code>#262626</code> / <code>#666666</code>, and introduce <code>--slider-disabled-handle-bg: #b3b3b3</code> plus <code>--slider-disabled-border: #e6e6e6</code>. <code>--slider-disabled-fill</code> holds at <code>#c3cfd9</code> everywhere.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — <code>--slider-fill-color</code> and <code>--slider-thumb-border-color</code> → <code>var(--brand-color)</code> (<span className="doc-swatch" style={{background:'#D44400'}}></span><code>#D44400</code>). Typography: <code>Buick_Text</code> (title + range + input), title resizes to <code>16/24</code>.</li>
          <li><strong>GMC</strong> — <code>--slider-fill-color</code> and <code>--slider-thumb-border-color</code> → <code>var(--brand-color)</code> (<span className="doc-swatch" style={{background:'#CC0000'}}></span><code>#CC0000</code>). Typography: <code>StratumGMC</code> (all three), title resizes to <code>16/24</code>.</li>
          <li><strong>Cadillac</strong> — <code>--slider-fill-color</code> and <code>--slider-thumb-border-color</code> <em>hardcode</em> <span className="doc-swatch" style={{background:'#171473'}}></span><code>#171473</code> (the only brand that doesn't route through <code>var(--brand-color)</code>). Typography: title <code>Cadillac_Gothic</code>, range + input <code>Cadillac_Gothic_Narrow</code> (two different Cadillac faces on one component), title resizes to <code>16/24</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always provide a visible title label describing what the slider controls.</li>
              <li>Display the current value in the badge so users know the exact selection without guessing.</li>
              <li>Use the Range variant when users need to define both a lower and upper bound (e.g., price filters, date ranges).</li>
              <li>Always include <code>aria-label</code> on each <code>&lt;input type="range"&gt;</code> for screen reader support.</li>
              <li>Set meaningful <code>min</code>, <code>max</code>, and <code>step</code> attributes that reflect the actual domain of values.</li>
              <li>Show Min / Max labels on the Range slider to orient users to the scale.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use a slider when the user needs to enter a precise value — use a number input instead.</li>
              <li>Don't omit the value badge — users cannot read exact values from a thumb position alone.</li>
              <li>Don't use a slider for binary or categorical choices — use a toggle or radio group instead.</li>
              <li>Don't allow the lower thumb to exceed the upper thumb in a Range slider — enforce the constraint in JavaScript.</li>
              <li>Don't disable a slider without explaining why the control is unavailable nearby.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
