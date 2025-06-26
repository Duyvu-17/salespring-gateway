import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const WishlistIndicator = () => {
  const wishlist =
    useSelector((state: RootState) => state.wishlist.wishlist) || [];
  const count = wishlist.length;

  return (
    <Link to="/wishlist">
      <Button variant="ghost" size="sm" className="relative">
        <Heart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
        <span className="sr-only">Wishlist</span>
      </Button>
    </Link>
  );
};

export default WishlistIndicator;
