
import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  PackageOpen, 
  FileText, 
  CheckCircle2
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const returnFormSchema = z.object({
  orderNumber: z.string().min(5, {
    message: "Order number must be at least 5 characters.",
  }),
  reason: z.string({
    required_error: "Please select a return reason.",
  }),
  condition: z.enum(["unused", "used", "damaged"], {
    required_error: "Please select the item condition.",
  }),
  description: z.string().optional(),
});

const exchangeFormSchema = z.object({
  orderNumber: z.string().min(5, {
    message: "Order number must be at least 5 characters.",
  }),
  originalItem: z.string().min(1, {
    message: "Original item is required.",
  }),
  replacementItem: z.string().min(1, {
    message: "Replacement item is required.",
  }),
  reason: z.string().min(1, {
    message: "Please provide a reason for exchange.",
  }),
});

export const ReturnExchange: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const returnForm = useForm<z.infer<typeof returnFormSchema>>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      orderNumber: "",
      reason: "",
      condition: "unused",
      description: "",
    },
  });

  const exchangeForm = useForm<z.infer<typeof exchangeFormSchema>>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues: {
      orderNumber: "",
      originalItem: "",
      replacementItem: "",
      reason: "",
    },
  });

  function onReturnSubmit(values: z.infer<typeof returnFormSchema>) {
    console.log(values);
    toast({
      title: "Return Request Submitted",
      description: "We've received your return request. You'll receive further instructions via email.",
    });
    setIsSubmitted(true);
  }

  function onExchangeSubmit(values: z.infer<typeof exchangeFormSchema>) {
    console.log(values);
    toast({
      title: "Exchange Request Submitted",
      description: "We've received your exchange request. You'll receive further instructions via email.",
    });
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-primary flex items-center justify-center gap-2">
            <CheckCircle2 className="h-6 w-6" />
            Request Submitted Successfully
          </CardTitle>
          <CardDescription>
            We've received your request. You'll receive an email with next steps.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">
            Our customer service team will review your request within the next 24-48 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline" 
            className="mt-4"
          >
            Submit Another Request
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="h-5 w-5" />
          Returns & Exchanges
        </CardTitle>
        <CardDescription>
          Request a return or exchange for items purchased within the last 30 days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="return" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="return" className="flex items-center gap-1">
              <PackageOpen className="h-4 w-4" /> Return
            </TabsTrigger>
            <TabsTrigger value="exchange" className="flex items-center gap-1">
              <ArrowLeftRight className="h-4 w-4" /> Exchange
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="return">
            <Form {...returnForm}>
              <form onSubmit={returnForm.handleSubmit(onReturnSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={returnForm.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ORD123456" {...field} />
                      </FormControl>
                      <FormDescription>
                        Found in your order confirmation email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={returnForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Return Reason</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="wrong_size">Wrong Size</SelectItem>
                          <SelectItem value="damaged">Damaged/Defective</SelectItem>
                          <SelectItem value="not_as_described">Not As Described</SelectItem>
                          <SelectItem value="wrong_item">Wrong Item Received</SelectItem>
                          <SelectItem value="no_longer_needed">No Longer Needed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={returnForm.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Item Condition</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="unused" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Unused with tags
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="used" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Used/worn
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="damaged" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Damaged/defective
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={returnForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Comments</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide any additional information about your return..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Submit Return Request
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="exchange">
            <Form {...exchangeForm}>
              <form onSubmit={exchangeForm.handleSubmit(onExchangeSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={exchangeForm.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ORD123456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={exchangeForm.control}
                  name="originalItem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Item name or SKU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={exchangeForm.control}
                  name="replacementItem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Replacement Item</FormLabel>
                      <FormControl>
                        <Input placeholder="Desired replacement item" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={exchangeForm.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Exchange</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please explain why you want to exchange this item..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Submit Exchange Request
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Items must be in original condition and within 30 days of purchase.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
