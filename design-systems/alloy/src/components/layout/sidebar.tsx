import { Link, useLocation } from 'react-router-dom'

type NavEntry = { label: string; to: string }

const NAV_FOUNDATIONS: readonly NavEntry[] = [
  { label: 'Colors',       to: '/foundations/colors' },
  { label: 'Typography',   to: '/foundations/typography' },
  { label: 'Spacing',      to: '/foundations/spacing' },
  { label: 'Iconography',  to: '/foundations/iconography' },
]

const NAV_COMPONENTS: readonly NavEntry[] = [
  { label: 'Accordion',     to: '/components/accordion' },
  { label: 'Avatar',        to: '/components/avatar' },
  { label: 'Breadcrumb',    to: '/components/breadcrumb' },
  { label: 'Button',        to: '/components/button' },
  { label: 'Checkbox',      to: '/components/checkbox' },
  { label: 'Chip',          to: '/components/chip' },
  { label: 'Icon Button',   to: '/components/icon-button' },
  { label: 'Inline Button', to: '/components/inline-button' },
  { label: 'Link',          to: '/components/link' },
  { label: 'Menu',          to: '/components/menu' },
  { label: 'Quick Filter',  to: '/components/quick-filter' },
  { label: 'Radio Button',  to: '/components/radio' },
  { label: 'Search',        to: '/components/search' },
  { label: 'Slider',        to: '/components/slider' },
  { label: 'Stepper',       to: '/components/stepper' },
  { label: 'Switch',        to: '/components/switch' },
  { label: 'Tabs',          to: '/components/tabs' },
  { label: 'Text Input',    to: '/components/text-input' },
  { label: 'Toggle Button', to: '/components/toggle-button' },
  { label: 'Tooltip',       to: '/components/tooltip' },
]

const NAV_DOMAIN_COMPONENTS: readonly NavEntry[] = [
  { label: 'Header',                   to: '/domain-components/header' },
  { label: 'Configurator Sub-header',  to: '/domain-components/configurator-sub-header' },
  { label: 'Footer',                   to: '/domain-components/footer' },
  { label: 'VSR Filter',               to: '/domain-components/vsr-filter' },
  { label: 'VSR Card',                 to: '/domain-components/vsr-card' },
  { label: 'VSR Quick View',           to: '/domain-components/vsr-quick-view' },
  { label: 'VSR Mini Math Box',        to: '/domain-components/vsr-math-box' },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="doc-sidebar">
      <Link to="/" className="doc-sidebar__logo">
        <div className="doc-sidebar__logo-mark">DRP</div>
        <div>
          <div className="doc-sidebar__logo-text">Design System</div>
          <div className="doc-sidebar__logo-sub">GM · Core Variables</div>
        </div>
      </Link>
      <nav className="doc-sidebar__nav">
        <div className="doc-sidebar__section">Overview</div>
        <Link to="/" className={`doc-sidebar__link${pathname === '/' ? ' is-active' : ''}`}>Home</Link>

        <div className="doc-sidebar__section">Foundations</div>
        {NAV_FOUNDATIONS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`doc-sidebar__link${pathname === to ? ' is-active' : ''}`}
          >
            {label}
          </Link>
        ))}

        <div className="doc-sidebar__section">Components</div>
        {NAV_COMPONENTS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`doc-sidebar__link${pathname === to ? ' is-active' : ''}`}
          >
            {label}
          </Link>
        ))}

        <div className="doc-sidebar__section">Domain Components</div>
        {NAV_DOMAIN_COMPONENTS.map(({ label, to }) => (
          <Link
            key={to}
            to={to}
            className={`doc-sidebar__link${pathname === to ? ' is-active' : ''}`}
          >
            {label}
          </Link>
        ))}

        <div className="doc-sidebar__section">Resources</div>
        <a href="https://www.figma.com/design/RsCbyz0LF6FaItYny1FqUU/" className="doc-sidebar__link" target="_blank" rel="noreferrer">Figma File ↗</a>
        <a href="https://aecgm-dev.tekion.xyz/docs/ui-components/" className="doc-sidebar__link" target="_blank" rel="noreferrer">Storybook ↗</a>
      </nav>
    </aside>
  )
}
