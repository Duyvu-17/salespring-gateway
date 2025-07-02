import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  Star,
  X,
  Filter,
  Check,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { productService } from "@/services/product.service";
import { categoryService } from "@/services/category.service";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { string } from "zod";
import { ProductCard } from "@/components/products/ProductCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [showOnSale, setShowOnSale] = useState<boolean>(false);
  const [showInStock, setShowInStock] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const dispatch = useDispatch<AppDispatch>();
  const categoriesRedux = useSelector(
    (state: RootState) => state.category.categories
  );

  // Thêm state tạm cho filter trong Sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(priceRange);
  const [tempShowInStock, setTempShowInStock] = useState(showInStock);
  const [tempShowOnSale, setTempShowOnSale] = useState(showOnSale);

  // Lấy sản phẩm từ BE theo filter/search - Fixed version
  useEffect(() => {
    setIsLoading(true);
    const params: Record<string, string | number> = {};
    if (showOnSale) params.sale = "true";

    // Fixed: Đồng bộ parameter names với BE
    if (searchTerm) params.q = searchTerm;
    if (selectedCategory) params.category = selectedCategory;

    // Fixed: Gửi đúng parameter name mà BE expect
    if (showOnSale) params.sale = "true";

    if (searchParams.get("new") === "true") params.new = "true";
    if (showInStock) params.inStock = "true";

    // Fixed: Sử dụng consistent parameter names
    if (priceRange[0] > 0) params.min_price = priceRange[0];
    if (priceRange[1] < maxPrice) params.max_price = priceRange[1];

    productService
      .getAll(params)
      .then((res) => {
        // Fixed: Handle different response structures
        const products = res.products || res;
        const productsArray = Array.isArray(products) ? products : [];

        setFilteredProducts(productsArray);

        // Fixed: Safe max price calculation
        if (productsArray.length > 0) {
          const maxP = Math.max(
            ...productsArray.map((p) => {
              // Handle both direct price and nested pricing
              const price = p.price || p.pricing?.base_price || 0;
              return Number(price);
            })
          );
          setMaxPrice(maxP > 0 ? maxP : 1500);
        } else {
          setMaxPrice(1500);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setFilteredProducts([]);
        setMaxPrice(1500);
      })
      .finally(() => setIsLoading(false));
  }, [
    searchParams,
    priceRange,
    showInStock,
    showOnSale,
    maxPrice,
    searchTerm,
    selectedCategory,
  ]);

  useEffect(() => {
    // Calculate active filters
    const filters = [];
    if (selectedCategory) filters.push(`Category: ${selectedCategory}`);
    if (showOnSale) filters.push("On Sale");
    if (searchParams.get("new") === "true") filters.push("New Arrivals");
    if (showInStock) filters.push("In Stock Only");
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) {
      filters.push(`Price: $${priceRange[0]} - $${priceRange[1]}`);
    }
    setActiveFilters(filters);
  }, [
    selectedCategory,
    showOnSale,
    showInStock,
    priceRange,
    maxPrice,
    searchParams,
  ]);

  // Fixed: Đồng bộ handleSearch với BE parameters
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("q", searchTerm);
    if (selectedCategory) params.set("category", selectedCategory);
    if (showOnSale) params.set("sale", "true"); // Fixed: use 'sale' instead of 'discount'
    setSearchParams(params);
  };

  // Fixed: Đồng bộ handleCategorySelect
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    const params = new URLSearchParams(searchParams);
    if (selectedCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    if (searchTerm) params.set("q", searchTerm);
    if (showOnSale) params.set("sale", "true"); // Fixed
    setSearchParams(params);
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setSelectedCategory(null);
    setPriceRange([0, maxPrice]);
    setShowOnSale(false);
    setShowInStock(true);
    setSearchTerm("");
  };

  // Fixed: Update removeFilter function
  const removeFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    if (filter.startsWith("Category:")) {
      setSelectedCategory(null);
      params.delete("category");
    } else if (filter === "On Sale") {
      setShowOnSale(false);
      params.delete("sale"); // Fixed: use 'sale' instead of 'discount'
    } else if (filter === "In Stock Only") {
      setShowInStock(false);
    } else if (filter.startsWith("Price:")) {
      setPriceRange([0, maxPrice]);
    }
    setSearchParams(params);
  };

  // Khi mở Sheet, đồng bộ state tạm với state chính
  const handleOpenSheet = () => {
    setTempCategory(selectedCategory);
    setTempPriceRange(priceRange);
    setTempShowInStock(showInStock);
    setTempShowOnSale(showOnSale);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory);
    setPriceRange(tempPriceRange);
    setShowInStock(tempShowInStock);
    setShowOnSale(tempShowOnSale);

    // Cập nhật URL/searchParams nếu cần
    const params = new URLSearchParams();
    if (tempCategory) params.set("category", tempCategory);
    if (tempShowOnSale) params.set("sale", "true");
    if (tempShowInStock) params.set("inStock", "true");
    if (searchTerm) params.set("q", searchTerm);
    if (tempPriceRange[0] > 0)
      params.set("min_price", tempPriceRange[0].toString());
    if (tempPriceRange[1] < maxPrice)
      params.set("max_price", tempPriceRange[1].toString());
    setSearchParams(params);
    setIsSheetOpen(false);
  };

  const handleClearTempFilters = () => {
    setTempCategory(null);
    setTempPriceRange([0, maxPrice]);
    setTempShowInStock(true);
    setTempShowOnSale(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Search Products</h1>

      {/* New Search and Filter UI */}
      <div className="mb-8 relative">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <SearchIcon className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Filter Button - Sheet Trigger */}
          <Sheet
            open={isSheetOpen}
            onOpenChange={(open) => {
              if (open) handleOpenSheet();
              else handleCloseSheet();
            }}
          >
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex gap-2 whitespace-nowrap"
                onClick={handleOpenSheet}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-96 overflow-y-auto"
            >
              <SheetHeader className="mb-6">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Refine your product search</SheetDescription>
              </SheetHeader>
              <div className="space-y-6">
                {/* Categories in Sheet */}
                <div className="space-y-4">
                  <h3 className="font-medium text-base">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoriesRedux.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setTempCategory(category.name)}
                        className={`flex items-center justify-between p-2 rounded-md border ${
                          tempCategory === category.name
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card hover:bg-muted border-input"
                        }`}
                      >
                        <span className="text-sm">{category.name}</span>
                        {tempCategory === category.name && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range in Sheet */}
                <div className="space-y-4">
                  <h3 className="font-medium text-base">Price Range</h3>
                  <Slider
                    defaultValue={[0, maxPrice]}
                    min={0}
                    max={maxPrice}
                    step={10}
                    value={tempPriceRange}
                    onValueChange={(values) =>
                      setTempPriceRange([values[0], values[1]])
                    }
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span>₫{tempPriceRange[0].toLocaleString()}</span>
                    <span>₫{tempPriceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Availability in Sheet */}
                <div className="space-y-4">
                  <h3 className="font-medium text-base">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock-sheet"
                        checked={tempShowInStock}
                        onCheckedChange={(checked) =>
                          setTempShowInStock(!!checked)
                        }
                      />
                      <label
                        htmlFor="in-stock-sheet"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock Only
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="on-sale-sheet"
                        checked={tempShowOnSale}
                        onCheckedChange={(checked) =>
                          setTempShowOnSale(!!checked)
                        }
                      />
                      <label
                        htmlFor="on-sale-sheet"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </div>

                {/* Apply/Clear Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleClearTempFilters}
                  >
                    Clear All
                  </Button>
                  <Button className="flex-1" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 min-w-36">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select className="bg-transparent text-sm border-none focus:ring-0 w-full">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Best Rating</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">
              Active filters:
            </span>
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="outline"
                className="flex items-center gap-1 py-1"
              >
                {filter}
                <button onClick={() => removeFilter(filter)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-xs h-7 ml-2"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Products Display */}
      <div>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
            <Button variant="outline" onClick={handleClearFilters}>
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>
            </div>

            {/* Fixed: Safe product rendering với fallback cho price structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
