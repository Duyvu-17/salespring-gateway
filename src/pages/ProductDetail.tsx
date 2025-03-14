import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  ArrowLeft, 
  Check, 
  RefreshCw,
  MessageSquare,
  Info,
  Package,
  Heart,
  MapPin,
  CreditCard
} from 'lucide-react';
import { getProductById, getRelatedProducts, Product, UserReview, Reply, ProductModel, ProductColor } from '@/data/products';
import { getProductImages } from '@/data/product-images';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductGallery } from '@/components/products/ProductGallery';
import ReviewSection from '@/components/products/ReviewSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useWishlist, isInWishlist } from '@/utils/wishlist';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  
  // Find the product
  useEffect(() => {
    const foundProduct = getProductById(Number(id));
    setProduct(foundProduct);
    
    if (foundProduct) {
      setIsInWishlistState(isInWishlist(foundProduct.id));
      
      // Set initial model and color if available
      if (foundProduct.models && foundProduct.models.length > 0) {
        setSelectedModel(foundProduct.models[0]);
        if (foundProduct.models[0].colors && foundProduct.models[0].colors.length > 0) {
          setSelectedColor(foundProduct.models[0].colors[0]);
        }
      }
    }
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      if (foundProduct) {
        setIsInWishlistState(isInWishlist(foundProduct.id));
      }
    };
    
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, [id]);
  
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  const productImages = product ? getProductImages(product.id) : [];
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg mb-8">We couldn't find the product you're looking for.</p>
        <Button asChild size="lg">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedModel || !selectedColor) {
      toast({
        title: "Selection required",
        description: "Please select a model and color before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedModel.name} (${selectedColor.name}) x${quantity} has been added to your cart`,
    });
  };
  
  const handleBuyNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to continue with your purchase",
        variant: "destructive"
      });
      navigate("/login", { state: { from: `/product/${product.id}` } });
      return;
    }
    
    if (!selectedModel || !selectedColor) {
      toast({
        title: "Selection required",
        description: "Please select a model and color before purchasing",
        variant: "destructive"
      });
      return;
    }
    
    // Add to cart and navigate to checkout
    handleAddToCart();
    navigate("/checkout");
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleModelSelect = (model: ProductModel) => {
    setSelectedModel(model);
    // Reset color selection when model changes
    if (model.colors && model.colors.length > 0) {
      setSelectedColor(model.colors[0]);
    } else {
      setSelectedColor(null);
    }
  };

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
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

  const handleAddToWishlist = () => {
    if (product) {
      const simplifiedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category
      };
      
      const isAdded = toggleWishlist(simplifiedProduct);
      setIsInWishlistState(isAdded);
    }
  };

  // Get current price based on selected model
  const getCurrentPrice = () => {
    if (selectedModel && selectedModel.price !== undefined) {
      return selectedModel.price;
    }
    return product.price;
  };

  const currentPrice = getCurrentPrice();
  const discountedPrice = product.discount 
    ? currentPrice * (1 - product.discount / 100)
    : null;

  // Check if product is in stock based on selected model
  const isCurrentlyInStock = () => {
    if (selectedModel && selectedModel.inStock !== undefined) {
      return selectedModel.inStock;
    }
    return product.inStock;
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-8 text-sm">
        <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/search" className="text-muted-foreground hover:text-primary">Products</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to={`/search?category=${encodeURIComponent(product.category)}`} className="text-muted-foreground hover:text-primary">
          {product.category}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <ProductGallery 
          mainImage={selectedColor?.image || product.image}
          productName={product.name}
          additionalImages={productImages}
          discount={product.discount}
          isNew={product.new}
        />
        
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
              <button 
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="ml-2 text-sm text-primary hover:underline"
              >
                See all reviews
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            {discountedPrice ? (
              <>
                <div className="text-2xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </div>
                <div className="text-muted-foreground line-through">
                  ${currentPrice.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-2xl font-bold text-primary">
                ${currentPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Short Description */}
          <p className="text-muted-foreground">{product.description.slice(0, 150)}...</p>
          
          {/* Model Selection */}
          {product.models && product.models.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Model</h3>
              <RadioGroup 
                defaultValue={product.models[0].id.toString()}
                onValueChange={(value) => {
                  const model = product.models?.find(m => m.id.toString() === value);
                  if (model) handleModelSelect(model);
                }}
                className="flex flex-wrap gap-2"
              >
                {product.models.map(model => (
                  <div key={model.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={model.id.toString()} 
                      id={`model-${model.id}`}
                    />
                    <Label 
                      htmlFor={`model-${model.id}`}
                      className={`px-3 py-1 border rounded-md text-sm cursor-pointer ${
                        selectedModel?.id === model.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {model.name} {model.price !== undefined && model.price !== product.price && 
                        `(+$${(model.price - product.price).toFixed(2)})`
                      }
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* Color Selection */}
          {selectedModel && selectedModel.colors && selectedModel.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="flex flex-wrap gap-3">
                {selectedModel.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => handleColorSelect(color)}
                    className={`relative p-1 rounded-full border-2 ${
                      selectedColor?.name === color.name
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color.code }}
                    ></div>
                    {selectedColor?.name === color.name && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="text-white drop-shadow-md h-4 w-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Selected: <span className="font-medium">{selectedColor?.name}</span>
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className={isCurrentlyInStock() ? "text-green-600 flex items-center" : "text-red-600 flex items-center"}>
                {isCurrentlyInStock() ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    In Stock
                  </>
                ) : (
                  "Out of Stock"
                )}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!isCurrentlyInStock()}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!isCurrentlyInStock()}
                >
                  +
                </Button>
              </div>
              
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!isCurrentlyInStock()}
              >
                {isCurrentlyInStock() ? "Add to Cart" : "Out of Stock"}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleAddToWishlist}
                className={isInWishlistState ? "bg-primary/10" : ""}
              >
                <Heart className={`h-5 w-5 ${isInWishlistState ? "fill-red-500 text-red-500 animate-heartbeat" : ""}`} />
              </Button>
            </div>
            
            {/* Buy Now Button */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 flex gap-2 items-center justify-center"
              onClick={handleBuyNow}
              disabled={!isCurrentlyInStock()}
            >
              <CreditCard className="h-5 w-5" />
              {isCurrentlyInStock() ? "Buy Now" : "Out of Stock"}
            </Button>
          </div>

          {/* Quick info cards */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-center">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <RefreshCw className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-center">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs text-center">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Rest of the component remains unchanged */}
      {/* Product Description Section */}
      <div className="mt-16 border-t pt-12">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Product Description
          </h2>
          <p className="text-muted-foreground">{product.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Highlights</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Designed for everyday use</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Built to last</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">What's Included</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Main product</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>User manual</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span>Warranty card</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Features Section */}
      <div className="mt-16 border-t pt-12">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Check className="h-5 w-5 mr-2" />
            Product Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Brand</span>
                  <span className="font-medium">StoreX</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-medium">SX-{product.id}00</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-medium">10 x 5 x 3 inches</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Weight</span>
                  <span className="font-medium">2.5 lbs</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Warranty</span>
                  <span className="font-medium">2 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shipping & Returns Section */}
      <div className="mt-16 border-t pt-12">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Shipping & Returns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Free Standard Shipping</p>
                    <p className="text-sm text-muted-foreground">On orders over $50 (3-5 business days)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Express Shipping</p>
                    <p className="text-sm text-muted-foreground">$9.99 (1-2 business days)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">International Shipping</p>
                    <p className="text-sm text-muted-foreground">Available for select countries</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Return Policy</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RefreshCw className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">30-Day Return Policy</p>
                    <p className="text-sm text-muted-foreground">
                      If you're not satisfied with your purchase, you can return it within 30 days for a full refund.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground">
                      All products are backed by our quality guarantee. If there's a defect, we'll replace it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Shipping FAQs</h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How long will shipping take?</AccordionTrigger>
                <AccordionContent>
                  Standard shipping typically takes 3-5 business days. Express shipping takes 1-2 business days. International shipping varies by location.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I track my order?</AccordionTrigger>
                <AccordionContent>
                  Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I change my shipping address?</AccordionTrigger>
                <AccordionContent>
                  You can change your shipping address before your order ships. Please contact customer service as soon as possible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews Section */}
      <div id="reviews-section" className="mt-16 border-t pt-12">
        <div className="prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Customer Reviews
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-muted/30 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-primary mb-2">{product.rating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">Based on {product.reviews} reviews</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm w-12">5 stars</span>
                    <div className="h-2 bg-muted flex-1 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm w-8">70%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-12">4 stars</span>
                    <div className="h-2 bg-muted flex-1 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-sm w-8">20%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-12">3 stars</span>
                    <div className="h-2 bg-muted flex-1 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-sm w-8">5%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-12">2 stars</span>
                    <div className="h-2 bg-muted flex-1 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '3%' }}></div>
                    </div>
                    <span className="text-sm w-8">3%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm w-12">1 star</span>
                    <div className="h-2 bg-muted flex-1 rounded-full mx-2 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <span className="text-sm w-8">2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <ReviewSection 
                productId={product.id}
                reviews={product.userReviews || []}
                onAddReview={handleAddReview}
                onAddReply={handleAddReply}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t pt-12 mb-16">
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
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-medium text-primary">
                      ${relatedProduct.price.toFixed(2)}
                    </p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-xs text-muted-foreground">
                        {relatedProduct.rating}
                      </span>
                    </div>
                  </div>
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
