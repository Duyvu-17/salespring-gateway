import axiosInstance from './axiosInstance';
import { Product, ProductVariant } from '@/types/product';
import { API_URL, API_ENDPOINTS } from '@/config/api';

interface ProductListResponse {
  total: number;
  total_pages: number;
  current_page: number;
  products: Product[];
}

type ProductQueryParams = Record<string, string | number>;

class ProductService {
  private async request<T>(config: import('axios').AxiosRequestConfig): Promise<T> {
    try {
      const response = await axiosInstance({
        headers: { 'Content-Type': 'application/json', ...(config.headers || {}) },
        ...config,
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      throw new Error(err.response?.data?.message || 'Đã xảy ra lỗi với sản phẩm');
    }
  }

  async getAll(params?: ProductQueryParams): Promise<ProductListResponse> {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    const data = await this.request<{ data: ProductListResponse }>({
      url: `${API_ENDPOINTS.PRODUCT.GET}${query}`,
      method: 'get',
    });
    return data.data;
  }

  async getById(id: number): Promise<Product> {
    const data = await this.request<{ data: Product }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.BY_ID}/${id}`,
      method: 'get',
    });
    return data.data;
  }

  async getBySlug(slug: string): Promise<Product> {
    const data = await this.request<{ data: Product }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.BY_SLUG}/${slug}`,
      method: 'get',
    });
    return data.data;
  }

  async getHot(): Promise<Product[]> {
    const data = await this.request<{ data: Product[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.HOT}`,
      method: 'get',
    });
    return data.data;
  }

  async getSale(): Promise<Product[]> {
    const data = await this.request<{ data: Product[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.SALE}`,
      method: 'get',
    });
    return data.data;
  }

  async getNew(): Promise<Product[]> {
    const data = await this.request<{ data: Product[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.NEW}`,
      method: 'get',
    });
    return data.data;
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    const data = await this.request<{ data: Product[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.BY_CATEGORY}/${categoryId}`,
      method: 'get',
    });
    return data.data;
  }

  async getAllVariants(): Promise<ProductVariant[]> {
    const data = await this.request<{ data: ProductVariant[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANTS}`,
      method: 'get',
    });
    return data.data;
  }

  async getVariantsByProductId(productId: number): Promise<ProductVariant[]> {
    const data = await this.request<{ data: ProductVariant[] }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.VARIANTS_BY_PRODUCT_ID}/${productId}/variants`,
      method: 'get',
    });
    return data.data;
  }

  async getVariantById(id: number): Promise<ProductVariant> {
    const data = await this.request<{ data: ProductVariant }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_ID}/${id}`,
      method: 'get',
    });
    return data.data;
  }

  async getVariantBySku(sku: string): Promise<ProductVariant> {
    const data = await this.request<{ data: ProductVariant }>({
      url: `${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_SKU}/${sku}`,
      method: 'get',
    });
    return data.data;
  }
}

export const productService = new ProductService(); 