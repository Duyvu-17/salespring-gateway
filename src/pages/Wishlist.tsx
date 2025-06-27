import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  removeFromWishlist,
  fetchWishlist,
} from "@/store/slices/wishlistSlice";
import { productService } from "@/services/product.service";
import { WishlistProductGrid } from "@/components/products/WishlistProductGrid";
import { WishlistItem } from "@/types/wishlist";
import { createSelector } from "@reduxjs/toolkit";
// import { WishlistProduct } from "@/utils/wishlist";

// Memoized selector cho wishlist
const selectWishlist = (state: RootState) => state.wishlist.wishlist;
const selectWishlistMemo = createSelector(
  [selectWishlist],
  (wishlist) => wishlist ?? []
);

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector(selectWishlistMemo);
  const isLoading = useSelector((state: RootState) => state.wishlist.isLoading);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const authLoading = useSelector((state: RootState) => state.auth.isLoading);
  const { toast } = useToast();
  console.log(
    "Wishlist render | isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated,
    "authLoading:",
    authLoading
  );

  // Nếu wishlist là mảng (theo BE), còn nếu là object thì sửa lại cho phù hợp
  const items: WishlistItem[] = Array.isArray(wishlist) ? wishlist : [];

  // State cho sản phẩm gợi ý
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  useEffect(() => {
    dispatch(fetchWishlist());

    // Lấy sản phẩm nổi bật và giảm giá từ BE
    const fetchRecommended = async () => {
      setLoadingRecommended(true);
      try {
        const [featuredRes, saleRes] = await Promise.all([
          productService.getAll(),
          productService.getSale(),
        ]);
        const featured = Array.isArray(featuredRes)
          ? featuredRes
          : (featuredRes as any).products || [];
        const sale = Array.isArray(saleRes)
          ? saleRes
          : (saleRes as any).products || [];
        setRecommendedProducts([...featured, ...sale].slice(0, 4));
      } catch (e) {
        setRecommendedProducts([]);
      } finally {
        setLoadingRecommended(false);
      }
    };
    fetchRecommended();
  }, [dispatch]);

  const handleRemoveFromWishlist = (item: WishlistItem) => {
    dispatch(removeFromWishlist(String(item.id)));
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <span className="text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-pulse text-primary">
            Loading your wishlist...
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="space-y-8">
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <Heart className="mx-auto mb-4 text-muted-foreground h-16 w-16" />
            <h2 className="text-2xl font-semibold mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Discover items you love and add them to your wishlist to keep
              track of things you want to buy later.
            </p>
            <Link to="/">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Recommended For You</h2>
              <Link to="/search" className="text-primary flex items-center">
                VIEW ALL <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            {loadingRecommended ? (
              <div>Đang tải sản phẩm gợi ý...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-md transition-all"
                  >
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-primary font-semibold mt-1">
                          {product.ProductPricing?.sale_price
                            ? `₫${Number(
                                product.ProductPricing.sale_price
                              ).toLocaleString()}`
                            : `₫${Number(
                                product.ProductPricing?.base_price ||
                                  product.price
                              ).toLocaleString()}`}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <WishlistProductGrid
          products={items}
          onRemove={handleRemoveFromWishlist}
        />
      )}
    </div>
  );
};

export default Wishlist;
