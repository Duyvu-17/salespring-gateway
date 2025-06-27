import React, { useEffect } from "react";
import { ChevronRight, Loader2 } from "lucide-react"; // Biểu tượng spinner
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "@/store/slices/categorySlice";
import type { RootState, AppDispatch } from "@/store";

const ShopByCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading } = useSelector((state: RootState) => ({
    categories: state.category.categories,
    isLoading: state.category.isLoading,
  }));

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">
            Browse our collection by category
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin w-10 h-10 text-muted-foreground" />
        </div>
      ) : (
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
                  backgroundImage: `url(${category.image_url})`,
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
      )}
    </section>
  );
};

export default ShopByCategory;
