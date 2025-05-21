
import React from 'react';
import { UserCircle, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessageProps {
  message: Message;
  onRetry?: () => void;
}

export function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} gap-3`}>
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <UserCircle className="h-8 w-8 text-primary" />
          ) : (
            <Bot className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <div className={`p-3 rounded-lg ${isUser ? 'bg-primary/10 text-white' : 'bg-muted text-white/90'}`}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
          
          {onRetry && (
            <button 
              onClick={onRetry}
              className="text-xs text-primary hover:underline mt-2"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
