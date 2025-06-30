import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Palette,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setTheme, toggleTheme } from "@/store/slices/themeSlice";
import { Badge } from "@/components/ui/badge";
import { MainNavigationMenu } from "./NavigationMenu";
import { fetchCart } from "@/store/slices/cartSlice";
import { fetchWishlist } from "@/store/slices/wishlistSlice";
import type { AppDispatch } from "@/store";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeLabel = theme.charAt(0).toUpperCase() + theme.slice(1);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const cartCount = useSelector(
    (state: RootState) => state.cart.cart?.cart_items?.length || 0
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.wishlist?.length || 0
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    // Fetch cart & wishlist khi mount
    dispatch(fetchCart());
    dispatch(fetchWishlist());
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
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
            <button
              onClick={() => dispatch(toggleTheme())}
              className="text-xs hover:text-primary"
            >
              Theme: {themeLabel}
            </button>
            <div className="h-4 border-r border-muted-foreground/30"></div>
            <Link
              to="/shipping"
              className="hover:text-primary transition-colors"
            >
              Shipping
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm"
            : "bg-background"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="text-2xl font-bold text-primary flex items-center"
              >
                <span className="text-3xl mr-1">S</span>toreX
              </Link>

              <MainNavigationMenu />
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

              <Link to="/wishlist" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/cart" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to="/notifications">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>

              <Link to={isAuthenticated ? "/account" : "/login"}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10"
                >
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
                  to="/wishlist"
                  className="px-4 py-2 hover:bg-muted rounded-md flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <Badge className="ml-2">{wishlistCount}</Badge>
                  )}
                </Link>
                <Link
                  to="/shipping"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shipping
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
                  to={isAuthenticated ? "/account" : "/login"}
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isAuthenticated ? "My Account" : "Login"}
                </Link>
                <button
                  className="px-4 py-2 hover:bg-muted rounded-md text-left"
                  onClick={() => {
                    dispatch(toggleTheme());
                    setIsMenuOpen(false);
                  }}
                >
                  Change Theme
                </button>
                <Link
                  to="/faq"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  to="/returns"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Returns
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
