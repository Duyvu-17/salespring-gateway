import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { Wishlist, WishlistItem, AddToWishlistRequest, WishlistResponse } from '@/types/wishlist';

class WishlistService {
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
      console.error('Wishlist API request error:', error);
      throw error;
    }
  }

  async getWishlist(): Promise<Wishlist> {
    return this.request<Wishlist>(API_ENDPOINTS.WISHLIST.GET);
  }

  async addToWishlist(productId: string): Promise<Wishlist> {
    const data = await this.request<WishlistResponse>(API_ENDPOINTS.WISHLIST.ADD_ITEM, {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    return data.wishlist;
  }

  async removeFromWishlist(itemId: string): Promise<Wishlist> {
    const data = await this.request<WishlistResponse>(`${API_ENDPOINTS.WISHLIST.REMOVE_ITEM}/${itemId}`, {
      method: 'DELETE',
    });
    return data.wishlist;
  }

  async clearWishlist(): Promise<void> {
    await this.request(API_ENDPOINTS.WISHLIST.CLEAR, {
      method: 'DELETE',
    });
  }

  // Helper method để kiểm tra sản phẩm có trong wishlist không
  isInWishlist(wishlist: Wishlist, productId: string): boolean {
    return wishlist.items.some(item => item.productId === productId);
  }

  // Helper method để lấy wishlist item theo productId
  getWishlistItem(wishlist: Wishlist, productId: string): WishlistItem | undefined {
    return wishlist.items.find(item => item.productId === productId);
  }
}

export const wishlistService = new WishlistService(); 