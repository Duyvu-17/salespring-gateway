
import { useState } from 'react';
import { ProductImage } from '@/data/product-images';
import { cn } from '@/lib/utils';

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
  
  return (
    <div className="space-y-4">
      <div 
        className="overflow-hidden rounded-xl bg-muted/30 relative h-[400px] flex items-center justify-center p-4"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
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
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            {discount}% OFF
          </div>
        )}
        
        {isNew && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
            NEW
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        {allImages.map((image, index) => (
          <button
            key={image.id}
            className={cn(
              "border rounded-md overflow-hidden h-20",
              selectedImage === image.url ? "border-primary ring-2 ring-primary/30" : "border-muted hover:border-primary/50"
            )}
            onClick={() => setSelectedImage(image.url)}
          >
            <img 
              src={image.url} 
              alt={image.alt || `Product image ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
