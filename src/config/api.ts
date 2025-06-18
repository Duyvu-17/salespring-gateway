export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: 'users/login',
    REGISTER: 'users/register',
    LOGOUT: 'users/logout',
    GOOGLE: 'users/login/google',
    ME: 'users/me',
  },
} as const; 