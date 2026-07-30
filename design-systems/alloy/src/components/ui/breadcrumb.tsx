const Sep = () => (
  <svg className="drp-breadcrumb-sep" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function BreadcrumbPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Breadcrumb</h1>
        <p className="doc-page-header__desc">
          A horizontal navigation trail that shows the user's current location within the site
          hierarchy. Each node is a clickable link except the last, which represents the current
          page. Supports 2–5+ depth levels with automatic truncation for long trails.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">.drp-breadcrumb-container</span>
          <span className="doc-tag doc-tag--blue">.drp-breadcrumb-typography-small-default</span>
          <span className="doc-tag doc-tag--blue">.drp-breadcrumb-typography-small-current</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50215" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      {/* Depth Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Depth Variants</h2>
        <p className="doc-section__subtitle">Breadcrumbs scale from 2 to 5 levels. For trails deeper than 5 nodes, collapse the middle items into an ellipsis (…).</p>
        <div className="doc-variant-grid doc-variant-grid--wide">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <nav className="drp-breadcrumb-container" aria-label="Breadcrumb">
                <ol className="drp-breadcrumb-list">
                  <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                </ol>
              </nav>
            </div>
            <div className="doc-variant-card__label">2 levels</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <nav className="drp-breadcrumb-container" aria-label="Breadcrumb">
                <ol className="drp-breadcrumb-list">
                  <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Vehicles</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                </ol>
              </nav>
            </div>
            <div className="doc-variant-card__label">3 levels</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <nav className="drp-breadcrumb-container" aria-label="Breadcrumb">
                <ol className="drp-breadcrumb-list">
                  <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Vehicles</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Chevrolet</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                </ol>
              </nav>
            </div>
            <div className="doc-variant-card__label">4 levels</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <nav className="drp-breadcrumb-container" aria-label="Breadcrumb">
                <ol className="drp-breadcrumb-list">
                  <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none', cursor:'default'}}>…</span></li>
                  <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Chevrolet</a></li>
                  <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                </ol>
              </nav>
            </div>
            <div className="doc-variant-card__label">5+ levels (truncated)</div>
          </div>

        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;nav</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-container"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Breadcrumb"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;ol</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-list"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;li</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-item"</span><span className="hl-tag">&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"/"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-typography-small-default"</span><span className="hl-tag">&gt;</span><span className="hl-text">Home</span><span className="hl-tag">&lt;/a&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;/li&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;li</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-item"</span><span className="hl-tag">&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;svg</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-sep"</span> <span className="hl-attr">viewBox</span>=<span className="hl-val">"0 0 16 16"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span><span className="hl-text">…</span><span className="hl-tag">&lt;/svg&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-breadcrumb-typography-small-current"</span> <span className="hl-attr">aria-current</span>=<span className="hl-val">"page"</span><span className="hl-tag">&gt;</span><span className="hl-text">Silverado</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;/li&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/ol&gt;</span>{'\n'}<span className="hl-tag">&lt;/nav&gt;</span>{'\n\n'}<span className="hl-comment">&lt;!-- Truncated (5+ levels): use a plain &lt;span&gt; with text "…" as the collapsed middle item --&gt;</span>{'\n'}<span className="hl-comment">&lt;!-- Disabled link: add .drp-disabled to .drp-breadcrumb-typography-small-default            --&gt;</span></pre>
      </div>

      {/* Item States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Item States</h2>
        <p className="doc-section__subtitle">All states shown statically in trail context. Hover and pressed change the link color; disabled mutes and removes interaction. The current page node is never a link.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>Default</span>
                <nav className="drp-breadcrumb-container" aria-label="Default">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Vehicles</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>Hover</span>
                <nav className="drp-breadcrumb-container" aria-label="Hover">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default is-hovered" style={{pointerEvents:'none'}}>Vehicles</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>Pressed</span>
                <nav className="drp-breadcrumb-container" aria-label="Pressed">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default is-pressed" style={{pointerEvents:'none'}}>Vehicles</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>Disabled</span>
                <nav className="drp-breadcrumb-container" aria-label="Disabled">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><a className="drp-breadcrumb-typography-small-default drp-disabled" aria-disabled="true">Vehicles</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

            </div>
            <div className="doc-variant-card__label">Link states</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>Current page</span>
                <nav className="drp-breadcrumb-container" aria-label="Current page">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'4px'}}>
                <span style={{fontSize:'11px', color:'#999', textTransform:'uppercase', letterSpacing:'.05em'}}>In context</span>
                <nav className="drp-breadcrumb-container" aria-label="Full trail">
                  <ol className="drp-breadcrumb-list">
                    <li className="drp-breadcrumb-item"><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Home</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><a href="#" className="drp-breadcrumb-typography-small-default" style={{pointerEvents:'none'}}>Vehicles</a></li>
                    <li className="drp-breadcrumb-item"><Sep /><span className="drp-breadcrumb-typography-small-current" aria-current="page">Silverado</span></li>
                  </ol>
                </nav>
              </div>

            </div>
            <div className="doc-variant-card__label">Current page (last node, never a link)</div>
          </div>

        </div>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; all three brands override the link color ramp and typography font-family in <code>styles/brands.css</code>. <strong>Naming note:</strong> use the class <code>.drp-breadcrumb-typography-small-current</code> in your markup for the current-page node — that's the public name. The underlying token family is spelled <code>--breadcrumb-typography-small-selected-*</code>; both refer to the same thing, but the class and the tokens were named independently. The <code>current</code> class simply reads the <code>selected</code> tokens via <code>var()</code> in <code>global.css</code>, so don't try to reference <code>-selected-</code> anywhere in HTML.</p>

        <div className="doc-token-group">Layout</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--breadcrumb-container-height</code></td><td>24px</td><td>Row height</td></tr>
              <tr><td><code>--breadcrumb-container-gap</code></td><td>4px</td><td>Gap between items and separators</td></tr>
              <tr><td><code>--breadcrumb-sep-color</code></td><td><span className="doc-swatch" style={{background:'#999999'}}></span>#999999</td><td>Separator chevron color</td></tr>
              <tr><td><code>--breadcrumb-sep-size</code></td><td>16px</td><td>Separator icon size</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-token-group">Typography — Link (default)</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--breadcrumb-typography-small-default-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td><td>Link font</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-font-weight</code></td><td>500</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-font-size</code></td><td>12px</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-line-height</code></td><td>20px</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-letter-spacing</code></td><td>0</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-color</code></td><td><span className="doc-swatch" style={{background:'#666666'}}></span>#666666</td><td>Link — default</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-hover-color</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Link — hover</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-active-color</code></td><td><span className="doc-swatch" style={{background:'#0e4180'}}></span>#0e4180</td><td>Link — pressed</td></tr>
              <tr><td><code>--breadcrumb-typography-small-default-disabled-color</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td><td>Link — disabled</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-token-group">Typography — Current page (selected)</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--breadcrumb-typography-small-selected-font-family</code></td><td>'Chevy_Sans:Demi', sans-serif</td><td>Current page font</td></tr>
              <tr><td><code>--breadcrumb-typography-small-selected-font-weight</code></td><td>700</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-selected-font-size</code></td><td>12px</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-selected-line-height</code></td><td>20px</td><td>—</td></tr>
              <tr><td><code>--breadcrumb-typography-small-selected-color</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Current page label color</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only — no structural changes per brand. Values below are the actual overrides from <code>styles/brands.css</code>.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — default link <code>#6f6f6d</code>, hover/active use <code>var(--brand-color)</code> (<code>#D44400</code>), disabled <code>#a7a6a4</code>, selected <code>#222222</code>. Typography switches to <code>'Buick_Text:Medium'</code> for links and <code>'Buick_Text:SemiBold'</code> for the current page.</li>
          <li><strong>GMC</strong> — default link <code>#66696a</code>, hover/active use <code>var(--brand-color)</code> (<code>#CC0000</code>), disabled <code>#c8c8c8</code>, selected <code>#060505</code>. Typography switches to <code>'StratumGMC:Medium'</code> / <code>'StratumGMC:Bold'</code>.</li>
          <li><strong>Cadillac</strong> — default <code>#787878</code>, hover <code>#171473</code>, active <code>#211fab</code>, disabled <code>#a0a0a0</code>, selected <code>#282828</code>. Typography switches to <code>'Cadillac_Gothic_Narrow:Medium'</code> / <code>'Cadillac_Gothic_Narrow:Bold'</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always add <code>aria-label="Breadcrumb"</code> to the <code>&lt;nav&gt;</code> element.</li>
              <li>Mark the last item with <code>aria-current="page"</code> and use a <code>&lt;span&gt;</code>, not an <code>&lt;a&gt;</code>.</li>
              <li>Use an <code>&lt;ol&gt;</code> list — the ordered structure conveys hierarchy to screen readers.</li>
              <li>Truncate trails of 6+ nodes by collapsing middle items into "…".</li>
              <li>Keep labels short — one or two words per node.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't make the last (current) item a link — the user is already on that page.</li>
              <li>Don't use breadcrumbs on top-level pages with no parent hierarchy.</li>
              <li>Don't use breadcrumbs as a substitute for primary navigation.</li>
              <li>Don't truncate fewer than 5 nodes — show them in full.</li>
              <li>Don't mix breadcrumb with other location indicators on the same page.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
