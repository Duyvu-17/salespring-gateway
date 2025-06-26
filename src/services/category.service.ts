import axiosInstance from './axiosInstance';
import { Category } from '@/types/category';
import { API_URL, API_ENDPOINTS } from '@/config/api';

class CategoryService {
  private endpoint = API_ENDPOINTS.CATEGORY.GET;

  private async request<T>(config: import('axios').AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance({
        headers: { 'Content-Type': 'application/json', ...(config.headers || {}) },
        ...config,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Đã xảy ra lỗi với danh mục');
    }
  }

  async getAll(): Promise<Category[]> {
    const data = await this.request<{ data: Category[] }>({
      url: `${this.endpoint}`,
      method: 'get',
    });
    return data.data;
  }

  async getById(id: number): Promise<Category> {
    return this.request<Category>({
      url: `${this.endpoint}/${id}`,
      method: 'get',
    });
  }

  async create(dataInput: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    return this.request<Category>({
      url: `${API_URL}${API_ENDPOINTS.CATEGORY.CREATE}`,
      method: 'post',
      data: dataInput,
    });
  }

  async update(id: number, dataInput: Partial<Omit<Category, 'id'>>): Promise<Category> {
    return this.request<Category>({
      url: `${API_URL}${API_ENDPOINTS.CATEGORY.UPDATE}/${id}`,
      method: 'put',
      data: dataInput,
    });
  }

  async delete(id: number): Promise<void> {
    await this.request<void>({
      url: `${API_URL}${API_ENDPOINTS.CATEGORY.DELETE}/${id}`,
      method: 'delete',
    });
  }
}

export const categoryService = new CategoryService(); 