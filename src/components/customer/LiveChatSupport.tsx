
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  ChevronDown,
  ChevronUp,
  User,
  Bot,
  Paperclip,
  Link,
  Image,
  Smile,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Product } from "@/data/products";
import { productImages } from "@/data/product-images";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'link' | 'image' | 'product';
  metadata?: {
    url?: string;
    imageUrl?: string;
    productId?: number;
    productName?: string;
    productImageUrl?: string;
  };
}

// List of common emojis for the emoji picker
const commonEmojis = [
  '😊', '😂', '😍', '👍', '😎', '😢', '❤️', '🙏', '👏', '🎉', 
  '🤔', '😀', '😁', '😉', '😋', '🤗', '😐', '😒', '🙄', '😔',
  '😳', '😱', '🤯', '😴', '🤓', '😇', '🤩', '🤑', '😡', '😭'
];

export const LiveChatSupport: React.FC = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hi there! How can we help you today?",
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeInput, setActiveInput] = useState<'text' | 'link' | 'image'>('text');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized, activeInput]);
  
  const handleSend = () => {
    if (activeInput === 'text' && !userMessage.trim()) return;
    if (activeInput === 'link' && (!linkUrl.trim() || !linkText.trim())) return;
    if (activeInput === 'image' && !imageUrl.trim()) return;
    
    let newUserMessage: Message;
    
    // Create message based on the active input type
    if (activeInput === 'link') {
      newUserMessage = {
        id: messages.length + 1,
        content: linkText,
        sender: 'user',
        timestamp: new Date(),
        type: 'link',
        metadata: {
          url: linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`
        }
      };
      setLinkUrl('');
      setLinkText('');
    } else if (activeInput === 'image') {
      newUserMessage = {
        id: messages.length + 1,
        content: 'Sent an image',
        sender: 'user',
        timestamp: new Date(),
        type: 'image',
        metadata: {
          imageUrl: imageUrl
        }
      };
      setImageUrl('');
    } else {
      // Regular text message
      newUserMessage = {
        id: messages.length + 1,
        content: userMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      setUserMessage('');
    }
    
    setMessages(prev => [...prev, newUserMessage]);
    setActiveInput('text'); // Reset to text input after sending
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Determine response based on user message
    let response: string;
    let responseType: 'text' | 'link' | 'image' | 'product' = 'text';
    let responseMetadata: any = {};
    
    const lowerCaseMsg = activeInput === 'text' ? userMessage.toLowerCase() : 
                         activeInput === 'link' ? linkText.toLowerCase() : 'image';
    
    if (lowerCaseMsg.includes('return') || lowerCaseMsg.includes('refund')) {
      response = "For returns and refunds, please visit our Returns & Exchanges section. Would you like me to guide you there?";
    } else if (lowerCaseMsg.includes('product') || lowerCaseMsg.includes('item')) {
      response = "Here's our most popular headphone product:";
      responseType = 'product';
      responseMetadata = {
        productId: 1,
        productName: "Premium Noise-Cancelling Headphones",
        productImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"
      };
    } else if (lowerCaseMsg.includes('shipping') || lowerCaseMsg.includes('delivery')) {
      response = "Most orders ship within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping is 1-2 business days.";
    } else if (lowerCaseMsg.includes('size') || lowerCaseMsg.includes('sizing')) {
      response = "Our sizing guide is available on each product page. Would you like me to help you find the right size for a specific item?";
    } else if (lowerCaseMsg.includes('payment') || lowerCaseMsg.includes('pay')) {
      response = "We accept all major credit cards, PayPal, and Apple Pay. Is there a specific payment method you have questions about?";
    } else if (activeInput === 'image') {
      response = "Thanks for sharing this image. Our team will take a look and get back to you shortly.";
    } else {
      response = "Thanks for your message. One of our customer support agents will respond shortly. Is there anything else I can help you with?";
    }
    
    // Send agent response after a delay
    setTimeout(() => {
      setIsTyping(false);
      const newAgentMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: 'agent',
        timestamp: new Date(),
        type: responseType,
        metadata: responseMetadata
      };
      setMessages(prev => [...prev, newAgentMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const insertEmoji = (emoji: string) => {
    setUserMessage(prev => prev + emoji);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }
      
      // For this demo, we'll just use a placeholder image URL
      // In a real app, you would upload the image to a server
      setActiveInput('image');
      const randomImageIndex = Math.floor(Math.random() * productImages.length);
      setImageUrl(productImages[randomImageIndex].url);
      
      toast({
        title: "Image ready",
        description: "Your image is ready to send."
      });
    }
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      setIsOpen(true);
    }
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    toast({
      title: "Chat Ended",
      description: "Your chat session has ended. A transcript has been sent to your email.",
    });
  };

  // Render different message types
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'link':
        return (
          <div className="space-y-1">
            <p className="text-sm">{message.content}</p>
            <a 
              href={message.metadata?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline flex items-center"
            >
              <Link className="h-3 w-3 mr-1" /> 
              {message.metadata?.url}
            </a>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-1">
            <img 
              src={message.metadata?.imageUrl} 
              alt="Shared image" 
              className="rounded max-w-full max-h-32 object-cover"
            />
          </div>
        );
      case 'product':
        return (
          <div className="space-y-1">
            <p className="text-xs mb-1">{message.content}</p>
            <div className="flex items-center p-2 bg-muted/50 rounded">
              <img 
                src={message.metadata?.productImageUrl} 
                alt={message.metadata?.productName} 
                className="w-10 h-10 object-cover rounded"
              />
              <div className="ml-2">
                <p className="text-xs font-medium">{message.metadata?.productName}</p>
                <a 
                  href={`/product/${message.metadata?.productId}`} 
                  className="text-xs text-blue-500 hover:underline"
                >
                  View product
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };
  
  // For mobile view
  const ChatSheetContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-primary p-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-primary-foreground">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Customer Support</h3>
            <p className="text-xs opacity-90">Online</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20 h-7 w-7"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-3 space-y-3 bg-muted/30">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-2 ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              {renderMessage(message)}
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-2 bg-muted">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t bg-card">
        {activeInput === 'text' && (
          <div className="space-y-2">
            <div className="flex gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-6 gap-1">
                    {commonEmojis.map((emoji, index) => (
                      <Button 
                        key={index} 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => insertEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => setActiveInput('link')}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add a link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={triggerFileInput}
                    >
                      <Image className="h-4 w-4" />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add an image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <Textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 text-sm min-h-8 max-h-24 resize-none"
                rows={1}
              />
              <Button size="sm" onClick={handleSend} disabled={!userMessage.trim()} className="h-8 px-3">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {activeInput === 'link' && (
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2 h-7"
              onClick={() => setActiveInput('text')}
            >
              ← Back to chat
            </Button>
            <div className="space-y-2">
              <Input
                placeholder="Link URL (e.g. example.com)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="text-sm h-8"
              />
              <Input
                placeholder="Link Text (e.g. Check this product)"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="text-sm h-8"
              />
              <Button 
                size="sm" 
                onClick={handleSend} 
                disabled={!linkUrl.trim() || !linkText.trim()} 
                className="w-full"
              >
                Send Link
              </Button>
            </div>
          </div>
        )}

        {activeInput === 'image' && (
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2 h-7"
              onClick={() => setActiveInput('text')}
            >
              ← Back to chat
            </Button>
            <div className="space-y-2">
              {imageUrl && (
                <div className="relative w-24 h-24 mb-2">
                  <img 
                    src={imageUrl} 
                    alt="Selected image" 
                    className="w-full h-full object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-5 w-5 absolute top-1 right-1 rounded-full"
                    onClick={() => setImageUrl('')}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="flex-1"
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  Select Image
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSend} 
                  disabled={!imageUrl} 
                  className="flex-1"
                >
                  Send Image
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Desktop chat UI
  const DesktopChatUI = () => (
    <>
      <div className="flex-1 overflow-auto p-3 space-y-3 bg-muted/30">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'agent' && (
              <Avatar className="h-5 w-5 mr-1 mt-1">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <Bot className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
            )}
            <div className={`max-w-[80%] rounded-lg p-2 ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              {renderMessage(message)}
              <p className="text-xs opacity-70 mt-1 text-right">
                {formatTime(message.timestamp)}
              </p>
            </div>
            {message.sender === 'user' && (
              <Avatar className="h-5 w-5 ml-1 mt-1">
                <AvatarFallback>
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <Avatar className="h-5 w-5 mr-1 mt-1">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>
                <Bot className="h-3 w-3" />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[80%] rounded-lg p-2 bg-muted">
              <div className="flex space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
                  
      <div className="p-2 border-t">
        {activeInput === 'text' && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Smile className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-2">
                  <div className="grid grid-cols-6 gap-1">
                    {commonEmojis.map((emoji, index) => (
                      <Button 
                        key={index} 
                        variant="ghost" 
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => insertEmoji(emoji)}
                      >
                        {emoji}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => setActiveInput('link')}
                    >
                      <Link className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add a link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={triggerFileInput}
                    >
                      <Image className="h-3 w-3" />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Add an image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <Textarea
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 text-xs h-7 min-h-7 max-h-20 resize-none py-1.5"
                rows={1}
              />
              <Button size="sm" onClick={handleSend} disabled={!userMessage.trim()} className="h-7 px-2">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        {activeInput === 'link' && (
          <div className="space-y-1.5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2 h-6 text-xs"
              onClick={() => setActiveInput('text')}
            >
              ← Back
            </Button>
            <div className="space-y-1.5">
              <Input
                placeholder="Link URL (e.g. example.com)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="text-xs h-7"
              />
              <Input
                placeholder="Link Text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="text-xs h-7"
              />
              <Button 
                size="sm" 
                onClick={handleSend} 
                disabled={!linkUrl.trim() || !linkText.trim()}
                className="w-full h-7 text-xs"
              >
                Send Link
              </Button>
            </div>
          </div>
        )}

        {activeInput === 'image' && (
          <div className="space-y-1.5">
            <Button 
              variant="ghost" 
              size="sm" 
              className="px-2 h-6 text-xs"
              onClick={() => setActiveInput('text')}
            >
              ← Back
            </Button>
            <div className="space-y-1.5">
              {imageUrl && (
                <div className="relative w-16 h-16 mb-1">
                  <img 
                    src={imageUrl} 
                    alt="Selected image" 
                    className="w-full h-full object-cover rounded"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-4 w-4 absolute top-0.5 right-0.5 rounded-full"
                    onClick={() => setImageUrl('')}
                  >
                    <X className="h-2 w-2" />
                  </Button>
                </div>
              )}
              <div className="flex gap-1.5">
                <Button 
                  variant="outline"
                  size="sm" 
                  className="flex-1 h-7 text-xs"
                  onClick={triggerFileInput}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  Select Image
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSend} 
                  disabled={!imageUrl}
                  className="h-7 text-xs"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile version - only shows on mobile devices */}
      {isMobile && (
        <div className="fixed z-50 bottom-4 right-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                className="rounded-full h-10 w-10 shadow-lg p-0"
                variant="secondary"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] p-0">
              <ChatSheetContent />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Desktop version - only shows on desktop devices */}
      {!isMobile && (
        <div className="fixed z-50 bottom-4 right-4">
          {!isOpen ? (
            <Button 
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }} 
              className="rounded-full h-10 w-10 shadow-lg p-0"
              variant="secondary"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          ) : (
            <div 
              className={cn(
                "bg-card rounded-lg shadow-lg border transition-all duration-300 ease-in-out flex flex-col",
                isMinimized ? "w-60 h-10" : "w-72 h-[400px]"
              )}
            >
              <div 
                className="flex items-center justify-between bg-primary p-2 text-primary-foreground rounded-t-lg cursor-pointer"
                onClick={toggleMinimize}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-5 w-5 border border-primary-foreground">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-xs">Customer Support</h3>
                </div>
                <div className="flex items-center">
                  {isMinimized ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-5 w-5 text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMinimize();
                        }}
                      >
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-5 w-5 text-primary-foreground hover:bg-primary-foreground/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose();
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              
              {!isMinimized && <DesktopChatUI />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

