import { format } from "date-fns";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Download, ArrowRight, CreditCard } from "lucide-react";

const OrderHistoryItem = ({ order, getStatusIcon }) => {
  const tax = order.total * 0.1;
  const grandTotal = order.total + tax;
  const progressValue = order.status === "delivered" ? 100 : order.status === "shipped" ? 75 : 25;

  return (
    <CardFooter className="flex justify-between bg-muted/30 pt-4 gap-2 flex-wrap">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Payment Method</p>
        <p className="text-sm">{order.payment}</p>
      </div>

      <div className="space-x-2">
        {order.status === "delivered" && (
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Invoice
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="default" size="sm">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Order {order.id}</SheetTitle>
              <SheetDescription>
                Placed on {format(new Date(order.date), "MMMM d, yyyy")}
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Order Status</h3>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </div>

                {(order.status === "shipped" || order.status === "processing") && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">
                      Estimated Delivery: {format(new Date(order.estimatedDelivery), "MMMM d, yyyy")}
                    </p>
                    <Progress value={progressValue} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-3 border-b">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                <p className="text-sm">{order.address}</p>
              </div>

              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                <p className="text-sm flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {order.payment}
                </p>
              </div>

              <Separator />
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">$0.00</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {order.status === "delivered" && (
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </CardFooter>
  );
};

export default OrderHistoryItem;
