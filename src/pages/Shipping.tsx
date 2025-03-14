import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Truck, Package, Clock, Globe, CreditCard, AlertCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Vận Chuyển & Giao Hàng</h1>
        
        {/* Hero section */}
        <div className="bg-primary/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Vận Chuyển Nhanh Chóng & Đáng Tin Cậy Trên Toàn Quốc</h2>
          <p className="text-muted-foreground mb-6">
            Chúng tôi hợp tác với các đơn vị vận chuyển hàng đầu để đảm bảo hàng hóa của bạn đến nơi an toàn và đúng hẹn.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Giao Hàng Nhanh</h3>
              <p className="text-sm text-muted-foreground">1-3 ngày làm việc</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Đóng Gói An Toàn</h3>
              <p className="text-sm text-muted-foreground">Bảo vệ tối đa sản phẩm</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Phủ Sóng Toàn Quốc</h3>
              <p className="text-sm text-muted-foreground">Giao hàng đến 63 tỉnh thành</p>
            </div>
          </div>
        </div>
        
        {/* Shipping options */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Phương Thức Vận Chuyển</CardTitle>
            <CardDescription>Lựa chọn phương thức vận chuyển phù hợp nhất với bạn</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Giao Hàng Tiêu Chuẩn</h3>
                  <p className="text-sm text-muted-foreground">2-3 ngày làm việc</p>
                </div>
                <span className="font-medium">30.000₫</span>
              </div>
              
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Giao Hàng Nhanh</h3>
                  <p className="text-sm text-muted-foreground">1-2 ngày làm việc</p>
                </div>
                <span className="font-medium">50.000₫</span>
              </div>
              
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Giao Hàng Hỏa Tốc</h3>
                  <p className="text-sm text-muted-foreground">Trong ngày (nội thành Hà Nội và TP.HCM)</p>
                </div>
                <span className="font-medium">100.000₫</span>
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Miễn Phí Vận Chuyển</h3>
                  <p className="text-sm text-muted-foreground">Cho đơn hàng từ 500.000₫</p>
                </div>
                <span className="font-medium text-green-600">MIỄN PHÍ</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Câu Hỏi Thường Gặp</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Làm thế nào để theo dõi đơn hàng của tôi?</AccordionTrigger>
              <AccordionContent>
                Sau khi đơn hàng được gửi đi, bạn sẽ nhận được email xác nhận giao hàng kèm mã vận đơn và đường dẫn theo dõi. Bạn cũng có thể theo dõi đơn hàng trong trang cá nhân của mình ở mục "Lịch sử đơn hàng".
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Giao hàng có tới tất cả các tỉnh thành không?</AccordionTrigger>
              <AccordionContent>
                Có, chúng tôi giao hàng đến tất cả 63 tỉnh thành trên toàn quốc. Thời gian giao hàng có thể khác nhau tùy theo khu vực, từ 1-5 ngày làm việc. Những khu vực miền núi, hải đảo có thể cần thêm thời gian.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Nếu gói hàng của tôi bị thất lạc hoặc hư hỏng thì sao?</AccordionTrigger>
              <AccordionContent>
                Nếu gói hàng của bạn bị thất lạc hoặc hư hỏng trong quá trình vận chuyển, vui lòng liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi trong vòng 48 giờ kể từ ngày dự kiến giao hàng. Chúng tôi sẽ làm việc với đơn vị vận chuyển để tìm kiếm gói hàng hoặc xử lý việc gửi hàng thay thế.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Tôi có thể thay đổi địa chỉ giao hàng sau khi đặt hàng không?</AccordionTrigger>
              <AccordionContent>
                Nếu bạn cần thay đổi địa chỉ giao hàng, vui lòng liên hệ với đội ngũ chăm sóc khách hàng của chúng tôi càng sớm càng tốt. Chúng tôi thường có thể cập nhật địa chỉ nếu đơn hàng chưa được xử lý. Sau khi đơn hàng đã được gửi đi, chúng tôi không thể thay đổi địa chỉ giao hàng.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Bạn có hỗ trợ thanh toán khi nhận hàng (COD) không?</AccordionTrigger>
              <AccordionContent>
                Có, chúng tôi hỗ trợ thanh toán khi nhận hàng (COD) cho tất cả đơn hàng có giá trị dưới 5 triệu đồng. Lưu ý rằng một số khu vực xa xôi hoặc hải đảo có thể không hỗ trợ dịch vụ này.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Shipping policies */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Chính Sách Vận Chuyển</h2>
          
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Thời Gian Xử Lý</h3>
              <p>Đơn hàng thường được xử lý trong vòng 1-2 ngày làm việc. Trong mùa cao điểm hoặc các đợt khuyến mãi, thời gian xử lý có thể kéo dài đến 3 ngày làm việc.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Đơn Vị Vận Chuyển</h3>
              <p>Chúng tôi hợp tác với các đơn vị vận chuyển uy tín như Giao Hàng Nhanh, Viettel Post, J&T Express và GHTK để giao hàng. Đơn vị vận chuyển được sử dụng cho đơn hàng của bạn phụ thuộc vào địa điểm và phương thức vận chuyển bạn chọn.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Thời Gian Giao Hàng</h3>
              <p>Giao hàng diễn ra từ thứ Hai đến thứ Bảy, trừ các ngày lễ. Giao hàng vào Chủ nhật có sẵn ở một số khu vực cho các tùy chọn Giao Hàng Nhanh và Hỏa Tốc. Thời gian giao hàng là ước tính và không được đảm bảo tuyệt đối.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Kiểm Tra Hàng</h3>
              <p>Khách hàng được phép kiểm tra đơn hàng trước khi thanh toán với dịch vụ COD. Vui lòng kiểm tra kỹ tình trạng bên ngoài của gói hàng trước khi ký nhận. Sau khi đã ký nhận, khiếu nại về tình trạng bên ngoài sẽ không được chấp nhận.</p>
            </div>
          </div>
        </div>
        
        {/* Contact info */}
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Cần Hỗ Trợ Về Đơn Hàng?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn với mọi thắc mắc về vận chuyển hoặc giao hàng.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">hotro@storex.vn</p>
              </div>
              <div>
                <p className="font-medium">Hotline:</p>
                <p className="text-muted-foreground">1900 1234 56</p>
              </div>
              <div>
                <p className="font-medium">Giờ làm việc:</p>
                <p className="text-muted-foreground">T2-T7: 8:30 - 18:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shipping;