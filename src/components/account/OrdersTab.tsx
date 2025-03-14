import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Package, TruckIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import OrderHistoryItem from "@/pages/OrderHistoryItem";

export const OrdersTab = () => {
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu đơn hàng được chọn

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
          image: "https://via.placeholder.com/64",
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
          image: "https://via.placeholder.com/64",
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
      <CardContent>
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
                  {/* <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      {selectedOrder && <OrderHistoryItem order={selectedOrder} getStatusIcon={() => null} />}
                    </SheetContent>
                  </Sheet> */}
                  {/* <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>Order Details</SheetTitle>
                      </SheetHeader>
                      {selectedOrder ? (
                        <OrderHistoryItem
                          order={selectedOrder}
                          getStatusIcon={() => null}
                        />
                      ) : (
                        <p className="text-center">Loading...</p>
                      )}
                    </SheetContent>
                  </Sheet> */}
                  <OrderHistoryItem order={order} getStatusIcon={getStatusIcon}/>

                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                  )}
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
      </CardContent>
    </>
  );
};
