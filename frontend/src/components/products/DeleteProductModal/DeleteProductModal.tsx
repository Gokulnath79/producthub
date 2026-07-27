import { Trash2, X } from 'lucide-react'

import type { Product } from '../../../types/product'
import './DeleteProductModal.css'

interface DeleteProductModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
  onConfirm: (productId: number) => void
}

function DeleteProductModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: DeleteProductModalProps) {
  if (!isOpen || !product) {
    return null
  }

  const handleDelete = () => {
    onConfirm(product.id)
  }

  return (
    <div
      className="delete-product-modal__overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <section
        className="delete-product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-product-modal-title"
      >
        <button
          className="delete-product-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close delete confirmation"
        >
          <X size={19} strokeWidth={2} />
        </button>

        <div className="delete-product-modal__icon">
          <Trash2 size={27} strokeWidth={2} />
        </div>

        <div className="delete-product-modal__heading">
          <h2 id="delete-product-modal-title">
            Delete Product?
          </h2>

          <p>
            Are you sure you want to delete this product?
            <br />
            This action cannot be undone.
          </p>
        </div>

        <div className="delete-product-modal__product">
          <div className="delete-product-modal__product-icon">
            {product.name.charAt(0).toUpperCase()}
          </div>

          <div className="delete-product-modal__details">
            <div className="delete-product-modal__detail-row">
              <span className="delete-product-modal__label">
                Product Name
              </span>

              <strong>{product.name}</strong>
            </div>

            <div className="delete-product-modal__detail-row">
              <span className="delete-product-modal__label">
                SKU Code
              </span>

              <strong>{product.sku}</strong>
            </div>

            <div className="delete-product-modal__detail-row">
              <span className="delete-product-modal__label">
                Quantity (Stock)
              </span>

              <span className="delete-product-modal__stock">
                {product.stock}
              </span>
            </div>
          </div>
        </div>

        <footer className="delete-product-modal__footer">
          <button
            className="delete-product-modal__cancel"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-product-modal__delete"
            type="button"
            onClick={handleDelete}
          >
            <Trash2 size={17} strokeWidth={2} />
            <span>Delete Product</span>
          </button>
        </footer>
      </section>
    </div>
  )
}

export default DeleteProductModal