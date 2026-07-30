import { Outlet } from 'react-router-dom'
import { BrandProvider } from '../../context/BrandContext'
import Sidebar from './sidebar'
import Header from './header'

export default function DocShell() {
  return (
    <BrandProvider>
      <div className="doc-shell">
        <Sidebar />
        <Header />
        <main className="doc-main">
          <Outlet />
        </main>
      </div>
    </BrandProvider>
  )
}
