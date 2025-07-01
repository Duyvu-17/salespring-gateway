import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShippingInformation from "@/components/checkout/ShippingInformation";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RewardPoints from "@/components/checkout/RewardPoints";
import OrderSummary from "@/components/checkout/OrderSummary";
import SuccessDialog from "@/components/checkout/SuccessDialog";
import {
  calculatePointsDiscount,
  calculateTotal,
} from "@/components/checkout/CheckoutCalculator";
import DiscountCode from "@/components/checkout/DiscountCode";
import GiftWrap from "@/components/checkout/GiftWrap";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import OrderNotes from "@/components/checkout/OrderNotes";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store";
import { createOrderAsync } from "@/store/slices/orderSlice";
import type {
  BillingInfo,
  ShippingInfo,
  OrderItem,
} from "@/services/order.service";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const orderState = useSelector((state: RootState) => state.order);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(500); // Example points
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [billingInfo, setBillingInfo] = useState<BillingInfo | null>(null);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  // Lấy subtotal thực tế từ cart
  const subtotal =
    cart?.total_amount ||
    cart?.cart_items?.reduce(
      (sum, item) =>
        sum +
        (Number(item.Product?.ProductPricing?.base_price) || 0) * item.quantity,
      0
    ) ||
    0;
  const giftWrapCost = isGiftWrap ? 5 : 0;

  // Calculate the discount from reward points
  const pointsDiscount = calculatePointsDiscount(
    useRewardPoints,
    rewardPoints,
    subtotal
  );

  // Calculate the final total
  const total = calculateTotal(
    subtotal,
    shippingCost + giftWrapCost,
    pointsDiscount + discountAmount
  );

  const handleApplyDiscount = (amount: number) => {
    setDiscountAmount(amount);
  };

  const handleShippingMethodChange = (method: string, cost: number) => {
    setShippingMethod(method);
    setShippingCost(cost);
  };

  const handleGiftWrapChange = (isChecked: boolean) => {
    setIsGiftWrap(isChecked);
  };

  const handleGiftMessageChange = (message: string) => {
    setGiftMessage(message);
  };

  const handleOrderNotesChange = (notes: string) => {
    setOrderNotes(notes);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Lấy orderItems từ cart thực tế
    const orderItems: OrderItem[] = (cart?.cart_items || []).map((item) => ({
      product_id: item.product_id,
      product_name: item.Product?.name || "",
      product_sku: undefined,
      quantity: item.quantity,
      unit_price: Number(item.Product?.ProductPricing?.base_price) || 0,
      total_price:
        (Number(item.Product?.ProductPricing?.base_price) || 0) * item.quantity,
    }));

    // Kiểm tra dữ liệu đã đủ chưa
    if (!billingInfo || !shippingInfo || orderItems.length === 0) {
      toast({
        title: "Thiếu thông tin!",
        description: "Vui lòng nhập đầy đủ thông tin và kiểm tra giỏ hàng.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    const payload = {
      billingInfo,
      shippingInfo,
      orderItems,
      notes: orderNotes,
      coupon_id: undefined, // hoặc lấy từ state nếu có
      subtotal,
      tax_amount: 0, // hoặc tính toán nếu có
      shipping_amount: shippingCost,
      discount_amount: discountAmount + pointsDiscount,
      total_amount: total,
      currency: "VND",
    };
    try {
      const resultAction = await dispatch(createOrderAsync(payload));
      if (createOrderAsync.fulfilled.match(resultAction)) {
        setIsProcessing(false);
        toast({
          title: "Đặt hàng thành công!",
          description: `Mã đơn hàng: ${
            resultAction.payload.order_number || "(không xác định)"
          }`,
          duration: 5000,
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/");
        }, 5000);
      } else {
        setIsProcessing(false);
        toast({
          title: "Đặt hàng thất bại!",
          description: orderState.error || "Có lỗi xảy ra khi đặt hàng.",
          variant: "destructive",
        });
      }
    } catch (err) {
      setIsProcessing(false);
      toast({
        title: "Đặt hàng thất bại!",
        description: "Có lỗi xảy ra khi đặt hàng.",
        variant: "destructive",
      });
    }
  };

  const toggleRewardPoints = () => {
    setUseRewardPoints(!useRewardPoints);
  };

  const savedPaymentMethods = {
    momo: { phoneNumber: "0123456789" },
    bank: {
      cardNumber: "1234567890",
      bankName: "Vietcombank",
    },
    zalopay: { phoneNumber: "0987654321" },
  };

  const orderItems: OrderItem[] = (cart?.cart_items || []).map((item) => ({
    product_id: item.product_id,
    product_name: item.Product?.name || "",
    product_sku: undefined,
    quantity: item.quantity,
    unit_price: Number(item.Product?.ProductPricing?.base_price) || 0,
    total_price:
      (Number(item.Product?.ProductPricing?.base_price) || 0) * item.quantity,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Alert for estimated delivery */}
          <Alert className="bg-blue-50 border-blue-200">
            <InfoIcon className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-600">
              Estimated delivery: 2-4 business days
            </AlertDescription>
          </Alert>

          {/* Shipping Information Component */}
          <ShippingInformation
            onBillingChange={setBillingInfo}
            onShippingChange={setShippingInfo}
          />
          <ShippingMethod onShippingMethodChange={handleShippingMethodChange} />

          {/* Payment Method Component */}
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            savedPaymentMethods={savedPaymentMethods}
          />

          {/* Reward Points Component */}
          <RewardPoints
            rewardPoints={rewardPoints}
            useRewardPoints={useRewardPoints}
            toggleRewardPoints={toggleRewardPoints}
          />
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Discount Code</h2>
            <DiscountCode
              onApplyDiscount={handleApplyDiscount}
              subtotal={subtotal}
            />
          </div>

          {/* Gift Wrap Component */}
          <GiftWrap
            onGiftWrapChange={handleGiftWrapChange}
            onGiftMessageChange={handleGiftMessageChange}
          />

          {/* Order Notes Component */}
          <OrderNotes onNotesChange={handleOrderNotesChange} />

          {/* Discount Code Component */}
        </div>

        {/* Order Summary Component */}
        <OrderSummary
          subtotal={subtotal}
          shipping={shippingCost}
          pointsDiscount={pointsDiscount}
          discountAmount={discountAmount}
          additionalFees={giftWrapCost}
          additionalFeesLabel={isGiftWrap ? "Gift Wrapping" : ""}
          total={total}
          useRewardPoints={useRewardPoints}
          onPlaceOrder={handlePlaceOrder}
          orderItems={orderItems}
          isProcessing={isProcessing}
        />
      </div>

      {/* Success Dialog Component */}
      <SuccessDialog
        open={showSuccess}
        orderNumber={orderNumber}
        orderTotal={total}
      />
    </div>
  );
};

export default Checkout;
