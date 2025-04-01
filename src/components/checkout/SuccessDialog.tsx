
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      <AlertDialogContent className="max-w-[500px] p-0 overflow-hidden">
        {/* Colorful success header with animation */}
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-white">
          <div className="animate-fadeInUp">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm mb-4">
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Order Placed Successfully!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base text-white/90 mt-2">
              Thank you for your purchase. Your order has been placed and will be processed shortly.
            </AlertDialogDescription>
          </div>
        </div>

        <div className="p-6">
          <AlertDialogHeader>
            {/* Order details card with subtle animation */}
            <div className="mt-2 rounded-lg border bg-card p-4 shadow-sm animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Order Number:</span>
                <span className="font-bold text-primary">{orderNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold text-lg">${orderTotal.toFixed(2)}</span>
              </div>
              <Separator className="my-3" />
              <p className="text-sm text-muted-foreground text-center">
                You will receive an email confirmation shortly.
              </p>
            </div>
          </AlertDialogHeader>

          {/* Order confirmation image */}
          <div className="my-4 overflow-hidden rounded-lg">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30">
                <ShoppingBag className="h-16 w-16 text-green-600/50" />
              </div>
            </AspectRatio>
          </div>

          <div className="flex gap-3 mt-6">
            <Button asChild className="w-full shadow-sm transition-all hover:shadow-md">
              <Link to="/">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-green-200 hover:bg-green-50 hover:text-green-700 dark:border-green-900 dark:hover:bg-green-900/20">
              <Link to={`/order/${orderNumber}`} className="flex items-center justify-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Order
              </Link>
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
