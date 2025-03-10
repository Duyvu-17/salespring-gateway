
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Wireless Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Wearables"
  },
  {
    id: 4,
    name: "Bluetooth Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    category: "Accessories"
  },
  {
    id: 5,
    name: "Fitness Tracker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1576243345690-4e4e11e6e4aa?w=500&q=80",
    category: "Wearables"
  },
  {
    id: 6,
    name: "Portable SSD",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&q=80",
    category: "Electronics"
  }
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract unique categories
  const categories = [...new Set(allProducts.map(p => p.category))];
  
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchTerm(query);
    
    // Filter products based on search term and category
    filterProducts(query, selectedCategory);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [searchParams, selectedCategory]);
  
  const filterProducts = (query: string, category: string | null) => {
    let filtered = allProducts;
    
    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    setProducts(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: searchTerm });
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="flex-1"
          />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`block w-full text-left px-4 py-2 rounded-md ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchParams({});
                  setSelectedCategory(null);
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="glass-card hover-scale overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                      <p className="text-lg font-medium text-primary">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
