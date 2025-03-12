
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const Wishlist = () => {
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch liked products from localStorage
    const fetchLikedProducts = () => {
      setIsLoading(true);
      try {
        const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
        
        // Fetch all products from your data source
        // For now, we'll simulate this by fetching from localStorage
        const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
        
        // Filter only liked products
        const liked = allProducts.filter((product: Product) => 
          likedProductIds.includes(product.id)
        );
        
        setLikedProducts(liked);
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
  }, [toast]);

  const handleRemoveFromWishlist = (productId: number) => {
    try {
      // Get current liked products
      const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
      
      // Remove the product
      const updatedLikedProducts = likedProductIds.filter((id: number) => id !== productId);
      
      // Update localStorage
      localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
      
      // Update state
      setLikedProducts(likedProducts.filter(product => product.id !== productId));
      
      toast({
        title: "Removed from wishlist",
        description: "Product removed from your wishlist",
      });
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove product from wishlist",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-primary">Loading your wishlist...</div>
        </div>
      ) : likedProducts.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="mx-auto mb-4 text-muted-foreground h-16 w-16" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Products you like will appear here</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
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
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <Heart className="h-4 w-4 mr-1 fill-destructive text-destructive" />
                  Remove
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
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
