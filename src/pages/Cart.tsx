import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

// Định nghĩa type tạm cho Product từ BE
interface BEProduct {
  id: number;
  name: string;
  price: string;
  image_url: string | null;
  description: string;
  status: string;
  stock: number;
}

interface BECartItem {
  id: number | string;
  quantity: number;
  Product?: BEProduct;
}

const Cart = () => {
  const { cart, isLoading, removeFromCart, updateCartItem } = useCart();

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(itemId, newQuantity);
  };

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return cart.cart_items.reduce((total, item: BECartItem) => {
      if (item.Product) {
        return total + Number(item.Product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  const totalItems = cart?.cart_items.reduce((total, item: BECartItem) => total + item.quantity, 0) || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <div className="text-muted-foreground">Đang tải giỏ hàng...</div>
        </div>
      </div>
    );
  }

  if (!cart || cart.cart_items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center py-16 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-muted/20">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm.
          </p>
          <Button className="px-8">Tiếp tục mua sắm</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Giỏ hàng của bạn</h1>
        <p className="text-muted-foreground">
          {totalItems} sản phẩm trong giỏ hàng
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Scrollable on mobile */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-muted/20 overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              <div className="divide-y divide-muted/20">
                {cart.cart_items.map((item: BECartItem, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-6 hover:bg-muted/5 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.Product?.image_url || "/placeholder.svg"}
                        alt={item.Product?.name || "Sản phẩm không xác định"}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-muted/20"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {item.Product?.name || "Sản phẩm không xác định"}
                      </h3>
                      <p className="text-primary font-medium text-lg">
                        {item.Product
                          ? Number(item.Product.price).toLocaleString()
                          : 0}₫
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center border border-muted/30 rounded-lg overflow-hidden">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted/20"
                            onClick={() =>
                              handleUpdateQuantity(String(item.id), item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            min={1}
                            max={item.Product?.stock || 999}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                String(item.id),
                                Math.max(1, Number(e.target.value))
                              )
                            }
                            className="w-14 h-8 text-center border-0 focus-visible:ring-0 bg-transparent"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted/20"
                            onClick={() =>
                              handleUpdateQuantity(String(item.id), item.quantity + 1)
                            }
                            disabled={item.quantity >= (item.Product?.stock || 999)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <span className="text-sm text-muted-foreground">
                          Tồn kho: {item.Product?.stock || 0}
                        </span>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-lg font-semibold">
                        {item.Product
                          ? (Number(item.Product.price) * item.quantity).toLocaleString()
                          : 0}₫
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        onClick={() => handleRemoveItem(String(item.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary - Sticky on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-muted/20 p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Tóm tắt đơn hàng
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Số lượng sản phẩm</span>
                <span className="font-medium">{totalItems}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-medium">
                  {calculateSubtotal().toLocaleString()}₫
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>
              
              <div className="border-t border-muted/20 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">
                    {calculateSubtotal().toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <Button className="w-full h-12 text-base font-semibold">
                Thanh toán ngay
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 text-base"
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;