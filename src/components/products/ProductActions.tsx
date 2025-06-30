import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { addToCart } from "@/store/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistItem,
  isInWishlist as isInWishlistSelector,
} from "@/store/slices/wishlistSlice";

interface ProductActionsProps {
  productId: string;
  productName: string;
  price: number;
  inStock: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  productName,
  price,
  inStock,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  // Cart state
  const cart = useSelector((state: RootState) => state.cart.cart);
  const cartLoading = useSelector((state: RootState) => state.cart.isLoading);
  // Wishlist state
  const wishlist = useSelector((state: RootState) =>
    state.wishlist && "wishlist" in state.wishlist
      ? state.wishlist.wishlist
      : []
  );
  const wishlistLoading = useSelector((state: RootState) =>
    state.wishlist && "isLoading" in state.wishlist
      ? state.wishlist.isLoading
      : false
  );

  // Selector util
  const isInCartProduct = cart?.cart_items?.some(
    (item) => String(item.product_id) === String(productId)
  );
  const isInWishlistProduct = isInWishlistSelector(wishlist, productId);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login hoặc hiển thị modal đăng nhập
      return;
    }
    await dispatch(addToCart({ product_id: productId, quantity: 1 }));
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      // Redirect to login hoặc hiển thị modal đăng nhập
      return;
    }
    if (isInWishlistProduct) {
      // Tìm itemId để xóa
      const wishlistItem = getWishlistItem(wishlist, productId);
      if (wishlistItem) {
        await dispatch(removeFromWishlist(String(wishlistItem.id)));
      }
    } else {
      await dispatch(addToWishlist(productId));
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        onClick={handleAddToCart}
        disabled={!inStock || cartLoading}
        className="flex-1"
        variant={isInCartProduct ? "outline" : "default"}
      >
        {cartLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4 mr-2" />
        )}
        {isInCartProduct ? "Đã có trong giỏ" : "Thêm vào giỏ"}
      </Button>

      <Button
        onClick={handleToggleWishlist}
        disabled={wishlistLoading}
        variant={isInWishlistProduct ? "default" : "outline"}
        size="icon"
      >
        {wishlistLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Heart
            className={`w-4 h-4 ${isInWishlistProduct ? "fill-current" : ""}`}
          />
        )}
      </Button>
    </div>
  );
};
