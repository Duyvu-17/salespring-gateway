
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "./ChatMessage";
import { LinkPreviewData } from "./ChatInput";

export const useChatState = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      content: "Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeInput, setActiveInput] = useState<"text" | "link" | "image">(
    "text"
  );
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkPreview, setLinkPreview] = useState<LinkPreviewData | null>(null);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
      title: "Kết thúc trò chuyện",
      description:
        "Phiên trò chuyện của bạn đã kết thúc. Một bản ghi đã được gửi đến email của bạn.",
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (activeInput === "text" && !userMessage.trim()) return;
    if (activeInput === "link" && !linkPreview) return;
    if (activeInput === "image" && !imageUrl.trim()) return;

    let newUserMessage: MessageType;

    // Create message based on current input type
    if (activeInput === "link") {
      newUserMessage = {
        id: messages.length + 1,
        content: userMessage || "Shared a link",
        sender: "user",
        timestamp: new Date(),
        type: "link",
        metadata: {
          url: linkPreview?.url,
          linkPreview: linkPreview || undefined,
        },
      };
      setLinkUrl("");
      setUserMessage("");
      setLinkPreview(null);
    } else if (activeInput === "image") {
      newUserMessage = {
        id: messages.length + 1,
        content: "Sent an image",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        metadata: {
          imageUrl: imageUrl,
        },
      };
      setImageUrl("");
    } else {
      // Regular text message
      const message = {
        id: messages.length + 1,
        content: userMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      } as MessageType;

      // If there's a link preview available, convert to a link message
      if (linkPreview) {
        message.type = "link";
        message.metadata = {
          url: linkPreview.url,
          linkPreview: linkPreview,
        };
        setLinkPreview(null);
      }

      newUserMessage = message;
      setUserMessage("");
    }

    setMessages((prev) => [...prev, newUserMessage]);
    setActiveInput("text"); // Reset input mode to text after sending

    // Simulate support agent typing
    setIsTyping(true);

    // Determine response based on user's message
    let response: string;
    let responseType: "text" | "link" | "image" | "product" = "text";
    let responseMetadata = {};

    const lowerCaseMsg = newUserMessage.content.toLowerCase();

    if (
      lowerCaseMsg.includes("đổi hàng") ||
      lowerCaseMsg.includes("hoàn tiền") ||
      lowerCaseMsg.includes("return") ||
      lowerCaseMsg.includes("refund")
    ) {
      response =
        "To exchange an item or get a refund, please visit our Return Policy section. Would you like me to direct you there?";
      // Add link preview for the return policy
      responseType = "link";
      responseMetadata = {
        url: "/returns-policy",
        linkPreview: {
          title: "Returns & Exchanges Policy",
          description: "Information about our return process, eligibility, and timeframes",
          image: "https://images.unsplash.com/photo-1556742049-0a8ea8550b8d?w=200&q=80",
          url: "/returns-policy"
        }
      };
    } else if (
      lowerCaseMsg.includes("sản phẩm") ||
      lowerCaseMsg.includes("mặt hàng") ||
      lowerCaseMsg.includes("product")
    ) {
      response = "Here's our best-selling headphone product:";
      responseType = "product";
      responseMetadata = {
        productId: 1,
        productName: "Premium Noise-Cancelling Headphones",
        productImageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      };
    } else if (
      lowerCaseMsg.includes("vận chuyển") ||
      lowerCaseMsg.includes("giao hàng") ||
      lowerCaseMsg.includes("shipping") ||
      lowerCaseMsg.includes("delivery")
    ) {
      response =
        "Your order will typically be processed within 1-2 business days. Standard shipping takes 3-5 days, while express shipping takes 1-2 days.";
    } else if (
      lowerCaseMsg.includes("kích thước") ||
      lowerCaseMsg.includes("size")
    ) {
      response =
        "Size guides are available on each product page. Would you like me to help you find the right size for a specific product?";
    } else if (
      lowerCaseMsg.includes("thanh toán") ||
      lowerCaseMsg.includes("trả tiền") ||
      lowerCaseMsg.includes("payment")
    ) {
      response =
        "We accept credit cards, PayPal, and digital wallets. Which payment method are you interested in?";
      // Add link preview for payment methods
      responseType = "link";
      responseMetadata = {
        url: "/payment-methods",
        linkPreview: {
          title: "Payment Methods",
          description: "All the ways you can pay for your order",
          image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=200&q=80",
          url: "/payment-methods"
        }
      };
    } else if (newUserMessage.type === "image") {
      response =
        "Thank you for sharing this image. Our support team will review it and respond shortly.";
    } else if (newUserMessage.type === "link") {
      response = 
        "Thank you for sharing this link. I'll check it out and get back to you with more information.";
    } else {
      response =
        "Thank you for your message. Our customer service representative will respond shortly. Is there anything else you need help with?";
    }

    // Send response from support agent after a short delay
    setTimeout(() => {
      setIsTyping(false);
      const newAgentMessage: MessageType = {
        id: messages.length + 2,
        content: response,
        sender: "agent",
        timestamp: new Date(),
        type: responseType,
        metadata: responseMetadata,
      };
      setMessages((prev) => [...prev, newAgentMessage]);
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
    linkPreview,
    setLinkPreview,
    formatTime,
    toggleMinimize,
    handleClose,
    handleKeyDown,
    handleSend,
    isOnline,
  };
};
