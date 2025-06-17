
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using StoreX, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Use License</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Permission is granted to temporarily access StoreX for personal, 
                  non-commercial transitory viewing only.
                </p>
                <p>This license shall automatically terminate if you violate any of these restrictions.</p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
              <p className="text-muted-foreground">
                We strive to provide accurate product information, but we do not warrant that 
                product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Orders and Payment</h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="list-disc pl-6 space-y-2">
                  <li>All orders are subject to acceptance and availability</li>
                  <li>We reserve the right to refuse or cancel orders</li>
                  <li>Payment must be received before order processing</li>
                  <li>Prices are subject to change without notice</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping and Delivery</h2>
              <p className="text-muted-foreground">
                Delivery times are estimates and not guaranteed. Risk of loss passes to 
                you upon delivery to the carrier.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                StoreX shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising out of your use of our service.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-muted-foreground">
                Questions about the Terms of Service should be sent to us at:
                <br />
                Email: legal@storex.com
                <br />
                Phone: +1 234 567 890
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
