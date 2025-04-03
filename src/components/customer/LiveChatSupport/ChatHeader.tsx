import React from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatHeaderProps {
  isMinimized: boolean;
  toggleMinimize: () => void;
  handleClose: () => void;
  isOnline: boolean; 
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isMinimized,
  toggleMinimize,
  handleClose,
  isOnline 
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
        <div className="flex items-center gap-1">
          <h3 className="font-medium text-xs">Customer Support</h3>
          <span
            className={`h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
          ></span>
          <p className="text-xs">{isOnline ? 'Online' : 'Offline'}</p>
        </div>
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
