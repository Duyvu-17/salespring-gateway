
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "./ChatMessage";

export const useChatState = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
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
  const [activeInput, setActiveInput] = useState<"text" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");

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
    if (activeInput === "image" && !imageUrl.trim()) return;

    let newUserMessage: MessageType;

    if (activeInput === "image") {
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
      newUserMessage = {
        id: messages.length + 1,
        content: userMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      } as MessageType;
      setUserMessage("");
    }

    setMessages((prev) => [...prev, newUserMessage]);
    setActiveInput("text");

    // Simulate support agent typing
    setIsTyping(true);

    // Determine response based on user's message
    let response: string;

    const lowerCaseMsg = newUserMessage.content.toLowerCase();

    if (
      lowerCaseMsg.includes("đổi hàng") ||
      lowerCaseMsg.includes("hoàn tiền") ||
      lowerCaseMsg.includes("return") ||
      lowerCaseMsg.includes("refund")
    ) {
      response =
        "Để đổi hàng hoặc hoàn tiền, vui lòng truy cập phần Chính sách đổi trả của chúng tôi. Bạn có muốn tôi hướng dẫn bạn đến đó không?";
    } else if (
      lowerCaseMsg.includes("sản phẩm") ||
      lowerCaseMsg.includes("mặt hàng") ||
      lowerCaseMsg.includes("product")
    ) {
      response = "Đây là sản phẩm tai nghe bán chạy nhất của chúng tôi. Bạn có cần thêm thông tin gì không?";
    } else if (
      lowerCaseMsg.includes("vận chuyển") ||
      lowerCaseMsg.includes("giao hàng") ||
      lowerCaseMsg.includes("shipping") ||
      lowerCaseMsg.includes("delivery")
    ) {
      response =
        "Đơn hàng của bạn thường được xử lý trong vòng 1-2 ngày làm việc. Vận chuyển tiêu chuẩn mất 3-5 ngày, trong khi vận chuyển nhanh mất 1-2 ngày.";
    } else if (
      lowerCaseMsg.includes("kích thước") ||
      lowerCaseMsg.includes("size")
    ) {
      response =
        "Hướng dẫn về kích thước có sẵn trên trang của từng sản phẩm. Bạn có muốn tôi giúp bạn tìm kích thước phù hợp cho một sản phẩm cụ thể không?";
    } else if (
      lowerCaseMsg.includes("thanh toán") ||
      lowerCaseMsg.includes("trả tiền") ||
      lowerCaseMsg.includes("payment")
    ) {
      response =
        "Chúng tôi chấp nhận thẻ tín dụng, PayPal và ví điện tử. Bạn quan tâm đến phương thức thanh toán nào?";
    } else if (newUserMessage.type === "image") {
      response =
        "Cảm ơn bạn đã chia sẻ hình ảnh này. Đội ngũ hỗ trợ của chúng tôi sẽ xem xét và phản hồi sớm.";
    } else {
      response =
        "Cảm ơn tin nhắn của bạn. Đại diện dịch vụ khách hàng của chúng tôi sẽ phản hồi sớm. Còn gì khác tôi có thể giúp bạn không?";
    }

    // Send response from support agent after a short delay
    setTimeout(() => {
      setIsTyping(false);
      const newAgentMessage: MessageType = {
        id: messages.length + 2,
        content: response,
        sender: "agent",
        timestamp: new Date(),
        type: "text",
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
    imageUrl,
    setImageUrl,
    formatTime,
    toggleMinimize,
    handleClose,
    handleKeyDown,
    handleSend,
    isOnline,
  };
};
