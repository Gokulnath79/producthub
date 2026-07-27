import { useState } from 'react'
import {
  AlertTriangle,
  CircleCheck,
  CircleX,
  Package,
  Plus,
  Search,
} from 'lucide-react'

import RecentActivity from '../../components/dashboard/RecentActivity/RecentActivity'
import StatCard from '../../components/dashboard/StatCard/StatCard'
import type { AppPage } from '../../components/layout/Sidebar/Sidebar'
import AdjustStockModal from '../../components/products/AdjustStockModal/AdjustStockModal'
import type { StockAdjustmentType } from '../../components/products/AdjustStockModal/AdjustStockModal'
import DeleteProductModal from '../../components/products/DeleteProductModal/DeleteProductModal'
import ProductDetailsModal from '../../components/products/ProductDetailsModal/ProductDetailsModal'
import ProductModal from '../../components/products/ProductModal/ProductModal'
import ProductTable from '../../components/products/ProductTable/ProductTable'
import { useProducts } from '../../context/ProductContext'
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout'
import type {
  Product,
  ProductFormData,
} from '../../types/product'

import './DashboardPage.css'

interface DashboardPageProps {
  onNavigate: (page: AppPage) => void
}

function DashboardPage({
  onNavigate,
}: DashboardPageProps) {
  const {
    products,
    activities,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()

  const [isProductModalOpen, setIsProductModalOpen] =
    useState(false)

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null)

  const [productToView, setProductToView] =
    useState<Product | null>(null)

  const [productToAdjust, setProductToAdjust] =
    useState<Product | null>(null)

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null)

  const [searchQuery, setSearchQuery] = useState('')

  const totalProducts = products.length

  const inStockProducts = products.filter(
    (product) => product.status === 'In Stock',
  ).length

  const lowStockProducts = products.filter(
    (product) => product.status === 'Low Stock',
  ).length

  const outOfStockProducts = products.filter(
    (product) => product.status === 'Out of Stock',
  ).length

  const normalizedSearchQuery =
    searchQuery.trim().toLowerCase()

  const filteredProducts = products.filter((product) => {
    if (!normalizedSearchQuery) {
      return true
    }

    const searchableValues = [
      product.name,
      product.sku,
      product.category,
    ]

    return searchableValues.some((value) =>
      value
        .toLowerCase()
        .includes(normalizedSearchQuery),
    )
  })

  const handleOpenAddProduct = () => {
    setSelectedProduct(null)
    setIsProductModalOpen(true)
  }

  const handleViewProduct = (product: Product) => {
    setProductToView(product)
  }

  const handleCloseProductDetails = () => {
    setProductToView(null)
  }

  const handleEditProduct = (product: Product) => {
    setProductToView(null)
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const handleAdjustStock = (product: Product) => {
    setProductToView(null)
    setProductToAdjust(product)
  }

  const handleCloseAdjustStock = () => {
    setProductToAdjust(null)
  }

  const handleConfirmStockAdjustment = (
    product: Product,
    newStock: number,
    _adjustmentType: StockAdjustmentType,
    _quantity: number,
  ) => {
    const updatedFormData: ProductFormData = {
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      stock: newStock,
    }

    updateProduct(product, updatedFormData)
    setProductToAdjust(null)
  }

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleSubmitProduct = (
    formData: ProductFormData,
  ) => {
    if (selectedProduct) {
      updateProduct(selectedProduct, formData)
    } else {
      addProduct(formData)
    }

    handleCloseProductModal()
  }

  const handleDeleteRequest = (productId: number) => {
    const product = products.find(
      (currentProduct) =>
        currentProduct.id === productId,
    )

    if (!product) {
      return
    }

    setProductToDelete(product)
  }

  const handleCloseDeleteModal = () => {
    setProductToDelete(null)
  }

  const handleConfirmDelete = (productId: number) => {
    deleteProduct(productId)
    setProductToDelete(null)
  }

  return (
    <DashboardLayout
      activePage="dashboard"
      onNavigate={onNavigate}
    >
      <section className="dashboard-page">
        <header className="dashboard-page__header">
          <div className="dashboard-page__heading">
            <h1>Dashboard</h1>

            <p>
              Manage and monitor your product inventory.
            </p>
          </div>
        </header>

        <section
          className="dashboard-page__stats"
          aria-label="Inventory overview"
        >
          <StatCard
            title="Total Products"
            value={totalProducts}
            description="All products in the system"
            icon={Package}
            variant="primary"
          />

          <StatCard
            title="In Stock"
            value={inStockProducts}
            description="Products currently available"
            icon={CircleCheck}
            variant="success"
          />

          <StatCard
            title="Low Stock"
            value={lowStockProducts}
            description="Products running low"
            icon={AlertTriangle}
            variant="warning"
          />

          <StatCard
            title="Out of Stock"
            value={outOfStockProducts}
            description="Currently unavailable"
            icon={CircleX}
            variant="danger"
          />
        </section>

        <div className="dashboard-page__activity">
          <RecentActivity activities={activities} />
        </div>

        <div className="dashboard-page__products">
          <div className="dashboard-page__product-actions">
            <label className="dashboard-search">
              <Search size={18} strokeWidth={2} />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search products..."
                aria-label="Search products"
              />
            </label>

            <button
              className="dashboard-add-button"
              type="button"
              onClick={handleOpenAddProduct}
            >
              <Plus size={18} strokeWidth={2.2} />
              <span>Add Product</span>
            </button>
          </div>

          <ProductTable
            products={filteredProducts}
            onView={handleViewProduct}
            onEdit={handleEditProduct}
            onDelete={handleDeleteRequest}
          />
        </div>
      </section>

      <ProductDetailsModal
        isOpen={productToView !== null}
        product={productToView}
        onClose={handleCloseProductDetails}
        onEdit={handleEditProduct}
        onAdjustStock={handleAdjustStock}
      />

      <AdjustStockModal
        isOpen={productToAdjust !== null}
        product={productToAdjust}
        onClose={handleCloseAdjustStock}
        onConfirm={handleConfirmStockAdjustment}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        product={selectedProduct}
        onClose={handleCloseProductModal}
        onSubmit={handleSubmitProduct}
      />

      <DeleteProductModal
        isOpen={productToDelete !== null}
        product={productToDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  )
}

export default DashboardPage