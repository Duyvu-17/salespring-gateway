import { Separator } from "@radix-ui/react-separator";
import { ArrowRight, CreditCard, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Sheet } from "@/components/ui/sheet";
import { SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SheetTitle } from "@/components/ui/sheet";
import { SheetDescription } from "@/components/ui/sheet";
import { SheetHeader } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import getStatusIcon from "./getStatusIcon";
import getStatusBadge from "./getStatusBadge";
import { Progress } from "@radix-ui/react-progress";
import { useState } from "react";
export const Order = () => {
  const [orders, setOrders] = useState([
    {
      id: "1234567",
      date: "March 15, 2023",
      status: "delivered",
      items: [
        {
          id: 1,
          name: "Premium Headphones",
          quantity: 1,
          price: 299.99,
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ],
      total: 299.99,
      address: "123 Main St, Anytown, USA 12345",
      payment: "Visa ending in 4242",
    },
    {
      id: "2345678",
      date: "March 22, 2023",
      status: "shipped",
      items: [
        {
          id: 2,
          name: "Wireless Keyboard",
          quantity: 1,
          price: 129.99,
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
          id: 3,
          name: "Wireless Mouse",
          quantity: 1,
          price: 49.99,
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ],
      total: 179.98,
      address: "123 Main St, Anytown, USA 12345",
      payment: "Mastercard ending in 6789",
    },
    {
      id: "3456789",
      date: "April 5, 2023",
      status: "processing",
      items: [
        {
          id: 4,
          name: "Ultra HD Monitor",
          quantity: 1,
          price: 499.99,
          image:
            "https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
      ],
      total: 499.99,
      address: "123 Main St, Anytown, USA 12345",
      payment: "PayPal",
    },
  ]);
  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View and manage your recent orders
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50 pb-4">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <CardTitle className="text-sm flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {order.date} · {getStatusBadge(order.status)}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">Total</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                            <p className="font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between bg-muted/30 pt-4 gap-2 flex-wrap">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      Payment Method
                    </p>
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
                          <SheetTitle>Order #{order.id}</SheetTitle>
                          <SheetDescription>
                            Placed on {order.date}
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6 space-y-6">
                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Order Status
                            </h3>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status}</span>
                            </div>

                            {(order.status === "shipped" ||
                              order.status === "processing") && (
                              <div className="mt-4 space-y-2">
                                <p className="text-sm">
                                  Estimated Delivery: April 12, 2023
                                </p>
                                <Progress
                                  value={order.status === "shipped" ? 75 : 25}
                                />
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
                                <div
                                  key={item.id}
                                  className="flex gap-4 pb-3 border-b"
                                >
                                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      Qty: {item.quantity}
                                    </p>
                                    <p className="font-medium mt-1">
                                      ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Shipping Address
                            </h3>
                            <p className="text-sm">
                              John Doe
                              <br />
                              {order.address}
                            </p>
                          </div>

                          <Separator />

                          <div>
                            <h3 className="text-sm font-medium mb-2">
                              Payment Method
                            </h3>
                            <p className="text-sm flex items-center">
                              <CreditCard className="h-4 w-4 mr-2" />
                              {order.payment}
                            </p>
                          </div>

                          <Separator />

                          <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Subtotal</span>
                              <span className="text-sm">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Shipping</span>
                              <span className="text-sm">$0.00</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm">Tax</span>
                              <span className="text-sm">
                                ${(order.total * 0.1).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                              <span>Total</span>
                              <span>${(order.total * 1.1).toFixed(2)}</span>
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
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Order;
