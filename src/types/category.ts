export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent_id: number | null;
  status: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  meta_title: string;
  meta_description: string;
  createdAt: string;
  updatedAt: string;
} 