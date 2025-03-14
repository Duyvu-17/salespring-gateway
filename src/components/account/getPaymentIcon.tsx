import { CreditCard } from "lucide-react";

const getPaymentIcon = (type: string) => {
  switch (type) {
    case "visa":
      return (
        <div className="rounded-md bg-blue-600 text-white p-2 flex items-center justify-center w-8 h-8">
          <span className="text-xs font-bold">VISA</span>
        </div>
      );
    case "mastercard":
      return (
        <div className="rounded-md bg-red-600 text-white p-2 flex items-center justify-center w-8 h-8">
          <span className="text-xs font-bold">MC</span>
        </div>
      );
    case "paypal":
      return (
        <div className="rounded-md bg-blue-800 text-white p-2 flex items-center justify-center w-8 h-8">
          <span className="text-xs font-bold">PP</span>
        </div>
      );
    default:
      return <CreditCard className="h-5 w-5" />;
  }
};

export default getPaymentIcon;
