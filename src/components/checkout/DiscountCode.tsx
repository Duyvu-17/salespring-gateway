
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, X, Tag } from "lucide-react";
import { toast } from "sonner";
import { validateDiscountCode, calculateDiscount } from "@/data/discount-codes";

interface DiscountCodeProps {
  onApplyDiscount: (amount: number) => void;
  subtotal: number;
}

const DiscountCode = ({ onApplyDiscount, subtotal }: DiscountCodeProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleApplyCode = () => {
    if (!code.trim()) {
      toast("Please enter a discount code");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const discountCode = validateDiscountCode(code.trim().toUpperCase());
      
      if (discountCode && discountCode.isActive) {
        const { discountAmount } = calculateDiscount(subtotal, discountCode);
        
        setAppliedDiscount(discountAmount);
        setAppliedCode(code.trim().toUpperCase());
        setIsValid(true);
        onApplyDiscount(discountAmount);
        
        toast("Discount applied", {
          description: `${discountCode.discountPercentage}% discount applied to your order.`,
        });
      } else {
        setIsValid(false);
        setAppliedDiscount(0);
        onApplyDiscount(0);
        
        toast("Invalid code", {
          description: "The discount code is invalid or expired.",
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  const handleRemoveCode = () => {
    setCode("");
    setAppliedCode("");
    setAppliedDiscount(0);
    setIsValid(null);
    onApplyDiscount(0);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="discount-code">Discount Code</Label>
        <div className="flex mt-1.5 relative">
          {isValid === true && appliedCode && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Tag className="h-4 w-4 text-primary" />
            </div>
          )}
          <Input
            id="discount-code"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${
              isValid === true && appliedCode ? "pl-9" : ""
            } ${
              isValid === true ? "border-green-500 focus-visible:ring-green-500" : 
              isValid === false ? "border-red-400 focus-visible:ring-red-400" : ""
            }`}
            disabled={!!appliedCode}
          />
          {!appliedCode ? (
            <Button 
              onClick={handleApplyCode} 
              disabled={isLoading || !code.trim()}
              className="ml-2 min-w-[80px]"
            >
              {isLoading ? "..." : "Apply"}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleRemoveCode}
              className="ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isValid === true && appliedCode && (
        <div className="flex items-center text-sm text-green-600 animate-fade-in">
          <Check className="h-4 w-4 mr-1.5" />
          <span>
            Code <span className="font-medium">{appliedCode}</span> applied for{" "}
            <span className="font-medium">${appliedDiscount.toFixed(2)}</span> off
          </span>
        </div>
      )}
      
      {isValid === false && (
        <div className="flex items-center text-sm text-red-500 animate-fade-in">
          <X className="h-4 w-4 mr-1.5" />
          <span>Invalid or expired discount code</span>
        </div>
      )}
    </div>
  );
};

export default DiscountCode;
