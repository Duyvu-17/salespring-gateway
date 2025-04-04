
import React, { useRef, useState, useEffect } from 'react';
import { Send, Smile, Image, Link, X, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

// Common emojis for the emoji picker
const commonEmojis = [
  '😊', '😂', '😍', '👍', '😎', '😢', '❤️', '🙏', '👏', '🎉', 
  '🤔', '😀', '😁', '😉', '😋', '🤗', '😐', '😒', '🙄', '😔',
  '😳', '😱', '🤯', '😴', '🤓', '😇', '🤩', '🤑', '😡', '😭'
];

export interface LinkPreviewData {
  title: string;
  description?: string;
  image?: string;
  url: string;
}

interface ChatInputProps {
  activeInput: 'text' | 'image' | 'link';
  setActiveInput: (type: 'text' | 'image' | 'link') => void;
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  linkPreview: LinkPreviewData | null;
  setLinkPreview: (data: LinkPreviewData | null) => void;
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
  linkPreview,
  setLinkPreview,
  handleSend,
  handleKeyDown,
  isDesktop = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  
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
      
      // Use FileReader to read image file from user's machine
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to fetch link preview
  // In a real app, you would need a backend API to fetch metadata from the link
  const fetchLinkPreview = async (url: string) => {
    if (!url.trim() || !isValidUrl(url)) return;
    
    setIsLoadingPreview(true);
    
    try {
      // In reality, this would be an API call:
      // const response = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
      // const data = await response.json();
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a simple preview mock
      // In reality, this data would come from the API
      const mockData: LinkPreviewData = {
        title: `Product from ${new URL(url).hostname}`,
        description: "Detailed information about this product...",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", // Placeholder image
        url: url
      };
      
      setLinkPreview(mockData);
    } catch (error) {
      console.error("Error fetching link info:", error);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Automatically extract URLs from messages
  useEffect(() => {
    // Check if message contains a URL
    if (activeInput === 'text') {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const match = userMessage.match(urlRegex);
      
      if (match && match[0]) {
        // Only automatically fetch preview when user stops typing
        const timeoutId = setTimeout(() => {
          setLinkUrl(match[0]);
          fetchLinkPreview(match[0]);
        }, 1000); // Wait 1 second after user stops typing
        
        return () => clearTimeout(timeoutId);
      } else if (linkPreview) {
        // Clear preview when no URL in message
        setLinkPreview(null);
      }
    }
  }, [userMessage, activeInput]);

  // Render UI for text input mode
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
        </div>

        {/* Link Preview (if available) */}
        {linkPreview && (
          <Card className="p-2 mb-2 relative">
            <div className="flex">
              {linkPreview.image && (
                <div className="w-12 h-12 mr-2 flex-shrink-0">
                  <img src={linkPreview.image} alt="Preview" className="w-full h-full object-cover rounded" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{linkPreview.title}</p>
                {linkPreview.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{linkPreview.description}</p>
                )}
                <p className="text-xs text-blue-500 truncate">{linkPreview.url}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 absolute top-1 right-1"
                onClick={() => setLinkPreview(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        )}

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

  // Render UI for image input mode
  if (activeInput === 'image') {
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
  }

  // Render UI for link input mode
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
        <div className="flex gap-2">
          <Input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Paste link here..."
            className={`flex-1 text-${isDesktop ? 'xs' : 'sm'} ${isDesktop ? 'h-7' : 'h-8'}`}
          />
          <Button 
            size="sm" 
            onClick={() => fetchLinkPreview(linkUrl)}
            disabled={!linkUrl.trim() || !isValidUrl(linkUrl) || isLoadingPreview} 
            className={`${isDesktop ? 'h-7 px-2' : 'h-8 px-3'}`}
          >
            {isLoadingPreview ? 'Loading...' : 'Preview'}
          </Button>
        </div>

        {/* Link Preview (if available) */}
        {linkPreview && (
          <Card className="p-3 mb-2">
            <div className="flex">
              {linkPreview.image && (
                <div className="w-16 h-16 mr-3 flex-shrink-0">
                  <img src={linkPreview.image} alt="Preview" className="w-full h-full object-cover rounded" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{linkPreview.title}</p>
                {linkPreview.description && (
                  <p className="text-xs text-muted-foreground mt-1">{linkPreview.description}</p>
                )}
                <p className="text-xs text-blue-500 mt-1 truncate">{linkPreview.url}</p>
              </div>
            </div>
          </Card>
        )}

        <div className="flex gap-2">
          <Input
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Add a message (optional)"
            className={`flex-1 text-${isDesktop ? 'xs' : 'sm'} ${isDesktop ? 'h-7' : 'h-8'}`}
          />
          <Button 
            size="sm" 
            onClick={handleSend}
            disabled={!linkPreview} 
            className={`${isDesktop ? 'h-7 px-2' : 'h-8 px-3'}`}
          >
            <Send className={`h-${isDesktop ? '3' : '3'} w-${isDesktop ? '3' : '3'}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
