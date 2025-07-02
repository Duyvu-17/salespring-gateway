import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Heart,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
  CreditCard,
  Star,
} from "lucide-react";

const ProductInfo = ({
  product,
  selectedModel,
  setSelectedModel,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  handleAddToCart,
  handleBuyNow,
  isInWishlistState,
  handleAddToWishlist,
  isShareOpen,
  setIsShareOpen,
  handleShare,
  isCurrentlyInStock,
  stockLevel,
  stockIndicator,
  currentPrice,
  discountedPrice,
  categoryName,
  brandName,
}) => {
  return (
    <div className="space-y-8">
      <div>
        {product.new && (
          <Badge variant="default" className="bg-green-600 text-white mb-2">
            NEW
          </Badge>
        )}
        {product.discount && (
          <Badge variant="destructive" className="mb-2 ml-2">
            SAVE {product.discount}%
          </Badge>
        )}
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        <p className="text-muted-foreground mt-1">{categoryName}</p>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
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
          <span className="ml-2 text-sm text-muted-foreground">
            {Number(product.rating_avg).toFixed(2)} trên 5 sao (
            {product.rating_count} đánh giá)
          </span>
        </div>
      </div>
      {/* Price Section */}
      <div className="space-y-1">
        {discountedPrice ? (
          <div className="flex items-center">
            <div className="text-xl md:text-2xl font-bold text-primary">
              ${discountedPrice.toFixed(2)}
            </div>
            <div className="ml-2 text-muted-foreground line-through">
              ${currentPrice.toFixed(2)}
            </div>
            <Badge variant="destructive" className="ml-2">
              {product.discount}% OFF
            </Badge>
          </div>
        ) : (
          <div className="text-xl md:text-2xl font-bold text-primary">
            ${currentPrice.toFixed(2)}
          </div>
        )}
        {/* Stock status */}
        <div className="flex items-center mt-2">
          <div className={`h-3 w-3 rounded-full ${stockIndicator}`}></div>
          <span className="ml-2 text-sm font-medium">{stockLevel}</span>
          {isCurrentlyInStock() && (
            <span className="ml-2 text-sm text-muted-foreground">
              - Usually ships in 1-2 business days
            </span>
          )}
        </div>
      </div>
      {/* Model Selection */}
      {product.models && product.models.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Model</h3>
          <RadioGroup
            defaultValue={product.models[0].id.toString()}
            onValueChange={(value) => {
              const model = product.models?.find(
                (m) => m.id.toString() === value
              );
              if (model) setSelectedModel(model);
            }}
            className="flex flex-wrap gap-2"
          >
            {product.models.map((model) => (
              <div key={model.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={model.id.toString()}
                  id={`model-${model.id}`}
                />
                <Label
                  htmlFor={`model-${model.id}`}
                  className={`px-3 py-1 border rounded-md text-sm cursor-pointer ${
                    selectedModel?.id === model.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {model.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
      {/* Color Selection */}
      {selectedModel &&
        selectedModel.colors &&
        selectedModel.colors.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color</h3>
            <div className="flex flex-wrap gap-3">
              {selectedModel.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`relative p-1 rounded-full border-2 ${
                    selectedColor?.name === color.name
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                  title={color.name}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: color.code }}
                  ></div>
                  {selectedColor?.name === color.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check className="text-white drop-shadow-md h-4 w-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Selected:{" "}
              <span className="font-medium">{selectedColor?.name}</span>
            </p>
          </div>
        )}
      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity - 1)}
              disabled={!isCurrentlyInStock() || quantity <= 1}
            >
              -
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
              disabled={!isCurrentlyInStock()}
            >
              +
            </Button>
          </div>
          <Button
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!isCurrentlyInStock()}
          >
            {isCurrentlyInStock() ? "Add to Cart" : "Out of Stock"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddToWishlist}
            className={isInWishlistState ? "bg-primary/10" : ""}
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlistState
                  ? "fill-red-500 text-red-500 animate-heartbeat"
                  : ""
              }`}
            />
          </Button>
          {/* Share Button */}
          <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="end">
              <div className="p-2">
                <p className="text-sm font-medium px-2 py-1 mb-1">
                  Share this product
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mb-1"
                  onClick={() => handleShare("facebook")}
                >
                  <Facebook className="h-4 w-4 mr-2" /> Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mb-1"
                  onClick={() => handleShare("twitter")}
                >
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start mb-1"
                  onClick={() => handleShare("linkedin")}
                >
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleShare("copy")}
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Link
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* Buy Now Button */}
        <Button
          className="w-full bg-green-600 hover:bg-green-700 flex gap-2 items-center justify-center"
          onClick={handleBuyNow}
          disabled={!isCurrentlyInStock()}
        >
          <CreditCard className="h-5 w-5" />
          {isCurrentlyInStock() ? "Buy Now" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
