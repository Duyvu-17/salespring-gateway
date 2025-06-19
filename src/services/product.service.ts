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
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.GET}${query}`);
    if (!res.ok) throw new Error('Không thể lấy danh sách sản phẩm');
    return res.json();
  }

  async getById(id: number): Promise<Product> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_ID}/${id}`);
    if (!res.ok) throw new Error('Không thể lấy chi tiết sản phẩm');
    return res.json();
  }

  async getBySlug(slug: string): Promise<Product> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_SLUG}/${slug}`);
    if (!res.ok) throw new Error('Không thể lấy sản phẩm theo slug');
    return res.json();
  }

  async getHot(): Promise<Product[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.HOT}`);
    if (!res.ok) throw new Error('Không thể lấy sản phẩm hot');
    return res.json();
  }

  async getSale(): Promise<Product[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.SALE}`);
    if (!res.ok) throw new Error('Không thể lấy sản phẩm giảm giá');
    return res.json();
  }

  async getNew(): Promise<Product[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.NEW}`);
    if (!res.ok) throw new Error('Không thể lấy sản phẩm mới');
    return res.json();
  }

  async getByCategory(categoryId: number): Promise<Product[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.BY_CATEGORY}/${categoryId}`);
    if (!res.ok) throw new Error('Không thể lấy sản phẩm theo danh mục');
    return res.json();
  }

  async getAllVariants(): Promise<ProductVariant[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANTS}`);
    if (!res.ok) throw new Error('Không thể lấy danh sách biến thể sản phẩm');
    return res.json();
  }

  async getVariantsByProductId(productId: number): Promise<ProductVariant[]> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.VARIANTS_BY_PRODUCT_ID}/${productId}/variants`);
    if (!res.ok) throw new Error('Không thể lấy biến thể theo sản phẩm');
    return res.json();
  }

  async getVariantById(id: number): Promise<ProductVariant> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_ID}/${id}`);
    if (!res.ok) throw new Error('Không thể lấy biến thể theo id');
    return res.json();
  }

  async getVariantBySku(sku: string): Promise<ProductVariant> {
    const res = await fetch(`${API_URL}${API_ENDPOINTS.PRODUCT.PRODUCT_VARIANT_BY_SKU}/${sku}`);
    if (!res.ok) throw new Error('Không thể lấy biến thể theo sku');
    return res.json();
  }
}

export const productService = new ProductService(); 