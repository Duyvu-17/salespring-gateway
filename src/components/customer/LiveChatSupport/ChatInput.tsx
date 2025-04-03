
import React, { useRef } from 'react';
import { Send, Smile, Link, Image, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Common emojis for the emoji picker
const commonEmojis = [
  '😊', '😂', '😍', '👍', '😎', '😢', '❤️', '🙏', '👏', '🎉', 
  '🤔', '😀', '😁', '😉', '😋', '🤗', '😐', '😒', '🙄', '😔',
  '😳', '😱', '🤯', '😴', '🤓', '😇', '🤩', '🤑', '😡', '😭'
];

interface ChatInputProps {
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
  isDesktop?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
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
  isDesktop = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const insertEmoji = (emoji: string) => {
    setUserMessage(prev => prev + emoji);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && file.type.startsWith('image/')) {
      setActiveInput('image');
      // For this demo, we'll just use a placeholder image URL
      const randomIndex = Math.floor(Math.random() * 5);
      const demoImages = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&q=80",
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&q=80"
      ];
      setImageUrl(demoImages[randomIndex]);
    }
  };
  
  if (activeInput === 'text') {
    return (
      <div className={`space-y-${isDesktop ? '1.5' : '2'}`}>
        <div className="flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant={isDesktop ? "ghost" : "outline"} 
                size="icon" 
                className={`h-${isDesktop ? '6' : '8'} w-${isDesktop ? '6' : '8'}`}
              >
                <Smile className={`h-${isDesktop ? '3' : '4'} w-${isDesktop ? '3' : '4'}`} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-2">
              <div className="grid grid-cols-6 gap-1">
                {commonEmojis.map((emoji, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className={`h-${isDesktop ? '7' : '8'} w-${isDesktop ? '7' : '8'} p-0`}
                    onClick={() => insertEmoji(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isDesktop ? "ghost" : "outline"}
                  size="icon" 
                  className={`h-${isDesktop ? '6' : '8'} w-${isDesktop ? '6' : '8'}`}
                  onClick={() => setActiveInput('link')}
                >
                  <Link className={`h-${isDesktop ? '3' : '4'} w-${isDesktop ? '3' : '4'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Add a link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={isDesktop ? "ghost" : "outline"}
                  size="icon" 
                  className={`h-${isDesktop ? '6' : '8'} w-${isDesktop ? '6' : '8'}`}
                  onClick={triggerFileInput}
                >
                  <Image className={`h-${isDesktop ? '3' : '4'} w-${isDesktop ? '3' : '4'}`} />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Add an image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-2">
          <Textarea
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`flex-1 text-${isDesktop ? 'xs' : 'sm'} ${isDesktop ? 'h-7 min-h-7 max-h-20 py-1.5' : 'min-h-8 max-h-24'} resize-none`}
            rows={1}
          />
          <Button 
            size="sm" 
            onClick={handleSend}
            disabled={!userMessage.trim()} 
            className={`${isDesktop ? 'h-7 px-2' : 'h-8 px-3'}`}
          >
            <Send className={`h-${isDesktop ? '3' : '3'} w-${isDesktop ? '3' : '3'}`} />
          </Button>
        </div>
      </div>
    );
  }

  if (activeInput === 'link') {
    return (
      <div className={`space-y-${isDesktop ? '1.5' : '2'}`}>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`px-2 h-${isDesktop ? '6' : '7'} ${isDesktop ? 'text-xs' : ''}`}
          onClick={() => setActiveInput('text')}
        >
          ← Back{isDesktop ? '' : ' to chat'}
        </Button>
        <div className={`space-y-${isDesktop ? '1.5' : '2'}`}>
          <Input
            placeholder="Link URL (e.g. example.com)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className={`text-${isDesktop ? 'xs' : 'sm'} h-${isDesktop ? '7' : '8'}`}
          />
          <Input
            placeholder={`Link Text${isDesktop ? '' : ' (e.g. Check this product)'}`}
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            className={`text-${isDesktop ? 'xs' : 'sm'} h-${isDesktop ? '7' : '8'}`}
          />
          <Button 
            size="sm" 
            onClick={handleSend} 
            disabled={!linkUrl.trim() || !linkText.trim()} 
            className={`w-full ${isDesktop ? 'h-7 text-xs' : ''}`}
          >
            Send Link
          </Button>
        </div>
      </div>
    );
  }

  // Image input
  return (
    <div className={`space-y-${isDesktop ? '1.5' : '2'}`}>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`px-2 h-${isDesktop ? '6' : '7'} ${isDesktop ? 'text-xs' : ''}`}
        onClick={() => setActiveInput('text')}
      >
        ← Back{isDesktop ? '' : ' to chat'}
      </Button>
      <div className={`space-y-${isDesktop ? '1.5' : '2'}`}>
        {imageUrl && (
          <div className={`relative ${isDesktop ? 'w-16 h-16' : 'w-24 h-24'} mb-${isDesktop ? '1' : '2'}`}>
            <img 
              src={imageUrl} 
              alt="Selected image" 
              className="w-full h-full object-cover rounded"
            />
            <Button
              variant="destructive"
              size="icon"
              className={`${isDesktop ? 'h-4 w-4' : 'h-5 w-5'} absolute ${isDesktop ? 'top-0.5 right-0.5' : 'top-1 right-1'} rounded-full`}
              onClick={() => setImageUrl('')}
            >
              <X className={`h-${isDesktop ? '2' : '3'} w-${isDesktop ? '2' : '3'}`} />
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            className={`flex-1 ${isDesktop ? 'h-7 text-xs' : ''}`}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
            Select Image
          </Button>
          <Button 
            size="sm" 
            onClick={handleSend} 
            disabled={!imageUrl}
            className={`flex-1 ${isDesktop ? 'h-7 text-xs' : ''}`}
          >
            Send{isDesktop ? '' : ' Image'}
          </Button>
        </div>
      </div>
    </div>
  );
};
