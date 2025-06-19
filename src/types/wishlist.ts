import { Product } from "./product";

export interface WishlistItem {
  id: number;
  user_id: number;
  product_id: number;
  createdAt: string;
  updatedAt: string;
  Product: Product;
}

export interface Wishlist {
  id: string;
  userId: string;
  items: WishlistItem[];
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddToWishlistRequest {
  productId: string;
}

export interface WishlistResponse {
  wishlist: WishlistItem[];
  message?: string;
}
