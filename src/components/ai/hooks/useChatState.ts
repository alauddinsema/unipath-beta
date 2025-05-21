
import { useState } from 'react';
import { Message, INITIAL_MESSAGES } from '../types/chat-types';
import { useToast } from '@/hooks/use-toast';

export function useChatState(initialMessages = INITIAL_MESSAGES) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  
  const addUserMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    return userMessage;
  };

  const addAssistantMessage = (content: string, error?: boolean) => {
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content,
      role: 'assistant',
      timestamp: new Date(),
      error,
    };
    setMessages(prev => [...prev, assistantMessage]);
    return assistantMessage;
  };

  const handleError = (error: unknown) => {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Failed to get AI response. Please try again.";
    
    // Add error message as assistant
    addAssistantMessage(
      `Sorry, I encountered an error: ${errorMessage}. Please try again.`,
      true
    );
    
    toast({
      title: "AI Service Error",
      description: errorMessage,
      variant: "destructive",
    });
  };

  const resetInput = () => {
    setInputValue('');
    setRetryMessage(null);
  };

  return {
    messages,
    setMessages,
    inputValue,
    setInputValue,
    isLoading,
    setIsLoading,
    retryMessage,
    setRetryMessage,
    addUserMessage,
    addAssistantMessage,
    handleError,
    resetInput,
  };
}
