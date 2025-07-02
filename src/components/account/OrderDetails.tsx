import { useNavigate, Link } from "react-router-dom";
import {
  CalendarIcon,
  PackageIcon,
  TruckIcon,
  ArrowLeftIcon,
  DownloadIcon,
  ClockIcon,
  CircleDollarSignIcon,
  HomeIcon,
  RefreshCwIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

const OrderDetails = ({ order, items = [], loading }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="space-y-6">
        <Breadcrumb className="my-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="h-4 w-20" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-16" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-4 w-24" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <Skeleton className="h-16 w-16 rounded" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full max-w-[200px]" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-4 w-12" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-orange-500" />
            Order Not Found
          </CardTitle>
          <CardDescription>
            We couldn't find an order with the ID: {order?.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="text-center max-w-md">
            <InfoIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              No order information available
            </h3>
            <p className="text-muted-foreground mb-6">
              The order ID you're looking for doesn't exist or may have been
              removed.
            </p>
          </div>
        </CardContent>
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
        return <CheckCircleIcon className="h-4 w-4 mr-1" />;
      case "processing":
        return <ClockIcon className="h-4 w-4 mr-1" />;
      case "shipped":
        return <TruckIcon className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getOrderProgressValue = (status: string) => {
    switch (status) {
      case "delivered":
        return 100;
      case "shipped":
        return 66;
      case "processing":
        return 33;
      default:
        return 0;
    }
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(Number(amount)))
      return "-";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Number(amount));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString("vi-VN");
  };

  const handleTrackOrder = () => {
    toast({
      title: "Tracking Information",
      description: `Tracking number: ${order.shipping.trackingNumber}. We'll redirect you to the shipping carrier's website.`,
    });
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice Download",
      description:
        "Your invoice is being generated and will be downloaded shortly.",
    });
  };

  const handleBuyAgain = () => {
    // Add all products from this order to cart
    toast({
      title: "Items added to cart",
      description: `${items.length} items from order ${order.id} have been added to your cart`,
    });

    // In a real app, you would add the items to the cart here
    // Navigate to cart page after adding items
    navigate("/cart");
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleReturnItem = () => {
    toast({
      title: "Return Request",
      description: "We'll guide you through the return process for this order.",
    });
  };

  const handleReportIssue = () => {
    toast({
      title: "Report Issue",
      description:
        "Your issue has been reported. Our support team will contact you shortly.",
    });
  };

  const handleContactSupport = () => {
    navigate("/customer-service");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb className="my-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/account"
              className="inline-flex items-center"
            >
              <HomeIcon className="h-3 w-3 mr-1" />
              Account
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account?tab=order-details">
              Orders
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{order.id}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Order Progress */}
      <Card className="md:col-span-2">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Order Placed</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
            <Progress
              value={getOrderProgressValue(order.status)}
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatDate(order.created_at)}</span>
              {order.status === "shipped" &&
                order.shipping.estimatedDelivery && (
                  <span>
                    Est: {formatDate(order.shipping.estimatedDelivery)}
                  </span>
                )}
              {order.status === "delivered" &&
                order.shipping.actualDelivery && (
                  <span>{formatDate(order.shipping.actualDelivery)}</span>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center">
                  Order {order.id}
                  <span
                    className={`ml-3 px-2 py-1 text-xs rounded-full inline-flex items-center ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order?.status?.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Placed on {formatDate(order.created_at)}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadInvoice}
                >
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Invoice</span>
                </Button>
                {(order.status === "shipped" ||
                  order.status === "delivered") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTrackOrder}
                  >
                    <TruckIcon className="h-4 w-4 mr-1" />
                    <span className="hidden xs:inline">Track</span>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Price
                        </TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Quantity
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items?.map((item) => (
                        <TableRow key={item?.order_item_id}>
                          <TableCell>{item?.product_name}</TableCell>
                          <TableCell>
                            {formatCurrency(item?.unit_price)}
                          </TableCell>
                          <TableCell>{item?.quantity}</TableCell>
                          <TableCell>
                            {formatCurrency(item?.total_price)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Shipping Information</h3>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p className="font-medium">
                      {order?.shipping_first_name || ""}{" "}
                      {order?.shipping_last_name || ""}
                    </p>
                    <p>{order?.shipping_address || ""}</p>
                    <p>
                      {order?.shipping_city || ""}{" "}
                      {order?.shipping_postal_code || ""}
                    </p>
                    <p>{order?.shipping_country || ""}</p>
                    <p>{order?.shipping_phone || ""}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      <span className="font-medium">Phương thức giao hàng :</span>{" "}
                      {order?.shipping_method?.method_name || ""}
                    </p>
                    {order?.shipping_method?.description && (
                      <p className="text-sm text-muted-foreground">
                        {order.shipping_method.description}
                      </p>
                    )}
                    {order?.shipping_method?.base_cost && (
                      <p>
                        <span className="font-medium">Giá gốc:</span>{" "}
                        {formatCurrency(order.shipping_method.base_cost)}
                      </p>
                    )}
                    {order?.shipping_method?.estimated_days_min !==
                      undefined && (
                      <p>
                        <span className="font-medium">Dự tính :</span>{" "}
                        {order.shipping_method.estimated_days_min}
                        {order.shipping_method.estimated_days_max !==
                        order.shipping_method.estimated_days_min
                          ? ` - ${order.shipping_method.estimated_days_max}`
                          : ""}
                      </p>
                    )}
                    {order?.shipping?.trackingNumber && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Tracking:</span>{" "}
                        {order?.shipping?.trackingNumber}
                      </p>
                    )}
                    {order?.shipping?.estimatedDelivery && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Estimated Delivery:</span>{" "}
                        {formatDate(order?.shipping?.estimatedDelivery)}
                      </p>
                    )}
                    {order?.shipping?.actualDelivery && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Delivered On:</span>{" "}
                        {formatDate(order?.shipping?.actualDelivery)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Payment Information</h3>
                  <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                    <p>
                      <span className="font-medium">Method:</span>{" "}
                      {order?.payment_method || ""}
                    </p>
                    {order?.payment?.last4 && (
                      <p>
                        <span className="font-medium">Card:</span> ••••{" "}
                        {order?.payment?.last4}
                      </p>
                    )}
                    {order?.payment?.email && (
                      <p>
                        <span className="font-medium">Account:</span>{" "}
                        {order?.payment?.email}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {order?.payment_status || ""}
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
                <span>{formatCurrency(order?.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatCurrency(order?.shipping_amount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order?.total_amount)}</span>
              </div>

              <Button
                className="w-full mt-4"
                variant="default"
                onClick={handleBuyAgain}
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" /> Buy Again
              </Button>

              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium">Need Help?</h4>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleReturnItem}
                  >
                    Return Item
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleReportIssue}
                  >
                    Report Issue
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleContactSupport}
                  >
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
