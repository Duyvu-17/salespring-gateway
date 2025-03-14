import { AlertTriangle, CheckCircle, Clock, Truck } from "lucide-react";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="text-green-500 h-5 w-5" />;
      case 'shipped':
        return <Truck className="text-blue-500 h-5 w-5" />;
      case 'processing':
        return <Clock className="text-amber-500 h-5 w-5" />;
      case 'cancelled':
        return <AlertTriangle className="text-red-500 h-5 w-5" />;
      default:
        return null;
    }
  };
export default getStatusIcon