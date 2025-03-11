
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Heart, 
  Bell, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Set cart count from local storage or initialize
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.length);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm('');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'purple' : 
                     theme === 'purple' ? 'ocean' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      {/* Top Bar with Contact Info */}
      <div className="hidden md:block bg-primary/10 py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3.5 w-3.5" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3.5 w-3.5" />
              <span>support@storex.com</span>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center">
            <button onClick={toggleTheme} className="text-xs hover:text-primary">
              Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
            <div className="h-4 border-r border-muted-foreground/30"></div>
            <Link to="/shipping" className="hover:text-primary transition-colors">
              Shipping
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <header className={`sticky top-0 z-50 w-full ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background'} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center">
              <span className="text-3xl mr-1">S</span>toreX
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center hover:text-primary transition-colors">
                  Products
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute z-10 left-0 w-48 mt-2 origin-top-left bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <Link to="/search?category=Electronics" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Electronics
                    </Link>
                    <Link to="/search?category=Clothing" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Clothing
                    </Link>
                    <Link to="/search?category=Home & Kitchen" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Home & Kitchen
                    </Link>
                    <Link to="/search?category=Beauty" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Beauty
                    </Link>
                    <Link to="/search" className="block px-4 py-2 text-sm text-primary hover:bg-muted rounded-md">
                      View All
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center hover:text-primary transition-colors">
                  Categories
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute z-10 left-0 w-48 mt-2 origin-top-left bg-background border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <Link to="/search?discount=true" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      On Sale
                    </Link>
                    <Link to="/search?new=true" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      New Arrivals
                    </Link>
                    <Link to="/search?bestseller=true" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Best Sellers
                    </Link>
                  </div>
                </div>
              </div>
              <Link to="/about" className="hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="animate-fadeIn">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onBlur={() => !searchTerm && setIsSearchOpen(false)}
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-primary/10"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              
              <Link to={isLoggedIn ? "/account" : "/login"}>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fadeIn">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/search" 
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  to="/search" 
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  to="/about" 
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link 
                  to={isLoggedIn ? "/account" : "/login"} 
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isLoggedIn ? "My Account" : "Login"}
                </Link>
                <button 
                  className="px-4 py-2 hover:bg-muted rounded-md text-left"
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                >
                  Change Theme
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
