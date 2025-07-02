import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderDetails } from "@/components/account/OrderDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Package, Truck, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { getOrderById } from "@/services/order.service";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        if (orderId) {
          const data = await getOrderById(orderId);
          setOrderData(data.order);
          setOrderItems(data.items);
        }
      } catch (error) {
        setOrderData(null);
        setOrderItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleCancelOrder = () => {
    toast({
      title: "Order cancellation requested",
      description:
        "Your cancellation request has been submitted and is being processed.",
    });

    // In real app, make API call to cancel order
    setOrderData((prev) => ({
      ...prev,
      status: "cancellation_requested",
      statusProgress: 10,
    }));
  };

  const handleTrackPackage = () => {
    if (orderData?.tracking?.carrier === "DHL Express") {
      window.open(
        `https://www.dhl.com/en/express/tracking.html?AWB=${orderData.tracking.number}`,
        "_blank"
      );
    } else {
      // Generic tracking fallback
      toast({
        title: "Tracking information",
        description: "Tracking link is not available for this carrier.",
      });
    }
  };

  const getStatusIcon = () => {
    switch (orderData?.status) {
      case "processing":
        return <Clock className="h-6 w-6 text-amber-500" />;
      case "shipped":
        return <Truck className="h-6 w-6 text-blue-500" />;
      case "delivered":
        return <Package className="h-6 w-6 text-green-500" />;
      case "cancelled":
      case "cancellation_requested":
        return <Clock className="h-6 w-6 text-red-500" />;
      default:
        return <ShoppingBag className="h-6 w-6 text-primary" />;
    }
  };

  const getStatusText = () => {
    switch (orderData?.status) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      case "cancellation_requested":
        return "Cancellation Requested";
      default:
        return "Order Placed";
    }
  };

  return (
    <div className="container py-4 md:py-8">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center mb-4"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <ShoppingBag className="mr-2 h-6 w-6 text-primary" />
              Order Details
            </h1>
            <p className="text-muted-foreground">
              View the details of your order
            </p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  {getStatusIcon()}
                  <h2 className="text-xl font-semibold ml-2">
                    {getStatusText()}
                  </h2>
                </div>

                {orderData?.status === "processing" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </Button>
                )}

                {orderData?.status === "shipped" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTrackPackage}
                  >
                    Track Package
                  </Button>
                )}
              </div>

              <Progress
                value={orderData?.statusProgress}
                className="h-2 mb-6"
              />

              <div className="grid grid-cols-3 mb-6 text-center">
                <div
                  className={`${
                    orderData?.statusProgress >= 25
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Clock className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Processed</span>
                </div>
                <div
                  className={`${
                    orderData?.statusProgress >= 50
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Package className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Shipped</span>
                </div>
                <div
                  className={`${
                    orderData?.statusProgress >= 100
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <Truck className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-sm">Delivered</span>
                </div>
              </div>

              {orderData?.tracking && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Order ID:</span>
                      <span className="ml-2 font-medium">{orderData?.id}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carrier:</span>
                      <span className="ml-2 font-medium">
                        {orderData?.tracking?.carrier}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Estimated Delivery:
                      </span>
                      <span className="ml-2 font-medium">
                        {orderData?.estimatedDelivery}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Tracking Number:
                      </span>
                      <span className="ml-2 font-medium">
                        {orderData?.tracking.number}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-semibold">Tracking History</h3>
                  <ul className="space-y-4">
                    {orderData?.tracking?.events?.map((event, index) => (
                      <li key={index} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                        <p className="font-medium">{event.description}</p>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{event.location}</span>
                          <span>{event.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Order Details Component */}
            <OrderDetails
              order={orderData}
              items={orderItems}
              loading={loading}
            />
          </div>

          {/* Order Summary Column */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Return or Exchange
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="mr-2 h-4 w-4" />
                  Delivery Issues
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
