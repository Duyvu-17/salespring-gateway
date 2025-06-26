import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { UserReview, Reply } from '@/data/products';

class ReviewService {
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
      throw new Error(err.response?.data?.message || 'Đã xảy ra lỗi với đánh giá sản phẩm');
    }
  }

  async getReviews(productId: string | number): Promise<UserReview[]> {
    const data = await this.request<{ data: { reviews: UserReview[] } }>({
      url: `${API_URL}product-reviews/${productId}/reviews`,
      method: 'get',
    });
    return data.data.reviews;
  }

  async addReview(productId: string | number, review: Omit<UserReview, 'id'>): Promise<UserReview> {
    return this.request<UserReview>({
      url: `${API_URL}product-reviews/${productId}/reviews`,
      method: 'post',
      data: review,
      headers: { ...this.getAuthHeader() },
    });
  }

  async addReply(productId: string | number, reviewId: string | number, reply: Omit<Reply, 'id'>): Promise<Reply> {
    return this.request<Reply>({
      url: `${API_URL}product-reviews/${productId}/reviews/${reviewId}/replies`,
      method: 'post',
      data: reply,
      headers: { ...this.getAuthHeader() },
    });
  }

  async deleteReview(productId: string | number, reviewId: string | number): Promise<void> {
    await this.request<void>({
      url: `${API_URL}/product-reviews/${productId}/reviews/${reviewId}`,
      method: 'delete',
      headers: { ...this.getAuthHeader() },
    });
  }

  async deleteReply(productId: string | number, reviewId: string | number, replyId: string | number): Promise<void> {
    await this.request<void>({
      url: `${API_URL}/product-reviews/${productId}/reviews/${reviewId}/replies/${replyId}`,
      method: 'delete',
      headers: { ...this.getAuthHeader() },
    });
  }
}

export const reviewService = new ReviewService(); 