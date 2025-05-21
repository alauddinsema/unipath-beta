
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Message } from '../types/chat-types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { WebhookResponseDisplay } from './WebhookResponseDisplay';

interface ChatContainerProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  retryMessage?: string | null;
  handleSendMessage: () => void;
  handleRetry?: (content: string) => void;
  webhookResponse?: any;
  webhookError?: boolean;
}

export function ChatContainer({
  messages,
  inputValue,
  setInputValue,
  isLoading,
  retryMessage,
  handleSendMessage,
  handleRetry,
  webhookResponse,
  webhookError
}: ChatContainerProps) {
  const {
    messagesEndRef,
    scrollAreaRef,
    showScrollButton,
    scrollToBottom,
    handleScroll
  } = useScrollToBottom();

  return (
    <Card className="h-[calc(80vh-6rem)] flex flex-col overflow-hidden border-white/20 bg-black/30 backdrop-blur-sm">
      <ScrollArea 
        className="flex-1 p-4"
        ref={scrollAreaRef}
        onScroll={handleScroll}
      >
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              onRetry={handleRetry && index > 0 ? () => handleRetry(messages[index - 1]?.content || '') : undefined}
              previousMessageContent={index > 0 ? messages[index - 1].content : undefined}
            />
          ))}
          
          {isLoading && <TypingIndicator />}
          
          {/* Display webhook response if available */}
          {webhookResponse && <WebhookResponseDisplay response={webhookResponse} isError={webhookError} />}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {showScrollButton && (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-20 right-6 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary"
          onClick={scrollToBottom}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
      
      <div className="p-4 border-t border-white/10 bg-black/50">
        <ChatInput 
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
          retryMessage={retryMessage}
        />
      </div>
    </Card>
  );
}
