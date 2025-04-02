
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  X, 
  ArrowUp,
  ArrowDown,
  User,
  Bot,
  Paperclip
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

export const LiveChatSupport: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
    scrollToBottom();
  }, [messages]);
  
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
  };
  
  const handleClose = () => {
    setIsOpen(false);
    toast({
      title: "Chat Ended",
      description: "Your chat session has ended. A transcript has been sent to your email.",
    });
  };
  
  // For mobile view
  const ChatSheetContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border-2 border-primary-foreground">
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
          size="icon"
          className="text-primary-foreground hover:bg-primary-foreground/20"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-muted/30">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] rounded-lg p-3 ${
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
            <div className="max-w-[80%] rounded-lg p-3 bg-muted">
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
      
      <div className="p-4 border-t bg-card">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!userMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Desktop chat widget
  return (
    <>
      {/* Mobile version */}
      <div className="md:hidden fixed z-50 bottom-5 right-5">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              className="rounded-full h-14 w-14 shadow-lg"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] p-0">
            <ChatSheetContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop version */}
      <div className="hidden md:block fixed z-50 bottom-5 right-5">
        {!isOpen ? (
          <Button 
            onClick={() => setIsOpen(true)} 
            className="rounded-full h-14 w-14 shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        ) : (
          <div 
            className={`bg-card rounded-lg shadow-lg border w-80 transition-all duration-300 ease-in-out flex flex-col ${
              isMinimized ? 'h-14' : 'h-[450px]'
            }`}
          >
            <div className="flex items-center justify-between bg-primary p-3 text-primary-foreground rounded-t-lg cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 border-2 border-primary-foreground">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-sm">Customer Support</h3>
              </div>
              <div className="flex items-center">
                {isMinimized ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMinimize();
                      }}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-auto p-4 space-y-4 bg-muted/30">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.sender === 'agent' && (
                        <Avatar className="h-6 w-6 mr-2 mt-1">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === 'user' && (
                        <Avatar className="h-6 w-6 ml-2 mt-1">
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <Avatar className="h-6 w-6 mr-2 mt-1">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
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
                
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      className="flex-1 text-sm"
                    />
                    <Button size="sm" onClick={handleSend} disabled={!userMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
