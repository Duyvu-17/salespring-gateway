
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChatState } from './useChatState';
import { MobileChatView } from './MobileChatView';
import { DesktopChat } from './DesktopChat';

export const LiveChatSupport: React.FC = () => {
  const isMobile = useIsMobile();
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    userMessage,
    setUserMessage,
    messages,
    isTyping,
    activeInput,
    setActiveInput,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    imageUrl, 
    setImageUrl,
    formatTime,
    toggleMinimize,
    handleClose,
    handleKeyDown,
    handleSend
  } = useChatState();

  return (
    <>
      {/* Mobile version - only shows on mobile devices */}
      {isMobile && (
        <div className="fixed z-50 bottom-4 right-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                className="rounded-full h-10 w-10 shadow-lg p-0"
                variant="secondary"
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[70vh] p-0">
              <MobileChatView
                messages={messages}
                isTyping={isTyping}
                formatTime={formatTime}
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
                handleClose={handleClose}
              />
            </SheetContent>
          </Sheet>
        </div>
      )}

      {/* Desktop version - only shows on desktop devices */}
      {!isMobile && (
        <div className="fixed z-50 bottom-4 right-4">
          {!isOpen ? (
            <Button 
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }} 
              className="rounded-full h-10 w-10 shadow-lg p-0"
              variant="secondary"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          ) : (
            <DesktopChat
              isOpen={isOpen}
              isMinimized={isMinimized}
              messages={messages}
              isTyping={isTyping}
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
              formatTime={formatTime}
              toggleMinimize={toggleMinimize}
              handleClose={handleClose}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
            />
          )}
        </div>
      )}
    </>
  );
};
