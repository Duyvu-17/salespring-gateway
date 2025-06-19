import { useState } from "react";
import { Link } from "react-router-dom";
import { useLazyLoad } from "@/hooks/use-lazy-load";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Loader2 } from "lucide-react";
import { WishlistItem } from "@/types/wishlist";
import { Product } from "@/data/products";
import { useCartNotificationContext } from "../../App";

interface WishlistProductGridProps {
  products: WishlistItem[];
  onRemove: (item: WishlistItem) => void;
  initialCount?: number;
  loadMoreCount?: number;
}

export const WishlistProductGrid = ({
  products,
  onRemove,
  initialCount = 8,
  loadMoreCount = 4,
}: WishlistProductGridProps) => {
  const { visibleItems, loadingRef, hasMore, isLoading } =
    useLazyLoad<WishlistItem>(products, initialCount, loadMoreCount);
  const { showCartNotification } = useCartNotificationContext();

  const handleAddToCart = (item: WishlistItem): void => {
    // Convert WishlistItem.Product to a partial Product for notification
    if (!item.Product) return;
    const enhancedProduct: Product = {
      id: item.Product.id,
      name: item.Product.name,
      price: Number(item.Product.price),
      image: item.Product.image_url || "",
      description: item.Product.description || "",
      category: "",
      // Các trường bổ sung nếu cần
      rating: 0,
      reviews: 0,
      inStock: true,
    };
    showCartNotification(enhancedProduct);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            className="group overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <Link to={`/product/${item.Product?.id}`} className="block">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.Product?.image_url || ""}
                  alt={item.Product?.name || ""}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <CardHeader className="pb-0">
                <CardTitle className="line-clamp-1">
                  {item.Product?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="font-bold text-lg">
                  ${item.Product ? Number(item.Product.price).toFixed(2) : ""}
                </p>
                <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                  {item.Product?.description}
                </p>
              </CardContent>
            </Link>
            <CardFooter className="flex justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => onRemove(item)}
              >
                <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
                Remove
              </Button>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => handleAddToCart(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {(hasMore || isLoading) && (
        <div
          ref={loadingRef}
          className="w-full flex justify-center items-center py-8 mt-6"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">
                Loading more items...
              </span>
            </div>
          ) : (
            <div className="h-10" />
          )}
        </div>
      )}
    </>
  );
};
