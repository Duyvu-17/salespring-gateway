
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWishlist, WishlistProduct } from '@/utils/wishlist';
import { getFeaturedProducts, getDiscountedProducts } from '@/data/products';
import { useCartNotificationContext } from '../App';

const Wishlist = () => {
  const [likedProducts, setLikedProducts] = useState<WishlistProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { getWishlistProducts, removeFromWishlist } = useWishlist();
  const { showCartNotification } = useCartNotificationContext();
  
  // Get recommended products to show in empty state
  const recommendedProducts = [...getFeaturedProducts(), ...getDiscountedProducts()]
    .slice(0, 4);

  useEffect(() => {
    // Fetch liked products
    const fetchLikedProducts = () => {
      setIsLoading(true);
      try {
        const products = getWishlistProducts();
        setLikedProducts(products);
      } catch (error) {
        console.error('Error fetching liked products:', error);
        toast({
          title: "Error",
          description: "Failed to load your wishlist",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedProducts();
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      fetchLikedProducts();
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [toast]);

  const handleRemoveFromWishlist = (product: WishlistProduct) => {
    removeFromWishlist(product);
    setLikedProducts(likedProducts.filter(p => p.id !== product.id));
  };

  const handleAddToCart = (product: WishlistProduct) => {
    // Show notification
    showCartNotification(product);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="text-muted-foreground">{likedProducts.length} {likedProducts.length === 1 ? 'item' : 'items'}</span>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-primary">Loading your wishlist...</div>
        </div>
      ) : likedProducts.length === 0 ? (
        <div className="space-y-8">
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <Heart className="mx-auto mb-4 text-muted-foreground h-16 w-16" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">Discover items you love and add them to your wishlist to keep track of things you want to buy later.</p>
            <Link to="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Recommended For You</h2>
              <Link to="/search" className="text-primary flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-all">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-48 object-cover"
                    />
                    <CardContent className="pt-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-primary font-semibold mt-1">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-0">
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{product.description}</p>
                </CardContent>
              </Link>
              <CardFooter className="flex justify-between gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleRemoveFromWishlist(product)}
                >
                  <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
                  Remove
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
