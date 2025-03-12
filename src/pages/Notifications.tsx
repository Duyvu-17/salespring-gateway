
import { useState, useEffect } from 'react';
import { Bell, ShoppingBag, Heart, Info, Check, X, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Notification {
  id: number;
  type: 'order' | 'wishlist' | 'system' | 'delivery';
  title: string;
  message: string;
  date: string; // ISO string
  read: boolean;
  image?: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'wishlist' | 'system' | 'delivery'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading notifications
    const loadNotifications = () => {
      setIsLoading(true);
      
      // In a real app, this would come from an API
      // For now, we'll use mock data
      setTimeout(() => {
        const mockNotifications: Notification[] = [
          {
            id: 1,
            type: 'order',
            title: 'Order Confirmed',
            message: 'Your order #12345 has been confirmed and is being processed.',
            date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            read: false,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
          },
          {
            id: 2,
            type: 'wishlist',
            title: 'Item Back in Stock',
            message: 'An item in your wishlist is now back in stock!',
            date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
            read: true,
            image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a'
          },
          {
            id: 3,
            type: 'system',
            title: 'Account Update',
            message: 'Your account information has been successfully updated.',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            read: true
          },
          {
            id: 4,
            type: 'delivery',
            title: 'Package Delivered',
            message: 'Your package has been delivered to your address.',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
            read: false,
            image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8'
          },
          {
            id: 5,
            type: 'wishlist',
            title: 'Price Drop Alert',
            message: 'A product in your wishlist is now on sale!',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
            read: false,
            image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519'
          }
        ];
        
        // Sort by date (newest first)
        mockNotifications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setNotifications(mockNotifications);
        setIsLoading(false);
      }, 1000);
    };
    
    loadNotifications();
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'order': return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case 'wishlist': return <Heart className="h-5 w-5 text-red-500" />;
      case 'system': return <Info className="h-5 w-5 text-purple-500" />;
      case 'delivery': return <Truck className="h-5 w-5 text-green-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Bell className="h-6 w-6 mr-2" />
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="ml-2" variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark all as read
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
          >
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar filters */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('all')}
              >
                <Bell className="h-4 w-4 mr-2" />
                All Notifications
                <Badge className="ml-auto">{notifications.length}</Badge>
              </Button>
              
              <Button 
                variant={filter === 'unread' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('unread')}
              >
                <Badge className="h-2 w-2 rounded-full bg-red-500 mr-2" />
                Unread
                <Badge className="ml-auto">{unreadCount}</Badge>
              </Button>
              
              <Separator className="my-2" />
              
              <Button 
                variant={filter === 'order' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('order')}
              >
                <ShoppingBag className="h-4 w-4 mr-2 text-blue-500" />
                Orders
                <Badge className="ml-auto">{notifications.filter(n => n.type === 'order').length}</Badge>
              </Button>
              
              <Button 
                variant={filter === 'wishlist' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('wishlist')}
              >
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                Wishlist
                <Badge className="ml-auto">{notifications.filter(n => n.type === 'wishlist').length}</Badge>
              </Button>
              
              <Button 
                variant={filter === 'delivery' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('delivery')}
              >
                <Truck className="h-4 w-4 mr-2 text-green-500" />
                Delivery
                <Badge className="ml-auto">{notifications.filter(n => n.type === 'delivery').length}</Badge>
              </Button>
              
              <Button 
                variant={filter === 'system' ? 'default' : 'ghost'} 
                className="w-full justify-start"
                onClick={() => setFilter('system')}
              >
                <Info className="h-4 w-4 mr-2 text-purple-500" />
                System
                <Badge className="ml-auto">{notifications.filter(n => n.type === 'system').length}</Badge>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Notifications list */}
        <div className="lg:col-span-9">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="animate-pulse text-primary">Loading notifications...</div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Bell className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-2xl font-semibold mb-2">No notifications</h2>
                <p className="text-muted-foreground">
                  {filter === 'all' ? 
                    "You don't have any notifications yet." : 
                    `You don't have any ${filter === 'unread' ? 'unread' : filter} notifications.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`overflow-hidden transition-all ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <CardContent className="p-0">
                    <div className="flex p-4">
                      <div className="mr-4 flex-shrink-0">
                        {notification.image ? (
                          <Avatar className="h-12 w-12 rounded-md">
                            <AvatarImage src={notification.image} alt={notification.title} />
                            <AvatarFallback className="rounded-md">
                              {getIconForType(notification.type)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                            {getIconForType(notification.type)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{notification.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          </div>
                          <span className="text-xs text-muted-foreground ml-4">
                            {formatDate(notification.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 px-4 py-2 flex justify-end space-x-2">
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
