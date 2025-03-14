
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Banknote, BanknoteIcon, CreditCard, QrCode, Wallet } from "lucide-react";

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
}

const PaymentMethod = ({ paymentMethod, setPaymentMethod }: PaymentMethodProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Select your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={paymentMethod} 
          onValueChange={setPaymentMethod}
          className="grid grid-cols-1 gap-4"
        >
          <div className="flex items-center">
            <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
            <Label 
              htmlFor="momo"
              className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center shrink-0">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">MoMo</p>
                  <p className="text-sm text-muted-foreground">Pay with MoMo e-wallet</p>
                </div>
              </div>
              <QrCode className="h-5 w-5 text-muted-foreground" />
            </Label>
          </div>
          
          <div className="flex items-center">
            <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
            <Label 
              htmlFor="bank"
              className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                  <Building className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-muted-foreground">Vietcombank, BIDV, Techcombank, etc.</p>
                </div>
              </div>
              <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
            </Label>
          </div>
          
          <div className="flex items-center">
            <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
            <Label 
              htmlFor="cod"
              className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                  <Banknote className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                </div>
              </div>
              <CreditCard className="h-5 w-5 text-muted-foreground" />
            </Label>
          </div>
          
          <div className="flex items-center">
            <RadioGroupItem value="zalopay" id="zalopay" className="peer sr-only" />
            <Label 
              htmlFor="zalopay"
              className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">ZaloPay</p>
                  <p className="text-sm text-muted-foreground">Pay with ZaloPay e-wallet</p>
                </div>
              </div>
              <QrCode className="h-5 w-5 text-muted-foreground" />
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default PaymentMethod;
