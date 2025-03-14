import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Download,
  Package,
  TruckIcon,
  CheckCircle,
  Truck,
  AlertTriangle,
  Clock,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import OrderHistoryItem from "@/pages/OrderHistoryItem";
import { Progress } from "../ui/progress";
import { Separator } from "@radix-ui/react-separator";

export const OrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case "shipped":
        return <Truck className="text-blue-500 h-5 w-5" />;
      case "processing":
        return <Clock className="text-amber-500 h-5 w-5" />;
      case "cancelled":
        return <AlertTriangle className="text-red-500 h-5 w-5" />;
      default:
        return null;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
        );
      case "shipped":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Shipped</Badge>;
      case "processing":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">Processing</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const orders = [
    {
      id: "#ORD-12345",
      date: "May 15, 2023",
      status: "delivered",
      total: 129.99,
      payment: "Credit Card",
      estimatedDelivery: "May 18, 2023",
      address: "123 Main St, City, Country",
      items: [
        {
          id: 1,
          name: "Wireless Earbuds Pro",
          quantity: 1,
          price: 129.99,
          image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
    },
    {
      id: "#ORD-12346",
      date: "Apr 28, 2023",
      status: "processing",
      total: 399.99,
      payment: "PayPal",
      estimatedDelivery: "May 10, 2023",
      address: "456 Elm St, City, Country",
      items: [
        {
          id: 2,
          name: "Smart Watch Pro",
          quantity: 1,
          price: 399.99,
          image: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        },
      ],
    },
  ];


  return (
    <>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your recent orders</CardDescription>
      </CardHeader>
      {/* <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{order.id}</h3>
                    <Badge
                      variant={
                        order.status === "delivered" ? "default" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <OrderHistoryItem order={order} getStatusIcon={getStatusIcon}/>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      {order.status === "delivered" ? (
                        <Package className="h-4 w-4 mr-1" />
                      ) : (
                        <TruckIcon className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {order.status === "delivered"
                          ? "Delivered on May 18, 2023"
                          : "Expected delivery on May 10, 2023"}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent> */}
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
                        src={item?.image}
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
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

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
                                  src={item?.image}
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
    </>
  );
};
