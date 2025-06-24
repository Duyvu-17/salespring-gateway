import React from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const RecentlyViewedProducts = ({ recentlyViewed, navigate }: any) =>
  recentlyViewed.length > 0 && (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Clock className="h-6 w-6 mr-3" />
        Recently Viewed
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentlyViewed.map((item: any) => (
          <Card
            key={item.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="aspect-square overflow-hidden bg-muted/20">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm truncate mb-2">{item.name}</h3>
              <p className="text-lg font-bold text-primary">${item.price}</p>
              <p className="text-xs text-muted-foreground">{item.category}</p>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );

export default RecentlyViewedProducts;