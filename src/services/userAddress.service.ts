import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "@/config/api";
import type { UserAddress } from "@/types/userAddress";

class UserAddressService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getUserAddresses(): Promise<UserAddress[]> {
    const { data } = await axiosInstance.get<{ data: UserAddress[] }>(
      API_ENDPOINTS.USER_ADDRESS,
      { headers: this.getAuthHeader() }
    );
    return data.data;
  }

  async createUserAddress(address: Partial<UserAddress>): Promise<UserAddress> {
    const { data } = await axiosInstance.post<{ data: UserAddress }>(
      API_ENDPOINTS.USER_ADDRESS,
      address,
      { headers: this.getAuthHeader() }
    );
    return data.data;
  }

  async updateUserAddress(
    id: string,
    address: Partial<UserAddress>
  ): Promise<UserAddress> {
    const { data } = await axiosInstance.put<{ data: UserAddress }>(
      `${API_ENDPOINTS.USER_ADDRESS}/${id}`,
      address,
      { headers: this.getAuthHeader() }
    );
    return data.data;
  }

  async deleteUserAddress(id: string): Promise<void> {
    await axiosInstance.delete(`${API_ENDPOINTS.USER_ADDRESS}/${id}`, {
      headers: this.getAuthHeader(),
    });
  }

  async setDefaultUserAddress(id: string): Promise<UserAddress> {
    const { data } = await axiosInstance.put<{ data: UserAddress }>(
      `${API_ENDPOINTS.USER_ADDRESS}/${id}/default`,
      {},
      { headers: this.getAuthHeader() }
    );
    return data.data;
  }
}

export const userAddressService = new UserAddressService();
