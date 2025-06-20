import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '@/config/api';
import type { User, LoginResponse, RegisterResponse } from '@/types/auth';
import { log } from 'console';

class AuthService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');
    try {
      const { data } = await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data.token;
      }
      throw new Error('No token in refresh response');
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Refresh token failed');
    }
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
          // Token hết hạn hoặc không hợp lệ, thử refresh token
          try {
            const newToken = await this.refreshToken();
            // Retry request với token mới
            const retryResponse = await fetch(`${API_URL}${endpoint}`, {
              ...options,
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${newToken}`,
                ...options.headers,
              },
            });
            if (!retryResponse.ok) {
              if (retryResponse.status === 401) {
                this.clearAuthData();
                throw new Error('401: Unauthorized');
              }
              const retryError = await retryResponse.json();
              throw new Error(`${retryResponse.status}: ${retryError.message || 'Có lỗi xảy ra'}`);
            }
            return retryResponse.json();
          } catch (refreshError) {
            this.clearAuthData();
            throw new Error('401: Unauthorized');
          }
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
    localStorage.removeItem('refreshToken');
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { data } = await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.LOGIN}`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Email hoặc mật khẩu không đúng');
    }
  }

  async register(full_name: string, email: string, password: string): Promise<User> {
    try {
      const { data } = await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.REGISTER}`,
        { full_name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      if (data.refreshToken) localStorage.setItem('refreshToken', data.refreshToken);
      return data.user;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký tài khoản');
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.LOGOUT}`,
        {},
        { headers: { ...this.getAuthHeader(), 'Content-Type': 'application/json' } }
      );
    } finally {
      this.clearAuthData();
    }
  }

  async loginWithGoogle(idToken: string): Promise<User> {
    try {
      const { data } = await axios.post(
        `${API_URL}${API_ENDPOINTS.AUTH.GOOGLE}`,
        { idToken },
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('token', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      return data.user;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Đăng nhập Google thất bại');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        this.clearAuthData();
        return null;
      }
      const { data } = await axios.get(
        `${API_URL}${API_ENDPOINTS.AUTH.ME}`,
        { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
      );
      // Kiểm tra format của response - có thể là { user: User } hoặc User trực tiếp
      let userData = null;
      if (data && data.user) {
        userData = data.user;
      } else if (data && data.id && data.email) {
        userData = data;
      } else {
        return null;
      }
      return userData;
    } catch (error: unknown) {
      const err = error as any;
      if (err.response?.status === 401) {
        this.clearAuthData();
      }
      return null;
    }
  }
}

export const authService = new AuthService(); 