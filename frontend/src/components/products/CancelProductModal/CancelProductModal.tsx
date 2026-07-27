import { AlertTriangle, X } from 'lucide-react'

import './CancelProductModal.css'

interface CancelProductModalProps {
  isOpen: boolean
  mode: 'add' | 'edit'
  productName?: string
  onConfirm: () => void
  onKeepEditing: () => void
}

function CancelProductModal({
  isOpen,
  mode,
  productName,
  onConfirm,
  onKeepEditing,
}: CancelProductModalProps) {
  if (!isOpen) {
    return null
  }

  const isEditing = mode === 'edit'

  const title = isEditing
    ? 'Cancel product changes?'
    : 'Cancel adding product?'

  const description = isEditing
    ? productName
      ? `You have unsaved changes for ${productName}. If you leave now, those changes will be discarded.`
      : 'You have unsaved product changes. If you leave now, those changes will be discarded.'
    : productName
      ? `You have entered information for ${productName}. If you leave now, this product will not be added to inventory.`
      : 'You have entered product information. If you leave now, this product will not be added to inventory.'

  return (
    <div
      className="cancel-product-modal__overlay"
      role="presentation"
    >
      <section
        className="cancel-product-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="cancel-product-modal-title"
        aria-describedby="cancel-product-modal-description"
      >
        <header className="cancel-product-modal__header">
          <div className="cancel-product-modal__icon">
            <AlertTriangle
              size={22}
              strokeWidth={2}
            />
          </div>

          <button
            className="cancel-product-modal__close"
            type="button"
            onClick={onKeepEditing}
            aria-label="Return to product form"
            title="Return to product form"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="cancel-product-modal__content">
          <h2 id="cancel-product-modal-title">
            {title}
          </h2>

          <p id="cancel-product-modal-description">
            {description}
          </p>

          <div className="cancel-product-modal__warning">
            Your entered information will not be saved.
          </div>
        </div>

        <footer className="cancel-product-modal__footer">
          <button
            className="cancel-product-modal__keep"
            type="button"
            onClick={onKeepEditing}
          >
            No, keep editing
          </button>

          <button
            className="cancel-product-modal__confirm"
            type="button"
            onClick={onConfirm}
          >
            {isEditing
              ? 'Yes, discard changes'
              : 'Yes, discard product'}
          </button>
        </footer>
      </section>
    </div>
  )
}

export default CancelProductModal