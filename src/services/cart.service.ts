import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest, CartResponse } from '@/types/cart';

class CartService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');  
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getCart(): Promise<Cart> {
    try {
      const { data } = await axiosInstance.get(`cart`, {
        withCredentials: true,
        headers: { ...this.getAuthHeader() },
      });
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi lấy giỏ hàng');
    }
  }

  async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
    try {
      const { data } = await axiosInstance.post(
        `${API_URL}/cart/add`,
        { productId, quantity },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
        }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi thêm vào giỏ hàng');
    }
  }

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    try {
      const { data } = await axiosInstance.put(
        `${API_URL}/cart/${itemId}`,
        { quantity },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
        }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi cập nhật giỏ hàng');
    }
  }

  async removeFromCart(itemId: string): Promise<Cart> {
    try {
      const { data } = await axiosInstance.delete(`${API_URL}/cart/${itemId}`, {
        withCredentials: true,
        headers: { ...this.getAuthHeader() },
      });
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng');
    }
  }

  async clearCart(): Promise<void> {
    try {
      await axiosInstance.delete(`${API_URL}/cart`, {
        withCredentials: true,
        headers: { ...this.getAuthHeader() },
      });
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi xóa toàn bộ giỏ hàng');
    }
  }

  async toggleCartItemSelection(itemId: string, selected: boolean): Promise<Cart> {
    try {
      const { data } = await axiosInstance.patch(
        `${API_URL}/cart/${itemId}/toggle`,
        { selected },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() },
        }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Lỗi khi chọn/bỏ chọn sản phẩm');
    }
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