
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Message, INITIAL_MESSAGES } from '../types/chat-types';
import { sendToWebhookWithRetry } from '../services/webhook-service';

export function useAIChat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [retryMessage, setRetryMessage] = useState<string | null>(null);
  const [webhookResponse, setWebhookResponse] = useState<any>(null);
  const [webhookError, setWebhookError] = useState<boolean>(false);

  // Fetch chat history when component mounts
  const fetchChatHistory = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: chatHistory, error } = await supabase
        .from('chat_history')
        .select('content, response, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (chatHistory && chatHistory.length > 0) {
        console.log('Fetched chat history:', chatHistory);
        
        // Convert chat history to Message format
        const historicalMessages: Message[] = chatHistory.flatMap((chat) => {
          const timestamp = new Date(chat.created_at);
          return [
            { 
              id: `user-${timestamp.getTime()}`, 
              content: chat.content, 
              role: 'user' as const,
              timestamp 
            },
            ...(chat.response ? [{
              id: `assistant-${timestamp.getTime() + 1}`, 
              content: chat.response, 
              role: 'assistant' as const,
              timestamp: new Date(timestamp.getTime() + 1000) 
            }] : [])
          ];
        });

        // Only update if we have historical messages
        if (historicalMessages.length > 0) {
          setMessages([...INITIAL_MESSAGES, ...historicalMessages]);
        }
      }
    } catch (error) {
      console.error('Error in fetchChatHistory:', error);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !retryMessage) return;
    
    const messageToSend = retryMessage || inputValue.trim();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Login Required",
          description: "Please log in to use the AI chat.",
          variant: "destructive"
        });
        return;
      }

      // Add user message to UI
      const userMessage: Message = {
        id: `user-${Date.now()}`,
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
        // Send to webhook
        console.log('Sending message to webhook:', messageToSend);
        const response = await sendToWebhookWithRetry(messageToSend);
        console.log('Webhook response received:', response);
        
        // Save both the user message and AI response to chat history
        const { error: insertError } = await supabase
          .from('chat_history')
          .insert({
            user_id: user.id,
            content: messageToSend,
            response: response?.output || ''
          });
        
        if (insertError) {
          console.error('Error saving chat history:', insertError);
        } else {
          console.log('Chat history saved successfully');
        }
        
        // Add AI response to UI
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          content: response?.output || 'Sorry, I could not process your request.',
          role: 'assistant',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setWebhookResponse(response);
        setWebhookError(false);
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
        setWebhookError(true);
        setWebhookResponse(webhookError instanceof Error ? webhookError.message : String(webhookError));
        
        // Add error message as assistant
        const errorAssistantMessage: Message = {
          id: `error-${Date.now()}`,
          content: 'Sorry, I encountered an error. Please try again.',
          role: 'assistant',
          timestamp: new Date(),
          error: true,
        };
        
        setMessages(prev => [...prev, errorAssistantMessage]);
      }
    } catch (error) {
      console.error('General error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to get AI response. Please try again.";
      
      const errorAssistantMessage: Message = {
        id: `error-${Date.now()}`,
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

  // Fetch chat history on initial render
  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);

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
