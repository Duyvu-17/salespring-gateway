import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { WishlistItem, AddToWishlistRequest, WishlistResponse } from '@/types/wishlist';

class WishlistService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getWishlist(): Promise<WishlistResponse> {
    try {
      const { data } = await axiosInstance.get(`${API_ENDPOINTS.WISHLIST.GET}`, {
        headers: { ...this.getAuthHeader() },
      });
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy wishlist');
    }
  }

  async addToWishlist(productId: string): Promise<WishlistResponse> {
    try {
      const { data } = await axiosInstance.post(
        `${API_URL}${API_ENDPOINTS.WISHLIST.ADD_ITEM}`,
        { productId },
        { headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() } }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể thêm vào wishlist');
    }
  }

  async removeFromWishlist(itemId: string): Promise<WishlistResponse> {
    try {
      const { data } = await axiosInstance.delete(`${API_URL}${API_ENDPOINTS.WISHLIST.REMOVE_ITEM}/${itemId}`, {
        headers: { ...this.getAuthHeader() },
      });
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể xóa khỏi wishlist');
    }
  }

  async clearWishlist(): Promise<void> {
    try {
      await axiosInstance.delete(`${API_URL}${API_ENDPOINTS.WISHLIST.CLEAR}`, {
        headers: { ...this.getAuthHeader() },
      });
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể xóa wishlist');
    }
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