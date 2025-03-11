
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
  CheckCircle
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

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
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
    promotions: false
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
    <div className="container mx-auto px-4 py-8 md:py-16 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden border-2 border-primary/20">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <div className="hidden lg:block">
            <div className="bg-card p-6 rounded-xl shadow-sm border sticky top-24">
              <div className="space-y-2">
                <h3 className="font-medium mb-4">Account Navigation</h3>
                <Tabs defaultValue="profile" className="w-full" orientation="vertical">
                  <TabsList className="flex flex-col h-auto w-full bg-transparent space-y-1">
                    <TabsTrigger value="profile" className="justify-start w-full">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger value="orders" className="justify-start w-full">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger value="payment" className="justify-start w-full">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Payment
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="justify-start w-full">
                      <Palette className="mr-2 h-4 w-4" />
                      Theme
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="justify-start w-full">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security" className="justify-start w-full">
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="profile" className="space-y-8">
              <TabsList className="lg:hidden grid grid-cols-3 md:grid-cols-6 w-full gap-2 bg-transparent h-auto overflow-x-auto">
                <TabsTrigger value="profile" className="flex flex-col items-center py-2 h-auto">
                  <User className="h-4 w-4 mb-1" />
                  <span className="text-xs">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex flex-col items-center py-2 h-auto">
                  <Package className="h-4 w-4 mb-1" />
                  <span className="text-xs">Orders</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex flex-col items-center py-2 h-auto">
                  <CreditCard className="h-4 w-4 mb-1" />
                  <span className="text-xs">Payment</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex flex-col items-center py-2 h-auto">
                  <Palette className="h-4 w-4 mb-1" />
                  <span className="text-xs">Theme</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex flex-col items-center py-2 h-auto">
                  <Bell className="h-4 w-4 mb-1" />
                  <span className="text-xs">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex flex-col items-center py-2 h-auto">
                  <Shield className="h-4 w-4 mb-1" />
                  <span className="text-xs">Security</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6 animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Personal Information</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2"
                    >
                      {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                      {isEditing ? "Save" : "Edit"}
                    </Button>
                  </div>
                  
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
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-semibold mb-6">Order History</h2>
                  
                  <div className="space-y-6">
                    {[1, 2].map((order) => (
                      <div key={order} className="border rounded-lg p-4 transition-all hover:shadow-md">
                        <div className="flex flex-wrap justify-between gap-4 mb-4">
                          <div>
                            <p className="text-muted-foreground text-sm">Order #{order}12345</p>
                            <p className="font-medium">March {order + 14}, 2023</p>
                          </div>
                          <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Delivered
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground text-sm">Total</p>
                            <p className="font-medium">${order * 299.99}</p>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="sm">View Order Details</Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                              <SheetHeader>
                                <SheetTitle>Order #{order}12345</SheetTitle>
                                <SheetDescription>
                                  Placed on March {order + 14}, 2023
                                </SheetDescription>
                              </SheetHeader>
                              <div className="mt-6 space-y-6">
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Items</h3>
                                  <div className="space-y-3">
                                    <div className="flex gap-4 pb-3 border-b">
                                      <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0"></div>
                                      <div className="flex-1">
                                        <h4 className="font-medium">Product Name {order}</h4>
                                        <p className="text-sm text-muted-foreground">Qty: 1</p>
                                        <p className="font-medium mt-1">${order * 299.99}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Shipping Address</h3>
                                  <p className="text-sm">
                                    John Doe<br />
                                    123 Main St<br />
                                    Anytown, USA 12345
                                  </p>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium mb-2">Payment Method</h3>
                                  <p className="text-sm flex items-center">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Visa ending in 4242
                                  </p>
                                </div>
                                <div className="border-t pt-4">
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm">Subtotal</span>
                                    <span className="text-sm">${order * 299.99}</span>
                                  </div>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm">Shipping</span>
                                    <span className="text-sm">$0.00</span>
                                  </div>
                                  <div className="flex justify-between mb-2">
                                    <span className="text-sm">Tax</span>
                                    <span className="text-sm">${(order * 299.99 * 0.1).toFixed(2)}</span>
                                  </div>
                                  <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                                    <span>Total</span>
                                    <span>${(order * 299.99 * 1.1).toFixed(2)}</span>
                                  </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                  Download Invoice
                                </Button>
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
                  
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 flex justify-between items-center transition-all hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/24</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Remove</Button>
                      </div>
                    </div>
                    
                    <Button className="mt-4 w-full sm:w-auto">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6 animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-semibold mb-6">Theme Settings</h2>
                  
                  <div className="max-w-md">
                    <RadioGroup 
                      defaultValue={theme} 
                      onValueChange={handleThemeChange}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-500 mr-3 shadow-md"></div>
                          <span>Light Theme</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 shadow-md"></div>
                          <span>Dark Theme</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="purple" id="theme-purple" />
                        <Label htmlFor="theme-purple" className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-500 mr-3 shadow-md"></div>
                          <span>Purple Theme</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ocean" id="theme-ocean" />
                        <Label htmlFor="theme-ocean" className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-cyan-500 mr-3 shadow-md"></div>
                          <span>Ocean Theme</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-8 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Theme Preview</h3>
                      <div className={`p-4 rounded-lg theme-${theme} border bg-background text-foreground`}>
                        <div className="flex justify-between items-center mb-4">
                          <div className="font-medium">Sample Text</div>
                          <Button size="sm" variant="default">Button</Button>
                        </div>
                        <div className="text-muted-foreground text-sm">
                          This is how text and elements will appear in your selected theme.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Communication Channels</h3>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="notify-email" 
                          checked={notifications.email}
                          onCheckedChange={() => handleNotificationToggle('email')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="notify-email" className="font-medium">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive order updates, shipping notifications, and account alerts via email.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="notify-sms" 
                          checked={notifications.sms}
                          onCheckedChange={() => handleNotificationToggle('sms')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="notify-sms" className="font-medium">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Get text messages for important updates about your orders and account.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="notify-browser" 
                          checked={notifications.browser}
                          onCheckedChange={() => handleNotificationToggle('browser')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="notify-browser" className="font-medium">Browser Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow desktop notifications when you're browsing our website.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <h3 className="text-lg font-medium">Marketing Preferences</h3>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="notify-promotions" 
                          checked={notifications.promotions}
                          onCheckedChange={() => handleNotificationToggle('promotions')}
                        />
                        <div className="grid gap-1.5">
                          <Label htmlFor="notify-promotions" className="font-medium">Promotional Emails</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive special offers, discounts, and product recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="animate-fadeIn">
                <div className="bg-card p-6 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
                  
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">Change Password</p>
                          <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
                        </div>
                        <Button variant="outline">Update Password</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Enable 2FA</p>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                          <Button variant="default">Set Up 2FA</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Device Management</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 border rounded-lg">
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
                          <Button variant="outline" size="sm">Log Out</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
