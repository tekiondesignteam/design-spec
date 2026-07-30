import type { CSSProperties } from 'react'

type ArrowPosition =
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'none'

function Tooltip({
  arrow = 'bottom-right',
  chip,
  title,
  body,
  link,
  showIcon = true,
  showClose = true,
  style,
}: {
  arrow?: ArrowPosition
  chip?: string
  title?: string
  body?: string
  link?: string
  showIcon?: boolean
  showClose?: boolean
  style?: CSSProperties
}) {
  const classes = ['tooltip']
  if (arrow && arrow !== 'none') classes.push(`tooltip--arrow-${arrow}`)
  return (
    <div className={classes.join(' ')} style={style} role="tooltip">
      {chip && (
        <span className="chip chip--information chip--sm chip--color-primary">{chip}</span>
      )}
      {title && (
        <div className="tooltip__title-row">
          {showIcon && (
            <span className="tooltip__icon" aria-hidden="true">
              <i className="drp-icon drp-icon--info" />
            </span>
          )}
          <span className="tooltip__title">{title}</span>
          {showClose && (
            <button type="button" className="tooltip__close" aria-label="Dismiss">
              <i className="drp-icon drp-icon--close" aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      <p className="tooltip__body">{body}</p>
      {link && (
        <div className="tooltip__link-row">
          <a href="#" className="tooltip__link" onClick={(e) => e.preventDefault()}>
            {link}
          </a>
        </div>
      )}
      {arrow && arrow !== 'none' && <span className="tooltip__arrow" aria-hidden="true" />}
    </div>
  )
}

const BODY_TEXT =
  "For In-Transit Inventory, any date of arrival is estimated. The actual date of delivery may vary due to circumstances beyond the manufacturer and the dealer's control. Please contact your local dealer for availability details."

const TITLE_TEXT = 'Estimated Date of arrival: May 7th, 2022'

const ARROWS: { key: ArrowPosition; label: string }[] = [
  { key: 'top-left', label: '↖ Top Left' },
  { key: 'top-center', label: '↑ Top Center' },
  { key: 'top-right', label: '↗ Top Right' },
  { key: 'middle-left', label: '← Middle Left' },
  { key: 'none', label: 'None (no arrow)' },
  { key: 'middle-right', label: '→ Middle Right' },
  { key: 'bottom-left', label: '↙ Bottom Left' },
  { key: 'bottom-center', label: '↓ Bottom Center' },
  { key: 'bottom-right', label: '↘ Bottom Right' },
]

// Demo preview area needs extra padding so arrows overhanging the tooltip
// box stay visible and don't visually clip against the card edge.
const previewStyle = { padding: '32px 24px', minHeight: '220px', overflow: 'visible' }

export default function TooltipPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Components</div>
        <h1 className="doc-page-header__title">Tooltip</h1>
        <p className="doc-page-header__desc">
          A contextual overlay that surfaces supplemental information about a nearby element.
          Fixed 384px width with a dark surface, optional info chip, optional title row
          (leading info icon + trailing close), body copy, and an optional inverse link at the
          bottom. Nine arrow positions anchor the tooltip to its trigger; or use{' '}
          <code>none</code> for a floating variant.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">Tooltip - Dark</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20408-95124" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      {/* Four canonical types (Figma node 20408:95530) */}
      <div className="doc-section">
        <h2 className="doc-section__title">Types</h2>
        <p className="doc-section__subtitle">
          Four standard compositions. All use the same dark surface, fixed 384px width,
          and a bottom-left arrow — the content slots are what differ.
        </p>
        <div
          className="doc-variant-grid doc-variant-grid--wide"
          style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
        >
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="bottom-left" body={BODY_TEXT} />
            </div>
            <div className="doc-variant-card__label">Plain</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip
                arrow="none"
                title={TITLE_TEXT}
                body={BODY_TEXT}
                showIcon={false}
              />
            </div>
            <div className="doc-variant-card__label">With title (dismissable)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip
                arrow="bottom-left"
                title={TITLE_TEXT}
                body={BODY_TEXT}
                showClose={false}
              />
            </div>
            <div className="doc-variant-card__label">With title + info icon</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip
                arrow="bottom-left"
                title={TITLE_TEXT}
                body={BODY_TEXT}
                link="Button Label"
                showIcon={false}
                showClose={false}
              />
            </div>
            <div className="doc-variant-card__label">With title + link</div>
          </div>
        </div>
        <pre className="doc-code"><span className="hl-tag">&lt;!-- 1. Plain --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip tooltip--arrow-bottom-left"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tooltip"</span><span className="hl-tag">&gt;</span>{'\n  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__body"</span><span className="hl-tag">&gt;</span><span className="hl-text">…body copy…</span><span className="hl-tag">&lt;/p&gt;</span>{'\n  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__arrow"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- 2. With title (dismissable) --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip tooltip--arrow-bottom-left"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tooltip"</span><span className="hl-tag">&gt;</span>{'\n  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title-row"</span><span className="hl-tag">&gt;</span>{'\n    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title"</span><span className="hl-tag">&gt;</span><span className="hl-text">Estimated Date of arrival: May 7th, 2022</span><span className="hl-tag">&lt;/span&gt;</span>{'\n    '}<span className="hl-tag">&lt;button</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__close"</span> <span className="hl-attr">aria-label</span>=<span className="hl-val">"Dismiss"</span><span className="hl-tag">&gt;&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--close"</span><span className="hl-tag">&gt;&lt;/i&gt;&lt;/button&gt;</span>{'\n  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__body"</span><span className="hl-tag">&gt;</span><span className="hl-text">…body copy…</span><span className="hl-tag">&lt;/p&gt;</span>{'\n  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__arrow"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- 3. With title + info icon --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip tooltip--arrow-bottom-left"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tooltip"</span><span className="hl-tag">&gt;</span>{'\n  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title-row"</span><span className="hl-tag">&gt;</span>{'\n    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__icon"</span><span className="hl-tag">&gt;&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--info"</span><span className="hl-tag">&gt;&lt;/i&gt;&lt;/span&gt;</span>{'\n    '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title"</span><span className="hl-tag">&gt;</span><span className="hl-text">…title…</span><span className="hl-tag">&lt;/span&gt;</span>{'\n  '}<span className="hl-tag">&lt;/div&gt;</span>{'\n  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__body"</span><span className="hl-tag">&gt;</span><span className="hl-text">…body copy…</span><span className="hl-tag">&lt;/p&gt;</span>{'\n  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__arrow"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span>{'\n\n'}<span className="hl-tag">&lt;!-- 4. With title + link --&gt;</span>{'\n'}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip tooltip--arrow-bottom-left"</span> <span className="hl-attr">role</span>=<span className="hl-val">"tooltip"</span><span className="hl-tag">&gt;</span>{'\n  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title-row"</span><span className="hl-tag">&gt;&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__title"</span><span className="hl-tag">&gt;</span><span className="hl-text">…title…</span><span className="hl-tag">&lt;/span&gt;&lt;/div&gt;</span>{'\n  '}<span className="hl-tag">&lt;p</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__body"</span><span className="hl-tag">&gt;</span><span className="hl-text">…body copy…</span><span className="hl-tag">&lt;/p&gt;</span>{'\n  '}<span className="hl-tag">&lt;div</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__link-row"</span><span className="hl-tag">&gt;&lt;a</span> <span className="hl-attr">href</span>=<span className="hl-val">"#"</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__link"</span><span className="hl-tag">&gt;</span><span className="hl-text">Button Label</span><span className="hl-tag">&lt;/a&gt;&lt;/div&gt;</span>{'\n  '}<span className="hl-tag">&lt;span</span> <span className="hl-attr">class</span>=<span className="hl-val">"tooltip__arrow"</span><span className="hl-tag">&gt;&lt;/span&gt;</span>{'\n'}<span className="hl-tag">&lt;/div&gt;</span></pre>
      </div>

      {/* Arrow positions */}
      <div className="doc-section">
        <h2 className="doc-section__title">Arrow Positions</h2>
        <p className="doc-section__subtitle">
          Nine positions anchor the tooltip to its trigger. Top, Bottom, and Middle arrows
          pivot the notch against the trigger's edge; corner variants inset 16px from the
          nearest corner. Use <code>none</code> when the tooltip is repositioned dynamically.
        </p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          {ARROWS.map(({ key, label }) => (
            <div className="doc-variant-card" key={key}>
              <div className="doc-variant-card__preview" style={previewStyle}>
                <Tooltip arrow={key} body={BODY_TEXT} />
              </div>
              <div className="doc-variant-card__label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slot combinations */}
      <div className="doc-section">
        <h2 className="doc-section__title">Slot Combinations</h2>
        <p className="doc-section__subtitle">
          All slots above the body are optional. Mix and match to fit the message weight.
        </p>
        <div className="doc-variant-grid doc-variant-grid--wide">
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" body={BODY_TEXT} />
            </div>
            <div className="doc-variant-card__label">Body only</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" title={TITLE_TEXT} body={BODY_TEXT} />
            </div>
            <div className="doc-variant-card__label">Title + body</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" chip="Label" title={TITLE_TEXT} body={BODY_TEXT} />
            </div>
            <div className="doc-variant-card__label">Chip + title + body</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" title={TITLE_TEXT} body={BODY_TEXT} link="View details" />
            </div>
            <div className="doc-variant-card__label">Title + body + link</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" title={TITLE_TEXT} body={BODY_TEXT} showIcon={false} />
            </div>
            <div className="doc-variant-card__label">Title (no info icon)</div>
          </div>
          <div className="doc-variant-card">
            <div className="doc-variant-card__preview" style={previewStyle}>
              <Tooltip arrow="top-left" title={TITLE_TEXT} body={BODY_TEXT} showClose={false} />
            </div>
            <div className="doc-variant-card__label">Title (no close)</div>
          </div>
        </div>
      </div>

      {/* Brand behavior */}
      <div className="doc-section">
        <h2 className="doc-section__title">Brand Behavior</h2>
        <p className="doc-section__subtitle">
          The tooltip surface is intentionally brand-muted: a near-black panel with white
          body text. Only <strong>background shade</strong> and <strong>typography</strong> change per brand.
        </p>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead>
              <tr>
                <th>Property</th><th>Chevrolet</th><th>Buick</th><th>GMC</th><th>Cadillac</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Background</td>
                <td><code>#1a1a1a</code></td>
                <td><code>#222222</code></td>
                <td><code>#060505</code></td>
                <td><code>#282828</code></td>
              </tr>
              <tr>
                <td>Body font</td>
                <td>Chevy_Sans Medium 14/22</td>
                <td>Buick_Text Regular 16/22</td>
                <td>StratumGMC Regular 16/22</td>
                <td>Cadillac_Gothic_Narrow Regular 14/22</td>
              </tr>
              <tr>
                <td>Title font</td>
                <td>Chevy_Sans Bold 16/22</td>
                <td>Buick_Text Bold 16/22</td>
                <td>StratumGMC Bold 16/22</td>
                <td>Cadillac_Gothic_Narrow Bold 16/22</td>
              </tr>
              <tr>
                <td>Padding / Radius</td>
                <td colSpan={4}>16px / 0 — brand-invariant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tokens */}
      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__subtitle">
          All tokens are defined in <code>styles/tokens.css</code>. Tooltip owns the <code>--tooltip-*</code> token family (20 tokens). See <strong>Brand notes</strong> above for which tokens are overridden per brand; everything else is brand-invariant.
        </p>

        <h3 className="doc-token-group">Container</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tooltip-bg</code></td><td><span className="doc-swatch" style={{background:'#1a1a1a'}}></span>#1a1a1a</td><td>Panel background (overridden per brand)</td></tr>
              <tr><td><code>--tooltip-border-color</code></td><td>transparent</td><td>Border color (placeholder for parity with other components)</td></tr>
              <tr><td><code>--tooltip-border-width</code></td><td>1px</td><td>Border thickness</td></tr>
              <tr><td><code>--tooltip-border-radius</code></td><td>0</td><td>Corner radius (sharp per Figma)</td></tr>
              <tr><td><code>--tooltip-padding</code></td><td>16px</td><td>Inner padding</td></tr>
              <tr><td><code>--tooltip-gap</code></td><td>8px</td><td>Vertical gap between rows (chip / title / body / link)</td></tr>
              <tr><td><code>--tooltip-width</code></td><td>384px</td><td>Fixed panel width</td></tr>
              <tr><td><code>--tooltip-shadow</code></td><td colSpan={2}><code>0 4px 4px rgba(0,0,0,.10), 0 10px 8px rgba(0,0,0,.04)</code></td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Body text</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tooltip-body-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Body text color (brand-invariant)</td></tr>
              <tr><td><code>--tooltip-body-font-family</code></td><td>Chevy_Sans</td><td>Body font (overridden per brand)</td></tr>
              <tr><td><code>--tooltip-body-font-weight</code></td><td>500</td><td>Body weight (Chevy: Medium; other brands: 400)</td></tr>
              <tr><td><code>--tooltip-body-font-size</code></td><td>14px</td><td>Body size (Chevy/Cadillac: 14; Buick/GMC: 16)</td></tr>
              <tr><td><code>--tooltip-body-line-height</code></td><td>22px</td><td>Body line-height (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Title text</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tooltip-title-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Title text color (brand-invariant)</td></tr>
              <tr><td><code>--tooltip-title-font-family</code></td><td>Chevy_Sans:Bold</td><td>Title font (overridden per brand)</td></tr>
              <tr><td><code>--tooltip-title-font-weight</code></td><td>700</td><td>Title weight (Bold on every brand)</td></tr>
              <tr><td><code>--tooltip-title-font-size</code></td><td>16px</td><td>Title size (brand-invariant)</td></tr>
              <tr><td><code>--tooltip-title-line-height</code></td><td>22px</td><td>Title line-height (brand-invariant)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="doc-token-group">Icon, link &amp; arrow</h3>
        <div className="doc-table-wrap">
          <table className="doc-table">
            <thead><tr><th>Token</th><th>Value</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><code>--tooltip-icon-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Info / close icon color</td></tr>
              <tr><td><code>--tooltip-link-color</code></td><td><span className="doc-swatch" style={{background:'#ffffff', border:'1px solid #ddd'}}></span>#ffffff</td><td>Bottom link color (inverse / on dark surface)</td></tr>
              <tr><td><code>--tooltip-arrow-size</code></td><td>16px</td><td>Width of the arrow notch base</td></tr>
              <tr><td><code>--tooltip-arrow-thickness</code></td><td>8px</td><td>Depth of the arrow notch</td></tr>
              <tr><td><code>--tooltip-arrow-inset</code></td><td>16px</td><td>Distance from corner for corner-anchored arrows</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Dos and Don'ts */}
      <div className="doc-section">
        <div className="doc-dos-grid">
          <div className="doc-dos">
            <h3 className="doc-dos__title doc-dos__title--do">Do</h3>
            <ul>
              <li>Use tooltips for supplemental information that is helpful but not essential.</li>
              <li>Keep the body concise — one to three short sentences fit the 384px width cleanly.</li>
              <li>Point the arrow to the precise trigger element; inset 16px from corners.</li>
              <li>Include a close button when the tooltip is sticky or contains an action link.</li>
              <li>Reserve the info chip for status/category labels, not long phrases.</li>
            </ul>
          </div>
          <div className="doc-dos">
            <h3 className="doc-dos__title doc-dos__title--dont">Don't</h3>
            <ul>
              <li>Don't put critical workflow information in a tooltip — if the user needs it to proceed, put it inline.</li>
              <li>Don't stack multiple tooltips on the same view at once.</li>
              <li>Don't change the background color per brand palette — tooltips are intentionally neutral dark.</li>
              <li>Don't resize the tooltip; the 384px width is fixed across all brands and positions.</li>
              <li>Don't use the tooltip as a menu — use <code>.menu</code> for selectable lists.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
