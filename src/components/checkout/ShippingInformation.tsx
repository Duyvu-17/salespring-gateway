import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { MapPin, Edit2, Plus, Check, Home, Briefcase } from "lucide-react";

const ShippingInformation = () => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    district: "",
    city: "",
    country: "Việt Nam",
    postalCode: "",
    phone: "",
  });

  const [savedAddresses, setSavedAddresses] = useState([
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

  const handleNewAddressSave = () => {
    // Validate form
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.phone) {
      toast("Thiếu thông tin", {
        description: "Vui lòng điền đầy đủ các trường bắt buộc.",
      });
      return;
    }

    const addressId = `address_${Date.now()}`;

    // Add new address
    setSavedAddresses([...savedAddresses, { id: addressId, ...newAddress, type: "home" }]);
    setSelectedAddress(addressId);

    toast("Địa chỉ đã được thêm", {
      description: "Địa chỉ giao hàng mới của bạn đã được lưu.",
    });

    setShowAddressDialog(false);

    // Reset form
    setNewAddress({
      name: "",
      street: "",
      district: "",
      city: "",
      country: "Việt Nam",
      postalCode: "",
      phone: "",
    });
  };

  const currentAddress = savedAddresses.find((a) => a.id === selectedAddress) || savedAddresses[0];

  const getAddressIcon = (type) => {
    return type === "office" ? (
      <Briefcase className="h-4 w-4 text-primary" />
    ) : (
      <Home className="h-4 w-4 text-primary" />
    );
  };

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
          {/* Current selected address */}
          <div className="flex justify-between items-start border p-5 rounded-xl hover:shadow-md transition-shadow bg-white">
            <div className="flex gap-3">
              <div className="flex gap-3 items-center">
                <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-gray-900">
                    {currentAddress.name}
                  </p>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    {getAddressIcon(currentAddress.type)}
                    <span>
                      {currentAddress.type === "office" ? "Văn phòng" : "Nhà"}
                    </span>
                  </span>
                </div>
                <p className="text-sm text-gray-700">{currentAddress.street}</p>
                <p className="text-sm text-gray-700">
                  {currentAddress.district}, {currentAddress.city}
                </p>
                <p className="text-sm text-gray-700">
                  {currentAddress.country}, {currentAddress.postalCode}
                </p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  {currentAddress.phone}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddressDialog(true)}
              className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary-dark transition-colors"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Thay đổi
            </Button>
          </div>
        </div>

        {/* Address selection dialog */}
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
              <RadioGroup
                value={selectedAddress}
                onValueChange={setSelectedAddress}
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
                            {getAddressIcon(address.type)}
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
                    onClick={() => {
                      setNewAddress({
                        name: "",
                        street: "",
                        district: "",
                        city: "",
                        country: "Việt Nam",
                        postalCode: "",
                        phone: "",
                      });

                      // This will cause the dialog content to change to the add address form
                      setSelectedAddress("new");
                    }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm Địa Chỉ Mới
                  </Button>
                </div>
              </RadioGroup>

              {/* Add new address form */}
              {selectedAddress === "new" && (
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
                    onClick={handleNewAddressSave}
                    className="w-full mt-6 bg-primary hover:bg-primary-dark transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Lưu Địa Chỉ Mới
                  </Button>
                </div>
              )}
            </div>

            <DialogFooter className="p-4 bg-gray-50 border-t">
              <Button
                variant="outline"
                onClick={() => setShowAddressDialog(false)}
                className="border-gray-300"
              >
                Hủy
              </Button>
              {selectedAddress !== "new" && (
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
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;