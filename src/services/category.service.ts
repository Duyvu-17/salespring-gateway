import { Category } from '@/types/category';
import { API_URL, API_ENDPOINTS } from '@/config/api';

class CategoryService {
  private endpoint = API_ENDPOINTS.CATEGORY.GET;

  async getAll(): Promise<Category[]> {
    const res = await fetch(`${API_URL}${this.endpoint}`);
    if (!res.ok) throw new Error('Không thể lấy danh sách danh mục');
    return res.json();
  }

  async getById(id: number): Promise<Category> {
    const res = await fetch(`${API_URL}${this.endpoint}/${id}`);
    if (!res.ok) throw new Error('Không thể lấy chi tiết danh mục');
    return res.json();
  }

  async create(data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.CATEGORY.CREATE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Không thể tạo danh mục');
    return res.json();
  }

  async update(id: number, data: Partial<Omit<Category, 'id'>>): Promise<Category> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.CATEGORY.UPDATE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Không thể cập nhật danh mục');
    return res.json();
  }

  async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.CATEGORY.DELETE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Không thể xóa danh mục');
  }
}

export const categoryService = new CategoryService(); 