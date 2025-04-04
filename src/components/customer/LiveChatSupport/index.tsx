
import React, { useEffect } from 'react';
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
    messages,
    isTyping,
    userMessage,
    setUserMessage,
    activeInput,
    setActiveInput,
    linkUrl,
    setLinkUrl,
    linkText,
    setLinkText,
    imageUrl,
    setImageUrl,
    linkPreview,
    setLinkPreview,
    formatTime,
    toggleMinimize,
    handleClose,
    handleSend,
    handleKeyDown,
    isOnline,
  } = useChatState();

  const isMobile = useMediaQuery('(max-width: 768px)');

  // Auto-minimize on mobile when navigating away
  useEffect(() => {
    if (isMobile) {
      return () => {
        setIsMinimized(true);
      };
    }
  }, [isMobile]);

  if (!isOpen) return null;

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
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          linkText={linkText}
          setLinkText={setLinkText}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          linkPreview={linkPreview}
          setLinkPreview={setLinkPreview}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
          handleClose={handleClose}
          isOnline={isOnline}
        />
      </div>
    );
  }

  // Desktop view with minimized/expanded states
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-card rounded-lg shadow-lg border transition-all duration-200 ease-in-out flex flex-col ${
        isMinimized ? 'w-72 h-12' : 'w-80 h-96'
      }`}
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
          <div className="p-3 border-t">
            <ChatInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              linkPreview={linkPreview}
              setLinkPreview={setLinkPreview}
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
