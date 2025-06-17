
import { MessageType } from "../ChatMessage";
import { useAgentResponse } from "./useAgentResponse";

interface UseChatActionsProps {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setIsTyping: (typing: boolean) => void;
  userMessage: string;
  setUserMessage: (message: string) => void;
  activeInput: "text" | "image";
  setActiveInput: (input: "text" | "image") => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => boolean;
}

export const useChatActions = ({
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
}: UseChatActionsProps) => {
  const { getAgentResponse } = useAgentResponse();

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
        metadata: { imageUrl: imageUrl },
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
    setIsTyping(true);

    const response = getAgentResponse(newUserMessage.content, newUserMessage.type || "text");

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

  const handleKeyDownWithSend = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (handleKeyDown(e)) {
      handleSend();
    }
  };

  return {
    handleSend,
    handleKeyDown: handleKeyDownWithSend,
  };
};
