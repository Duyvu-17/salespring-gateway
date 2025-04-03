
import React from 'react';
import { cn } from "@/lib/utils";
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { MessageType } from './ChatMessage';

interface DesktopChatProps {
  isOpen: boolean;
  isMinimized: boolean;
  messages: MessageType[];
  isTyping: boolean;
  activeInput: 'text' | 'link' | 'image';
  setActiveInput: (type: 'text' | 'link' | 'image') => void;
  userMessage: string;
  setUserMessage: (message: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  formatTime: (date: Date) => string;
  toggleMinimize: () => void;
  handleClose: () => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  formatTime,
  toggleMinimize,
  handleClose,
  handleSend,
  handleKeyDown
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
              linkUrl={linkUrl}
              setLinkUrl={setLinkUrl}
              linkText={linkText}
              setLinkText={setLinkText}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
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
