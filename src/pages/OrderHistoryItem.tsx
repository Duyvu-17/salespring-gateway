
import { format } from "date-fns";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Download, ArrowRight, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderHistoryItem = ({ order, getStatusIcon }) => {
  const tax = order.total * 0.1;
  const grandTotal = order.total + tax;
  const progressValue = order.status === "delivered" ? 100 : order.status === "shipped" ? 75 : 25;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/order/${order.id}`);
  };

  return (
    <CardFooter className="flex justify-between bg-muted/30 pt-4 gap-2 flex-wrap">
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">Payment Method</p>
        <p className="text-sm">{order.payment}</p>
      </div>

      <div className="space-x-2 flex flex-wrap gap-2">
        {order.status === "delivered" && (
          <Button variant="outline" size="sm" className="h-8 px-2 sm:px-3">
            <Download className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden xs:inline">Invoice</span>
          </Button>
        )}

        <Button 
          variant="default" 
          size="sm" 
          onClick={handleViewDetails}
          className="h-8 px-2 sm:px-3"
        >
          <span className="hidden xs:inline">View Details</span>
          <span className="xs:hidden">Details</span>
          <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </CardFooter>
  );
};

export default OrderHistoryItem;
