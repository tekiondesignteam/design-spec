import { Link, useMatches } from 'react-router-dom'
import { useBrand } from '../../context/BrandContext'
import type { Brand } from '../../context/brand-constants'
import { isRouteHandle } from '../../router-types'

const BRAND_ORDER: readonly Brand[] = ['chevrolet', 'cadillac', 'buick', 'gmc']
const BRAND_LABELS: Record<Brand, string> = {
  chevrolet: 'Chevrolet',
  cadillac: 'Cadillac',
  buick: 'Buick',
  gmc: 'GMC',
}

export default function Header() {
  const { brand, setBrand } = useBrand()
  const matches = useMatches()
  const match = matches.find(m => isRouteHandle(m.handle) && !!m.handle.breadcrumb)
  const handle = match && isRouteHandle(match.handle) ? match.handle : undefined
  const breadcrumb = handle?.breadcrumb
  const section = handle?.section || 'Components'

  return (
    <header className="doc-header">
      <div className="doc-header__breadcrumb">
        {breadcrumb ? (
          <>
            <Link to="/">Design System</Link>
            <span className="sep">/</span>
            <span>{section}</span>
            <span className="sep">/</span>
            <span className="doc-header__title">{breadcrumb}</span>
          </>
        ) : (
          <span className="doc-header__title">DRP Design System · GM Core Variables</span>
        )}
      </div>
      <div className="brand-tabs">
        {BRAND_ORDER.map(b => (
          <button
            key={b}
            className={`brand-tabs__tab${brand === b ? ' is-active' : ''}`}
            data-brand={b}
            onClick={() => setBrand(b)}
          >
            {BRAND_LABELS[b]}
          </button>
        ))}
      </div>
    </header>
  )
}
