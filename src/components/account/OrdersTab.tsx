
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Package, TruckIcon } from "lucide-react";

export const OrdersTab = () => {
  const orders = [
    {
      id: "#ORD-12345",
      date: "May 15, 2023",
      status: "Delivered",
      total: "$129.99",
      items: [
        { name: "Wireless Earbuds Pro", quantity: 1, price: "$129.99" }
      ]
    },
    {
      id: "#ORD-12346",
      date: "Apr 28, 2023",
      status: "Processing",
      total: "$399.99",
      items: [
        { name: "Smart Watch Pro", quantity: 1, price: "$399.99" }
      ]
    },
    {
      id: "#ORD-12347",
      date: "Mar 12, 2023",
      status: "Delivered",
      total: "$359.98",
      items: [
        { name: "Wireless Bluetooth Speaker", quantity: 1, price: "$179.99" },
        { name: "Portable SSD Drive", quantity: 1, price: "$179.99" }
      ]
    }
  ];
  
  return (
    <>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and manage your recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order.id} className="border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{order.id}</h3>
                    <Badge variant={order.status === "Delivered" ? "default" : "outline"}>
                      {order.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  {order.status === "Delivered" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Invoice
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      {order.status === "Delivered" ? (
                        <Package className="h-4 w-4 mr-1" />
                      ) : (
                        <TruckIcon className="h-4 w-4 mr-1" />
                      )}
                      <span>
                        {order.status === "Delivered" 
                          ? "Delivered on May 18, 2023" 
                          : "Expected delivery on May 10, 2023"}
                      </span>
                    </div>
                  </div>
                  <p className="font-bold">{order.total}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  );
};
