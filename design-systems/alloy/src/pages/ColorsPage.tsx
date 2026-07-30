import { useState, useEffect } from 'react'
import { useBrand } from '../context/BrandContext'
import './home.css'

function ColorHex({ varName }: { varName: string }) {
  const { brand } = useBrand()
  const [hex, setHex] = useState('—')

  useEffect(() => {
    const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    setHex(val ? val.toUpperCase() : '—')
  }, [brand, varName])

  return <div className="color-swatch__hex">{hex}</div>
}

export default function ColorsPage() {
  return (
    <>
      <div className="doc-page-header">
        <div className="doc-page-header__eyebrow">Foundations</div>
        <h1 className="doc-page-header__title">Color</h1>
        <p className="doc-page-header__desc">
          Brand palette tokens are defined per brand in <code>styles/brands.css</code> and adapt
          to the active brand switcher. Neutral and feedback scales are shared across all brands.
        </p>
      </div>

      <div id="color" className="foundations-section">
        <div className="color-group">
          <div className="color-group__label">Brand Palette <span className="color-group__note">— reacts to brand switcher above</span></div>
          <div className="color-row">
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-color)' }}></div>
              <div className="color-swatch__name">Primary</div>
              <div className="color-swatch__token">--brand-color</div>
              <ColorHex varName="--brand-color" />
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-color-hover)' }}></div>
              <div className="color-swatch__name">Primary Hover</div>
              <div className="color-swatch__token">--brand-color-hover</div>
              <ColorHex varName="--brand-color-hover" />
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-color-secondary)' }}></div>
              <div className="color-swatch__name">Secondary</div>
              <div className="color-swatch__token">--brand-color-secondary</div>
              <ColorHex varName="--brand-color-secondary" />
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-grey-900)' }}></div>
              <div className="color-swatch__name">Grey 900</div>
              <div className="color-swatch__token">--brand-grey-900</div>
              <ColorHex varName="--brand-grey-900" />
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-grey-800)' }}></div>
              <div className="color-swatch__name">Grey 800</div>
              <div className="color-swatch__token">--brand-grey-800</div>
              <ColorHex varName="--brand-grey-800" />
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: 'var(--brand-button-disabled)', boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)' }}></div>
              <div className="color-swatch__name">Disabled</div>
              <div className="color-swatch__token">--brand-button-disabled</div>
              <ColorHex varName="--brand-button-disabled" />
            </div>
          </div>
        </div>

        <div className="color-group">
          <div className="color-group__label">Neutral Scale</div>
          <div className="color-row color-row--strip">
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#ffffff', boxShadow: 'inset 0 0 0 1px #e6e6e6' }}></div>
              <div className="color-swatch__name">White</div>
              <div className="color-swatch__hex">#ffffff</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#f8f8f8' }}></div>
              <div className="color-swatch__name">50</div>
              <div className="color-swatch__hex">#f8f8f8</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#f0f0f0' }}></div>
              <div className="color-swatch__name">100</div>
              <div className="color-swatch__hex">#f0f0f0</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#e6e6e6' }}></div>
              <div className="color-swatch__name">200</div>
              <div className="color-swatch__hex">#e6e6e6</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#c3c3c3' }}></div>
              <div className="color-swatch__name">300</div>
              <div className="color-swatch__hex">#c3c3c3</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#888888' }}></div>
              <div className="color-swatch__name">500</div>
              <div className="color-swatch__hex">#888888</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#505050' }}></div>
              <div className="color-swatch__name">700</div>
              <div className="color-swatch__hex">#505050</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#333333' }}></div>
              <div className="color-swatch__name">800</div>
              <div className="color-swatch__hex">#333333</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#1a1a1a' }}></div>
              <div className="color-swatch__name">900</div>
              <div className="color-swatch__hex">#1a1a1a</div>
            </div>
          </div>
        </div>

        <div className="color-group">
          <div className="color-group__label">Feedback &amp; Semantic</div>
          <div className="color-row">
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#d64022' }}></div>
              <div className="color-swatch__name">Error</div>
              <div className="color-swatch__token">--text-input-border-error</div>
              <div className="color-swatch__hex">#d64022</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#1d7a3b' }}></div>
              <div className="color-swatch__name">Success</div>
              <div className="color-swatch__hex">#1d7a3b</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#e6880a' }}></div>
              <div className="color-swatch__name">Warning</div>
              <div className="color-swatch__hex">#e6880a</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#e8f0fa', boxShadow: 'inset 0 0 0 1px #c3d4ef' }}></div>
              <div className="color-swatch__name">Info Surface</div>
              <div className="color-swatch__hex">#e8f0fa</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#f8f8f8', boxShadow: 'inset 0 0 0 1px #e6e6e6' }}></div>
              <div className="color-swatch__name">Background</div>
              <div className="color-swatch__hex">#f8f8f8</div>
            </div>
            <div className="color-swatch">
              <div className="color-swatch__chip" style={{ background: '#ffffff', boxShadow: 'inset 0 0 0 1px #e6e6e6' }}></div>
              <div className="color-swatch__name">Surface</div>
              <div className="color-swatch__hex">#ffffff</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
