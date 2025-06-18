import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Loader2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

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
  const { addToCart, isInCart, isLoading: cartLoading } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isLoading: wishlistLoading,
  } = useWishlist();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login hoặc hiển thị modal đăng nhập
      return;
    }
    await addToCart(productId, 1);
  };

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      // Redirect to login hoặc hiển thị modal đăng nhập
      return;
    }

    if (isInWishlist(productId)) {
      // Tìm itemId để xóa
      const wishlistItem = useWishlist().getWishlistItem(productId);
      if (wishlistItem) {
        await removeFromWishlist(wishlistItem.id);
      }
    } else {
      await addToWishlist(productId);
    }
  };

  const isInCartProduct = isInCart(productId);
  const isInWishlistProduct = isInWishlist(productId);

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
