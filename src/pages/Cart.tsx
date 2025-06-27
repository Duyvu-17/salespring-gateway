import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import {
  removeFromCart,
  updateCartItem,
  toggleItemSelection,
  selectAllItems,
  fetchCart,
} from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, ShoppingBag, Tag } from "lucide-react";
import type { Cart, CartItem, ProductInCart } from "@/types/cart";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: any) => state.cart?.cart);
  const isLoading = useSelector((state: any) => state.cart?.isLoading);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (itemId: number) => {
    dispatch(removeFromCart(String(itemId)));
  };

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ itemId: String(itemId), quantity: newQuantity }));
  };

  const getProductPrice = (product: ProductInCart) => {
    return product.ProductPricing?.sale_price
      ? Number(product.ProductPricing?.sale_price)
      : Number(product.ProductPricing?.base_price);
  };

  const hasDiscount = (product: ProductInCart) => {
    return product?.ProductPricing?.sale_price !== null;
  };

  const calculateSelectedSubtotal = () => {
    if (!cart) return 0;
    return cart.cart_items.reduce((total, item) => {
      if (item.selected && item.Product) {
        return total + getProductPrice(item.Product) * item.quantity;
      }
      return total;
    }, 0);
  };

  const getSelectedItems = () => {
    if (!cart) return [];
    return cart.cart_items.filter((item) => item.selected);
  };

  const totalItems =
    cart?.cart_items.reduce((total, item) => total + item.quantity, 0) || 0;
  const selectedItems = getSelectedItems();
  const selectedItemsCount = selectedItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const allSelected =
    cart?.cart_items.length > 0 &&
    cart.cart_items.every((item) => item.selected);

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
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-muted/20 overflow-hidden">
            {/* Select All Header */}
            <div className="flex items-center gap-3 p-4 border-b border-muted/20 bg-muted/5">
              <Checkbox
                id="select-all"
                checked={allSelected}
                onCheckedChange={(checked) =>
                  dispatch(selectAllItems(checked as boolean))
                }
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="select-all"
                className="text-sm font-medium cursor-pointer"
              >
                Chọn tất cả ({cart.cart_items.length} sản phẩm)
              </label>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              <div className="divide-y divide-muted/20">
                {cart?.cart_items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 p-6 transition-all duration-200 ${
                      item.selected
                        ? "bg-primary/5 border-l-4 border-l-primary"
                        : "hover:bg-muted/5"
                    }`}
                  >
                    {/* Selection Checkbox */}
                    <div className="flex-shrink-0">
                      <Checkbox
                        id={`item-${item.id}`}
                        checked={item.selected}
                        onCheckedChange={(checked) =>
                          dispatch(
                            toggleItemSelection({
                              itemId: item.id,
                              selected: checked as boolean,
                            })
                          )
                        }
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </div>

                    {/* Product Image */}
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.Product.image_url || "/placeholder.svg"}
                        alt={item.Product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-muted/20"
                      />
                      {hasDiscount(item.Product) && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                          <Tag className="w-3 h-3 mr-1" />
                          Sale
                        </Badge>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                        {item.Product.name}
                      </h3>

                      {/* Price Display */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-bold text-lg">
                          {getProductPrice(item.Product).toLocaleString()}₫
                        </span>
                        {hasDiscount(item.Product) && (
                          <span className="text-muted-foreground line-through text-sm">
                            {Number(
                              item?.Product?.ProductPricing?.base_price
                            ).toLocaleString()}
                            ₫
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {item.Product.description}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-muted/30 rounded-lg overflow-hidden bg-white">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted/20"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            min={1}
                            max={item?.Product?.ProductInventory?.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item.id,
                                Math.max(
                                  1,
                                  Math.min(
                                    item?.Product?.ProductInventory?.quantity,
                                    Number(e.target.value)
                                  )
                                )
                              )
                            }
                            className="w-14 h-8 text-center border-0 focus-visible:ring-0 bg-transparent"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 hover:bg-muted/20"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={
                              item.quantity >=
                              item?.Product?.ProductInventory?.quantity
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Badge variant="outline" className="text-xs">
                          Còn {item?.Product?.ProductInventory?.quantity}
                        </Badge>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {(
                            getProductPrice(item.Product) * item.quantity
                          ).toLocaleString()}
                          ₫
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {getProductPrice(item.Product).toLocaleString()}₫ ×{" "}
                            {item.quantity}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                        onClick={() => handleRemoveItem(item.id)}
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

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-muted/20 p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sản phẩm đã chọn</span>
                <span className="font-medium">
                  {selectedItemsCount} / {totalItems}
                </span>
              </div>

              {selectedItems.length > 0 && (
                <div className="space-y-2 p-3 bg-muted/10 rounded-lg">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground truncate pr-2">
                        {item.Product.name} × {item.quantity}
                      </span>
                      <span className="font-medium text-nowrap">
                        {(
                          getProductPrice(item.Product) * item.quantity
                        ).toLocaleString()}
                        ₫
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tạm tính</span>
                <span className="font-medium">
                  {calculateSelectedSubtotal().toLocaleString()}₫
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Phí vận chuyển</span>
                <span className="font-medium text-green-600">Miễn phí</span>
              </div>

              <div className="border-t border-muted/20 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary text-xl">
                    {calculateSelectedSubtotal().toLocaleString()}₫
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full h-12 text-base font-semibold"
                disabled={selectedItems.length === 0}
              >
                Thanh toán ({selectedItems.length} sản phẩm)
              </Button>
              <Button variant="outline" className="w-full h-12 text-base">
                Tiếp tục mua sắm
              </Button>
            </div>

            {selectedItems.length === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Vui lòng chọn ít nhất một sản phẩm để thanh toán
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
