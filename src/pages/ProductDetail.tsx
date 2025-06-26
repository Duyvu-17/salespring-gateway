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
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductGallery } from "@/components/products/ProductGallery";
import ReviewSection from "@/components/products/ReviewSection";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistItem,
  isInWishlist as isInWishlistSelector,
} from "@/store/slices/wishlistSlice";
import { addRecentlyViewed } from "@/store/slices/recentlyViewedSlice";
import { createSelector } from "@reduxjs/toolkit";
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
import { Product } from "@/types/product";
import type { ProductModel, ProductColor, UserReview } from "@/data/products";

const EMPTY_ARRAY: any[] = [];
const selectWishlist = (state: RootState) =>
  state.wishlist.wishlist || EMPTY_ARRAY;
const selectRecentlyViewed = (state: RootState) =>
  state.recentlyViewed.recentlyViewed ?? [];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [product, setProduct] = useState<any>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector(selectWishlist);
  const recentlyViewed = useSelector(selectRecentlyViewed);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const isInWishlistState = product
    ? isInWishlistSelector(wishlist, String(product.id))
    : false;

  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reviewPage, setReviewPage] = useState<number>(1);
  const reviewsPerPage = 3;
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"info" | "reviews" | "faq">(
    "info"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await productService.getById(Number(id));
        const prod = res;
        setProduct(prod);
        // Lấy review từ BE
        const fetchedReviews = await reviewService.getReviews(prod.id);
        setReviews(fetchedReviews);
        // Thêm vào recently viewed qua redux
        const mainImage =
          prod.image_url ||
          prod.images?.find((img: any) => img.is_main)?.image_url;
        dispatch(
          addRecentlyViewed({
            id: prod.id,
            name: prod.name,
            image: mainImage,
            price:
              Number(prod.pricing?.sale_price) ||
              Number(prod.pricing?.base_price) ||
              0,
            category: prod.category?.name || "",
          })
        );
      } catch (e: unknown) {
        setProduct(null);
      }
    })();
  }, [id, dispatch]);

  // Tự động chọn variant đầu tiên khi load product
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  // Khi chọn variant mới, tự động set ảnh chính
  useEffect(() => {
    if (selectedVariant) {
      const main = selectedVariant.images?.find(
        (img: any) => img.is_main
      )?.image_url;
      setSelectedImage(
        main || selectedVariant.images?.[0]?.image_url || product?.image_url
      );
    } else if (product) {
      setSelectedImage(product.image_url);
    }
  }, [selectedVariant, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Not Found
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              We couldn't find the product you're looking for. It might have
              been removed or doesn't exist.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Lấy dữ liệu từ product chuẩn hóa
  const mainImage =
    selectedVariant?.images?.find((img: any) => img.is_main)?.image_url ||
    product.image_url ||
    product.images?.find((img: any) => img.is_main)?.image_url;
  const additionalImages =
    selectedVariant?.images?.filter((img: any) => !img.is_main) ||
    product.images?.filter((img: any) => !img.is_main) ||
    [];
  const categoryName = product.category?.name || "";
  const brandName = product.brand?.name || "";
  const price = Number(product.pricing?.base_price) || 0;
  const salePrice = Number(product.pricing?.sale_price) || null;
  const stock = product.inventory?.quantity ?? 0;

  // Giá và tồn kho theo variant
  const currentPrice = selectedVariant
    ? Number(selectedVariant.sale_price) || Number(selectedVariant.price)
    : salePrice || price;
  const currentStock = selectedVariant ? selectedVariant.stock : stock;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast({
        title: "Selection required",
        description: "Please select a variant before adding to cart",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Added to cart",
      description: `${product.name} - ${selectedVariant.name} x${quantity} has been added to your cart`,
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

    if (!selectedVariant) {
      toast({
        title: "Selection required",
        description: "Please select a variant before purchasing",
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
      const item = getWishlistItem(wishlist, String(product.id));
      if (item) {
        await dispatch(removeFromWishlist(String(item.id)));
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist`,
        });
      }
    } else {
      await dispatch(addToWishlist(String(product.id)));
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

  // Check if product is in stock based on selected variant
  const isCurrentlyInStock = () => {
    return currentStock > 0;
  };

  const stockLevel = isCurrentlyInStock() ? "In Stock" : "Out of Stock";
  const stockIndicator = isCurrentlyInStock() ? "bg-green-500" : "bg-red-500";

  // Generate random statistics for demo purposes
  const totalPurchases = Math.floor(Math.random() * 500) + 50;
  const totalLikes = Math.floor(Math.random() * 200) + 30;
  const totalViews = Math.floor(Math.random() * 5000) + 500;

  // Calculate total review pages
  const totalReviews = (product)?.userReviews?.length || 0;
  const totalReviewPages = Math.ceil(totalReviews / reviewsPerPage);

  // Get current page reviews
  const getCurrentReviews = () => {
    if (!(product)?.userReviews) return [];
    const startIndex = (reviewPage - 1) * reviewsPerPage;
    return (product).userReviews.slice(
      startIndex,
      startIndex + reviewsPerPage
    );
  };

  const currentReviews = getCurrentReviews();

  // Enhanced Variant Selection Component
  const VariantSelector = () => {
    if (!product.variants || product.variants.length === 0) return null;

    return (
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            Chọn phiên bản
          </h3>
          {selectedVariant && (
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/5"
            >
              {selectedVariant.name}
            </Badge>
          )}
        </div>

        {/* Compact variant buttons */}
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => {
            const isSelected = selectedVariant?.id === variant.id;
            const isOutOfStock = variant.stock <= 0;

            return (
              <button
                key={variant.id}
                disabled={isOutOfStock}
                className={`
                  relative px-4 py-2.5 rounded-lg border transition-all duration-200 
                  text-sm font-medium min-w-[120px] text-left
                  ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary shadow-sm"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                  }
                  ${
                    isOutOfStock
                      ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                      : "cursor-pointer"
                  }
                `}
                onClick={() => !isOutOfStock && setSelectedVariant(variant)}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </div>
                )}

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate pr-2">
                      {variant.name}
                    </span>
                    {variant.is_popular && (
                      <Badge className="bg-orange-400 text-white text-xs px-1.5 py-0.5 h-auto">
                        Hot
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {Number(
                        variant.sale_price || variant.price
                      ).toLocaleString("vi-VN")}
                      ₫
                    </span>
                    {variant.sale_price &&
                      variant.price !== variant.sale_price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {Number(variant.price).toLocaleString("vi-VN")}₫
                        </span>
                      )}
                  </div>

                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        variant.stock > 10
                          ? "bg-green-500"
                          : variant.stock > 0
                          ? "bg-yellow-500"
                          : "bg-destructive"
                      }`}
                    />
                    <span className="text-xs text-muted-foreground">
                      {isOutOfStock
                        ? "Hết hàng"
                        : variant.stock > 10
                        ? "Còn hàng"
                        : `Còn ${variant.stock}`}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected variant summary - more compact */}
        {selectedVariant && (
          <div className="p-3 bg-gradient-to-r from-primary/10 to-primary rounded-lg border border-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <span className="font-medium text-primary text-sm">
                    {selectedVariant.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-bold text-primary">
                      {Number(
                        selectedVariant.sale_price || selectedVariant.price
                      ).toLocaleString("vi-VN")}
                      ₫
                    </span>
                    {selectedVariant.sale_price &&
                      selectedVariant.price !== selectedVariant.sale_price && (
                        <>
                          <span className="text-xs text-primary line-through">
                            {Number(selectedVariant.price).toLocaleString(
                              "vi-VN"
                            )}
                            ₫
                          </span>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 text-xs px-1.5 py-0.5 h-auto"
                          >
                            -
                            {Math.round(
                              ((selectedVariant.price -
                                selectedVariant.sale_price) /
                                selectedVariant.price) *
                                100
                            )}
                            %
                          </Badge>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Product Images */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
              <img
                src={selectedImage || mainImage}
                alt={product.name}
                className="w-full h-[400px] object-cover object-center"
              />
            </div>
            {/* Thumbnails nếu có nhiều ảnh */}
            {((selectedVariant && selectedVariant.images?.length > 1) ||
              additionalImages.length > 0) && (
              <div className="flex gap-2 mt-4">
                {(selectedVariant?.images || additionalImages).map(
                  (img) => (
                    <img
                      key={img.id}
                      src={img.image_url}
                      alt=""
                      onClick={() => setSelectedImage(img.image_url)}
                      className={`w-16 h-16 object-cover rounded-lg border cursor-pointer transition-all duration-150 ${
                        selectedImage === img.image_url
                          ? "border-primary ring-2 ring-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    />
                  )
                )}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Tên, rating */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(Number(product.rating_avg))
                          ? "text-yellow-400 fill-yellow-400"
                          : i < Number(product.rating_avg)
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-muted-foreground text-sm">
                  {Number(product.rating_avg).toFixed(2)} trên 5 sao
                </span>
                <span className="ml-2 text-muted-foreground text-sm">
                  ({product.rating_count} đánh giá)
                </span>
              </div>
            </div>

            {/* Giá & giảm giá */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {Number(
                  selectedVariant?.sale_price || selectedVariant?.price
                ).toLocaleString("vi-VN")}
                ₫
              </span>
              {selectedVariant?.sale_price && (
                <span className="line-through text-muted-foreground text-xl">
                  {Number(selectedVariant.price).toLocaleString("vi-VN")}₫
                </span>
              )}
              {/* Badge giảm giá */}
              {product.discounts?.map((d) => (
                <span
                  key={d.id}
                  className="bg-destructive/10 text-destructive px-2 py-0.5 rounded text-xs ml-2"
                >
                  {d.name} -{d.value}%
                </span>
              ))}
            </div>

            {/* Chọn variant */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 text-foreground">
                  Chọn phiên bản
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      className={`min-w-[160px] text-center px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium
                        ${
                          selectedVariant?.id === variant.id
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                        }
                        ${
                          variant.stock <= 0
                            ? "opacity-50 cursor-not-allowed bg-muted text-muted-foreground"
                            : "cursor-pointer"
                        }`}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={variant.stock <= 0}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate pr-2">
                          {variant.name}
                        </span>
                        {variant.is_popular && (
                          <Badge className="bg-orange-400 text-white text-xs px-1.5 py-0.5 h-auto ml-2">
                            Hot
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-foreground">
                          {Number(
                            variant.sale_price || variant.price
                          ).toLocaleString("vi-VN")}
                          ₫
                        </span>
                        {variant.sale_price &&
                          variant.price !== variant.sale_price && (
                            <span className="text-xs text-muted-foreground line-through">
                              {Number(variant.price).toLocaleString("vi-VN")}₫
                            </span>
                          )}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            variant.stock > 10
                              ? "bg-green-500"
                              : variant.stock > 0
                              ? "bg-yellow-500"
                              : "bg-destructive"
                          }`}
                        />
                        <span className="text-xs text-muted-foreground">
                          {variant.stock <= 0
                            ? "Hết hàng"
                            : variant.stock > 10
                            ? "Còn hàng"
                            : `Còn ${variant.stock}`}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Số lượng, Add to Cart */}
            <div className="flex items-center gap-4 mt-4">
              <input
                type="number"
                min={1}
                max={selectedVariant?.stock || 1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border rounded-lg px-3 py-2 text-lg text-center focus:ring-2 focus:ring-primary"
              />
              <button
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-primary/90 transition text-lg"
                onClick={handleAddToCart}
                disabled={selectedVariant?.stock <= 0}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        {/* Phần dưới giữ nguyên UI/logic ban đầu */}
        <div className="mt-16">
          {/* What's Inside */}
          <ProductFeatures
            product={product}
            brandName={brandName}
            categoryName={categoryName}
          />
          <ProductBoxContent product={product} />

          {/* Reviews */}
          <ReviewSection
            productId={product.id}
            reviews={reviews}
            onAddReview={handleAddReview}
            onAddReply={handleAddReply}
          />

          {/* FAQs hoặc các phần khác giữ nguyên */}
          {/* ... */}

          {/* Recently Viewed Products */}
          <RecentlyViewedProducts
            recentlyViewed={recentlyViewed}
            navigate={navigate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
