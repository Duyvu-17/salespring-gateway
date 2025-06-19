export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    GOOGLE: 'users/google-login',
    ME: 'users/me',
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