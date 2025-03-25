import { useState } from "react";
import { MapPin } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { AddressDisplay } from "./AddressDisplay";
import { AddressSelection } from "./AddressSelection";

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

const ShippingInformation = () => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([
    {
      id: "default",
      name: "Nguyễn Thanh",
      street: "123 Đường Nguyễn Huệ",
      district: "Quận 1",
      city: "Thành phố Hồ Chí Minh",
      country: "Việt Nam",
      postalCode: "70000",
      phone: "+84 123 456 789",
      type: "home",
    },
    {
      id: "office",
      name: "Nguyễn Thanh (Văn phòng)",
      street: "456 Đường Lê Lợi",
      district: "Quận 3",
      city: "Thành phố Hồ Chí Minh",
      country: "Việt Nam",
      postalCode: "70000",
      phone: "+84 987 654 321",
      type: "office",
    },
  ]);

  const handleNewAddressSave = (newAddress: Address) => {
    setSavedAddresses([...savedAddresses, newAddress]);
    toast("Địa chỉ đã được thêm", {
      description: "Địa chỉ giao hàng mới của bạn đã được lưu.",
    });
  };

  const currentAddress = savedAddresses.find((a) => a.id === selectedAddress) || savedAddresses[0];

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
                savedAddresses={savedAddresses}
                selectedAddress={selectedAddress}
                onAddressChange={setSelectedAddress}
                onNewAddressSave={handleNewAddressSave}
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