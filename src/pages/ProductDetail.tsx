
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';
import { getProductById, getRelatedProducts, Product, UserReview, Reply } from '@/data/products';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewSection from '@/components/products/ReviewSection';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the product
  useState(() => {
    const foundProduct = getProductById(Number(id));
    setProduct(foundProduct);
  });
  
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg mb-8">We couldn't find the product you're looking for.</p>
        <Button asChild size="lg">
          <button onClick={() => navigate('/')}>Return to Home</button>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (x${quantity}) has been added to your cart`,
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddReview = (newReview: Omit<UserReview, 'id'>) => {
    if (!product.userReviews) {
      product.userReviews = [];
    }
    
    const newReviewWithId = {
      ...newReview,
      id: product.userReviews.length + 1
    };
    
    const updatedProduct = {
      ...product,
      userReviews: [...product.userReviews, newReviewWithId],
      reviews: product.reviews + 1
    };
    
    setProduct(updatedProduct);
  };

  const handleAddReply = (reviewId: number, newReply: Omit<Reply, 'id'>) => {
    if (!product.userReviews) return;
    
    const updatedUserReviews = product.userReviews.map(review => {
      if (review.id === reviewId) {
        const replies = review.replies || [];
        const newReplyWithId = {
          ...newReply,
          id: replies.length + 1
        };
        return {
          ...review,
          replies: [...replies, newReplyWithId]
        };
      }
      return review;
    });
    
    setProduct({
      ...product,
      userReviews: updatedUserReviews
    });
  };

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-16">
      <Button 
        variant="ghost" 
        className="mb-8 hover:bg-transparent"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl bg-muted/30 flex items-center justify-center p-8 relative">
          {product.discount && (
            <Badge className="absolute top-4 left-4 bg-red-500">
              {product.discount}% OFF
            </Badge>
          )}
          {product.new && (
            <Badge className="absolute top-4 right-4 bg-green-500">
              NEW
            </Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground mt-1">{product.category}</p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="space-y-1">
            {discountedPrice ? (
              <>
                <div className="text-2xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </div>
                <div className="text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Reviews ({product.userReviews?.length || 0})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="py-4">
              <ul className="space-y-2">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="py-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="h-5 w-5 text-muted-foreground" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <ReviewSection 
                productId={product.id}
                reviews={product.userReviews || []}
                onAddReview={handleAddReview}
                onAddReply={handleAddReply}
              />
            </TabsContent>
          </Tabs>
          
          <Separator />
          
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedColor === color
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="flex gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`px-3 py-1 border rounded-md text-sm ${
                      selectedSize === size
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!product.inStock}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
              
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <Card 
                key={relatedProduct.id} 
                className="glass-card hover-scale overflow-hidden"
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
              >
                <div className="relative">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover"
                  />
                  {relatedProduct.discount && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      {relatedProduct.discount}% OFF
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{relatedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{relatedProduct.category}</p>
                  <p className="text-lg font-medium text-primary">${relatedProduct.price.toFixed(2)}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
