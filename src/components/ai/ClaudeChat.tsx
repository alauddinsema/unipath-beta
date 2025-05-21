
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Message, INITIAL_MESSAGES } from './types/chat-types';
import { getAIResponse } from './services/claude-service';
import { ChatMessage } from './chat-components/ChatMessage';
import { ChatInput } from './chat-components/ChatInput';
import { TypingIndicator } from './chat-components/TypingIndicator';
import { useScrollToBottom } from './hooks/useScrollToBottom';

export function ClaudeChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  
  const {
    messagesEndRef,
    scrollAreaRef,
    showScrollButton,
    scrollToBottom,
    handleScroll
  } = useScrollToBottom();

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !retryMessage) return;
    
    const messageToSend = retryMessage || inputValue;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: 'user',
      timestamp: new Date(),
    };
    
    if (!retryMessage) {
      setMessages(prev => [...prev, userMessage]);
    }
    setInputValue('');
    setRetryMessage(null);
    setIsLoading(true);
    
    try {
      // Prepare message history for the API call
      const messageHistory = messages
        .filter(msg => msg.id !== '1') // Filter out the initial greeting
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      // Generate AI response
      const aiResponse = await getAIResponse(messageToSend, messageHistory);
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to get AI response. Please try again.";
      
      // Add error message as assistant
      const errorAssistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
        role: 'assistant',
        timestamp: new Date(),
        error: true,
      };
      
      setMessages(prev => [...prev, errorAssistantMessage]);
      
      toast({
        title: "AI Service Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (messageContent: string) => {
    setRetryMessage(messageContent);
    handleSendMessage();
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
