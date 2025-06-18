
import React, { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useChatState } from './useChatState';
import { MobileChatView } from './MobileChatView';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { useMediaQuery } from '@/hooks/use-mobile';

export const LiveChatSupport: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    isMinimized,
    setIsMinimized,
    messages,
    isTyping,
    userMessage,
    setUserMessage,
    activeInput,
    setActiveInput,
    imageUrl,
    setImageUrl,
    formatTime,
    toggleMinimize,
    handleClose,
    handleSend,
    handleKeyDown,
    isOnline,
    openChat,
  } = useChatState();

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-minimize on mobile when navigating away
  useEffect(() => {
    if (isMobile) {
      return () => {
        setIsMinimized(true);
      };
    }
  }, [isMobile, setIsMinimized]);

  // Show floating chat button when chat is closed
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  // Render full-screen chat on mobile
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <MobileChatView
          messages={messages}
          isTyping={isTyping}
          formatTime={formatTime}
          activeInput={activeInput}
          setActiveInput={setActiveInput}
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
          handleClose={handleClose}
          isOnline={isOnline}
        />
      </div>
    );
  }

  // Desktop view with improved design
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 bg-card rounded-2xl shadow-2xl border-0 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-[500px]'
      }`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }}
    >
      <ChatHeader
        isMinimized={isMinimized}
        toggleMinimize={toggleMinimize}
        handleClose={handleClose}
        isOnline={isOnline}
      />

      {!isMinimized && (
        <>
          <ChatBody 
            messages={messages} 
            isTyping={isTyping} 
            formatTime={formatTime} 
          />
          <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
            <ChatInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              isDesktop
            />
          </div>
        </>
      )}
    </div>
  );
};
