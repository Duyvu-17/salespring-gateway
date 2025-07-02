import React, { useState, useMemo } from "react";
import { ChevronRight, Loader2, Grid, List, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const ShopByCategory = () => {
  const categories = useSelector((state: RootState) => state.category.categories);
  const isLoading = useSelector((state: RootState) => state.category.isLoading);
  
  // State để điều khiển view mode và số lượng hiển thị
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [showAll, setShowAll] = useState(false);
  const [itemsPerPage] = useState(12); // Có thể điều chỉnh theo breakpoint

  // Responsive items count
  const defaultDisplayCount = useMemo(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return 4; // mobile
      if (width < 1024) return 6; // tablet
      return 8; // desktop
    }
    return 6;
  }, []);

  const displayedCategories = useMemo(() => {
    if (showAll) {
      return categories.slice(0, itemsPerPage);
    }
    return categories.slice(0, defaultDisplayCount);
  }, [categories, showAll, defaultDisplayCount, itemsPerPage]);

  const hasMoreCategories = categories.length > defaultDisplayCount;

  // Grid layout class based on view mode
  const gridClass = viewMode === 'grid' 
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4";

  // Category card component for better maintainability
  const CategoryCard = ({ category, isCompact = false }: { category, isCompact?: boolean }) => {
    if (isCompact) {
      return (
        <Link
          to={`/search?category=${category.name}`}
          className="block group"
        >
          <div className="relative h-24 sm:h-32 rounded-lg overflow-hidden hover:scale-105 transition-transform shadow-md">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${category.image_url})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
              <h3 
                className="text-xs sm:text-sm font-semibold text-white truncate"
                title={category.name}
              >
                {category.name}
              </h3>
            </div>
          </div>
        </Link>
      );
    }

    return (
      <Link
        to={`/search?category=${category.name}`}
        className="block group"
      >
        <div
          className="relative h-48 md:h-56 lg:h-64 rounded-xl overflow-hidden hover:scale-105 shadow-lg transition-all duration-300"
          style={{
            backgroundImage: `url(${category.image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:opacity-75 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 p-4 sm:p-6">
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2"
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
    );
  };

  if (isLoading) {
    return (
      <section className="container mx-auto px-4">
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin w-10 h-10 text-muted-foreground" />
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-muted-foreground">No categories available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-10 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">
            Browse our collection by category ({categories.length} categories)
          </p>
        </div>
        
        {/* View mode controls */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-background shadow-sm' 
                : 'hover:bg-background/50'
            }`}
            title="Grid view"
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('compact')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'compact' 
                ? 'bg-background shadow-sm' 
                : 'hover:bg-background/50'
            }`}
            title="Compact view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className={gridClass}>
        {displayedCategories.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            isCompact={viewMode === 'compact'} 
          />
        ))}
      </div>

      {/* Show more/less button */}
      {hasMoreCategories && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                View All Categories ({categories.length - defaultDisplayCount} more) 
                <ChevronDown className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Pagination for very large lists */}
      {showAll && categories.length > itemsPerPage && (
        <div className="text-center mt-4">
          <Link
            to="/categories"
            className="text-primary hover:text-primary/80 underline"
          >
            View all {categories.length} categories →
          </Link>
        </div>
      )}
    </section>
  );
};

export default ShopByCategory;