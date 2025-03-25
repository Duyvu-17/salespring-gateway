
import { useState } from "react";
import ShippingInformation from "@/components/checkout/ShippingInformation";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RewardPoints from "@/components/checkout/RewardPoints";
import OrderSummary from "@/components/checkout/OrderSummary";
import SuccessDialog from "@/components/checkout/SuccessDialog";
import { calculatePointsDiscount, calculateTotal } from "@/components/checkout/CheckoutCalculator";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [showSuccess, setShowSuccess] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(500); // Example points
  const [useRewardPoints, setUseRewardPoints] = useState(false);
  
  const subtotal = 299.99;
  const shipping = 0;
  
  // Calculate the discount from reward points
  const pointsDiscount = calculatePointsDiscount(useRewardPoints, rewardPoints, subtotal);
  
  // Calculate the final total
  const total = calculateTotal(subtotal, shipping, pointsDiscount);
  
  const handlePlaceOrder = () => {
    setShowSuccess(true);
    
    // Simulate order completion
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
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
          {/* Shipping Information Component */}
          <ShippingInformation />
          
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
        </div>
        
        {/* Order Summary Component */}
        <OrderSummary 
          subtotal={subtotal}
          shipping={shipping}
          pointsDiscount={pointsDiscount}
          total={total}
          useRewardPoints={useRewardPoints}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
      
      {/* Success Dialog Component */}
      <SuccessDialog open={showSuccess} />
    </div>
  );
};

export default Checkout;
