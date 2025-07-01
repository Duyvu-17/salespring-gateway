import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "@/config/api";
import type { ShippingMethod } from "@/types/shippingMethod";

class ShippingMethodService {
  async getAllShippingMethods(): Promise<ShippingMethod[]> {
    const { data } = await axiosInstance.get<{ data: ShippingMethod[] }>(
      API_ENDPOINTS.SHIPPING_METHOD
    );
    return data.data;
  }

  async getShippingMethodById(id: number): Promise<ShippingMethod> {
    const { data } = await axiosInstance.get<{ data: ShippingMethod }>(
      `${API_ENDPOINTS.SHIPPING_METHOD}/${id}`
    );
    return data.data;
  }
}

export const shippingMethodService = new ShippingMethodService();
