
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReturnExchange } from "@/components/customer/ReturnExchange";
import { PushNotifications } from "@/components/notifications/PushNotifications";
import { SocialMediaIntegration } from "@/components/social/SocialMediaIntegration";
import { LiveChatSupport } from "@/components/customer/LiveChatSupport";

const CustomerService: React.FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Customer Service</h1>
      
      <Tabs defaultValue="returns" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="returns">Returns & Exchanges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
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
        <TabsContent value="chat" className="mt-6">
          <div className="bg-card rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Live Chat Support</h2>
            <p className="mb-4">Talk to our customer support representatives in real-time to get help with your questions.</p>
            <p className="text-sm text-muted-foreground mb-6">
              Our support team is available Monday through Friday, 9AM to 5PM EST.
            </p>
            <div className="flex justify-center">
              <LiveChatSupport />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Floating chat button that appears on all pages */}
      <LiveChatSupport />
    </div>
  );
};

export default CustomerService;
