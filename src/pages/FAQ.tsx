
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqs = [
    {
      id: "shipping",
      category: "Shipping",
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) and overnight shipping are also available at checkout. Free shipping is available on orders over $50."
    },
    {
      id: "returns",
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Returns are free for exchanges, and we provide prepaid return labels."
    },
    {
      id: "sizing",
      category: "Products",
      question: "How do I find the right size?",
      answer: "Each product page includes a detailed size chart. You can also use our virtual fitting tool or contact customer service for personalized sizing advice."
    },
    {
      id: "payment",
      category: "Payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and buy-now-pay-later options like Klarna and Afterpay."
    },
    {
      id: "tracking",
      category: "Shipping",
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history."
    },
    {
      id: "account",
      category: "Account",
      question: "Do I need an account to place an order?",
      answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save items to your wishlist, and enjoy faster checkout for future purchases."
    },
    {
      id: "international",
      category: "Shipping",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. Customs fees may apply and are the responsibility of the customer."
    },
    {
      id: "discounts",
      category: "Promotions",
      question: "How do I use discount codes?",
      answer: "Enter your discount code at checkout in the 'Promo Code' field. Only one discount code can be used per order. Some exclusions may apply."
    },
    {
      id: "quality",
      category: "Products",
      question: "What if I receive a defective item?",
      answer: "We're sorry if you received a defective item! Contact us immediately and we'll arrange for a replacement or full refund. We may ask for photos to help improve our quality control."
    },
    {
      id: "wishlist",
      category: "Account",
      question: "How does the wishlist work?",
      answer: "Click the heart icon on any product to add it to your wishlist. You can view and manage your wishlist by clicking the heart icon in the header or visiting your account page."
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqs.map(faq => faq.category))];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about shopping with StoreX
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="overflow-hidden">
                <Collapsible
                  open={openItems.includes(faq.id)}
                  onOpenChange={() => toggleItem(faq.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-xs text-primary font-medium mb-1">
                            {faq.category}
                          </div>
                          <h3 className="font-semibold">{faq.question}</h3>
                        </div>
                        <ChevronDown 
                          className={`h-5 w-5 transition-transform ${
                            openItems.includes(faq.id) ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="border-t pt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))
          )}
        </div>

        {/* Still need help */}
        <Card className="bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/customer-service">
                <Button>Contact Customer Service</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Send us a Message</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQ;
