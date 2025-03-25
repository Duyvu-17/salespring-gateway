import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Banknote, BanknoteIcon, CreditCard, QrCode, Wallet } from "lucide-react";
import { AnimatePresence, motion } from 'framer-motion';

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  savedPaymentMethods: {
    momo?: { phoneNumber: string },
    bank?: { cardNumber: string, bankName: string },
    zalopay?: { phoneNumber: string }
  };
}

const PaymentMethod = ({ 
  paymentMethod, 
  setPaymentMethod, 
  savedPaymentMethods 
}: PaymentMethodProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setShowDetails(true);
  };

  const hideSensitiveData = (data) => {
    return `${data.slice(0, 3)}****${data.slice(-3)}`;
  };
  
  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case 'momo':
        return savedPaymentMethods.momo ? (
          <div className="space-y-2">
            <p><strong>Số điện thoại:</strong> {hideSensitiveData(savedPaymentMethods.momo.phoneNumber)}</p>
          </div>
        ) : null;
  
      case 'bank':
        return savedPaymentMethods.bank ? (
          <div className="space-y-2">
            <p><strong>Số tài khoản:</strong> {hideSensitiveData(savedPaymentMethods.bank.cardNumber)}</p>
            <p><strong>Ngân hàng:</strong> {savedPaymentMethods.bank.bankName}</p>
          </div>
        ) : null;
  
      case 'zalopay':
        return savedPaymentMethods.zalopay ? (
          <div className="space-y-2">
            <p><strong>Số điện thoại:</strong> {hideSensitiveData(savedPaymentMethods.zalopay.phoneNumber)}</p>
          </div>
        ) : null;
  
      case 'cod':
        return (
          <div className="text-muted-foreground">
            Thanh toán trực tiếp khi nhận hàng
          </div>
        );
  
      default:
        return null;
    }
  };
  

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
          <CardDescription>Chọn phương thức thanh toán</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={paymentMethod} 
            onValueChange={handlePaymentMethodChange}
            className="grid grid-cols-1 gap-4"
          >
            <div className="flex items-center">
              <RadioGroupItem value="momo" id="momo" className="peer sr-only" />
              <Label 
                htmlFor="momo"
                className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center shrink-0">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">MoMo</p>
                    <p className="text-sm text-muted-foreground">Ví điện tử MoMo</p>
                  </div>
                </div>
                <QrCode className="h-5 w-5 text-muted-foreground" />
              </Label>
            </div>
            
            <div className="flex items-center">
              <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
              <Label 
                htmlFor="bank"
                className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Chuyển khoản Ngân hàng</p>
                    <p className="text-sm text-muted-foreground">Thanh toán qua tài khoản ngân hàng</p>
                  </div>
                </div>
                <BanknoteIcon className="h-5 w-5 text-muted-foreground" />
              </Label>
            </div>
            
            <div className="flex items-center">
              <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
              <Label 
                htmlFor="cod"
                className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0">
                    <Banknote className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Thanh toán khi nhận hàng</p>
                    <p className="text-sm text-muted-foreground">Trả tiền khi nhận sản phẩm</p>
                  </div>
                </div>
                <CreditCard className="h-5 w-5 text-muted-foreground" />
              </Label>
            </div>
            
            <div className="flex items-center">
              <RadioGroupItem value="zalopay" id="zalopay" className="peer sr-only" />
              <Label 
                htmlFor="zalopay"
                className="flex items-center justify-between w-full p-4 border rounded-lg peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">ZaloPay</p>
                    <p className="text-sm text-muted-foreground">Ví điện tử ZaloPay</p>
                  </div>
                </div>
                <QrCode className="h-5 w-5 text-muted-foreground" />
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <AnimatePresence>
        {showDetails && paymentMethod && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPaymentDetails()}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentMethod;