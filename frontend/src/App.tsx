import { useState } from 'react'
import { Toaster } from 'sonner'

import type { AppPage } from './components/layout/Sidebar/Sidebar'
import { ProductProvider } from './context/ProductContext'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProductsPage from './pages/Products/ProductsPage'

function App() {
  const [activePage, setActivePage] =
    useState<AppPage>('dashboard')

  const handleNavigate = (page: AppPage) => {
    setActivePage(page)
  }

  return (
    <ProductProvider>
      {activePage === 'dashboard' ? (
        <DashboardPage
          onNavigate={handleNavigate}
        />
      ) : (
        <ProductsPage
          onNavigate={handleNavigate}
        />
      )}

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </ProductProvider>
  )
}

export default App