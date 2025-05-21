
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Platform knowledge for context in AI responses
const PLATFORM_KNOWLEDGE = [
  "UniPath helps students find and apply to universities worldwide.",
  "The platform offers university search with advanced filters.",
  "Users can upload and manage application documents securely.",
  "The built-in browser allows research without leaving the platform.",
  "AI tools help with essay improvement and application review.",
  "Users can save favorite universities and add notes.",
  "The platform offers different subscription plans with varying features."
];

export function useGeminiApi() {
  const { toast } = useToast();

  const getGeminiResponse = useCallback(async (userMessage: string): Promise<string> => {
    try {
      console.log('Calling Gemini API with message:', userMessage);
      
      // Use the Supabase edge function for secure API calls
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { 
          message: userMessage,
          platformInfo: PLATFORM_KNOWLEDGE
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to connect to AI service');
      }

      if (!data) {
        console.error('No data returned from AI service');
        throw new Error('No response from AI service');
      }
      
      if (data.error) {
        console.error('AI service returned an error:', data.error);
        throw new Error(data.error || 'AI service error');
      }

      if (!data.content) {
        console.error('Invalid response data:', data);
        throw new Error('Invalid response from AI service');
      }

      console.log('Received AI response successfully');
      return data.content;
    } catch (error) {
      console.error('AI response error:', error);
      
      // Show user-friendly toast message
      toast({
        title: "AI Service Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [toast]);

  return { getGeminiResponse };
}
