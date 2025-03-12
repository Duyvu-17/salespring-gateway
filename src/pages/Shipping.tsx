
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Truck, Package, Clock, Globe, CreditCard, AlertCircle } from 'lucide-react';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Shipping & Delivery</h1>
        
        {/* Hero section */}
        <div className="bg-primary/10 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Fast & Reliable Shipping Worldwide</h2>
          <p className="text-muted-foreground mb-6">
            We partner with premium carriers to ensure your packages arrive safely and on time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">2-5 business days</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Secure Packaging</h3>
              <p className="text-sm text-muted-foreground">Safe and protected</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 p-4 rounded-full mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium">Global Shipping</h3>
              <p className="text-sm text-muted-foreground">Worldwide delivery</p>
            </div>
          </div>
        </div>
        
        {/* Shipping options */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Shipping Options</CardTitle>
            <CardDescription>Choose the shipping method that works best for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Standard Shipping</h3>
                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                </div>
                <span className="font-medium">$4.99</span>
              </div>
              
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Express Shipping</h3>
                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                </div>
                <span className="font-medium">$9.99</span>
              </div>
              
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold">Next Day Delivery</h3>
                  <p className="text-sm text-muted-foreground">Next business day</p>
                </div>
                <span className="font-medium">$19.99</span>
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $50</p>
                </div>
                <span className="font-medium text-green-600">FREE</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* FAQ section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order ships, you will receive a shipping confirmation email with a tracking number and link. You can also track your order in your account dashboard under "Order History."
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you ship internationally?</AccordionTrigger>
              <AccordionContent>
                Yes, we ship to most countries worldwide. International shipping times vary by location, typically taking 7-14 business days. Additional customs fees or taxes may apply depending on your country.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if my package is lost or damaged?</AccordionTrigger>
              <AccordionContent>
                If your package is lost or damaged during shipping, please contact our customer service team within 48 hours of the scheduled delivery date. We'll work with the carrier to locate your package or process a replacement shipment.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I change my shipping address after placing an order?</AccordionTrigger>
              <AccordionContent>
                If you need to change your shipping address, please contact our customer service team as soon as possible. We can usually update the address if the order hasn't been processed yet. Once an order ships, we cannot change the delivery address.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>Do you offer expedited shipping options?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer express shipping and next-day delivery options at checkout for most locations. Please note that these options are only available for orders placed before 1 PM EST on business days.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Shipping policies */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shipping Policies</h2>
          
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Processing Time</h3>
              <p>Orders are typically processed within 1-2 business days. During peak seasons or promotional periods, processing may take up to 3 business days.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Shipping Carriers</h3>
              <p>We partner with reliable carriers including USPS, FedEx, and UPS to deliver your orders. The carrier used for your shipment depends on your location and selected shipping method.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Delivery Windows</h3>
              <p>Deliveries occur Monday through Friday, excluding holidays. Saturday delivery is available in select areas for Express and Next Day options. Delivery timeframes are estimates and not guaranteed.</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">International Shipping</h3>
              <p>International orders may require additional time for customs clearance. Any import duties, taxes, or customs fees are the responsibility of the recipient and are not included in our shipping fees.</p>
            </div>
          </div>
        </div>
        
        {/* Contact info */}
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Need Help With Your Shipment?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              Our customer service team is available to assist you with any shipping or delivery questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div>
                <p className="font-medium">Email Us:</p>
                <p className="text-muted-foreground">shipping@storex.com</p>
              </div>
              <div>
                <p className="font-medium">Call Us:</p>
                <p className="text-muted-foreground">+1 (234) 567-8900</p>
              </div>
              <div>
                <p className="font-medium">Hours:</p>
                <p className="text-muted-foreground">Mon-Fri: 9AM - 6PM EST</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Shipping;
