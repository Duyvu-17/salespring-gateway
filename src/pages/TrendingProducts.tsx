import { useEffect, useState } from "react";
import { ArrowRight, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { productService } from "@/services/product.service";
import { LazyProductGrid } from "@/components/products/LazyProductGrid";
import { Product } from "@/types/product";

type ProductListResponse = {
  products: Product[];
  total?: number;
  page?: number;
  limit?: number;
};

const TrendingProducts: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      setError(null);

      try {
        // Ưu tiên getHot, fallback getAll nếu BE chưa có getHot
        let res: Product[] | ProductListResponse | undefined;

        try {
          // Thử gọi getHot trước
          res = await productService.getHot?.();
        } catch (hotError) {
          console.log("getHot không khả dụng, sử dụng getAll");
          // Fallback to getAll
          res = await productService.getAll();
        }

        let products: Product[] = [];
        if (Array.isArray(res)) {
          products = res;
        } else if (
          res &&
          typeof res === "object" &&
          Array.isArray((res as any).data)
        ) {
          products = (res as any).data;
        } else {
          products = [];
        }

        // Giới hạn số lượng sản phẩm trending (ví dụ: 12 sản phẩm)
        const limitedProducts = products.slice(0, 12);

        setTrendingProducts(limitedProducts);
        setError(null);
      } catch (error) {
        console.error("Error fetching trending products:", error);
        setTrendingProducts([]);
        setError("Không thể tải sản phẩm trending. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              Trending Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover our most popular items
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Đang tải sản phẩm trending...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              Trending Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover our most popular items
            </p>
          </div>
        </div>

        <div className="text-center py-16">
          <div className="text-red-500 mb-4">
            <p className="text-lg font-medium">{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  // Empty state
  if (trendingProducts.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              Trending Products
            </h2>
            <p className="text-muted-foreground mt-2">
              Discover our most popular items
            </p>
          </div>
        </div>

        <div className="text-center py-16">
          <TrendingUp className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground mb-4">
            Hiện tại chưa có sản phẩm trending
          </p>
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Khám phá tất cả sản phẩm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  // Success state
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-primary" />
            Trending Products
          </h2>
          <p className="text-muted-foreground mt-2">
            Discover our most popular items ({trendingProducts.length} sản phẩm)
          </p>
        </div>
        <Link
          to="/search"
          className="text-primary hover:underline flex items-center group font-medium"
        >
          VIEW ALL{" "}
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <LazyProductGrid
        products={trendingProducts}
        initialCount={6}
        loadMoreCount={6}
      />
    </section>
  );
};

export default TrendingProducts;
