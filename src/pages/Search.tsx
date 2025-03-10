
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search as SearchIcon, SlidersHorizontal, Star } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { products, categories, searchProducts } from '@/data/products';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category')
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [showOnSale, setShowOnSale] = useState<boolean>(false);
  const [showInStock, setShowInStock] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category');
    const onSale = searchParams.get('discount') === 'true';
    const newArrivals = searchParams.get('new') === 'true';
    
    setSearchTerm(query);
    setSelectedCategory(category);
    setShowOnSale(onSale);
    
    // Filter products based on search params
    let filtered = query ? searchProducts(query) : [...products];
    
    if (category) {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (onSale) {
      filtered = filtered.filter(p => p.discount);
    }
    
    if (newArrivals) {
      filtered = filtered.filter(p => p.new);
    }
    
    if (showInStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    
    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [searchParams, priceRange, showInStock]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('q', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (showOnSale) params.set('discount', 'true');
    
    setSearchParams(params);
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === category) {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    if (searchTerm) params.set('q', searchTerm);
    if (showOnSale) params.set('discount', 'true');
    
    setSearchParams(params);
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };
  
  const handleClearFilters = () => {
    setSearchParams({});
    setSelectedCategory(null);
    setPriceRange([0, 1500]);
    setShowOnSale(false);
    setShowInStock(true);
    setSearchTerm('');
  };

  const maxPrice = Math.max(...products.map(p => p.price));

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
          <div className="bg-card p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearFilters}
                className="text-xs h-8"
              >
                Clear all
              </Button>
            </div>
            
            <Accordion type="multiple" defaultValue={["categories", "price", "availability"]}>
              <AccordionItem value="categories">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`block w-full text-left px-4 py-2 rounded-md ${
                          selectedCategory === category.name
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <Slider
                      defaultValue={[0, maxPrice]}
                      min={0}
                      max={maxPrice}
                      step={10}
                      value={[priceRange[0], priceRange[1]]}
                      onValueChange={handlePriceChange}
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="availability">
                <AccordionTrigger>Availability</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="in-stock" 
                        checked={showInStock}
                        onCheckedChange={(checked) => {
                          setShowInStock(checked as boolean);
                        }}
                      />
                      <label
                        htmlFor="in-stock"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="on-sale" 
                        checked={showOnSale}
                        onCheckedChange={(checked) => {
                          setShowOnSale(checked as boolean);
                          
                          const params = new URLSearchParams(searchParams);
                          if (checked) {
                            params.set('discount', 'true');
                          } else {
                            params.delete('discount');
                          }
                          
                          setSearchParams(params);
                        }}
                      />
                      <label
                        htmlFor="on-sale"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        
        {/* Products */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <h2 className="text-xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button
                variant="outline"
                onClick={handleClearFilters}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
                  <select className="bg-transparent text-sm border-none focus:ring-0">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Best Rating</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="glass-card hover-scale overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
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
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                        <div className="flex items-center mb-2">
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
                        {product.discount ? (
                          <div className="flex justify-between items-center">
                            <p className="text-lg font-medium text-primary">
                              ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </p>
                            <p className="text-sm line-through text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>
                        ) : (
                          <p className="text-lg font-medium text-primary">
                            ${product.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
