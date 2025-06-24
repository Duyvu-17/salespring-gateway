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
import { reviewService } from "@/services/review.service";
import { productService } from "@/services/product.service";
import ProductInfo from "@/components/products/ProductInfo";
import ProductStatistics from "@/components/products/ProductStatistics";
import ProductBoxContent from "@/components/products/ProductBoxContent";
import RecentlyViewedProducts from "@/components/products/RecentlyViewedProducts";
import ProductFeatures from "@/components/products/ProductFeatures";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { Product } from "@/types/product";
import type { ProductModel, ProductColor, UserReview } from "@/data/products";
import { categories } from "@/data/products";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isInWishlist, addToWishlist, removeFromWishlist, wishlist } =
    useWishlist();
  const { isAuthenticated } = useAuth();

  const [reviewPage, setReviewPage] = useState<number>(1);
  const reviewsPerPage = 3;
  const [reviews, setReviews] = useState<UserReview[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await productService.getById(Number(id));
        setProduct(res);
        // Lấy review từ BE
        const fetchedReviews = await reviewService.getReviews(res.id);
        setReviews(fetchedReviews);
        // Thêm vào recently viewed qua context
        const mainImage =
          res.image_url || res.images?.find((img) => img.is_main)?.image_url;
        // Map category_id sang tên
        const categoryObj = categories.find(
          (c) => String(c.id) === String(res.category_id)
        );
        const categoryName = categoryObj ? categoryObj.name : "";
        addRecentlyViewed({
          id: res.id,
          name: res.name,
          image: mainImage,
          price: Number(res?.pricing?.sale_price) || Number(res.pricing.base_price) || Number(res.pricing.cost_price),
          category: categoryName,
        });
      } catch (e: unknown) {
        setProduct(null);
      }
    })();
  }, [id]);

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

  // Lấy dữ liệu từ product chuẩn hóa
  const mainImage =
    product.image_url || product.images?.find((img) => img.is_main)?.image_url;
  const additionalImages = product.images?.filter((img) => !img.is_main) || [];
  // Map category_id sang tên
  const categoryObj = categories.find(
    (c) => String(c.id) === String(product.category_id)
  );
  const categoryName = categoryObj ? categoryObj.name : "";
  // Không có brandName vì không có dữ liệu brand
  const brandName = "";
  const price = Number(product.price);
  const stock = product.stock;

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

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    // Reset color selection when model changes
    if (model.colors && model.colors.length > 0) {
      setSelectedColor(model.colors[0]);
    } else {
      setSelectedColor(null);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleAddReview = async (review) => {
    if (!product) return;
    await reviewService.addReview(product.id, review);
    const updatedReviews = await reviewService.getReviews(product.id);
    setReviews(updatedReviews);
  };

  const handleAddReply = async (reviewId: number, reply) => {
    if (!product) return;
    await reviewService.addReply(product.id, reviewId, reply);
    const updatedReviews = await reviewService.getReviews(product.id);
    setReviews(updatedReviews);
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!product) return;
    await reviewService.deleteReview(product.id, reviewId);
    const updatedReviews = await reviewService.getReviews(product.id);
    setReviews(updatedReviews);
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
    return price;
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
    return stock;
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
          to={`/search?category=${encodeURIComponent(categoryName)}`}
          className="text-muted-foreground hover:text-primary"
        >
          {categoryName}
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
            mainImage={mainImage}
            productName={product.name}
            additionalImages={additionalImages}
            discount={product.discount}
            isNew={product.new}
          />
        </div>
        {/* Product Info - Right Column */}
        <div>
          <ProductInfo
            product={product}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            isInWishlistState={isInWishlistState}
            handleAddToWishlist={handleAddToWishlist}
            isShareOpen={isShareOpen}
            setIsShareOpen={setIsShareOpen}
            handleShare={handleShare}
            isCurrentlyInStock={isCurrentlyInStock}
            stockLevel={stockLevel}
            stockIndicator={stockIndicator}
            currentPrice={currentPrice}
            discountedPrice={discountedPrice}
            categoryName={categoryName}
            brandName={brandName}
          />
          <ProductStatistics
            totalPurchases={totalPurchases}
            totalLikes={totalLikes}
            totalViews={totalViews}
          />
        </div>
      </div>
      {/* Product Information Cards Section */}
      <ProductFeatures
        product={product}
        brandName={brandName}
        categoryName={categoryName}
      />
      {/* What's in the Box Section */}
      <ProductBoxContent product={product} />
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
                      i < Math.floor(Number(product.rating_avg))
                        ? "text-yellow-400 fill-yellow-400"
                        : i < Number(product.rating_avg)
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 font-medium">
                {Number(product.rating_avg).toFixed(2)} trên 5 sao
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.rating_count} đánh giá)
              </span>
            </div>
          </div>
        </div>
        <ReviewSection
          productId={product.id}
          reviews={reviews}
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
      <RecentlyViewedProducts
        recentlyViewed={recentlyViewed}
        navigate={navigate}
      />
    </div>
  );
};

export default ProductDetail;
