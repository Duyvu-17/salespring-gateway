import React from "react";
import { Card } from "@/components/ui/card";
import { Package, Info, ShieldCheck, Zap } from "lucide-react";

const ProductBoxContent = ({ product }: any) => (
  <Card className="p-8 mb-16">
    <div className="text-center mb-8">
      <Package className="h-8 w-8 text-primary mx-auto mb-3" />
      <h2 className="text-2xl font-bold">What's in the Box</h2>
      <p className="text-muted-foreground mt-2">
        Everything you need to get started
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {[
        { item: product.name, icon: Package },
        { item: "User Manual", icon: Info },
        { item: "Warranty Card", icon: ShieldCheck },
        { item: "Charging Cable", icon: Zap },
        { item: "Power Adapter", icon: Zap },
      ].map((boxItem, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-4 bg-muted/30 rounded-lg"
        >
          <boxItem.icon className="h-6 w-6 text-primary mb-2" />
          <span className="text-sm font-medium">{boxItem.item}</span>
        </div>
      ))}
    </div>
  </Card>
);

export default ProductBoxContent;
