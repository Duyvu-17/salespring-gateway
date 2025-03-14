
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface SuccessDialogProps {
  open: boolean;
}

const SuccessDialog = ({ open }: SuccessDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
          <AlertDialogDescription>
            Thank you for your purchase. Your order has been placed and will be processed shortly.
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SuccessDialog;
