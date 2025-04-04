
import React from "react";
import { cn } from "@/lib/utils";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";
import { MessageType } from "./ChatMessage";
import { LinkPreviewData } from "./ChatInput";

interface DesktopChatProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: MessageType[];
  isTyping: boolean;
  activeInput: "text" | "link" | "image";
  setActiveInput: (type: "text" | "link" | "image") => void;
  userMessage: string;
  setUserMessage: (message: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  linkPreview: LinkPreviewData | null;
  setLinkPreview: (data: LinkPreviewData | null) => void;
  formatTime: (date: Date) => string;
  toggleMinimize: () => void;
  handleClose: () => void;
  handleSend: () => void;
  isOnline: boolean;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const DesktopChat: React.FC<DesktopChatProps> = ({
  isOpen,
  isMinimized,
  messages,
  isTyping,
  activeInput,
  setActiveInput,
  userMessage,
  setUserMessage,
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
  handleSend,
  handleKeyDown,
  isOnline,
}) => {
  return (
    <div
      className={cn(
        "bg-card rounded-lg shadow-lg border transition-all duration-300 ease-in-out flex flex-col",
        isMinimized ? "w-60 h-10" : "w-72 h-[400px]"
      )}
    >
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        handleClose={handleClose}
        isOnline={isOnline}
      />

      {!isMinimized && (
        <>
          <ChatBody
            messages={messages}
            isTyping={isTyping}
            formatTime={formatTime}
          />

          <div className="p-2 border-t">
            <ChatInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              linkPreview={linkPreview}
              setLinkPreview={setLinkPreview}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              isDesktop={true}
            />
          </div>
        </>
      )}
    </div>
  );
};
