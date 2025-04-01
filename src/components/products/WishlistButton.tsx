
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useWishlist, isInWishlist, WishlistProduct } from '@/utils/wishlist';

interface WishlistButtonProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
  };
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  showText?: boolean;
}

export const WishlistButton = ({ 
  product, 
  variant = 'outline',
  size = 'default',
  showText = true
}: WishlistButtonProps) => {
  const { toggleWishlist } = useWishlist();
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));
  
  useEffect(() => {
    // Update state if wishlist changes elsewhere
    const handleWishlistUpdate = () => {
      setInWishlist(isInWishlist(product.id));
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [product.id]);
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const simplifiedProduct: WishlistProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    };
    
    const isAdded = toggleWishlist(simplifiedProduct);
    setInWishlist(isAdded);
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={inWishlist ? 'text-red-500 border-red-200 hover:text-red-600 hover:border-red-300' : ''}
    >
      <Heart
        className={`h-4 w-4 ${inWishlist ? 'fill-red-500 text-red-500' : ''} ${showText ? 'mr-2' : ''}`}
      />
      {showText && (inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist')}
    </Button>
  );
};

export default WishlistButton;
