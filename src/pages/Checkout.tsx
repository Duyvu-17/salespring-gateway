
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { validateDiscountCode, calculateDiscount, DiscountCode } from '@/data/discount-codes';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Truck, ShieldCheck, X, Wallet, CreditCard as CreditCardIcon, Landmark, Banknote } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  fields: React.ReactNode;
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountCode | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch this from an API or local storage
    const mockCartItems: CartItem[] = [
      {
        id: 1,
        name: "Premium Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        quantity: 1
      },
      {
        id: 3,
        name: "Smart Watch",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
        quantity: 2
      }
    ];

    setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 500);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleApplyDiscountCode = () => {
    if (!discountCode.trim()) {
      setDiscountError('Please enter a discount code');
      return;
    }

    const validCode = validateDiscountCode(discountCode.trim());
    
    if (!validCode) {
      setDiscountError('Invalid or expired discount code');
      return;
    }

    const subtotal = calculateSubtotal();
    if (subtotal < validCode.minOrderAmount) {
      setDiscountError(`This code requires a minimum order of $${validCode.minOrderAmount}`);
      return;
    }

    setAppliedDiscount(validCode);
    setDiscountError('');
    setDiscountCode('');
    
    toast({
      title: "Discount applied!",
      description: `${validCode.description} has been applied to your order.`,
    });
  };

  const handleRemoveDiscount = () => {
    setAppliedDiscount(null);
    toast({
      title: "Discount removed",
      description: "The discount code has been removed from your order.",
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: `Thank you for your order. You paid with ${getPaymentMethodName(selectedPaymentMethod)}. You will receive a confirmation email shortly.`,
    });
  };

  const getPaymentMethodName = (id: string) => {
    switch (id) {
      case 'credit-card': return 'Credit Card';
      case 'bank-transfer': return 'Bank Transfer';
      case 'paypal': return 'PayPal';
      case 'cash': return 'Cash on Delivery';
      default: return 'Unknown payment method';
    }
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: <CreditCardIcon className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
            <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
              <Input id="expiryDate" placeholder="MM/YY" />
            </div>
            
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
              <Input id="cvv" placeholder="123" />
            </div>
          </div>
          
          <div>
            <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">Name on Card</label>
            <Input id="nameOnCard" placeholder="John Doe" />
          </div>
        </div>
      )
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: <Landmark className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm font-medium mb-2">Bank Account Details:</p>
            <p className="text-sm">Bank: Commerce Bank</p>
            <p className="text-sm">Account Name: TechStore Inc.</p>
            <p className="text-sm">Account Number: XXXX-XXXX-XXXX-1234</p>
            <p className="text-sm">Routing Number: XXXXXXXX</p>
            <p className="text-sm mt-2 text-muted-foreground">Please use your order number as the payment reference.</p>
          </div>
          <div>
            <label htmlFor="transferConfirmation" className="block text-sm font-medium mb-1">Transfer Confirmation Number</label>
            <Input id="transferConfirmation" placeholder="(Optional) Enter your confirmation number" />
          </div>
        </div>
      )
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: <Wallet className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div>
            <label htmlFor="paypalEmail" className="block text-sm font-medium mb-1">PayPal Email</label>
            <Input id="paypalEmail" type="email" placeholder="your-email@example.com" />
          </div>
          <div className="p-4 bg-blue-50 text-blue-800 rounded-md dark:bg-blue-900 dark:text-blue-100">
            <p className="text-sm">You'll be redirected to PayPal to complete your payment after order confirmation.</p>
          </div>
        </div>
      )
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: <Banknote className="h-5 w-5" />,
      fields: (
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm">Pay with cash when your order is delivered. A small handling fee may apply.</p>
          </div>
          <div>
            <label htmlFor="cashNotes" className="block text-sm font-medium mb-1">Special Instructions (Optional)</label>
            <Input id="cashNotes" placeholder="Any special instructions for delivery" />
          </div>
        </div>
      )
    }
  ];

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 100 ? 0 : 10;
  const { discountAmount, discountedTotal } = calculateDiscount(subtotal, appliedDiscount);
  const total = discountedTotal + shippingCost;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Loading checkout...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg mb-8">Add some products to your cart before proceeding to checkout.</p>
        <Button asChild size="lg">
          <Link to="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <Link to="/cart" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Information */}
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                <Input id="firstName" placeholder="John" />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last Name</label>
                <Input id="lastName" placeholder="Doe" />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <Input id="email" type="email" placeholder="john.doe@example.com" />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium mb-1">Street Address</label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <Input id="city" placeholder="New York" />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                <Select>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                    <SelectItem value="fl">Florida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
                <Input id="zipCode" placeholder="10001" />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <Input id="phone" placeholder="(123) 456-7890" />
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <Tabs value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6 w-full">
                {paymentMethods.map(method => (
                  <TabsTrigger 
                    key={method.id} 
                    value={method.id}
                    className="flex flex-col items-center gap-1 py-3 px-1"
                  >
                    {method.icon}
                    <span className="text-xs">{method.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {paymentMethods.map(method => (
                <TabsContent key={method.id} value={method.id} className="space-y-4">
                  {method.fields}
                  <div className="mt-4 flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Your payment information is encrypted and secure.</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            {/* Discount Code */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Discount Code</h3>
              
              {appliedDiscount ? (
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-md">
                  <div>
                    <p className="font-medium text-sm flex items-center">
                      <Check className="h-4 w-4 mr-1 text-green-500" />
                      {appliedDiscount.code}
                    </p>
                    <p className="text-xs text-muted-foreground">{appliedDiscount.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRemoveDiscount}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleApplyDiscountCode} variant="outline">Apply</Button>
                </div>
              )}
              
              {discountError && (
                <p className="text-red-500 text-sm mt-1">{discountError}</p>
              )}
            </div>
            
            <Separator className="my-4" />
            
            {/* Totals */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Payment Method: {getPaymentMethodName(selectedPaymentMethod)}
              </p>
            </div>
            
            <Button 
              className="w-full mb-4" 
              size="lg"
              onClick={handleCheckout}
            >
              Complete Order
            </Button>
            
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 flex-shrink-0" />
                <span>Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
