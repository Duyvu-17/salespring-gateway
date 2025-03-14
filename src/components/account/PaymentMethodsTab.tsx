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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaymentMethodsTab = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [newCardType, setNewCardType] = useState("visa");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");

  const handleAddCard = () => {
    setShowAddDialog(true);
  };

  const handleSaveNewCard = () => {
    if (!newCardNumber || !newCardName || !newCardExpiry) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
      });
      return;
    }

    toast({
      title: "Payment method added",
      description: "Your new payment method has been added successfully.",
    });

    setShowAddDialog(false);
    // Reset form fields
    setNewCardType("visa");
    setNewCardNumber("");
    setNewCardName("");
    setNewCardExpiry("");
  };

  const handleRemoveCard = () => {
    toast({
      title: "Card removed",
      description: "Your card has been removed successfully.",
    });
  };

  const handleSetDefault = () => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const formatCardNumber = (number: string) => {
    return number
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
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
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-3 rounded-md">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Visa ending in 4242</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Expires 04/25
                    </p>
                    {showDetails && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Card holder:</strong> Nguyen Van A
                        </p>
                        <p>
                          <strong>Billing address:</strong> 123 Nguyen Hue,
                          District 1, Ho Chi Minh City
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast({
                        title: "Edit feature coming soon",
                        description:
                          "Editing payment methods will be available soon.",
                      })
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCard}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-3 rounded-md">
                    <CreditCard className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Mastercard ending in 8888</h3>
                    <p className="text-sm text-muted-foreground">
                      Expires 07/24
                    </p>
                    {showDetails && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Card holder:</strong> Nguyen Thi B
                        </p>
                        <p>
                          <strong>Billing address:</strong> 456 Le Loi, District
                          1, Ho Chi Minh City
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSetDefault}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Set Default
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCard}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-3 rounded-md">
                    <Wallet className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">MoMo Wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Connected to +84 123 456 789
                    </p>
                    {showDetails && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Name:</strong> Tran Van C
                        </p>
                        <p>
                          <strong>Last used:</strong> 05/06/2023
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSetDefault}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Set Default
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCard}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-3 rounded-md">
                    <Banknote className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">VNPay</h3>
                    <p className="text-sm text-muted-foreground">
                      QR payment via mobile app
                    </p>
                    {showDetails && (
                      <div className="mt-2 text-sm">
                        <p>
                          <strong>Linked bank:</strong> VietcomBank
                        </p>
                        <p>
                          <strong>Last used:</strong> 12/05/2023
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSetDefault}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Set Default
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCard}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
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

      <AlertDialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Payment Method</AlertDialogTitle>
            <AlertDialogDescription>
              Fill in the details to add a new payment method to your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-type">Payment Type</Label>
              <Select value={newCardType} onValueChange={setNewCardType}>
                <SelectTrigger id="card-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visa">Visa</SelectItem>
                  <SelectItem value="mastercard">Mastercard</SelectItem>
                  <SelectItem value="momo">MoMo Wallet</SelectItem>
                  <SelectItem value="vnpay">VNPay</SelectItem>
                  <SelectItem value="zalopay">ZaloPay</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(newCardType === "visa" || newCardType === "mastercard") && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={newCardNumber}
                    onChange={(e) =>
                      setNewCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input
                    id="card-name"
                    placeholder="John Doe"
                    value={newCardName}
                    onChange={(e) => setNewCardName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={newCardExpiry}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 2) {
                          value =
                            value.substring(0, 2) + "/" + value.substring(2, 4);
                        }
                        setNewCardExpiry(value);
                      }}
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                    />
                  </div>
                </div>
              </>
            )}

            {(newCardType === "momo" || newCardType === "zalopay") && (
              <div className="space-y-2">
                <Label htmlFor="phone-number">Phone Number</Label>
                <Input id="phone-number" placeholder="+84 xxx xxx xxx" />
              </div>
            )}

            {newCardType === "vnpay" && (
              <div className="space-y-2">
                <Label htmlFor="bank">Select Bank</Label>
                <Select>
                  <SelectTrigger id="bank">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vcb">VietcomBank</SelectItem>
                    <SelectItem value="tcb">TechcomBank</SelectItem>
                    <SelectItem value="vib">VIB</SelectItem>
                    <SelectItem value="acb">ACB</SelectItem>
                    <SelectItem value="bidv">BIDV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveNewCard}>
              Save
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};
