
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useChatUI = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false); // Changed from true to false
  const [isOnline, setIsOnline] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

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
      description: "Phiên trò chuyện của bạn đã kết thúc. Một bản ghi đã được gửi đến email của bạn.",
    });
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  return {
    isOpen,
    setIsOpen,
    isOnline,
    setIsOnline,
    isMinimized,
    setIsMinimized,
    toggleMinimize,
    handleClose,
    openChat,
  };
};
