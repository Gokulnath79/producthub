export type ProductStatus =
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'

export interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: ProductStatus
}

export interface ProductFormData {
  name: string
  sku: string
  category: string
  price: number
  stock: number
}