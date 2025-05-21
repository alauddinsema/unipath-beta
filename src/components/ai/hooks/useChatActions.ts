
import { useState, useCallback } from 'react';
import { Message, ApiMessage } from '../types/chat-types';
import { useChatState } from './useChatState';
import { sendMessageToWebhook } from '../services/webhook-service';
import { useToast } from '@/hooks/use-toast';

type GetAIResponseFn = (userMessage: string, messageHistory: ApiMessage[]) => Promise<string>;

export function useChatActions(getAIResponse: GetAIResponseFn) {
  const { toast } = useToast();
  const { 
    messages, 
    inputValue, 
    isLoading, 
    retryMessage,
    setIsLoading,
    addUserMessage,
    addAssistantMessage,
    handleError,
    resetInput,
    setRetryMessage,
    setInputValue
  } = useChatState();

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !retryMessage) return;
    
    const messageToSend = retryMessage || inputValue;
    
    if (!retryMessage) {
      addUserMessage(messageToSend);
    }
    
    resetInput();
    setIsLoading(true);
    
    try {
      try {
        const response = await sendMessageToWebhook(messageToSend);
        if (response?.error) {
          addAssistantMessage("I encountered an error processing your message. Please try again.", true);
          return;
        }
      } catch (webhookError) {
        console.warn("Webhook error:", webhookError);
        addAssistantMessage("Network error connecting to webhook. Please check your internet connection and try again.", true);
        return;
      }
      
      const messageHistory = messages
        .filter(msg => msg.id !== '1')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));
      
      const aiResponse = await getAIResponse(messageToSend, messageHistory);
      addAssistantMessage(aiResponse);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = useCallback((messageContent: string) => {
    setRetryMessage(messageContent);
    setTimeout(() => {
      handleSendMessage();
    }, 0);
  }, [handleSendMessage, setRetryMessage]);

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry,
  };
}
