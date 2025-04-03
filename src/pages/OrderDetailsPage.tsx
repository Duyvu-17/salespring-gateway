
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderDetails } from "@/components/account/OrderDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
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
            <p className="text-muted-foreground">View the details of your order</p>
          </div>
        )}
      </div>
      <OrderDetails />
    </div>
  );
};

export default OrderDetailsPage;
