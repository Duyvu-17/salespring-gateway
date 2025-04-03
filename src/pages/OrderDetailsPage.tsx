
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderDetails } from "@/components/account/OrderDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="container py-4 md:py-8">
        <div className="flex justify-center">
          <div className="w-10 h-10 border-t-2 border-primary border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl md:text-3xl font-bold">Order Details</h1>
      </div>
      <OrderDetails />
    </div>
  );
};

export default OrderDetailsPage;
