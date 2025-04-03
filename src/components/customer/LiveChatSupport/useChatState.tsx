import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { MessageType } from "./ChatMessage";

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
    if (activeInput === "link" && (!linkUrl.trim() || !linkText.trim())) return;
    if (activeInput === "image" && !imageUrl.trim()) return;

    let newUserMessage: MessageType;

    // Tạo tin nhắn dựa trên loại đầu vào hiện tại
    if (activeInput === "link") {
      newUserMessage = {
        id: messages.length + 1,
        content: linkText,
        sender: "user",
        timestamp: new Date(),
        type: "link",
        metadata: {
          url: linkUrl.startsWith("http") ? linkUrl : `https://${linkUrl}`,
        },
      };
      setLinkUrl("");
      setLinkText("");
    } else if (activeInput === "image") {
      newUserMessage = {
        id: messages.length + 1,
        content: "Đã gửi một hình ảnh",
        sender: "user",
        timestamp: new Date(),
        type: "image",
        metadata: {
          imageUrl: imageUrl,
        },
      };
      setImageUrl("");
    } else {
      // Tin nhắn văn bản thông thường
      newUserMessage = {
        id: messages.length + 1,
        content: userMessage,
        sender: "user",
        timestamp: new Date(),
        type: "text",
      };
      setUserMessage("");
    }

    setMessages((prev) => [...prev, newUserMessage]);
    setActiveInput("text"); // Đặt lại đầu vào về chế độ văn bản sau khi gửi

    // Mô phỏng nhân viên hỗ trợ đang nhập tin nhắn
    setIsTyping(true);

    // Xác định phản hồi dựa trên tin nhắn của người dùng
    let response: string;
    let responseType: "text" | "link" | "image" | "product" = "text";
    let responseMetadata = {};

    const lowerCaseMsg =
      activeInput === "text"
        ? userMessage.toLowerCase()
        : activeInput === "link"
        ? linkText.toLowerCase()
        : "image";

    if (
      lowerCaseMsg.includes("đổi hàng") ||
      lowerCaseMsg.includes("hoàn tiền")
    ) {
      response =
        "Để đổi hàng hoặc hoàn tiền, vui lòng truy cập mục Chính sách đổi trả của chúng tôi. Bạn có muốn tôi hướng dẫn bạn đến đó không?";
    } else if (
      lowerCaseMsg.includes("sản phẩm") ||
      lowerCaseMsg.includes("mặt hàng")
    ) {
      response = "Dưới đây là sản phẩm tai nghe bán chạy nhất của chúng tôi:";
      responseType = "product";
      responseMetadata = {
        productId: 1,
        productName: "Tai nghe chống ồn cao cấp",
        productImageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
      };
    } else if (
      lowerCaseMsg.includes("vận chuyển") ||
      lowerCaseMsg.includes("giao hàng")
    ) {
      response =
        "Đơn hàng của bạn thường sẽ được xử lý trong 1-2 ngày làm việc. Giao hàng tiêu chuẩn mất từ 3-5 ngày, còn giao hàng nhanh từ 1-2 ngày.";
    } else if (
      lowerCaseMsg.includes("kích thước") ||
      lowerCaseMsg.includes("size")
    ) {
      response =
        "Bảng hướng dẫn chọn size có sẵn trên từng trang sản phẩm. Bạn có muốn tôi giúp bạn chọn size phù hợp cho một sản phẩm cụ thể không?";
    } else if (
      lowerCaseMsg.includes("thanh toán") ||
      lowerCaseMsg.includes("trả tiền")
    ) {
      response =
        "Chúng tôi hỗ trợ thanh toán bằng thẻ tín dụng, PayPal và Ví điện tử. Bạn đang quan tâm đến phương thức thanh toán nào?";
    } else if (activeInput === "image") {
      response =
        "Cảm ơn bạn đã chia sẻ hình ảnh. Nhóm hỗ trợ của chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất.";
    } else {
      response =
        "Cảm ơn bạn đã nhắn tin. Nhân viên chăm sóc khách hàng sẽ trả lời bạn trong ít phút. Bạn có cần hỗ trợ thêm gì không?";
    }

    // Gửi phản hồi từ nhân viên hỗ trợ sau một khoảng thời gian ngắn
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
    formatTime,
    toggleMinimize,
    handleClose,
    handleKeyDown,
    handleSend,
    isOnline,
  };
};
