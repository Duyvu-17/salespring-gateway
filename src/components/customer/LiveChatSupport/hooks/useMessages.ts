
import { useState } from "react";
import { MessageType } from "../ChatMessage";

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 1,
      content: "Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?",
      sender: "agent",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    formatTime,
  };
};
