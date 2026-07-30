import './home.css'

const ICONS = [
  'arrow-down','arrow-down-up','arrow-left','arrow-right','arrow-up',
  'asterisk','badge-dollar-sign','bell','calendar','calendar-check',
  'car','car-commercial','car-ev','car-sedan','car-suv','car-truck','car-van',
  'check','circle-alert','circle-arrow-down','circle-arrow-left','circle-arrow-right','circle-arrow-up',
  'circle-check','circle-check-fill','circle-chevron-down','circle-chevron-left','circle-chevron-right','circle-chevron-up',
  'circle-close','circle-cross-fill','circle-dollar-sign','circle-half','circle-help','circle-minus','circle-play','circle-search','circle-user',
  'clock','close','cloud-upload','copy','credit-card','dot','download','ellipsis-vertical','eye','eye-off',
  'file','file-check','file-check-text','file-pen','file-text','globe','hard-drive-upload','heart','heart-fill',
  'house','info','layout-grid','lightbulb','list','locate-fixed','lock-question','mail','map-pin','map-pin-dealership','map-pin-delivery',
  'maximize','menu','message-circle-text','message-square','moon-star','navigation',
  'pen','pencil','phone','plus','printer','rotate-ccw','search','share',
  'shield-check','shield-lock','sliders-horizontal','smartphone','smartphone-rotate-ccw',
  'steering-wheel','store','sunrise','sunset','tag','thumbs-up','timer','tools',
  'trash','upload','vehicle-rotate-ccw','vehicle-sparkles','zap','zoom-in','zoom-out',
]

const SHARED = ['ach-pay']

export default function IconographyPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Foundations</div>
        <h1 className="doc-page-header__title">Iconography</h1>
        <p className="doc-page-header__desc">
          UI icons used across DRP components. Every icon has a <strong>per-brand rendition</strong>{' '}
          (Chevrolet, Buick, GMC, Cadillac) stored as SVG in <code>assets/icons/&lt;brand&gt;/</code>.
          Icons render via CSS <code>mask-image</code> so they inherit <code>currentColor</code>{' '}
          and swap automatically when the brand switcher changes <code>[data-brand]</code>.
          Switch brands from the header to see renditions live.
        </p>
        <div className="doc-page-header__meta">
          <span className="doc-tag doc-tag--blue">{ICONS.length} icons · 4 brands</span>
          <a className="doc-page-header__link" href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/?node-id=20404-47099" target="_blank" rel="noreferrer">View in Figma ↗</a>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Usage</h2>
        <pre className="doc-code"><span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--search"</span> <span className="hl-attr">aria-hidden</span>=<span className="hl-val">"true"</span><span className="hl-tag">&gt;&lt;/i&gt;</span>{'\n\n'}<span className="hl-com">/* 24px variant — set font-size on the icon or its parent */</span>{'\n'}<span className="hl-tag">&lt;i</span> <span className="hl-attr">class</span>=<span className="hl-val">"drp-icon drp-icon--search"</span> <span className="hl-attr">style</span>=<span className="hl-val">"font-size:24px"</span><span className="hl-tag">&gt;&lt;/i&gt;</span></pre>
      </div>

      <div id="iconography" className="doc-section">
        <h2 className="doc-section__title">Catalog — brand responsive</h2>
        <p className="doc-section__subtitle">Each cell shows the icon at 24px and 16px. Icons use <code>currentColor</code>; the swatch colors below are inherited from the page text color.</p>
        <div className="icon-grid">
          {ICONS.map(name => (
            <div className="icon-cell" key={name}>
              <div className="icon-cell__sizes">
                <div className="icon-cell__size-wrap">
                  <i className={`drp-icon drp-icon--${name}`} aria-hidden="true" style={{ fontSize: '24px' }}></i>
                  <span className="icon-cell__size-label">24</span>
                </div>
                <div className="icon-cell__size-wrap">
                  <i className={`drp-icon drp-icon--${name}`} aria-hidden="true" style={{ fontSize: '16px' }}></i>
                  <span className="icon-cell__size-label">16</span>
                </div>
              </div>
              <div className="icon-cell__name">{name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Shared (non-brand) icons</h2>
        <p className="doc-section__subtitle">These icons render identically across all four brands.</p>
        <div className="icon-grid">
          {SHARED.map(name => (
            <div className="icon-cell" key={name}>
              <div className="icon-cell__sizes">
                <div className="icon-cell__size-wrap">
                  <i className={`drp-icon drp-icon--${name}`} aria-hidden="true" style={{ fontSize: '24px' }}></i>
                  <span className="icon-cell__size-label">24</span>
                </div>
                <div className="icon-cell__size-wrap">
                  <i className={`drp-icon drp-icon--${name}`} aria-hidden="true" style={{ fontSize: '16px' }}></i>
                  <span className="icon-cell__size-label">16</span>
                </div>
              </div>
              <div className="icon-cell__name">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
