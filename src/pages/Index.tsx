import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Star,
  TrendingUp,
  Package,
  Award,
  MousePointerClick,
  ShoppingBag,
  ChevronRight,
  ArrowRight,
  Flame,
  Clock,
  Percent,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { DiscountCollector } from "@/components/discount/DiscountCollector";
import HeroSlider from "./HeroSlider";
import Newsletter from "./Newsletter";
import ShopByCategory from "./ShopByCategory";
import TrendingProducts from "./TrendingProducts";
import { useCartNotificationContext } from "../App";
import { productService } from "@/services/product.service";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import HotProductsSection from "@/components/products/HotProductsSection";
import SaleProductsSection from "@/components/products/SaleProductsSection";
import NewProductsSection from "@/components/products/NewProductsSection";
import AllProductsSection from "@/components/products/AllProductsSection";

// Định nghĩa type tạm cho response từ BE
type ProductListResponse = { products: Product[] };

const Index = () => {
  // State cho các loại sản phẩm
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [hotProducts, setHotProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [saleProducts, setSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState({
    featured: true,
    hot: true,
    new: true,
    sale: true,
  });
  const [error, setError] = useState({
    featured: null,
    hot: null,
    new: null,
    sale: null,
  });
  const { showCartNotification } = useCartNotificationContext();

  useEffect(() => {
    setLoading({ featured: true, hot: true, new: true, sale: true });
    Promise.all([
      productService.getAll(), // featured
      productService.getAll({ type: "hot" }),
      productService.getAll({ type: "new" }),
      productService.getAll({ type: "sale" }),
    ])
      .then(([featured, hot, news, sale]) => {
        setAllProducts(
          featured && Array.isArray(featured) ? featured : []
        );
        setHotProducts(hot && Array.isArray(hot) ? hot : []);
        setNewProducts(
          news && Array.isArray(news) ? news : []
        );
        setSaleProducts(
          sale && Array.isArray(sale) ? sale : []
        );
        setError({ featured: null, hot: null, new: null, sale: null });
      })
      .catch((err) => {
        setError({
          featured: "Không thể tải sản phẩm nổi bật",
          hot: "Không thể tải sản phẩm hot",
          new: "Không thể tải sản phẩm mới",
          sale: "Không thể tải sản phẩm giảm giá",
        });
        setAllProducts([]);
        setHotProducts([]);
        setNewProducts([]);
        setSaleProducts([]);
      })
      .finally(() => {
        setLoading({ featured: false, hot: false, new: false, sale: false });
      });
  }, []);

  const handleQuickAddToCart = (product) => {
    showCartNotification(product);
  };

  return (
    <div className="space-y-20 pb-20">
      <HeroSlider />
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/shipping" className="block">
            <Card className="glass-card border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    On all orders over $50
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/quality-guarantee" className="block">
            <Card className="glass-card border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Quality Guarantee</h3>
                  <p className="text-sm text-muted-foreground">
                    30-day money back
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/secure-checkout" className="block">
            <Card className="glass-card border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MousePointerClick className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Secure Checkout</h3>
                  <p className="text-sm text-muted-foreground">
                    100% protected payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/trending-products" className="block">
            <Card className="glass-card border-none shadow-lg">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Trending Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated weekly
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Hot Products Section */}
      <HotProductsSection
        products={hotProducts}
        loading={loading.hot}
        error={error.hot}
      />

      {/* Sale Products Section */}
      <SaleProductsSection
        products={saleProducts}
        loading={loading.sale}
        error={error.sale}
      />

      {/* New Products Section */}
      <NewProductsSection
        products={newProducts}
        loading={loading.new}
        error={error.new}
      />

      {/* All Products Section */}
      <AllProductsSection
        products={allProducts}
        loading={loading.featured}
        error={error.featured}
      />

      {/* Featured Products with Enhanced Styling */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Featured Products
              </h2>
              <p className="text-muted-foreground mt-2">
                Discover our most popular items
              </p>
            </div>
          </div>
          <Link
            to="/search"
            className="text-primary hover:underline flex items-center group"
          >
            VIEW ALL{" "}
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        {loading.featured ? (
          <div className="text-center py-8">Đang tải sản phẩm nổi bật...</div>
        ) : error.featured ? (
          <div className="text-red-500 text-center py-8">{error.featured}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Discount Code Collector Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-primary/5 to-transparent p-10 rounded-2xl">
          <div className="max-w-4xl mx-auto">
            <DiscountCollector />
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <ShopByCategory />

      {/* New Arrivals & Special Offers in a visually appealing layout */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* New Arrivals */}
        <section className="bg-gradient-to-tr from-primary/5 to-transparent p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">New Arrivals</h2>
                <p className="text-sm text-muted-foreground">
                  The latest additions to our store
                </p>
              </div>
            </div>
            <Link
              to="/search?new=true"
              className="text-primary hover:underline flex items-center group"
            >
              VIEW ALL{" "}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading.new ? (
            <div className="text-center py-4">Đang tải sản phẩm mới...</div>
          ) : error.new ? (
            <div className="text-red-500 text-center py-4">{error.new}</div>
          ) : (
            <div className="space-y-4">
              {newProducts.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">
                      {product.pricing?.base_price
                        ? `₫${Number(
                            product.pricing?.sale_price
                          ).toLocaleString()}`
                        : `₫${Number(
                            product.pricing?.base_price || product.price
                          ).toLocaleString()}`}
                    </p>
                    <Badge className="mt-1 bg-blue-500">NEW</Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Special Offers */}
        <section className="bg-gradient-to-bl from-red-500/5 to-transparent p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/10 p-2 rounded-full">
                <Percent className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Special Offers</h2>
                <p className="text-sm text-muted-foreground">
                  Limited-time discounts
                </p>
              </div>
            </div>
            <Link
              to="/search?sale=true"
              className="text-primary hover:underline flex items-center group"
            >
              VIEW ALL{" "}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading.sale ? (
            <div className="text-center py-4">
              Đang tải sản phẩm giảm giá...
            </div>
          ) : error.sale ? (
            <div className="text-red-500 text-center py-4">{error.sale}</div>
          ) : (
            <div className="space-y-4">
              {saleProducts.slice(0, 4).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="flex gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">
                      {product.pricing?.sale_price
                        ? `₫${Number(
                            product.pricing.sale_price
                          ).toLocaleString()}`
                        : `₫${Number(
                            product.pricing?.base_price || product.price
                          ).toLocaleString()}`}
                    </p>
                    {product.pricing?.sale_price && (
                      <p className="text-xs line-through text-muted-foreground">
                        ₫{Number(product.pricing.base_price).toLocaleString()}
                      </p>
                    )}
                    <Badge className="mt-1 bg-red-500">SALE</Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Newsletter with Enhanced Design */}
      <Newsletter />
    </div>
  );
};

export default Index;
