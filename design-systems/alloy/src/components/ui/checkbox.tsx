import { useState, useRef, useEffect, type InputHTMLAttributes, type MouseEvent as ReactMouseEvent } from 'react'

const CheckSvg = () => (
  <svg className="checkbox__check" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M1 4.5L4 7.5L10 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckboxBox = () => (
  <span className="checkbox__box">
    <CheckSvg />
    <span className="checkbox__dash"></span>
  </span>
)

function IndeterminateInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = true
  }, [])
  return <input type="checkbox" className={className || 'checkbox__input'} ref={ref} readOnly {...props} />
}

type TriState = 'indeterminate' | 'checked' | 'unchecked'

function IndeterminateDemo() {
  const [state, setState] = useState<TriState>('indeterminate')
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.indeterminate = state === 'indeterminate'
    ref.current.checked = state === 'checked'
  }, [state])

  const handleClick = (e: ReactMouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    setState(s => s === 'indeterminate' ? 'checked' : s === 'checked' ? 'unchecked' : 'indeterminate')
  }

  return (
    <label className="drp-checkbox-container">
      <input type="checkbox" className="checkbox__input" ref={ref} onClick={handleClick} readOnly />
      <CheckboxBox />
    </label>
  )
}

export default function CheckboxPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Checkbox</h1>
        <p className="doc-page-header__desc">
          Checkboxes allow users to select one or more options from a set. They support three
          visual states — <strong>Unchecked</strong>, <strong>Checked</strong>, and
          <strong>Indeterminate</strong> — each with full interactive state coverage.
          Always pair with a visible label or <code>aria-label</code> for accessibility.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Checkbox</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50171" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Check States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Check States</h2>
        <p className="doc-section__subtitle">Three visual states: Unchecked (empty), Checked (filled with checkmark), and Indeterminate (filled with dash — used when a parent selection is partially applied).</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <label className="drp-checkbox-container">
                <input type="checkbox" className="checkbox__input" />
                <CheckboxBox />
              </label>
            </div>
            <div className="doc-variant-card__label">Unchecked</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <label className="drp-checkbox-container">
                <input type="checkbox" className="checkbox__input" defaultChecked />
                <CheckboxBox />
              </label>
            </div>
            <div className="doc-variant-card__label">Checked</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <IndeterminateDemo />
            </div>
            <div className="doc-variant-card__label">Indeterminate</div>
          </div>
        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;!-- Unchecked --&gt;</span>{'\n'}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-checkbox-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"checkbox"</span> <span className="hl-attr">class</span>=<span className="hl-val">"checkbox__input"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"checkbox__box"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/label&gt;</span>{'\n'}{'\n'}<span className="hl-tag">&lt;!-- Indeterminate (set via JS) --&gt;</span>{'\n'}<span className="hl-tag">&lt;script&gt;</span>{'\n'}{'  '}document.getElementById(<span className="hl-val">'cb'</span>).indeterminate = <span className="hl-val">true</span>;{'\n'}<span className="hl-tag">&lt;/script&gt;</span></pre>
      </div>

      {/* Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below for each check state.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Default</span>
                </label>
                <label className="drp-checkbox-container is-hovered" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Hover</span>
                </label>
                <label className="drp-checkbox-container drp-disabled" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Disabled</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Unchecked states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container is-checked" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" defaultChecked />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Default</span>
                </label>
                <label className="drp-checkbox-container is-checked is-hovered" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" defaultChecked />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Hover / Pressed</span>
                </label>
                <label className="drp-checkbox-container is-checked drp-disabled" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="checkbox__input" defaultChecked disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Disabled</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Checked states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container is-indeterminate" style={{pointerEvents:'none'}}>
                  <IndeterminateInput />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Default</span>
                </label>
                <label className="drp-checkbox-container is-indeterminate is-hovered" style={{pointerEvents:'none'}}>
                  <IndeterminateInput />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Hover / Pressed</span>
                </label>
                <label className="drp-checkbox-container is-indeterminate drp-disabled" style={{pointerEvents:'none'}}>
                  <IndeterminateInput disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Disabled</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Indeterminate states</div>
          </div>

        </div>
      </div>

      {/* With Label */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Label</h2>
        <p className="doc-section__subtitle">The label wraps the checkbox in a <code>&lt;label&gt;</code> element, expanding the click target. Place the label before or after the control using DOM order.</p>
        <div className="doc-variant-grid">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container">
                  <input type="checkbox" className="checkbox__input" />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Option label</span>
                </label>
                <label className="drp-checkbox-container is-checked">
                  <input type="checkbox" className="checkbox__input" defaultChecked />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Selected option</span>
                </label>
                <label className="drp-checkbox-container is-indeterminate">
                  <IndeterminateInput />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Partial option</span>
                </label>
                <label className="drp-checkbox-container drp-disabled">
                  <input type="checkbox" className="checkbox__input" disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Disabled option</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Trailing label (default)</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container" style={{flexDirection:'row-reverse'}}>
                  <input type="checkbox" className="checkbox__input" />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Option label</span>
                </label>
                <label className="drp-checkbox-container is-checked" style={{flexDirection:'row-reverse'}}>
                  <input type="checkbox" className="checkbox__input" defaultChecked />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Selected option</span>
                </label>
                <label className="drp-checkbox-container is-indeterminate" style={{flexDirection:'row-reverse'}}>
                  <IndeterminateInput />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Partial option</span>
                </label>
                <label className="drp-checkbox-container drp-disabled" style={{flexDirection:'row-reverse'}}>
                  <input type="checkbox" className="checkbox__input" disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Disabled option</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Leading label</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-checkbox-container">
                  <input type="checkbox" className="checkbox__input" />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Chevrolet</span>
                </label>
                <label className="drp-checkbox-container is-checked">
                  <input type="checkbox" className="checkbox__input" defaultChecked />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Buick</span>
                </label>
                <label className="drp-checkbox-container is-indeterminate">
                  <IndeterminateInput />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">GMC</span>
                </label>
                <label className="drp-checkbox-container drp-disabled">
                  <input type="checkbox" className="checkbox__input" disabled />
                  <CheckboxBox />
                  <span className="drp-checkbox-typography-large">Cadillac</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Group example</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;!-- Trailing label (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-checkbox-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"checkbox"</span> <span className="hl-attr">class</span>=<span className="hl-val">"checkbox__input"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"checkbox__box"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-checkbox-typography-large"</span><span className="hl-tag">&gt;</span>Option label<span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/label&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Chevy base values shown. Base tokens live in <code>styles/tokens.css</code>; Buick, GMC, and Cadillac override the color ramp and typography in <code>styles/brands.css</code> (see Brand notes below).</p>

        <h3 className="doc-token-group">Container &amp; hit area</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--checkbox-container-height</code></td><td>24px</td><td>Box height</td></tr>
              <tr><td><code>--checkbox-container-width</code></td><td>24px</td><td>Box width</td></tr>
              <tr><td><code>--checkbox-container-border-radius</code></td><td>2px</td><td>Box corner radius</td></tr>
              <tr><td><code>--checkbox-container-border-width</code></td><td>1.5px</td><td>Border thickness</td></tr>
              <tr><td><code>--checkbox-hit-area-height</code></td><td>44px</td><td>Invisible click-target height (WCAG AA touch target)</td></tr>
              <tr><td><code>--checkbox-hit-area-width</code></td><td>44px</td><td>Invisible click-target width</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--checkbox-color-border-default</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Unchecked border</td></tr>
              <tr><td><code>--checkbox-color-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Unchecked fill</td></tr>
              <tr><td><code>--checkbox-color-checked-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Checked fill (Chevy — Buick/GMC/Cadillac invert this to brand)</td></tr>
              <tr><td><code>--checkbox-color-checked-border</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Checked border</td></tr>
              <tr><td><code>--checkbox-color-checked-icon</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Checkmark color</td></tr>
              <tr><td><code>--checkbox-color-indeterminate-dash</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Dash glyph color (indeterminate)</td></tr>
              <tr><td><code>--checkbox-color-disabled-border</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td><td>Disabled border</td></tr>
              <tr><td><code>--checkbox-color-disabled-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Disabled fill</td></tr>
              <tr><td><code>--checkbox-color-disabled-icon</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td><td>Disabled checkmark / dash / label</td></tr>
              <tr><td><code>--checkbox-color-text</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Label text color</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--checkbox-typography-large-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td><td>Large label font</td></tr>
              <tr><td><code>--checkbox-typography-large-font-size</code></td><td>14px</td><td>Large label size</td></tr>
              <tr><td><code>--checkbox-typography-large-line-height</code></td><td>22px</td><td>Large label line-height</td></tr>
              <tr><td><code>--checkbox-typography-large-letter-spacing</code></td><td>0</td><td>Large label tracking</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ matching <code>--checkbox-typography-small-*</code> set (12px/20px) for compact contexts. Chevy base uses <code>Chevy_Sans:Medium</code>; each brand swaps the font-family.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Per-brand overrides applied via <code>[data-brand]</code> blocks in <code>styles/brands.css</code>. All three brands invert the checked state to their brand color (Chevy keeps the monochrome white fill + dark checkmark).</p>
        <ul className="doc-brand-list">
          <li>
            <strong>Buick</strong> — border default <code>#333333</code>, checked bg <code>#333333</code> with transparent border and <code>#ffffff</code> checkmark, indeterminate dash <code>#333333</code>. Disabled ramp <code>#a7a6a4</code>. Label text <code>#222222</code>. Typography font-family → <code>'Buick_Text'</code>; radius unchanged (rounded).
          </li>
          <li>
            <strong>GMC</strong> — <code>border-radius: 0</code> (square box). Border default <code>#25282A</code>, checked bg <code>#060505</code> with transparent border and <code>#ffffff</code> checkmark, indeterminate dash <code>#060505</code>. Disabled ramp <code>#929495</code>. Label text <code>#060505</code>. Typography font-family → <code>'StratumGMC'</code>.
          </li>
          <li>
            <strong>Cadillac</strong> — <code>border-radius: 0</code> (square box). Border default <code>#505050</code>, checked bg <code>#171473</code> (navy) with transparent border and <code>#ffffff</code> checkmark, indeterminate dash <code>#171473</code>. Disabled ramp <code>#d2d2d2</code>. Label text <code>#282828</code>. Typography font-family → <code>'Cadillac_Gothic_Narrow'</code>.
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
              <li>Always wrap the checkbox in a <code>&lt;label&gt;</code> to expand the click target and associate the label.</li>
              <li>Use the <strong>Indeterminate</strong> state for parent checkboxes when only some children are checked.</li>
              <li>Use the <code>disabled</code> HTML attribute for truly unavailable options so screen readers announce the state.</li>
              <li>Group related checkboxes with a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> for screen reader context.</li>
              <li>Keep labels short and descriptive — users scan option lists quickly.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use a checkbox for a single binary action — use a toggle switch instead.</li>
              <li>Don't set indeterminate state via CSS alone — set <code>element.indeterminate = true</code> in JavaScript.</li>
              <li>Don't disable checkboxes without explaining why the option is unavailable nearby.</li>
              <li>Don't use checkboxes for mutually exclusive options — use radio buttons instead.</li>
              <li>Don't rely on color alone to communicate state — the checkmark and dash icons provide shape-based cues.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
