import { Category } from "./category";

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

export interface ProductDiscount {
  id: number;
  name: string;
  type: string;
  value: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
}
export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
}

export interface ProductInventory {
  quantity: number;
  low_stock_threshold: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  sale_price: string | null;
  stock_quantity: number;
  rating_count: number;
  rating_avg: number;
  image_url: string | null;
  category: Category;
  status: string;
  Brand: ProductBrand;
  supplier_id: number | null;
  in_stock: boolean;
  createdAt: string;
  updatedAt: string;
  images?: {
    product_id: number;
    variant_id: number | null;
    is_main: boolean;
    image_url: string;
  }[];
  ProductInventory?: ProductInventory;
  inventory?: ProductInventory;
  pricing?: ProductPricing;
  ProductIdentifier?: ProductIdentifier;
  ProductMetadatum?: ProductMetadatum;
  ProductVariants?: ProductVariant[];
  discounts?: ProductDiscount[];
}
