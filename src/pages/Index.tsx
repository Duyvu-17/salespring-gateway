
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  getFeaturedProducts, 
  getNewProducts, 
  getDiscountedProducts,
  categories 
} from '@/data/products';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts().slice(0, 4);
  const discountedProducts = getDiscountedProducts().slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold">Welcome to StoreX</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Discover premium products with exceptional quality and design
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
              View Collections
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="glass-card hover-scale overflow-hidden">
              <Link to={`/product/${product.id}`} className="block">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.discount && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      {product.discount}% OFF
                    </Badge>
                  )}
                  {product.new && (
                    <Badge className="absolute top-2 left-2 bg-green-500">
                      NEW
                    </Badge>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    </div>
                    <div className="text-right">
                      {product.discount ? (
                        <>
                          <p className="text-lg font-medium text-primary">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </p>
                          <p className="text-sm line-through text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg font-medium text-primary">${product.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <Button className="w-full mt-2">Add to Cart</Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              to={`/search?category=${category.name}`}
              className="block"
            >
              <div className="relative h-48 rounded-lg overflow-hidden hover-scale">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Sections */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* New Arrivals */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link to="/search?new=true" className="text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {newProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">${product.price.toFixed(2)}</p>
                  <Badge className="mt-1 bg-green-500">NEW</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Special Offers</h2>
            <Link to="/search?discount=true" className="text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {discountedProducts.map(product => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="flex gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">
                    ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                  </p>
                  <p className="text-xs line-through text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <Badge className="mt-1 bg-red-500">{product.discount}% OFF</Badge>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6">Subscribe to our newsletter for exclusive offers and updates</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
