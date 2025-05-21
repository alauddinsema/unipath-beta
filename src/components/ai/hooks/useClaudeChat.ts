
import { useState, useCallback } from 'react';
import { Message } from '../types/chat-types';
import { useToast } from '@/hooks/use-toast';
import { INITIAL_MESSAGES } from '../types/chat-types';
import { supabase } from '@/integrations/supabase/client';
import { sendToWebhook } from '../services/webhook-service';

export function useClaudeChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  
  const getClaudeResponse = async (userMessage: string): Promise<string> => {
    try {
      console.log('Calling Claude API with message:', userMessage);
      
      const { data, error } = await supabase.functions.invoke('claude-chat', {
        body: { 
          message: userMessage,
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to connect to AI service');
      }

      if (!data || !data.content) {
        console.error('Invalid response from AI service');
        throw new Error('Invalid response from AI service');
      }

      console.log('Received Claude response successfully');
      return data.content;
    } catch (error) {
      console.error('Claude API error:', error);
      throw error;
    }
  };
  
  const handleSendMessage = useCallback(async () => {
    if (!inputValue.trim() && !retryMessage) return;
    
    const messageToSend = retryMessage || inputValue;
    
    // Add user message
    if (!retryMessage) {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageToSend,
        role: 'user',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
    }
    
    setInputValue('');
    setRetryMessage(null);
    setIsLoading(true);
    
    try {
      // Send message to webhook
      await sendToWebhook(messageToSend);
      
      // Generate AI response
      const aiResponse = await getClaudeResponse(messageToSend);
      
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
  }, [inputValue, retryMessage, toast]);

  const handleRetry = useCallback((messageContent: string) => {
    setRetryMessage(messageContent);
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  }, [handleSendMessage]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry
  };
}
