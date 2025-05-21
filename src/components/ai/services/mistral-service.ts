
import { supabase } from '@/integrations/supabase/client';
import { ApiMessage, PLATFORM_KNOWLEDGE } from '../types/chat-types';
import { BaseAIService } from './ai-service-base';

class MistralService extends BaseAIService {
  protected async getResponseFromService(userMessage: string, messageHistory: ApiMessage[]): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('mistral-chat', {
        body: { 
          messages: messageHistory,
          platformInfo: PLATFORM_KNOWLEDGE
        },
      });

      if (error) {
        console.error('Supabase function error:', error);
        
        // Check if we can fall back to the Gemini API
        try {
          console.log('Trying fallback to Gemini API...');
          const fallbackResponse = await this.fallbackToGemini(userMessage);
          return fallbackResponse;
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
          throw new Error(error.message || 'Failed to connect to AI service');
        }
      }

      if (!data || !data.content) {
        console.error('Invalid response data:', data);
        throw new Error('Invalid response from Mistral AI service');
      }

      return data.content;
    } catch (error) {
      throw error;
    }
  }

  // Fallback function to use Gemini API if Mistral fails
  private async fallbackToGemini(userMessage: string): Promise<string> {
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: { 
        message: userMessage,
        platformInfo: PLATFORM_KNOWLEDGE
      },
    });

    if (error) {
      throw new Error(error.message || 'Fallback to Gemini failed');
    }

    if (!data || !data.content) {
      throw new Error('Invalid response from fallback AI service');
    }

    return data.content;
  }
}

// Singleton instance
const mistralServiceInstance = new MistralService();

// Export the function to call the service
export const getAIResponse = async (userMessage: string, messageHistory: ApiMessage[]): Promise<string> => {
  return mistralServiceInstance.callService(userMessage, messageHistory, 'Mistral');
};
