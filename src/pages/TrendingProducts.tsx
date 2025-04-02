
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { LazyProductGrid } from "@/components/products/LazyProductGrid";

const TrendingProducts: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Trending Products</h2>
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

      <LazyProductGrid products={featuredProducts} initialCount={3} loadMoreCount={3} />
    </section>
  );
};

export default TrendingProducts;
