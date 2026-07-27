import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react'

import type {
  Product,
  ProductStatus,
} from '../../../types/product'

import { getProductIcon } from '../../../utils/getProductIcon'

import './ProductTable.css'

interface ProductTableProps {
  products: Product[]
  onView: (product: Product) => void
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
}

const PRODUCTS_PER_PAGE = 5

function getStatusClass(status: ProductStatus) {
  switch (status) {
    case 'In Stock':
      return 'product-table__status--success'

    case 'Low Stock':
      return 'product-table__status--warning'

    case 'Out of Stock':
      return 'product-table__status--danger'
  }
}

function ProductTable({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE),
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE

  const paginatedProducts = products.slice(
    startIndex,
    endIndex,
  )

  const firstProductNumber =
    products.length === 0 ? 0 : startIndex + 1

  const lastProductNumber = Math.min(
    endIndex,
    products.length,
  )

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages),
    )
  }

  return (
    <section className="product-table">
      <div className="product-table__header">
        <div>
          <h2>Products</h2>

          <p>
            Manage your product inventory and stock levels.
          </p>
        </div>

        <span className="product-table__count">
          {products.length}{' '}
          {products.length === 1
            ? 'product'
            : 'products'}
        </span>
      </div>

      <div className="product-table__scroll">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>

              <th className="product-table__actions-heading">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => {
              const ProductIcon = getProductIcon(
                product.name,
                product.category,
              )

              return (
                <tr key={product.id}>
                  <td>
                    <div className="product-table__product">
                      <div
                        className="product-table__product-icon"
                        title={product.name}
                        aria-hidden="true"
                      >
                        <ProductIcon
                          size={18}
                          strokeWidth={1.9}
                        />
                      </div>

                      <div className="product-table__product-details">
                        <span className="product-table__product-name">
                          {product.name}
                        </span>

                        <span className="product-table__sku">
                          {product.sku}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="product-table__category">
                      {product.category}
                    </span>
                  </td>

                  <td className="product-table__price">
                    ${product.price.toFixed(2)}
                  </td>

                  <td>
                    <span className="product-table__stock">
                      {product.stock}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`product-table__status ${getStatusClass(
                        product.status,
                      )}`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td>
                    <div className="product-table__actions">
                      <button
                        className="product-table__action-button product-table__action-button--view"
                        type="button"
                        onClick={() => onView(product)}
                        aria-label={`View ${product.name}`}
                        title="View product"
                      >
                        <Eye
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                      <button
                        className="product-table__action-button"
                        type="button"
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        title="Edit product"
                      >
                        <Pencil
                          size={16}
                          strokeWidth={2}
                        />
                      </button>

                      <button
                        className="product-table__action-button product-table__action-button--delete"
                        type="button"
                        onClick={() =>
                          onDelete(product.id)
                        }
                        aria-label={`Delete ${product.name}`}
                        title="Delete product"
                      >
                        <Trash2
                          size={16}
                          strokeWidth={2}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}

            {paginatedProducts.length === 0 && (
              <tr>
                <td
                  className="product-table__empty"
                  colSpan={6}
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="product-table__pagination">
        <p className="product-table__pagination-info">
          Showing{' '}
          <strong>
            {firstProductNumber}–{lastProductNumber}
          </strong>{' '}
          of <strong>{products.length}</strong> products
        </p>

        <div
          className="product-table__pagination-controls"
          aria-label="Product table pagination"
        >
          <button
            className="product-table__pagination-button"
            type="button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft
              size={17}
              strokeWidth={2}
            />
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ).map((page) => (
            <button
              className={`product-table__pagination-button ${
                currentPage === page
                  ? 'product-table__pagination-button--active'
                  : ''
              }`}
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={
                currentPage === page
                  ? 'page'
                  : undefined
              }
            >
              {page}
            </button>
          ))}

          <button
            className="product-table__pagination-button"
            type="button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight
              size={17}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductTable