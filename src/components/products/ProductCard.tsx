import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ShoppingBag, Zap, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } =
    useWishlist();
  const { toast } = useToast();
  const [inWishlist, setInWishlist] = useState(
    isInWishlist(String(product.id))
  );

  // Lấy hình ảnh chính và hình ảnh thứ 2 từ BE
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : product.image_url;
  const secondImage =
    product.images && product.images.length > 1
      ? product.images[1].image_url
      : mainImage;

  // Hàm cắt ngắn tên sản phẩm
  const truncateProductName = (name: string, maxLength: number = 20) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength).trim() + "...";
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      // Tìm item trong wishlist để lấy id
      const item = wishlist?.find(
        (i) => String(i.product_id) === String(product.id)
      );
      if (item) {
        await removeFromWishlist(String(item.id));
        setInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist`,
        });
      }
    } else {
      await addToWishlist(String(product.id));
      setInWishlist(true);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toast({
      title: "Mua nhanh",
      description: `${product.name} đã được thêm vào giỏ hàng. Đang chuyển đến trang thanh toán...`,
    });

    // Thực tế nên thêm sản phẩm vào giỏ trước khi chuyển trang
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/product/${product.id}`);
  };

  return (
    <Card className="glass-card hover-scale overflow-hidden border-none shadow-lg h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered ? secondImage : mainImage}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={handleAddToWishlist}
              className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  inWishlist
                    ? "fill-red-500 text-red-500 animate-heartbeat"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>
          {isHovered && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto flex justify-center space-x-2 animate-fade-in">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/80 hover:bg-white text-gray-800"
                onClick={handleQuickView}
              >
                <Eye className="h-4 w-4 mr-1" /> Xem nhanh
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-primary/90 hover:bg-primary text-white"
                onClick={handleQuickBuy}
              >
                <Zap className="h-4 w-4 mr-1" /> Mua nhanh
              </Button>
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <h3
                className="text-xl font-semibold mb-1 leading-tight"
                title={product.name}
              >
                {truncateProductName(product.name)}
              </h3>
            </div>
            <div className="text-right flex-shrink-0">
              {product.ProductPricing?.sale_price ? (
                <>
                  <p className="text-lg font-medium text-primary">
                    ₫
                    {Number(product.ProductPricing.sale_price).toLocaleString()}
                  </p>
                  <p className="text-sm line-through text-muted-foreground">
                    ₫
                    {Number(product.ProductPricing.base_price).toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-lg font-medium text-primary">
                  ₫
                  {Number(
                    product.ProductPricing?.base_price || product.price
                  ).toLocaleString()}
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full mt-auto shadow-sm hover:shadow-md transition-shadow"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Thêm vào giỏ hàng
          </Button>
        </div>
      </Link>
    </Card>
  );
};
