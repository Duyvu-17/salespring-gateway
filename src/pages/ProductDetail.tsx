import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  CreditCard,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Zap,
  ThumbsUp,
} from "lucide-react";
import {
  getProductById,
  getRelatedProducts,
  Product,
  UserReview,
  Reply,
  ProductModel,
  ProductColor,
} from "@/data/products";
import { getProductImages } from "@/data/product-images";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/ProductGallery";
import ReviewSection from "@/components/products/ReviewSection";
import { useWishlist } from "@/context/WishlistContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInWishlist, addToWishlist, removeFromWishlist, wishlist } =
    useWishlist();
  const { isAuthenticated } = useAuth();

  const [reviewPage, setReviewPage] = useState(1);
  const reviewsPerPage = 3;

  // Find the product
  useEffect(() => {
    const foundProduct = getProductById(Number(id));
    setProduct(foundProduct);

    if (foundProduct) {
      setIsInWishlistState(isInWishlist(String(foundProduct.id)));

      // Set initial model and color if available
      if (foundProduct.models && foundProduct.models.length > 0) {
        setSelectedModel(foundProduct.models[0]);
        if (
          foundProduct.models[0].colors &&
          foundProduct.models[0].colors.length > 0
        ) {
          setSelectedColor(foundProduct.models[0].colors[0]);
        }
      }

      // Track recently viewed products
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

      // Remove this product if it's already in the list
      const filteredViewed = viewed.filter(
        (item) => item.id !== foundProduct.id
      );

      // Add this product to the beginning of the list
      const newViewed = [
        {
          id: foundProduct.id,
          name: foundProduct.name,
          image: foundProduct.image,
          price: foundProduct.price,
          category: foundProduct.category,
        },
        ...filteredViewed,
      ].slice(0, 4);

      localStorage.setItem("recentlyViewed", JSON.stringify(newViewed));

      // Get recently viewed products
      const recentProducts = newViewed
        .slice(1)
        .map((item) => getProductById(item.id))
        .filter(Boolean);

      setRecentlyViewed(recentProducts as Product[]);
    }
  }, [id]);

  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  const productImages = product ? getProductImages(product.id) : [];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg mb-8">
          We couldn't find the product you're looking for.
        </p>
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
        variant: "destructive",
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
        variant: "destructive",
      });
      navigate("/login", { state: { from: `/product/${product.id}` } });
      return;
    }

    if (!selectedModel || !selectedColor) {
      toast({
        title: "Selection required",
        description: "Please select a model and color before purchasing",
        variant: "destructive",
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

  const handleAddReview = (newReview: Omit<UserReview, "id">) => {
    if (!product.userReviews) {
      product.userReviews = [];
    }

    const newReviewWithId = {
      ...newReview,
      id: product.userReviews.length + 1,
    };

    const updatedProduct = {
      ...product,
      userReviews: [...product.userReviews, newReviewWithId],
      reviews: product.reviews + 1,
    };

    setProduct(updatedProduct);
  };

  const handleAddReply = (reviewId: number, newReply: Omit<Reply, "id">) => {
    if (!product.userReviews) return;

    const updatedUserReviews = product.userReviews.map((review) => {
      if (review.id === reviewId) {
        const replies = review.replies || [];
        const newReplyWithId = {
          ...newReply,
          id: replies.length + 1,
        };
        return {
          ...review,
          replies: [...replies, newReplyWithId],
        };
      }
      return review;
    });

    setProduct({
      ...product,
      userReviews: updatedUserReviews,
    });
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    if (isInWishlistState) {
      // Tìm item trong wishlist để lấy id
      const item = wishlist?.find(
        (i) => String(i.product_id) === String(product.id)
      );
      if (item) {
        await removeFromWishlist(String(item.id));
        setIsInWishlistState(false);
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist`,
        });
      }
    } else {
      await addToWishlist(String(product.id));
      setIsInWishlistState(true);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const handleShare = (platform: string) => {
    const currentUrl = window.location.href;
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl
        )}&text=${encodeURIComponent(product.name)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          currentUrl
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(currentUrl);
        toast({
          title: "Link copied",
          description: "Product link copied to clipboard",
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }

    setIsShareOpen(false);
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

  const stockLevel = isCurrentlyInStock() ? "In Stock" : "Out of Stock";
  const stockIndicator = isCurrentlyInStock() ? "bg-green-500" : "bg-red-500";

  // Generate random statistics for demo purposes
  const totalPurchases = Math.floor(Math.random() * 500) + 50;
  const totalLikes = Math.floor(Math.random() * 200) + 30;
  const totalViews = Math.floor(Math.random() * 5000) + 500;

  // Calculate total review pages
  const totalReviews = product.userReviews?.length || 0;
  const totalReviewPages = Math.ceil(totalReviews / reviewsPerPage);

  // Get current page reviews
  const getCurrentReviews = () => {
    if (!product.userReviews) return [];
    const startIndex = (reviewPage - 1) * reviewsPerPage;
    return product.userReviews.slice(startIndex, startIndex + reviewsPerPage);
  };

  const currentReviews = getCurrentReviews();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      {/* Breadcrumb navigation */}
      <div className="flex items-center mb-8 text-sm overflow-x-auto whitespace-nowrap pb-2">
        <Link to="/" className="text-muted-foreground hover:text-primary">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/search" className="text-muted-foreground hover:text-primary">
          Products
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link
          to={`/search?category=${encodeURIComponent(product.category)}`}
          className="text-muted-foreground hover:text-primary"
        >
          {product.category}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-foreground font-medium truncate">
          {product.name}
        </span>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Product Gallery - Left Column */}
        <div>
          <ProductGallery
            mainImage={selectedColor?.image || product.image}
            productName={product.name}
            additionalImages={productImages}
            discount={product.discount}
            isNew={product.new}
          />
        </div>

        {/* Product Info - Right Column */}
        <div className="space-y-8">
          <div>
            {product.new && (
              <Badge variant="default" className="bg-green-600 text-white mb-2">
                NEW
              </Badge>
            )}
            {product.discount && (
              <Badge variant="destructive" className="mb-2 ml-2">
                SAVE {product.discount}%
              </Badge>
            )}
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
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

          {/* Price Section */}
          <div className="space-y-1">
            {discountedPrice ? (
              <div className="flex items-center">
                <div className="text-xl md:text-2xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </div>
                <div className="ml-2 text-muted-foreground line-through">
                  ${currentPrice.toFixed(2)}
                </div>
                <Badge variant="destructive" className="ml-2">
                  {product.discount}% OFF
                </Badge>
              </div>
            ) : (
              <div className="text-xl md:text-2xl font-bold text-primary">
                ${currentPrice.toFixed(2)}
              </div>
            )}

            {/* Stock status */}
            <div className="flex items-center mt-2">
              <div className={`h-3 w-3 rounded-full ${stockIndicator}`}></div>
              <span className="ml-2 text-sm font-medium">{stockLevel}</span>
              {isCurrentlyInStock() && (
                <span className="ml-2 text-sm text-muted-foreground">
                  - Usually ships in 1-2 business days
                </span>
              )}
            </div>
          </div>

          {/* Product Statistics */}
          <div className="grid grid-cols-3 gap-4 border-t border-b py-3">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center text-primary">
                <Package className="h-4 w-4 mr-1" />
                <span className="font-semibold">{totalPurchases}</span>
              </div>
              <span className="text-xs text-muted-foreground">Purchases</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center border-x">
              <div className="flex items-center text-primary">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span className="font-semibold">{totalLikes}</span>
              </div>
              <span className="text-xs text-muted-foreground">Likes</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center text-primary">
                <Eye className="h-4 w-4 mr-1" />
                <span className="font-semibold">{totalViews}</span>
              </div>
              <span className="text-xs text-muted-foreground">Views</span>
            </div>
          </div>

          {/* Model Selection */}
          {product.models && product.models.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Model</h3>
              <RadioGroup
                defaultValue={product.models[0].id.toString()}
                onValueChange={(value) => {
                  const model = product.models?.find(
                    (m) => m.id.toString() === value
                  );
                  if (model) handleModelSelect(model);
                }}
                className="flex flex-wrap gap-2"
              >
                {product.models.map((model) => (
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
                      {model.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Color Selection */}
          {selectedModel &&
            selectedModel.colors &&
            selectedModel.colors.length > 0 && (
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
                          : "border-transparent hover:border-muted-foreground/50"
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
                  Selected:{" "}
                  <span className="font-medium">{selectedColor?.name}</span>
                </p>
              </div>
            )}

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!isCurrentlyInStock() || quantity <= 1}
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
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlistState
                      ? "fill-red-500 text-red-500 animate-heartbeat"
                      : ""
                  }`}
                />
              </Button>

              {/* Share Button */}
              <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2">
                    <p className="text-sm font-medium px-2 py-1 mb-1">
                      Share this product
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start mb-1"
                      onClick={() => handleShare("facebook")}
                    >
                      <Facebook className="h-4 w-4 mr-2" /> Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start mb-1"
                      onClick={() => handleShare("twitter")}
                    >
                      <Twitter className="h-4 w-4 mr-2" /> Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start mb-1"
                      onClick={() => handleShare("linkedin")}
                    >
                      <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleShare("copy")}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy Link
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
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
        </div>
      </div>

      {/* Product Information Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {/* Description Card */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Info className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Product Description</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {product.description}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Brand</span>
              <span className="font-medium">StoreX</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Warranty</span>
              <span className="font-medium">2 Years</span>
            </div>
          </div>
        </Card>

        {/* Features Card */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Key Features</h3>
          </div>
          <ul className="space-y-2">
            {product.features?.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start text-sm">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          {product.features && product.features.length > 4 && (
            <p className="text-xs text-muted-foreground mt-3">
              +{product.features.length - 4} more features
            </p>
          )}
        </Card>

        {/* Shipping & Service Card */}
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-4">
            <Truck className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Shipping & Service</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Truck className="h-4 w-4 text-primary mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-sm">
              <RefreshCw className="h-4 w-4 text-primary mr-2" />
              <span>30-day return policy</span>
            </div>
            <div className="flex items-center text-sm">
              <ShieldCheck className="h-4 w-4 text-primary mr-2" />
              <span>2-year warranty included</span>
            </div>
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 text-primary mr-2" />
              <span>Quality guarantee</span>
            </div>
          </div>
        </Card>
      </div>

      {/* What's in the Box Section */}
      <Card className="p-8 mb-16">
        <div className="text-center mb-8">
          <Package className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-2xl font-bold">What's in the Box</h2>
          <p className="text-muted-foreground mt-2">
            Everything you need to get started
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { item: product.name, icon: Package },
            { item: "User Manual", icon: Info },
            { item: "Warranty Card", icon: ShieldCheck },
            { item: "Charging Cable", icon: Zap },
            { item: "Power Adapter", icon: Zap },
          ].map((boxItem, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"
            >
              <boxItem.icon className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-medium">{boxItem.item}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Reviews Section */}
      <Card className="p-8 mb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <MessageSquare className="h-6 w-6 mr-3" />
              Customer Reviews
            </h2>
            <div className="flex items-center mt-2">
              <div className="flex">
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
              <span className="ml-2 font-medium">
                {product.rating} out of 5
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>
        </div>

        <ReviewSection
          productId={product.id}
          reviews={currentReviews}
          onAddReview={handleAddReview}
          onAddReply={handleAddReply}
        />

        {/* Pagination */}
        {totalReviewPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReviewPage((prev) => Math.max(prev - 1, 1))}
                disabled={reviewPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalReviewPages)].map((_, i) => (
                <Button
                  key={i}
                  variant={reviewPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReviewPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setReviewPage((prev) => Math.min(prev + 1, totalReviewPages))
                }
                disabled={reviewPage === totalReviewPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Recently Viewed Products - Desktop */}
      {recentlyViewed.length > 0 && (
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-3" />
            Recently Viewed
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="aspect-square overflow-hidden bg-muted/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm truncate mb-2">
                    {item.name}
                  </h3>
                  <p className="text-lg font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductDetail;
