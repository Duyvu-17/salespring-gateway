
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from 'lucide-react';
import { Card } from "@/components/ui/card";

export interface MessageType {
  id: number;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type?: 'text' | 'link' | 'image' | 'product';
  metadata?: {
    url?: string;
    imageUrl?: string;
    productId?: number;
    productName?: string;
    productImageUrl?: string;
    linkPreview?: {
      title: string;
      description?: string;
      image?: string;
      url: string;
    };
  };
}

interface ChatMessageProps {
  message: MessageType;
  formatTime: (date: Date) => string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, formatTime }) => {
  const renderMessageContent = () => {
    switch (message.type) {
      case 'link':
        return (
          <div className="space-y-1">
            <p className="text-sm">{message.content}</p>
            {message.metadata?.linkPreview ? (
              <Card className="p-2 mt-1 border rounded overflow-hidden bg-background/50">
                <div className="flex">
                  {message.metadata.linkPreview.image && (
                    <div className="w-14 h-14 mr-2 flex-shrink-0">
                      <img 
                        src={message.metadata.linkPreview.image} 
                        alt="Link preview" 
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs">{message.metadata.linkPreview.title}</p>
                    {message.metadata.linkPreview.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {message.metadata.linkPreview.description}
                      </p>
                    )}
                    <a 
                      href={message.metadata.linkPreview.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline flex items-center mt-0.5"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> 
                      {new URL(message.metadata.linkPreview.url).hostname}
                    </a>
                  </div>
                </div>
              </Card>
            ) : (
              <a 
                href={message.metadata?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" /> 
                {message.metadata?.url}
              </a>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="space-y-1">
            <img 
              src={message.metadata?.imageUrl} 
              alt="Shared image" 
              className="rounded max-w-full max-h-32 object-cover"
            />
          </div>
        );
      case 'product':
        return (
          <div className="space-y-1">
            <p className="text-xs mb-1">{message.content}</p>
            <div className="flex items-center p-2 bg-muted/50 rounded">
              <img 
                src={message.metadata?.productImageUrl} 
                alt={message.metadata?.productName} 
                className="w-10 h-10 object-cover rounded"
              />
              <div className="ml-2">
                <p className="text-xs font-medium">{message.metadata?.productName}</p>
                <a 
                  href={`/product/${message.metadata?.productId}`} 
                  className="text-xs text-blue-500 hover:underline"
                >
                  View product
                </a>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-sm">{message.content}</p>;
    }
  };

  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      {message.sender === 'agent' && (
        <Avatar className="h-5 w-5 mr-1 mt-1">
          <AvatarFallback>
            <Bot className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      )}
      <div 
        className={`max-w-[80%] rounded-lg p-2 overflow-hidden ${
          message.sender === 'user' 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted'
        }`}
      >
        {renderMessageContent()}
        <p className="text-xs opacity-70 mt-1 text-right">
          {formatTime(message.timestamp)}
        </p>
      </div>
      {message.sender === 'user' && (
        <Avatar className="h-5 w-5 ml-1 mt-1">
          <AvatarFallback>
            <User className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
