import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getFeaturedProducts,
  getNewProducts,
  getDiscountedProducts,
  categories,
} from "@/data/products";
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
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { DiscountCollector } from "@/components/discount/DiscountCollector";
import HeroSlider from "./HeroSlider";
import Newsletter from "./Newsletter";
import ShopByCategory from "./ShopByCategory";
import TrendingProducts from "./TrendingProducts";

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts().slice(0, 4);
  const discountedProducts = getDiscountedProducts().slice(0, 4);

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
      <TrendingProducts />
      {/* Featured Products with Enhanced Styling */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Featured Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover our most popular items
            </p>
          </div>
          <Link
            to="/search"
            className="text-primary hover:underline flex items-center group"
          >
            View all{" "}
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
            <div>
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-sm text-muted-foreground">
                The latest additions to our store
              </p>
            </div>
            <Link
              to="/search?new=true"
              className="text-primary hover:underline flex items-center group"
            >
              View all{" "}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {newProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  <Badge className="mt-1 bg-green-500">NEW</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="bg-gradient-to-bl from-red-500/5 to-transparent p-8 rounded-2xl shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Special Offers</h2>
              <p className="text-sm text-muted-foreground">
                Limited-time discounts
              </p>
            </div>
            <Link
              to="/search?discount=true"
              className="text-primary hover:underline flex items-center group"
            >
              View all{" "}
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            {discountedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="flex gap-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-white/10 transition-colors group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                />
                <div className="flex-1">
                  <h3 className="font-medium group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">
                    $
                    {(
                      product.price *
                      (1 - (product.discount || 0) / 100)
                    ).toFixed(2)}
                  </p>
                  <p className="text-xs line-through text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <Badge className="mt-1 bg-red-500">
                    {product.discount}% OFF
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter with Enhanced Design */}
      <Newsletter />
    </div>
  );
};

export default Index;
