
import React, { useRef } from 'react';
import { useGeminiChat } from '../hooks/useGeminiChat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatInput } from '../chat-components/ChatInput';
import { ChatMessage } from '../chat-components/ChatMessage';
import { TypingIndicator } from '../chat-components/TypingIndicator';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { WebhookResponseDisplay } from '../chat-components/WebhookResponseDisplay';

export function GeminiChat() {
  const { 
    messages, 
    inputValue, 
    setInputValue, 
    isLoading, 
    handleSendMessage,
    handleRetry,
    webhookResponse
  } = useGeminiChat();
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { showScrollButton, scrollToBottom } = useScrollToBottom();

  // Handle input change for ChatInput component
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[600px]">
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4 pb-4">
          {messages.map((message, index) => {
            const previousMessage = index > 0 ? messages[index - 1] : null;
            const previousMessageContent = 
              previousMessage && previousMessage.role === 'user' 
                ? previousMessage.content 
                : undefined;
            
            return (
              <ChatMessage 
                key={message.id} 
                message={message} 
                onRetry={handleRetry}
                previousMessageContent={previousMessageContent}
              />
            );
          })}
          
          {isLoading && <TypingIndicator />}
          
          {webhookResponse && <WebhookResponseDisplay response={webhookResponse} />}
          
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
      
      <div className="p-4 border-t border-white/10">
        <ChatInput
          value={inputValue}
          onChange={handleInputChange}
          onSend={handleSendMessage}
          isLoading={isLoading}
          placeholder="Ask about universities, applications, or get help with your documents..."
        />
      </div>
    </div>
  );
}
