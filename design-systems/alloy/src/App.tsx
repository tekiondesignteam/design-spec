import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom'
import DocShell from './components/layout/doc-shell'
import HomePage from './pages/HomePage'
import ColorsPage from './pages/ColorsPage'
import TypographyPage from './pages/TypographyPage'
import SpacingPage from './pages/SpacingPage'
import IconographyPage from './pages/IconographyPage'
import Accordion from './components/ui/accordion'
import Breadcrumb from './components/ui/breadcrumb'
import Button from './components/ui/button'
import Checkbox from './components/ui/checkbox'
import Chip from './components/ui/chip'
import IconButton from './components/ui/icon-button'
import InlineButton from './components/ui/inline-button'
import LinkComponent from './components/ui/link'
import Menu from './components/ui/menu'
import Radio from './components/ui/radio'
import Search from './components/ui/search'
import Slider from './components/ui/slider'
import Stepper from './components/ui/stepper'
import Switch from './components/ui/switch'
import Tabs from './components/ui/tabs'
import TextInput from './components/ui/text-input'
import ToggleButton from './components/ui/toggle-button'
import Avatar from './components/ui/avatar'
import Tooltip from './components/ui/tooltip'
import QuickFilter from './components/ui/quick-filter'
import Header from './components/ui/header'
import ConfiguratorSubHeader from './components/ui/configurator-sub-header'
import Footer from './components/ui/footer'
import VsrFilter from './components/ui/vsr-filter'
import VsrCard from './components/ui/vsr-card'
import VsrQuickView from './components/ui/vsr-quick-view'
import VsrMathBox from './components/ui/vsr-math-box'
import type { RouteHandle } from './router-types'

const routes: RouteObject[] = [
  {
    element: <DocShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'foundations/colors',       element: <ColorsPage />,       handle: { breadcrumb: 'Colors', section: 'Foundations' } satisfies RouteHandle },
      { path: 'foundations/typography',   element: <TypographyPage />,   handle: { breadcrumb: 'Typography', section: 'Foundations' } satisfies RouteHandle },
      { path: 'foundations/spacing',      element: <SpacingPage />,      handle: { breadcrumb: 'Spacing', section: 'Foundations' } satisfies RouteHandle },
      { path: 'foundations/iconography',  element: <IconographyPage />,  handle: { breadcrumb: 'Iconography', section: 'Foundations' } satisfies RouteHandle },
      { path: 'components/accordion',    element: <Accordion />,      handle: { breadcrumb: 'Accordion' } satisfies RouteHandle },
      { path: 'components/breadcrumb',   element: <Breadcrumb />,     handle: { breadcrumb: 'Breadcrumb' } satisfies RouteHandle },
      { path: 'components/button',       element: <Button />,         handle: { breadcrumb: 'Button' } satisfies RouteHandle },
      { path: 'components/checkbox',     element: <Checkbox />,       handle: { breadcrumb: 'Checkbox' } satisfies RouteHandle },
      { path: 'components/chip',         element: <Chip />,           handle: { breadcrumb: 'Chip' } satisfies RouteHandle },
      { path: 'components/icon-button',  element: <IconButton />,     handle: { breadcrumb: 'Icon Button' } satisfies RouteHandle },
      { path: 'components/inline-button',element: <InlineButton />,   handle: { breadcrumb: 'Inline Button' } satisfies RouteHandle },
      { path: 'components/link',         element: <LinkComponent />,  handle: { breadcrumb: 'Link' } satisfies RouteHandle },
      { path: 'components/menu',         element: <Menu />,           handle: { breadcrumb: 'Menu' } satisfies RouteHandle },
      { path: 'components/radio',        element: <Radio />,          handle: { breadcrumb: 'Radio Button' } satisfies RouteHandle },
      { path: 'components/search',       element: <Search />,         handle: { breadcrumb: 'Search' } satisfies RouteHandle },
      { path: 'components/slider',       element: <Slider />,         handle: { breadcrumb: 'Slider' } satisfies RouteHandle },
      { path: 'components/stepper',      element: <Stepper />,        handle: { breadcrumb: 'Stepper' } satisfies RouteHandle },
      { path: 'components/switch',       element: <Switch />,         handle: { breadcrumb: 'Switch' } satisfies RouteHandle },
      { path: 'components/tabs',         element: <Tabs />,           handle: { breadcrumb: 'Tabs' } satisfies RouteHandle },
      { path: 'components/text-input',   element: <TextInput />,      handle: { breadcrumb: 'Text Input' } satisfies RouteHandle },
      { path: 'components/toggle-button',element: <ToggleButton />,   handle: { breadcrumb: 'Toggle Button Group' } satisfies RouteHandle },
      { path: 'components/avatar',       element: <Avatar />,         handle: { breadcrumb: 'Avatar + Notification' } satisfies RouteHandle },
      { path: 'components/tooltip',      element: <Tooltip />,        handle: { breadcrumb: 'Tooltip' } satisfies RouteHandle },
      { path: 'components/quick-filter', element: <QuickFilter />,    handle: { breadcrumb: 'Quick Filter' } satisfies RouteHandle },
      { path: 'domain-components/header', element: <Header />,        handle: { breadcrumb: 'Header', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/configurator-sub-header', element: <ConfiguratorSubHeader />, handle: { breadcrumb: 'Configurator Sub-header', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/footer',                  element: <Footer />,                handle: { breadcrumb: 'Footer', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/vsr-filter',              element: <VsrFilter />,             handle: { breadcrumb: 'VSR Filter', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/vsr-card',                element: <VsrCard />,               handle: { breadcrumb: 'VSR Card', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/vsr-quick-view',          element: <VsrQuickView />,          handle: { breadcrumb: 'VSR Quick View', section: 'Domain Components' } satisfies RouteHandle },
      { path: 'domain-components/vsr-math-box',            element: <VsrMathBox />,            handle: { breadcrumb: 'VSR Mini Math Box', section: 'Domain Components' } satisfies RouteHandle },
    ],
  },
]

const router = createBrowserRouter(routes)

export default function App() {
  return <RouterProvider router={router} />
}
