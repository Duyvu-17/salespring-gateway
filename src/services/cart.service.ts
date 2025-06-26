import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest, CartResponse } from '@/types/cart';

class CartService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');  
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(config: import('axios').AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance({
        withCredentials: true,
        headers: { ...this.getAuthHeader(), ...(config.headers || {}) },
        ...config,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Đã xảy ra lỗi với giỏ hàng');
    }
  }

  async getCart(): Promise<Cart> {
    return this.request<Cart>({
      url: 'cart',
      method: 'get',
    });
  }

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    return this.request<Cart>({
      url: `${API_URL}/cart/add`,
      method: 'post',
      data: { productId, quantity },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    return this.request<Cart>({
      url: `${API_URL}/cart/${itemId}`,
      method: 'put',
      data: { quantity },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    return this.request<Cart>({
      url: `${API_URL}/cart/${itemId}`,
      method: 'delete',
    });
  }

  async clearCart(): Promise<void> {
    await this.request<void>({
      url: `${API_URL}/cart`,
      method: 'delete',
    });
  }

  async toggleCartItemSelection(itemId: string, selected: boolean): Promise<Cart> {
    return this.request<Cart>({
      url: `${API_URL}/cart/${itemId}/toggle`,
      method: 'patch',
      data: { selected },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Helper method để tính toán cart totals
  calculateCartTotals(items: CartItem[], discount: number = 0, shipping: number = 0) {
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