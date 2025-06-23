import { useEffect, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  Flame,
  Percent,
  Clock,
  Grid,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { productService } from "@/services/product.service";
import { LazyProductGrid } from "@/components/products/LazyProductGrid";
import { Product } from "@/types/product";

// Section hiển thị sản phẩm hot
const HotProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHot = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getHot();
        setProducts(Array.isArray(res) ? res : []);
      } catch (err) {
        setError("Không thể tải sản phẩm hot.");
      } finally {
        setLoading(false);
      }
    };
    fetchHot();
  }, []);

  if (loading)
    return (
      <SectionLoading
        title="Sản phẩm hot"
        icon={<Flame className="h-8 w-8 text-orange-500" />}
      />
    );
  if (error)
    return (
      <SectionError
        title="Sản phẩm hot"
        icon={<Flame className="h-8 w-8 text-orange-500" />}
        error={error}
      />
    );
  if (products.length === 0)
    return (
      <SectionEmpty
        title="Sản phẩm hot"
        icon={<Flame className="h-8 w-8 text-orange-500" />}
      />
    );

  return (
    <SectionWrapper
      title="Sản phẩm hot"
      icon={<Flame className="h-8 w-8 text-orange-500" />}
      link="/search?hot=true"
      linkText="Xem tất cả"
    >
      <LazyProductGrid
        products={products.slice(0, 12)}
        initialCount={6}
        loadMoreCount={6}
      />
    </SectionWrapper>
  );
};

// Section hiển thị sản phẩm giảm giá
const SaleProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSale = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getSale();
        setProducts(Array.isArray(res) ? res : []);
      } catch (err) {
        setError("Không thể tải sản phẩm giảm giá.");
      } finally {
        setLoading(false);
      }
    };
    fetchSale();
  }, []);

  if (loading)
    return (
      <SectionLoading
        title="Sản phẩm giảm giá"
        icon={<Percent className="h-8 w-8 text-red-500" />}
      />
    );
  if (error)
    return (
      <SectionError
        title="Sản phẩm giảm giá"
        icon={<Percent className="h-8 w-8 text-red-500" />}
        error={error}
      />
    );
  if (products.length === 0)
    return (
      <SectionEmpty
        title="Sản phẩm giảm giá"
        icon={<Percent className="h-8 w-8 text-red-500" />}
      />
    );

  return (
    <SectionWrapper
      title="Sản phẩm giảm giá"
      icon={<Percent className="h-8 w-8 text-red-500" />}
      link="/search?sale=true"
      linkText="Xem tất cả"
    >
      <LazyProductGrid
        products={products.slice(0, 12)}
        initialCount={6}
        loadMoreCount={6}
      />
    </SectionWrapper>
  );
};

// Section hiển thị sản phẩm mới
const NewProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNew = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getNew();
        setProducts(Array.isArray(res) ? res : []);
      } catch (err) {
        setError("Không thể tải sản phẩm mới.");
      } finally {
        setLoading(false);
      }
    };
    fetchNew();
  }, []);

  if (loading)
    return (
      <SectionLoading
        title="Sản phẩm mới"
        icon={<Clock className="h-8 w-8 text-blue-500" />}
      />
    );
  if (error)
    return (
      <SectionError
        title="Sản phẩm mới"
        icon={<Clock className="h-8 w-8 text-blue-500" />}
        error={error}
      />
    );
  if (products.length === 0)
    return (
      <SectionEmpty
        title="Sản phẩm mới"
        icon={<Clock className="h-8 w-8 text-blue-500" />}
      />
    );

  return (
    <SectionWrapper
      title="Sản phẩm mới"
      icon={<Clock className="h-8 w-8 text-blue-500" />}
      link="/search?new=true"
      linkText="Xem tất cả"
    >
      <LazyProductGrid
        products={products.slice(0, 12)}
        initialCount={6}
        loadMoreCount={6}
      />
    </SectionWrapper>
  );
};

// Section hiển thị tất cả sản phẩm
const AllProductsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await productService.getAll();
        setProducts(Array.isArray(res.products) ? res.products : []);
      } catch (err) {
        setError("Không thể tải tất cả sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading)
    return (
      <SectionLoading
        title="Tất cả sản phẩm"
        icon={<Grid className="h-8 w-8 text-primary" />}
      />
    );
  if (error)
    return (
      <SectionError
        title="Tất cả sản phẩm"
        icon={<Grid className="h-8 w-8 text-primary" />}
        error={error}
      />
    );
  if (products.length === 0)
    return (
      <SectionEmpty
        title="Tất cả sản phẩm"
        icon={<Grid className="h-8 w-8 text-primary" />}
      />
    );

  return (
    <SectionWrapper
      title="Tất cả sản phẩm"
      icon={<Grid className="h-8 w-8 text-primary" />}
      link="/search"
      linkText="Xem tất cả"
    >
      <LazyProductGrid
        products={products.slice(0, 12)}
        initialCount={6}
        loadMoreCount={6}
      />
    </SectionWrapper>
  );
};

// Các component phụ trợ cho UI
interface SectionWrapperProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  linkText?: string;
  children: React.ReactNode;
}
const SectionWrapper = ({
  title,
  icon,
  link,
  linkText,
  children,
}: SectionWrapperProps) => (
  <section className="container mx-auto px-4 py-12">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          {icon}
          {title}
        </h2>
      </div>
      {link && (
        <Link
          to={link}
          className="text-primary hover:underline flex items-center group font-medium"
        >
          {linkText}{" "}
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
    {children}
  </section>
);

interface SectionLoadingProps {
  title: string;
  icon: React.ReactNode;
}
const SectionLoading = ({ title, icon }: SectionLoadingProps) => (
  <section className="container mx-auto px-4 py-12">
    <div className="flex items-center gap-3 mb-10">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Đang tải {title.toLowerCase()}...</p>
    </div>
  </section>
);

interface SectionErrorProps {
  title: string;
  icon: React.ReactNode;
  error: string;
}
const SectionError = ({ title, icon, error }: SectionErrorProps) => (
  <section className="container mx-auto px-4 py-12">
    <div className="flex items-center gap-3 mb-10">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
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

interface SectionEmptyProps {
  title: string;
  icon: React.ReactNode;
}
const SectionEmpty = ({ title, icon }: SectionEmptyProps) => (
  <section className="container mx-auto px-4 py-12">
    <div className="flex items-center gap-3 mb-10">
      {icon}
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
    <div className="text-center py-16">
      {icon}
      <p className="text-lg text-muted-foreground mb-4">
        Hiện tại chưa có {title.toLowerCase()}
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

// Trang tổng hợp các section
const TrendingProducts = () => {
  return (
    <div>
      <HotProductsSection />
      <SaleProductsSection />
      <NewProductsSection />
      <AllProductsSection />
    </div>
  );
};

export default TrendingProducts;
