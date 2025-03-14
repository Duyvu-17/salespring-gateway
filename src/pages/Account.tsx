
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ProfileTab } from "@/components/account/ProfileTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { AddressesTab } from "@/components/account/AddressesTab";
import { PaymentMethodsTab } from "@/components/account/PaymentMethodsTab";
import { PreferencesTab } from "@/components/account/PreferencesTab";

const Account = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <ProfileTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <OrdersTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="addresses">
          <Card>
            <AddressesTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <PaymentMethodsTab />
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card>
            <PreferencesTab />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
