import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Truck, Users, Award, Headphones, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Phần Hero */}
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">Về StoreX</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Thành lập vào năm 2010, StoreX đã phát triển từ một cửa hàng trực tuyến nhỏ thành một điểm đến bán lẻ toàn cầu được hàng triệu khách hàng trên toàn thế giới tin tưởng.
        </p>
        
        <div className="relative rounded-xl overflow-hidden h-[400px] mb-10">
          <img 
            src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
            alt="Đội ngũ StoreX" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent flex items-end">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">Sứ mệnh của chúng tôi</h2>
              <p className="max-w-2xl">
                Cung cấp những sản phẩm xuất sắc và trải nghiệm mua sắm tuyệt vời để nâng cao cuộc sống của mọi người, đồng thời duy trì cam kết về chất lượng, đổi mới và sự hài lòng của khách hàng.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phần Câu chuyện của chúng tôi */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                StoreX bắt đầu với một ý tưởng đơn giản: tạo ra một cửa hàng trực tuyến nơi mọi người có thể tìm thấy các sản phẩm chất lượng với giá hợp lý và dịch vụ khách hàng xuất sắc.
              </p>
              <p>
                Người sáng lập của chúng tôi, Jane Smith, đã bắt đầu công ty từ căn hộ của cô ấy, lựa chọn kỹ lưỡng các sản phẩm mà cô tin tưởng và sẽ sử dụng chính bản thân mình.
              </p>
              <p>
                Khi tin đồn về cam kết của chúng tôi đối với chất lượng và sự hài lòng của khách hàng lan rộng, StoreX đã phát triển nhanh chóng. Ngày nay, chúng tôi cung cấp hàng nghìn sản phẩm trên nhiều danh mục, nhưng những giá trị cốt lõi của chúng tôi vẫn không thay đổi.
              </p>
              <p>
                Chúng tôi đã từ một đội ngũ chỉ có một người trở thành hơn 500 nhân viên trên toàn thế giới, với các trung tâm phân phối ở Bắc Mỹ, Châu Âu và Châu Á. Mặc dù chúng tôi đã phát triển, nhưng chúng tôi vẫn giữ được sự gần gũi đã khiến khách hàng yêu thích StoreX ngay từ đầu.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Đội ngũ của chúng tôi đang làm việc" 
                className="w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Các giá trị cốt lõi */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Các giá trị cốt lõi của chúng tôi</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Khách hàng là ưu tiên</h3>
              <p className="text-muted-foreground">
                Mọi quyết định chúng tôi đưa ra đều bắt đầu với câu hỏi: "Điều này sẽ mang lại lợi ích gì cho khách hàng của chúng tôi?" Chúng tôi cam kết tạo ra những trải nghiệm khiến khách hàng hài lòng.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Chất lượng & Niềm tin</h3>
              <p className="text-muted-foreground">
                Chúng tôi đứng sau mỗi sản phẩm mà chúng tôi bán. Chất lượng không chỉ là một đặc điểm—nó là nền tảng và lý do khách hàng tin tưởng chúng tôi một cách liên tục.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Cộng đồng</h3>
              <p className="text-muted-foreground">
                Chúng tôi đang xây dựng một cửa hàng hơn là một cộng đồng—một cộng đồng của những cá nhân cùng chí hướng, chia sẻ đam mê với chất lượng và đổi mới.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Đội ngũ lãnh đạo */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Đội ngũ lãnh đạo của chúng tôi</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Gặp gỡ những cá nhân đầy nhiệt huyết dẫn dắt tầm nhìn của chúng tôi và giúp StoreX trở thành công ty như ngày hôm nay.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            {
              name: "Jane Smith",
              role: "Người sáng lập & Giám đốc điều hành",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Michael Chen",
              role: "Giám đốc điều hành vận hành",
              image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Sarah Johnson",
              role: "Giám đốc marketing",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "David Kim",
              role: "Giám đốc công nghệ",
              image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="rounded-full overflow-hidden mb-4 aspect-square w-40 h-40 mx-auto">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Thành tựu */}
      <div className="max-w-4xl mx-auto mb-20 bg-muted/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Các thành tựu của chúng tôi</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 rounded-full p-3 inline-flex">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Nền tảng thương mại điện tử tốt nhất năm 2022</h3>
              <p className="text-sm text-muted-foreground">Được trao bởi E-Commerce Today vì sự xuất sắc trong trải nghiệm người dùng và dịch vụ khách hàng</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 rounded-full p-3 inline-flex">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Hơn 10 triệu khách hàng hài lòng</h3>
              <p className="text-sm text-muted-foreground">Đạt được cột mốc này vào năm 2023, với tỷ lệ hài lòng của khách hàng lên đến 95%</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 rounded-full p-3 inline-flex">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Chứng nhận bảo mật hàng đầu trong ngành</h3>
              <p className="text-sm text-muted-foreground">Chứng nhận ISO 27001 về quản lý bảo mật thông tin</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Gia nhập hành trình của chúng tôi</h2>
        <p className="text-muted-foreground mb-8">
          Dù bạn là khách hàng, đối tác, hay đang tìm kiếm cơ hội gia nhập đội ngũ, chúng tôi rất mong được kết nối và cùng nhau phát triển.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/contact">Liên hệ với chúng tôi</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:careers@storex.com">Cơ hội nghề nghiệp</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
