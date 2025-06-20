export interface ProductVariant {
  id: number;
  sku: string;
  name: string;
  price: string;
  sale_price: string | null;
  stock: number;
  status: string;
}

export interface ProductInventory {
  quantity: number;
  low_stock_threshold: number;
}

export interface ProductPricing {
  base_price: string;
  sale_price: string | null;
  cost_price: string;
}

export interface ProductIdentifier {
  sku: string;
  barcode: string;
}

export interface ProductMetadatum {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  sale_price: string | null;
  stock: number;
  image_url: string | null;
  category_id: number;
  status: string;
  brand_id: number | null;
  supplier_id: number | null;
  createdAt: string;
  updatedAt: string;
  images?: {
    product_id: number;
    variant_id: number | null;
    is_main: boolean;
    image_url: string;
  }[];
  ProductInventory?: ProductInventory;
  ProductPricing?: ProductPricing;
  ProductIdentifier?: ProductIdentifier;
  ProductMetadatum?: ProductMetadatum;
  ProductVariants?: ProductVariant[];
} 