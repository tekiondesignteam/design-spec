import { useState } from 'react'

function TabGroup({ size, tabs, ariaLabel }: {
  size: 'lg'
  tabs: string[]
  ariaLabel?: string
}) {
  const [active, setActive] = useState(0)
  return (
    <div
      className={`drp-tab-contained-container drp-tab-contained-container--${size}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`drp-tab-contained-tab-container-bg${active === i ? ' is-selected' : ''}`}
          role="tab"
          aria-selected={active === i}
          onClick={() => setActive(i)}
        >
          <span>{tab}</span>
        </button>
      ))}
    </div>
  )
}

function UnderlinedInsideTabGroup({ size, tabs, ariaLabel }: {
  size: 'md' | 'lg'
  tabs: string[]
  ariaLabel?: string
}) {
  const [active, setActive] = useState(0)
  return (
    <div
      className={`drp-tab-underlined-inside drp-tab-underlined-inside--${size}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`drp-tab-underlined-inside__tab${active === i ? ' is-selected' : ''}`}
          role="tab"
          aria-selected={active === i}
          onClick={() => setActive(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

function UnderlinedInsetTabGroup({ size, tabs, variableWidth, ariaLabel }: {
  size: 'md' | 'lg'
  tabs: string[]
  variableWidth?: boolean
  ariaLabel?: string
}) {
  const [active, setActive] = useState(0)
  const cls = [
    'drp-tab-underlined-inset',
    `drp-tab-underlined-inset--${size}`,
    variableWidth ? 'drp-tab-underlined-inset--variable-width' : ''
  ].filter(Boolean).join(' ')
  return (
    <div className={cls} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`drp-tab-underlined-inset__tab${active === i ? ' is-selected' : ''}`}
          role="tab"
          aria-selected={active === i}
          onClick={() => setActive(i)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default function TabsPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Tabs</h1>
        <p className="doc-page-header__desc">
          A horizontal tab bar for switching between related content panels. Three
          variants: <strong>Contained</strong> (joined pill row), <strong>Underlined — Inside</strong>
          {' '}(bare text tabs with per-tab underline), and <strong>Underlined — Inset</strong>
          {' '}(tabs on a baseline rule with brand-colored overlay underline).
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Tabs</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=19925-5759" target="_blank" rel="noreferrer">View in Figma ↗</a>
          <a className="doc-page-header__link" href="https://aecgm-dev.tekion.xyz/docs/ui-components/" target="_blank" rel="noreferrer">Storybook ↗</a>
        </div>
      </div>

      {/* Contained — Tab Counts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Contained — Tab Counts</h2>
        <p className="doc-section__subtitle">Tab groups support 2 to 5 tabs. Beyond 5, consider a different navigation pattern such as a dropdown menu or pagination.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <TabGroup size="lg" tabs={['Overview', 'Details']} />
            </div>
            <div className="doc-variant-card__label">2 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <TabGroup size="lg" tabs={['Overview', 'Specs', 'Gallery']} />
            </div>
            <div className="doc-variant-card__label">3 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <TabGroup size="lg" tabs={['Overview', 'Specs', 'Gallery', 'Reviews']} />
            </div>
            <div className="doc-variant-card__label">4 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <TabGroup size="lg" tabs={['Overview', 'Specs', 'Gallery', 'Reviews', 'Finance']} />
            </div>
            <div className="doc-variant-card__label">5 tabs (maximum)</div>
          </div>
        </div>
      </div>

      {/* Underlined — Inside */}
      <div className="doc-section">
        <h2 className="doc-section__title">Underlined — Inside</h2>
        <p className="doc-section__subtitle">Bare text tabs with 40px spacing. The selected tab gets a 4px brand-colored underline sized to the tab label only — no baseline rule across the bar. Available in medium (40px) and large (48px) heights.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsideTabGroup size="md" tabs={['Overview', 'Details']} />
            </div>
            <div className="doc-variant-card__label">Medium · 2 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsideTabGroup size="lg" tabs={['Overview', 'Details']} />
            </div>
            <div className="doc-variant-card__label">Large · 2 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsideTabGroup size="md" tabs={['Overview', 'Specs', 'Gallery', 'Reviews']} />
            </div>
            <div className="doc-variant-card__label">Medium · 4 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsideTabGroup size="lg" tabs={['Overview', 'Specs', 'Gallery', 'Reviews', 'Finance']} />
            </div>
            <div className="doc-variant-card__label">Large · 5 tabs</div>
          </div>
        </div>
      </div>

      {/* Underlined — Inset */}
      <div className="doc-section">
        <h2 className="doc-section__title">Underlined — Inset</h2>
        <p className="doc-section__subtitle">Tabs sit on a 1px gray baseline spanning the full bar. The selected tab overlays a 4px brand-colored underline. By default tabs fill the container equally; add <code>--variable-width</code> to hug content. Selected text stays near-black — only the underline carries the brand color.</p>
        <div className="doc-variant-grid" style={{gridTemplateColumns:'1fr 1fr'}}>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsetTabGroup size="md" tabs={['Overview', 'Details']} />
            </div>
            <div className="doc-variant-card__label">Medium · fill width · 2 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsetTabGroup size="lg" tabs={['Overview', 'Specs', 'Gallery']} />
            </div>
            <div className="doc-variant-card__label">Large · fill width · 3 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsetTabGroup size="md" variableWidth tabs={['Overview', 'Details']} />
            </div>
            <div className="doc-variant-card__label">Medium · variable width · 2 tabs</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview">
              <UnderlinedInsetTabGroup size="lg" variableWidth tabs={['Overview', 'Specs', 'Gallery', 'Reviews']} />
            </div>
            <div className="doc-variant-card__label">Large · variable width · 4 tabs</div>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__subtitle">Minimal HTML for a 3-tab Contained group. Wrap the bar in <code>.drp-tab-contained-container</code> and each button in <code>.drp-tab-contained-tab-container-bg</code>; add <code>.is-selected</code> to the active tab. Underlined variants swap the root class to <code>.drp-tab-underlined-inside</code> or <code>.drp-tab-underlined-inset</code> (with <code>--md</code>/<code>--lg</code> size + optional <code>--variable-width</code> modifier) and wrap buttons in <code>__tab</code>.</p>
        <pre className="doc-code"><span className="hl-com">&lt;!-- Contained tab bar --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-contained-container drp-tab-contained-container--lg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tablist"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-contained-tab-container-bg is-selected"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tab"</span> <span className="hl-attr">aria-selected</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;span&gt;</span>Overview<span className="hl-tag">&lt;/span&gt;&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-contained-tab-container-bg"</span>             <span className="hl-attr">role</span>=<span className="hl-val">"tab"</span> <span className="hl-attr">aria-selected</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;&lt;span&gt;</span>Specs<span className="hl-tag">&lt;/span&gt;&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-contained-tab-container-bg"</span>             <span className="hl-attr">role</span>=<span className="hl-val">"tab"</span> <span className="hl-attr">aria-selected</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;&lt;span&gt;</span>Gallery<span className="hl-tag">&lt;/span&gt;&lt;/button&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-com">&lt;!-- Underlined — Inside (bare text + per-tab underline) --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-underlined-inside drp-tab-underlined-inside--lg"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tablist"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-tab-underlined-inside__tab is-selected"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tab"</span> <span className="hl-attr">aria-selected</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>Overview<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}...{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">All tokens are defined in <code>styles/tokens.css</code>. Tabs spans three token families: the shared <code>--tabs-*</code> set + Contained-specific <code>--tab-contained-*</code> (both consumed by the pill variant) and <code>--tab-underlined-*</code> (Inside + Inset variants).</p>

        <h3 className="doc-token-group">Contained — sizing &amp; shape</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tabs-height-lg</code></td><td>48px</td><td>Container height</td></tr>
              <tr><td><code>--tab-contained-container-bg-border-radius</code></td><td>4px</td><td>Outer container radius</td></tr>
              <tr><td><code>--tabs-radius</code></td><td>8px</td><td>Corner radius on first/last tab (inner)</td></tr>
              <tr><td><code>--tab-contained-container-bg-padding</code></td><td>4px</td><td>Inner padding of the container</td></tr>
              <tr><td><code>--tab-contained-tab-container-bg-large-padding</code></td><td>0 20px</td><td>Per-tab horizontal padding</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Contained — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tabs-bg</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Tab background (base)</td></tr>
              <tr><td><code>--tabs-border-default</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Unselected border color</td></tr>
              <tr><td><code>--tabs-border-selected</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Selected border color</td></tr>
              <tr><td><code>--tabs-text-default</code></td><td><span className="doc-swatch" style={{background:'#666666'}}></span>#666666</td><td>Unselected text color</td></tr>
              <tr><td><code>--tabs-text-selected</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Selected text color</td></tr>
              <tr><td><code>--tabs-underline</code></td><td>4px</td><td>Inner underline thickness on selected tab</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Contained — typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tab-contained-typography-large-font-family</code></td><td>Chevy_Sans:Demi</td><td>Unselected label font</td></tr>
              <tr><td><code>--tab-contained-typography-selected-large-font-family</code></td><td>Chevy_Sans:Demi</td><td>Selected label font</td></tr>
              <tr><td><code>--tab-contained-typography-large-font-size</code></td><td>16px</td><td>Label font size</td></tr>
              <tr><td><code>--tab-contained-typography-large-line-height</code></td><td>24px</td><td>Label line-height</td></tr>
              <tr><td><code>--tab-contained-typography-font-weight</code></td><td>600</td><td>Label weight</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Underlined — sizing &amp; layout</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tab-underlined-height-md</code></td><td>40px</td><td>Bar height — medium</td></tr>
              <tr><td><code>--tab-underlined-height-lg</code></td><td>48px</td><td>Bar height — large</td></tr>
              <tr><td><code>--tab-underlined-border-width</code></td><td>4px</td><td>Selected underline thickness</td></tr>
              <tr><td><code>--tab-underlined-bar-border-width</code></td><td>1px</td><td>Inset — baseline rule thickness</td></tr>
              <tr><td><code>--tab-underlined-inside-gap</code></td><td>40px</td><td>Inside — gap between tabs</td></tr>
              <tr><td><code>--tab-underlined-inset-padding-x</code></td><td>16px</td><td>Inset — horizontal padding per tab</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Underlined — color</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tab-underlined-bar-border</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6', border:'1px solid #ccc'}}></span>#e6e6e6</td><td>Inset — baseline rule color</td></tr>
              <tr><td><code>--tab-underlined-text-default</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Default tab text</td></tr>
              <tr><td><code>--tab-underlined-text-selected-inside</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>var(--brand-color, #0077d9)</td><td>Inside — selected text (brand)</td></tr>
              <tr><td><code>--tab-underlined-text-selected-inset</code></td><td><span className="doc-swatch" style={{background:'#262626'}}></span>#262626</td><td>Inset — selected text (stays dark)</td></tr>
              <tr><td><code>--tab-underlined-border-selected</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>var(--brand-color, #0077d9)</td><td>Selected underline color</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Underlined — typography</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tab-underlined-font-family</code></td><td>Chevy_Sans</td><td>Label font</td></tr>
              <tr><td><code>--tab-underlined-font-weight</code></td><td>600</td><td>Label weight</td></tr>
              <tr><td><code>--tab-underlined-font-md-size</code></td><td>14px</td><td>Medium font size</td></tr>
              <tr><td><code>--tab-underlined-font-md-line-height</code></td><td>22px</td><td>Medium line-height</td></tr>
              <tr><td><code>--tab-underlined-font-lg-size</code></td><td>16px</td><td>Large font size</td></tr>
              <tr><td><code>--tab-underlined-font-lg-line-height</code></td><td>24px</td><td>Large line-height</td></tr>
              <tr><td><code>--tab-underlined-text-transform</code></td><td>none</td><td>Label case (brands can override)</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Tabs has a wider brand surface than most components — fonts, weights, container radii, text-transform, and selected colors all vary. Selected underline routes through <code>var(--brand-color)</code> on every brand; selected text does <em>not</em> always follow.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — Font swaps to <code>Buick_Text</code> with weight 500 on both Contained and Underlined. Unique two-tone Contained container: adds <code>--tabs-bg-unselected: #f6f5f4</code> and <code>--tabs-bg-selected: #ffffff</code>, so unselected tabs sit on a warm off-white while the active tab pops to pure white. Selected border + text route through <code>var(--brand-color)</code> = <code>#D44400</code>. Container radii stay at Chevy's <code>4px</code>/<code>8px</code>.</li>
          <li><strong>GMC</strong> — Font swaps to <code>StratumGMC</code> with <code>text-transform: uppercase</code> on both variants. Container radii flatten to <code>0</code> (both <code>--tab-contained-container-bg-border-radius</code> and <code>--tabs-radius</code>). Critically, GMC <em>neutralizes</em> the brand red on text: <code>--tabs-text-selected</code> and <code>--tab-underlined-text-selected-inside</code> are both overridden to near-black <code>#060505</code>. Red only appears on the selected underline, via <code>--tabs-underline-color: var(--brand-color)</code> = <code>#CC0000</code>.</li>
          <li><strong>Cadillac</strong> — Font swaps to <code>Cadillac_Gothic_Narrow</code> with weight 500 and <code>text-transform: uppercase</code> on both variants. Container radii flatten to <code>0</code> (same as GMC). Adds a distinct two-tone container: <code>--tabs-bg-unselected: #e8e8e8</code>, <code>--tabs-bg-selected: #ffffff</code>. Selected border + text pull through to navy <code>#171473</code> via <code>var(--brand-color)</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Keep labels short (1–3 words) — tabs are not for long sentences.</li>
              <li>Always have exactly one tab selected at all times.</li>
              <li>Use tabs for primary page navigation with 2–5 related panels.</li>
              <li>Provide a content panel for every tab.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't use more than 5 tabs — use a different navigation pattern instead.</li>
              <li>Don't use tabs when the content on each panel is very similar — use filters instead.</li>
              <li>Don't rely only on color to communicate the selected state.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
