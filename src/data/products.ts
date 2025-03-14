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
  models?: ProductModel[];
  relatedProducts?: number[];
  userReviews?: UserReview[];
  colors?: ProductColor[]; // Add this property to fix the error
}

export interface ProductModel {
  id: number;
  name: string;
  price?: number; // If price differs from base product
  colors: ProductColor[];
  inStock?: boolean; // Override base product stock status
}

export interface ProductColor {
  name: string;
  code: string;
  image?: string; // Optional image showing product in this color
}

export interface UserReview {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  replies?: Reply[];
}

export interface Reply {
  id: number;
  userId: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  date: string;
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
    models: [
      {
        id: 1,
        name: "Standard Edition",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Silver", code: "#C0C0C0" },
          { name: "Blue", code: "#0000FF" }
        ]
      },
      {
        id: 2,
        name: "Pro Edition",
        price: 349.99,
        colors: [
          { name: "Matte Black", code: "#1E1E1E" },
          { name: "Space Gray", code: "#8A8A8A" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Compact",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Gray", code: "#808080" },
          { name: "Red", code: "#FF0000" }
        ]
      },
      {
        id: 2,
        name: "XL Edition",
        price: 249.99,
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Navy Blue", code: "#000080" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Silver", code: "#C0C0C0" },
          { name: "Rose Gold", code: "#B76E79" }
        ]
      },
      {
        id: 2,
        name: "Premium",
        price: 449.99,
        colors: [
          { name: "Graphite", code: "#383838" },
          { name: "Gold", code: "#FFD700" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "White", code: "#FFFFFF" },
          { name: "Black", code: "#000000" },
          { name: "Blue", code: "#0000FF" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Blue", code: "#0000FF" },
          { name: "Red", code: "#FF0000" },
          { name: "Green", code: "#008000" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "Silver", code: "#C0C0C0" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "White", code: "#FFFFFF" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" },
          { name: "White", code: "#FFFFFF" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black/Red", code: "#000000" },
          { name: "Gray/Blue", code: "#808080" },
          { name: "White/Green", code: "#FFFFFF" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "White", code: "#FFFFFF" },
          { name: "Black", code: "#000000" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "White", code: "#FFFFFF" },
          { name: "Black", code: "#000000" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Silver", code: "#C0C0C0" },
          { name: "Space Gray", code: "#8A8A8A" }
        ]
      }
    ],
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
    models: [
      {
        id: 1,
        name: "Standard",
        colors: [
          { name: "Black", code: "#000000" }
        ]
      }
    ],
    relatedProducts: [14]
  }
];

// Add models to products that don't have them yet
products.forEach(product => {
  if (!product.models && product.colors) {
    product.models = [
      {
        id: 1,
        name: "Standard",
        colors: product.colors.map((color, index) => ({
          name: color,
          code: getColorCode(color),
        }))
      }
    ];
  }
});

// Helper function to get color codes
function getColorCode(colorName: string): string {
  const colorMap: Record<string, string> = {
    "Black": "#000000",
    "White": "#FFFFFF",
    "Red": "#FF0000",
    "Blue": "#0000FF",
    "Green": "#008000",
    "Yellow": "#FFFF00",
    "Purple": "#800080",
    "Orange": "#FFA500",
    "Pink": "#FFC0CB",
    "Gray": "#808080",
    "Silver": "#C0C0C0",
    "Gold": "#FFD700",
    "Brown": "#A52A2A",
    "Navy": "#000080",
    "Teal": "#008080",
    "Maroon": "#800000",
    "Olive": "#808000",
    "Lime": "#00FF00",
    "Aqua": "#00FFFF",
    "Fuchsia": "#FF00FF",
    "Rose Gold": "#B76E79",
    "Space Gray": "#8A8A8A"
  };
  
  // Match partial color names
  for (const key in colorMap) {
    if (colorName.toLowerCase().includes(key.toLowerCase())) {
      return colorMap[key];
    }
  }
  
  // Default color if no match is found
  return "#CCCCCC";
}

// Add some sample reviews to products
products.forEach(product => {
  if (!product.userReviews) {
    product.userReviews = [
      {
        id: 1,
        userId: "user1",
        userName: "John Doe",
        userAvatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
        rating: 4.5,
        comment: "This product exceeded my expectations. The quality is excellent and it works perfectly for my needs.",
        date: "2023-05-15",
        images: [
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80"
        ],
        replies: [
          {
            id: 1,
            userId: "admin1",
            userName: "Store Admin",
            userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80",
            comment: "Thank you for your positive feedback! We're glad you're enjoying the product.",
            date: "2023-05-16"
          }
        ]
      },
      {
        id: 2,
        userId: "user2",
        userName: "Jane Smith",
        userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
        rating: 3.5,
        comment: "Good product but shipping took longer than expected. Still satisfied with the purchase overall.",
        date: "2023-06-20",
        images: []
      }
    ];
  }
});

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
