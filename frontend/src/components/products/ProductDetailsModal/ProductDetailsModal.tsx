import {
  Barcode,
  Boxes,
  Package,
  Pencil,
  RefreshCw,
  Tag,
  X,
} from 'lucide-react'

import type {
  Product,
  ProductStatus,
} from '../../../types/product'

import { getProductIcon } from '../../../utils/getProductIcon'

import './ProductDetailsModal.css'

interface ProductDetailsModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
  onEdit: (product: Product) => void
  onAdjustStock: (product: Product) => void
}

function getStatusClass(status: ProductStatus) {
  switch (status) {
    case 'In Stock':
      return 'product-details-modal__status--success'

    case 'Low Stock':
      return 'product-details-modal__status--warning'

    case 'Out of Stock':
      return 'product-details-modal__status--danger'
  }
}

function ProductDetailsModal({
  isOpen,
  product,
  onClose,
  onEdit,
  onAdjustStock,
}: ProductDetailsModalProps) {
  if (!isOpen || !product) {
    return null
  }

  const ProductIcon = getProductIcon(
    product.name,
    product.category,
  )

  const handleEdit = () => {
    onEdit(product)
  }

  const handleAdjustStock = () => {
    onAdjustStock(product)
  }

  return (
    <div
      className="product-details-modal__overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="product-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-details-modal-title"
      >
        <header className="product-details-modal__header">
          <div>
            <h2 id="product-details-modal-title">
              Product Details
            </h2>

            <p>
              View complete product and inventory information.
            </p>
          </div>

          <button
            className="product-details-modal__close"
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            title="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </header>

        <div className="product-details-modal__content">
          <section className="product-details-modal__hero">
            <div
              className="product-details-modal__product-icon"
              aria-hidden="true"
            >
              <ProductIcon
                size={52}
                strokeWidth={1.7}
              />
            </div>

            <div className="product-details-modal__identity">
              <span className="product-details-modal__eyebrow">
                Product
              </span>

              <h3>{product.name}</h3>

              <span className="product-details-modal__sku-badge">
                {product.sku}
              </span>

              <p>
                Inventory information and current availability
                for this product.
              </p>
            </div>
          </section>

          <div className="product-details-modal__divider" />

          <section
            className="product-details-modal__grid"
            aria-label="Product information"
          >
            <article className="product-details-modal__info-card">
              <div className="product-details-modal__info-icon">
                <Tag size={19} strokeWidth={2} />
              </div>

              <div>
                <span className="product-details-modal__label">
                  Category
                </span>

                <strong>{product.category}</strong>
              </div>
            </article>

            <article className="product-details-modal__info-card">
              <div
                className={`product-details-modal__info-icon product-details-modal__info-icon--${product.status
                  .toLowerCase()
                  .replaceAll(' ', '-')}`}
              >
                <Package size={19} strokeWidth={2} />
              </div>

              <div>
                <span className="product-details-modal__label">
                  Status
                </span>

                <span
                  className={`product-details-modal__status ${getStatusClass(
                    product.status,
                  )}`}
                >
                  <span
                    className="product-details-modal__status-dot"
                    aria-hidden="true"
                  />

                  {product.status}
                </span>
              </div>
            </article>

            <article className="product-details-modal__info-card">
              <div className="product-details-modal__info-icon">
                <span className="product-details-modal__currency-icon">
                  $
                </span>
              </div>

              <div>
                <span className="product-details-modal__label">
                  Price
                </span>

                <strong>
                  ${product.price.toFixed(2)}
                </strong>
              </div>
            </article>

            <article className="product-details-modal__info-card">
              <div className="product-details-modal__info-icon">
                <Boxes size={19} strokeWidth={2} />
              </div>

              <div>
                <span className="product-details-modal__label">
                  Available Stock
                </span>

                <strong>
                  {product.stock}{' '}
                  {product.stock === 1
                    ? 'unit'
                    : 'units'}
                </strong>
              </div>
            </article>

            <article className="product-details-modal__info-card product-details-modal__info-card--wide">
              <div className="product-details-modal__info-icon">
                <Barcode size={20} strokeWidth={2} />
              </div>

              <div>
                <span className="product-details-modal__label">
                  SKU
                </span>

                <strong>{product.sku}</strong>
              </div>
            </article>
          </section>
        </div>

        <footer className="product-details-modal__footer">
          <button
            className="product-details-modal__secondary-button"
            type="button"
            onClick={onClose}
          >
            Close
          </button>

          <div className="product-details-modal__actions">
            <button
              className="product-details-modal__stock-button"
              type="button"
              onClick={handleAdjustStock}
            >
              <RefreshCw size={16} strokeWidth={2} />

              <span>Adjust Stock</span>
            </button>

            <button
              className="product-details-modal__edit-button"
              type="button"
              onClick={handleEdit}
            >
              <Pencil size={16} strokeWidth={2} />

              <span>Edit Product</span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  )
}

export default ProductDetailsModal