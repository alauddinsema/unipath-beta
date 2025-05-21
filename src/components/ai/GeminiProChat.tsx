
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { ChatMessage } from './chat-components/ChatMessage';
import { ChatInput } from './chat-components/ChatInput';
import { TypingIndicator } from './chat-components/TypingIndicator';
import { useScrollToBottom } from './hooks/useScrollToBottom';
import { useGeminiChat } from './hooks/useGeminiChat';

export function GeminiChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry
  } = useGeminiChat();

  const {
    messagesEndRef,
    scrollAreaRef,
    showScrollButton,
    scrollToBottom,
    handleScroll
  } = useScrollToBottom();

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
              onRetry={handleRetry}
              previousMessageContent={index > 0 ? messages[index - 1].content : undefined}
            />
          ))}
          {isLoading && <TypingIndicator />}
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
        <div className="flex gap-2">
          <ChatInput 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about university applications, documents, or the platform..."
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            disabled={(!inputValue.trim() && !retryMessage) || isLoading}
          />
        </div>
      </div>
    </Card>
  );
}
