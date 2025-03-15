
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  CreditCard,
  Trash2,
  Check,
  Wallet,
  Banknote,
  Edit,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/context/ThemeContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EditPaymentMethod from "./EditPaymentMethod";
import getPaymentIcon from "./getPaymentIcon";

interface PaymentMethod {
  id: string;
  type: string;
  lastFour?: string;
  expiryDate?: string;
  holderName?: string;
  isDefault: boolean;
  billingAddress?: string;
  phoneNumber?: string;
  email?: string;
}

export const PaymentMethodsTab = () => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentEditPaymentMethod, setCurrentEditPaymentMethod] = useState<PaymentMethod | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<string | null>(null);
  
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "visa1",
      type: "visa",
      lastFour: "4242",
      expiryDate: "04/25",
      holderName: "Nguyen Van A",
      isDefault: true,
      billingAddress: "123 Nguyen Hue, District 1, Ho Chi Minh City",
    },
    {
      id: "mc1",
      type: "mastercard",
      lastFour: "8888",
      expiryDate: "07/24",
      holderName: "Nguyen Thi B",
      isDefault: false,
      billingAddress: "456 Le Loi, District 1, Ho Chi Minh City",
    },
    {
      id: "momo1",
      type: "momo",
      phoneNumber: "+84 123 456 789",
      holderName: "Tran Van C",
      isDefault: false,
    },
    {
      id: "vnpay1",
      type: "vnpay",
      holderName: "VietcomBank",
      isDefault: false,
    },
  ]);

  const handleAddCard = () => {
    setCurrentEditPaymentMethod(undefined);
    setShowEditDialog(true);
  };

  const handleEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setCurrentEditPaymentMethod(paymentMethod);
    setShowEditDialog(true);
  };

  const handleSavePaymentMethod = (paymentMethod: PaymentMethod) => {
    if (currentEditPaymentMethod) {
      // Update existing payment method
      setPaymentMethods(
        paymentMethods.map((pm) =>
          pm.id === currentEditPaymentMethod.id ? paymentMethod : pm
        )
      );
      
      toast({
        title: "Payment method updated",
        description: "Your payment method has been updated successfully.",
      });
    } else {
      // Add new payment method
      setPaymentMethods([...paymentMethods, paymentMethod]);
      
      toast({
        title: "Payment method added",
        description: "Your new payment method has been added successfully.",
      });
    }
  };

  const handleDeleteConfirm = (id: string) => {
    setPaymentToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleRemoveCard = () => {
    if (paymentToDelete) {
      setPaymentMethods(paymentMethods.filter(pm => pm.id !== paymentToDelete));
      
      toast({
        title: "Payment method removed",
        description: "Your payment method has been removed successfully.",
      });
      
      setShowDeleteConfirm(false);
      setPaymentToDelete(null);
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const getPaymentMethodIcon = (type: string) => {
    switch (type) {
      case "visa":
      case "mastercard":
        return <div className="bg-blue-100 p-3 rounded-md"><CreditCard className="h-5 w-5 text-blue-600" /></div>;
      case "momo":
        return <div className="bg-pink-100 p-3 rounded-md"><Wallet className="h-5 w-5 text-pink-600" /></div>;
      case "vnpay":
        return <div className="bg-purple-100 p-3 rounded-md"><Banknote className="h-5 w-5 text-purple-600" /></div>;
      case "zalopay":
        return <div className="bg-blue-100 p-3 rounded-md"><Wallet className="h-5 w-5 text-blue-600" /></div>;
      default:
        return <div className="bg-gray-100 p-3 rounded-md"><CreditCard className="h-5 w-5 text-gray-600" /></div>;
    }
  };

  const getPaymentMethodName = (method: PaymentMethod) => {
    switch (method.type) {
      case "visa":
        return `Visa ending in ${method.lastFour}`;
      case "mastercard":
        return `Mastercard ending in ${method.lastFour}`;
      case "momo":
        return "MoMo Wallet";
      case "vnpay":
        return "VNPay";
      case "zalopay":
        return "ZaloPay";
      default:
        return "Payment Method";
    }
  };

  const getPaymentMethodDetails = (method: PaymentMethod) => {
    switch (method.type) {
      case "visa":
      case "mastercard":
        return `Expires ${method.expiryDate}`;
      case "momo":
      case "zalopay":
        return `Connected to ${method.phoneNumber}`;
      case "vnpay":
        return `QR payment via mobile app`;
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>
          Manage your payment methods and settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Your Payment Methods</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide" : "Show"} Details
              <ChevronRight
                className={`h-4 w-4 ml-1 transition-transform ${
                  showDetails ? "rotate-90" : ""
                }`}
              />
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleAddCard}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Payment Method
          </Button>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    {getPaymentMethodIcon(method.type)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{getPaymentMethodName(method)}</h3>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {getPaymentMethodDetails(method)}
                      </p>
                      {showDetails && (
                        <div className="mt-2 text-sm">
                          {method.holderName && (
                            <p>
                              <strong>Name/Bank:</strong> {method.holderName}
                            </p>
                          )}
                          {method.billingAddress && (
                            <p>
                              <strong>Billing address:</strong> {method.billingAddress}
                            </p>
                          )}
                          {method.phoneNumber && !method.type.includes("card") && (
                            <p>
                              <strong>Phone:</strong> {method.phoneNumber}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPaymentMethod(method)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteConfirm(method.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-muted-foreground mt-4">
            <p>
              Your payment information is stored securely and in compliance with
              industry standards. We never store your full card number or
              security code.
            </p>
          </div>
        </div>
      </CardContent>

      {/* Edit Payment Method Dialog */}
      <EditPaymentMethod
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        paymentMethod={currentEditPaymentMethod}
        onSave={handleSavePaymentMethod}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this payment method? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveCard}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
