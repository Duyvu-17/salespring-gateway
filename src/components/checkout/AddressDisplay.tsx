import { MapPin, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddressTypeIcon } from "./AddressTypeIcon";

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

interface AddressDisplayProps {
  address: Address;
  onEditClick: () => void;
}

export const AddressDisplay = ({ address, onEditClick }: AddressDisplayProps) => {
  return (
    <div className="flex justify-between items-start border p-5 rounded-xl hover:shadow-md transition-shadow bg-white">
      <div className="flex gap-3">
        <div className="flex gap-3 items-center">
          <div className="bg-primary/10 p-3 rounded-full flex items-center justify-center w-10 h-10 flex-shrink-0">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="font-medium text-gray-900">{address?.name}</p>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <AddressTypeIcon type={address?.type} />
              <span>
                {address?.type === "office" ? "Văn phòng" : "Nhà"}
              </span>
            </span>
          </div>
          <p className="text-sm text-gray-700">{address?.street}</p>
          <p className="text-sm text-gray-700">
            {address?.district}, {address?.city}
          </p>
          <p className="text-sm text-gray-700">
            {address?.country}, {address?.postalCode}
          </p>
          <p className="text-sm font-medium text-gray-700 mt-1">
            {address?.phone}
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onEditClick}
        className="border-primary/30 text-primary hover:bg-primary/5 hover:text-primary-dark transition-colors"
      >
        <Edit2 className="h-4 w-4 mr-2" />
        Thay đổi
      </Button>
    </div>
  );
};