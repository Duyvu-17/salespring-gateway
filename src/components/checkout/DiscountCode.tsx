
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateDiscountCode } from "@/data/discount-codes";
import { BadgePercent, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DiscountCodeProps {
  onApplyDiscount: (discountAmount: number) => void;
  subtotal: number;
}

const DiscountCode = ({ onApplyDiscount, subtotal }: DiscountCodeProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCode, setAppliedCode] = useState("");
  const { toast } = useToast();
  
  const handleApplyDiscount = () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const discountCode = validateDiscountCode(code.trim().toUpperCase());
      
      if (!discountCode) {
        toast({
          title: "Invalid discount code",
          description: "The discount code you entered is invalid or expired.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      if (subtotal < discountCode.minOrderAmount) {
        toast({
          title: "Cannot apply discount",
          description: `This discount requires a minimum order of $${discountCode.minOrderAmount}.`,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Calculate discount amount
      let discountAmount = subtotal * (discountCode.discountPercentage / 100);
      
      // Apply maximum discount cap if applicable
      if (discountAmount > discountCode.maxDiscountAmount) {
        discountAmount = discountCode.maxDiscountAmount;
      }
      
      onApplyDiscount(discountAmount);
      setAppliedCode(code.trim().toUpperCase());
      
      toast({
        title: "Discount applied!",
        description: `${discountCode.description} has been applied to your order.`,
      });
      
      setIsLoading(false);
    }, 1000);
  };
  
  const handleRemoveDiscount = () => {
    onApplyDiscount(0);
    setAppliedCode("");
    setCode("");
    toast({
      title: "Discount removed",
      description: "The discount code has been removed from your order.",
    });
  };
  
  if (appliedCode) {
    return (
      <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
        <div className="flex items-center">
          <BadgePercent className="h-5 w-5 mr-2 text-primary" />
          <span className="font-medium">{appliedCode} applied</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRemoveDiscount}>
          Remove
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter discount code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1"
      />
      <Button
        onClick={handleApplyDiscount}
        disabled={isLoading || !code.trim()}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
      </Button>
    </div>
  );
};

export default DiscountCode;
