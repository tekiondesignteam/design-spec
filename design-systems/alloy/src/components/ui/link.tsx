const PlusIcon24 = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)
const ArrowIcon24 = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const PlusIcon16 = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function LinkPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Link</h1>
        <p className="doc-page-header__desc">
          Inline underlined links for navigating between pages or pointing to external resources.
          <strong>Primary</strong> links use brand blue for high-visibility navigation.
          <strong>Neutral</strong> links blend into body text while remaining accessible.
          Use <strong>Inverse</strong> on dark or image backgrounds.
          Supports optional leading or trailing icons in all three sizes.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Link</span>
          <span className="doc-tag doc-tag--blue">Link - Inverse</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=3769-50217" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      {/* Style Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Style Variants</h2>
        <p className="doc-section__subtitle">Two color styles for different usage contexts. Both are always underlined — the underline is the primary affordance distinguishing links from plain text.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <a href="#" className="drp-link-container-large" onClick={e => e.preventDefault()}>Link Label</a>
            </div>
            <div className="doc-variant-card__label">Primary (default)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <a href="#" className="drp-link-container-large drp-link-color-neutral" onClick={e => e.preventDefault()}>Link Label</a>
            </div>
            <div className="doc-variant-card__label">Neutral</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Primary (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"/destination"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Neutral --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"/destination"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large drp-link-color-neutral"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive States</h2>
        <p className="doc-section__subtitle">All states shown statically. Hover and pressed darken the text color; neutral keeps the same color in all interactive states. Disabled prevents interaction and mutes the color.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Default</a>
                <a href="#" className="drp-link-container-large is-hovered" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Hover</a>
                <a href="#" className="drp-link-container-large is-pressed" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Pressed</a>
                <a href="#" className="drp-link-container-large drp-disabled" style={{pointerEvents:'none'}} aria-disabled="true" onClick={e => e.preventDefault()}>Disabled</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Primary states</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Default</a>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Hover</a>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Pressed</a>
                <a href="#" className="drp-link-container-large drp-link-color-neutral drp-disabled" style={{pointerEvents:'none'}} aria-disabled="true" onClick={e => e.preventDefault()}>Disabled</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Neutral states</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Default --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"/destination"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Disabled (anchor) --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large drp-disabled"</span> <span className="hl-attr">aria-disabled</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <p className="doc-section__subtitle">Three sizes that match body text scale: Large (16px), Medium (14px), Small (12px). Match the link size to the surrounding body copy.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Large (16px)</a>
                <a href="#" className="drp-link-container-medium" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Medium (14px)</a>
                <a href="#" className="drp-link-container-small" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Small (12px)</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Primary</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Large (16px)</a>
                <a href="#" className="drp-link-container-medium drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Medium (14px)</a>
                <a href="#" className="drp-link-container-small drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Small (12px)</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Neutral</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Large (default) --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Medium --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-medium"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- Small --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-small"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Icons</h2>
        <p className="doc-section__subtitle">Optional leading or trailing icon. Icons use 24×24px for Large and Medium, 16×16px for Small. Icons inherit <code>currentColor</code>.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  <span className="drp-link-icon"><PlusIcon24 /></span>Leading Icon
                </a>
                <a href="#" className="drp-link-container-large" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  Trailing Icon<span className="drp-link-icon"><ArrowIcon24 /></span>
                </a>
                <a href="#" className="drp-link-container-small" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  <span className="drp-link-icon"><PlusIcon16 /></span>Small Leading Icon
                </a>
              </div>
            </div>
            <div className="doc-variant-card__label">Primary</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  <span className="drp-link-icon"><PlusIcon24 /></span>Leading Icon
                </a>
                <a href="#" className="drp-link-container-large drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  Trailing Icon<span className="drp-link-icon"><ArrowIcon24 /></span>
                </a>
                <a href="#" className="drp-link-container-small drp-link-color-neutral" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  <span className="drp-link-icon"><PlusIcon16 /></span>Small Leading Icon
                </a>
              </div>
            </div>
            <div className="doc-variant-card__label">Neutral</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Leading icon (large/medium) --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-icon"</span><span className="hl-tag">&gt;</span><span className="hl-tag">&lt;svg .../&gt;</span><span className="hl-tag">&lt;/span&gt;</span>{'\n'}{'  '}<span className="hl-text">Link Label</span>{'\n'}<span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* Inverse — Style */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Style</h2>
        <p className="doc-section__subtitle">Use Inverse links on dark or image-filled backgrounds. The white link color ensures contrast against dark surfaces.</p>
        <div className="doc-variant-grid">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <a href="#" className="drp-link-container-large drp-link-color-inverse" onClick={e => e.preventDefault()}>Link Label</a>
            </div>
            <div className="doc-variant-card__label">Inverse</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large drp-link-color-inverse"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* Inverse — Interactive States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Interactive States</h2>
        <p className="doc-section__subtitle">Hover and pressed shift the text to a muted gray. Disabled uses a darker gray for contrast against the dark surface.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Default</a>
                <a href="#" className="drp-link-container-large drp-link-color-inverse is-hovered" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Hover</a>
                <a href="#" className="drp-link-container-large drp-link-color-inverse is-pressed" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Pressed</a>
                <a href="#" className="drp-link-container-large drp-link-color-inverse drp-disabled" style={{pointerEvents:'none'}} aria-disabled="true" onClick={e => e.preventDefault()}>Disabled</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Inverse states</div>
          </div>
        </div>
      </div>

      {/* Inverse — Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inverse — Sizes</h2>
        <p className="doc-section__subtitle">Size modifiers work identically on Inverse links.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Large (16px)</a>
                <a href="#" className="drp-link-container-medium drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Medium (14px)</a>
                <a href="#" className="drp-link-container-small drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Small (12px)</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Inverse</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview doc-variant-card__preview--dark">
              <div style={{display:'inline-flex', flexDirection:'column', alignItems:'flex-start', gap:'20px'}}>
                <a href="#" className="drp-link-container-large drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  <span className="drp-link-icon"><PlusIcon24 /></span>Leading Icon
                </a>
                <a href="#" className="drp-link-container-medium drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>
                  Trailing Icon<span className="drp-link-icon"><ArrowIcon24 /></span>
                </a>
                <a href="#" className="drp-link-container-small drp-link-color-inverse" style={{pointerEvents:'none'}} onClick={e => e.preventDefault()}>Small Link</a>
              </div>
            </div>
            <div className="doc-variant-card__label">Inverse with icons</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- Inverse Large --&gt;</span>{'\n'}<span className="hl-tag">&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-link-container-large drp-link-color-inverse"</span><span className="hl-tag">&gt;</span><span className="hl-text">Link Label</span><span className="hl-tag">&lt;/a&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; per-brand overrides in <code>styles/brands.css</code>. Link owns the <code>--link-*</code> token family. Icon sizing (24px for Large/Medium, 16px for Small) is hard-coded in <code>global.css</code> on <code>.drp-link-icon</code> rather than being token-driven. Full token list: see <code>styles/tokens.css</code> lines 392–474.</p>

        <h3 className="doc-token-group">Container &amp; gap</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--link-container-large-height</code></td><td>24px</td></tr>
              <tr><td><code>--link-container-medium-height</code></td><td>22px</td></tr>
              <tr><td><code>--link-container-small-height</code></td><td>20px</td></tr>
              <tr><td><code>--link-container-large-gap</code></td><td>4px</td></tr>
              <tr><td><code>--link-container-medium-gap</code></td><td>4px</td></tr>
              <tr><td><code>--link-container-small-gap</code></td><td>4px</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted container tokens. No brand overrides on this group.</p>

        <h3 className="doc-token-group">Typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--link-typography-large-font-family</code></td><td><code>'Chevy_Sans:Medium', sans-serif</code></td></tr>
              <tr><td><code>--link-typography-large-font-weight</code></td><td>500 (Buick, GMC, Cadillac override to 400)</td></tr>
              <tr><td><code>--link-typography-large-font-size</code></td><td>16px (Buick + GMC override to 18px)</td></tr>
              <tr><td><code>--link-typography-large-line-height</code></td><td>24px (Buick + GMC override to 25px)</td></tr>
              <tr><td><code>--link-typography-medium-font-size</code></td><td>14px (line-height 22px; Buick + GMC: 16px / 22px)</td></tr>
              <tr><td><code>--link-typography-small-font-size</code></td><td>12px (line-height 20px; Buick + GMC: 14px / 20px)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">+ matching <code>-font-weight</code>, <code>-font-family</code>, <code>-font-size</code>, <code>-line-height</code> for <code>medium</code> and <code>small</code>. All three brands override every <code>-font-family</code> token and drop <code>-font-weight</code> to 400.</p>

        <h3 className="doc-token-group">Primary — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--link-color-primary</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td></tr>
              <tr><td><code>--link-color-primary-hover</code></td><td><span className="doc-swatch" style={{background:'#0e4180'}}></span>#0e4180</td></tr>
              <tr><td><code>--link-color-primary-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted primary color tokens. Buick and GMC route default + hover through <code>var(--brand-color)</code>; Cadillac uses explicit navy values.</p>

        <h3 className="doc-token-group">Neutral &amp; Inverse — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Chevy default</th></tr></thead>
            <tbody>
              <tr><td><code>--link-color-neutral</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td></tr>
              <tr><td><code>--link-color-neutral-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--link-color-inverse</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td></tr>
              <tr><td><code>--link-color-inverse-hover</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td></tr>
              <tr><td><code>--link-color-inverse-disabled</code></td><td><span className="doc-swatch" style={{background:'#666'}}></span>#666666</td></tr>
            </tbody>
          </table>
        </div>
        <p className="doc-section__subtitle">Complete set — no omitted neutral or inverse tokens. No brand overrides on neutral or inverse ramps; those treatments are brand-agnostic.</p>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only; no variant or layout changes. All three brands override the Primary color + all three typography font-family tokens; neutral and inverse stay constant.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Primary default + hover both route through <code>var(--brand-color)</code> = <code>#D44400</code> (no separate hover value; the orange holds across interactive states). Font swaps to <code>Buick_Text</code> with <code>font-weight: 400</code>; sizes shift to 18/25, 16/22, 14/20.</li>
          <li><strong>GMC</strong> — Primary default routes through <code>var(--brand-color)</code> = <code>#CC0000</code>; hover uses <code>var(--brand-color-hover)</code>, which GMC also sets to <code>#CC0000</code> — so the red holds across interactive states, matching Buick's behavior. Font swaps to <code>StratumGMC</code> with <code>font-weight: 400</code>; sizes shift to 18/25, 16/22, 14/20.</li>
          <li><strong>Cadillac</strong> — Primary default uses navy <code>#171473</code>; hover lifts to <code>#211fab</code>. Font swaps to <code>Cadillac_Gothic_Narrow</code> with <code>font-weight: 400</code>. Sizes match Chevy (16/14/12). No text-transform or letter-spacing changes (unlike Cadillac's button treatment — Link stays normal case).</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Use <strong>Primary</strong> for standalone navigation links that need high visibility (e.g., "View all vehicles").</li>
              <li>Use <strong>Neutral</strong> for inline links within a paragraph of body text — the underline distinguishes them from surrounding copy.</li>
              <li>Use <strong>Inverse</strong> on dark hero panels, image overlays, or dark-color section backgrounds.</li>
              <li>Match the link size to the surrounding body copy size.</li>
              <li>Use trailing arrow icons for links that navigate away from the current page or open external resources.</li>
              <li>Use the <code>aria-disabled="true"</code> attribute on <code>&lt;a&gt;</code> links and the <code>disabled</code> attribute on <code>&lt;button&gt;</code> elements so screen readers announce the disabled state.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use Link for interface actions that stay on the same page — use <strong>Button</strong> or <strong>Inline Button</strong> instead.</li>
              <li>Don't remove the underline — it is the primary visual affordance that distinguishes a link from plain text.</li>
              <li>Don't use Neutral links when they need to stand out from surrounding text — use Primary instead.</li>
              <li>Don't place a Primary link on a dark background — use Inverse to maintain contrast.</li>
              <li>Don't mix more than one icon placement (leading + trailing) on the same link.</li>
              <li>Don't use vague link labels like "click here" or "read more" — write descriptive labels so users know the destination.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
