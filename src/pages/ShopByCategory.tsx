import { ChevronRight, Loader2 } from "lucide-react"; // Biểu tượng spinner
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  const categories = [
    { 
      id: "electronics", 
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?fit=crop&w=1500&q=80"
    },
    { 
      id: "accessories", 
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1537039557108-4a1dcef0cfd7?fit=crop&w=1500&q=80"
    },
    { 
      id: "wearables", 
      name: "Wearables",
      image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?fit=crop&w=1500&q=80"
    },
    { 
      id: "home-devices", 
      name: "Home Devices",
      image: "https://images.unsplash.com/photo-1574169208507-84376144848b?fit=crop&w=1500&q=80"
    },
    { 
      id: "audio", 
      name: "Audio",
      image: "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?fit=crop&w=1500&q=80"
    },
    { 
      id: "photography", 
      name: "Photography",
      image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?fit=crop&w=1500&q=80"
    },
  ];
  
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
                backgroundImage: `url(${category.image})`,
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
  );
};

export default ShopByCategory;
