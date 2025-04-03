import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  ChevronDown,
  ChevronUp,
  User,
  Bot,
  Paperclip
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    if (!isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);
  
  const handleSend = () => {
    if (!userMessage.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserMessage('');
    
    // Simulate agent typing
    setIsTyping(true);
    
    // Determine response based on user message
    let response: string;
    const lowerCaseMsg = userMessage.toLowerCase();
    
    if (lowerCaseMsg.includes('return') || lowerCaseMsg.includes('refund')) {
      response = "For returns and refunds, please visit our Returns & Exchanges section. Would you like me to guide you there?";
    } else if (lowerCaseMsg.includes('shipping') || lowerCaseMsg.includes('delivery')) {
      response = "Most orders ship within 1-2 business days. Standard shipping takes 3-5 business days, while express shipping is 1-2 business days.";
    } else if (lowerCaseMsg.includes('size') || lowerCaseMsg.includes('sizing')) {
      response = "Our sizing guide is available on each product page. Would you like me to help you find the right size for a specific item?";
    } else if (lowerCaseMsg.includes('payment') || lowerCaseMsg.includes('pay')) {
      response = "We accept all major credit cards, PayPal, and Apple Pay. Is there a specific payment method you have questions about?";
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
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newAgentMessage]);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
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
              <p className="text-sm">{message.content}</p>
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
        <div className="flex gap-2">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 text-sm h-8"
          />
          <Button size="sm" onClick={handleSend} disabled={!userMessage.trim()} className="h-8 px-3">
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
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
              
              {!isMinimized && (
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
                          <p className="text-xs">{message.content}</p>
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
                    <div className="flex gap-2">
                      <Input
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        className="flex-1 text-xs h-7"
                      />
                      <Button size="sm" onClick={handleSend} disabled={!userMessage.trim()} className="h-7 px-2">
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
