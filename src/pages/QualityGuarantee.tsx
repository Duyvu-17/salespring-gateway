import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  CheckCircle,
  Star,
  Award,
  Clock,
  Zap,
  Users,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// Removed react-router-dom import - not available in this environment

const QualityGuarantee = () => {
  const navigate = useNavigate();
  const qualityStandards = [
    {
      icon: Shield,
      title: "Vật Liệu Cao Cấp",
      description:
        "Chúng tôi chỉ sử dụng vật liệu chất lượng cao từ các nhà cung cấp uy tín trên toàn cầu.",
    },
    {
      icon: CheckCircle,
      title: "Kiểm Tra Nghiêm Ngặt",
      description:
        "Mọi sản phẩm đều trải qua kiểm tra chất lượng toàn diện trước khi giao hàng.",
    },
    {
      icon: Star,
      title: "Tay Nghề Chuyên Môn",
      description:
        "Sản phẩm được chế tác bởi các thợ lành nghề với nhiều năm kinh nghiệm.",
    },
    {
      icon: Award,
      title: "Tiêu Chuẩn Ngành",
      description:
        "Tất cả sản phẩm đạt hoặc vượt tiêu chuẩn chất lượng và an toàn quốc tế.",
    },
  ];

  const guaranteeFeatures = [
    {
      icon: Clock,
      title: "Bảo Hành 2 Năm",
      description: "Bảo hành toàn diện cho tất cả sản phẩm",
      highlight: "2 Năm",
    },
    {
      icon: RefreshCw,
      title: "Đổi Trả 30 Ngày",
      description: "Hoàn tiền đầy đủ hoặc đổi hàng trong 30 ngày",
      highlight: "30 Ngày",
    },
    {
      icon: Zap,
      title: "Phản Hồi Nhanh",
      description: "Thời gian phản hồi 24 giờ cho vấn đề chất lượng",
      highlight: "24 Giờ",
    },
    {
      icon: Users,
      title: "Hỗ Trợ Chuyên Gia",
      description: "Đội ngũ đảm bảo chất lượng chuyên dụng",
      highlight: "24/7",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Cam Kết Chất Lượng</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Chúng tôi cam kết đứng sau mỗi sản phẩm bán ra với chính sách bảo
            đảm chất lượng toàn diện. Sự hài lòng của bạn là ưu tiên hàng đầu
            của chúng tôi, và chúng tôi cam kết mang đến sự xuất sắc trong mỗi
            giao dịch mua bán.
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Chứng Nhận ISO 9001 & TCVN
          </Badge>
        </div>

        {/* Quality Standards */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Tiêu Chuẩn Chất Lượng</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi duy trì các tiêu chuẩn cao nhất ở mọi bước của quy trình
              để đảm bảo bạn nhận được sản phẩm vượt mong đợi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {standard.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guarantee Features */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Những Gì Chúng Tôi Cam Kết
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Cam kết toàn diện của chúng tôi bao gồm mọi khía cạnh trong trải
              nghiệm mua sắm của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guaranteeFeatures.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="font-bold">
                      {feature.highlight}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quality Process */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Quy Trình Chất Lượng</h2>
              <p className="text-muted-foreground">
                Mỗi sản phẩm đều trải qua quy trình đảm bảo chất lượng nghiêm
                ngặt của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Kiểm Tra</h3>
                <p className="text-sm text-muted-foreground">
                  Kiểm tra chất lượng ban đầu khi hàng về kho
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Thử Nghiệm</h3>
                <p className="text-sm text-muted-foreground">
                  Thử nghiệm toàn diện về chức năng và độ bền
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Chứng Nhận</h3>
                <p className="text-sm text-muted-foreground">
                  Phê duyệt chất lượng cuối cùng trước khi đóng gói và giao hàng
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warranty Information */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Bảo Hành Toàn Diện</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Lỗi Sản Xuất</p>
                      <p className="text-sm text-muted-foreground">
                        Bảo hành toàn bộ cho mọi lỗi sản xuất
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Hỏng Vật Liệu</p>
                      <p className="text-sm text-muted-foreground">
                        Bảo vệ chống lại sự xuống cấp của vật liệu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Vấn Đề Hiệu Suất</p>
                      <p className="text-sm text-muted-foreground">
                        Đảm bảo về tiêu chuẩn hiệu suất sản phẩm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">2</div>
                  <div className="text-xl font-semibold mb-1">Năm Bảo Hành</div>
                  <p className="text-sm text-muted-foreground">
                    Cho tất cả sản phẩm được mua
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Support */}
        <section className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Cần Hỗ Trợ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Đội ngũ đảm bảo chất lượng của chúng tôi luôn sẵn sàng hỗ trợ với
              mọi câu hỏi hoặc thắc mắc về giao dịch mua hàng của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Hỗ Trợ Điện Thoại</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Trao đổi với chuyên gia chất lượng
                </p>
                <p className="font-medium">1800 1234 (miễn phí)</p>
                <p className="text-sm text-muted-foreground">024 3456 7890</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Hỗ Trợ Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nhận hỗ trợ chi tiết qua email
                </p>
                <p className="font-medium">hotro@storex.vn</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Chat Trực Tuyến</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hỗ trợ tức thì khi bạn cần
                </p>
                <Button variant="outline" size="sm">
                  Bắt Đầu Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Mua Sắm An Tâm</h2>
            <p className="mb-6 opacity-90">
              Mỗi giao dịch mua hàng đều được bảo đảm bởi cam kết chất lượng
              toàn diện của chúng tôi. Trải nghiệm sự khác biệt mà chất lượng
              mang lại.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/search")}
              >
                Xem Sản Phẩm
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate("/contact")}
              >
                Liên Hệ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QualityGuarantee;
