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

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts().slice(0, 4);
  const discountedProducts = getDiscountedProducts().slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Enhanced Animated Overlay */}
      <section className="hero-section relative rounded-3xl overflow-hidden mx-4 mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] bg-cover bg-center opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center text-white space-y-8">
          <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-full animate-fadeIn transition-all duration-300">
            New Collection Available
          </Badge>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp"
            style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
          >
            Discover Premium{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-primary-foreground/80">
              Technology
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl max-w-2xl mx-auto animate-fadeIn delay-100"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
          >
            Discover premium products with exceptional quality and design that
            enhance your everyday life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-200">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
            >
              Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/20 shadow-lg backdrop-blur-sm"
            >
              Explore Collections <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Store Benefits */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <Card className="glass-card border-none shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Trending Products</h3>
                <p className="text-sm text-muted-foreground">Updated weekly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

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

      {/* Categories with Gradient Overlays */}
      {/* <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Browse our collection by category</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              to={`/search?category=${category.name}`}
              className="block"
            >
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden hover-scale shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300 hover:opacity-75" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{category.name}</h3>
                  <p className="text-white/80 text-sm mt-1 flex items-center">
                    Shop now <ChevronRight className="ml-1 h-4 w-4" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section> */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">
              Browse our collection by category
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/search?category=${category.name}`}
              className="block"
            >
              <div
                className="relative h-48 md:h-64 rounded-xl overflow-hidden hover:scale-105 shadow-lg transition-transform"
                style={{
                  // backgroundImage: `url(${category.image})`,
                  backgroundImage: `url(https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300 hover:opacity-75" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3
                    className="text-2xl font-bold text-white"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                  >
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mt-1 flex items-center">
                    Shop now <ChevronRight className="ml-1 h-4 w-4" />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')] opacity-10 bg-cover bg-center"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, product updates
              and tech tips
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 shadow-sm"
              />
              <Button className="shadow-sm">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
