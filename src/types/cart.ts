export interface ProductPricing {
  base_price: string;
  sale_price: string | null;
}

export interface ProductInventory {
  quantity: number;
}

export interface ProductInCart {
  id: number;
  name: string;
  image_url: string | null;
  description: string;
  status: string;
  ProductPricing: ProductPricing;
  ProductInventory: ProductInventory;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  selected: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  Product: ProductInCart;
}

export interface Cart {
  cart_items: CartItem[];
  total_items: number;
  total_amount: number;
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