import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { WishlistItem, AddToWishlistRequest, WishlistResponse } from '@/types/wishlist';

class WishlistService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(config: import('axios').AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance({
        headers: { 'Content-Type': 'application/json', ...(config.headers || {}) },
        ...config,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Đã xảy ra lỗi với wishlist');
    }
  }

  async getWishlist(): Promise<WishlistResponse> {
    return this.request<WishlistResponse>({
      url: `${API_ENDPOINTS.WISHLIST.GET}`,
      method: 'get',
      headers: { ...this.getAuthHeader() },
    });
  }

  async addToWishlist(productId: string): Promise<WishlistResponse> {
    return this.request<WishlistResponse>({
      url: `${API_URL}${API_ENDPOINTS.WISHLIST.ADD_ITEM}`,
      method: 'post',
      data: { productId },
      headers: { ...this.getAuthHeader() },
    });
  }

  async removeFromWishlist(itemId: string): Promise<WishlistResponse> {
    return this.request<WishlistResponse>({
      url: `${API_URL}${API_ENDPOINTS.WISHLIST.REMOVE_ITEM}/${itemId}`,
      method: 'delete',
      headers: { ...this.getAuthHeader() },
    });
  }

  async clearWishlist(): Promise<void> {
    await this.request<void>({
      url: `${API_URL}${API_ENDPOINTS.WISHLIST.CLEAR}`,
      method: 'delete',
      headers: { ...this.getAuthHeader() },
    });
  }

  // Helper method để kiểm tra sản phẩm có trong wishlist không
  isInWishlist(wishlist: WishlistResponse, productId: string): boolean {
    return wishlist.wishlist.some(item => item.product_id.toString() === productId);
  }

  // Helper method để lấy wishlist item theo productId
  getWishlistItem(wishlist: WishlistResponse, productId: string): WishlistItem | undefined {
    return wishlist.wishlist.find(item => item.product_id.toString()  === productId);
  }
}

export const wishlistService = new WishlistService(); 