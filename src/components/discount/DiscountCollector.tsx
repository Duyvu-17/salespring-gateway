import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { DiscountCode, getDiscountCodes } from "@/data/discount-codes";
import { ArrowRight, Copy, Loader2, Sparkles, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const DiscountCollector = () => {
  const { toast } = useToast();
  const discountCodes = getDiscountCodes();
  const [email, setEmail] = useState("");
  const [showCodes, setShowCodes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowCodes(true);
      toast({
        title: "Success!",
        description: "Check out these discount codes just for you!",
      });
    }, 2000);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: `${code} has been copied to your clipboard`,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-1"></div>

      {!showCodes ? (
        <>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              <CardTitle>Get Exclusive Discount Codes</CardTitle>
            </div>
            <CardDescription>
              Subscribe to receive special discount codes and be the first to
              know about promotions
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  <>
                    Get Discounts <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-sm text-muted-foreground pt-0">
            No spam, unsubscribe at any time. Your email is only used to deliver
            discount codes.
          </CardFooter>
        </>
      ) : (
        <>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Your Exclusive Discount Codes</CardTitle>
            </div>
            <CardDescription>
              Use these codes at checkout to save on your purchase
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3">
              {discountCodes.map((discount) => (
                <div
                  key={discount.id}
                  className={cn(
                    "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border",
                    discount.discountPercentage >= 20
                      ? "bg-primary/5 border-primary/20"
                      : "bg-muted/30 border-muted"
                  )}
                >
                  <div className="mb-3 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          discount.discountPercentage >= 20
                            ? "bg-primary"
                            : undefined
                        }
                      >
                        {discount.discountPercentage}% OFF
                      </Badge>
                      {discount.minOrderAmount > 0 && (
                        <Badge variant="outline">
                          Min ${discount.minOrderAmount}
                        </Badge>
                      )}
                    </div>
                    <p className="font-medium mt-2">{discount.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Valid until{" "}
                      {new Date(discount.validUntil).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div className="font-mono bg-muted px-3 py-1 rounded border mr-2">
                      {discount.code}
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(discount.code)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
