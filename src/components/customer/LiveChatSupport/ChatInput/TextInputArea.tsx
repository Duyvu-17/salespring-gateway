
import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputAreaProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isDesktop?: boolean;
  placeholder?: string;
}

export const TextInputArea: React.FC<TextInputAreaProps> = ({
  value,
  onChange,
  onSend,
  onKeyDown,
  isDesktop = false,
  placeholder = "Type your message..."
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content with increased limits
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = isDesktop ? 200 : 250; // Increased max height
      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = newHeight + 'px';
    }
  }, [value, isDesktop]);

  return (
    <div className="flex gap-2 items-end">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`flex-1 resize-none overflow-hidden transition-all duration-200 ${
          isDesktop 
            ? 'text-sm min-h-[45px] max-h-[200px] py-3' 
            : 'text-base min-h-[50px] max-h-[250px] py-3.5'
        }`}
        rows={1}
        maxLength={2000} // Increased character limit
      />
      <Button 
        size={isDesktop ? "sm" : "default"}
        onClick={onSend}
        disabled={!value.trim()} 
        className={`${isDesktop ? 'h-11 px-3' : 'h-12 px-4'} shrink-0`}
      >
        <Send className={`h-${isDesktop ? '4' : '4'} w-${isDesktop ? '4' : '4'}`} />
      </Button>
    </div>
  );
};
