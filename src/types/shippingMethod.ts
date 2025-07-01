export interface ShippingMethod {
  shipping_method_id: number;
  method_name: string;
  method_code: string;
  description: string;
  base_cost: string;
  cost_per_kg: string;
  free_shipping_threshold: string | null;
  estimated_days_min: number;
  estimated_days_max: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}
