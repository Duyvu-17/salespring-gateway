import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";
import React from "react";
import { userAddressService } from "@/services/userAddress.service";
import type { UserAddress } from "@/types/userAddress";

import { AddressDisplay } from "./AddressDisplay";
import { AddressSelection } from "./AddressSelection";
import type { BillingInfo, ShippingInfo } from "@/services/order.service";

interface Address {
  id: string;
  name: string;
  street: string;
  district: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  type: "home" | "office";
  isDefault?: boolean;
}

interface ShippingInformationProps {
  onBillingChange?: (billing: BillingInfo) => void;
  onShippingChange?: (shipping: ShippingInfo) => void;
}

const ShippingInformation = ({
  onBillingChange,
  onShippingChange,
}: ShippingInformationProps) => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [savedAddresses, setSavedAddresses] = useState<UserAddress[]>([]);

  useEffect(() => {
    // Lấy danh sách địa chỉ từ API
    userAddressService
      .getUserAddresses()
      .then((addresses) => {
        console.log("Danh sách địa chỉ:", addresses);
        setSavedAddresses(addresses);
        if (addresses.length > 0) {
          const defaultId = String(
            addresses.find((a) => a.is_default)?.id || addresses[0].id
          );
          setSelectedAddress(defaultId);
          console.log("Địa chỉ mặc định:", defaultId);
        }
      })
      .catch(() => {
        setSavedAddresses([]);
      });
  }, []);

  const handleNewAddressSave = (newAddress: UserAddress) => {
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddress(String(newAddress.id));
    toast("Địa chỉ đã được thêm", {
      description: "Địa chỉ giao hàng mới của bạn đã được lưu.",
    });
  };

  // Chuyển đổi UserAddress sang Address cho UI
  const mapToAddress = (userAddress: UserAddress): Address => ({
    id: String(userAddress.id),
    name: userAddress.name,
    street: userAddress.street,
    district: userAddress.district,
    city: userAddress.city,
    country: userAddress.country,
    postalCode: userAddress.postalCode,
    phone: userAddress.phone,
    type: userAddress.type as "home" | "office",
    isDefault: userAddress.is_default,
  });

  const addressList: Address[] = savedAddresses.map(mapToAddress);
  const currentAddress =
    addressList.find((a) => a.id === selectedAddress) || addressList[0];

  useEffect(() => {
    if (!currentAddress) return;
    const shippingInfo: ShippingInfo = {
      shipping_first_name: currentAddress.name,
      shipping_last_name: "",
      shipping_email: "",
      shipping_phone: currentAddress.phone,
      shipping_address: currentAddress.street,
      shipping_city: currentAddress.city,
      shipping_district: currentAddress.district,
      shipping_ward: "",
      shipping_postal_code: currentAddress.postalCode,
      shipping_country: currentAddress.country,
    };
    if (onShippingChange) onShippingChange(shippingInfo);
    const billingInfo: BillingInfo = {
      billing_first_name: currentAddress.name,
      billing_last_name: "",
      billing_email: "",
      billing_phone: currentAddress.phone,
      billing_address: currentAddress.street,
      billing_city: currentAddress.city,
      billing_district: currentAddress.district,
      billing_ward: "",
      billing_postal_code: currentAddress.postalCode,
      billing_country: currentAddress.country,
    };
    if (onBillingChange) onBillingChange(billingInfo);
  }, [currentAddress, onShippingChange, onBillingChange]);

  return (
    <Card className="shadow-md border-0">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg pb-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">
            Thông tin giao hàng
          </CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Hàng của bạn sẽ được gửi đến địa chỉ này
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <AddressDisplay
            address={currentAddress}
            onEditClick={() => setShowAddressDialog(true)}
          />
        </div>

        <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
          <DialogContent className="sm:max-w-[525px] p-0 overflow-hidden rounded-xl">
            <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <DialogTitle className="text-xl font-semibold">
                Chọn địa chỉ giao hàng
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Chọn từ những địa chỉ đã lưu hoặc thêm một địa chỉ mới
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <AddressSelection
                savedAddresses={addressList}
                selectedAddress={selectedAddress}
                onAddressChange={setSelectedAddress}
                onNewAddressSave={(address) => {
                  // Khi thêm mới từ AddressForm, cần convert về UserAddress tối thiểu để lưu local
                  const newUserAddress: UserAddress = {
                    ...address,
                    id: Number(address.id),
                    user_id: 0,
                    is_default: false,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  };
                  handleNewAddressSave(newUserAddress);
                }}
              />
            </div>

            <DialogFooter className="p-4 bg-gray-50 border-t">
              <Button
                variant="outline"
                onClick={() => setShowAddressDialog(false)}
                className="border-gray-300"
              >
                Hủy
              </Button>
              <Button
                onClick={() => {
                  toast("Địa chỉ đã cập nhật", {
                    description: "Địa chỉ giao hàng của bạn đã được cập nhật.",
                  });
                  setShowAddressDialog(false);
                }}
                className="bg-primary hover:bg-primary-dark transition-colors"
              >
                <Check className="h-4 w-4 mr-2" />
                Xác Nhận Địa Chỉ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;
