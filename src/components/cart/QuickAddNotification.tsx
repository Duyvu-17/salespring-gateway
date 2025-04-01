
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface QuickAddNotificationProps {
  productName: string;
  productImage: string;
  isVisible: boolean;
  onClose: () => void;
}

export const QuickAddNotification = ({
  productName,
  productImage,
  isVisible,
  onClose
}: QuickAddNotificationProps) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg p-4 z-50 max-w-sm w-full"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary/10 p-2 rounded-full">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            
            <div className="ml-3 flex-1">
              <div className="flex items-start justify-between">
                <h3 className="text-sm font-medium">Added to Cart</h3>
                <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-500">
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-2 flex items-center">
                <div className="h-12 w-12 rounded overflow-hidden">
                  <img src={productImage} alt={productName} className="h-full w-full object-cover" />
                </div>
                <p className="ml-3 text-sm text-gray-700 line-clamp-2">{productName}</p>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <Link to="/cart">
                  <Button variant="outline" size="sm">
                    View Cart
                  </Button>
                </Link>
                <Link to="/checkout">
                  <Button size="sm">
                    Checkout <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuickAddNotification;
