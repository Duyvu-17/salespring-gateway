
import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface NotificationPreference {
  id: string;
  type: string;
  description: string;
  enabled: boolean;
}

export const PushNotifications: React.FC = () => {
  const { toast } = useToast();
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: "orders",
      type: "Order Updates",
      description: "Receive notifications about your order status",
      enabled: true
    },
    {
      id: "promotions",
      type: "Promotions & Deals",
      description: "Be notified about sales and special offers",
      enabled: true
    },
    {
      id: "product_restocks",
      type: "Product Restocks",
      description: "Get alerts when out-of-stock items become available",
      enabled: false
    },
    {
      id: "price_drops",
      type: "Price Drops",
      description: "Be notified when items in your wishlist drop in price",
      enabled: true
    }
  ]);
  
  // Check notification permission on component mount
  useEffect(() => {
    if ("Notification" in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        
        if (permission === "granted") {
          toast({
            title: "Notifications Enabled",
            description: "You will now receive push notifications",
          });
          
          // Send a test notification
          setTimeout(() => {
            new Notification("Notification Test", {
              body: "Push notifications are now enabled!",
              icon: "/favicon.ico"
            });
          }, 1000);
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        toast({
          title: "Permission Error",
          description: "There was an error requesting notification permission",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Your browser doesn't support push notifications",
        variant: "destructive",
      });
    }
  };
  
  const togglePreference = (id: string) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
    
    toast({
      title: "Preference Updated",
      description: "Your notification preference has been saved",
    });
  };

  const saveAllPreferences = () => {
    console.log("Saved preferences:", preferences);
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Manage how and when you receive push notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!("Notification" in window) ? (
          <div className="rounded-md bg-yellow-50 p-4 border border-yellow-100">
            <div className="flex">
              <div className="text-yellow-800">
                <p className="text-sm">
                  Your browser doesn't support push notifications.
                </p>
              </div>
            </div>
          </div>
        ) : notificationPermission !== "granted" ? (
          <div className="flex flex-col items-center justify-center gap-4 py-4">
            <Bell className="h-12 w-12 text-primary opacity-80" />
            <div className="text-center">
              <h3 className="font-medium">Enable Push Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Stay updated with order status, promotions, and more.
              </p>
              <Button onClick={requestNotificationPermission}>
                {notificationPermission === "denied" 
                  ? "Permission Denied (Check Browser Settings)" 
                  : "Enable Notifications"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-md bg-green-50 p-4 border border-green-100">
              <div className="flex">
                <div className="text-green-800">
                  <p className="text-sm">
                    Push notifications are enabled. You will receive alerts based on your preferences.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {preferences.map((pref) => (
                <div key={pref.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">{pref.type}</div>
                    <div className="text-sm text-muted-foreground">{pref.description}</div>
                  </div>
                  <Switch
                    checked={pref.enabled}
                    onCheckedChange={() => togglePreference(pref.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
      {notificationPermission === "granted" && (
        <CardFooter>
          <Button onClick={saveAllPreferences} className="w-full">
            Save Preferences
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
