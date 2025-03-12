
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
        title: "Message Sent",
        description: "Thank you for contacting us. We'll respond to you shortly.",
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
          <h1 className="text-3xl font-bold mb-4">Get In Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, services, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        
        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Call Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Customer Support</p>
              <p className="font-medium">+1 (234) 567-8900</p>
              <p className="text-muted-foreground mt-4 mb-2">Sales Inquiries</p>
              <p className="font-medium">+1 (234) 567-8901</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Customer Support</p>
              <p className="font-medium">support@storex.com</p>
              <p className="text-muted-foreground mt-4 mb-2">Sales Inquiries</p>
              <p className="font-medium">sales@storex.com</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardHeader className="pb-2">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Visit Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Headquarters</p>
              <p className="font-medium">123 Commerce St, New York, NY 10001, USA</p>
              <p className="text-muted-foreground mt-4 mb-2">Business Hours</p>
              <p className="font-medium">Mon-Fri: 9AM - 6PM EST</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact form and map */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
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
                      Email Address
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
                    Department
                  </label>
                  <Select onValueChange={handleSelectChange} value={formData.department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customerSupport">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="What is your message about?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending<span className="ml-2 animate-pulse">...</span></>
                  ) : (
                    <>
                      Send Message
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
                <CardTitle>Our Location</CardTitle>
                <CardDescription>
                  Find us at our headquarters in New York City
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
                  title="StoreX Headquarters Location"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What are your business hours?",
                answer: "Our customer service team is available Monday through Friday from 9AM to 6PM Eastern Time. We're closed on weekends and major holidays."
              },
              {
                question: "How quickly can I expect a response?",
                answer: "We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our customer support line for immediate assistance."
              },
              {
                question: "Do you have retail locations?",
                answer: "Currently, StoreX operates exclusively online. Our headquarters in New York is not open to the public for retail purchases."
              },
              {
                question: "How can I track my order?",
                answer: "You can track your order by logging into your account and visiting the 'Order History' section. Alternatively, use the tracking link provided in your shipping confirmation email."
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
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay up to date with our latest products, news, and promotions by following us on social media.
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
            <span className="text-sm">We typically respond within 24 hours</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
