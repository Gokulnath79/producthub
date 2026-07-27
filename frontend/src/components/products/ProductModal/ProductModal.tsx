import {
  AlertCircle,
  X,
} from 'lucide-react'
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from 'react'

import CancelProductModal from '../CancelProductModal/CancelProductModal'

import type {
  Product,
  ProductFormData,
} from '../../../types/product'

import './ProductModal.css'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (product: ProductFormData) => void
  product?: Product | null
}

interface ProductFormState {
  name: string
  sku: string
  category: string
  price: string
  stock: string
}

const emptyForm: ProductFormState = {
  name: '',
  sku: '',
  category: '',
  price: '',
  stock: '',
}

function getProductFormState(
  product: Product | null,
): ProductFormState {
  if (!product) {
    return emptyForm
  }

  return {
    name: product.name,
    sku: product.sku,
    category: product.category,
    price: String(product.price),
    stock: String(product.stock),
  }
}

function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  product = null,
}: ProductModalProps) {
  const [formValues, setFormValues] =
    useState<ProductFormState>(emptyForm)

  const [
    isCancelConfirmationOpen,
    setIsCancelConfirmationOpen,
  ] = useState(false)

  const [
    showBackdropMessage,
    setShowBackdropMessage,
  ] = useState(false)

  const isEditing = Boolean(product)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setFormValues(getProductFormState(product))
    setIsCancelConfirmationOpen(false)
    setShowBackdropMessage(false)
  }, [isOpen, product])

  if (!isOpen) {
    return null
  }

  const initialValues = getProductFormState(product)

  const hasUnsavedChanges =
    formValues.name !== initialValues.name ||
    formValues.sku !== initialValues.sku ||
    formValues.category !== initialValues.category ||
    formValues.price !== initialValues.price ||
    formValues.stock !== initialValues.stock

  const hasEnteredData =
    formValues.name.trim() !== '' ||
    formValues.sku.trim() !== '' ||
    formValues.category.trim() !== '' ||
    formValues.price !== '' ||
    formValues.stock !== ''

  const shouldConfirmCancellation = isEditing
    ? hasUnsavedChanges
    : hasEnteredData

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setShowBackdropMessage(false)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const productData: ProductFormData = {
      name: formValues.name.trim(),
      sku: formValues.sku.trim(),
      category: formValues.category.trim(),
      price: Number(formValues.price),
      stock: Number(formValues.stock),
    }

    onSubmit(productData)

    setFormValues(emptyForm)
    setShowBackdropMessage(false)
    setIsCancelConfirmationOpen(false)
  }

  const handleRequestClose = () => {
    if (shouldConfirmCancellation) {
      setShowBackdropMessage(false)
      setIsCancelConfirmationOpen(true)
      return
    }

    onClose()
  }

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target !== event.currentTarget) {
      return
    }

    if (shouldConfirmCancellation) {
      setShowBackdropMessage(true)
    }
  }

  const handleConfirmCancellation = () => {
    setIsCancelConfirmationOpen(false)
    setShowBackdropMessage(false)
    setFormValues(emptyForm)

    onClose()
  }

  const handleKeepEditing = () => {
    setIsCancelConfirmationOpen(false)
  }

  const backdropInstruction = isEditing
    ? 'You have unsaved changes. Click “Save Changes” to update this product, or use Cancel if you want to discard your changes.'
    : 'You have entered product information. Click “Add Product” to add this product to the inventory, or use Cancel if you want to discard it.'

  return (
    <>
      <div
        className="product-modal__overlay"
        role="presentation"
        onMouseDown={handleBackdropClick}
      >
        <section
          className="product-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <header className="product-modal__header">
            <div>
              <h2 id="product-modal-title">
                {isEditing
                  ? 'Edit Product'
                  : 'Add Product'}
              </h2>

              <p>
                {isEditing
                  ? 'Update the product information and inventory.'
                  : 'Add a new product to your inventory.'}
              </p>
            </div>

            <button
              className="product-modal__close"
              type="button"
              onClick={handleRequestClose}
              aria-label={
                isEditing
                  ? 'Close edit product form'
                  : 'Close add product form'
              }
            >
              <X
                size={19}
                strokeWidth={2}
              />
            </button>
          </header>

          <form
            className="product-modal__form"
            onSubmit={handleSubmit}
          >
            <div className="product-modal__field">
              <label htmlFor="product-name">
                Product Name
              </label>

              <input
                id="product-name"
                name="name"
                type="text"
                placeholder="e.g. Wireless Headphones"
                value={formValues.name}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="product-modal__field">
              <label htmlFor="product-sku">
                SKU
              </label>

              <input
                id="product-sku"
                name="sku"
                type="text"
                placeholder="e.g. WH-1001"
                value={formValues.sku}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="product-modal__field">
              <label htmlFor="product-category">
                Category
              </label>

              <input
                id="product-category"
                name="category"
                type="text"
                placeholder="e.g. Audio"
                value={formValues.category}
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
            </div>

            <div className="product-modal__row">
              <div className="product-modal__field">
                <label htmlFor="product-price">
                  Price
                </label>

                <div className="product-modal__price-input">
                  <span>$</span>

                  <input
                    id="product-price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={formValues.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="product-modal__field">
                <label htmlFor="product-stock">
                  Stock
                </label>

                <input
                  id="product-stock"
                  name="stock"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={formValues.stock}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="product-modal__status-note">
              Stock status will be calculated automatically
              based on the available quantity.
            </div>

            {showBackdropMessage && (
              <div
                className={`product-modal__action-reminder ${
                  isEditing
                    ? 'product-modal__action-reminder--edit'
                    : 'product-modal__action-reminder--add'
                }`}
                role="status"
              >
                <AlertCircle
                  size={18}
                  strokeWidth={2}
                />

                <div>
                  <strong>
                    {isEditing
                      ? 'Save your changes'
                      : 'Add this product'}
                  </strong>

                  <span>
                    {backdropInstruction}
                  </span>
                </div>
              </div>
            )}

            <footer className="product-modal__footer">
              <button
                className="product-modal__cancel"
                type="button"
                onClick={handleRequestClose}
              >
                Cancel
              </button>

              <button
                className="product-modal__submit"
                type="submit"
              >
                {isEditing
                  ? 'Save Changes'
                  : 'Add Product'}
              </button>
            </footer>
          </form>
        </section>
      </div>

      <CancelProductModal
        isOpen={isCancelConfirmationOpen}
        mode={isEditing ? 'edit' : 'add'}
        productName={
          formValues.name.trim() ||
          product?.name ||
          undefined
        }
        onConfirm={handleConfirmCancellation}
        onKeepEditing={handleKeepEditing}
      />
    </>
  )
}

export default ProductModal