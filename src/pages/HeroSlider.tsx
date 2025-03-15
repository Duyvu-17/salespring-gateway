import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ShoppingBag, ChevronLeft } from "lucide-react";

const HeroSlider = () => {
  // Mảng chứa các hình ảnh và nội dung tương ứng
  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
      badge: "New Collection Available",
      title: "Discover Premium Technology",
      description:
        "Discover premium products with exceptional quality and design that enhance your everyday life",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      badge: "Special Offer",
      title: "High-End Devices",
      description:
        "Explore our range of premium devices that combine cutting-edge technology with elegant design",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
      badge: "Limited Time Deals",
      title: "Smart Solutions",
      description:
        "Discover innovative smart solutions that make your daily life more convenient and efficient",
    },
  ];

  // State để theo dõi slide hiện tại
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển đổi slide sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // Hàm chuyển đến slide tiếp theo
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Hàm chuyển đến slide trước đó
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  // Hàm chuyển đến slide cụ thể
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section relative rounded-3xl overflow-hidden mx-4 mt-8 h-96 md:h-[500px]">
      {/* Các slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

          <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center text-white space-y-8">
            <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-full animate-fadeIn transition-all duration-300">
              {slide.badge}
            </Badge>
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight animate-fadeInUp"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
            >
              {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-foreground to-primary-foreground/80">
                {slide.title.split(" ").slice(-1)}
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl max-w-2xl mx-auto animate-fadeIn delay-100"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
            >
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn delay-200">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              >
                Shop Now <ShoppingBag className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/20 shadow-lg backdrop-blur-sm"
              >
                Explore Collections <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
