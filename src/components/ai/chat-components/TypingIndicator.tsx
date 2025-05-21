
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="flex gap-3 max-w-[80%]">
        <Avatar className="h-8 w-8 border border-primary/50">
          <AvatarFallback className="bg-primary/20 text-primary">AI</AvatarFallback>
          <Bot className="h-5 w-5 text-primary" />
        </Avatar>
        <div className="rounded-lg p-3 bg-secondary text-secondary-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-white/50 animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-white/50 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
