import { useState } from 'react'

const AccordionIcon = () => (
  <span className="accordion__icon" aria-hidden="true">
    <i className="drp-icon drp-icon--plus accordion__icon-closed"></i>
    <i className="drp-icon drp-icon--circle-minus accordion__icon-open"></i>
  </span>
)

type AccordionItem = { id: string; label: string; body?: string; disabled?: boolean }

function AccordionGroup({ items, iconLeft = true, initialOpen = null }: {
  items: AccordionItem[]
  iconLeft?: boolean
  initialOpen?: string | null
}) {
  const [openId, setOpenId] = useState<string | null>(initialOpen)
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id)
  return (
    <div className="drp-accordion-group" style={{width:'100%'}}>
      {items.map(item => (
        <div
          key={item.id}
          className={`drp-accordion-container-bg${openId === item.id ? ' is-open' : ''}${item.disabled ? ' drp-disabled' : ''}`}
        >
          <button
            className="drp-accordion-container-summary-bg"
            aria-expanded={openId === item.id}
            disabled={item.disabled}
            onClick={() => !item.disabled && toggle(item.id)}
          >
            {iconLeft && <AccordionIcon />}
            <div className="accordion__label-wrap"><span className="accordion__label">{item.label}</span></div>
            {!iconLeft && <AccordionIcon />}
          </button>
          {item.body && (
            <div className="drp-accordion-details" role="region">
              <div className="accordion__body">{item.body}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function AccordionPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Accordion</h1>
        <p className="doc-page-header__desc">
          A vertically stacked set of interactive headings that reveal or hide associated content panels.
          Each item has a <strong>label</strong> with a <strong>toggle icon</strong> that
          indicates its state (plus when collapsed, circle-minus when expanded). Supports <strong>left</strong> and <strong>right</strong> icon positions,
          optional <strong>decorative icons</strong> beside the label, and full
          <strong>disabled</strong> state coverage.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Accordion</span>
          <span className="doc-tag doc-tag--blue">.accordion-group</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=536-9911" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      {/* Item States */}
      <div className="doc-section">
        <h2 className="doc-section__title">Item States</h2>
        <p className="doc-section__subtitle">Click a header to expand or collapse it. Hover to see the hover color.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 24px'}}>
              <AccordionGroup
                iconLeft={true}
                items={[
                  { id: 'ext', label: 'Exterior Color', body: 'Choose from a curated palette of GM-approved exterior paint colors.' },
                  { id: 'int', label: 'Interior Options', body: 'Select from premium seating materials and interior trim packages.' },
                ]}
              />
            </div>
            <div className="doc-variant-card__label">Left icon</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 24px'}}>
              <AccordionGroup
                iconLeft={false}
                items={[
                  { id: 'ext2', label: 'Exterior Color', body: 'Choose from a curated palette of GM-approved exterior paint colors.' },
                  { id: 'int2', label: 'Interior Options', body: 'Select from premium seating materials and interior trim packages.' },
                ]}
              />
            </div>
            <div className="doc-variant-card__label">Right icon</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;!-- Left icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-container-bg"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-container-summary-bg"</span> <span className="hl-attr">aria-expanded</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"accordion__icon"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;</span>...{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"accordion__label-wrap"</span><span className="hl-tag">&gt;&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"accordion__label"</span><span className="hl-tag">&gt;</span>Label<span className="hl-tag">&lt;/span&gt;&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-details"</span> <span className="hl-attr">role</span>=<span className="hl-val">"region"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"accordion__body"</span><span className="hl-tag">&gt;</span>Content goes here.<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'\n'}<span className="hl-comment">&lt;!-- Right icon: put label-wrap before the icon span --&gt;</span>{'\n'}<span className="hl-comment">&lt;!-- Open:     add .is-open to .drp-accordion-container-bg       --&gt;</span>{'\n'}<span className="hl-comment">&lt;!-- Disabled: add .drp-disabled to .drp-accordion-container-bg  --&gt;</span></pre>
      </div>

      {/* Accordion Group */}
      <div className="doc-section">
        <h2 className="doc-section__title">Accordion Group</h2>
        <p className="doc-section__subtitle">Click a header to expand it. Only one item opens at a time. The plus icon swaps to circle-minus and the label turns blue.</p>
        <div className="doc-variant-grid doc-variant-grid--wide">

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 24px'}}>
              <AccordionGroup
                iconLeft={true}
                initialOpen="interior-trim"
                items={[
                  { id: 'exterior-color', label: 'Exterior Color', body: 'Choose from a curated palette of GM-approved exterior paint colors, including standard and premium metallic finishes.' },
                  { id: 'interior-trim', label: 'Interior Trim', body: 'Select from leather, premium cloth, or synthetic suede upholstery in multiple colorways to match your style.' },
                  { id: 'wheel-package', label: 'Wheel Package', body: 'Upgrade from standard alloy wheels to a performance or chrome package to complete the look.' },
                  { id: 'accessories', label: 'Accessories (unavailable)', disabled: true },
                ]}
              />
            </div>
            <div className="doc-variant-card__label">Left icon group</div>
          </div>

          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={{alignItems:'flex-start', padding:'20px 24px'}}>
              <AccordionGroup
                iconLeft={false}
                initialOpen="trade-in"
                items={[
                  { id: 'financing', label: 'Financing Options', body: 'Compare finance, lease, and cash-purchase options side-by-side to find the plan that works for your budget.' },
                  { id: 'trade-in', label: 'Trade-In Value', body: 'Enter your current vehicle details to get an estimated trade-in value that can be applied toward your new vehicle purchase.' },
                  { id: 'delivery', label: 'Delivery Details', body: 'Review estimated build time, delivery window, and dealer pickup or home-delivery options for your configured vehicle.' },
                ]}
              />
            </div>
            <div className="doc-variant-card__label">Right icon group</div>
          </div>

        </div>

        <pre className="doc-code"><span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-group"</span><span className="hl-tag">&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-container-bg"</span><span className="hl-tag">&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-container-summary-bg"</span> <span className="hl-attr">aria-expanded</span>=<span className="hl-val">"false"</span><span className="hl-tag">&gt;</span>...<span className="hl-tag">&lt;/button&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-accordion-details"</span> <span className="hl-attr">role</span>=<span className="hl-val">"region"</span><span className="hl-tag">&gt;</span>{'\n'}{'      '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"accordion__body"</span><span className="hl-tag">&gt;</span>Content<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'    '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n'}{'  '}<span className="hl-comment">&lt;!-- repeat for each item --&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Design Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">Base values in <code>styles/tokens.css</code>; Buick, GMC, and Cadillac override the text-color ramp, border color, and typography in <code>styles/brands.css</code>. See Brand notes below.</p>

        <div className="doc-token-group">Layout &amp; Spacing</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--accordion-container-bg-height</code></td><td>56px</td><td>Closed item row height</td></tr>
              <tr><td><code>--accordion-container-summary-bg-height</code></td><td>56px</td><td>Header button height</td></tr>
              <tr><td><code>--accordion-container-summary-bg-padding</code></td><td>0 16px</td><td>Header horizontal padding</td></tr>
              <tr><td><code>--accordion-details-padding</code></td><td>16px</td><td>Open-panel padding (all sides)</td></tr>
              <tr><td><code>--accordion-container-bg-border-bottom-width</code></td><td>1px</td><td>Divider thickness</td></tr>
              <tr><td><code>--accordion-icon-size</code></td><td>24px</td><td>Toggle icon box</td></tr>
              <tr><td><code>--accordion-gap</code></td><td>24px</td><td>Gap between icon and label-wrap</td></tr>
              <tr><td><code>--accordion-inner-gap</code></td><td>8px</td><td>Gap inside label-wrap</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-token-group">Color</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--accordion-color-bg</code></td><td><span className="doc-swatch" style={{background:'#fff', border:'1px solid #ccc'}}></span>#ffffff</td><td>Container background</td></tr>
              <tr><td><code>--accordion-color-border</code></td><td><span className="doc-swatch" style={{background:'#e6e6e6'}}></span>#e6e6e6</td><td>Top + bottom dividers</td></tr>
              <tr><td><code>--accordion-color-text-default</code></td><td><span className="doc-swatch" style={{background:'#666'}}></span>#666666</td><td>Label + icon — default</td></tr>
              <tr><td><code>--accordion-color-text-hover</code></td><td><span className="doc-swatch" style={{background:'#0e4180'}}></span>#0e4180</td><td>Label + icon — hover</td></tr>
              <tr><td><code>--accordion-color-text-active</code></td><td><span className="doc-swatch" style={{background:'#0077d9'}}></span>#0077d9</td><td>Label + icon — when open</td></tr>
              <tr><td><code>--accordion-color-text-disabled</code></td><td><span className="doc-swatch" style={{background:'#b3b3b3'}}></span>#b3b3b3</td><td>Label + icon — disabled</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-token-group">Typography — Label</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--accordion-typography-label-font-family</code></td><td>'Chevy_Sans:Demi', sans-serif</td><td>Header label</td></tr>
              <tr><td><code>--accordion-typography-label-font-size</code></td><td>16px</td><td>—</td></tr>
              <tr><td><code>--accordion-typography-label-line-height</code></td><td>24px</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <div className="doc-token-group">Typography — Body</div>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Applied to</th></tr></thead>
            <tbody>
              <tr><td><code>--accordion-typography-body-font-family</code></td><td>'Chevy_Sans:Medium', sans-serif</td><td>Open-panel body copy</td></tr>
              <tr><td><code>--accordion-typography-body-font-size</code></td><td>14px</td><td>—</td></tr>
              <tr><td><code>--accordion-typography-body-line-height</code></td><td>22px</td><td>—</td></tr>
              <tr><td><code>--accordion-typography-body-color</code></td><td><span className="doc-swatch" style={{background:'#666'}}></span>#666666</td><td>—</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Brand notes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand notes</h2>
        <p className="doc-section__subtitle">Token swaps only — no structural or layout changes per brand. Values below are the actual overrides from <code>styles/brands.css</code>.</p>
        <ul className="doc-brand-list">
          <li><strong>Buick</strong> — text ramp darkens (<code>default #474747</code>, <code>hover/active #222222</code>, <code>disabled #a7a6a4</code>); border <code>#a7a6a4</code>; label scales to <code>18px / 25px</code>; label + body switch to <code>'Buick_Text'</code>. Note: Buick never turns the open-state label blue — it darkens instead.</li>
          <li><strong>GMC</strong> — text ramp flips to white (<code>default/hover/active #ffffff</code>, <code>disabled #6b6d6e</code>) for use on dark surfaces; border <code>#c8c8c8</code>; label scales to <code>18px / 25px</code>; label + body switch to <code>'StratumGMC'</code>.</li>
          <li><strong>Cadillac</strong> — text stays charcoal <code>#282828</code> across default/hover/active (no open-state color change); border <code>#a0a0a0</code>; label + body switch to <code>'Cadillac_Gothic_Narrow'</code>. Cadillac does not override the disabled color — inherits Chevy's <code>#b3b3b3</code>.</li>
        </ul>
      </div>

      {/* Dos & Don'ts */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dos &amp; Don'ts</h2>
        <div className="doc-dos-donts">
          <div className="doc-dos">
            <div className="doc-dos__header">Do</div>
            <ul className="doc-dos__body">
              <li>Always add <code>aria-expanded="true/false"</code> to the trigger button so screen readers announce the state.</li>
              <li>Add <code>role="region"</code> to the panel so assistive technology identifies it as an expandable region.</li>
              <li>Keep labels concise — one short phrase that clearly describes the hidden content.</li>
              <li>Wrap stacked items in a <code>.drp-accordion-group</code> container — it ensures the top border renders cleanly on the first item.</li>
              <li>Keep icon position (left or right) consistent across all items in the same group.</li>
            </ul>
          </div>
          <div className="doc-donts">
            <div className="doc-donts__header">Don't</div>
            <ul className="doc-donts__body">
              <li>Don't nest accordions inside accordions — use a different disclosure pattern instead.</li>
              <li>Don't mix left-icon and right-icon variants within the same group.</li>
              <li>Don't put primary actions inside panels that are hidden by default.</li>
              <li>Don't mix items with and without decorative icons in the same group.</li>
              <li>Don't use accordions when all sections are equally important and always visible.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
