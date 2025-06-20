import axios from 'axios';
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
  async getAll(params?: ProductQueryParams): Promise<ProductListResponse> {
    try {
      const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.GET}${query}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy danh sách sản phẩm');
    }
  }

  async getById(id: number): Promise<Product> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_ID}/${id}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy chi tiết sản phẩm');
    }
  }

  async getBySlug(slug: string): Promise<Product> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_SLUG}/${slug}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy sản phẩm theo slug');
    }
  }

  async getHot(): Promise<Product[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.HOT}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy sản phẩm hot');
    }
  }

  async getSale(): Promise<Product[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.SALE}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy sản phẩm giảm giá');
    }
  }

  async getNew(): Promise<Product[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.NEW}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy sản phẩm mới');
    }
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_CATEGORY}/${categoryId}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy sản phẩm theo danh mục');
    }
  }

  async getAllVariants(): Promise<ProductVariant[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANTS}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy danh sách biến thể sản phẩm');
    }
  }

  async getVariantsByProductId(productId: number): Promise<ProductVariant[]> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.VARIANTS_BY_PRODUCT_ID}/${productId}/variants`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy biến thể theo sản phẩm');
    }
  }

  async getVariantById(id: number): Promise<ProductVariant> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_ID}/${id}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy biến thể theo id');
    }
  }

  async getVariantBySku(sku: string): Promise<ProductVariant> {
    try {
      const { data } = await axios.get(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_SKU}/${sku}`);
      return data;
    } catch (error: unknown) {
      const err = error as any;
      throw new Error(err.response?.data?.message || 'Không thể lấy biến thể theo sku');
    }
  }
}

export const productService = new ProductService(); 