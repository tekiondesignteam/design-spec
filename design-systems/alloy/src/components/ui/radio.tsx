import { useState } from 'react'

function ToggleRadioCard({ initialSelected, label }: { initialSelected: boolean; label: string }) {
  const [selected, setSelected] = useState(initialSelected)
  const toggle = () => setSelected(s => !s)
  return (
    <div className="doc-variant-card">
      <div className="doc-variant-card__preview">
        <span
          className={`drp-radio-container${selected ? ' is-selected' : ''}`}
          role="button"
          tabIndex={0}
          onClick={toggle}
          onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle() } }}
        >
          <span className="radio__box"><span className="radio__dot"></span></span>
        </span>
      </div>
      <div className="doc-variant-card__label">{label} — click to toggle</div>
    </div>
  )
}

const RadioBox = ({ name, checked, disabled, selected, hovered }: {
  name: string
  checked?: boolean
  disabled?: boolean
  selected?: boolean
  hovered?: boolean
}) => (
  <label
    className={`drp-radio-container${selected ? ' is-selected' : ''}${hovered ? ' is-hovered' : ''}${disabled ? ' drp-disabled' : ''}`}
    style={{pointerEvents:'none'}}
  >
    <input type="radio" className="radio__input" name={name} defaultChecked={checked} disabled={disabled} />
    <span className="radio__box"><span className="radio__dot"></span></span>
  </label>
)

export default function RadioPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Radio Button</h1>
        <p className="doc-page-header__desc">
          Radio buttons allow users to select exactly one option from a mutually exclusive set.
          They support two visual states — <strong>Unselected</strong> and <strong>Selected</strong> —
          each with full interactive state coverage. Always group radio buttons with a shared
          <code>name</code> attribute and a visible <code>&lt;fieldset&gt;</code> / <code>&lt;legend&gt;</code>.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Radio Button</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50173" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Select States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Select States</h2>
        <p className="doc-section__subtitle">Two visual states: Unselected (empty circle) and Selected (circle with filled inner dot).</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <ToggleRadioCard initialSelected={false} label="Unselected" />
          <ToggleRadioCard initialSelected={true} label="Selected" />
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Unselected --&gt;</span>{'\n'}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-radio-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"radio"</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__input"</span> <span className="hl-attr">name</span>=<span className="hl-val">"group"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__box"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__dot"</span><span className="hl-tag">&gt;&lt;/span&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/label&gt;</span></pre>
      </div>

      {/* Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive States</h2>
        <p className="doc-section__subtitle">All states are shown below for each select state.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'grid', gridTemplateColumns:'24px 1fr', alignItems:'center', gap:'10px 14px', width:'100%', maxWidth:'180px'}}>
                <RadioBox name="unsel-states" /><span style={{fontSize:'13px', color:'#333'}}>Default</span>
                <RadioBox name="unsel-states-h" hovered /><span style={{fontSize:'13px', color:'#333'}}>Hover / Pressed</span>
                <RadioBox name="unsel-states-d" disabled /><span style={{fontSize:'13px', color:'#c3cfd9'}}>Disabled</span>
              </div>
            </div>
            <div className="doc-variant-card__label">Unselected states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'grid', gridTemplateColumns:'24px 1fr', alignItems:'center', gap:'10px 14px', width:'100%', maxWidth:'180px'}}>
                <RadioBox name="sel-states" checked selected /><span style={{fontSize:'13px', color:'#333'}}>Default</span>
                <RadioBox name="sel-states-h" checked selected hovered /><span style={{fontSize:'13px', color:'#333'}}>Hover / Pressed</span>
                <RadioBox name="sel-states-d" checked selected disabled /><span style={{fontSize:'13px', color:'#c3cfd9'}}>Disabled</span>
              </div>
            </div>
            <div className="doc-variant-card__label">Selected states</div>
          </div>

        </div>
      </div>

      {/* With Label */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Label</h2>
        <p className="doc-section__subtitle">The label wraps the radio button in a <code>&lt;label&gt;</code> element, expanding the click target. Place the label before or after the control using DOM order.</p>
        <div className="doc-variant-grid">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-radio-container">
                  <input type="radio" className="radio__input" name="trailing-demo" />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Option label</span>
                </label>
                <label className="drp-radio-container">
                  <input type="radio" className="radio__input" name="trailing-demo" defaultChecked />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Selected option</span>
                </label>
                <label className="drp-radio-container drp-disabled">
                  <input type="radio" className="radio__input" name="trailing-demo" disabled />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Disabled option</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Trailing label (default)</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-radio-container" style={{flexDirection:'row-reverse'}}>
                  <input type="radio" className="radio__input" name="leading-demo" />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Option label</span>
                </label>
                <label className="drp-radio-container" style={{flexDirection:'row-reverse'}}>
                  <input type="radio" className="radio__input" name="leading-demo" defaultChecked />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Selected option</span>
                </label>
                <label className="drp-radio-container drp-disabled" style={{flexDirection:'row-reverse'}}>
                  <input type="radio" className="radio__input" name="leading-demo" disabled />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Disabled option</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Leading label</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <label className="drp-radio-container">
                  <input type="radio" className="radio__input" name="group-demo" />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Chevrolet</span>
                </label>
                <label className="drp-radio-container">
                  <input type="radio" className="radio__input" name="group-demo" defaultChecked />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Buick</span>
                </label>
                <label className="drp-radio-container">
                  <input type="radio" className="radio__input" name="group-demo" />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">GMC</span>
                </label>
                <label className="drp-radio-container drp-disabled">
                  <input type="radio" className="radio__input" name="group-demo" disabled />
                  <span className="radio__box"><span className="radio__dot"></span></span>
                  <span className="radio__label">Cadillac</span>
                </label>
              </div>
            </div>
            <div className="doc-variant-card__label">Group example</div>
          </div>

        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Trailing label (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-radio-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"radio"</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__input"</span> <span className="hl-attr">name</span>=<span className="hl-val">"group"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__box"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__dot"</span><span className="hl-tag">&gt;&lt;/span&gt;&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"radio__label"</span><span className="hl-tag">&gt;</span><span className="hl-text">Option label</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/label&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Radio owns the <code>--radio-*</code> family (13 tokens). Container sizing (24×24 circle, 1.5px border, 8px gap to label) is hard-coded — only the inner dot size is tokenized.</p>

        <h3 className="doc-token-group">Color &amp; sizing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--radio-color-border</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a (unselected + selected border)</td></tr>
              <tr><td><code>--radio-color-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--radio-color-dot</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a (inner dot)</td></tr>
              <tr><td><code>--radio-color-text</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626 (label)</td></tr>
              <tr><td><code>--radio-color-disabled-border</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
              <tr><td><code>--radio-color-disabled-dot</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9 (also disabled label)</td></tr>
              <tr><td><code>--radio-dot-size</code></td><td>16px</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--radio-typography-large-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td></tr>
              <tr><td><code>--radio-typography-large-font-size</code></td><td>14px</td></tr>
              <tr><td><code>--radio-typography-large-line-height</code></td><td>22px</td></tr>
              <tr><td><code>--radio-typography-small-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td></tr>
              <tr><td><code>--radio-typography-small-font-size</code></td><td>12px</td></tr>
              <tr><td><code>--radio-typography-small-line-height</code></td><td>20px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Class hooks: <code>.drp-radio-container</code> (root, size + state modifiers), <code>.drp-radio-typography-large</code> / <code>.drp-radio-typography-small</code> (label sizes) — defined in <code>styles/global.css</code>. Unprefixed BEM children: <code>.radio__input</code>, <code>.radio__box</code>, <code>.radio__dot</code>, <code>.radio__label</code>.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. Radio's brand surface is narrow: all three brands override only the two <code>--radio-typography-*-font-family</code> tokens; no color, size, or border changes.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Large and small label font-family both swap to <code>Buick_Text</code>. No other overrides — border, dot, and disabled colors stay at Chevy defaults.</li>
          <li><strong>GMC</strong> — Label font-family swaps to <code>StratumGMC</code> (both sizes). No size bump or text-transform on Radio (unlike GMC's Button treatment). Colors stay at Chevy defaults.</li>
          <li><strong>Cadillac</strong> — Label font-family swaps to <code>Cadillac_Gothic_Narrow</code> (both sizes). No letter-spacing or uppercase. Colors stay at Chevy defaults — notably Radio keeps the near-black <code>#1a1a1a</code> border across all brands; the navy <code>#171473</code> Cadillac accent doesn't appear on Radio.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always wrap the radio button in a <code>&lt;label&gt;</code> to expand the click target and associate the label.</li>
              <li>Group all related radio buttons with the same <code>name</code> attribute so only one can be selected at a time.</li>
              <li>Wrap groups with a <code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> for screen reader context.</li>
              <li>Pre-select a default option whenever possible — leaving all radio buttons unselected forces the user to make an additional choice.</li>
              <li>Use the <code>disabled</code> HTML attribute for unavailable options so assistive technology announces the state.</li>
              <li>Keep labels short and scannable — users read option lists quickly.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use radio buttons for options that are not mutually exclusive — use checkboxes instead.</li>
              <li>Don't use radio buttons for a single on/off toggle — use a toggle switch instead.</li>
              <li>Don't omit the <code>name</code> attribute — without it, each radio button acts independently.</li>
              <li>Don't disable all options in a group without providing context for why none are available.</li>
              <li>Don't use radio buttons if there are more than 5–6 options — consider a select dropdown instead.</li>
              <li>Don't rely on color alone to communicate the selected state — the inner dot provides a shape-based cue.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
