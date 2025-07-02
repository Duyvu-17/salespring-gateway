import axiosInstance from "./axiosInstance";

export interface OrderItem {
  product_id: number;
  variant_id?: number;
  product_name: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface BillingInfo {
  billing_first_name: string;
  billing_last_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;
  billing_city: string;
  billing_district: string;
  billing_ward: string;
  billing_postal_code: string;
  billing_country: string;
}

export interface ShippingInfo {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_email: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_district: string;
  shipping_ward: string;
  shipping_postal_code: string;
  shipping_country: string;
}

export interface CreateOrderPayload {
  user_id?: number;
  guest_email?: string;
  billingInfo: BillingInfo;
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  subtotal?: number;
  tax_amount?: number;
  shipping_amount?: number;
  discount_amount?: number;
  total_amount?: number;
  currency?: string;
  notes?: string;
  coupon_id?: number;
}

export const createOrder = async (payload: CreateOrderPayload) => {
  const response = await axiosInstance.post("/orders", payload);
  return response.data;
};

export const getOrderById = async (orderId: string | number) => {
  const response = await axiosInstance.get(`/orders/${orderId}`);
  return response.data;
};
