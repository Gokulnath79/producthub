import { LayoutDashboard, Package } from 'lucide-react'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-icon">
          <Package size={20} strokeWidth={2.2} />
        </div>

        <span className="sidebar__brand-name">ProductHub</span>
      </div>

      <nav className="sidebar__navigation" aria-label="Main navigation">
        <a
          className="sidebar__nav-item sidebar__nav-item--active"
          href="#dashboard"
        >
          <LayoutDashboard size={19} strokeWidth={2} />
          <span>Dashboard</span>
        </a>

        <a className="sidebar__nav-item" href="#products">
          <Package size={19} strokeWidth={2} />
          <span>Products</span>
        </a>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__profile">
          <div className="sidebar__avatar" aria-hidden="true">
            GK
          </div>

          <div className="sidebar__profile-details">
            <span className="sidebar__profile-name">Admin User</span>
            <span className="sidebar__profile-role">Administrator</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar