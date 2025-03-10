
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  features?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  discount?: number;
  new?: boolean;
  colors?: string[];
  sizes?: string[];
  relatedProducts?: number[];
}

export const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'wearables', name: 'Wearables' },
  { id: 'home-devices', name: 'Home Devices' },
  { id: 'audio', name: 'Audio' },
  { id: 'photography', name: 'Photography' },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Noise-Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Audio",
    description: "Experience immersive sound with our premium noise-cancelling headphones. Features include Bluetooth 5.0, 40-hour battery life, and premium comfort for extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "40-hour battery life",
      "High-definition sound",
      "Comfortable ear cushions",
      "Built-in microphone for calls"
    ],
    rating: 4.7,
    reviews: 328,
    inStock: true,
    colors: ["Black", "Silver", "Blue"],
    relatedProducts: [2, 4, 7]
  },
  {
    id: 2,
    name: "Wireless Bluetooth Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    category: "Audio",
    description: "Fill your room with crystal clear sound using our wireless speaker. Featuring 360° audio, waterproof design, and 24-hour battery life for non-stop entertainment.",
    features: [
      "360° surround sound",
      "IPX7 waterproof rating",
      "24-hour battery life",
      "Bluetooth 5.2 connectivity",
      "Voice assistant compatible"
    ],
    rating: 4.5,
    reviews: 195,
    inStock: true,
    discount: 15,
    colors: ["Black", "Gray", "Red"],
    relatedProducts: [1, 3, 5]
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Wearables",
    description: "Stay connected and track your fitness with our advanced smartwatch. Features include heart rate monitoring, GPS tracking, water resistance, and a stunning OLED display.",
    features: [
      "Heart rate & ECG monitoring",
      "Built-in GPS",
      "Water resistant to 50m",
      "7-day battery life",
      "Sleep tracking"
    ],
    rating: 4.8,
    reviews: 415,
    inStock: true,
    new: true,
    colors: ["Black", "Silver", "Rose Gold"],
    sizes: ["40mm", "44mm"],
    relatedProducts: [5, 8, 10]
  },
  {
    id: 4,
    name: "Wireless Earbuds Pro",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80",
    category: "Audio",
    description: "Experience true wireless freedom with our premium earbuds. Featuring active noise cancellation, touch controls, and a compact charging case for all-day listening.",
    features: [
      "Active noise cancellation",
      "Touch controls",
      "30-hour total battery life",
      "IPX4 water resistance",
      "Transparent hearing mode"
    ],
    rating: 4.6,
    reviews: 248,
    inStock: true,
    colors: ["White", "Black", "Blue"],
    relatedProducts: [1, 2, 7]
  },
  {
    id: 5,
    name: "Fitness Tracker Band",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1576243345690-4e4e11e6e4aa?w=500&q=80",
    category: "Wearables",
    description: "Track your fitness goals with our sleek and comfortable fitness band. Monitor your heart rate, sleep patterns, and activity levels with precision and style.",
    features: [
      "24/7 heart rate monitoring",
      "14-day battery life",
      "Water resistant to 50m",
      "Sleep tracking",
      "Multiple workout modes"
    ],
    rating: 4.4,
    reviews: 187,
    inStock: true,
    discount: 20,
    colors: ["Black", "Blue", "Red", "Green"],
    relatedProducts: [3, 8, 10]
  },
  {
    id: 6,
    name: "Portable SSD Drive",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&q=80",
    category: "Electronics",
    description: "Store and transfer your data at lightning speeds with our portable SSD. Featuring shock resistance, compact design, and universal compatibility.",
    features: [
      "1TB storage capacity",
      "Transfer speeds up to 1050MB/s",
      "Drop resistant up to 2 meters",
      "USB-C connectivity",
      "Compatible with PC, Mac, and mobile devices"
    ],
    rating: 4.7,
    reviews: 134,
    inStock: true,
    colors: ["Black", "Silver"],
    relatedProducts: [11, 12]
  },
  {
    id: 7,
    name: "Over-Ear Studio Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&q=80",
    category: "Audio",
    description: "Professional-grade studio headphones designed for audio engineers and music producers. Experience true sound reproduction with extended frequency response.",
    features: [
      "50mm dynamic drivers",
      "Closed-back design for isolation",
      "Detachable cable",
      "Foldable design",
      "Includes carrying case"
    ],
    rating: 4.9,
    reviews: 89,
    inStock: false,
    colors: ["Black"],
    relatedProducts: [1, 4]
  },
  {
    id: 8,
    name: "Smart Health Monitor",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1631206723399-c77d06796370?w=500&q=80",
    category: "Wearables",
    description: "Monitor your vital health statistics with our advanced health tracker. Tracks blood oxygen, stress levels, and provides detailed sleep analysis.",
    features: [
      "Blood oxygen monitoring",
      "Stress tracking",
      "Advanced sleep analysis",
      "Female health tracking",
      "7-day battery life"
    ],
    rating: 4.5,
    reviews: 76,
    inStock: true,
    new: true,
    colors: ["Black", "White"],
    relatedProducts: [3, 5]
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&q=80",
    category: "Accessories",
    description: "Charge your devices wirelessly with our sleek charging pad. Compatible with all Qi-enabled devices, featuring fast charging and a non-slip surface.",
    features: [
      "15W fast charging",
      "Multi-device compatibility",
      "LED charging indicator",
      "Anti-slip surface",
      "Over-temperature protection"
    ],
    rating: 4.3,
    reviews: 152,
    inStock: true,
    discount: 10,
    colors: ["Black", "White"],
    relatedProducts: [11, 12]
  },
  {
    id: 10,
    name: "Smart Running Shoes",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
    category: "Wearables",
    description: "Track your running performance with these smart connected shoes. Features include step tracking, gait analysis, and personalized coaching via the companion app.",
    features: [
      "Built-in motion sensors",
      "Impact analysis",
      "Form correction guidance",
      "30-day battery life",
      "Water-resistant design"
    ],
    rating: 4.4,
    reviews: 63,
    inStock: true,
    colors: ["Black/Red", "Gray/Blue", "White/Green"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    relatedProducts: [3, 5, 8]
  },
  {
    id: 11,
    name: "Smart Home Hub",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
    category: "Home Devices",
    description: "Control your entire smart home ecosystem with one centralized hub. Compatible with major smart home platforms and features voice control capabilities.",
    features: [
      "Voice assistant integration",
      "Controls lights, thermostats, and more",
      "Multi-platform compatibility",
      "Intuitive mobile app",
      "Automation routines"
    ],
    rating: 4.6,
    reviews: 87,
    inStock: true,
    colors: ["White", "Black"],
    relatedProducts: [12, 13]
  },
  {
    id: 12,
    name: "4K Action Camera",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?w=500&q=80",
    category: "Photography",
    description: "Capture your adventures in stunning 4K resolution with our waterproof action camera. Features include image stabilization, slow-motion recording, and Wi-Fi connectivity.",
    features: [
      "4K/60fps video recording",
      "20MP photos",
      "Waterproof to 33ft without case",
      "Advanced image stabilization",
      "Wi-Fi and Bluetooth connectivity"
    ],
    rating: 4.7,
    reviews: 112,
    inStock: true,
    new: true,
    colors: ["Black"],
    relatedProducts: [6, 13]
  },
  {
    id: 13,
    name: "Smart Indoor Camera",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1589954157688-5f17c8a396bc?w=500&q=80",
    category: "Home Devices",
    description: "Keep an eye on your home with our HD indoor security camera. Features include motion detection, two-way audio, and night vision for 24/7 monitoring.",
    features: [
      "1080p HD video",
      "Motion and sound detection",
      "Two-way audio",
      "Night vision",
      "Cloud and local storage options"
    ],
    rating: 4.5,
    reviews: 94,
    inStock: true,
    colors: ["White", "Black"],
    relatedProducts: [11, 12]
  },
  {
    id: 14,
    name: "Ultra-Thin Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&q=80",
    category: "Electronics",
    description: "Experience premium performance in an ultra-thin design. Featuring a stunning display, all-day battery life, and powerful processing for your professional needs.",
    features: [
      "13.3\" 4K display",
      "16GB RAM, 512GB SSD",
      "Intel Core i7 processor",
      "12-hour battery life",
      "Fingerprint security"
    ],
    rating: 4.8,
    reviews: 67,
    inStock: true,
    colors: ["Silver", "Space Gray"],
    relatedProducts: [6, 15]
  },
  {
    id: 15,
    name: "Professional Drawing Tablet",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&q=80",
    category: "Electronics",
    description: "Create digital art with precision using our professional drawing tablet. Features pressure sensitivity, customizable express keys, and a large active area.",
    features: [
      "8192 levels of pressure sensitivity",
      "Large 15.6\" active area",
      "Battery-free stylus",
      "8 customizable express keys",
      "Compatible with major design software"
    ],
    rating: 4.7,
    reviews: 53,
    inStock: true,
    colors: ["Black"],
    relatedProducts: [14]
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.id <= 6);
};

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: number): Product[] => {
  const product = getProductById(id);
  if (!product || !product.relatedProducts) return [];
  
  return product.relatedProducts.map(id => getProductById(id)).filter(Boolean) as Product[];
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};
