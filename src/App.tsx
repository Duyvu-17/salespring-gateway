
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./components/utils/ScrollToTop";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Shipping from "./pages/Shipping";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Notifications from "./pages/Notifications";
import Checkout from "./pages/Checkout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import CustomerService from "./pages/CustomerService";
import { useCartNotification } from "./hooks/use-cart-notification";

const queryClient = new QueryClient();

// Create a context provider for cart notifications
import { createContext, useContext } from "react";

export const CartNotifiCationContext = createContext<ReturnType<typeof useCartNotification> | null>(null);

export const useCartNotificationContext = () => {
  const context = useContext(CartNotifiCationContext);
  if (!context) {
    throw new Error("useCartNotificationContext must be used within a CartNotificationProvider");
  }
  return context;
};

const CartNotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const cartNotification = useCartNotification();
  
  return (
    <CartNotifiCationContext.Provider value={cartNotification}>
      {children}
      <cartNotification.CartNotification />
    </CartNotifiCationContext.Provider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartNotificationProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/customer-service" element={<CustomerService />} />
                
                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/order/:orderId" element={<OrderDetailsPage />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
            <Toaster />
          </CartNotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
