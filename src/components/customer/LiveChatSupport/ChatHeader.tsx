
import React from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  handleClose: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  handleClose
}) => {
  return (
    <div 
      className="flex items-center justify-between bg-primary p-2 text-primary-foreground rounded-t-lg cursor-pointer"
      onClick={toggleMinimize}
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-5 w-5 border border-primary-foreground">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>CS</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-xs">Customer Support</h3>
      </div>
      <div className="flex items-center">
        {isMinimized ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-5 w-5 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
            >
              <ChevronDown className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-5 w-5 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
