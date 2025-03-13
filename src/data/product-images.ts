
/**
 * Additional product images for the product gallery
 */
export interface ProductImage {
  id: number;
  productId: number;
  url: string;
  alt: string;
}

export const productImages: ProductImage[] = [
  {
    id: 1,
    productId: 1,
    url: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&q=80",
    alt: "Premium Headphones from the side"
  },
  {
    id: 2,
    productId: 1,
    url: "https://images.unsplash.com/photo-1563627806368-cc0b139f2f46?w=500&q=80",
    alt: "Premium Headphones from the front"
  },
  {
    id: 3,
    productId: 2,
    url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    alt: "Smart Watch with blue band"
  },
  {
    id: 4,
    productId: 2,
    url: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=500&q=80",
    alt: "Smart Watch with features display"
  },
  {
    id: 5,
    productId: 3,
    url: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80",
    alt: "Smartphone from another angle"
  },
  {
    id: 6,
    productId: 3,
    url: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80",
    alt: "Smartphone with apps"
  },
  {
    id: 7,
    productId: 4,
    url: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=500&q=80",
    alt: "Laptop from above with keyboard visible"
  },
  {
    id: 8,
    productId: 4,
    url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
    alt: "Laptop from the side with screen visible"
  },
  {
    id: 9,
    productId: 5,
    url: "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=500&q=80",
    alt: "Drone from above"
  },
  {
    id: 10,
    productId: 5,
    url: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=500&q=80",
    alt: "Drone flying in the sky"
  },
  {
    id: 11,
    productId: 6,
    url: "https://images.unsplash.com/photo-1600080545977-071e2234aa3f?w=500&q=80",
    alt: "Fitness Tracker on wrist"
  },
  {
    id: 12,
    productId: 6,
    url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    alt: "Fitness Tracker feature display"
  }
];

/**
 * Get second image for a product to show on hover
 */
export const getSecondImage = (productId: number): string | null => {
  const images = productImages.filter(img => img.productId === productId);
  return images.length > 0 ? images[0].url : null;
};

/**
 * Get all images for a product
 */
export const getProductImages = (productId: number): ProductImage[] => {
  return productImages.filter(img => img.productId === productId);
};
