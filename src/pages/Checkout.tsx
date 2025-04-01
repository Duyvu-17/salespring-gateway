
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShippingInformation from "@/components/checkout/ShippingInformation";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RewardPoints from "@/components/checkout/RewardPoints";
import OrderSummary from "@/components/checkout/OrderSummary";
import SuccessDialog from "@/components/checkout/SuccessDialog";
import { calculatePointsDiscount, calculateTotal } from "@/components/checkout/CheckoutCalculator";
import DiscountCode from "@/components/checkout/DiscountCode";
import GiftWrap from "@/components/checkout/GiftWrap";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import OrderNotes from "@/components/checkout/OrderNotes";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
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
  
  const subtotal = 299.99;
  const giftWrapCost = isGiftWrap ? 5 : 0;
  
  // Calculate the discount from reward points
  const pointsDiscount = calculatePointsDiscount(useRewardPoints, rewardPoints, subtotal);
  
  // Calculate the final total
  const total = calculateTotal(subtotal, shippingCost + giftWrapCost, pointsDiscount + discountAmount);
  
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
  
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Simulate order completion
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  const toggleRewardPoints = () => {
    setUseRewardPoints(!useRewardPoints);
  };
  
  const savedPaymentMethods = {
    momo: { phoneNumber: '0123456789' },
    bank: { 
      cardNumber: '1234567890', 
      bankName: 'Vietcombank' 
    },
    zalopay: { phoneNumber: '0987654321' }
  };
  
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
          <ShippingInformation />
          
          {/* Shipping Method Component */}
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
          
          {/* Gift Wrap Component */}
          <GiftWrap 
            onGiftWrapChange={handleGiftWrapChange}
            onGiftMessageChange={handleGiftMessageChange}
          />
          
          {/* Order Notes Component */}
          <OrderNotes onNotesChange={handleOrderNotesChange} />
          
          {/* Discount Code Component */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Discount Code</h2>
            <DiscountCode 
              onApplyDiscount={handleApplyDiscount}
              subtotal={subtotal}
            />
          </div>
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
          isProcessing={isProcessing}
        />
      </div>
      
      {/* Success Dialog Component */}
      <SuccessDialog open={showSuccess} />
    </div>
  );
};

export default Checkout;
