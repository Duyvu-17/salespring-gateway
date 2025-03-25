import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddressTypeIcon } from "./AddressTypeIcon";
import { AddressForm } from "./AddressForm";

interface Address {
  id: string;
  name: string;
  street: string;
  district: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  type: 'home' | 'office';
}

interface AddressSelectionProps {
  savedAddresses: Address[];
  selectedAddress: string;
  onAddressChange: (addressId: string) => void;
  onNewAddressSave: (address: Address) => void;
}

export const AddressSelection = ({ 
  savedAddresses, 
  selectedAddress, 
  onAddressChange,
  onNewAddressSave 
}: AddressSelectionProps) => {
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  const handleNewAddressSave = (newAddress: Address & { type: 'home' | 'office' }) => {
    const addressId = `address_${Date.now()}`;
    onNewAddressSave({ ...newAddress, id: addressId });
    onAddressChange(addressId);
    setIsAddingNewAddress(false);
  };

  return (
    <RadioGroup
      value={selectedAddress}
      onValueChange={onAddressChange}
      className="space-y-4"
    >
      {savedAddresses.map((address) => (
        <div
          key={address.id}
          className={`flex items-start space-x-3 border p-4 rounded-xl hover:bg-blue-50/30 transition-colors ${
            selectedAddress === address.id
              ? "border-primary bg-blue-50/20"
              : "border-gray-200"
          }`}
        >
          <RadioGroupItem
            value={address.id}
            id={address.id}
            className="mt-1"
          />
          <div className="flex-1">
            <Label
              htmlFor={address.id}
              className="flex flex-col space-y-1 cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-gray-900">
                  {address.name}
                </span>
                <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <AddressTypeIcon type={address.type} />
                  <span>
                    {address.type === "office" ? "Văn phòng" : "Nhà"}
                  </span>
                </span>
                {selectedAddress === address.id && (
                  <span className="ml-auto text-primary text-sm flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Đã chọn
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-700">
                {address.street}
              </span>
              <span className="text-sm text-gray-700">
                {address.district}, {address.city}
              </span>
              <span className="text-sm text-gray-700">
                {address.country}, {address.postalCode}
              </span>
              <span className="text-sm font-medium text-gray-700 mt-1">
                {address.phone}
              </span>
            </Label>
          </div>
        </div>
      ))}

      <div className="border border-dashed p-4 rounded-xl hover:bg-blue-50/30 transition-colors">
        <Button
          variant="ghost"
          className="w-full justify-center py-6 text-primary hover:bg-primary/5 hover:text-primary-dark transition-colors"
          onClick={() => setIsAddingNewAddress(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          Thêm Địa Chỉ Mới
        </Button>
      </div>

      {isAddingNewAddress && (
        <AddressForm 
          onSave={handleNewAddressSave}
        />
      )}
    </RadioGroup>
  );
};