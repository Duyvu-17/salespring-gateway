
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary">
            StoreX
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="animate-fadeIn">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
