
import React from 'react';
import { Message } from '../types/chat-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertCircle, Bot, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ChatMessageProps {
  message: Message;
  onRetry?: (content: string) => void;
  previousMessageContent?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onRetry, 
  previousMessageContent 
}) => {
  const { user } = useAuth();

  return (
    <div className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-3 max-w-[80%] ${message.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'}`}>
        {message.role === 'assistant' ? (
          <Avatar className={`h-8 w-8 border ${message.error ? 'border-destructive/50' : 'border-primary/50'}`}>
            <AvatarFallback className={`${message.error ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
              {message.error ? '!' : 'AI'}
            </AvatarFallback>
            {message.error ? (
              <AlertCircle className="h-5 w-5 text-destructive" />
            ) : (
              <Bot className="h-5 w-5 text-primary" />
            )}
          </Avatar>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-secondary"><User className="h-5 w-5" /></AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-lg p-3 text-sm ${
            message.role === 'assistant'
              ? message.error
                ? 'bg-destructive/20 text-destructive-foreground border border-destructive/30'
                : 'bg-secondary text-secondary-foreground'
              : 'bg-primary text-primary-foreground'
          }`}
        >
          {message.content}
          <div className={`text-xs mt-1 opacity-70 flex justify-between items-center ${
            message.role === 'assistant' ? 'text-secondary-foreground' : 'text-primary-foreground'
          }`}>
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {message.error && message.role === 'assistant' && onRetry && previousMessageContent && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2 text-xs hover:bg-destructive/20 hover:text-destructive-foreground"
                onClick={() => onRetry(previousMessageContent)}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
