
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReturnExchange } from "@/components/customer/ReturnExchange";
import { PushNotifications } from "@/components/notifications/PushNotifications";
import { SocialMediaIntegration } from "@/components/social/SocialMediaIntegration";

const CustomerService: React.FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Service</h1>
      
      <Tabs defaultValue="returns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        <TabsContent value="returns" className="mt-6">
          <ReturnExchange />
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <PushNotifications />
        </TabsContent>
        <TabsContent value="social" className="mt-6">
          <SocialMediaIntegration />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerService;
