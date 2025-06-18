
import React, { useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
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
    <div className="flex-1 overflow-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-muted/40 backdrop-blur-sm">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-2">Welcome to Customer Support</h3>
          <p className="text-sm text-muted-foreground">How can we help you today?</p>
        </div>
      )}
      
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} formatTime={formatTime} />
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl p-3 bg-card shadow-sm border">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-primary/70 animate-bounce"></div>
              <div className="h-2 w-2 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 rounded-full bg-primary/70 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
