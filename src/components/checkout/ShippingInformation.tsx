
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ShippingInformation = () => {
  return (
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
  );
};

export default ShippingInformation;
