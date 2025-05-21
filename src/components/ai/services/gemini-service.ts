
import { supabase } from '@/integrations/supabase/client';
import { ApiMessage, PLATFORM_KNOWLEDGE } from '../types/chat-types';
import { BaseAIService } from './ai-service-base';

class GeminiService extends BaseAIService {
  protected async getResponseFromService(userMessage: string, messageHistory: ApiMessage[]): Promise<string> {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { 
        message: userMessage,
        platformInfo: PLATFORM_KNOWLEDGE
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to connect to Gemini AI service');
    }

    if (!data || !data.content) {
      console.error('Invalid response data:', data);
      throw new Error('Invalid response from Gemini AI service');
    }

    return data.content;
  }
}

// Singleton instance
const geminiServiceInstance = new GeminiService();

// Export the function to call the service
export const getAIResponse = async (userMessage: string, messageHistory: ApiMessage[]): Promise<string> => {
  return geminiServiceInstance.callService(userMessage, messageHistory, 'Gemini');
};
