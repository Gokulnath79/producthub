import type { ReactNode } from 'react'

import Sidebar, {
  type AppPage,
} from '../../components/layout/Sidebar/Sidebar'

import './DashboardLayout.css'

interface DashboardLayoutProps {
  children: ReactNode
  activePage: AppPage
  onNavigate: (page: AppPage) => void
}

function DashboardLayout({
  children,
  activePage,
  onNavigate,
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={onNavigate}
      />

      <main className="dashboard-layout__main">
        <div className="dashboard-layout__content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout