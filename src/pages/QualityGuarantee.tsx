
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
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const QualityGuarantee = () => {
  const qualityStandards = [
    {
      icon: Shield,
      title: "Premium Materials",
      description: "We source only the highest quality materials from certified suppliers worldwide."
    },
    {
      icon: CheckCircle,
      title: "Rigorous Testing",
      description: "Every product undergoes comprehensive quality control testing before shipping."
    },
    {
      icon: Star,
      title: "Expert Craftsmanship",
      description: "Our products are crafted by skilled professionals with years of experience."
    },
    {
      icon: Award,
      title: "Industry Standards",
      description: "All products meet or exceed international quality and safety standards."
    }
  ];

  const guaranteeFeatures = [
    {
      icon: Clock,
      title: "2-Year Warranty",
      description: "Comprehensive warranty coverage on all products",
      highlight: "2 Years"
    },
    {
      icon: RefreshCw,
      title: "30-Day Returns",
      description: "Full refund or exchange within 30 days",
      highlight: "30 Days"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "24-hour response time for quality issues",
      highlight: "24 Hours"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated quality assurance team",
      highlight: "24/7"
    }
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
          <h1 className="text-4xl font-bold mb-4">Quality Guarantee</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We stand behind every product we sell with our comprehensive quality guarantee. 
            Your satisfaction is our top priority, and we're committed to delivering excellence in every purchase.
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            ISO 9001 Certified
          </Badge>
        </div>

        {/* Quality Standards */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Quality Standards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards at every step of our process to ensure you receive products that exceed your expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityStandards.map((standard, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{standard.title}</h3>
                  <p className="text-sm text-muted-foreground">{standard.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Guarantee Features */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">What We Guarantee</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive guarantee covers every aspect of your purchase experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guaranteeFeatures.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
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
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quality Process */}
        <Card>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Quality Process</h2>
              <p className="text-muted-foreground">
                Every product goes through our rigorous quality assurance process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Inspection</h3>
                <p className="text-sm text-muted-foreground">
                  Initial quality check upon arrival at our warehouse
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive functionality and durability testing
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Certification</h3>
                <p className="text-sm text-muted-foreground">
                  Final quality approval before packaging and shipping
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
                <h2 className="text-2xl font-bold mb-4">Comprehensive Warranty Coverage</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Manufacturing Defects</p>
                      <p className="text-sm text-muted-foreground">Full coverage for any manufacturing defects</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Material Failures</p>
                      <p className="text-sm text-muted-foreground">Protection against material degradation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Performance Issues</p>
                      <p className="text-sm text-muted-foreground">Guarantee on product performance standards</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center lg:text-right">
                <div className="bg-background p-6 rounded-lg shadow-sm">
                  <div className="text-4xl font-bold text-primary mb-2">2</div>
                  <div className="text-xl font-semibold mb-1">Year Warranty</div>
                  <p className="text-sm text-muted-foreground">
                    On all products purchased
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Support */}
        <section className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our quality assurance team is here to help with any questions or concerns about your purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Speak with our quality experts
                </p>
                <p className="font-medium">+1 (555) 123-4567</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get detailed assistance via email
                </p>
                <p className="font-medium">quality@storex.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Instant support when you need it
                </p>
                <Button variant="outline" size="sm">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Shop with Confidence</h2>
            <p className="mb-6 opacity-90">
              Every purchase is backed by our comprehensive quality guarantee. 
              Experience the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search">
                <Button variant="secondary" size="lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QualityGuarantee;
