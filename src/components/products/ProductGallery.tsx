
import { useState, useRef, useEffect } from 'react';
import { ProductImage } from '@/data/product-images';
import { cn } from '@/lib/utils';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductGalleryProps {
  mainImage: string;
  productName: string;
  additionalImages: ProductImage[];
  discount?: number;
  isNew?: boolean;
}

export const ProductGallery = ({ 
  mainImage, 
  productName, 
  additionalImages, 
  discount, 
  isNew 
}: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Update selected image when mainImage prop changes
  useEffect(() => {
    setSelectedImage(mainImage);
    setActiveIndex(0);
  }, [mainImage]);
  
  const allImages = [
    { id: 0, url: mainImage, alt: productName },
    ...additionalImages
  ];
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleImageSelect = (url: string, index: number) => {
    setSelectedImage(url);
    setActiveIndex(index);
  };
  
  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };
  
  const nextImage = () => {
    const newIndex = (activeIndex + 1) % allImages.length;
    setSelectedImage(allImages[newIndex].url);
    setActiveIndex(newIndex);
  };
  
  const prevImage = () => {
    const newIndex = (activeIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[newIndex].url);
    setActiveIndex(newIndex);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || 
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);
  
  return (
    <div className="space-y-4">
      <div 
        className="overflow-hidden rounded-xl bg-muted/30 relative h-[400px] md:h-[500px] flex items-center justify-center p-4"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        ref={imageContainerRef}
      >
        <div 
          className={cn(
            "w-full h-full relative transition-all duration-200",
            isZoomed && "cursor-zoom-in"
          )}
        >
          <img 
            src={selectedImage} 
            alt={productName}
            className={cn(
              "w-full h-full object-contain transition-transform duration-200",
              isZoomed ? "scale-150" : "scale-100"
            )}
            style={
              isZoomed 
                ? { 
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                    objectPosition: "center"
                  } 
                : {}
            }
          />
        </div>
        
        {discount && (
          <Badge variant="destructive" className="absolute top-4 left-4 text-md font-semibold z-10 px-3 py-1.5">
            {discount}% OFF
          </Badge>
        )}
        
        {isNew && (
          <Badge variant="default" className="absolute top-4 right-4 bg-green-600 text-white text-md font-semibold z-10 px-3 py-1.5">
            NEW
          </Badge>
        )}
        
        {/* Zoom control button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleZoomToggle();
          }}
          className="absolute bottom-4 right-4 bg-background/80 p-2 rounded-full z-10 hover:bg-background transition-colors"
        >
          {isZoomed ? 
            <ZoomOut className="h-5 w-5" /> : 
            <ZoomIn className="h-5 w-5" />
          }
        </button>
        
        {/* Navigation arrows - Only show on desktop and if there are multiple images */}
        {allImages.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 p-2 rounded-full z-10 hover:bg-background transition-colors hidden md:flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 p-2 rounded-full z-10 hover:bg-background transition-colors hidden md:flex items-center justify-center"
              aria-label="Next image"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {allImages.map((image, index) => (
            <button
              key={image.id}
              className={cn(
                "border rounded-md overflow-hidden h-20 transition-all duration-200",
                index === activeIndex 
                  ? "border-primary ring-2 ring-primary/30" 
                  : "border-muted hover:border-primary/50 opacity-70 hover:opacity-100"
              )}
              onClick={() => handleImageSelect(image.url, index)}
              aria-label={`View image ${index + 1} - ${image.alt || productName}`}
            >
              <img 
                src={image.url} 
                alt={image.alt || `Product image ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
