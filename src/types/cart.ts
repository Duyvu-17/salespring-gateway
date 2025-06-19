export interface Cart_items {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  cart_items: Cart_items[];
  totalItems: number;
  subtotal: number;
  total: number;
  discount?: number;
  shipping?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  itemId: string;
  quantity: number;
}

export interface CartResponse {
  cart: Cart;
  message?: string;
} 