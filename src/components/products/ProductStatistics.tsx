import React from "react";
import { Package, ThumbsUp, Eye } from "lucide-react";

const ProductStatistics = ({ totalPurchases, totalLikes, totalViews }: any) => (
  <div className="grid grid-cols-3 gap-4 border-t border-b py-3">
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center text-primary">
        <Package className="h-4 w-4 mr-1" />
        <span className="font-semibold">{totalPurchases}</span>
      </div>
      <span className="text-xs text-muted-foreground">Purchases</span>
    </div>
    <div className="flex flex-col items-center justify-center text-center border-x">
      <div className="flex items-center text-primary">
        <ThumbsUp className="h-4 w-4 mr-1" />
        <span className="font-semibold">{totalLikes}</span>
      </div>
      <span className="text-xs text-muted-foreground">Likes</span>
    </div>
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center text-primary">
        <Eye className="h-4 w-4 mr-1" />
        <span className="font-semibold">{totalViews}</span>
      </div>
      <span className="text-xs text-muted-foreground">Views</span>
    </div>
  </div>
);

export default ProductStatistics;
