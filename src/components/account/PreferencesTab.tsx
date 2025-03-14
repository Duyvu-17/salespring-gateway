
import { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const PreferencesTab = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    language: "english",
    currency: "usd"
  });
  
  const handleSwitchChange = (name: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev]
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been updated successfully."
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Preferences & Notifications</CardTitle>
        <CardDescription>Customize your account settings and notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Email Notifications</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account activity
                </p>
              </div>
              <Switch 
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleSwitchChange("emailNotifications")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="order-updates">Order Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about your orders
                </p>
              </div>
              <Switch 
                id="order-updates"
                checked={preferences.orderUpdates}
                onCheckedChange={() => handleSwitchChange("orderUpdates")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="promotions">Promotions & Discounts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about special offers and discounts
                </p>
              </div>
              <Switch 
                id="promotions"
                checked={preferences.promotions}
                onCheckedChange={() => handleSwitchChange("promotions")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Weekly Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Receive our weekly newsletter with new products and updates
                </p>
              </div>
              <Switch 
                id="newsletter"
                checked={preferences.newsletter}
                onCheckedChange={() => handleSwitchChange("newsletter")}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Regional Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="vietnamese">Vietnamese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select 
                value={preferences.currency}
                onValueChange={(value) => handleSelectChange("currency", value)}
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="vnd">VND (₫)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full md:w-auto">Save Preferences</Button>
      </CardContent>
    </>
  );
};
