
import { useMessages } from "./hooks/useMessages";
import { useChatUI } from "./hooks/useChatUI";
import { useInputState } from "./hooks/useInputState";
import { useChatActions } from "./hooks/useChatActions";

export const useChatState = () => {
  const { messages, setMessages, isTyping, setIsTyping, formatTime } = useMessages();
  
  const {
    isOpen,
    setIsOpen,
    isOnline,
    isMinimized,
    setIsMinimized,
    toggleMinimize,
    handleClose,
    openChat,
  } = useChatUI();

  const {
    userMessage,
    setUserMessage,
    activeInput,
    setActiveInput,
    imageUrl,
    setImageUrl,
    handleKeyDown,
  } = useInputState();

  const { handleSend, handleKeyDown: handleKeyDownWithSend } = useChatActions({
    messages,
    setMessages,
    setIsTyping,
    userMessage,
    setUserMessage,
    activeInput,
    setActiveInput,
    imageUrl,
    setImageUrl,
    handleKeyDown,
  });

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
    openChat,
    handleKeyDown: handleKeyDownWithSend,
    handleSend,
    isOnline,
  };
};
