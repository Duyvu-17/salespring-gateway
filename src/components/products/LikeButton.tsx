
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LikeButtonProps {
  productId: string;
  size?: "sm" | "md" | "lg";
}

export const LikeButton = ({ productId, size = "md" }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  // Check if product is already liked on component mount
  useEffect(() => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    setIsLiked(likedProducts.includes(productId));
  }, [productId]);

  const toggleLike = () => {
    const likedProducts = JSON.parse(localStorage.getItem("likedProducts") || "[]");
    
    let updatedLikedProducts;
    if (isLiked) {
      // Remove from liked products
      updatedLikedProducts = likedProducts.filter((id: string) => id !== productId);
      toast({
        title: "Removed from favorites",
        description: "Product has been removed from your favorites",
      });
    } else {
      // Add to liked products
      updatedLikedProducts = [...likedProducts, productId];
      toast({
        title: "Added to favorites",
        description: "Product has been added to your favorites",
      });
    }
    
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    setIsLiked(!isLiked);
  };

  // Size classes mapping
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hover:bg-primary/10 ${isLiked ? "text-red-500" : ""}`}
      onClick={toggleLike}
    >
      <Heart className={`${sizeClasses[size]} ${isLiked ? "fill-current" : ""}`} />
    </Button>
  );
};
