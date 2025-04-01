
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface SuccessDialogProps {
  open: boolean;
  orderNumber: string;
  orderTotal: number;
}

const SuccessDialog = ({ open, orderNumber, orderTotal }: SuccessDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[450px]">
        <AlertDialogHeader className="space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <AlertDialogTitle className="text-xl text-center">Order Placed Successfully!</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Thank you for your purchase. Your order has been placed and will be processed shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">Order Number:</span>
            <span className="text-sm">{orderNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Total Amount:</span>
            <span className="text-sm">${orderTotal.toFixed(2)}</span>
          </div>
          <Separator className="my-3" />
          <p className="text-sm text-muted-foreground text-center">
            You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="flex gap-3 mt-4">
          <Button asChild className="w-full">
            <Link to="/">
              Continue Shopping
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to={`/order/${orderNumber}`}>
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Order
            </Link>
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
