
import { OrderDetails } from "@/components/account/OrderDetails";
import { MainLayout } from "@/components/layout/MainLayout";

const OrderDetailsPage = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <OrderDetails />
      </div>
    </MainLayout>
  );
};

export default OrderDetailsPage;
