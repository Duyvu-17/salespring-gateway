import axiosInstance from "@/services/axiosInstance";

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    LOGOUT: 'auth/logout',
    GOOGLE: 'auth/google',
    ME: 'auth/me',
    REFRESH_TOKEN: '/refresh-token',
    RESET_PASSWORD: 'auth/reset-password',
    FORGOT_PASSWORD: 'auth/forgot-password',
  },
  CART: {
    GET: 'cart',
    ADD_ITEM: 'cart/items',
    UPDATE_ITEM: 'cart/items',
    REMOVE_ITEM: 'cart/items',
    CLEAR: 'cart/clear',
  },
  WISHLIST: {
    GET: 'wishlist',
    ADD_ITEM: 'wishlist/items',
    REMOVE_ITEM: 'wishlist/items',
    CLEAR: 'wishlist/clear',
  },
  CATEGORY: {
    GET: 'categories',
    CREATE: 'categories',
    UPDATE: 'categories',
    DELETE: 'categories',
  },
  PRODUCT: {
    GET: 'products',
    HOT: 'products/hot',
    SALE: 'products/sale',
    NEW: 'products/new',
    BY_CATEGORY: 'products/category',
    BY_ID: 'products',
    BY_SLUG: 'products/slug',
    PRODUCT_VARIANTS: 'products/product-variants',
    VARIANTS_BY_PRODUCT_ID: 'products',
    PRODUCT_VARIANT_BY_ID: 'products/product-variants',
    PRODUCT_VARIANT_BY_SKU: 'products/product-variants/sku',
  },
} as const; 

async function resetPassword(token: string, newPassword: string): Promise<any> {
  try {
    const { data } = await axiosInstance.post(
      `${API_ENDPOINTS.AUTH.RESET_PASSWORD}`,
      { token, newPassword }
    );
    return data;
  } catch (error: unknown) {
    const err = error as any;
    throw new Error(err.response?.data?.message || 'Đổi mật khẩu thất bại');
  }
} 