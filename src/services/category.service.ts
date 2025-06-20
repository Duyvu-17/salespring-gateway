import axios from 'axios';
import { Category } from '@/types/category';
import { API_URL, API_ENDPOINTS } from '@/config/api';

class CategoryService {
  private endpoint = API_ENDPOINTS.CATEGORY.GET;

  async getAll(): Promise<Category[]> {
    try {
      const { data } = await axios.get(`${API_URL}${this.endpoint}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy danh sách danh mục');
    }
  }

  async getById(id: number): Promise<Category> {
    try {
      const { data } = await axios.get(`${API_URL}${this.endpoint}/${id}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy chi tiết danh mục');
    }
  }

  async create(dataInput: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    try {
      const { data } = await axios.post(
        `${API_URL}${API_ENDPOINTS.CATEGORY.CREATE}`,
        dataInput,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể tạo danh mục');
    }
  }

  async update(id: number, dataInput: Partial<Omit<Category, 'id'>>): Promise<Category> {
    try {
      const { data } = await axios.put(
        `${API_URL}${API_ENDPOINTS.CATEGORY.UPDATE}/${id}`,
        dataInput,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể cập nhật danh mục');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await axios.delete(`${API_URL}${API_ENDPOINTS.CATEGORY.DELETE}/${id}`);
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể xóa danh mục');
    }
  }
}

export const categoryService = new CategoryService(); 