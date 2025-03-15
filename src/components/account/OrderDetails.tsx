import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  CalendarIcon, 
  PackageIcon, 
  TruckIcon, 
  ArrowLeftIcon, 
  DownloadIcon, 
  ClockIcon,
  CircleDollarSignIcon,
  HomeIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Sample order for demonstration
const mockOrders = {
  "ORD-1234567": {
    id: "ORD-1234567",
    date: "2023-05-15",
    total: 1250000,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 750000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80"
      },
      {
        id: 2,
        name: "Smart Watch",
        price: 500000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80"
      }
    ],
    shipping: {
      method: "Express Delivery",
      cost: 50000,
      address: {
        name: "Nguyen Van A",
        street: "123 Le Loi Street",
        city: "Ho Chi Minh City",
        state: "N/A",
        postal: "70000",
        country: "Vietnam",
        phone: "+84 123 456 789"
      },
      trackingNumber: "VN12345678",
      estimatedDelivery: "2023-05-18",
      actualDelivery: "2023-05-17"
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
      status: "Paid"
    }
  },
  "ORD-7654321": {
    id: "ORD-7654321",
    date: "2023-06-02",
    total: 850000,
    status: "processing",
    items: [
      {
        id: 3,
        name: "Smartphone",
        price: 850000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80"
      }
    ],
    shipping: {
      method: "Standard Delivery",
      cost: 30000,
      address: {
        name: "Nguyen Van A",
        street: "123 Le Loi Street",
        city: "Ho Chi Minh City",
        state: "N/A",
        postal: "70000",
        country: "Vietnam",
        phone: "+84 123 456 789"
      },
      trackingNumber: "VN87654321",
      estimatedDelivery: "2023-06-10",
      actualDelivery: null
    },
    payment: {
      method: "PayPal",
      email: "ng***@gmail.com",
      status: "Paid"
    }
  },
  "ORD-9876543": {
    id: "ORD-9876543",
    date: "2023-06-20",
    total: 3450000,
    status: "shipped",
    items: [
      {
        id: 4,
        name: "Laptop",
        price: 3200000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80"
      },
      {
        id: 5,
        name: "Laptop Case",
        price: 250000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=300&q=80"
      }
    ],
    shipping: {
      method: "Express Delivery",
      cost: 50000,
      address: {
        name: "Nguyen Van A",
        street: "123 Le Loi Street",
        city: "Ho Chi Minh City",
        state: "N/A",
        postal: "70000",
        country: "Vietnam",
        phone: "+84 123 456 789"
      },
      trackingNumber: "VN54321678",
      estimatedDelivery: "2023-06-25",
      actualDelivery: null
    },
    payment: {
      method: "Credit Card",
      last4: "5678",
      status: "Paid"
    }
  }
};

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      if (orderId && mockOrders[orderId]) {
        setOrder(mockOrders[orderId]);
      }
      setLoading(false);
    }, 500);
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="w-10 h-10 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Not Found</CardTitle>
          <CardDescription>
            We couldn't find an order with the ID: {orderId}
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Link to="/account?tab=order-details">
            <Button>
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
  
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
        return <PackageIcon className="h-4 w-4 mr-1" />;
      case "processing":
        return <ClockIcon className="h-4 w-4 mr-1" />;
      case "shipped":
        return <TruckIcon className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };
  
  const handleTrackOrder = () => {
    toast({
      title: "Tracking Information",
      description: `Tracking number: ${order.shipping.trackingNumber}. We'll redirect you to the shipping carrier's website.`
    });
  };
  
  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice Download",
      description: "Your invoice is being generated and will be downloaded shortly."
    });
  };
  
  return (
    <div className="space-y-6">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/account">
              <HomeIcon className="h-3 w-3 mr-1" />
              Account
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account?tab=order-details">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{order.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  Order {order.id}
                  <span className={`ml-3 px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Placed on {formatDate(order.date)}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  Invoice
                </Button>
                {(order.status === "shipped" || order.status === "delivered") && (
                  <Button variant="outline" size="sm" onClick={handleTrackOrder}>
                    <TruckIcon className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="flex items-center space-x-3">
                          <div className="w-16 h-16 rounded border overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Shipping Information</h3>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p className="font-medium">{order.shipping.address.name}</p>
                    <p>{order.shipping.address.street}</p>
                    <p>{order.shipping.address.city}, {order.shipping.address.postal}</p>
                    <p>{order.shipping.address.country}</p>
                    <p>{order.shipping.address.phone}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      <span className="font-medium">Method:</span> {order.shipping.method}
                    </p>
                    {order.shipping.trackingNumber && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Tracking:</span> {order.shipping.trackingNumber}
                      </p>
                    )}
                    {order.shipping.estimatedDelivery && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Estimated Delivery:</span> {formatDate(order.shipping.estimatedDelivery)}
                      </p>
                    )}
                    {order.shipping.actualDelivery && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Delivered On:</span> {formatDate(order.shipping.actualDelivery)}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Payment Information</h3>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p>
                      <span className="font-medium">Method:</span> {order.payment.method}
                    </p>
                    {order.payment.last4 && (
                      <p>
                        <span className="font-medium">Card:</span> •••• {order.payment.last4}
                      </p>
                    )}
                    {order.payment.email && (
                      <p>
                        <span className="font-medium">Account:</span> {order.payment.email}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Status:</span> {order.payment.status}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(order.total - order.shipping.cost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(order.shipping.cost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium">Need Help?</h4>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="justify-start">
                    Return Item
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    Report Issue
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    Contact Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link to="/account?tab=order-details">
          <Button variant="outline">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export { OrderDetails };
