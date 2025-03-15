import { useState } from "react";
import { Link } from "react-router-dom"; 
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, Package, Truck, BarChart4, CircleDollarSign, SearchIcon, FileDown } from "lucide-react";

export const OrderDetailsTab = () => {
  const { toast } = useToast();
  const [orderNumber, setOrderNumber] = useState("");
  const [timeFrame, setTimeFrame] = useState("last30days");
  const [orderStatus, setOrderStatus] = useState("all");
  
  // Sample order data (in a real app, this would come from an API)
  const orders = [
    {
      id: "ORD-1234567",
      date: "2023-05-15",
      total: 1250000,
      status: "delivered",
      items: 3
    },
    {
      id: "ORD-7654321",
      date: "2023-06-02",
      total: 850000,
      status: "processing",
      items: 2
    },
    {
      id: "ORD-9876543",
      date: "2023-06-20",
      total: 3450000,
      status: "shipped",
      items: 4
    }
  ];
  
  const handleSearch = () => {
    toast("Searching orders", {
      description: `Searching for order ${orderNumber || "all orders"} in the ${timeFrame} timeframe with status ${orderStatus}`
    });
  };
  
  const handleExport = () => {
    toast("Export started", {
      description: "Your order details are being exported. You'll receive a download link shortly."
    });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Package className="h-4 w-4 mr-1" />;
      case "processing":
        return <Clock className="h-4 w-4 mr-1" />;
      case "shipped":
        return <Truck className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
        <CardDescription>View and manage your order history</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by order number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-48">
                  <Select value={timeFrame} onValueChange={setTimeFrame}>
                    <SelectTrigger>
                      <SelectValue placeholder="Time Frame" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last30days">Last 30 days</SelectItem>
                      <SelectItem value="last3months">Last 3 months</SelectItem>
                      <SelectItem value="last6months">Last 6 months</SelectItem>
                      <SelectItem value="thisyear">This year</SelectItem>
                      <SelectItem value="lastyear">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-48">
                  <Select value={orderStatus} onValueChange={setOrderStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All statuses</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSearch} className="w-full md:w-auto">
                  <SearchIcon className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                            {new Date(order.date).toLocaleDateString('vi-VN')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center">
                            <CircleDollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                            {formatCurrency(order.total)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {order.items} items
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/order/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {orders.length} of {orders.length} orders
                </p>
                <Button variant="outline" onClick={handleExport}>
                  <FileDown className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <BarChart4 className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Order Summary</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Orders:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">In Progress:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cancelled:</span>
                      <span className="font-medium">0</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <CircleDollarSign className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Spending</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Spent:</span>
                      <span className="font-medium">{formatCurrency(5550000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Order:</span>
                      <span className="font-medium">{formatCurrency(241304)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Largest Order:</span>
                      <span className="font-medium">{formatCurrency(3450000)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Package className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Products</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Items:</span>
                      <span className="font-medium">42</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Most Purchased:</span>
                      <span className="font-medium">Smartphones</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Favorite Category:</span>
                      <span className="font-medium">Electronics</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Monthly Spending</h3>
                <div className="h-60 flex items-center justify-center bg-muted/30 rounded-md">
                  <p className="text-muted-foreground">Chart visualization would appear here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </>
  );
};
