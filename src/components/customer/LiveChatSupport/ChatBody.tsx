
import React, { useRef, useEffect } from 'react';
import { ChatMessage, MessageType } from './ChatMessage';

interface ChatBodyProps {
  messages: MessageType[];
  isTyping: boolean;
  formatTime: (date: Date) => string;
}

export const ChatBody: React.FC<ChatBodyProps> = ({ messages, isTyping, formatTime }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
  return (
    <div className="flex-1 overflow-auto p-3 space-y-3 bg-muted/30">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} formatTime={formatTime} />
      ))}
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-lg p-2 bg-muted">
            <div className="flex space-x-1">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
