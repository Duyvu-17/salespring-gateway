
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "Experience immersive sound with our premium noise-cancelling headphones. Features include Bluetooth 5.0, 40-hour battery life, and premium comfort for extended listening sessions.",
    rating: 4.5,
    reviews: 128,
    inStock: true
  },
  {
    id: 2,
    name: "Wireless Speaker",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500&q=80",
    description: "Fill your room with crystal clear sound using our wireless speaker. Featuring 360° audio, waterproof design, and 24-hour battery life for non-stop entertainment.",
    rating: 4.2,
    reviews: 95,
    inStock: true
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    description: "Stay connected and track your fitness with our advanced smartwatch. Features include heart rate monitoring, GPS tracking, water resistance, and a stunning OLED display.",
    rating: 4.7,
    reviews: 215,
    inStock: false
  }
];

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the product
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-lg mb-8">We couldn't find the product you're looking for.</p>
        <Button asChild size="lg">
          <button onClick={() => navigate('/')}>Return to Home</button>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} (x${quantity}) has been added to your cart`,
    });
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Button 
        variant="ghost" 
        className="mb-8 hover:bg-transparent"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="overflow-hidden rounded-xl bg-muted/30 flex items-center justify-center p-8">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-[400px] object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                        ? "text-yellow-400 fill-yellow-400 opacity-50"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-muted-foreground" />
              <span>2-year warranty included</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={!product.inStock}
                >
                  -
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={!product.inStock}
                >
                  +
                </Button>
              </div>
              
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
