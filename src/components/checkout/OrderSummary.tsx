
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  pointsDiscount: number;
  discountAmount?: number;
  total: number;
  useRewardPoints: boolean;
  onPlaceOrder: () => void;
}

const OrderSummary = ({ 
  subtotal, 
  shipping, 
  pointsDiscount, 
  discountAmount = 0,
  total, 
  useRewardPoints, 
  onPlaceOrder 
}: OrderSummaryProps) => {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {useRewardPoints && (
            <div className="flex justify-between text-green-600">
              <span>Reward Points Discount</span>
              <span>-${pointsDiscount.toFixed(2)}</span>
            </div>
          )}
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo Code Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="pt-4">
          <Button 
            className="w-full" 
            size="lg"
            onClick={onPlaceOrder}
          >
            Place Order
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-2">
            By placing your order, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
