import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    department: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, department: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Tin nhắn đã được gửi",
        description: "Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        department: ''
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi rất mong nhận được phản hồi từ bạn. Dù bạn có câu hỏi về sản phẩm, dịch vụ, hay bất cứ điều gì khác, đội ngũ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
          </p>
        </div>
        
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Gọi cho chúng tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Hỗ trợ khách hàng</p>
              <p className="font-medium">+1 (234) 567-8900</p>
              <p className="text-muted-foreground mt-4 mb-2">Yêu cầu bán hàng</p>
              <p className="font-medium">+1 (234) 567-8901</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Gửi email cho chúng tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Hỗ trợ khách hàng</p>
              <p className="font-medium">support@storex.com</p>
              <p className="text-muted-foreground mt-4 mb-2">Yêu cầu bán hàng</p>
              <p className="font-medium">sales@storex.com</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Đến thăm chúng tôi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Trụ sở chính</p>
              <p className="font-medium">123 Commerce St, New York, NY 10001, USA</p>
              <p className="text-muted-foreground mt-4 mb-2">Giờ làm việc</p>
              <p className="font-medium">Thứ Hai - Thứ Sáu: 9AM - 6PM EST</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact form and map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Gửi tin nhắn</CardTitle>
              <CardDescription>
                Điền vào mẫu dưới đây và chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Tên của bạn
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Địa chỉ email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Bộ phận
                  </label>
                  <Select onValueChange={handleSelectChange} value={formData.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn một bộ phận" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customerSupport">Hỗ trợ khách hàng</SelectItem>
                      <SelectItem value="sales">Bán hàng</SelectItem>
                      <SelectItem value="technical">Hỗ trợ kỹ thuật</SelectItem>
                      <SelectItem value="billing">Hóa đơn và thanh toán</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Chủ đề
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Tin nhắn của bạn về điều gì?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Tin nhắn
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Hãy cho chúng tôi biết bạn cần gì..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Đang gửi<span className="ml-2 animate-pulse">...</span></>
                  ) : (
                    <>
                      Gửi tin nhắn
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Vị trí của chúng tôi</CardTitle>
                <CardDescription>
                  Tìm chúng tôi tại trụ sở chính ở Thành phố New York
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 aspect-square">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343635!2d-73.9922631849036!3d40.74844097932793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1677552626023!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vị trí trụ sở StoreX"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi thường gặp</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[ 
              {
                question: "Giờ làm việc của bạn là gì?",
                answer: "Đội ngũ hỗ trợ khách hàng của chúng tôi làm việc từ Thứ Hai đến Thứ Sáu, từ 9AM đến 6PM Giờ miền Đông. Chúng tôi nghỉ vào cuối tuần và các ngày lễ."
              },
              {
                question: "Tôi có thể nhận phản hồi nhanh chóng không?",
                answer: "Chúng tôi sẽ cố gắng phản hồi tất cả các yêu cầu trong vòng 24 giờ làm việc. Đối với các vấn đề khẩn cấp, vui lòng gọi cho đường dây hỗ trợ khách hàng của chúng tôi."
              },
              {
                question: "Bạn có cửa hàng bán lẻ không?",
                answer: "Hiện tại, StoreX chỉ hoạt động trực tuyến. Trụ sở chính của chúng tôi tại New York không mở cửa cho công chúng đến mua sắm."
              },
              {
                question: "Làm thế nào để theo dõi đơn hàng của tôi?",
                answer: "Bạn có thể theo dõi đơn hàng của mình bằng cách đăng nhập vào tài khoản và vào phần 'Lịch sử đơn hàng'. Ngoài ra, bạn có thể sử dụng liên kết theo dõi trong email xác nhận giao hàng."
              }
            ].map((item, index) => (
              <Card key={index} className="bg-muted/30">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Social & Support */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Kết nối với chúng tôi</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Cập nhật các sản phẩm, tin tức và khuyến mãi mới nhất của chúng tôi qua các kênh mạng xã hội.
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-muted/30 p-3 rounded-full hover:bg-primary/10 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-muted/30 p-3 rounded-full hover:bg-primary/10 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-muted/30 p-3 rounded-full hover:bg-primary/10 transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-muted/30 p-3 rounded-full hover:bg-primary/10 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
          
          <Separator className="mb-8" />
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Chúng tôi thường phản hồi trong vòng 24 giờ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
