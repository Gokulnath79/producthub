import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'

import type {
  Activity,
  ActivityVariant,
} from '../components/dashboard/RecentActivity/RecentActivity'

import type {
  Product,
  ProductFormData,
  ProductStatus,
} from '../types/product'

interface ProductContextValue {
  products: Product[]
  activities: Activity[]
  addProduct: (formData: ProductFormData) => void
  updateProduct: (
    product: Product,
    formData: ProductFormData,
  ) => void
  deleteProduct: (productId: number) => void
}

interface ProductProviderProps {
  children: ReactNode
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    sku: 'WH-1001',
    category: 'Audio',
    price: 129.99,
    stock: 42,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    sku: 'MK-2048',
    category: 'Accessories',
    price: 89.99,
    stock: 8,
    status: 'Low Stock',
  },
  {
    id: 3,
    name: '27" 4K Monitor',
    sku: 'MN-4027',
    category: 'Displays',
    price: 349.99,
    stock: 24,
    status: 'In Stock',
  },
  {
    id: 4,
    name: 'USB-C Adapter',
    sku: 'UA-3012',
    category: 'Accessories',
    price: 29.99,
    stock: 0,
    status: 'Out of Stock',
  },
  {
    id: 5,
    name: 'Wireless Mouse',
    sku: 'WM-5016',
    category: 'Accessories',
    price: 49.99,
    stock: 31,
    status: 'In Stock',
  },
]

const initialActivities: Activity[] = [
  {
    id: 1,
    title: 'Product added',
    description:
      'Wireless Headphones (SKU: WH-1001) was added to inventory.',
    time: '2 min ago',
    variant: 'added',
  },
  {
    id: 2,
    title: 'Product updated',
    description:
      'Mechanical Keyboard (SKU: MK-2048) inventory was updated.',
    time: '18 min ago',
    variant: 'updated',
  },
  {
    id: 3,
    title: 'Product deleted',
    description:
      'USB-C Adapter (SKU: UA-3012) was removed from inventory.',
    time: '1 hr ago',
    variant: 'deleted',
  },
]

function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) {
    return 'Out of Stock'
  }

  if (stock <= 10) {
    return 'Low Stock'
  }

  return 'In Stock'
}

const ProductContext =
  createContext<ProductContextValue | null>(null)

export function ProductProvider({
  children,
}: ProductProviderProps) {
  const [products, setProducts] =
    useState<Product[]>(initialProducts)

  const [activities, setActivities] =
    useState<Activity[]>(initialActivities)

  const addActivity = (
    title: string,
    description: string,
    variant: ActivityVariant,
  ) => {
    const newActivity: Activity = {
      id: Date.now(),
      title,
      description,
      time: 'Just now',
      variant,
    }

    setActivities((currentActivities) =>
      [newActivity, ...currentActivities].slice(0, 3),
    )
  }

  const addProduct = (formData: ProductFormData) => {
    const newProduct: Product = {
      id: Date.now(),
      ...formData,
      status: getProductStatus(formData.stock),
    }

    setProducts((currentProducts) => [
      newProduct,
      ...currentProducts,
    ])

    addActivity(
      'Product added',
      `${newProduct.name} (SKU: ${newProduct.sku}) was added to inventory.`,
      'added',
    )

    toast.success('Product created', {
      description: `${newProduct.name} • SKU: ${newProduct.sku}`,
      style: {
        background: '#F0FDF4',
        border: '1px solid #BBF7D0',
        color: '#166534',
      },
    })
  }

  const updateProduct = (
    product: Product,
    formData: ProductFormData,
  ) => {
    const changes: string[] = []

    if (product.name !== formData.name) {
      changes.push(
        `name: ${product.name} → ${formData.name}`,
      )
    }

    if (product.sku !== formData.sku) {
      changes.push(
        `SKU: ${product.sku} → ${formData.sku}`,
      )
    }

    if (product.category !== formData.category) {
      changes.push(
        `category: ${product.category} → ${formData.category}`,
      )
    }

    if (product.price !== formData.price) {
      changes.push(
        `price: $${product.price.toFixed(2)} → $${formData.price.toFixed(2)}`,
      )
    }

    if (product.stock !== formData.stock) {
      changes.push(
        `stock: ${product.stock} → ${formData.stock}`,
      )
    }

    const updatedProduct: Product = {
      ...product,
      ...formData,
      status: getProductStatus(formData.stock),
    }

    setProducts((currentProducts) =>
      currentProducts.map((currentProduct) =>
        currentProduct.id === product.id
          ? updatedProduct
          : currentProduct,
      ),
    )

    if (changes.length > 0) {
      addActivity(
        'Product updated',
        `${updatedProduct.name} (SKU: ${updatedProduct.sku}) updated — ${changes.join(', ')}.`,
        'updated',
      )

      toast.info('Product updated', {
        description: `${updatedProduct.name} • SKU: ${updatedProduct.sku}`,
        style: {
          background: '#EFF6FF',
          border: '1px solid #BFDBFE',
          color: '#1D4ED8',
        },
      })
    }
  }

  const deleteProduct = (productId: number) => {
    const deletedProduct = products.find(
      (product) => product.id === productId,
    )

    if (!deletedProduct) {
      return
    }

    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => product.id !== productId,
      ),
    )

    addActivity(
      'Product deleted',
      `${deletedProduct.name} (SKU: ${deletedProduct.sku}) was removed from inventory.`,
      'deleted',
    )

    toast.error('Product deleted', {
      description: `${deletedProduct.name} • SKU: ${deletedProduct.sku}`,
      style: {
        background: '#FEF2F2',
        border: '1px solid #FECACA',
        color: '#B91C1C',
      },
    })
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        activities,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error(
      'useProducts must be used within a ProductProvider',
    )
  }

  return context
}