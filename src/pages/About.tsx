
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Truck, Users, Award, Headphones, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">About StoreX</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Founded in 2010, StoreX has grown from a small online shop to a global retail destination trusted by millions of customers worldwide.
        </p>
        
        <div className="relative rounded-xl overflow-hidden h-[400px] mb-10">
          <img 
            src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
            alt="StoreX Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent flex items-end">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
              <p className="max-w-2xl">
                To provide exceptional products and shopping experiences that enhance people's lives, while maintaining a commitment to quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                StoreX began with a simple idea: create an online store where people could find quality products at reasonable prices with outstanding customer service.
              </p>
              <p>
                Our founder, Jane Smith, started the company from her apartment, carefully selecting products that she personally believed in and would use herself.
              </p>
              <p>
                As word spread about our commitment to quality and customer satisfaction, StoreX quickly grew. Today, we offer thousands of products across dozens of categories, but our core values remain unchanged.
              </p>
              <p>
                We've grown from a team of one to over 500 employees worldwide, with distribution centers in North America, Europe, and Asia. Despite our growth, we maintain the personal touch that made customers fall in love with StoreX in the first place.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Our team working" 
                className="w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Core Values */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-muted-foreground">
                Every decision we make starts with the question: "How will this benefit our customers?" We're committed to creating experiences that delight.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality & Trust</h3>
              <p className="text-muted-foreground">
                We stand behind every product we sell. Quality isn't just a feature—it's our foundation and the reason customers trust us time and again.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 bg-primary/5 border-primary/10">
            <CardContent className="pt-6">
              <div className="bg-primary/10 rounded-full p-4 inline-flex mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                We're building more than a store—we're creating a community of like-minded individuals who share our passion for quality and innovation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Team */}
      <div className="max-w-5xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Our Leadership Team</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
          Meet the passionate individuals who guide our vision and help make StoreX the company it is today.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Jane Smith",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Michael Chen",
              role: "Chief Operations Officer",
              image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "Sarah Johnson",
              role: "Chief Marketing Officer",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
            },
            {
              name: "David Kim",
              role: "Chief Technology Officer",
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
      
      {/* Achievements */}
      <div className="max-w-4xl mx-auto mb-20 bg-muted/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Our Achievements</h2>
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 rounded-full p-3 inline-flex">
                <Award className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Best E-commerce Platform of 2022</h3>
              <p className="text-sm text-muted-foreground">Awarded by E-Commerce Today for excellence in user experience and customer service</p>
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
              <h3 className="font-semibold">10 Million+ Happy Customers</h3>
              <p className="text-sm text-muted-foreground">Reached this milestone in 2023, with a 95% customer satisfaction rating</p>
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
              <h3 className="font-semibold">Industry-Leading Security Certification</h3>
              <p className="text-sm text-muted-foreground">ISO 27001 certified for information security management</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground mb-8">
          Whether you're a customer, partner, or looking to join our team, we'd love to connect with you and continue growing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:careers@storex.com">Careers</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
