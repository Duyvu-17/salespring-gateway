
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Wallet, Building } from "lucide-react";

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

interface EditPaymentMethodProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentMethod?: PaymentMethod;
  onSave: (paymentMethod: PaymentMethod) => void;
}

const EditPaymentMethod = ({
  open,
  onOpenChange,
  paymentMethod,
  onSave,
}: EditPaymentMethodProps) => {
  const { toast } = useToast();
  const [formValues, setFormValues] = useState<PaymentMethod>(
    paymentMethod || {
      id: Math.random().toString(36).substring(2, 9),
      type: "visa",
      lastFour: "",
      expiryDate: "",
      holderName: "",
      isDefault: false,
      billingAddress: "",
    }
  );

  const [cardNumber, setCardNumber] = useState(
    paymentMethod?.lastFour ? `•••• •••• •••• ${paymentMethod.lastFour}` : ""
  );

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return value;
  };

  const handleSave = () => {
    // Extract last four digits of card number
    if (formValues.type === "visa" || formValues.type === "mastercard") {
      const digits = cardNumber.replace(/\s/g, "");
      const lastFour = digits.substring(digits.length - 4);
      
      if (digits.length < 16) {
        toast({
          title: "Invalid card number",
          description: "Please enter a complete card number",
        });
        return;
      }
      
      if (!formValues.holderName) {
        toast({
          title: "Missing information",
          description: "Please enter the cardholder name",
        });
        return;
      }
      
      if (!formValues.expiryDate || formValues.expiryDate.length < 5) {
        toast({
          title: "Invalid expiry date",
          description: "Please enter a valid expiry date (MM/YY)",
        });
        return;
      }
      
      onSave({
        ...formValues,
        lastFour,
      });
    } else if (formValues.type === "momo" || formValues.type === "zalopay") {
      if (!formValues.phoneNumber) {
        toast({
          title: "Missing information",
          description: "Please enter your phone number",
        });
        return;
      }
      
      onSave(formValues);
    } else {
      onSave(formValues);
    }
    
    toast({
      title: "Payment method updated",
      description: "Your payment method has been updated successfully",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {paymentMethod ? "Edit Payment Method" : "Add Payment Method"}
          </DialogTitle>
          <DialogDescription>
            {paymentMethod
              ? "Update your payment method details"
              : "Add a new payment method to your account"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="payment-type">Payment Type</Label>
            <Select
              value={formValues.type}
              onValueChange={(val) =>
                setFormValues({ ...formValues, type: val })
              }
            >
              <SelectTrigger id="payment-type">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visa">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Visa
                  </div>
                </SelectItem>
                <SelectItem value="mastercard">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" /> Mastercard
                  </div>
                </SelectItem>
                <SelectItem value="momo">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" /> MoMo Wallet
                  </div>
                </SelectItem>
                <SelectItem value="zalopay">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" /> ZaloPay
                  </div>
                </SelectItem>
                <SelectItem value="bank">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" /> Bank Transfer
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formValues.type === "visa" || formValues.type === "mastercard") && (
            <>
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardholder">Cardholder Name</Label>
                <Input
                  id="cardholder"
                  value={formValues.holderName || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, holderName: e.target.value })
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={formValues.expiryDate || ""}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        expiryDate: formatExpiryDate(e.target.value),
                      })
                    }
                    placeholder="MM/YY"
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
              <div className="space-y-2">
                <Label htmlFor="billing-address">Billing Address</Label>
                <Input
                  id="billing-address"
                  value={formValues.billingAddress || ""}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      billingAddress: e.target.value,
                    })
                  }
                  placeholder="123 Main St, City, Country"
                />
              </div>
            </>
          )}

          {(formValues.type === "momo" || formValues.type === "zalopay") && (
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                value={formValues.phoneNumber || ""}
                onChange={(e) =>
                  setFormValues({ ...formValues, phoneNumber: e.target.value })
                }
                placeholder="+84 901 234 567"
              />
            </div>
          )}

          {formValues.type === "bank" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Select
                  value={formValues.holderName || ""}
                  onValueChange={(val) =>
                    setFormValues({ ...formValues, holderName: val })
                  }
                >
                  <SelectTrigger id="bank-name">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vietcombank">Vietcombank</SelectItem>
                    <SelectItem value="bidv">BIDV</SelectItem>
                    <SelectItem value="vib">VIB</SelectItem>
                    <SelectItem value="techcombank">Techcombank</SelectItem>
                    <SelectItem value="acb">ACB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  value={formValues.lastFour || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, lastFour: e.target.value })
                  }
                  placeholder="0123456789"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-holder">Account Holder Name</Label>
                <Input
                  id="account-holder"
                  value={formValues.email || ""}
                  onChange={(e) =>
                    setFormValues({ ...formValues, email: e.target.value })
                  }
                  placeholder="NGUYEN VAN A"
                />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentMethod;
