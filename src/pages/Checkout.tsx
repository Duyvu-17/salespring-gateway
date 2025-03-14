import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Banknote, BanknoteIcon, QrCode, Building, Wallet } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(500); // Example points
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  
  const subtotal = 299.99;
  const shipping = 0;
  const pointsDiscount: number = useRewardPoints ? Math.min(rewardPoints * 0.01, subtotal * 0.3) : 0;
  const total: number = subtotal + shipping - pointsDiscount;
  
  const handlePlaceOrder = () => {
    setShowSuccess(true);
    
    // Simulate order completion
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  
  const toggleRewardPoints = () => {
    setUseRewardPoints(!useRewardPoints);
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Your items will be shipped to this address</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Thanh Nguyen</p>
                    <p className="text-sm text-muted-foreground">123 Nguyen Hue Street</p>
                    <p className="text-sm text-muted-foreground">District 1, Ho Chi Minh City</p>
                    <p className="text-sm text-muted-foreground">Vietnam, 70000</p>
                    <p className="text-sm text-muted-foreground">+84 123 456 789</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
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
          
          {/* Reward Points */}
          <Card>
            <CardHeader>
              <CardTitle>Reward Points</CardTitle>
              <CardDescription>Use your reward points for a discount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Available Points: {rewardPoints}</p>
                    <p className="text-sm text-muted-foreground">
                      Maximum discount: ${(rewardPoints * 0.01).toFixed(2)} (30% of order)
                    </p>
                  </div>
                  <Button 
                    variant={useRewardPoints ? "default" : "outline"} 
                    size="sm"
                    onClick={toggleRewardPoints}
                  >
                    {useRewardPoints ? "Applied" : "Apply Points"}
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>0 points</span>
                    <span>{rewardPoints} points</span>
                  </div>
                  <Progress value={(rewardPoints / 1000) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {1000 - rewardPoints} more points until next tier (1000 points)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {useRewardPoints && (
                  <div className="flex justify-between text-green-600">
                    <span>Reward Points Discount</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Order Placed Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for your purchase. Your order has been placed and will be processed shortly.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Checkout;
