import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { Cart, Cart_items, AddToCartRequest, UpdateCartItemRequest, CartResponse } from '@/types/cart';

class CartService {
  private getAuthHeader(): HeadersInit {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeader(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 401) {
          throw new Error(`401: ${error.message || 'Unauthorized'}`);
        }
        throw new Error(`${response.status}: ${error.message || 'Có lỗi xảy ra'}`);
      }

      return response.json();
    } catch (error) {
      console.error('Cart API request error:', error);
      throw error;
    }
  }

  async getCart(): Promise<Cart> {
    return this.request<Cart>(API_ENDPOINTS.CART.GET);
  }

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    const data = await this.request<CartResponse>(API_ENDPOINTS.CART.ADD_ITEM, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
    return data.cart;
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const data = await this.request<CartResponse>(`${API_ENDPOINTS.CART.UPDATE_ITEM}/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    return data.cart;
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    const data = await this.request<CartResponse>(`${API_ENDPOINTS.CART.REMOVE_ITEM}/${itemId}`, {
      method: 'DELETE',
    });
    return data.cart;
  }

  async clearCart(): Promise<void> {
    await this.request(API_ENDPOINTS.CART.CLEAR, {
      method: 'DELETE',
    });
  }

  // Helper method để tính toán cart totals
  calculateCartTotals(items: Cart_items[], discount: number = 0, shipping: number = 0) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - discount + shipping;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      total,
      totalItems,
      discount,
      shipping,
    };
  }
}

export const cartService = new CartService(); 