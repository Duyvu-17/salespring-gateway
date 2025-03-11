
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { 
  User, 
  Package, 
  CreditCard, 
  LogOut, 
  Palette, 
  Shield, 
  Bell, 
  Edit, 
  Save,
  CheckCircle,
  Download,
  Clock,
  Truck,
  ShoppingBag,
  AlertTriangle,
  Eye,
  EyeOff,
  RefreshCw,
  Plus,
  Trash,
  UserCog,
  ArrowRight
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA',
    bio: 'I am a tech enthusiast and love exploring new gadgets and applications.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    browser: true,
    promotions: false,
    orderUpdates: true,
    securityAlerts: true,
    newProducts: false
  });

  const [orders, setOrders] = useState([
    {
      id: '1234567',
      date: 'March 15, 2023',
      status: 'delivered',
      items: [
        { id: 1, name: 'Premium Headphones', quantity: 1, price: 299.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
      ],
      total: 299.99,
      address: '123 Main St, Anytown, USA 12345',
      payment: 'Visa ending in 4242'
    },
    {
      id: '2345678',
      date: 'March 22, 2023',
      status: 'shipped',
      items: [
        { id: 2, name: 'Wireless Keyboard', quantity: 1, price: 129.99, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
        { id: 3, name: 'Wireless Mouse', quantity: 1, price: 49.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
      ],
      total: 179.98,
      address: '123 Main St, Anytown, USA 12345',
      payment: 'Mastercard ending in 6789'
    },
    {
      id: '3456789',
      date: 'April 5, 2023',
      status: 'processing',
      items: [
        { id: 4, name: 'Ultra HD Monitor', quantity: 1, price: 499.99, image: 'https://images.unsplash.com/photo-1527443060795-0402a18106c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
      ],
      total: 499.99,
      address: '123 Main St, Anytown, USA 12345',
      payment: 'PayPal'
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiry: '12/24',
      default: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '6789',
      expiry: '09/25',
      default: false
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    passwordChanges: true
  });
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/login');
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
      variant: "default",
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'purple' | 'ocean');
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
    });
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    toast({
      title: "Notification settings updated",
      description: `${key} notifications ${!notifications[key] ? 'enabled' : 'disabled'}`,
    });
  };

  const handleSecuritySettingToggle = (key: keyof typeof securitySettings) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: !securitySettings[key]
    });
    toast({
      title: "Security settings updated",
      description: `${key} ${!securitySettings[key] ? 'enabled' : 'disabled'}`,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully",
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment method",
      description: "This would connect to a payment processor to add a new method",
    });
  };

  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully",
    });
  };

  const handleSetDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      default: method.id === id
    })));
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated",
    });
  };

  const handleEnableTwoFactor = () => {
    setSecuritySettings({
      ...securitySettings,
      twoFactorEnabled: true
    });
    toast({
      title: "Two-factor authentication enabled",
      description: "Your account is now more secure",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Shipped</Badge>;
      case 'processing':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Processing</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case 'shipped':
        return <Truck className="text-blue-500 h-5 w-5" />;
      case 'processing':
        return <Clock className="text-amber-500 h-5 w-5" />;
      case 'cancelled':
        return <AlertTriangle className="text-red-500 h-5 w-5" />;
      default:
        return null;
    }
  };

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return (
          <div className="rounded-md bg-blue-600 text-white p-2 flex items-center justify-center w-8 h-8">
            <span className="text-xs font-bold">VISA</span>
          </div>
        );
      case 'mastercard':
        return (
          <div className="rounded-md bg-red-600 text-white p-2 flex items-center justify-center w-8 h-8">
            <span className="text-xs font-bold">MC</span>
          </div>
        );
      case 'paypal':
        return (
          <div className="rounded-md bg-blue-800 text-white p-2 flex items-center justify-center w-8 h-8">
            <span className="text-xs font-bold">PP</span>
          </div>
        );
      default:
        return (
          <CreditCard className="h-5 w-5" />
        );
    }
  };

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

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-card p-6 rounded-xl shadow-sm border">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-primary/5">Premium Member</Badge>
                <Badge variant="outline" className="bg-primary/5">Since 2021</Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => setActiveTab('profile')} className="hidden md:flex">
              <UserCog className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
            <Button variant="outline" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <div className="lg:block">
            <div className="bg-card p-6 rounded-xl shadow-sm border sticky top-24">
              <div className="space-y-2">
                <h3 className="font-medium mb-4">Account Navigation</h3>
                <div className="flex flex-col space-y-1">
                  <Button 
                    variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('profile')}
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === 'orders' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('orders')}
                    className="justify-start"
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                    <Badge className="ml-auto bg-primary/80">{orders.length}</Badge>
                  </Button>
                  <Button 
                    variant={activeTab === 'payment' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('payment')}
                    className="justify-start"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button 
                    variant={activeTab === 'appearance' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('appearance')}
                    className="justify-start"
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Appearance
                  </Button>
                  <Button 
                    variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('notifications')}
                    className="justify-start"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === 'security' ? 'default' : 'ghost'} 
                    onClick={() => setActiveTab('security')}
                    className="justify-start"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Profile Content */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fadeIn">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2"
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({...profile, name: e.target.value})}
                            disabled={!isEditing}
                            className={isEditing ? "border-primary/50" : ""}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({...profile, email: e.target.value})}
                            disabled={!isEditing}
                            className={isEditing ? "border-primary/50" : ""}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium">
                            Phone
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            disabled={!isEditing}
                            className={isEditing ? "border-primary/50" : ""}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Address
                          </Label>
                          <Input
                            id="address"
                            type="text"
                            value={profile.address}
                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                            disabled={!isEditing}
                            className={isEditing ? "border-primary/50" : ""}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-sm font-medium">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profile.bio}
                          onChange={(e) => setProfile({...profile, bio: e.target.value})}
                          disabled={!isEditing}
                          className={`min-h-[100px] ${isEditing ? "border-primary/50" : ""}`}
                        />
                      </div>
                      
                      {isEditing && (
                        <Button type="submit" className="mt-4">
                          Save Changes
                        </Button>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
              
            {/* Orders Content */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fadeIn">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View and manage your recent orders</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/50 pb-4">
                          <div className="flex flex-wrap justify-between gap-2">
                            <div>
                              <CardTitle className="text-sm flex items-center gap-2">
                                {getStatusIcon(order.status)}
                                Order #{order.id}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {order.date} · {getStatusBadge(order.status)}
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground text-sm">Total</p>
                              <p className="font-medium">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="py-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    <p className="font-medium">${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>

                        <CardFooter className="flex justify-between bg-muted/30 pt-4 gap-2 flex-wrap">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Payment Method</p>
                            <p className="text-sm">{order.payment}</p>
                          </div>
                          <div className="space-x-2">
                            {order.status === 'delivered' && (
                              <Button variant="outline" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                Invoice
                              </Button>
                            )}
                            <Sheet>
                              <SheetTrigger asChild>
                                <Button variant="default" size="sm">
                                  View Details
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                              </SheetTrigger>
                              <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                  <SheetTitle>Order #{order.id}</SheetTitle>
                                  <SheetDescription>
                                    Placed on {order.date}
                                  </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 space-y-6">
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Order Status</h3>
                                    <div className="flex items-center gap-2">
                                      {getStatusIcon(order.status)}
                                      <span className="capitalize">{order.status}</span>
                                    </div>
                                    
                                    {(order.status === 'shipped' || order.status === 'processing') && (
                                      <div className="mt-4 space-y-2">
                                        <p className="text-sm">Estimated Delivery: April 12, 2023</p>
                                        <Progress value={order.status === 'shipped' ? 75 : 25} />
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                          <span>Processing</span>
                                          <span>Shipped</span>
                                          <span>Delivered</span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Items</h3>
                                    <div className="space-y-3">
                                      {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 pb-3 border-b">
                                          <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                            <img 
                                              src={item.image} 
                                              alt={item.name} 
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                                    <p className="text-sm">
                                      John Doe<br />
                                      {order.address}
                                    </p>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                                    <p className="text-sm flex items-center">
                                      <CreditCard className="h-4 w-4 mr-2" />
                                      {order.payment}
                                    </p>
                                  </div>
                                  
                                  <Separator />
                                  
                                  <div className="border-t pt-4">
                                    <div className="flex justify-between mb-2">
                                      <span className="text-sm">Subtotal</span>
                                      <span className="text-sm">${order.total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="text-sm">Shipping</span>
                                      <span className="text-sm">$0.00</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="text-sm">Tax</span>
                                      <span className="text-sm">${(order.total * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                                      <span>Total</span>
                                      <span>${(order.total * 1.1).toFixed(2)}</span>
                                    </div>
                                  </div>
                                  
                                  {order.status === 'delivered' && (
                                    <Button variant="outline" className="w-full">
                                      <Download className="mr-2 h-4 w-4" />
                                      Download Invoice
                                    </Button>
                                  )}
                                </div>
                              </SheetContent>
                            </Sheet>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
              
            {/* Payment Methods Content */}
            {activeTab === 'payment' && (
              <div className="space-y-6 animate-fadeIn">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <Card key={method.id}>
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0">
                                {getPaymentIcon(method.type)}
                              </div>
                              <div>
                                <p className="font-medium capitalize">{method.type} ending in {method.last4}</p>
                                <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                                {method.default && (
                                  <Badge variant="outline" className="mt-1 bg-primary/5">Default</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">Actions</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {!method.default && (
                                    <DropdownMenuItem onClick={() => handleSetDefaultPaymentMethod(method.id)}>
                                      Set as Default
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem onClick={() => handleRemovePaymentMethod(method.id)}>
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Button className="mt-4" onClick={handleAddPaymentMethod}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>

                    <div className="p-4 border rounded-lg bg-muted/30 mt-4">
                      <h3 className="text-sm font-medium mb-2">Billing Address</h3>
                      <p className="text-sm">
                        John Doe<br />
                        123 Main St<br />
                        Anytown, USA 12345
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2 text-sm">Edit Billing Address</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
              
            {/* Appearance Content */}
            {activeTab === 'appearance' && (
              <div className="space-y-6 animate-fadeIn">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize the look and feel of the application</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Theme</h3>
                        <RadioGroup 
                          defaultValue={theme} 
                          onValueChange={handleThemeChange}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                            <RadioGroupItem value="light" id="theme-light" />
                            <Label htmlFor="theme-light" className="flex items-center cursor-pointer w-full">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mr-3 shadow-md"></div>
                              <div>
                                <p className="font-medium">Light Theme</p>
                                <p className="text-sm text-muted-foreground">Clean, bright appearance</p>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                            <RadioGroupItem value="dark" id="theme-dark" />
                            <Label htmlFor="theme-dark" className="flex items-center cursor-pointer w-full">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mr-3 shadow-md"></div>
                              <div>
                                <p className="font-medium">Dark Theme</p>
                                <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                            <RadioGroupItem value="purple" id="theme-purple" />
                            <Label htmlFor="theme-purple" className="flex items-center cursor-pointer w-full">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 mr-3 shadow-md"></div>
                              <div>
                                <p className="font-medium">Purple Theme</p>
                                <p className="text-sm text-muted-foreground">Rich purple gradients</p>
                              </div>
                            </Label>
                          </div>
                          
                          <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                            <RadioGroupItem value="ocean" id="theme-ocean" />
                            <Label htmlFor="theme-ocean" className="flex items-center cursor-pointer w-full">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mr-3 shadow-md"></div>
                              <div>
                                <p className="font-medium">Ocean Theme</p>
                                <p className="text-sm text-muted-foreground">Calming blue tones</p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
                        
                        <div className="mt-8 p-6 border rounded-lg bg-muted/20">
                          <h3 className="font-medium mb-4">Theme Preview</h3>
                          <div className={`p-6 rounded-lg theme-${theme} border shadow-sm bg-card transition-colors`}>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <h3 className="text-lg font-medium">Sample Header</h3>
                                <p className="text-muted-foreground">This is how content will appear</p>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Cancel</Button>
                                <Button size="sm" variant="default">Save</Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                              <div className="border p-4 rounded-lg bg-muted/20">Card 1</div>
                              <div className="border p-4 rounded-lg bg-muted/20">Card 2</div>
                              <div className="border p-4 rounded-lg bg-muted/20">Card 3</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notifications Content */}
            {activeTab === 'notifications' && (
              <div className="animate-fadeIn">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Communication Channels</h3>
                      
                      <div className="grid gap-6">
                        <div className="flex items-start space-x-4 bg-muted/20 p-4 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Label htmlFor="notify-email" className="font-medium">Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive order updates, shipping notifications, and account alerts via email.
                                </p>
                              </div>
                              <Switch 
                                id="notify-email" 
                                checked={notifications.email}
                                onCheckedChange={() => handleNotificationToggle('email')}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 bg-muted/20 p-4 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Label htmlFor="notify-sms" className="font-medium">SMS Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                  Get text messages for important updates about your orders and account.
                                </p>
                              </div>
                              <Switch 
                                id="notify-sms" 
                                checked={notifications.sms}
                                onCheckedChange={() => handleNotificationToggle('sms')}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 bg-muted/20 p-4 rounded-lg">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <Label htmlFor="notify-browser" className="font-medium">Browser Notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                  Allow desktop notifications when you're browsing our website.
                                </p>
                              </div>
                              <Switch 
                                id="notify-browser" 
                                checked={notifications.browser}
                                onCheckedChange={() => handleNotificationToggle('browser')}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between py-3">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Order Updates</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                          </div>
                          <Switch 
                            checked={notifications.orderUpdates}
                            onCheckedChange={() => handleNotificationToggle('orderUpdates')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between py-3">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Security Alerts</Label>
                            <p className="text-sm text-muted-foreground">Get notified about security events</p>
                          </div>
                          <Switch 
                            checked={notifications.securityAlerts}
                            onCheckedChange={() => handleNotificationToggle('securityAlerts')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between py-3">
                          <div className="space-y-0.5">
                            <Label className="font-medium">Promotional Emails</Label>
                            <p className="text-sm text-muted-foreground">Receive special offers and discounts</p>
                          </div>
                          <Switch 
                            checked={notifications.promotions}
                            onCheckedChange={() => handleNotificationToggle('promotions')}
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between py-3">
                          <div className="space-y-0.5">
                            <Label className="font-medium">New Products</Label>
                            <p className="text-sm text-muted-foreground">Get notified about new product releases</p>
                          </div>
                          <Switch 
                            checked={notifications.newProducts}
                            onCheckedChange={() => handleNotificationToggle('newProducts')}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Security Content */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-fadeIn">
                <Card>
                  <CardHeader>
                    <CardTitle>Password Management</CardTitle>
                    <CardDescription>Update and secure your account password</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="current-password"
                            type={showPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Input
                            id="new-password"
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="bg-muted/30 p-3 rounded text-sm space-y-1">
                        <p className="font-medium">Password Requirements:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>At least 8 characters long</li>
                          <li>Include at least one uppercase letter</li>
                          <li>Include at least one number</li>
                          <li>Include at least one special character</li>
                        </ul>
                      </div>
                      
                      <Button type="submit" className="w-full sm:w-auto">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-muted-foreground">
                          Protect your account with an additional verification step each time you sign in.
                        </p>
                      </div>
                      <Switch 
                        checked={securitySettings.twoFactorEnabled} 
                        onCheckedChange={() => handleSecuritySettingToggle('twoFactorEnabled')}
                      />
                    </div>
                    
                    {!securitySettings.twoFactorEnabled && (
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-primary" />
                          Enhance Your Account Security
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Two-factor authentication adds an extra layer of security to your account by requiring access to your phone in addition to your password.
                        </p>
                        <Button onClick={handleEnableTwoFactor} className="mt-3">
                          Set Up 2FA
                        </Button>
                      </div>
                    )}
                    
                    {securitySettings.twoFactorEnabled && (
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center text-green-600 dark:text-green-500">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Two-factor authentication is enabled
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your account is now protected with two-factor authentication.
                        </p>
                        <div className="mt-3 flex gap-2">
                          <Button variant="outline" size="sm">
                            Setup Backup Codes
                          </Button>
                          <Button variant="outline" size="sm" className="text-destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Disable 2FA
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Security Notifications</CardTitle>
                    <CardDescription>Control your security-related notifications</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-start py-2">
                      <div>
                        <h3 className="font-medium">Login Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications when someone logs into your account
                        </p>
                      </div>
                      <Switch 
                        checked={securitySettings.loginAlerts} 
                        onCheckedChange={() => handleSecuritySettingToggle('loginAlerts')}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-start py-2">
                      <div>
                        <h3 className="font-medium">Password Change Alerts</h3>
                        <p className="text-sm text-muted-foreground">
                          Get notified when your password is changed
                        </p>
                      </div>
                      <Switch 
                        checked={securitySettings.passwordChanges} 
                        onCheckedChange={() => handleSecuritySettingToggle('passwordChanges')}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Device Management</CardTitle>
                    <CardDescription>Manage devices that are logged into your account</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start p-4 border rounded-lg bg-primary/5">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">Current Device</p>
                            <p className="text-sm text-muted-foreground">MacBook Pro • Los Angeles, CA • Active now</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium">iPhone 13</p>
                            <p className="text-sm text-muted-foreground">Los Angeles, CA • Last active 2 hours ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">Log Out</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-5 w-5 text-amber-500" />
                          <div>
                            <p className="font-medium">Windows PC</p>
                            <p className="text-sm text-muted-foreground">New York, NY • Last active 5 days ago</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">Log Out</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 mt-2">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log Out From All Devices
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

