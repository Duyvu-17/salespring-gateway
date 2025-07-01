import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Loader2,
  ShieldCheck,
  CreditCard,
  TruckIcon,
} from "lucide-react";

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
  orderItems: {
    product_name: string;
    quantity: number;
    unit_price: number;
  }[];
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
  isProcessing,
  orderItems,
}: OrderSummaryProps) => {
  const totalDiscount = pointsDiscount + discountAmount;

  return (
    <div className="space-y-4">
      <Card className="sticky top-24">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="font-semibold mb-2">Sản phẩm</div>
              <ul className="divide-y">
                {orderItems?.map((item, idx) => (
                  <li key={idx} className="py-2 flex justify-between text-sm">
                    <span>
                      {item.product_name}{" "}
                      <span className="text-muted-foreground">
                        x{item.quantity}
                      </span>
                    </span>
                    <span>${(item.unit_price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

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
                <span className="text-muted-foreground">
                  {additionalFeesLabel}
                </span>
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

            {/* Delivery Information */}
            <div className="bg-muted/40 p-3 rounded-md text-xs space-y-1 mt-2">
              <div className="flex items-center">
                <TruckIcon className="h-3 w-3 mr-1.5" />
                <span>Estimated delivery: 2-4 business days</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-3 w-3 mr-1.5" />
                <span>Secure payment processed by our payment partners</span>
              </div>
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
              By placing your order, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
