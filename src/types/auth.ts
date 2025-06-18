export interface User {
  id: string;
  name: string;
  email: string;
  full_name: string;
  address: string;
  bio: string;
  phone: string;
  avatar?: string;
  provider?: 'local' | 'google';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
} 