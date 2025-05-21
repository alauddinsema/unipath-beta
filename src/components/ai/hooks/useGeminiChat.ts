
import { useState, useCallback, useEffect } from 'react';
import { Message, INITIAL_MESSAGES } from '../types/chat-types';
import { useToast } from '@/hooks/use-toast';
import { sendToWebhookWithRetry } from '../services/webhook-service';
import { getAIResponse } from '../services/gemini-service';

export function useGeminiChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [webhookError, setWebhookError] = useState<boolean>(false);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() && !retryMessage) return;
    
    const messageToSend = retryMessage || inputValue;
    
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
    setWebhookResponse(null); // Reset webhook response
    setWebhookError(false);
    
    try {
      try {
        // Get the webhook response and set it to state
        const response = await sendToWebhookWithRetry(messageToSend);
        console.log("Webhook response:", response);
        setWebhookResponse(response);
        setWebhookError(false);
      } catch (webhookError) {
        console.warn("Webhook logging failed, but continuing with AI response:", webhookError);
        setWebhookError(true);
        setWebhookResponse(webhookError instanceof Error ? webhookError.message : String(webhookError));
        toast({
          title: "Webhook Warning",
          description: webhookError instanceof Error ? webhookError.message : "Couldn't log message to webhook",
          variant: "default",
        });
      }
      
      const messageHistory = messages
        .filter(msg => msg.id !== '1')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      const aiResponse = await getAIResponse(messageToSend, messageHistory);
      
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

  const handleRetry = useCallback((messageContent: string) => {
    setRetryMessage(messageContent);
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  }, []);

  useEffect(() => {
    return () => {
    };
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    webhookResponse,
    webhookError,
    handleSendMessage,
    handleRetry,
  };
}
