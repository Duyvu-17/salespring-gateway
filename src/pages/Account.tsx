import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  User,
  Package,
  CreditCard,
  Palette,
  Shield,
  UserCog,
  MapPin,
  Settings,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutConfirmDialog } from "@/components/LogoutConfirmDialog";
import { PaymentMethodsTab } from "@/components/account/PaymentMethodsTab";
import { AddressesTab } from "@/components/account/AddressesTab";
import { PreferencesTab } from "@/components/account/PreferencesTab";
import ProfileTab from "@/components/account/ProfileTab";
import Security from "@/components/account/security";
import Appearance from "@/components/account/Appearance";
import Order from "@/components/account/Order";
import { OrderDetailsTab } from "@/components/account/OrderDetailsTab";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/24",
      default: true,
    },
    {
      id: 2,
      type: "mastercard",
      last4: "6789",
      expiry: "09/25",
      default: false,
    },
  ]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading your account information...</p>
        </div>
      </div>
    );
  }
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <Package className="mr-2 h-4 w-4" />,
    },
    {
      id: "orderDetails",
      label: "Order Details",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      id: "payment",
      label: "Payment Methods",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: <MapPin className="mr-2 h-4 w-4" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="mr-2 h-4 w-4" />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {profile.name}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-primary/5">
                  Premium Member
                </Badge>
                <Badge variant="outline" className="bg-primary/5">
                  Since 2021
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("profile")}
              className="hidden md:flex"
            >
              <UserCog className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
            {isLoggedIn && <LogoutConfirmDialog />}
          </div>
        </div>

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
              {activeTab === "orders" && <Order />}
              {activeTab === "orderDetails" && <OrderDetailsTab />}
              {activeTab === "payment" && <PaymentMethodsTab />}
              {activeTab === "addresses" && <AddressesTab />}
              {activeTab === "preferences" && <PreferencesTab />}
              {activeTab === "appearance" && <Appearance />}
              {activeTab === "security" && <Security />}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
