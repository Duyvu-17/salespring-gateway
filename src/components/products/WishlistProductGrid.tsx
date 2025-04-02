
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLazyLoad } from '@/hooks/use-lazy-load';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Loader2 } from 'lucide-react';
import { WishlistProduct } from '@/utils/wishlist';
import { Product } from '@/data/products';
import { useCartNotificationContext } from '../../App';

interface WishlistProductGridProps {
  products: WishlistProduct[];
  onRemove: (product: WishlistProduct) => void;
  initialCount?: number;
  loadMoreCount?: number;
}

export const WishlistProductGrid = ({
  products,
  onRemove,
  initialCount = 8,
  loadMoreCount = 4
}: WishlistProductGridProps) => {
  const { visibleItems, loadingRef, hasMore, isLoading } = useLazyLoad(
    products,
    initialCount,
    loadMoreCount
  );
  const { showCartNotification } = useCartNotificationContext();

  const handleAddToCart = (product: WishlistProduct) => {
    // Convert WishlistProduct to a partial Product for notification
    const enhancedProduct: Product = {
      ...product,
      rating: 0,
      reviews: 0,
      inStock: true
    };
    
    // Show notification with enhanced product that satisfies Product type
    showCartNotification(enhancedProduct);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map((product) => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <Link to={`/product/${product.id}`} className="block">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
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
                onClick={() => onRemove(product)}
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
      
      {(hasMore || isLoading) && (
        <div 
          ref={loadingRef} 
          className="w-full flex justify-center items-center py-8 mt-6"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading more items...</span>
            </div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
    </>
  );
};
