
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Loader2 } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  pointsDiscount: number;
  discountAmount: number;
  additionalFees?: number;
  additionalFeesLabel?: string;
  total: number;
  useRewardPoints: boolean;
  onPlaceOrder: () => void;
  isProcessing: boolean;
}

const OrderSummary = ({
  subtotal,
  shipping,
  pointsDiscount,
  discountAmount,
  additionalFees = 0,
  additionalFeesLabel = "",
  total,
  useRewardPoints,
  onPlaceOrder,
  isProcessing
}: OrderSummaryProps) => {
  const totalDiscount = pointsDiscount + discountAmount;
  
  return (
    <div className="space-y-4">
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {/* Shipping */}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            {/* Additional Fees (e.g. Gift Wrap) if any */}
            {additionalFees > 0 && additionalFeesLabel && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{additionalFeesLabel}</span>
                <span>${additionalFees.toFixed(2)}</span>
              </div>
            )}
            
            {/* Discount */}
            {totalDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${totalDiscount.toFixed(2)}</span>
              </div>
            )}
            
            {/* Reward Points */}
            {useRewardPoints && pointsDiscount > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Reward points applied</span>
                <span>-${pointsDiscount.toFixed(2)}</span>
              </div>
            )}
            
            {/* Promo Code */}
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Promo code applied</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <Separator />
            
            {/* Total */}
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            {/* Place Order Button */}
            <Button
              className="w-full mt-4"
              onClick={onPlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Place Order 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-2">
              By placing your order, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
