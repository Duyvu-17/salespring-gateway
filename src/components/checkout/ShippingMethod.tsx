import { useState, useEffect } from "react";
import { Truck, Clock, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllShippingMethods } from "@/store/slices/shippingMethodSlice";
import type { RootState, AppDispatch } from "@/store";

interface ShippingMethodProps {
  onShippingMethodChange: (
    shippingMethod: string,
    shippingCost: number
  ) => void;
}

export const ShippingMethod = ({
  onShippingMethodChange,
}: ShippingMethodProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: shippingOptions, loading } = useSelector(
    (state: RootState) => state.shippingMethod
  );
  const [selectedShipping, setSelectedShipping] = useState<string>("");

  useEffect(() => {
    dispatch(fetchAllShippingMethods());
  }, [dispatch]);

  useEffect(() => {
    if (shippingOptions.length > 0 && !selectedShipping) {
      setSelectedShipping(String(shippingOptions[0].shipping_method_id));
      onShippingMethodChange(
        String(shippingOptions[0].shipping_method_id),
        Number(shippingOptions[0].base_cost)
      );
    }
  }, [shippingOptions, selectedShipping, onShippingMethodChange]);

  const handleShippingChange = (value: string) => {
    setSelectedShipping(value);
    const option = shippingOptions.find(
      (opt) => String(opt.shipping_method_id) === value
    );
    if (option) {
      onShippingMethodChange(
        String(option.shipping_method_id),
        Number(option.base_cost)
      );
    }
  };

  // Icon mapping demo (bạn có thể tuỳ chỉnh theo name/type)
  const getIcon = (name: string) => {
    if (name.toLowerCase().includes("express"))
      return <Clock className="h-4 w-4" />;
    if (name.toLowerCase().includes("overnight"))
      return <Zap className="h-4 w-4" />;
    return <Truck className="h-4 w-4" />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
        <CardDescription>
          Choose how you want your order delivered
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Đang tải phương thức giao hàng...</div>
        ) : (
          <RadioGroup
            value={selectedShipping}
            onValueChange={handleShippingChange}
            className="space-y-2"
          >
            {shippingOptions?.map((option) => (
              <div
                key={option.shipping_method_id}
                className={`flex items-center space-x-3 border p-4 rounded-xl transition-colors ${
                  String(selectedShipping) === String(option.shipping_method_id)
                    ? "border-primary bg-blue-50/20"
                    : "border-gray-200"
                }`}
              >
                <RadioGroupItem
                  value={String(option.shipping_method_id)}
                  id={String(option.shipping_method_id)}
                />
                <div className="flex-1">
                  <Label
                    htmlFor={String(option.shipping_method_id)}
                    className="flex flex-col cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-primary">
                          {getIcon(option.method_name)}
                        </span>
                        <span className="font-medium">
                          {option.method_name}
                        </span>
                      </div>
                      <span className="font-medium">
                        {Number(option.base_cost) === 0
                          ? "Free"
                          : `$${option.base_cost}`}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                      <span>{option.description}</span>
                      <span>
                        {option.estimated_days_min === option.estimated_days_max
                          ? `${option.estimated_days_min} days`
                          : `${option.estimated_days_min}-${option.estimated_days_max} days`}
                      </span>
                    </div>
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default ShippingMethod;
