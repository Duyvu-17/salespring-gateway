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
          throw new Error(`401: ${error.message || 'Unauthorized'}`);
        }
        throw new Error(`${response.status}: ${error.message || 'Có lỗi xảy ra'}`);
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
    localStorage.removeItem('user');
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user)); 
      
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(full_name: string, email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${API_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      
      return data.user;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
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

      const response = await fetch(`${API_URL}${API_ENDPOINTS.AUTH.ME}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error(`401: Unauthorized`);
        }
        throw new Error(`${response.status}: ${errorText}`);
      }

      const data = await response.json();
      
      // Kiểm tra format của response - có thể là { user: User } hoặc User trực tiếp
      let userData = null;
      if (data && data.user) {
        // Format: { user: User }
        userData = data.user;
      } else if (data && data.id && data.email) {
        // Format: User trực tiếp
        userData = data;
      } else {
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Error getting current user:', error);
      // Chỉ clear auth data nếu lỗi là 401 (unauthorized)
      if (error instanceof Error && error.message.includes('401')) {
        this.clearAuthData();
      }
      return null;
    }
  }
}

export const authService = new AuthService(); 