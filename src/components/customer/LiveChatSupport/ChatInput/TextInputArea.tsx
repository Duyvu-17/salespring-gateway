
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

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = isDesktop ? 120 : 150;
      textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
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
            ? 'text-sm min-h-[40px] max-h-[120px] py-2.5' 
            : 'text-base min-h-[44px] max-h-[150px] py-3'
        }`}
        rows={1}
      />
      <Button 
        size={isDesktop ? "sm" : "default"}
        onClick={onSend}
        disabled={!value.trim()} 
        className={`${isDesktop ? 'h-10 px-3' : 'h-11 px-4'} shrink-0`}
      >
        <Send className={`h-${isDesktop ? '4' : '4'} w-${isDesktop ? '4' : '4'}`} />
      </Button>
    </div>
  );
};
