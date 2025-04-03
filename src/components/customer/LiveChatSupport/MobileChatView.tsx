import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { MessageType } from './ChatMessage';

interface MobileChatViewProps {
  messages: MessageType[];
  isTyping: boolean;
  formatTime: (date: Date) => string;
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
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,
  imageUrl,
  setImageUrl,
  handleSend,
  handleKeyDown,
  handleClose,
  isOnline 
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-primary p-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-primary-foreground">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>CS</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-sm">Customer Support</h3>
            <div className="flex items-center gap-1 text-xs opacity-90">
              {/* Biểu tượng trạng thái online */}
              <span
                className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
              ></span>
              <p>{isOnline ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/20 h-7 w-7"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ChatBody
        messages={messages}
        isTyping={isTyping}
        formatTime={formatTime}
      />
      
      <div className="p-3 border-t bg-card">
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
        />
      </div>
    </div>
  );
};
