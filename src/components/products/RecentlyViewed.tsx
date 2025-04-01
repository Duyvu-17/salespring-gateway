
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecentlyViewed } from '@/utils/recently-viewed';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { X } from 'lucide-react';
import { clearRecentlyViewed } from '@/utils/recently-viewed';
import { useToast } from '@/hooks/use-toast';

export const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    setRecentProducts(getRecentlyViewed());
  }, []);
  
  const handleClearHistory = () => {
    clearRecentlyViewed();
    setRecentProducts([]);
    toast({
      title: "History cleared",
      description: "Your recently viewed products history has been cleared."
    });
  };
  
  if (recentProducts.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recently Viewed</CardTitle>
        <button 
          onClick={handleClearHistory}
          className="text-xs text-muted-foreground hover:text-primary flex items-center"
        >
          <X className="h-3 w-3 mr-1" />
          Clear history
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentProducts.map(product => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="block group"
            >
              <div className="overflow-hidden rounded-md">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-sm font-medium truncate">{product.name}</p>
              <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentlyViewed;
