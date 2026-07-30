export default function SwitchPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Switch</h1>
        <p className="doc-page-header__desc">
          A Switch is a binary toggle control — it is either Off or On. Unlike a checkbox,
          a switch should trigger an immediate action (e.g. enabling a setting) rather than
          marking a form value for later submission.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Switch</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50176" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Select States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Select States</h2>
        <p className="doc-section__subtitle">Two visual states: Off (empty track, dark thumb on left) and On (filled track, white thumb on right). Click either switch to toggle.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <label className="drp-switch-container">
                <input type="checkbox" className="switch__input" name="states-demo" />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
            </div>
            <div className="doc-variant-card__label">Off</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <label className="drp-switch-container">
                <input type="checkbox" className="switch__input" name="states-demo2" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
            </div>
            <div className="doc-variant-card__label">On</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Off --&gt;</span>{'\n'}<span className="hl-tag">&lt;label</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-switch-container"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;input</span> <span className="hl-attr">type</span>=<span className="hl-val">"checkbox"</span> <span className="hl-attr">class</span>=<span className="hl-val">"switch__input"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"switch__track"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"switch__thumb"</span><span className="hl-tag">&gt;&lt;/span&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/label&gt;</span></pre>
      </div>

      {/* Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive States</h2>
        <p className="doc-section__subtitle">All states for both Off and On select states.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'grid', gridTemplateColumns:'40px 1fr', alignItems:'center', gap:'10px 14px', width:'100%', maxWidth:'200px'}}>
                <label className="drp-switch-container" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#333'}}>Default</span>
                <label className="drp-switch-container is-hovered" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#333'}}>Hover / Pressed</span>
                <label className="drp-switch-container drp-disabled" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" disabled />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#c3cfd9'}}>Disabled</span>
              </div>
            </div>
            <div className="doc-variant-card__label">Off states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'grid', gridTemplateColumns:'40px 1fr', alignItems:'center', gap:'10px 14px', width:'100%', maxWidth:'200px'}}>
                <label className="drp-switch-container is-on" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" defaultChecked />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#333'}}>Default</span>
                <label className="drp-switch-container is-on is-hovered" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" defaultChecked />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#333'}}>Hover / Pressed</span>
                <label className="drp-switch-container is-on drp-disabled" style={{pointerEvents:'none'}}>
                  <input type="checkbox" className="switch__input" defaultChecked disabled />
                  <span className="switch__track"><span className="switch__thumb"></span></span>
                </label>
                <span style={{fontSize:'13px', color:'#c3cfd9'}}>Disabled</span>
              </div>
            </div>
            <div className="doc-variant-card__label">On states</div>
          </div>

        </div>
      </div>

      {/* With Label */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Label</h2>
        <p className="doc-section__subtitle">Labels can be placed trailing (after) or leading (before) the switch. Both placements are shown below across all states.</p>
        <div className="doc-variant-grid">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', gap:'24px'}}>
              <label className="drp-switch-container">
                <input type="checkbox" className="switch__input" />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Off</span>
              </label>
              <label className="drp-switch-container">
                <input type="checkbox" className="switch__input" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">On</span>
              </label>
              <label className="drp-switch-container drp-disabled">
                <input type="checkbox" className="switch__input" disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Disabled</span>
              </label>
            </div>
            <div className="doc-variant-card__label">Trailing label</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', gap:'24px'}}>
              <label className="drp-switch-container" style={{flexDirection:'row-reverse'}}>
                <input type="checkbox" className="switch__input" />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Off</span>
              </label>
              <label className="drp-switch-container" style={{flexDirection:'row-reverse'}}>
                <input type="checkbox" className="switch__input" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">On</span>
              </label>
              <label className="drp-switch-container drp-disabled" style={{flexDirection:'row-reverse'}}>
                <input type="checkbox" className="switch__input" disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Disabled</span>
              </label>
            </div>
            <div className="doc-variant-card__label">Leading label</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'stretch', gap:'24px', width:'100%'}}>
              <label className="drp-switch-container" style={{justifyContent:'space-between'}}>
                <span className="drp-switch-typography-large">Push notifications</span>
                <input type="checkbox" className="switch__input" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
              <label className="drp-switch-container" style={{justifyContent:'space-between'}}>
                <span className="drp-switch-typography-large">Email updates</span>
                <input type="checkbox" className="switch__input" />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
              <label className="drp-switch-container" style={{justifyContent:'space-between'}}>
                <span className="drp-switch-typography-large">SMS alerts</span>
                <input type="checkbox" className="switch__input" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
              <label className="drp-switch-container drp-disabled" style={{justifyContent:'space-between'}}>
                <span className="drp-switch-typography-large">Location services</span>
                <input type="checkbox" className="switch__input" disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
              </label>
            </div>
            <div className="doc-variant-card__label">Settings group</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', gap:'24px'}}>
              <label className="drp-switch-container">
                <span className="drp-switch-typography-large">Option A</span>
                <input type="checkbox" className="switch__input" />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Option B</span>
              </label>
              <label className="drp-switch-container">
                <span className="drp-switch-typography-large">Option A</span>
                <input type="checkbox" className="switch__input" defaultChecked />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Option B</span>
              </label>
              <label className="drp-switch-container drp-disabled">
                <span className="drp-switch-typography-large">Option A</span>
                <input type="checkbox" className="switch__input" disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Option B</span>
              </label>
              <label className="drp-switch-container drp-disabled is-on">
                <span className="drp-switch-typography-large">Option A</span>
                <input type="checkbox" className="switch__input" defaultChecked disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Option B</span>
              </label>
              <label className="drp-switch-container drp-disabled">
                <span className="drp-switch-typography-large" style={{color:'#1a1a1a'}}>Option A</span>
                <input type="checkbox" className="switch__input" disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large">Option B</span>
              </label>
              <label className="drp-switch-container drp-disabled is-on">
                <span className="drp-switch-typography-large">Option A</span>
                <input type="checkbox" className="switch__input" defaultChecked disabled />
                <span className="switch__track"><span className="switch__thumb"></span></span>
                <span className="drp-switch-typography-large" style={{color:'#1a1a1a'}}>Option B</span>
              </label>
            </div>
            <div className="doc-variant-card__label">Dual-side label</div>
          </div>

        </div>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Switch owns the <code>--switch-*</code> family (23 tokens).</p>

        <h3 className="doc-token-group">Sizing</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--switch-track-width</code></td><td>48px</td></tr>
              <tr><td><code>--switch-track-height</code></td><td>24px</td></tr>
              <tr><td><code>--switch-track-radius</code></td><td>1000px (pill)</td></tr>
              <tr><td><code>--switch-track-border-width</code></td><td>1px (Off state only)</td></tr>
              <tr><td><code>--switch-thumb-size</code></td><td>20px</td></tr>
              <tr><td><code>--switch-gap</code></td><td>8px (track ↔ label)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Color — state ramp</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--switch-color-off-track-border</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--switch-color-off-track-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ddd'}}></span>#ffffff</td></tr>
              <tr><td><code>--switch-color-off-thumb-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--switch-color-on-track-bg</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a (also sets border-color)</td></tr>
              <tr><td><code>--switch-color-on-thumb-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ddd'}}></span>#ffffff</td></tr>
              <tr><td><code>--switch-color-disabled-track-border</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
              <tr><td><code>--switch-color-disabled-thumb-color</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
              <tr><td><code>--switch-color-disabled-on-track-bg</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
              <tr><td><code>--switch-color-disabled-on-thumb-color</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ddd'}}></span>#ffffff</td></tr>
              <tr><td><code>--switch-label-color</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td></tr>
              <tr><td><code>--switch-label-disabled-color</code></td><td><span className="doc-swatch" style={{background:'#c3cfd9'}}></span>#c3cfd9</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--switch-typography-large-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td></tr>
              <tr><td><code>--switch-typography-large-font-size</code></td><td>14px</td></tr>
              <tr><td><code>--switch-typography-large-line-height</code></td><td>22px</td></tr>
              <tr><td><code>--switch-typography-small-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td></tr>
              <tr><td><code>--switch-typography-small-font-size</code></td><td>12px</td></tr>
              <tr><td><code>--switch-typography-small-line-height</code></td><td>20px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Class hooks: <code>.drp-switch-container</code> (root + state modifiers <code>.is-on</code>, <code>.is-hovered</code>, <code>.drp-disabled</code>), <code>.drp-switch-typography-large</code> / <code>-small</code> (label sizes). Unprefixed BEM children: <code>.switch__input</code>, <code>.switch__track</code>, <code>.switch__thumb</code>.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Font-family swaps only (Buick <code>Buick_Text</code>, GMC <code>StratumGMC</code>, Cadillac <code>Cadillac_Gothic</code> — base family, not the <code>_Narrow</code> variant Radio/Menu use); the <code>#1a1a1a</code> track, <code>#c3cfd9</code> disabled ramp, sizes, and layout are brand-invariant.</p>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use a switch for settings that take effect immediately without a submit action.</li>
              <li>Always wrap the switch in a <code>&lt;label&gt;</code> to make the entire row clickable.</li>
              <li>Use a visible text label so users understand what the switch controls.</li>
              <li>Use the <code>disabled</code> HTML attribute for unavailable settings so assistive technology announces the state correctly.</li>
              <li>Group related switches under a shared heading for context.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use a switch when the action requires a form submission — use a checkbox instead.</li>
              <li>Don't use a switch for multi-select choices — use checkboxes.</li>
              <li>Don't use a switch to select a single item from a group — use radio buttons.</li>
              <li>Don't omit the label — a switch without context is ambiguous.</li>
              <li>Don't rely on color alone to communicate state — the thumb position provides a shape-based cue.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
