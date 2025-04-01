
import { useState } from 'react';
import { Product } from '@/data/products';
import QuickAddNotification from '@/components/cart/QuickAddNotification';

export const useCartNotification = () => {
  const [notification, setNotification] = useState<{
    visible: boolean;
    product: Product | null;
  }>({
    visible: false,
    product: null,
  });

  const showNotification = (product: Product) => {
    setNotification({
      visible: true,
      product,
    });
  };

  const hideNotification = () => {
    setNotification({
      visible: false,
      product: null,
    });
  };

  const CartNotificationComponent = () => {
    if (!notification.product) return null;
    
    return (
      <QuickAddNotification
        productName={notification.product.name}
        productImage={notification.product.image}
        isVisible={notification.visible}
        onClose={hideNotification}
      />
    );
  };

  return {
    showCartNotification: showNotification,
    hideCartNotification: hideNotification,
    CartNotification: CartNotificationComponent,
  };
};
