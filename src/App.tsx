
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import Account from "@/pages/Account";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import NotFound from "@/pages/NotFound";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import ProductDetail from "@/pages/ProductDetail";
import Search from "@/pages/Search";
import Wishlist from "@/pages/Wishlist";
import Shipping from "@/pages/Shipping";
import Notifications from "@/pages/Notifications";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Index />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="products/:productId" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="search" element={<Search />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="account" element={<Account />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="order/:orderId" element={<OrderDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
