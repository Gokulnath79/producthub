import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Boxes,
  X,
} from 'lucide-react'
import {
  useEffect,
  useState,
  type FormEvent,
} from 'react'

import type {
  Product,
  ProductStatus,
} from '../../../types/product'

import './AdjustStockModal.css'

export type StockAdjustmentType = 'add' | 'remove'

interface AdjustStockModalProps {
  isOpen: boolean
  product: Product | null
  onClose: () => void
  onConfirm: (
    product: Product,
    newStock: number,
    adjustmentType: StockAdjustmentType,
    quantity: number,
  ) => void
}

function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) {
    return 'Out of Stock'
  }

  if (stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
}

function getStatusClass(status: ProductStatus) {
  switch (status) {
    case 'In Stock':
      return 'adjust-stock-modal__status--success'

    case 'Low Stock':
      return 'adjust-stock-modal__status--warning'

    case 'Out of Stock':
      return 'adjust-stock-modal__status--danger'
  }
}

function AdjustStockModal({
  isOpen,
  product,
  onClose,
  onConfirm,
}: AdjustStockModalProps) {
  const [adjustmentType, setAdjustmentType] =
    useState<StockAdjustmentType>('add')

  const [quantity, setQuantity] = useState('')

  const [showDiscardConfirmation, setShowDiscardConfirmation] =
    useState(false)

  const [showUpdateReminder, setShowUpdateReminder] =
    useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setAdjustmentType('add')
    setQuantity('')
    setShowDiscardConfirmation(false)
    setShowUpdateReminder(false)
  }, [isOpen, product])

  if (!isOpen || !product) {
    return null
  }

  const parsedQuantity = Number(quantity)

  const isQuantityValid =
    quantity !== '' &&
    Number.isInteger(parsedQuantity) &&
    parsedQuantity > 0

  const hasChanges =
    quantity !== '' || adjustmentType !== 'add'

  const calculatedStock = isQuantityValid
    ? adjustmentType === 'add'
      ? product.stock + parsedQuantity
      : product.stock - parsedQuantity
    : product.stock

  const wouldGoBelowZero = calculatedStock < 0

  const newStock = Math.max(0, calculatedStock)

  const newStatus = getProductStatus(newStock)

  const canSubmit =
    isQuantityValid && !wouldGoBelowZero

  const requestClose = () => {
    if (hasChanges) {
      setShowDiscardConfirmation(true)
      return
    }

    onClose()
  }

  const handleOverlayMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (hasChanges) {
      setShowUpdateReminder(true)
    }
  }

const handleAdjustmentTypeChange = (
  type: StockAdjustmentType,
) => {
  setAdjustmentType(type)
  setShowUpdateReminder(false)
}

const handleQuantityChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  setQuantity(event.target.value)
  setShowUpdateReminder(false)
}

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    onConfirm(
      product,
      newStock,
      adjustmentType,
      parsedQuantity,
    )
  }

  const handleKeepEditing = () => {
    setShowDiscardConfirmation(false)
  }

  const handleDiscardChanges = () => {
    setShowDiscardConfirmation(false)
    setShowUpdateReminder(false)
    onClose()
  }

  return (
    <>
      <div
        className="adjust-stock-modal__overlay"
        role="presentation"
        onMouseDown={handleOverlayMouseDown}
      >
        <section
          className="adjust-stock-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="adjust-stock-modal-title"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <header className="adjust-stock-modal__header">
            <div>
              <h2 id="adjust-stock-modal-title">
                Adjust Stock
              </h2>

              <p>
                Update inventory quantity without editing the
                complete product.
              </p>
            </div>

            <button
              className="adjust-stock-modal__close"
              type="button"
              onClick={requestClose}
              aria-label="Close stock adjustment"
              title="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </header>

          <form
            className="adjust-stock-modal__form"
            onSubmit={handleSubmit}
          >
            <div className="adjust-stock-modal__product">
              <div className="adjust-stock-modal__product-icon">
                <Boxes size={23} strokeWidth={1.9} />
              </div>

              <div className="adjust-stock-modal__product-details">
                <span className="adjust-stock-modal__product-label">
                  Product
                </span>

                <strong>{product.name}</strong>

                <span>
                  SKU: {product.sku}
                </span>
              </div>

              <div className="adjust-stock-modal__current-stock">
                <span>Current Stock</span>

                <strong>
                  {product.stock}{' '}
                  {product.stock === 1 ? 'unit' : 'units'}
                </strong>
              </div>
            </div>

            <div className="adjust-stock-modal__section">
              <span className="adjust-stock-modal__field-label">
                Adjustment Type
              </span>

              <div
                className="adjust-stock-modal__type-selector"
                role="group"
                aria-label="Stock adjustment type"
              >
                <button
                  className={`adjust-stock-modal__type-button adjust-stock-modal__type-button--add ${
                    adjustmentType === 'add'
                      ? 'adjust-stock-modal__type-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={() =>
                    handleAdjustmentTypeChange('add')
                  }
                  aria-pressed={adjustmentType === 'add'}
                >
                  <ArrowUp
                    size={17}
                    strokeWidth={2.2}
                  />

                  <span>Add Stock</span>
                </button>

                <button
                  className={`adjust-stock-modal__type-button adjust-stock-modal__type-button--remove ${
                    adjustmentType === 'remove'
                      ? 'adjust-stock-modal__type-button--active'
                      : ''
                  }`}
                  type="button"
                  onClick={() =>
                    handleAdjustmentTypeChange('remove')
                  }
                  aria-pressed={
                    adjustmentType === 'remove'
                  }
                >
                  <ArrowDown
                    size={17}
                    strokeWidth={2.2}
                  />

                  <span>Remove Stock</span>
                </button>
              </div>
            </div>

            <div className="adjust-stock-modal__section">
              <label
                className="adjust-stock-modal__field-label"
                htmlFor="stock-adjustment-quantity"
              >
                Quantity
              </label>

              <input
                id="stock-adjustment-quantity"
                className="adjust-stock-modal__quantity-input"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={handleQuantityChange}
                placeholder="Enter quantity"
                autoComplete="off"
                required
              />

              {wouldGoBelowZero && (
                <div
                  className="adjust-stock-modal__error"
                  role="alert"
                >
                  <AlertTriangle
                    size={16}
                    strokeWidth={2}
                  />

                  <span>
                    You cannot remove {parsedQuantity} units.
                    Only {product.stock} units are currently
                    available.
                  </span>
                </div>
              )}
            </div>

            <div className="adjust-stock-modal__preview">
              <div className="adjust-stock-modal__preview-heading">
                <span>Stock Preview</span>

                <span
                  className={`adjust-stock-modal__status ${getStatusClass(
                    newStatus,
                  )}`}
                >
                  <span
                    className="adjust-stock-modal__status-dot"
                    aria-hidden="true"
                  />

                  {newStatus}
                </span>
              </div>

              <div className="adjust-stock-modal__calculation">
                <div>
                  <span>Current</span>
                  <strong>{product.stock}</strong>
                </div>

                <span className="adjust-stock-modal__operator">
                  {adjustmentType === 'add' ? '+' : '−'}
                </span>

                <div>
                  <span>
                    {adjustmentType === 'add'
                      ? 'Adding'
                      : 'Removing'}
                  </span>

                  <strong>
                    {isQuantityValid
                      ? parsedQuantity
                      : 0}
                  </strong>
                </div>

                <span className="adjust-stock-modal__operator">
                  =
                </span>

                <div className="adjust-stock-modal__result">
                  <span>New Stock</span>
                  <strong>{newStock}</strong>
                </div>
              </div>
            </div>

            {showUpdateReminder && hasChanges && (
              <div
                className="adjust-stock-modal__reminder"
                role="status"
              >
                <div className="adjust-stock-modal__reminder-icon">
                  <AlertCircle
                    size={18}
                    strokeWidth={2}
                  />
                </div>

                <div className="adjust-stock-modal__reminder-content">
                  <strong>Update your stock</strong>

                  <p>
                    You have entered a stock adjustment. Click
                    “Update Stock” to update the inventory, or
                    use Cancel if you want to discard your
                    changes.
                  </p>
                </div>
              </div>
            )}

            <footer className="adjust-stock-modal__footer">
              <button
                className="adjust-stock-modal__cancel"
                type="button"
                onClick={requestClose}
              >
                Cancel
              </button>

              <button
                className={`adjust-stock-modal__submit adjust-stock-modal__submit--${adjustmentType}`}
                type="submit"
                disabled={!canSubmit}
              >
                {adjustmentType === 'add' ? (
                  <ArrowUp
                    size={16}
                    strokeWidth={2.2}
                  />
                ) : (
                  <ArrowDown
                    size={16}
                    strokeWidth={2.2}
                  />
                )}

                <span>Update Stock</span>
              </button>
            </footer>
          </form>
        </section>
      </div>

      {showDiscardConfirmation && (
        <div
          className="adjust-stock-discard__overlay"
          role="presentation"
        >
          <section
            className="adjust-stock-discard"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="adjust-stock-discard-title"
          >
            <header className="adjust-stock-discard__header">
              <div className="adjust-stock-discard__warning-icon">
                <AlertTriangle
                  size={23}
                  strokeWidth={2}
                />
              </div>

              <button
                className="adjust-stock-discard__close"
                type="button"
                onClick={handleKeepEditing}
                aria-label="Keep editing stock adjustment"
                title="Keep editing"
              >
                <X size={19} strokeWidth={2} />
              </button>
            </header>

            <div className="adjust-stock-discard__content">
              <h3 id="adjust-stock-discard-title">
                Discard stock changes?
              </h3>

              <p>
                You have entered a stock adjustment for{' '}
                <strong>{product.name}</strong>. If you leave
                now, your inventory changes will not be
                applied.
              </p>

              <div className="adjust-stock-discard__warning">
                Your stock adjustment will not be saved.
              </div>
            </div>

            <footer className="adjust-stock-discard__footer">
              <button
                className="adjust-stock-discard__keep"
                type="button"
                onClick={handleKeepEditing}
              >
                No, keep editing
              </button>

              <button
                className="adjust-stock-discard__discard"
                type="button"
                onClick={handleDiscardChanges}
              >
                Yes, discard changes
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}

export default AdjustStockModal