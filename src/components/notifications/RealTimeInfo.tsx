
import React, { useState, useEffect } from 'react';
import { Bell, Info } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface RealTimeInfoProps {
  variant?: 'shipping' | 'stock' | 'promotion';
}

export const RealTimeInfo: React.FC<RealTimeInfoProps> = ({ variant = 'shipping' }) => {
  const { toast } = useToast();
  const [notification, setNotification] = useState<string>('');

  // Simulate real-time information updates
  useEffect(() => {
    const messages = {
      shipping: [
        "Free shipping on orders over $50 today!",
        "Express shipping available for all products",
        "Temporary shipping delays in the Northeast region"
      ],
      stock: [
        "Limited quantities remaining for summer collection",
        "New arrivals just added to inventory",
        "Restocked: Popular items now available"
      ],
      promotion: [
        "Flash sale: 25% off for the next 2 hours",
        "Buy one get one free on selected items",
        "Use code WELCOME15 for 15% off your first purchase"
      ]
    };

    const selectedMessages = messages[variant];
    const randomIndex = Math.floor(Math.random() * selectedMessages.length);
    setNotification(selectedMessages[randomIndex]);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newIndex = Math.floor(Math.random() * selectedMessages.length);
      if (selectedMessages[newIndex] !== notification) {
        setNotification(selectedMessages[newIndex]);
        toast({
          title: "New Update",
          description: selectedMessages[newIndex],
          duration: 5000,
        });
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [variant, toast]);

  return (
    <Alert className="mb-4 border-primary/20 bg-primary/5">
      <div className="flex items-center gap-2">
        {variant === 'shipping' && <Bell className="h-4 w-4 text-primary" />}
        {variant === 'stock' && <Info className="h-4 w-4 text-primary" />}
        {variant === 'promotion' && <Bell className="h-4 w-4 text-primary" />}
        <AlertTitle className="text-sm font-medium">{notification}</AlertTitle>
      </div>
    </Alert>
  );
};
