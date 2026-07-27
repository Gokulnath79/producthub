import {
  LayoutDashboard,
  Package,
} from 'lucide-react'

import './Sidebar.css'

export type AppPage = 'dashboard' | 'products'

interface SidebarProps {
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

function Sidebar({
  activePage,
  onNavigate,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <Package size={20} strokeWidth={2.2} />
        </div>

        <span className="sidebar__brand-name">
          ProductHub
        </span>
      </div>

      <nav
        className="sidebar__navigation"
        aria-label="Main navigation"
      >
        <a
          className={`sidebar__nav-item ${
            activePage === 'dashboard'
              ? 'sidebar__nav-item--active'
              : ''
          }`}
          href="#dashboard"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('dashboard')
          }}
          aria-current={
            activePage === 'dashboard'
              ? 'page'
              : undefined
          }
        >
          <LayoutDashboard
            size={19}
            strokeWidth={2}
          />

          <span>Dashboard</span>
        </a>

        <a
          className={`sidebar__nav-item ${
            activePage === 'products'
              ? 'sidebar__nav-item--active'
              : ''
          }`}
          href="#products"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('products')
          }}
          aria-current={
            activePage === 'products'
              ? 'page'
              : undefined
          }
        >
          <Package size={19} strokeWidth={2} />

          <span>Products</span>
        </a>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__profile">
          <div
            className="sidebar__avatar"
            aria-hidden="true"
          >
            GK
          </div>

          <div className="sidebar__profile-details">
            <span className="sidebar__profile-name">
              Admin User
            </span>

            <span className="sidebar__profile-role">
              Administrator
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar