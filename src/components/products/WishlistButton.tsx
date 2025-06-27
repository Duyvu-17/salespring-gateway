import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
} from "@/store/slices/wishlistSlice";
import { WishlistItem } from "@/types/wishlist";
import { AppDispatch } from "@/store";

interface WishlistButtonProps {
  item: WishlistItem;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export const WishlistButton = ({
  item,
  variant = "outline",
  size = "default",
  showText = true,
}: WishlistButtonProps) => {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch<AppDispatch>();
  const [inWishlist, setInWishlist] = useState<boolean>(
    isInWishlist(wishlist, String(item.product_id))
  );

  useEffect(() => {
    setInWishlist(isInWishlist(wishlist, String(item.product_id)));
  }, [item.product_id, wishlist]);

  const handleToggleWishlist = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(String(item.id)));
      setInWishlist(false);
    } else {
      dispatch(addToWishlist(String(item.product_id)));
      setInWishlist(true);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={
        inWishlist
          ? "text-red-500 border-red-200 hover:text-red-600 hover:border-red-300"
          : ""
      }
    >
      <Heart
        className={`h-4 w-4 ${inWishlist ? "fill-red-500 text-red-500" : ""} ${
          showText ? "mr-2" : ""
        }`}
      />
      {showText && (inWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
    </Button>
  );
};

export default WishlistButton;
