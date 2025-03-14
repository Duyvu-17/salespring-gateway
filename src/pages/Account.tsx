
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfileTab } from "@/components/account/ProfileTab";
import { OrdersTab } from "@/components/account/OrdersTab";
import { AddressesTab } from "@/components/account/AddressesTab";
import { PaymentMethodsTab } from "@/components/account/PaymentMethodsTab";
import { PreferencesTab } from "@/components/account/PreferencesTab";
import { OrderDetailsTab } from "@/components/account/OrderDetailsTab";
import { User, CreditCard, MapPin, Package, Settings, FileText } from "lucide-react";

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="h-5 w-5" /> },
    { id: "orders", label: "Orders", icon: <Package className="h-5 w-5" /> },
    { id: "orderDetails", label: "Order Details", icon: <FileText className="h-5 w-5" /> },
    { id: "addresses", label: "Addresses", icon: <MapPin className="h-5 w-5" /> },
    { id: "payment", label: "Payment", icon: <CreditCard className="h-5 w-5" /> },
    { id: "preferences", label: "Preferences", icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-3">
          <Card>
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "orderDetails" && <OrderDetailsTab />}
            {activeTab === "addresses" && <AddressesTab />}
            {activeTab === "payment" && <PaymentMethodsTab />}
            {activeTab === "preferences" && <PreferencesTab />}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Account;
