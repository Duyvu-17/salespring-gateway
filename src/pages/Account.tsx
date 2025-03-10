
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { User, Package, CreditCard, LogOut, Palette } from 'lucide-react';
import { Label } from '@/components/ui/label';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, Anytown, USA'
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
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'purple' | 'ocean');
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Loading account information...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Theme
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium">
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium">
                    Address
                  </label>
                  <Input
                    id="address"
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>
              </div>
              
              <Button type="submit">Save Changes</Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Order History</h2>
            
            <div className="space-y-4">
              {[1, 2].map((order) => (
                <div key={order} className="border rounded-lg p-4">
                  <div className="flex flex-wrap justify-between gap-4 mb-4">
                    <div>
                      <p className="text-muted-foreground text-sm">Order #{order}12345</p>
                      <p className="font-medium">March {order + 14}, 2023</p>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-sm">Total</p>
                      <p className="font-medium">${order * 299.99}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Button variant="outline" size="sm">View Order Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payment">
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
            
            <div className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/24</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
              
              <Button className="mt-4">Add Payment Method</Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <div className="bg-card p-6 rounded-xl shadow-sm">
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
      </Tabs>
    </div>
  );
};

export default Account;
