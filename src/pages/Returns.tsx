
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground text-lg">
            We want you to be completely satisfied with your purchase
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">
                Return items within 30 days of delivery
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Free Exchanges</h3>
              <p className="text-sm text-muted-foreground">
                Exchange for different size or color
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                Full refund for defective items
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We accept returns within 30 days of delivery for most items. 
                  Items must be in original condition with tags attached.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Items eligible for return:</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Unworn clothing with original tags</li>
                    <li>Unused accessories in original packaging</li>
                    <li>Electronics in original condition</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">How to Return</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                    <h4 className="font-medium mb-1">Initiate Return</h4>
                    <p className="text-sm text-muted-foreground">Contact customer service or use your account</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                    <h4 className="font-medium mb-1">Package Item</h4>
                    <p className="text-sm text-muted-foreground">Use original packaging when possible</p>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                    <h4 className="font-medium mb-1">Ship Back</h4>
                    <p className="text-sm text-muted-foreground">Use provided return label</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Refund Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Refunds will be processed to your original payment method within 
                  5-7 business days after we receive your return.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Original shipping costs are non-refundable unless 
                    the return is due to our error.
                  </p>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/customer-service">
                  <Button className="w-full sm:w-auto">
                    Contact Customer Service
                  </Button>
                </Link>
                <Link to="/account">
                  <Button variant="outline" className="w-full sm:w-auto">
                    View Your Orders
                  </Button>
                </Link>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Returns;
