
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
      className="flex items-center justify-between bg-gradient-to-r from-primary to-primary/90 p-4 text-primary-foreground rounded-t-2xl cursor-pointer hover:from-primary/95 hover:to-primary/85 transition-all duration-200"
      onClick={toggleMinimize}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8 border-2 border-primary-foreground/20">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-primary-foreground/10 text-primary-foreground">CS</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-sm">Customer Support</h3>
          <div className="flex items-center gap-1.5">
            <span
              className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`}
            ></span>
            <p className="text-xs opacity-90">{isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {isMinimized ? (
          <ChevronUp className="h-5 w-5 opacity-70" />
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                toggleMinimize();
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
