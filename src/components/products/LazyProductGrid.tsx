
import { ProductCard } from '@/components/products/ProductCard';
import { useLazyLoad } from '@/hooks/use-lazy-load';
import { Product } from '@/data/products';
import { Loader2 } from 'lucide-react';

interface LazyProductGridProps {
  products: Product[];
  initialCount?: number;
  loadMoreCount?: number;
}

export const LazyProductGrid = ({ 
  products,
  initialCount = 6,
  loadMoreCount = 3
}: LazyProductGridProps) => {
  const { visibleItems, loadingRef, hasMore, isLoading } = useLazyLoad<Product>(
    products,
    initialCount,
    loadMoreCount
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {(hasMore || isLoading) && (
        <div 
          ref={loadingRef} 
          className="w-full flex justify-center items-center py-8"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading more products...</span>
            </div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
    </>
  );
};
