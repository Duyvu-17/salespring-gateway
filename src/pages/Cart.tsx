
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowRight, ShoppingCart, ChevronLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

    // Simulate API call
    setTimeout(() => {
      setCartItems(mockCartItems);
      setIsLoading(false);
    }, 800);
  }, []);

  const handleRemoveItem = (id: number) => {
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    });
    
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    
    toast({
      title: "Quantity updated",
      description: "Your cart has been updated",
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
          <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
          Your Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2].map((item) => (
              <div key={item} className="flex flex-col md:flex-row gap-6 p-4 border rounded-lg">
                <Skeleton className="w-full md:w-32 h-32 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="mt-4 flex items-center">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="mx-4 h-4 w-8" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-lg mb-8 text-center text-muted-foreground">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Button asChild size="lg">
          <Link to="/" className="flex items-center">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 flex items-center">
        <ShoppingCart className="mr-2 h-6 w-6 text-primary" />
        Your Shopping Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row gap-6 p-4 border rounded-lg shadow-sm hover:shadow transition-shadow duration-200">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full md:w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                
                <div className="flex items-center mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 p-0"
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <span className="mx-4 font-medium">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 p-0"
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-destructive h-8 w-8 p-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" asChild>
              <Link to="/" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              
              <Button className="w-full mt-4" size="lg" asChild>
                <Link to="/checkout" className="flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="mt-4 bg-muted/40 p-3 rounded-md text-xs space-y-1">
                <div className="flex items-center">
                  <ShoppingCart className="h-3 w-3 mr-1.5" />
                  <span>Secure checkout process</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
