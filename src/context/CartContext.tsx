import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { cartService } from "@/services/cart.service";
import { useAuth } from "@/context/AuthContext";
import type { Cart, CartItem } from "@/types/cart";

// Define types for our cart context
type CartContextType = {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartItem: (productId: number) => CartItem | undefined;
  isInCart: (productId: number) => boolean;
  refreshCart: () => Promise<void>;
  toggleItemSelection: (itemId: number, selected: boolean) => void;
  selectAllItems: (selectAll: boolean) => void;
};

// Create the context with default values
const CartContext = createContext<CartContextType>({
  cart: null,
  isLoading: true,
  addToCart: async () => {},
  updateCartItem: async () => {},
  removeFromCart: async () => {},
  clearCart: async () => {},
  getCartItem: () => undefined,
  isInCart: () => false,
  refreshCart: async () => {},
  toggleItemSelection: () => {},
  selectAllItems: () => {},
});

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const loadCart = async () => {
    if (!isAuthenticated) {
      setCart(null);
      setIsLoading(false);
      return;
    }

    try {
      const cartData = await cartService.getCart();
      // Lấy trạng thái selected từ localStorage (nếu có)
      const selectedMap = JSON.parse(
        localStorage.getItem("cart_selected") || "{}"
      );
      const cartWithSelected = {
        ...cartData,
        cart_items: cartData.cart_items.map((item) => ({
          ...item,
          selected:
            typeof selectedMap[item.id] === "boolean"
              ? selectedMap[item.id]
              : true,
        })),
      };
      setCart(cartWithSelected);
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [isAuthenticated]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    if (!isAuthenticated) {
      toast({
        title: "Vui lòng đăng nhập",
        description: "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await cartService.addToCart(productId, quantity);
      setCart(updatedCart);
      toast({
        title: "Thêm vào giỏ hàng thành công",
        description: "Sản phẩm đã được thêm vào giỏ hàng của bạn",
      });
    } catch (error) {
      console.error("Lỗi thêm vào giỏ hàng:", error);
      toast({
        title: "Thêm vào giỏ hàng thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    if (!isAuthenticated || !cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await cartService.updateCartItem(itemId, quantity);
      setCart(updatedCart);
      saveSelectedToLocalStorage(updatedCart);
      toast({
        title: "Cập nhật giỏ hàng thành công",
        description: "Số lượng sản phẩm đã được cập nhật",
      });
    } catch (error) {
      console.error("Lỗi cập nhật giỏ hàng:", error);
      toast({
        title: "Cập nhật giỏ hàng thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi cập nhật giỏ hàng",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!isAuthenticated || !cart) return;

    setIsLoading(true);
    try {
      const updatedCart = await cartService.removeFromCart(itemId);
      setCart(updatedCart);
      saveSelectedToLocalStorage(updatedCart);
      toast({
        title: "Xóa sản phẩm thành công",
        description: "Sản phẩm đã được xóa khỏi giỏ hàng",
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

  const clearCart = async () => {
    if (!isAuthenticated || !cart) return;

    setIsLoading(true);
    try {
      await cartService.clearCart();
      setCart(null);
      toast({
        title: "Xóa giỏ hàng thành công",
        description: "Tất cả sản phẩm đã được xóa khỏi giỏ hàng",
      });
    } catch (error) {
      console.error("Lỗi xóa giỏ hàng:", error);
      toast({
        title: "Xóa giỏ hàng thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xóa giỏ hàng",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCartItem = (productId: number): CartItem | undefined => {
    if (!cart) return undefined;
    return cart.cart_items.find((item) => item.product_id === productId);
  };

  const isInCart = (productId: number): boolean => {
    if (!cart) return false;
    return cart.cart_items.some((item) => item.product_id === productId);
  };

  const refreshCart = async () => {
    await loadCart();
  };

  const toggleItemSelection = (itemId: number, selected: boolean) => {
    if (!cart) return;
    const newCart = {
      ...cart,
      cart_items: cart.cart_items.map((item) =>
        item.id === itemId ? { ...item, selected } : item
      ),
    };
    setCart(newCart);
    saveSelectedToLocalStorage(newCart);
  };

  const selectAllItems = (selectAll: boolean) => {
    if (!cart) return;
    const newCart = {
      ...cart,
      cart_items: cart.cart_items.map((item) => ({
        ...item,
        selected: selectAll,
      })),
    };
    setCart(newCart);
    saveSelectedToLocalStorage(newCart);
  };

  // Hàm lưu trạng thái selected vào localStorage
  const saveSelectedToLocalStorage = (cart: Cart) => {
    const selectedMap = Object.fromEntries(
      cart.cart_items.map((item) => [item.id, item.selected])
    );
    localStorage.setItem("cart_selected", JSON.stringify(selectedMap));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartItem,
        isInCart,
        refreshCart,
        toggleItemSelection,
        selectAllItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
