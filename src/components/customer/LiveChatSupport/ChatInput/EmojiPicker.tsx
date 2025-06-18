
import React from 'react';
import { Smile } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const commonEmojis = [
  '😊', '😂', '😍', '👍', '😎', '😢', '❤️', '🙏', '👏', '🎉', 
  '🤔', '😀', '😁', '😉', '😋', '🤗', '😐', '😒', '🙄', '😔',
  '😳', '😱', '🤯', '😴', '🤓', '😇', '🤩', '🤑', '😡', '😭'
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isDesktop?: boolean;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  isDesktop = false
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant={isDesktop ? "ghost" : "outline"} 
          size="icon" 
          className={`h-${isDesktop ? '8' : '9'} w-${isDesktop ? '8' : '9'}`}
        >
          <Smile className={`h-${isDesktop ? '4' : '4'} w-${isDesktop ? '4' : '4'}`} />
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
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
