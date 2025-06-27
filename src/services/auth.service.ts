import axiosInstance from "./axiosInstance";
import { API_URL, API_ENDPOINTS } from "@/config/api";
import type { User, LoginResponse, RegisterResponse } from "@/types/auth";

class AuthService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  public async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");
    try {
      const { data } = await axiosInstance.post(
        `${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );
      if (data.token) {
        localStorage.setItem("token", data.data.accessToken);
        return data.token;
      }
      throw new Error("No token in refresh response");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Refresh token failed");
    }
  }

  private async request<T>(
    endpoint: string,
    options: import("axios").AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response = await axiosInstance({
        url: endpoint,
        method: options.method || "get",
        data: options.data,
        headers: {
          ...options.headers,
        },
        ...options,
      });
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as {
          response: { status: number; data?: { message?: string } };
        };
        if (err.response.status === 401) {
          this.clearAuthData();
          throw new Error("401: Unauthorized");
        }
        throw new Error(
          `${err.response.status}: ${
            err.response.data?.message || "Có lỗi xảy ra"
          }`
        );
      }
      console.error("API request error:", error);
      throw error;
    }
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const data = await this.request<{
        data: { user: User; accessToken: string; refreshToken: string };
      }>(API_ENDPOINTS.AUTH.LOGIN, {
        method: "post",
        data: { email, password },
      });
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("refreshToken", data.data.refreshToken);
      if (data.data.refreshToken)
        localStorage.setItem("refreshToken", data.data.refreshToken);
      return data.data.user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Email hoặc mật khẩu không đúng"
      );
    }
  }

  async register(
    full_name: string,
    email: string,
    password: string
  ): Promise<User> {
    try {
      const data = await this.request<{
        data: { user: User; accessToken: string; refreshToken: string };
      }>(API_ENDPOINTS.AUTH.REGISTER, {
        method: "post",
        data: { full_name, email, password },
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      if (data.data.refreshToken)
        localStorage.setItem("refreshToken", data.data.refreshToken);
      return data.data.user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Có lỗi xảy ra khi đăng ký tài khoản"
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await this.request(API_ENDPOINTS.AUTH.LOGOUT, {
        method: "post",
        data: {},
        headers: {
          ...this.getAuthHeader(),
          "Content-Type": "application/json",
        },
      });
    } finally {
      this.clearAuthData();
    }
  }

  async loginWithGoogle(idToken: string): Promise<User> {
    try {
      const data = await this.request<{
        data: { user: User; accessToken: string; refreshToken: string };
      }>(API_ENDPOINTS.AUTH.GOOGLE, {
        method: "post",
        data: { idToken },
        headers: { "Content-Type": "application/json" },
      });
      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("refreshToken", data.data.refreshToken);
      return data.data.user;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Đăng nhập Google thất bại"
      );
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        this.clearAuthData();
        return null;
      }
      const data = await this.request<{ data: { user: User } }>(
        API_ENDPOINTS.AUTH.ME,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let userData = null;
      if (data && data.data.user) {
        userData = data.data.user;
      } else {
        return null;
      }
      return userData;
    } catch (error: unknown) {
      const err = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      if (err.response?.status === 401) {
        this.clearAuthData();
      }
      return null;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<any> {
    try {
      const data = await this.request(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: "post",
        data: { token, newPassword },
      });
      return data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || "Đổi mật khẩu thất bại");
    }
  }

  async forgotPassword(email: string): Promise<any> {
    try {
      const data = await this.request(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: "post",
        data: { email },
      });
      return data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(
        err.response?.data?.message || "Không thể gửi email quên mật khẩu"
      );
    }
  }
}

export const authService = new AuthService();
