
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { MessageType } from './ChatMessage';

interface MobileChatViewProps {
  messages: MessageType[];
  isTyping: boolean;
  activeInput: 'text' | 'image';
  setActiveInput: (type: 'text' | 'image') => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  formatTime: (date: Date) => string;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClose: () => void;
  isOnline: boolean;
}

export const MobileChatView: React.FC<MobileChatViewProps> = ({
  messages,
  isTyping,
  formatTime,
  activeInput,
  setActiveInput,
  userMessage,
  setUserMessage,
  imageUrl,
  setImageUrl,
  handleSend,
  handleKeyDown,
  handleClose,
  isOnline,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose} 
            className="mr-2 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="font-semibold">Customer Support</h2>
          <span
            className={`ml-2 h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
          ></span>
          <span className="ml-1 text-xs">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <ChatBody 
          messages={messages} 
          isTyping={isTyping}
          formatTime={formatTime} 
        />
      </div>
      
      <div className="p-4 border-t bg-background">
        <ChatInput
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
          isDesktop={false}
        />
      </div>
    </div>
  );
};
