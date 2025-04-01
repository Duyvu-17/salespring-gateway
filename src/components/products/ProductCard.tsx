
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingBag, Lightning, Eye } from "lucide-react";
import { getSecondImage } from "@/data/product-images";
import { Product } from "@/data/products";
import { useWishlist, isInWishlist } from "@/utils/wishlist";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist } = useWishlist();
  const { toast } = useToast();
  const [inWishlist, setInWishlist] = useState(isInWishlist(product.id));

  const secondImage = getSecondImage(product.id);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const simplifiedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    };

    const isAdded = toggleWishlist(simplifiedProduct);
    setInWishlist(isAdded);

    toast({
      title: isAdded ? "Added to wishlist" : "Removed from wishlist",
      description: `${product.name} has been ${
        isAdded ? "added to" : "removed from"
      } your wishlist`,
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Quick Buy",
      description: `${product.name} has been added to cart. Redirecting to checkout...`,
    });
    
    // In a real implementation, you would add the product to cart first
    // Then redirect to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };
  
  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="glass-card hover-scale overflow-hidden border-none shadow-lg h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && secondImage ? secondImage : product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={handleAddToWishlist}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  inWishlist
                    ? "fill-red-500 text-red-500 animate-heartbeat"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 shadow-md">
              {product.discount}% OFF
            </Badge>
          )}
          {product.new && (
            <Badge className="absolute bottom-2 left-2 bg-green-500 shadow-md">
              NEW
            </Badge>
          )}
          
          {/* Quick action buttons that appear on hover */}
          {isHovered && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto flex justify-center space-x-2 animate-fade-in">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/80 hover:bg-white text-gray-800"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 mr-1" /> Quick View
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-primary/90 hover:bg-primary text-white"
                onClick={handleQuickBuy}
              >
                <Lightning className="h-4 w-4 mr-1" /> Quick Buy
              </Button>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {product.category}
              </p>
            </div>
            <div className="text-right">
              {product.discount ? (
                <>
                  <p className="text-lg font-medium text-primary">
                    ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                  </p>
                  <p className="text-sm line-through text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-lg font-medium text-primary">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center mt-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>
          <Button
            className="w-full mt-auto shadow-sm hover:shadow-md transition-shadow"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </Link>
    </Card>
  );
};
