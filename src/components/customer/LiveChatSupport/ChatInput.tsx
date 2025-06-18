
import React from 'react';
import { Button } from "@/components/ui/button";
import { EmojiPicker } from './ChatInput/EmojiPicker';
import { ImageUploader } from './ChatInput/ImageUploader';
import { TextInputArea } from './ChatInput/TextInputArea';
import { ImagePreview } from './ChatInput/ImagePreview';

interface ChatInputProps {
  activeInput: 'text' | 'image';
  setActiveInput: (type: 'text' | 'image') => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  handleSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDesktop?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  activeInput,
  setActiveInput,
  userMessage,
  setUserMessage,
  imageUrl,
  setImageUrl,
  handleSend,
  handleKeyDown,
  isDesktop = false
}) => {
  const insertEmoji = (emoji: string) => {
    setUserMessage(prev => prev + emoji);
  };

  const handleImageSelect = (url: string) => {
    setActiveInput('image');
    setImageUrl(url);
  };

  const handleBackToText = () => {
    setActiveInput('text');
    setImageUrl('');
  };

  // Render UI for text input mode
  if (activeInput === 'text') {
    return (
      <div className={`space-y-${isDesktop ? '2' : '3'}`}>
        <div className="flex gap-1.5">
          <EmojiPicker 
            onEmojiSelect={insertEmoji}
            isDesktop={isDesktop}
          />
          <ImageUploader 
            onImageSelect={handleImageSelect}
            isDesktop={isDesktop}
          />
        </div>

        <TextInputArea
          value={userMessage}
          onChange={setUserMessage}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          isDesktop={isDesktop}
          placeholder="Type your message..."
        />
      </div>
    );
  }

  // Render UI for image input mode
  return (
    <div className={`space-y-${isDesktop ? '2' : '3'}`}>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`px-2 h-${isDesktop ? '7' : '8'} ${isDesktop ? 'text-sm' : ''}`}
        onClick={handleBackToText}
      >
        ← Back{isDesktop ? '' : ' to chat'}
      </Button>
      
      {imageUrl ? (
        <ImagePreview
          imageUrl={imageUrl}
          onRemove={() => setImageUrl('')}
          onSend={handleSend}
          isDesktop={isDesktop}
        />
      ) : (
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size={isDesktop ? "sm" : "default"}
            className={`flex-1 ${isDesktop ? 'h-9 text-sm' : 'h-10'}`}
            onClick={() => {}}
          >
            Select Image
          </Button>
        </div>
      )}
    </div>
  );
};
