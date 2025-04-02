
import { useToast } from "@/hooks/use-toast";

// Interface for a product
export interface WishlistProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

/**
 * Add a product to the wishlist
 * @param product The product to add to the wishlist
 * @returns A boolean indicating if the operation was successful
 */
export const addToWishlist = (product: WishlistProduct): boolean => {
  try {
    // Get current liked product IDs from localStorage
    const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    
    // Check if product is already in the wishlist
    if (likedProductIds.includes(product.id)) {
      return false; // Product already in wishlist
    }
    
    // Add the product ID to the liked products array
    const updatedLikedProducts = [...likedProductIds, product.id];
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    
    // Also store the full product data for easy retrieval
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const productExists = allProducts.some((p: WishlistProduct) => p.id === product.id);
    
    if (!productExists) {
      // Add the product to all products
      const updatedProducts = [...allProducts, product];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
    
    // Dispatch a custom event so other components can react to the change
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    return true;
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    return false;
  }
};

/**
 * Remove a product from the wishlist
 * @param productId The ID of the product to remove
 * @returns A boolean indicating if the operation was successful
 */
export const removeFromWishlist = (productId: number): boolean => {
  try {
    // Get current liked product IDs from localStorage
    const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    
    // Check if product is in the wishlist
    if (!likedProductIds.includes(productId)) {
      return false; // Product not in wishlist
    }
    
    // Remove the product ID from the liked products array
    const updatedLikedProducts = likedProductIds.filter((id: number) => id !== productId);
    localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));
    
    // Dispatch a custom event so other components can react to the change
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
    
    return true;
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    return false;
  }
};

/**
 * Check if a product is in the wishlist
 * @param productId The ID of the product to check
 * @returns A boolean indicating if the product is in the wishlist
 */
export const isInWishlist = (productId: number): boolean => {
  try {
    // Get current liked product IDs from localStorage
    const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    
    // Check if product is in the wishlist
    return likedProductIds.includes(productId);
  } catch (error) {
    console.error('Error checking if product is in wishlist:', error);
    return false;
  }
};

/**
 * Toggle a product in the wishlist (add if not present, remove if present)
 * @param product The product to toggle
 * @returns A boolean indicating the new state (true if added, false if removed)
 */
export const toggleWishlist = (product: WishlistProduct): boolean => {
  const isLiked = isInWishlist(product.id);
  
  if (isLiked) {
    removeFromWishlist(product.id);
    return false;
  } else {
    addToWishlist(product);
    return true;
  }
};

/**
 * Get all products in the wishlist
 * @returns An array of products in the wishlist
 */
export const getWishlistProducts = (): WishlistProduct[] => {
  try {
    // Get current liked product IDs from localStorage
    const likedProductIds = JSON.parse(localStorage.getItem('likedProducts') || '[]');
    
    // Get all products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Filter only liked products
    return allProducts.filter((product: WishlistProduct) => 
      likedProductIds.includes(product.id)
    );
  } catch (error) {
    console.error('Error getting wishlist products:', error);
    return [];
  }
};

/**
 * Hook to handle wishlist operations with toast notifications
 */
export const useWishlist = () => {
  const { toast } = useToast();
  
  const addProductToWishlist = (product: WishlistProduct): boolean => {
    const success = addToWishlist(product);
    
    if (success) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } else {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist`,
      });
    }
    
    return success;
  };
  
  const removeProductFromWishlist = (product: WishlistProduct | { id: number, name: string }): boolean => {
    const success = removeFromWishlist(product.id);
    
    if (success) {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    }
    
    return success;
  };
  
  const toggleProductInWishlist = (product: WishlistProduct): boolean => {
    const isAdded = toggleWishlist(product);
    
    if (isAdded) {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } else {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    }
    
    return isAdded;
  };
  
  return {
    addToWishlist: addProductToWishlist,
    removeFromWishlist: removeProductFromWishlist,
    toggleWishlist: toggleProductInWishlist,
    isInWishlist,
    getWishlistProducts,
  };
};
