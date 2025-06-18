import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { User, LoginResponse, RegisterResponse } from '@/types/auth';
import { log } from 'console';

class AuthService {
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
          // Token hết hạn hoặc không hợp lệ
          this.clearAuthData();
        }
        throw new Error(error.message || 'Có lỗi xảy ra');
      }

      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
  }

  async login(email: string, password: string): Promise<User> {
    const data = await this.request<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true');
    return data.user;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const data = await this.request<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true');
    return data.user;
  }

  async logout(): Promise<void> {
    try {
      console.log(this.request);
      
      await this.request(API_ENDPOINTS.AUTH.LOGOUT, {
        method: 'POST',
      });
    } finally {
      this.clearAuthData();
    }
  }

  async loginWithGoogle(idToken: string): Promise<User> {
    const data = await this.request<LoginResponse>(API_ENDPOINTS.AUTH.GOOGLE, {
      method: 'POST',
      body: JSON.stringify({ idToken }), 
    });
    localStorage.setItem('token', data.token);
    localStorage.setItem('isLoggedIn', 'true');
    return data.user;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.clearAuthData();
        return null;
      }

      const data = await this.request<{ user: User }>(API_ENDPOINTS.AUTH.ME);
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      this.clearAuthData();
      return null;
    }
  }
}

export const authService = new AuthService(); 