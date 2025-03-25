import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Address {
  name: string;
  street: string;
  district: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface AddressFormProps {
  initialAddress?: Address;
  onSave: (address: Address & { type: 'home' | 'office' }) => void;
}

export const AddressForm = ({ 
  initialAddress = {
    name: "",
    street: "",
    district: "",
    city: "",
    country: "Việt Nam",
    postalCode: "",
    phone: "",
  },
  onSave 
}: AddressFormProps) => {
  const [newAddress, setNewAddress] = useState<Address>(initialAddress);

  const handleSave = () => {
    // Validate form
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.phone) {
      toast("Thiếu thông tin", {
        description: "Vui lòng điền đầy đủ các trường bắt buộc.",
      });
      return;
    }

    onSave({ ...newAddress, type: "home" });
  };

  return (
    <div className="mt-6 border p-5 rounded-xl space-y-4 bg-blue-50/10">
      <h3 className="font-medium text-lg flex items-center gap-2 text-gray-900">
        <Plus className="h-4 w-4 text-primary" />
        Thêm Địa Chỉ Mới
      </h3>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Họ và Tên
        </Label>
        <Input
          id="name"
          value={newAddress.name}
          onChange={(e) =>
            setNewAddress({ ...newAddress, name: e.target.value })
          }
          placeholder="Nhập họ và tên của bạn"
          className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street" className="text-gray-700">
          Địa Chỉ
        </Label>
        <Input
          id="street"
          value={newAddress.street}
          onChange={(e) =>
            setNewAddress({ ...newAddress, street: e.target.value })
          }
          placeholder="Tên đường và số nhà"
          className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="district" className="text-gray-700">
            Quận
          </Label>
          <Input
            id="district"
            value={newAddress.district}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                district: e.target.value,
              })
            }
            placeholder="Quận hoặc phường"
            className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-gray-700">
            Thành Phố
          </Label>
          <Input
            id="city"
            value={newAddress.city}
            onChange={(e) =>
              setNewAddress({ ...newAddress, city: e.target.value })
            }
            placeholder="Thành phố hoặc tỉnh"
            className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-gray-700">
            Quốc Gia
          </Label>
          <Input
            id="country"
            value={newAddress.country}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                country: e.target.value,
              })
            }
            placeholder="Quốc gia"
            className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-gray-700">
            Mã Bưu Chính
          </Label>
          <Input
            id="postalCode"
            value={newAddress.postalCode}
            onChange={(e) =>
              setNewAddress({
                ...newAddress,
                postalCode: e.target.value,
              })
            }
            placeholder="Mã bưu điện"
            className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-700">
          Số Điện Thoại
        </Label>
        <Input
          id="phone"
          value={newAddress.phone}
          onChange={(e) =>
            setNewAddress({ ...newAddress, phone: e.target.value })
          }
          placeholder="Số điện thoại với mã quốc gia"
          className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
        />
      </div>

      <Button
        onClick={handleSave}
        className="w-full mt-6 bg-primary hover:bg-primary-dark transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Lưu Địa Chỉ Mới
      </Button>
    </div>
  );
};