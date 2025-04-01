
import { useState } from "react";
import { Truck, Clock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
  icon: React.ReactNode;
}

interface ShippingMethodProps {
  onShippingMethodChange: (shippingMethod: string, shippingCost: number) => void;
}

export const ShippingMethod = ({ onShippingMethodChange }: ShippingMethodProps) => {
  const [selectedShipping, setSelectedShipping] = useState("standard");
  
  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Standard",
      description: "Regular shipping",
      price: 0,
      estimatedDelivery: "2-4 business days",
      icon: <Truck className="h-4 w-4" />,
    },
    {
      id: "express",
      name: "Express",
      description: "Faster shipping",
      price: 10,
      estimatedDelivery: "1-2 business days",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      id: "overnight",
      name: "Overnight",
      description: "Next day delivery",
      price: 25,
      estimatedDelivery: "Next business day",
      icon: <Zap className="h-4 w-4" />,
    },
  ];
  
  const handleShippingChange = (value: string) => {
    setSelectedShipping(value);
    const option = shippingOptions.find(opt => opt.id === value);
    if (option) {
      onShippingMethodChange(option.id, option.price);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Method</CardTitle>
        <CardDescription>Choose how you want your order delivered</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedShipping}
          onValueChange={handleShippingChange}
          className="space-y-2"
        >
          {shippingOptions.map((option) => (
            <div
              key={option.id}
              className={`flex items-center space-x-3 border p-4 rounded-xl transition-colors ${
                selectedShipping === option.id
                  ? "border-primary bg-blue-50/20"
                  : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={option.id} id={option.id} />
              <div className="flex-1">
                <Label
                  htmlFor={option.id}
                  className="flex flex-col cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{option.icon}</span>
                      <span className="font-medium">{option.name}</span>
                    </div>
                    <span className="font-medium">
                      {option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-muted-foreground">
                    <span>{option.description}</span>
                    <span>{option.estimatedDelivery}</span>
                  </div>
                </Label>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ShippingMethod;
