
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { MessageType } from './ChatMessage';

export const useChatState = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([
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
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSend = () => {
    if (activeInput === 'text' && !userMessage.trim()) return;
    if (activeInput === 'link' && (!linkUrl.trim() || !linkText.trim())) return;
    if (activeInput === 'image' && !imageUrl.trim()) return;
    
    let newUserMessage: MessageType;
    
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
      const newAgentMessage: MessageType = {
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

  return {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    userMessage,
    setUserMessage,
    messages,
    isTyping,
    activeInput,
    setActiveInput,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    imageUrl, 
    setImageUrl,
    formatTime,
    toggleMinimize,
    handleClose,
    handleKeyDown,
    handleSend
  };
};
