
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CreditCard, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PaymentMethodsTab = () => {
  const { toast } = useToast();
  
  const handleAddCard = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding new payment methods will be available soon."
    });
  };
  
  const handleRemoveCard = () => {
    toast({
      title: "Card removed",
      description: "Your card has been removed successfully."
    });
  };
  
  const handleSetDefault = () => {
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully."
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
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
                    <p className="text-sm text-muted-foreground">Expires 04/25</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRemoveCard}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
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
                    <p className="text-sm text-muted-foreground">Expires 07/24</p>
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
              Your payment information is stored securely and in compliance with industry standards.
              We never store your full card number or security code.
            </p>
          </div>
        </div>
      </CardContent>
    </>
  );
};
