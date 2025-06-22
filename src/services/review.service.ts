import axiosInstance from './axiosInstance';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { UserReview, Reply } from '@/data/products';

class ReviewService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getReviews(productId: string | number): Promise<UserReview[]> {
    const { data } = await axiosInstance.get(`${API_URL}product-reviews/${productId}/reviews`);
    return data.data.reviews;
  }

  async addReview(productId: string | number, review: Omit<UserReview, 'id'>): Promise<UserReview> {
    const { data } = await axiosInstance.post(
      `${API_URL}product-reviews/${productId}/reviews`,
      review,
      { headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() } }
    );
    return data;
  }

  async addReply(productId: string | number, reviewId: string | number, reply: Omit<Reply, 'id'>): Promise<Reply> {
    const { data } = await axiosInstance.post(
      `${API_URL}product-reviews/${productId}/reviews/${reviewId}/replies`,
      reply,
      { headers: { 'Content-Type': 'application/json', ...this.getAuthHeader() } }
    );
    return data;
  }

  async deleteReview(productId: string | number, reviewId: string | number): Promise<void> {
    await axiosInstance.delete(
      `${API_URL}/product-reviews/${productId}/reviews/${reviewId}`,
      { headers: { ...this.getAuthHeader() } }
    );
  }

  async deleteReply(productId: string | number, reviewId: string | number, replyId: string | number): Promise<void> {
    await axiosInstance.delete(
      `${API_URL}/product-reviews/${productId}/reviews/${reviewId}/replies/${replyId}`,
      { headers: { ...this.getAuthHeader() } }
    );
  }
}

export const reviewService = new ReviewService(); 