
import { useState, useEffect } from 'react';
import { Message, INITIAL_MESSAGES } from '../types/chat-types';
import { useToast } from '@/hooks/use-toast';
import { sendMessageToWebhook } from '../services/webhook-service';

/**
 * Hook for managing webhook chat state and interactions
 */
export function useWebhookChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [webhookError, setWebhookError] = useState<boolean>(false);

  // Function to handle sending a message to the webhook
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const message = inputValue.trim();
    
    // Add user message to the chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setWebhookResponse(null);
    setWebhookError(false);
    
    try {
      // Send message to webhook
      const response = await sendMessageToWebhook(message);
      
      // Update webhook response state
      setWebhookResponse(response);
      setWebhookError(false);
      
      // Add a friendly processing message if needed
      if (response.status === "processing") {
        const processingMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: "I'm processing your request. This might take a moment...",
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, processingMessage]);
      }
    } catch (error) {
      console.error("Error sending message to webhook:", error);
      
      // Display error in toast notification
      toast({
        title: "Webhook Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      // Set error state
      setWebhookError(true);
      setWebhookResponse(error instanceof Error ? error.message : "Failed to send message");
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}. Please try again.`,
        role: 'assistant',
        timestamp: new Date(),
        error: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    webhookResponse,
    webhookError,
    handleSendMessage,
  };
}
