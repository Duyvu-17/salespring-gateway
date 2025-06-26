import React from "react";
import { Card } from "@/components/ui/card";
import { Info, Zap, Truck, RefreshCw, ShieldCheck, Award } from "lucide-react";

const ProductFeatures = ({ product, brandName, categoryName }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
    {/* Description Card */}
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Product Description</h3>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {product.description}
      </p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Brand</span>
          <span className="font-medium">{brandName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Category</span>
          <span className="font-medium">{categoryName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Warranty</span>
          <span className="font-medium">2 Years</span>
        </div>
      </div>
    </Card>
    {/* Features Card */}
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Zap className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Key Features</h3>
      </div>
      <ul className="space-y-2">
        {product.key_features?.slice(0, 4).map((feature) => (
          <li key={feature.id} className="flex items-start text-sm">
            <span className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0">
              ✔
            </span>
            <span>{feature.feature_text}</span>
          </li>
        ))}
      </ul>
      {product.key_features && product.key_features.length > 4 && (
        <p className="text-xs text-muted-foreground mt-3">
          +{product.key_features.length - 4} tính năng khác
        </p>
      )}
    </Card>
    {/* Shipping & Service Card */}
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <Truck className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold">Shipping & Service</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center text-sm">
          <Truck className="h-4 w-4 text-primary mr-2" />
          <span>Free shipping on orders over $50</span>
        </div>
        <div className="flex items-center text-sm">
          <RefreshCw className="h-4 w-4 text-primary mr-2" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center text-sm">
          <ShieldCheck className="h-4 w-4 text-primary mr-2" />
          <span>2-year warranty included</span>
        </div>
        <div className="flex items-center text-sm">
          <Award className="h-4 w-4 text-primary mr-2" />
          <span>Quality guarantee</span>
        </div>
      </div>
    </Card>
  </div>
);

export default ProductFeatures;
