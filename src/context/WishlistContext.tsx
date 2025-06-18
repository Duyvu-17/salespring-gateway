import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { wishlistService } from "@/services/wishlist.service";
import { useAuth } from "@/context/AuthContext";
import type { Wishlist, WishlistItem } from "@/types/wishlist";

// Define types for our wishlist context
type WishlistContextType = {
  wishlist: Wishlist | null;
  isLoading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  clearWishlist: () => Promise<void>;
  getWishlistItem: (productId: string) => WishlistItem | undefined;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
};

// Create the context with default values
const WishlistContext = createContext<WishlistContextType>({
  wishlist: null,
  isLoading: true,
  addToWishlist: async () => {},
  removeFromWishlist: async () => {},
  clearWishlist: async () => {},
  getWishlistItem: () => undefined,
  isInWishlist: () => false,
  refreshWishlist: async () => {},
});

// Custom hook to use wishlist context
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const loadWishlist = async () => {
    if (!isAuthenticated) {
      setWishlist(null);
      setIsLoading(false);
      return;
    }

    try {
      const wishlistData = await wishlistService.getWishlist();
      setWishlist(wishlistData);
    } catch (error) {
      console.error("Lỗi khi tải danh sách yêu thích:", error);
      setWishlist(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [isAuthenticated]);

  const addToWishlist = async (productId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Vui lòng đăng nhập",
        description:
          "Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedWishlist = await wishlistService.addToWishlist(productId);
      setWishlist(updatedWishlist);
      toast({
        title: "Thêm vào danh sách yêu thích thành công",
        description: "Sản phẩm đã được thêm vào danh sách yêu thích của bạn",
      });
    } catch (error) {
      console.error("Lỗi thêm vào danh sách yêu thích:", error);
      toast({
        title: "Thêm vào danh sách yêu thích thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi thêm sản phẩm vào danh sách yêu thích",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    if (!isAuthenticated || !wishlist) return;

    setIsLoading(true);
    try {
      const updatedWishlist = await wishlistService.removeFromWishlist(itemId);
      setWishlist(updatedWishlist);
      toast({
        title: "Xóa sản phẩm thành công",
        description: "Sản phẩm đã được xóa khỏi danh sách yêu thích",
      });
    } catch (error) {
      console.error("Lỗi xóa sản phẩm:", error);
      toast({
        title: "Xóa sản phẩm thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa sản phẩm",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearWishlist = async () => {
    if (!isAuthenticated || !wishlist) return;

    setIsLoading(true);
    try {
      await wishlistService.clearWishlist();
      setWishlist(null);
      toast({
        title: "Xóa danh sách yêu thích thành công",
        description: "Tất cả sản phẩm đã được xóa khỏi danh sách yêu thích",
      });
    } catch (error) {
      console.error("Lỗi xóa danh sách yêu thích:", error);
      toast({
        title: "Xóa danh sách yêu thích thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa danh sách yêu thích",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getWishlistItem = (productId: string): WishlistItem | undefined => {
    if (!wishlist) return undefined;
    return wishlist.items.find((item) => item.productId === productId);
  };

  const isInWishlist = (productId: string): boolean => {
    if (!wishlist) return false;
    return wishlist.items.some((item) => item.productId === productId);
  };

  const refreshWishlist = async () => {
    await loadWishlist();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlistItem,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
