import { useMemo, useState } from 'react'
import {
  Filter,
  Plus,
  Search,
} from 'lucide-react'

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
  ProductStatus,
} from '../../types/product'

import './ProductsPage.css'

type StatusFilter = 'All' | ProductStatus

interface ProductsPageProps {
  onNavigate: (page: AppPage) => void
}

function ProductsPage({
  onNavigate,
}: ProductsPageProps) {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()

  const [searchQuery, setSearchQuery] = useState('')

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('All')

  const [categoryFilter, setCategoryFilter] =
    useState('All')

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

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.category.trim())
          .filter(Boolean),
      ),
    ).sort((firstCategory, secondCategory) =>
      firstCategory.localeCompare(secondCategory),
    )
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearchQuery =
      searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        [
          product.name,
          product.sku,
          product.category,
        ].some((value) =>
          value
            .toLowerCase()
            .includes(normalizedSearchQuery),
        )

      const matchesStatus =
        statusFilter === 'All' ||
        product.status === statusFilter

      const matchesCategory =
        categoryFilter === 'All' ||
        product.category === categoryFilter

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      )
    })
  }, [
    products,
    searchQuery,
    statusFilter,
    categoryFilter,
  ])

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

  const handleClearFilters = () => {
    setSearchQuery('')
    setStatusFilter('All')
    setCategoryFilter('All')
  }

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    statusFilter !== 'All' ||
    categoryFilter !== 'All'

  return (
    <DashboardLayout
      activePage="products"
      onNavigate={onNavigate}
    >
      <section className="products-page">
        <header className="products-page__header">
          <div>
            <h1>Products</h1>

            <p>
              Manage your complete product catalog and
              inventory.
            </p>
          </div>
        </header>

        <section
          className="products-page__toolbar"
          aria-label="Product controls"
        >
          <div className="products-page__filters">
            <label className="products-page__search">
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

            <label className="products-page__select">
              <Filter size={16} strokeWidth={2} />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as StatusFilter,
                  )
                }
                aria-label="Filter products by status"
              >
                <option value="All">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">
                  Out of Stock
                </option>
              </select>
            </label>

            <label className="products-page__select">
              <Filter size={16} strokeWidth={2} />

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
                aria-label="Filter products by category"
              >
                <option value="All">
                  All Categories
                </option>

                {categories.map((category) => (
                  <option
                    value={category}
                    key={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </label>

            {hasActiveFilters && (
              <button
                className="products-page__clear-button"
                type="button"
                onClick={handleClearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          <button
            className="products-page__add-button"
            type="button"
            onClick={handleOpenAddProduct}
          >
            <Plus size={18} strokeWidth={2.2} />
            <span>Add Product</span>
          </button>
        </section>

        <div className="products-page__results">
          <div className="products-page__result-summary">
            <span>
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'product'
                : 'products'}
            </span>

            {hasActiveFilters && (
              <span>
                matching your current filters
              </span>
            )}
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

export default ProductsPage