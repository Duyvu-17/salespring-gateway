import { Badge } from "lucide-react";

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>
      );
    case "shipped":
      return <Badge className="bg-blue-500 hover:bg-blue-600">Shipped</Badge>;
    case "processing":
      return (
        <Badge className="bg-amber-500 hover:bg-amber-600">Processing</Badge>
      );
    case "cancelled":
      return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default getStatusBadge;
